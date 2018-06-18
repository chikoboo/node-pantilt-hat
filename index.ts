import * as i2c from 'i2c-bus';

const BUS_NUMBER = 0x01;
const ADDR = 0x15;

const CONFIG = 0x00;
const REG_PAN_SERVO = 0x01;
const REG_TILT_SERVO = 0x03;

const SERVO_MIN = 575;
const SERVO_MAX = 2325;

const IDLE_TIME = 2000; // ms

export class NodePanTilt {
    private i2c: i2c.I2cBus;
    
    private servoPanState: boolean;
    private servoTiltState: boolean;

    private timerPanServo: NodeJS.Timer;
    private timerTiltServo: NodeJS.Timer;

    constructor() {
        this.i2c = i2c.openSync(BUS_NUMBER);
        this.servoPanState = false;
        this.servoTiltState = false;
    }

    public getPan() {
        this.enablePanServo();
        const pan = this.toDegrees(this.i2c.readWordSync(ADDR, REG_PAN_SERVO));
        this.disablePanServo();
        return pan;
    }

    public getTilt() {
        this.enableTiltServo();
        const tilt = this.toDegrees(this.i2c.readWordSync(ADDR, REG_TILT_SERVO));
        this.disableTiltServo();
        return tilt;
    }

    public setPan(angle: number) {
        this.enablePanServo();
        this.i2c.writeWord(ADDR, REG_PAN_SERVO, this.toServoDegrees(angle), () => this.disablePanServo());
    }

    public setTilt(angle: number) {
        this.enableTiltServo();
        this.i2c.writeWord(ADDR, REG_TILT_SERVO, this.toServoDegrees(angle), () => this.disableTiltServo());
    }

    private enablePanServo() {
        if (!this.servoPanState) {
            this.servoPanState = true;
            this.putConfig();
        }
    }

    private enableTiltServo() {
        if (!this.servoTiltState) {
            this.servoTiltState = true;
            this.putConfig();
        }
    }

    private disablePanServo() {
        this.timerPanServo = this.clearTimer(this.timerPanServo);
        this.timerPanServo = setTimeout(() => {
            this.servoPanState = false;
            this.putConfig();
        }, IDLE_TIME);
    }

    private disableTiltServo() {
        this.timerTiltServo = this.clearTimer(this.timerTiltServo);
        this.timerTiltServo = setTimeout(() => {
            this.servoTiltState = false;
            this.putConfig();
        }, IDLE_TIME);
    }

    private clearTimer(timer: NodeJS.Timer) {
        if (timer) clearTimeout(timer);
        return null
    }

    private putConfig(config = this.setUpConfig()) {
        this.i2c.writeByteSync(ADDR, CONFIG, config);
    }

    private setUpConfig() {
        let config = 0;
        config = config | Number(this.servoPanState) << 0;
        config = config | Number(this.servoTiltState) << 1;
        return config;
    }

    private toServoDegrees(degrees: number): number {
        return SERVO_MIN + Math.ceil(((SERVO_MAX - SERVO_MIN) / 180) * (degrees + 90));
    }

    private toDegrees(servoDegrees: number): number {
        return Math.round((servoDegrees - SERVO_MIN / (SERVO_MAX - SERVO_MIN)) * 180) - 90;
    }
}