<template>
    <v-container fluid>
        <v-row justify="center" class="pt-5">
            <v-col>
                <h1 class="text-center">App Settings</h1>
            </v-col>
        </v-row>

        <v-row justify="center" class="pt-1">
            <v-col cols="12" lg="11" md="12">
                <v-row justify="center">


                    <v-col cols="4" xl="2" lg="2" md="3">
                        <v-card>
                            <v-card-title>Drives</v-card-title>
                            <v-list>
                                <v-list-item :to="'/'">
                                    <v-list-item-icon>
                                        <v-icon>mdi-home</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title>Home</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>


                    <v-col cols="6" xl="5" lg="6" md="6">

                        <v-card>
                            <v-toolbar color="grey darken-3">
                                <v-toolbar-title>Settings</v-toolbar-title>

                                <v-spacer></v-spacer>

                            </v-toolbar>
                            <v-row class="mx-1 mb-1 mt-3">
                                <v-col cols="12">
                                    <v-btn :disabled="ffmpegInstalled || ffmpegInProgress"
                                           @click="initFFMPEGInstallation()"
                                    >{{ffmpegInstallButton}}</v-btn>
                                </v-col>
                                <v-col cols="12" v-if="ffmpegInProgress">
                                    <v-progress-linear :value="ffmpegPercent"></v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-card>

                    </v-col>


                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: "Main",
    methods: {
        initFFMPEGInstallation() {
            if(!this.ffmpegInstalled && !this.ffmpegInProgress)
                this.$store.dispatch('settings/initFFMPEGInstallation');
        }
    },
    computed: {
        ...mapGetters('settings', ['ffmpegInstalled', 'ffmpegPercent', 'ffmpegInProgress']),
        ffmpegInstallButton() {
            if(this.ffmpegInstalled)
                return 'FFMPEG Installed';
            else if (this.ffmpegInProgress)
                return 'Installing FFMPEG... ' + this.ffmpegPercent + '%';
            else return 'Install FFMPEG';
        }
    },
};
</script>

<style scoped>

</style>