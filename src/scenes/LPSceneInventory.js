"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.Scenes = LOGICPULSE.Scenes || {};

//=============================================================================
// Inventory Scene
//=============================================================================

LOGICPULSE.Scenes.Inventory = class extends Scene_MenuBase {

    //--------------------------------
    // Initialize
    //--------------------------------

    initialize() {

        super.initialize();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        super.create();

        this.createBackground();
        this.createSidebar();
        this.createShowcase();
        this.createGrid();
        this.createController();

        this.onSelectionChanged();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        const background = LOGICPULSE.Assets.createSprite(

            LOGICPULSE.Assets.Folders.Inventory,
            "Background"

        );

        this.addChild(background);

    }

    //--------------------------------
    // Sidebar
    //--------------------------------

    createSidebar() {

        this._sidebar = new LOGICPULSE.UI.Sidebar();

        this.addChild(this._sidebar);

    }

    //--------------------------------
    // Showcase
    //--------------------------------

    createShowcase() {

        this._showcase = new LOGICPULSE.UI.Showcase();

        this.addChild(this._showcase);

    }

    //--------------------------------
    // Grid
    //--------------------------------

    createGrid() {

        this._grid = new LOGICPULSE.UI.Grid(

            LOGICPULSE.Layout.Inventory.Grid,

            {

                provider: grid =>

                    LOGICPULSE.InventoryProvider.getItems(

                        grid.category()

                    )

            }

        );

        this.addChild(this._grid);

    }

    //--------------------------------
    // Controller
    //--------------------------------

    createController() {

        this._controller = new LOGICPULSE.InventoryController(

            this

        );

    }

    //--------------------------------
    // Update
    //--------------------------------

    //--------------------------------
    // Update
    //--------------------------------

    update() {

        super.update();

        if (this._controller) {

            this._controller.update();

        }

        if (this._grid) {

            this._grid.update();

        }

        if (this._sidebar) {

            this._sidebar.update();

        }

    }

    //--------------------------------
    // Selection Changed
    //--------------------------------

    onSelectionChanged() {

        if (!this._grid) {

            return;

        }

        const entry = this._grid.selectedEntry();

        this._showcase.setItem(

            entry

        );

    }

    //--------------------------------
    // Confirm
    //--------------------------------

    onConfirm() {

        const entry = this._grid.selectedEntry();

        if (!entry) {

            return;

        }

        if (

            !LOGICPULSE.InventoryProvider.canUse(

                entry.item

            )

        ) {

            return;

        }

        const success =

            LOGICPULSE.InventoryProvider.useItem(

                entry.item

            );

        if (!success) {

            return;

        }

        if (

            this._showcase.playUseAnimation

        ) {

            this._showcase.playUseAnimation();

        }

        AudioManager.playSe({

            name: "Decision2",

            volume: 90,

            pitch: 100,

            pan: 0

        });

        this.refreshInventory();

    }

    //--------------------------------
    // Cancel
    //--------------------------------

    onCancel() {

        SceneManager.pop();

    }

    //--------------------------------
    // Refresh Inventory
    //--------------------------------

    refreshInventory() {

        const previousIndex =

            this._grid.selectedIndex();

        this._grid.buildGrid();

        const max =

            this._grid.items().length - 1;

        if (max >= 0) {

            this._grid.setSelectedIndex(

                Math.min(

                    previousIndex,

                    max

                )

            );

        }

        this.onSelectionChanged();

    }

};