"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Game Party Hooks
//=============================================================================

(() => {

    const aliasGainItem = Game_Party.prototype.gainItem;

    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {

        aliasGainItem.call(

            this,
            item,
            amount,
            includeEquip

        );

        LOGICPULSE.InventoryProvider.markDirty();



    };

})();