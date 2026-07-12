"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Showcase
//=============================================================================

LOGICPULSE.UI.Showcase = class extends LOGICPULSE.UI.Element {

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

        this.createOverlay();
        this.createItemSprite();
        this.createItemName();
        this.createDescription();
        this.createUseButton();

    }

    //--------------------------------
    // Overlay
    //--------------------------------

    createOverlay() {

        const pos =
            LOGICPULSE.Layout.Inventory.Showcase.Overlay;

        this._overlay = this.createSprite(

            LOGICPULSE.Assets.Folders.Inventory,
            LOGICPULSE.Assets.Images.Inventory.Showcase,

            pos.x,
            pos.y

        );

    }

    //--------------------------------
    // Item Sprite
    //--------------------------------

    createItemSprite() {

        this._itemSprite = new Sprite();

        this.addChild(this._itemSprite);

    }

    //--------------------------------
    // Item Name
    //--------------------------------

    createItemName() {

        const layout =
            LOGICPULSE.Layout.Inventory.Showcase.Name;

        this._nameText =
            new LOGICPULSE.UI.Text({

                x: layout.x,
                y: layout.y,

                width: layout.width,
                height: layout.height,

                align: layout.align,

                fontSize: layout.fontSize

            });

        this.addChild(

            this._nameText

        );

    }

    //--------------------------------
    // Description
    //--------------------------------

    createDescription() {

        const layout =
            LOGICPULSE.Layout.Inventory.Showcase.Description;

        this._descriptionText =
            new LOGICPULSE.UI.ScrollText({

                x: layout.x,
                y: layout.y,

                width: layout.width,
                height: layout.height,

                padding: layout.padding,

                fontSize: layout.fontSize,

                lineHeight: layout.lineHeight

            });

        this.addChild(

            this._descriptionText

        );

    }

    //--------------------------------
    // Use Button
    //--------------------------------

    createUseButton() {

        const pos =
            LOGICPULSE.Layout.Inventory.Showcase.Button;

        this._useButton =
            this.createSprite(

                LOGICPULSE.Assets.Folders.Inventory,

                LOGICPULSE.Assets.Images.Inventory.UseButtonIdle,

                pos.x,
                pos.y

            );

    }

    //--------------------------------
    // Set Item
    //--------------------------------

    setItem(entry) {

        if (!entry) {

            this.clear();

            return;

        }

        const item = entry.item;

        this.refreshItemSprite(item);

        this._nameText.setText(

            item.name

        );

        this._descriptionText.setText(

            item.description

    );

        this._useButton.visible =

            LOGICPULSE.InventoryProvider.showUseButton(

                item

            );

    }

    //--------------------------------
    // Refresh Item Sprite
    //--------------------------------

    refreshItemSprite(item) {

        this._itemSprite.bitmap =

            LOGICPULSE.Assets.load(

                LOGICPULSE.Assets.Folders.Showcase,

                `Item_${item.iconIndex}`

            );

        this.centerItemSprite();

    }

    //--------------------------------
    // Center Item
    //--------------------------------

    centerItemSprite() {

        const bitmap =
            this._itemSprite.bitmap;

        if (!bitmap) {

            return;

        }

        bitmap.addLoadListener(() => {

            const frame =
                LOGICPULSE.Layout.Inventory.Showcase.Frame;

            this._itemSprite.x =

                frame.x +

                (frame.width - bitmap.width) / 2;

            this._itemSprite.y =

                frame.y +

                (frame.height - bitmap.height) / 2;

        });

    }

    //--------------------------------
    // Play Use Animation
    //--------------------------------

    playUseAnimation() {

        this._useButton.bitmap =

            LOGICPULSE.Assets.load(

                LOGICPULSE.Assets.Folders.Inventory,

                LOGICPULSE.Assets.Images.Inventory.UseButtonHover

            );

        setTimeout(() => {

            this._useButton.bitmap =

                LOGICPULSE.Assets.load(

                    LOGICPULSE.Assets.Folders.Inventory,

                    LOGICPULSE.Assets.Images.Inventory.UseButtonIdle

                );

        }, 120);

    }

    //--------------------------------
    // Clear
    //--------------------------------

    clear() {

        this._itemSprite.bitmap = null;

        this._nameText.setText("");

        this._descriptionText.setText("");

        this._useButton.visible = false;

    }

};