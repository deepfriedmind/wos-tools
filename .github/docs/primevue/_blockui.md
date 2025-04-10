---
url: https://primevue.org/blockui
scrapeDate: 2025-04-09T00:37:01.944Z
library: primevue

exactVersionMatch: false
---

## BlockUI

BlockUI can either block other components or the whole page.

## Import [#](_blockui_.md#import)
```
import BlockUI from 'primevue/blockui';
```
## Basic [#](_blockui_.md#basic)

The element to block should be placed as a child of BlockUI and _blocked_ property is required to control the state.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```
<div class="mb-4">
    <Button label="Block" @click="blocked = true" class="mr-2"></Button>
    <Button label="Unblock" @click="blocked = false"></Button>
</div>
<BlockUI :blocked="blocked">
    <Panel header="Basic">
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Panel>
</BlockUI>
```
## Document [#](_blockui_.md#document)

Enabling _fullScreen_ property controls the document.
```
<BlockUI :blocked="blocked" fullScreen />
<Button label="Block" @click="blocked = true" />
```
## Accessibility [#](_blockui_.md#accessibility)

### Screen Reader

BlockUI manages _aria-busy_ state attribute when the UI gets blocked and unblocked. Any valid attribute is passed to the root element so additional attributes like _role_ and _aria-live_ can be used to define live regions.

### Keyboard Support

Component does not include any interactive elements.