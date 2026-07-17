//=============================================================================
// LPParameters.js
//=============================================================================

window.LOGICPULSE = window.LOGICPULSE || {};

LOGICPULSE.Parameters = {

    //--------------------------------
    // Plugin Name (from Version.js)
    //--------------------------------

    _pluginName: LOGICPULSE.Version.plugin,

    //--------------------------------
    // Internal storage
    //--------------------------------

    _params: {},

    //--------------------------------
    // Initialize
    //--------------------------------

    initialize: function() {
        if (!LOGICPULSE.Layout) {
            console.warn('[LOGICPULSE] Layout not loaded yet.');
            return;
        }
        console.log('[LOGICPULSE] Reading parameters for plugin:', this._pluginName);
        this._readParams();
        this._applyParamsToLayout();
        console.log('[LOGICPULSE] Parameters applied.');
    },

    //--------------------------------
    // Read Parameters
    //--------------------------------

    _readParams: function() {
        var params = PluginManager.parameters(this._pluginName);
        var p = this._params;
        var L = LOGICPULSE.Layout;

        var getNumber = function(key, defaultVal) {
            var val = params[key];
            if (val !== undefined && val !== '') {
                return Number(val);
            }
            return defaultVal;
        };

        // Log the raw params to see what's being received
        console.log('[LOGICPULSE] Raw parameters:', params);

        //========= INVENTORY GRID =========
        p.invGridX = getNumber('InventoryGridX', L.Inventory.Grid.rect.x);
        p.invGridY = getNumber('InventoryGridY', L.Inventory.Grid.rect.y);
        p.invGridWidth = getNumber('InventoryGridWidth', L.Inventory.Grid.rect.width);
        p.invGridHeight = getNumber('InventoryGridHeight', L.Inventory.Grid.rect.height);
        p.invColumns = getNumber('InventoryColumns', L.Inventory.Grid.columns);
        p.invSpacingX = getNumber('InventorySpacingX', L.Inventory.Grid.spacingX);
        p.invSpacingY = getNumber('InventorySpacingY', L.Inventory.Grid.spacingY);
        p.invItemSize = getNumber('InventoryItemSize', L.Inventory.Grid.itemSize);

        //========= INVENTORY SHOWCASE =========
        p.invShowX = getNumber('InventoryShowX', L.Inventory.Showcase.Frame.x);
        p.invShowY = getNumber('InventoryShowY', L.Inventory.Showcase.Frame.y);
        p.invShowWidth = getNumber('InventoryShowWidth', L.Inventory.Showcase.Frame.width);
        p.invShowHeight = getNumber('InventoryShowHeight', L.Inventory.Showcase.Frame.height);

        //========= INVENTORY USE BUTTON =========
        p.invUseX = getNumber('InventoryUseX', L.Inventory.Showcase.Button.x);
        p.invUseY = getNumber('InventoryUseY', L.Inventory.Showcase.Button.y);
        p.invUseWidth = getNumber('InventoryUseWidth', L.Inventory.Showcase.Button.width);
        p.invUseHeight = getNumber('InventoryUseHeight', L.Inventory.Showcase.Button.height);

        //========= INVENTORY DESCRIPTION =========
        p.invDescFontSize = getNumber('InventoryDescFontSize', L.Inventory.Showcase.Description.fontSize);

        //========= SHARED SIDEBAR =========
        p.sidebarTabX = getNumber('SidebarTabX', L.Inventory.Sidebar.tabs.x);
        p.sidebarTabY = getNumber('SidebarTabY', L.Inventory.Sidebar.tabs.y);
        p.sidebarTabSpacing = getNumber('SidebarTabSpacing', L.Inventory.Sidebar.tabs.spacing);
        p.sidebarTabWidth = getNumber('SidebarTabWidth', L.Inventory.Sidebar.tabs.width);
        p.sidebarTabHeight = getNumber('SidebarTabHeight', L.Inventory.Sidebar.tabs.height);

        //========= SYNTHESIZER GRID =========
        p.synGridX = getNumber('SynthesizerGridX', L.Synthesizer.Grid.rect.x);
        p.synGridY = getNumber('SynthesizerGridY', L.Synthesizer.Grid.rect.y);
        p.synGridWidth = getNumber('SynthesizerGridWidth', L.Synthesizer.Grid.rect.width);
        p.synGridHeight = getNumber('SynthesizerGridHeight', L.Synthesizer.Grid.rect.height);
        p.synColumns = getNumber('SynthesizerColumns', L.Synthesizer.Grid.columns);
        p.synSpacingX = getNumber('SynthesizerSpacingX', L.Synthesizer.Grid.spacingX);
        p.synSpacingY = getNumber('SynthesizerSpacingY', L.Synthesizer.Grid.spacingY);
        p.synItemSize = getNumber('SynthesizerItemSize', L.Synthesizer.Grid.itemSize);

        //========= SYNTHESIZER SHOWCASE =========
        p.synShowX = getNumber('SynthesizerShowX', L.Synthesizer.Showcase.Frame.x);
        p.synShowY = getNumber('SynthesizerShowY', L.Synthesizer.Showcase.Frame.y);
        p.synShowWidth = getNumber('SynthesizerShowWidth', L.Synthesizer.Showcase.Frame.width);
        p.synShowHeight = getNumber('SynthesizerShowHeight', L.Synthesizer.Showcase.Frame.height);

        p.synDescX = getNumber('SynthesizerDescX', L.Synthesizer.Showcase.Description.x);
        p.synDescY = getNumber('SynthesizerDescY', L.Synthesizer.Showcase.Description.y);
        p.synDescWidth = getNumber('SynthesizerDescWidth', L.Synthesizer.Showcase.Description.width);
        p.synDescHeight = getNumber('SynthesizerDescHeight', L.Synthesizer.Showcase.Description.height);
        p.synDescFontSize = getNumber('SynthesizerDescFontSize', L.Synthesizer.Showcase.Description.fontSize);

        p.synTipX = getNumber('SynthesizerTipX', L.Synthesizer.Showcase.Tip.x);
        p.synTipY = getNumber('SynthesizerTipY', L.Synthesizer.Showcase.Tip.y);

        p.synDecreaseX = getNumber('SynthesizerDecreaseX', L.Synthesizer.Showcase.ItemDecrease.x);
        p.synDecreaseY = getNumber('SynthesizerDecreaseY', L.Synthesizer.Showcase.ItemDecrease.y);
        p.synDecreaseWidth = getNumber('SynthesizerDecreaseWidth', L.Synthesizer.Showcase.ItemDecrease.width);
        p.synDecreaseHeight = getNumber('SynthesizerDecreaseHeight', L.Synthesizer.Showcase.ItemDecrease.height);

        p.synIncreaseX = getNumber('SynthesizerIncreaseX', L.Synthesizer.Showcase.ItemIncrease.x);
        p.synIncreaseY = getNumber('SynthesizerIncreaseY', L.Synthesizer.Showcase.ItemIncrease.y);
        p.synIncreaseWidth = getNumber('SynthesizerIncreaseWidth', L.Synthesizer.Showcase.ItemIncrease.width);
        p.synIncreaseHeight = getNumber('SynthesizerIncreaseHeight', L.Synthesizer.Showcase.ItemIncrease.height);

        p.synCurrentX = getNumber('SynthesizerCurrentX', L.Synthesizer.Showcase.CurrentNumber.x);
        p.synCurrentY = getNumber('SynthesizerCurrentY', L.Synthesizer.Showcase.CurrentNumber.y);
        p.synCurrentWidth = getNumber('SynthesizerCurrentWidth', L.Synthesizer.Showcase.CurrentNumber.width);
        p.synCurrentHeight = getNumber('SynthesizerCurrentHeight', L.Synthesizer.Showcase.CurrentNumber.height);
        p.synCurrentFontSize = getNumber('SynthesizerCurrentFontSize', L.Synthesizer.Showcase.CurrentNumber.fontSize);

        p.synMaxX = getNumber('SynthesizerMaxX', L.Synthesizer.Showcase.MaxNumber.x);
        p.synMaxY = getNumber('SynthesizerMaxY', L.Synthesizer.Showcase.MaxNumber.y);
        p.synMaxWidth = getNumber('SynthesizerMaxWidth', L.Synthesizer.Showcase.MaxNumber.width);
        p.synMaxHeight = getNumber('SynthesizerMaxHeight', L.Synthesizer.Showcase.MaxNumber.height);
        p.synMaxFontSize = getNumber('SynthesizerMaxFontSize', L.Synthesizer.Showcase.MaxNumber.fontSize);

        p.synCraftX = getNumber('SynthesizerCraftX', L.Synthesizer.Showcase.Button.x);
        p.synCraftY = getNumber('SynthesizerCraftY', L.Synthesizer.Showcase.Button.y);
        p.synCraftWidth = getNumber('SynthesizerCraftWidth', L.Synthesizer.Showcase.Button.width);
        p.synCraftHeight = getNumber('SynthesizerCraftHeight', L.Synthesizer.Showcase.Button.height);

        //========= RECIPE PANEL =========
        p.recipeFirstX = getNumber('RecipeFirstX', L.Synthesizer.RecipeItemBoxes.firstSlot.x);
        p.recipeFirstY = getNumber('RecipeFirstY', L.Synthesizer.RecipeItemBoxes.firstSlot.y);
        p.recipeSpacing = getNumber('RecipeSpacing', L.Synthesizer.RecipeItemBoxes.spacing);

        //========= GLOBAL HOVER SCALES =========
        var defaultHoverScale = L.HoverScale !== undefined ? L.HoverScale : 1.02;
        var defaultUseHoverScale = L.UseButtonHoverScale !== undefined ? L.UseButtonHoverScale : 1.05;

        p.hoverScale = getNumber('HoverScale', defaultHoverScale);
        p.useHoverScale = getNumber('UseButtonHoverScale', defaultUseHoverScale);
    },

    //--------------------------------
    // Apply parameters to Layout
    //--------------------------------

    _applyParamsToLayout: function() {
        var p = this._params;
        var L = LOGICPULSE.Layout;

        //========= INVENTORY GRID =========
        L.Inventory.Grid.rect.x = p.invGridX;
        L.Inventory.Grid.rect.y = p.invGridY;
        L.Inventory.Grid.rect.width = p.invGridWidth;
        L.Inventory.Grid.rect.height = p.invGridHeight;
        // Update mask to match rect
        L.Inventory.Grid.mask.x = p.invGridX;
        L.Inventory.Grid.mask.y = p.invGridY;
        L.Inventory.Grid.mask.width = p.invGridWidth;
        L.Inventory.Grid.mask.height = p.invGridHeight;

        L.Inventory.Grid.columns = p.invColumns;
        L.Inventory.Grid.spacingX = p.invSpacingX;
        L.Inventory.Grid.spacingY = p.invSpacingY;
        L.Inventory.Grid.itemSize = p.invItemSize;

        //========= INVENTORY SHOWCASE =========
        L.Inventory.Showcase.Frame.x = p.invShowX;
        L.Inventory.Showcase.Frame.y = p.invShowY;
        L.Inventory.Showcase.Frame.width = p.invShowWidth;
        L.Inventory.Showcase.Frame.height = p.invShowHeight;

        // Update Name position to match Frame
        L.Inventory.Showcase.Name.x = p.invShowX;
        L.Inventory.Showcase.Name.y = p.invShowY + 8;

        // Update Description position to align with Frame
        L.Inventory.Showcase.Description.x = p.invShowX;
        L.Inventory.Showcase.Description.y = p.invShowY + p.invShowHeight + 28;
        L.Inventory.Showcase.Description.width = p.invShowWidth;
        L.Inventory.Showcase.Description.fontSize = p.invDescFontSize;

        //========= INVENTORY USE BUTTON =========
        L.Inventory.Showcase.Button.x = p.invUseX;
        L.Inventory.Showcase.Button.y = p.invUseY;
        L.Inventory.Showcase.Button.width = p.invUseWidth;
        L.Inventory.Showcase.Button.height = p.invUseHeight;

        //========= SHARED SIDEBAR =========
        L.Inventory.Sidebar.tabs.x = p.sidebarTabX;
        L.Inventory.Sidebar.tabs.y = p.sidebarTabY;
        L.Inventory.Sidebar.tabs.spacing = p.sidebarTabSpacing;
        L.Inventory.Sidebar.tabs.width = p.sidebarTabWidth;
        L.Inventory.Sidebar.tabs.height = p.sidebarTabHeight;

        //========= SYNTHESIZER GRID =========
        L.Synthesizer.Grid.rect.x = p.synGridX;
        L.Synthesizer.Grid.rect.y = p.synGridY;
        L.Synthesizer.Grid.rect.width = p.synGridWidth;
        L.Synthesizer.Grid.rect.height = p.synGridHeight;
        // Update mask to match rect
        L.Synthesizer.Grid.mask.x = p.synGridX;
        L.Synthesizer.Grid.mask.y = p.synGridY;
        L.Synthesizer.Grid.mask.width = p.synGridWidth;
        L.Synthesizer.Grid.mask.height = p.synGridHeight;

        L.Synthesizer.Grid.columns = p.synColumns;
        L.Synthesizer.Grid.spacingX = p.synSpacingX;
        L.Synthesizer.Grid.spacingY = p.synSpacingY;
        L.Synthesizer.Grid.itemSize = p.synItemSize;

        //========= SYNTHESIZER SHOWCASE =========
        L.Synthesizer.Showcase.Frame.x = p.synShowX;
        L.Synthesizer.Showcase.Frame.y = p.synShowY;
        L.Synthesizer.Showcase.Frame.width = p.synShowWidth;
        L.Synthesizer.Showcase.Frame.height = p.synShowHeight;

        // Update Name position to match Frame
        L.Synthesizer.Showcase.Name.x = p.synShowX;
        L.Synthesizer.Showcase.Name.y = p.synShowY + 2;

        // Description
        L.Synthesizer.Showcase.Description.x = p.synDescX;
        L.Synthesizer.Showcase.Description.y = p.synDescY;
        L.Synthesizer.Showcase.Description.width = p.synDescWidth;
        L.Synthesizer.Showcase.Description.height = p.synDescHeight;
        L.Synthesizer.Showcase.Description.fontSize = p.synDescFontSize;

        // Tip
        L.Synthesizer.Showcase.Tip.x = p.synTipX;
        L.Synthesizer.Showcase.Tip.y = p.synTipY;

        // Item Decrease Arrow
        L.Synthesizer.Showcase.ItemDecrease.x = p.synDecreaseX;
        L.Synthesizer.Showcase.ItemDecrease.y = p.synDecreaseY;
        L.Synthesizer.Showcase.ItemDecrease.width = p.synDecreaseWidth;
        L.Synthesizer.Showcase.ItemDecrease.height = p.synDecreaseHeight;

        // Item Increase Arrow
        L.Synthesizer.Showcase.ItemIncrease.x = p.synIncreaseX;
        L.Synthesizer.Showcase.ItemIncrease.y = p.synIncreaseY;
        L.Synthesizer.Showcase.ItemIncrease.width = p.synIncreaseWidth;
        L.Synthesizer.Showcase.ItemIncrease.height = p.synIncreaseHeight;

        // Current Number
        L.Synthesizer.Showcase.CurrentNumber.x = p.synCurrentX;
        L.Synthesizer.Showcase.CurrentNumber.y = p.synCurrentY;
        L.Synthesizer.Showcase.CurrentNumber.width = p.synCurrentWidth;
        L.Synthesizer.Showcase.CurrentNumber.height = p.synCurrentHeight;
        L.Synthesizer.Showcase.CurrentNumber.fontSize = p.synCurrentFontSize;

        // Max Number
        L.Synthesizer.Showcase.MaxNumber.x = p.synMaxX;
        L.Synthesizer.Showcase.MaxNumber.y = p.synMaxY;
        L.Synthesizer.Showcase.MaxNumber.width = p.synMaxWidth;
        L.Synthesizer.Showcase.MaxNumber.height = p.synMaxHeight;
        L.Synthesizer.Showcase.MaxNumber.fontSize = p.synMaxFontSize;

        // Craft Button
        L.Synthesizer.Showcase.Button.x = p.synCraftX;
        L.Synthesizer.Showcase.Button.y = p.synCraftY;
        L.Synthesizer.Showcase.Button.width = p.synCraftWidth;
        L.Synthesizer.Showcase.Button.height = p.synCraftHeight;

        //========= RECIPE PANEL =========
        L.Synthesizer.RecipeItemBoxes.firstSlot.x = p.recipeFirstX;
        L.Synthesizer.RecipeItemBoxes.firstSlot.y = p.recipeFirstY;
        L.Synthesizer.RecipeItemBoxes.spacing = p.recipeSpacing;

        //========= GLOBAL HOVER SCALES =========
        L.HoverScale = p.hoverScale;
        L.UseButtonHoverScale = p.useHoverScale;

        //========= SIGNAL THAT LAYOUT HAS CHANGED =========
        // This allows scenes to rebuild dynamic elements (like recipe panel)
        LOGICPULSE._layoutChanged = true;

        // Log a sample value to confirm changes
        console.log('[LOGICPULSE] Inventory Grid columns set to:', L.Inventory.Grid.columns);
        console.log('[LOGICPULSE] Showcase X set to:', L.Inventory.Showcase.Frame.x);
        console.log('[LOGICPULSE] Recipe firstSlot X set to:', L.Synthesizer.RecipeItemBoxes.firstSlot.x);
    },

    //--------------------------------
    // Public API
    //--------------------------------

    get: function(key) {
        return this._params[key];
    },

    getAll: function() {
        return this._params;
    }
};