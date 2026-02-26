import type { Board } from "./Board";

class MoveManager {
    /* TODO: 
    Implement this, it accepts x, y, and the board gets the piece, 
    returns an array of valid squares for the piece to move.
    This will probably get large so think of a way to abstract as much as possible.
    Maybe store valid move vectors for each piece in another file?
    */
    public static getValidMoves(x: number, y: number, board: Board): {x: number, y: number}[] | null {
        return null;
    }
}

export default MoveManager