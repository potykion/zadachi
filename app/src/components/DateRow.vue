<template>
    <div class="row">

        <flat-pickr class="date" v-model="currentDate">

        </flat-pickr>

<!--        <i class="fas fa-clock"></i>-->

    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    import FlatPickr from "vue-flatpickr-component";
    import 'flatpickr/dist/flatpickr.css';

    export default {
        name: "DateRow",
        props: ["date"],
        components: {FlatPickr},
        computed: {
            ...mapState(["currentDate"])
        }
    }
</script>

<style scoped>
    .row {
        padding: 10px 15px 0;

        display: flex;
        align-items: center;

        justify-content: space-between;
    }

    .date {
        width: auto;
    }

</style>