"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Craft Button
//=============================================================================

LOGICPULSE.UI.CraftButton = class extends LOGICPULSE.UI.Element {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {
        super();
        this._isHovered = false;
        this._isPressed = false;
        this._enabled = false;
        this._item = null;
        this.create();
    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {
        const layout = LOGICPULSE.Layout.Synthesizer.Showcase.Button;

        this._sprite = this.createSprite(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.SynthesizeIdle,
            layout.x,
            layout.y
        );

        this._rect = {
            x: layout.x,
            y: layout.y,
            width: layout.width || 160,
            height: layout.height || 30
        };

        this._baseScale = layout.scale || 1.0;
        this._hoverScale = layout.hoverScale || 1.05;
        this._sprite.scale.set(this._baseScale);
    }

    //--------------------------------
    // Set item
    //--------------------------------

    setItem(item) {
        this._item = item;
        if (item && LOGICPULSE.RecipeManager.canCraft(item)) {
            this._enabled = true;
            this._sprite.alpha = 1.0;
            this.setIdle();
        } else {
            this._enabled = false;
            this._sprite.alpha = 0.4;
            this._sprite.scale.set(this._baseScale);
            this._isHovered = false;
        }
    }

    //--------------------------------
    // Process mouse input
    //--------------------------------

    processMouseInput(mouseX, mouseY) {
        // Only process if enabled and in craft mode
        if (!this._enabled) {
            if (this._isHovered) {
                this._setHover(false);
            }
            return;
        }

        // Check if scene is in craft mode
        const scene = SceneManager._scene;
        if (!scene || !scene._controller || scene._controller._state !== "craft") {
            if (this._isHovered) {
                this._setHover(false);
            }
            return;
        }

        const isOver = this._isPointInRect(mouseX, mouseY, this._rect);

        this._setHover(isOver);

        if (isOver) {
            if (TouchInput.isTriggered()) {
                this._onPress();
            }
            if (TouchInput.isReleased() && this._isPressed) {
                this._onRelease();
            }
        } else {
            if (this._isPressed) {
                this._isPressed = false;
                this.setIdle();
            }
        }
    }

    _isPointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
            y >= rect.y && y <= rect.y + rect.height;
    }

    _setHover(hovered) {
        if (this._isHovered === hovered) return;
        this._isHovered = hovered;
        if (this._sprite) {
            this._sprite.scale.set(hovered ? this._hoverScale : this._baseScale);
        }
    }

    _onPress() {
        if (!this._enabled) return;
        this._isPressed = true;
        this.setHover();
    }

    _onRelease() {
        if (!this._isPressed) return;
        this._isPressed = false;
        this._onClick();
        this.setIdle();
    }

    _onClick() {
        const scene = SceneManager._scene;
        if (scene && scene._controller && typeof scene._controller.craft === 'function') {
            scene._controller.craft();
        } else if (scene && scene.craftCurrentItem) {
            scene.craftCurrentItem();
        }
    }

    //--------------------------------
    // Public API
    //--------------------------------

    setIdle() {
        if (!this._sprite) return;
        this._sprite.bitmap = LOGICPULSE.Assets.load(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.SynthesizeIdle
        );
    }

    setHover() {
        if (!this._sprite) return;
        this._sprite.bitmap = LOGICPULSE.Assets.load(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.SynthesizeHover
        );
    }

    playPressAnimation() {
        if (!this._sprite) return;
        this.setHover();
        setTimeout(() => {
            if (this._sprite) {
                this.setIdle();
            }
        }, 120);
    }

    destroy(options) {
        this._sprite = null;
        super.destroy(options);
    }
};