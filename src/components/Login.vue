<script setup lang="ts">
import { onMounted, ref } from "vue";
import { doLogin, DUMMY_DATA, getSettings, LoginResult, PortalSettings } from "@/kamar/api";
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';
import { alert, events } from "@/event";
import { useMainStore } from "@/store";
import { pinia } from "@/main";

const store = useMainStore(pinia)
const settings = ref<PortalSettings>(DUMMY_DATA.settings)
const username = ref('')
const password = ref('')

onMounted(() => {
    events.emit('loading', true)
    getSettings().then((value) => {
        settings.value = value
    }).catch().finally(() => events.emit('loading', false))
})

async function login() {
    try {
        const result: LoginResult = await doLogin(username.value, password.value)
        await store.setAuthorization(result.key)
    } catch (e) {
        alert('Failed to login', 'We were unable to log you in please check that your username and password are correct')
    }
}
</script>
<template>
    <div class="login">
        <form class="form" @submit.prevent="login">
            <img class="form__logo" :src="settings.logo_path" :alt="settings.school_name">
            <h1 class="form__name">{{ settings.school_name }}</h1>
            <p class="form__text">Enter your login details to view student specific information</p>
            <label class="input-wrapper">
                <span class="input__label">Username</span>
                <input type="text" class="input" required placeholder="Username" v-model="username">
            </label>
            <label class="input-wrapper">
                <span class="input__label">Password</span>
                <input type="text" class="input" required placeholder="Password" v-model="password">
            </label>
            <router-link :to="{name: 'Setup'}" class="back">Go Back to Setup</router-link>
            <button type="submit" class="button" title="Press to continue">
                <ArrowRight :size="48"/>
            </button>
        </form>
    </div>
</template>
<style scoped lang="scss">
@import "../assets/variables";

.login {
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $background_darker;
}

.input-wrapper {
    display: flex;
    flex-flow: column;
    margin-bottom: 1rem;
}

.input {
    padding: 0.9rem 1rem;
    background: $background_lighter;
    border: none;
    font-size: 1.2rem;
    color: #EFEFEF;

    &__label {
        text-align: left;
        color: white;
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
}

.form {
    background: $background;
    padding: 2rem;
    width: auto;
    max-width: 600px;
    text-align: center;


    &__name {
        color: #FFFFFF;
    }

    &__text {
        font-size: 1.2rem;
        max-width: 500px;
        width: 100%;
        color: #999999;
        margin-top: 0.5rem;
        line-height: 1.5;
        margin-bottom: 0.5rem;
    }
}

.back {
    display: block;
    color: #999;
    cursor: pointer;
    text-decoration: underline;
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

</style>