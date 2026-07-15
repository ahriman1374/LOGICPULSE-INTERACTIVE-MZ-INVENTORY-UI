"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Synthesizer Grid
//=============================================================================

LOGICPULSE.UI.SynthesizerGrid = class extends LOGICPULSE.UI.Grid {


    //--------------------------------
    // Initialize
    //--------------------------------

    constructor(layout) {

        super(layout);

    }


    //--------------------------------
    // Items
    //--------------------------------

    items() {

        return LOGICPULSE.InventoryProvider.getSynthesizerItems();

    }


    //--------------------------------
    // Build Slots
    //--------------------------------

    buildSlots() {

        const items = this.items();

        for (let index = 0; index < items.length; index++) {

            const position = this.slotPosition(index);


            const slot = new LOGICPULSE.UI.SynthesizerGridSlot({

                x: position.x,

                y: position.y,

                entry: items[index]

            });


            this._slotLayer.addChild(slot);

            this._slots.push(slot);

        }


    }


    //--------------------------------
    // Update Selection
    //--------------------------------

    updateSelection() {

        if (!this._slots) {

            return;

        }


        for (let i = 0; i < this._slots.length; i++) {

            this._slots[i].setFocused(

                i === this._selectedIndex

            );

        }


        this.updateViewport();

    }

    //--------------------------------
    // Set Crafting Item
    //--------------------------------

    setCraftingItem(item) {

        this._craftingIndex = -1;

        if (item) {

            const items = this.items();

            this._craftingIndex = items.findIndex(

                entry => entry.item === item

            );

        }

        this.refreshCraftingFrame();

    }


    //--------------------------------
    // Clear Crafting Item
    //--------------------------------

    clearCraftingItem() {

        this._craftingIndex = -1;

        this.refreshCraftingFrame();

    }

    //--------------------------------
    // Refresh Crafting Frame
    //--------------------------------

    refreshCraftingFrame() {

        for (let i = 0; i < this._slots.length; i++) {

            const slot = this._slots[i];

            if (!slot._craftFrame) {

                slot._craftFrame = new Sprite(

                    LOGICPULSE.Assets.load(

                        LOGICPULSE.Assets.Folders.Synthesizer,

                        LOGICPULSE.Assets.Images.Synthesizer.SelectedFrame

                    )

                );

                slot.addChild(

                    slot._craftFrame

                );

            }

            slot._craftFrame.visible =

                i === this._craftingIndex;

        }

    }


};