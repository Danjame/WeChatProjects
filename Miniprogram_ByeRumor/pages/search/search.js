const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputValue: "",
        placeholder: "搜索的内容",
        focus: false,
        searchState: false,
        searchResult: false,
        keyWords: [],
        result: {},
        tabTitles: ["显示全部", "热门谣言", "防疫科普", "官方动态"],

        hisList: [],
        rankList: [],

        rankPage: {
            pageSize: 10,
            pageNum: 0,
            total: 0
        },
        recoResult: [],
    },

    //删除搜索历史
    deleteHis() {
        this.setData({
            hisList: []
        })
    },
    //得失焦点
    inputFocus() {
        this.setData({
            focus: true,
            searchResult: false,
        })
    },
    inputBlur() {
        this.setData({
            focus: false,
        })
    },
    //搜索关键字选择
    selectKeyword(e) {
        this.setData({
            inputValue: e.detail.item
        })
        this.searchConfirm();
    },
    //选择热门项
    selectRumor(e) {
        app.to_rumor(e.detail);
    },
    //确定搜索关键字
    searchConfirm() {
        if (this.data.inputValue) {
            const _this = this;
            wx.request({
                url: 'https://wdd.free.qydev.com/common/search',
                data: {
                    keyCode: _this.data.inputValue,
                },
                success(res) {
                    if (res.statusCode === 200) {
                        const result = res.data;
                        _this.setData({
                            result,
                        });
                    }
                },
                fail(error) {
                    console.log("something wrong")
                },
                complete() {
                    _this.setData({
                        focus: false,
                        searchState: false,
                        searchResult: true,
                    });
                    _this.removeDup(_this, _this.data.hisList, _this.data.inputValue);
                },
            })
        }
    },
    ///去除重复的搜索记录并且前置最新记录
    removeDup(self, historyLis, inputValue) {
        const _this = self;
        const hisList = historyLis;
        if (hisList.length) {
            hisList.forEach((item, index) => {
                if (item == inputValue) {
                    hisList.splice(index, 1);
                }
            });
            hisList.unshift(inputValue);
        } else {
            hisList.push(inputValue);
        };
        _this.setData({
            hisList
        })
    },
    //关键字匹配
    lastSearch: Date.now(),
    throttle: 500,
    inputChange(e) {
        let result;
        const _this = this;
        this.setData({
            inputValue: e.detail.value
        })
        if (Date.now() - this.lastSearch > this.throttle) {
            this.lastSearch = Date.now();
            this.timer = setTimeout(() => {
                const promise = new Promise((resolve, reject) => {
                    if (!e.detail.value) {
                        _this.setData({
                            keyWords: []
                        })
                        reject();
                    } else {
                        _this.onInputSearch();
                        result = _this.data.recoResult;
                        result = result.filter(item => item.rTitle.includes(e.detail.value));
                        // console.log(result);
                        resolve(result);
                    }
                });
                promise.then(result => {
                    _this.setData({
                        keyWords: result
                    })
                }, err => console.log("Fail"));
            }, this.throttle);
        }
    },
    // 搜索谣言
    onInputSearch() {
        const _this = this;
        wx.request({
            url: 'https://wdd.free.qydev.com/rumor/sort',
            keyCode: _this.data.inputValue,
            success(res) {
                if (res.statusCode === 200) {
                    _this.setData({
                        recoResult: res.data
                    })
                }
            },
            fail() {

            },
            complete() {

            }
        })
    },
    //获取热门排行
    getRanking(pageData, target) {
        if (pageData.total !== target.length) {
            const result = app.dataSetting(pageData, target);
            this.setData({
                rankList: this.data.rankList.concat(result.arr),
                rankPage: result.data
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const _this = this;
        wx.request({
            url: 'https://wdd.free.qydev.com/rumor/sort',
            success(res) {
                if (res.statusCode === 200) {
                    _this.getRanking(_this.data.rankPage, res.data);
                }
            },
            fail(error) {
                console.log("Network Error!")
            },
            complete() {

            }
        })
        // this.onInputSearch();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        //加载搜索历史
        const searchHistory = wx.getStorageSync("searchHistory");
        if (searchHistory) {
            this.setData({
                hisList: searchHistory
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        //缓存搜索历史
        const _this = this;
        wx.setStorage({
            key: "searchHistory",
            data: _this.data.hisList
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})