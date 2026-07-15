"use strict";

window.LOGICPULSE = window.LOGICPULSE || {};
LOGICPULSE.UI = LOGICPULSE.UI || {};

LOGICPULSE.UI.Sidebar = class extends LOGICPULSE.UI.Element {

    constructor() {
        super();

        this._selectedIndex = 0;
        this._hoveredIndex = -1;
        this._onTabSelectedCallback = null;

        this._definitions = [
            {
                category: LOGICPULSE.Constants.Category.Consumable,
                idle: LOGICPULSE.Assets.Images.Sidebar.ConsumableIdle,
                hover: LOGICPULSE.Assets.Images.Sidebar.ConsumableHover,
                header: LOGICPULSE.Assets.Images.Sidebar.ConsumableHeader
            },
            {
                category: LOGICPULSE.Constants.Category.Material,
                idle: LOGICPULSE.Assets.Images.Sidebar.MaterialIdle,
                hover: LOGICPULSE.Assets.Images.Sidebar.MaterialHover,
                header: LOGICPULSE.Assets.Images.Sidebar.MaterialHeader
            },
            {
                category: LOGICPULSE.Constants.Category.Key,
                idle: LOGICPULSE.Assets.Images.Sidebar.KeyMaterialIdle,
                hover: LOGICPULSE.Assets.Images.Sidebar.KeyMaterialHover,
                header: LOGICPULSE.Assets.Images.Sidebar.KeyMaterialHeader
            },
            {
                category: "synthesizer",
                idle: LOGICPULSE.Assets.Images.Sidebar.SynthesizerIdle,
                hover: LOGICPULSE.Assets.Images.Sidebar.SynthesizerHover,
                header: LOGICPULSE.Assets.Images.Sidebar.SynthesizerHeader
            }
        ];

        this._tabs = [];
        this.create();
    }

    create() {
        this.createBackground();
        this.createHeaderFrame();
        this.createKeyboardHint();
        this.createTabs();
        this.refresh();
    }

    createBackground() {
        this._background = this.createSprite(
            LOGICPULSE.Assets.Folders.Sidebar,
            LOGICPULSE.Assets.Images.Sidebar.Box
        );
    }

    createHeaderFrame() {
        this._headerFrame = this.createSprite(
            LOGICPULSE.Assets.Folders.Sidebar,
            this._definitions[0].header
        );
        this.addChild(this._headerFrame);
    }

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
            { interval: 40 }
        );
    }

    createTabs() {
        const layout = LOGICPULSE.Layout.Inventory.Sidebar;

        for (let i = 0; i < this._definitions.length; i++) {
            const def = this._definitions[i];
            const sprite = this.createSprite(
                LOGICPULSE.Assets.Folders.Sidebar,
                def.idle
            );
            sprite.x = layout.tabs.x;
            sprite.y = layout.tabs.y + i * layout.tabs.spacing;

            sprite._rect = {
                x: sprite.x,
                y: sprite.y,
                width: layout.tabs.width || 44,
                height: layout.tabs.height || 44
            };

            sprite._baseScale = 1.0;
            sprite._hoverScale = 1.1;
            sprite.scale.set(1.0);

            this.addChild(sprite);
            this._tabs.push(sprite);
        }
    }

    setOnTabSelected(callback) {
        this._onTabSelectedCallback = callback;
    }

    //=========================================================================
    // MOUSE INTERACTION – DOES NOT AUTO-SELECT; CALLBACK HANDLES IT
    //=========================================================================

    processMouseInput(mouseX, mouseY) {
        if (!this._tabs || !this._definitions || this._tabs.length === 0) return;

        let hoveredIndex = -1;

        for (let i = 0; i < this._tabs.length; i++) {
            const rect = this._tabs[i]._rect;
            if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                mouseY >= rect.y && mouseY <= rect.y + rect.height) {
                hoveredIndex = i;
                break;
            }
        }

        const isValidIndex = (idx) => {
            return idx >= 0 && idx < this._tabs.length && idx < this._definitions.length && this._definitions[idx] !== undefined;
        };

        // Update hover state (visual only)
        if (hoveredIndex !== this._hoveredIndex) {
            // Reset old hover (if not selected)
            if (isValidIndex(this._hoveredIndex) && this._hoveredIndex !== this._selectedIndex) {
                const oldSprite = this._tabs[this._hoveredIndex];
                if (oldSprite) {
                    oldSprite.bitmap = LOGICPULSE.Assets.load(
                        LOGICPULSE.Assets.Folders.Sidebar,
                        this._definitions[this._hoveredIndex].idle
                    );
                    oldSprite.scale.set(1.0);
                }
            }

            this._hoveredIndex = hoveredIndex;

            // Apply new hover (if not selected)
            if (isValidIndex(this._hoveredIndex) && this._hoveredIndex !== this._selectedIndex) {
                const newSprite = this._tabs[this._hoveredIndex];
                if (newSprite) {
                    newSprite.bitmap = LOGICPULSE.Assets.load(
                        LOGICPULSE.Assets.Folders.Sidebar,
                        this._definitions[this._hoveredIndex].hover
                    );
                    newSprite.scale.set(1.1);
                }
            }
        }

        // Handle click – do NOT select here; let the callback handle it.
        if (isValidIndex(this._hoveredIndex) && this._hoveredIndex !== this._selectedIndex) {
            if (TouchInput.isTriggered()) {
                if (this._onTabSelectedCallback) {
                    const def = this._definitions[this._hoveredIndex];
                    if (def) {
                        this._onTabSelectedCallback(this._hoveredIndex, def.category);
                    }
                }
            }
        }
    }

    //=========================================================================
    // EXISTING METHODS (unchanged)
    //=========================================================================

    select(index) {
        index = Math.max(0, Math.min(index, this._definitions.length - 1));
        if (index === this._selectedIndex) return;

        this._selectedIndex = index;
        this._hoveredIndex = -1;
        this.refresh();
    }

    refresh() {
        for (let i = 0; i < this._tabs.length; i++) {
            const sprite = this._tabs[i];
            const def = this._definitions[i];
            const image = (i === this._selectedIndex) ? def.hover : def.idle;
            sprite.bitmap = LOGICPULSE.Assets.load(
                LOGICPULSE.Assets.Folders.Sidebar,
                image
            );
            sprite.scale.set(1.0);
        }

        this._headerFrame.bitmap = LOGICPULSE.Assets.load(
            LOGICPULSE.Assets.Folders.Sidebar,
            this._definitions[this._selectedIndex].header
        );
    }

    next() {
        this.select((this._selectedIndex + 1) % this._definitions.length);
    }

    previous() {
        this.select((this._selectedIndex - 1 + this._definitions.length) % this._definitions.length);
    }

    selectedIndex() {
        return this._selectedIndex;
    }

    selectCategory(category) {
        const index = this._definitions.findIndex(def => def.category === category);
        if (index >= 0) this.select(index);
    }

    selectedCategory() {
        return this._definitions[this._selectedIndex].category;
    }

    categoryCount() {
        return this._definitions.length;
    }

    definition(index) {
        return this._definitions[index];
    }

    destroy(options = { children: true }) {
        this._onTabSelectedCallback = null;
        super.destroy(options);
    }
};