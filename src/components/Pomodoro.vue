<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useWebNotification } from '@vueuse/core'
import Configuracoes from './Configuracoes.vue'
import store from '../store'

const {
    notification, 
    show
} = useWebNotification({
    title: 'Fim do pomodoro',
    dir: 'auto',
    lang: 'pt-BR',
    renotify: true,
    tag: 'test'
})

var tab = ref()
const countdown = ref(null)
const fim_pomodoro = ref(null)
const alarm = ref(null)
const fim_pomodoro_curto = ref(null)
const fim_ficar_pe = ref(null)
const countdown_ficar_pe = ref(null)
const countdown_pomodoro_curto = ref(null)
var dialog = ref(false)

var tempo_pomodoro_original = ref(parseInt( store.state.tempo_pomodoro ) * 60 * 1000)
var tempo_pomodoro = ref( parseInt(store.state.tempo_pomodoro) * 60 * 1000)
var tempo_ficar_pe_original = ref( parseInt( store.state.tempo_ficar_pe) * 60 * 1000)
var tempo_ficar_pe = ref( parseInt( store.state.tempo_ficar_pe ) * 60 * 1000)
var tempo_pomodoro_curto_original = ref( parseInt( store.state.tempo_pomodoro_curto ) * 60 * 1000)
var tempo_pomodoro_curto = ref( parseInt(store.state.tempo_pomodoro_curto ) * 60 * 1000)
var minutos_pomodoro = ref( parseInt( store.state.tempo_pomodoro))
var segundos_pomodoro = ref(0)
var minutos_pomodoro_curto = ref( parseInt( store.state.tempo_pomodoro_curto ))
var segundos_pomodoro_curto = ref(0)
var minutos_ficar_pe = ref( parseInt( store.state.tempo_ficar_pe ))
var segundos_ficar_pe = ref(0)
var is_pomodoro_running = ref(false)
var is_ficar_pe_running = ref(false)
var is_pomodoro_curto_running = ref(false)

// onMounted(()=> {
//     console.log('montado')
// })

function atualiza_valores(){
    console.log('atualiza_valores')
    tempo_pomodoro_original.value = parseInt(store.state.tempo_pomodoro) * 60 * 1000
    tempo_pomodoro.value = parseInt(store.state.tempo_pomodoro) * 60 * 1000
    tempo_ficar_pe_original.value = parseInt(store.state.tempo_ficar_pe) * 60 * 1000
    tempo_ficar_pe.value = parseInt(store.state.tempo_ficar_pe) * 60 * 1000
    tempo_pomodoro_curto_original.value = parseInt(store.state.tempo_pomodoro_curto) * 60 * 1000
    tempo_pomodoro_curto.value = parseInt(store.state.tempo_pomodoro_curto) * 60 * 1000
    minutos_pomodoro.value = parseInt(store.state.tempo_pomodoro)
    segundos_pomodoro.value = 0
    minutos_pomodoro_curto.value = parseInt(store.state.tempo_pomodoro_curto)
    segundos_pomodoro_curto.value = 0
    minutos_ficar_pe.value = parseInt(store.state.tempo_ficar_pe)
    segundos_ficar_pe.value = 0
}

function progress_pomodoro(data){
    minutos_pomodoro.value = data.minutes
    segundos_pomodoro.value = data.seconds
}

function progress_ficar_pe(data){
    minutos_ficar_pe.value = data.minutes
    segundos_ficar_pe.value = data.seconds
}

function progress_pomodoro_curto(data){
    minutos_pomodoro_curto.value = data.minutes
    segundos_pomodoro_curto.value = data.seconds
}

function transformSlotProps(props) {
    const formattedProps = {};

    Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });

    return formattedProps;
}

function run(){
    if ( tab.value == 'one' ) {
        if ( is_pomodoro_running.value ){
            countdown.value.abort()
        } else {
            tempo_pomodoro.value = tempo_pomodoro_original.value - ( ( ( store.state.tempo_pomodoro -minutos_pomodoro.value ) * 60  ) * 1000 ) + ( segundos_pomodoro.value ) * 1000             
            if ( tempo_pomodoro.value != store.state.tempo_pomodoro * 60 * 1000 ){            
                countdown.value.start()
            } else {
                countdown.value.restart()
            }
        }

        is_pomodoro_running.value = !is_pomodoro_running.value
    } else if ( tab.value == 'two' ) {
        if ( is_ficar_pe_running.value ){
            countdown_ficar_pe.value.abort()
        } else {
            tempo_ficar_pe.value = tempo_ficar_pe_original.value - ( ( ( store.state.tempo_ficar_pe - minutos_ficar_pe.value ) * 60  ) * 1000 ) + ( segundos_ficar_pe.value ) * 1000             
            if ( tempo_ficar_pe.value != store.state.tempo_ficar_pe * 60 * 1000 ){            
                countdown_ficar_pe.value.start()
            } else {
                countdown_ficar_pe.value.restart()
            }
            
        }

        is_ficar_pe_running.value = !is_ficar_pe_running.value
    } else {
        if ( is_pomodoro_curto_running.value ){
            countdown_pomodoro_curto.value.abort()
        } else {
            tempo_pomodoro_curto.value = tempo_pomodoro_curto_original.value - ( ( ( store.state.tempo_pomodoro_curto -minutos_pomodoro_curto.value ) * 60  ) * 1000 ) + ( segundos_pomodoro_curto.value ) * 1000             
            if ( tempo_pomodoro_curto.value != store.state.tempo_pomodoro_curto * 60 * 1000 ){            
                countdown_pomodoro_curto.value.start()
            } else {
                countdown_pomodoro_curto.value.restart()
            }
        }

        is_pomodoro_curto_running.value = !is_pomodoro_curto_running.value
    }
}

