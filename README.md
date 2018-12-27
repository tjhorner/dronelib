# dronelib

Control Chinese drones with Node.js.

I tested this on a "Propel Ultra-X + WiFi", but it should work on any similar model.

## Features

- Move your drone (throttle, direction, turning)
- Auto take-off
- Calibrate gyro
- Unlock motor

## Example

First, make sure you are connected to your drone's AP.

```javascript
const { Drone } = require('dronelib')

const drone = new Drone()

// Enabling will start sending commands to your drone
// and the lights on it should stop blinking
drone.enable()

// Take flight!
drone.takeOff()
```

## Fields

### `throttle`

This is the current throttle of the drone. It ranges from 0-254. Equivalent to pushing the left stick up or down.

Set it below 128 to make it go down, set it above 128 to make it go up.

```javascript
// FULL THROTTLE!
drone.throttle = 254
```

### `turn`

The current turn value of the drone. It ranges from 0-254. Equivalent to pushing the left stick left or right.

Set it below 128 to make it turn left, set it above 128 to make it turn right.

```javascript
// Spin left!
drone.turn = 0
```

### `forwardBackward`

The current forward/backward direction value of the drone. It ranges from 0-254. Equivalent to pushing the right stick up or down.

Set it below 128 to make it go forward, set it above 128 to make it go backward.

```javascript
// I hope it doesn't run into any trees
drone.forwardBackward = 254
```

### `leftRight`

The current left/right direction value of the drone. It ranges from 0-254. Equivalent to pushing the right stick left or right.

Set it below 128 to make it go left, set it above 128 to make it go right.

```javascript
// Moves the drone slightly left
drone.leftRight = 100
```

### `currentCommand`

The command that is currently being sent to the drone. You probably shouldn't touch this directly, and instead use one of the provided command methods.

## Methods

### `enable()`

Use this method to start sending commands to the drone. While enabled, this library will send a message to the drone every 100ms. This is how the drone knows it hasn't disconnected from the client.

### `disable()`

Use this method to stop sending commands to the drone.

### `takeOff()`

Take flight! This is equivalent to pressing the "Auto Take-Off/Land" button.

### `land()`

Fall with style! This is equivalent to pressing the "Auto Take-Off/Land" button.

### `calibrateGyro()`

Calibrate the drone's gyro. The user should put the drone on a flat surface before this is called.

### `toggleMotorLock()`

Toggle the drone's motor lock. This enables/disables the altitude lock. There's no way to programmatically determine whether it is enabled or disabled.

## License

This project is licensed under the GNU GPL v3.