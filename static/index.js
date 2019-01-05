const store = new Vuex.Store({
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
                    dispatch("refreshTasks");
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

Vue.component(
    "task-item", {

        props: ["title", "id"],

        template: `<li>
            <div class="task-li">
                <span>–</span>
                <textarea class="task" 
                    :value="title"
                    @input="$emit('update:title', $event.target.value)"
                    
                    @change="taskChanged" 
                    @keydown.enter.prevent="taskChanged" 
                    @keydown="fit" 
                    
                    v-focus
                    ></textarea>
            </div>
        </li>`,

        methods: {
            taskChanged: function (event) {
                if (this.$store.getters.lastTask.title !== "") {
                    this.$store.commit("appendBlankTask");
                }
                fitTextArea(event.target);
            },
            fit: function (event) {
                fitTextArea(event.target);
            },

        }
    }
);


var app = new Vue({
    el: '#app',
    store,
    methods: {
        requestToken: function (event) {
            store.dispatch("requestToken", event.target.value);
        },
    },
    computed: {
        authorized() {
            return store.getters.authorized;
        },
        tasksLoaded() {
            return store.state.tasksLoaded;
        },
        tasks() {
            return store.state.tasks;
        }
    },
    mounted: function () {
        if (localStorage.token) {
            store.commit("setupAxios", localStorage.token);
            store.dispatch("refreshTasks");
        }
    },
});

Vue.directive(
    "focus", {
        inserted: function (el) {
            fitTextArea(el);
            el.focus();
        }
    }
);

function fitTextArea(textArea) {
    textArea.style.height = "1px";
    textArea.style.height = (textArea.scrollHeight - 4) + "px";
}
