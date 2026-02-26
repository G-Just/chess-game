import { Board } from "./core/Board";
import { GameController } from "./core/GameController";
import { Renderer } from "./ui/Renderer";

const canvas = document.getElementById("chess") as HTMLCanvasElement;
const pen = canvas.getContext("2d")!;

const board = new Board();

board.initialize();
board.setupInitialPositions();

const game = new GameController(board);

let lastTime = 0;

function gameLoop(time: number) {
    const delta = time - lastTime;
    lastTime = time;

    update(delta);
    Renderer.nextFrame(board, pen);

    requestAnimationFrame(gameLoop);
}

function update(delta: number) {
    return delta;
}

requestAnimationFrame(gameLoop);
