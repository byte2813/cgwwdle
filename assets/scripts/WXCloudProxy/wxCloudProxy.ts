// 微信云静态方法
// 1. 常量：用户通关信息云函数名
const cloudFunctionUserLevelDataName = "userLevelDataManager";

// 2. 常量：获取openid 云函数名
const cloudFunctionGetOpenidName = "getOpenid";

// 3. 常量：用户通关信息云函数名
const cloudFunctionUserCheckInDataName = "userCheckInDataManager";

// 3. 常量：用户通关信息云函数名
const cloudFunctionUserAwardDataName = "userAwardDataManager";

export default class wxCloudProxy {
    /**
     * 对微信云服务进行初始化操作，建议在主场景-初始化时执行
     */
    public static initCloud() {
        // 初始化云服务
        if (typeof wx !== 'undefined') {
            wx.cloud.init({
                traceUser: false,
            });
        }
    }

    /**
     * 获取用户的openidid
     * @param callback1 成功的回调函数，返回openid字符串
     * @param callback2 失败的回调函数，返回失败字符串
     * @example
     * wxCloudProxy.getgetOpenId((res)=>{console.log(res)})
     */
    public static getOpenId(callback1, callback2) {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionGetOpenidName,
                success: (res) => {
                    console.log("openid:  " + res.result.openid); // 成功调用云函数后打印结果
                    callback1(res.result.openid);
                },
                fail: (err) => {
                    callback2(err);
                    console.log(err); // 调用云函数失败时打印错误信息
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            callback2("全局变量wx不存在,可能不是在微信小程序环境中运行");
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
        }
    }

    /**
     * 获取用户当前通关情况的数据
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param callback1 成功回调 返回 一个doc数据包括 openid,passCountArray,passTimeArray
     * @param callback2 失败回调 返回 error 数据信息
     */
    public static getLevelData(openid, callback1, callback2) {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数
            wx.cloud.callFunction({
                name: cloudFunctionUserLevelDataName,
                data: {
                    type: "getData",
                    params: {
                        _openid: openid,
                    },
                },
                success: (res) => {
                    console.log("成功get数据 : " + res);
                    console.log(res);

                    callback1(res.result.data[0]);
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    callback2(err);
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            callback2("err");
        }
    }

    /**
     * 对于没有登录过的用户创建 过关Array 和 时间Array
     * @param openid
     * @returns
     */
    public static addLevelData(openid): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserLevelDataName,
                data: {
                    type: "addData",
                    params: {
                        _openid: openid,
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    /**
     * 将过关的 Array 传输给wx云服务器
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param passCountArray
     * @returns
     */
    public static updatePassLevelData(openid, passCountArray): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserLevelDataName,
                data: {
                    type: "updateData",
                    params: {
                        _openid: openid,
                        passCountArray,
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    public static updatePassTimelData(openid, passTimeArray): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserLevelDataName,
                data: {
                    type: "updatePassTimeData",
                    params: {
                        _openid: openid,
                        passTimeArray,
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    /**
     * 获取用户当前签到情况的数据
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param callback1 成功回调 返回 一个doc数据包括 openid,passCountArray,passTimeArray
     * @param callback2 失败回调 返回 error 数据信息
     */
    public static getCheckInData(openid, callback1, callback2) {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数
            wx.cloud.callFunction({
                name: cloudFunctionUserCheckInDataName,
                data: {
                    type: "getData",
                    params: {
                        _openid: openid,
                    },
                },
                success: (res) => {
                    console.log("成功get数据 : " + res);
                    console.log(res);

                    callback1(res.result.data[0]);
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    callback2(err);
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            callback2("err");
        }
    }

    /**
     * 对于没有登录过的用户创建 过关Array 和 时间Array
     * @param openid
     * @returns
     */
    public static addCheckInData(openid): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserCheckInDataName,
                data: {
                    type: "addData",
                    params: {
                        _openid: openid,
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    /**
     * 将过关的 Array 传输给wx云服务器
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param passCountArray
     * @returns
     */
    public static updateCheckInData(openid, checkInArray): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserCheckInDataName,
                data: {
                    type: "updateData",
                    params: {
                        _openid: openid,
                        checkInArray,
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    /**
     * 获取用户当前签到情况的数据
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param callback1 成功回调 返回 一个doc数据包括 openid,passCountArray,passTimeArray
     * @param callback2 失败回调 返回 error 数据信息
     */
    public static getAwardsData(openid, callback1, callback2) {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数
            wx.cloud.callFunction({
                name: cloudFunctionUserAwardDataName,
                data: {
                    type: "getData",
                    params: {
                        _openid: openid,
                    },
                },
                success: (res) => {
                    console.log("成功get数据 : " + res);
                    console.log(res);

                    callback1(res.result.data[0]);
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    callback2(err);
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            callback2("err");
        }
    }

    /**
     * 对于没有登录过的用户创建 过关Array 和 时间Array
     * @param openid
     * @returns
     */
    public static addAwardsData(openid): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserAwardDataName,
                data: {
                    type: "addData",
                    params: {
                        _openid: openid,
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    /**
     * 将获奖的 Array 传输给wx云服务器
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param passCountArray
     * @returns
     */
    public static updateAwardsData(openid, awardsArray): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserAwardDataName,
                data: {
                    type: "updateAwardsArrayData",
                    params: {
                        _openid: openid,
                        awardsArray
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }

    /**
     * 将用户抽奖次数 传输给wx云服务器
     * @param openid 用户的openid -- 鉴权唯一凭证
     * @param passCountArray
     * @returns
     */
    public static updateAwardsNumData(openid:string, drawsNum:number): boolean {
        if (typeof wx !== 'undefined') {
            // 当wx存在时，调用云函数

            wx.cloud.callFunction({
                name: cloudFunctionUserAwardDataName,
                data: {
                    type: "updateDrawsNum",
                    params: {
                        _openid: openid,
                        drawsNum
                    },
                },
                success: (res) => {
                    console.log(res);
                    return true;
                },
                fail: (err) => {
                    console.log(err); // 调用云函数失败时打印错误信息
                    return false;
                },
            });
        } else {
            // 当wx不存在时，进行错误处理或提示
            console.log("全局变量wx不存在,可能不是在微信小程序环境中运行");
            return false;
        }
    }
}
