import {AssetsWalker} from './assets.js'

const canvas = document.querySelector("canvas#canvas");
export const ctx = canvas.getContext('2d');

export class HexagonDraw {
    hexagonHeight;
    hexagonWidth = 20;
    hexagonXCount;
    tileIndex = 0;
    bigHexagonWidth;
    bigHexagonHeight;
    assets;
    coords;

    constructor(hexagonXCount) {
        return (async () => {
            this.hexagonXCount = hexagonXCount;
            this.updateParameters();
            this.assets = await new AssetsWalker();
            this.coords = this.getCenteredCoords();
            return this;
        })();
    }

    updateParameters() {
        this.hexagonHeight = this.hexagonWidth/1.73205080757*2;
        this.bigHexagonWidth = this.hexagonXCount * this.hexagonWidth;
        this.bigHexagonHeight = (this.hexagonXCount * this.hexagonHeight*3/4) + this.hexagonHeight;
    }

    tintHexagon(x, y, tintColor) {
        if (tintColor == 'none') return;
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = tintColor;

        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(x + (this.hexagonWidth/2), y);
        ctx.lineTo(x + this.hexagonWidth, y + (this.hexagonHeight/4));
        ctx.lineTo(x + this.hexagonWidth, y + (this.hexagonHeight*3/4));
        ctx.lineTo(x + (this.hexagonWidth/2), y + (this.hexagonHeight));
        ctx.lineTo(x, y + (this.hexagonHeight*3/4));
        ctx.lineTo(x, y + (this.hexagonHeight/4));
        ctx.lineTo(x + (this.hexagonWidth/2), y);
        ctx.closePath();

        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;
    }

    drawHexagon(x, y) {
        let texture = this.assets.getTexture();
        this.assets.next();
        ctx.drawImage(texture, x, y, this.hexagonWidth, this.hexagonHeight * 1.3);
        this.tintHexagon(x, y, this.assets.getColor());
        //ctx.fillStyle = "#FFFFFF";
        //ctx.strokeStyle = "#FF0000";
        //ctx.lineWidth = 1;
    }

    drawHexagonRow(y, x, count) {
        count = Math.floor(count);
        for (let i = 0; i < count; i++) {
            this.drawHexagon(x, y);
            x += this.hexagonWidth;
        }
    }

    getCenteredCoords() {
        return {
            x: (canvas.width - this.bigHexagonWidth) / 2,
            y: (canvas.height - this.bigHexagonHeight)/2,
        }
    }

    draw({x, y} = this.coords) {
        this.assets.reset();
        x += this.hexagonWidth*this.hexagonXCount/4;
        let growDirection = 1;
        for (let count = this.hexagonXCount/2; count >= this.hexagonXCount/2; count += growDirection) {
            this.drawHexagonRow(y, x, count);
            if (count >= this.hexagonXCount) growDirection*=-1;
            y += this.hexagonHeight * 3/4;
            x -= this.hexagonWidth/2*growDirection;
        }
    }
}
