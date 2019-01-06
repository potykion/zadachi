<template>
    <div>
        <div v-if="authorized">
            <slot></slot>
        </div>

        <div v-else>
            <input id="enterAuth" type="password" placeholder="Enter auth env" @keydown.enter="requestToken">
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuthRequired",
        methods: {
            requestToken: function (event) {
                this.$store.dispatch("requestToken", event.target.value);
            },
        },
        computed: {
            authorized() {
                return this.$store.getters.authorized;
            },
        },
        mounted: function () {
            if (localStorage.token) {
                this.$store.commit("setupAxios", localStorage.token);
            }
        },

    }
</script>

<style scoped>
    #enterAuth {
        padding: 10px;
    }
</style>


