<script setup>
import store from '../store'
import { ref } from 'vue'
// defino aqui que vou emitir o método mudou_configuracao pro componente pai
const emit = defineEmits(['mudou_configuracao'])

var tempo_pomodoro_temp = ref(store.state.tempo_pomodoro)
var tempo_ficar_pe_temp = ref(store.state.tempo_ficar_pe)
var tempo_pomodoro_curto_temp = ref(store.state.tempo_pomodoro_curto)

function salva_alteracoes(){
    store.commit('set_tempo_pomodoro', tempo_pomodoro_temp.value )
    store.commit('set_tempo_ficar_pe', tempo_ficar_pe_temp.value )
    store.commit('set_tempo_pomodoro_curto', tempo_pomodoro_curto_temp.value )
    store.state.dialog = false
    localStorage.removeItem("pomodoro_app")
    localStorage.setItem("pomodoro_app", JSON.stringify({ tempo_pomodoro: tempo_pomodoro_temp.value, tempo_ficar_pe: tempo_ficar_pe_temp.value, tempo_pomodoro_curto: tempo_pomodoro_curto_temp.value }) )
    // emite o evento pra avisar pro Pomodoro.vue pra atualizar os dados
    emit('mudou_configuracao')
}

</script>

<template>
    <v-card class="meu-card">
        <v-card-title class="text-subtitle-2">
            Configurações
        </v-card-title>
        <v-divider thickness="2"></v-divider>
        <v-card-text>
            <v-container>
                <v-row class="mb-2">
                    TIMER
                </v-row>
                <v-row>
                    Tempo (minutos)
                </v-row>
                <v-row>
                    <v-col>
                        <v-label id="pomodoro-label" class="text-subtitle-2 text-white" text="Pomodoro"></v-label>
                        <v-text-field      
                            label=""
                            type="number"
                            variant="outlined"
                            density="compact"
                            single-line
                            v-model="tempo_pomodoro_temp"
                            required
                            
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-label id="pomodoro-ficar-pe" class="text-subtitle-2 text-white" text="Ficar de pé"></v-label>
                        <v-text-field      
                            label=""
                            type="number"
                            variant="outlined"
                            density="compact"
                            single-line
                            v-model="tempo_ficar_pe_temp"
                            required                            
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-label id="pomodoro-curto" class="text-subtitle-2 text-white" text="Pomodoro curto"></v-label>
                        <v-text-field      
                            label=""
                            type="number"
                            variant="outlined"
                            density="compact"
                            single-line
                            v-model="tempo_pomodoro_curto_temp"
                            required                            
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions class="meu-footer">
            <v-row class="justify-end">
                <v-btn @click="salva_alteracoes" class="mx-4" variant="outlined">OK</v-btn>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<style scoped>

.meu-footer {
    background-color: #212425;
}
.meu-card {
    background-color: #181a1b;
    color: #ada79d;
}
</style>