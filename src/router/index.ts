import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { useMainStore } from "@/store";
import { pinia } from "@/main";

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
    const store = useMainStore(pinia)
    if (to.name != 'Setup' && !store.portalDomain) {
        next({ name: 'Setup' })
    } else {
        next();
    }
})

export default router
