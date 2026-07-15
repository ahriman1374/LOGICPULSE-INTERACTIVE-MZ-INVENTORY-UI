//=============================================================================
// LPMouse.js
//=============================================================================

window.LOGICPULSE = window.LOGICPULSE || {};

//=============================================================================
// Mouse Manager - Uses RPG Maker's TouchInput for coordinates
//=============================================================================

LOGICPULSE.Mouse = {

    //--------------------------------
    // State
    //--------------------------------

    _x: 0,
    _y: 0,
    _hoveredElement: null,
    _pressedElement: null,
    _draggedElement: null,
    _dragOffsetX: 0,
    _dragOffsetY: 0,
    _mouseDownX: 0,
    _mouseDownY: 0,
    _clickThreshold: 5,
    _isDragging: false,
    _initialized: false,
    _wheelDelta: 0,
    _pendingUse: false,

    //--------------------------------
    // Initialize
    //--------------------------------

    initialize: function() {
        if (this._initialized) return;
        this._initialized = true;
        console.log('[LOGICPULSE.Mouse] Initialized');

        this._patchTouchInput();
        document.addEventListener('wheel', this._onWheel.bind(this), { passive: true });
        document.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
    },

    //--------------------------------
    // Patch TouchInput
    //--------------------------------

    _patchTouchInput: function() {
        var originalUpdate = TouchInput.update;
        var self = this;

        TouchInput.update = function() {
            originalUpdate.call(this);
            self._updateFromTouchInput();
        };
    },

    //--------------------------------
    // Update from TouchInput
    //--------------------------------

    _updateFromTouchInput: function() {
        this._x = TouchInput.x;
        this._y = TouchInput.y;
        this._processHover();
    },

    //--------------------------------
    // Wheel Event
    //--------------------------------

    _onWheel: function(e) {
        this._wheelDelta = e.deltaY > 0 ? 1 : -1;
        this._processScroll();
    },

    //--------------------------------
    // Mouse Down/Up
    //--------------------------------

    _onMouseDown: function(e) {
        var buttonMap = { 0: 'left', 1: 'middle', 2: 'right' };
        var button = buttonMap[e.button];
        if (!button) return;

        this._mouseDownX = this._x;
        this._mouseDownY = this._y;
        this._isDragging = false;

        this._processClickDown(button);
    },

    _onMouseUp: function(e) {
        var buttonMap = { 0: 'left', 1: 'middle', 2: 'right' };
        var button = buttonMap[e.button];
        if (!button) return;

        this._processClickUp(button);

        if (this._isDragging && this._draggedElement) {
            this._endDrag();
        }
        this._isDragging = false;
        this._draggedElement = null;
        this._pendingUse = false;
    },

    //--------------------------------
    // Process Hover (visual only, no selection change)
    //--------------------------------

    _processHover: function() {
        if (!SceneManager || !SceneManager._scene) return;
        var scene = SceneManager._scene;

        var grid = scene._grid || scene._craftGrid;
        if (!grid) return;

        if (typeof grid.getSlotAt !== 'function') return;

        var slot = grid.getSlotAt(this._x, this._y);

        if (slot !== this._hoveredElement) {
            if (this._hoveredElement && this._hoveredElement._onMouseExit) {
                this._hoveredElement._onMouseExit();
            }
            this._hoveredElement = slot;
            if (this._hoveredElement && this._hoveredElement._onMouseEnter) {
                this._hoveredElement._onMouseEnter();
            }
        }
    },

    //--------------------------------
    // Process Click Down
    //--------------------------------

    _processClickDown: function(button) {
        if (!SceneManager || !SceneManager._scene) return;
        var scene = SceneManager._scene;

        var grid = scene._grid || scene._craftGrid;
        if (!grid) return;

        var slot = this._hoveredElement;
        if (!slot) return;

        this._pressedElement = slot;

        var index = grid._slots.indexOf(slot);
        if (index < 0) return;

        var currentSelected = grid.selectedIndex();

        if (button === 'left') {
            if (currentSelected === index) {
                this._pendingUse = true;
            } else {
                this._pendingUse = false;
                grid.setSelectedIndex(index);
                if (scene._controller && scene._controller.onSelectionChanged) {
                    scene._controller.onSelectionChanged();
                }
                this._draggedElement = slot;
                this._dragOffsetX = this._x - slot.x;
                this._dragOffsetY = this._y - slot.y;
                this._isDragging = false;
            }
        } else if (button === 'right') {
            this._pendingUse = false;
            grid.setSelectedIndex(index);
            if (scene._controller && scene._controller.onSelectionChanged) {
                scene._controller.onSelectionChanged();
            }
        } else {
            this._pendingUse = false;
            grid.setSelectedIndex(index);
            if (scene._controller && scene._controller.onSelectionChanged) {
                scene._controller.onSelectionChanged();
            }
        }

        if (slot._onMouseDown) {
            slot._onMouseDown(button, this._x, this._y);
        }
    },

    //--------------------------------
    // Process Click Up
    //--------------------------------

    _processClickUp: function(button) {
        if (!SceneManager || !SceneManager._scene) return;
        var scene = SceneManager._scene;

        var grid = scene._grid || scene._craftGrid;
        if (!grid) return;

        var slot = this._hoveredElement;

        var dx = this._x - this._mouseDownX;
        var dy = this._y - this._mouseDownY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this._clickThreshold && slot && slot === this._pressedElement) {
            if (button === 'left' && this._pendingUse) {
                this._handleUseItem(slot, grid);
                this._pendingUse = false;
            } else if (button === 'left') {
                if (scene._controller && scene._controller.onSelectionChanged) {
                    scene._controller.onSelectionChanged();
                }
            } else if (button === 'right') {
                if (scene._controller && scene._controller.onSelectionChanged) {
                    scene._controller.onSelectionChanged();
                }
            }
        }

        this._pressedElement = null;
        if (button === 'left' && this._pendingUse) {
            this._pendingUse = false;
        }
    },

    //--------------------------------
    // Handle Use Item
    //--------------------------------

    _handleUseItem: function(slot, grid) {
        var scene = SceneManager._scene;
        if (scene && scene._controller && scene._controller.onConfirm) {
            scene._controller.onConfirm();
        }
    },

    //--------------------------------
    // Drag
    //--------------------------------

    _processDrag: function() {
        var dx = this._x - this._mouseDownX;
        var dy = this._y - this._mouseDownY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this._clickThreshold && !this._isDragging) {
            this._isDragging = true;
            this._onDragStart();
        }

        if (this._isDragging && this._draggedElement) {
            this._onDragMove();
        }
    },

    _onDragStart: function() {
        if (this._draggedElement && this._draggedElement._onDragStart) {
            this._draggedElement._onDragStart(this._x, this._y);
        }
    },

    _onDragMove: function() {
        if (this._draggedElement && this._draggedElement._onDragMove) {
            this._draggedElement._onDragMove(this._x, this._y);
        }
    },

    _endDrag: function() {
        if (this._draggedElement && this._draggedElement._onDragEnd) {
            this._draggedElement._onDragEnd(this._x, this._y);
        }
    },

    //--------------------------------
    // Process Scroll (with description text priority)
    //--------------------------------

    _processScroll: function() {
        if (!SceneManager || !SceneManager._scene) return;
        var scene = SceneManager._scene;

        // Check if mouse is over the description text
        var descriptionText = this._getDescriptionText(scene);
        if (descriptionText && this._isOverDescription(descriptionText)) {
            // Scroll the description text
            var scrolled = this._scrollDescription(descriptionText, this._wheelDelta);
            if (scrolled) {
                this._wheelDelta = 0;
                return; // Description text handled the scroll
            }
            // If description can't scroll further, fall through to grid
        }

        // Scroll the grid
        var grid = scene._grid || scene._craftGrid;
        if (!grid || !grid._layout) return;

        var columns = grid._layout.columns;
        if (this._wheelDelta > 0) {
            for (var i = 0; i < columns; i++) {
                grid.moveDown();
            }
        } else if (this._wheelDelta < 0) {
            for (var j = 0; j < columns; j++) {
                grid.moveUp();
            }
        }

        if (scene._controller && scene._controller.onSelectionChanged) {
            scene._controller.onSelectionChanged();
        }

        this._wheelDelta = 0;
    },

    //--------------------------------
    // Helper: Get description text from scene
    //--------------------------------

    _getDescriptionText: function(scene) {
        // Try inventory showcase
        if (scene._showcase && scene._showcase._descriptionText) {
            return scene._showcase._descriptionText;
        }
        // Try synthesizer showcase
        if (scene._showcase && scene._showcase._descriptionText) {
            return scene._showcase._descriptionText;
        }
        return null;
    },

    //--------------------------------
    // Helper: Check if mouse is over description
    //--------------------------------

    _isOverDescription: function(descriptionText) {
        if (!descriptionText) return false;

        // Get the description text's world position
        var worldX = descriptionText.x;
        var worldY = descriptionText.y;
        var parent = descriptionText.parent;

        while (parent && parent !== SceneManager._scene) {
            worldX += parent.x || 0;
            worldY += parent.y || 0;
            parent = parent.parent;
        }

        var width = descriptionText._width || 288;
        var height = descriptionText._height || 160;

        return this._x >= worldX && this._x <= worldX + width &&
            this._y >= worldY && this._y <= worldY + height;
    },

    //--------------------------------
    // Helper: Scroll description text
    //--------------------------------

    _scrollDescription: function(descriptionText, delta) {
        if (!descriptionText || typeof descriptionText.scroll !== 'function') {
            return false;
        }

        var scrollAmount = delta * 20; // Scroll 20px per wheel tick
        descriptionText.scroll(scrollAmount);

        // Return true if the text can scroll (has content to scroll)
        return descriptionText.canScroll ? descriptionText.canScroll() : true;
    },

    //--------------------------------
    // Public API
    //--------------------------------

    x: function() { return this._x; },
    y: function() { return this._y; },
    position: function() { return { x: this._x, y: this._y }; },
    getHoveredElement: function() { return this._hoveredElement; },

    isTriggered: function(button) { return TouchInput.isTriggered(); },
    isPressed: function(button) { return TouchInput.isPressed(); },
    isReleased: function(button) { return TouchInput.isReleased(); },
    isRepeated: function(button) { return TouchInput.isRepeated(); },

    update: function() {
        if (this._isDragging && this._draggedElement) {
            this._processDrag();
        }
    }
};

// Auto-initialize
LOGICPULSE.Mouse.initialize();