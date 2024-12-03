import { cookies } from 'next/headers'; // SSR
import { getCookie } from 'cookies-next'; // CSR

export async function getToken() {
    let token = null;

    if (typeof window !== 'undefined') {
        token = await getCookie('token');
    } else {
        token = (await cookies()).get('token')?.value;
    }

    return token;
}
