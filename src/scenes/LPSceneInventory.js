"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.Scenes = LOGICPULSE.Scenes || {};

LOGICPULSE.Scenes.Inventory = class extends Scene_MenuBase {

    initialize() {
        super.initialize();
        this._lastSelectedIndex = -1;
    }

    create() {
        super.create();

        this.createBackground();
        this.createSidebar();
        this.createShowcase();
        this.createGrid();
        this.createController();

        // Apply pending category from synthesizer
        if (LOGICPULSE._pendingInventoryCategory) {
            const category = LOGICPULSE._pendingInventoryCategory;
            LOGICPULSE._pendingInventoryCategory = null;
            if (this._grid && this._sidebar) {
                // Force refresh provider and grid
                LOGICPULSE.InventoryProvider.refresh();
                this._grid.setCategory(category);
                this._sidebar.selectCategory(category);
                this._grid.setSelectedIndex(0);
                this._grid.buildGrid();
                this.onSelectionChanged();
            }
        }

        this.onSelectionChanged();
        this._lastSelectedIndex = this._grid ? this._grid.selectedIndex() : -1;
    }

    createBackground() {
        const background = LOGICPULSE.Assets.createSprite(
            LOGICPULSE.Assets.Folders.Inventory,
            "Background"
        );
        this.addChild(background);
    }

    createSidebar() {
        this._sidebar = new LOGICPULSE.UI.Sidebar();
        this._sidebar.setOnTabSelected(this._onSidebarTabSelected.bind(this));
        this.addChild(this._sidebar);
    }

    _onSidebarTabSelected(index, category) {
        if (index < 0) return;
        console.log('Sidebar mouse clicked:', category, 'index:', index);

        if (category === "synthesizer") {
            SceneManager.goto(LOGICPULSE.Scenes.Synthesizer);
            return;
        }

        // Directly update the grid and sidebar
        if (this._grid && this._sidebar) {
            // Force refresh inventory provider to get latest items
            LOGICPULSE.InventoryProvider.refresh();

            // Set category and rebuild grid
            this._grid.setCategory(category);
            this._grid.setSelectedIndex(0);
            this._grid.buildGrid(); // force rebuild

            // Select the tab visually
            this._sidebar.select(index);

            // Update showcase
            this.onSelectionChanged();
            this._lastSelectedIndex = this._grid.selectedIndex();
        }
    }

    createShowcase() {
        this._showcase = new LOGICPULSE.UI.Showcase();
        this.addChild(this._showcase);
    }

    createGrid() {
        this._grid = new LOGICPULSE.UI.Grid(
            LOGICPULSE.Layout.Inventory.Grid,
            {
                provider: grid => LOGICPULSE.InventoryProvider.getItems(grid.category())
            }
        );
        this.addChild(this._grid);
    }

    createController() {
        this._controller = new LOGICPULSE.InventoryController(this);
    }

    update() {
        super.update();

        LOGICPULSE.Mouse.update();

        // Process sidebar mouse input
        if (this._sidebar && typeof this._sidebar.processMouseInput === 'function') {
            this._sidebar.processMouseInput(LOGICPULSE.Mouse.x(), LOGICPULSE.Mouse.y());
        }

        // Process showcase button
        if (this._showcase && this._showcase.processMouseInput) {
            this._showcase.processMouseInput();
        }

        if (this._controller) this._controller.update();
        if (this._grid) this._grid.update();
        if (this._sidebar) this._sidebar.update();
    }

    onSelectionChanged() {
        if (!this._grid) return;
        const entry = this._grid.selectedEntry();
        if (this._showcase) this._showcase.setItem(entry);
    }

    onConfirm() {
        const entry = this._grid.selectedEntry();
        if (!entry) return;
        if (!LOGICPULSE.InventoryProvider.canUse(entry.item)) return;

        const success = LOGICPULSE.InventoryProvider.useItem(entry.item);
        if (!success) return;

        if (this._showcase && this._showcase.playUseAnimation) {
            this._showcase.playUseAnimation();
        }

        AudioManager.playSe({ name: "Decision2", volume: 90, pitch: 100, pan: 0 });
        this.refreshInventory();
    }

    onCancel() {
        SceneManager.pop();
    }

    refreshInventory() {
        const prev = this._grid.selectedIndex();
        this._grid.buildGrid();
        const max = this._grid.items().length - 1;
        if (max >= 0) this._grid.setSelectedIndex(Math.min(prev, max));
        this._lastSelectedIndex = this._grid.selectedIndex();
        this.onSelectionChanged();
    }
};