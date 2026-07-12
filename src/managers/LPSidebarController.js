"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Sidebar Controller
//=============================================================================

LOGICPULSE.SidebarController = class {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor(sidebar) {

        this._sidebar = sidebar;

        this._frameTimer = 0;
        this._keyboardTimer = 0;

    }

    //--------------------------------
    // Update
    //--------------------------------

    update() {

        this.updateKeyboardHint();

    }

    //--------------------------------
    // Keyboard Hint Animation
    //--------------------------------

    updateKeyboardHint() {

        this._keyboardTimer++;

        if (this._keyboardTimer >= 30) {

            this._keyboardTimer = 0;

            this._sidebar.toggleKeyboardHint();

        }

    }

    //--------------------------------
    // Refresh Active Tab
    //--------------------------------

    refresh() {

        this._sidebar.refresh();

    }

};