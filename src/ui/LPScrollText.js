"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Scroll Text
//=============================================================================

LOGICPULSE.UI.ScrollText = class extends LOGICPULSE.UI.Element {

    constructor(options = {}) {

        super();

        this._width =
            options.width ?? 200;

        this._height =
            options.height ?? 100;

        this._padding =
            options.padding ?? 0;

        this._lineHeight =
            options.lineHeight ?? 28;

        this._fontSize =
            options.fontSize ?? 20;

        this._scroll = 0;

        this._maxScroll = 0;

        this._contentHeight = 0;

        this.move(

            options.x ?? 0,
            options.y ?? 0

        );

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createMask();
        this.createText();

    }

    //--------------------------------
    // Mask
    //--------------------------------

    createMask() {

        this._maskGraphic = new PIXI.Graphics();

        this._maskGraphic.beginFill(0xffffff);

        this._maskGraphic.drawRect(

            0,
            0,
            this._width,
            this._height

        );

        this._maskGraphic.endFill();

        this.addChild(

            this._maskGraphic

        );

    }

    //--------------------------------
    // Text
    //--------------------------------

    createText() {

        this._textSprite = new Sprite();

        this._textSprite.bitmap = new Bitmap(

            this._width,
            2000

        );

        this._textSprite.bitmap.fontFace =
            $gameSystem.mainFontFace();

        this._textSprite.bitmap.fontSize =
            this._fontSize;

        this._textSprite.bitmap.outlineWidth = 4;

        this._textSprite.bitmap.outlineColor =
            "rgba(0,0,0,0.8)";

        this._textSprite.mask =
            this._maskGraphic;

        this.addChild(

            this._textSprite

        );

    }

    //--------------------------------
    // Set Text
    //--------------------------------

    setText(text) {

        text = String(text ?? "");

        this._textSprite.bitmap.clear();

        this.drawWrappedText(text);

        this.resetScroll();

    }

    //--------------------------------
    // Draw Wrapped Text
    //--------------------------------

    drawWrappedText(text) {

        const bitmap =
            this._textSprite.bitmap;

        const maxWidth =
            this._width - this._padding * 2;

        const words =
            text.split(/\s+/);

        let line = "";

        let y = 0;

        for (const word of words) {

            const test =

                line.length
                    ? line + " " + word
                    : word;

            const width =
                bitmap.measureTextWidth(test);

            if (

                width > maxWidth &&

                line.length

            ) {

                bitmap.drawText(

                    line,

                    this._padding,

                    y,

                    maxWidth,

                    this._lineHeight,

                    "left"

                );

                line = word;

                y += this._lineHeight;

            }

            else {

                line = test;

            }

        }

        if (line.length) {

            bitmap.drawText(

                line,

                this._padding,

                y,

                maxWidth,

                this._lineHeight,

                "left"

            );

            y += this._lineHeight;

        }

        this._contentHeight = y;

        this._maxScroll = Math.max(

            0,

            this._contentHeight - this._height

        );

    }

    //--------------------------------
    // Scroll
    //--------------------------------

    scroll(amount) {

        if (this._maxScroll <= 0) {

            return;

        }

        this._scroll += amount;

        if (this._scroll < 0) {

            this._scroll = 0;

        }

        if (this._scroll > this._maxScroll) {

            this._scroll = this._maxScroll;

        }

        this._textSprite.y = -this._scroll;

    }

    //--------------------------------
    // Can Scroll
    //--------------------------------

    canScroll() {

        return this._maxScroll > 0;

    }

    //--------------------------------
    // Reset Scroll
    //--------------------------------

    resetScroll() {

        this._scroll = 0;

        this._textSprite.y = 0;

    }

};