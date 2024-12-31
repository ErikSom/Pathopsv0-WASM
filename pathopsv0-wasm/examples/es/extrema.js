import PathopsV0Factory from '../../dist/es/pathops.js';

PathopsV0Factory().then((PathopsV0) => {
    var { FramePath2D } = PathopsV0;
    const canvas = document.createElement('canvas');
    const target = document.getElementById('extrema');
    target.before(canvas);
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    let startAngle = Math.PI / 2;
    let endAngle = Math.PI * 5 / 3;
    let endHit = -1;
    const tryStart = 0;
    const tryEnd = 1;
    const ctrX = 200;
    const ctrY = 90;
    const radius = 80;
    let downX = 0;
    let downY = 0;
    let moveX, moveY;
    ctx.font = "16px Arial";
    ctx.textAlign = 'center';
    requestAnimationFrame(drawCanvas);

    canvas.addEventListener('mousedown', (event) => {
        const canvasBoundingRect = canvas.getBoundingClientRect();
        const scale = {
            x: canvas.width / canvasBoundingRect.width,
            y: canvas.height / canvasBoundingRect.height,
        };
        downX = (event.clientX - canvasBoundingRect.left) * scale.x;
        downY = (event.clientY - canvasBoundingRect.top) * scale.y;
        moveX = downX;
        moveY = downY;
        if (check(startAngle))
            endHit = tryStart;
        else if (check(endAngle))
            endHit = tryEnd;
        else
            endHit = -1;
    });

    document.addEventListener('mouseup', (event) => {
        endHit = -1;
    });

    document.addEventListener('mousemove', (event) => {
        if (endHit < 0)
            return;
        moveX += event.movementX;
        moveY += event.movementY;
        let newAngle = Math.atan2(moveY - ctrY, moveX - ctrX);
        if (tryStart == endHit)
            startAngle = newAngle;
        else
            endAngle = newAngle;
        requestAnimationFrame(drawCanvas);
    });

    function check(angle) {
        const pt = endPoint(angle);
        return Math.abs(downY - pt.y) <= 4 && Math.abs(downX - pt.x) <= 4;
    }

    function endPoint(angle) {
        return { x: ctrX + Math.cos(angle) * radius, y: ctrY + Math.sin(angle) * radius };
    }

    function drawEndPoint(angle) {
        const pt = endPoint(angle);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = startAngle == angle ? 'red' : endAngle == angle ? 'blue' : 'black';
        ctx.stroke();
    }

    function drawArc() {
        ctx.beginPath();
        ctx.arc(ctrX, ctrY, radius, 0, Math.PI * 2);
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'lightGray';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ctrX, ctrY, radius, startAngle, endAngle);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        drawEndPoint(startAngle);
        drawEndPoint(endAngle);
    }

    function drawExtremaBounds() {
        const colors = ['rgba(255, 0, 0, .3)', 'rgba(0, 255, 0, .3)', 'rgba(0, 0, 255, .2)'
            , 'rgba(0, 127, 127, .3)'];
        var angle = startAngle * 2 / Math.PI;
        var end = endAngle * 2 / Math.PI;
        while (angle + 4 < end)
            end -= 4;
        while (angle > end)
            end += 4;
        var colorIndex = angle < 0 ? 4 - (Math.ceil(Math.abs(angle)) % 4) : Math.floor(angle);
        while (angle < end) {
            var next = Math.ceil(angle);
            if (next == angle)
                next += 1;
            if (next > end)
                next = end;
            var startPt = endPoint(angle / 2 * Math.PI);
            var endPt = endPoint(next / 2 * Math.PI);
            const x1 = Math.min(startPt.x, endPt.x);
            const y1 = Math.min(startPt.y, endPt.y);
            const x2 = Math.max(startPt.x, endPt.x);
            const y2 = Math.max(startPt.y, endPt.y);
            ctx.fillStyle = colors[colorIndex++ % 4];
            ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            angle = next;
        }
    }

    function drawExtrema() {
        var angle = startAngle * 2 / Math.PI;
        var end = endAngle * 2 / Math.PI;
        while (angle + 4 < end)
            end -= 4;
        while (angle > end)
            end += 4;
        while (angle < end) {
            var next = Math.ceil(angle);
            if (next == angle)
                next += 1;
            if (next >= end)
                break;
            drawEndPoint(next / 2 * Math.PI);
            angle = next;
        }
    }

    function drawPath(commands) {
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
    }

    function drawCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawExtremaBounds();
        drawArc();
        drawExtrema();
        ctx.fillStyle = 'black';
        ctx.fillText("extrema", canvas.width / 2, canvas.height - 10);
    }
});
