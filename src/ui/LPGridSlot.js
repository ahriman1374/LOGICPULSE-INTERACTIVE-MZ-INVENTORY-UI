"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

//=============================================================================
// Grid Slot
//=============================================================================

LOGICPULSE.UI.GridSlot = class extends LOGICPULSE.UI.Element {

    constructor(options = {}) {

        super();

        this._entry = options.entry || null;
        this._focused = false;
        this._locked = false;
        this._craftSelected = false;
        this._isDestroyed = false; // custom flag

        // Mouse state
        this._isHovered = false;
        this._isMouseDown = false;
        this._isDragging = false;
        this._dragGhost = null;
        this._dragOriginalX = 0;
        this._dragOriginalY = 0;
        this._mouseDownX = 0;
        this._mouseDownY = 0;

        // Mouse event handlers
        this._clickHandlers = [];
        this._hoverEnterHandlers = [];
        this._hoverExitHandlers = [];
        this._dragStartHandlers = [];
        this._dragMoveHandlers = [];
        this._dragEndHandlers = [];

        this.move(
            options.x ?? 0,
            options.y ?? 0
        );

        this.create();

    }

    //--------------------------------
    // Create
    //--------------------------------

    create() {

        this.createBackground();
        this.createIcon();
        this.createAmount();
        this.createSelectionFrame();
        this.createHoverOverlay();

        this.updateSelection();

    }

    //--------------------------------
    // Refresh
    //--------------------------------

    refresh() {

        this.removeChildren();
        this._dragGhost = null;
        this._isDragging = false;
        this._isMouseDown = false;
        // Destroy old hover overlay if exists
        if (this._hoverOverlay) {
            this._hoverOverlay.destroy();
            this._hoverOverlay = null;
        }
        this.create();

    }

    //--------------------------------
    // Background
    //--------------------------------

    createBackground() {

        const background = this.background();

        if (!background) {
            return;
        }

        this._background = this.createSprite(
            background.folder,
            background.image
        );

        // Store original alpha for hover effects
        this._backgroundAlpha = 1.0;
        this._backgroundTint = 0xFFFFFF;

    }

    //--------------------------------
    // Hover Overlay
    //--------------------------------

    createHoverOverlay() {

        // Create a semi-transparent overlay for hover effect
        this._hoverOverlay = new PIXI.Graphics();
        this._hoverOverlay.beginFill(0xFFFFFF, 0);
        this._hoverOverlay.drawRect(0, 0, 92, 92);
        this._hoverOverlay.endFill();
        this._hoverOverlay.visible = false;
        this.addChild(this._hoverOverlay);

    }

    //--------------------------------
    // Icon
    //--------------------------------

    createIcon() {

        const item = this.item();

        if (!item) {
            return;
        }

        this._icon = this.createItemSprite(item);

        const offset =
            LOGICPULSE.Layout.Inventory.Grid.Icon.offset;

        this._icon.x = offset.x;
        this._icon.y = offset.y;

        this.addChild(this._icon);

    }

    //--------------------------------
    // Item Sprite
    //--------------------------------
    createItemSprite(item) {

        return LOGICPULSE.Assets.createItemSprite(
            item
        );

    }

    //--------------------------------
    // Amount
    //--------------------------------

    createAmount() {

        if (this.amount() <= 0) {
            return;
        }

        const layout =
            LOGICPULSE.Layout.Inventory.Amount;

        this._amountText = this.createText({

            text: this.amount(),

            x: layout.x,
            y: layout.y,

            width: layout.width,
            height: layout.height,

            align: layout.align,

            fontSize: layout.fontSize

        });

    }

    //--------------------------------
    // Selection Frame
    //--------------------------------

    createSelectionFrame() {

        const frame = this.selectionFrameAsset();

        this._selectionFrame = this.createSprite(
            frame.folder,
            frame.image
        );

        this._selectionFrame.visible = false;

    }

    //--------------------------------
    // Selection Frame Asset
    //--------------------------------

    selectionFrameAsset() {

        return {

            folder:
            LOGICPULSE.Assets.Folders.Inventory,

            image:
            LOGICPULSE.Assets.Images.Inventory.SelectionFrame

        };

    }

    //--------------------------------
    // Background Image
    //--------------------------------

    background() {

        return {

            folder:
            LOGICPULSE.Assets.Folders.Inventory,

            image:
                this.getBackgroundImage()

        };

    }

    //--------------------------------
    // Background Image
    //--------------------------------

    getBackgroundImage() {

        switch (this.rarity()) {

            case 3:
                return LOGICPULSE.Assets.Images.Inventory.ItemBoxLegendary;

            case 2:
                return LOGICPULSE.Assets.Images.Inventory.ItemBoxRare;

            default:
                return LOGICPULSE.Assets.Images.Inventory.ItemBoxCommon;

        }

    }

    //--------------------------------
    // Focus
    //--------------------------------

    setFocused(value) {

        if (this._focused === value) {
            return;
        }

        this._focused = value;

        // If focused by keyboard, clear mouse hover state
        if (value) {
            this._isHovered = false;
        }

        this.updateSelection();

    }

    //--------------------------------
    // Locked
    //--------------------------------

    setLocked(value) {

        if (this._locked === value) {
            return;
        }

        this._locked = value;

        this.updateSelection();

    }

    //--------------------------------
    // Focused
    //--------------------------------

    focused() {

        return this._focused;

    }

    //--------------------------------
    // Locked
    //--------------------------------

    locked() {

        return this._locked;

    }

    //--------------------------------
    // Update Selection
    //--------------------------------

    updateSelection() {

        if (!this._selectionFrame) {
            return;
        }

        if (this._focused) {
            this._selectionFrame.visible = true;
            this._selectionFrame.alpha = 1.0;
            LOGICPULSE.Animator.pulse(
                this._selectionFrame
            );
        }
        else {
            this._selectionFrame.visible = false;
            LOGICPULSE.Animator.stop(
                this._selectionFrame
            );
        }

    }

    //=========================================================================
    // MOUSE EVENT HANDLERS
    //=========================================================================

    //--------------------------------
    // Mouse Enter
    //--------------------------------

    _onMouseEnter() {
        if (this._focused) return;
        if (this._isDestroyed || this.destroyed) return;

        this._isHovered = true;
        this._showHoverEffect();

        for (const handler of this._hoverEnterHandlers) {
            handler(this);
        }
    }

    //--------------------------------
    // Mouse Exit
    //--------------------------------

    _onMouseExit() {
        if (this._isDestroyed || this.destroyed) return;
        this._isHovered = false;
        this._hideHoverEffect();

        for (const handler of this._hoverExitHandlers) {
            handler(this);
        }
    }

    //--------------------------------
    // Mouse Down
    //--------------------------------

    _onMouseDown(button, x, y) {
        if (this._locked || this._isDestroyed || this.destroyed) return;

        this._isMouseDown = true;
        this._mouseDownX = x;
        this._mouseDownY = y;

        if (this._background) {
            this._background.alpha = 0.7;
        }

        this._dragStartX = x;
        this._dragStartY = y;
        this._dragOffsetX = x - this.x;
        this._dragOffsetY = y - this.y;

        this._triggerEvent('clickDown', [button, x, y]);
    }

    //--------------------------------
    // Mouse Up
    //--------------------------------

    _onMouseUp(button, x, y) {
        if (this._isDestroyed || this.destroyed) return;
        if (!this._isMouseDown) return;

        this._isMouseDown = false;

        if (this._background) {
            this._background.alpha = 1.0;
        }

        if (this._isDragging) {
            this._onDragEnd(x, y);
            this._isDragging = false;
            return;
        }

        const dx = x - this._mouseDownX;
        const dy = y - this._mouseDownY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            this._triggerEvent('click', [button, x, y]);
        }
    }

    //--------------------------------
    // Drag Start
    //--------------------------------

    _onDragStart(x, y) {
        if (this._locked || !this._entry || this._isDestroyed || this.destroyed) return;

        this._isDragging = true;
        this._dragOriginalX = this.x;
        this._dragOriginalY = this.y;

        this._createDragGhost();

        if (this._background) {
            this._background.alpha = 0.5;
        }

        this._triggerEvent('dragStart', [x, y]);
    }

    //--------------------------------
    // Drag Move
    //--------------------------------

    _onDragMove(x, y) {
        if (!this._isDragging || !this._dragGhost || this._isDestroyed || this.destroyed) return;

        this._dragGhost.x = x - this._dragOffsetX;
        this._dragGhost.y = y - this._dragOffsetY;

        const targetSlot = this._findTargetSlot(x, y);
        this._highlightDropTarget(targetSlot);

        this._triggerEvent('dragMove', [x, y]);
    }

    //--------------------------------
    // Drag End
    //--------------------------------

    _onDragEnd(x, y) {
        if (!this._isDragging || this._isDestroyed || this.destroyed) return;

        this._isDragging = false;

        const targetSlot = this._findTargetSlot(x, y);
        if (targetSlot && targetSlot !== this) {
            this._swapItems(targetSlot);
        }

        this._removeDragGhost();

        if (this._background) {
            this._background.alpha = 1.0;
        }

        this._clearDropHighlight();

        this._triggerEvent('dragEnd', [x, y]);
    }

    //--------------------------------
    // Drag Ghost
    //--------------------------------

    _createDragGhost() {
        if (this._dragGhost || this._isDestroyed || this.destroyed) return;

        this._dragGhost = new PIXI.Container();

        if (this._background && this._background.texture) {
            const ghostBg = new Sprite(this._background.texture);
            ghostBg.alpha = 0.85;
            ghostBg.x = 0;
            ghostBg.y = 0;
            this._dragGhost.addChild(ghostBg);
        }

        if (this._icon && this._icon.texture) {
            const ghostIcon = new Sprite(this._icon.texture);
            ghostIcon.x = this._icon.x || 0;
            ghostIcon.y = this._icon.y || 0;
            this._dragGhost.addChild(ghostIcon);
        }

        if (this._amountText) {
            const layout = LOGICPULSE.Layout.Inventory.Amount;
            const ghostAmount = new LOGICPULSE.UI.Text({
                text: this.amount(),
                x: layout.x,
                y: layout.y,
                width: layout.width,
                height: layout.height,
                align: layout.align,
                fontSize: layout.fontSize
            });
            this._dragGhost.addChild(ghostAmount);
        }

        this._dragGhost.x = this.x;
        this._dragGhost.y = this.y;
        this._dragGhost.scale.set(1.1);

        const scene = SceneManager._scene;
        if (scene) {
            scene.addChild(this._dragGhost);
        }
    }

    _removeDragGhost() {
        if (this._dragGhost) {
            if (this._dragGhost.parent) {
                this._dragGhost.parent.removeChild(this._dragGhost);
            }
            this._dragGhost.destroy({ children: true });
            this._dragGhost = null;
        }
    }

    //--------------------------------
    // Find Target Slot
    //--------------------------------

    _findTargetSlot(x, y) {
        const scene = SceneManager._scene;
        if (!scene) return null;

        const grid = scene._grid || scene._craftGrid;
        if (!grid || !grid._slots) return null;

        for (const slot of grid._slots) {
            if (slot === this || !slot.visible || slot._locked) continue;

            const bounds = this._getWorldBounds(slot);
            if (x >= bounds.x && x <= bounds.x + bounds.width &&
                y >= bounds.y && y <= bounds.y + bounds.height) {
                return slot;
            }
        }
        return null;
    }

    _getWorldBounds(slot) {
        let worldX = slot.x;
        let worldY = slot.y;
        let parent = slot.parent;

        while (parent && parent !== SceneManager._scene) {
            worldX += parent.x || 0;
            worldY += parent.y || 0;
            parent = parent.parent;
        }

        return {
            x: worldX,
            y: worldY,
            width: 92,
            height: 92
        };
    }

    //--------------------------------
    // Highlight Drop Target
    //--------------------------------

    _highlightDropTarget(targetSlot) {
        this._clearDropHighlight();

        if (targetSlot && targetSlot !== this) {
            targetSlot._showDropHighlight();
            this._dropTarget = targetSlot;
        }
    }

    _showDropHighlight() {
        if (this._dropHighlight) return;

        this._dropHighlight = new PIXI.Graphics();
        this._dropHighlight.lineStyle(3, 0x00FF00, 0.8);
        this._dropHighlight.drawRect(0, 0, 92, 92);
        this._dropHighlight.alpha = 0.6;
        this.addChild(this._dropHighlight);
    }

    _clearDropHighlight() {
        if (this._dropTarget) {
            this._dropTarget._removeDropHighlight();
            this._dropTarget = null;
        }
        this._removeDropHighlight();
    }

    _removeDropHighlight() {
        if (this._dropHighlight) {
            this.removeChild(this._dropHighlight);
            this._dropHighlight.destroy();
            this._dropHighlight = null;
        }
    }

    //--------------------------------
    // Swap Items
    //--------------------------------

    _swapItems(targetSlot) {
        if (!this._entry || !targetSlot._entry) return;

        const myEntry = this._entry;
        const targetEntry = targetSlot._entry;

        const tempItem = myEntry.item;
        const tempAmount = myEntry.amount;
        const tempRarity = myEntry.rarity;

        myEntry.item = targetEntry.item;
        myEntry.amount = targetEntry.amount;
        myEntry.rarity = targetEntry.rarity;

        targetEntry.item = tempItem;
        targetEntry.amount = tempAmount;
        targetEntry.rarity = tempRarity;

        this.refresh();
        targetSlot.refresh();

        SoundManager.playOk();

        this._triggerEvent('swap', [targetSlot]);
        targetSlot._triggerEvent('swap', [this]);
    }

    //--------------------------------
    // Hover Effects (FIXED with extra null safety)
    //--------------------------------

    _showHoverEffect() {
        // Safety: if object is destroyed or missing scale, skip
        if (this._isDestroyed || this.destroyed) return;
        if (!this.scale) return; // crucial check

        // Recreate overlay if missing
        if (!this._hoverOverlay || this._hoverOverlay.destroyed) {
            this.createHoverOverlay();
        }

        if (this._hoverOverlay && typeof this._hoverOverlay.clear === 'function') {
            this._hoverOverlay.visible = true;
            this._hoverOverlay.clear();
            this._hoverOverlay.beginFill(0xFFFFFF, 0.15);
            this._hoverOverlay.drawRect(0, 0, 92, 92);
            this._hoverOverlay.endFill();
        }

        // Scale safely
        if (this.scale && typeof this.scale.set === 'function') {
            this.scale.set(1.02);
        }
    }

    _hideHoverEffect() {
        // Safety: if object is destroyed or missing scale, skip
        if (this._isDestroyed || this.destroyed) return;
        if (!this.scale) return; // crucial check

        if (this._hoverOverlay && typeof this._hoverOverlay.clear === 'function') {
            this._hoverOverlay.visible = false;
            this._hoverOverlay.clear();
        }

        // Scale safely
        if (this.scale && typeof this.scale.set === 'function') {
            this.scale.set(1.0);
        }
    }

    //--------------------------------
    // Event Handlers
    //--------------------------------

    addClickHandler(handler) {
        this._clickHandlers.push(handler);
    }

    addHoverEnterHandler(handler) {
        this._hoverEnterHandlers.push(handler);
    }

    addHoverExitHandler(handler) {
        this._hoverExitHandlers.push(handler);
    }

    addDragStartHandler(handler) {
        this._dragStartHandlers.push(handler);
    }

    addDragMoveHandler(handler) {
        this._dragMoveHandlers.push(handler);
    }

    addDragEndHandler(handler) {
        this._dragEndHandlers.push(handler);
    }

    _triggerEvent(type, args) {
        const handlers = {
            click: this._clickHandlers,
            clickDown: this._clickDownHandlers || [],
            hoverEnter: this._hoverEnterHandlers,
            hoverExit: this._hoverExitHandlers,
            dragStart: this._dragStartHandlers,
            dragMove: this._dragMoveHandlers,
            dragEnd: this._dragEndHandlers,
            swap: this._swapHandlers || []
        };

        const handlerList = handlers[type] || [];
        for (const handler of handlerList) {
            handler(...args);
        }
    }

    //--------------------------------
    // Entry
    //--------------------------------

    entry() {
        return this._entry;
    }

    item() {
        return this._entry?.item ?? null;
    }

    amount() {
        return this._entry?.amount ?? 0;
    }

    rarity() {
        return this._entry?.rarity ?? 1;
    }

    category() {
        return this._entry?.category ?? null;
    }

    //--------------------------------
    // Destroy
    //--------------------------------

    destroy(options = { children: true }) {
        this._isDestroyed = true;

        this._removeDragGhost();
        this._clearDropHighlight();

        if (this._hoverOverlay) {
            this._hoverOverlay.destroy();
            this._hoverOverlay = null;
        }

        this._clickHandlers = [];
        this._hoverEnterHandlers = [];
        this._hoverExitHandlers = [];
        this._dragStartHandlers = [];
        this._dragMoveHandlers = [];
        this._dragEndHandlers = [];
        this._swapHandlers = [];

        super.destroy(options);
    }

};