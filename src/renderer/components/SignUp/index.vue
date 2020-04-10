<template>
    <div class="sign-up-box">
        <div class="login-alert">
            <mu-alert color="error" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition">
                <mu-icon left value="error"></mu-icon>{{this.alertMess}}
            </mu-alert>
        </div>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item label="用户名" help-text="帮助文字" prop="username" :rules="usernameRules">
                <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="密码" prop="password" :rules="passwordRules">
                    <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="isAgree" :rules="argeeRules">
                <mu-checkbox label="装个样子点一下" v-model="validateForm.isAgree"></mu-checkbox>
                </mu-form-item>
                <mu-form-item>
                <mu-button color="primary" @click="submit">提交</mu-button>
                <mu-button @click="clear">重置</mu-button>
                <mu-button @click="()=>{$router.push({path:'/login'})}">返回</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      usernameRules: [
        {validate: (val) => !!val, message: '必须填写用户名'},
        {validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        {validate: (val) => !!val, message: '必须填写密码'},
        {validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{validate: (val) => !!val, message: '意思意思点一下'}],
      validateForm: {
        username: '',
        password: '',
        isAgree: false
      },
      alert1: false,
      alertMess: ''
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.$http.post('signUp', this.validateForm).then(v => {
            if (v.data.status) {
              this.alert1 = false
              this.$router.push({path: '/login'})
            } else {
              this.alert1 = true
              this.alertMess = v.data.message
            }
          })
        }
      })
    },
    clear () {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      }
    }
  }
}
</script>
<style scoped>
.sign-up-box{
    padding-top: 40px;
}
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.login-alert{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
}
.mu-alert{
  padding: 0 40px;
  min-height:35px;
}
</style>