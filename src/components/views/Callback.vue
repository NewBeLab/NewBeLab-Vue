<template>
  <div></div>
</template>

<script>
// githubからのリダイレクト先
// このコンポーネントは、githubからのcallbackで呼び出される
// tokenをpiniaを利用してstoreに保存する
// 保存後は、/homeに遷移する

import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Callback',
  setup() {
    const store = useAuthStore()
    const router = useRouter()

    // githubからのリダイレクトで渡されるtokenとuserを取得する
    const token = router.currentRoute.value.query.token
    const user = router.currentRoute.value.query.user

    // tokenとuserをstoreに保存する
    store.login(token, user)

    // 保存後は、/homeに遷移する
    router.push({ name: 'Home' })

    return {}
  }
}
</script>
