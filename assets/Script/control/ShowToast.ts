// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShowToast extends cc.Component {
    @property(cc.Prefab)
    private notice : cc.Prefab = null

    public showToast(node:cc.Node,str:string):void{
        let toast = cc.instantiate(this.notice);
        toast.getChildByName('str').getComponent(cc.Label).string = str
        node.addChild(toast)
    }

}
