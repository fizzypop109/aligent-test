<template>
    <div class="year-filter flex flex-col text-white">
        <h6 class="label">YEAR</h6>
        <div class="filter flex items-center gap-[0.3rem]">
            <h6>1970</h6>
            <v-range-slider 
                v-model="yearRange" 
                step="1" strict 
                :thumb-label="true" 
                :ripple="false" 
                thumb-size="16rem" 
                track-size="7rem" 
                elevation="0" 
                hide-details 
                :min="min" 
                :max="max"
                class="w-[12rem]"
                @end="emit('filterYear', yearRange)"
            ></v-range-slider>
            <h6>2024</h6>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const min = 1970;
const max = 2024;

const yearRange = ref<Number[]>([min, max]);

const emit = defineEmits(['filterYear']);

</script>

<style scoped>

:deep(.v-slider-track__background) {
    background-color: white;
    opacity: 1;
}

:deep(.v-slider-track__fill), :deep(.v-slider-thumb__surface) {
    background-color: var(--light-grey);
}

:deep(.v-input__control) {
    min-height: 18px !important;
}

</style>