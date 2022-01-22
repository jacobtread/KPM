<script setup lang="ts">
import SchoolIcon from 'vue-material-design-icons/School.vue';
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';

import { ref } from "vue";
import { useRouter } from "vue-router";

import { alert } from "@/event";
import { abortAll } from "@/kamar/api";
import { useMainStore } from "@/store";

const store = useMainStore()
const { push } = useRouter()
const portalDomain = ref('')

async function setPortal() {
    const domain = portalDomain.value
    if (domain.length < 1) {
        alert('Domain Empty', 'You must provided a domain otherwise you wont be able to access KAMAR')
        return
    }
    await store.setPortal(domain)
    await push({ name: 'Home' })
}

abortAll()

</script>
<template>
    <span class="watermark">KPM by Jacobtread</span>
    <div class="wrapper">
        <form v-on:submit.prevent="setPortal" class="form">
            <div class="form__head">
                <SchoolIcon :size="64" class="icon"/>
                <h1 class="title">KPM</h1>
                <span class="subtitle">KAMAR PORTAL MODERN</span>
            </div>
            <div class="form__body">
                <p class="text">Please enter the domain of your portal in the box below. This is usually
                    portal.yourschool.school.nz but if its not then its the same as what you would enter into the mobile
                    app</p>
                <div class="input__wrapper">
                    <input class="input" type="text" placeholder="portal.example.school.nz" id="portalURL"
                           required minlength="1"
                           v-model="portalDomain">
                    <p class="input__subtext">e.g portal.yourschool.school.nz</p>
                </div>
            </div>
            <button type="submit" class="button" title="Press to continue">
                <ArrowRight :size="48"/>
            </button>
        </form>
    </div>
</template>
<style scoped lang="scss">
@import "../assets/variables";

.wrapper {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    text-align: center;

    &__head {
        background: $background_lighter;
        color: white;
        padding: 1rem 0;
    }

    &__body {
        padding: 1.5rem 1rem 1rem;
        background: $background_darker;
    }
}

.button {
    margin: 1rem auto;
    border-radius: 100%;
    border: none;
    color: #FFFFFF;
    background: #333333;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: $primary;
        transform: scale(1.1);
    }
}

.title {
    margin-bottom: 0.2rem;
}

.subtitle {
    color: #878787;
    display: block;
}

.text {
    margin-bottom: 1rem;
    display: block;
    font-size: 1.1em;
    line-height: 1.5;
    max-width: 500px;
    color: #888;
}

.input {
    display: block;
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
    background: #333;
    border: none;
    color: white;

    &:focus {
        outline: 2px solid $primary;
    }

    &__wrapper {
        display: flex;
        flex-flow: column;
        text-align: left;
        margin: 0.5rem 0;
    }

    &__label {
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }

    &__subtext {
        margin-top: 0.5rem;
        color: #535353;
    }

}

.watermark {
    position: fixed;
    top: 1rem;
    left: 1rem;
    color: #777777;
}

</style>