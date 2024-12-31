// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { AppConstants } from "./utils/constants";
import { globalVariables } from "./utils/GlobalVariables";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    tipslabel: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    back(){
        cc.director.loadScene(AppConstants.MAIN_SCENE)
    }

    start () {

        this.tipslabel.getComponent(cc.Label).string = '今日还有 ' + globalVariables.drawsNum + ' 次抽奖机会'

    }

    // update (dt) {}
}
