var app = new Vue({
    el: '#app',
    data: {
        tasksLoaded: false,
        tasks: [
            {title: ""}
        ],

        axiosInstance: null,
    },
    methods: {
        taskChanged: function (event) {
            this.appendBlank();
            fixTextArea(event.target);
        },
        appendBlank: function () {
            if (this.lastTask.title !== "") {
                this.tasks = [...this.tasks, {title: ""}];
            }
        },
        fit: function (event) {
            fixTextArea(event.target);
        },
        requestToken: function (event) {
            const env = event.target.value;

            axios.post(`/login_via_env/${env}`)
                .then(function (response) {
                    const app = this.app;
                    localStorage.token = response.data.token;
                    app.setupAxios(localStorage.token);
                    app.refreshTasks();
                })
                .catch(function (error) {
                    alert(error.response.data.error);
                });
        },
        setupAxios: function (token) {
            this.axiosInstance = axios.create({
                headers: {"Authorization": `JWT ${token}`}
            });
        },
        refreshTasks: function () {
            this.axiosInstance.get(`/tasks`)
                .then(function (response) {
                    const app = this.app;
                    app.tasks = [...response.data, ...app.tasks];
                    app.tasksLoaded = true;
                });
        }
    },
    computed: {
        lastTask: function () {
            return this.tasks[this.tasks.length - 1];
        },
        authorized: function () {
            return this.axiosInstance !== null;
        }
    },
    mounted: function () {
        if (localStorage.token) {
            this.setupAxios(localStorage.token);
            this.refreshTasks();
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                fixTextArea(el);
                el.focus();
            }
        }
    }
});

function fixTextArea(textArea) {
    textArea.style.height = "1px";
    textArea.style.height = (textArea.scrollHeight - 4) + "px";
}
