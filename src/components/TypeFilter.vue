<template>
    <div class="type-filter text-white flex flex-col">
        <h6 class="label">TYPE</h6>
        <div class="radio-buttons flex gap-[0.8rem]">
            <label class="h6 flex items-center">
                <input type="radio" id="any" name="media-type" :value="Type[Type.Any]" checked v-model="typeFilter"/>
                {{ Type[Type.Any] }}
            </label>
            <label class="h6 flex items-center">
                <input type="radio" id="any" name="media-type" :value="Type[Type.Movie]" v-model="typeFilter"/>
                {{ Type[Type.Movie] }}s
            </label>
            <label class="h6 flex items-center">
                <input type="radio" id="any" name="media-type" :value="Type[Type.Series]" v-model="typeFilter"/>
                {{ Type[Type.Series] }}
            </label>
            <label class="h6 flex items-center">
                <input type="radio" id="any" name="media-type" :value="Type[Type.Episode]" v-model="typeFilter"/>
                {{ Type[Type.Episode] }}s
            </label>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Type } from '../type'

const typeFilter = ref<Type>(Type.Any);

const emit = defineEmits(['filterType']);

watch(typeFilter, async (newSelection, oldSelection) => {
  emit('filterType', typeFilter.value);
});

</script>

<style scoped>

label {
    display: flex;
    gap: 0.3rem;
}

input[type="radio"] {
  appearance: none;
  background-color: transparent;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid white;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 0.6em;
  height: 0.6em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em white;
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

</style>