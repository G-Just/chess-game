import type { SquareCoords } from "../types/Types";
import type { Board } from "./Board";

class MoveManager {

    public static movePiece(board: Board, moveFrom: SquareCoords, moveTo: SquareCoords){
        console.log('move')
        board.grid[moveTo.x][moveTo.y] = board.grid[moveFrom.x][moveFrom.y]
        
        board.grid[moveFrom.x][moveFrom.y] = null;
    }
    
    public static capturePiece(board: Board, moveFrom: SquareCoords, moveTo: SquareCoords){
        console.log('capture')
    }
}

export default MoveManager