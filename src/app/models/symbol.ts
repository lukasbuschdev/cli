export class Symbol {
    characters: string;
    x: any;
    y: any;
    fontSize: number;
    text: string;
    canvasHeight: any;

    constructor(x: any, y: any, fontSize: number, canvasHeight: any) {
        this.characters = '  ア   ァ  カ  サ  タ  ナ  ハ  マ  ヤ  ャ  ラ  ダ  バ  ピ  ウ  ゥ  ク  ス  ツ  ヌ  フ  ム  ユ  ホ  ゴ  ゾ  ド  ボ  ヴ  ッ  ン  0  1  2  3  4  5  6  7  8  9  <  > ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(context: any): void {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        if(this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}