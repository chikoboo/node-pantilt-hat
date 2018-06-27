import { NodePanTilt } from '../index';
import * as assert from 'power-assert';

jest.mock('i2c-bus');

const SERVO_DEGRESS_MIN = 575;
const SERVO_DEGRESS_MAX = 2325;

const DGRESS_MIN = -90;
const DGRESS_MAX = 90;

describe('NodePanTilt Test', () => {
    it("toServoDegrees", () => {
        const pantilt = new NodePanTilt();
        assert.equal(pantilt.toServoDegrees(DGRESS_MIN), SERVO_DEGRESS_MIN);
        assert.equal(pantilt.toServoDegrees(DGRESS_MAX), SERVO_DEGRESS_MAX);
    });
    it("toDegrees", () => {
        const pantilt = new NodePanTilt();
        assert.equal(pantilt.toDegrees(pantilt.toServoDegrees(DGRESS_MAX)), DGRESS_MAX);
        assert.equal(pantilt.toDegrees(pantilt.toServoDegrees(DGRESS_MIN)), DGRESS_MIN);
    });
});