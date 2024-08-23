<template>
    <div v-if="selected" class="details-container overflow-y-auto" :class="mobileView ? 'mobile' : 'desktop'">
        <div class="p-[2rem] info-container">
            <img :src="selected?.Poster" alt="poster image" class="rounded-md w-full h-auto max-h-[22rem] object-contain" />
            <div class="flex flex-col justify-between">
                <button class="watchlist-button flex gap-[0.5rem] items-center rounded-md w-max p-[0.5rem] pr-[0.6rem]" @click="onClickWatchlist">
                    <Bookmark class="h-[1.2rem]" :class="{'on': isInWatchlist()}"/>
                    <p>Watchlist</p>
                </button>
                <div class="info flex flex-col gap-[1rem]">
                    <h1>{{ selected?.Title }}</h1>
                    <div class="flex items-center gap-[0.25rem]">
                        <p class="rating h3-width rounded-md px-[0.5rem]">{{ selected?.Rated }}</p>
                        <h2 class="h2-width font-light">{{ selected?.Year }}</h2>
                        <p class="h2-width">·</p>
                        <h2 class="h2-width">{{ selected?.Genre }}</h2>
                        <p class="h2-width">·</p>
                        <h2 class="h2-width">{{ selected?.Runtime.replace(' ', '') }}</h2>
                    </div>
                    <h2 class="h2-width">{{ selected?.Actors }}</h2>
                </div>
            </div>
        </div>
        <h2 class="details h2-width">{{ selected?.Plot }}</h2>
        <div class="score-container p-[2rem] grid grid-cols-3 justify-between">
            <div v-for="score in selected?.Ratings" :key="score.Source" class="score flex flex-col items-center">
                <h2 class="h2-width">{{ score.Value }}</h2>
                <h3 class="h3-width">{{ score.Source }}</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';
import type { MediaFull } from '../media'
import Bookmark from './icons/IconBookmark.vue'
import { watchlist, toggleWatchlist } from '../watchlist'
import { checkView } from '../isMobile'

const mobileView = checkView();

const emit = defineEmits(['onClickWatchlist']);

const props = defineProps({
    selected: Object as PropType<MediaFull>
});

function onClickWatchlist() {
    toggleWatchlist(props.selected);
    emit('onClickWatchlist');
}

function isInWatchlist() {
    return watchlist.value.some(media => media.imdbID === props.selected?.imdbID);
}

</script>

<style lang="scss" scoped>

.watchlist-button {
    border: 1px solid black;
}

.desktop {
    .info-container {
        display: grid;
        grid-template-columns: 2fr 4fr;
        gap: 1rem;
    }

    .watchlist-button {
        align-self: flex-end;
    }

    .details {
        border-block: 1px solid var(--light-grey);
        padding: 2rem 2rem 2rem 0;
        margin-left: 2rem;
    }
}

.mobile {
    .info-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        > div {
            align-items: flex-start;
            gap: 1rem;
        }
    }

    .details {
        border-block: 1px solid var(--light-grey);
        margin-inline: 2rem;
        padding-block: 2rem;
        text-align: center;
    }
}

.score {
    text-align: center;

    &:nth-child(2) {
        border-inline: 1px solid var(--light-grey);
    }
}

.rating {
    border: 1px solid black;
    vertical-align: middle;
    line-height: 1.5;
}

</style>