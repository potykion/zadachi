import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasksLoaded: false,
        tasks: [
            {title: ""}
        ],

        axiosInstance: null,
    },

    mutations: {
        appendBlankTask(state) {
            state.tasks = [...state.tasks, {title: ""}];
        },
        setupAxios(state, token) {
            console.log(process.env);
            state.axiosInstance = axios.create({
                headers: {"Authorization": `JWT ${token}`}
            });
        },
        setTasks(state, tasks) {
            state.tasks = [...tasks, ...state.tasks];
        },
        setTasksLoaded(state) {
            state.tasksLoaded = true;
        }
    },

    actions: {
        requestToken({commit, dispatch}, env) {
            axios.post(`/login_via_env/${env}`)
                .then(function (response) {
                    const token = localStorage.token = response.data.token;
                    commit("setupAxios", token);
                })
                .catch(function (error) {
                    alert(error.response.data.error);
                });
        },

        refreshTasks({commit, state}) {
            state.axiosInstance.get(`/tasks`)
                .then(function (response) {
                    commit("setTasks", response.data);
                    commit("setTasksLoaded");
                });
        }
    },

    getters: {
        lastTask: state => {
            return state.tasks[state.tasks.length - 1];
        },

        authorized: state => {
            return state.axiosInstance !== null
        }

    }
});
