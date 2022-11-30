import { useAuthStore } from '@/stores/auth'
import { useCookies } from "vue3-cookies"

// cookieの値をstoreに格納する処理
// ページリロードする際に、cookieの値をstoreに格納するために使用する
export const setCookie = () => {
  const authStore = useAuthStore();
  const { cookies } = useCookies();

  // cookieにsessionがある場合
  if (cookies.get('session')) {
    // cookieの値をstoreに格納する
    authStore.setAuth({
      'access-token': cookies.get('session')['access-token'],
      'client': cookies.get('session')['client'],
      'expiry': cookies.get('session')['expiry'],
      'uid': cookies.get('session')['uid'],
    });
    authStore.setUser({
      'id': cookies.get('session')['id'],
      'name': cookies.get('session')['name'],
      'image': cookies.get('session')['image']
    });
  }
}
