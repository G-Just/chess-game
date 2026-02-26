import type { Board } from "./Board";
import InputManager from "./InputManager";

export class GameController {
    constructor(board: Board){

        // Click event logic
        InputManager.onClick((pos) => {
            const cell = board.grid[pos.y][pos.x];
            
            board.grid.forEach((row) =>
                row.forEach((square) => {
                    if (square?.isSelected) {
                        square.isSelected = false;
                    }
                }),
            );

            if (!cell) {
                return; // Cell is empty just ignore the click
            }

            const piece = cell; // Aliasing for clarity

            piece.isSelected = true;
        });

    }
}