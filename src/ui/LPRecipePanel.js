"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};


//=============================================================================
// Recipe Panel
//=============================================================================

LOGICPULSE.UI.RecipePanel = class extends LOGICPULSE.UI.Element {


    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {

        super();

        this._recipe = [];

        this._slots = [];

        this.create();

    }



    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createBackground();

        this.createSlots();

    }



    //--------------------------------
    // Background Boxes
    //--------------------------------

    createBackground() {

        const layout =
            LOGICPULSE.Layout.Synthesizer.RecipeItemBoxes;


        for (let i = 0; i < 4; i++) {

            const sprite =
                this.createSprite(

                    LOGICPULSE.Assets.Folders.Synthesizer,

                    LOGICPULSE.Assets.Images.Synthesizer.RecipeItemBoxes

                );


            sprite.x =
                layout.firstSlot.x +
                (i * layout.spacing);


            sprite.y =
                layout.firstSlot.y;


        }

    }



    //--------------------------------
    // Create Slots
    //--------------------------------

    createSlots() {

        const layout =
            LOGICPULSE.Layout.Synthesizer.RecipeItemBoxes;

        for (let i = 0; i < 4; i++) {

            const slot = new PIXI.Container();

            slot.x =
                layout.firstSlot.x +
                (i * layout.spacing);

            slot.y =
                layout.firstSlot.y;

            this.addChild(slot);

            this._slots.push(slot);

        }

    }



    //--------------------------------
    // Set Recipe
    //--------------------------------

    setRecipe(recipe) {

        this._recipe = recipe || [];

        this.refresh();

    }



    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {


        for (let i = 0; i < this._slots.length; i++) {


            const slot =
                this._slots[i];


            this.clearSlot(slot);


            const ingredient =
                this._recipe[i];


            if (!ingredient) {

                continue;

            }


            this.drawMaterial(

                slot,

                ingredient

            );

        }

    }



    //--------------------------------
    // Clear Slot
    //--------------------------------

    clearSlot(slot) {


        while (slot.children.length > 0) {

            slot.removeChildAt(0);

        }

    }



//--------------------------------
// Draw Material
//--------------------------------

    drawMaterial(slot, ingredient) {

        const item = $dataItems[ingredient.itemId];

        if (!item) {

            return;

        }

        //--------------------------------
        // Icon
        //--------------------------------

        const icon = LOGICPULSE.Assets.createItemSprite(item);

        slot.addChild(icon);

        //--------------------------------
        // Amount
        //--------------------------------

        const amountLayout =
            LOGICPULSE.Layout.Synthesizer.RecipeItemBoxes.Amount;

        const amount = this.createText({

            text: String(ingredient.amount),

            x: amountLayout.x,
            y: amountLayout.y,

            width: amountLayout.width,
            height: amountLayout.height,

            align: amountLayout.align,

            fontSize: amountLayout.fontSize

        });

        slot.addChild(amount);

        //--------------------------------
        // Name
        //--------------------------------

        const nameLayout =
            LOGICPULSE.Layout.Synthesizer.RecipeItemBoxes.ItemName;

        let name = item.name;

        // Optional: shorten long names
        if (name.length > 16) {

            name = name.substring(0, 9) + "...";

        }

        const nameText = this.createText({

            text: name,

            x: nameLayout.x,
            y: nameLayout.y,

            width: nameLayout.width,
            height: nameLayout.height,

            align: nameLayout.align,

            fontSize: nameLayout.fontSize

        });

        slot.addChild(nameText);

    }



    //--------------------------------
    // Selected Item
    //--------------------------------

    setItem(item) {


        if (!item) {

            this.clear();

            return;

        }


        this.setRecipe(

            LOGICPULSE.RecipeManager.recipe(item)

        );

    }



    //--------------------------------
    // Clear
    //--------------------------------

    clear() {

        this.setRecipe([]);

    }


};