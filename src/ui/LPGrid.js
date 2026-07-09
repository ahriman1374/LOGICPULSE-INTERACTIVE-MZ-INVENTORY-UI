"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Grid
//=============================================================================

LOGICPULSE.UI.Grid = class extends LOGICPULSE.UI.Element {

    constructor(layout) {

        super();

        this._layout = layout;

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createMask();
        this.createViewport();

    }

    //--------------------------------
    // Mask
    //--------------------------------

    createMask() {

        const mask = this._layout.mask;

        this._maskGraphic = new PIXI.Graphics();

        this._maskGraphic.beginFill(0xffffff);

        this._maskGraphic.drawRect(

            mask.x,
            mask.y,
            mask.width,
            mask.height

        );

        this._maskGraphic.endFill();

        this.addChild(this._maskGraphic);

        this.mask = this._maskGraphic;

    }

    //--------------------------------
    // Viewport
    //--------------------------------

    createViewport() {

        this._viewport = new PIXI.Container();

        this.addChild(this._viewport);

        this.createLayers();

    }

    //--------------------------------
    // Layers
    //--------------------------------

    createLayers() {

        this._slotLayer = new PIXI.Container();
        this._iconLayer = new PIXI.Container();
        this._cursorLayer = new PIXI.Container();

        this._viewport.addChild(this._slotLayer);
        this._viewport.addChild(this._iconLayer);
        this._viewport.addChild(this._cursorLayer);

        this.buildGrid();

    }

    //--------------------------------
    // Grid
    //--------------------------------

    buildGrid() {

        const layout = this._layout;

        const startX = layout.rect.x;
        const startY = layout.rect.y;

        const columns = layout.columns;

        const rows = Math.floor(

            layout.rect.height / layout.spacingY

        );

        for (let row = 0; row < rows; row++) {

            for (let column = 0; column < columns; column++) {

                const slot = new LOGICPULSE.UI.GridSlot({

                    x: startX + (column * layout.spacingX),

                    y: startY + (row * layout.spacingY),

                    rarity: 1

                });

                this._slotLayer.addChild(slot);

            }

        }

    }

};