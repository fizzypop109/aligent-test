<template>
    <div class="header-bar bg-dark-grey w-full p-[1.5rem] flex justify-between">
        <Search @searchFor="emit('searchFor', $event)" @searchTermChanged="emit('searchTermChanged', $event)"/>
        <!-- Mobile version of the rest of the header -->
        <div v-if="mobileView" class="flex items-center gap-[1rem]">
            <button 
                class="flex h-max gap-[0.5rem] items-center border-[1px] border-solid border-white rounded-md p-[0.5rem]"
                :class="{'bg-white' : watchlistOpen}"
                @click="emit('toggleWatchlist')"
            >
                <Watchlist class="h-[1rem] button" :class="{'on': watchlistOpen}"/>
            </button>
            <button 
                class="flex h-max gap-[0.5rem] items-center border-[1px] border-solid border-white rounded-md p-[0.5rem]" 
                :class="{'bg-white' : filtersOpen}"
                @click="filtersOpen = !filtersOpen"
            >
                <Filter class="h-[1rem] button" :class="{'on': filtersOpen}"/>
            </button>
        </div>
        <!-- Desktop version of the rest of the header -->
        <div v-else class="filter-container flex items-center gap-[1rem]">
            <button 
                class="mr-[2rem] border-[1px] border-white border-solid rounded-md px-[0.6rem] py-[0.25rem]"
                :class="watchlistOpen ? 'bg-white on': 'text-white'"
                @click="emit('toggleWatchlist')"
            >
                Watchlist
            </button>
            <YearFilter @filterYear="emit('filterYear', $event)"/>
            <TypeFilter @filterType="emit('filterType', $event)"/>
        </div>
    </div>
    <!-- Mobile version of the filters to allow for toggling open/closed -->
    <div 
        v-if="mobileView" 
        class="filter-container-mobile absolute w-full bg-dark-grey flex flex-col items-center gap-[1rem] p-[1rem]" 
        :class="{'open': filtersOpen}"
    >
        <YearFilter @filterYear="emit('filterYear', $event)"/>
        <TypeFilter @filterType="emit('filterType', $event)"/>
    </div>
</template>

<script lang="ts" setup>
import { checkView } from '../isMobile'

import Filter from './icons/IconFilter.vue'
import Watchlist from './icons/IconBookmark.vue'
import Search from './Search.vue'
import YearFilter from './YearFilter.vue'
import TypeFilter from './TypeFilter.vue'
import { ref } from 'vue'

const mobileView = checkView();

const filtersOpen = ref<boolean>(false);

const emit = defineEmits(['searchFor', 'searchTermChanged', 'filterYear', 'filterType', 'toggleWatchlist']);

const props = defineProps({
    watchlistOpen: Boolean
});

</script>

<style lang="scss" scoped>

.header-bar {
    height: var(--header-height);
    position: relative;
    z-index: 3;
}

.filter-container-mobile {
    transform: translateY(-100%);
    z-index: 2;
    transition: transform 0.5s ease;

    &.open {
        transform: translateY(0);
    }
}

.filter-container {
    button.on {
        color: var(--dark-grey) !important;
    }
}

</style>