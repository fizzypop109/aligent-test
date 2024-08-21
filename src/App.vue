<template>
  <HeaderBar @searchFor="searchFor(true, $event)" @filterYear="onFilterByYear" @filterType="onFilterByType" />
  <div class="main-window grid" :class="mobileView ? 'mobile' : 'desktop'">
    <img v-if="loading" class="absolute top-0 bottom-0 left-0 right-0 m-auto" src="../assets/images/loading.gif" />
    <Results ref="resultsRef" :resultArray="filteredResults" @selectedResult="searchFor(false, $event);"/>
    <SelectedDetails :selected="selectedResult"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Type } from './type'
import type { MediaPart, MediaFull } from './media';
import { checkView } from './isMobile'

import HeaderBar from './components/HeaderBar.vue'
import Results from './components/Results.vue'
import SelectedDetails from './components/SelectedDetails.vue'

const mobileView = checkView();

const resultsRef = ref<InstanceType<typeof Results>>();

const yearRange = ref<Number[]>([]);
const typeFilter = ref<string>(Type[Type.Any]);

const searchResults = ref<MediaPart[]>([]);
const yearFilteredResults = ref<MediaPart[]>([]);
const filteredResults = ref<MediaPart[]>([]);

const selectedResult = ref<MediaFull>();

const loading = ref<boolean>(false);

// API URL
const apiUrl = 'http://www.omdbapi.com/?apikey=8fdfe222&';

function searchFor(general: boolean, searchTerm: string) {
    const apiUrlFull = general ? `${apiUrl}s="${searchTerm}"` : `${apiUrl}i=${searchTerm}`;
    loading.value = true;
    
    // Make a GET request
    fetch(apiUrlFull)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
      if (general) {
        searchResults.value = filteredResults.value = data.Search;
        resultsRef.value?.toggleResultsVisible(true);
      }
      else {
        selectedResult.value = data;
        console.log(data);
      }

      loading.value = false;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function filter() {
  if (yearRange.value.length > 0) {
    filterByYear();
  }

  filterByType();
}

function onFilterByYear(range: Number[]) {
  yearRange.value = range;
  filter();
}

function onFilterByType(type: string) {
  typeFilter.value = type;
  filter();
}

function filterByYear() {
  const newFilteredResults = searchResults.value.filter((result) => parseInt(result.Year) <= parseInt(yearRange.value[1]) 
    && parseInt(result.Year) >= parseInt(yearRange.value[0]));
  yearFilteredResults.value = newFilteredResults;
}

function filterByType() {
  const resultsToFilter = yearFilteredResults.value.length > 0 ? yearFilteredResults.value : searchResults.value;

  if (typeFilter.value === Type[Type.Any]) {
    filteredResults.value = resultsToFilter;
    return;
  }

  const newFilteredResults = resultsToFilter.filter((result) => result.Type.toLowerCase() === typeFilter.value.toLowerCase());
  filteredResults.value = newFilteredResults;
}

</script>

<style lang="scss" scoped>

.main-window {
  height: calc(100svh - var(--header-height));

  &.desktop {
    grid-template-columns: 2fr 3fr;
  }

  &.mobile {
    //grid-template-rows: 35% 65%;
  }
}

</style>