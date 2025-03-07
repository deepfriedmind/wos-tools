interface Navigator {
  readonly virtualKeyboard?: VirtualKeyboard
}

interface VirtualKeyboard extends EventTarget {
  addEventListener: (type: 'geometrychange', listener: (event: VirtualKeyboardGeometryChangeEvent) => void, options?: AddEventListenerOptions | boolean) => void
  readonly boundingRect: DOMRect
  overlaysContent: boolean
  removeEventListener: (type: 'geometrychange', listener: (event: VirtualKeyboardGeometryChangeEvent) => void, options?: boolean | EventListenerOptions) => void
}

interface VirtualKeyboardGeometryChangeEvent extends Event {
  readonly boundingRect: DOMRect
}
