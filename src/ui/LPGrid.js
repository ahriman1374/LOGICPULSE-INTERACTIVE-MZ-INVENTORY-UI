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

        this._selectedIndex = 0;

        this._scrollRow = 0;

        this._visibleRows = Math.floor(

            this._layout.rect.height /

            this._layout.spacingY

        );

        this._scrollTargetY = 0;

        this._slots = [];

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

        this.updateViewport();

        this.setSelectedIndex(

            this._selectedIndex

        );

    }

    //--------------------------------
    // Clear Slots
    //--------------------------------

    clearSlots() {

        this._slotLayer.removeChildren();

        this._slots = [];

    }

    //--------------------------------
    // Build Slots
    //--------------------------------

    buildSlots() {

        const items = this.items();

        for (let index = 0; index < items.length; index++) {

            const position = this.slotPosition(index);

            const slot = new LOGICPULSE.UI.GridSlot({

                x: position.x,

                y: position.y,

                entry: items[index]

            });

            this._slotLayer.addChild(slot);

            this._slots.push(slot);

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

        this._selectedIndex = 0;

        this._scrollRow = 0;

        this._scrollTargetY = 0;

        if (this._viewport) {

            this._viewport.y = 0;

        }

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

    //--------------------------------
    // Selected Index
    //--------------------------------

    selectedIndex() {

        return this._selectedIndex;

    }

    //--------------------------------
    // Set Selected Index
    //--------------------------------

    setSelectedIndex(index) {

        const max = this.items().length - 1;

        if (max < 0) {

            this._selectedIndex = -1;

            this.updateSelection();

            return;

        }

        this._selectedIndex = Math.max(

            0,

            Math.min(index, max)

        );

        this.updateSelection();

    }

    //--------------------------------
    // Selected Entry
    //--------------------------------

    selectedEntry() {

        if (this._selectedIndex < 0) {

            return null;

        }

        return this.items()[this._selectedIndex] ?? null;

    }

    //--------------------------------
    // Move Left
    //--------------------------------

    moveLeft() {

        this.setSelectedIndex(

            this._selectedIndex - 1

        );

    }

    //--------------------------------
    // Move Right
    //--------------------------------

    moveRight() {

        this.setSelectedIndex(

            this._selectedIndex + 1

        );

    }

    //--------------------------------
    // Move Up
    //--------------------------------

    moveUp() {

        this.setSelectedIndex(

            this._selectedIndex -

            this._layout.columns

        );

    }

    //--------------------------------
    // Move Down
    //--------------------------------

    moveDown() {

        this.setSelectedIndex(

            this._selectedIndex +

            this._layout.columns

        );

    }

    //--------------------------------
    // Update Selection
    //--------------------------------

    updateSelection() {

        if (!this._slots) {

            return;

        }

        for (let i = 0; i < this._slots.length; i++) {

            this._slots[i].setFocused(

                i === this._selectedIndex

            );

        }

        this.updateViewport();

    }

    //--------------------------------
    // Update Viewport
    //--------------------------------

    updateViewport() {

        if (this._selectedIndex < 0) {

            return;

        }

        const row = Math.floor(

            this._selectedIndex /

            this._layout.columns

        );

        const totalRows = Math.max(

            1,

            Math.ceil(

                this.items().length /

                this._layout.columns

            )

        );

        const maxScrollRow = Math.max(

            0,

            totalRows -

            this._visibleRows

        );

        if (row < this._scrollRow) {

            this._scrollRow = row;

        }

        else if (

            row >=

            this._scrollRow +

            this._visibleRows

        ) {

            this._scrollRow =

                row -

                this._visibleRows +

                1;

        }

        this._scrollRow = Math.max(

            0,

            Math.min(

                this._scrollRow,

                maxScrollRow

            )

        );

        this._scrollTargetY =

            -(this._scrollRow *

                this._layout.spacingY);

    }

    //--------------------------------
    // Update
    //--------------------------------

    update() {

        const speed = 0.18;

        if (

            Math.abs(

                this._viewport.y -

                this._scrollTargetY

            ) < 0.5

        ) {

            this._viewport.y =

                this._scrollTargetY;

        }

        else {

            this._viewport.y +=

                (

                    this._scrollTargetY -

                    this._viewport.y

                ) * speed;

        }

    }

};