"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Layout (mutable for parameters)
//=============================================================================

LOGICPULSE.Layout = {

    //==================================================
    // Inventory Scene
    //==================================================

    Inventory: {

        Grid: {
            //First Item box position (grid) for inventory
            rect: {

                x: 82,
                y: 118,
                width: 768,
                height: 576

            },
            //grid Mask position for inventory
            mask: {

                x: 82,
                y: 118,
                width: 768,
                height: 576

            },

            //position of the item pics in the item box for inventory
            Icon: {

                offset: {

                    x: 0,

                    y: 0

                }

            },
            //columns setting for inventory
            columns: 8,

            itemSize: 92,

            spacingX: 96,

            spacingY: 96

        },
        //Item amount in party for inventory
        Amount: {

            x: 52,

            y: 4,

            width: 36,

            height: 20,

            align: "right",

            fontSize: 18

        },

        Sidebar: {
            //sidebar box.png position for both inventory and Synthesizer
            x: 0,
            y: 0,
            //sidebar tab icons settings for both inventory and Synthesizer
            tabs: {

                x: 4,
                y: 130,

                spacing: 52,

                width: 44,
                height: 44

            }

        },


        Showcase: {
            //Item Showcase Box.png position for inventory
            Overlay: {

                x: 0,
                y: 0

            },
            //Showcase Items pics in Item Showcase Box position for inventory
            Frame: {

                x: 912,
                y: 144,
                width: 288,
                height: 288

            },
            //Showcase Items pics size for inventory
            Item: {

                width: 184,
                height: 184,

                maxWidth: 184,
                maxHeight: 184

            },
            //item name position in showcase for inventory
            Name: {

                x: 912,
                y: 152,
                width: 288,
                height: 32,

                align: "center",

                fontSize: 24

            },
            //item Description position in showcase for inventory
            Description: {

                x: 912,
                y: 460,

                width: 288,
                height: 160,

                padding: 8,

                fontSize: 20,

                lineHeight: 26

            },
            //Use Button position in showcase for inventory
            Button: {

                x: 912,
                y: 640,

                scale: 1.0,

                hoverScale: 1.05,

                width: 288,
                height: 48

            }

        }

    },

    //==================================================
    // Synthesizer Scene
    //==================================================

    Synthesizer: {

        Grid: {
            //First Item box position (grid) for Synthesizer
            rect: {

                x: 96,
                y: 192,
                width: 384,
                height: 480

            },
            //grid Mask position for Synthesizer
            mask: {

                x: 96,
                y: 192,
                width: 384,
                height: 480

            },
            //position of the item pics in the item box for Synthesizer
            Icon: {

                offset: {

                    x: 0,

                    y: 0

                }

            },
            //columns setting for Synthesizer
            columns: 4,

            itemSize: 92,

            spacingX: 96,

            spacingY: 96

        },
        //Item amount in party for Synthesizer
        Amount: {

            x: 52,

            y: 4,

            width: 36,

            height: 20,

            align: "right",

            fontSize: 18

        },

        Showcase: {
            //Item Showcase Box.png position for Synthesizer
            Overlay: {

                x: 0,
                y: 0

            },
            //Showcase Items pics in Item Showcase Box position for Synthesizer
            Frame: {

                x: 720,
                y: 168,
                width: 288,
                height: 288

            },
            //Showcase Items pics size for Synthesizer
            Item: {

                width: 184,
                height: 184,

                maxWidth: 184,
                maxHeight: 184

            },
            //item name position in showcase for Synthesizer
            Name: {

                x: 720,
                y: 170,
                width: 288,
                height: 32,

                align: "center",

                fontSize: 24

            },
            //item Description position in showcase for Synthesizer
            Description: {

                x: 528,
                y: 168,

                width: 180,
                height: 300,

                align: "center",

                padding: 8,

                fontSize: 16,

                lineHeight: 26

            },
            //position of tip.png for Synthesizer
            Tip: {

                x: 1032,
                y: 145

            },
            //position of Item Decrease Arrow pngs for Synthesizer
            ItemDecrease: {

                x: 768,
                y: 600,

                width: 27,
                height: 27

            },
            //position of Item Increase Arrow pngs for Synthesizer
            ItemIncrease: {

                x: 930,
                y: 600,

                width: 27,
                height: 27

            },
            //position of Crafting Number for Synthesizer
            CurrentNumber: {

                x: 822,
                y: 598,

                width: 80,
                height: 32,

                align: "center",

                fontSize: 28

            },
            //position of MAx Crafting Number 3. for Synthesizer
            MaxNumber: {

                x: 686,
                y: 194,

                width: 80,
                height: 32,

                align: "center",

                fontSize: 20
            },
            //Synthesize Button position in showcase for Synthesizer
            Button: {

                x: 790,
                y: 650,

                scale: 1.0,

                hoverScale: 1.05,

                width: 160,
                height: 30

            }

        },

        RecipeItemBoxes: {
            //First Item box position (Recipe) for Synthesizer
            firstSlot: {

                x: 672,
                y: 480

            },
            //spacing between Recipe Item boxes for Synthesizer
            spacing: 96,
            //Item amount needed for crafting for Synthesizer
            Amount: {

                x: 52,
                y: 70,

                width: 36,
                height: 20,

                align: "right",

                fontSize: 18

            },
            //name of the Recipe items needed for crafting for Synthesizer
            ItemName: {

                x: 0,
                y: 0,

                width: 92,
                height: 92,

                align: "center",

                fontSize: 12

            }

        }

    }

};