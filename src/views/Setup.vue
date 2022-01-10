<template>
    <form v-on:submit.prevent="setPortal">
        <h1>Welcome to KPM</h1>
        <span>(Modern KAMAR PORTAL)</span>
        <p>Please enter the domain of your portal in the box below:</p>
        <input type="text" placeholder="portal.example.school.nz" v-model="portalDomain">
        <button type="submit">Done</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const store = useStore()
        const { push } = useRouter()
        const portalDomain = ref('')

        async function setPortal() {
            await store.dispatch('setPortal', portalDomain.value)
            await push({ name: 'Home' })
        }

        return { portalDomain, setPortal }
    }
})
</script>

<style scoped lang="scss">

</style>