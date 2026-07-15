"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.Scenes = LOGICPULSE.Scenes || {};

//=============================================================================
// Synthesizer Scene
//=============================================================================

LOGICPULSE.Scenes.Synthesizer = class extends Scene_MenuBase {

    //--------------------------------
    // Initialize
    //--------------------------------

    initialize() {

        super.initialize();

        this._selectedItem = null;

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        super.create();

        this.createBackground();

        this.createSidebar();

        this._sidebar.selectCategory(

            "synthesizer"

        );

        this.createShowcase();

        this.createCraftGrid();

        this.createRecipePanel();

        this.createQuantityController();

        this.createCraftButton();

        this.createController();

        this.leaveCraftMode();

        this._controller.onSelectionChanged();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        const background =

            LOGICPULSE.Assets.createSprite(

                LOGICPULSE.Assets.Folders.Synthesizer,

                LOGICPULSE.Assets.Images.Synthesizer.Background

            );

        this.addChild(background);

    }

    //--------------------------------
    // Sidebar
    //--------------------------------

    createSidebar() {

        this._sidebar =

            new LOGICPULSE.UI.Sidebar();

        this.addChild(this._sidebar);

    }

    //--------------------------------
    // Showcase
    //--------------------------------

    createShowcase() {

        this._showcase =

            new LOGICPULSE.UI.SynthesizerShowcase();

        this.addChild(this._showcase);

    }

    //--------------------------------
    // Craft Grid
    //--------------------------------

    createCraftGrid() {

        this._craftGrid =

            new LOGICPULSE.UI.SynthesizerGrid(

                LOGICPULSE.Layout.Synthesizer.Grid

            );

        this.addChild(this._craftGrid);

    }

    //--------------------------------
    // Recipe Panel
    //--------------------------------

    createRecipePanel() {

        this._recipePanel =

            new LOGICPULSE.UI.RecipePanel();

        this.addChild(this._recipePanel);

    }

    //--------------------------------
    // Quantity Controller
    //--------------------------------

    createQuantityController() {

        this._quantityController =

            new LOGICPULSE.UI.QuantityController();

        this.addChild(

            this._quantityController

        );

    }

    //--------------------------------
    // Craft Button
    //--------------------------------

    createCraftButton() {

        this._craftButton =

            new LOGICPULSE.UI.CraftButton();

        this.addChild(

            this._craftButton

        );

    }

    //--------------------------------
    // Controller
    //--------------------------------

    createController() {

        this._controller =

            new LOGICPULSE.SynthesizerController(

                this

            );

    }


    //--------------------------------
    // Enter Craft Mode
    //--------------------------------

    enterCraftMode(item) {

        if (!item) {

            return;

        }

        this._selectedItem = item;


        this._craftGrid.setCraftingItem?.(

            item

        );

    }

    //--------------------------------
    // Leave Craft Mode
    //--------------------------------

    leaveCraftMode() {

        this._selectedItem = null;

        this._craftGrid.clearCraftingItem();

    }

    //--------------------------------
    // Craft Current Item
    //--------------------------------

    craftCurrentItem() {

        if (!this._selectedItem) {

            return;

        }

        const amount =

            this._quantityController.value();

        if (amount <= 0) {

            return;

        }

        const success =

            LOGICPULSE.CraftManager.craft(

                this._selectedItem,

                amount

            );

        if (!success) {

            SoundManager.playBuzzer();

            return;

        }

        SoundManager.playOk();

        this._craftButton.playPressAnimation();

        //--------------------------------
        // Refresh UI
        //--------------------------------

        const index = this._craftGrid.selectedIndex();

        this._craftGrid.buildGrid();

        this._craftGrid.setSelectedIndex(index);

        this._craftGrid.setCraftingItem(this._selectedItem);

        this._controller.onSelectionChanged();

        this._selectedItem =
            this._craftGrid.selectedEntry()?.item ?? null;

        // If the recipe can no longer be crafted,
        // automatically return to selection mode.
        if (
            !this._selectedItem ||
            !LOGICPULSE.RecipeManager.canCraft(this._selectedItem)
        ) {
            this._controller.leaveCraftMode();
        }



    }


    //--------------------------------
    // Cancel
    //--------------------------------

    onCancel() {

        SceneManager.pop();

    }


//--------------------------------
// Update
//--------------------------------

    update() {

        super.update();

        if (this._controller) {

            this._controller.update();

        }

        if (this._craftGrid) {

            this._craftGrid.update();

        }

        if (this._sidebar) {

            this._sidebar.update();

        }

    }

};