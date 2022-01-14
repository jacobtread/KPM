import { createStore } from 'vuex'
import { PortalSettings } from "@/kamar/api";
import router from "@/router";


interface State {
    portalDomain?: string
    authorization?: string
    settings?: PortalSettings
}

export default createStore<State>({
    state: {},
    mutations: {
        setPortal(state: State, value: string) {
            state.portalDomain = value
        },
        setAuthorization(state: State, value: string) {
            state.authorization = value
        },
        setSettings(state: State, value: PortalSettings) {
            state.settings = value
        }
    },
    actions: {
        setPortal(context, value: string) {
            context.commit('setPortal', value)
            localStorage.setItem('portal_domain', value)
        },
        clear(context, value: string) {
            context.commit('setPortal', undefined)
            context.commit('setAuthorization', undefined)
        }
    },
    getters: {
        portalSettings(state: State): PortalSettings {
            if (state.settings == undefined) {
                router.push({ name: 'Home' }).then().catch()
                throw 'No settings??'
            }
            return state.settings as PortalSettings
        }
    },
    modules: {}
})
