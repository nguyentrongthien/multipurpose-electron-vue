<template>
    <v-app style="background: transparent;">
        <v-main>
            <v-fade-transition mode="out-in">
                <router-view :key="$route.path"></router-view>
            </v-fade-transition>
        </v-main>
        <div :style="`background-image:url(${bg});`" class="bg-img"></div>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    data: () => ({
        //
        bg: require('./assets/bg.jpg')
    }),
    created() {
        this.$store.dispatch('settings/requestSettings');
    }
};
</script>

<style>
    .bg-img {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100%;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: -1;
    }
</style>