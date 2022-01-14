import store from "@/store";
import router from "@/router";
import { alert } from "@/event";
import { getCache, setCache } from "@/cache";
import { safeEncodeDomain } from "@/tools";

const KJP_HOST: string = process.env.VUE_APP_KJP_HOST

console.log(process.env.VUE_APP_KJP_HOST)

export const DUMMY_DATA = {
    settings: {
        logo_path: '',
        school_name: '',
        user_access: []
    } as PortalSettings
}

export interface PortalSettings {
    logo_path: string;
    school_name: string;
    user_access: UserAccess[];
}

export interface UserAccess {
    notices: boolean;
    events: boolean;
    details: boolean;
    timetable: boolean;
    attendance: boolean;
    ncea: boolean;
    results: boolean;
    groups: boolean;
    awards: boolean;
    pastoral: boolean;
    report_absence_pg: boolean;
    report_absence: boolean;
}

type RequestMethod = 'GET' | 'POST'

function getPortalDomain(): string {
    return store.state.portalDomain as string;
}

function getHeaders() {
    const portalDomain = getPortalDomain()
    const headers: any = {
        'Content-Type': 'application/json',
        'X-Portal': `${ portalDomain }`,
    }
    const authorization = store.state.authorization
    if (authorization) headers['Authorization'] = authorization
    return headers
}

async function send<D>(method: RequestMethod, route: string, body: any = undefined): Promise<D> {
    const response = await fetch(`${ KJP_HOST }/api/${ route }`, {
        method,
        headers: getHeaders(),
        body
    })
    if (!response.ok) {
        console.error('Request failed')
        console.table({
            method,
            route,
            body
        })
        const status = response.status
        if (status == 403) {
            await router.push({ name: 'Home' })
            alert('Invalid access', 'It appears that your access token was not valid to KAMAR, please login again to continue')
            throw 'Invalid access'
        } else if (status == 400) {
            await store.dispatch('clear')
            await router.push({ name: 'Setup' })
            alert(
                'Invalid request',
                'It appears something has gone wrong when attempting' +
                ' to contact the servers please re-enter your portal details'
            )
            throw 'Invalid request'
        } else if (status == 500) {
            await store.dispatch('clear')
            await router.push({ name: 'Setup' })
            alert(
                'Unable to contact KAMAR',
                'We were unable to connect to your KAMAR portal or' +
                ' it sent us an invalid response. Please check that the domain ' +
                'you provided is correct'
            )
            throw 'Invalid KAMAR'
        } else {
            await store.dispatch('clear')
            await router.push({ name: 'Setup' })
            alert(
                'Unknown Error',
                'An unknown error occurred and we were unable to process your request.' +
                'Try again in a few minutes and if this problem persists please contact ' +
                'jacobtread@gmail.com'
            )
            throw 'Unknown Error'
        }
    }
    return response.json();
}

export const getSettings = async () => {
    const cacheName = safeEncodeDomain(getPortalDomain() + '_settings')
    let portalSettings: PortalSettings | null = getCache(cacheName)
    if (portalSettings == null) {
        portalSettings = await send<PortalSettings>('GET', 'settings')
        setCache(cacheName, portalSettings, { hours: 3 })
    }
    return portalSettings
}