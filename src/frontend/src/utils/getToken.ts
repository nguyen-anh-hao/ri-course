import { cookies } from 'next/headers'; // SSR
import { getCookie } from 'cookies-next'; // CSR

export async function getToken() {
    if (typeof window !== 'undefined') {
        return await getCookie('token');
    }

    return (await cookies()).get('token')?.value;
}
