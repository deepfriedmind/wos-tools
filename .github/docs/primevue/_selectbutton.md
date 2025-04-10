---
url: https://primevue.org/selectbutton
scrapeDate: 2025-04-09T00:36:42.297Z
library: primevue

exactVersionMatch: false
---

## SelectButton

SelectButton is used to choose single or multiple items from a list using buttons.

## Import [#](_selectbutton_.md#import)
```
import SelectButton from 'primevue/selectbutton';
```
## Basic [#](_selectbutton_.md#basic)

SelectButton is used with the _v-model_ property for two-way value binding along with the _options_ collection. Label and value of an option are defined with the _optionLabel_ and _optionValue_ properties respectively. Note that, when options are simple primitive values such as a string array, no _optionLabel_ and _optionValue_ would be necessary.
```
<SelectButton v-model="value" :options="options" />
```
## Forms [#](_selectbutton_.md#forms)

SelectButton integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <SelectButton name="selection" :options="options" />
        <Message v-if="$form.selection?.invalid" severity="error">{{ $form.selection.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Multiple [#](_selectbutton_.md#multiple)

SelectButton allows selecting only one item by default and setting _multiple_ option enables choosing more than one item. In multiple case, model property should be an array.
```
<SelectButton v-model="value" :options="options" optionLabel="name" multiple aria-labelledby="multiple" />
```
## Template [#](_selectbutton_.md#template)

Label of an option is used as the display text of an item by default, for custom content support define an _option_ template that gets the option instance as a parameter.
```
<SelectButton v-model="value" :options="options" optionLabel="value" dataKey="value" aria-labelledby="custom">
    <template #option="slotProps">
        <i :class="slotProps.option.icon"></i>
    </template>
</SelectButton>
```
## Sizes [#](_selectbutton_.md#sizes)

SelectButton provides _small_ and _large_ sizes as alternatives to the base.
```
<SelectButton v-model="value1" :options="options" size="small" />
<SelectButton v-model="value2" :options="options" />
<SelectButton v-model="value3" :options="options" size="large" />
```
## Invalid [#](_selectbutton_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<SelectButton v-model="value" :options="options" aria-labelledby="basic" allowEmpty :invalid="value === null"  />
```
## Disabled [#](_selectbutton_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused entirely. Certain options can also be disabled using the _optionDisabled_ property.
```
<SelectButton v-model="value" :options="options" disabled />
<SelectButton v-model="value" :options="options2" optionDisabled="constant" optionLabel="name" />
```
## Accessibility [#](_selectbutton_.md#accessibility)

### Screen Reader

SelectButton component uses ToggleButton internally and has _group_ role. Value to describe the component can be provided via _aria-labelledby_ property.

### Keyboard Support

Keyboard interaction is derived from the native browser handling of checkboxs in a group.

Key

Function

_tab_

Moves focus to the next the focusable element in the page tab sequence.

_shift_ + _tab_

Moves focus to the previous the focusable element in the page tab sequence.

_space_

Toggles the checked state of a button.