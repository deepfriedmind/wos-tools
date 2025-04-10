---
url: https://primevue.org/tooltip
scrapeDate: 2025-04-09T00:36:50.631Z
library: primevue

exactVersionMatch: false
---

## Tooltip

Tooltip directive provides advisory information for a component.

## Import [#](_tooltip_.md#import)
```
import Tooltip from 'primevue/tooltip';
app.directive('tooltip', Tooltip);
```
## Position [#](_tooltip_.md#position)

There are four choices to position the tooltip, default value is _right_ and alternatives are _top_, _bottom_, _left_.
```
<InputText v-tooltip="'Enter your username'" type="text" placeholder="Right" />
<InputText v-tooltip.top="'Enter your username'" type="text" placeholder="Top" />
<InputText v-tooltip.bottom="'Enter your username'" type="text" placeholder="Bottom" />
<InputText v-tooltip.left="'Enter your username'" type="text" placeholder="Left" />
```
## Event [#](_tooltip_.md#event)

Event to display the tooltip is defined as a modifier, default event is hover.
```
<InputText v-tooltip.focus.top="'Enter your username'" type="text" placeholder="Focus" />
```
## Auto Hide [#](_tooltip_.md#autohide)

Tooltip gets hidden when mouse leaves the target element by default, set _autoHide_ to false to customize this behavior so that tooltip stays open when the cursor is on the tooltip.
```
<InputText v-tooltip.bottom="{ value: 'Enter your username', autoHide: false }" type="text" placeholder="autoHide: false" />
<InputText v-tooltip.bottom="'Enter your username'" type="text" placeholder="autoHide: true" />
```
## Delay [#](_tooltip_.md#delay)

Delays to the enter and leave events are defined with _showDelay_ and _hideDelay_ options respectively.
```
<Button v-tooltip="{ value: 'Confirm to proceed', showDelay: 1000, hideDelay: 300 }" label="Save" />
```
## Custom [#](_tooltip_.md#custom)

A tooltip sample with a custom style and content.
```
<Button
    v-tooltip.bottom="{
        value: 'PrimeVue Rocks',
        pt: {
            arrow: {
                style: {
                    borderBottomColor: 'var(--p-primary-color)'
                }
            },
            text: '!bg-primary !text-primary-contrast !font-medium'
        }
    }"
    label="Button"
/>
```
## Accessibility [#](_tooltip_.md#accessibility)

### Screen Reader

Tooltip component uses _tooltip_ role and when it becomes visible the generated id of the tooltip is defined as the _aria-describedby_ of the target.

### Keyboard Support

Key

Function

_escape_

Closes the tooltip when focus is on the target.