// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    cancelButton: cc.Button;

    @property(cc.Button)
    confirmButton: cc.Button;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    buttonCancelFunc (event) {
        this.node.destroy();
    }

    buttonConfirmFunc (event) {
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME){
            tt.navigateToScene({
                scene: "sidebar",
                success: (res) => {
                    console.log("navigate to scene success");
                    // 跳转成功回调逻辑
                },
                fail: (res) => {
                    console.log("navigate to scene fail: ", res);
                    // 跳转失败回调逻辑
                },
                complete: (res) => {
                    this.node.destroy();
                }
            });
        }
    }

    // update (dt) {}
}
