function toMB(bytes) {
	return (bytes / 1048576).toFixed(4);
}

export function drawMemoryUsage(module, ctx, dpr = 1) {
	const fontSize = 12 * dpr;
	const padding = 6 * dpr;

	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = 'rgba(230, 230, 230, 1)';

	const memoryStats = module.GetMemoryStats();

	const allocated = `${toMB(memoryStats.allocatedSpace)} MB`;
	const free = `${toMB(memoryStats.freeSpace)} MB`;
	const total = `${toMB(memoryStats.totalSpace)} MB`;

	let maxWidth = 0;
	[allocated, free, total].forEach((text) => {
		const width = ctx.measureText(text).width;
		maxWidth = Math.max(maxWidth, width);
	});

	const lines = 4;

	const x = ctx.canvas.width - padding;
	let y = ctx.canvas.height - fontSize * lines + fontSize / 2;

	const allocatedText = 'Allocated:';
	const allocatedSize = ctx.measureText(allocatedText).width;

	const totalWidth = maxWidth + padding + allocatedSize;
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect(x - totalWidth - padding, y - fontSize, totalWidth + padding * 2, fontSize * lines + padding);

	const currentAlign = ctx.textAlign;

	ctx.fillStyle = 'rgba(160, 160, 160, 1)';
	ctx.textAlign = 'right';
	ctx.fillText('WASM Memory', x, y);
	ctx.fillStyle = 'rgba(230, 230, 230, 1)';
	y += fontSize;
	ctx.fillText(allocated, x, y);
	ctx.fillText(allocatedText, x-maxWidth - padding, y);
	y += fontSize;
	ctx.fillText(free, x, y);
	ctx.fillText('Free:', x-maxWidth - padding, y);
	y += fontSize;
	ctx.fillText(total, x, y);
	ctx.fillText('Total:', x-maxWidth - padding, y);

	ctx.textAlign = currentAlign;
}
