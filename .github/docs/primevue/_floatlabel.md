---
url: https://primevue.org/floatlabel
scrapeDate: 2025-04-09T00:36:29.662Z
library: primevue

exactVersionMatch: false
---

## FloatLabel

FloatLabel visually integrates a label with its form element.

## Import [#](_floatlabel_.md#import)
```
import FloatLabel from 'primevue/floatlabel';
```
## Basic [#](_floatlabel_.md#basic)

FloatLabel is used by wrapping the input and its label.

Username
```
<FloatLabel>
    <InputText id="username" v-model="value" />
    <label for="username">Username</label>
</FloatLabel>
```
## Variants [#](_floatlabel_.md#variants)

The _variant_ property defines the position of the label. Default value is _over_, whereas _in_ and _on_ are the alternatives.

In LabelOn Label
```
<FloatLabel variant="in">
    <InputText id="in_label" v-model="value1" autocomplete="off" />
    <label for="in_label">In Label</label>
</FloatLabel>
<FloatLabel variant="on">
    <InputText id="on_label" v-model="value2" autocomplete="off" />
    <label for="on_label">On Label</label>
</FloatLabel>
```
## Invalid [#](_floatlabel_.md#invalid)

When the form element is invalid, the label is also highlighted.

UsernameUsernameUsername
```
<FloatLabel>
    <InputText id="value1" v-model="value1" :invalid="!value1" />
    <label for="value1">Username</label>
</FloatLabel>
<FloatLabel variant="in">
    <InputText id="value2" v-model="value2" :invalid="!value2" />
    <label for="value2">Username</label>
</FloatLabel>
<FloatLabel variant="on">
    <InputText id="value3" v-model="value3" :invalid="!value3" />
    <label for="value3">Username</label>
</FloatLabel>
```
## Accessibility [#](_floatlabel_.md#accessibility)

### Screen Reader

FloatLabel does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.