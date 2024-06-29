import {AssetsWalker} from './assets.js'
import { wasmManager } from './wasmManager.js';

const canvas = document.querySelector("canvas#canvas");
export const ctx = canvas.getContext('2d');

export class HexagonDraw {
    hexagonHeight;          //Height of a single small hexagon
    hexagonWidth;      //Width of a single small hexagon
    hexagonXCount;          //amount of hexagons across X axis
    hexagonYCount;          //amount of hexagons across Y axis
    assets;                 //assetWalker
    coords;                 //coords of top-left point of hexagon

    constructor() {
        return (async () => {
            this.assets = await new AssetsWalker();
            let json = JSON.parse(wasmManager.getMapProperties());
            this.hexagonXCount = json.hexDiameterCount.horizontal;
            this.hexagonYCount = json.hexDiameterCount.vertical;
            this.updateParameters();
            console.log(json);
            wasmManager.move_map(
                (canvas.width - (this.hexagonWidth*this.hexagonXCount)) / 2,
                (canvas.height - (this.hexagonHeight*this.hexagonYCount))/2
            )
            return this;
        })();
    }

    updateParameters() {
        let json = JSON.parse(wasmManager.getMapProperties());

        this.coords = {x: json.mapPos.x, y: json.mapPos.y};
        this.hexagonWidth = json.tileSize.width;
        this.hexagonHeight = json.tileSize.height;
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
        ctx.drawImage(texture, x, y, this.hexagonWidth, this.hexagonHeight * 1.3);
        this.tintHexagon(x, y, this.assets.getColor());
        this.assets.next();
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
