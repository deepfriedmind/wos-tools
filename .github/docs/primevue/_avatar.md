---
url: https://primevue.org/avatar
scrapeDate: 2025-04-09T00:37:02.130Z
library: primevue

exactVersionMatch: false
---

## Avatar

Avatar represents people using icons, labels and images.

## Import [#](_avatar_.md#import)
```
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';   //Optional for grouping
```
## Label [#](_avatar_.md#label)

A letter Avatar is defined with the _label_ property.

##### Badge
```
<Avatar label="P" class="mr-2" size="xlarge" />
<Avatar label="V" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
<Avatar label="U" class="mr-2" style="background-color: #dee9fc; color: #1a2551" />
<Avatar label="P" class="mr-2" size="xlarge" shape="circle" />
<Avatar label="V" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
<Avatar label="U" class="mr-2" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
<OverlayBadge value="4" severity="danger" class="inline-flex">
    <Avatar label="U" size="xlarge" />
</OverlayBadge>
```
## Icon [#](_avatar_.md#icon)

A font icon is displayed as an Avatar with the _icon_ property.

##### Icon

##### Circle

##### Badge
```
<Avatar icon="pi pi-user" class="mr-2" size="xlarge" />
<Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" />
<Avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" />
<Avatar icon="pi pi-user" class="mr-2" size="xlarge" shape="circle" />
<Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
<Avatar icon="pi pi-user" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
<OverlayBadge value="4" severity="danger" class="inline-flex">
    <Avatar icon="pi pi-user" size="xlarge" />
</OverlayBadge>
```
## Image [#](_avatar_.md#image)

Use the _image_ property to display an image as an Avatar.

##### Image

![](https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png)

![](https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png)

![](https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png)

##### Badge

![](https://primefaces.org/cdn/primevue/images/organization/walter.jpg)

4

##### Gravatar

![](https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp)
```
<Avatar image="/images/avatar/amyelsner.png" class="mr-2" size="xlarge" shape="circle" />
<Avatar image="/images/avatar/asiyajavayant.png" class="mr-2" size="large" shape="circle" />
<Avatar image="/images/avatar/onyamalimba.png" shape="circle" />
<OverlayBadge value="4" severity="danger" class="inline-flex">
    <Avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" size="xlarge" />
</OverlayBadge>
<Avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" class="flex items-center justify-center mr-2" size="xlarge" />
```
## AvatarGroup [#](_avatar_.md#avatargroup)

Grouping is available by wrapping multiple Avatar components inside an AvatarGroup.
```
<AvatarGroup>
    <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
    <Avatar image="/images/avatar/asiyajavayant.png" shape="circle" />
    <Avatar image="/images/avatar/onyamalimba.png" shape="circle" />
    <Avatar image="/images/avatar/ionibowcher.png" shape="circle" />
    <Avatar image="/images/avatar/xuxuefeng.png" shape="circle" />
    <Avatar label="+2" shape="circle" />
</AvatarGroup>
```
## Accessibility [#](_avatar_.md#accessibility)

### Screen Reader

Avatar does not include any roles and attributes by default. Any attribute is passed to the root element so you may add a role like _img_ along with _aria-labelledby_ or _aria-label_ to describe the component. In case avatars need to be tabbable, _tabindex_ can be added as well to implement custom key handlers.

### Keyboard Support

Component does not include any interactive elements.