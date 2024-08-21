<template>
    <div class="search-container flex items-center gap-[1rem]">
        <img src="../assets/images/search.png" class="w-[1.5rem] h-[1.5rem]" />
        <input v-model="searchTerm" class="bg-transparent text-white text-[1.2rem]" placeholder="Search..." v-on:keyup.enter="onEnter" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const searchTerm = ref<string>("");

const emit = defineEmits(['searchFor', 'searchTermChanged']);

watch(searchTerm, async(oldTerm, newTerm) => {
    emit('searchTermChanged', searchTerm.value);
})

function onEnter() {
    emit('searchFor', searchTerm.value);
}

</script>

<style scoped>

input:focus{
    outline: none;
}

</style>