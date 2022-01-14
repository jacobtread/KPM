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

/**
 * Retrieves a cache from local storage and returns
 * the cache value or null if the cache was expired
 * or invalid
 *
 * @param key The key of the cache
 * @return The cache value or null if the cache was expired or invalid
 */
export function getCache<D>(key: string): D | null {
    const stored: string | null = localStorage.getItem(key);
    if (stored == null) return null;
    const parsed: Cache = JSON.parse(stored)
    if (!parsed.expires_at || parsed.data !== false && !parsed.data) return null;
    if (isCacheExpired(parsed)) return null
    return parsed.data as D;
}

interface ExpiryDuration {
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
    const cache: Cache<V> = { data, expires_at }
    localStorage.setItem(key, JSON.stringify(cache))
}