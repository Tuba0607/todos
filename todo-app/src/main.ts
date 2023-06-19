import './assets/main.css'

import App from './App.vue'
import router from './router'
import { createApp, provide, h } from 'vue'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql'
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(router)

app.mount('#app')
