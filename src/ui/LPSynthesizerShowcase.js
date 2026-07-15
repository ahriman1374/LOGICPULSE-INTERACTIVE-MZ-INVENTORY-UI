"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};


//=============================================================================
// Synthesizer Showcase
//=============================================================================

LOGICPULSE.UI.SynthesizerShowcase = class extends LOGICPULSE.UI.Element {


    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {

        super();

        this._item = null;

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

        this.createTip();

    }


    //--------------------------------
    // Overlay
    //--------------------------------

    createOverlay() {

        const pos =

            LOGICPULSE.Layout.Synthesizer.Showcase.Overlay;


        this._overlay = this.createSprite(

            LOGICPULSE.Assets.Folders.Synthesizer,

            LOGICPULSE.Assets.Images.Synthesizer.Showcase

        );


        this._overlay.x = pos.x;

        this._overlay.y = pos.y;

    }



    //--------------------------------
    // Item Sprite
    //--------------------------------

    createItemSprite() {

        this._itemSprite = new Sprite();

        this.addChild(

            this._itemSprite

        );

    }



    //--------------------------------
    // Item Name
    //--------------------------------

    createItemName() {


        const layout =

            LOGICPULSE.Layout.Synthesizer.Showcase.Name;


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

            LOGICPULSE.Layout.Synthesizer.Showcase.Description;



        this._descriptionText =

            new LOGICPULSE.UI.ScrollText({


                x: layout.x,

                y: layout.y,

                width: layout.width,

                height: layout.height,

                padding: layout.padding,

                fontSize: layout.fontSize,

                lineHeight: layout.lineHeight,

                align: layout.align


            });



        this.addChild(

            this._descriptionText

        );


    }



    //--------------------------------
    // Tip
    //--------------------------------

    createTip() {


        const pos =

            LOGICPULSE.Layout.Synthesizer.Showcase.Tip;



        this._tip = this.createSprite(


            LOGICPULSE.Assets.Folders.Synthesizer,


            LOGICPULSE.Assets.Images.Synthesizer.SynthesizeTip


        );


        this._tip.x = pos.x;

        this._tip.y = pos.y;


    }



    //--------------------------------
    // Set Item
    //--------------------------------

    setItem(item) {


        this._item = item;


        if (!item) {


            this.clear();


            return;


        }



        this.refreshItemSprite(item);



        this._nameText.setText(

            item.name

        );



        this._descriptionText.setText(

            item.description

        );


    }



    //--------------------------------
    // Refresh Item Sprite
    //--------------------------------

    refreshItemSprite(item) {


        this._itemSprite.bitmap =


            LOGICPULSE.Assets.createShowcaseItemSprite(

                item

            ).bitmap;



        this.centerItemSprite();


    }



    //--------------------------------
    // Center Item Sprite
    //--------------------------------


    centerItemSprite() {

        const bitmap = this._itemSprite.bitmap;

        if (!bitmap) {

            return;

        }

        bitmap.addLoadListener(() => {

            const frame =

                LOGICPULSE.Layout.Synthesizer.Showcase.Frame;

            const item =

                LOGICPULSE.Layout.Synthesizer.Showcase.Item;

            const scale = Math.min(

                item.maxWidth / bitmap.width,

                item.maxHeight / bitmap.height,

                1

            );

            this._itemSprite.scale.set(scale);

            const width = bitmap.width * scale;

            const height = bitmap.height * scale;

            this._itemSprite.x =

                frame.x +

                (frame.width - width) / 2;

            this._itemSprite.y =

                frame.y +

                (frame.height - height) / 2;

        });

    }


    //--------------------------------
    // Clear
    //--------------------------------

    clear() {


        this._item = null;


        this._itemSprite.bitmap = null;


        this._nameText.setText("");


        this._descriptionText.setText("");


    }



    //--------------------------------
    // Item
    //--------------------------------

    item() {

        return this._item;

    }


};