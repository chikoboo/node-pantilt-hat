"use strict";
exports.__esModule = true;
var i2c = require("i2c-bus");
var BUS_NUMBER = 0x01;
var ADDR = 0x15;
var CONFIG = 0x00;
var REG_PAN_SERVO = 0x01;
var REG_TILT_SERVO = 0x03;
exports.SERVO_MIN = 575;
exports.SERVO_MAX = 2325;
var IDLE_TIME = 2000; // ms
var NodePanTilt = /** @class */ (function () {
    function NodePanTilt() {
        this.i2c = i2c.openSync(BUS_NUMBER);
        this.servoPanState = false;
        this.servoTiltState = false;
    }
    NodePanTilt.prototype.getPan = function () {
        this.enablePanServo();
        var pan = this.toDegrees(this.i2c.readWordSync(ADDR, REG_PAN_SERVO));
        this.disablePanServo();
        return pan;
    };
    NodePanTilt.prototype.getTilt = function () {
        this.enableTiltServo();
        var tilt = this.toDegrees(this.i2c.readWordSync(ADDR, REG_TILT_SERVO));
        this.disableTiltServo();
        return tilt;
    };
    NodePanTilt.prototype.setPan = function (angle) {
        var _this = this;
        this.enablePanServo();
        this.i2c.writeWord(ADDR, REG_PAN_SERVO, this.toServoDegrees(angle), function () { return _this.disablePanServo(); });
    };
    NodePanTilt.prototype.setTilt = function (angle) {
        var _this = this;
        this.enableTiltServo();
        this.i2c.writeWord(ADDR, REG_TILT_SERVO, this.toServoDegrees(angle), function () { return _this.disableTiltServo(); });
    };
    NodePanTilt.prototype.enablePanServo = function () {
        if (!this.servoPanState) {
            this.servoPanState = true;
            this.putConfig();
        }
    };
    NodePanTilt.prototype.enableTiltServo = function () {
        if (!this.servoTiltState) {
            this.servoTiltState = true;
            this.putConfig();
        }
    };
    NodePanTilt.prototype.disablePanServo = function () {
        var _this = this;
        this.timerPanServo = this.clearTimer(this.timerPanServo);
        this.timerPanServo = setTimeout(function () {
            _this.servoPanState = false;
            _this.putConfig();
        }, IDLE_TIME);
    };
    NodePanTilt.prototype.disableTiltServo = function () {
        var _this = this;
        this.timerTiltServo = this.clearTimer(this.timerTiltServo);
        this.timerTiltServo = setTimeout(function () {
            _this.servoTiltState = false;
            _this.putConfig();
        }, IDLE_TIME);
    };
    NodePanTilt.prototype.clearTimer = function (timer) {
        if (timer)
            clearTimeout(timer);
        return null;
    };
    NodePanTilt.prototype.putConfig = function (config) {
        if (config === void 0) { config = this.setUpConfig(); }
        this.i2c.writeByteSync(ADDR, CONFIG, config);
    };
    NodePanTilt.prototype.setUpConfig = function () {
        var config = 0;
        config = config | Number(this.servoPanState) << 0;
        config = config | Number(this.servoTiltState) << 1;
        return config;
    };
    NodePanTilt.prototype.toServoDegrees = function (degrees) {
        return exports.SERVO_MIN + Math.ceil(((exports.SERVO_MAX - exports.SERVO_MIN) / 180) * (degrees + 90));
    };
    NodePanTilt.prototype.toDegrees = function (servoDegrees) {
        return Math.round(((servoDegrees - exports.SERVO_MIN) / (exports.SERVO_MAX - exports.SERVO_MIN)) * 180.0) - 90;
    };
    return NodePanTilt;
}());
exports.NodePanTilt = NodePanTilt;
