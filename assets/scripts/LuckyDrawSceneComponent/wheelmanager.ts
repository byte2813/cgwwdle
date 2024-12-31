// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { globalVariables } from "../utils/GlobalVariables";
import wxCloudProxy from "../WXCloudProxy/wxCloudProxy";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    wheel: cc.Node = null;

    @property(cc.Node)
    maskSuccess: cc.Node = null;

    @property(cc.Node)
    maskFail: cc.Node = null;

    @property(cc.Node)
    tipsMessage: cc.Node = null;

    // 各个奖品的区域(角度值)
    prizeArea = {
        '特等奖': [0, 60],
        '一等奖': [60, 120],
        '三等奖': [120, 180],
        '鼓励奖': [180, 240],
        '二等奖': [240, 300],
        '谢谢参与': [300, 360]
    }

    prizeArray: Array<string> = [
        '特等奖',
        '一等奖',
        '二等奖',
        '三等奖',
        '鼓励奖'
    ]
 
    // 用于判断是否正在抽奖
    isOn = false;

        // Wheel.js
    getResult() {
        // 先判断应该抽中哪一个奖品，不同区域的概率不同
        let temp = Math.random()*100;
        let result = null;
        if (temp>=0 && temp<70) {
            result = '谢谢参与';
        }
        else if (temp>=70 && temp<90) {
            result = '鼓励奖';
        }
        else if (temp>=90 && temp<96) {
            result = '三等奖';
        }
        else if (temp>=96 && temp<99) {
            result = '二等奖';
        }
        else if (temp>=99 && temp<99.999) {
            result = '一等奖';
        }
        else if (temp>=99.999 && temp<100) {
            result = '特等奖'
        }
        return result;
    }

        // Wheel.js
    wheelBtn () {

        if(globalVariables.drawsNum <= 0){
            return ;
        }

        // 如果正在抽奖，则跳过，否则之前的动作会被覆盖掉
        if (!this.isOn) {
            this.isOn = true;
            this.wheel.angle = 28;
        
            // 先判断应该抽中哪一个奖品，并获取对应区域
            let result = this.getResult();
            // s输出结果
            console.log(result);
            let area = this.prizeArea[result];

            // 对全局数据 --- 抽奖次数进行存储
            globalVariables.drawsNum--;
            // 对全局数据 --- 中奖次数进行存储
            globalVariables.awardsArray[this.prizeArray.indexOf(result)]++;

            console.log(globalVariables.drawsNum);
            // 数据入云
            wxCloudProxy.updateAwardsNumData(globalVariables.openId,globalVariables.drawsNum);
            wxCloudProxy.updateAwardsData(globalVariables.openId,globalVariables.awardsArray);

            this.tipsMessageFresh();
            
            // 根据结果确定添加角度
            let addAngle = Math.round(Math.random()*60)+area[0];
        
            // 获取随机旋转时间，旋转圈数根据旋转时间设定
            let rotateTime = Math.round(Math.random()*10)+3;
            let rotateRound = Math.round(Math.random()*rotateTime)+rotateTime;
        
            // 执行旋转动画
            let rotate = cc.rotateBy(rotateTime, 360*rotateRound+addAngle).easing(cc.easeSineOut());
            let callback = cc.callFunc(()=>{
                this.isOn = false;

                if (result == '谢谢参与') {
                    
                    this.maskFail.active = true;
                    
                    setTimeout(() => {
                        this.maskFail.active = false;
                    }, 2000);
                }else{

                    this.maskSuccess.active = true;
                    this.maskSuccess.getChildByName('message').getComponent(cc.Label).string = result;

                    setTimeout(() => {
                        
                        this.maskSuccess.active = false;
                    }, 2000);

                }

            });
            let sequence = cc.sequence(rotate, callback)
            this.wheel.runAction(sequence);
        }
    }

    // onLoad () {}
    tipsMessageFresh(){

        let frontString = '今日还有 '
        let endString = ' 次抽奖机会'

        this.tipsMessage.getComponent(cc.Label).string = frontString + globalVariables.drawsNum + endString;
    }

    start () {

    }

    // update (dt) {}
}
