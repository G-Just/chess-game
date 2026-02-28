import type { MovePattern } from "./Types"

class PieceMovesStorage {
    // Pawn
    public static readonly pawnMovedVector: MovePattern = {vectors: [{x: 1, y: 0}], count: 1}
    public static readonly pawnNotMovedVector: MovePattern = {vectors: [{x: 1, y: 0}], count: 2}
    public static readonly pawnTakeVector: MovePattern = {vectors: [{x: 1, y: -1}, {x: 1, y: 1}], count: 1}
    
    // Knight
    public static readonly knightVector: MovePattern = {vectors: [{x: -2, y: -1}, {x: -2, y: 1}, {x: -1, y: 2}, {x: 1, y: 2}, {x: 2, y: 1}, {x: 2, y: -1}, {x: 1, y: -2}, {x: -1, y: -2}], count: 1}
    
    // Bishop
    public static readonly bishopVector: MovePattern = {vectors: [{x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}], count: 8}
    
    // Rook
    public static readonly rookVector: MovePattern = {vectors: [{x: 0, y: 1}, {x: 1, y: 0}, { x: 0, y: -1 }, { x: -1, y: 0 }], count: 8}
    
    // Queen
    public static readonly queenVector: MovePattern = {vectors: [{x: 0, y: 1}, {x: 1, y: 0}, { x: 0, y: -1 }, { x: -1, y: 0 }, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}], count: 8}
    
    // King
    public static readonly kingVector: MovePattern = {vectors: [{x: 0, y: 1}, {x: 1, y: 0}, { x: 0, y: -1 }, { x: -1, y: 0 }, {x: -1, y: 1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: -1}], count: 1}
}

export default PieceMovesStorage