<template>
    <li>
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
    </li>
</template>

<script>
    import {fitTextArea} from "../utils";

    export default {
        name: "TaskItem",
        props: ["title", "id"],
        methods: {
            taskChanged: function (event) {
                if (this.$store.getters.lastTask.title !== "") {
                    this.$store.commit("appendBlankTask");
                }

                const task = this.$store.getters.getTaskById(this.id);
                if (task.title !== "" && task.new) {
                    this.$store.dispatch("createTask", task);
                }

                fitTextArea(event.target);
            },
            fit: function (event) {
                fitTextArea(event.target);
            },

        }
    }
</script>

<style scoped>
    .task-li {
        padding: 15px;
        display: flex;
        align-items: center
    }

    span {
        margin: 0 5px;
    }

    textarea {
        overflow: hidden;
        resize: none;
    }
</style>
