"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Inventory Controller
//=============================================================================

LOGICPULSE.InventoryController = class {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor(scene) {

        this._scene = scene;

    }

    //--------------------------------
    // Update
    //--------------------------------

    update() {

        this.updateGridInput();
        this.updateCategoryInput();
        this.updateConfirmInput();
        this.updateCancelInput();

    }

    //--------------------------------
    // Grid Input
    //--------------------------------

    updateGridInput() {

        const grid = this.grid();

        if (!grid) {

            return;

        }

        const B = LOGICPULSE.Bindings;

        let moved = false;

        if (LOGICPULSE.Input.isRepeated(B.MoveLeft)) {

            grid.moveLeft();
            moved = true;

        }

        else if (LOGICPULSE.Input.isRepeated(B.MoveRight)) {

            grid.moveRight();
            moved = true;

        }

        else if (LOGICPULSE.Input.isRepeated(B.MoveUp)) {

            grid.moveUp();
            moved = true;

        }

        else if (LOGICPULSE.Input.isRepeated(B.MoveDown)) {

            grid.moveDown();
            moved = true;

        }

        if (moved) {

            this.onSelectionChanged();

        }

    }

    //--------------------------------
    // Category Input
    //--------------------------------

    updateCategoryInput() {

        const B = LOGICPULSE.Bindings;

        if (LOGICPULSE.Input.isTriggered(B.NextCategory)) {

            this.nextCategory();

        }

        else if (LOGICPULSE.Input.isTriggered(B.PreviousCategory)) {

            this.previousCategory();

        }

    }

    //--------------------------------
    // Confirm Input
    //--------------------------------

    updateConfirmInput() {

        if (

            LOGICPULSE.Input.isTriggered(

                LOGICPULSE.Bindings.Confirm

            )

        ) {

            this.onConfirm();

        }

    }

    //--------------------------------
    // Cancel Input
    //--------------------------------

    updateCancelInput() {

        if (

            LOGICPULSE.Input.isTriggered(

                LOGICPULSE.Bindings.Cancel

            )

        ) {

            this.onCancel();

        }

    }

    //--------------------------------
    // Next Category
    //--------------------------------

    nextCategory() {

        this.changeCategory(1);

    }

    //--------------------------------
    // Previous Category
    //--------------------------------

    previousCategory() {

        this.changeCategory(-1);

    }

    //--------------------------------
    // Change Category
    //--------------------------------

    changeCategory(direction) {

        const sidebar = this.sidebar();

        if (!sidebar) {

            return;

        }

        const count = sidebar.categoryCount();

        let index = sidebar.selectedIndex();

        for (let i = 0; i < count; i++) {

            index += direction;

            if (index < 0) {

                index = count - 1;

            }

            else if (index >= count) {

                index = 0;

            }

            const definition = sidebar.definition(index);

            if (this.isCategoryAvailable(definition.category)) {

                sidebar.select(index);

                this.grid().setCategory(

                    definition.category

                );

                if (sidebar.refreshVisuals) {

                    sidebar.refreshVisuals();

                }

                this.onSelectionChanged();

                return;

            }

        }

    }

    //--------------------------------
    // Category Available
    //--------------------------------

    isCategoryAvailable(category) {

        return LOGICPULSE.InventoryProvider.hasCategoryContent(

            category

        );

    }

    //--------------------------------
    // Selection Changed
    //--------------------------------

    onSelectionChanged() {

        if (this._scene.onSelectionChanged) {

            this._scene.onSelectionChanged();

        }

    }

    //--------------------------------
    // Confirm
    //--------------------------------

    onConfirm() {

        if (this._scene.onConfirm) {

            this._scene.onConfirm();

        }

    }

    //--------------------------------
    // Cancel
    //--------------------------------

    onCancel() {

        if (this._scene.onCancel) {

            this._scene.onCancel();

        }

    }

    //--------------------------------
    // Scene
    //--------------------------------

    scene() {

        return this._scene;

    }

    //--------------------------------
    // Grid
    //--------------------------------

    grid() {

        return this.scene()._grid;

    }

    //--------------------------------
    // Sidebar
    //--------------------------------

    sidebar() {

        return this.scene()._sidebar;

    }

    //--------------------------------
    // Showcase
    //--------------------------------

    showcase() {

        return this.scene()._showcase;

    }

};