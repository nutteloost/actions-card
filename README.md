# Actions Card
[![Github All Releases](https://img.shields.io/github/downloads/nutteloost/actions-card/total.svg)]()
[![Buy me a beer](https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/nutteloost)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![Reddit Profile](https://img.shields.io/badge/Reddit-My%20stuff-orange?logo=reddit)](https://www.reddit.com/user/nutteloost/submitted/)
[![Home Assistant Community Forum](https://img.shields.io/badge/Home%20Assistant-Community%20Forum-blue?logo=home-assistant)](https://community.home-assistant.io/t/simple-swipe-card-a-custom-card-for-easy-card-navigation/888415)

A custom card that wraps another card and adds tap, hold, and double tap actions.

<img src="https://raw.githubusercontent.com/nutteloost/actions-card/main/images/actions-card-example.png" width="750">

Actions Card is a wrapper for any Home Assistant card that adds interactive functionality through tap, hold, and double-tap actions. This allows you to transform any standard or custom card into an interactive element without modifying the original card. With Actions Card, you can navigate to different views, toggle entities, call services, open URLs, and more - all from cards that normally don't support these interactions.

## Features
- Add tap, hold, and double-tap actions to any card
- Multiple action types:
  - Toggle entities
  - Navigate to other views
  - Open URLs
  - Call services
  - Show more-info dialogs
  - Open the Assist dialog
  - Fire custom DOM events
- Confirmation dialogs for actions
- Configurable hold time
- Option to prevent default entity dialogs
- Visual editor support with card picker
- Works with both standard and custom cards

## Installation

### HACS (Recommended)
1. Open HACS
2. Search for "Actions Card" and install it

Or click this button to open the repository page in HACS:

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=actions-card&category=integration&owner=nutteloost)

### HACS (Manual)
1. Open HACS
2. Click on the three dots in the top right corner
3. Select "Custom repositories"
4. Add this repository URL (https://github.com/nutteloost/actions-card)
5. Click "Add"
6. Search for "Actions Card" and install it

### Manual Installation
1. Download `actions-card.js` from the latest release
2. Copy it to `config/www/actions-card/actions-card.js`
3. Add the following to your configuration.yaml:
   ```yaml
   lovelace:
     resources:
       - url: /local/actions-card/actions-card.js
         type: module
    ```
4. Restart Home Assistant

## Visual Editor

The Actions Card includes a visual editor that appears when you add or edit the card through the Home Assistant UI. Features include:
- Card picker to select the card to wrap
- Configurable action options for tap, hold, and double-tap
- Entity selection for toggle and more-info actions
- Service configuration with YAML editor
- Confirmation dialog options
- Hold time adjustment

#### Search for 'Actions Card'
<img src="https://raw.githubusercontent.com/nutteloost/actions-card/main/images/visual_editor_search.png" width="250">

#### Search for the card you want to wrap in the card picker and add it
<img src="https://raw.githubusercontent.com/nutteloost/actions-card/main/images/card-picker.png" width="350">

#### Edit the card and add actions
<img src="https://raw.githubusercontent.com/nutteloost/actions-card/main/images/visual_editor_card_editor.png" width="750">

## Configuration
This card can be configured using the visual editor or YAML.

### Options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| card | object | Required | The card configuration to wrap |
| tap_action | object | `{ action: 'none' }` | Action to perform on tap |
| hold_action | object | `{ action: 'none' }` | Action to perform on hold |
| double_tap_action | object | `{ action: 'none' }` | Action to perform on double tap |
| prevent_default_dialog | boolean | false | Prevent the default entity dialog from opening |

### Prevent Default Dialog Option

The `prevent_default_dialog` option, when enabled, prevents Home Assistant from showing its standard entity information dialog when the wrapped card is interacted with. This is particularly useful when you've configured custom actions on the card and want to ensure they execute without the system's default dialog appearing. For example, if you've set up a tap action to navigate to another view, enabling this option will prevent the entity dialog from opening first, resulting in a smoother user experience.

### Action Options
Each action (tap_action, hold_action, double_tap_action) can use these configurations:

#### Toggle Action
```yaml
action: toggle
entity: light.living_room  # Optional - will use the entity from the wrapped card if not specified
``` 

#### Navigate action
```yaml
action: navigate
navigation_path: /lovelace/0
navigation_replace: false  # Optional - replace or push state to history
```

#### URL Action
```yaml
action: url
url_path: https://www.home-assistant.io
target: _blank  # Optional - _blank or _self
```

#### Call Service Action
```yaml
action: call-service
service: light.turn_on
service_data:
  entity_id: light.living_room
  brightness: 255
```

#### More Info Action
```yaml
action: more-info
entity: light.living_room  # Optional - will use the entity from the wrapped card if not specified
```

#### Assist Action
```yaml
action: assist
pipeline_id: last_used  # Optional
start_listening: true   # Optional
```

#### Fire DOM Event Action
```yaml
action: fire-dom-event
event_type: custom-event
event_data:  # Optional
  example: value
```

#### Confirmation Dialog
You can add a confirmation dialog to any action:
```yaml
confirmation: Are you sure?  # Simple string confirmation
```

Or with more options: 

```yaml
confirmation:
  text: Are you sure you want to proceed?
  title: Confirmation  # Optional
  confirm_text: Yes    # Optional (default: Confirm)
  dismiss_text: No     # Optional (default: Cancel)
```

#### Hold Time
Customize the hold time for hold actions (default is 500ms):

```yaml
hold_action:
  action: toggle
  entity: light.living_room
  hold_time: 700  # Time in milliseconds
```

### Example Configuration
```yaml
type: custom:actions-card
card:
  type: entities
  title: Lights
  entities:
    - light.living_room
    - light.kitchen
    - light.bedroom
tap_action:
  action: toggle
hold_action:
  action: more-info
  confirmation: Are you sure you want to see more info?
double_tap_action:
  action: navigate
  navigation_path: /lovelace/lights
prevent_default_dialog: true
```

## My Other Custom Cards

Check out my other custom cards for Home Assistant:

* [Todo Swipe Card](https://github.com/nutteloost/todo-swipe-card) - A specialized swipe card for todo lists in Home Assistant with custom styling
* [Simple Swipe Card](https://github.com/nutteloost/simple-swipe-card) - A swipeable container card for Home Assistant that allows you to add multiple cards and swipe between them

Enjoying my cards? Consider donating a beer (or two)! It will keep me going. 

[![Buy me a beer](https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee)](https://www.buymeacoffee.com/nutteloost)
