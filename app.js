let ROWS = 9;
let COLS = 9;
let SIZE = 24;
let canvas = document.getElementById('canvas');

function createCanvas() {
    canvas.style.width = COLS * SIZE;
    canvas.style.height = ROWS * SIZE;

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            let pixel = document.createElement('button');
            pixel.style.width = SIZE;
            pixel.style.height = SIZE;
            canvas.appendChild(pixel)
        }
    }
}
createCanvas()