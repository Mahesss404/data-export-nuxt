<script setup lang="ts">

const config =  useRuntimeConfig()
const todos = await $fetch(`${config.public.apiURL}/todos`)
// const todos = await fetch('env.').then(response => response.json())
const {data: orders} = await useFetch("/api/orders")

</script>

<template>
    <div class="min-h-screen bg-gray-800 p-6" >
        <Header />
        <h1>Welcome to the homepage</h1>
        <div>
          <li v-for="order in orders" :key="order.id" >
            {{ order.customer}} - {{ order.email}}</li>
        </div>
<!--        todos display-->
        <div class="bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div v-for="todo in todos" class=" p-6" >
            <NuxtLink :to="`/todos/${todo.userId}`" >{{todo.userId}} - {{todo.title}} - {{todo.completed}}</NuxtLink>
          </div>
        </div>
    </div>
</template>