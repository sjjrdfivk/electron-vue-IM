<template>
  <div class="login">
    <div class="login-alert">
      <mu-alert color="error" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition">
        <mu-icon left value="error"></mu-icon>{{this.alertMess}}
        <a style="color:#161716;margin-left:20px" href="javascript:;" @click="goPageSignUp">前往注册</a>
      </mu-alert>
    </div>
    <div class="box">
      <mu-container>
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item label="UserName:" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username" :rules="usernameRules"></mu-text-field><br/>
          </mu-form-item>
          <mu-form-item label="Password:" prop="password" :rules="passwordRules">
            <mu-text-field v-model="validateForm.password" prop="password" :rules="passwordRules"></mu-text-field><br/>
          </mu-form-item>
        </mu-form>
      </mu-container>
    </div>
    <div class="login-button">
      <mu-button color="primary" @click="loginClick">登录</mu-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <mu-button @click="goPageSignUp">注册</mu-button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
const { remote } = require('electron')
export default {
  name: 'login',
  data () {
    return {
      validateForm: {
        username: 'admin1',
        password: '123456'
      },
      alert1: false,
      alertMess: '',
      usernameRules: [
        {validate: (val) => !!val, message: '必须填写用户名'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '必须填写密码'}
      ]
    }
  },
  created () {
    // remote.setMinimumSize().setSize(200, 200)
    remote.getCurrentWindow().setSize(200, 200) // 修改win窗口大小
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    loginClick () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          // 发送到服务器
          // this.sockets.subscribe('login', (data) => {
          //   console.log(data)
          // })
          this.$http.post('login', this.validateForm).then(v => {
            if (v.data.status) {
              this.alert1 = false
              this.creationData(v.data.data)
            } else {
              this.alert1 = true
              this.alertMess = v.data.message
            }
          })
        }
      })
    },
    creationData (data) {
      localStorage.setItem('login', true)
      localStorage.setItem('user', JSON.stringify(data))
      this.setUserInfo(data)
      this.$router.push({path: '/'})
      remote.getCurrentWindow().setSize(900, 700)
    },
    goPageSignUp () {
      this.$router.push({path: '/SignUp'})
    }
  }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  font-family: "montserrat";
  background-image: linear-gradient(125deg,rgb(185, 219, 250),rgb(96, 199, 250),rgb(47, 130, 212),rgb(185, 219, 250));
  background-size: 400%;
  animation: bganimation 15s infinite;
}
.login-alert{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 35px;
}
.mu-alert{
  padding: 0 40px;
  min-height:35px;
}
.box{
    padding: 0 120px;
    padding-top: 70px;
    width: 100%;
    display: flex;
    justify-items: center;
    align-content: center;
}

.login-button{
  margin-top: 20px;
  text-align: center;
}

@keyframes bganimation {
  0%{
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0% 50%;
  }
}
</style>
