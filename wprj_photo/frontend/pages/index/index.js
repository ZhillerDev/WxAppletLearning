import Message from 'tdesign-miniprogram/message/index';
import userSetting from '../../store/user-setting'

// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    isFab:true,
    swiperData:{
      list:[
        'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
        'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
      ],
      current:1,
      nav:{
        type:"dots",
      }
    }
  },
 
  onLoad() {
    this.setData({
      isFab:userSetting.isFab
    })
    wx.setNavigationBarTitle({
      title: '农大随手拍'
    })
    
  },

  handleScan(){
    let that = this
    wx.scanCode({
      success:res=>{
        console.log(res);
      },
      fail:err=>{
        Message.error({
          context: that,
          offset: [20, 32],
          duration: 1500,
          content: '扫码取消或扫码失败',
        });
      }
    })
  },

  addIssue(){
    wx.navigateTo({
      url: '../add/add',
    })
  }  

})
