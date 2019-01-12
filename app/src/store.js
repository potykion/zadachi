import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import uuidv4 from "uuid/v4";

Vue.use(Vuex);

const BASE_URL = process.env.NODE_ENV === 'production'
    ? ""
    : process.env.VUE_APP_DEBUG_SERVER;

export default new Vuex.Store({
    state: {
        tasksLoaded: false,
        tasks: [],
        axiosInstance: null,
    },

    mutations: {
        appendBlankTask(state) {
            state.tasks = [...state.tasks, {title: "", id: uuidv4(), new: true}];
        },
        setupAxios(state, token) {
            state.axiosInstance = axios.create({
                headers: {"Authorization": `JWT ${token}`},
                baseURL: BASE_URL,
            });
        },
        setTasks(state, tasks) {
            state.tasks = [...tasks, ...state.tasks];
        },
        setTasksLoaded(state) {
            state.tasksLoaded = true;
        },
        setCreatedTask(state, {oldTask, newTask}) {
            const oldTaskIndex = this.getters.getTaskIndex(oldTask.id);

            state.tasks = [
                ...state.tasks.slice(0, oldTaskIndex),
                newTask,
                ...state.tasks.slice(oldTaskIndex - state.tasks.length + 1)
            ];
        },
        setTaskNotNew(state, task) {
            task.new = false;
        },
        setTaskCompleted(state, task) {
            task.completed_date = new Date();
        },
        setTaskIncomplete(state, task) {
            task.completed_date = null;
        }

    },

    actions: {
        requestToken({commit, dispatch}, env) {
            axios.post(`${BASE_URL}/login_via_env/${env}`)
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
        },
        createTask({commit, state}, task) {
            commit("setTaskNotNew", task);

            state.axiosInstance.post(`/tasks/create`, task)
                .then(function (response) {
                    commit("setCreatedTask", {oldTask: task, newTask: response.data});
                });
        },
        updateTask({state}, task) {
            state.axiosInstance.post(`/tasks/${task.id}/update`, {title: task.title});
        },
        completeTask({commit, state}, task) {
            commit("setTaskCompleted", task);
            state.axiosInstance.post(`/tasks/${task.id}/update`, {completed_date: task.completed_date});
        },
        resetTask({commit, state}, task) {
            commit("setTaskIncomplete", task);
            state.axiosInstance.post(`/tasks/${task.id}/update`, {completed_date: task.completed_date});
        }

    },

    getters: {
        lastTask: state => {
            return state.tasks[state.tasks.length - 1];
        },
        authorized: state => {
            return state.axiosInstance !== null
        },
        getTaskById: state => id => {
            return state.tasks.find(task => task.id === id);
        },
        getTaskIndex: state => id => {
            return state.tasks.findIndex(task => task.id === id);
        }
    }
});
