"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Layout
//=============================================================================

LOGICPULSE.Layout = Object.freeze({

    //==================================================
    // Inventory Scene
    //==================================================

    Inventory: Object.freeze({

        Grid: Object.freeze({

            rect: Object.freeze({

                x: 82,
                y: 118,
                width: 768,
                height: 576

            }),

            mask: Object.freeze({

                x: 82,
                y: 118,
                width: 768,
                height: 576

            }),

            Icon: Object.freeze({

                offset: Object.freeze({

                    x: 0,

                    y: 0

                })

            }),

            columns: 8,

            itemSize: 92,

            spacingX: 96,

            spacingY: 96

        }),

        Amount: Object.freeze({

            x: 52,

            y: 4,

            width: 36,

            height: 20,

            align: "right",

            fontSize: 18

        }),

        Sidebar: Object.freeze({

            x: 0,
            y: 0,

            tabs: Object.freeze({

                x: 0,
                y: 0,

                spacing: 0

            })

        }),

        Showcase: Object.freeze({

            Overlay: Object.freeze({

                x: 0,
                y: 0

            }),

            Frame: Object.freeze({

                x: 912,
                y: 144,
                width: 288,
                height: 288

            }),

            Item: Object.freeze({

                width: 184,
                height: 184,

                maxWidth: 184,
                maxHeight: 184

            }),

            Name: Object.freeze({

                x: 912,
                y: 152,
                width: 288,
                height: 32,

                align: "center",

                fontSize: 24

            }),

            Description: Object.freeze({

                x: 912,
                y: 460,

                width: 288,
                height: 160,

                padding: 8,

                fontSize: 20,

                lineHeight: 26

            }),

            Button: Object.freeze({

                x: 0,
                y: 0,

                scale: 1.0,

                hoverScale: 1.05

            })

        }),


    }),

    //==================================================
    // Synthesizer Scene
    //==================================================

    Synthesizer: Object.freeze({

        Grid: Object.freeze({

            rect: Object.freeze({

                x: 96,
                y: 192,
                width: 384,
                height: 480

            }),

            mask: Object.freeze({

                x: 96,
                y: 192,
                width: 384,
                height: 480

            }),

            Icon: Object.freeze({

                offset: Object.freeze({

                    x: 0,

                    y: 0

                })

            }),

            columns: 4,

            itemSize: 92,

            spacingX: 96,

            spacingY: 96

        }),

        Amount: Object.freeze({

            x: 52,

            y: 4,

            width: 36,

            height: 20,

            align: "right",

            fontSize: 18

        }),

        Sidebar: Object.freeze({

            x: 0,
            y: 0,

            tabs: Object.freeze({

                x: 0,
                y: 0,

                spacing: 0

            })

        }),

        Showcase: Object.freeze({

            Overlay: Object.freeze({

                x: 0,
                y: 0

            }),

            Frame: Object.freeze({

                x: 720,
                y: 168,
                width: 288,
                height: 288

            }),

            Item: Object.freeze({

                width: 184,
                height: 184,

                maxWidth: 184,
                maxHeight: 184

            }),

            Name: Object.freeze({

                x: 720,
                y: 170,
                width: 288,
                height: 32,

                align: "center",

                fontSize: 24

            }),

            Description: Object.freeze({

                x: 528,
                y: 168,

                width: 180,
                height: 300,

                align: "center",

                padding: 8,


                fontSize: 16,

                lineHeight: 26

            }),

            Tip: Object.freeze({

                x: 0,
                y: 0,

            }),

            NumberControls: Object.freeze({

                x: 0,
                y: 0,

                Arrows: Object.freeze({

                    x: 0,
                    y: 0,

                    spacing: 0

                }),

                CurrentNumber: Object.freeze({

                    x: 822,
                    y: 598,

                    width: 80,
                    height: 32,

                    align: "center",

                    fontSize: 28

                }),

                MaxNumber: Object.freeze({

                    x: 686,
                    y: 194,

                    width: 80,
                    height: 32,

                    align: "center",

                    fontSize: 20
                }),

            }),


            Button: Object.freeze({

                x: 0,
                y: 0,

                scale: 1.0,

                hoverScale: 1.05

            })

        }),

        RecipeItemBoxes: Object.freeze({

            firstSlot: Object.freeze({

                x: 672,
                y: 480

            }),

            spacing: 96,


            Amount: Object.freeze({

                x: 52,
                y: 58,

                width: 36,
                height: 20,

                align: "right",

                fontSize: 18

            }),

            ItemName: Object.freeze({

                x: 0,
                y: 0,

                width: 92,
                height: 92,

                align: "center",

                fontSize: 12

            })

        }),

        })

    });