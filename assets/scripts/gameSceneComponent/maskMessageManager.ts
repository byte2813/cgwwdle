// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { ActionUtils } from "../utils/ActionUtils";
import { globalVariables } from "../utils/GlobalVariables";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    duration: number = 0.8;

    // LIFE-CYCLE CALLBACKS:

    backBtn(){

        this.node.active = false;

        // 数量统计当前的被点击过的函数
        globalVariables.currentFoundElement++;

        console.log(globalVariables.currentFoundElement);
    }

    onLoad () {

    }


    protected onEnable(): void {
        this.node.scale = 0.5;
        this.node.opacity = 100;
        cc.tween(this.node).then(ActionUtils.restoreScaleAndOpacityAction(this.duration)).start();
    }


    start () {

    }

    // update (dt) {}
}
