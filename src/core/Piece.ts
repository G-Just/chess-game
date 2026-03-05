import { PieceTypes, type Sides } from "../types/Types";

export class Piece {
    private _type: PieceTypes
    private _scoreValue: number = Infinity;
    private _side: Sides
    private _isSelected: boolean = false
    private _isDragging: boolean = false
    private _hasMoved: boolean = false

    constructor(type: PieceTypes, side: Sides){
        this._type = type
        this._side = side

        switch (this._type) {
            case PieceTypes.Pawn:
                this._scoreValue = 1;
                break;
            case PieceTypes.Knight:
            case PieceTypes.Bishop:
                this._scoreValue = 3;
                break;
            case PieceTypes.Rook:
                this._scoreValue = 5;
                break;
            case PieceTypes.Queen:
                this._scoreValue = 9;
                break;
            case PieceTypes.King:
                this._scoreValue = Infinity;
                break;
            default:
                this._scoreValue = Infinity;
        }
    }

    // #region Getters

    get type() {
        return this._type
    }
    
    get side() {
        return this._side
    }

    get isDragging() {
        return this._isDragging
    }

    get isSelected() {
        return this._isSelected
    }

    get hasMoved() {
        return this._hasMoved
    }

    get scoreValue() {
        return this._scoreValue
    }

    // #endregion

    // #region Setters

    set hasMoved(flag: boolean) {
        this._hasMoved = flag
    }

    set isSelected(flag: boolean) {
        this._isSelected = flag
    }

    // #endregion

    // #region Methods

    // #endregion
}