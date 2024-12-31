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

    onLoad() {  
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this); 
    } 
  
    onTouchEnd(event) { 
        
        let maskMessage = cc.find("Canvas/maskMessage")

        maskMessage.active = true;

        //this.node.getComponent(cc.Button).interactable = false;

        console.log("been touch");

        // 移除当前节点的触摸结束事件监听器  
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
       
    }  
  
    onDestroy() {  
        cc.systemEvent.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}