function pular_pomodoro(){
    if ( tab.value == 'one' ) {
        tempo_pomodoro.value = tempo_pomodoro_original.value
        minutos_pomodoro.value = store.state.tempo_pomodoro
        segundos_pomodoro.value = 0
        countdown.value.restart()
        countdown.value.abort()
        is_pomodoro_running.value = false
    } else if ( tab.value == 'two' ) {
        tempo_ficar_pe.value = tempo_ficar_pe_original.value 
        minutos_ficar_pe.value = store.state.tempo_ficar_pe
        segundos_ficar_pe.value = 0
        countdown_ficar_pe.value.restart()
        countdown_ficar_pe.value.abort()
        is_ficar_pe_running.value = false
    } else {
        tempo_pomodoro_curto.value = tempo_pomodoro_curto_original.value
        minutos_pomodoro_curto.value = store.state.tempo_pomodoro_curto
        segundos_pomodoro_curto.value = 0
        countdown_pomodoro_curto.value.restart()
        countdown_pomodoro_curto.value.abort()
        is_pomodoro_curto_running.value = false
    }
}

function toca_musica_pomodoro(){
    fim_pomodoro.value.play()
    tempo_pomodoro.value = tempo_pomodoro_original.value
    minutos_pomodoro.value = tempo_pomodoro_original.value
    countdown.value.restart()
    countdown.value.abort()
    is_pomodoro_running.value = false
    show()
}

function toca_musica_ficar_pe(){
    fim_ficar_pe.value.play()
    tempo_ficar_pe.value = tempo_ficar_pe_original.value
    minutos_ficar_pe.value = parseInt( store.state.tempo_ficar_pe )
    countdown_ficar_pe.value.restart()
    countdown_ficar_pe.value.abort()
    is_ficar_pe_running.value = false
    show()
}

function toca_musica_pomodoro_curto(){
    fim_pomodoro_curto.value.play()
    tempo_pomodoro_curto.value = tempo_pomodoro_curto_original.value
    minutos_pomodoro_curto.value = tempo_pomodoro_curto_original.value
    countdown_pomodoro_curto.value.restart()
    countdown_pomodoro_curto.value.abort()
    is_pomodoro_curto_running.value = false
    show()
}

const cor_de_fundo_clara = computed(() => {
    if ( tab.value == 'one' )
        return 'class-fundo-vermelho-claro'
    else if ( tab.value == 'two' )
        return 'class-fundo-verde-claro'
    else
        return 'class-fundo-azul-claro'
})

const cor_de_fundo_escura = computed(() => {
    if ( tab.value == 'one' )
        return 'class-fundo-vermelho-escuro'
    else if ( tab.value == 'two' )
        return 'class-fundo-verde-escuro'
    else
        return 'class-fundo-azul-escuro'
})

const cor_texto_botao = computed(() => {
    if ( tab.value == 'one' )
        return 'cor-texto-botao-vermelho'
    else if ( tab.value == 'two' )
        return 'cor-texto-botao-verde'
    else
        return 'cor-texto-botao-azul'
})


</script>

