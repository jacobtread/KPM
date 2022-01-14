<template>
    <div class="notices">
        <div v-for="(meeting, index) of data.meetings" :key="index" class="notice notice--meeting">
            <div class="notice__head">
                <span class="notice__level">{{ meeting.level }}</span>
                <h1 class="notice__subject">{{ meeting.subject }}</h1>
                <span class="notice__teacher">{{ meeting.teacher }}</span>
            </div>
            <p class="notice__body">{{ meeting.body }}</p>
            <div class="notice__foot">
                <span class="notice__place" v-if="meeting.place">{{ meeting.place }}</span>
                <span class="notice__date" v-if="meeting.date"> on {{ meeting.date }}</span>
                <span class="notice__time" v-if="meeting.time"> at {{ meeting.time }}</span>
            </div>
        </div>
        <div v-for="(notice, index) of data.notices" :key="index" class="notice">
            <div class="notice__head">
                <span class="notice__level">{{ notice.level }}</span>
                <h1 class="notice__subject">{{ notice.subject }}</h1>
                <span class="notice__teacher">{{ notice.teacher }}</span>
            </div>
            <p class="notice__body">{{ notice.body }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { DUMMY_DATA, getNotices, Notices } from "@/kamar/api";

export default defineComponent({
    setup() {

        const response = ref<Notices>(DUMMY_DATA.notices)

        onMounted(async () => {
            const date = new Date()
            // const formattedDate = format(date, '{dd}/{MM}/{yyyy}')
            const formattedDate = '10/03/2020'
            try {
                response.value = await getNotices(formattedDate)
            } catch (e) {
            }
        })

        return {
            data: response
        }

    }
})
</script>

<style scoped lang="scss">
@import "../assets/variables";

.notices {
    overflow: auto;
    height: 100%;
    max-width: 1000px;
    padding: 1rem;
}

.notice {
    background: $background_dark;
    border: 2px solid $background_darker;
    margin-bottom: 1rem;

    &__head {
        display: flex;
        align-items: center;
        background: $background_lighter;
        color: #e2e2e2;
    }

    &__level {
        padding: 0 0.5rem 0 1rem;
    }

    &__subject {
        font-size: 1.5rem;
        padding: 0.5rem;
        flex: auto;
    }

    &__teacher {
        padding: 0.5rem;
    }

    &__body {
        line-height: 1.5;
        font-size: 1.2em;
        padding: 0.5rem;
        color: #b8b8b8;
    }

    &__foot {
        padding: 0.5rem;
        font-size: 1rem;
        color: #b8b8b8;
        background: darken($background_lighter, 8);
    }
}

</style>