/**
 * Class to draw game objects into the canvas.
 */
class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvasContext = this.canvas.getContext('2d');
    };

    /**
     * Clears pixels in canvas area.
     */
    clear = () => {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    /**
     * Draws image to canvas.
     * @param {object} image Provides source of image sprite to be drawn.
     * @param {object} position Provides x,y position coordinates of object to be drawn.
     * @param {object} origin Provides x,y origin coordinates of object to be drawn.
     * @param {number} rotation Provides angle of rotation about its origin.
     */
    drawImage = (image, position, origin, rotation = 0) => {

        if (!position) {
            position = new Vector();
        };

        if (!origin) {
            origin = new Vector();
        };

        this.canvasContext.save();
        this.canvasContext.translate(position.x, position.y);
        this.canvasContext.rotate(rotation);
        this.canvasContext.drawImage(image, -origin.x, -origin.y);
        this.canvasContext.restore();
    };

    /**
     * Draws text to canvas.
     * @param {string} text Provides text value.
     * @param {object} position Provides x,y position coordinates for text to be drawn.
     * @param {object} origin Provides x,y origin coordinates for text to be drawn.
     * @param {string} color Provides color property of text.
     * @param {string} textAlign Provides align property of text.
     * @param {string} fontName Provides font family of text.
     * @param {string} fontSize Provides font size of text.
     */
    drawText = (text, position, origin, color, textAlign, fontName, fontSize) => {
        this.canvasContext.save();
        this.canvasContext.translate(position.x - origin.x, position.y - origin.y);
        this.canvasContext.textBaseline = "top";
        this.canvasContext.font = fontSize + " " + fontName;
        this.canvasContext.fillStyle = color.toString();
        this.canvasContext.textAlign = textAlign;
        this.canvasContext.fillText(text, 0, 0);
        this.canvasContext.restore();
    };
};

let canvas = new Canvas();

