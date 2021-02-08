<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
$font: 'Roboto', sans-serif;
$primary: #74a8ff;

*, *:after, *:before{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #fafafa;
  font-family: $font;
}

a {
  text-decoration: none;
}

.btn {
  outline: none;
  border: none;
  padding: 10px;
  background-color: $primary;
  color: #ffffff;
  font-family: $font;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  border-radius: 2px;
  transition: background-color 0.25s ease;
  user-select: none;
  text-align: center;

  &:hover {
    background-color: $primary / 1.2;
  }
}

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
