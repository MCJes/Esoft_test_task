<template>
  <div class="container__form">
    <form class="from" @submit.prevent="loginUser">
      <router-link to="/"><h1>TODO-list</h1></router-link>
      <h2>Вход в аккаунт</h2>
      <div class="form__controls">
        <div class="form__col">
          <div class="form__control">
            <span class="input__name">Логин</span>
            <input type="text"
                   name="login"
                   class="control"
                   v-model="login">
            <span class="border__filled"></span>
          </div>
          <div class="form__control">
            <span class="input__name">Пароль</span>
            <input type="password"
                   name="password"
                   class="control"
                   v-model="password">
            <span class="border__filled"></span>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-submit">Вход</button>
    </form>
  </div>
</template>

<script>
import { request } from '@/utils/request'
import { TYPE } from "vue-toastification";

export default {
  name: 'Register',
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    loginUser: async function () {
      this.$loading(true)
      const response = await request('/user/signIn', 'POST', {
        userName: this.login,
        password: this.password,
      })
      this.$loading(false)

      if(response.errors.length > 0) {
        let timeout = 4000
        response.errors.forEach(err => {
          this.$toast(err.msg, {
            timeout,
            type: TYPE.WARNING,
            position: 'bottom-right',
          })
          timeout += 100
        })
        return
      }

      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      await this.$router.push('/tasks')
    }
  },
}
</script>

<style lang="scss" scoped>
$primary: #74a8ff;
$font: 'Roboto', sans-serif;

h1, h2{
  width: 100%;
  color: $primary;
  text-align: center;
  font-weight: 400;
}

h1 {

  font-size: 50px;
}

h2 {
  font-size: 20px;
  opacity: 0.7;
}

.container__form {
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form__col {
  max-width: 45%;
  display: flex;
  flex-direction: column;
}

.from {
  border-radius: 6px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 600px;
  padding: 10px;

  .form__controls {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}

.btn-submit {
  margin-top: 30px;
  width: 40%;
}


$font: 'Roboto', sans-serif;

</style>
