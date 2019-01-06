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

Vue.component("task-list", {
    template: `<div>
       <ul class="task-list" v-if="tasksLoaded">
            <task-item v-for="task in tasks" v-bind.sync="task"></task-item>
        </ul>
        <div v-else class="loading-label">Ща все будет...</div>
    </div>`,
    computed: {
        tasksLoaded() {
            return this.$store.state.tasksLoaded;
        },
        tasks() {
            return this.$store.state.tasks;
        }
    },
    mounted: function () {
        this.$store.dispatch("refreshTasks");
    }
});


Vue.component("auth-required", {
    template: `<div>
            <div v-if="authorized">
                <slot></slot>
            </div>
    
            <div v-else>
                <input id="enterAuth" type="password" placeholder="Enter auth env" @keydown.enter="requestToken">
            </div>
        </div>`,
    methods: {
        requestToken: function (event) {
            this.$store.dispatch("requestToken", event.target.value);
        },
    },
    computed: {
        authorized() {
            return this.$store.getters.authorized;
        },
    },
    mounted: function () {
        if (localStorage.token) {
            this.$store.commit("setupAxios", localStorage.token);
        }
    },

});

var app = new Vue({
    el: '#app',
    store,
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
