import { Sides, type SquareCoords } from '../types/Types';
import { Piece } from './Piece'
import { PieceFactory } from './PieceFactory';

class Board {
    
    private _grid: (null | Piece)[][] = [];
    private _squareSize!: number;
    private _boardSize = 8;
    private _boardMargin: number = 80;

    constructor(){
        window.addEventListener("DOMContentLoaded", () => {
            const canvas = document.getElementById("chess") as HTMLCanvasElement;

            if(canvas){
                this._squareSize = (canvas.height - this._boardMargin * 2) / this._boardSize
            }
        })

        this._grid = Array.from({ length: this._boardSize }, () => new Array(this._boardSize).fill(null));
    }

    // Getters
    get squareSize(): number {
        return this._squareSize
    }

    get boardMargin(): number {
        return this._boardMargin
    }

    get boardSize(): number {
        return this._boardSize
    }

    // Setters

    // Methods
    public getSquare(squareCoords: SquareCoords): Piece | null {
        return this._grid[squareCoords.y][squareCoords.x]
    }

    public setPiece(squareCoords: SquareCoords, piece: Piece | null): void {
        this._grid[squareCoords.y][squareCoords.x] = piece
    }

    forEachSquare(callback: (squareCoords: SquareCoords, piece: Piece | null) => void): void {
        for (let y = 0; y < this._boardSize; y++) {
            for (let x = 0; x < this._boardSize; x++) {
                callback({x, y}, this._grid[y][x]);
            }
        }
    }

    public setInitialPositions() {
        
        // Empty cells
        for (let y = 2; y <= 5; y++){
            for (let x = 0; x <= 7; x++){
                this.setPiece({x, y}, null) 
            }
        }

        // Pawns
        for (let x = 0; x < 8; x++) {
            this.setPiece({x, y: 1}, PieceFactory.pawn(Sides.Black));
            this.setPiece({x, y: 6}, PieceFactory.pawn(Sides.White));
        }

        // Knights
        this.setPiece({x: 1, y: 7}, PieceFactory.knight(Sides.White));
        this.setPiece({x: 6, y: 7}, PieceFactory.knight(Sides.White));

        this.setPiece({x: 1, y: 0}, PieceFactory.knight(Sides.Black));
        this.setPiece({x: 6, y: 0}, PieceFactory.knight(Sides.Black));

        // Bishops
        this.setPiece({x: 2, y: 7}, PieceFactory.bishop(Sides.White));
        this.setPiece({x: 5, y: 7}, PieceFactory.bishop(Sides.White));

        this.setPiece({x: 2, y: 0}, PieceFactory.bishop(Sides.Black));
        this.setPiece({x: 5, y: 0}, PieceFactory.bishop(Sides.Black));

        // Bishops
        this.setPiece({x: 0, y: 7}, PieceFactory.rook(Sides.White));
        this.setPiece({x: 7, y: 7}, PieceFactory.rook(Sides.White));

        this.setPiece({x: 0, y: 0}, PieceFactory.rook(Sides.Black));
        this.setPiece({x: 7, y: 0}, PieceFactory.rook(Sides.Black));

        // Queens
        this.setPiece({x: 3, y: 7}, PieceFactory.queen(Sides.White));
        this.setPiece({x: 3, y: 0}, PieceFactory.queen(Sides.Black));

        // Kings
        this.setPiece({x: 4, y: 7}, PieceFactory.king(Sides.White));
        this.setPiece({x: 4, y: 0}, PieceFactory.king(Sides.Black));
    }
}

export default new Board();