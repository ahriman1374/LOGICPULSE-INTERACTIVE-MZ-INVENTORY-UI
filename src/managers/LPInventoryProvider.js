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


};