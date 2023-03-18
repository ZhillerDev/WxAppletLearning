import systemSetting from "../../store/system-setting"
import userSetting from "../../store/user-setting"
import Message from 'tdesign-miniprogram/message/index';

// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
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
    if(userSetting.isAuth){
      this.setData({
        isLogin:true,
        userInfo:{
          avatar:"../../image/tab/user.png",
          userName:userSetting.userName
        }
      })
    }
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
    let that = this
    if(!this.data.isLogin){
      Message.error({
        context: that,
        offset: [20, 32],
        duration: 1500,
        content: '请先登录后再退出= =',
      });
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

  getUserProfile(){
    let that = this
    wx.showLoading({
      title: '正在请求',
    })
    wx.login({
      success: (res) => {
        wx.request({
          url: systemSetting.url+"/user/create",
          method:'POST',
          header:systemSetting.dataHeader,
          data:{
            nickname:"tom",
            code:res.code
          },
          success:res=>{
            wx.hideLoading()
            console.log(res);
            userSetting.userUUID = res.data.data.open_id
            userSetting.userName = res.data.data.nickname
            that.setData({
              isLogin:true,
              userInfo:{
                avatar:"../../image/tab/user.png",
                userName:userSetting.userName
              }
            })
          },
          fail:err=>{
            wx.hideLoading()
          }
        })
      },
    })
  }
})