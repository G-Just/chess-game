import { type SquareCoords } from "../types/Types";
import Board from "./Board";
import type { Piece } from "./Piece";

class MoveManager {

    public static movePiece(moveFrom: SquareCoords, moveTo: SquareCoords) : Piece | null{
        const piece = Board.getSquare(moveFrom)

        if(piece) piece.hasMoved = true;

        const target = Board.getSquare(moveTo)
        
        Board.setPiece(moveTo, piece)

        Board.setPiece(moveFrom, null)

        return target
    }
}

export default MoveManager