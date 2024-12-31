// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { AppConstants } from "../utils/constants";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    awardBtn: cc.Node = null;
    @property(cc.Node)
    rankBtn: cc.Node = null;
    @property(cc.Node)
    ruleBtn: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    ruleBtnTouch(){
        // 1. 调出兄弟节点ruleComponent
        this.node.parent.getChildByName('ruleComponent').active = true;
    }

    awardBtnTouch(){

        cc.director.loadScene(AppConstants.LUCKYDRAWSCENE)
        
    }

    rankBtnTouch(){
        cc.director.loadScene(AppConstants.RANK_SCENE);
    }

    cbBtn(){
        this.node.parent.getChildByName('cblPanel').active = true;
    }


    start () {
        
    }

    // update (dt) {}
}
