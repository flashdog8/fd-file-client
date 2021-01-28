<template>
  <div class="login-container" :style="{ background: 'url(' + bgImg + ')' }">
    <div class="top-container"></div>
    <div class="middle-container">
      <div class="login-info">&nbsp;</div>
      <div class="login-window">
        <el-card class="login-card">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

            <div class="title-container">
              <h3 class="title">文 件 管 理 系 统 登 录</h3>
            </div>

            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <el-form-item prop="captchaCode">
              <span class="svg-container">
                <svg-icon icon-class="icon" />
              </span>
              <el-input
                ref="captchaCode"
                v-model="loginForm.captchaCode"
                placeholder="验证码"
                name="captchaCode"
                type="text"
                tabindex="3"
                autocomplete="on"
                @keyup.enter.native="handleLogin"
              />
              <el-image v-if="verifyCodeImg !== undefined && verifyCodeImg !== null" class="verify-img" style="width: 120px; height: 36px" :src="verifyCodeImg" @click="refreshVerifyCode()" />
            </el-form-item>

            <el-button :loading="loading" type="info" native-type="submit" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>

            <div class="navs">
              <router-link to="/register">
                <el-button type="text" style="float: left">注册用户</el-button>
              </router-link>
            </div>

            <div class="tips">
              <span>北京小禹数行科技有限公司</span>
              <span>技术支持</span>
            </div>

          </el-form>
        </el-card>
      </div>
    </div>
    <div class="bottom-container"></div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getCaptcha } from '@/api/auth'

import bgImg from '@/assets/bg.jpg'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于6个字符'))
      } else {
        callback()
      }
    }
    const validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
    return {
      bgImg: bgImg,
      loginForm: {
        username: '',
        password: '',
        captchaId: null,
        captchaCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captchaCode: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
      },
      verifyCodeImg: null,
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.userCode === '') {
      this.$refs.userCode.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  mounted() {
    this.refreshVerifyCode()
  },
  methods: {
    refreshVerifyCode() {
      getCaptcha({ type: 0 }).then((response) => {
        const result = response.data
        this.loginForm.captchaId = result.captchaId
        this.verifyCodeImg = result.src
      }).catch((err) => {
        console.log(err)
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$light_gray:#aaa;
$cursor: #bbb;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 82%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  display: -webkit-flex;
  display: flex; 
  flex-direction: column;
  width: 100%;
  height: 100vh;
  min-height: 100vh;

  .top-container {
    height: 60px;
    background: #fff;
  }

  .middle-container {
    height: calc(100vh - 160px);
    width: 100%;
    display: -webkit-flex;
    display: flex; 
    flex-direction: row;

    .login-info {
      width: 60%;
    }

    .login-window {
      width: 40%;

      .login-card {
        width: 360px;
        margin: 60px 0px 0px 0px;
      }
    }
    
  }

  .bottom-container {
    height: 100px;
    background: #fff;
  }

  

  .navs {
    font-size: 14px;

    button {
      color: #889aa4;
    }
  }

  .tips {
    margin: 60px 0 10px 0;
    font-size: 14px;
    color: #ddd;
    text-align: center;

    * {
      margin-right: 8px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 40px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .verify-img {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

}
</style>
