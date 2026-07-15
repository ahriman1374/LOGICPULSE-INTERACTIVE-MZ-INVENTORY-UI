"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Recipe Manager
//=============================================================================

LOGICPULSE.RecipeManager = {

    //--------------------------------
    // Initialize
    //--------------------------------

    initialize() {

        this._recipes = {};

        this.buildCache();

    },

    //--------------------------------
    // Build Cache
    //--------------------------------

    buildCache() {

        this._recipes = {};

        if (!$dataItems) {

            return;

        }

        for (const item of $dataItems) {

            if (!item) {

                continue;

            }

            const recipe = this.parseRecipe(item.note);

            if (recipe.length > 0) {

                this._recipes[item.id] = recipe;

            }

        }

    },

    //--------------------------------
    // Parse Recipe
    //--------------------------------

    parseRecipe(note) {

        if (!note) {

            return [];

        }

        const match = note.match(

            /<Recipe>([\s\S]*?)<\/Recipe>/i

        );

        if (!match) {

            return [];

        }

        const result = [];

        const lines =

            match[1]

                .split(/\r?\n/)

                .map(line => line.trim())

                .filter(line => line.length > 0);

        for (const line of lines) {

            const parts = line.split(":");

            if (parts.length !== 2) {

                continue;

            }

            const itemId = Number(parts[0]);

            const amount = Number(parts[1]);

            if (

                Number.isNaN(itemId) ||

                Number.isNaN(amount)

            ) {

                continue;

            }

            result.push({

                itemId: itemId,

                amount: amount

            });

        }

        return result;

    },

    //--------------------------------
    // Has Recipe
    //--------------------------------

    hasRecipe(item) {

        if (!item) {

            return false;

        }

        return !!this._recipes[item.id];

    },


    //--------------------------------
    // Recipe
    //--------------------------------

    recipe(item) {

        if (!item) {

            return [];

        }

        return this._recipes[item.id] || [];

    },

    //--------------------------------
    // Get Recipe
    //--------------------------------

    getRecipe(item) {

        return this.recipe(item);

    },

    //--------------------------------
    // Ingredient Items
    //--------------------------------

    ingredientItems(item) {

        return this.recipe(item).map(entry => ({

            item: $dataItems[entry.itemId],

            amount: entry.amount

        }));

    },

    //--------------------------------
    // Can Craft
    //--------------------------------

    canCraft(item) {

        if (!this.hasRecipe(item)) {

            return false;

        }

        return this.maxCraftAmount(item) > 0;

    },

    //--------------------------------
    // Max Craft Amount
    //--------------------------------

    maxCraftAmount(item) {

        const recipe = this.recipe(item);

        if (recipe.length === 0) {

            return 0;

        }

        let max = Infinity;

        for (const ingredient of recipe) {

            const material =

                $dataItems[ingredient.itemId];

            if (!material) {

                return 0;

            }

            const owned =

                LOGICPULSE.InventoryProvider.amount(

                    material

                );

            const craftable = Math.floor(

                owned / ingredient.amount

            );

            max = Math.min(

                max,

                craftable

            );

        }

        return Math.max(

            0,

            max

        );

    },

    //--------------------------------
    // Missing Ingredients
    //--------------------------------

    missingIngredients(item) {

        const missing = [];

        for (const ingredient of this.recipe(item)) {

            const material =

                $dataItems[ingredient.itemId];

            if (!material) {

                continue;

            }

            const owned =

                LOGICPULSE.InventoryProvider.amount(

                    material

                );

            if (owned < ingredient.amount) {

                missing.push({

                    item: material,

                    required: ingredient.amount,

                    owned: owned

                });

            }

        }

        return missing;

    }

};

//=============================================================================
// Database Hook
//=============================================================================

(() => {

    const alias = DataManager.isDatabaseLoaded;

    DataManager.isDatabaseLoaded = function() {

        if (!alias.call(this)) {

            return false;

        }

        if (!LOGICPULSE.RecipeManager._recipes) {

            LOGICPULSE.RecipeManager.initialize();

        }

        return true;

    };

})();