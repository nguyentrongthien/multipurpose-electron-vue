const type = "filesystem";
const state = {
    files: [],
    folders: [],
    drives: [],
    path: [],
};
const getters = {
    getDrives : state => state.drives,
    getFiles : state => state.files,
    getFolders : state => state.folders,
    getCurrentPath : state => state.path.join('/')
};
const actions = {
    requestAllDrives : () => {
        window.ipcRenderer.send('renderer-process-request', `${type}/receiveDrives`,
            {
                flag: 'getDrives'
            });
    },
    receiveDrives : (context, payload) => {
        context.commit('setDrives', payload);
    },
    goToDrive : (context, payload) => {
        context.commit('resetPath');
        context.dispatch('goTo', payload).then();
    },
    goTo : (context, payload) => {
        context.commit('appendToPath', payload);
        window.ipcRenderer.send('renderer-process-request', `${type}/receiveFilesAndFolders`,
            {
                flag:'getDirContents',
                path: context.getters.getCurrentPath + '/'
            });
    },
    receiveFilesAndFolders : (context, payload) => {
        context.commit('updateFilesAndFolders', payload);
    }
};
const mutations = {
    resetPath : state => {
        state.path.splice(0);
    },
    setDrives : (state, drives) => {
        state.drives = drives;
    },
    updateFilesAndFolders : (state, payload) => {
        console.log(payload);
        state.files = payload.files;
        state.folders = payload.folders;
    },
    appendToPath : (state, path) => {
        state.path.push(path);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};