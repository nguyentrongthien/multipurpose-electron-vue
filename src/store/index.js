import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

/**
 * Check registred module
 * @param {Array} aPath - path to module - ex: ['my', 'nested', 'module']
 * @return {Boolean}
 */
Vuex.Store.prototype.hasModule = function (aPath) {
    let m = this._modules.root;
    return aPath.every((p) => {
        m = m._children[p];
        return m;
    });
};

Vue.use(Vuex);

const state = {};
const mutations = {};
const getters = {};
const actions = {
    dispatchModuleActions : (context, payload) => {
        context.dispatch(`${payload.type}`, payload.payload).then(() => {}).catch(error => {});
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules,
});

window.ipcRenderer.on('main-process-reply', (event, type, payload) => {
    store.dispatch("dispatchModuleActions", {
        type: type,
        payload: payload
    }).then(() => {}).catch(error => {});
});

export default store;