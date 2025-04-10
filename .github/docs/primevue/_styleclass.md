---
url: https://primevue.org/styleclass
scrapeDate: 2025-04-09T00:37:01.246Z
library: primevue

exactVersionMatch: false
---

## StyleClass

StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.

## Import [#](_styleclass_.md#import)
```
import StyleClass from 'primevue/styleclass';
app.directive('styleclass', StyleClass);
```
## Toggle Class [#](_styleclass_.md#toggleClass)

StyleClass has two modes, _toggleClass_ to simply add-remove a class and enter/leave animations.
```
<Button v-styleclass="{ selector: '@next', toggleClass: 'p-disabled' }" label="Toggle p-disabled" />
<InputText />
```
## Animation [#](_styleclass_.md#animation)

Classes to apply during enter and leave animations are specified using the _enterFromClass_, _enterActiveClass_, _enterToClass_, _leaveFromClass_, _leaveActiveClass_,_leaveToClass_properties. In addition in case the target is an overlay, _hideOnOutsideClick_ would be handy to hide the target if outside of the popup is clicked.

First example uses a custom fade animation, and second one uses animate-slide from [tailwind-primeui](_tailwind_.md#animations) plugin.
```
<div class="card flex items-center justify-center gap-8">
    <div class="flex flex-col items-center">
        <div>
            <Button v-styleclass="{ selector: '.box1', enterFromClass: 'my-hidden', enterActiveClass: 'my-fadein' }" label="FadeIn" class="mr-2" />
            <Button v-styleclass="{ selector: '.box1', leaveActiveClass: 'my-fadeout', leaveToClass: 'my-hidden' }" label="FadeOut" severity="secondary" />
        </div>
        <div class="h-32">
            <div class="my-hidden animate-duration-500 box1">
                <div class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32">Custom</div>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center">
        <div>
            <Button v-styleclass="{ selector: '.box2', enterFromClass: 'hidden', enterActiveClass: 'animate-slidedown' }" label="SlideDown" class="mr-2" />
            <Button v-styleclass="{ selector: '.box2', leaveActiveClass: 'animate-slideup', leaveToClass: 'hidden' }" label="SlideUp" severity="secondary" />
        </div>
        <div class="h-32">
            <div class="hidden animate-duration-500 box2 overflow-hidden">
                <div class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32">Content</div>
            </div>
        </div>
    </div>
</div>
```