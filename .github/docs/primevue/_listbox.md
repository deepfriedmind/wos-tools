---
url: https://primevue.org/listbox
scrapeDate: 2025-04-09T00:36:33.045Z
library: primevue

exactVersionMatch: false
---

## Listbox

Listbox is used to select one or more values from a list of items.

## Import [#](_listbox_.md#import)
```
import Listbox from 'primevue/listbox';
```
## Basic [#](_listbox_.md#basic)

Listbox is used with the _v-model_ property for two-way value binding along with the _options_ collection. Label and value of an option are defined with the _optionLabel_ and _optionValue_ properties respectively. Note that, when options are simple primitive values such as a string array, no _optionLabel_ and _optionValue_ would be necessary.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

No selected item
```
<Listbox v-model="selectedCity" :options="cities" optionLabel="name" class="w-full md:w-56" />
```
## Forms [#](_listbox_.md#forms)

Listbox integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

1 items selected
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <div class="flex flex-col gap-1">
        <Listbox name="city" :options="cities" optionLabel="name" fluid />
        <Message v-if="$form.city?.invalid" severity="error" size="small" variant="simple">{{ $form.city.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Checkmark [#](_listbox_.md#checkmark)

An alternative way to highlight the selected option is displaying a checkmark instead.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

No selected item
```
<Listbox v-model="selectedCity" :options="cities" optionLabel="name" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
```
## Multiple [#](_listbox_.md#multiple)

Listbox allows choosing a single item by default, enable _multiple_ property to choose more than one. When the optional _metaKeySelection_ is present, behavior is changed in a way that selecting a new item requires meta key to be present.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

No selected item
```
<Listbox v-model="selectedCity" :options="cities" multiple optionLabel="name" class="w-full md:w-56" />
```
## Group [#](_listbox_.md#group)

Options can be grouped when a nested data structures is provided. To define the label of a group _optionGroupLabel_ property is needed and also _optionGroupChildren_ is required to define the property that refers to the children of a group.
*   ![](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Germany
    
*   Berlin
*   Frankfurt
*   Hamburg
*   Munich
*   ![](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    USA
    
*   Chicago
*   Los Angeles
*   New York
*   San Francisco
*   ![](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Japan
    
*   Kyoto
*   Osaka
*   Tokyo
*   Yokohama

No selected item
```
<Listbox v-model="selectedCity" :options="groupedCities" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" class="w-full md:w-56" listStyle="max-height:250px">
    <template #optiongroup="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.label }}</div>
        </div>
    </template>
</Listbox>
```
## Filter [#](_listbox_.md#filter)

Listbox provides built-in filtering that is enabled by adding the _filter_ property.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

No selected item
```
<Listbox v-model="selectedCity" :options="cities" filter optionLabel="name" class="w-full md:w-56" />
```
## Template [#](_listbox_.md#template)

Custom content for an option is displayed with the _option_ slot that takes an option as a parameter. Additional available templating sections are _filter_ and _optionGroup_.
*   ![Australia](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Australia
    
*   ![Brazil](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Brazil
    
*   ![China](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    China
    
*   ![Egypt](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Egypt
    
*   ![France](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    France
    
*   ![Germany](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Germany
    
*   ![India](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    India
    
*   ![Japan](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Japan
    
*   ![Spain](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    Spain
    
*   ![United States](https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png)
    
    United States
    

No selected item
```
<Listbox v-model="selectedCountry" :options="countries" optionLabel="name" class="w-full md:w-56" listStyle="max-height:250px">
    <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
</Listbox>
```
## Virtual Scroll [#](_listbox_.md#virtualscroll)

VirtualScroller is used to render a long list of options efficiently like 100K records in this demo. The configuration is done with _virtualScrollerOptions_ property, refer to the [VirtualScroller](_virtualscroller.md) for more information about the available options as it is used internally by Listbox.
```
<Listbox v-model="selectedItem" :options="items" optionLabel="label" optionValue="value"
    :virtualScrollerOptions="{ itemSize: 38 }" class="w-full md:w-56" listStyle="height:250px" striped />
```
## Invalid [#](_listbox_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

No selected item
```
<Listbox v-model="selectedCity" :options="cities" optionLabel="name" :invalid="selectedCity === null"  class="w-full md:w-56" />
```
## Disabled [#](_listbox_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
*   New York
*   Rome
*   London
*   Istanbul
*   Paris

No selected item
```
<Listbox v-model="selectedCity" disabled :options="cities" optionLabel="name" class="w-full md:w-56" />
```
## Accessibility [#](_listbox_.md#accessibility)

### Screen Reader

Value to describe the component can be provided _aria-labelledby_ or _aria-label_ props. The list element has a _listbox_ role with the _aria-multiselectable_ attribute that sets to true when multiple selection is enabled. Each list item has an _option_ role with _aria-selected_ and _aria-disabled_ as their attributes.

If filtering is enabled, _filterInputProps_ can be defined to give _aria-\*_ props to the input element. Alternatively _filterPlaceholder_ is usually utilized by the screen readers as well.
```
<span id="lb"></span>Options</span>
<Listbox aria-labelledby="lb" />
<Listbox aria-label="City" />
```
### Keyboard Support

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

Selects the focused options and all the options down to the last one.

_control_ + _a_

Selects all options.

_pageUp_

Jumps visual focus to first option.

_pageDown_

Jumps visual focus to last option.

_any printable character_

Moves focus to the option whose label starts with the characters being typed.

### Filter Input Keyboard Support

Key

Function

_down arrow_

Moves focus to the next option, if there is none then visual focus does not change.

_up arrow_

Moves focus to the previous option, if there is none then visual focus does not change.

_left arrow_

Removes the visual focus from the current option and moves input cursor to one character left.

_right arrow_

Removes the visual focus from the current option and moves input cursor to one character right.

_home_

Moves input cursor at the end, if not then moves focus to the first option.

_end_

Moves input cursor at the beginning, if not then moves focus to the last option.

_enter_

Closes the popup and moves focus to the multiselect element.

_escape_

Closes the popup and moves focus to the multiselect element.

_tab_

Moves focus to the next focusable element in the component. If there is none, moves focus to next element in page.