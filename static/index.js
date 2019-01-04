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
        taskChanged: function (event) {
            this.appendBlank();
            fixTextArea(event.target);
        },
        appendBlank: function () {
            if (this.lastTask.title != "") {
                this.tasks = [...this.tasks, { title: "" }];
            }
        },
        fit: function (event) {
            fixTextArea(event.target);
        }
    },
    computed: {
        lastTask: function () {
            return this.tasks[this.tasks.length - 1];
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
};
