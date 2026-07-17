"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.Scenes = LOGICPULSE.Scenes || {};

LOGICPULSE.Scenes.Synthesizer = class extends Scene_MenuBase {

    initialize() {
        super.initialize();
        this._selectedItem = null;
        this._lastSelectedIndex = -1;
    }

    create() {
        super.create();

        this.createBackground();
        this.createSidebar();
        this._sidebar.selectCategory("synthesizer");

        this.createShowcase();
        this.createCraftGrid();
        this.createRecipePanel();
        this.createQuantityController();
        this.createCraftButton();
        this.createController();


        // Rebuild recipe panel if layout changed (e.g., parameters)
        if (LOGICPULSE._layoutChanged) {
            this._recipePanel.rebuild();
            LOGICPULSE._layoutChanged = false;
        }

        this.leaveCraftMode();
        this._controller.onSelectionChanged();

        if (this._craftGrid) {
            this._lastSelectedIndex = this._craftGrid.selectedIndex();
        }
    }

    createBackground() {
        const bg = LOGICPULSE.Assets.createSprite(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.Background
        );
        this.addChild(bg);
    }

    createSidebar() {
        this._sidebar = new LOGICPULSE.UI.Sidebar();
        this._sidebar.setOnTabSelected(this._onSidebarTabSelected.bind(this));
        this.addChild(this._sidebar);
    }

    _onSidebarTabSelected(index, category) {
        if (category === "synthesizer") return;
        LOGICPULSE._pendingInventoryCategory = category;
        SceneManager.goto(LOGICPULSE.Scenes.Inventory);
    }

    createShowcase() {
        this._showcase = new LOGICPULSE.UI.SynthesizerShowcase();
        this.addChild(this._showcase);
    }

    createCraftGrid() {
        this._craftGrid = new LOGICPULSE.UI.SynthesizerGrid(
            LOGICPULSE.Layout.Synthesizer.Grid
        );
        this.addChild(this._craftGrid);
    }

    createRecipePanel() {
        this._recipePanel = new LOGICPULSE.UI.RecipePanel();
        this.addChild(this._recipePanel);
    }


    createQuantityController() {
        this._quantityController = new LOGICPULSE.UI.QuantityController();
        this.addChild(this._quantityController);
    }

    createCraftButton() {
        this._craftButton = new LOGICPULSE.UI.CraftButton();
        this.addChild(this._craftButton);
    }

    createController() {
        this._controller = new LOGICPULSE.SynthesizerController(this);
    }

    enterCraftMode(item) {
        if (!item) return;
        this._selectedItem = item;
        if (this._craftGrid && this._craftGrid.setCraftingItem) {
            this._craftGrid.setCraftingItem(item);
        }
    }

    leaveCraftMode() {
        this._selectedItem = null;
        if (this._craftGrid && this._craftGrid.clearCraftingItem) {
            this._craftGrid.clearCraftingItem();
        }
    }

    craftCurrentItem() {
        if (!this._selectedItem) return;

        const amount = this._quantityController.value();
        if (amount <= 0) return;

        const success = LOGICPULSE.CraftManager.craft(this._selectedItem, amount);
        if (!success) {
            SoundManager.playBuzzer();
            return;
        }

        SoundManager.playOk();
        this._craftButton.playPressAnimation();

        const index = this._craftGrid.selectedIndex();
        this._craftGrid.buildGrid();
        this._craftGrid.setSelectedIndex(index);
        this._craftGrid.setCraftingItem(this._selectedItem);
        this._controller.onSelectionChanged();

        this._selectedItem = this._craftGrid.selectedEntry()?.item ?? null;

        if (!this._selectedItem || !LOGICPULSE.RecipeManager.canCraft(this._selectedItem)) {
            this._controller.leaveCraftMode();
        }

        if (this._craftGrid) {
            this._lastSelectedIndex = this._craftGrid.selectedIndex();
        }
    }

    onCancel() {
        SceneManager.pop();
    }

    update() {
        super.update();

        LOGICPULSE.Mouse.update();

        if (this._sidebar && typeof this._sidebar.processMouseInput === 'function') {
            this._sidebar.processMouseInput(LOGICPULSE.Mouse.x(), LOGICPULSE.Mouse.y());
        }

        if (this._quantityController && typeof this._quantityController.processMouseInput === 'function') {
            this._quantityController.processMouseInput(LOGICPULSE.Mouse.x(), LOGICPULSE.Mouse.y());
        }

        if (this._craftButton && typeof this._craftButton.processMouseInput === 'function') {
            this._craftButton.processMouseInput(LOGICPULSE.Mouse.x(), LOGICPULSE.Mouse.y());
        }

        if (this._controller) this._controller.update();
        if (this._craftGrid) this._craftGrid.update();
        if (this._sidebar) this._sidebar.update();
        if (this._quantityController) this._quantityController.update();
    }
};