<template>
    <div class="results-container flex flex-col" :class="mobileView ? 'mobile' : 'desktop'">
        <div class="result-text relative">
            <p>{{ resultArray?.length }} {{ resultArray?.length === 1 ? 'RESULT' : 'RESULTS'}}</p>
            <Arrow
                v-if="mobileView && resultArray?.length > 0"
                class="absolute right-[1rem] top-0 bottom-0 my-auto w-[1rem]"
                :class="resultsOpen ? 'rotate-0' : 'rotate-180'"
                @click="toggleResultsVisible(!resultsOpen)"
            />
        </div>
        <div class="results" :class="{'open': resultsOpen}">
            <div
            v-for="result in resultArray" :key="result?.imdbID"
            class="result-container flex gap-[1rem] items-center transition-colors"
            :class="{'bg-lightest-grey': selectedResultId === result?.imdbID}"
            @click="OnClickResult(result?.imdbID)"
        >
            <img :src="result?.Poster" alt="poster image" class="w-[4rem] h-[4rem] max-w-[4rem] object-cover rounded-md" />
            <div class="result-details flex flex-col">
                <h2 class="text-black text-md">{{ result?.Title }}</h2>
                <h6 class="text-med-grey">{{ result?.Year }}</h6>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type PropType, ref } from "vue";
import type { MediaPart } from '../media';
import { checkView } from '../isMobile'
import Arrow from './icons/IconArrow.vue'

const mobileView = checkView();

const resultsOpen = ref<boolean>(false);

const selectedResultId = ref<string>("");

const emit = defineEmits(['selectedResult']);

defineExpose({toggleResultsVisible});

const props = defineProps({
    resultArray: Array as PropType<MediaPart[]>,
})

function toggleResultsVisible(on: boolean) {
    resultsOpen.value = on;
}

function OnClickResult(id: string) {
    selectedResultId.value = id;
    emit('selectedResult', id);
}
  
</script>

<style lang="scss" scoped>

.results-container {
    &.desktop {
        border-right: 1px solid var(--medium-grey);
        max-height: calc(100svh - var(--header-height));

        p {
            padding: 2rem;
        }

        .results {
            overflow-y: auto;
        }

        .result-container {
            border-bottom: 1px solid var(--medium-grey);
            padding: 2rem;
        }
    }

    &.mobile {
        max-width: 100vw;

        .result-text {
            background: white;
            position: relative;
            z-index: 1;
        }

        .results {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;

            border-bottom: 1px solid var(--medium-grey);

            height: 0;
            z-index: 0;
            transition: height 0.5s ease;

            &.open {
                height: 12rem;
            }
        }

        .result-container {
            flex-direction: column;
            align-items: center;
            padding: 1rem 1.5rem;
        }

        h2, p {
            text-align: center;
        }

        p {
            padding: 1rem;
        }

        h2 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        h6 {
            text-align: center;
        }

        .result-container:not(:last-child) {
            border-right: 1px solid var(--medium-grey);
        }
    }
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

</style>