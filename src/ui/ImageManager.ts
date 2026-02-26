import Pawn_White from "../ui/assets/Pawn_White.png";
import Pawn_Black from "../ui/assets/Pawn_Black.png";
import Rook_White from "../ui/assets/Rook_White.png";
import Rook_Black from "../ui/assets/Rook_Black.png";
import Knight_White from "../ui/assets/Knight_White.png";
import Knight_Black from "../ui/assets/Knight_Black.png";
import Bishop_White from "../ui/assets/Bishop_White.png";
import Bishop_Black from "../ui/assets/Bishop_Black.png";
import Queen_White from "../ui/assets/Queen_White.png";
import Queen_Black from "../ui/assets/Queen_Black.png";
import King_White from "../ui/assets/King_White.png";
import King_Black from "../ui/assets/King_Black.png";

/**
 * Manages loading and caching of all game images.
 * Ensures images are loaded once and provides access via keys.
 */
class ImageManager {
    private static images: Record<string, HTMLImageElement> = {};
    private static _isLoaded: boolean = false;

    private static assets = {
        Pawn_White: Pawn_White,
        Pawn_Black: Pawn_Black,
        Rook_White: Rook_White,
        Rook_Black: Rook_Black,
        Knight_White: Knight_White,
        Knight_Black: Knight_Black,
        Bishop_White: Bishop_White,
        Bishop_Black: Bishop_Black,
        Queen_White: Queen_White,
        Queen_Black: Queen_Black,
        King_White: King_White,
        King_Black: King_Black,
    };

    private static initialize() {
        for (const [key, src] of Object.entries(this.assets)) {
            const img = new Image();
            img.src = src;
            this.images[key] = img;
        }

        ImageManager._isLoaded = true;
    }

    /**
     * Returns the HTMLImageElement for the given key.
     * Automatically initializes all images on first call.
     *
     * @param key - The name of the image from assests folder, e.g., "Pawn_White"
     * @returns The loaded HTMLImageElement
     */
    public static get(key: string): HTMLImageElement {
        if (!ImageManager._isLoaded) {
            ImageManager.initialize();
        }
        return this.images[key];
    }
}

export default ImageManager;
