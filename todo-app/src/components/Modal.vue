<template>
  <div class="modal">
    <h2>{{ title }}</h2>
    <label for="priority">Priority:</label>
    <select id="priority" v-model="selectedPriority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <label for="input">Input:</label>
    <input id="input" v-model="inputValue" type="text" />
    <!-- Diğer modal içeriği -->
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    selectedPriority: String,
    inputValue: String
  }
}
</script>

<style scoped>
/* Modal stilini burada tanımla */
</style>
