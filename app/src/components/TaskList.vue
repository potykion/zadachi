<template>
    <div>
        <ul class="task-list" v-if="tasksLoaded">
            <TaskItem v-for="task in tasks" v-bind.sync="task"></TaskItem>
        </ul>
        <div v-else class="loading-label">Ща все будет...</div>
    </div>
</template>

<script>
    import TaskItem from "./TaskItem";

    export default {
        name: "TaskList",
        components: {
            TaskItem
        },
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
    }
</script>

<style scoped>
    .loading-label {
        text-align: center;
        padding: 10px;
    }

    .task-list {
        padding: 0;
        list-style-type: none;
    }
</style>

