"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Showcase
//=============================================================================

LOGICPULSE.UI.Showcase = class extends LOGICPULSE.UI.Element {

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createOverlay();
        this.createItemSprite();
        this.createDescription();

    }

    //--------------------------------
    // Overlay
    //--------------------------------

    createOverlay() {

        const pos =
            LOGICPULSE.Layout.Inventory.Showcase.Overlay;

        this._overlay = this.createSprite(

            LOGICPULSE.Assets.Folders.Inventory,
            "Item Showcase Box",
            pos.x,
            pos.y

        );

    }

    //--------------------------------
    // Item Sprite
    //--------------------------------

    createItemSprite() {

        // Phase 0.7

    }

    //--------------------------------
    // Description
    //--------------------------------

    createDescription() {

        // Phase 0.8

    }

};