"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Synthesizer Controller
//=============================================================================

LOGICPULSE.SynthesizerController = class {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor(scene) {

        this._scene = scene;

        this._state = "select";

    }

    //--------------------------------
    // Update
    //--------------------------------

    update() {

        if (this._state === "select") {

            this.updateGridInput();

        }

        else {

            this.updateQuantityInput();

        }


        this.updateConfirmInput();

        this.updateCancelInput();

        this.updateCategoryInput();

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
    // Quantity Input
    //--------------------------------

    updateQuantityInput() {

        const controller = this.quantityController();

        if (!controller) {

            return;

        }

        let step = 1;


        if (Input.isPressed("skip")) {

            step = 10;

        }

        if (Input.isPressed("shift")) {

            step = controller.max();

        }


        const B = LOGICPULSE.Bindings;


        if (LOGICPULSE.Input.isRepeated(B.MoveLeft)) {

            controller.decrease(step);

        }

        else if (LOGICPULSE.Input.isRepeated(B.MoveRight)) {

            controller.increase(step);

        }

    }

    //--------------------------------
    // Category Input
    //--------------------------------

    updateCategoryInput() {

        const B = LOGICPULSE.Bindings;

        if (
            LOGICPULSE.Input.isTriggered(B.NextCategory) ||
            LOGICPULSE.Input.isTriggered(B.PreviousCategory)
        ) {

            SceneManager.goto(

                LOGICPULSE.Scenes.Inventory

            );

        }

    }

    //--------------------------------
    // Confirm
    //--------------------------------

    updateConfirmInput() {

        if (

            LOGICPULSE.Input.isTriggered(

                LOGICPULSE.Bindings.Confirm

            )

        ) {

            if (this._state === "select") {

                this.enterCraftMode();

            }

            else {

                this.craft();

            }

        }

    }

    //--------------------------------
    // Cancel
    //--------------------------------

    updateCancelInput() {

        if (

            LOGICPULSE.Input.isTriggered(

                LOGICPULSE.Bindings.Cancel

            )

        ) {

            if (this._state === "craft") {

                this.leaveCraftMode();

            }

            else {

                this.onCancel();

            }

        }

    }

    //--------------------------------
    // Enter Craft Mode
    //--------------------------------

    enterCraftMode() {

        const entry = this.grid().selectedEntry();

        if (!entry) {

            return;

        }


        if (

            !LOGICPULSE.RecipeManager.canCraft(

                entry.item

            )

        ) {

            return;

        }

        this._state = "craft";

        this.scene()._quantityController?.setItem(

            entry.item

        );

        this.scene().enterCraftMode?.(

            entry.item

        );

    }

    //--------------------------------
    // Leave Craft Mode
    //--------------------------------

    leaveCraftMode() {

        this._state = "select";

        this.scene().leaveCraftMode?.();

    }

    //--------------------------------
    // Craft
    //--------------------------------

    craft() {

        this.scene().craftCurrentItem?.();

    }

    //--------------------------------
    // Change Category
    //--------------------------------

    changeCategory(direction) {

        SceneManager.goto(

            LOGICPULSE.Scenes.Inventory

        );

    }

    //--------------------------------
    // Selection Changed
    //--------------------------------

    onSelectionChanged() {

        const entry = this.grid().selectedEntry();

        if (!entry) {

            this.scene()._recipePanel?.clear();

            this.scene()._showcase?.setItem?.(null);

            this.scene()._quantityController?.setItem?.(null);

            this.scene()._craftButton?.setItem?.(null);

            this.scene().onSelectionChanged?.();

            return;

        }

        const recipe =

            LOGICPULSE.RecipeManager.recipe(

                entry.item

            );

        this.scene()._recipePanel?.setRecipe(

            recipe

        );

        this.scene()._showcase?.setItem?.(

            entry.item

        );

        this.scene()._quantityController?.setItem?.(

            entry.item

        );

        this.scene()._craftButton?.setItem?.(

            entry.item

        );

        this.scene().onSelectionChanged?.();

    }

    //--------------------------------
    // Cancel
    //--------------------------------

    onCancel() {

        this.scene().onCancel?.();

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

        return this.scene()._craftGrid;

    }

    //--------------------------------
    // Sidebar
    //--------------------------------

    sidebar() {

        return this.scene()._sidebar;

    }

    //--------------------------------
    // Quantity Controller
    //--------------------------------

    quantityController() {

        return this.scene()._quantityController;

    }

};