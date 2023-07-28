# Channel HTML 3D Product Viewer

## Getting Started
Before you add any code to website, be sure to add our included assets.

1. Copy `assets/` and `scripts/` folders from package to working project folder.

There are multiple ways to integrate the 3D viewer into your project. Depending on your desired setup, please see either the Standard or the other Advanced setup options below. 

## Setup: Standard
Our Standard setup assumes you'd like to have the entire 3D Producer Viewer experience injected into your website. This method will add a basic button and container to your page. Clicking the button will trigger the experience.

1. Add script references in HTML - ensure paths are accurate to where the folders are.

```
<script defer src="scripts/apple360spin.js"></script>
```

2. Create and dispatch initializing event in JS.
```
<script>
  // Create an instance
  const init3D = new CustomEvent('channel-html:3djs:init');
  ...
  window.addEventListener('DOMContentLoaded', () => {
      window.dispatchEvent(init3D);
  });
</script>
``` 

## Setup: Advanced

### **Option 1: Script + Custom Container** 
1. Start with 'Setup: Standard' (see above).
2. Add a custom container `<div>` to the page with the appropriate target class `apple360spin-container`. Use the `data-3d-config` attribute to override default properties. For configuration options see 'Configuration Options' below.
  ```
  <div class="apple360spin-container" data-3d-config='{...}'></div>
  ```

### **Option 2: Script + Custom Button**
1. Start with 'Setup: Standard' (see above).
2. Add a custom `<button>` to the page with the appropriate target ID `apple360spin`. Update the data attributes to override texture, model, and SVG paths. For configuration options see 'Configuration Options' below.
  ```
  <button id="apple360spin" data-textures-path="..." data-models-path="..." data-svg-path="...">custom entry</button>
  ```

### **Option 3: Script + Custom Container & Button**
1. Start with 'Setup: Standard' (see above).
2. Add a custom container `<div>` to the page with the appropriate target class `apple360spin-container`. Use the `data-3d-config` attribute to override default properties. For configuration options see 'Configuration Options' below.
3. Add a custom `<button>` to the page with the appropriate target ID `apple360spin`.
  ```
  <div class="apple360spin-container" data-3d-config='{...}'>
    <button id="apple360spin">custom entry</button>
  </div>
  ```

### **Option 4: Inject and Initialize 3D Viewer with Custom Configuration**
1. Optional: Start with 'Setup: Standard' (see above). Alternatively, you can inject our script with JS (see below example).
2. Add the following JS to your page scripts:
  ```
  __helper.inject('launch_apple', "https://my/dam/scripts/apple360spin.js", vName, 'script', 'defer').then(() => {
    // Code to execute after the apple360spin.js is loaded

    ///////////////////////////////////////////////////////////////////
    // OPTIONAL: Override Configuration Options
    ///////////////////////////////////////////////////////////////////
    __360_SPIN_PLAYER__.pathTextures = 'https://my/DAM/apple360/assets/textures/'
    __360_SPIN_PLAYER__.pathModels = 'https://my/DAM/apple360/assets/models/'
    __360_SPIN_PLAYER__.svgPath = 'https://my/DAM/apple360/assets/'

    ///////////////////////////////////////////////////////////////////
    // OPTIONAL: Add custom container to the HTML
    ///////////////////////////////////////////////////////////////////
    const container = document.createElement('div');
    container.className = 'apple360spin-container';
    container.setAttribute('data-3d-config', JSON.stringify({
      // Custom configuration properties
    }));

    ///////////////////////////////////////////////////////////////////
    // OPTIONAL: Add custom button to the custom container
    ///////////////////////////////////////////////////////////////////
    const button = document.createElement('button');
    button.id = 'apple360spin';
    button.setAttribute('aria-label', 'show 3d view for <device>');
    button.setAttribute('data-textures-path', 'assets/textures/');
    button.setAttribute('data-models-path', 'assets/models/');
    button.setAttribute('data-svg-path', 'assets/example/rotate.svg');
    button.textContent = 'custom entry';

    container.appendChild(button);

    ///////////////////////////////////////////////////////////////////
    // OPTIONAL: Append the custom container to the desired location in your HTML
    ///////////////////////////////////////////////////////////////////
    const targetElement = document.querySelector('#your-target-element');
    targetElement.appendChild(container);

    // Initialize the 3D viewer
    const init3d = new CustomEvent('channel-html:3djs:init');
    window.addEventListener('DOMContentLoaded', () => {
      window.dispatchEvent(init3d);
    });
  });
  ``` 

## Configuration Options
Depending on your chosen setup, you have the option to configure the player on the fly. 

