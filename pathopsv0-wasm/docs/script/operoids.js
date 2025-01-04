import PathopsV0Factory from '../../dist/es/pathops.js';

PathopsV0Factory().then((PathopsV0) => {
    var { FillPath2D, PathOps } = PathopsV0;
    const canvas = document.createElement('canvas');
    const target = document.getElementById('operoids');
    target.before(canvas);
    canvas.width = 400;
    canvas.height = 200;
    var ctx = canvas.getContext('2d');
    const as = [3, 0, 9, 1, 8, 4, 10, 7, 6, 10, 5, 8, 0, 6, 0, 3, 2, 3],
        bs = [0, 4, 1, 2, 6, 1, 9, 0, 10, 2, 9, 4, 10, 6, 7, 10, 1, 7];
    let aAngle = 0,
        aX = 10,
        aY = 10;
    let bAngle = 0,
        bX = 90,
        bY = 30;
    const leftTriangle = [0, 10, 10, 0, 10, 20],
        rightTriangle = [0, 0, 10, 10, 0, 20];
    const texts = ['intersect', 'union', 'difference', 'reverse difference',
        'exclusive or']
    let textIndex = 0;
    ctx.font = "16px Arial";
    ctx.textAlign = 'center';
    requestAnimationFrame(drawCanvas);

    canvas.addEventListener('pointerdown', (event) => {
        const canvasBoundingRect = canvas.getBoundingClientRect();
        const scale = {
            x: canvas.width / canvasBoundingRect.width,
            y: canvas.height / canvasBoundingRect.height,
        };
        const x = (event.clientX - canvasBoundingRect.left) * scale.x;
        const y = (event.clientY - canvasBoundingRect.top) * scale.y;
        if (y < canvas.height - 25)
            return;
        if (x < 15) {
            textIndex -= 1;
            if (textIndex < 0)
                textIndex = 4;
        }
        if (x > canvas.width - 15) {
            textIndex += 1;
            if (textIndex > 4)
                textIndex = 0;
        }
    });

    function mapPt(x, y, angle, dx, dy) {
        x = x - 5;
        y = y - 5;
        x = x * 10;
        y = y * 10;
        let rx = x * Math.cos(angle) + y * Math.sin(angle);
        let ry = x * Math.sin(angle) - y * Math.cos(angle);
        rx += 50;
        ry += 50;
        rx += dx;
        ry += dy;
        return { rx, ry };
    }

    function drawRoid(ctx, s, angle, x, y) {
        ctx.beginPath();
        var rPt = mapPt(s[0], s[1], angle, x, y);
        ctx.moveTo(rPt.rx, rPt.ry);
        for (var i = 2; i < s.length; i += 2) {
            rPt = mapPt(s[i], s[i + 1], angle, x, y);
            ctx.lineTo(rPt.rx, rPt.ry);
        }
        ctx.closePath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    function addRoid(path, s, angle, x, y) {
        var rPt = mapPt(s[0], s[1], angle, x, y);
        path.moveTo(rPt.rx, rPt.ry);
        for (var i = 2; i < s.length; i += 2) {
            rPt = mapPt(s[i], s[i + 1], angle, x, y);
            path.lineTo(rPt.rx, rPt.ry);
        }
        path.closePath();
    }

    function drawArrow(ctx, a, x, y) {
        ctx.beginPath();
        ctx.moveTo(a[0] + x, a[1] + y);
        for (var i = 2; i < a.length; i += 2) {
            ctx.lineTo(a[i] + x, a[i + 1] + y);
        }
        ctx.closePath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'white';
        ctx.stroke();
    }

    function drawCanvas() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawRoid(ctx, as, aAngle, aX, aY);
        drawRoid(ctx, bs, bAngle, bX, bY);
        var pathA = new FillPath2D();
        addRoid(pathA, as, aAngle, aX, aY);
        var pathB = new FillPath2D();
        addRoid(pathB, bs, bAngle, bX, bY);
        switch (textIndex) {
            case 0: pathA.intersect(pathB); break;
            case 1: pathA.union(pathB); break;
            case 2: pathA.difference(pathB); break;
            case 3: pathA.reverseDifference(pathB); break;
            case 4: pathA.xor(pathB); break;
        }
        const commands = pathA.toCommands();
        pathA.delete();
        pathB.delete();
        ctx.beginPath();
        for (let i = 0; i < commands.size(); i++) {
            const { type: { value: type }, data } = commands.get(i);
            switch (type) {
                case 0:
                    ctx.moveTo(data.get(0), data.get(1));
                    break;
                case 1:
                    ctx.lineTo(data.get(0), data.get(1));
                    break;
                default:
                    ctx.closePath();
                    break;
            }
        }
        commands.delete();
        ctx.fillStyle = 'red';
        ctx.fill();
        drawArrow(ctx, leftTriangle, 5, canvas.height - 25);
        drawArrow(ctx, rightTriangle, canvas.width - 15, canvas.height - 25);
        aAngle += .02;
        aX += 1;
        if (aX > canvas.width - 50)
            aX = -50;
        aY += 1;
        if (aY > canvas.height - 50)
            aY = -50;
        bAngle += .03;
        bX -= 1;
        if (bX < 50)
            bX = canvas.width - 50;
        bY += 1;
        if (bY > canvas.height - 50)
            bY = -50;
        ctx.fillStyle = 'white';
        ctx.fillText(texts[textIndex], canvas.width / 2, canvas.height - 10);
        requestAnimationFrame(drawCanvas);
    }
});
