// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventManager from "../../eazax-ccc/core/EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowToast {
    @property(cc.Prefab)
    private notice : cc.Prefab = null


    onLoad(){
    }

    public static showToast(str:string):void{
        console.log("aaa");
        EventManager.emit("showToast",str)
    }
}
