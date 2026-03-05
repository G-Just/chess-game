import { MoveType, PieceTypes, Sides, type MovePattern, type SquareCoords, type ValidMove } from "../types/Types.ts";
import PieceMovesStorage from '../types/PieceMovesStorage.ts'
import Board from "./Board.ts";
import { type Piece } from "./Piece.ts";

class MoveValidator {

    public static getValidMoves(squareCoords: SquareCoords): ValidMove[] {
        const piece = Board.getSquare(squareCoords)

        if(!piece){
            return []
        }

        switch (piece.type) {
            case PieceTypes.Pawn:
                return MoveValidator._getValidPawnMoves(squareCoords)
            case PieceTypes.Knight:
                return MoveValidator._getValidKnightMoves(squareCoords)
            case PieceTypes.Bishop:
                return MoveValidator._getValidBishopMoves(squareCoords)
            case PieceTypes.Rook:
                return MoveValidator._getValidRookMoves(squareCoords)
            case PieceTypes.Queen:
                return MoveValidator._getValidQueenMoves(squareCoords)
            case PieceTypes.King:
                return MoveValidator._getValidKingMoves(squareCoords)
            default:
                return []
        }
    }

    private static _getPieceOrNull(squareCoords: SquareCoords, pieceType: PieceTypes): Piece | null {
        const piece = Board.getSquare(squareCoords)

        if(!piece || piece.type !== pieceType){
            console.error(`${pieceType} move validation called on non-pawn piece. Coordinates:`, squareCoords)
            return null;
        }

        return piece;
    }

    private static _isInBounds(x: number, y: number): boolean {        
        if(x > 7 || x < 0 || y > 7 || y < 0){
            return false;
        }

        return true;
    }

    private static _getSlidingMoves(piceMoveVector: MovePattern, side: Sides, squareCoords: SquareCoords): ValidMove[] {

        const validMoveArray: ValidMove[] = []

        for (const vector of piceMoveVector.vectors) {
            for (let step = 1; step <= piceMoveVector.count; step++) {
                const x = squareCoords.x + vector.x * step;
                const y = squareCoords.y + vector.y * step;

                if(!MoveValidator._isInBounds(x, y)) break;

                const currentCheckingSquare = Board.getSquare({x, y})
                let moveType = MoveType.Move;
                
                if(currentCheckingSquare){
                    if(currentCheckingSquare.side === side){
                        break;
                    } else {
                        moveType = MoveType.Capture;
                        validMoveArray.push({x, y, moveType})
                        break;
                    }
                }
                
                validMoveArray.push({x, y, moveType})
            }
        }
        
        return validMoveArray
    }

    private static _getSingleStepMoves(piceMoveVector: MovePattern, side: Sides, squareCoords: SquareCoords): ValidMove[] {

        const validMoveArray: ValidMove[] = []

        for (const vector of piceMoveVector.vectors) {
                const x = squareCoords.x + vector.x;
                const y = squareCoords.y + vector.y;

                if(!MoveValidator._isInBounds(x, y)) continue;

                const currentCheckingSquare = Board.getSquare({x, y})
                let moveType = MoveType.Move;
                
                if(currentCheckingSquare){
                    if(currentCheckingSquare.side === side){
                        continue;
                    } else {
                        moveType = MoveType.Capture;
                        validMoveArray.push({x, y, moveType})
                        continue;
                    }
                }
                
            validMoveArray.push({x, y, moveType})
        }
        
        return validMoveArray
    }

    // TODO: implement "en passant" logic
    private static _getValidPawnMoves(squareCoords: SquareCoords): ValidMove[] {

        const piece = MoveValidator._getPieceOrNull(squareCoords, PieceTypes.Pawn)

        if(!piece){
            return [];
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
            console.error('MoveValidator getValidPawnMoves could not determine the correct PieceMovesStorage vector')
            return [];
        }

        for (const vector of piceMoveVector.vectors)
            for (let i = 0; i < piceMoveVector.count; i++) {
            {
                const x = squareCoords.x
                const y = squareCoords.y + (vector.y ? vector.y + i : 0) * sideFlag
                const moveType = MoveType.Move;
                
                // Check if a piece is blocking and stop adding this vector if yes
                if(Board.getSquare({x, y})) break;

                validMoveArray.push({x, y, moveType})
            }
        }

        // Unique capture logic for pawns
        const y = squareCoords.y + 1 * sideFlag
        const left = Board.getSquare({x: squareCoords.x + 1, y})
        const right = Board.getSquare({x: squareCoords.x - 1, y})
        if(left && left.side !== piece.side){
            validMoveArray.push({x: squareCoords.x + 1, y, moveType: MoveType.Capture})
        }
        if(right && right.side !== piece.side){
            validMoveArray.push({x: squareCoords.x - 1, y, moveType: MoveType.Capture})
        }

        
        return validMoveArray
    }

    private static _getValidKnightMoves(squareCoords: SquareCoords): ValidMove[] {
        const piece = MoveValidator._getPieceOrNull(squareCoords, PieceTypes.Knight)

        if(!piece){
            return [];
        }

        const piceMoveVector = PieceMovesStorage.knightVector
        const side = piece.side

       return MoveValidator._getSingleStepMoves(piceMoveVector, side, squareCoords)
    }

    private static _getValidBishopMoves(squareCoords: SquareCoords): ValidMove[] {
        const piece = MoveValidator._getPieceOrNull(squareCoords, PieceTypes.Bishop)

        if(!piece){
            return [];
        }

        const piceMoveVector = PieceMovesStorage.bishopVector
        const side = piece.side

       return MoveValidator._getSlidingMoves(piceMoveVector, side, squareCoords)
    }

    private static _getValidRookMoves(squareCoords: SquareCoords): ValidMove[] {
        const piece = MoveValidator._getPieceOrNull(squareCoords, PieceTypes.Rook)

        if(!piece){
            return [];
        }

        const piceMoveVector = PieceMovesStorage.rookVector
        const side = piece.side

       return MoveValidator._getSlidingMoves(piceMoveVector, side, squareCoords)
    }

    private static _getValidQueenMoves(squareCoords: SquareCoords): ValidMove[] {
        const piece = MoveValidator._getPieceOrNull(squareCoords, PieceTypes.Queen)

        if(!piece){
            return [];
        }

        const piceMoveVector = PieceMovesStorage.queenVector
        const side = piece.side

       return MoveValidator._getSlidingMoves(piceMoveVector, side, squareCoords)
    }

    private static _getValidKingMoves(squareCoords: SquareCoords): ValidMove[] {
        const piece = MoveValidator._getPieceOrNull(squareCoords, PieceTypes.King)

        if(!piece){
            return [];
        }

        const piceMoveVector = PieceMovesStorage.kingVector
        const side = piece.side

       return MoveValidator._getSingleStepMoves(piceMoveVector, side, squareCoords)
    }
}

export default MoveValidator