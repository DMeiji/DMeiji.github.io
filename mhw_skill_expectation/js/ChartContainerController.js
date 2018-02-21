(function ($) {
    'use strict';

    var CH_RATE = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];

    /**
	 * チャートコンテナコントローラ
	 */
    var chartContainerController = {

        __name: 'MhwSkillExpectation.controller.ChartContainerController',

        _chartBaseData: null,

        init: function (chartBaseData) {
            this._chartBaseData = chartBaseData;

            var $skillChart = this.$find('#skillChart');
            var ctx = $skillChart.get(0).getContext('2d');
            var config = {
                type: 'line',
                data: {
                    labels: CH_RATE,
                    datasets: []
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'スキルとdmg期待値'
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '会心率［%］'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '期待値'
                            }
                        }]
                    }
                }
            }
            this._chart = new Chart(ctx, config);
        },

        _pickSelectedChartData: function (selectedSkills) {
            return $.map(selectedSkills, this.own(function (selectedSkill) {
                return this._chartBaseData[selectedSkill];
            }));
        },

        updateChart: function (selectedSkills) {
            var chartData = this._pickSelectedChartData(selectedSkills);
            this._chart.config.data.datasets = chartData;
            this._chart.update();
        }
    };
    h5.core.expose(chartContainerController);
})(jQuery);