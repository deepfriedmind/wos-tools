---
url: https://primevue.org/togglebutton
scrapeDate: 2025-04-09T00:36:41.528Z
library: primevue

exactVersionMatch: false
---

## ToggleButton

ToggleButton is used to select a boolean value using a button.

## Import [#](_togglebutton_.md#import)
```
import ToggleButton from 'primevue/togglebutton';
```
## Basic [#](_togglebutton_.md#basic)

ToggleButton is used with the _v-model_ property for two-way value binding.
```
<ToggleButton v-model="checked" onLabel="On" offLabel="Off" />
```
## Forms [#](_togglebutton_.md#forms)

ToggleButton integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col items-center gap-1">
        <ToggleButton name="consent" class="w-48" onLabel="Accept All" offLabel="Reject All" />
        <Message v-if="$form.consent?.invalid" severity="error" variant="simple">{{ $form.consent.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Customized [#](_togglebutton_.md#customized)

Icons and Labels can be customized using _onLabel_, _offLabel_, _onIcon_ and _offIcon_ properties.
```
<ToggleButton v-model="checked" onLabel="Locked" offLabel="Unlocked" onIcon="pi pi-lock" 
    offIcon="pi pi-lock-open" class="w-36" aria-label="Do you confirm" />
```
## Sizes [#](_togglebutton_.md#sizes)

ToggleButton provides _small_ and _large_ sizes as alternatives to the base.
```
<ToggleButton v-model="value1" onLabel="On" offLabel="Off" size="small" class="min-w-16" />
<ToggleButton v-model="value2" onLabel="On" offLabel="Off" class="min-w-20" />
<ToggleButton v-model="value3" onLabel="On" offLabel="Off" size="large" class="min-w-24" />
```
## Invalid [#](_togglebutton_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<ToggleButton v-model="checked" onIcon="pi pi-check" offIcon="pi pi-times" :invalid="!checked" class="w-full sm:w-40" aria-label="Confirmation" />
```
## Disabled [#](_togglebutton_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<ToggleButton v-model="checked" disabled onIcon="pi pi-check" offIcon="pi pi-times"
    class="w-full sm:w-40" aria-label="Confirmation" />
```
## Accessibility [#](_togglebutton_.md#accessibility)

### Screen Reader

ToggleButton component uses a native button element as the switch element internally that is only visible to screen readers. Value to describe the component can be defined with _aria-labelledby_ or _aria-label_ props, it is highly suggested to use either of these props as the component changes the label displayed which will result in screen readers to read different labels when the component receives focus. To prevent this, always provide an aria label that does not change related to state.
```
<span id="rememberme">Remember Me</span>
<ToggleButton aria-labelledby="rememberme" />
<ToggleButton aria-label="Remember Me" />
```
### Keyboard Support

Keyboard interaction is derived from the native browser handling of checkboxs in a group.

Key

Function

_tab_

Moves focus to the button.

_space_

Toggles the checked state.