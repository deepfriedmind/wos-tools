---
url: https://primevue.org/cascadeselect
scrapeDate: 2025-04-09T00:36:30.968Z
library: primevue

exactVersionMatch: false
---

## CascadeSelect

CascadeSelect is a form component to select a value from a nested structure of options.

## Import [#](_cascadeselect_.md#import)
```
import CascadeSelect from 'primevue/cascadeselect';
```
## Basic [#](_cascadeselect_.md#basic)

CascadeSelect is used with the _v-model_ property for two-way value binding along with the _options_ collection. To define the label of a group _optionGroupLabel_ property is needed and also _optionGroupChildren_ is required to define the property that refers to the children of a group. Note that order of the _optionGroupChildren_ matters as it should correspond to the data hierarchy.

Select a City

3 results are available
```
<CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname" optionGroupLabel="name"
    :optionGroupChildren="['states', 'cities']" class="w-56" placeholder="Select a City" />
```
## Forms [#](_cascadeselect_.md#forms)

CascadeSelect integrates seamlessly with the [PrimeVue Forms](_forms.md) library.

Select a City

3 results are available
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-1">
        <CascadeSelect name="city" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" class="w-56" placeholder="Select a City" />
        <Message v-if="$form.city?.invalid" severity="error" size="small" variant="simple">{{ $form.city.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Template [#](_cascadeselect_.md#template)

CascadeSelect offers multiple slots for customization through templating.

Select a City

3 results are available
```
<CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname" optionGroupLabel="name"
    :optionGroupChildren="['states', 'cities']" class="w-56" placeholder="Select a City">
    <template #option="slotProps">
        <div class="flex items-center">
            <img v-if="slotProps.option.states" :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px"  />
            <i v-if="slotProps.option.cities" class="pi pi-compass mr-2"></i>
            <i v-if="slotProps.option.cname" class="pi pi-map-marker mr-2"></i>
            <span>{{ slotProps.option.cname || slotProps.option.name }}</span>
        </div>
    </template>
    <template #dropdownicon>
        <i class="pi pi-map" />
    </template>
    <template #header>
        <div class="font-medium px-3 py-2">Available Countries</div>
    </template>
    <template #footer>
        <div class="px-3 py-1">
            <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
        </div>
    </template>
</CascadeSelect>
```
## Loading State [#](_cascadeselect_.md#loadingstate)

Loading state can be used _loading_ property.

Loading...

No results found
```
<CascadeSelect loading placeholder="Loading..." class="w-56" />
```
## Clear Icon [#](_cascadeselect_.md#clearicon)

When _showClear_ is enabled, a clear icon is added to reset the CascadeSelect.

Select a City

3 results are available
```
<CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname" optionGroupLabel="name"
    :optionGroupChildren="['states', 'cities']" class="w-56" placeholder="Select a City" />
```
## Filled [#](_cascadeselect_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.

Select a City

3 results are available
```
<CascadeSelect v-model="selectedCity" variant="filled" :options="countries" optionLabel="cname" optionGroupLabel="name"
    :optionGroupChildren="['states', 'cities']" class="w-56" placeholder="Select a City" />
```
## Float Label [#](_cascadeselect_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

p-emptylabel

3 results are available

Over Label

p-emptylabel

3 results are available

In Label

p-emptylabel

3 results are available

On Label
```
<FloatLabel class="w-full md:w-56">
    <CascadeSelect v-model="value1" inputId="over_label" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" class="w-full" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-56">
    <CascadeSelect v-model="value2" inputId="in_label" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" class="w-full" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel class="w-full md:w-56">
    <CascadeSelect v-model="value3" inputId="on_label" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" class="w-full" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_cascadeselect_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

p-emptylabel

3 results are available

City
```
<IftaLabel class="w-full md:w-56">
    <CascadeSelect v-model="selectedCity" inputId="cs_city" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" class="w-full" variant="filled" />
    <label for="cs_city">City</label>
</IftaLabel>
```
## Sizes [#](_cascadeselect_.md#sizes)

CascadeSelect provides _small_ and _large_ sizes as alternatives to the base.

Small

3 results are available

Normal

3 results are available

Large

3 results are available
```
<CascadeSelect v-model="value1" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" 
    class="w-56" size="small" placeholder="Small" />
<CascadeSelect v-model="value2" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" 
    class="w-56" placeholder="Normal" />
<CascadeSelect v-model="value3" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" 
    class="w-56" size="large" placeholder="Large" />
```
## Invalid [#](_cascadeselect_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.

Select a City

3 results are available

Select a City

3 results are available
```
<div class="card flex flex-wrap justify-center gap-4">
    <CascadeSelect v-model="selectedCity1" :invalid="!selectedCity1" :options="countries" optionLabel="cname" optionGroupLabel="name" 
        :optionGroupChildren="['states', 'cities']" class="w-full sm:w-56" placeholder="Select a City" />
    <CascadeSelect v-model="selectedCity2" :invalid="!selectedCity2" :options="countries" optionLabel="cname" optionGroupLabel="name" 
        :optionGroupChildren="['states', 'cities']" class="w-full sm:w-56" placeholder="Select a City" variant="filled" />
</div>
```
## Disabled [#](_cascadeselect_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<CascadeSelect disabled placeholder="Disabled" class="w-56" />
```
## Accessibility [#](_cascadeselect_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided with _aria-labelledby_ or _aria-label_ props. The cascadeselect element has a _combobox_ role in addition to _aria-haspopup_ and _aria-expanded_ attributes. The relation between the combobox and the popup is created with _aria-controls_ that refers to the id of the popup.

The popup list has an id that refers to the _aria-controls_ attribute of the _combobox_ element and uses _tree_ as the role. Each list item has a _treeitem_ role along with _aria-label_, _aria-selected_ and _aria-expanded_ attributes. The container element of a treenode has the _group_ role. The _aria-setsize_, _aria-posinset_ and _aria-level_ attributes are calculated implicitly and added to each treeitem.
```
<span id="dd1"></span>Options</span>
<CascadeSelect aria-labelledby="dd1" />
<CascadeSelect aria-label="Options" />
```
### Closed State Keyboard Support

Key

Function

_tab_

Moves focus to the cascadeselect element.

_space_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_enter_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_down arrow_

Opens the popup and moves visual focus to the selected option, if there is none then first option receives the focus.

_up arrow_

Opens the popup and moves visual focus to the selected option, if there is none then last option receives the focus.

_any printable character_

Opens the popup and moves focus to the option whose label starts with the characters being typed, if there is none then first option receives the focus.

### Popup Keyboard Support

Key

Function

_tab_

Hides the popup and moves focus to the next tabbable element. If there is none, the focusable option is selected and the overlay is closed then moves focus to next element in page.

_shift_ + _tab_

Hides the popup and moves focus to the previous tabbable element.

_enter_

Selects the focused option and closes the popup.

_space_

Selects the focused option and closes the popup.

_escape_

Closes the popup, moves focus to the cascadeselect element.

_down arrow_

Moves focus to the next option.

_up arrow_

Moves focus to the previous option.

_alt_ + _up arrow_

Selects the focused option and closes the popup, then moves focus to the cascadeselect element.

_right arrow_

If option is closed, opens the option otherwise moves focus to the first child option.

_left arrow_

If option is open, closes the option otherwise moves focus to the parent option.

_home_

Moves input cursor at the end, if not then moves focus to the first option.

_end_

Moves input cursor at the beginning, if not then moves focus to the last option.

_any printable character_

Moves focus to the option whose label starts with the characters being typed.