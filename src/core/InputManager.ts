class InputManager {

    private static _hoveredSquareCoords: {x: number, y: number}
    private static _squareSize: number;

    private static clickListeners: ((pos: {x:number,y:number}) => void)[] = [];

    public static onClick(callback: (pos: {x:number,y:number}) => void) {
        InputManager.clickListeners.push(callback);
    }

    static {
        window.addEventListener("DOMContentLoaded", () => {
            const canvas = document.getElementById("chess") as HTMLCanvasElement;
            
            if(canvas){

                InputManager._squareSize = canvas.height / 8

                // Return registered callbacks for click event
                canvas.addEventListener("click", (_) => {
                    InputManager.clickListeners.forEach(callback => callback(InputManager.getCurrentHoveredSquare()));
                });

                canvas.addEventListener('mousemove', (event: MouseEvent) => {
                    InputManager._hoveredSquareCoords = {x: event.offsetX, y: event.offsetY}
                })

                // When the mouse leaves the canvas just set default no hovered state
                canvas.addEventListener("mouseleave", () => {
                    InputManager._hoveredSquareCoords = { x: -1, y: -1 };
                });
            } else {
                console.error('InputManager error. Canvas element not found');
            }
        })
    }

    public static getCurrentHoveredSquare(): {x: number, y: number} {
        if(!InputManager._hoveredSquareCoords){ // Mouse not over the board
            return {
                'x': -1,
                'y': -1
            }
        }

        const x = InputManager._hoveredSquareCoords.x
        const y = InputManager._hoveredSquareCoords.y
        
        return {
            'x': Math.floor(x / InputManager._squareSize),
            'y': Math.floor(y / InputManager._squareSize)
        }
    }
}

export default InputManager