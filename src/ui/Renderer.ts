import Board from "../core/Board";
import ImageManager from '../ui/ImageManager'
import InputManager from "../core/InputManager";
import { MoveType, PieceTypes, Sides, type SquareCoords, type ValidMove } from "../types/Types";
import type { Piece } from "../core/Piece";
import GameController from "../core/GameController";

export class Renderer {

    private static _renderBoard(pen: CanvasRenderingContext2D): void {
        const squareSize = Board.squareSize

        if(!squareSize){
            console.error('Board is not initialized or square size is not set.')
            return;
        }
        
        // Intentionaly inverted x and y to adhere to (x left right, y up down) scheme
        const { y: hoveredSquareX, x: hoveredSquareY } = InputManager.getHoveredSquare()

        Board.forEachSquare((squareCoords: SquareCoords, piece: Piece | null) => {

            const x = squareCoords.x * squareSize
            const y = squareCoords.y * squareSize
            
            // Base square
            const isBlack = (squareCoords.x + squareCoords.y) % 2 === 1;
            pen.fillStyle = isBlack ? "#b88762" : "#edd6b0";
            
            // Hovered square
            if(squareCoords.y === hoveredSquareX && squareCoords.x === hoveredSquareY){
                pen.fillStyle = isBlack ? "#a47a59" : "#c9af85";
            }
            
            if(piece){               
                if(piece.isSelected || piece.isDragging){
                    pen.fillStyle = "#994747";
                }
            }
            
            // Render the square
            pen.fillRect(x, y, squareSize, squareSize)
            
            // TEMP:
            pen.textBaseline = 'top';
            pen.fillStyle = 'blue'
            pen.fillText(`${squareCoords.x}-${squareCoords.y}`, x, y, squareSize)
        });
    }

    private static _renderValidMoves(validMoves: ValidMove[], pen: CanvasRenderingContext2D): void{
        
        const squareSize = Board.squareSize

        if(!validMoves.length || !squareSize){
            return;
        }

        for (const validMove of validMoves){
                       
            pen.strokeStyle = validMove.moveType === MoveType.Move ? 'green' : 'red';
            pen.lineWidth = 5
            const offeset = 10
            const x = validMove.x * squareSize + offeset
            const y = validMove.y * squareSize + offeset

            pen.strokeRect(x, y, squareSize - offeset * 2, squareSize - offeset * 2)
        }
    }

    private static _renderPieces(pen: CanvasRenderingContext2D): void {
        
        const squareSize = Board.squareSize

        if(!squareSize){
            console.error('Board is not initialized or square size is not set.')
            return;
        }

        Board.forEachSquare((squareCoords: SquareCoords, piece: Piece | null) => {

            if(piece){
                const key = `${piece.type}_${piece.side}`;
                const image = ImageManager.get(key);

                const x = squareCoords.x * squareSize;
                const y = squareCoords.y * squareSize;

                pen.drawImage(image, x, y, squareSize, squareSize);
            }
        });
    }

    private static _drawBoardCoordinates(pen: CanvasRenderingContext2D){
        const xCoords = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        const yCoords = ['1', '2', '3', '4', '5', '6', '7', '8'];

        const margin = Board.boardMargin
        const squareSize = Board.squareSize
        const boardSize = Board.boardSize * squareSize

        pen.fillStyle = 'black'
        pen.imageSmoothingEnabled = true;
        pen.textAlign = 'center';
        pen.textBaseline = 'middle';
        pen.font = "15px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

        xCoords.forEach((coord, index) => {
            const x = index * squareSize + squareSize / 2;
            const y = boardSize + margin / 3;
            pen.fillText(coord, x, y)
        })

        yCoords.forEach((coord, index) => {
            const x = -margin / 3;
            const y = boardSize - index * squareSize - squareSize / 2;
            pen.fillText(coord, x, y)
        })
    }

    private static _drawCapturedPieces(pen: CanvasRenderingContext2D): void {
        const whiteCaptured = GameController.whiteCapturedPieces.sort((a, b) => b.scoreValue - a.scoreValue);
        const blackCaptured = GameController.blackCapturedPieces.sort((a, b) => b.scoreValue - a.scoreValue);

        const pieceSize = Board.squareSize / 2;
        const boardSize = Board.boardSize * Board.squareSize

        whiteCaptured.forEach((piece, index) => {
            const image = ImageManager.get(`${piece.type}_${piece.side}`);
            const y = (Board.boardMargin * 2 + boardSize) - pieceSize;
            pen.drawImage(image, index * pieceSize, y, pieceSize, pieceSize);
        });

        blackCaptured.forEach((piece, index) => {
            const image = ImageManager.get(`${piece.type}_${piece.side}`);
            pen.drawImage(image, index * pieceSize, 0, pieceSize, pieceSize);
        });
    }

    public static nextFrame(pen: CanvasRenderingContext2D){

        const canvas = pen.canvas;
        pen.clearRect(0, 0, canvas.width, canvas.height);

        Renderer._drawCapturedPieces(pen);

        pen.save();
        pen.translate(Board.boardMargin, Board.boardMargin);

        Renderer._renderBoard(pen);
        Renderer._renderPieces(pen);
        Renderer._drawBoardCoordinates(pen);

        const validMoves = GameController.activePieceValidMoves
        if(validMoves){
            Renderer._renderValidMoves(validMoves, pen)
        }

        pen.restore();
    }
}