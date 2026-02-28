import { MoveType, PieceTypes, Sides, type SquareCoords, type ValidMove } from "../types/Types.ts";
import type { Board } from "./Board.ts";
import PieceMovesStorage from '../types/PieceMovesStorage.ts'
import type { Piece } from "./Piece.ts";

class MoveValidator {

    private static getPieceOrNull(squareCoords: SquareCoords, board: Board, pieceType: PieceTypes): Piece | null {
        const piece = board.grid[squareCoords.x][squareCoords.y]

        if(!piece || piece.type !== pieceType){
            console.error(`${pieceType} move validation called on non-pawn piece. Coordinates:`, squareCoords)
            return null;
        }

        return piece;
    }

    private static getOnlyValidMoves(validMoveArray: ValidMove[]): ValidMove[] {
        return validMoveArray.filter((move: ValidMove) => {
            if(move.x > 7 || move.x < 0 || move.y > 7 || move.y < 0){
                return false;
            }

            return true;
        })
    }

    // TODO: implement "en passant" logic
    public static getValidPawnMoves(squareCoords: SquareCoords, board: Board): ValidMove[] | null {

        const piece = MoveValidator.getPieceOrNull(squareCoords, board, PieceTypes.Pawn)

        if(!piece){
            return null;
        }

        const validMoveArray: ValidMove[] = []

        const sideFlag = piece.side === Sides.White ? -1 : 1
        let piceMoveVector = null;

        if(piece.hasMoved){
            piceMoveVector = PieceMovesStorage.pawnMovedVector
        }

        if(!piece.hasMoved){
            piceMoveVector = PieceMovesStorage.pawnNotMovedVector
        }

        if(!piceMoveVector){
            console.error('MoveValidator getValidMoves could not determine the correct PieceMovesStorage vector')
            return null;
        }

        for (let i = 0; i < piceMoveVector.count; i++) {
            for (const vector of piceMoveVector.vectors)
            {
                validMoveArray.push({x: squareCoords.x + (vector.x ? vector.x + i : 0) * sideFlag, y: squareCoords.y + (vector.y ? vector.y + i : 0) * sideFlag, moveType: MoveType.Move})
            }
        }

        // Unique capture logic for pawns
        const captureDirrection = squareCoords.x + 1 * sideFlag
        if(board.grid[captureDirrection][squareCoords.y + 1]){
            validMoveArray.push({x: captureDirrection, y: squareCoords.y + 1, moveType: MoveType.Capture})
        }
        if(board.grid[captureDirrection][squareCoords.y - 1]){
            validMoveArray.push({x: captureDirrection, y: squareCoords.y - 1, moveType: MoveType.Capture})
        }

        return MoveValidator.getOnlyValidMoves(validMoveArray)
    }

    // public static getValidKnightMoves() {
    //     const piece = MoveValidator.getPieceOrNull(squareCoords.y, squareCoords.x, board)

    //     if(!piece){
    //         return null;
    //     }

    //     const validMoveArray: ValidMove[] = []
    // }
}

export default MoveValidator