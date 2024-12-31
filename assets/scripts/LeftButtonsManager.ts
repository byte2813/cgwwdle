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
    shortcutBtn: cc.Button ;

    @property(cc.Button)
    commonUseBtn: cc.Button;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    addShortcut(){
        if (typeof ks !== 'undefined') {
            ks.addShortcut({
                success() {
                    console.log("添加桌面成功");
                },
                fail(err) {
                    if (err.code === -10005) {
                        console.log("暂不支持该功能");
                    } else {
                        console.log("添加桌面失败", err.msg);
                    }
                },
            });

        }
    }

    addCommonUse(){
        if (typeof ks !== 'undefined') {
            ks.addCommonUse({
                success() {
                    console.log("设为常用成功");
                },
                fail(err) {
                    if (err.code === -10005) {
                        console.log("暂不支持该功能");
                    } else {
                        console.log("设为常用失败", err.msg);
                    }
                },
            });

        }
    }

    // update (dt) {}
}
