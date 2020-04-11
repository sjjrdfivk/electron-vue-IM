<template>
  <div class="user-list">
    <div class="user-list-li" v-for="item in presentInfo" :key="item.userid" @click="userListChange(item)" :style="index == item.userid && 'background: rgba(0, 0, 0, .1);'">
      <div class="user-list-portrait">
        <mu-badge :content="`${item.read || '0'}`" :badge-class="!!!item.read?'badeg-class':''" circle color="secondary">
          <mu-avatar color="teal">
            {{item.username[0]}}
          </mu-avatar>
        </mu-badge>
      </div>
      <div class="user-list-con">
        <div class="user-list-title">
          <span style="width: 100px;" class="omit">{{item.username}}</span>
          <span>{{setTime(item.date)}}</span>
        </div>
        <div class="user-list-de omit">{{item.record.length ? item.record[item.record.length-1].value.message : '暂无消息'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDateTime, isSameDay} from '../../../utils/date.js'
import {mapActions} from 'vuex'
export default {
  name: 'user-list',
  data () {
    return {
      index: '',
      list: []
    }
  },
  computed: {
    presentInfo () {
      return this.$store.state.user.chatListInfo
    },
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'presentChatInfo',
      'setChatListInfo',
      'chatInfo'
    ]),
    init () {
      this.$nextTick(() => {
        this.$socket.emit('login', { // 加入聊天
          userid: this.userInfo.userid,
          username: this.userInfo.username
        })
        this.getServerListData()
      })
      this.sockets.subscribe(`message-${this.userInfo.userid}`, (data) => {
        console.log('测试接收', data)
        this.putChatData(data, 2)
      })
      this.sockets.subscribe('login', (data) => { // 接收有用户加入广播
        console.log('接收有用户加入广播', data)
        this.getServerListData()
      })
    },
    // 聊天列表
    getServerListData () {
      this.$http.get('list?userid=' + this.userInfo.userid).then(v => {
        if (v.data.status) {
          this.setListData(v.data.data)
        }
      })
    },
    putChatData (v, type) {
      const data = {
        date: new Date(),
        value: v,
        type
      }
      this.setChatListInfo(data)
    },
    setListData (list) {
      if (!this.$store.state.user.presentInfo) {
        this.list = list
        this.index = list[0]['userid']
        this.presentChatInfo(list[0]) // 默认显示第一条数据
      }
      this.chatInfo(list)
    },
    setTime (t) {
      if (isSameDay(t, new Date())) {
        return formatDateTime(t, 'HH:mm')
      } else {
        return formatDateTime(t, 'yyyy/MM/dd')
      }
    },
    userListChange (item) {
      this.index = item.userid
      this.presentChatInfo(this.list.find(item => item.userid === this.index))
    }
  }
}
</script>
<style>
  .user-list .badeg-class{
    display: none;
  }
</style>
<style scoped>
  .user-list{
    font-size: 12px;
    flex: 0 0 245px;
  }
  .user-list-portrait{
    display: flex;
    justify-content: center;
  }
  .user-list-li{
    display: flex;
    padding: 15px 10px;
    cursor: default;
  }
  .user-list-li:hover{
    background: rgba(177, 177, 177, 0.2);
  }
  .user-list-con{
    width: 100%;
    padding-left: 10px;
  }
  .user-list-title{
    font-size: 14px;
    color: #000000;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .user-list-title>span:nth-child(2){
    font-size: 12px;
    color: #ababab;
  }
  .user-list-de{
    margin-top: 4px;
    font-size: 12px;
    color: #ababab;
    width: 130px;
  }
</style>
