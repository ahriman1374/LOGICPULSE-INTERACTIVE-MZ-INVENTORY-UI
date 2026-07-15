"use strict";

module.exports = [
    // Core
    "src/Version.js",
    "src/Constants.js",

    // Managers
    "src/managers/LPAssets.js",
    "src/managers/LPLayout.js",
    "src/managers/LPInput.js",
    "src/managers/LPBindings.js",
    "src/managers/LPMouse.js",

    // Managers (continued)
    "src/managers/LPInventoryProvider.js",
    "src/managers/LPInventoryController.js",
    "src/managers/LPSynthesizerController.js",
    "src/managers/LPGamePartyHooks.js",
    "src/managers/LPRecipeManager.js",
    "src/managers/LPCraftManager.js",
    "src/managers/LPAnimator.js",

    // UI
    "src/ui/LPUIElement.js",
    "src/ui/LPText.js",
    "src/ui/LPScrollText.js",
    "src/ui/LPGridSlot.js",
    "src/ui/LPGrid.js",
    "src/ui/LPSynthesizerGridSlot.js",
    "src/ui/LPSynthesizerGrid.js",
    "src/ui/LPSidebar.js",
    "src/ui/LPShowcase.js",
    "src/ui/LPSynthesizerShowcase.js",
    "src/ui/LPRecipePanel.js",
    "src/ui/LPQuantityController.js",
    "src/ui/LPCraftButton.js",

    // Scenes
    "src/scenes/LPSceneInventory.js",
    "src/scenes/LPSceneSynthesizer.js",

    // Entry Point
    "src/Main.js"
];