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

<style lang="scss" scoped>

label {
    display: flex;
    gap: 0.3rem;
}

input[type="radio"] {
  box-sizing: border-box;
  appearance: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 0.7rem;
  height: 0.7rem;
  border: 0.1rem solid white;
  border-radius: 50%;

  &:not(:disabled):checked {
    border-color: white;
    background-color: white;
    background-clip: content-box;
    padding: 2px;
    background-image: radial-gradient(
      circle,
      white 0%,
      white 50%,
      transparent 60%,
      transparent 100%
    );
  }
}

</style>