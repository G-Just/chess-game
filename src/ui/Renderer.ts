import { Board } from "../core/Board";
import ImageManager from '../ui/ImageManager'
import InputManager from "../core/InputManager";
import MoveValidator from "../core/MoveValidator";
import { MoveType, PieceTypes, Sides, type SquareCoords, type ValidMove } from "../types/Types";
import type { Piece } from "../core/Piece";

export class Renderer {

    private static renderBoard(board: Board, pen: CanvasRenderingContext2D): void {
        const squareSize = board.squareSize

        if(!squareSize){
            console.error('Board is not initialized or square size is not set.')
            return;
        }
        
        const { x: hoveredSquareX, y: hoveredSquareY } = InputManager.getCurrentHoveredSquare()

        for(const [rowIndex, row] of board.grid.entries()){
            for(const [squareIndex, square] of row.entries()){

                const x = squareIndex * squareSize
                const y = rowIndex * squareSize

                // Base square
                const isBlack = (rowIndex + squareIndex) % 2 === 1;
                pen.fillStyle = isBlack ? "#b88762" : "#edd6b0";
                
                // Hovered square
                if(squareIndex === hoveredSquareX && rowIndex === hoveredSquareY){
                    pen.fillStyle = isBlack ? "#996a47" : "#d7be96";
                }
                
                if(square){
                   const piece = square;
                   
                   if(piece.isSelected || piece.isDragging){
                       pen.fillStyle = "#994747";
                   }
                }
                
                // Render the square
                pen.fillRect(x, y, squareSize, squareSize)
                
                // TEMP:
                pen.textBaseline = 'top';
                pen.fillStyle = 'blue'
                pen.fillText(`${rowIndex}-${squareIndex}`, x, y, squareSize)
            }
        }
    }

    private static renderAvailableMovesForSelected(board: Board, pen: CanvasRenderingContext2D): void {
        const squareSize = board.squareSize

        if(!squareSize){
            console.error('Board is not initialized or square size is not set.')
            return;
        }
        
        for(const [rowIndex, row] of board.grid.entries()){
            for(const [squareIndex, square] of row.entries()){

                if(square){
                   const piece = square;
                   
                   if(piece.isSelected || piece.isDragging){
                        Renderer.renderValidMoves(board, piece, {x: rowIndex, y: squareIndex}, pen)
                    }
                }

            }
        }
    }

    // TODO: figure out a way to not check the valid moves for each draw frame, 
    // and track if the last checked piece changed if not just skip this logic
    private static renderValidMoves(board: Board, piece: Piece, origin: SquareCoords, pen: CanvasRenderingContext2D): void{
        const squareCoords: SquareCoords = {x: origin.x, y: origin.y}

        let validMoves;

        const currentPieceCoords = MoveValidator.getCurrentlySelectedPieceCoords
        if(currentPieceCoords &&
            currentPieceCoords.x === squareCoords.x &&
            currentPieceCoords.y === squareCoords.y
        ){
            // Cache the valid moves to not call the validator logic each frame
            validMoves = MoveValidator.getCurrentlySelectedPieceValidMoves;
        } else {
            switch (piece.type) {
                case PieceTypes.Pawn:
                    validMoves = MoveValidator.getValidPawnMoves(squareCoords, board)
                    break;
                case PieceTypes.Knight:
                    validMoves = MoveValidator.getValidKnightMoves(squareCoords, board)
                    break;
                case PieceTypes.Bishop:
                    validMoves = MoveValidator.getValidBishopMoves(squareCoords, board)
                    break;
                case PieceTypes.Rook:
                    validMoves = MoveValidator.getValidRookMoves(squareCoords, board)
                    break;
                case PieceTypes.Queen:
                    validMoves = MoveValidator.getValidQueenMoves(squareCoords, board)
                    break;
                case PieceTypes.King:
                    validMoves = MoveValidator.getValidKingMoves(squareCoords, board)
                    break;
                default:
                    break;
            }
        }

        
        const squareSize = board.squareSize

        if(!validMoves || !squareSize){
            return;
        }

        // const margin = squareSize * 0.8;
        // const pointUp = piece.side === Sides.White ? true : false
        for (const validMove of validMoves){
            
            // const x = validMove.y * squareSize + margin
            // const y = validMove.x * squareSize + margin
            // const size = squareSize - margin * 2;
            // pen.globalAlpha = 0.4
            // validMove.moveType === MoveType.Move ?
            // Canvas2DShapeStorage.drawArrow(pen, x, y, size, 'green', pointUp) : 
            // Canvas2DShapeStorage.drawSword(pen, x, y, size, 'red', pointUp)
            // pen.globalAlpha = 1
            
            pen.strokeStyle = validMove.moveType === MoveType.Move ? 'green' : 'red';
            pen.lineWidth = 5
            const offeset = 10
            const x = validMove.y * squareSize + offeset
            const y = validMove.x * squareSize + offeset

            pen.strokeRect(x, y, squareSize - offeset * 2, squareSize - offeset * 2)
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
        Renderer.renderAvailableMovesForSelected(board, pen);
    }
}