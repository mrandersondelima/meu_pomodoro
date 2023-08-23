<script setup>
import { ref, onBeforeMount } from 'vue'
import Pomodoro from './components/Pomodoro.vue'
import store from './store'

onBeforeMount(() => {
  console.log('chamou onCreated')
  const json = localStorage.getItem("pomodoro_app")
  const pomodoro_app_local_storage = JSON.parse(json)
  console.log(pomodoro_app_local_storage)
  if ( pomodoro_app_local_storage == null ){
    localStorage.setItem(
      "pomodoro_app",
      JSON.stringify({ tempo_pomodoro: 50, tempo_ficar_pe: 10, tempo_pomodoro_curto: 30 })
      
    )
    store.commit( 'set_tempo_pomodoro', 50 )
    store.commit( 'set_tempo_ficar_pe', 10 )
    store.commit( 'set_tempo_pomodoro_curto', 30 )
  } else {
    store.commit( 'set_tempo_pomodoro', parseInt(pomodoro_app_local_storage.tempo_pomodoro) )
    store.commit( 'set_tempo_ficar_pe', parseInt(pomodoro_app_local_storage.tempo_ficar_pe) )
    store.commit( 'set_tempo_pomodoro_curto', parseInt( pomodoro_app_local_storage.tempo_pomodoro_curto ))
  }

  //localStorage.removeItem("__" + process.env.CI_PROJECT_NAME + "_app");
  

})

</script>

<template>
  <v-app>
    <Pomodoro/>
  </v-app>  
</template>

<style scoped>

</style>
