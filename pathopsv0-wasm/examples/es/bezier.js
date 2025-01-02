import PathopsV0Factory from '../../dist/es/pathops.js';

PathopsV0Factory().then((PathopsV0) => {
    const { FramePath2D, FillPath2D } = PathopsV0;
    const canvas = document.createElement('canvas');
    const target = document.getElementById('bezier');
    target.before(canvas);
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    const leftTriangle = [0, 10, 10, 0, 10, 20],
        rightTriangle = [0, 0, 10, 10, 0, 20],
        wTriangle = [0, 0, 10, -7, 10, 7],
        letterV = [10, 15, 70, 15, 105, 115, 140, 15, 200, 15, 140, 185, 70, 185, 10, 15],
        outer0 = [295, 10, 390, 10, 390, 100, 390, 190, 295, 190, 200, 190, 200, 100, 200, 10, 295, 10],
        inner0 = [295, 55, 265, 55, 265, 100, 265, 145, 295, 145, 325, 145, 325, 100, 325, 55, 295, 55];
    const wCtrlX = canvas.width - 25;
    const wCtrlYMin = 40;
    const wCtrlYMax = 160;
    const minW = .1;
    const maxW = 2;
    const ptCount = [2, 3, 3, 4];
    let pts = [{ x: 50, y: 150 }, { x: 350, y: 50 }, { x: 150, y: 50, w: .7 }, { x: 250, y: 150 }];
    let ctrlW = pts[2].w;
    let endHit = -1;
    let bType = 0;
    requestAnimationFrame(drawCanvas);

    canvas.addEventListener('mousedown', (event) => {
        const canvasBoundingRect = canvas.getBoundingClientRect();
        const scale = {
            x: canvas.width / canvasBoundingRect.width,
            y: canvas.height / canvasBoundingRect.height,
        };
        const downX = (event.clientX - canvasBoundingRect.left) * scale.x;
        const downY = (event.clientY - canvasBoundingRect.top) * scale.y;
        endHit = -1;
        for (var i = 0; i < ptCount[bType]; ++i) {
            if (check(pts[i], downX, downY))
                endHit = i;
        }
        const wArrowPos = { x: wCtrlX, y: weightPos() };
        if (endHit < 0 && check(wArrowPos, downX, downY)) {
            endHit = 4;
            ctrlW = pts[2].w;
        }
    });

    document.addEventListener('mouseup', (event) => {
        endHit = -1;
    });

    document.addEventListener('mousemove', (event) => {
        if (endHit < 0)
            return;
        if (endHit < 4) {
            pts[endHit].x += event.movementX;
            pts[endHit].y += event.movementY;
        } else {
            const canvasBoundingRect = canvas.getBoundingClientRect();
            const scaleY = canvas.height / canvasBoundingRect.height;
            ctrlW -= event.movementY * scaleY / (wCtrlYMax - wCtrlYMin) * (maxW - minW);
            pts[2].w = Math.max(Math.min(maxW, ctrlW), minW);
        }
        requestAnimationFrame(drawCanvas);
    });

    canvas.addEventListener('click', (event) => {
        const canvasBoundingRect = canvas.getBoundingClientRect();
        const scale = {
            x: canvas.width / canvasBoundingRect.width,
            y: canvas.height / canvasBoundingRect.height,
        };
        const x = (event.clientX - canvasBoundingRect.left) * scale.x;
        const y = (event.clientY - canvasBoundingRect.top) * scale.y;
        if (y < canvas.height - 25)
            return;
        if (x < 15)
            bType = (bType + 3) % 4;
        if (x > canvas.width - 15)
            bType = (bType + 1) % 4;
        requestAnimationFrame(drawCanvas);
    });

    function check(pt, downX, downY) {
        return Math.abs(downY - pt.y) <= 8 && Math.abs(downX - pt.x) <= 8;
    }

    function endPoint(endHit) {
        if (-1 == endHit)
            return { x: 0, y: 0 };
        return pts[endHit];
    }

    function drawEndPoint(ptIndex) {
        const pt = endPoint(ptIndex);
        drawPoint(pt.x, pt.y, ptIndex);
    }

    function drawPoint(x, y, ptIndex) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 0 == ptIndex ? 'red' : 1 == ptIndex ? 'blue' : 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.font = "14px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(String.fromCharCode("A".charCodeAt(0) + ptIndex), x, y + 5);
    }

    function conic_interp(start, end, ctrl) {
        const ab = (start + ctrl) / 2;
        const bc = (ctrl + end) / 2;
        return { s: ab, c: (ab + bc) / 2, e: bc };
    }

    function to_pt(start, end, ctrl) {
        return { x: start / ctrl, y: end / ctrl };
    }

    function conicChop(p) {
        const w = p[2].w;
        const tmpX = conic_interp(p[0].x, p[1].x, p[2].x * w);
        const tmpY = conic_interp(p[0].y, p[1].y, p[2].y * w);
        const tmpW = (1 + w) / 2;
        let half1 = [ p[0], to_pt(tmpX.c, tmpY.c, tmpW), to_pt(tmpX.s, tmpY.s, tmpW) ];
        let half2 = [ half1[1], p[1], to_pt(tmpX.e, tmpY.e, tmpW) ];
        const halfW = tmpW / Math.sqrt(tmpW);
        half1[2].w = halfW;
        half2[2].w = halfW;
        return { h1: half1, h2: half2 };
    }

    // add quads to approximate conic
    function conicHack(p, depth) {
        const wSlop = 0.01;  // weight can vary between 1 +/- slop and be close enough to a quad
        const weight = p[2].w;
        if (1 - wSlop <= weight && weight <= 1 + wSlop || depth > 8) {
            ctx.quadraticCurveTo(p[2].x, p[2].y, p[1].x, p[1].y);
            return;
        }
        const dx = p[1].x - p[0].x;
        const dy = p[1].y - p[0].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 1) {
            ctx.lineTo(p[1].x, p[1].y);
            return;
        }
        const chopped = conicChop(p);
        conicHack(chopped.h1, depth + 1);
        conicHack(chopped.h2, depth + 1);
    }

    function makeBezier(builder, hack) {
        builder.moveTo(pts[0].x, pts[0].y);
        switch (bType) {
            case 0:
                builder.lineTo(pts[1].x, pts[1].y);
                break;
            case 1:
                builder.quadraticCurveTo(pts[2].x, pts[2].y, pts[1].x, pts[1].y);
                break;
            case 2:
                if (hack)
                    conicHack(pts, 1);
                else
                    builder.conicTo(pts[2].x, pts[2].y, pts[2].w, pts[1].x, pts[1].y);
                break;
            case 3:
                builder.bezierCurveTo(pts[2].x, pts[2].y, pts[3].x, pts[3].y, pts[1].x, pts[1].y);
                break;
        }
    }

    function drawBezier() {
        ctx.beginPath();
        makeBezier(ctx, true);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        for (var i = 0; i < ptCount[bType]; i++)
            drawEndPoint(i);
    }

    function weightPos() {
        return wCtrlYMax - (wCtrlYMax - wCtrlYMin) * (pts[2].w - minW) / (maxW - minW);
    }

    function drawWeight() {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(wCtrlX, wCtrlYMin);
        ctx.lineTo(wCtrlX, wCtrlYMax);
        ctx.stroke();
        drawArrow(wTriangle, wCtrlX, weightPos());
        ctx.font = "14px Arial";
        ctx.textAlign = 'center';
        ctx.fillText('w', wCtrlX, wCtrlYMax + 10);
    }

    function drawArrow(a, x, y) {
        ctx.beginPath();
        ctx.moveTo(a[0] + x, a[1] + y);
        for (var i = 2; i < a.length; i += 2) {
            ctx.lineTo(a[i] + x, a[i + 1] + y);
        }
        ctx.closePath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    function makeV0(builder) {
        const v = letterV;
        builder.moveTo(v[0], v[1]);
        for (var i = 2; i < v.length; i += 2) {
            builder.lineTo(v[i], v[i + 1]);
        }
        const O = outer0;
        builder.moveTo(O[0], O[1]);
        for (var i = 2; i < O.length; i += 4) {
            builder.quadraticCurveTo(O[i], O[i + 1], O[i + 2], O[i + 3]);
        }
        const o = inner0;
        builder.moveTo(o[0], o[1]);
        for (var i = 2; i < o.length; i += 4) {
            builder.quadraticCurveTo(o[i], o[i + 1], o[i + 2], o[i + 3]);
        }
        builder.closePath();
    }

    function drawV0() {
        ctx.beginPath();
        makeV0(ctx);
        ctx.fillStyle = '#f0f0d0';
        ctx.fill();
    }

    function sect() {
        var frame = new FramePath2D();
        makeBezier(frame, false);
        console.log(frame.toSVG());
        var fill = new FillPath2D();
        makeV0(fill);
        console.log(fill.toSVG());
        frame.intersect(fill);
        console.log(frame.toSVG());
        const commands = frame.toCommands();
        frame.delete();
        fill.delete();
        ctx.beginPath();
        var lastPt = { x: 0, y: 0 };
        for (let i = 0; i < commands.size(); i++) {
            const { type: { value: type }, data } = commands.get(i);
            switch (type) {
                case 0:
                    ctx.moveTo(data.get(0), data.get(1));
                    break;
                case 1:
                    ctx.lineTo(data.get(0), data.get(1));
                    break;
                case 2:
                    ctx.quadraticCurveTo(data.get(0), data.get(1), data.get(2), data.get(3));
                    break;
                case 3:
                    const conic = [lastPt, { x: data.get(3), y: data.get(4) }, 
                            { x: data.get(0), y: data.get(1), w: data.get(2)}];
                    conicHack(conic, 1);
                    break;
                case 4:
                    ctx.bezierCurveTo(data.get(0), data.get(1), data.get(2), data.get(3), 
                            data.get(4), data.get(5));
                    break;
                default:
                    ;
            }
        }
        commands.delete();
        ctx.lineWidth = '8';
        ctx.strokeStyle = 'rgba(255, 0, 0, .2)';
        ctx.stroke();
    }

    function drawCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawV0();
        drawBezier();
        sect();
        if (2 == bType)
           drawWeight();
        drawArrow(leftTriangle, 5, canvas.height - 25);
        drawArrow(rightTriangle, canvas.width - 15, canvas.height - 25);
        ctx.fillStyle = 'black';
        ctx.font = "16px Arial";
        ctx.textAlign = 'center';
        const bNames = ['line', 'quadratic', 'conic', 'cubic'];
        ctx.fillText(bNames[bType], canvas.width / 2, canvas.height - 10);
    }
});
