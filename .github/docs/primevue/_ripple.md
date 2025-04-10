---
url: https://primevue.org/ripple
scrapeDate: 2025-04-09T00:37:00.569Z
library: primevue

exactVersionMatch: false
---

## Ripple

Ripple directive adds ripple effect to the host element.

## Import [#](_ripple_.md#import)

Ripple is an optional animation for the supported components such as buttons. It is disabled by default and needs to be enabled at your app's entry file (e.g. main.js) during the PrimeVue setup.
```
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
const app = createApp(App);
app.use(PrimeVue, { ripple: true });
```
Ripple describes how to use it with your own components and standard elements that needs to be imported and configured with a name of your choice. Global configuration is done with the _app.directive_ function.
```
import Ripple from 'primevue/ripple';
app.directive('ripple', Ripple);
```
## Configuration [#](_ripple_.md#configuration)

To start with, Ripple needs to be enabled globally. See the [Configuration API](_configuration_.md#ripple) for details.
```
mounted() {
    this.$primevue.config.ripple = true;
}
```
## Default [#](_ripple_.md#default)

Ripple is enabled by adding add _p-ripple_ class to the target and attach the directive with the v- prefix.

Ripple option at the configurator needs to be turned on for the demo.

Default
```
<div v-ripple class="ripple-box">Default</div>
```
## Custom [#](_ripple_.md#custom)

Default styling of the animation adds a shade of white. This can easily be customized using css that changes the color of _p-ink_ element.

Ripple option at the configurator needs to be turned on for the demo.
```
<div v-ripple class="box" style="border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">Green</div>
<div v-ripple class="box" style="border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">Orange</div>
<div v-ripple class="box" style="border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">Purple</div>
```
## Accessibility [#](_ripple_.md#accessibility)

### Screen Reader

Ripple element has the _aria-hidden_ attribute as true so that it gets ignored by the screen readers.

### Keyboard Support

Component does not include any interactive elements.