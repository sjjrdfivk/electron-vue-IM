<template>
  <div class="sider">
    <user-tabs></user-tabs>
    <user-list></user-list>
  </div>
</template>

<script>
import {statFile, creationMkdir, creationFile} from '../../utils/file.js'
import UserTabs from './userTabs/Index'
import UserList from './userList/Index'
import {mapActions} from 'vuex'
export default {
  name: 'sider',
  data () {
    return {
    }
  },
  components: { UserTabs, UserList },
  created () {
    // this.init()
  },
  methods: {
    ...mapActions([
      'presentChatInfo',
      'chatInfo'
    ]),
    init () {
      this.caecklFile()
    },
    caecklFile () {
      // 检测路径是否存在
      statFile('js', 'list.json').then((v) => {
      }).catch(() => {
        creationMkdir('js').then(() => { // 创建目录
          this.creationData()
        }).catch(() => {
          this.creationData()
        })
      })
    },
    creationData () {
      const list = {
        '1': {
          id: '1',
          name: '小思',
          date: new Date(),
          describe: '智能机器人',
          record: []
        }
      }
      const data = JSON.stringify(list)
      creationFile('js', 'list.json', data).then((v) => {
        const index = Object.keys(list)[0]
        this.presentChatInfo(list[index])
        this.chatInfo(list)
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>
.sider {
  width: 305px;
  background-color: rgb(240, 240, 240);
  display: flex;
}
.sider>div{
    /* display: inline-block; */
}
</style>
