<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div>
    <!-- <section id="main" class="vh-100 gradient-custom-2">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-12 col-xl-10">
            <div class="card mask-custom">
              <div class="card-body p-4 text-white">
                <div class="text-center pt-3 pb-2">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-todo-list/check1.png"
                    alt="Check"
                    width="60"
                  />
                  <h2 class="my-4">Todo Lists</h2>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Add Todo
                  </button>
                </div>

                <table class="table text-white mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Team Member</th>
                      <th scope="col">Task</th>
                      <th scope="col">Priority</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(todo, index) in todos" :key="index" class="fw-normal">
                      <th>
                        <img :src="todo.image" alt="avatar 1" style="width: 45px; height: auto" />
                        <span class="ms-2">{{ todo.name }}</span>
                      </th>
                      <td class="align-middle">
                        <span :class="todo.completed ? 'completed' : ''">
                          {{ todo.task }}
                        </span>
                      </td>
                      <td class="align-middle">
                        <h6 class="mb-0">
                          <span
                            class="badge"
                            :class="
                              todo.priority == 1
                                ? 'bg-danger'
                                : todo.priority == 2
                                ? 'bg-success'
                                : 'bg-warning'
                            "
                          >
                            {{
                              todo.priority == 1
                                ? 'High priority'
                                : todo.priority == 2
                                ? 'Middle priority'
                                : 'low priority'
                            }}
                          </span>
                        </h6>
                      </td>
                      <td class="align-middle">
                        <a
                          @click="completeTodo(index)"
                          data-mdb-toggle="tooltip"
                          :title="!todo.completed ? 'not completed' : 'Completed'"
                        >
                          <i
                            class="fas fa-check fa-lg me-3"
                            :class="todo.completed ? 'text-success' : 'text-warning'"
                          ></i>
                        </a>
                        <a @click="removeTodo(index)" data-mdb-toggle="tooltip" title="Delete">
                          <i class="fas fa-trash-alt fa-lg text-warning"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" style="border-radius: 10px">
          <div class="modal-content gradient-custom-2">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Todo</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card card-danger">
                <div class="card-body">
                  <p>
                    <label for="name">Name</label>
                    <input type="text" v-model:="name" class="form-control" id="name" />
                  </p>

                  <p>
                    <label for="task">Task</label>
                    <input type="text" v-model:="task" class="form-control" id="task" />
                  </p>

                  <p>
                    <label>Priority</label>
                    <select v-model="priority" id="priority" class="form-select">
                      <option value="1">High Priority</option>
                      <option value="2">Middle Priority</option>
                      <option value="3">Low Priority</option>
                    </select>
                  </p>
                  <p>
                    <label>Image</label>
                    <select v-model="image" id="image" class="form-select">
                      <option disabled selected>Please Select Image</option>
                      <option v-for="image in images">{{ image }}</option>
                    </select>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                @click="addTodo"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
// add vue js code with yaser sharifi zade
export default {
  data() {
    return {
      items: [
        {
          title: 'HTML5',
          edit: false
        },
        {
          title: 'CSS3',
          edit: false
        },
        {
          title: 'JavaScript',
          edit: false
        }
      ],
      taskItem: '',
      isError: false
    }
  },
  methods: {
    addItem: function (e) {
      value = e.target.value

      if (value === '') {
        return false
      }

      if (this.itemExist(value) === true) {
        let repeated = [].filter.call(document.getElementsByTagName('span'), function (span) {
          return span.textContent === value
        })
        this.isError = true
        repeated[0].classList.add('bg-orange-300')
        return false
      }

      this.isError = false
      e.target.value = ''
      this.items.push({
        title: value,
        edit: false
      })

      let repeatedClasses = document.querySelectorAll('.bg-orange-300')
      for (let repeatedClass of repeatedClasses) {
        repeatedClass.classList.remove('bg-orange-300')
      }
    },
    removeItem: function (index) {
      this.items.splice(index, 1)
      this.$refs.addtask.focus()
    },
    enableEdit: function (index) {
      this.items[index].edit = true
      this.$nextTick(() => {
        let input = this.$refs.task[0]
        input.focus()
      })
    },
    disableEdit: function (index) {
      this.items[index].edit = false
    },
    itemExist: function (value) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].title === value) {
          return true
        }
      }

      return false
    }
  }
}
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
/* [v-cloak] {
  display: none;
}

*,
*::after,
*::before {
  transition: all 0.25s ease-out;
} */
</style>
