import { Sides, type SquareCoords, type ValidMove } from "../types/Types";
import { coordsEqual } from "../utils/Helpers";
import Board from "./Board";
import InputManager from "./InputManager";
import MoveManager from "./MoveManager";
import MoveValidator from "./MoveValidator";
import type { Piece } from "./Piece";

class GameController {

    private _currentSideTurn: Sides = Sides.White

    private _activePieceValidMoves: ValidMove[] = []; 
    private _selectedSquare: SquareCoords | null = null;
    private _currentDraggingPiece: Piece | null = null;

    private _whiteCapturedPieces: Piece[] = []
    private _blackCapturedPieces: Piece[] = []

    constructor(){
        InputManager.onMouseDown((squareCoords: SquareCoords) => {
            this._handleDrag(squareCoords);
        });

        InputManager.onMouseUp((squareCoords: SquareCoords) => {
            if (!this._currentDraggingPiece) {
                this._handleClick(squareCoords);
            } else {
                this._handleReleaseDragging(squareCoords);
            }
        });
    }

    // #region Getters

    get activePieceValidMoves(): ValidMove[] {
        return this._activePieceValidMoves;
    }

    get currentSideTurn(): Sides {
        return this._currentSideTurn;
    }

    get whiteCapturedPieces(): Piece[] {
        return this._whiteCapturedPieces;
    }
    
    get blackCapturedPieces(): Piece[] {
        return this._blackCapturedPieces;
    }

    get currentDraggingPiece(): Piece | null {
        return this._currentDraggingPiece;
    }

    // #endregion

    // #region Setters

    // #endregion

    // #region Methods

    private _handleClick(squareCoords: SquareCoords): void {
        if (this._selectedSquare && this._tryExecuteMove(squareCoords)) return;
        
        this._clearSelection();
        this._trySelectPiece(squareCoords);
    }
    
    private _handleDrag(squareCoords: SquareCoords): void {
        const piece = this._trySelectPiece(squareCoords);
        
        if (!piece) return;
        
        this._currentDraggingPiece = piece;
        piece.isDragging = true;
    }

    private _handleReleaseDragging(squareCoords: SquareCoords): void {
        if (!this._tryExecuteMove(squareCoords)) {
            this._currentDraggingPiece!.isDragging = false;
            this._currentDraggingPiece = null;
        }
    }

    private _tryExecuteMove(squareCoords: SquareCoords): boolean {
        const validMove = this._activePieceValidMoves.find(m => coordsEqual(m, squareCoords));
        if (!validMove) return false;

        const capturedPiece = MoveManager.movePiece(this._selectedSquare!, validMove);
        if (capturedPiece) this._storeCapturedPiece(capturedPiece);

        this._startNextTurn();
        return true;
    }

    private _trySelectPiece(squareCoords: SquareCoords): Piece | null {
        const piece = Board.getSquare(squareCoords);
        if (!piece || piece.side !== this._currentSideTurn) return null;

        piece.isSelected = true;
        this._selectedSquare = squareCoords;
        this._activePieceValidMoves = MoveValidator.getValidMoves(squareCoords);
        return piece
    }

    private _clearSelection(): void {
        
        Board.forEachSquare((_, piece) => {
            if(piece){
                piece.isSelected = false;
                piece.isDragging = false;
            }
        });

        this._activePieceValidMoves = [];
        this._currentDraggingPiece = null;
        this._selectedSquare = null;
    }

    private _storeCapturedPiece(piece: Piece): void {
        piece.side === Sides.White
            ? this._blackCapturedPieces.push(piece)
            : this._whiteCapturedPieces.push(piece);
    }

    private _startNextTurn(): void{
        this._currentSideTurn === Sides.White
            ? this._currentSideTurn = Sides.Black
            : this._currentSideTurn = Sides.White
 
        this._clearSelection()        
    }

    // #endregion
}

export default new GameController();