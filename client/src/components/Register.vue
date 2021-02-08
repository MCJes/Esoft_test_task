<template>
  <div class="container__form">
    <form class="from" @submit.prevent="registerUser">
      <router-link to="/"><h1>TODO-list</h1></router-link>
      <h2>Регистрация пользователя</h2>
      <div class="form__controls">
        <div class="form__col">
          <div class="form__control">
            <span class="input__name">Имя</span>
            <input type="text"
                   name="name"
                   class="control"
                   v-model="name">
            <span class="border__filled"></span>
          </div>
          <div class="form__control">
            <span class="input__name">Фамилия</span>
            <input type="text"
                   name="surName"
                   class="control"
                   v-model="surName">
            <span class="border__filled"></span>
          </div>
          <div class="form__control">
            <span class="input__name">Отчество</span>
            <input type="text"
                   name="middleName"
                   class="control"
                   v-model="middleName">
            <span class="border__filled"></span>
          </div>
        </div>
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
      <button type="submit" class="btn btn-submit">Регистрация</button>
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
      input: '',
      name: '',
      surName: '',
      middleName: '',
      login: '',
      password: '',
    }
  },
  methods: {
    registerUser: async function () {
      this.$loading(true)
      const response = await request('/user/signUp', 'POST', {
        name: this.name,
        surname: this.surName,
        middleName: this.middleName,
        userName: this.login,
        password: this.password,
      })
      this.$loading(false)
      if(response.errors.length > 0) {
        console.log(response.errors)
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

      await this.$router.push('/login')
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
.form__control {
  float: left;
  max-width: 100%;
  margin: 10px 3%;
  position: relative;
}

.input__name {
  color: #74a8ff;
  font-weight: 600;
}

.control {
  font-family: $font;
  border: none;
  color: #333;
  width: 100%;
  letter-spacing: 1px;
  padding: 7px 2px;
  border-bottom: 1px solid #bababa;
  position: relative;
  background: transparent;
  outline: none;
  font-size: 16px;
}

.control ~ .border__empty,
.control ~ .border__filled {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #2196F3;
  transition: 0.4s;
}

.control:focus ~ .border__filled {
  background-color: #2196F3;
  width: 100%;
}

</style>
