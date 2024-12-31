// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import { globalVariables } from "./utils/GlobalVariables";
import { AppConstants } from "./utils/constants";


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    BackGround: cc.Node = null;

    @property(cc.Node)
    timerLaber: cc.Node = null;

    @property(cc.Node)
    foundElementStatisticsLabel: cc.Node = null;

    @property(cc.Node)
    maskSuccess: cc.Node = null;

    @property(cc.Node)
    maskFail: cc.Node = null;

    @property(cc.Node)
    luping: cc.Node = null;

    @property(cc.Node)
    share: cc.Node = null;

    winOrfailFlag: boolean = false;

    passGameTime: number = 0;

    // LIFE-CYCLE CALLBACKS:

    backLevelSelectScene(){
        cc.director.loadScene(AppConstants.LEVEL_SELECT_SCENE)
    }
    

    onLoad () {

        cc.resources.load("coreGameSceneMaterial/image/" + globalVariables.currentLevel + "_BG", cc.SpriteFrame, (err, spriteFrame) => {  
            if (err) {  
                cc.error("加载图片失败: " + err);  
                return;
            }  
            // 使用 spriteFrame  
            this.BackGround.getComponent(cc.Sprite).spriteFrame = spriteFrame as cc.SpriteFrame;
        });


    }

    start () {
        if (typeof ks !== 'undefined'){
            console.log("创建录屏管理器")
            this._gameRecorder();
        }
        this.schedule(()=>{
            this.updateGameTime()
        },1)

    }


    _gameRecorder(){
        if (typeof ks !== 'undefined'){
            // 可以监听 error 事件
            if (this.recorder){
                return;
            }
            this.recorder = ks.getGameRecorder()
            this.recorder.on('start', res => {
                console.log("开始录屏");
            })
            this.recorder.on('error', res => {
                const error = res.error
                if (error.code === ks.error.GameRecorder_StartWhileAlreadyStartRecording) {

                }
            })
            this.recorder.on("stop", res => {
                console.log("暂停录屏返参结果:",JSON.stringify(res))
                if(res.error){
                    if (res.error.code === ks.error.GameRecorder_StopWhileNotStartRecording) {
                        ks.showModal({
                            title: '提示',
                            content: '在还没有开始录制的情况下调用 stop',
                            showCancel: false
                        });
                    }
                    if (res.error.code === ks.error.GameRecorder_RecordFailedTimeRangeTooShort) {
                        ks.showModal({
                            title: '提示',
                            content: '录制结束，录制时间太短',
                            showCancel: false
                        });
                    }
                    if (res.error.code === ks.error.GameRecorder_RecordFailedTimeRangeTooLong) {
                        ks.showModal({
                            title: '提示',
                            content: '录制结束，录制时间太长',
                            showCancel: false
                        });
                    }
                    if (res.error.code === ks.error.GameRecorder_RecordFailedNoVideo) {
                        ks.showModal({
                            title: '提示',
                            content: '录制结束，未录制到视频',
                            showCancel: false
                        });
                    }
                }else {
                    let _this2 = this;
                    if (res.videoID){
                        console.log("提示发布视频:", res.videoID)
                        ks.showModal({
                            title: '提示',
                            content: '发布录屏到快手',
                            success(dataRes){
                                if (dataRes.confirm){
                                    _this2.publishVideo(res.videoID);
                                }
                            }
                        })
                    }
                }

            })
            this.recorder.on('abort', res => {
                console.log("放弃录制游戏画面。此时已经录制的内容会被丢弃。")
            })
        }
    }

    gameRecorderStart(){
        if (this.recorder){
            console.log("录屏管理器已创建")
            if (this.startFlag === 1){
                this.recorder.stop();
                this.startFlag = 0;
            }else {
                this.recorder.start();
                this.startFlag = 1;
            }
            let path:string = '/levelSelection/screenRecording-' + this.startFlag;
            console.log("录屏图标切换路径:",path)
            let _this2 = this;
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame){
                if (err){
                    console.error('set sprite frame failed! err', path, err);
                    return;
                }
                _this2.luping.getComponent(cc.Sprite).spriteFrame = spriteFrame;

            })
        }

    }

    publishVideo(videoID:number){
        if (this.recorder){
            this.recorder.publishVideo({
                video: videoID,
                callback: (error) => {
                    if (error != null && error != undefined) {
                        console.log("分布录屏失败: " , error);
                        return;
                    }
                    console.log("分布录屏成功");
                }
            });
        }else {
            ks.showModal({
                title: '提示',
                content: '录屏发布失败',
                showCancel: false
            });
        }

    }

    shareAppMessage(){
        ks.shareAppMessage({})
    }

    updateGameTime(){

        // 判断是否游戏完成
        if (globalVariables.currentFoundElement == 5 ) {
            this.maskSuccess.active = true;

            // 游戏执行成功的后续逻辑
            if(!this.winOrfailFlag){

                let index = globalVariables.currentLevel
                
                // 设置关卡打开数组  index会比正常数组下标多1， 相当于执行了加1操作
                globalVariables.passLevelArray[index] = 1;

                console.log(globalVariables.passLevelArray);

                globalVariables.passTimeArray[index-1] = this.passGameTime;
                // 需要在此处提交 游戏完成时间、完成关卡情况

                // wx.updateLevel wx.updateTimeArray

                setTimeout(() => {
                    cc.director.loadScene(AppConstants.LEVEL_SELECT_SCENE)
                }, 3000);
            }

            this.winOrfailFlag = true;
            
        }

        // 1. 增加游戏时间
        this.passGameTime++;

        // 游戏失败函数的执行
        if (this.passGameTime >= 120) {
            this.maskFail.active = true;

            if(!this.winOrfailFlag){
                setTimeout(() => {
                    cc.director.loadScene(AppConstants.LEVEL_SELECT_SCENE)
                }, 3000);
            }

            this.winOrfailFlag = true;
        }

        this.timerLaber.getComponent(cc.Label).string = this.passGameTime + " s";
        // 2. 判断游戏被选中的元素个数
        this.foundElementStatisticsLabel.getComponent(cc.Label).string = "已找到   " + globalVariables.currentFoundElement + "/5";

    }

    protected onDestroy(): void {
        globalVariables.currentFoundElement = 0;
        this.unschedule(()=>{});
    }

    // update (dt) {}
}
