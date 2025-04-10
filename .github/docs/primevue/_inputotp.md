---
url: https://primevue.org/inputotp
scrapeDate: 2025-04-09T00:36:30.566Z
library: primevue

exactVersionMatch: false
---

## InputOtp

Input Otp is used to enter one time passwords.

## Import [#](_inputotp_.md#import)
```
import InputOtp from 'primevue/inputotp';
```
## Basic [#](_inputotp_.md#basic)

InputOtp is used with the _v-model_ property for two-way value binding. The number of characters is defined with the _length_ option, which is set to 4 by default.
```
<InputOtp v-model="value" />
```
## Forms [#](_inputotp_.md#forms)

InputOtp integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
        <InputOtp name="passcode" />
        <Message v-if="$form.passcode?.invalid" severity="error" size="small" variant="simple">{{ $form.passcode.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Mask [#](_inputotp_.md#mask)

Enable the _mask_ option to hide the values in the input fields.
```
<InputOtp v-model="value" mask />
```
## Integer Only [#](_inputotp_.md#integeronly)

When _integerOnly_ is present, only integers can be accepted as input.
```
<InputOtp v-model="value" integerOnly />
```
## Filled [#](_inputotp_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<InputOtp v-model="value" variant="filled" />
```
## Sizes [#](_inputotp_.md#sizes)

InputOtp provides _small_ and _large_ sizes as alternatives to the base.
```
<InputOtp v-model="value1" size="small" />
<InputOtp v-model="value2" />
<InputOtp v-model="value3" size="large" />
```
## Template [#](_inputotp_.md#template)

Define a template with your own UI elements with bindings to the provided events and attributes to replace the default design.
```
<InputOtp v-model="value">
    <template #default="{ attrs, events }">
        <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
    </template>
</InputOtp>
```
## Sample [#](_inputotp_.md#sample)

A sample UI implementation with templating and additional elements.

Authenticate Your Account

Please enter the code sent to your phone.
```
<div class="flex flex-col items-center">
    <div class="font-bold text-xl mb-2">Authenticate Your Account</div>
    <p class="text-surface-500 dark:text-surface-400 block mb-8">Please enter the code sent to your phone.</p>
    <InputOtp v-model="value" :length="6" style="gap: 0">
        <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-4">
                <i class="pi pi-minus" />
            </div>
        </template>
    </InputOtp>
    <div class="flex justify-between mt-8 self-stretch">
        <Button label="Resend Code" link class="p-0"></Button>
        <Button label="Submit Code"></Button>
    </div>
</div>
```
## Accessibility [#](_inputotp_.md#accessibility)

### Screen Reader

Input OTP uses a set of InputText components, refer to the [InputText](_inputtext.md) component for more information about the screen reader support.

### Keyboard Support

Key

Function

_tab_

Moves focus to the input otp.

_right arrow_

Moves focus to the next input element.

_left arrow_

Moves focus to the previous input element.

_backspace_

Deletes the input and moves focus to the previous input element.