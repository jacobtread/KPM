<template>
    <router-view/>
    <Dialog/>
    <GlobalLoader/>
</template>
<script>
import Dialog from "@/components/Dialog";
import { alert } from "@/event";
import { onMounted } from "vue";
import GlobalLoader from "@/components/GlobalLoader";

export default {
    components: { GlobalLoader, Dialog },
    setup() {

    }
}
</script>