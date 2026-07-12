"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Animator
//=============================================================================

LOGICPULSE.Animator = {

    _animations: [],

    //--------------------------------
    // Update
    //--------------------------------

    update() {

        for (let i = this._animations.length - 1; i >= 0; i--) {

            const animation = this._animations[i];

            if (!animation.target || animation.target.destroyed) {

                this._animations.splice(i, 1);

                continue;

            }

            switch (animation.type) {

                case "pulse":

                    this.updatePulse(animation);

                    break;

                case "bitmapSwap":

                    this.updateBitmapSwap(animation);

                    break;

            }

        }

    },

    //--------------------------------
    // Pulse
    //--------------------------------

    pulse(target, options = {}) {

        if (!target) {

            return;

        }

        const existing = this._animations.find(

            animation =>

                animation.target === target &&
                animation.type === "pulse"

        );

        if (existing) {

            return;

        }

        target.alpha = options.max ?? 1.0;

        this._animations.push({

            type: "pulse",

            target: target,

            min: options.min ?? 0.35,

            max: options.max ?? 1.0,

            speed: options.speed ?? 0.02,

            direction: -1

        });

    },

    //--------------------------------
    // Bitmap Swap
    //--------------------------------

    bitmapSwap(target, folder, frames, options = {}) {

        if (!target) {

            return;

        }

        if (!frames || frames.length < 2) {

            return;

        }

        const existing = this._animations.find(

            animation =>

                animation.target === target &&
                animation.type === "bitmapSwap"

        );

        if (existing) {

            return;

        }

        target.bitmap = LOGICPULSE.Assets.load(

            folder,

            frames[0]

        );

        this._animations.push({

            type: "bitmapSwap",

            target: target,

            folder: folder,

            frames: frames,

            frameIndex: 0,

            timer: 0,

            interval: options.interval ?? 30

        });

    },

    //--------------------------------
    // Stop
    //--------------------------------

    stop(target) {

        this._animations = this._animations.filter(

            animation => animation.target !== target

        );

        if (!target) {

            return;

        }

        target.alpha = 1.0;

    },

    //--------------------------------
    // Clear
    //--------------------------------

    clear() {

        for (const animation of this._animations) {

            if (animation.target) {

                animation.target.alpha = 1.0;

            }

        }

        this._animations = [];

    },

    //--------------------------------
    // Pulse Update
    //--------------------------------

    updatePulse(animation) {

        animation.target.alpha +=

            animation.speed * animation.direction;

        if (animation.target.alpha <= animation.min) {

            animation.target.alpha = animation.min;

            animation.direction = 1;

        }

        else if (animation.target.alpha >= animation.max) {

            animation.target.alpha = animation.max;

            animation.direction = -1;

        }

    },

    //--------------------------------
    // Bitmap Swap Update
    //--------------------------------

    updateBitmapSwap(animation) {

        animation.timer++;

        if (animation.timer < animation.interval) {

            return;

        }

        animation.timer = 0;

        animation.frameIndex++;

        if (animation.frameIndex >= animation.frames.length) {

            animation.frameIndex = 0;

        }

        animation.target.bitmap = LOGICPULSE.Assets.load(

            animation.folder,

            animation.frames[animation.frameIndex]

        );

    },

};

//=============================================================================
// Scene Hook
//=============================================================================

(() => {

    const aliasUpdate = Scene_Base.prototype.update;

    Scene_Base.prototype.update = function() {

        aliasUpdate.call(this);

        LOGICPULSE.Animator.update();

    };

})();