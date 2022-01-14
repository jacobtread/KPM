<template>
    <div v-if="loading" class="loader-wrapper">
        <div class="loader">
            <div class="loader__spinner"></div>
            <SchoolIcon class="loader__icon" :size="128"/>
            <h1 class="text">Loading...</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SchoolIcon from 'vue-material-design-icons/School.vue';

export default defineComponent({
    components: { SchoolIcon },
    props: { loading: Boolean },
})
</script>

<style scoped lang="scss">
@import "../assets/variables";
.loader-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
}

.loader {
    position: relative;
    padding: 2rem;

    &__spinner {
        position: absolute;
        left: 0;
        top: 0;
        width: calc(128px + 4rem);
        height: calc(128px + 4rem);
        border: 15px solid #999;
        border-radius: 50px;
        animation: 3s linear spinner infinite;
        z-index: -1;
    }

    &__icon {
        color: white;
    }
}

.text {
    color: white;
    font-size: 1.1rem;
    text-align: center;
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
}

@keyframes spinner {
    0% {
        transform: rotate(0deg);
        border-radius:50px;
    }
    50% {
        border-radius:50px;
    }
    25%,
    75% {
        border-radius: 100px;
    }
    100% {
        border-radius: 50px;
        transform: rotate(360deg);
    }
}
</style>