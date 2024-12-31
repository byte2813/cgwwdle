// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip )
    backgroundMusic: cc.AudioClip  = null;

    isMusicActive = true;

    onLoad() {  
        // 播放背景音乐，假设backgroundMusic已经在编辑器中赋值  
        if (this.backgroundMusic) {  
            cc.audioEngine.playMusic(this.backgroundMusic, true); // 第二个参数为是否循环，第三个参数为音量  
        }  
    }
  
    pauseMusic() {  
        // 暂停背景音乐  
        cc.audioEngine.pauseMusic();  
    } 
  
    resumeMusic() {  
        // 恢复播放背景音乐  
        cc.audioEngine.resumeMusic();  
    }
    
    musicController(){
        if (this.isMusicActive) {
            this.pauseMusic();
        }else{
            this.resumeMusic();
        }

        this.isMusicActive = !this.isMusicActive;
    }

    start () {
        cc.tween(this.node.children[0]).by(1,{rotation: 45}).repeatForever().start();
    }

    // update (dt) {}
}
