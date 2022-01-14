<template>
    <div v-if="open" class="wrapper">
        <div class="dialog">
            <h1 class="dialog__title">{{ title }}</h1>
            <p class="dialog__message">{{ message }}</p>
            <div class="dialog__buttons">
                <template v-if="type === 'confirm'">
                    <button class="dialog__buttons__item" @click="submit(true)">{{ confirm }}</button>
                    <button class="dialog__buttons__item" @click="submit(false)">{{ cancel }}</button>
                </template>
                <template v-else>
                    <button class="dialog__buttons__item" @click="submit(true)">{{ confirm }}</button>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { alert, DialogEventData, events } from "@/event";

export type DialogType = 'alert' | 'confirm'

export default defineComponent({
    setup() {

        const open = ref(false)
        const type = ref<DialogType>('alert')
        const title = ref('')
        const message = ref('')
        const confirm = ref('')
        const cancel = ref('')

        events.on('dialog', (alert: DialogEventData) => {
            open.value = true
            title.value = alert.title
            message.value = alert.message
            type.value = alert.type
            confirm.value = alert.confirm
            cancel.value = alert.cancel
        });

        function submit(result: boolean) {
            open.value = false
            events.emit('dialog_result', result)
        }

        return { open, type, title, message, confirm, cancel, submit }
    }
})
</script>

<style scoped lang="scss">
@import "../assets/variables";

.wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog {
    background: $background_darker;
    max-width: 500px;
    color: #999999;

    &__title {
        background: $background_lighter;
        color: #FFFFFF;
        padding: 0.5rem 0.5rem;
        font-size: 1.5rem;
    }

    &__message {
        padding: 1rem;
        font-size: 1.2rem;
        line-height: 1.5;
    }

    &__buttons {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        padding: 0.5rem;

        &__item {
            display: block;
            flex: auto;
            padding: 0.5rem;
            font-size: 1.2rem;
            font-weight: bold;
            text-transform: uppercase;
            border: none;
            background: #333333;
            color: #FFFFFF;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
                background: $primary;
            }
        }
    }
}
</style>