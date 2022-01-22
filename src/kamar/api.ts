import router from "@/router";
import { alert } from "@/event";
import { ExpiryDuration, getCache, setCache } from "@/cache";
import { safeEncodeCacheName } from "@/tools";
import { useMainStore } from "@/store";
import { pinia } from "@/main";

const KJP_HOST: string = process.env.VUE_APP_KJP_HOST

console.log(process.env.VUE_APP_KJP_HOST)

interface AbortMapper {
    [key: string]: AbortController
}

const abortMapper: AbortMapper = {}

export function abortAll() {
    const keys = Object.keys(abortMapper)
    for (let key of keys) {
        abortMapper[key].abort()
        delete abortMapper[key]
    }
}

export const DUMMY_DATA = {
    settings: {
        logo_path: '',
        school_name: '',
        user_access: []
    } as PortalSettings,
    notices: {
        date: '',
        notices: [
            {
                level: '',
                body: '',
                subject: '',
                teacher: '',
                skeleton: true
            }
        ],
        meetings: []
    } as Notices
}

type RequestMethod = 'GET' | 'POST'

function getPortalDomain(): string {
    const store = useMainStore(pinia)
    return store.portalDomain as string;
}

function getHeaders() {
    const store = useMainStore(pinia)
    const portalDomain = getPortalDomain()
    const headers: any = {
        'Content-Type': 'application/json',
        'X-Portal': `${ portalDomain }`,
    }
    const authorization = store.authorization
    if (authorization) headers['Authorization'] = authorization
    return headers
}

async function send<D>(method: RequestMethod, route: string, body: any = undefined): Promise<D> {
    const store = useMainStore(pinia)
    let abortController = abortMapper[route];
    if (!abortController) {
        abortController = new AbortController()
        abortMapper[route] = abortController
    } else {
        abortController.abort()
    }
    const init: RequestInit = {
        method,
        headers: getHeaders(),
        signal: abortController.signal
    }
    if (body != undefined) {
        init.body = JSON.stringify(body)
    }
    const response = await fetch(`${ KJP_HOST }/api/${ route }`, init)
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
            await store.clear()
            await router.push({ name: 'Setup' })
            alert(
                'Invalid request',
                'It appears something has gone wrong when attempting' +
                ' to contact the servers please re-enter your portal details'
            )
            throw 'Invalid request'
        } else if (status == 500) {
            await store.clear()
            await router.push({ name: 'Setup' })
            alert(
                'Unable to contact KAMAR',
                'We were unable to connect to your KAMAR portal or' +
                ' it sent us an invalid response. Please check that the domain ' +
                'you provided is correct'
            )
            throw 'Invalid KAMAR'
        } else {
            await store.clear()
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
    const json = await response.json();
    console.log(json)
    return json
}

export async function sendCaching<D>(duration: ExpiryDuration, method: RequestMethod, route: string, body: any = undefined): Promise<D> {
    const cacheName = safeEncodeCacheName(getPortalDomain() + '_' + route)
    let response: D | null = getCache(cacheName)
    if (response == null) {
        response = await send<D>(method, route, body)
        setCache(cacheName, response, { hours: 3 })
    }
    return response as D
}

export async function sendCachingTransformed<I, O>(duration: ExpiryDuration, transformer: (input: I) => O, method: RequestMethod, route: string, body: any = undefined) {
    const cacheName = safeEncodeCacheName(getPortalDomain() + '_' + route)
    let response: O | null = getCache(cacheName)
    if (response == null) {
        const rawInput = await send<I>(method, route, body)
        response = transformer(rawInput)
        setCache(cacheName, response, { hours: 3 })
    }
    return response
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

export const getSettings = async () => sendCaching<PortalSettings>({ hours: 1 }, 'GET', 'settings')

export interface Notices {
    date: string;
    meetings: MeetingNotice[] | null,
    notices: Notice[] | null
}

export interface Notice {
    level: string;
    subject: string;
    body: string;
    teacher: string;
    skeleton?: boolean;
}

export interface MeetingNotice {
    level: string;
    subject: string;
    body: string;
    teacher: string;
    place: string;
    date: string;
    time: string;
}

export const getNotices = async (date: string) => sendCaching<Notices>({ minutes: 15 }, 'GET', 'notices?date=' + date)

export interface LoginResult {
    login_level: number;
    current_student: number;
    key: string;
}

export const doLogin = async (username: string, password: string) => send<LoginResult>('POST', 'login', {
    username,
    password
})