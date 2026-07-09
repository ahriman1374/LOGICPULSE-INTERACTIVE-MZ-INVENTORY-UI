"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Grid Slot
//=============================================================================

LOGICPULSE.UI.GridSlot = class extends LOGICPULSE.UI.Element {

    constructor(options = {}) {

        super();

        this._rarity = options.rarity ?? 1;

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
    // Helpers
    //--------------------------------

    getBackgroundImage() {

        switch (this._rarity) {

            case 3:
                return LOGICPULSE.Assets.Images.Inventory.ItemBoxLegendary;

            case 2:
                return LOGICPULSE.Assets.Images.Inventory.ItemBoxRare;

            default:
                return LOGICPULSE.Assets.Images.Inventory.ItemBoxCommon;

        }

    }

};