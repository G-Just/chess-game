import { Board } from "../core/Board";
import ImageManager from '../ui/ImageManager'
import InputManager from "../core/InputManager";

export class Renderer {

    private static renderBoard(board: Board, pen: CanvasRenderingContext2D): void {
        const squareSize = board.squareSize

        if(!squareSize){
            console.error('Board is not initialized or square size is not set.')
            return;
        }
        
        const { x: hoveredSquareX, y: hoveredSquareY } = InputManager.getCurrentHoveredSquare()

        for(const [rowIndex, row] of board.grid.entries()){
            for(const [squareIndex, _] of row.entries()){               

                const x = squareIndex * squareSize
                const y = rowIndex * squareSize

                // Base square
                const isBlack = (rowIndex + squareIndex) % 2 === 1;
                pen.fillStyle = isBlack ? "#b88762" : "#edd6b0";
                
                // Hovered square
                if(squareIndex === hoveredSquareX && rowIndex === hoveredSquareY){
                    pen.fillStyle = isBlack ? "#996a47" : "#d7be96";
                }

                // Active piece square
                const cell = board.grid[rowIndex][squareIndex]
                
                if(cell){
                   const piece = cell;
                   
                   if(piece.isSelected){
                        pen.fillStyle = "#994747";
                   }
                }
                
                pen.fillRect(x, y, squareSize, squareSize)
            }
        }
    }

    private static renderPieces(board: Board, pen: CanvasRenderingContext2D): void {
        
        const squareSize = board.squareSize

        if(!squareSize){
            console.error('Board is not initialized or square size is not set.')
            return;
        }

        for(const [rowIndex, row] of board.grid.entries()){
            for(const [squareIndex, square] of row.entries()){

                if(!square){
                    continue; //Empty square just continue;
                }

                const piece = square // referencing name for clarity

                const key = `${piece.type}_${piece.side}`;
                const image = ImageManager.get(key);

                const x = squareIndex * squareSize;
                const y = rowIndex * squareSize;

                pen.drawImage(image, x, y, squareSize, squareSize);
            }
        }
    }

    public static nextFrame(board: Board, pen: CanvasRenderingContext2D){
        Renderer.renderBoard(board, pen);
        Renderer.renderPieces(board, pen);
    }
}