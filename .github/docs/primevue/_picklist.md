---
url: https://primevue.org/picklist
scrapeDate: 2025-04-09T00:36:40.910Z
library: primevue

exactVersionMatch: false
---

## PickList

PickList is used to reorder items between different lists.

## Import [#](_picklist_.md#import)
```
import PickList from 'primevue/picklist';
```
## Basic [#](_picklist_.md#basic)

PickList requires a multidimensional array as its value bound with the _v-model_ directive and a template for its content that gets the _option_ instance and the index via slotProps.
*   No available options

No available optionsNo selected item
*   No available options

No available optionsNo selected item
```
<PickList v-model="products" dataKey="id" breakpoint="1400px">
    <template #option="{ option  }">
        {{ option.name }}
    </template>
</PickList>
```
## Template [#](_picklist_.md#template)

For custom content support define an _option_ template that gets the item instance as a parameter. In addition _sourceheader_ and _targetheader_ slots are provided for further customization.
*   No available options

No available optionsNo selected item
*   No available options

No available optionsNo selected item
```
<PickList v-model="products" dataKey="id" breakpoint="1400px" scrollHeight="20rem>
    <template #option="{ option , selected }">
        <div class="flex flex-wrap p-1 items-center gap-4 w-full">
            <img class="w-12 shrink-0 rounded" :src="'https://primefaces.org/cdn/primevue/images/product/' + option.image" :alt="option.name" />
            <div class="flex-1 flex flex-col">
                <span class="font-medium text-sm">{{ option.name }}</span>
                <span :class="['text-sm', { 'text-surface-500 dark:text-surface-400': !selected, 'text-inherit': selected }]">{{ option.category }}</span>
            </div>
            <span class="font-bold">${{ option.price }}</span>
        </div>
    </template>
</PickList>
```
## Accessibility [#](_picklist_.md#accessibility)

### Screen Reader

Value to describe the source listbox and target listbox can be provided with _sourceListProps_ and _targetListProps_ by passing _aria-labelledby_ or _aria-label_ props. The list elements has a _listbox_ role with the _aria-multiselectable_ attribute. Each list item has an _option_ role with _aria-selected_ as their attributes.

Controls buttons are _button_ elements with an _aria-label_ that refers to the _aria.moveTop_, _aria.moveUp_, _aria.moveDown_, _aria.moveBottom_,_aria.moveToTarget_, _aria.moveAllToTarget_, _aria.moveToSource_ and _aria.moveAllToSource_ properties of the [locale](_configuration_.md#locale) API by default, alternatively you may use _moveTopButtonProps_, _moveUpButtonProps_, _moveDownButtonProps_, _moveToButtonProps_, _moveAllToButtonProps_, _moveFromButtonProps_, _moveFromButtonProps_ _moveAllFromButtonProps_ _moveToTargetProps_, _moveAllToTargetProps_, _moveToSourceProps_ and _moveAllToSourceProps_ to customize the buttons like overriding the default _aria-label_ attributes.
```
<span id="lb">Options</span>
<PickList aria-labelledby="lb" />
<PickList aria-label="City" />
```
### ListBox Keyboard Support

Key

Function

_tab_

Moves focus to the first selected option, if there is none then first option receives the focus.

_up arrow_

Moves focus to the previous option.

_down arrow_

Moves focus to the next option.

_enter_

Toggles the selected state of the focused option.

_space_

Toggles the selected state of the focused option.

_home_

Moves focus to the first option.

_end_

Moves focus to the last option.

_shift_ + _down arrow_

Moves focus to the next option and toggles the selection state.

_shift_ + _up arrow_

Moves focus to the previous option and toggles the selection state.

_shift_ + _space_

Selects the items between the most recently selected option and the focused option.

_control_ + _shift_ + _home_

Selects the focused options and all the options up to the first one.

_control_ + _shift_ + _end_

Selects the focused options and all the options down to the first one.

_control_ + _a_

Selects all options.

### Buttons Keyboard Support

Key

Function

_enter_

Executes button action.

_space_

Executes button action.