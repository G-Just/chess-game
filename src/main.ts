import Board from "./core/Board";
import GameController from "./core/GameController";
import { Renderer } from "./ui/Renderer";

const canvas = document.getElementById("chess") as HTMLCanvasElement;
const pen = canvas.getContext("2d")!;

const resetButton = document.getElementById("reset") as HTMLButtonElement;

resetButton.addEventListener("click", () => {
    Board.setInitialPositions()
});

Board.setInitialPositions()

canvas.width = 800
canvas.height = 800

// Not sure if this helps but it should scale the canvas renderings better for the current screen size
const dpr = window.devicePixelRatio || 1;
const cssSize = 800;
canvas.style.width = `${cssSize}px`;
canvas.style.height = `${cssSize}px`;
canvas.width = cssSize * dpr;
canvas.height = cssSize * dpr;
pen.scale(dpr, dpr);

let lastTime = 0;

function gameLoop(time: number) {
    const delta = time - lastTime;
    lastTime = time;

    update(delta);
    Renderer.nextFrame(pen);

    requestAnimationFrame(gameLoop);
}

function update(delta: number) {
    return delta;
}

requestAnimationFrame(gameLoop);
