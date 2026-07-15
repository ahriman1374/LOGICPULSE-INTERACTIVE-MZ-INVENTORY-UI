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

        // Mouse state for arrows
        this._isIncreaseHovered = false;
        this._isDecreaseHovered = false;
        this._isIncreasePressed = false;
        this._isDecreasePressed = false;

        this.create();
    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {
        this.createItemIncreaseArrow();
        this.createItemDecreaseArrow();
        this.createNumber();
        this.createMaxNumber();
        this.refresh();
    }

    //--------------------------------
    // Create Increase Arrow
    //--------------------------------

    createItemIncreaseArrow() {
        const layout = LOGICPULSE.Layout.Synthesizer.Showcase.ItemIncrease;

        this._increaseBg = this.createSprite(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.ItemIncreaseInactive,
            layout.x,
            layout.y
        );

        this._rightArrow = this.createSprite(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.ItemIncreaseActive,
            layout.x,
            layout.y
        );
        this._rightArrow.visible = false;

        this._increaseRect = {
            x: layout.x,
            y: layout.y,
            width: layout.width || 27,
            height: layout.height || 27
        };
    }

    //--------------------------------
    // Create Decrease Arrow
    //--------------------------------

    createItemDecreaseArrow() {
        const layout = LOGICPULSE.Layout.Synthesizer.Showcase.ItemDecrease;

        this._decreaseBg = this.createSprite(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.ItemDecreaseInactive,
            layout.x,
            layout.y
        );

        this._leftArrow = this.createSprite(
            LOGICPULSE.Assets.Folders.Synthesizer,
            LOGICPULSE.Assets.Images.Synthesizer.ItemDecreaseActive,
            layout.x,
            layout.y
        );
        this._leftArrow.visible = false;

        this._decreaseRect = {
            x: layout.x,
            y: layout.y,
            width: layout.width || 27,
            height: layout.height || 27
        };
    }

    //--------------------------------
    // Number
    //--------------------------------

    createNumber() {
        const layout = LOGICPULSE.Layout.Synthesizer.Showcase.CurrentNumber;
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
        const layout = LOGICPULSE.Layout.Synthesizer.Showcase.MaxNumber;
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

    //=========================================================================
    // MOUSE INTERACTION
    //=========================================================================

    processMouseInput(mouseX, mouseY) {
        // ONLY process if item is set AND max > 0 AND in craft mode
        if (!this._item || this._max <= 0) {
            this._setIncreaseHover(false);
            this._setDecreaseHover(false);
            return;
        }

        // Check if scene is in craft mode
        const scene = SceneManager._scene;
        if (!scene || !scene._controller || scene._controller._state !== "craft") {
            this._setIncreaseHover(false);
            this._setDecreaseHover(false);
            return;
        }

        const isOverIncrease = this._isPointInRect(mouseX, mouseY, this._increaseRect);
        const isOverDecrease = this._isPointInRect(mouseX, mouseY, this._decreaseRect);

        this._setIncreaseHover(isOverIncrease);
        this._setDecreaseHover(isOverDecrease);

        if (isOverIncrease) {
            if (TouchInput.isTriggered()) {
                this._onIncreasePress();
            }
            if (TouchInput.isReleased() && this._isIncreasePressed) {
                this._onIncreaseRelease();
            }
        } else {
            if (this._isIncreasePressed) {
                this._isIncreasePressed = false;
                this._rightArrow.visible = false;
            }
        }

        if (isOverDecrease) {
            if (TouchInput.isTriggered()) {
                this._onDecreasePress();
            }
            if (TouchInput.isReleased() && this._isDecreasePressed) {
                this._onDecreaseRelease();
            }
        } else {
            if (this._isDecreasePressed) {
                this._isDecreasePressed = false;
                this._leftArrow.visible = false;
            }
        }
    }

    _isPointInRect(x, y, rect) {
        return x >= rect.x && x <= rect.x + rect.width &&
            y >= rect.y && y <= rect.y + rect.height;
    }

    _setIncreaseHover(hovered) {
        if (this._isIncreaseHovered === hovered) return;
        this._isIncreaseHovered = hovered;
        if (this._increaseBg) {
            this._increaseBg.scale.set(hovered ? 1.1 : 1.0);
        }
    }

    _setDecreaseHover(hovered) {
        if (this._isDecreaseHovered === hovered) return;
        this._isDecreaseHovered = hovered;
        if (this._decreaseBg) {
            this._decreaseBg.scale.set(hovered ? 1.1 : 1.0);
        }
    }

    _onIncreasePress() {
        if (this._max <= 0) return;
        this._isIncreasePressed = true;
        this._rightArrow.visible = true;
        this.increase(1);
    }

    _onIncreaseRelease() {
        if (!this._isIncreasePressed) return;
        this._isIncreasePressed = false;
        setTimeout(() => {
            if (!this._isIncreaseHovered) {
                this._rightArrow.visible = false;
            }
        }, 150);
    }

    _onDecreasePress() {
        if (this._max <= 0) return;
        this._isDecreasePressed = true;
        this._leftArrow.visible = true;
        this.decrease(1);
    }

    _onDecreaseRelease() {
        if (!this._isDecreasePressed) return;
        this._isDecreasePressed = false;
        setTimeout(() => {
            if (!this._isDecreaseHovered) {
                this._leftArrow.visible = false;
            }
        }, 150);
    }

    //=========================================================================
    // EXISTING METHODS
    //=========================================================================

    setItem(item) {
        this._item = item;
        this._value = 1;

        if (!item) {
            this._max = 1;
        } else {
            this._max = LOGICPULSE.RecipeManager.maxCraftAmount(item);
            this._value = this._max > 0 ? 1 : 0;
        }

        this.refresh();
    }

    increase(amount) {
        amount = amount || 1;
        const old = this._value;
        if (this._max <= 0) return;
        this._value = Math.min(this._value + amount, this._max);
        if (this._value !== old) {
            this.showArrow("right");
            this.refresh();
        }
    }

    decrease(amount) {
        amount = amount || 1;
        const old = this._value;
        if (this._max <= 0) return;
        this._value = Math.max(this._value - amount, 1);
        if (this._value !== old) {
            this.showArrow("left");
            this.refresh();
        }
    }

    setValue(value) {
        if (this._max <= 0) {
            this._value = 0;
        } else {
            this._value = Math.max(1, Math.min(value, this._max));
        }
        this.refresh();
    }

    showArrow(direction) {
        this._arrowTimer = 20;
        this._leftArrow.visible = direction === "left";
        this._rightArrow.visible = direction === "right";
    }

    refresh() {
        if (!this._numberText || !this._maxNumberText) return;
        if (this._max <= 0) {
            this._numberText.setText("0/0");
            this._maxNumberText.setText("0");
        } else {
            this._numberText.setText(`${this._value}/${this._max}`);
            this._maxNumberText.setText(String(this._max));
        }
    }

    update() {
        if (this._arrowTimer > 0) {
            this._arrowTimer--;
            if (this._arrowTimer <= 0) {
                this._leftArrow.visible = false;
                this._rightArrow.visible = false;
            }
        }
    }

    value() { return this._value; }
    max() { return this._max; }
};