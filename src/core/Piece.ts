import type { PieceTypes, Sides } from "../types/Types";

export class Piece {
    private _type: PieceTypes
    private _side: Sides
    private _isSelected: boolean = false
    private _hasMoved: boolean = false

    constructor(type: PieceTypes, side: Sides){
        this._type = type
        this._side = side
    }

    // Getters
    get type() {
        return this._type
    }
    
    get side() {
        return this._side
    }

    get isSelected() {
        return this._isSelected
    }

    get hasMoved() {
        return this._hasMoved
    }

    // Setters
    set hasMoved(flag: boolean) {
        this._hasMoved = flag
    }

    set isSelected(flag: boolean) {
        this._isSelected = flag
    }

    // Methods
}