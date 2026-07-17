/*:
 * @target MZ
 * @plugindesc Modern Cyberpunk Inventory UI with full mouse support and crafting.
 * @author LOGICPULSE
 * @version 1.0.0
 *
 * @command OpenInventory
 * @text Open Inventory
 * @desc Opens the LOGICPULSE Inventory Scene.
 *
 * @command OpenSynthesizer
 * @text Open Synthesizer
 * @desc Opens the LOGICPULSE Synthesizer Scene.
 *
 * ============================================================================
 * PARAMETERS – INVENTORY
 * ============================================================================
 *
 * @param // SIDEBAR PARAMETERS
 *
 * @param SidebarTabX
 * @text Sidebar Tab X
 * @desc X position of the sidebar tabs.
 * @type number
 * @default 4
 *
 * @param SidebarTabY
 * @text Sidebar Tab Y
 * @desc Y position of the first sidebar tab.
 * @type number
 * @default 130
 *
 * @param SidebarTabSpacing
 * @text Sidebar Tab Spacing
 * @desc Vertical spacing between sidebar tabs.
 * @type number
 * @default 52
 *
 * @param SidebarTabWidth
 * @text Sidebar Tab Width
 * @desc Width of each sidebar tab.
 * @type number
 * @default 44
 *
 * @param SidebarTabHeight
 * @text Sidebar Tab Height
 * @desc Height of each sidebar tab.
 * @type number
 * @default 44
 *
 * @param // Inventory Grid
 *
 * @param InventoryGridX
 * @text Inventory Grid X
 * @desc X position of the inventory grid.
 * @type number
 * @default 82
 *
 * @param InventoryGridY
 * @text Inventory Grid Y
 * @desc Y position of the inventory grid.
 * @type number
 * @default 118
 *
 * @param InventoryGridWidth
 * @text Inventory Grid Width
 * @desc Width of the inventory grid.
 * @type number
 * @default 768
 *
 * @param InventoryGridHeight
 * @text Inventory Grid Height
 * @desc Height of the inventory grid.
 * @type number
 * @default 576
 *
 * @param InventoryColumns
 * @text Inventory Columns
 * @desc Number of columns in the inventory grid.
 * @type number
 * @min 4
 * @max 12
 * @default 8
 *
 * @param InventorySpacingX
 * @text Inventory Spacing X
 * @desc Horizontal spacing between inventory slots.
 * @type number
 * @default 96
 *
 * @param InventorySpacingY
 * @text Inventory Spacing Y
 * @desc Vertical spacing between inventory slots.
 * @type number
 * @default 96
 *
 * @param InventoryItemSize
 * @text Inventory Item Size
 * @desc Size of each inventory slot (hit detection).
 * @type number
 * @default 92
 *
 * @param // Inventory Showcase
 *
 * @param InventoryShowX
 * @text Inventory Showcase X
 * @desc X position of the inventory showcase frame.
 * @type number
 * @default 912
 *
 * @param InventoryShowY
 * @text Inventory Showcase Y
 * @desc Y position of the inventory showcase frame.
 * @type number
 * @default 144
 *
 * @param InventoryShowWidth
 * @text Inventory Showcase Width
 * @desc Width of the inventory showcase frame.
 * @type number
 * @default 288
 *
 * @param InventoryShowHeight
 * @text Inventory Showcase Height
 * @desc Height of the inventory showcase frame.
 * @type number
 * @default 288
 *
 *
 * @param InventoryUseX
 * @text Inventory Use Button X
 * @desc X position of the Use button.
 * @type number
 * @default 912
 *
 * @param InventoryUseY
 * @text Inventory Use Button Y
 * @desc Y position of the Use button.
 * @type number
 * @default 640
 *
 * @param InventoryUseWidth
 * @text Inventory Use Button Width
 * @desc Width of the Use button.
 * @type number
 * @default 288
 *
 * @param InventoryUseHeight
 * @text Inventory Use Button Height
 * @desc Height of the Use button.
 * @type number
 * @default 48
 *
 *
 * @param InventoryDescFontSize
 * @text Inventory Description Font Size
 * @desc Font size for the inventory description text.
 * @type number
 * @min 12
 * @max 28
 * @default 20
 *
 *
 * @param // Synthesizer Grid side
 *
 *
 * @param SynthesizerGridX
 * @text Synthesizer Grid X
 * @desc X position of the synthesizer grid.
 * @type number
 * @default 96
 *
 * @param SynthesizerGridY
 * @text Synthesizer Grid Y
 * @desc Y position of the synthesizer grid.
 * @type number
 * @default 192
 *
 * @param SynthesizerGridWidth
 * @text Synthesizer Grid Width
 * @desc Width of the synthesizer grid.
 * @type number
 * @default 384
 *
 * @param SynthesizerGridHeight
 * @text Synthesizer Grid Height
 * @desc Height of the synthesizer grid.
 * @type number
 * @default 480
 *
 * @param SynthesizerColumns
 * @text Synthesizer Columns
 * @desc Number of columns in the synthesizer grid.
 * @type number
 * @min 2
 * @max 8
 * @default 4
 *
 * @param SynthesizerSpacingX
 * @text Synthesizer Spacing X
 * @desc Horizontal spacing between synthesizer slots.
 * @type number
 * @default 96
 *
 * @param SynthesizerSpacingY
 * @text Synthesizer Spacing Y
 * @desc Vertical spacing between synthesizer slots.
 * @type number
 * @default 96
 *
 * @param SynthesizerItemSize
 * @text Synthesizer Item Size
 * @desc Size of each synthesizer slot (hit detection).
 * @type number
 * @default 92
 *
 * @param // Synthesizer Crafting side
 *
 * @param SynthesizerShowX
 * @text Synthesizer Showcase X
 * @desc X position of the synthesizer showcase frame.
 * @type number
 * @default 720
 *
 * @param SynthesizerShowY
 * @text Synthesizer Showcase Y
 * @desc Y position of the synthesizer showcase frame.
 * @type number
 * @default 168
 *
 * @param SynthesizerShowWidth
 * @text Synthesizer Showcase Width
 * @desc Width of the synthesizer showcase frame.
 * @type number
 * @default 288
 *
 * @param SynthesizerShowHeight
 * @text Synthesizer Showcase Height
 * @desc Height of the synthesizer showcase frame.
 * @type number
 * @default 288
 *
 *
 * @param SynthesizerDescX
 * @text Synthesizer Description X
 * @desc X position of the synthesizer description.
 * @type number
 * @default 528
 *
 * @param SynthesizerDescY
 * @text Synthesizer Description Y
 * @desc Y position of the synthesizer description.
 * @type number
 * @default 168
 *
 * @param SynthesizerDescWidth
 * @text Synthesizer Description Width
 * @desc Width of the synthesizer description.
 * @type number
 * @default 180
 *
 * @param SynthesizerDescHeight
 * @text Synthesizer Description Height
 * @desc Height of the synthesizer description.
 * @type number
 * @default 300
 *
 * @param SynthesizerDescFontSize
 * @text Synthesizer Description Font Size
 * @desc Font size for the synthesizer description.
 * @type number
 * @min 12
 * @max 28
 * @default 16
 *
 *
 * @param SynthesizerTipX
 * @text Synthesizer Tip X
 * @desc X position of the Tip image.
 * @type number
 * @default 1032
 *
 * @param SynthesizerTipY
 * @text Synthesizer Tip Y
 * @desc Y position of the Tip image.
 * @type number
 * @default 145
 *
 *
 * @param SynthesizerDecreaseX
 * @text Decrease Arrow X
 * @desc X position of the Decrease arrow.
 * @type number
 * @default 768
 *
 * @param SynthesizerDecreaseY
 * @text Decrease Arrow Y
 * @desc Y position of the Decrease arrow.
 * @type number
 * @default 600
 *
 * @param SynthesizerDecreaseWidth
 * @text Decrease Arrow Width
 * @desc Width of the Decrease arrow.
 * @type number
 * @default 27
 *
 * @param SynthesizerDecreaseHeight
 * @text Decrease Arrow Height
 * @desc Height of the Decrease arrow.
 * @type number
 * @default 27
 *
 * @param SynthesizerIncreaseX
 * @text Increase Arrow X
 * @desc X position of the Increase arrow.
 * @type number
 * @default 930
 *
 * @param SynthesizerIncreaseY
 * @text Increase Arrow Y
 * @desc Y position of the Increase arrow.
 * @type number
 * @default 600
 *
 * @param SynthesizerIncreaseWidth
 * @text Increase Arrow Width
 * @desc Width of the Increase arrow.
 * @type number
 * @default 27
 *
 * @param SynthesizerIncreaseHeight
 * @text Increase Arrow Height
 * @desc Height of the Increase arrow.
 * @type number
 * @default 27
 *
 *
 * @param SynthesizerCurrentX
 * @text Crafting Number X
 * @desc X position of the current quantity number.
 * @type number
 * @default 822
 *
 * @param SynthesizerCurrentY
 * @text Crafting Number Y
 * @desc Y position of the current quantity number.
 * @type number
 * @default 598
 *
 * @param SynthesizerCurrentWidth
 * @text Crafting Number Width
 * @desc Width of the current quantity number.
 * @type number
 * @default 80
 *
 * @param SynthesizerCurrentHeight
 * @text Crafting Number Height
 * @desc Height of the current quantity number.
 * @type number
 * @default 32
 *
 * @param SynthesizerCurrentFontSize
 * @text Crafting Number Font Size
 * @desc Font size of the current quantity number.
 * @type number
 * @default 28
 *
 * @param SynthesizerMaxX
 * @text Max Available Crafting Number X
 * @desc X position of the max quantity number.
 * @type number
 * @default 686
 *
 * @param SynthesizerMaxY
 * @text Max Available Crafting Number Y
 * @desc Y position of the max quantity number.
 * @type number
 * @default 194
 *
 * @param SynthesizerMaxWidth
 * @text Max Available Crafting Number Width
 * @desc Width of the max quantity number.
 * @type number
 * @default 80
 *
 * @param SynthesizerMaxHeight
 * @text Max Available Crafting Number Height
 * @desc Height of the max quantity number.
 * @type number
 * @default 32
 *
 * @param SynthesizerMaxFontSize
 * @text Max Available Crafting Number Font Size
 * @desc Font size of the max quantity number.
 * @type number
 * @default 20
 *
 *
 * @param SynthesizerCraftX
 * @text Synthesizer Crafting Button X
 * @desc X position of the Craft button.
 * @type number
 * @default 790
 *
 * @param SynthesizerCraftY
 * @text Synthesizer Crafting Button Y
 * @desc Y position of the Craft button.
 * @type number
 * @default 650
 *
 * @param SynthesizerCraftWidth
 * @text Synthesizer Crafting Button Width
 * @desc Width of the Craft button.
 * @type number
 * @default 160
 *
 * @param SynthesizerCraftHeight
 * @text Synthesizer Crafting Button Height
 * @desc Height of the Craft button.
 * @type number
 * @default 30
 *
 * @param // Recipe Panel
 *
 * @param RecipeFirstX
 * @text Recipe First Slot X
 * @desc X position of the first recipe ingredient slot.
 * @type number
 * @default 672
 *
 * @param RecipeFirstY
 * @text Recipe First Slot Y
 * @desc Y position of the first recipe ingredient slot.
 * @type number
 * @default 480
 *
 * @param RecipeSpacing
 * @text Recipe Slot Spacing
 * @desc Spacing between recipe ingredient slots.
 * @type number
 * @default 96
 *


 * @help
 * ============================================================================
 * LOGICPULSE Interactive MZ Inventory UI v1.0.0
 * ============================================================================
 *
 * A fully mouse-driven inventory and crafting system for RPG Maker MZ.
 *
 * ---------------------------------------------------------------------------
 * FEATURES
 * ---------------------------------------------------------------------------
 * • Complete mouse interaction (hover, click, double-click, drag, scroll)
 * • Two scenes: Inventory (browse/use) and Synthesizer (craft items)
 * • Category sidebar: Consumables, Materials, Key Items, Synthesizer
 * • Item showcase with name, description, and Use button
 * • Recipe system via item notes (<Recipe>...</Recipe>)
 * • Quantity control for crafting (arrows + keyboard)
 * • Rarity system with custom backgrounds
 * • Keyboard shortcuts: Arrows, Enter, Escape, Tab/Shift+Tab
 *
 * ---------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ---------------------------------------------------------------------------
 * OpenInventory
 *   Opens the inventory scene.
 *
 * OpenSynthesizer
 *   Opens the synthesizer scene.
 *
 * Example:
 *   Plugin Command: OpenInventory
 *
 * ---------------------------------------------------------------------------
 * RECIPE SETUP (Item Notes)
 * ---------------------------------------------------------------------------
 * Add the following to any item's note field:
 *
 *   <Recipe>
 *     itemId:amount
 *     itemId:amount
 *   </Recipe>
 *
 * Example:
 *   <Recipe>
 *     10:2
 *     15:1
 *   </Recipe>
 *   Means: Requires 2 of item ID 10 and 1 of item ID 15 to craft.
 *
 * Optional rarity:
 *   <rarity:1>   // Common (default)
 *   <rarity:2>   // Rare
 *   <rarity:3>   // Legendary
 *
 * Legendary craftable item:
 *   <rarity:3>
 *   <Recipe>
 *     10:2
 *     15:1
 *   </Recipe>
 *
 * ---------------------------------------------------------------------------
 * KEYBOARD SHORTCUTS
 * ---------------------------------------------------------------------------
 * Scene           | Keys
 * ----------------|-----------------------------------------------
 * Inventory       | Arrow keys        - Navigate grid
 *                 | Enter/OK          - Use selected item
 *                 | Escape/Cancel     - Close scene
 *                 | Tab               - Next category
 *                 | Shift+Tab         - Previous category
 * Synthesizer     | Arrow keys        - Navigate grid
 *                 | Enter/OK          - Enter craft mode / Craft
 *                 | Escape/Cancel     - Leave craft mode / Close scene
 *                 | Tab               - Switch to Inventory
 * Craft Quantity  | Left/Right arrows - Adjust quantity
 *                 | Shift+Left/Right  - Set to max/min
 *                 | Ctrl+Left/Right   - +10/-10
 *
 * ---------------------------------------------------------------------------
 * MOUSE CONTROLS
 * ---------------------------------------------------------------------------
 * • Hover over any item → Visual highlight (no selection change)
 * • Click an item → Selects it, updates showcase
 * • Double-click an item → Uses it (Inventory) or enters craft mode (Synthesizer)
 * • Scroll wheel over grid → Scrolls the grid
 * • Scroll wheel over description → Scrolls description text
 * • Click on category tabs → Switch categories
 * • Click on Use button → Uses the selected item
 * • Click on Craft button → Crafts the selected item (in craft mode)
 * • Click on +/- arrows → Adjust craft quantity
 * • Drag items → Rearrange inventory (if enabled)
 *
 * ---------------------------------------------------------------------------
 * FOLDER STRUCTURE (for custom assets)
 * ---------------------------------------------------------------------------
 * Place your custom images in:
 *   img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/
 *   img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Sidebar/
 *   img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Items/
 *   img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Items_Show_Case/
 *   img/LOGICPULSE_INTERACTIVE UI/INVENTORY_UI/Synthesizer/
 *
 * Required image naming:
 *   Items: Item_<iconIndex>.png (e.g., Item_1.png)
 *   Showcase: Item_<iconIndex>.png
 *   Sidebar: Sidebar Consumable Tab Idle.png, etc.
 *   Synthesizer: Background.png, Synthesize Button Idle.png, etc.
 *
 * ---------------------------------------------------------------------------
 * TROUBLESHOOTING
 * ---------------------------------------------------------------------------
 * Q: Items aren't showing up in the grid.
 * A: Make sure the party actually has items in their inventory.
 *
 * Q: Recipes aren't working.
 * A: Check that the <Recipe> tags are correctly formatted and the item IDs exist.
 *
 * Q: Mouse isn't working.
 * A: Make sure the plugin is enabled and that you're using RPG Maker MZ (not MV).
 *
 * Q: The Use button isn't showing.
 * A: Only consumable items (itypeId: 1) with occasion ≠ 3 show the Use button.
 *
 * ---------------------------------------------------------------------------
 * TERMS OF USE
 * ---------------------------------------------------------------------------
 * MIT License – free for personal and commercial use.
 * Credit is required.
 *
 * ============================================================================
 */

//=============================================================================
// Header - Plugin Metadata
//=============================================================================