import userSetting from "./store/user-setting"
import systemSetting from './store/system-setting'

App({
  onLaunch() {
    let that = this
    wx.login({
      success: (res) => {
        wx.request({
          url: systemSetting.url+"/user/info",
          method:'GET',
          header:systemSetting.dataHeader,
          data:{
            code:res.code
          },
          success:res=>{
            if(res.statusCode!==400){
              userSetting.userUUID = res.data.data.open_id
              userSetting.userName = res.data.data.nickname
              userSetting.isAuth=true
            }
          },
          fail:err=>{
            console.log(err);
          }
        })
      },
    })
  },

  globalData: {
    userInfo: null
  }
})
