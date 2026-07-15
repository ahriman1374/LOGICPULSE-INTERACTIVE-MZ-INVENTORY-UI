"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Showcase
//=============================================================================

LOGICPULSE.UI.Showcase = class extends LOGICPULSE.UI.Element {

    //--------------------------------
    // Initialize
    //--------------------------------

    constructor() {
        super();
        this._isButtonHovered = false;
        this._isButtonPressed = false;
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
        this.createUseButton();
    }

    //--------------------------------
    // Overlay
    //--------------------------------

    createOverlay() {
        const pos = LOGICPULSE.Layout.Inventory.Showcase.Overlay;
        this._overlay = this.createSprite(
            LOGICPULSE.Assets.Folders.Inventory,
            LOGICPULSE.Assets.Images.Inventory.Showcase,
            pos.x,
            pos.y
        );
    }

    //--------------------------------
    // Item Sprite
    //--------------------------------

    createItemSprite() {
        this._itemSprite = new Sprite();
        this.addChild(this._itemSprite);
    }

    //--------------------------------
    // Item Name
    //--------------------------------

    createItemName() {
        const layout = LOGICPULSE.Layout.Inventory.Showcase.Name;
        this._nameText = new LOGICPULSE.UI.Text({
            x: layout.x,
            y: layout.y,
            width: layout.width,
            height: layout.height,
            align: layout.align,
            fontSize: layout.fontSize
        });
        this.addChild(this._nameText);
    }

    //--------------------------------
    // Description
    //--------------------------------

    createDescription() {
        const layout = LOGICPULSE.Layout.Inventory.Showcase.Description;
        this._descriptionText = new LOGICPULSE.UI.ScrollText({
            x: layout.x,
            y: layout.y,
            width: layout.width,
            height: layout.height,
            padding: layout.padding,
            fontSize: layout.fontSize,
            lineHeight: layout.lineHeight
        });
        this.addChild(this._descriptionText);
    }

    //--------------------------------
    // Use Button
    //--------------------------------

    createUseButton() {
        const pos = LOGICPULSE.Layout.Inventory.Showcase.Button;
        this._useButton = this.createSprite(
            LOGICPULSE.Assets.Folders.Inventory,
            LOGICPULSE.Assets.Images.Inventory.UseButtonIdle,
            pos.x,
            pos.y
        );

        // Store button position for hit testing
        this._useButtonRect = {
            x: pos.x,
            y: pos.y,
            width: pos.width || 288,
            height: pos.height || 48
        };

        // Button state
        this._isButtonHovered = false;
        this._isButtonPressed = false;
        this._useButtonScale = 1.0;
        this._useButtonHoverScale = 1.002;

        // Make the button interactive via mouse manager
        // This is checked in the scene's mouse processing
    }

    //--------------------------------
    // Button hit test (called from mouse manager)
    //--------------------------------

    isButtonHovered(mouseX, mouseY) {
        if (!this._useButton || !this._useButton.visible) return false;
        const rect = this._useButtonRect;
        return mouseX >= rect.x && mouseX <= rect.x + rect.width &&
            mouseY >= rect.y && mouseY <= rect.y + rect.height;
    }

    //--------------------------------
    // Button hover handlers (called from mouse manager)
    //--------------------------------

    _onButtonMouseEnter() {
        if (this._isButtonHovered) return;
        this._isButtonHovered = true;
        if (this._useButton) {
            this._useButton.scale.set(this._useButtonHoverScale);
        }
    }

    _onButtonMouseExit() {
        if (!this._isButtonHovered) return;
        this._isButtonHovered = false;
        if (this._useButton) {
            this._useButton.scale.set(this._useButtonScale);
        }
    }

    _onButtonMouseDown() {
        if (!this._useButton || !this._useButton.visible) return;
        this._isButtonPressed = true;
        // Visual feedback: slightly darker or different image
        // Could use a pressed state image if available
        if (this._useButton) {
            this._useButton.alpha = 0.8;
        }
    }

    _onButtonMouseUp() {
        if (!this._useButton || !this._useButton.visible) return;
        this._isButtonPressed = false;
        if (this._useButton) {
            this._useButton.alpha = 1.0;
        }
        // If mouse is still over the button, it's a click
        if (this._isButtonHovered) {
            this._onButtonClick();
        }
    }

    _onButtonClick() {
        // Use the currently selected item
        this._useItem();
        // Play button animation
        this.playUseAnimation();
    }

    //--------------------------------
    // Use item logic
    //--------------------------------

    _useItem() {
        const scene = SceneManager._scene;
        if (!scene) return;

        const grid = scene._grid || scene._craftGrid;
        if (!grid) return;

        const entry = grid.selectedEntry();
        if (!entry) return;

        if (!LOGICPULSE.InventoryProvider.canUse(entry.item)) {
            return;
        }

        // Use the item via controller's onConfirm
        if (scene._controller && scene._controller.onConfirm) {
            scene._controller.onConfirm();
        }
    }

    //--------------------------------
    // Process mouse input (called from scene)
    //--------------------------------

    processMouseInput() {
        const mouse = LOGICPULSE.Mouse;
        if (!mouse) return;

        const mouseX = mouse.x();
        const mouseY = mouse.y();

        const isOverButton = this.isButtonHovered(mouseX, mouseY);

        // Handle hover state
        if (isOverButton && !this._isButtonHovered) {
            this._onButtonMouseEnter();
        } else if (!isOverButton && this._isButtonHovered) {
            this._onButtonMouseExit();
        }

        // Handle click (mouse down + up)
        if (isOverButton) {
            if (mouse.isTriggered('left')) {
                this._onButtonMouseDown();
            }
            if (mouse.isReleased('left') && this._isButtonPressed) {
                this._onButtonMouseUp();
            }
        } else {
            // Reset pressed state if mouse leaves button
            if (this._isButtonPressed) {
                this._isButtonPressed = false;
                if (this._useButton) {
                    this._useButton.alpha = 1.0;
                }
            }
        }
    }

    //--------------------------------
    // Set Item
    //--------------------------------

    setItem(entry) {
        if (this._destroyed) return;

        if (!entry) {
            this.clear();
            return;
        }
        const item = entry.item;
        this.refreshItemSprite(item);
        if (this._nameText) this._nameText.setText(item.name);
        if (this._descriptionText) this._descriptionText.setText(item.description);
        if (this._useButton) {
            // Show button only if item is usable
            const show = LOGICPULSE.InventoryProvider.showUseButton(item);
            this._useButton.visible = show;
            if (show) {
                this._useButton.scale.set(this._useButtonScale);
                this._useButton.alpha = 1.0;
            }
        }
        // Reset button state
        this._isButtonHovered = false;
        this._isButtonPressed = false;
    }

    //--------------------------------
    // Refresh Item Sprite
    //--------------------------------

    refreshItemSprite(item) {
        this._itemSprite.bitmap = LOGICPULSE.Assets.load(
            LOGICPULSE.Assets.Folders.Showcase,
            `Item_${item.iconIndex}`
        );
        this.centerItemSprite();
    }

    //--------------------------------
    // Center Item
    //--------------------------------

    centerItemSprite() {
        const bitmap = this._itemSprite.bitmap;
        if (!bitmap) return;
        bitmap.addLoadListener(() => {
            const frame = LOGICPULSE.Layout.Inventory.Showcase.Frame;
            this._itemSprite.x = frame.x + (frame.width - bitmap.width) / 2;
            this._itemSprite.y = frame.y + (frame.height - bitmap.height) / 2;
        });
    }

    //--------------------------------
    // Play Use Animation
    //--------------------------------

    playUseAnimation() {
        if (!this._useButton) return;
        this._useButton.bitmap = LOGICPULSE.Assets.load(
            LOGICPULSE.Assets.Folders.Inventory,
            LOGICPULSE.Assets.Images.Inventory.UseButtonHover
        );
        setTimeout(() => {
            if (this._useButton && !this._destroyed) {
                this._useButton.bitmap = LOGICPULSE.Assets.load(
                    LOGICPULSE.Assets.Folders.Inventory,
                    LOGICPULSE.Assets.Images.Inventory.UseButtonIdle
                );
                // Reset scale after animation
                if (this._useButton) {
                    this._useButton.scale.set(this._useButtonScale);
                }
            }
        }, 120);
    }

    //--------------------------------
    // Clear
    //--------------------------------

    clear() {
        if (this._itemSprite) {
            this._itemSprite.bitmap = null;
        }
        if (this._nameText) {
            this._nameText.setText("");
        }
        if (this._descriptionText) {
            this._descriptionText.setText("");
        }
        if (this._useButton) {
            this._useButton.visible = false;
            this._useButton.scale.set(this._useButtonScale);
            this._useButton.alpha = 1.0;
        }
        this._isButtonHovered = false;
        this._isButtonPressed = false;
    }

    //--------------------------------
    // Destroy
    //--------------------------------

    destroy(options) {
        this._destroyed = true;
        super.destroy(options);
    }
};