"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Synthesizer Grid Slot
//=============================================================================

LOGICPULSE.UI.SynthesizerGridSlot = class extends LOGICPULSE.UI.GridSlot {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor(options = {}) {

        super(options);

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        super.create();

        this.createSelectedFrame();

        this.refreshCraftState();

    }

    //--------------------------------
    // Selected Frame (Craft Marker)
    //--------------------------------

    createSelectedFrame() {

        this._selectedFrame = new Sprite(

            LOGICPULSE.Assets.load(

                LOGICPULSE.Assets.Folders.Synthesizer,

                LOGICPULSE.Assets.Images.Synthesizer.SelectedFrame

            )

        );

        this._selectedFrame.visible = false;

        // Keep it behind the selection cursor
        this.addChildAt(this._selectedFrame, 0);

    }

    //--------------------------------
    // Craft Selected
    //--------------------------------

    setCraftSelected(selected) {

        this._craftSelected = selected;

        if (this._selectedFrame) {

            this._selectedFrame.visible = selected;

        }

        this.updateSelection();

    }

    //--------------------------------
    // Selection Frame Asset (Cursor)
    //--------------------------------

    selectionFrameAsset() {

        return {

            folder:

            LOGICPULSE.Assets.Folders.Synthesizer,

            image:

            LOGICPULSE.Assets.Images.Synthesizer.SelectionFrame

        };

    }

    //--------------------------------
    // Refresh Craft State
    //--------------------------------

    refreshCraftState() {

        const craftable =

            LOGICPULSE.RecipeManager.canCraft(

                this.item()

            );

        this.setLocked(

            !craftable

        );

        this.applyDisabledStyle(

            !craftable

        );

    }

    //--------------------------------
    // Disabled Style
    //--------------------------------

    applyDisabledStyle(disabled) {

        const alpha =

            disabled ? 0.45 : 1.0;

        const tint =

            disabled ? 0x808080 : 0xFFFFFF;

        if (this._background) {

            this._background.alpha = alpha;
            this._background.tint = tint;

        }

        if (this._icon) {

            this._icon.alpha = alpha;
            this._icon.tint = tint;

        }

        if (this._amountText) {

            this._amountText.alpha = alpha;

        }

    }

};