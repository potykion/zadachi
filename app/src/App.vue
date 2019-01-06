<template>
    <div id="app">
        <div class="container">
            <AuthRequired>
                <TaskList></TaskList>
            </AuthRequired>
        </div>
    </div>
</template>

<script>

    import AuthRequired from "./components/AuthRequired";
    import TaskList from "./components/TaskList";

    export default {
        name: "app",
        components: {
            AuthRequired,
            TaskList
        }
    };
</script>

<style>
body {
    margin: 0;
    padding: 0;
    background: #f7ebeb;
}

input, body, textarea {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    font-size: 1.2em;
}

.container {
    max-width: 900px;
    margin: auto;
    margin-top: 10px;
    background: white;
}

@media screen and (max-width: 800px) {
    .container {
        margin: 10px;
    }
}

input, textarea:focus {
    outline: none;
}

input, textarea {
    border: none;
    width: 90%;
}
</style>
