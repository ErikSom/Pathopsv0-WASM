import PathopsV0Factory from '../../dist/es/pathops.js';

PathopsV0Factory().then((PathopsV0) => {
    var { FramePath2D } = PathopsV0;
    const canvas = document.createElement('canvas');
    const target = document.getElementById('tangent');
    target.before(canvas);
    canvas.width = 400;
    canvas.height = 200;
    var ctx = canvas.getContext('2d');
    var t = 0.5;
    var nextT = 0.5;
    var tan = tangent();
    ctx.font = "16px Arial";
    ctx.textAlign = 'left';
    requestAnimationFrame(drawCanvas);

    let dragging = false;
    canvas.addEventListener('pointerdown', (event) => {
        dragging = true;
        event.preventDefault();
    });
    canvas.addEventListener('pointerup', (event) => {
        dragging = false;
        event.preventDefault();
    });


    canvas.addEventListener('pointermove', (event) => {
        if (!dragging)
            return;

        const canvasBoundingRect = canvas.getBoundingClientRect();
        const scale = {
            x: canvas.width / canvasBoundingRect.width,
            y: canvas.height / canvasBoundingRect.height,
        };
        const x = (event.clientX - canvasBoundingRect.left) * scale.x;
        const y = (event.clientY - canvasBoundingRect.top) * scale.y;
        if (y < canvas.height - 25)
            return;
        nextT = x < 40 ? 0 : x < 160 ? (x - 40) / 120 : 1;
        requestAnimationFrame(drawCanvas);

        event.preventDefault();
    });

    function drawAxes() {
        ctx.beginPath();
        ctx.moveTo(300, 40);
        ctx.lineTo(300, 160);
        ctx.moveTo(240, 100);
        ctx.lineTo(360, 100);
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    function drawAxisArrow() {
        var arrow = new FramePath2D();
        arrow.moveTo(300, 100);
        arrow.rLineTo(tan.dx, tan.dy);
        const scale = 10;
        const ax = tan.dx / scale;
        const ay = tan.dy / scale;
        arrow.rLineTo(-ax + ay / 2, -ay - ax / 2);
        arrow.rLineTo(ax / 2 - ay / 2, ay / 2 + ax / 2);
        arrow.rLineTo(-ax / 2 - ay / 2, -ay / 2 + ax / 2);
        arrow.lineTo(300 + tan.dx, 100 + tan.dy);
        const commands = arrow.toCommands();
        drawPath(commands);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    function drawArc() {
        ctx.beginPath();
        ctx.moveTo(40, 160);
        ctx.arcTo(40, 40, 160, 40, 120);
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'black';
        ctx.stroke();
        const angle = -Math.PI / 2 * t;
        const tx = 160 - Math.cos(angle) * 120;
        const ty = 160 + Math.sin(angle) * 120;
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + tan.dx, ty + tan.dy);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    function tangent() {
        const angle = -Math.PI / 2 * t;
        return { dx: -Math.sin(angle) * 40, dy: -Math.cos(angle) * 40 };
    }

    function tControl() {
        ctx.beginPath();
        ctx.moveTo(40, 180);
        ctx.lineTo(160, 180);
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(40 + t * 120, 180, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = 'red';
        ctx.stroke();
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
        tan = tangent();
        drawAxes();
        drawAxisArrow();
        drawArc();
        tControl();
        ctx.fillStyle = 'black';
        ctx.fillText("t " + t.toFixed(2), 180, canvas.height - 10);
        if (nextT == t)
            return;
        let tStep = nextT - t;
        if (tStep > .01)
            tStep = .01;
        else if (tStep < -.01)
            tStep = -.01;
        t += tStep;
        requestAnimationFrame(drawCanvas);
    }
});
