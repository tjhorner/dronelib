const dgram = require('dgram')

const COMMAND_TAKE_OFF = 0x01
const COMMAND_CALIBRATE_GYRO = 0x80
const COMMAND_UNLOCK_MOTOR = 0x40

function debug(msg) {
  if(process.env.DRONELIB_DEBUG) console.log(`[dronelib] ${msg}`)
}

class Drone {
  constructor() {
    this.enabled = false
    this.sendInterval = null
    this.socket = new dgram.createSocket("udp4")

    this.throttle = 128
    this.turn = 128
    this.forwardBackward = 128
    this.leftRight = 128
    this.currentCommand = 0
  }

  enable() {
    this.enabled = true
    this.sendInterval = setInterval(() => { this._sendMessage() }, 100)
  }

  disable() {
    this.enabled = false
    clearInterval(this.sendInterval)
    this.sendInterval = null
  }

  _buildMessage() {
    var message = [ 0x66 ]

    message.push(this.leftRight)
    message.push(this.throttle)
    message.push(this.forwardBackward)
    message.push(this.turn)
    message.push(this.currentCommand)
    
    if(this.currentCommand === 0)
      message.push(this.leftRight ^ this.throttle ^ this.forwardBackward ^ this.turn)
    else
      message.push(this.currentCommand)

    message.push(0x99)

    return Buffer.from(message)
  }

  _sendMessage() {
    this.socket.send(this._buildMessage(), 50000, "192.168.0.1")
  }

  _sendCommand(cmd) {
    // Send the command for 1 second-ish
    if(this.currentCommand === 0) {
      this.currentCommand = cmd
      setTimeout(() => { this.currentCommand = 0 }, 1000)
    }
  }

  takeOff() {
    this._sendCommand(COMMAND_TAKE_OFF)
  }

  land() {
    this._sendCommand(COMMAND_TAKE_OFF)
  }

  calibrateGyro() {
    this._sendCommand(COMMAND_CALIBRATE_GYRO)
  }

  toggleMotorLock() {
    this._sendCommand(COMMAND_UNLOCK_MOTOR)
  }
}

module.exports = Drone