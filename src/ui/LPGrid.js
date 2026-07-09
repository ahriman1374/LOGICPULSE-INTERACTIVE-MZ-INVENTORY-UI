"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Grid
//=============================================================================

LOGICPULSE.UI.Grid = class extends LOGICPULSE.UI.Element {

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

        const rect =
            LOGICPULSE.Layout.Inventory.Grid.mask;

        this._maskGraphic = new PIXI.Graphics();

        this._maskGraphic.beginFill(0xffffff);

        this._maskGraphic.drawRect(

            rect.x,
            rect.y,
            rect.width,
            rect.height

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
        

    }

};