// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { ActionUtils } from "./utils/ActionUtils";
import { AppConstants } from "./utils/constants";
import { globalVariables } from "./utils/GlobalVariables";
import wxCloudProxy from "./WXCloudProxy/wxCloudProxy";


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    BG: cc.Node = null;

    @property(cc.Node)
    backBtn: cc.Node = null;

    @property(cc.Node)
    title: cc.Node = null;

    @property(cc.Node)
    levelSelectionComponent: cc.Node = null;

    duration: number = 0.8;

    backToMainScene(){
        cc.director.loadScene(AppConstants.MAIN_SCENE);
    }

    protected onLoad(): void {
        this.BG.scale = 1.2;
        this.title.scale = 0.5;
        this.title.opacity = 100;
        this.levelSelectionComponent.scale = 0.5;
        this.levelSelectionComponent.opacity = 100;
        this.backBtn.y = 1200;
    }



    start () {

        // 1. 动画特效
        cc.tween(this.BG).then(ActionUtils.restoreSizeAction(this.duration)).start();
        cc.tween(this.levelSelectionComponent).then(ActionUtils.restoreScaleAndOpacityAction(this.duration)).start();
        cc.tween(this.title)
            .sequence(ActionUtils.restoreScaleAndOpacityAction(this.duration),
            cc.tween().repeatForever(ActionUtils.largenAndLessenAction(1.1,0.9,this.duration)))
            .start();
        cc.tween(this.backBtn).then(cc.tween().to(this.duration,{y:800})).start();


        // 2. 游戏数据上传
        // if (typeof wx !== 'undefined') {
        //     wxCloudProxy.updatePassLevelData(globalVariables.openId,globalVariables.passLevelArray);
        //     wxCloudProxy.updatePassTimelData(globalVariables.openId,globalVariables.passTimeArray)
        // }


    }

    // update (dt) {}
}
