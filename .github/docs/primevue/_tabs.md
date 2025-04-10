---
url: https://primevue.org/tabs
scrapeDate: 2025-04-09T00:36:51.350Z
library: primevue

exactVersionMatch: false
---

## Tabs

Tabs facilitates seamless switching between different views.

## Import [#](_tabs_.md#import)
```
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
```
## Basic [#](_tabs_.md#basic)

Tabs is defined using _TabList_, _Tab_, _TabPanels_ and _TabPanel_ components. Tab and TabPanel components are associated with their _value_ properties.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Tabs value="0">
    <TabList>
        <Tab value="0">Header I</Tab>
        <Tab value="1">Header II</Tab>
        <Tab value="2">Header III</Tab>
    </TabList>
    <TabPanels>
        <TabPanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </TabPanel>
        <TabPanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
        <TabPanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </TabPanel>
    </TabPanels>
</Tabs>
```
## Dynamic [#](_tabs_.md#dynamic)

Tabs can be generated dynamically using the standard _v-for_ directive on Tab and TabPanel.
```
<Tabs value="0">
    <TabList>
        <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">{{ tab.title }}</Tab>
    </TabList>
    <TabPanels>
        <TabPanel v-for="tab in tabs" :key="tab.content" :value="tab.value">
            <p class="m-0">{{ tab.content }}</p>
        </TabPanel>
    </TabPanels>
</Tabs>
```
## Controlled [#](_tabs_.md#controlled)

Tabs can be controlled programmatically using _value_ property as a model.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<div class="flex mb-2 gap-2 justify-end">
    <Button @click="value = '0'" rounded label="1" class="w-8 h-8 p-0" :outlined="value !== '0'" />
    <Button @click="value = '1'" rounded label="2" class="w-8 h-8 p-0" :outlined="value !== '1'" />
    <Button @click="value = '2'" rounded label="3" class="w-8 h-8 p-0" :outlined="value !== '2'" />
</div>
<Tabs v-model:value="value">
    <TabList>
        <Tab value="0">Header I</Tab>
        <Tab value="1">Header II</Tab>
        <Tab value="2">Header III</Tab>
    </TabList>
    <TabPanels>
        <TabPanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </TabPanel>
        <TabPanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
        <TabPanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </TabPanel>
    </TabPanels>
</Tabs>
```
## Scrollable [#](_tabs_.md#scrollable)

Adding _scrollable_ property displays navigational buttons at each side to scroll between tabs.
```
<Tabs value="0" scrollable>
    <TabList>
        <Tab v-for="tab in scrollableTabs" :key="tab.title" :value="tab.value">
            {{ tab.title }}
        </Tab>
    </TabList>
    <TabPanels>
        <TabPanel v-for="tab in scrollableTabs" :key="tab.content" :value="tab.value">
            <p class="m-0">{{ tab.content }}</p>
        </TabPanel>
    </TabPanels>
</Tabs>
```
## Disabled [#](_tabs_.md#disabled)

Enabling _disabled_ property of a Tab prevents user interaction.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Tabs value="0">
    <TabList>
        <Tab value="0">Header I</Tab>
        <Tab value="1">Header II</Tab>
        <Tab value="2">Header III</Tab>
        <Tab disabled>Header IV</Tab>
    </TabList>
    <TabPanels>
        <TabPanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </TabPanel>
        <TabPanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
        <TabPanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </TabPanel>
    </TabPanels>
</Tabs>
```
## Template [#](_tabs_.md#template)

Custom content for a tab is defined with the default slot. The optional _as_ property controls the default container element of a tab, for example setting it to a _div_ renders a div for the header instead of a button. The _asChild_ option enables the headless mode for further customization by passing callbacks and properties to implement your own tab header.

![](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)

Amy Elsner

![](https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png)

Onyama Limba

![](https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png)

Ioni Bowcher2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<Tabs value="0">
    <TabList>
        <Tab value="0" as="div" class="flex items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Amy Elsner</span>
        </Tab>
        <Tab value="1" as="div" class="flex items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Onyama Limba</span>
        </Tab>
        <Tab v-slot="slotProps" value="2" asChild>
            <div :class="['flex items-center gap-2', slotProps.class]" @click="slotProps.onClick" v-bind="slotProps.a11yAttrs">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
                <Badge value="2" />
            </div>
        </Tab>
    </TabList>
    <TabPanels>
        <TabPanel value="0" as="p" class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </TabPanel>
        <TabPanel value="1" as="p" class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </TabPanel>
        <TabPanel v-slot="slotProps" value="2" asChild>
            <div v-show="slotProps.active" :class="slotProps.class" v-bind="slotProps.a11yAttrs">
                <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                    culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p>
            </div>
        </TabPanel>
    </TabPanels>
</Tabs>
```
## Tab Menu [#](_tabs_.md#tabmenu)

A navigation menu is implemented using tabs without the panels where the content of a tab is provided by a route component like [router-view](https://router.vuejs.org/guide/essentials/nested-routes#Nested-Named-Routes). For the purpose of this demo, _router-view_ is not included.

Dashboard

Transactions

Products

Messages
```
<Tabs value="/dashboard">
    <TabList>
        <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
            <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                    <i :class="tab.icon" />
                    <span>{{ tab.label }}</span>
                </a>
            </router-link>
        </Tab>
    </TabList>
</Tabs>
```
## Accessibility [#](_tabs_.md#accessibility)

### Screen Reader

The tabs container in TabList is defined with the _tablist_ role, as any attribute is passed to the container element _aria-labelledby_ can be optionally used to specify an element to describe the Tabs. Each Tab has a _tab_ role along with _aria-selected_ state attribute and _aria-controls_ to refer to the corresponding TabPanel. TabPanel has _tabpanel_ role, an id to match the _aria-controls_ of Tab and _aria-labelledby_ reference to Tab as the accessible name.

### Tab Keyboard Support

Key

Function

_tab_

Moves focus through the header.

_enter_

Activates the focused tab header.

_space_

Activates the focused tab header.

_right arrow_

Moves focus to the next header. If focus is on the last header, moves focus to the first header.

_left arrow_

Moves focus to the previous header. If focus is on the first header, moves focus to the last header.

_home_

Moves focus to the last header.

_end_

Moves focus to the first header.

_pageUp_

Moves scroll position to first header.

_pageDown_

Moves scroll position to last header.