"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Asset Manager
//=============================================================================

LOGICPULSE.Assets = {

    //==================================================
    // Folder Definitions
    //==================================================

    Folders: Object.freeze({

        Inventory: "img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/",

        Sidebar: "img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Sidebar/",

        Items: "img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Items/",

        Showcase: "img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Items_Show_Case/",

        Synthesizer: "img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Synthesizer/"

    }),


    //--------------------------------
    // Image Catalog
    //--------------------------------

    Images: Object.freeze({

        Inventory: Object.freeze({

            Background: "Background",

            Showcase: "Item Showcase Box",

            ItemBoxCommon: "Item Box Common",

            ItemBoxRare: "Item Box Rare",

            ItemBoxLegendary: "Item Box Legendary"

        }),

        Sidebar: Object.freeze({

            Box: "Sidebar box",

            ConsumableIdle: "Sidebar Consumable Tab Idle",
            ConsumableHover: "Sidebar Consumable Tab Hover",

            MaterialIdle: "Sidebar Material Tab Idle",
            MaterialHover: "Sidebar Material Tab Hover",

            KeyMaterialIdle: "Sidebar Key Materials Tab Idle",
            KeyMaterialHover: "Sidebar Key Materials Tab Hover",

            SynthesizerIdle: "Sidebar Synthesizer Tab Idle",
            SynthesizerHover: "Sidebar Synthesizer Tab Hover"

        })

    }),


    //==================================================
    // Bitmap Cache
    //==================================================

    _cache: {},

    //==================================================
    // Load Bitmap
    //==================================================

    load(folder, filename) {

        if (!Object.values(this.Folders).includes(folder)) {

            throw new Error(
                `[LOGICPULSE] Unknown asset folder:\n${folder}`
            );

        }

        const key = `${folder}${filename}`;

        if (!this._cache[key]) {

            this._cache[key] = ImageManager.loadBitmap(
                folder,
                filename
            );

        }

        return this._cache[key];

    },

    //==================================================
    // Exists
    //==================================================

    exists(folder, filename) {

        try {

            const bitmap = this.load(folder, filename);

            return !!bitmap;

        }
        catch (e) {

            return false;

        }

    },

    //==================================================
    // Preload
    //==================================================

    preload(list) {

        for (const asset of list) {

            this.load(
                asset.folder,
                asset.file
            );

        }

    },


    //==================================================
    // Create Sprite
    //==================================================

    createSprite(folder, filename) {

        const sprite = new Sprite();

        sprite.bitmap = this.load(folder, filename);

        return sprite;

    },
    //==================================================
    // Clear Cache
    //==================================================

    clearCache() {

        this._cache = {};

    }

};