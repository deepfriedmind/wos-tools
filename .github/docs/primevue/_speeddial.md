---
url: https://primevue.org/speeddial
scrapeDate: 2025-04-09T00:36:41.041Z
library: primevue

exactVersionMatch: false
---

## Speed Dial

When pressed, a floating action button can display multiple primary actions that can be performed on a page.

## Import [#](_speeddial_.md#import)
```
import SpeedDial from 'primevue/speeddial';
```
## Linear [#](_speeddial_.md#linear)

SpeedDial items are defined with the _model_ property based on MenuModel API. Default orientation of the items is linear and _direction_ property is used to define the position of the items related to the button.
```
<SpeedDial :model="items" direction="up" style="position: absolute; left: calc(50% - 2rem); bottom: 0" />
<SpeedDial :model="items" direction="down" style="position: absolute; left: calc(50% - 2rem); top: 0" />
<SpeedDial :model="items" direction="left" style="position: absolute; top: calc(50% - 2rem); right: 0" />
<SpeedDial :model="items" direction="right" style="position: absolute; top: calc(50% - 2rem); left: 0" />
```
## Circle [#](_speeddial_.md#circle)

Items can be displayed around the button when _type_ is set to _circle_. Additional _radius_ property defines the radius of the circle.
```
<SpeedDial :model="items" :radius="80" type="circle" :style="{ position: 'absolute' }" :buttonProps="{ severity: 'warn', rounded: true }" />
```
## Semi Circle [#](_speeddial_.md#semi-circle)

When _type_ is defined as _semi-circle_, items are displayed in a half-circle around the button.
```
<SpeedDial :model="items" :radius="80" type="semi-circle" direction="up" style="position: absolute; left: calc(50% - 2rem); bottom: 0" />
<SpeedDial :model="items" :radius="80" type="semi-circle" direction="down" style="position: absolute; left: calc(50% - 2rem); top: 0" />
<SpeedDial :model="items" :radius="80" type="semi-circle" direction="left" style="position: absolute; top: calc(50% - 2rem); right: 0" />
<SpeedDial :model="items" :radius="80" type="semi-circle" direction="right" style="position: absolute; top: calc(50% - 2rem); left: 0" />
```
## Quarter Circle [#](_speeddial_.md#quarter-circle)

Setting _type_ as _quarter-circle_ displays the items at one of four corners of a button based on the _direction_.
```
<SpeedDial :model="items" :radius="120" type="quarter-circle" direction="up-left" :style="{ position: 'absolute', right: 0, bottom: 0 }" />
<SpeedDial :model="items" :radius="120" type="quarter-circle" direction="up-right" :style="{ position: 'absolute', left: 0, bottom: 0 }" />
<SpeedDial :model="items" :radius="120" type="quarter-circle" direction="down-left" :style="{ position: 'absolute', right: 0, top: 0 }" />
<SpeedDial :model="items" :radius="120" type="quarter-circle" direction="down-right" :style="{ position: 'absolute', left: 0, top: 0 }" />
```
## Tooltip [#](_speeddial_.md#tooltip)

Items display a tooltip on hover when a standalone [Tooltip](_tooltip_.md) is present with a target that matches the items.
```
<SpeedDial :model="items" direction="up" :style="{ position: 'absolute', right: 0, bottom: 0 }" :buttonProps="{ severity: 'help', rounded: true }" :tooltipOptions="{ position: 'left' }" />
<SpeedDial :model="items" direction="up" :style="{ position: 'absolute', left: 0, bottom: 0 }" :buttonProps="{ severity: 'danger', rounded: true }" :tooltipOptions="{ position: 'right' }" />
```
## Mask [#](_speeddial_.md#mask)

Adding _mask_ property displays a modal layer behind the popup items.
```
<SpeedDial :model="items" direction="up" mask :style="{ position: 'absolute', right: '1rem', bottom: '1rem' }" />
```
## Template [#](_speeddial_.md#template)

SpeedDial offers item customization with the _item_ template that receives the menuitem instance from the model as a parameter. The button has its own _button_ template, additional slot named _icon_ is provided to embed icon content for default button.
```
<SpeedDial :model="items" direction="up" :transitionDelay="80" :style="{ position: 'absolute' }" pt:menuitem="m-2">
    <template #button="{ toggleCallback }">
        <Button outlined class="border" @click="toggleCallback">
            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="..." fill="var(--p-primary-color)" />
                <path d="..." fill="var(--p-text-color)" />
            </svg>
        </Button>
    </template>
    <template #item="{ item, toggleCallback }">
        <div class="flex flex-col items-center justify-between gap-2 p-2 border rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer" @click="toggleCallback">
            <span :class="item.icon" />
            <span>
                {{ item.label }}
            </span>
        </div>
    </template>
</SpeedDial>
```
## Accessibility [#](_speeddial_.md#accessibility)

### Screen Reader

SpeedDial component renders a native button element that implicitly includes any passed prop. Text to describe the button can be defined with the _aria-labelledby_ or _aria-label_ props. Addititonally the button includes includes _aria-haspopup_, _aria-expanded_ for states along with _aria-controls_ to define the relation between the popup and the button.

The popup overlay uses _menu_ role on the list and each action item has a _menuitem_ role with an _aria-label_ as the menuitem label. The id of the menu refers to the _aria-controls_ of the button.
```
<SpeedDial aria-label="Options" />
```
### Menu Button Keyboard Support

Key

Function

_enter_

Toggles the visibility of the menu.

_space_

Toggles the visibility of the menu.

_down arrow_

Opens the menu and moves focus to the first item.

_up arrow_

Opens the menu and moves focus to the last item.

_right arrow_

Opens the menu and moves focus to the last item.

_left arrow_

Opens the menu and moves focus to the first item.

_escape_

Closes the menu.

### Menu Keyboard Support

Key

Function

_enter_

Actives the menuitem, closes the menu and sets focus on the menu button.

_space_

Actives the menuitem, closes the menu and sets focus on the menu button.

_escape_

Closes the menu and sets focus on the menu button.

_arrow keys_

Navigates between the menu items.

_home_

Moves focus to the first item.

_end_

Moves focus to the last item.