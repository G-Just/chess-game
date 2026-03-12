export enum PieceTypes {
  Pawn = "Pawn",
  Knight = "Knight",
  Bishop = "Bishop",
  Rook = "Rook",
  Queen = "Queen",
  King = "King"
}

export enum Sides {
  White = "White",
  Black = "Black"
}

export enum CastleSides {
    Short = "Short",
    Long = "Long"
}

export enum MoveType {
    Capture = 'Capture',
    Move = 'Move'
}

export type SquareCoords = {
    x: number,
    y: number
}

export type ValidMove = {
    x: number,
    y: number
    moveType: MoveType
}

export type MovePattern = {
    vectors: { x: number; y: number }[];
    count: number;
};