import { Symbol } from "./symbol";

export class Effect {
    canvasWidth: any;
    canvasHeight: any;
    fontSize: number;
    columns: any;
    symbols: any[];

    constructor(canvasWidth: any, canvasHeight: any) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 16;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    #initialize(): void {
        for(let i = 0; i < this.columns; i++) {
            const randomY = Math.floor(Math.random() * (this.canvasHeight / this.fontSize));
            this.symbols[i] = new Symbol(i, randomY, this.fontSize, this.canvasHeight);
        }
    }

    resize(width: number, height: number): void {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}