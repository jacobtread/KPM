<script setup lang="ts">
import Notices from "@/components/Notices.vue";
import Login from "@/components/Login.vue";</script>
<template>
    <div class="body">
        <Login/>
        <Notices/>
    </div>
</template>
<style scoped lang="scss">
.body {
    display: flex;
    flex-flow: row;
    height: 100%;
    width: 100%;
}
</style>