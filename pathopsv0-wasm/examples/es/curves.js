import PathopsV0Factory from '../../dist/es/pathops.js';

PathopsV0Factory().then((PathopsV0) => {
    const { FramePath2D } = PathopsV0;
    const canvas = document.createElement('canvas');
    const target = document.getElementById('curves');
    target.before(canvas);
    canvas.width = 720;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    let startAngle = Math.PI / 2;
    let endAngle = Math.PI * 5 / 3;
    let endHit = -1;
    const tryStart = 0;
    const tryEnd = 1;
    const ctrX = 90;
    const ctrY = 90;
    const radius = 80;
    let downX = 0;
    let downY = 0;
    let moveX, moveY;
    let curves = 1;
    ctx.font = "16px Arial";
    requestAnimationFrame(drawCanvas);

    canvas.addEventListener('pointerdown', (event) => {
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

    document.addEventListener('pointerup', (event) => {
        endHit = -1;
    });

    document.addEventListener('pointermove', (event) => {
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

    function drawEndPoint(angle, ptIndex) {
        const pt = endPoint(angle);
        drawPoint(pt.x, pt.y, ptIndex);
    }

    function drawPoint(x, y, ptIndex) {
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 0 == ptIndex ? 'red' : curves == ptIndex ? 'blue' : 'black';
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.font = "14px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(String.fromCharCode("A".charCodeAt(0) + ptIndex), x, y + 5);
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
        drawEndPoint(startAngle, 0);
    }

    function drawExtrema() {
        var angle = startAngle * 2 / Math.PI;
        var end = endAngle * 2 / Math.PI;
        while (angle + 4 < end)
            end -= 4;
        while (angle > end)
            end += 4;
        var ptIndex = 1;
        while (angle < end) {
            var next = Math.ceil(angle);
            if (next == angle)
                next += 1;
            if (next >= end) {
                drawEndPoint(endAngle, ptIndex++);
                break;
            }
            drawEndPoint(next / 2 * Math.PI, ptIndex++);
            angle = next;
        }
        curves = ptIndex - 1;
    }

    function drawCurveBox(index) {
        const x = ctrX + 120 + index * 80;
        ctx.fillStyle = 'white';
        ctx.fillRect(x, 40, 50, 90);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x, 40, 50, 90);
        ctx.beginPath();
        ctx.moveTo(x, 70);
        ctx.lineTo(x + 50, 70);
        ctx.moveTo(x, 100);
        ctx.lineTo(x + 50, 100);
        ctx.stroke();
        drawPoint(x + 25, 55, index);
        drawPoint(x + 25, 85, index + 1);
    }

    function drawLabel(label, y) {
        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.moveTo(230, y);
        ctx.lineTo(190 + curves * 80, y);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.font = "14px Arial";
        ctx.textAlign = 'left';
        ctx.fillText(label, 200 + curves * 80, y + 5);
    }

    function drawCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawArc();
        drawExtrema();
        drawLabel('start point', 55);
        drawLabel('end point', 85);
        drawLabel('caller data', 115);
        for (var i = 0; i < curves; ++i)
            drawCurveBox(i);
        ctx.fillStyle = 'black';
        ctx.font = "16px Arial";
        ctx.textAlign = 'center';
        ctx.fillText("curves", 396, canvas.height - 10);
    }
});
