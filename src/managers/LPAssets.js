"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Asset Manager
//=============================================================================

LOGICPULSE.Assets = {

    //==================================================
    // System Assets
    //==================================================

    IconSet: null,

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

    //==================================================
    // Image Catalog
    //==================================================

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
    // Initialize
    //==================================================

    initialize() {

        this.loadSystemAssets();

    },

    //==================================================
    // Load System Assets
    //==================================================

    loadSystemAssets() {

        this.IconSet = ImageManager.loadSystem(

            "IconSet"

        );

    },

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

            return !!this.load(

                folder,
                filename

            );

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

        sprite.bitmap = this.load(

            folder,
            filename

        );

        return sprite;

    },

    //==================================================
    // Create Inventory Item Sprite (HD)
    //==================================================

    createItemSprite(item) {

        if (!item) {

            return new Sprite();

        }

        return this.createSprite(

            this.Folders.Items,

            `Item_${item.iconIndex}`

        );

    },

    //==================================================
    // Create RPG Maker Icon
    //==================================================

    createIcon(iconIndex) {

        const sprite = new Sprite(

            this.IconSet

        );

        const rect = this.iconRect(

            iconIndex

        );

        sprite.setFrame(

            rect.x,
            rect.y,
            rect.width,
            rect.height

        );

        return sprite;

    },

    //==================================================
    // Icon Rectangle
    //==================================================

    iconRect(iconIndex) {

        const width = ImageManager.iconWidth;

        const height = ImageManager.iconHeight;

        return {

            x: (iconIndex % 16) * width,

            y: Math.floor(iconIndex / 16) * height,

            width: width,

            height: height

        };

    },

    //==================================================
    // Clear Cache
    //==================================================

    clearCache() {

        this._cache = {};

    }

};