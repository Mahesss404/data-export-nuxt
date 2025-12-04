<template>
  <div>
    <h1>Ini index dari invoice</h1>
    <div class="bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div v-for="todo in todos" class=" p-6" >
        <NuxtLink :to="`/invoice/${todo.userId}`" >{{todo.userId}}  <br/> title: {{todo.title}}</NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup>
const todos = await fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json())


</script>
