// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { globalVariables } from "../utils/GlobalVariables";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    iconManager: cc.Node = null;

    iconPrefabPath: string = 'CheckInPage/Prefab/checkInIconPrefab';
    iconCheckInSpiritFrameFilesPath : string = 'CheckInPage/GameCheckIn/';
    successIconCheckInSpiritFrameFilesPath : string = 'CheckInPage/GameCheckInSuccess/';
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    createCheckInIcons(){

        let initX = -250;

        let initY = 380;

        cc.resources.load(this.iconPrefabPath,cc.Prefab,(err,prefab)=>{

            if (err) {  
                cc.error("Failed to load prefab: " + err);  
                return;  
            }  

            globalVariables.checkInArray.forEach((element,index)=>{

                // 实例化 Prefab  
                let instance:cc.Node = cc.instantiate(prefab);
                
                instance.parent = this.node;

                instance.setPosition(cc.v2(initX, initY));

                let resourcesUrl = '';
                if (element) {
                    resourcesUrl = this.successIconCheckInSpiritFrameFilesPath;
                }else{
                    resourcesUrl = this.iconCheckInSpiritFrameFilesPath;
                }

                cc.resources.load(resourcesUrl + (index+1 ),cc.SpriteFrame,(err,spriteFrame)=>{
                    if (err) {  
                        cc.error("Failed to load prefab: " + err);  
                        return;  
                    }
                    instance.getComponent(cc.Sprite).spriteFrame = spriteFrame as cc.SpriteFrame;
                })

                initX = initX + 100;
                
                if ((index+1) % 6 == 0) {
                    initY = initY - 100;
                    initX = -250;
                }
                
            })
        })

    }

    start () {
        this.createCheckInIcons();
    }

    // update (dt) {}
}
