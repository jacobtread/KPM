<template>
    <div class="body">
        <Login/>
        <Notices/>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { DUMMY_DATA, getSettings, PortalSettings } from "@/kamar/api";
import Notices from "@/components/Notices.vue"
import Login from "@/components/Login.vue";

export default defineComponent({
    components: { Login, Notices },
    setup() {

        const settings = ref<PortalSettings>(DUMMY_DATA.settings)

        onMounted(() => getSettings().then((value) => settings.value = value).catch())

        return { settings }
    }
})
</script>

<style scoped lang="scss">
.body {
    display: flex;
    flex-flow: row;
    height: 100%;
    width: 100%;
}
</style>