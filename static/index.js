var app = new Vue({
    el: '#app',
    data: {
        tasks: [
            { title: "Уборочка" },
            { title: "Проездной" },
            { title: "" }
        ]
    },
    methods: {
        taskChanged: async function (event) {
            this.appendBlank();
        },
        appendBlank: function () {
            if (this.lastTask.title != "") {
                this.tasks = [...this.tasks, { title: "" }];
            }
        }
    },
    computed: {
        lastTask: function () {
            return this.tasks[this.tasks.length - 1];
        }
    },
    // focus on last created input in list workaround
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
            }
        }
    }
});