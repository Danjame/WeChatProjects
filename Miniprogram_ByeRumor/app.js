//app.js
App({
    //全局数据
    data: {

    },
    //点赞收藏请求封装
    likeAndCollectHandler(type, action, that) {
        const _this = this;
        const _that = that;
        console.log(_that.data);
        const loginInfo = wx.getStorageSync("loginInfo");
        wx.request({
            url: _this.defineRequest(type, action),
            data: {
                id: _that.data.result.id,
                userId: loginInfo.userId
            },
            success(res) {
                if (res.statusCode === 200) {
                    console.log(`Succeed ${action} a ${type} !`);
                    if (action == "checklike") {
                        _that.setData({
                            like: res.data
                        })
                    } else if (action == "checkcollect") {
                        _that.setData({
                            collected: res.data
                        })
                    }
                }
            },
            fail(){
              console.log("fail");
            },
            complete() {}
        })
    },
    //点赞收藏请求地址封装
    defineRequest(type, action) {
        let url;
        switch (action) {
            case "like":
                url = `https://wdd.free.qydev.com/${type}/stick`;
                break;
            case "unlike":
                url = `https://wdd.free.qydev.com/${type}/nostick`;
                break;
            case "checklike":
                url = `https://wdd.free.qydev.com/${type}/stick/is`;
                break;
            case "collect":
                url = `https://wdd.free.qydev.com/${type}/collection`;
                break;
            case "uncollect":
                url = `https://wdd.free.qydev.com/${type}/nocollection`;
                break;
            case "checkcollect":
                url = `https://wdd.free.qydev.com/${type}/collection/is`;
                break;
        };
        return url;
    },
    //路由跳转
    to_rumor(params) {
        wx.navigateTo({
            url: '../rumor/rumor?id=' + params,
            events: {
                getData(data) {
                    console.log(data);
                }
            },
            success(res) {
                res.eventChannel.emit("getData", {
                    data: 0
                })
            }
        })
    },
    to_science(params) {
        wx.navigateTo({
            url: '../science/science?id=' + params,
            events: {
                getData() {
                    console.log("Data");
                }
            },
            success(res) {
                res.eventChannel.emit("getData", {
                    data: 0
                })
            }
        })
    },
    to_dynamic(params) {
        wx.navigateTo({
            url: '../dynamic/dynamic?id=' + params,
            events: {
                getData() {
                    console.log("Data");
                }
            },
            success(res) {
                res.eventChannel.emit("getData", {
                    data: 0
                })
            }
        })
    },
    //数据分页和二维数组处理
    dataSetting(page, target) {
        if (page.total >= target.length) {
            return;
        } else {
            let pageSize, total, pageNum;
            //二维数组
            let arr = [
                []
            ];
            if (target.length - page.total >= page.pageSize) {
                pageSize = page.pageSize;
                total = page.total + pageSize;
                pageNum = page.pageNum + 1;
                for (let i = (pageNum - 1) * pageSize; i < total; i++) {
                    arr[0].push(target[i]);
                }
            } else {
                pageSize = page.pageSize;
                total = page.total + target.length - page.total;
                pageNum = page.pageNum + 1;
                for (let i = (pageNum - 1) * pageSize; i < target.length; i++) {
                    arr[0].push(target[i]);
                }
            }
            //截取时间
            arr[0].forEach(item => {
                item.releaseTime = item.releaseTime.slice(0, 10);
            })
            return {
                arr,
                data: {
                    pageSize,
                    total,
                    pageNum
                }
            }
        }
    },
    //获取元素高度
    getHeightData(self, searchEle, tabEle) {
        const _this = self;
        wx.createSelectorQuery().select(searchEle).boundingClientRect(rect => {
            _this.setData({
                searchHeight: rect.height
            });
        }).exec();
        wx.createSelectorQuery().in(_this).select(tabEle).boundingClientRect(rect => {
            _this.setData({
                tabHeight: rect.height
            });
        }).exec();
        wx.getSystemInfo({
            success: function(res) {
                _this.setData({
                    clientHeight: res.windowHeight
                });
            }
        })
    },
})