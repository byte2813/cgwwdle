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
    maskBlack: cc.Node = null;

    @property(cc.Node)
    ruleBar: cc.Node = null;

    @property(cc.Node)
    iknowBtn: cc.Node = null;

    duration: number = 0.8;

    // LIFE-CYCLE CALLBACKS:

    // 

    maskBlackInAction(){
        return cc.tween().to(this.duration,{opacity:150})
    }

    maskBlackOutAction(){
        return cc.tween().to(this.duration,{opacity:0})
    }

    ruleBarInAction(){
        return cc.tween().to(this.duration,{opacity:255,scale:1})
    }

    ruleBarOutAction(){
        return cc.tween().to(this.duration,{opacity:0,scale:1.4})
    }

    iknowBtnInAction(){
        return cc.tween().to(this.duration + 0.5,{y:-760})
    }

    iknowBtnOutAction(){
        return cc.tween().to(this.duration,{y:-1000})
    }


    protected onEnable(): void {
        this.maskBlack.opacity = 0;
        this.ruleBar.scale = 1.4;
        this.ruleBar.opacity = 0;
        this.iknowBtn.y = -1000;

        cc.tween(this.maskBlack).then(this.maskBlackInAction()).start();
        cc.tween(this.ruleBar).then(this.ruleBarInAction()).start();
        cc.tween(this.iknowBtn).then(this.iknowBtnInAction()).start();

        
    }

    protected onDisable(): void {
        cc.tween(this.maskBlack).then(this.maskBlackOutAction()).start();
        cc.tween(this.ruleBar).then(this.ruleBarOutAction()).start();
        cc.tween(this.iknowBtn).then(this.iknowBtnOutAction()).start();
    }


    quitBtn(){

        cc.tween(this.maskBlack).then(this.maskBlackOutAction()).start();
        cc.tween(this.ruleBar).then(this.ruleBarOutAction()).start();
        cc.tween(this.iknowBtn).then(this.iknowBtnOutAction()).call(()=>{
            this.node.active = false;
        }).start();

    }


    start () {


    }

    // update (dt) {}
}
