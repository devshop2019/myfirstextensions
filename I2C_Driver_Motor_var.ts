// Add your code here
enum MKL_DRIVER_I2C_MOTOR_INDEX {
    //% block="Driver 1"
    MKL_DRIVER_I2C_MOTOR_INDEX_1 = 64,
    //% block="Driver 2"
    MKL_DRIVER_I2C_MOTOR_INDEX_2,
    //% block="Driver 3"
    MKL_DRIVER_I2C_MOTOR_INDEX_3,
    //% block="Driver 4"
    MKL_DRIVER_I2C_MOTOR_INDEX_4,
    //% block="Driver 5"
    MKL_DRIVER_I2C_MOTOR_INDEX_5
}

namespace MKLModules{
    //% block="Set $motorI2C_Address_index|motor $Motor_I2C_DC_index|stop with %stopMode_"
    //% stopMode_.defl=1
    export function Set_MKL_I2C_MotorDriver_Stop2(motorI2C_Address_index: MKL_DRIVER_I2C_MOTOR_INDEX, Motor_I2C_DC_index: MKL_DRIVER_I2C_MOTOR_DC_INDEX, stopMode_: MKL_MOTOR_STOP_MODE): number {
        let tempAddr = motorI2C_Address_index;
        let tempModeID = MKL_DRIVER_I2C_MOTOR_MODE_ID.DC_ID - MKL_DRIVER_I2C_MOTOR_MODE_ID.RC_ID;
        let tempIndex = Motor_I2C_DC_index - MKL_DRIVER_I2C_MOTOR_DC_INDEX.MA;

        // mode brake
        let tempPwm = 0;
        let tempDir = MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX.backward;

        if (stopMode_ == MKL_MOTOR_STOP_MODE.noBrake) {
            tempPwm = 0;
            tempDir = MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX.forward;
        }

        SendDataTo_MKL_I2C_Driver(tempAddr, tempModeID, tempIndex, tempPwm, tempDir);

        return tempAddr;
    }
}