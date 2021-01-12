const type = "settings";

const state = {
    settings: {
        appName: 'test'
    },
    ffmpegInstallation: {
        downloadPercent: 0,
        done: false,
        inProgress: false,
    }
};
const getters = {
    getSettings : state =>  state.settings,
    ffmpegInstalled : state => state.ffmpegInstallation.done,
    ffmpegPercent : state => state.ffmpegInstallation.downloadPercent,
    ffmpegInProgress: state => state.ffmpegInstallation.inProgress,
};
const actions = {
    saveSettings : (context) => {
        window.ipcRenderer.send('renderer-process-request', `${type}/receiveDrives`,
            {
                flag: 'saveSettings',
                settings: JSON.stringify(context.getters.getSettings)
            });
    },
    requestSettings : () => {
        window.ipcRenderer.send('renderer-process-request', `${type}/receiveSettings`,
            {
                flag: 'requestSettings',
            });
    },
    receiveSettings : (context, payload) => {
        context.commit('setSettings', payload.settings);
    },
    initFFMPEGInstallation : (context) => {
        window.ipcRenderer.send('renderer-process-request', `${type}/finishFFMPEGInstallation`,
            {
                flag: 'installFFMPEG',
                update: `${type}/updateFFMPEGProgress`
            });
        context.commit('setFFMPEGInstallationInProgress', true);
    },
    updateFFMPEGProgress : (context, percent) => {
        context.commit('setFFMPEGInstallationPercent', percent);
    },
    finishFFMPEGInstallation : (context) => {
        context.commit('setFFMPEGInstallationDone', true);
        context.commit('setFFMPEGInstallationInProgress', false);
    }
};
const mutations = {
    setSettings : (state, settings) => {
        state.settings = settings;
    },
    setFFMPEGInstallationDone : (state, done) => {
        state.ffmpegInstallation.done = done;
    },
    setFFMPEGInstallationPercent : (state, progress) => {
        state.ffmpegInstallation.downloadPercent = progress;
    },
    setFFMPEGInstallationInProgress : (state, inProgress) => {
        state.ffmpegInstallation.inProgress = inProgress;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};