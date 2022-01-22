import { PortalSettings } from "@/kamar/api";
import { defineStore } from "pinia";


interface State {
    portalDomain?: string
    authorization?: string
    settings?: PortalSettings
}

export const useMainStore = defineStore('main', {
    state: (): State => ({}),
    actions: {
        setPortal(value: string) {
            this.portalDomain = value
            localStorage.setItem('portal_domain', value)
        },
        setAuthorization(value: string) {
            this.authorization = value
            localStorage.setItem('access_token', value)
        },
        setSettings(state: State, value: PortalSettings) {
            this.settings = value
        },
        clear() {
            this.portalDomain = undefined
            this.authorization = undefined
        }
    }
})