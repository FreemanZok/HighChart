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
        xAxis: [
          {
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
        ],
        // xAxis: [
        //   {
        //     labels: {
        //       format: "{value:%w}", // day of the week
        //     },
        //     tickInterval: 1000 * 60 * 60 * 24, // Day
        //   },
        //   {
        //     labels: {
        //       format: "{value:هفته %W}",
        //     },
        //     tickInterval: 1000 * 60 * 60 * 24 * 7, // week
        //   },
        // ],
        series: [
          {
            name: "پروژه یک",
            data: [
              {
                name: "تسک نفر اول",
                start: Date.UTC(2021, 10, 5),
                end: Date.UTC(2021, 10, 29),
                completed: {
                  amount: 0.1,
                  fill: "#ccb",
                },
              },
              {
                name: "تسک نفر دوم",
                start: Date.UTC(2021, 10, 5),
                end: Date.UTC(2021, 10, 12),
                completed: {
                  amount: 0.1,
                  fill: "#fab",
                },
              },
              {
                name: "تسک نفر سوم",
                start: Date.UTC(2021, 9, 27),
                end: Date.UTC(2021, 10, 29),
                completed: {
                  amount: 0.1,
                  fill: "#fab",
                },
              },
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
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkZGNEMzN0IzRjAwNEZBNjk1ODUxRUZENjY4NDc3NEQ2IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MzYxMzA0MTUsImV4cCI6MTYzNjEzNDAxNSwiaXNzIjoiaHR0cDovL2lkNC51NHUueHl6IiwiY2xpZW50X2lkIjoiY2xpZW50IiwiY2xpZW50X09yZ2FuaXphdGlvblVuaXRJZHMiOiJbNDJdIiwiY2xpZW50X1JvbGVDb2RlcyI6IltcIjEwMDFcIl0iLCJjbGllbnRfUm9sZUlkcyI6IltcIjdmNTQyNmI5LThjYzctNGZmYy1iOGNkLWI1ZDk5YjY3MGUyOVwiXSIsImNsaWVudF9Qcm92aW5jZUlkcyI6IltcIjVcIl0iLCJzdWIiOiJlZWQ0MzA5YS0wMjI1LTQyZGEtOWVkYy04OTlhMmFhMDVhMjMiLCJhdXRoX3RpbWUiOjE2MzYxMzA0MTQsImlkcCI6ImxvY2FsIiwiaWF0IjoxNjM2MTMwNDE1LCJzY29wZSI6WyJhcGkxIiwib3BlbmlkIl0sImFtciI6WyJwd2QiXX0.UAYXUiUDU4aNfvH7YR__wu4esq4feUdZoHDQIO6yn2LP9dz6-sxxoZBGAfy4OkjWjVijMFPNEA7rElwuOdtHrFaCnxYX8c5qbjV2OCn8KZukjjJvuA8_aiGofZwICoOgy-9ixzJ4Bxc31B61X2Yz_ve7pfei-SpW-Sw1Ht_ieURjj0F1hnMB-w3LsaWK_1bVVCadUck9A3rU-KXc7zQmO4fb3WOlRmDlOtnx_xEq7LfhfVy6i7PncST0A93Wyzr84-rAEcP8gyWy34su1mDfKMxV-AqVNh2Gn3sV3yTm2-YGBnaGzkLz1fwNremDywEC18XdvHOWBrShxhMFuQ_1oA",
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
              completed: task.completed,
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
</script>

<style >
/* .highchart{
  // .highcharts-axis-labels .highcharts-xaxis-labels .highcharts-grid-axis{
  //   text{
  //     fill: greenyellow;
  //   }
  // }
} */
</style>