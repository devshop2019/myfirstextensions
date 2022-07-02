// https://makecode.com/defining-blocks
// https://makecode.com/playground#classes
// https://fontawesome.com/search?q=mo&s=solid%2Cbrands
// https://www.youtube.com/watch?v=Ku_nHstZS64&list=PLMMBk9hE-SeqUGt71Myb1iA45w9EvqQbA&index=129

// make tutorial save on github
// https://www.youtube.com/watch?v=R-kY-dQXZvA&list=PLMMBk9hE-SeqUGt71Myb1iA45w9EvqQbA&index=127

// Qui uoc viet extension
// https://makecode.com/extensions/naming-conventions

// enum MKL_DRIVER_I2C_MOTOR_INDEX{
//     //% block="Driver 1"
//     MKL_DRIVER_I2C_MOTOR_INDEX_1 = 64,
//     //% block="Driver 2"
//     MKL_DRIVER_I2C_MOTOR_INDEX_2,
//     //% block="Driver 3"
//     MKL_DRIVER_I2C_MOTOR_INDEX_3,
//     //% block="Driver 4"
//     MKL_DRIVER_I2C_MOTOR_INDEX_4,
//     //% block="Driver 5"
//     MKL_DRIVER_I2C_MOTOR_INDEX_5
// }

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

enum MKL_MOTOR_STOP_MODE{
    //% block="no brake"
    noBrake,
    //% block="brake"
    brake
}

//icon 19d hat, 3c4 magento
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

//% color="#ff5511" icon="\uf085"
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
        let tempAddr = motorI2C_Address_index;
        let tempModeID = MKL_DRIVER_I2C_MOTOR_MODE_ID.DC_ID - MKL_DRIVER_I2C_MOTOR_MODE_ID.RC_ID;
        let tempIndex = Motor_I2C_DC_index - MKL_DRIVER_I2C_MOTOR_DC_INDEX.MA;
        let tempPwm = (speed&0xff)*255/100;
        let tempDir = Motor_I2C_DC_dir_index - MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX.forward;

        
        SendDataTo_MKL_I2C_Driver(tempAddr, tempModeID,tempIndex,tempPwm,tempDir);

        // let i2cData = pins.createBuffer(MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE);

        // i2cData[0] = tempAddr;
        // i2cData[1] = tempModeID;
        // i2cData[2] = tempIndex;
        // i2cData[3] = tempPwm;
        // i2cData[4] = tempDir;
        
        // i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = 0;
        // for (let cf = 0; cf < MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1; cf++){
        //     i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] += i2cData[cf];
        // }
        // i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] & 0xff;

        return tempAddr;
    }

    //% block="Set $motorI2C_Address_index|motor $Motor_I2C_DC_index|stop with %stopMode_"
    export function Set_MKL_I2C_MotorDriver_Stop(motorI2C_Address_index: MKL_DRIVER_I2C_MOTOR_INDEX, Motor_I2C_DC_index: MKL_DRIVER_I2C_MOTOR_DC_INDEX, stopMode_:MKL_MOTOR_STOP_MODE): number {
        let tempAddr = motorI2C_Address_index;
        let tempModeID = MKL_DRIVER_I2C_MOTOR_MODE_ID.DC_ID - MKL_DRIVER_I2C_MOTOR_MODE_ID.RC_ID;
        let tempIndex = Motor_I2C_DC_index - MKL_DRIVER_I2C_MOTOR_DC_INDEX.MA;

        // mode brake
        let tempPwm = 0;
        let tempDir = MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX.backward;

        if(stopMode_ == MKL_MOTOR_STOP_MODE.noBrake){
            tempPwm = 0;
            tempDir = MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX.forward;
        }

        SendDataTo_MKL_I2C_Driver(tempAddr, tempModeID, tempIndex, tempPwm, tempDir);

        return tempAddr;
    }

    export function SendDataTo_MKL_I2C_Driver(_address_:number, _modeID_:number, _index_:number, _pwm_:number, _dir_:number):void{
        let i2cData = pins.createBuffer(MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE);

        i2cData[0] = _address_;
        i2cData[1] = _modeID_;
        i2cData[2] = _index_;
        i2cData[3] = _pwm_;
        i2cData[4] = _dir_;

        // serial.writeNumber(0)
        // serial.writeLine(" Start send i2cData")

        i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = 0;
        for (let cf = 0; cf < MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1; cf++) {
            i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] += i2cData[cf];
            // serial.writeNumber(i2cData[cf])
            // serial.writeLine("")
        }
        i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] & 0xff;
        // serial.writeNumber(i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1])
        // serial.writeLine(" END")
        pins.i2cWriteBuffer(_address_, i2cData, false);
    }

    //% block="Get address Driver I2C"
    export function scan_I2C_Driver_Address():number{
        for (let cf = MKL_DRIVER_I2C_MOTOR_INDEX.MKL_DRIVER_I2C_MOTOR_INDEX_1; cf < (MKL_DRIVER_I2C_MOTOR_INDEX.MKL_DRIVER_I2C_MOTOR_INDEX_1 + MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE -1); cf++){
            let tempValue = pins.i2cReadNumber(cf, NumberFormat.Int8LE, false);
            if(tempValue != 0) return cf;
        }
        return 0;
    }
}

