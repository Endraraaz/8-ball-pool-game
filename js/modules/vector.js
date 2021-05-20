/**
 * Performs different vector operations.
 */
class Vector {
    /**
     * @param {number} x Provides x coordinate of objects.
     * @param {number} y Provides y coordinate of objects.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    };

    /**
     * @returns new instance of Vector class.
     */
    copy = () => {

        return new Vector(this.x, this.y);
    };

    /**
     * Performs vector addition x-axis with x-axis and y-axis with y-axis value.
     * @param {object} vector Passes new object containing x,y value as parameter.
     */
    addTo = (vector) => {
        this.x += vector.x;
        this.y += vector.y;
    };

    /**
     * Performs scalar multiplication with x-axis and y-axis of object.
     * @param {number} scalar Passes constant scalar value as parameter.
     * @returns new instance of Vector class.
     */
    multiply = (scalar) => {

        return new Vector(this.x * scalar, this.y * scalar);
    };

    /**
     * @returns length value of given vector |v| = sqrt(x^2 + y^2)
     */
    length = () => {

        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };

};