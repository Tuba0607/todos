<script setup lang="ts">
import { ref } from 'vue'
import { gql } from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { ADD_TODO_MUTATION } from '../graphql-operations'

const { type } = defineProps({ type: String })
const newTodoTitle = ref('')
const insertTodoMutation = useMutation(ADD_TODO_MUTATION)

async function addTodo({ todoTitle, type }: { todoTitle: string; type: string }) {
  const title = todoTitle && todoTitle.trim()

  const result = await insertTodoMutation.mutate(
    {
      object: {
        title
      }
    },
    {
      optimisticResponse: {
        insert_todos_one: {
          __typename: 'todos',
          id: -1,
          title,
          priority: '',
          isDone: false,
          edit: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      },
      update(cache, { data: { insert_todos_one } }) {
        cache.modify({
          fields: {
            todos(existingTodos = []) {
              const newTodoRef = cache.writeFragment({
                data: insert_todos_one,
                fragment: gql`
                  fragment NewTodo on Todo {
                    id
                    title
                    priority
                    isDone
                    edit
                    created_at
                    updated_at
                  }
                `
              })
              return [newTodoRef, ...existingTodos]
            }
          }
        })
      }
    }
  )
  newTodoTitle.value = ''
  console.log('Result:', result)
}
</script>
<template>
  <div>
    <input
      class="new-todo"
      placeholder="add task name"
      @input="newTodoTitle.slice(0, 10)"
      v-model="newTodoTitle"
      @keyup.enter="addTodo({ todoTitle: newTodoTitle, type })"
    />
  </div>
</template>
<style lang="scss" scoped>
.new-todo {
  background: transparent;
  border: 0;
  color: inherit;
  border-bottom: 1px solid currentColor;
  font-size: inherit;
  outline: none;
  padding: 0.25em;
  transition: border-bottom 150ms ease-in;
  width: 100%;
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
</style>
