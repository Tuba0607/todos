<script setup lang="ts">
import { computed, reactive } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoInput from './TodoInput.vue'
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import { DELETE_TODOS, GET_TODOS_QUERY } from '../graphql-operations'

const selectTodosVariables = {
  order_by: {
    created_at: 'desc'
  }
}

const privateTodosQuery = useQuery(GET_TODOS_QUERY, selectTodosVariables)
const privateTodos = useResult(privateTodosQuery.result, [], (data) => data?.todos)

const deleteCompletedTodosMutation = useMutation(DELETE_TODOS, {
  variables: {
    where: {
      isDone: { _eq: true }
    }
  },
  refetchQueries: [
    {
      query: GET_TODOS_QUERY,
      variables: selectTodosVariables
    }
  ]
})
const state = reactive({
  type: 'private',
  filterType: 'all',
  filteredTodos: computed(() => {
    return privateTodos.value.filter((todo) => {
      switch (state.filterType) {
        case 'completed':
          return todo.isDone
        case 'active':
          return !todo.isDone
        default:
          return true
      }
    })
  }),
  activeTodos: computed(() => privateTodos.value.filter((todo) => !todo.isDone)),
  remainingTodos: computed(() => state.activeTodos.length)
})

function filterResults(type: string) {
  switch (type) {
    case 'active':
      state.filterType = 'active'
      break
    case 'completed':
      state.filterType = 'completed'
      break
    default:
      state.filterType = 'all'
      break
  }
}
async function clearCompleted() {
  const isOk = window.confirm('Are you sure?')
  if (!isOk) return

  const result = await deleteCompletedTodosMutation.mutate()
  console.log('clear completed result', result)
  if (deleteCompletedTodosMutation.error.value) {
    console.error(deleteCompletedTodosMutation.error.value)
  }
}
</script>

<template>
  <div class="todo-list">
    <div class="todo-list__card" style="width: 100%">
      <header class="todo-list__card-header">
        <div class="todo-list__card-header-top">
          <h1>Todo App</h1>
          <h3>{{ state.remainingTodos }} items</h3>
        </div>

        <div class="todo-list__card-filter">
          <ul style="list-style: none; cursor: pointer; display: contents">
            <li
              style="justify-content: space-around"
              v-for="filterType in ['all', 'active', 'completed']"
              :key="filterType"
              @click="filterResults(filterType)"
            >
              <a
                style="text-transform: capitalize"
                class="removePaddLeft"
                :class="filterType == state.filterType && 'selected'"
              >
                {{ filterType }}
              </a>
            </li>
          </ul>
        </div>
        <br />
        <div v-if="privateTodosQuery.loading?.value">Loading...</div>
        <div v-if="privateTodosQuery.error?.value">
          Error: {{ privateTodosQuery.error?.value?.message }}
        </div>
        <TodoInput />
      </header>

      <TodoItem :todos="state.filteredTodos" :type="state.type" />

      <footer class="todo-list__card-footer">
        <button
          v-if="state.type === 'private'"
          class="todo-list__card-button"
          @click="clearCompleted"
        >
          Clear Completed
        </button>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.todo-list {
  padding: 0.01em 16px;
  min-width: 400px;
  &__card {
    border-radius: 20px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19);
    h1 {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-weight: 400;
      margin: 10px 0;
      font-size: 30px;
    }
    h3 {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-weight: 400;
      margin: 10px 0;
      font-size: 18px;
    }
    &-header {
      padding: 0.01em 16px;
      margin-top: 16px;
      margin-bottom: 16px;
      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
      }
    }
    &-filter {
      display: flex;
      justify-content: space-around;
    }
    &-button {
      background-color: #fff;
      border: none;
      padding: 20px;
      cursor: pointer;
    }
    &-footer {
      padding: 0.01em 16px;
    }
  }
}
</style>
