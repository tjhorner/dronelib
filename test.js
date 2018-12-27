// This is not a real test.
const Drone = require('./lib/Drone')

const drone = new Drone()

drone.enable()

setTimeout(() => {
  drone.takeOff()
  drone.forwardBackward = 254
}, 2000)

setTimeout(() => {
  drone.forwardBackward = 128
  drone.land()
}, 4000)