---
url: https://primevue.org/select
scrapeDate: 2025-04-09T00:36:40.914Z
library: primevue

exactVersionMatch: false
---

## Select

Select is used to choose an item from a collection of options.

## Import [#](_select_.md#import)
```
import Select from 'primevue/select';
```
## Basic [#](_select_.md#basic)

Select is used with the _v-model_ property for two-way value binding along with the _options_ collection. Label and value of an option are defined with the _optionLabel_ and _optionValue_ properties respectively. Note that, when options are simple primitive values such as a string array, no _optionLabel_ and _optionValue_ would be necessary.
```
<Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```
## Forms [#](_select_.md#forms)
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full md:w-56">
    <div class="flex flex-col gap-1">
        <Select name="city.name" :options="cities" optionLabel="name" placeholder="Select a City" fluid />
        <Message v-if="$form.city?.name?.invalid" severity="error" size="small" variant="simple">{{ $form.city.name.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Checkmark [#](_select_.md#checkmark)

An alternative way to highlight the selected option is displaying a checkmark instead.
```
<Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" checkmark :highlightOnSelect="false" class="w-full md:w-56" />
```
## Editable [#](_select_.md#editable)

When _editable_ is present, the input can also be entered with typing.
```
<Select v-model="selectedCity" editable :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```
## Group [#](_select_.md#group)

Options can be grouped when a nested data structures is provided. To define the label of a group _optionGroupLabel_ property is needed and also _optionGroupChildren_ is required to define the property that refers to the children of a group.
```
<Select v-model="selectedCity" :options="groupedCities" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Select a City" class="w-full md:w-56">
    <template #optiongroup="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.label }}</div>
        </div>
    </template>
</Select>
```
## Template [#](_select_.md#template)

Select offers multiple slots for customization through templating.
```
<Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country" class="w-full md:w-56">
    <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
            <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
            {{ slotProps.placeholder }}
        </span>
    </template>
    <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
    <template #dropdownicon>
        <i class="pi pi-map" />
    </template>
    <template #header>
        <div class="font-medium p-3">Available Countries</div>
    </template>
    <template #footer>
        <div class="p-3">
            <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
        </div>
    </template>
</Select>
```
## Filter [#](_select_.md#filter)

Select provides built-in filtering that is enabled by adding the _filter_ property.
```
<Select v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="Select a Country" class="w-full md:w-56">
    <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
            <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
            {{ slotProps.placeholder }}
        </span>
    </template>
    <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
</Select>
```
## Clear Icon [#](_select_.md#clearicon)

When _showClear_ is enabled, a clear icon is added to reset the Select.
```
<Select v-model="selectedCity" :options="cities" showClear optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```
## Loading State [#](_select_.md#loadingstate)

Loading state is enabled with the _loading_ property.
```
<Select placeholder="Loading..." loading class="w-full md:w-56" />
```
## Virtual Scroll [#](_select_.md#virtualscroll)

VirtualScroller is used to render a long list of options efficiently like 100K records in this demo. The configuration is done with _virtualScrollerOptions_ property, refer to the [VirtualScroller](_virtualscroller.md) for more information about the available options as it is used internally by Select.
```
<Select v-model="selectedItem" :options="items" optionLabel="label" optionValue="value"
    :virtualScrollerOptions="{ itemSize: 38 }" placeholder="Select Item" class="w-full md:w-56" />
```
## Lazy Virtual Scroll [#](_select_.md#lazyvirtualscroll)

The virtual scrolling also supports dynamically loading items on demand.
```
<Select v-model="selectedItem" :options="items" optionLabel="label" optionValue="value" class="w-full md:w-56"
    :virtualScrollerOptions="{ lazy: true, onLazyLoad: onLazyLoad, itemSize: 38, showLoader: true, loading: loading, delay: 250 }" placeholder="Select Item" />
```
## Filled [#](_select_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<Select v-model="selectedCity" variant="filled" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
```
## Float Label [#](_select_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel class="w-full md:w-56">
    <Select v-model="value1" inputId="over_label" :options="cities" optionLabel="name" class="w-full" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-56" variant="in">
    <Select v-model="value2" inputId="in_label" :options="cities" optionLabel="name" class="w-full" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-56" variant="on">
    <Select v-model="value3" inputId="on_label" :options="cities" optionLabel="name" class="w-full" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_select_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

City
```
<IftaLabel>
    <Select v-model="selectedCity" inputId="dd-city" :options="cities" optionLabel="name" class="w-full" variant="filled" />
    <label for="dd-city">City</label>
</IftaLabel>
```
## Sizes [#](_select_.md#sizes)

Select provides _small_ and _large_ sizes as alternatives to the base.
```
<Select v-model="value1" :options="cities" optionLabel="name" size="small" placeholder="Small" class="w-full md:w-56" />
<Select v-model="value2" :options="cities" optionLabel="name" placeholder="Normal" class="w-full md:w-56" />
<Select v-model="value3" :options="cities" optionLabel="name" size="large" placeholder="Large" class="w-full md:w-56" />
```
## Invalid [#](_select_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<Select v-model="selectedCity1" :options="cities" optionLabel="name" placeholder="Select a City" :invalid="!selectedCity1" class="w-full md:w-56" />
<Select v-model="selectedCity2" :options="cities" optionLabel="name" placeholder="Select a City" :invalid="!selectedCity2" class="w-full md:w-56" variant="filled" />
```
## Disabled [#](_select_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<Select disabled placeholder="Select a City" class="w-full md:w-56" />
```
## Accessibility [#](_select_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided with _aria-labelledby_ or _aria-label_ props. The select element has a _combobox_ role in addition to _aria-haspopup_ and _aria-expanded_ attributes. If the editable option is enabled _aria-autocomplete_ is also added. The relation between the combobox and the popup is created with _aria-controls_ and _aria-activedescendant_ attribute is used to instruct screen reader which option to read during keyboard navigation within the popup list.

The popup list has an id that refers to the _aria-controls_ attribute of the _combobox_ element and uses _listbox_ as the role. Each list item has an _option_ role, an id to match the _aria-activedescendant_ of the input element along with _aria-label_, _aria-selected_ and _aria-disabled_ attributes.

If filtering is enabled, _filterInputProps_ can be defined to give _aria-\*_ props to the filter input element.
```
<span id="dd1"></span>Options</span>
<select aria-labelledby="dd1" />
<select aria-label="Options" />
```
### Closed State Keyboard Support

Key

Function

_tab_

Moves focus to the select element.

_space_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_enter_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_down arrow_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_up arrow_

Opens the popup and moves visual focus to the selected option, if there is none then last option receives the focus.

_any printable character_

Opens the popup and moves focus to the option whose label starts with the characters being typed, if there is none and select is not editable then first option receives the focus.

### Popup Keyboard Support

Key

Function

_tab_

Moves focus to the next focusable element in the popup. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.

_shift_ + _tab_

Moves focus to the previous focusable element in the popup. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.

_enter_

Selects the focused option and closes the popup, then moves focus to the select element.

_space_

Selects the focused option and closes the popup, then moves focus to the select element.

_escape_

Closes the popup, then moves focus to the select element.

_down arrow_

Moves focus to the next option, if there is none then visual focus does not change.

_up arrow_

Moves focus to the previous option, if there is none then visual focus does not change.

_alt_ + _up arrow_

Selects the focused option and closes the popup, then moves focus to the select element.

_left arrow_

If the select is editable, removes the visual focus from the current option and moves input cursor to one character left.

_right arrow_

If the select is editable, removes the visual focus from the current option and moves input cursor to one character right.

_home_

If the select is editable, moves input cursor at the end, if not then moves focus to the first option.

_end_

If the select is editable, moves input cursor at the beginning, if not then moves focus to the last option.

_pageUp_

Jumps visual focus to first option.

_pageDown_

Jumps visual focus to last option.

_any printable character_

Moves focus to the option whose label starts with the characters being typed if select is not editable.

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

Closes the popup and moves focus to the select element.

_escape_

Closes the popup and moves focus to the select element.

_tab_

Moves focus to the next focusable element in the popup. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.