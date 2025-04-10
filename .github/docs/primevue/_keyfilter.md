---
url: https://primevue.org/keyfilter
scrapeDate: 2025-04-09T00:36:30.707Z
library: primevue

exactVersionMatch: false
---

## KeyFilter

A keyfilter is a directive used to block individual keystrokes based on a pattern.

## Import [#](_keyfilter_.md#import)
```
import KeyFilter from 'primevue/keyfilter';
app.directive('keyfilter', KeyFilter);
```
## Presets [#](_keyfilter_.md#presets)

KeyFilter provides various presets configured with the _v-keyfilter_ directive.

Hex

Alphabetic

Alphanumeric
```
<InputText v-keyfilter.int />
<InputText v-keyfilter.num />
<InputText v-keyfilter.money />
<InputText v-keyfilter.hex />
<InputText v-keyfilter.alpha />
<InputText v-keyfilter.alphanum />
```
## Regex (Single Keypress) [#](_keyfilter_.md#regex)

In addition to the presets, a regular expression can be configured for customization of blocking a single key press.

Block Space

Block < > \* !
```
<InputText v-model="spacekey" v-keyfilter="/[^s]/" />
<InputText v-model="chars" v-keyfilter="/^[^<>*!]+$/" />
```
## Regex (Whole Word) [#](_keyfilter_.md#regexword)

In addition to the presets, a regular expression can be used to validate the entire word using _validateOnly_ option.

Block Numeric (allow "+" only once at start)
```
<InputText v-model="text" v-keyfilter="{ pattern: /^[+]?(d{1,12})?$/, validateOnly: true }" />
```
## Accessibility [#](_keyfilter_.md#accessibility)

KeyFilter is a directive and do not require any accessibility features.