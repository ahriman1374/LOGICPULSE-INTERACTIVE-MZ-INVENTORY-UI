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

                x: 144,
                y: 144,
                width: 672,
                height: 480

            }),

            mask: Object.freeze({

                x: 144,
                y: 144,
                width: 672,
                height: 480

            }),

            Icon: Object.freeze({

                offset: Object.freeze({

                    x: 0,

                    y: 0

                })

            }),

            columns: 7,

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
                y: 480,

                width: 288,
                height: 144,

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

            columns: 5,

            itemSize: 92,

            spacingX: 96,

            spacingY: 96

        }),

        Showcase: Object.freeze({

            position: Object.freeze({

                x: 720,
                y: 192

            })

        }),

        Recipe: Object.freeze({

            firstSlot: Object.freeze({

                x: 672,
                y: 480

            }),

            spacing: 96

        })

    })

});