// import shop from '../../api/shop'
import axios from '@/api';
import * as MUTYPES from '../mutation-types';

// initial state
const state = {
  $list: [],
  // $list: initialNts,
};

// getters
const getters = {
  allNotes: (state, getters, rootState) => {
    return state.$list;
  },
};

// actions
const actions = {
  query: async ({ commit }, params) => {
    const { data } = await axios.get('/api/notes', { params });
    commit(MUTYPES.NOTES.UPDATE_ALL, { $list: data });
  },
  create: async ({ commit }, { note, params }) => {
    const { data } = await axios.post('/api/notes', note, { params });
    commit(MUTYPES.NOTES.UPDATE_ALL, { $list: data });
  },
  edit: async ({ commit }, { id, note, params }) => {
    console.log(note);
    const { data } = await axios.put(`/api/notes/${id}`, note, { params });
    commit(MUTYPES.NOTES.UPDATE_ALL, { $list: data });
  },
  remove: async ({ commit }, { id, params }) => {
    await axios.delete(`/api/notes/${id}`, { params });
    commit(MUTYPES.NOTES.REMOVE, { id });
  },
  editLabel: async ({ commit }, { id, body }) => {
    const { data } = await axios.put(`/api/notes/${id}/editLabel`, body);
    commit(MUTYPES.NOTES.UPDATE_ONE, data[0]);
    return data[0];
  },
};

// mutations
const mutations = {
  [MUTYPES.NOTES.UPDATE_ALL](state, payload) {
    state.$list = payload.$list;
  },
  [MUTYPES.NOTES.UPDATE_ONE](state, note) {
    const $list = state.$list;
    const idx = $list.findIndex(p => p._id === note._id);
    if (idx >= 0) {
      $list.splice(idx, 1, note);
    } else {
      state.$list.unshift(note);
    }
  },
  [MUTYPES.NOTES.REMOVE](state, { id }) {
    const $list = state.$list;
    const idx = $list.findIndex(p => p._id === id);
    console.log(id, idx);
    state = { $list: $list.splice(idx, 1) };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
