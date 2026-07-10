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

        this._category =

            LOGICPULSE.Constants.Category.Consumable;

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

        this.clearSlots();
        this.buildSlots();

    }

    //--------------------------------
    // Clear Slots
    //--------------------------------

    clearSlots() {

        this._slotLayer.removeChildren();

    }

    //--------------------------------
    // Build Slots
    //--------------------------------

    buildSlots() {

        const items = this.items();

        for (let index = 0; index < items.length; index++) {

            const position = this.slotPosition(index);

            const entry = items[index];

            const slot = new LOGICPULSE.UI.GridSlot({

                x: position.x,

                y: position.y,

                entry: entry

            });

            this._slotLayer.addChild(slot);

        }

    }

    //--------------------------------
    // Slot Position
    //--------------------------------

    slotPosition(index) {

        const layout = this._layout;

        return {

            x:

                layout.rect.x +
                ((index % layout.columns) * layout.spacingX),

            y:

                layout.rect.y +
                (Math.floor(index / layout.columns) * layout.spacingY)

        };

    }

    //--------------------------------
    // Set Category
    //--------------------------------

    setCategory(category) {

        if (this._category === category) {

            return;

        }

        this._category = category;

        this.buildGrid();

    }

    //--------------------------------
    // Category
    //--------------------------------

    category() {

        return this._category;

    }

    //--------------------------------
    // Items
    //--------------------------------

    items() {

        return LOGICPULSE.InventoryProvider.getItems(

            this._category

        );

    }

};