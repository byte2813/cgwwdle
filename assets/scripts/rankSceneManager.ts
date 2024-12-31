// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { AppConstants } from "./utils/constants";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    rankBG: cc.Node = null;

    @property(cc.Node)
    backBtn: cc.Node = null;

    @property(cc.Node)
    rankBarComponent: cc.Node = null;

    @property
    text: string = 'hello';

    duration: number = 0.8;

    onLoad () {
        this.rankBG.scale = 1.2;
        this.backBtn.x = -600
        this.rankBarComponent.opacity = 100;
        this.rankBarComponent.scale = 0.6;
    }

    rankBGInAction(){
        return cc.tween().to(this.duration,{scale:1})
    }

    backBtnInAction(){
        return cc.tween().to(this.duration,{opacity:255,x:-430})
    }

    rankBarComponentInAction(){
        return cc.tween().to(this.duration,{scale:1,opacity:255})
    }

    backBtnTouch(){
        cc.director.loadScene(AppConstants.MAIN_SCENE);
    }


    start () {
        cc.tween(this.rankBG).then(this.rankBGInAction()).start();
        cc.tween(this.backBtn).then(this.backBtnInAction()).start();
        cc.tween(this.rankBarComponent).then(this.rankBarComponentInAction()).start();

    }

    // update (dt) {}
}
