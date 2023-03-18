import ActionSheet, {
  ActionSheetTheme
} from 'tdesign-miniprogram/action-sheet/index';
import Message from 'tdesign-miniprogram/message/index';
import userSetting from '../../store/user-setting'
import systemSetting from "../../store/system-setting"

var QQMapWX = require('../../api/qqmap-wx-jssdk.js');
var qqmapsdk;

// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: "",
    questionType: [],
    position: "",
    originFiles: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
  },



  setQuestion(q) {
    if (this.data.question.length < 100) {
      this.setData({
        question: q.detail.value
      })
    }
  },
  setQuestionType(e) {
    this.setData({
      questionType: e.detail.value
    })
  },
  getPosition() {
    let that = this
    qqmapsdk.reverseGeocoder({
      success: (res) => {
        console.log(res.result.address);
        that.setData({
          position: res.result.address
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  // 上传图片相关方法
  handleSuccess(e) {
    const {
      files
    } = e.detail;
    this.setData({
      originFiles: files,
    });
    // 一个很愚蠢的，限制图片上传数量的方法。。。
    if (this.data.originFiles.length > 5) {
      this.setData({
        originFiles: [
          this.data.originFiles[0],
          this.data.originFiles[1],
          this.data.originFiles[2],
          this.data.originFiles[3],
          this.data.originFiles[4]
        ]
      })
    }
    console.log(this.data.originFiles);
  },
  handleRemove(e) {
    const {
      index
    } = e.detail;
    const {
      originFiles
    } = this.data;
    originFiles.splice(index, 1);
    this.setData({
      originFiles,
    });
  },
  handleClick(e) {
    console.log(e.detail.file);
  },

  // 重新填写
  resetAll() {
    ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      showCancel: false,
      items: [{
        label: '确认清除',
      }, {
        label: "取消"
      }],
    });
  },
  handleSelect(e) {
    if (e.detail.index == 0) {
      Message.info({
        context: this,
        offset: [20, 32],
        duration: 1000,
        content: '已清除表单',
      });
      this.setData({
        question: "",
        position: "",
        questionType: [],
        defaultHover: ['c1'],
        originFiles: []
      })
    }
  },
  // 提交表单
  submitAll() {
    let that = this
    const datas = this.data
    console.log(datas.originFiles);
    if (datas.originFiles != [] && datas.question != '' && datas.position != '' && datas.questionType != []) {
      wx.showLoading({
        title: '提交数据中',
        mask:true
      })
      wx.request({
        url: systemSetting.url+"/data/push",
        method: 'POST',
        dataType: 'json',
        data: {
          name: userSetting.userName,
          content: datas.question,
          location: datas.position,
          types: datas.questionType.toString(),
          photos: datas.originFiles
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: (res) => {
          // console.log(res);
          wx.hideLoading()
          // wx.navigateBack()
          // wx.showToast({
          //   title: '提交成功',
          //   icon:'success',
          //   duration:1000
          // })
        },
        fail: err => {
          console.log(err);
          wx.hideLoading()
          Message.error({
            context: that,
            offset: [20, 32],
            duration: 2000,
            content: '很抱歉，提交失败',
          });
        }
      })
    } else {
      Message.error({
        context: that,
        offset: [20, 32],
        duration: 2000,
        content: '请填写完所有必填项再提交！',
      });
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '发布现象'
    })
    qqmapsdk = new QQMapWX({
      key: '4KUBZ-PFM6X-BEU4H-TBM2N-ECPD5-7EFP6'
    });
  },
})