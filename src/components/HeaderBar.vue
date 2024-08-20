<template>
    <div class="header-bar bg-grey w-full p-[2rem]">
        <Search @searchFor="emit('searchFor', $event)"/>
        <div class="filter-container">

        </div>
    </div>
</template>

<script lang="ts" setup>

import Search from './Search.vue'

const emit = defineEmits(['searchFor']);

</script>

<style scoped>

.header-bar {
    height: var(--header-height);
}

</style>