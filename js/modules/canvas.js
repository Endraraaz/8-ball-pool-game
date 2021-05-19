class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvasCtx = this.canvas.getContext('2d');
    };

    clear = () => {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    drawImage = (image, position, origin, rotation = 0) => {

        if(!position){
            position = new Vector();
        };

        if(!origin){
            origin = new Vector();
        };

        // this.canvasCtx.drawImage(image, position.x, position.y);
        this.canvasCtx.save();
        this.canvasCtx.translate(position.x, position.y);

        this.canvasCtx.rotate(rotation);

        console.log(image)
        this.canvasCtx.drawImage(image, -origin.x, -origin.y);
        this.canvasCtx.restore();
        
    };
};

let canvas = new Canvas();

