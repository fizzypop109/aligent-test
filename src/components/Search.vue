<template>
    <div class="search-container flex gap-[1rem]">
        <img src="../assets/images/search.png" class="w-[1.5rem] h-[1.5rem]" />
        <input v-model="searchTerm" class="bg-transparent text-white text-[1.2rem]" placeholder="Search..." v-on:keyup.enter="onEnter" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchTerm = ref<string>("");

const emit = defineEmits(['searchFor']);

function onEnter() {
    emit('searchFor', searchTerm.value);
}

</script>

<style scoped>

input:focus{
    outline: none;
}

</style>