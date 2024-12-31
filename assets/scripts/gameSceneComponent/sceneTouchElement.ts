// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { globalVariables } from "../utils/GlobalVariables";

@ccclass
export default class SceneTouchElement extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    currentLevelElementData = globalVariables.LevelElementData[globalVariables.currentLevel-1];

    // LIFE-CYCLE CALLBACKS:

    onLoad () {


    }

    showTips(){
        if (cc.sys.platform === cc.sys.WECHAT_GAME){
            let childrens = this.node.children;
            this._createVedioAd(function (res) {
                if (res.isEnded || res.raw) {
                    console.log("完整观看广告给予提示")
                    childrens.forEach(element => {
                        element.getChildByName("tips").active = true;
                    });
                }
            });
        } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME){
            let childrens = this.node.children;
            this._createVedioAd(function (res) {
                if (res.isEnded || res.raw) {
                    console.log("完整观看广告给予提示")
                    childrens.forEach(element => {
                        element.getChildByName("tips").active = true;
                    });
                }
            });
        }else {
            let childrens = this.node.children;

            childrens.forEach(element => {
                element.getChildByName("tips").active = true;
            });
        }

    }

    _createVedioAd  (callback){
        if (typeof ks !== 'undefined') {
            let param = {};
            param.adUnitId = "2300011794_01";
            let rewardedVideoAd = ks.createRewardedVideoAd(param);
            if (rewardedVideoAd) {
                rewardedVideoAd.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    if (res && res.isEnded) {
                        // 正常播放结束，可以下发游戏奖励
                        callback(res);
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                    }
                })
                rewardedVideoAd.onError(res => {
                    // 激励视频广告Error事件
                })
                let p = rewardedVideoAd.show()
                p.then(function(result){
                    // 激励视频展示成功
                    console.log(`show rewarded video ad success, result is ${result}`)
                }).catch(function(error){
                    // 激励视频展示失败
                    console.log(`show rewarded video ad failed, error is ${error}`)
                })
            } else {
                console.log("创建激励视频组件失败");
            }

        } else if (cc.sys.platform === cc.sys.WECHAT_GAME){
            let videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-6ab011c413a8174d'
            });
            videoAd.load()
                .then(() => videoAd.show())
                .catch(function (err) {
                    console.log("视频加载失败", err);
                    wx.showModal({
                        title: '提示',
                        content: '视频加载失败',
                        showCancel: false
                    });
                });
            videoAd.onClose(function (res) {
                if (!videoAd) {
                    return;
                }
                if (res.isEnded) {
                    callback(res);
                    videoAd.offClose();
                } else {
                    videoAd.offClose();
                }
            });
            videoAd.onError(function (msg) {
                wx.showToast({
                    title: '错误'
                });
                console.log(msg);
            });
        }else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME){
            let videoAd = tt.createRewardedVideoAd({
                adUnitId: '96s43ej5als1jm5hfc'
            });
            videoAd.load()
                .then(() => videoAd.show())
                .catch(function (err) {
                    console.log("视频加载失败",err);
                    tt.showModal({
                        title: '提示',
                        content: '视频加载失败',
                        showCancel: false
                    });
                });
            videoAd.onClose(function (res) {
                if(!videoAd){
                    return ;
                }
                if(res.isEnded){
                    callback(res);
                    videoAd.offClose();
                }else{
                    console.log("未播放完关闭")
                    videoAd.offClose();
                }
            });
            videoAd.onError(function(msg){
                tt.showToast({
                    title: '错误'
                });
                console.log(msg);
            });
        }

    }

    start () {
        //this.showTips()
        let children:cc.Node[] = this.node.children;

        console.log(children);
        

        children.forEach((element,index) => {

            console.log(index);

            // 1. 设置节点位置
            element.x = this.currentLevelElementData[index].position[0];
            element.y = this.currentLevelElementData[index].position[1];

            // 2. 加载贴图
            if (!this.currentLevelElementData[index].size) {
                cc.resources.load(this.currentLevelElementData[index].resourcesURL,cc.SpriteFrame, null, (err, spriteFrame) => {
                    console.log(err)
                    element.getComponent(cc.Sprite).spriteFrame = spriteFrame as cc.SpriteFrame;
                });
            }else{
                element.width = this.currentLevelElementData[index].size[0]
                element.height = this.currentLevelElementData[index].size[1]

                // 设置图片透明
                element.getComponent(cc.Sprite).spriteFrame = null;
            }

            console.log("图片加载完成");
            
        });
    }

    // update (dt) {}
}
