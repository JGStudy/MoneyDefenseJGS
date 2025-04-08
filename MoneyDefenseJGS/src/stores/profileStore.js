import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore(
  'profile',
  () => {
    const name = ref('진기스')
    const email = ref('jingis@example.com')

    function updateName(newName) {
      name.value = newName
    }

    function updateEmail(newEmail) {
      email.value = newEmail
    }

    return { name, email, updateName, updateEmail }
  },
  { persist: true },
)
