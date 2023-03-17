// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
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
    wx.setNavigationBarTitle({
      title: '农大随手拍'
    })
    
  },

  addIssue(){
    wx.navigateTo({
      url: '../add/add',
    })
  }  

})
