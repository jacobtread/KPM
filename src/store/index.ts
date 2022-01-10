import { createStore } from 'vuex'


interface State {
    portalDomain?: string
}

export default createStore<State>({
    state: {},
    mutations: {
        setPortal(state: State, value: string) {
            state.portalDomain = value
        }
    },
    actions: {
        setPortal(context, value: string) {
            context.commit('setPortal', value)
            localStorage.setItem('portal_domain', value)
        }
    },
    modules: {}
})
