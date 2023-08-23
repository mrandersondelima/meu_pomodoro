import { createStore } from 'vuex'

const store = createStore({
    state(){
        return {
            tempo_pomodoro: null,
            tempo_ficar_pe: null,
            tempo_pomodoro_curto: null,
            dialog: false
        }
    },
    mutations: {
        set_tempo_pomodoro (state, novo_valor){
            state.tempo_pomodoro = novo_valor
        },
        set_tempo_ficar_pe (state, novo_valor){
            state.tempo_ficar_pe = novo_valor
        },
        set_tempo_pomodoro_curto (state, novo_valor){
            state.tempo_pomodoro_curto = novo_valor
        },
        set_dialog(state, novo_valor){
            state.dialog = novo_valor
        }
    }
})

export default store