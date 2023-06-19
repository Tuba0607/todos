import { gql } from 'graphql-tag'

const GET_TODOS_QUERY = gql`
  query todos($order_by: [todos_order_by!], $limit: Int = 10, $offset: Int) {
    todos(order_by: $order_by, limit: $limit, offset: $offset) {
      id
      isDone
      title
      priority
      created_at
      edit
    }
  }
`

const ADD_TODO_MUTATION = gql`
  mutation addTodos($object: todos_insert_input!) {
    insert_todos_one(object: $object) {
      id
      title
      edit
      isDone
      priority
      created_at
    }
  }
`
const UPDATE_TODO_BY_PK = gql`
  mutation update_todos_by_pk($pk_columns: todos_pk_columns_input!, $_set: todos_set_input!) {
    update_todos_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
      title
      isDone
      edit
      priority
      created_at
    }
  }
`

const DELETE_TODOS = gql`
  mutation delete_todos($where: todos_bool_exp!) {
    delete_todos(where: $where) {
      affected_rows
    }
  }
`
const DELETE_TODOS_BY_PK = gql`
  mutation delete_todos_by_pk($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
      title
      edit
      isDone
      priority
      created_at
    }
  }
`
export { GET_TODOS_QUERY, ADD_TODO_MUTATION, DELETE_TODOS, UPDATE_TODO_BY_PK, DELETE_TODOS_BY_PK }
