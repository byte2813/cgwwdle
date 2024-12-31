// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { ActionUtils } from "../utils/ActionUtils";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    message: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    duration: number = 0.8;

    onLoad () {
        this.node.scale = 0.5;
        this.node.opacity = 100;

        this.message.rotation = 96;
    }

    protected onEnable(): void {
        cc.tween(this.node).then(ActionUtils.restoreScaleAndOpacityAction(this.duration)).start();

        let action1 = cc.tween().by(this.duration,{rotation: -6})
        let action2 = cc.tween().by(this.duration,{rotation: 6})

        cc.tween(this.message).repeatForever(cc.tween().sequence(action1,action2)).start();
    }



    start () {

    }

    // update (dt) {}
}
