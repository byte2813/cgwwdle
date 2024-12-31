// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    bgImg: cc.Node = null;

    @property(cc.Node)
    bgTitle: cc.Node = null;

    @property(cc.Node)
    rightButtons: cc.Node = null;

    @property(cc.Node)
    bottomButtons: cc.Node = null;

    @property
    text: string = 'hello';

    durationTime: number = 0.7;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bgImg.scale = 1.2;
        this.bgTitle.scale = 0.5;
        this.rightButtons.x = 650;
        this.rightButtons.opacity = 0;

        this.bottomButtons.y = -1000;
        this.bottomButtons.opacity = 0;
    }

    // 1. 背景图片缩放动画
    bgImgInAction(){
        // 1. 动作预支
        let action = cc.tween().to(this.durationTime,{scale:1},{easing: 'sineOut'})
        return cc.tween().then(action);
    }

    // 2. 标题放大动画(隐身)
    bgTitleInAction(){
        // 1. 缓入动作
        let actionIn = cc.tween().to(this.durationTime,{scale:1},{easing: 'sineIn'})
        // 2. 持续摇摆动作
        let leftSwing = cc.tween().to(this.durationTime, { angle: -9 })
        let rightSwing = cc.tween().to(this.durationTime, { angle: 9 })
        let actionRepeat = cc.tween().sequence(leftSwing, rightSwing).repeatForever();

        return cc.tween().sequence(actionIn,actionRepeat);

    }

    // 3. 按钮右入动画（隐身）
    rightButtonsInAction(){
        // 1. 缓入动作
        let actionIn = cc.tween().to(this.durationTime,{x:450,opacity:255});
        return actionIn;
    }

    bottomButtonsInAction(){
        //let largen = cc.tween().to(this.durationTime,{scale:1.1});
        //let lessen = cc.tween().to(this.durationTime,{scale:0.9});
        let actionIn = cc.tween().to(this.durationTime,{y:-770,opacity:255});
        return actionIn;
    }


    // 4. 按钮下入动画 （隐身加放大缩小）

    start () {
        // 动作加载
        let bgImgInAction = this.bgImgInAction();
        let bgTitleInAction = this.bgTitleInAction();
        let rightButtonsInAction = this.rightButtonsInAction();
        let bottomButtonsInAction = this.bottomButtonsInAction()

        
        // 动作执行
        cc.tween(this.bgImg).then(bgImgInAction).start();
        cc.tween(this.bgTitle).then(bgTitleInAction).start();
        cc.tween(this.rightButtons).then(rightButtonsInAction).start();
        cc.tween(this.bottomButtons).then(bottomButtonsInAction).start();

    }

    // update (dt) {}
}
