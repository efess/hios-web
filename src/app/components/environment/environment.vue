<template>
    <bar-chart></bar-chart>
</template>

<script>
import axios from 'axios';

function getData(){
    axios.post('environment/status', {
        gran: 5,//gran || this.state.granularity,
        deviceId: 'device'//'ESP_1198434'
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}
export default {
    components: {
        barChart: require('../lineChart.vue')
    }
}

</script>