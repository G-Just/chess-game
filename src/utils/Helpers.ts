import type { SquareCoords } from "../types/Types";

export function coordsEqual(a: SquareCoords, b: SquareCoords): boolean {
    return a.x === b.x && a.y === b.y;
}