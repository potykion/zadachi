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
    export default {
        name: "TaskItem",
        props: ["title", "id"],
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
</script>

<style scoped>

</style>
