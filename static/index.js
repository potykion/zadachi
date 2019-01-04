const app = new Vue({
    el: '#app',
    data: {
        tasksLoaded: false,
        tasks: [
            {title: ""}
        ],

        token: "",
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
                    this.app.token = localStorage.token = response.data.token;
                })
                .catch(function (error) {
                    alert(error.response.data.error);
                });
        }
    },
    computed: {
        lastTask: function () {
            return this.tasks[this.tasks.length - 1];
        },
    },
    mounted: function () {
        if (localStorage.token) {
            const token = this.token = localStorage.token;

            this.axiosInstance = axios.create({
                headers: {"Authorization": `JWT ${token}`}
            });

            this.axiosInstance.get(`/tasks`)
                .then(function (response) {
                    const app = this.app;
                    app.tasks = [...response.data, ...app.tasks];
                    app.tasksLoaded = true;
                });
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
