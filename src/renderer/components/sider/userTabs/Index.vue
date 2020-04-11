<template>
  <div class="user-tabs">
    <div class="user-tabs-portrait">
      <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
    </div>
    <div>
    <div class="more">
      <mu-menu cover placement="top-start">
        <mu-button icon>
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="quitLogin">
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'user-tabs',
    methods: {
      ...mapActions([
        'deleteStateInfo'
      ]),
      quitLogin () {
        this.$socket.emit('logout', {userid: this.$store.state.user.userInfo.userid})
        this.$socket.close()
        localStorage.setItem('login', false)
        this.deleteStateInfo()
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style scoped>
  .user-tabs{
      background: #333333;
      height: 100%;
      color: #ffffff;
      flex: 0 0 60px;
      position: relative;
  }
  .user-tabs-portrait{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .user-tabs-portrait img{
    width: 30px;
    height: 30px;
    border-radius: 4px;
  }
  .more{
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
</style>
