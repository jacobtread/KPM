<template>
    <div class="body">
        <Login/>
        <Notices/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Notices from "@/components/Notices.vue"
import Login from "@/components/Login.vue";

export default defineComponent({
    components: { Login, Notices },
    setup() {


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