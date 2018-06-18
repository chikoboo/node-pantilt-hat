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
    private enablePanServo();
    private enableTiltServo();
    private disablePanServo();
    private disableTiltServo();
    private clearTimer(timer);
    private putConfig(config?);
    private setUpConfig();
    private toServoDegrees(degrees);
    private toDegrees(servoDegrees);
}
