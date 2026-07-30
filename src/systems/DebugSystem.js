export class DebugSystem{
    constructor(){
        this.showNpcFov = false;
        this.debugNodeSystemPath = false;
    }
    log(message, display){
        if (display){
            console.log(message);
        }
    }
}