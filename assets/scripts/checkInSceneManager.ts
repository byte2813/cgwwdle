// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ActionUtils } from "./utils/ActionUtils";
import { AppConstants } from "./utils/constants";
import { globalVariables } from "./utils/GlobalVariables";
import wxCloudProxy from "./WXCloudProxy/wxCloudProxy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    checkedTips: cc.Node = null;

    @property(cc.Node)
    checkedBar: cc.Node = null;

    @property(cc.Node)
    iconManager: cc.Node = null;


    @property(cc.Node)
    checkInbtn: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    backBtnTouch(){
        cc.director.loadScene(AppConstants.MAIN_SCENE)
    }

    checkIn(){
        let today = new Date();
        // 获取今天是 1-31的哪一天
        let dayOfMonth = today.getDate();

        console.log(dayOfMonth);
        
        if (globalVariables.checkInArray[dayOfMonth-1]) {
            // 已经签到
            this.checkedTips.opacity = 0;
            this.checkedTips.active = true;
            cc.tween(this.checkedTips).then(ActionUtils.restoreScaleAndOpacityAction(1)).start();
            setTimeout(() => {
                this.checkedTips.active = false;
            }, 2000);
        }else{
            // 未签到
            globalVariables.checkInArray[dayOfMonth-1] = 1;
            this.checkedBar.opacity = 0;
            this.checkedBar.active = true;
            cc.tween(this.checkedBar).then(ActionUtils.restoreScaleAndOpacityAction(1)).start();
            setTimeout(() => {
                this.checkedBar.active = false;
            }, 2000);

            // 调用icon刷新函数
            this.iconManager.getComponent("iconManager").createCheckInIcons();

            // 将数据传输到微信服务器上
            wxCloudProxy.updateCheckInData(globalVariables.openId,globalVariables.checkInArray);

        }

    }

    start () {

        // 按钮动效开始
        cc.tween(this.checkInbtn).then(ActionUtils.largenAndLessenAction(1.1,0.9,1)).repeatForever().start();

    }

    // update (dt) {}
}
