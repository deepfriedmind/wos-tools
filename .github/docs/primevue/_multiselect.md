---
url: https://primevue.org/multiselect
scrapeDate: 2025-04-09T00:36:42.238Z
library: primevue

exactVersionMatch: false
---

## MultiSelect

MultiSelect is used to select multiple items from a collection.

## Import [#](_multiselect_.md#import)
```
import MultiSelect from 'primevue/multiselect';
```
## Basic [#](_multiselect_.md#basic)

MultiSelect is used with the _v-model_ property for two-way value binding along with the _options_ collection. Label and value of an option are defined with the _optionLabel_ and _optionValue_ properties respectively. Note that, when options are simple primitive values such as a string array, no _optionLabel_ and _optionValue_ would be necessary.
```
<MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" filter placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-80" />
```
## Forms [#](_multiselect_.md#forms)
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-1">
        <MultiSelect name="city" :options="cities" optionLabel="name" filter placeholder="Select Cities" :maxSelectedLabels="3" class="w-full md:w-80" />
        <Message v-if="$form.city?.invalid" severity="error" size="small" variant="simple">{{ $form.city.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Chips [#](_multiselect_.md#chips)

Selected values are displayed as a comma separated list by default, setting _display_ as _chip_ displays them as chips.
```
<MultiSelect v-model="selectedCities" display="chip" :options="cities" optionLabel="name" filter placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-80" />
```
## Group [#](_multiselect_.md#group)

Options can be grouped when a nested data structures is provided. To define the label of a group _optionGroupLabel_ property is needed and also _optionGroupChildren_ is required to define the property that refers to the children of a group.
```
<MultiSelect v-model="selectedCities" :options="groupedCities" optionLabel="label" filter optionGroupLabel="label" optionGroupChildren="items" display="chip" placeholder="Select Cities" class="w-full md:w-80">
    <template #optiongroup="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.label }}</div>
        </div>
    </template>
</MultiSelect>
```
## Template [#](_multiselect_.md#template)

MultiSelect offers multiple slots for customization through templating.
```
<MultiSelect v-model="selectedCountries" :options="countries" optionLabel="name" filter placeholder="Select Countries" display="chip" class="w-full md:w-80">
    <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
    <template #dropdownicon>
        <i class="pi pi-map" />
    </template>
    <template #filtericon>
        <i class="pi pi-map-marker" />
    </template>
    <template #header>
        <div class="font-medium px-3 py-2">Available Countries</div>
    </template>
    <template #footer>
        <div class="p-3 flex justify-between">
            <Button label="Add New" severity="secondary" text size="small" icon="pi pi-plus" />
            <Button label="Remove All" severity="danger" text size="small" icon="pi pi-times" />
        </div>
    </template>
</MultiSelect>
```
## Filter [#](_multiselect_.md#filter)

Filtering allows searching items in the list using an input field at the header. In order to use filtering, enable _filter_ property. By default, optionLabel is used when searching and _filterFields_ can be used to customize the fields being utilized. Furthermore, _filterMatchMode_ is available to define the search algorithm. Valid values are "contains" (default), "startsWith" and "endsWith".
```
<MultiSelect v-model="selectedCities" :options="cities" filter optionLabel="name" placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-80" />
```
## Clear Icon [#](_multiselect_.md#clearicon)

When _showClear_ is enabled, a clear icon is added to reset the MultiSelect.
```
<MultiSelect v-model="selectedCities" showClear :options="cities" optionLabel="name" filter placeholder="Select Cities" :maxSelectedLabels="3" class="w-full md:w-80" />
```
## Loading State [#](_multiselect_.md#loadingstate)

Loading state can be used _loading_ property.
```
<MultiSelect placeholder="Loading..." loading class="w-full md:w-80"></MultiSelect>
```
## VirtualScroll [#](_multiselect_.md#virtualscroll)

VirtualScroller is used to render a long list of options efficiently like 100K records in this demo. The configuration is done with _virtualScrollerOptions_ property, refer to the [VirtualScroller](_virtualscroller.md) for more information about the available options as it is used internally by MultiSelect.
```
<MultiSelect v-model="selectedItems" :options="items" :maxSelectedLabels="3" :selectAll="selectAll" optionLabel="label" optionValue="value"
    @selectall-change="onSelectAllChange($event)" @change="onChange($event)" :virtualScrollerOptions="{ itemSize: 44 }" filter placeholder="Select Item" class="w-full md:w-80" />
```
## Filled [#](_multiselect_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<MultiSelect v-model="selectedCities" variant="filled" :options="cities" optionLabel="name" filter placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-80" />
```
## Float Label [#](_multiselect_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel class="w-full md:w-80">
    <MultiSelect id="over_label" v-model="value1" :options="cities" optionLabel="name" filter :maxSelectedLabels="3" class="w-full" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-80" variant="in">
    <MultiSelect id="in_label" v-model="value2" :options="cities" optionLabel="name" filter :maxSelectedLabels="3" class="w-full" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-80" variant="on">
    <MultiSelect id="on_label" v-model="value3" :options="cities" optionLabel="name" filter :maxSelectedLabels="3" class="w-full" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_multiselect_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Cities
```
<IftaLabel>
    <MultiSelect v-model="selectedCities" inputId="ms_cities" :options="cities" optionLabel="name" filter :maxSelectedLabels="3" class="w-full" variant="filled" />
    <label for="ms_cities">Cities</label>
</IftaLabel>
```
## Sizes [#](_multiselect_.md#sizes)

MultiSelect provides _small_ and _large_ sizes as alternatives to the base.
```
<MultiSelect v-model="value1" :options="cities" optionLabel="name" :maxSelectedLabels="3" class="w-full md:w-80" size="small" placeholder="Small" />
<MultiSelect v-model="value2" :options="cities" optionLabel="name" :maxSelectedLabels="3" class="w-full md:w-80" placeholder="Normal" />
<MultiSelect v-model="value3" :options="cities" optionLabel="name" :maxSelectedLabels="3" class="w-full md:w-80" size="large" placeholder="Large" />
```
## Invalid [#](_multiselect_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<MultiSelect v-model="selectedCities1" :options="cities" optionLabel="name" filter placeholder="Select Cities" 
        :maxSelectedLabels="3" :invalid="selectedCities1?.length === 0" class="w-full md:w-80" />
<MultiSelect v-model="selectedCities2" :options="cities" optionLabel="name" filter placeholder="Select Cities" 
        :maxSelectedLabels="3" :invalid="selectedCities2?.length === 0" class="w-full md:w-80" variant="filled" />
```
## Disabled [#](_multiselect_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<MultiSelect disabled placeholder="Select Cities" class="w-full md:w-80" />
```
## Accessibility [#](_multiselect_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided with _aria-labelledby_ or _aria-label_ props. The multiselect component has a _combobox_ role in addition to _aria-haspopup_ and _aria-expanded_ attributes. The relation between the combobox and the popup is created with _aria-controls_ attribute that refers to the id of the popup listbox.

The popup listbox uses _listbox_ as the role with _aria-multiselectable_ enabled. Each list item has an _option_ role along with _aria-label_, _aria-selected_ and _aria-disabled_ attributes.

Checkbox component at the header uses a hidden native checkbox element internally that is only visible to screen readers. Value to read is defined with the _selectAll_ and _unselectAll_ keys of the _aria_ property from the [locale](_configuration_.md#locale) API.

If filtering is enabled, _filterInputProps_ can be defined to give _aria-\*_ props to the input element.

Close button uses _close_ key of the _aria_ property from the [locale](_configuration_.md#locale) API as the _aria-label_ by default, this can be overriden with the _closeButtonProps_.
```
<span id="dd1"></span>Options</span>
<MultiSelect aria-labelledby="dd1" />
<MultiSelect aria-label="Options" />
```
### Closed State Keyboard Support

Key

Function

_tab_

Moves focus to the multiselect element.

_space_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_enter_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_down arrow_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_up arrow_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_any printable character_

Opens the popup and moves focus to the option whose label starts with the characters being typed, if there is none then first option receives the focus.

### Popup Keyboard Support

Key

Function

_tab_

Moves focus to the next focusable element in the popup, if there is none then first focusable element receives the focus.

_shift_ + _tab_

Moves focus to the previous focusable element in the popup, if there is none then last focusable element receives the focus.

_enter_

Toggles the selection state of the focused option, then moves focus to the multiselect element.

_space_

Toggles the selection state of the focused option, then moves focus to the multiselect element.

_escape_

Closes the popup, moves focus to the multiselect element.

_down arrow_

Moves focus to the next option, if there is none then visual focus does not change.

_up arrow_

Moves focus to the previous option, if there is none then visual focus does not change.

_alt_ + _up arrow_

Selects the focused option and closes the popup, then moves focus to the multiselect element.

_shift_ + _down arrow_

Moves focus to the next option and toggles the selection state.

_shift_ + _up arrow_

Moves focus to the previous option and toggles the selection state.

_shift_ + _space_

Selects the items between the most recently selected option and the focused option.

_home_

Moves focus to the first option.

_end_

Moves focus to the last option.

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

### Toggle All Checkbox Keyboard Support

Key

Function

_space_

Toggles the checked state.

_escape_

Closes the popup and moves focus to the multiselect element.

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

Moves focus to the next focusable element in the popup. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.