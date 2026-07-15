"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Sidebar
//=============================================================================

LOGICPULSE.UI.Sidebar = class extends LOGICPULSE.UI.Element {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {

        super();

        this._selectedIndex = 0;

        this._tabs = [];

        this._definitions = [

            {

                category:
                LOGICPULSE.Constants.Category.Consumable,

                idle:
                LOGICPULSE.Assets.Images.Sidebar.ConsumableIdle,

                hover:
                LOGICPULSE.Assets.Images.Sidebar.ConsumableHover,

                header:
                LOGICPULSE.Assets.Images.Sidebar.ConsumableHeader

            },

            {

                category:
                LOGICPULSE.Constants.Category.Material,

                idle:
                LOGICPULSE.Assets.Images.Sidebar.MaterialIdle,

                hover:
                LOGICPULSE.Assets.Images.Sidebar.MaterialHover,

                header:
                LOGICPULSE.Assets.Images.Sidebar.MaterialHeader

            },

            {

                category:
                LOGICPULSE.Constants.Category.Key,

                idle:
                LOGICPULSE.Assets.Images.Sidebar.KeyMaterialIdle,

                hover:
                LOGICPULSE.Assets.Images.Sidebar.KeyMaterialHover,

                header:
                LOGICPULSE.Assets.Images.Sidebar.KeyMaterialHeader

            },

            {

                category: "synthesizer",

                idle:
                LOGICPULSE.Assets.Images.Sidebar.SynthesizerIdle,

                hover:
                LOGICPULSE.Assets.Images.Sidebar.SynthesizerHover,

                header:
                LOGICPULSE.Assets.Images.Sidebar.SynthesizerHeader

            }

        ];

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createBackground();

        this.createHeaderFrame();

        this.createKeyboardHint();

        this.createTabs();

        this.refresh();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        this._background = this.createSprite(

            LOGICPULSE.Assets.Folders.Sidebar,

            LOGICPULSE.Assets.Images.Sidebar.Box

        );

    }

    //--------------------------------
    // Header Frame
    //--------------------------------

    createHeaderFrame() {

        this._headerFrame = this.createSprite(

            LOGICPULSE.Assets.Folders.Sidebar,

            this._definitions[0].header

        );

        this.addChild(this._headerFrame);

    }

    //--------------------------------
    // Keyboard Hint
    //--------------------------------

    createKeyboardHint() {

        this._keyboardHint = this.createSprite(

            LOGICPULSE.Assets.Folders.Sidebar,

            LOGICPULSE.Assets.Images.Sidebar.KeyboardTABKeyIdle

        );

        this.addChild(this._keyboardHint);

        LOGICPULSE.Animator.bitmapSwap(

            this._keyboardHint,

            LOGICPULSE.Assets.Folders.Sidebar,

            [

                LOGICPULSE.Assets.Images.Sidebar.KeyboardTABKeyIdle,

                LOGICPULSE.Assets.Images.Sidebar.KeyboardTABKeyHover

            ],

            {

                interval: 40

            }

        );

    }

    //--------------------------------
    // Tabs
    //--------------------------------

    createTabs() {

        const layout =

            LOGICPULSE.Layout.Inventory.Sidebar;

        for (

            let i = 0;

            i < this._definitions.length;

            i++

        ) {

            const def =

                this._definitions[i];

            const sprite = this.createSprite(

                LOGICPULSE.Assets.Folders.Sidebar,

                def.idle

            );

            sprite.x =

                layout.tabs.x;

            sprite.y =

                layout.tabs.y +

                i * layout.tabs.spacing;

            this.addChild(sprite);

            this._tabs.push(sprite);

        }

    }

    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

        for (

            let i = 0;

            i < this._tabs.length;

            i++

        ) {

            const sprite =

                this._tabs[i];

            const def =

                this._definitions[i];

            const image =

                i === this._selectedIndex

                    ? def.hover
                    : def.idle;

            sprite.bitmap =

                LOGICPULSE.Assets.load(

                    LOGICPULSE.Assets.Folders.Sidebar,

                    image

                );

        }

        this._headerFrame.bitmap =

            LOGICPULSE.Assets.load(

                LOGICPULSE.Assets.Folders.Sidebar,

                this._definitions[

                    this._selectedIndex

                    ].header

            );

    }




    //--------------------------------
    // Select Index
    //--------------------------------

    select(index) {

        index = Math.max(

            0,

            Math.min(

                index,

                this._definitions.length - 1

            )

        );

        if (

            index === this._selectedIndex

        ) {

            return;

        }

        this._selectedIndex = index;

        this.refresh();

    }

    //--------------------------------
    // Next
    //--------------------------------

    next() {

        this.select(

            (this._selectedIndex + 1)

            %

            this._definitions.length

        );

    }

    //--------------------------------
    // Previous
    //--------------------------------

    previous() {

        this.select(

            (

                this._selectedIndex -

                1 +

                this._definitions.length

            )

            %

            this._definitions.length

        );

    }

    //--------------------------------
    // Selected Index
    //--------------------------------

    selectedIndex() {

        return this._selectedIndex;

    }


    //--------------------------------
    // Select Category
    //--------------------------------

    selectCategory(category) {

        const index = this._definitions.findIndex(

            definition =>

                definition.category === category

        );

        if (index >= 0) {

            this.select(index);

        }

    }


    //--------------------------------
    // Selected Category
    //--------------------------------

    selectedCategory() {

        return this._definitions[

            this._selectedIndex

            ].category;

    }

    //--------------------------------
    // Category Count
    //--------------------------------

    categoryCount() {

        return this._definitions.length;

    }

    //--------------------------------
    // Definition
    //--------------------------------

    definition(index) {

        return this._definitions[index];

    }

};