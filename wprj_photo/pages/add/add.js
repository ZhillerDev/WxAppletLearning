import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';

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
    originFiles:[],
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
    const { files } = e.detail;
    this.setData({
      originFiles: files,
    });
    // 一个很愚蠢的，限制图片上传数量的方法。。。
    if(this.data.originFiles.length>5){
      this.setData({
        originFiles:[
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
    const { index } = e.detail;
    const { originFiles } = this.data;
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
      items: [{
          label: '确认清除',
        }
      ],
    });
  },
  handleSelect(e){
    if(e.detail.index==0){
      this.setData({
        question:"",
        position:"",
        questionType:[],
        defaultHover:['c1'],
        originFiles:[]
      })
    }
  },

  submitAll(){
    const datas = this.data
    if(datas.originFiles!=[]&&datas.question!=''&&datas.position!=''&&datas.questionType!=[]){
      console.log(123);
    }else{
      console.log("还没填写？？？");
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