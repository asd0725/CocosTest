// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EventManager from "../../eazax-ccc/core/EventManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseLifeNode extends cc.Component {

    @property(cc.Prefab)
    private toastPre : cc.Prefab = null
    @property({displayName:'是否为常驻节点'})
    private isLifeNode : Boolean = true

    private toastNode : cc.Node = null
    onLoad () {
        if(this.isLifeNode){
            cc.game.addPersistRootNode(this.node)
        }
        EventManager.on("showToast",this.showToast,this)
    }

    private showToast(str:string):void{
        console.log("bbb");
        this.toastNode = cc.instantiate(this.toastPre)
        this.node.addChild(this.toastNode)
        this.toastNode.getChildByName('str').getComponent(cc.Label).string = str
        cc.tween(this.toastNode).by(0.5,{y:200}).call(()=>{
            this.toastNode.active = false
        }).start()
    }

    start () {

    }

    // update (dt) {}
}
