<template>
    <router-view/>
    <Dialog/>
</template>
<script>
import Dialog from "@/components/Dialog";
import { alert } from "@/event";
import { onMounted } from "vue";

export default {
    components: { Dialog },
    setup() {

    }
}
</script>