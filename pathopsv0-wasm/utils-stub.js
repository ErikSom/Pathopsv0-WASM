const types = {
    move: 0,
    line: 1,
    quad: 2,
    cubic: 3,
    close: 4
}

function DrawPath(ctx, path, color = 'black') {
    const commands = path.toCommands();

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();

    let isFirstCommand = true;

    for(let i = 0; i < commands.size(); i++) {
        const { type: { value: type }, data } = commands.get(i);

        if (isFirstCommand && type === types.line) {
            ctx.moveTo(data.get(0), data.get(1));
            isFirstCommand = false;
            continue;
        }

        switch (type) {
            case types.move:
                ctx.moveTo(data.get(0), data.get(1));
                break;
            case types.line:
                ctx.lineTo(data.get(0), data.get(1));
                break;
            case types.quad:
                ctx.quadraticCurveTo(
                    data.get(0), data.get(1),
                    data.get(2), data.get(3)
                );
                break;
            case types.cubic:
                ctx.bezierCurveTo(
                    data.get(0), data.get(1),
                    data.get(2), data.get(3),
                    data.get(4), data.get
                );
                break;
            case types.close:
                ctx.closePath();
                break;
        }
    }
    ctx.stroke();
}
Module["DrawPath"] = DrawPath;
