import type { MovePattern } from "./Types"

class PieceMovesStorage {

    // Pawn
    private static readonly _pawnMovedVector: MovePattern = {vectors: [{x: 0, y: 1}], count: 1}
    private static readonly _pawnNotMovedVector: MovePattern = {vectors: [{x: 0, y: 1}], count: 2}
    private static readonly _pawnTakeVector: MovePattern = {vectors: [{x: -1, y: 1}, {x: 1, y: 1}], count: 1}

    // Knight
    private static readonly _knightVector: MovePattern = {vectors: [{x: -1, y: -2}, {x: 1, y: -2}, {x: 2, y: -1}, {x: 2, y: 1}, {x: 1, y: 2}, {x: -1, y: 2}, {x: -2, y: 1}, {x: -2, y: -1}], count: 1}

    // Bishop
    private static readonly _bishopVector: MovePattern = {vectors: [{x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}], count: 8}

    // Rook
    private static readonly _rookVector: MovePattern = {vectors: [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}], count: 8}

    // Queen
    private static readonly _queenVector: MovePattern = {vectors: [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}], count: 8}

    // King
    private static readonly _kingVector: MovePattern = {vectors: [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}], count: 1}
    private static readonly _kingLongCastleVector: MovePattern = {vectors: [{x: -2, y: 0}], count: 1}
    private static readonly _kingShortCastleVector: MovePattern = {vectors: [{x: 2, y: 0}], count: 1}

    private static copy(pattern: MovePattern): MovePattern {
        return { ...pattern, vectors: [...pattern.vectors] }
    }

    public static get pawnMovedVector() { return this.copy(this._pawnMovedVector) }
    public static get pawnNotMovedVector() { return this.copy(this._pawnNotMovedVector) }
    public static get pawnTakeVector() { return this.copy(this._pawnTakeVector) }
    public static get knightVector() { return this.copy(this._knightVector) }
    public static get bishopVector() { return this.copy(this._bishopVector) }
    public static get rookVector() { return this.copy(this._rookVector) }
    public static get queenVector() { return this.copy(this._queenVector) }
    public static get kingVector() { return this.copy(this._kingVector) }
    public static get kingLongCastleVector() { return this.copy(this._kingLongCastleVector) }
    public static get kingShortCastleVector() { return this.copy(this._kingShortCastleVector) }

}

export default PieceMovesStorage