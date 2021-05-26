/**
 * Provides properties of label text to be displayed in menu.
 */
class Label {
    constructor(text, position, origin, color, textAlign, fontname, fontsize) {
        this.text = typeof text !== 'undefined' ? text : '';
        this.position = typeof position !== 'undefined' ? position : new Vector();
        this.origin = typeof origin !== 'undefined' ? origin : new Vector();
        this.color = typeof color !== 'undefined' ? color : COLOR.BLACK;
        this.textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
        this.fontName = typeof fontname !== 'undefined' ? fontname : "Courier New";
        this.fontSize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    };

    /**
     * Draws menu labels.
     */
    draw = () => {

        canvas.drawText(this.text, this.position, this.origin, this.color, this.textAlign, this.fontName, this.fontSize);
    };

};
