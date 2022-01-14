<template>
    <div>
        <img :src="settings.logo_path">
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { DUMMY_DATA, getSettings, PortalSettings } from "@/kamar/api";

export default defineComponent({
    setup() {

        const store = useStore();

        const settings = ref<PortalSettings>(DUMMY_DATA.settings)

        onMounted(async () => {
            const s = await getSettings()
            settings.value = s
            console.log(s)
        })

        return { settings }
    }
})
</script>

<style scoped lang="scss">

</style>