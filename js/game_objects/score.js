/**
 * Provides score properties.
 */
class Score {
    constructor(position) {
        this.position = position;
        this.origin = new Vector(47, 82);
        this.value = 0;
    };

    draw = () => {
        canvas.drawText(this.value, this.position, this.origin, "#096834", "top", "Impact", "200px");
    };

    drawScoreColor = (color) => {

        for (let i = 0; i < this.value; i++) {
            let scorePosition = this.position.add(new Vector(i + 15, 0));
            canvas.drawText("I", scorePosition, this.origin, color, "top", "Arial", "30px");
        };
    };

    /**
     * Increments score when ball is pocketted.
     */
    increment = () => {
        this.value++;
    };

};