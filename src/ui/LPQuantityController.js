"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};


//=============================================================================
// Quantity Controller
//=============================================================================

LOGICPULSE.UI.QuantityController = class extends LOGICPULSE.UI.Element {


    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {

        super();

        this._item = null;

        this._value = 1;

        this._max = 1;

        this._arrowTimer = 0;

        this.create();

    }



    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createBackground();

        this.createArrows();

        this.createNumber();

        this.createMaxNumber();

        this.refresh();

    }



    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        const layout =

            LOGICPULSE.Layout.Synthesizer.Showcase.NumberControls;


        this._background = this.createSprite(

            LOGICPULSE.Assets.Folders.Synthesizer,

            LOGICPULSE.Assets.Images.Synthesizer.ItemNumberController,

            layout.x,

            layout.y

        );

    }



    //--------------------------------
    // Arrows
    //--------------------------------

    createArrows() {

        const layout =

            LOGICPULSE.Layout.Synthesizer.Showcase.NumberControls.Arrows;


        this._leftArrow = this.createSprite(

            LOGICPULSE.Assets.Folders.Synthesizer,

            LOGICPULSE.Assets.Images.Synthesizer.ItemDecrease,

            layout.x,

            layout.y

        );


        this._rightArrow = this.createSprite(

            LOGICPULSE.Assets.Folders.Synthesizer,

            LOGICPULSE.Assets.Images.Synthesizer.ItemIncrease,

            layout.x + layout.spacing,

            layout.y

        );


        this._leftArrow.visible = false;

        this._rightArrow.visible = false;

    }



    //--------------------------------
    // Number
    //--------------------------------

    createNumber() {

        const layout =

            LOGICPULSE.Layout.Synthesizer.Showcase.NumberControls.CurrentNumber;


        this._numberText = this.createText({

            text: "1",

            x: layout.x,

            y: layout.y,

            width: layout.width,

            height: layout.height,

            align: layout.align,

            fontSize: layout.fontSize

        });

    }

    //--------------------------------
    // Max Number
    //--------------------------------

    createMaxNumber() {

        const layout =

            LOGICPULSE.Layout.Synthesizer.Showcase.NumberControls.MaxNumber;

        this._maxNumberText = this.createText({

            text: "1",

            x: layout.x,

            y: layout.y,

            width: layout.width,

            height: layout.height,

            align: layout.align,

            fontSize: layout.fontSize

        });

    }


    //--------------------------------
    // Set Item
    //--------------------------------

    setItem(item) {

        this._item = item;

        this._value = 1;


        if (!item) {

            this._max = 1;

        }

        else {

            this._max = LOGICPULSE.RecipeManager.maxCraftAmount(

                item

            );

            this._value = this._max > 0 ? 1 : 0;

        }


        this.refresh();

    }



    //--------------------------------
    // Increase
    //--------------------------------

    increase(amount = 1) {

        const old = this._value;


        if (this._max <= 0) {

            return;

        }

        this._value = Math.min(

            this._value + amount,

            this._max

        );


        if (this._value !== old) {

            this.showArrow("right");

            this.refresh();

        }

    }



    //--------------------------------
    // Decrease
    //--------------------------------

    decrease(amount = 1) {

        const old = this._value;


        if (this._max <= 0) {

            return;

        }

        this._value = Math.max(

            this._value - amount,

            1

        );


        if (this._value !== old) {

            this.showArrow("left");

            this.refresh();

        }

    }



    //--------------------------------
    // Set Value
    //--------------------------------

    setValue(value) {

        if (this._max <= 0) {

            this._value = 0;

        }

        else {

            this._value = Math.max(

                1,

                Math.min(

                    value,

                    this._max

                )

            );

        }


        this.refresh();

    }



    //--------------------------------
    // Show Arrow
    //--------------------------------

    showArrow(direction) {

        this._arrowTimer = 20;


        this._leftArrow.visible =

            direction === "left";


        this._rightArrow.visible =

            direction === "right";

    }



    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

        if (this._max <= 0) {

            this._numberText.setText("0/0");

            this._maxNumberText.setText("0");

        }

        else {

            this._numberText.setText(

                `${this._value}/${this._max}`

            );

            this._maxNumberText.setText(

                String(this._max)

            );

        }

    }


    //--------------------------------
    // Update
    //--------------------------------

    update() {

        if (this._arrowTimer > 0) {

            this._arrowTimer--;

            if (this._arrowTimer <= 0) {

                this._leftArrow.visible = false;

                this._rightArrow.visible = false;

            }

        }

    }



    //--------------------------------
    // Value
    //--------------------------------

    value() {

        return this._value;

    }



    //--------------------------------
    // Max
    //--------------------------------

    max() {

        return this._max;

    }


};