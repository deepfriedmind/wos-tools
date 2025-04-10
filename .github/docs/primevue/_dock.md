---
url: https://primevue.org/dock
scrapeDate: 2025-04-09T00:36:51.618Z
library: primevue

exactVersionMatch: false
---

## Dock

Dock is a navigation component consisting of menuitems.

## Import [#](_dock_.md#import)
```
import Dock from 'primevue/dock';
```
## Basic [#](_dock_.md#basic)

Menu requires a collection of menuitems as its _model_ and an _icon_ template. Default location is _bottom_ and other edges are also available when defined with the _position_ property.
```
<Dock :model="items" :position="position">
    <template #itemicon="{ item }">
        <img v-tooltip.top="item.label" :alt="item.label" :src="item.icon" style="width: 100%" />
    </template>
</Dock>
```
## Advanced [#](_dock_.md#advance)

A sample desktop demo using various components.
```
<Dock :model="items">
    <template #item="{ item }">
        <a v-tooltip.top="item.label" href="#" class="p-dock-item-link" @click="onDockItemClick($event, item)">
            <img :alt="item.label" :src="item.icon" style="width: 100%" />
        </a>
    </template>
</Dock>
```
## Accessibility [#](_dock_.md#accessibility)

### Screen Reader

Dock component uses the _menu_ role with the _aria-orientation_ and the value to describe the menu can either be provided with _aria-labelledby_ or _aria-label_ props. Each list item has a _menuitem_ role with _aria-label_ referring to the label of the item and _aria-disabled_ defined if the item is disabled.

### Keyboard Support

Key

Function

_tab_

Moves focus to the first menuitem.

_enter_

Activates the focused menuitem.

_space_

Activates the focused menuitem.

_down arrow_

Moves focus to the next menuitem in vertical layout.

_up arrow_

Moves focus to the previous menuitem in vertical layout.

_right arrow_

Moves focus to the next menuitem in horizontal layout.

_left arrow_

Moves focus to the previous menuitem in horizontal layout.

_home_

Moves focus to the first menuitem.

_end_

Moves focus to the last menuitem.