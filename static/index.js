var app = new Vue({
    el: '#app',
    data: {
        tasks: [
            { title: "Уборочка" },
            { title: "Проездной" },
            { title: "THIS IS VEEEEEEEEEEEEEEEEEEEEEEERY LONG TASK" },
            { title: "resto: orders_lite totals = auto report" },
            { title: "rbcn_legals: features discuss / complete migration" },
            { title: "rbcn_legals: migrate legals from gae" },
            { title: "rbcn_legals: frontend: legals list, contract creation" },
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