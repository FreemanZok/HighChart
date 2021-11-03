<template>
  <div class="highchart">
    <div>
      <div>
        <highcharts
          :constructorType="'ganttChart'"
          class="hc"
          :options="chartOptions"
          ref="chart"
        ></highcharts>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

const JDate = require("jalali-date");

export default {
  name: "HighChart",
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chart_data: [],
      all_tasks: [],
      chartOptions: {
        title: {
          text: "چارت سازمانی تست",
        },
        tooltip: {
          backgroundColor: "#cfededc7",
          borderColor: "#bcbcbc54",
          textColor: "white",
          borderRadius: 10,
          borderWidth: 3,
        },
        xAxis: {
          // min: Date.UTC(2021, 10, 17),
          // max: Date.UTC(2021, 11, 15),
          type: "datetime",
          labels: {
            formatter: function () {
              var someDate = new Date(this.value);
              return someDate.toLocaleDateString("fa-IR");
            },
          },
        },
        series: [
          {
            name: "پروژه یک",
            data: [
              // {
              //   name: "تسک نفر اول",
              //   start: Date.UTC(2021, 10, 27),
              //   end: Date.UTC(2021, 10, 29),
              //   completed: {
              //     amount: 0.1,
              //     fill: "#fab",
              //   },
              // },
            ],
          },
        ],
      },
    };
  },
  methods: {
    get_data() {
      var this_is = this;
      var axios = require("axios");

      var config = {
        method: "post",
        url: "http://itsm-api.u4u.xyz/api/v1/OperatingProgram/GetChart?id=1",
        headers: {
          Authorization:
            "Bearer 4b6a33352b7a7453583359504758686c57797433714462677a45686e4e786766466146425a6533715576673d",
        },
      };

      axios(config)
        .then(function (response) {
          this_is.all_tasks = response.data.data.programTasks;
          this_is.all_tasks.forEach((task) => {
            let start = task.start;
            let end = task.end;

            var y = Number(start.substr(0, 4));
            var m = Number(start.substr(5, 2));
            var d = Number(start.substr(8, 2));
            var some_variable = this_is.convert(JDate.toGregorian(y, m, d));
            y = Number(some_variable.substr(0, 4));
            m = Number(some_variable.substr(5, 2));
            d = Number(some_variable.substr(8, 2));
            start = Date.UTC(y, m, d);

            y = Number(end.substr(0, 4));
            m = Number(end.substr(5, 2));
            d = Number(end.substr(8, 2));
            some_variable = this_is.convert(JDate.toGregorian(y, m, d));
            y = Number(some_variable.substr(0, 4));
            m = Number(some_variable.substr(5, 2));
            d = Number(some_variable.substr(8, 2));
            end = Date.UTC(y, m, d);

            this_is.chart_data.push({
              name: task.name,
              start: start,
              end: end,
              completed : task.completed,
            });
          });
          console.log(this_is.all_tasks);

          console.log("this_is.chart_data");
          console.log(this_is.chart_data);
          this_is.chartOptions.series[0].data = this_is.chart_data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    convert: function (hi) {
      var date = new Date(hi),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join(",");
    },
  },
  mounted() {
    this.get_data();
  },
};

const jdate2 = new JDate(new Date(2020, 1, 3));
const jdate4 = new JDate(new Date(2014, 1, 3));

console.log(jdate2);
console.log(jdate2.toGregorian);
console.log(jdate4.format("dddd DD MMMM YYYY"));
console.log(jdate4.format("dddd DD MMMM"));
console.log(jdate4.format("dddd DD"));
console.log(" fuck it");

</script>

<style >
</style>
