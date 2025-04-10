---
url: https://primevue.org/password
scrapeDate: 2025-04-09T00:36:41.473Z
library: primevue

exactVersionMatch: false
---

## Password

Password displays strength indicator for password fields.

## Import [#](_password_.md#import)
```
import Password from 'primevue/password';
```
## Basic [#](_password_.md#basic)

Password is used with the _v-model_ property for two-way value binding.
```
<Password v-model="value" :feedback="false" />
```
## Forms [#](_password_.md#forms)

InputText is used with the _v-model_ property.
```
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-64">
    <div class="flex flex-col gap-1">
        <Password name="password" placeholder="Password" :feedback="false" fluid />
        <template v-if="$form.password?.invalid">
            <Message v-for="(error, index) of $form.password.errors" :key="index" severity="error" size="small" variant="simple">{{ error.message }}</Message>
        </template>
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
</Form>
```
## Meter [#](_password_.md#meter)

Strength meter is displayed as a popup while a value is being entered.
```
<Password v-model="value" />
```
## Locale [#](_password_.md#locale)

Labels are translated at component level by _promptLabel_, _weakLabel_, _mediumLabel_ and _strongLabel_ properties. In order to apply global translations for all Password components in the application, refer to the [locale](_configuration_.md#locale).
```
<Password v-model="value" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password" />
```
## ToggleMask [#](_password_.md#togglemask)

When _toggleMask_ is present, an icon is displayed to show the value as plain text.
```
<Password v-model="value" toggleMask />
```
## Template [#](_password_.md#template)

3 slots are included to customize the overlay. These are _header_, _content_ and _footer_. Note that content overrides the default meter.
```
<Password v-model="value">
    <template #header>
        <div class="font-semibold text-xm mb-4">Pick a password</div>
    </template>
    <template #footer>
        <Divider />
        <ul class="pl-2 my-0 leading-normal">
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
        </ul>
    </template>
</Password>
```
## Filled [#](_password_.md#filled)

Specify the _variant_ property as _filled_ to display the component with a higher visual emphasis than the default _outlined_ style.
```
<Password v-model="value" :feedback="false" variant="filled" />
```
## Float Label [#](_password_.md#floatlabel)

A floating label appears on top of the input field when focused. Visit [FloatLabel](_floatlabel_.md) documentation for more information.

Over LabelIn LabelOn Label
```
<FloatLabel>
    <Password v-model="value1" inputId="over_label" />
    <label for="over_label">Over Label</label>
</FloatLabel>
<FloatLabel variant="in">
    <Password v-model="value2" inputId="in_label" variant="filled" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <Password v-model="value3" inputId="on_label" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Ifta Label [#](_password_.md#iftalabel)

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](_iftalabel_.md) documentation for more information.

Password
```
<IftaLabel>
    <Password v-model="value" inputId="password" variant="filled" />
    <label for="password">Password</label>
</IftaLabel>
```
## Sizes [#](_password_.md#sizes)

Password provides _small_ and _large_ sizes as alternatives to the base.
```
<div class="card flex flex-col items-center gap-4">
    <Password v-model="value1" size="small" placeholder="Small" />
    <Password v-model="value2" placeholder="Normal" />
    <Password v-model="value3" size="large" placeholder="Large" />
</div>
```
## Invalid [#](_password_.md#invalid)

Invalid state is displayed using the _invalid_ prop to indicate a failed validation. You can use this style when integrating with form validation libraries.
```
<Password v-model="value1" :invalid="!value1" placeholder="Password" />
<Password v-model="value2" :invalid="!value2" variant="filled" placeholder="Password" />
```
## Disabled [#](_password_.md#disabled)

When _disabled_ is present, the element cannot be edited and focused.
```
<Password disabled placeholder="Disabled" />
```
## Accessibility [#](_password_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided via _label_ tag combined with _id_ prop or using _aria-labelledby_, _aria-label_ props. Screen reader is notified about the changes to the strength of the password using a section that has _aria-live_ while typing.
```
<label for="pwd1">Password</label>
<Password inputId="pwd1" />
<span id="pwd2">Password</span>
<Password aria-labelledby="pwd2" />
<Password aria-label="Password"/>
```
### Keyboard Support

Key

Function

_tab_

Moves focus to the input.

_escape_

Hides the strength meter if open.