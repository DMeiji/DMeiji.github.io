(function ($) {
    'use strict';

    var consts = MhwSkillBuildExpectation.consts;

    /**
	 * チャートコンテナコントローラ
	 */
    var chartContainerController = {

        __name: 'MhwSkillBuildExpectation.controller.ChartContainerController',

        // チャートに追加した系列のラベルに使用する番号。例：ビルド1、ビルド2
        // 1始まりの理由は、0は系列「編集中」が存在するため抜け版としている
        _buildNo: 1,

        init: function (chartData) {
            var $skillChart = this.$find('#skillChart');
            var ctx = $skillChart.get(0).getContext('2d');
            var config = {
                type: 'line',
                data: {
                    labels: consts.CH_RATE_ARY,
                    datasets: [{
                        label: '編集中',
                        backgroundColor: '#b72929',
                        borderColor: '#b72929',
                        data: chartData,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'スキルビルドごとのdmg期待値'
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

        /**
         * チャートのLineを更新
         * 
         * @param chartData
         * @param dataIdx 更新するLineのdatasetsでのindex
         */
        updateChartLine: function (chartData, dataIdx) {
            this._chart.config.data.datasets[dataIdx].data = chartData;
            this._chart.update();
        },

        /**
         * チャートにLineを追加
         * <p>
         * Lineのラベルは当該コントローラ内で生成しているため、返り値として親コントローラに渡す
         */
        appendChartLine: function (chartData) {
            var color = this._randomColor();
            var buildName = 'ビルド' + this._buildNo;
            var dataset = {
                label: buildName,
                backgroundColor: color,
                borderColor: color,
                data: chartData,
                fill: false
            };
            this._chart.config.data.datasets.push(dataset);
            this._chart.update();
            this._buildNo++;
            return buildName;
        },

        /**
         * 指定したindexのLineを削除
         */
        removeChartLine: function (dataIdx) {
            this._chart.config.data.datasets.splice(dataIdx, 1);// 指定したデータを削除
            this._chart.update();
        },

        _randomColor: function () {
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += Math.floor(16 * Math.random()).toString(16);
            }
            return color;
        }
    };
    h5.core.expose(chartContainerController);
})(jQuery);