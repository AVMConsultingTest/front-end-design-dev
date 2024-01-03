import { GetterTree, ActionTree, MutationTree } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";
// import axios from 'axios'
import ApiService from "~/services/baseService";
// import { APIResponse } from '~/models/common/apiResponse'
const staticSecure: any = process.env.secure;
const service: ApiService = new ApiService();

export const state = () => ({
  defaultTabs: {
    safety: {
      carrier: 0,
      driver: 0,
      fleet: 0,
    },
  },
  carrierId: 3,
  brokerId: 3,
  secureAuthenticated: false,
  menuOpened: true,
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNhcnJpZXIiLCJpYXQiOjE2OTMwNTAyMzUsImV4cCI6MTY5MzIyMzAzNX0.CiAf04XYcfTuJ32Z5DfVQHJra8-_anytoHlqzpjUf_8",
  currentUser: null,
});

export type StoreState = ReturnType<typeof state>;

export const getters: GetterTree<StoreState, StoreState> = {
  menuOpened: (state) => state.menuOpened,
  tabs: (state) => state.defaultTabs,
  carrierId: (state) => state.carrierId,
  currentUser: (state) => state.currentUser,
};

export const mutations: MutationTree<StoreState> = {
  setSecureAuth(state, data) {
    state.secureAuthenticated = data;
  },
  setMenu(state, toggle) {
    state.menuOpened = toggle;
  },
  setTab(state, tabs) {
    state.defaultTabs = tabs;
  },
  setAccessToken(state, token) {
    state.token = token;
  },
  accessToken(state, token) {
    state.token = token;
  },
  setCurrentUser(state, data) {
    state.currentUser = data;
  },
};

export const actions: ActionTree<StoreState, StoreState> = {
  secureLogin({ commit }, secureData) {
    try {
      if (
        secureData.name !== staticSecure.name ||
        secureData.pwd !== staticSecure.pwd
      ) {
        commit("setSecureAuth", false);
      } else if (
        secureData.name === staticSecure.name &&
        secureData.pwd === staticSecure.pwd
      ) {
        commit("setSecureAuth", true);
      }
      this.$router.push("/carrier/dashboard");
    } catch {}
  },
  toggleMenu({ commit }, toggle) {
    commit("setMenu", toggle);
  },
  setDefaultTab({ commit }, tabs) {
    commit("setTab", tabs);
  },
  setSecureAuth({ commit }, auth) {
    commit("setSecureAuth", auth);
  },
  async loginNew({ commit }, request: any) {
    const endpoint = "auth/login";

    return await service
      .add<any, any>(endpoint, request)
      .then(async (response) => {
        console.log("test", response);
        if (response.status === 200) {
          debugger
          localStorage.setItem("token", (response.data as any).access_token);
          commit("accessToken", response.data.access_token);
          commit("setSecureAuth", true);
          if ((response.data as any).role !== "broker") {
            await service.get<any>("carrier/users/me", 0).then((response) => {
              const test: any = response.data;
              test.permissions = test.permissions.map((p: any) => {
                return {
                  ...p,
                  can_read: true,
                  can_write: true,
                };
              });
              commit("setCurrentUser", test);
              return response.data;
            });
          }
          if ((response.data as any).role === "broker") {
            this.$router.push("/broker/dashboard/");
          } else {
            this.$router.push("/carrier/dashboard");
          }
        } else {
          commit("accessToken", response.data.access_token);
          commit("SET_ERROR", response.data.message);
          commit("setSecureAuth", false);
        }
      });
  },
};

export const plugins = [
  createPersistedState({
    paths: ["secureAuthenticated", "defaultTabs", "token"],
    storage: {
      getItem: (key) => Cookies.get(key),
      setItem: (key, value) => {
        const date = new Date();
        const minute = 60 * 1000;
        const hour = minute * 60;
        // const day = hour * 24

        date.setTime(date.getTime() + date.getTimezoneOffset() + hour);
        Cookies.set(key, value, { expires: date, secure: false });
      },
      removeItem: (key) => Cookies.remove(key),
    },
  }),
];

// test
