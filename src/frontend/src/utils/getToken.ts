export async function getToken() {
    if (typeof window !== 'undefined') {
        const { getCookie } = await import('cookies-next');
        return await getCookie('token');
    } else {
        const { cookies } = await import('next/headers');
        return (await cookies()).get('token')?.value;
    }
}