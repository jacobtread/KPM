export function safeEncodeCacheName(domain: string): string {
    return domain.replace(/[./?]/g, '_')
}