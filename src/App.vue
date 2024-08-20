<template>
  <HeaderBar @searchFor="SearchFor(true, $event)" />
  <div class="main-window grid grid-cols-2">
    <Results :resultArray="searchResults" @selectedResult="SearchFor(false, $event);"/>
    <SelectedDetails :selected="selectedResult"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HeaderBar from './components/HeaderBar.vue'
import Results from './components/Results.vue'
import SelectedDetails from './components/SelectedDetails.vue'

const searchResults = ref<[]>([]);
const selectedResult = ref(null);

// API URL
const apiUrl = 'http://www.omdbapi.com/?apikey=8fdfe222&';

function SearchFor(general: boolean, searchTerm: string) {
    const apiUrlFull = general ? `${apiUrl}s="${searchTerm}"` : `${apiUrl}i=${searchTerm}`;
    
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
        searchResults.value = data.Search;
      }
      else {
        selectedResult.value = data;
        console.log(data);
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

</script>

<style scoped>

.main-window {
  height: calc(100svh - var(--header-height));
  grid-template-columns: 2fr 3fr;
}

</style>