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

    private _whiteCapturedPieces: Piece[] = []
    private _blackCapturedPieces: Piece[] = []

    private _isProcessingMove: boolean = false

    constructor(){
        InputManager.onClick((squareCoords: SquareCoords) => {
            this._handleClick(squareCoords);
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

    // #endregion

    // #region Setters

    // #endregion

    // #region Methods

    private _handleClick(squareCoords: SquareCoords): void {
        if (this._isProcessingMove) return;

        if (this._selectedSquare && this._tryExecuteMove(squareCoords)) return;
        
        this._clearSelection();
        this._trySelectPiece(squareCoords);
    }

    private _tryExecuteMove(squareCoords: SquareCoords): boolean {
        const validMove = this._activePieceValidMoves.find(m => coordsEqual(m, squareCoords));
        if (!validMove) return false;

        // Adding some debouncing logic to avoid instantly selecting after moving/capturing
        this._isProcessingMove = true;
        setTimeout(() => this._isProcessingMove = false, 100);

        const capturedPiece = MoveManager.movePiece(this._selectedSquare!, validMove);
        if (capturedPiece) this._storeCapturedPiece(capturedPiece);

        this._startNextTurn();
        return true;
    }

    private _trySelectPiece(squareCoords: SquareCoords): void {
        const piece = Board.getSquare(squareCoords);
        if (!piece || piece.side !== this._currentSideTurn) return;

        piece.isSelected = true;
        this._selectedSquare = squareCoords;
        this._activePieceValidMoves = MoveValidator.getValidMoves(squareCoords);
    }

    private _clearSelection(): void {
        Board.forEachSquare((_, piece) => {
            if (piece?.isSelected) piece.isSelected = false;
        });
        this._activePieceValidMoves = [];
        this._selectedSquare = null;
    }

    private _storeCapturedPiece(piece: Piece): void {
        piece.side === Sides.White
            ? this._blackCapturedPieces.push(piece)
            : this._whiteCapturedPieces.push(piece);

        console.log(this._blackCapturedPieces)
        console.log(this._whiteCapturedPieces)
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