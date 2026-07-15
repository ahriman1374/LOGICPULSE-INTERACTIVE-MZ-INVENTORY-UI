"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Craft Manager
//=============================================================================

LOGICPULSE.CraftManager = {

    //--------------------------------
    // Can Craft
    //--------------------------------

    canCraft(item, amount = 1) {

        if (!item) {

            return false;

        }

        if (!LOGICPULSE.RecipeManager.hasRecipe(item)) {

            return false;

        }

        return (

            LOGICPULSE.RecipeManager.maxCraftAmount(item)

            >=

            amount

        );

    },

    //--------------------------------
    // Craft
    //--------------------------------

    craft(item, amount = 1) {

        if (

            !this.canCraft(

                item,

                amount

            )

        ) {

            return false;

        }

        const recipe =

            LOGICPULSE.RecipeManager.recipe(

                item

            );

        //--------------------------------
        // Remove Materials
        //--------------------------------

        for (const ingredient of recipe) {

            const material =

                $dataItems[

                    ingredient.itemId

                    ];

            LOGICPULSE.InventoryProvider.loseItem(

                material,

                ingredient.amount * amount

            );

        }

        //--------------------------------
        // Give Crafted Item
        //--------------------------------

        LOGICPULSE.InventoryProvider.gainItem(

            item,

            amount

        );


        return true;

    },

    //--------------------------------
    // Max Craft Amount
    //--------------------------------

    maxCraftAmount(item) {

        return LOGICPULSE.RecipeManager.maxCraftAmount(

            item

        );

    },

    //--------------------------------
    // Recipe
    //--------------------------------

    recipe(item) {

        return LOGICPULSE.RecipeManager.recipe(

            item

        );

    }

};