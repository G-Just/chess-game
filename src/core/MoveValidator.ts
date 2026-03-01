import { MoveType, PieceTypes, Sides, type MovePattern, type SquareCoords, type ValidMove } from "../types/Types.ts";
import type { Board } from "./Board.ts";
import PieceMovesStorage from '../types/PieceMovesStorage.ts'
import { Piece } from "./Piece.ts";

class MoveValidator {

    private static _lastSelectedPieceCoords: SquareCoords | null = null;
    private static _lastSelectedPieceValidMoves: ValidMove[] | null = null;

    static get getCurrentlySelectedPieceCoords() {
        return MoveValidator._lastSelectedPieceCoords
    }

    static get getCurrentlySelectedPieceValidMoves() {
        return MoveValidator._lastSelectedPieceValidMoves
    }

    public static clearCachedPieceMoveData(){
        MoveValidator._lastSelectedPieceCoords = null;
        MoveValidator._lastSelectedPieceValidMoves = null;
    }

    private static getPieceOrNull(squareCoords: SquareCoords, board: Board, pieceType: PieceTypes): Piece | null {
        const piece = board.grid[squareCoords.x][squareCoords.y]

        if(!piece || piece.type !== pieceType){
            console.error(`${pieceType} move validation called on non-pawn piece. Coordinates:`, squareCoords)
            return null;
        }

        return piece;
    }

    private static isInBounds(x: number, y: number): boolean {        
        if(x > 7 || x < 0 || y > 7 || y < 0){
            return false;
        }

        return true;
    }

    private static getSlidingMoves(piceMoveVector: MovePattern, side: Sides, squareCoords: SquareCoords, board: Board): ValidMove[] {

        const validMoveArray: ValidMove[] = []

        for (const vector of piceMoveVector.vectors) {
            for (let step = 1; step <= piceMoveVector.count; step++) {
                const x = squareCoords.x + vector.x * step;
                const y = squareCoords.y + vector.y * step;

                if(!MoveValidator.isInBounds(x, y)) break;

                const currentCheckingSquare = board.grid[x][y]
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
        
        // Cache the currently available moves
        MoveValidator._lastSelectedPieceCoords = squareCoords;
        MoveValidator._lastSelectedPieceValidMoves = validMoveArray;

        return validMoveArray
    }

    private static getSingleStepMoves(piceMoveVector: MovePattern, side: Sides, squareCoords: SquareCoords, board: Board): ValidMove[] {

        const validMoveArray: ValidMove[] = []

        for (const vector of piceMoveVector.vectors) {
                const x = squareCoords.x + vector.x;
                const y = squareCoords.y + vector.y;

                if(!MoveValidator.isInBounds(x, y)) continue;

                const currentCheckingSquare = board.grid[x][y]
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
        
        // Cache the currently available moves
        MoveValidator._lastSelectedPieceCoords = squareCoords;
        MoveValidator._lastSelectedPieceValidMoves = validMoveArray;

        return validMoveArray
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
            console.error('MoveValidator getValidPawnMoves could not determine the correct PieceMovesStorage vector')
            return null;
        }

        for (const vector of piceMoveVector.vectors)
            for (let i = 0; i < piceMoveVector.count; i++) {
            {
                const x = squareCoords.x + (vector.x ? vector.x + i : 0) * sideFlag
                const y = squareCoords.y + (vector.y ? vector.y + i : 0) * sideFlag
                const moveType = MoveType.Move;
                
                // Check if a piece is blocking and stop adding this vector if yes
                if(board.grid[x][y]) break;

                validMoveArray.push({x, y, moveType})
            }
        }

        // Unique capture logic for pawns
        const x = squareCoords.x + 1 * sideFlag
        const left = board.grid[x][squareCoords.y + 1]
        const right = board.grid[x][squareCoords.y - 1]
        if(left && left.side !== piece.side){
            validMoveArray.push({x: x, y: squareCoords.y + 1, moveType: MoveType.Capture})
        }
        if(right && right.side !== piece.side){
            validMoveArray.push({x: x, y: squareCoords.y - 1, moveType: MoveType.Capture})
        }

        // Cache the currently available moves
        MoveValidator._lastSelectedPieceCoords = squareCoords;
        MoveValidator._lastSelectedPieceValidMoves = validMoveArray;
        
        return validMoveArray
    }

    public static getValidKnightMoves(squareCoords: SquareCoords, board: Board): ValidMove[] | null {
        const piece = MoveValidator.getPieceOrNull(squareCoords, board, PieceTypes.Knight)

        if(!piece){
            return null;
        }

        const piceMoveVector = PieceMovesStorage.knightVector
        const side = piece.side

       return MoveValidator.getSingleStepMoves(piceMoveVector, side, squareCoords, board)
    }

    public static getValidBishopMoves(squareCoords: SquareCoords, board: Board): ValidMove[] | null {
        const piece = MoveValidator.getPieceOrNull(squareCoords, board, PieceTypes.Bishop)

        if(!piece){
            return null;
        }

        const piceMoveVector = PieceMovesStorage.bishopVector
        const side = piece.side

       return MoveValidator.getSlidingMoves(piceMoveVector, side, squareCoords, board)
    }

    public static getValidRookMoves(squareCoords: SquareCoords, board: Board): ValidMove[] | null {
        const piece = MoveValidator.getPieceOrNull(squareCoords, board, PieceTypes.Rook)

        if(!piece){
            return null;
        }

        const piceMoveVector = PieceMovesStorage.rookVector
        const side = piece.side

       return MoveValidator.getSlidingMoves(piceMoveVector, side, squareCoords, board)
    }

    public static getValidQueenMoves(squareCoords: SquareCoords, board: Board): ValidMove[] | null {
        const piece = MoveValidator.getPieceOrNull(squareCoords, board, PieceTypes.Queen)

        if(!piece){
            return null;
        }

        const piceMoveVector = PieceMovesStorage.queenVector
        const side = piece.side

       return MoveValidator.getSlidingMoves(piceMoveVector, side, squareCoords, board)
    }

    public static getValidKingMoves(squareCoords: SquareCoords, board: Board): ValidMove[] | null {
        const piece = MoveValidator.getPieceOrNull(squareCoords, board, PieceTypes.King)

        if(!piece){
            return null;
        }

        const piceMoveVector = PieceMovesStorage.kingVector
        const side = piece.side

       return MoveValidator.getSingleStepMoves(piceMoveVector, side, squareCoords, board)
    }
}

export default MoveValidator