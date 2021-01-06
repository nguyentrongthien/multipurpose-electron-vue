<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" class="text-center">
                <h1>TEST</h1>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="6">
                <v-card
                    max-width="600"
                    class="mx-auto"
                >
                    <v-toolbar
                        color="light-blue"
                        dark
                    >
                        <v-app-bar-nav-icon></v-app-bar-nav-icon>

                        <v-toolbar-title>My files</v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>mdi-view-module</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-list
                        subheader
                        two-line
                    >
                        <v-subheader inset>Drives</v-subheader>

                        <v-list-item
                            v-for="drive in getDrives"
                            :key="drive"
                            link
                            @click="goToDrive(drive)"
                        >
                            <v-list-item-avatar>
                                <v-icon
                                    class="grey lighten-1"
                                    dark
                                >
                                    mdi-folder
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="drive"></v-list-item-title>

                                <v-list-item-subtitle v-text="'test'"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-subheader inset>Folders</v-subheader>

                        <v-list-item v-if="typeof getFolders === undefined || getFolders.length <= 0">
                            <v-list-item-content>
                                <v-list-item-title>There is no folder</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item
                            v-for="folder in getFolders"
                            :key="folder"
                            link
                            @click="goToPath(folder)"
                        >
                            <v-list-item-avatar>
                                <v-icon
                                    class="grey lighten-1"
                                    dark
                                >
                                    mdi-folder
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="folder"></v-list-item-title>

                                <v-list-item-subtitle v-text="'test'"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-subheader inset>Files</v-subheader>

                        <v-list-item v-if="typeof getFiles === undefined || getFiles.length <= 0">
                            <v-list-item-content>
                                <v-list-item-title>There is no file</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item
                            v-for="file in getFiles"
                            :key="file"
                        >
                            <v-list-item-avatar>
                                <v-icon
                                    :class="'red'"
                                    dark
                                ></v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-text="file"></v-list-item-title>

                                <v-list-item-subtitle v-text="'test'"></v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Main",
        data() {
            return {
                files: [
                    {
                        color: 'blue',
                        icon: 'mdi-clipboard-text',
                        subtitle: 'Jan 20, 2014',
                        title: 'Vacation itinerary',
                    },
                    {
                        color: 'red',
                        icon: 'mdi-gesture-tap-button',
                        subtitle: 'Jan 10, 2014',
                        title: 'Kitchen remodel',
                    },
                ],
                folders: [
                    {
                        subtitle: 'Jan 9, 2014',
                        title: 'Photos',
                    },
                    {
                        subtitle: 'Jan 17, 2014',
                        title: 'Recipes',
                    },
                    {
                        subtitle: 'Jan 28, 2014',
                        title: 'Work',
                    },
                ],
            };
        },
        mounted() {
            this.$store.dispatch('filesystem/requestAllDrives');
        },
        methods: {
            goToDrive(drive) {
                this.$store.dispatch('filesystem/goToDrive', drive);
            },
            goToPath(destination) {
                console.log(destination);
                this.$store.dispatch('filesystem/goTo', destination);
            }
        },
        computed: {
            ...mapGetters('filesystem', ['getDrives', 'getFiles', 'getFolders']),
        },
    };
</script>

<style scoped>

</style>