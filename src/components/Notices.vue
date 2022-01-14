<template>
    <div class="notices">
        <div v-for="(notice, index) of data.notices" :key="index" class="notice">
            <div class="notice__head">
                <h1 class="notice__subject">{{ notice.subject }}</h1>
                <div>
                    <span class="notice__level">{{ notice.level }}</span>
                    <span class="notice__teacher">{{ notice.teacher }}</span>
                </div>
            </div>
            <div class="notice__content">
                <p class="notice__body">{{ notice.body }}</p>
            </div>
        </div>
        <div v-for="(meeting, index) of data.meetings" :key="index" class="notice notice--meeting">
            <div class="notice__head">
                <h1 class="notice__subject">{{ meeting.subject }}</h1>
                <div>
                    <span class="notice__level">{{ meeting.level }}</span>
                    <span class="notice__teacher">{{ meeting.teacher }}</span>
                </div>
            </div>
            <div class="notice__content">
                <p class="notice__body">{{ meeting.body }}</p>
                <span class="notice__place">{{ meeting.place }}</span>
                <span class="notice__date">{{ meeting.date }}</span>
                <span class="notice__time">{{ meeting.time }}</span>
            </div>
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
.notices {
    overflow: auto;
    max-height: 800px;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.notice {
    flex: auto;
    width: 100%;
    max-width: 500px;
    background: #eeeeee;
    border: 2px solid #999999;

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #333333;
        color: #e2e2e2;
    }

    &__subject {
        font-size: 1.5rem;
        padding: 0.5rem;
    }

    &__teacher {
        padding: 0.5rem;
    }

    &__body {
        line-height: 1.5;
        padding: 0.5rem;
    }
}

</style>