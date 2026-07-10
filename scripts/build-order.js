"use strict";

module.exports = [

    // Core
    "src/Version.js",
    "src/Constants.js",

    // Utilities
    "src/utils/Core.js",
    "src/utils/Debug.js",

    // Managers
    "src/managers/LPAssets.js",
    "src/managers/LPLayout.js",
    "src/managers/LPInput.js",
    "src/managers/LPInventoryProvider.js",
    "src/managers/LPGamePartyHooks.js",
    "src/managers/LPRecipeManager.js",
    "src/managers/LPCraftManager.js",


    // UI
    "src/ui/LPUIElement.js",
    "src/ui/LPButton.js",
    "src/ui/LPCursor.js",
    "src/ui/LPGridSlot.js",
    "src/ui/LPGrid.js",
    "src/ui/LPSidebar.js",
    "src/ui/LPShowcase.js",

    // Scenes
    "src/scenes/LPSceneInventory.js",
    "src/scenes/LPSceneSynthesizer.js",

    // Entry Point
    "src/Main.js"
];