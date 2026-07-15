# LOGICPULSE Interactive MZ Inventory UI
👤 Author
LOGICPULSE INTERACTIVE

A modern, fully interactive inventory and synthesis system for **RPG Maker MZ**.

--------------------------------------------------------------------------------------

This plugin is open‑source and available under the MIT License.

For support or feature requests, please open an issue on GitHub.

--------------------------------------------------------------------------------------

## ✨ Features

- **Mouse & Keyboard Support** – Full mouse control (hover, click, scroll, drag‑and‑drop) plus keyboard shortcuts (arrows, Enter, Tab, Escape).
- **Two Scenes** – Inventory (browse/use items) and Synthesizer (craft new items from recipes).
- **Category Sidebar** – Switch between Consumables, Materials, Key Items, and Synthesizer with animated tabs.
- **Item Showcase** – Displays selected item’s name, description, and a “Use” button (for consumables).
- **Recipe System** – Define recipes in item notes via `<Recipe>...</Recipe>` tags.
- **Quantity Control** – Adjust craft amount with arrows or keyboard (Shift for max, Skip for +10).
- **Dynamic Grid** – Items are displayed with rarity colors, amounts, and smooth scrolling.
- **Drag & Drop** – Reorganise items in the inventory grid (optional).
- **Synthesizer** – Double‑click a craftable item to enter craft mode, adjust quantity, and craft.

----------------------------------------------------------------------------------------

How To Work With this Plugin 

### Changing Rarity

Add the following note to any item in the RPG Maker database:
<rarity:1> // Uses Common Background Box
<rarity:2> // Uses Rare Background Box
<rarity:3> // Uses Legendary Background Box

### Adding a New Recipe

Add the following note to any item in the RPG Maker database:
<Recipe> itemId:amount itemId:amount ... </Recipe> ```
e.g.

<Recipe>
10:2
15:1
</Recipe>

This means the item requires 2 of item ID 10 and 1 of item ID 15 to craft.

Example of a Legendery Crafteble Item:

<rarity:3>
<Recipe>
10:2
15:1
</Recipe>

------------------------------------------------------------------

## 📦 Installation

1. Download the latest release `.js` file.
2. Place it in your project’s `js/plugins/` folder.
3. In RPG Maker MZ, open the **Plugin Manager** and add the plugin.
4. Use the plugin command `OpenInventory` to launch the inventory scene (e.g., from a menu or event).

------------------------------------------------------------------

## 🛠 Development / Editing

If you want to modify the plugin, the source code is organised in the `src/` folder.

### File Structure
src/

├── Version.js – Plugin name and version.

├── Constants.js – Item categories.

├── managers/

│ ├── LPAssets.js – Image loading and caching.

│ ├── LPLayout.js – UI layout coordinates (positions, sizes).

│ ├── LPInput.js – Keyboard input wrapper.

│ ├── LPBindings.js – Key mappings for navigation.

│ ├── LPMouse.js – Mouse input handler (TouchInput based).

│ ├── LPInventoryProvider.js – Manages item data from party inventory.

│ ├── LPInventoryController.js – Controls inventory scene logic (navigation, use).

│ ├── LPSynthesizerController.js – Controls synthesizer scene logic (craft, quantity).

│ ├── LPGamePartyHooks.js – Hooks to auto‑refresh inventory on item changes.

│ ├── LPRecipeManager.js – Parses and caches recipes from item notes.

│ ├── LPCraftManager.js – Executes crafting (material removal, item gain).

│ └── LPAnimator.js – UI animations (pulse, bitmap swap).

├── ui/

│ ├── LPUIElement.js – Base class for all UI elements.

│ ├── LPText.js – Multi‑line text with word wrap.

│ ├── LPScrollText.js – Scrollable text block.

│ ├── LPGridSlot.js – Individual inventory slot (item, amount, hover).

│ ├── LPGrid.js – Inventory grid (layout, selection, scroll).

│ ├── LPSynthesizerGridSlot.js – Synthesizer slot with craft state.

│ ├── LPSynthesizerGrid.js – Synthesizer grid (uses different item provider).

│ ├── LPSidebar.js – Sidebar with category tabs (mouse & keyboard).

│ ├── LPShowcase.js – Item showcase (name, description, Use button).

│ ├── LPSynthesizerShowcase.js – Synthesizer showcase (item preview, tip).

│ ├── LPRecipePanel.js – Displays recipe ingredients.

│ ├── LPQuantityController.js – Quantity arrows and number display.

│ └── LPCraftButton.js – Craft button (hover, click, animation).

├── scenes/

│ ├── LPSceneInventory.js – The inventory scene.

│ └── LPSceneSynthesizer.js – The synthesizer scene.

└── Main.js – Plugin entry point (registers command).


### How to Edit

1. Make changes to any `.js` file inside `src/`.
2. Run the **build script** (e.g., `npm run build` or your custom bundler) to generate the final plugin file.
3. Replace the plugin in your RPG Maker project with the newly built `.js` file.

> **Note:** The build process concatenates all `src` files in the order defined in your build configuration (e.g., `build.js` or similar). Do not edit the final bundled file directly.





