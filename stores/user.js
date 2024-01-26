import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const supabase = useSupabaseClient()
  const snackbar = useSnackbar()

  const user = useSupabaseUser()
  const profile = ref(null)

  const logginIn = ref(false)
  const fetchingProfile = ref(false)
  const updatingProfile = ref(false)
  const signingOut = ref(false)

  const login = async (email) => {
    try {
      logginIn.value = true
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) { throw error }
      snackbar.success({ text: 'Busca el link de ingreso en tu casilla de correo' })
      navigateTo('/')
    } catch (error) {
      snackbar.error({ text: error.error_description || error.message })
    } finally {
      logginIn.value = false
    }
  }

  const fetchProfile = async () => {
    if (!user.value) { return }
    try {
      fetchingProfile.value = true
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.value.id)
        .single()
      if (error) { throw error }
      profile.value = data
    } catch (error) {
      snackbar.log({ text: error.message, color: 'error' })
    } finally {
      fetchingProfile.value = false
    }
  }

  const updateProfile = async ({ firstName, lastName }) => {
    if (!user.value) { return }
    try {
      updatingProfile.value = true
      const updates = {
        id: user.value.id,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date()
      }
      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal' // Don't return the value after inserting
      })
      if (error) { throw error }
      snackbar.log({ text: 'Tu perfil ha sido actualizado correctamente', color: 'success' })
    } catch (error) {
      snackbar.log({ text: error.message, color: 'error' })
    } finally {
      await fetchProfile()
      updatingProfile.value = false
    }
  }

  const signOut = async () => {
    if (!user.value) { return }
    try {
      signingOut.value = true
      const { error } = await supabase.auth.signOut()
      if (error) { throw error }
      user.value = null
      profile.value = null
      navigateTo('/')
    } catch (error) {
      snackbar.log({ text: error.message, color: 'error' })
    } finally {
      signingOut.value = false
    }
  }

  return {
    user,
    profile,
    logginIn,
    fetchingProfile,
    updatingProfile,
    signingOut,
    login,
    fetchProfile,
    updateProfile,
    signOut
  }
})
