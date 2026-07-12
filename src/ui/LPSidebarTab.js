"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Sidebar Tab
//=============================================================================

LOGICPULSE.UI.SidebarTab = class extends LOGICPULSE.UI.Element {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor(options = {}) {

        super();

        this._category = options.category;

        this._idleImage =
            options.idleImage;

        this._hoverImage =
            options.hoverImage;

        this._enabled = true;

        this._selected = false;

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

        this._sprite = this.createSprite(

            LOGICPULSE.Assets.Folders.Sidebar,

            this._idleImage

        );

    }

    //--------------------------------
    // Category
    //--------------------------------

    category() {

        return this._category;

    }

    //--------------------------------
    // Enabled
    //--------------------------------

    enabled() {

        return this._enabled;

    }

    //--------------------------------
    // Selected
    //--------------------------------

    selected() {

        return this._selected;

    }

    //--------------------------------
    // Set Enabled
    //--------------------------------

    setEnabled(value) {

        if (this._enabled === value) {

            return;

        }

        this._enabled = value;

        this.refresh();

    }

    //--------------------------------
    // Set Selected
    //--------------------------------

    setSelected(value) {

        if (this._selected === value) {

            return;

        }

        this._selected = value;

        this.refresh();

    }

    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

        if (this._selected) {

            this._sprite.bitmap =

                LOGICPULSE.Assets.load(

                    LOGICPULSE.Assets.Folders.Sidebar,

                    this._hoverImage

                );

        }

        else {

            this._sprite.bitmap =

                LOGICPULSE.Assets.load(

                    LOGICPULSE.Assets.Folders.Sidebar,

                    this._idleImage

                );

        }

        this.alpha = this._enabled ? 1.0 : 0.35;

    }

};