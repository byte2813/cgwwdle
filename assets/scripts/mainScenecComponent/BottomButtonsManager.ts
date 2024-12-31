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
    gotoLevelBtn: cc.Node = null;

    @property(cc.Node)
    signInBtn: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    BtnInAction(){
        let largen = cc.tween().to(0.5,{scale:1.1})
        let lessen = cc.tween().to(0.5,{scale:0.9})
        return cc.tween().sequence(largen,lessen);
    }

    gotoLevelBtnTouch(){

        console.log("点击");
        
        // 场景跳转
        cc.director.loadScene(AppConstants.LEVEL_SELECT_SCENE)
    }

    signInBtnTouch(){
        // 场景跳转
        cc.director.loadScene(AppConstants.CHECKIN_SCENE)
    }

    onLoad () {}

    start () {
        let action1 = this.BtnInAction();
        let action2 = this.BtnInAction();

        cc.tween(this.gotoLevelBtn).repeatForever(action1).start();
        cc.tween(this.signInBtn).repeatForever(action2).start();

    }

    // update (dt) {}
}
