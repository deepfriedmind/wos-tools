---
url: https://primevue.org/splitter
scrapeDate: 2025-04-09T00:36:51.670Z
library: primevue

exactVersionMatch: false
---

## Splitter

Splitter is utilized to separate and resize panels.

## Import [#](_splitter_.md#import)
```
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
```
## Horizontal [#](_splitter_.md#horizontal)

Splitter requires two SplitterPanel components as children which are displayed horizontally by default.
```
<Splitter style="height: 300px" class="mb-8">
    <SplitterPanel class="flex items-center justify-center"> Panel 1 </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center"> Panel 2 </SplitterPanel>
</Splitter>
```
## Size [#](_splitter_.md#size)

Initial dimension of a panel is percentage based and defined using the _size_ property. In addition,_minSize_ is provided to set a minimum value during a resize.
```
<Splitter style="height: 300px">
    <SplitterPanel class="flex items-center justify-center" :size="25" :minSize="10"> Panel 1 </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center" :size="75"> Panel 2 </SplitterPanel>
</Splitter>
```
## Vertical [#](_splitter_.md#vertical)

Panels are displayed as stacked by setting the _layout_ to _vertical_.
```
<Splitter style="height: 300px" layout="vertical">
    <SplitterPanel class="flex items-center justify-center"> Panel 1 </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center"> Panel 2 </SplitterPanel>
</Splitter>
```
## Nested [#](_splitter_.md#nested)

Splitters can be combined to create advanced layouts.
```
<Splitter style="height: 300px">
    <SplitterPanel class="flex items-center justify-center" :size="20" :minSize="10"> Panel 1 </SplitterPanel>
    <SplitterPanel :size="80">
        <Splitter layout="vertical">
            <SplitterPanel class="flex items-center justify-center" :size="15"> Panel 2 </SplitterPanel>
            <SplitterPanel :size="85">
                <Splitter>
                    <SplitterPanel class="flex items-center justify-center" :size="20"> Panel 3 </SplitterPanel>
                    <SplitterPanel class="flex items-center justify-center" :size="80"> Panel 4 </SplitterPanel>
                </Splitter>
            </SplitterPanel>
        </Splitter>
    </SplitterPanel>
</Splitter>
```
## Accessibility [#](_splitter_.md#accessibility)

### Screen Reader

Splitter bar defines _separator_ as the role with _aria-orientation_ set to either horizontal or vertical.

### Keyboard Support

Key

Function

_tab_

Moves focus through the splitter bar.

_down arrow_

Moves a vertical splitter down.

_up arrow_

Moves a vertical splitter up.

_left arrow_

Moves a horizontal splitter to the left.

_right arrow_

Moves a horizontal splitter to the right.