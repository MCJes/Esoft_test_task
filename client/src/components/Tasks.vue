<template>
  <div class="wrapper">
    <header class="header">
        <div class="container">
          <div class="header__body">
            <div class="name">
              <p>{{ name }}</p>
              <p>Логин: {{ username }}</p>
            </div>
            <h1>
              Список задч
            </h1>
            <div class="logout">
              <button type="button" class="btn" @click="logout">Выход</button>
            </div>
          </div>
        </div>
    </header>
    <main class="main">
      <div class="container">
        <div class="btn__container">
          <button class="btn" @click="openUsers">Добавить подчиненного</button>
          <button class="btn" @click="openCreate">Создать задачу</button>
        </div>
        <div class="tasks">
          <div class="tasks__my" v-if="taskShow">
            <h2>Мои задачи</h2>
            <div class="task__params">
              Отображение:
              <span class="param" @click="sortMyRegular">Обычный</span>
              <span class="param" @click="sortMyDateEnd">По дате завершения</span>
            </div>
            <div class="tasks__container">
              <div class="task" v-for="task in tasks"
                   v-bind:key="task.id"
                   v-bind:value="task.id"
                   @click="openStatus">
                <div class="task__row">
                  <div class="task__col">
                    <p class="heading" v-bind:class="{
                      'outDate': new Date(task.completedAt) < Date.now(),
                      'completed': task.status.id === 3
                    }">{{task.heading}}</p>
                    <p>Ответственный: {{name}}</p>
                    <p>Приоритет: {{task.priority.value}}</p>
                  </div>
                  <div class="task__col">
                    <p>{{task.completedAt.split('T')[0]}}</p>
                    <p>{{task.status.value}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tasks__created" v-if="taskCShow">
            <h2>Созданные мной</h2>
            <div class="task__params">
              Отображение:
              <span class="param" @click="sortCRegular">Обычный</span>
              <span class="param" @click="sortCDateEnd">По дате завершения</span>
              <span class="param" @click="sortManagers">По ответственным</span>
            </div>
            <div class="tasks__container">
              <div class="task" v-for="task in tasksC"
                   v-bind:key="task.id"
                   v-bind:value="task.id"
                   @click="openEdit">
                <div class="task__row">
                  <div class="task__col">
                    <p class="heading" v-bind:class="{
                      'outDate': new Date(task.completedAt) < Date.now(),
                      'completed': task.status.id === 3
                    }">{{task.heading}}</p>
                    <p>Ответственный: {{`${task.manager.value.surname}
                 ${task.manager.value.name.substring(0, 1).toUpperCase()}.
                 ${task.manager.value.middleName.substring(0, 1).toUpperCase()}.`}}</p>
                    <p>Приоритет: {{task.priority.value}}</p>
                  </div>
                  <div class="task__col">
                    <p>{{task.completedAt.split('T')[0]}}</p>
                    <p>{{task.status.value}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div id="modal__create" class="modal" v-bind:style="displayCreate">
      <div class="modal-content">
        <div class="modal-header">
          <div class="close" @click="closeCreate">&times;</div>
          <h2>Создать задачу</h2>
        </div>
        <div class="modal-body">
          <div class="form__control">
            <span class="input__name">Заголовок</span>
            <input type="text"
                   name="heading"
                   class="control"
                    v-model="heading">
            <span class="border__filled"></span>
          </div>
          <div class="form__control">
            <span class="input__name">Описание</span>
           <textarea class="text" rows="5" v-model="description"></textarea>
          </div>
          <div class="modal__row">
            <div class="form__control">
              <span class="input__name">Приоритет</span>
              <select name="priority"
                      class="control"
                      v-model="priority">
                <option v-for="priority in priorityList" v-bind:value="priority.id" v-bind:key="priority.id">
                  {{priority.priority}}
                </option>
              </select>
            </div>
            <div class="form__control">
              <span class="input__name">Статус</span>
              <select name="status"
                      class="control"
                      v-model="status">
                <option v-for="status in statusList" v-bind:value="status.id" v-bind:key="status.id">
                  {{status.status}}
                </option>
              </select>
            </div>
            <div class="form__control">
              <span class="input__name">Ответственный</span>
              <select name="manager"
                      class="control"
                      v-model="user">
                <option v-for="user in usersMy" v-bind:key="user.id" v-bind:value="user.id">
                  {{`${user.surname.substring(0, 1).toUpperCase()}${user.surname.substring(1, user.surname.length)}
                 ${user.name.substring(0, 1).toUpperCase()}.
                 ${user.middleName.substring(0, 1).toUpperCase()}.`}} | Логин: {{user.userName}}
                </option>
              </select>
            </div>
            <div class="form__control">
              <span class="input__name">Дата окончания</span>
              <input type="date"
                     name="date"
                     class="control"
                     v-model="dateEnd">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-create" @click="createTask">Создать</button>
        </div>
      </div>
    </div>
    <div id="modal__users" class="modal" v-bind:style="displayUsers">
      <div class="modal-content">
        <div class="modal-header">
          <div class="close" @click="closeUsers">&times;</div>
          <h2>Добавить подчиненного</h2>
        </div>
        <div class="modal-body">
          <div class="form__control">
            <span class="input__name">Пользователь</span>
            <select name="manager"
                    class="control"
                    v-model="manager">
              <option v-for="user in users" v-bind:key="user.id" v-bind:value="user.id">
                {{`${user.surname.substring(0, 1).toUpperCase()}${user.surname.substring(1, user.surname.length)}
               ${user.name.substring(0, 1).toUpperCase()}.
               ${user.middleName.substring(0, 1).toUpperCase()}.`}} | Логин: {{user.userName}}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-create" @click="addManager">Добавить</button>
        </div>
      </div>
    </div>
    <div id="modal__editStatus" class="modal" v-bind:style="displayStatus">
      <div class="modal-content">
        <div class="modal-header">
          <div class="close" @click="closeStatus">&times;</div>
          <h2>Сменить статус</h2>
        </div>
        <div class="modal-body">
          <div class="form__control">
            <span class="input__name">Статус</span>
            <select name="manager"
                    class="control"
                    v-model="editedStatus">
              <option v-for="status in statusList" v-bind:key="status.id" v-bind:value="status.id">
                {{status.status}}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-create" @click="updateStatus">Изменить</button>
        </div>
      </div>
    </div>
    <div id="modal__edit" class="modal" v-bind:style="displayEdit">
      <div class="modal-content">
        <div class="modal-header">
          <div class="close" @click="closeEdit">&times;</div>
          <h2>Редактировать задачу</h2>
        </div>
        <div class="modal-body">
          <div class="form__control">
            <span class="input__name">Заголовок</span>
            <input type="text"
                   name="heading"
                   class="control"
                   v-model="currentTask.heading">
            <span class="border__filled"></span>
          </div>
          <div class="form__control">
            <span class="input__name">Описание</span>
            <textarea class="text" rows="5" v-model="currentTask.description"></textarea>
          </div>
          <div class="modal__row">
            <div class="form__control">
              <span class="input__name">Приоритет</span>
              <select name="priority"
                      class="control"
                      v-model="priorityEdit">
                <option v-for="priority in priorityList"
                        v-bind:value="priority.id"
                        v-bind:key="priority.id">
                  {{priority.priority}}
                </option>
              </select>
            </div>
            <div class="form__control">
              <span class="input__name">Статус</span>
              <select name="status"
                      class="control"
                      v-model="statusEdit">
                <option v-for="status in statusList" v-bind:value="status.id" v-bind:key="status.id">
                  {{status.status}}
                </option>
              </select>
            </div>
            <div class="form__control">
              <span class="input__name">Ответственный</span>
              <select name="manager"
                      class="control"
                      v-model="managerEdit">
                <option v-for="user in usersMy" v-bind:key="user.id" v-bind:value="user.id">
                  {{`${user.surname.substring(0, 1).toUpperCase()}${user.surname.substring(1, user.surname.length)}
                 ${user.name.substring(0, 1).toUpperCase()}.
                 ${user.middleName.substring(0, 1).toUpperCase()}.`}} | Логин: {{user.userName}}
                </option>
              </select>
            </div>
            <div class="form__control">
              <span class="input__name">Дата окончания</span>
              <input type="date"
                     name="date"
                     class="control"
                     v-model="dateEdit">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-create" @click="editTask">Изменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '@/utils/request'
import {TYPE} from "vue-toastification";

export default {
  name: 'Tasks',
  data() {
    return {
      name: '',
      username: '',
      tasks: [],
      tasksC: [],
      create: 'none',
      usersModal: 'none',
      editStatus: 'none',
      heading: '',
      description: '',
      priority: '',
      priorityList: [],
      status: '',
      statusList: [],
      user: '',
      users: [],
      usersMy: [],
      dateEnd: '',
      manager: '',
      editedStatus: '',
      currentTask: '',
      editModal: 'none'
    }
  },
  async mounted() {
    await this.getTasks()
  },
  methods: {
    async logout() {
      localStorage.clear()
      await this.$router.push('/')
    },
    async getTasks() {
      this.$loading(true)
      const user = JSON.parse(localStorage.getItem('user'))
      this.username = user.login
      this.name = `${user.surname.substring(0, 1).toUpperCase()}${user.surname.substring(1, user.surname.length)}
                 ${user.name.substring(0, 1).toUpperCase()}.
                 ${user.middleName.substring(0, 1).toUpperCase()}.`

      const tasks = await request('/tasks/get/managed')
      if(!tasks.errors) {
        this.tasks = tasks
        this.sortMyRegular()
      }
      const tasksC = await request('/tasks/get/created')
      if(!tasksC.errors) {
        this.tasksC = tasksC
        this.sortCRegular()
      }
      const props = await request('/tasks/props')
      this.priorityList = props.priorities
      this.statusList = props.statuses
      this.users = await request('/tasks/users/none')
      this.usersMy = await request('/tasks/users/my')
      this.$loading(false)
    },
    closeCreate() {
      this.create = 'none'
    },
    openCreate() {
      this.create = 'block'
    },
    closeUsers() {
      this.usersModal = 'none'
    },
    openUsers() {
      this.usersModal = 'block'
    },
    closeEdit() {
      this.editModal = 'none'
    },
    async openEdit(e) {
      const currentTask = await request(`/tasks/get/${e.target.getAttribute('value')}`)
      this.currentTask = currentTask[0]
      this.editModal = 'block'
    },
    async openStatus(e) {
      const currentTask = await request(`/tasks/get/${e.target.getAttribute('value')}`)
      this.currentTask = currentTask[0]
      this.editStatus = 'block'

    },
    closeStatus() {
      this.editStatus = 'none'
    },
    async createTask() {
      this.$loading(true)
      let date = this.dateEnd.split('-')
      date = new Date(Number(date[0]), date[1] - 1, Number(date[2])).getTime()

      const response = await request('/tasks/create', 'POST', {
        heading: this.heading,
        description: this.description,
        priority: this.priority,
        status: this.status,
        managerId: this.user,
        completedAt: date
      })

      this.$loading(false)

      this.heading = ''
      this.description = ''
      this.priority = ''
      this.status = ''
      this.user = ''
      this.dateEnd = ''

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

      this.closeCreate()
      await this.getTasks()
    },
    async addManager() {
      this.$loading(true)
      await request('/user/addLeader', 'POST', {
        manager: this.manager
      })
      this.$loading(false)

      this.closeUsers()
      await this.getTasks()
    },
    async updateStatus() {
      await request('/tasks/updateStatus', 'POST', {
        status: this.editedStatus,
        taskId: this.currentTask.id
      })
      this.closeStatus()
      await this.getTasks()
    },
    sortMyRegular() {
      console.log(this.tasks)
      if(this.tasks.length !== 0) {
        this.tasks = this.tasks.sort((a,b) =>
            (new Date(a.updatedAt.split('T')[0]) < new Date(b.updatedAt.split('T')[0])) ? 1 :
                ((new Date(b.updatedAt.split('T')[0]) < new Date(a.updatedAt.split('T')[0])) ? -1 : 0))
      }
    },
    sortCRegular() {
      if(this.tasksC.length !== 0) {
        this.tasksC = this.tasksC.sort((a,b) =>
            (new Date(a.updatedAt.split('T')[0]) < new Date(b.updatedAt.split('T')[0])) ? 1 :
                ((new Date(b.updatedAt.split('T')[0]) < new Date(a.updatedAt.split('T')[0])) ? -1 : 0))
      }
    },
    sortMyDateEnd() {
      if(this.tasks.length !== 0) {
        this.tasks = this.tasks.sort((a,b) =>
            (new Date(a.completedAt.split('T')[0]) > new Date(b.completedAt.split('T')[0])) ? 1 :
                ((new Date(b.completedAt.split('T')[0]) > new Date(a.completedAt.split('T')[0])) ? -1 : 0))
      }
    },
    sortCDateEnd() {
      if(this.tasksC.length !== 0) {
        this.tasksC = this.tasksC.sort((a,b) =>
            (new Date(a.completedAt.split('T')[0]) > new Date(b.completedAt.split('T')[0])) ? 1 :
                ((new Date(b.completedAt.split('T')[0]) > new Date(a.completedAt.split('T')[0])) ? -1 : 0))
      }
    },
    sortManagers() {
      if(this.tasksC.length !== 0) {
        this.tasksC = this.tasksC.sort((a,b) =>
            (a.manager.value.surname > b.manager.value.surname) ? 1 :
                ((b.manager.value.surname > a.manager.value.surname) ? -1 : 0))
      }

    },
    async editTask() {
      this.$loading(true)
      let date = this.currentTask.completedAt.split('T')[0].split('-')
      date = new Date(Number(date[0]), date[1] - 1, Number(date[2])).getTime()

      const response = await request('/tasks/update', 'POST', {
        heading: this.currentTask.heading,
        description: this.currentTask.description,
        priority: this.currentTask.priority.id,
        status: this.currentTask.status.id,
        managerId: this.currentTask.manager.id,
        completedAt: date,
        taskId: this.currentTask.id
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

      this.closeEdit()
      await this.getTasks()
    }
  },
  computed: {
    displayCreate() {
      return {
        display: this.create
      }
    },
    displayUsers() {
      return {
        display: this.usersModal
      }
    },
    displayEdit() {
      return {
        display: this.editModal
      }
    },
    taskCShow() {
      return this.tasksC.length > 0
    },
    taskShow() {
      return this.tasks.length > 0
    },
    displayStatus() {
      return {
        display: this.editStatus
      }
    },
    priorityEdit: {
      get() {
        return !(this.currentTask.priority) ? '' : this.currentTask.priority.id
      },
      set(val) {
        this.currentTask.priority.id = val
      }
    },
    statusEdit: {
      get() {
        return !(this.currentTask.status) ? '' : this.currentTask.status.id
      },
      set(val) {
        this.currentTask.status.id = val
      }
    },
    managerEdit: {
      get() {
        return !(this.currentTask.manager) ? '' : this.currentTask.manager.id
      },
      set(val) {
        this.currentTask.manager.id = val
      }
    },
    dateEdit: {
      get() {
        return !this.currentTask.completedAt ? '' : this.currentTask.completedAt.split('T')[0]
      },
      set(val) {
        this.currentTask.completedAt = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin-bottom: 20px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
}

.btn__container {
  display: flex;
}

.btn-create {
  margin: 0;
}

$primary: #74a8ff;
$font: 'Roboto', sans-serif;

h1, h2 {
  color: $primary;
  text-align: center;
  font-weight: 400;
}
h2 {
  width: 100%;
}
h1 {
  font-size: 40px;
}
h3 {
  width: 100%;
  height: fit-content;
}

.wrapper {
  width: 100%;
  height: 100vh;
}

.name, .logout {
  color: $primary;

  p {
    opacity: 0.9;
    width: 100%;
  }
}

.container {
  width: 90%;
  height: 100%;
}

.tasks__my, .tasks__created {
  width: 50%;
  flex-wrap: wrap;
  display: flex;
  justify-content: start;
  align-items: flex-start;
}

.header {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);

  &__body {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.main {
  display: flex;
  justify-content: center;
  padding: 30px;
}

.tasks {
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;

  &__container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    @media (max-width: 1270px ){
      justify-content: center;
    }
  }
}

.task {
  padding: 10px;
  width: 260px;
  height: 150px;
  //max-height: 150px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 6px;
  background-color: #ffffff;
  margin: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  pointer-events: all;

  &__row {
    display: flex;
    pointer-events: none;
  }

  &__col {
    pointer-events: none;
    width: 50%;
    display: flex;
    flex-direction: column;
    color: #818181;
    p:first-child{
      margin-top: 0;
    }

    p {
      pointer-events: none;
      margin-bottom: 10px;
      margin-top: auto;
    }

    p:last-child {
      margin-bottom: 0;
    }

    .heading {
      pointer-events: none;
      font-weight: bold;

      &.outDate {
        color: #de1515;
      }

      &.completed {
        color: #16c116;
      }
    }
  }

  &__col:last-child {
    text-align: right;

    p:last-child {
      margin-top: auto;
    }
  }

  &:hover {
    transform: scale(1.02);
  }
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}


.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 800px;
  height: fit-content;
}

#modal__users,
#modal__editStatus{
  .modal-body {
    height: 100px;
  }

  .modal-content {
    width: 400px;
  }
}

.modal-body {
  width: 100%;
  height: 400px;
  display: flex;
  flex-wrap: wrap;
}

.modal-header {
  color: $primary;
  h2 {
    text-align: center;
    width: 100%;
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  width: 20px;
  display: block;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.text {
  width: 100%;
  resize: none;
  outline: none;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #bababa;

  &:focus {
    border-color: $primary;
  }
}

.form__control {
  width: 95%;
}

.control ~ .border__empty,
.control ~ .border__filled {
  bottom: 30px;
}

.modal__row {
  width: 100%;
  align-items: start;
  display: flex;
  justify-content: space-between;
}

.task__params {
  padding: 5px;
}

.param {
  cursor: pointer;
  color: #bababa;
  margin: 0 10px;
  transition: 0.25s;

  &:hover {
   color: #333333;
  }

  &.active {
    color: $primary;
  }
}
</style>