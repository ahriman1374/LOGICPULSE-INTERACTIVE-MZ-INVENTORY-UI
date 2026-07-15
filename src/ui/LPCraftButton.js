"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Craft Button
//=============================================================================

LOGICPULSE.UI.CraftButton = class extends LOGICPULSE.UI.Element {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {

        super();

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        const layout =
            LOGICPULSE.Layout.Synthesizer.Showcase.Button;

        this._sprite = this.createSprite(

            LOGICPULSE.Assets.Folders.Synthesizer,

            LOGICPULSE.Assets.Images.Synthesizer.SynthesizeIdle,

            layout.x,
            layout.y

        );

    }

    //--------------------------------
    // Idle
    //--------------------------------

    setIdle() {

        this._sprite.bitmap =

            LOGICPULSE.Assets.load(

                LOGICPULSE.Assets.Folders.Synthesizer,

                LOGICPULSE.Assets.Images.Synthesizer.SynthesizeIdle

            );

    }

    //--------------------------------
    // Hover
    //--------------------------------

    setHover() {

        this._sprite.bitmap =

            LOGICPULSE.Assets.load(

                LOGICPULSE.Assets.Folders.Synthesizer,

                LOGICPULSE.Assets.Images.Synthesizer.SynthesizeHover

            );

    }

    //--------------------------------
    // Press Animation
    //--------------------------------

    playPressAnimation() {

        this.setHover();

        setTimeout(() => {

            this.setIdle();

        }, 120);

    }

};