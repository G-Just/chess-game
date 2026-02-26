import { PieceTypes, Sides } from "../types/Types";
import { Piece } from "./Piece";

export class PieceFactory {
    public static pawn(side: Sides) {
        return new Piece(PieceTypes.Pawn, side);
    }
    public static knight(side: Sides) {
        return new Piece(PieceTypes.Knight, side);
    }
    public static bishop(side: Sides) {
        return new Piece(PieceTypes.Bishop, side);
    }
    public static rook(side: Sides) {
        return new Piece(PieceTypes.Rook, side);
    }
    public static queen(side: Sides) {
        return new Piece(PieceTypes.Queen, side);
    }
    public static king(side: Sides) {
        return new Piece(PieceTypes.King, side);
    }
}
