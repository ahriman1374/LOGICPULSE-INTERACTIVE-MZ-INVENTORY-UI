"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.Scenes = LOGICPULSE.Scenes || {};

//=============================================================================
// Inventory Scene
//=============================================================================

LOGICPULSE.Scenes.Inventory = class extends Scene_MenuBase {

    initialize() {

        super.initialize();

    }

    create() {

        super.create();

        this.createBackground();
        this.createSidebar();
        this.createShowcase();
        this.createGrid();


    }

    createBackground() {

        const background = LOGICPULSE.Assets.createSprite(

            LOGICPULSE.Assets.Folders.Inventory,
            "Background"

        );

        background.x = 0;
        background.y = 0;

        this.addChild(background);

    }

    createSidebar() {

        this._sidebar = new LOGICPULSE.UI.Sidebar();

        this.addChild(this._sidebar);

    }

    createShowcase() {

        this._showcase = new LOGICPULSE.UI.Showcase();

        this.addChild(this._showcase);

    }

    createGrid() {

        this._grid = new LOGICPULSE.UI.Grid(

            LOGICPULSE.Layout.Inventory.Grid

        );

        this.addChild(this._grid);

    }

};