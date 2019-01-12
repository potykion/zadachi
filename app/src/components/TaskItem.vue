<template>
    <li>
        <div class="task-li">
            <span>–</span>

            <textarea v-if="completed_date"
                      class="task completed"
                      :value="title"
                      readonly
                      @dblclick="resetTask"
                      v-focus
            ></textarea>

            <textarea class="task" v-else
                      :value="title"
                      @input="$emit('update:title', $event.target.value)"

                      @change="taskChanged"
                      @keydown.enter.prevent="taskChanged"
                      @keydown="fit"

                      @dblclick="completeTask"

                      v-focus
            ></textarea>
        </div>
    </li>
</template>

<script>
    import {fitTextArea} from "../utils";

    export default {
        name: "TaskItem",
        props: ["title", "id", "completed_date"],
        methods: {
            taskChanged: function (event) {
                if (this.$store.getters.lastTask.title !== "") {
                    this.$store.commit("appendBlankTask");
                }

                const task = this.task;
                if (task.title !== "") {
                    if (task.new) {
                        this.$store.dispatch("createTask", task);
                    } else {
                        this.$store.dispatch("updateTask", task);
                    }
                }

                fitTextArea(event.target);
            },
            fit: function (event) {
                console.log("fit");
                fitTextArea(event.target);
            },
            completeTask: function (event) {
                this.$store.dispatch("completeTask", this.task);
            },
            resetTask: function () {
                this.$store.dispatch("resetTask", this.task);
            }
        },
        computed: {
            task: function () {
                return this.$store.getters.getTaskById(this.id);
            }
        }
    }
</script>

<style scoped>
    .task-li {
        padding: 15px;
        display: flex;
        align-items: center;

    }

    .completed {
        text-decoration: line-through;
    }

    span {
        margin: 0 5px;
    }

    textarea {
        overflow: hidden;
        resize: none;
    }
</style>
