function DrawPath(ctx, path, color = 'black') {
	const commands = path.toCommands();
	const commandsFixed = commands.replace(/" (\d)/g, '", $1');
	const commandsArr = JSON.parse(commandsFixed);

	ctx.strokeStyle = color;
    ctx.lineWidth = 2;

	ctx.beginPath();

    let isFirstCommand = true;

    for (let command of commandsArr) {
        const [type, ...params] = command;

        if (isFirstCommand && type === 'L') {
            ctx.moveTo(params[0], params[1]);
            isFirstCommand = false;
            continue;
        }

        switch (type) {
            case 'M':
                ctx.moveTo(params[0], params[1]);
                break;
            case 'L':
                ctx.lineTo(params[0], params[1]);
                break;
            case 'Q':
                ctx.quadraticCurveTo(
                    params[0], params[1],
                    params[2], params[3]
                );
                break;
            case 'Z':
                ctx.closePath();
                break;
        }
        isFirstCommand = false;
    }

    ctx.stroke();
}
Module["DrawPath"] = DrawPath;


