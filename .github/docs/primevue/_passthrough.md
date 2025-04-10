---
url: https://primevue.org/passthrough
scrapeDate: 2025-04-09T00:37:08.141Z
library: primevue

exactVersionMatch: false
---

## Pass Through

The Pass Through attributes is an API to access the internal DOM Structure of the components.

## Introduction [#](_passthrough_.md#introduction)

In traditional 3rd party UI libraries, users are limited to the API provided by component author. This API commonly consists of props, events and slots. Whenever a requirement emerges for a new customization option in the API, the component author needs to develop and publish it with a new release.

Vision of PrimeTek is _Your components, not ours_. The pass through feature is a key element to implement this vision by exposing the component internals in order to apply arbitrary attributes and listeners to the DOM elements. The primary advantage of this approach is that it frees you from being restricted by the main component API. We recommend considering the pass-through feature whenever you need to tailor a component that lacks a built-in feature for your specific requirement.

Two videos are available at PrimeTV youtube channel, first one is an introduction and second one covers a unique case that is solved by the pass-through.

## Basic [#](_passthrough_.md#basic)

Each component has a special _pt_ property to define an object with keys corresponding to the available DOM elements. Each value can either be a string, an object or a function that returns a string or an object to define the arbitrary properties to apply to the element such as styling, aria, data-\* or custom attributes. If the value is a string or a function that returns a string, it is considered as a class definition and added to the class attribute of the element. Every component documentation has a dedicated section to document the available section names exposed via PT.

Most common usage of _pt_ is styling and customization. The _class_ and _style_ properties support the exact syntax of the corresponding [Vue bindings](https://vuejs.org/guide/essentials/class-and-style.html) like arrays, objects and conditionals. Example below styles an unstyled Panel component with Tailwind CSS library.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Panel header="Header" toggleable
    :pt="{
        root: 'border border-primary rounded-xl p-4',
        header: (options) => ({
            id: 'myPanelHeader',
            style: {
                'user-select': 'none'
            },
            class: ['flex items-center justify-between text-primary font-bold']
        }),
        content: { class: 'text-primary-700 dark:text-primary-200 mt-4' },
        title: 'text-xl',
        toggler: () => 'bg-primary text-primary-contrast hover:text-primary hover:bg-primary-contrast'
    }">
    <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</Panel>
```
## Declarative [#](_passthrough_.md#declarative)

The declarative syntax provides an alternative to the programmatic syntax. The attributes that start with _pt_ are interpreted differently by the component based on the format below. An IDE extension is also being planned to autocomplete the values for better developer experience in the future.
```
<ComponentTag pt:[passthrough_key]:[attribute]="value" />
```
Here is another example using both syntax alternatives for the same options.
```
<Panel
    :pt="{
        root: {
            class: 'border-1 border-solid'
        },
        header: {
            'data-test-id': 'testid',
            class: 'bg-blue-500',
            onClick: onHeaderClick
        }
    }"
>
```
```
<Panel
    pt:root:class="border border-solid"
    pt:header:id="headerId"
    pt:header:data-test-id="testId"
    pt:header:class="bg-blue-500"
    :pt:header:onClick="onHeaderClick"
>
```
## PC Prefix [#](_passthrough_.md#pcprefix)

Section names prefixed with _pc_ denote PrimeVue components, distinguishing them from standard DOM elements and indicating the necessity for a nested structure. For example, the "badge" section is identified as _pcBadge_ because the button component incorporates the badge component internally.
```
 <Button
    type="button"
    label="Messages"
    icon="pi pi-inbox"
    badge="2"
    variant="outlined"
    severity="secondary"
    :pt="{
        root: '!px-4 !py-3',
        icon: '!text-xl !text-violet-500 dark:!text-violet-400',
        label: '!text-lg !text-violet-500 dark:!text-violet-400',
        pcBadge: {
            root: '!bg-violet-500 dark:!bg-violet-400 !text-white dark:!text-black'
        }
    }"
/>
```
## Lifecycle [#](_passthrough_.md#lifecycle)

Lifecycle hooks of components are exposed as pass through using the _hooks_ property so that callback functions can be registered. Available callbacks are _onBeforeCreate_, _onCreated_, _onBeforeUpdate_, _onUpdated_, _onBeforeMount_, _onMounted_, _onBeforeUnmount_ and _onUnmounted_. Refer to the Vue.js documentation for detailed information about lifecycle hooks.
```
<Panel header="Header" :pt="panelPT">
    Content
</Panel>
```
## Global [#](_passthrough_.md#global)

Defines the shared pass through properties per component type. For example, with the configuration below all panel headers have the _bg-primary_ style class and the all autocomplete components have a fixed width. These settings can be overriden by a particular component as components _pt_ property has higher precedence over global _pt_.
```
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);
app.use(PrimeVue, {
    pt: {
        panel: {
            header: {
                class: 'bg-primary text-primary-contrast'
            }
        },
        autocomplete: {
            input: {
                root: 'w-64' // OR { class: 'w-64' }
            }
        }
    }
});
```
## Custom CSS [#](_passthrough_.md#customcss)

The _global_ property has a _css_ option to define custom css that belongs to a global _pt_ configuration. Common use case of this feature is defining global styles and animations related to the pass through configuration.
```
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);
app.use(PrimeVue, {
    pt: {
        global: {
            css: `
                .my-button {
                    border-width: 2px;
                }
            `
        },
        button: {
            root: 'my-button'
        }
    }
});
```
## UsePassThrough [#](_passthrough_.md#usepassthrough)

An existing pass through configuration is customized with the _usePassThrough_ utility. The first parameter is the object to customize, the second parameter is the customizations and the final parameter is the merge strategy.
```
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { usePassThrough } from "primevue/passthrough";
import BasePreset from "./basepreset";
const app = createApp(App);
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            title: {
                class: ['leading-none font-light text-2xl']
            }
        }
    },
    {
        mergeSections: true,
        mergeProps: false
    }
);
app.use(PrimeVue, { unstyled: true, pt: CustomPreset });
```
The _mergeSections_ defines whether the sections from the main configuration gets added and the _mergeProps_ controls whether to override or merge the defined props. Defaults are _true_ for _mergeSections_ and _false_ for _mergeProps_.
```
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: true, mergeProps: false }
);
// Output:
// panel.header.class => 'my_panel_header'
// panel.title.class => Tailwind.panel.title.class
```
```
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: true, mergeProps: true }
);
// Output:
// panel.header.class => [Tailwind.panel.header.class, 'my_panel_header']
// panel.title.class => Tailwind.panel.title.class
```
```
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: false, mergeProps: true }
);
// Output:
// panel.header.class => [Tailwind.panel.header.class, 'my_panel_header']
// panel.title.class => undefined
```
```
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: false, mergeProps: false }
);
// Output:
// panel.header.class => 'my_panel_header'
// panel.title.class => undefined
```