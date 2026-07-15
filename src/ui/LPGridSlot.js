"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Grid Slot
//=============================================================================

LOGICPULSE.UI.GridSlot = class extends LOGICPULSE.UI.Element {

    constructor(options = {}) {

        super();

        this._entry = options.entry || null;

        this._focused = false;
        this._locked = false;

        this._craftSelected = false;

        this.move(

            options.x ?? 0,
            options.y ?? 0

        );

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createBackground();
        this.createIcon();
        this.createAmount();
        this.createSelectionFrame();

        this.updateSelection();

    }

    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

        this.removeChildren();

        this.create();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        const background = this.background();

        if (!background) {

            return;

        }

        this._background = this.createSprite(

            background.folder,
            background.image

        );

    }

    //--------------------------------
    // Icon
    //--------------------------------

    createIcon() {

        const item = this.item();

        if (!item) {

            return;

        }

        this._icon = this.createItemSprite(item);

        const offset =

            LOGICPULSE.Layout.Inventory.Grid.Icon.offset;

        this._icon.x = offset.x;
        this._icon.y = offset.y;

        this.addChild(this._icon);

    }

    //--------------------------------
    // Item Sprite
    //--------------------------------
    createItemSprite(item) {

        return LOGICPULSE.Assets.createItemSprite(

            item

        );

    }

    //--------------------------------
    // Amount
    //--------------------------------


    createAmount() {

        if (this.amount() <= 0) {

            return;

        }


        const layout =
            LOGICPULSE.Layout.Inventory.Amount;

        this._amountText = this.createText({

            text: this.amount(),

            x: layout.x,

            y: layout.y,

            width: layout.width,

            height: layout.height,

            align: layout.align,

            fontSize: layout.fontSize

        });

    }

    //--------------------------------
    // Selection Frame
    //--------------------------------

    createSelectionFrame() {

        const frame = this.selectionFrameAsset();

        this._selectionFrame = this.createSprite(

            frame.folder,

            frame.image

        );

        this._selectionFrame.visible = false;

    }

    //--------------------------------
    // Selection Frame Asset
    //--------------------------------

    selectionFrameAsset() {

        return {

            folder:

            LOGICPULSE.Assets.Folders.Inventory,

            image:

            LOGICPULSE.Assets.Images.Inventory.SelectionFrame

        };

    }

    //--------------------------------
    // Background Image
    //--------------------------------

    background() {

        return {

            folder:

            LOGICPULSE.Assets.Folders.Inventory,

            image:

                this.getBackgroundImage()

        };

    }

    //--------------------------------
    // Background Image
    //--------------------------------

    getBackgroundImage() {

        switch (this.rarity()) {

            case 3:

                return LOGICPULSE.Assets.Images.Inventory.ItemBoxLegendary;

            case 2:

                return LOGICPULSE.Assets.Images.Inventory.ItemBoxRare;

            default:

                return LOGICPULSE.Assets.Images.Inventory.ItemBoxCommon;

        }

    }

    //--------------------------------
    // Focus
    //--------------------------------

    setFocused(value) {

        if (this._focused === value) {

            return;

        }

        this._focused = value;

        this.updateSelection();

    }

    //--------------------------------
    // Locked
    //--------------------------------

    setLocked(value) {

        if (this._locked === value) {

            return;

        }

        this._locked = value;

        this.updateSelection();

    }

    //--------------------------------
    // Focused
    //--------------------------------

    focused() {

        return this._focused;

    }

    //--------------------------------
    // Locked
    //--------------------------------

    locked() {

        return this._locked;

    }

    //--------------------------------
    // Update Selection
    //--------------------------------

    updateSelection() {

        if (!this._selectionFrame) {

            return;

        }

        if (this._focused) {

            this._selectionFrame.visible = true;

            this._selectionFrame.alpha = 1.0;

            LOGICPULSE.Animator.pulse(

                this._selectionFrame

            );

        }
        else {

            this._selectionFrame.visible = false;

            LOGICPULSE.Animator.stop(

                this._selectionFrame

            );

        }

    }

    

    //--------------------------------
    // Entry
    //--------------------------------

    entry() {

        return this._entry;

    }

    //--------------------------------
    // Item
    //--------------------------------

    item() {

        return this._entry?.item ?? null;

    }

    //--------------------------------
    // Amount
    //--------------------------------

    amount() {

        return this._entry?.amount ?? 0;

    }

    //--------------------------------
    // Rarity
    //--------------------------------

    rarity() {

        return this._entry?.rarity ?? 1;

    }

    //--------------------------------
    // Category
    //--------------------------------

    category() {

        return this._entry?.category ?? null;

    }

};