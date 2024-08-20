<template>
    <div class="results-container overflow-y-auto">
        <p class="p-[2rem]">{{ resultArray.length }} {{ resultArray.length === 1 ? 'RESULT' : 'RESULTS'}}</p>
        <div
            v-for="result in resultArray" :key="result.imdbID"
            class="result-container flex p-[2rem] gap-[1rem] items-center transition-colors"
            :class="{'bg-lightest-grey': selectedResultId === result.imdbID}"
            @click="OnClickResult(result.imdbID)"
        >
            <img :src="result.Poster" class="w-[4rem] h-[4rem] object-cover rounded-md" />
            <div class="result-details flex flex-col">
                <h2 class="text-black text-md">{{ result.Title }}</h2>
                <p class="text-med-grey">{{ result.Year }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const selectedResultId = ref<string>("");

const emit = defineEmits(['selectedResult']);

const props = defineProps({
    resultArray: Array,
})

function OnClickResult(id: string) {
    selectedResultId.value = id;
    emit('selectedResult', id);
}
  
</script>

<style scoped>

.results-container {
    border-right: 1px solid var(--medium-grey);
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--medium-grey);
}

.result-container {
    border-bottom: 1px solid var(--medium-grey);
}

</style>