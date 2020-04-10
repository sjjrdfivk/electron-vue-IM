<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import {creationFile} from './utils/file.js'
import {mapActions} from 'vuex'
export default {
  name: 'electron-vue-test',
  computed: {
    presentInfo () {
      return this.$store.state.user.chatListInfo
    }
  },
  created () {
    // window.addEventListener('beforeunload', () => { // 监听页面关闭保存聊天数据
    //   const list = JSON.stringify(this.presentInfo)
    //   const userMessage = localStorage.getItem('login')
    //   if (JSON.parse(userMessage) && JSON.stringify(list) !== '') { // 不知道为什么，写就是了
    //     creationFile('js', 'list.json', list).then((v) => {
    //     }).catch((err) => {
    //       console.error(err)
    //     })
    //   }
    // })
    let userInfo = localStorage.getItem('user')
    if (!('username' in this.$store.state.user.userInfo)) {
      this.getUserInfo(userInfo)
    }
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    getUserInfo (data) {
      this.setUserInfo(JSON.parse(data))
    }
  }
}
</script>

<style>
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } 
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } 
h1, h2, h3, h4, h5, h6{ font-size:100%; } 
address, cite, dfn, em, var { font-style:normal; } 
code, kbd, pre, samp { font-family:couriernew, courier, monospace; } 
small{ font-size:12px; } 
ul, ol { list-style:none; } 
a { text-decoration:none; } 
a:hover { text-decoration:underline; } 
sup { vertical-align:text-top; } 
sub{ vertical-align:text-bottom; } 
legend { color:#000; } 
fieldset, img { border:0; } 
button, input, select, textarea { font-size:100%; } 
table { border-collapse:collapse; border-spacing:0; } 
html,body{
    width: 100%;
    height: 100%;
    font-family:"PingFang SC","Hiragino Sans GB", "Helvetica Neue", "Microsoft Yahei";
}
button,textarea{
  background: none;
  outline: none;
  border: 0;
}
textarea{
  resize:none
}
.app{
  width: 100%;
  height: 100%;
}
a:hover{
  text-decoration:none;
}
.omit{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
/* 滚动条 */
 ::-webkit-scrollbar { 
    width: 6px;
    height: 6px;
} 
::-webkit-scrollbar-thumb { 
    border-radius: 3px; 
    background-color: #ccc; 
}
</style>
