class Canvas2DShapeStorage {
    public static drawArrow(pen: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, pointUp: boolean) {
        const cx = size / 2;

        pen.save();
        pen.translate(x, y);

        if (pointUp) {
            pen.translate(0, size);
            pen.scale(1, -1);
        }

        pen.fillStyle = color;

        const tipY      = 0;
        const neckY     = size * 0.45;
        const notchY    = size * 0.88;
        const base      = size;

        const headBase  = size * 0.58;
        const shaftW    = size * 0.24;

        const headLeft  = cx - headBase / 2;
        const headRight = cx + headBase / 2;
        const shaftL    = cx - shaftW / 2;
        const shaftR    = cx + shaftW / 2;

        pen.beginPath();
        pen.moveTo(cx,        tipY);
        pen.lineTo(headRight, neckY);
        pen.lineTo(shaftR,    neckY);
        pen.lineTo(shaftR,    base);
        pen.lineTo(cx,        notchY);
        pen.lineTo(shaftL,    base);
        pen.lineTo(shaftL,    neckY);
        pen.lineTo(headLeft,  neckY);
        pen.closePath();

        pen.fill();
        pen.restore();
    }

    public static drawSword(pen: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, pointUp: boolean) {
        const cx = size / 2;

        pen.save();
        pen.translate(x, y);

        if (pointUp) {
            pen.translate(0, size);
            pen.scale(1, -1);
        }

        pen.fillStyle = color;

        const tipY       = 0;
        const tipBaseY   = size * 0.14;
        const bladeBaseY = size * 0.68;
        const guardBotY  = size * 0.77;
        const handleBotY = size * 1.00;

        const bladeW  = size * 0.22;
        const guardW  = bladeW * 2.2;
        const handleW = bladeW * 0.82;

        pen.beginPath();
        pen.moveTo(cx,               tipY);
        pen.lineTo(cx + bladeW / 2,  tipBaseY);
        pen.lineTo(cx - bladeW / 2,  tipBaseY);
        pen.closePath();
        pen.fill();

        pen.fillRect(cx - bladeW / 2,  tipBaseY,   bladeW,  bladeBaseY - tipBaseY);
        pen.fillRect(cx - guardW / 2,  bladeBaseY, guardW,  guardBotY - bladeBaseY);
        pen.fillRect(cx - handleW / 2, guardBotY,  handleW, handleBotY - guardBotY);

        pen.restore();
    }
}

export default Canvas2DShapeStorage