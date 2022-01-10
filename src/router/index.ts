import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/setup',
        name: 'Setup',
        component: () => import(/* webpackChunkName: "setup" */ '../views/Setup.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.name != 'Setup' && !store.state.portalDomain) {
        const portalDomain = localStorage.getItem('portal_domain')
        if (portalDomain) {
            await store.dispatch('setPortal', portalDomain)
            next();
        } else {
            next({ name: 'Setup' })
        }
    } else {
        next();
    }
})

export default router
