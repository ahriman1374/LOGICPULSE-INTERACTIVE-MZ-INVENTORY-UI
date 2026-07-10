"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Grid Slot
//=============================================================================

LOGICPULSE.UI.GridSlot = class extends LOGICPULSE.UI.Element {

    constructor(options = {}) {

        super();

        this._entry = options.entry || null;

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

        this.createBackground();

        this.createIcon();

    }

    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

        this.removeChildren();

        this.create();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        const image = this.getBackgroundImage();

        this._background = this.createSprite(

            LOGICPULSE.Assets.Folders.Inventory,
            image

        );

    }

    //--------------------------------
    // Icon
    //--------------------------------

    createIcon() {

        const item = this.item();

        if (!item) {

            return;

        }

        this._icon = LOGICPULSE.Assets.createItemSprite(

            item

        );

        const offset =

            LOGICPULSE.Layout.Inventory.Grid.Icon.offset;

        this._icon.x = offset.x;
        this._icon.y = offset.y;

        this.addChild(this._icon);

    }

    //--------------------------------
    // Center Icon
    //--------------------------------

    centerIcon() {

        const slotSize = 92;

        const iconWidth = ImageManager.iconWidth;

        const iconHeight = ImageManager.iconHeight;

        this._icon.x = Math.floor(

            (slotSize - iconWidth) / 2

        );

        this._icon.y = Math.floor(

            (slotSize - iconHeight) / 2

        );

    }

    //--------------------------------
    // Background Image
    //--------------------------------

    getBackgroundImage() {

        switch (this.rarity()) {

            case 3:

                return LOGICPULSE.Assets.Images.Inventory.ItemBoxLegendary;

            case 2:

                return LOGICPULSE.Assets.Images.Inventory.ItemBoxRare;

            default:

                return LOGICPULSE.Assets.Images.Inventory.ItemBoxCommon;

        }

    }

    //--------------------------------
    // Entry
    //--------------------------------

    entry() {

        return this._entry;

    }

    //--------------------------------
    // Item
    //--------------------------------

    item() {

        return this._entry?.item ?? null;

    }

    //--------------------------------
    // Amount
    //--------------------------------

    amount() {

        return this._entry?.amount ?? 0;

    }

    //--------------------------------
    // Rarity
    //--------------------------------

    rarity() {

        return this._entry?.rarity ?? 1;

    }

    //--------------------------------
    // Category
    //--------------------------------

    category() {

        return this._entry?.category ?? null;

    }

};