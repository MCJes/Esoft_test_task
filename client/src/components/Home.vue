<template>
  <div class="wrapper">
    <div class="container">
      <h1>TODO-list</h1>
      <p>Приложение TODO-list. Войдите или создайте новый аккаунт чтобы продолжить.</p>
      <nav class="nav">
        <router-link to="/login" class="btn btn-link">Войти</router-link>
        <router-link to="/register" class="btn btn-link">Регистрация</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
$primary: #74a8ff;
$font: 'Roboto', sans-serif;

h1, p{
  width: 100%;
  color: $primary;
  text-align: center;
  font-weight: 400;
}

h1 {
  font-size: 50px;
}

p {
  font-size: 20px;
  opacity: 0.7;
}

.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.container {
  width: 600px;
  background-color: white;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}

.nav {
  margin-top: 10px;
  justify-content: space-around;
  display: flex;
  width: 100%;
}
.btn-link {
  width: 30%;
}
</style>