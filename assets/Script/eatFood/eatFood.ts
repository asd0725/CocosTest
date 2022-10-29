// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MathUtil from "../../eazax-ccc/utils/MathUtil";
import ShowToast from "../control/ShowToast";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    private content : cc.Node = null
    @property(cc.Label)
    private steer : cc.Label = null
    @property(cc.Prefab)
    private foodPre : cc.Prefab = null

    private selectNum : number = 5;//选择的数量
    private selectArr : string[] = []
    private editbox : any[] = []

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.createEditx()
        this.mangerEditBox()
        this.steer.node.active = false
    }

    start () {

    }

    /**
     * 生成选择输入框
     */
    private createEditx():void{
        for(let i = 1;i<=this.selectNum;i++){
            let foods = cc.instantiate(this.foodPre)
            foods.name = 'food'+i
            this.content.addChild(foods)
            foods.getChildByName('PLACEHOLDER_LABEL').getComponent(cc.Label).string = "输入你想吃的食物"
            this.editbox.push(foods)
        }
    }

    /**
     * editBox 添加监听事件
     */
    private mangerEditBox():void{
        for (const editBox of this.editbox) {
             editBox.on('editing-did-began',this.editBoxStart,this);
             editBox.on('editing-did-ended',this.EditBoxEnd,this)
        }
    }

    /**
     * 监听输入框开始输入
     */
    private editBoxStart(e):void{
        // console.log("输入的是哪个",e.node.name);
    }

    /**
     * 监听输入框结束输入
     */
    private EditBoxEnd(e):void{
        switch(e.node.name){
            case 'food1' : this.changeEditArr(0,e._string);break;
            case 'food2' : this.changeEditArr(1,e._string);break;
            case 'food3' : this.changeEditArr(2,e._string);break;
            case 'food4' : this.changeEditArr(3,e._string);break;
            case 'food5' : this.changeEditArr(4,e._string);break;
        }
    }

    /**
     * 改写当前选项数组内的内容
     * @param index
     * @param str
     */
    private changeEditArr(index:number,str : string):void{
        if(str !== ''){
            this.selectArr[index] = str
        }else{
            this.selectArr.splice(index,1)
        }
    }

    /**
     * 开始随机选择
     */
    private startRandom():void{
        // for (const arr of this.selectArr) {
        //     console.log("arr = ",arr);
        // }
        // for(let i = 0;i<this.selectArr.length;i++){
        //     if(this.selectArr[i] == ''){
        //         continue
        //     }
        // }
        console.log("arr = ",this.selectArr);
        if(this.selectArr.length <= 0){
            console.log("没有输入");
            return;
        }
        let randomIndex = MathUtil.getRandomInt(0,this.selectArr.length);
        if(this.selectArr[randomIndex] !== ''){
            this.steer.node.active = true
            this.steer.string = this.selectArr[randomIndex]
            return
        }else{
            this.startRandom()
        }
    }



    // update (dt) {}
}
