export declare const SERVO_MIN = 575;
export declare const SERVO_MAX = 2325;
export declare class NodePanTilt {
    private i2c;
    private servoPanState;
    private servoTiltState;
    private timerPanServo;
    private timerTiltServo;
    constructor();
    getPan(): number;
    getTilt(): number;
    setPan(angle: number): void;
    setTilt(angle: number): void;
    private enablePanServo;
    private enableTiltServo;
    private disablePanServo;
    private disableTiltServo;
    private clearTimer;
    private putConfig;
    private setUpConfig;
    toServoDegrees(degrees: number): number;
    toDegrees(servoDegrees: number): number;
}
