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

            columns: 7,

            itemSize: 92,

            spacing: 96

        }),

        Showcase: Object.freeze({

            Overlay: Object.freeze({

                x: 0,
                y: 0

            }),

            Item: Object.freeze({

                x: 914,
                y: 192

            }),

            Description: Object.freeze({

                x: 912,
                y: 480

            })

        }),

        Description: Object.freeze({

            position: Object.freeze({

                x: 912,
                y: 480

            })

        })

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

            spacing: 96

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