import { MoveType, Sides, type SquareCoords, type ValidMove } from "../types/Types";
import type { Board } from "./Board";
import InputManager from "./InputManager";
import MoveManager from "./MoveManager";
import MoveValidator from "./MoveValidator";
import type { Piece } from "./Piece";

export class GameController {

    private _currentSideTurn: Sides = Sides.White
    private _whiteCapturedPieces: Piece[] = []
    private _blackCapturedPieces: Piece[] = []

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
            
            const selectedPiceCoords = MoveValidator.getCurrentlySelectedPieceCoords
            const selectedPiceValidMoves = MoveValidator.getCurrentlySelectedPieceValidMoves
            
            console.log('selectedPiceCoords', selectedPiceCoords)
            console.log('selectedPiceValidMoves', selectedPiceValidMoves)
            console.log('pos', pos)
            console.log('====')

            if(selectedPiceCoords &&
                selectedPiceValidMoves?.some((validMove: ValidMove) => {
                    if(validMove.y === pos.x && validMove.y === pos.y){
                        validMove.moveType === MoveType.Move ? 
                            MoveManager.movePiece(board, selectedPiceCoords, pos) :
                            MoveManager.capturePiece(board, selectedPiceCoords, pos)
                    }
                })
            ){
                return;
            }
            
            if (!cell) {
                // Cell is empty and not a valid move so clear the current available moves
                MoveValidator.clearCachedPieceMoveData(); 
                return; 
            }

            const piece = cell; // Aliasing for clarity

            if(this._currentSideTurn === piece.side){
                piece.isSelected = true;
            }

        });

    }
}