import { Sides } from '../types/Types';
import { Piece } from './Piece'
import { PieceFactory } from './PieceFactory';

export class Board {
    
    private _grid: (null | Piece)[][] = [];
    private _isInitialized: boolean = false;
    private _squareSize!: number;

    public initialize(): void {
        if(this._isInitialized){
            return;
        }

        window.addEventListener("DOMContentLoaded", () => {
            const canvas = document.getElementById("chess") as HTMLCanvasElement;

            if(canvas){
                this._squareSize = canvas.height / 8
            }
        })

        this._grid = Array.from({ length: 8 }, () => new Array(8).fill(null));
    }

    // Getters
    get grid(): (null | Piece)[][] {
        return this._grid
    }

    get squareSize(): number | null {
        return this._squareSize
    }

    // Setters

    // Methods
    public setupInitialPositions() {
        
        // Empty cells
        for (let row = 2; row <= 5; row++){
            for (let col = 0; col <= 7; col++){
                this._grid[row][col] = null;
            }
        }

        // Pawns
        for (let col = 0; col < 8; col++) {
            this._grid[1][col] = PieceFactory.pawn(Sides.Black);
            this._grid[6][col] = PieceFactory.pawn(Sides.White);
        }

        // Knights
        this._grid[7][1] = PieceFactory.knight(Sides.White);
        this._grid[7][6] = PieceFactory.knight(Sides.White);

        this._grid[0][1] = PieceFactory.knight(Sides.Black);
        this._grid[0][6] = PieceFactory.knight(Sides.Black);

        // Bishops
        this._grid[7][2] = PieceFactory.bishop(Sides.White);
        this._grid[7][5] = PieceFactory.bishop(Sides.White);

        this._grid[0][2] = PieceFactory.bishop(Sides.Black);
        this._grid[0][5] = PieceFactory.bishop(Sides.Black);

        // Bishops
        this._grid[7][0] = PieceFactory.rook(Sides.White);
        this._grid[7][7] = PieceFactory.rook(Sides.White);

        this._grid[0][0] = PieceFactory.rook(Sides.Black);
        this._grid[0][7] = PieceFactory.rook(Sides.Black);

        // Queens
        this._grid[7][3] = PieceFactory.queen(Sides.White);
        this._grid[0][3] = PieceFactory.queen(Sides.Black);

        // Kings
        this._grid[7][4] = PieceFactory.king(Sides.White);
        this._grid[0][4] = PieceFactory.king(Sides.Black);

        // TEMP: Testing
        this._grid[4][4] = PieceFactory.pawn(Sides.White);
        this._grid[3][3] = PieceFactory.pawn(Sides.Black);
        this._grid[5][2] = PieceFactory.pawn(Sides.White);
    }
}