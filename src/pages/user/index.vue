<template>
  <div class="user">
    <div class="user-form">
      <div class="user-form-item">
        <div class="user-form-item-label">用户名</div>
        <input
          type="text"
          class="user-form-item-input"
          placeholder="请输入用户名"
          v-model="name"
        >
      </div>
      <div class="user-form-item">
        <div class="user-form-item-label">密码</div>
        <input
          type="password"
          class="user-form-item-input"
          placeholder="请输入密码"
          v-model="password"
        >
      </div>
    </div>
    <button
      class="user-btn-login"
      @click="handleLogin"
    >登录</button>
    <button
      class="user-btn-reg"
      @click="handleReg"
    >注册</button>
  </div>
</template>

<script>
// api
import { userLogin, userReg, } from '@/api'
export default {
  name: 'user',
  data() {
    return {
      name: '',
      password: '',
    }
  },
  methods: {
    async handleLogin() {
      if (this.name.trim() === '' || this.password.trim() === '') {
        this.$toast({
          msg: '用户名或密码不能为空',
          pos: 'bottom'
        })
        return
      }
      const data = await userLogin({
        name: this.name,
        password: this.password
      })
      if (data instanceof Array) {
        this.$toast({
          msg: '用户未注册',
          pos: 'bottom'
        })

      } else {
        this.$toast({
          msg: '登录成功',
          pos: 'bottom'
        })
        localStorage.setItem('uid', data['id'])
        localStorage.setItem('createdAt', data['createdAt'])
        // 跳转到首页
        const timer = setTimeout(() => {
          this.$router.replace('/')
          clearTimeout(timer)
        }, 500)
      }
    },
    async handleReg() {
      if (this.name.trim() === '' || this.password.trim() === '') {
        this.$toast({
          msg: '用户名或密码不能为空',
          pos: 'bottom'
        })
        return
      }
      const data = await userReg({
        name: this.name,
        password: this.password
      })
      if (data.length) {
        this.$toast({
          msg: '注册成功,请登录',
          pos: 'bottom'
        })
      } else {
        this.$toast({
          msg: '该用户已注册',
          pos: 'bottom'
        })
      }
    }
  },
  created() {
    this.$store.commit('setHasNav', false);
  }
}
</script>

<style lang="scss">
@import "~@/styles/base";
.user {
  margin: 30px 30px 0;
  &-form {
    margin-bottom: 30px;
    &-item {
      @include disFlex(row, flex-start, center);
      height: 40px;
      border-bottom: 1px solid #ccc;
      &-label {
        min-width: 40px;
        margin-right: 10px;
      }
      &-input {
        flex: 1;
      }
    }
  }
  &-btn {
    &-login,
    &-reg {
      display: block;
      color: $mainColor;
      background-color: $primaryColor;
      font-size: 14px;
      width: 70%;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      border-radius: 10px;
    }
    &-login {
      margin-bottom: 20px;
    }
  }
}
</style>