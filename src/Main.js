"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

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