---
url: https://primevue.org/checkbox
scrapeDate: 2025-04-09T00:36:31.428Z
library: primevue

exactVersionMatch: false
---

## Checkbox

Checkbox is an extension to standard checkbox element with theming.

## Import [#](_checkbox_.md#import)
```
import Checkbox from 'primevue/checkbox';
```
## Basic [#](_checkbox_.md#basic)

Binary checkbox is used with the _v-model_ for two-way value binding and the _binary_ property.
```
<Checkbox v-model="checked" binary />
```
## Group [#](_checkbox_.md#group)

Multiple checkboxes can be grouped together.
```
<div class="card flex flex-wrap justify-center gap-4">
    <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" value="Cheese" />
        <label for="ingredient1"> Cheese </label>
    </div>
    <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" inputId="ingredient2" name="pizza" value="Mushroom" />
        <label for="ingredient2"> Mushroom </label>
    </div>
    <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" inputId="ingredient3" name="pizza" value="Pepper" />
        <label for="ingredient3"> Pepper </label>
    </div>
    <div class="flex items-center gap-2">
        <Checkbox v-model="pizza" inputId="ingredient4" name="pizza" value="Onion" />
        <label for="ingredient4"> Onion </label>
    </div>
</div>
```
## Forms [#](_checkbox_.md#forms)

Checkbox integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-2">
        <CheckboxGroup name="ingredient" class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
                <Checkbox inputId="cheese" value="Cheese" />
                <label for="cheese"> Cheese </label>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox inputId="mushroom" value="Mushroom" />
                <label for="mushroom"> Mushroom </label>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox inputId="pepper" value="Pepper" />
                <label for="pepper"> Pepper </label>
            </div>
            <div class="flex items-center gap-2">
                <Checkbox inputId="onion" value="Onion" />
                <label for="onion"> Onion </label>
            </div>
        </CheckboxGroup>
        <Message v-if="$form.ingredient?.invalid" severity="error" size="small" variant="simple">{{ $form.ingredient.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Dynamic [#](_checkbox_.md#dynamic)

Checkboxes can be generated using a list of values.
```
<div v-for="category of categories" :key="category.key" class="flex items-center gap-2">
    <Checkbox v-model="selectedCategories" :inputId="category.key" name="category" :value="category.name" />
    <label :for="category.key">{{ category.name }}</label>
</div>
```
## Indeterminate [#](_checkbox_.md#indeterminate)

When _indeterminate_ is present, the checkbox masks the actual value visually.
```
<Checkbox v-model="checked" indeterminate binary />
```
## Filled [#](_checkbox_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<Checkbox v-model="checked" binary variant="filled" />
```
## Sizes [#](_checkbox_.md#sizes)

Checkbox provides _small_ and _large_ sizes as alternatives to the base.
```
<div class="card flex flex-wrap justify-center gap-4">
    <div class="flex items-center gap-2">
        <Checkbox v-model="size" inputId="size_small" name="size" value="Small" size="small" />
        <label for="size_small" class="text-sm">Small</label>
    </div>
    <div class="flex items-center gap-2">
        <Checkbox v-model="size" inputId="size_normal" name="size" value="Normal" />
        <label for="size_normal">Normal</label>
    </div>
    <div class="flex items-center gap-2">
        <Checkbox v-model="size" inputId="size_large" name="size" value="Large" size="large" />
        <label for="size_large" class="text-lg">Large</label>
    </div>
</div>
```
## Invalid [#](_checkbox_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<Checkbox v-model="checked" :invalid="!checked"  binary />
```
## Disabled [#](_checkbox_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<Checkbox v-model="checked1" binary disabled />
<Checkbox v-model="checked2" binary disabled />
```
## Accessibility [#](_checkbox_.md#accessibility)

### Screen Reader

Checkbox component uses a hidden native checkbox element internally that is only visible to screen readers. Value to describe the component can either be provided via _label_ tag combined with _inputId_ prop or using _aria-labelledby_, _aria-label_ props.
```
<label for="chkbox1">Remember Me</label>
<Checkbox inputId="chkbox1" />
<span id="chkbox2">Remember Me</span>
<Checkbox aria-labelledby="chkbox2" />
<Checkbox aria-label="Remember Me" />
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the checkbox.

_space_

Toggles the checked state.