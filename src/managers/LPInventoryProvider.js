"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Inventory Provider
//=============================================================================

LOGICPULSE.InventoryProvider = {

    _entries: {},

    _dirty: true,

    //--------------------------------
    // Refresh Cache
    //--------------------------------

    refresh() {

        const Category = LOGICPULSE.Constants.Category;

        this._entries = {};

        for (const category of Object.values(Category)) {

            this._entries[category] = [];

        }

        this.buildInventory();

        this.sortEntries();

        this._dirty = false;

    },

    //--------------------------------
    // Mark Dirty
    //--------------------------------

    markDirty() {

        this._dirty = true;

    },

    //--------------------------------
    // Ensure Ready
    //--------------------------------

    ensureReady() {

        if (this._dirty) {

            this.refresh();

        }

    },

    //--------------------------------
    // Build Inventory
    //--------------------------------

    buildInventory() {

        this.buildItems();
        this.buildWeapons();
        this.buildArmors();

    },

    //--------------------------------
    // Build Items
    //--------------------------------

    buildItems() {

        const items = $gameParty.items();

        for (const item of items) {

            const entry = this.buildEntry(item);

            this._entries[entry.category].push(entry);

        }

    },

    //--------------------------------
    // Build Weapons
    //--------------------------------

    buildWeapons() {

        const weapons = $gameParty.weapons();

        const Category = LOGICPULSE.Constants.Category;

        for (const weapon of weapons) {

            const entry = this.buildEntry(

                weapon,
                Category.Weapon

            );

            this._entries[Category.Weapon].push(entry);

        }

    },

    //--------------------------------
    // Build Armors
    //--------------------------------

    buildArmors() {

        const armors = $gameParty.armors();

        const Category = LOGICPULSE.Constants.Category;

        for (const armor of armors) {

            const entry = this.buildEntry(

                armor,
                Category.Armor

            );

            this._entries[Category.Armor].push(entry);

        }

    },

    //--------------------------------
    // Build Entry
    //--------------------------------

    buildEntry(item, category = null) {

        return {

            id: item.id,

            item: item,

            amount: $gameParty.numItems(item),

            rarity: this.getRarity(item),

            category: category || this.getCategory(item)

        };

    },

    //--------------------------------
    // Get Items
    //--------------------------------

    getItems(category) {

        this.ensureReady();

        return this._entries[category] || [];

    },

    //--------------------------------
    // Consumables
    //--------------------------------

    getConsumables() {

        return this.getItems(

            LOGICPULSE.Constants.Category.Consumable

        );

    },

    //--------------------------------
    // Materials
    //--------------------------------

    getMaterials() {

        return this.getItems(

            LOGICPULSE.Constants.Category.Material

        );

    },

    //--------------------------------
    // Key Items
    //--------------------------------

    getKeyItems() {

        return this.getItems(

            LOGICPULSE.Constants.Category.Key

        );

    },

    //--------------------------------
    // Hidden B
    //--------------------------------

    getHiddenItemsB() {

        return this.getItems(

            LOGICPULSE.Constants.Category.HiddenB

        );

    },

    //--------------------------------
    // Weapons
    //--------------------------------

    getWeapons() {

        return this.getItems(

            LOGICPULSE.Constants.Category.Weapon

        );

    },

    //--------------------------------
    // Armors
    //--------------------------------

    getArmors() {

        return this.getItems(

            LOGICPULSE.Constants.Category.Armor

        );

    },

    //--------------------------------
    // Has Items
    //--------------------------------

    hasItems(category) {

        return this.getItems(category).length > 0;

    },

    //--------------------------------
    // Has Recipes
    //--------------------------------

    hasRecipes() {

        // Placeholder until the Synthesizer
        // system is implemented.

        return false;

    },

    //--------------------------------
    // Has Category Content
    //--------------------------------

    hasCategoryContent(category) {

        switch (category) {

            case LOGICPULSE.Constants.Category.Consumable:
            case LOGICPULSE.Constants.Category.Material:
            case LOGICPULSE.Constants.Category.Key:
            case LOGICPULSE.Constants.Category.HiddenB:
            case LOGICPULSE.Constants.Category.Weapon:
            case LOGICPULSE.Constants.Category.Armor:

                return this.hasItems(category);

            case "synthesizer":

                return this.hasRecipes();

            default:

                return false;

        }

    },



    //--------------------------------
    // Count
    //--------------------------------

    count(category) {

        return this.getItems(category).length;

    },

    //--------------------------------
    // Get All
    //--------------------------------

    getAll() {

        this.ensureReady();

        return Object.values(this._entries).flat();

    },


    //--------------------------------
    // Category
    //--------------------------------

    getCategory(item) {

        const Category = LOGICPULSE.Constants.Category;

        switch (item.itypeId) {

            case 1:
                return Category.Consumable;

            case 2:
                return Category.Key;

            case 3:
                return Category.Material;

            case 4:
                return Category.HiddenB;

            default:
                return Category.Unknown;

        }

    },


    //--------------------------------
    // Rarity
    //--------------------------------

    getRarity(item) {

        return Number(item.meta.rarity || 1);

    },


    //--------------------------------
    // Selected Amount
    //--------------------------------

    amount(item) {

        if (!item) {

            return 0;

        }

        return $gameParty.numItems(item);

    },


    //--------------------------------
    // Sort Entries
    //--------------------------------

    sortEntries() {

        for (const category of Object.keys(this._entries)) {

            this._entries[category].sort((a, b) => {

                // Higher rarity first
                if (a.rarity !== b.rarity) {

                    return b.rarity - a.rarity;

                }

                // Then alphabetical
                return a.item.name.localeCompare(

                    b.item.name

                );

            });

        }

    },

    //--------------------------------
    // Can Use
    //--------------------------------

    canUse(item) {

        if (!item) {

            return false;

        }

        return $gameParty.canUse(item);

    },

    //--------------------------------
    // Show Use Button
    //--------------------------------

    showUseButton(item) {

        if (!item) {

            return false;

        }

        // Weapons / Armors
        if (DataManager.isWeapon(item)) {

            return false;

        }

        if (DataManager.isArmor(item)) {

            return false;

        }

        // Only normal items
        if (!DataManager.isItem(item)) {

            return false;

        }

        // Only regular consumable items
        if (item.itypeId !== 1) {

            return false;

        }

        // Database:
        // 0 = Always
        // 1 = Battle
        // 2 = Menu
        // 3 = Never

        return item.occasion !== 3;

    },

    //--------------------------------
    // Use Item
    //--------------------------------

    useItem(item) {

        if (!this.canUse(item)) {

            return false;

        }

        const actor = $gameParty.leader();

        if (!actor) {

            return false;

        }

        const action = new Game_Action(actor);

        action.setItemObject(item);

        action.apply(actor);

        $gameParty.consumeItem(item);

        this.markDirty();

        return true;

    },



};