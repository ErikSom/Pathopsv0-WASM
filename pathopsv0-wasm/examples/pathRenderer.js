const CURVE_TYPES = {
    move: 0,
    line: 1,
    quad: 2,
    cubic: 3,
    close: 4
}

class PathRendererClass {
    constructor() {
        this.canvas;
        this.ctx;
        this.scale = 1;
        this.usedTextAreas = [];
    }

    init(width, height, backgroundColor = 'transparent') {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.scale = window.devicePixelRatio > 1 ? 2 : 1;
        this.canvas.width = width * this.scale;
        this.canvas.height = height * this.scale;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.style.backgroundColor = backgroundColor;
        this.ctx.scale(this.scale, this.scale);
    }

    translate(x, y) {
        this.ctx.translate(x, y);
    }

    clearTransform() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawGrid(step = 10, color = 'lightgray') {
        const transform = this.ctx.getTransform();
        const width = this.canvas.width / this.scale;
        const height = this.canvas.height / this.scale;

        const topLeft = transform.invertSelf().transformPoint(new DOMPoint(0, 0));
        const bottomRight = transform.invertSelf().transformPoint(new DOMPoint(width, height));

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;

        const startX = Math.floor(topLeft.x / step) * step;
        const endX = Math.ceil(bottomRight.x / step) * step;
        const startY = Math.floor(topLeft.y / step) * step;
        const endY = Math.ceil(bottomRight.y / step) * step;

        for(let x = startX; x <= endX; x += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, startY);
            this.ctx.lineTo(x, endY);
            this.ctx.stroke();
        }

        for(let y = startY; y <= endY; y += step) {
            this.ctx.beginPath();
            this.ctx.moveTo(startX, y);
            this.ctx.lineTo(endX, y);
            this.ctx.stroke();
        }
    }

    drawPath(path, options = {}) {
        options = {...{fill: 'black', fillOpacity: 0.4, stroke: 'black', strokeWidth: 1}, ...options};
        const commands = path.toCommands();

        this.ctx.beginPath();

        let isFirstCommand = true;

        const bounds = {
            minX: Infinity,
            minY: Infinity,
            maxX: -Infinity,
            maxY: -Infinity
        };

        for(let i = 0; i < commands.size(); i++) {
            const { type: { value: type }, data } = commands.get(i);

            for(let j = 0; j < data.size(); j += 2) {
                const x = data.get(j);
                const y = data.get(j + 1);
                bounds.minX = Math.min(bounds.minX, x);
                bounds.minY = Math.min(bounds.minY, y);
                bounds.maxX = Math.max(bounds.maxX, x);
                bounds.maxY = Math.max(bounds.maxY, y);
            }


            if (isFirstCommand && type === CURVE_TYPES.line) {
                this.ctx.moveTo(data.get(0), data.get(1));
                continue;
            }

            switch (type) {
                case CURVE_TYPES.move:
                    this.ctx.moveTo(data.get(0), data.get(1));
                    break;
                case CURVE_TYPES.line:
                    this.ctx.lineTo(data.get(0), data.get(1));
                    break;
                case CURVE_TYPES.quad:
                    this.ctx.quadraticCurveTo(
                        data.get(0), data.get(1),
                        data.get(2), data.get(3)
                    );
                    break;
                case CURVE_TYPES.cubic:
                    this.ctx.bezierCurveTo(
                        data.get(0), data.get(1),
                        data.get(2), data.get(3),
                        data.get(4), data.get(5)
                    );
                    break;
                case CURVE_TYPES.close:
                    this.ctx.closePath();
                    break;
            }
            isFirstCommand = false;
        }

        if(options.label) {
            const metrics = this.ctx.measureText(options.label);
            const textWidth = metrics.width;
            const textHeight = parseInt(this.ctx.font);
            const padding = 5;

            const positions = this.calculateLabelPositions(bounds, textWidth, textHeight, padding);

            for (const pos of positions) {
                const area = {
                    x: pos.x - padding,
                    y: pos.y - textHeight - padding,
                    width: textWidth + padding * 2,
                    height: textHeight + padding * 2
                };

                if (!this.checkTextOverlap(area.x, area.y, area.width, area.height)) {
                    this.usedTextAreas.push(area);
                    this.drawText(options.label, pos.x, pos.y, options.fill);
                    break;
                }
            }
        }

        if(options.fill){
            this.ctx.fillStyle = options.fill;
            this.ctx.globalAlpha = options.fillOpacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
        if(options.stroke){
            this.ctx.strokeStyle = options.stroke;
            this.ctx.lineWidth = options.strokeWidth;
            this.ctx.stroke();
        }
    }

    calculateLabelPositions(bounds, textWidth, textHeight, padding = 5) {
        const { minX, minY, maxX, maxY } = bounds;
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        // Return top, bottom, left, right positions
        return [
            {
                x: centerX - textWidth / 2,
                y: minY - padding,
            },
            {
                x: centerX - textWidth / 2,
                y: maxY + textHeight + padding,
            },
            {
                x: minX - textWidth - padding,
                y: centerY + textHeight / 2,
            },
            {
                x: maxX + padding,
                y: centerY + textHeight / 2,
            }
        ];
    }

    checkTextOverlap(x, y, width, height) {
        for (const area of this.usedTextAreas) {
            if (!(x + width < area.x || x > area.x + area.width ||
                  y + height < area.y || y > area.y + area.height)) {
                return true;
            }
        }
        return false;
    }

    drawText(text, x, y, color = 'black', font = '12px sans-serif') {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    clearPaths() {
        this.ctx.clearRect(0, 0, this.canvas.width / this.scale, this.canvas.height / this.scale);
        this.usedTextAreas = [];
    }
}

const PathRenderer = new PathRendererClass();
