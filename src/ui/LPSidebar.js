"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Sidebar
//=============================================================================

LOGICPULSE.UI.Sidebar = class extends LOGICPULSE.UI.Element {

    constructor() {

        super();

        this.create();

    }

    create() {

        this.createBackground();

        this.createTabs();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        this._background = this.createSprite(

            LOGICPULSE.Assets.Folders.Sidebar,
            "Sidebar box"

        );

    }

    //--------------------------------
    // Tabs
    //--------------------------------

    createTabs() {

        this._tabs = [];

        const tabNames = [

            "Consumable",
            "Material",
            "Key Materials",
            "Synthesizer"

        ];

        for (const name of tabNames) {

            const sprite = this.createSprite(

                LOGICPULSE.Assets.Folders.Sidebar,
                `Sidebar ${name} Tab Idle`

            );

            this._tabs.push(sprite);

        }

    }

};