<template>
      <v-dialog
        v-model="store.state.dialog"
        width="80%"
        height="auto"
      >
        <Configuracoes @mudou_configuracao="atualiza_valores"/>
      </v-dialog>

    <audio hidden="true" ref="fim_pomodoro">
        <source src="../assets/fim_pomodoro.mp3" type="audio/mpeg">
    </audio>

    <audio hidden="true" ref="alarm">
        <source src="../assets/alarm.mp3" type="audio/mpeg">
    </audio>

    <audio hidden="true" ref="fim_ficar_pe">
        <source src="../assets/fim_ficar_pe.mp3" type="audio/mpeg">
    </audio>

    <audio hidden="true" ref="fim_pomodoro_curto">
        <source src="../assets/fim_pomodoro_curto.mp3" type="audio/mpeg">
    </audio>

    <v-container fluid :class="cor_de_fundo_clara" style="color: white; height: 100%;">
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-row>
                        <v-col class="text-h6">Meu Pomodoro</v-col>
                        <v-col class="d-flex justify-end">
                            <v-btn @click="store.state.dialog = true" :ripple="false" class="text-subtitle-2 text-white" variant="flat" prepend-icon="mdi-cog" :class="cor_de_fundo_escura">
                                Configurações
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
                
        </v-container>
        <v-divider class="pb-4" style="color: black;"></v-divider>

        <v-container align="center" :class="cor_de_fundo_escura" class="rounded-lg mt-4" style="color: white; width: 86%;">
            <v-card class="p-4" :class="cor_de_fundo_escura" width="90%" style="color: white; box-shadow: none;">
                <v-tabs align-tabs="center"
                    v-model="tab" :hide-slider="true"
                    selected-class="tab-selecionada" class="minhas-tabs"
                    >
                    <v-tab value="one" :ripple="false" style="height: 30px;" class="text-none">Pomodoro</v-tab>
                    <v-tab value="two" :ripple="false" style="height: 30px;" class="text-none">Ficar em pé</v-tab>
                    <v-tab value="three" :ripple="false" style="height: 30px;" class="text-none">Pomodoro curto</v-tab>                
                </v-tabs>
            <v-card-text class="meu-card">
                <v-window v-model="tab">
                    <v-window-item value="one" class="text-h1">
                        <vue-countdown class="fonte-redonda" @end="toca_musica_pomodoro" :transform="transformSlotProps" @progress="progress_pomodoro" ref="countdown" :auto-start="false" :time="tempo_pomodoro" v-slot="{ hours, minutes, seconds }">
                            {{ minutes }} : {{ seconds }}
                        </vue-countdown>
                        <v-container>
                    <v-row>
                        <v-col></v-col>
                        <v-col>
                            <v-btn @click="run" :elevation="is_pomodoro_running ? 0 : 10" :ripple="false" size="x-large" :class="cor_texto_botao" class="font-weight-bold botao-inicio">{{ is_pomodoro_running ? 'PAUSAR' : 'INICIAR' }}</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn @click="pular_pomodoro" v-show="is_pomodoro_running" variant="text" size="x-large" class="text-h5" icon="mdi-skip-next"></v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                    </v-window-item>

                    <v-window-item value="two" class="text-h1">
                        <vue-countdown class="fonte-redonda" @end="toca_musica_ficar_pe" :transform="transformSlotProps" @progress="progress_ficar_pe" ref="countdown_ficar_pe" :auto-start="false" :time="tempo_ficar_pe" v-slot="{ hours, minutes, seconds }">
                            {{ minutes }} : {{ seconds }}
                        </vue-countdown>   
                        <v-container>
                    <v-row>
                        <v-col></v-col>
                        <v-col>
                            <v-btn @click="run" :elevation="is_ficar_pe_running ? 0 : 10" :ripple="false" size="x-large" :class="cor_texto_botao" class="font-weight-bold botao-inicio">{{ is_ficar_pe_running ? 'PAUSAR' : 'INICIAR' }}</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn  @click="pular_pomodoro" v-show="is_ficar_pe_running" variant="text" size="x-large" class="text-h5" icon="mdi-skip-next"></v-btn>
                        </v-col>
                    </v-row>
                </v-container>     
                    </v-window-item>

                    <v-window-item value="three" class="text-h1">
                        <vue-countdown class="fonte-redonda" @end="toca_musica_pomodoro_curto" :transform="transformSlotProps" @progress="progress_pomodoro_curto" ref="countdown_pomodoro_curto" :auto-start="false" :time="tempo_pomodoro_curto" v-slot="{ hours, minutes, seconds }">
                            {{ minutes }} : {{ seconds }}
                        </vue-countdown>
                        <v-container>
                    <v-row>
                        <v-col></v-col>
                        <v-col>
                            <v-btn @click="run" :elevation="is_pomodoro_curto_running ? 0 : 10" :ripple="false" size="x-large" :class="cor_texto_botao" class="font-weight-bold botao-inicio">{{ is_pomodoro_curto_running ? 'PAUSAR' : 'INICIAR' }}</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn  @click="pular_pomodoro" v-show="is_pomodoro_curto_running" variant="text" size="x-large" class="text-h5" icon="mdi-skip-next"></v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                    </v-window-item>
                    
                    
                </v-window>
               
            </v-card-text>
        </v-card>
        </v-container>
        


    </v-container>        
    
</template>



<style lang="css" scoped>

.fonte-redonda {
    font-family: 'Varela Round', sans-serif !important;
    font-weight: 600 !important;
}
.minhas-tabs {
    flex: content;
    align-items: center;
}
.tab-selecionada {
    background-color: rgba(0, 0, 0, 0.2) ;
    height: 30px !important;
    align-items: center;
    justify-items: center;
}
.meu-card {
    box-shadow: 0px 0px 0px 0px !important ;
}
.botao-inicio {
    width: 160px;
    background-color: #181a1b;
}

.cor-texto-botao-vermelho {
    color: #c15b5b;
}

.class-fundo-vermelho-claro {
    background-color: #923737;
}

.class-fundo-vermelho-escuro {
    background-color: #853434;
}

.cor-texto-botao-verde {
    color: #7ac4c9;
}
.class-fundo-verde-claro {
    background-color: #2d6a6e;
}

.class-fundo-verde-escuro {
    background-color: #2a6266;
}

.cor-texto-botao-azul {
    color: #70a4c9;
}

.class-fundo-azul-claro {
    background-color: #2e5a79;
}

.class-fundo-azul-escuro {
    background-color: #2b5470;
}

</style>

