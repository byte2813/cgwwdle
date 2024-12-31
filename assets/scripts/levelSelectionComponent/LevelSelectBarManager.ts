// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { AppConstants } from "../utils/constants";
import { ActionUtils } from "../utils/ActionUtils";
import { globalVariables } from "../utils/GlobalVariables";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    testTouch(){
        console.log("点击");
    }

    onButtonClick(event, customEventData){
        console.log(event);
        console.log(customEventData);

        globalVariables.currentLevel = customEventData;
        
        let canvas = cc.find("Canvas");

        cc.tween(canvas).then(ActionUtils.disappearAction(2)).start();

        setTimeout(() => {
            cc.director.loadScene(AppConstants.GAME_SCENE);
        }, 2000);
        
    }


    /**
     * 控制LevelBar 通过按钮是否可用已经图片切换的设置方法
     */
    LevelBarSettingManager(){
        let childrens = this.node.children;
        childrens.forEach((element,index)=> {

            if (!globalVariables.passLevelArray[index]) {
                element.getComponent(cc.Button).interactable = false;
            }else{
                if(index != 0){
                    let pngNum = index + 1;
                    cc.resources.load("levelSelection/image/" + pngNum, cc.SpriteFrame, (err, spriteFrame) => {  
                        if (err) {  
                            cc.error("加载图片失败: " + err);  
                            return;  
                        }  
                        // 使用 spriteFrame  
                        element.getComponent(cc.Sprite).spriteFrame = spriteFrame as cc.SpriteFrame;
                    });
                }
            }
        });
    }

    onLoad () {

        // 在此次异步获取当前游戏的通过信息
        this.LevelBarSettingManager()

    }

    start () {
        console.log(this.node.children);
        console.log(globalVariables.currentLevel);
        
    }

    // update (dt) {}
}
