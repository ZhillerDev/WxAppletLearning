import Message from 'tdesign-miniprogram/message/index';

// pages/todo/todo.js
Page({
  data: {
    inputValue: '',
    todoList: [],
    currentUndo: 0,
    allComplete: false,
    isFocus:false
  },

  // 进入此页面时，自动设置好标题
  onShow: function () {
    wx.setNavigationBarTitle({
      title: 'Todo待办事项'
    })
  },

  // 输入框双向绑定处理
  inputChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 保存todos到本地内存
  saveTodos() {
    wx.setStorageSync('todo_list', this.data.todoList)
  },
  // 加载todos列表
  loadTodos() {
    let todos = wx.getStorageSync('todo_list')
    if (todos) {
      let undo = todos.filter((item) => {
        return !item.complete
      }).length
      this.setData({
        todoList: todos,
        currentUndo: undo
      })
    }
    console.log(todos);
  },

  // 页面加载钩子调用loadTodos
  onLoad() {
    this.loadTodos()
  },

  // 将新的待办事项添加到栏内
  addTodo() {
    if (!this.data.inputValue || !this.data.inputValue.trim()) return
    let todos = this.data.todoList
    todos.push({
      title: this.data.inputValue,
      complete: false
    })
    this.setData({
      inputValue: "",
      todoList: todos,
      currentUndo: this.data.currentUndo + 1,
      isFocus:true
    })
    this.saveTodos()
  },

  // 悬浮按钮回到顶部
  fabBack2Top(){
    wx.pageScrollTo({
      duration: 500,
      scrollTop:0
    })
  },

  // 点击完成单个事项
  toggleTodo(e) {
    let index = e.currentTarget.dataset.index
    let todos = this.data.todoList
    todos[index].complete = !todos[index].complete
    this.setData({
      todoList: todos,
      currentUndo: this.data.currentUndo + (todos[index].complete ? -1 : 1),
    })
    this.saveTodos()
  },
  // 选中全部的待办事项
  toggleAllTodos() {
    this.data.allComplete = !this.data.allComplete
    let todos = this.data.todoList
    todos.forEach(i => {
      i.complete = this.data.allComplete
    })
    this.setData({
      todoList: todos,
      currentUndo: this.data.allComplete ? 0 : todos.length
    })
    this.saveTodos()
  },

  // 删除单个待办事项
  removeTodo(e) {
    let index = e.currentTarget.dataset.index
    let todos = this.data.todoList
    let remove = todos.splice(index, 1)[0]
    this.setData({
      todoList: todos,
      currentUndo: this.data.currentUndo - (remove.complete ? 0 : 1)
    })
    this.saveTodos()
  },
  // 删除选中项
  removeTodos(e) {
    let todos = this.data.todoList
    let remain = []
    todos.forEach(i => {
      if (!i.complete) remain.push(i)
    })
    this.setData({
      todoList: remain
    })
    if(this.data.currentUndo===0){
      Message.success({
        context:this,
        content:"完成所有任务，休息一下吧！",
        duration:2000,
        offset: [20, 32],
        closeBtn: true
      })
    }
    this.saveTodos()
    wx.vibrateShort()
  },

  // 分享给好友接口
  onShareAppMessage: (res) => {

  }
})

