window.LOGICPULSE = window.LOGICPULSE || {};

LOGICPULSE.Assets.initialize();

// Initialize mouse system (already called in LPMouse.js)
// LOGICPULSE.Mouse.initialize(); // This is auto-called

(() => {

    const pluginName = LOGICPULSE.Version.plugin;

    PluginManager.registerCommand(

        pluginName,
        "OpenInventory",
        () => {

            SceneManager.push(LOGICPULSE.Scenes.Inventory);

        }

    );

})();