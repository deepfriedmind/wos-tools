---
url: https://primevue.org/tree
scrapeDate: 2025-04-09T00:36:39.810Z
library: primevue

exactVersionMatch: false
---

## Tree

Tree is used to display hierarchical data.

## Import [#](_tree_.md#import)
```
import Tree from 'primevue/tree';
```
## Basic [#](_tree_.md#basic)

Tree component requires an array of TreeNode objects as its _value_.
```
<Tree :value="nodes" class="w-full md:w-[30rem]"></Tree>
```
## Controlled [#](_tree_.md#controlled)

Tree state can be controlled programmatically with the _expandedKeys_ property that defines the keys that are expanded. This property is a Map instance whose key is the key of a node and value is a boolean. Note that _expandedKeys_ also supports two-way binding with the v-model directive.
```
<div class="flex flex-wrap gap-2 mb-6">
    <Button type="button" icon="pi pi-plus" label="Expand All" @click="expandAll" />
    <Button type="button" icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
</div>
<Tree v-model:expandedKeys="expandedKeys" :value="nodes" class="w-full md:w-[30rem]"></Tree>
```
## Selection [#](_tree_.md#selection)

### Single [#](_tree_.md#single)

Single node selection is configured by setting _selectionMode_ as _single_ along with _selectionKeys_ property to manage the selection value binding.
```
<Tree v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="single" class="w-full md:w-[30rem]"></Tree>
```
### Multiple [#](_tree_.md#multiple)

More than one node is selectable by setting _selectionMode_ to _multiple_. By default in multiple selection mode, metaKey press (e.g. _⌘_) is not necessary to add to existing selections. When the optional _metaKeySelection_ is present, behavior is changed in a way that selecting a new node requires meta key to be present. Note that in touch enabled devices, Tree always ignores metaKey.

In multiple selection mode, value binding should be a key-value pair where key is the node key and value is a boolean to indicate selection.
```
<Tree v-model:selectionKeys="selectedKeys" :value="nodes"
    selectionMode="multiple" :metaKeySelection="checked"></Tree>
```
### Checkbox [#](_tree_.md#checkbox)

Selection of multiple nodes via checkboxes is enabled by configuring _selectionMode_ as _checkbox_.

In checkbox selection mode, value binding should be a key-value pair where key is the node key and value is an object that has _checked_ and _partialChecked_ properties to represent the checked state of a node object to indicate selection.
```
<Tree v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="checkbox" class="w-full md:w-[30rem]"></Tree>
```
## Events [#](_tree_.md#events)

An event is provided for each type of user interaction such as expand, collapse and selection.
```
<Tree v-model:selectionKeys="selectedKey" :value="nodes" selectionMode="single" :metaKeySelection="false"
    @nodeSelect="onNodeSelect" @nodeUnselect="onNodeUnselect" @nodeExpand="onNodeExpand" @nodeCollapse="onNodeCollapse" class="w-full md:w-[30rem]"></Tree>
```
## Lazy [#](_tree_.md#lazy)

Lazy loading is useful when dealing with huge datasets, in this example nodes are dynamically loaded on demand using _loading_ property and _node-expand_ method. Default value of _loadingMode_ is _mask_ and also _icon_ is available.
```
<Tree :value="nodes" @node-expand="onNodeExpand" :loading="loading" class="w-full md:w-[30rem]"></Tree>
<Tree :value="nodes2" @node-expand="onNodeExpand2" loadingMode="icon" class="w-full md:w-[30rem]"></Tree>
```
## Template [#](_tree_.md#template)

Each node can have a distinct template by matching the _type_ property to the slot name.
```
<Tree :value="nodes" class="w-full md:w-[30rem]">
    <template #default="slotProps">
        <b>{{ slotProps.node.label }}</b>
    </template>
    <template #url="slotProps">
        <a :href="slotProps.node.data">{{ slotProps.node.label }}</a>
    </template>
</Tree>
```
## Filter [#](_tree_.md#filter)

Filtering is enabled by adding the _filter_ property, by default label property of a node is used to compare against the value in the text field, in order to customize which field(s) should be used during search define _filterBy_ property. In addition _filterMode_ specifies the filtering strategy. In _lenient_ mode when the query matches a node, children of the node are not searched further as all descendants of the node are included. On the other hand, in _strict_ mode when the query matches a node, filtering continues on all descendants.
```
<Tree :value="nodes" :filter="true" filterMode="lenient" class="w-full md:w-[30rem]"></Tree>
<Tree :value="nodes" :filter="true" filterMode="strict" class="w-full md:w-[30rem]"></Tree>
```
## Accessibility [#](_tree_.md#accessibility)

### Screen Reader

Value to describe the component can either be provided with _aria-labelledby_ or _aria-label_ props. The root list element has a _tree_ role whereas each list item has a _treeitem_ role along with _aria-label_, _aria-selected_ and _aria-expanded_ attributes. In checkbox selection, _aria-checked_ is used instead of _aria-selected_. The container element of a treenode has the _group_ role. Checkbox and toggle icons are hidden from screen readers as their parent element with _treeitem_ role and attributes are used instead for readers and keyboard support. The _aria-setsize_, _aria-posinset_ and _aria-level_ attributes are calculated implicitly and added to each treeitem.

### Keyboard Support

Key

Function

_tab_

Moves focus to the first selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the next focusable element in the page tab sequence.

_shift_ + _tab_

Moves focus to the last selected node when focus enters the component, if there is none then first element receives the focus. If focus is already inside the component, moves focus to the previous focusable element in the page tab sequence.

_enter_

Selects the focused treenode.

_space_

Selects the focused treenode.

_down arrow_

Moves focus to the next treenode.

_up arrow_

Moves focus to the previous treenode.

_right arrow_

If node is closed, opens the node otherwise moves focus to the first child node.

_left arrow_

If node is open, closes the node otherwise moves focus to the parent node.