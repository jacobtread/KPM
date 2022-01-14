interface GlobalCache {
    [name: string]: Cache
}

const globalCache: GlobalCache = {}

loadCache()

interface Cache<D = any> {
    data: D,
    expires_at: number
}

/**
 * Checks if the provided cache is expired
 * (its expires_at timestamp is before current timestamp)
 *
 * @param cache The cache to check for expiry
 * @return Whether or not the cache is expired
 */
function isCacheExpired(cache: Cache): boolean {
    const currentTime = new Date().getTime();
    return cache.expires_at < currentTime;
}

function isValidCache(cache: any): boolean {
    if (!cache.expires_at
        || (cache.data !== false && !cache.data)
        || isCacheExpired(cache)) {
        saveCache()
        return false
    }
    return true
}

/**
 * Retrieves a cache from local storage and returns
 * the cache value or null if the cache was expired
 * or invalid
 *
 * @param key The key of the cache
 * @return The cache value or null if the cache was expired or invalid
 */
export function getCache<D>(key: string): D | null {
    if (key in globalCache) {
        return globalCache[key].data as D
    }
    return null;
}

export interface ExpiryDuration {
    minutes?: number;
    hours?: number;
    days?: number;
}

/**
 * Stores the provided value in the local storage cache
 * with the provided expiry date
 *
 * @param key The key of the cache value
 * @param data The value of the cache
 * @param expires The expiry object containing the minutes, hours, days until expiry
 */
export function setCache<V>(key: string, data: V, expires: ExpiryDuration) {
    let expires_at = new Date().getTime()
    if (expires.minutes != undefined) expires_at += (1000 * 60) * expires.minutes
    if (expires.hours != undefined) expires_at += (1000 * 60 * 60) * expires.hours
    if (expires.days != undefined) expires_at += (1000 * 60 * 60 * 24) * expires.days
    globalCache[key] = { data, expires_at }
    saveCache()
}

/**
 * Saves the global cache to local storage
 */
export function saveCache() {
    const keys = Object.keys(globalCache)
    for (let key of keys) {
        const cache = globalCache[key]
        if (isCacheExpired(cache)) delete globalCache[key]
    }
    localStorage.setItem('kpm_cache', JSON.stringify(globalCache))
}

/**
 * Loads the cache from local storage and removes
 * any entries that are expired saving if changes
 * were made
 */
export function loadCache() {
    const rawCache = localStorage.getItem('kpm_cache')
    if (rawCache == null) return;
    const json = JSON.parse(rawCache)
    if (json == null) return;
    const keys = Object.keys(json)
    if (keys.length < 1) return;
    let removed = 0
    for (let key of keys) {
        const cache = json[key]
        if (isValidCache(cache)) {
            globalCache[key] = cache
        } else {
            removed++
        }
    }
    if (removed > 0) {
        saveCache()
    }
}