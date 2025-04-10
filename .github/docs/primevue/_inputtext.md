---
url: https://primevue.org/inputtext
scrapeDate: 2025-04-09T00:36:30.307Z
library: primevue

exactVersionMatch: false
---

## InputText

InputText is an extension to standard input element with theming.

## Import [#](_inputtext_.md#import)
```
import InputText from 'primevue/inputtext';
```
## Basic [#](_inputtext_.md#basic)

InputText is used with the _v-model_ property for two-way value binding.
```
<InputText type="text" v-model="value" />
```
## Forms [#](_inputtext_.md#forms)

InputText integrates seamlessly with the [PrimeVue Forms](_forms.md) library.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-4">
    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
    </div>
    <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="Email" />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Filled [#](_inputtext_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<InputText type="text" v-model="value" variant="filled" />
```
## Float Label [#](_inputtext_.md#floatlabel)

FloatLabel visually integrates a label with its form element. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <InputText id="over_label" v-model="value1" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <InputText id="in_label" v-model="value2" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <InputText id="on_label" v-model="value3" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_inputtext_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Username
```
<IftaLabel>
    <InputText id="username" v-model="value" variant="filled" />
    <label for="username">Username</label>
</IftaLabel>
```
## Sizes [#](_inputtext_.md#sizes)

InputText provides _small_ and _large_ sizes as alternatives to the base.
```
<InputText v-model="value1" type="text" size="small" placeholder="Small" />
<InputText v-model="value2" type="text" placeholder="Normal" />
<InputText v-model="value3" type="text" size="large" placeholder="Large" />
```
## Help Text [#](_inputtext_.md#helptext)

An advisory text can be defined with the [Message](_message.md) component.
```
<div class="flex flex-col gap-2">
    <label for="username">Username</label>
    <InputText id="username" v-model="value" aria-describedby="username-help" />
    <Message size="small" severity="secondary" variant="simple">Enter your username to reset your password.</Message>
</div>
```
## Invalid [#](_inputtext_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<InputText v-model="value1" :invalid="!value1" placeholder="Name" />
<InputText v-model="value2" :invalid="!value2" variant="filled" placeholder="Name" />
```
## Disabled [#](_inputtext_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<InputText v-model="value" disabled placeholder="Disabled" />
```
## Accessibility [#](_inputtext_.md#accessibility)

### Screen Reader

InputText component renders a native input element that implicitly includes any passed prop. Value to describe the component can either be provided via _label_ tag combined with _id_ prop or using _aria-labelledby_, _aria-label_ props.
```
<label for="firstname">Firstname</label>
<InputText id="firstname" />
<span id="lastname">Lastname</span>
<InputText aria-labelledby="lastname" />
<InputText aria-label="Age"/>
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the input.