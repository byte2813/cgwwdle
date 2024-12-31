// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { globalVariables } from "./utils/GlobalVariables";

import wxCloudProxy from "./WXCloudProxy/wxCloudProxy";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ruleComponent: cc.Node = null;

    @property(cc.Node)
    unrealized: cc.Node = null;

    // 冷却时间，单位：秒  
    cooldownTime: 1;

    unrealizedBtn(){
        console.log("touch");
        
        this.unrealized.active = true;
        // this.unrealized.opacity

        setTimeout(() => {
            this.unrealized.active = false;
        }, 2000);
        //this.unrealized.active = false;
    }

    onLoad () {

        // if (!globalVariables.ifInitWXCloudData) {
        //
        //     // 加载到主场景，可以先执行 云函数初始化，以及初始化 全局变量当中云函数的代码
        //
        //     // 1. 初始化数据
        //     wxCloudProxy.initCloud();
        //
        //     // 2. 获得用户的openid     --- o25oY7QkWXvxxFwCh_1NiLjjCm8Y
        //     wxCloudProxy.getOpenId((openid)=>{
        //         console.log(openid);
        //
        //         globalVariables.openId = openid;
        //
        //         // 1. 初始化用户关卡信息
        //
        //         wxCloudProxy.getLevelData(globalVariables.openId,(res)=>{
        //
        //             console.log(res);
        //
        //             globalVariables.passLevelArray = res.passCountArray;
        //             globalVariables.passTimeArray = res.passTimeArray;
        //
        //         },()=>{})
        //
        //         // 2. 获取签到数据
        //         wxCloudProxy.getCheckInData(openid,(res)=>{
        //
        //             globalVariables.checkInArray = res.checkInArray;
        //
        //         },()=>{})
        //
        //         // 3. 获取抽奖信息
        //         wxCloudProxy.getAwardsData(openid,(res)=>{
        //
        //             globalVariables.awardsArray = res.awardsArray;
        //             globalVariables.drawsNum = res.drawsNum;
        //
        //         },()=>{})
        //
        //     },()=>{})
        //
        // }

        globalVariables.ifInitWXCloudData = true;
        

    }

    start () {

        // if (globalVariables.isFirstLoadGame) {
        //     this.ruleComponent.active = true;
        //     globalVariables.isFirstLoadGame = false;
        // }

    }

    // update (dt) {}
}
