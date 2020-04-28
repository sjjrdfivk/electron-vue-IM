<template>
  <div class="send-box" id="send">
    <div class="send-icon">
      <mu-icon value="mood"></mu-icon>
      <mu-icon value="folder"></mu-icon>
      <mu-icon value="wallpaper"></mu-icon>
      <mu-icon value="sms"></mu-icon>
    </div>
    <div class="send-text">
      <textarea v-model="value" @keyup.enter='sendInformation'></textarea>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'send-text',
  data () {
    return {
      value: ''
    }
  },
  computed: {
    presentInfo () {
      return this.$store.state.user.presentInfo
    },
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  mounted () {
    let resize = document.querySelector('#send')
    let box = document.querySelector('.content')
    resize.onmousedown = function (e) {
      const startX = e.clientY
      resize.top = resize.offsetTop
      box.onmousemove = function (e) {
        console.log(resize.top)
        var endX = e.clientY
        var moveLen = resize.top + (endX - startX)
        // var maxT = box.clientHeight - resize.offsetHeight
        resize.style.top = moveLen
        // left.style.height = moveLen + "px"
        resize.style.height = (box.clientHeight - moveLen - 5) + 'px'
      }
      box.onmouseup = function (evt) {
        box.onmousemove = null
        box.onmouseup = null
        resize.releaseCapture && resize.releaseCapture()
      }
    }
  },
  methods: {
    ...mapActions([
      'setChatListInfo'
    ]),
    sendInformation () {
      const value = this.value.split('\n')[0]
      const param = {
        sendId: this.userInfo.userid, // 发送者
        receiveId: this.presentInfo.userid, // 接收者
        message: value
      }
      if (value === '') {
        return
      }
      this.$socket.emit('message', param)
      this.putChatData(param, 1)
      this.value = ''
      // const params = {
      //   'appid': '005c57870b9b0820317ce2cf1110b731',
      //   'userid': 'user',
      //   'spoken': value
      // }
      // this.putChatData(value, 1)
      // this.value = ''
      // this.$http.post('/bot', params).then(v => {
      //   this.putChatData(v.data.data.info.text, 2)
      // })
    },
    putChatData (v, type) {
      const data = {
        date: new Date(),
        value: v,
        type
      }
      this.setChatListInfo(data)
    }
  }
}
</script>

<style scoped>
  .send-icon{
    position: absolute;
    top: 10px;
    left: 25px;
  }
  .send-icon i{
    cursor: pointer;
  }
  .send-box{
    background: #ffffff;
    height: 130px;
    position:absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgb(239, 236, 236);
    /* position: relative; */
  }
  .send-text{
    height: 64px;
    overflow: hidden;
    margin-top: 45px;
  }
  .send-text>textarea{
    width: 100%;
    height: 100%;
    border: none;
    user-select:auto;
    outline:medium;
    padding-left: 30px;
    box-sizing: border-box;
  }
</style>
