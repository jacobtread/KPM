<template>
    <div>
        <img :src="settings.logo_path" :alt="settings.school_name">
        <p>{{ settings.school_name }}</p>
        <Notices/>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { DUMMY_DATA, getSettings, PortalSettings } from "@/kamar/api";
import Notices from "@/components/Notices.vue"

export default defineComponent({
    components: { Notices },
    setup() {

        const store = useStore();

        const settings = ref<PortalSettings>(DUMMY_DATA.settings)

        onMounted(async () => {
            try {
                settings.value = await getSettings()
            } catch (e) {
            }
        })

        return { settings }
    }
})
</script>

<style scoped lang="scss">

</style>