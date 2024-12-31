// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  rankBarContent: cc.Node = null;

  @property
  text: string = "hello";

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    cc.resources.load(
      "rankScene/prefab/userRankBar",
      cc.Prefab,
      (error, res) => {
        if (error) {
          console.log(error);
          return;
        }

        let initY = -360;

        for (let i = 0; i < 17; i++) {
          let node: cc.Node = cc.instantiate(res);

          node.parent = this.rankBarContent;

          node.getChildByName('Bar').getChildByName('rankNumber').getComponent(cc.Label).string = i + 4 + ''

          node.y = initY;

          initY = initY - 120;
        }

        
      }
    );
  }

  // update (dt) {}
}
