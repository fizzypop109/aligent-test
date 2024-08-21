<template>
  <HeaderBar 
    :watchlistOpen="useWatchlist" 
    @toggleWatchlist="toggleWatchlist" 
    @searchFor="generalSearch($event)" 
    @searchTermChanged="searchTerm = $event"
    @filterYear="onFilterByYear" 
    @filterType="onFilterByType" 
  />
  <div class="main-window grid" :class="mobileView ? 'mobile' : 'desktop'">
    <img v-if="loading" class="absolute top-0 bottom-0 left-0 right-0 m-auto w-[5rem] h-[5rem]" src="./assets/images/loading.gif" />
    <Results ref="resultsRef" :resultArray="filteredResults" @selectedResult="specificSearch($event);"/>
    <SelectedDetails :selected="selectedResult"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Type } from './type'
import type { MediaPart, MediaFull } from './media';
import { checkView } from './isMobile'
import { watchlist } from './watchlist'

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

const yearFilterTriggered = ref<boolean>(false);
const useWatchlist = ref<boolean>(false);
const loading = ref<boolean>(false);
const searchTerm = ref<string>("");

// API base URL
const apiUrl = 'http://www.omdbapi.com/?apikey=8fdfe222&';

/* Toggle the use of the watchlist.
If true, replace results with watchlist results
Also considering filters */
function toggleWatchlist() {
  useWatchlist.value = !useWatchlist.value;

  if (useWatchlist.value) {
    searchResults.value = watchlist.value.filter(item => item.Title.toLowerCase().includes(searchTerm.value.toLowerCase()));
    filter();
  }
  else {
    generalSearch(searchTerm.value);
  }
}

/* Make a call to the OMBD API
Pass in the full url to fetch from */
async function callAPI(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

/* Call the api with a search for any item containing the search term in it's title.
If the watchlist is active, only search the watchlist items */
async function generalSearch(searchTerm: string) {
  if (useWatchlist.value) {
    searchResults.value = filteredResults.value = watchlist.value.filter(item => item.Title.toLowerCase().includes(searchTerm.toLowerCase()));
    return;
  }

  const apiUrlFull = `${apiUrl}s="${searchTerm}"`;
  loading.value = true;
    
  const results = await callAPI(apiUrlFull);

  if (results.Response === 'False') {
    searchResults.value = filteredResults.value = [];
    loading.value = false;
    return;
  }

  var allResults = results.Search.filter((result) => result.Type === 'movie' || result.Type === "series" || result.Type === "episode");

  var pagesToGoThrough = (Math.ceil(results.totalResults/10) * 10) / 10;

  // Make sure to go though each page of the search results to include all matching items from the API
  // Excluding non-movies, series, and episodes
  for(let i = 1; i < pagesToGoThrough; i++) {
    const pageUrl = `${apiUrlFull}&page=${i + 1}`;
    const pageResults = await callAPI(pageUrl);

    if (pageResults.Response == 'True') {
      const filteredResults = pageResults.Search.filter((result) => result.Type === 'movie' || result.Type === "series" || result.Type === "episode");
      allResults = allResults.concat(filteredResults);
      searchResults.value = filteredResults.value = allResults;
      filter();
    }
  }

  resultsRef.value?.toggleResultsVisible(true);

  loading.value = false;
}

/* Call the api with a search a specific piece of media using the imbdID. */
async function specificSearch(searchTerm: string) {
  selectedResult.value = null;

  const apiUrlFull = `${apiUrl}i=${searchTerm}`;
  loading.value = true;
    
  const result = await callAPI(apiUrlFull);

  selectedResult.value = result;

  loading.value = false;
}

/* Run both filters. Only run the year filter if it has been set */
function filter() {
  if (yearRange.value.length > 0) {
    filterByYear();
  }

  filterByType();
}

/* When the year filter has been updated */
function onFilterByYear(range: Number[]) {
  yearRange.value = range;
  yearFilterTriggered.value = true;
  filter();
}

/* When the type filter has been updated */
function onFilterByType(type: string) {
  typeFilter.value = type;
  filter();
}


/* Filter the search results by the set year range */
function filterByYear() {
  const newFilteredResults = searchResults.value.filter((result) => parseInt(result.Year) <= parseInt(yearRange.value[1]) 
    && parseInt(result.Year) >= parseInt(yearRange.value[0]));
  yearFilteredResults.value = newFilteredResults;
}

/* Filter the search results by the set type */
function filterByType() {
  const resultsToFilter = yearFilterTriggered.value ? yearFilteredResults.value : searchResults.value;

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
}

</style>