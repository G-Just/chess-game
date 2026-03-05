import type { SquareCoords } from "../types/Types";
import Board from "./Board";

class InputManager {
    private static _mousePixelX: number = -1;
    private static _mousePixelY: number = -1;

    private static clickListeners: ((squareCoords: SquareCoords) => void)[] = [];

    public static onClick(callback: (squareCoords: SquareCoords) => void) {
        InputManager.clickListeners.push(callback);
    }

    private static pixelsToGridCoords(pixelX: number, pixelY: number): SquareCoords {
        return {
            x: Math.floor(pixelX / Board.squareSize),
            y: Math.floor(pixelY / Board.squareSize)
        }
    }

    public static getHoveredSquare(): SquareCoords {
        return InputManager.pixelsToGridCoords(InputManager._mousePixelX, InputManager._mousePixelY)
    }

    static {
        window.addEventListener("DOMContentLoaded", () => {
            const canvas = document.getElementById("chess") as HTMLCanvasElement;

            if (!canvas) {
                console.error('InputManager: Canvas element not found');
                return;
            }

            canvas.addEventListener("click", () => {
                InputManager.clickListeners.forEach(cb => cb(InputManager.getHoveredSquare()));
            });

            canvas.addEventListener("mousemove", (e: MouseEvent) => {
                InputManager._mousePixelX = e.offsetX  - Board.boardMargin;
                InputManager._mousePixelY = e.offsetY  - Board.boardMargin;
            });

            canvas.addEventListener("mouseleave", () => {
                InputManager._mousePixelX = -1;
                InputManager._mousePixelY = -1;
            });
        });
    }
}

export default InputManager