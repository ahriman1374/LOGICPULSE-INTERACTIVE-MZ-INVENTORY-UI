"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Base UI Element
//=============================================================================

LOGICPULSE.UI.Element = class extends PIXI.Container {

    constructor() {

        super();

        this._enabled = true;

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

    }

    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

    }

    //--------------------------------
    // Update
    //--------------------------------

    update() {

    }

    //--------------------------------
    // Visibility
    //--------------------------------

    show() {

        this.visible = true;

    }

    hide() {

        this.visible = false;

    }

    move(x, y) {

        this.position.set(x, y);

    }

    //--------------------------------
    // Sprite Helpers
    //--------------------------------

    createSprite(folder, filename, x = 0, y = 0) {

        const sprite = LOGICPULSE.Assets.createSprite(

            folder,
            filename

        );

        sprite.position.set(x, y);

        this.addChild(sprite);

        return sprite;

    }

    //--------------------------------
    // State
    //--------------------------------

    enable() {

        this._enabled = true;

    }

    disable() {

        this._enabled = false;

    }

    get enabled() {

        return this._enabled;

    }

    //--------------------------------
    // Destroy
    //--------------------------------

    destroy(options) {

        super.destroy(options);

    }

};