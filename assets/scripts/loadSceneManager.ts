
const {ccclass, property} = cc._decorator;

import { AppConstants } from './utils/constants';  
  

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    loadlabel: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

        cc.director.preloadScene(AppConstants.MAIN_SCENE,()=>{

            // 1. 模拟执行异步加载链操作，获取所需要的资源
            this.schedule(()=>{
                // 2. 执行场景跳转
                cc.director.loadScene(AppConstants.MAIN_SCENE);
            },2)
        })

    }

    // update (dt) {}
}
