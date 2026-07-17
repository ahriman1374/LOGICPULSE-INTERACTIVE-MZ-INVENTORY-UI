//=============================================================================
// Main.js
//=============================================================================

window.LOGICPULSE = window.LOGICPULSE || {};

// Initialize assets
LOGICPULSE.Assets.initialize();

// Initialize parameters (after Layout is loaded)
if (LOGICPULSE.Parameters && typeof LOGICPULSE.Parameters.initialize === 'function') {
    LOGICPULSE.Parameters.initialize();
}

// Register plugin commands
(function() {
    var pluginName = LOGICPULSE.Version.plugin;

    PluginManager.registerCommand(
        pluginName,
        "OpenInventory",
        function() {
            SceneManager.push(LOGICPULSE.Scenes.Inventory);
        }
    );

    PluginManager.registerCommand(
        pluginName,
        "OpenSynthesizer",
        function() {
            SceneManager.push(LOGICPULSE.Scenes.Synthesizer);
        }
    );
})();