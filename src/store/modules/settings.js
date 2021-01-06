const type = "settings";

const state = {
    settings: {
        appName: 'test'
    }
};
const getters = {
    getSettings : state =>  state.settings,
};
const actions = {
    saveSettings : (context) => {
        window.ipcRenderer.send('renderer-process-request', `${type}/receiveDrives`,
            {
                flag: 'saveSettings',
                settings: JSON.stringify(context.getters.getSettings)
            });
        console.log('settings saved');
    },
    requestSettings : () => {
        window.ipcRenderer.send('renderer-process-request', `${type}/receiveSettings`,
            {
                flag: 'requestSettings',
            });
    },
    receiveSettings : (context, payload) => {
        context.commit('setSettings', payload.settings);
    }
};
const mutations = {
    setSettings : (state, settings) => {
        state.settings = settings;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};