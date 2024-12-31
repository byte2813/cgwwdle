// 定义ActionUtils类  
export class ActionUtils {  
    // 示例方法：执行一些操作  
    public static performAction(message: string): void {  
        console.log(`Performing action: ${message}`);  
    }  
  
    // 另一个示例方法：返回处理后的消息  
    public static processMessage(message: string): string {  
        return `Processed: ${message}`;
    }  


    /**
     * 恢复组件原来大小的动作
     * @param duration 持续时间
     * @returns cc.Tween
     */
    public static restoreSizeAction(duration:number):cc.Tween{
        return cc.tween().to(duration,{scale:1})
    }

    /**
     * 恢复节点的大小和不透明度
     * @param duration 
     * @returns cc.Tween
     */
    public static restoreScaleAndOpacityAction(duration:number):cc.Tween{
        return cc.tween().to(duration,{scale:1,opacity:255})
    }

    /**
     * 节点变大变小
     * @param largenPercentage 变大百分比 例: 1.5
     * @param lessenPercentage  变小百分比 例: 0.5
     * @param duration 持续时间
     * @returns cc.Tween
     * @example
     *  largenAndLessenAction(1.5,0.5,1);
     */
    public static largenAndLessenAction(largenPercentage:number,lessenPercentage:number,duration:number):cc.Tween{
        let largen = cc.tween().to(duration,{scale:largenPercentage});
        let lessen = cc.tween().to(duration,{scale:lessenPercentage});
        return cc.tween().sequence(largen,lessen);
    }


    /**
     * 不透明度变为0，实现消失效果
     * @param duration 
     * @returns 
     */
    public static disappearAction(duration){
        return cc.tween().to(duration,{opacity:0})
    }



}