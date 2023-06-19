<script setup lang="ts">
import { UPDATE_TODO_BY_PK, DELETE_TODOS_BY_PK } from '../graphql-operations'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
const { todos, type } = defineProps(['todos', 'type'])

const tasks = ref(todos)
const newEditTodo = ref('')

const updateTodo = useMutation(UPDATE_TODO_BY_PK)
const deleteTodoByPk = useMutation(DELETE_TODOS_BY_PK, {
  update: (cache, { data }) => {
    cache.modify({
      fields: {
        todos: (existingTodos, { readField }) => {
          return existingTodos.filter(
            (todoRef) => data.delete_todos_by_pk.id !== readField('id', todoRef)
          )
        }
      }
    })
  }
})
</script>

<template>
  <div class="todo-item">
    <div class="todo-item__card" v-for="todo in todos" v-bind:key="todo.id">
      <table style="width: 100%">
        <tr>
          <td style="width: 10%">
            <label
              @click="
                updateTodo.mutate({
                  pk_columns: { id: todo.id },
                  _set: { isDone: !todo.isDone }
                })
              "
              :htmlFor="todo.id"
            >
              <input type="radio" :id="todo.id" :checked="todo.isDone" />
            </label>
          </td>
          <td style="width: 60%">
            <label>
              <span
                v-if="!todo.edit"
                :style="todo.isDone ? 'text-decoration: line-through' : ''"
                class="todo-item__card-title"
                >{{ todo.title }}</span
              >

              <input
                v-else
                class="todo-item__edit"
                placeholder="edit task name"
                type="text"
                v-model="newEditTodo"
                :id="todo.id"
                @keyup.enter="
                  updateTodo.mutate({
                    pk_columns: { id: todo.id },
                    _set: { title: newEditTodo, edit: false, isDone: false }
                  })
                "
              />
            </label>
          </td>
          <td style="width: 10%">
            <label
              @click="
                updateTodo.mutate({
                  pk_columns: { id: todo.id },
                  _set: { edit: !todo.edit, isDone: false }
                })
              "
              :htmlFor="todo.id"
            >
              <input
                class="todo-item__card-button fa-regular fa-pen-to-square"
                :id="todo.id"
                :checked="todo.edit"
              />
            </label>
          </td>
          <td style="width: 10%">
            <button class="todo-item__card-button" @click="deleteTodoByPk.mutate({ id: todo.id })">
              <i class="fa-regular fa-circle-xmark"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.todo-item {
  padding: 0.01em 16px;
  &__card {
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 16px;
    margin-bottom: 16px;
    &-title {
      margin-right: auto;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100px;
    }
    &-button {
      background-color: #fff;
      border: none;
    }
  }
  &__edit {
    background: transparent;
    border: 0;
    color: inherit;
    border-bottom: 1px solid currentColor;
    font-size: inherit;
    outline: none;
    padding: 0.25em;
    transition: border-bottom 150ms ease-in;
    position: relative;

    &::placeholder {
      opacity: 0.6;
    }
    &:focus {
      border-bottom-width: 3px;
      &::placeholder {
        opacity: 0.15;
      }
    }
  }
}
</style>