### Using a custom container
If you're using a custom container for our player, the `data-3d-config` can be used to overwrite the properties listed below.
```
<div
  class="apple360spin-container"
  data-3d-config='{
    "axDeviceName": "",
    "containerClass": "apple360spin-container",
    "pathTextures": "assets/textures/",
    "pathModels": "assets/models/",
    "svgPath": "assets/rotate.svg",
    "modalData": {
      "isModal": true,
      "customModalEntryID": "apple360Spin",
      "defaultModalEntryText": ""
    },
    "modelFileData": [{}],
    "iblFilename": "ibl.hdr",
    "actionPromptDesktop": "Drag or use keyboard to rotate",
    "actionPromptMobile": "Swipe to rotate"
  }'
></div>
```
> **Note:** The `data-3d-config` object will need to be minified in HTML (see 'Example HTML Implementation').

### Adding a custom Model Entry Button
If you're using a custom button for our player, the following 3 optional data attributes can be used to override asset paths: `data-textures-path`, `data-models-path`, `data-svg-path`. Be sure `id="apple360Spin"` is used (unless overwritten by the container). 
```
<button
  id="apple360Spin"
  aria-label="Show 3D view for <device>"
  data-textures-path="assets/textures/"
  data-models-path="assets/models/"
  data-svg-path="assets/example/rotate.svg"
>
  Custom Entry
</button>
```
> **Note:** 
> - If a custom container is used this button should be placed inside it.
> - If you're using both a custom container and a custom button, only the container configuration `data-3d-config` is necessary.


## Example HTML Implementation

 - `EXAMPLE CUSTOM BUTTON ENTRY` shows how some parameters of the config can be overridden.
 - `EXAMPLE CUSTOM CONTAINER` show how the entire config can be overridden

```html
    <!--- EXAMPLE CUSTOM BUTTON ENTRY -->
    <!--
    <button
      id="apple360Spin"
      aria-label="Show 3D view for <device>"
      data-textures-path="assets/textures/"
      data-models-path="assets/models/"
      data-svg-path="assets/example/rotate.svg"
    >
      Custom Entry
    </button>
    -->

    <!-- EXAMPLE CUSTOM CONTAINER -->
    <div
      class="apple360spin-container"
      style="
        height: calc(100vh - 80px);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
      data-3d-config='{"axDeviceName":"iPhone 13 Pro Max","pathTextures":"assets/textures/","pathModels":"assets/models/","containerClass":"apple360spin-container","svgPath": "assets/rotate.svg","modalData":{"isModal":true,"customModalEntryID":"apple360Spin","defaultModalEntryText":""},"modelFileData":[{"label":"Alpine Green","labelName":"Alpine Green","color":"#576856","filename":"iPhone13_ProMax_5G_AlpineGreen.gltf","index":0},{"label":"Silver","labelName":"Silver","color":"#F1F2ED","filename":"iPhone13_ProMax_5G_Silver.gltf","index":1},{"label":"Gold","labelName":"Gold","color":"#FAE7CF","filename":"iPhone13_ProMax_5G_Gold.gltf","index":2},{"label":"Graphite","labelName":"Graphite","color":"#54524F","filename":"iPhone13_ProMax_5G_Graphite.gltf","index":3},{"label":"Sierra Blue","labelName":"(Sierra)Blue","color":"#A7C1D9","filename":"iPhone13_ProMax_5G_SierraBlue.gltf","index":4}],"iblFilename":"","actionPromptDesktop":"Drag to rotate","actionPromptMobile":"Swipe to rotate"}'
    ></div>
```


## Lifecycle Events Usage
### init
```
const init3D = new CustomEvent('channel-html:3djs:init');
window.dispatchEvent(init3D);
```
### destroy
```
const destroy3D = new CustomEvent('channel-html:3djs:destroy');
window.dispatchEvent(destroy3D);
```
### reset
```
const reset3D = new CustomEvent('channel-html:3djs:reset');
window.dispatchEvent(reset3D);
```
## Analytics Measurement

The 3d Product Viewer ships with rich analytics tracking various interactions from the end-user.

### Usage:
```
window.addEventListener('3dpv:event', (event) => {
    console.log('e', event.detail);
})
```

### The full list of events is as follows:
- `load:start` : denoting the moment the player becomes active
- `click:start-rotation` : the moment a user performs a mousedown action on the 3d model
- `click:end-rotation` : the moment a user performs a mouaseup action on the model
- `click:modal-open` : emitted when the modal is opened
- `click:modal-close` : emitted when the modal is opened
- `click:swatch:{color}` : emitted when a swatch is clicked

Each measurement broadcast reports the time between previous and current event,
as well as a payload containing the Event type proxied through the `event.detail` object.

#### Example:

```
// event.detail
{
     diff: 6
     key: "load:start"
     payload: {event: Quaternion}
     time: 1657833514597
}
```

## Accessibility Features

### Keyboard Interaction
- When the left or right arrow keys are pressed the product moves 15° on the X-axis in the direction pressed
- When the up and down arrow keys are pressed the product moves 15° on the Y-axis in the direction pressed

### Screen Reader
- Aria-labels and legend provided for the close button and colornav section
- Screen reader announcements for change of product angle
- Hide the `Drag to rotate` from the screen reader when the CTA disappears

### Reduced Motion
The opening of the modal is disabled when users with the reduced motion feature turned on.