//% color="#ff55ff" icon="\uf085"
//% groups='["Basic","Advanced","Special","Ultrasonic","Line Sensor","5x5 Matrix","BitFace","OLED 128x64"]'
namespace MakerEdu_vn {
    let MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE = 6

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

    /**
     * Run DC motor with 
     */
    //% blockId=Set_MKL_I2C_MotorDriver_blockID
    //% block="Set $motorI2C_Address_index|motor $Motor_I2C_DC_index|go %Motor_I2C_DC_dir_index|with speed $speed"
    //% speed.min=0 speed.max=100
    export function Set_MKL_I2C_MotorDriver(motorI2C_Address_index: MKL_DRIVER_I2C_MOTOR_INDEX, Motor_I2C_DC_index: MKL_DRIVER_I2C_MOTOR_DC_INDEX, Motor_I2C_DC_dir_index: MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX, speed: number): number {
        let tempAddr = motorI2C_Address_index;
        let tempModeID = MKL_DRIVER_I2C_MOTOR_MODE_ID.DC_ID - MKL_DRIVER_I2C_MOTOR_MODE_ID.RC_ID;
        let tempIndex = Motor_I2C_DC_index - MKL_DRIVER_I2C_MOTOR_DC_INDEX.MA;
        let tempPwm = (speed & 0xff) * 255 / 100;
        let tempDir = Motor_I2C_DC_dir_index - MKL_DRIVER_I2C_MOTOR_DC_DIR_INDEX.forward;


        SendDataTo_MKL_I2C_Driver(tempAddr, tempModeID, tempIndex, tempPwm, tempDir);

        // let i2cData = pins.createBuffer(MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE);

        // i2cData[0] = tempAddr;
        // i2cData[1] = tempModeID;
        // i2cData[2] = tempIndex;
        // i2cData[3] = tempPwm;
        // i2cData[4] = tempDir;

        // i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = 0;
        // for (let cf = 0; cf < MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1; cf++){
        //     i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] += i2cData[cf];
        // }
        // i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] & 0xff;

        return tempAddr;
    }

    //% block="Stop $motorI2C_Address_index|motor $Motor_I2C_DC_index|with %stopMode_"
    export function Set_MKL_I2C_MotorDriver_Stop(motorI2C_Address_index: MKL_DRIVER_I2C_MOTOR_INDEX, Motor_I2C_DC_index: MKL_DRIVER_I2C_MOTOR_DC_INDEX, stopMode_: MKL_MOTOR_STOP_MODE): void {
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

        // return tempAddr;
    }

    export function SendDataTo_MKL_I2C_Driver(_address_: number, _modeID_: number, _index_: number, _pwm_: number, _dir_: number): void {
        let i2cData = pins.createBuffer(MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE);

        i2cData[0] = _address_;
        i2cData[1] = _modeID_;
        i2cData[2] = _index_;
        i2cData[3] = _pwm_;
        i2cData[4] = _dir_;

        // serial.writeNumber(0)
        // serial.writeLine(" Start send i2cData")

        i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = 0;
        for (let cf = 0; cf < MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1; cf++) {
            i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] += i2cData[cf];
            // serial.writeNumber(i2cData[cf])
            // serial.writeLine("")
        }
        i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] = i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1] & 0xff;
        // serial.writeNumber(i2cData[MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1])
        // serial.writeLine(" END")
        pins.i2cWriteBuffer(_address_, i2cData, false);
    }

    //% block="Get address Driver I2C"
    export function scan_I2C_Driver_Address(): number {
        for (let cf = MKL_DRIVER_I2C_MOTOR_INDEX.MKL_DRIVER_I2C_MOTOR_INDEX_1; cf < (MKL_DRIVER_I2C_MOTOR_INDEX.MKL_DRIVER_I2C_MOTOR_INDEX_1 + MKL_DRIVER_I2C_MOTOR_MAX_BUFFER_SIZE - 1); cf++) {
            let tempValue = pins.i2cReadNumber(cf, NumberFormat.Int8LE, false);
            if (tempValue != 0) return cf;
        }
        return 0;
    }
}