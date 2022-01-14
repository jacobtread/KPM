export function safeEncodeDomain(domain: string): string {
    return domain.replace(/[.]/g, '_')
}