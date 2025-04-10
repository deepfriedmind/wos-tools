---
url: https://primevue.org/toggleswitch
scrapeDate: 2025-04-09T00:36:41.687Z
library: primevue

exactVersionMatch: false
---

## ToggleSwitch

ToggleSwitch is used to select a boolean value.

## Import [#](_toggleswitch_.md#import)
```
import ToggleSwitch from 'primevue/toggleswitch';
```
## Basic [#](_toggleswitch_.md#basic)

ToggleSwitch is used with the _v-model_ property for two-way value binding.
```
<ToggleSwitch v-model="checked" />
```
## Forms [#](_toggleswitch_.md#forms)

ToggleSwitch integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-48">
    <div class="flex flex-col items-center gap-2">
        <ToggleSwitch name="activation" />
        <Message v-if="$form.activation?.invalid" severity="error" size="small" variant="simple">{{ $form.activation.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Preselection [#](_toggleswitch_.md#preselection)

Enabling _checked_ property displays the component as active initially.
```
<ToggleSwitch v-model="checked" />
```
## Invalid [#](_toggleswitch_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<ToggleSwitch v-model="checked" :invalid="!checked" />
```
## Template [#](_toggleswitch_.md#template)

The _handle_ slot is available to display custom content.
```
<ToggleSwitch v-model="checked">
    <template #handle="{ checked }">
        <i :class="['!text-xs pi', { 'pi-check': checked, 'pi-times': !checked }]" />
    </template>
</ToggleSwitch>
```
## Disabled [#](_toggleswitch_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<ToggleSwitch v-model="checked" disabled />
```
## Accessibility [#](_toggleswitch_.md#accessibility)

### Screen Reader

ToggleSwitch component uses a hidden native checkbox element with _switch_ role internally that is only visible to screen readers. Value to describe the component can either be provided via _label_ tag combined with _id_ prop or using _aria-labelledby_, _aria-label_ props.
```
<label for="switch1">Remember Me</label>
<ToggleSwitch inputId="switch1" />
<span id="switch2">Remember Me</span>
<ToggleSwitch aria-labelledby="switch2" />
<ToggleSwitch aria-label="Remember Me" />
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the switch.

_space_

Toggles the checked state.