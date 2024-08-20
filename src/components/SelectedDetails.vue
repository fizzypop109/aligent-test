<template>
    <div class="details-container overflow-y-auto">
        <div class="p-[2rem] flex gap-[1rem] items-end">
            <img :src="selected?.Poster" class="rounded-md h-[22rem]" />
            <div class="flex flex-col gap-[1rem]">
                <h1>{{ selected?.Title }}</h1>
                <div class="flex items-center gap-[0.25rem]">
                    <p class="rating rounded-md px-[0.5rem]">{{ selected?.Rated }}</p>
                    <h2>{{ selected?.Year }}</h2>
                    <p>·</p>
                    <h2>{{ selected?.Genre }}</h2>
                    <p>·</p>
                    <h2>{{ selected?.Runtime.replace(' ', '') }}</h2>
                </div>
                <h2>{{ selected?.Actors }}</h2>
            </div>
        </div>
        <h2 class="details">{{ selected?.Plot }}</h2>
        <div class="score-container p-[2rem] grid grid-cols-3 justify-between">
            <div v-for="score in selected?.Ratings" class="score flex flex-col items-center">
                <h2>{{ score.Value }}</h2>
                <p>{{ score.Source }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    selected: Object
});

</script>

<style scoped>

.details {
    border-block: 1px solid var(--light-grey);
    padding: 2rem 2rem 2rem 0;
    margin-left: 2rem;
}

.rating {
    border: 1px solid black;
    vertical-align: middle;
    line-height: 1.5;
}

.score:nth-child(2) {
    border-inline: 1px solid var(--light-grey);
}

</style>