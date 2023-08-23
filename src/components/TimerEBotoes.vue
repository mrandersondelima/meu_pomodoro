<script setup>

defineProps(['run', 'valor', 'at_progress', 'countdown_ref', 'tempo', 'at_end', 'is_pomodoro_running', 'pular_pomodoro', 'cor_texto_botao'])

function transformSlotProps(props) {
    const formattedProps = {};

    Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
    });

    return formattedProps;
}

</script>

<template>
    <v-window-item value="one" class="text-h2 text-sm-h1">
    <vue-countdown class="fonte-redonda" @end="at_end" :transform="transformSlotProps" @progress="at_progress" :ref="countdown_ref" :auto-start="false" :time="tempo" v-slot="{ minutes, seconds }">
        {{ minutes }} : {{ seconds }}
    </vue-countdown>
    <v-container fluid>
<v-row align="center" class="d-flex justify-space-between flex-nowrap">           
    <v-col></v-col>
    <v-col class="flex-grow">
        <v-btn @click="run" :elevation="is_pomodoro_running ? 0 : 10" :ripple="false" size="x-large" :class="cor_texto_botao" class="font-weight-bold botao-inicio">{{ is_pomodoro_running ? 'PAUSAR' : 'INICIAR' }}</v-btn>
    </v-col>
    <v-col class="d-flex justify-start">
        <v-btn @click="pular_pomodoro" align-self="start" density="compact" v-show="is_pomodoro_running" variant="text" size="x-large" class="text-h5" icon="mdi-skip-next"></v-btn>
    </v-col>
</v-row>
</v-container>
</v-window-item>
</template>

<style lang="css" scoped>
.fonte-redonda {
    font-family: 'Varela Round', sans-serif !important;
    font-weight: 600 !important;
}
</style>