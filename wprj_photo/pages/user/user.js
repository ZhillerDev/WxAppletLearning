

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    userProfile:{},
    userInfo:{
      avatar:"../../image/tab/user.png",
      userName:""
    },
    settingsData:[
      {
        id:1,
        url:"../../image/setting/report.png",
        title:"报告记录"
      },
      {
        id:2,
        url:"../../image/setting/setting.png",
        title:"更多设置"
      },
      {
        id:3,
        url:"../../image/setting/service.png",
        title:"客服服务"
      },
      {
        id:4,
        url:"../../image/setting/about.png",
        title:"关于"
      },
      {
        id:5,
        url:"../../image/setting/exit.png",
        title:"退出"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  switchBinding(res){
    let id = res.currentTarget.dataset.id
    switch(id){
      case 1:
        this.settingClick(id)
        break;
      case 2:
        wx.showToast({
          title: '没有设置',
          duration:1000,
          icon:"success"
        })
        break;
      case 4:
        this.getAbout()
        break;
      case 5:
        this.handleLoginOut()
        break;
    }
  },


  getAbout(){
    wx.request({
      url: 'http://bqza86.natappfree.cc/health',
      method:"GET",
      dataType:"json",
      success:(res)=>{
        console.log(res.data);
      }
    })
  },
  handleLoginOut(){
    if(!this.data.isLogin){
      wx.showModal({
        title: '错误',
        content: '您还未登录，不能退出登录= =',
        complete: (res) => {
          
        }
      })
    } else{
      this.setData({
        userProfile:"",
        userInfo:{
          avatar:"../../image/tab/user.png",
          userName:""
        },
        isLogin:false
      })
    }
  },
  settingClick:(e)=>{
    console.log(e);
  },
  userLogin(){
    wx.login({
      success: (res) => {
        
      },
    })
  },
  getUserProfile(){
    let that = this
    wx.getUserProfile({
      desc: '获取您的用户信息',
      success:(res)=>{
        that.setData({
          userProfile:res.userInfo,
          userInfo:{
            avatar:res.userInfo.avatarUrl,
            userName:res.userInfo.nickName
          },
          isLogin:true
        })
      },
      fail:(err)=>{
        wx.showToast({
          title:"获取失败",
          duration:1500,
          icon:"error"
        })
      }
    })
  }
})