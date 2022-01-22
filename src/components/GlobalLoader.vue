<script setup lang="ts">
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
import { events } from "@/event";

let phases = 0
const loading = ref(false)
events.on('loading', value => {
    if (!value) {
        phases--
        console.log(phases)
        if (phases < 1) {
            loading.value = value
        }
    } else {
        phases++
        loading.value = true
    }
})
</script>
<template>
    <Loader v-bind:loading="loading" class="loader"/>
</template>

<style scoped lang="scss">
.loader {
    position: fixed;
}
</style>