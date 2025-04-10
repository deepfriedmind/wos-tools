---
url: https://primevue.org/autocomplete
scrapeDate: 2025-04-09T00:36:31.712Z
library: primevue

exactVersionMatch: false
---

## AutoComplete

AutoComplete is an input component that provides real-time suggestions when being typed.

## Import [#](_autocomplete_.md#import)
```
import AutoComplete from 'primevue/autocomplete';
```
## Basic [#](_autocomplete_.md#basic)

AutoComplete is used with the _v-model_ property for two-way value binding. In addition, _suggestions_ property and a _complete_ method are required to query the results.
```
<AutoComplete v-model="value" :suggestions="items" @complete="search" />
```
## Objects [#](_autocomplete_.md#objects)

AutoComplete can work with objects using the _optionLabel_ property that defines the label to display as a suggestion. The value passed to the model would still be the object instance of a suggestion. Here is an example with a Country object that has name and code fields such as _{name: "United States", code:"USA"}_.
```
<AutoComplete v-model="selectedCountry" optionLabel="name" :suggestions="filteredCountries" @complete="search" />
```
## Forms [#](_autocomplete_.md#forms)

AutoComplete integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4 w-full md:w-56">
    <div class="flex flex-col gap-1">
        <AutoComplete name="country.name" optionLabel="name" :suggestions="filteredCountries" @complete="search" />
        <Message v-if="$form.country?.name?.invalid" severity="error" size="small" variant="simple">{{ $form.country.name.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Dropdown [#](_autocomplete_.md#dropdown)

Enabling _dropdown_ property displays a button next to the input field where click behavior of the button is defined using _dropdownMode_ property that takes **blank** or **current** as possible values. _blank_ is the default mode to send a query with an empty string whereas _current_ setting sends a query with the current value of the input.
```
<AutoComplete v-model="value" dropdown :suggestions="items" @complete="search" />
```
## Template [#](_autocomplete_.md#template)

AutoComplete offers multiple slots for customization through templating.
```
<AutoComplete v-model="selectedCountry" optionLabel="name" :suggestions="filteredCountries" @complete="search">
    <template #option="slotProps">
        <div class="flex items-center">
            <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
        </div>
    </template>
    <template #header>
        <div class="font-medium px-3 py-2">Available Countries</div>
    </template>
    <template #footer>
        <div class="px-3 py-3">
            <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
        </div>
    </template>
</AutoComplete>
```
## Group [#](_autocomplete_.md#group)

Option groups are specified with the _optionGroupLabel_ and _optionGroupChildren_ properties.
```
<AutoComplete v-model="selectedCity" :suggestions="filteredCities" @complete="search" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Hint: type 'a'">
    <template #optiongroup="slotProps">
        <div class="flex items-center country-item">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
            <div>{{ slotProps.option.label }}</div>
        </div>
    </template>
</AutoComplete>
```
## Force Selection [#](_autocomplete_.md#forceselection)

ForceSelection mode validates the manual input to check whether it also exists in the suggestions list, if not the input value is cleared to make sure the value passed to the model is always one of the suggestions. Simply enable _forceSelection_ to enforce that input is always from the suggestion list.
```
<AutoComplete v-model="selectedCountry" forceSelection optionLabel="name" :suggestions="filteredCountries" @complete="search" />
```
## Virtual Scroll [#](_autocomplete_.md#virtualscroll)

Virtual Scrolling is a performant way to render large lists. Configuration of the scroll behavior is defined with _virtualScrollerOptions_ that requires _itemSize_ as the mandatory value to set the height of an item. Visit [VirtualScroller](_virtualscroller_.md) documentation for more information about the configuration API.
```
<AutoComplete v-model="selectedItem" :suggestions="filteredItems" @complete="searchItems"
    :virtualScrollerOptions="{ itemSize: 38 }" optionLabel="label" dropdown />
```
## Filled [#](_autocomplete_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<AutoComplete v-model="value" :suggestions="items" @complete="search" variant="filled" />
```
## Float Label [#](_autocomplete_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <AutoComplete v-model="value1" inputId="over_label" :suggestions="items" @complete="search" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <AutoComplete v-model="value2" inputId="in_label" :suggestions="items" @complete="search" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <AutoComplete v-model="value3" inputId="on_label" :suggestions="items" @complete="search" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_autocomplete_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Identifier
```
<IftaLabel>
    <AutoComplete v-model="value" inputId="ac" :suggestions="items" @complete="search" variant="filled" />
    <label for="ac">Identifier</label>
</IftaLabel>
```
## Sizes [#](_autocomplete_.md#sizes)

AutoComplete provides _small_ and _large_ sizes as alternatives to the base.
```
<AutoComplete v-model="value1" :suggestions="items" @complete="search" size="small" placeholder="Small" dropdown />
<AutoComplete v-model="value2" :suggestions="items" @complete="search" placeholder="Normal" dropdown />
<AutoComplete v-model="value3" :suggestions="items" @complete="search" size="large" placeholder="Large" dropdown />
```
## Multiple [#](_autocomplete_.md#multiple)

Multiple mode is enabled using _multiple_ property used to select more than one value from the autocomplete. In this case, value reference should be an array.

With Typeahead

Without Typeahead
```
<label for="multiple-ac-1" class="font-bold mb-2 block">With Typeahead</label>
<AutoComplete v-model="value1" inputId="multiple-ac-1" multiple fluid :suggestions="items" @complete="search" />
<label for="multiple-ac-2" class="font-bold mt-8 mb-2 block">Without Typeahead</label>
<AutoComplete v-model="value2" inputId="multiple-ac-2" multiple fluid @complete="search" :typeahead="false" />
```
## Invalid [#](_autocomplete_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<AutoComplete v-model="value1" :suggestions="items" @complete="search" :invalid="!value1" placeholder="Code" />
<AutoComplete v-model="value2" :suggestions="items" @complete="search" :invalid="!value2" variant="filled" placeholder="Code" />
```
## Disabled [#](_autocomplete_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<AutoComplete disabled placeholder="Disabled" />
```
## Accessibility [#](_autocomplete_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided via _label_ tag combined with _inputId_ prop or using _aria-labelledby_, _aria-label_ props. The input element has _combobox_ role in addition to _aria-autocomplete_, _aria-haspopup_ and _aria-expanded_ attributes. The relation between the input and the popup is created with _aria-controls_ and _aria-activedescendant_ attribute is used to instruct screen reader which option to read during keyboard navigation within the popup list.

In multiple mode, chip list uses _listbox_ role with _aria-orientation_ set to horizontal whereas each chip has the _option_ role with _aria-label_ set to the label of the chip.

The popup list has an id that refers to the _aria-controls_ attribute of the input element and uses _listbox_ as the role. Each list item has _option_ role and an id to match the _aria-activedescendant_ of the input element.
```
<label for="ac1">;Username</label>
<AutoComplete inputId="ac1" />
<span id="ac2">Email</span>
<AutoComplete aria-labelledby="ac2" />
<AutoComplete aria-label="City" />
```
### Closed State Keyboard Support

Key

Function

_tab_

Moves focus to the autocomplete element.

_any printable character_

Opens the popup and moves focus to the first option.

### Popup Keyboard Support

Key

Function

_tab_

Moves focus to the next focusable element in the popup. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.

_shift_ + _tab_

Moves focus to the previous focusable element in the popup. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.

_enter_

Selects the focused option and closes the popup, then moves focus to the autocomplete element.

_space_

Selects the focused option and closes the popup, then moves focus to the autocomplete element.

_escape_

Closes the popup, then moves focus to the autocomplete element.

_down arrow_

Moves focus to the next option, if there is none then visual focus does not change.

_up arrow_

Moves focus to the previous option, if there is none then visual focus does not change.

_alt_ + _up arrow_

Selects the focused option and closes the popup, then moves focus to the autocomplete element.

_left arrow_

Removes the visual focus from the current option and moves input cursor to one character left.

_right arrow_

Removes the visual focus from the current option and moves input cursor to one character right.

_home_

Moves input cursor at the end, if not then moves focus to the first option.

_end_

Moves input cursor at the beginning, if not then moves focus to the last option.

_pageUp_

Jumps visual focus to first option.

_pageDown_

Jumps visual focus to last option.

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

### Chips Input Keyboard Support

Key

Function

_backspace_

Deletes the previous chip if the input field is empty.

_left arrow_

Moves focus to the previous chip if available and input field is empty.

### Chip Keyboard Support

Key

Function

_left arrow_

Moves focus to the previous chip if available.

_right arrow_

Moves focus to the next chip, if there is none then input field receives the focus.

_backspace_

Deletes the chips and adds focus to the input field.