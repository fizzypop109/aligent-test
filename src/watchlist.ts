import { ref } from "vue";
import type { MediaFull } from "./media";

export const watchlist = ref<MediaFull[]>([]);

export function toggleWatchlist(media: MediaFull) {
    if (!watchlist.value.some(item => item.imdbID === media.imdbID)) {
        watchlist.value.push(media);
    }
    else {
        const element = watchlist.value.find(item => item.imdbID === media.imdbID)
        const indexOfMedia = watchlist.value.indexOf(element);
        const newArray = [...watchlist.value.slice(0, indexOfMedia), ...watchlist.value.slice(indexOfMedia + 1, watchlist.value.length)];
        watchlist.value = newArray;
    }
}