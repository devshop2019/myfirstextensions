// https://makecode.com/defining-blocks
// https://makecode.com/playground#classes
// https://fontawesome.com/search?q=mo&s=solid%2Cbrands

enum MKL_DRIVER_I2C_MOTOR_INDEX{
    //% block="Driver 1"
    MKL_DRIVER_I2C_MOTOR_INDEX_1,
    //% block="Driver 2"
    MKL_DRIVER_I2C_MOTOR_INDEX_2,
    //% block="Driver 3"
    MKL_DRIVER_I2C_MOTOR_INDEX_3,
    //% block="Driver 4"
    MKL_DRIVER_I2C_MOTOR_INDEX_4,
    //% block="Driver 5"
    MKL_DRIVER_I2C_MOTOR_INDEX_5
}

enum MKL_DRIVER_I2C_MOTOR_DC_INDEX{
    //% block="MA"
    MA,
    //% block="MB"
    MB
}

enum MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX{
    forward,
    backward
}

enum MKL_DRIVER_I2C_MOTOR_MODE_ID{
    RC_ID,
    DC_ID,
    SADDR_ID,
    END_MODE_ID
}

//% color="#ff0000" icon="\uf085"
namespace screenMagic{
    /**
     * Address LEDs linearly row first
     */
    //% blockId=screenMagicplotat
    //% block="plot at %index"
    //% index.min=0 index.max=25
    export function plotAt(index:number):void{
        index |=0;
        const y = Math.floor(index / 5);
        const x = Math.floor(index % 5);
        led.plot(x, y)
    }
}

//% color="#ff55ff" icon="\uf085"
//% groups="['I2C Motor Driver', 'Led', 'Button]"
namespace MKLModules {
    let MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE = 6
    /**
     * Address LEDs linearly row first
     */
    //% blockId=screenMagicplotat
    //% block="plot at %index"
    //% index.min=0 index.max=25
    //% group="I2C Motor Driver"
    //% subcategory=Driver
    export function plotAt(index: number): void {
        index |= 0;
        const y = Math.floor(index / 5);
        const x = Math.floor(index % 5);
        led.plot(x, y)
    }

    /**
     * Address LEDs linearly row first
     */
    //% blockId=Write_I2C_Bufer
    //% block="Write_I2C_Bufer at %Address"
    //% index.min=0 index.max=25
    //% group="I2C Motor Driver"
    //% subcategory=Driver
    export function Write_I2C_Bufer(Address: number): void {
        let i2cData = pins.createBuffer(6);

        i2cData[0] = 49;	// address MSB
        i2cData[1] = 50;	// address LSB
        i2cData[2] = 51;
        pins.i2cWriteBuffer(Address, i2cData, false);
    }

    //% block="Set $motorI2C_Address_index|motor $Motor_I2C_DC_index|go %Motor_I2C_DC_dir_index|with speed $speed"
    //% speed.min=0 speed.max=100
    export function Set_MKL_I2C_MotorDriver(motorI2C_Address_index: MKL_DRIVER_I2C_MOTOR_INDEX, Motor_I2C_DC_index: MKL_DRIVER_I2C_MOTOR_DC_INDEX, Motor_I2C_DC_dir_index:MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX, speed: number): number{
        let tempAddr = motorI2C_Address_index - MKL_DRIVER_I2C_MOTOR_INDEX.MKL_DRIVER_I2C_MOTOR_INDEX_1;
        let tempModeID = MKL_DRIVER_I2C_MOTOR_MODE_ID.DC_ID - MKL_DRIVER_I2C_MOTOR_MODE_ID.RC_ID;
        let tempIndex = 0;
        let tempPwm = 0;
        let tempDir = 0;

        
        let i2cData = pins.createBuffer(MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE)

        i2cData[0] = 0;
        
        i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = 0;
        for (let cf = 0; cf < MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1; cf++){
            i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] += i2cData[cf]
        }
        return tempAddr;
    }
}