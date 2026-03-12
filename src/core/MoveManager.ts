import { CastleSides, Sides, type SquareCoords } from "../types/Types";
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

    public static castle(side: Sides, castleSide: CastleSides): Boolean {
        const y = side === Sides.White ? 7 : 0;
        const kingX = 4;
        const rookX = castleSide === CastleSides.Short ? 7 : 0

        const kingPiece = Board.getSquare({x: kingX, y})
        const rookPiece = Board.getSquare({x: rookX, y})

        Board.setPiece({x: kingX, y}, null)
        Board.setPiece({x: rookX, y}, null)
        
        const kingTargetX = kingX + (castleSide === CastleSides.Short ? 2 : -2)
        const rookTargetX = rookX + (castleSide === CastleSides.Short ? -2 : 3)

        Board.setPiece({x: kingTargetX, y}, kingPiece)
        Board.setPiece({x: rookTargetX, y}, rookPiece)

        return true;
    }
}

export default MoveManager