// donutChart
(function () {
    var chart = bb.generate({
        // size: {
        //     height: 300,
        //     width: 280,
        // },
        // padding: {
        //     //top:40,
        //     //right:100,
        //     //bottom:40,
        //     //left:100,
        // },
        data: {
            columns: [
                ["커뮤니케이션", 5],
                ["위치/이동", 10],
                ["정보", 15],
                ["유틸리티", 20],
                ["쇼핑", 50],
            ],
            type: "donut",
            colors: {
                "커뮤니케이션": "#ffda0f",
                "위치/이동": "#f6695c",
                "정보": "#18c5a3",
                "유틸리티": "#863fc5",
                "쇼핑": "#3b98e6"
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend",
                template: "<a><span style='background-color: {=COLOR};'></span>{=TITLE}</a>"
            },
        },
        donut: {
            title: "",

            // label:{
            //     ratio: 1.5
            // }
        },
        bindto: "#donutChart"
    });
})();


// lineChart
(function () {
    var tooltipTarget;
    var chart = bb.generate({
        data: {
            // x: "x",
            columns: [
                // ["x", "5일", "10일", "15일", "20일", "25일", "30일"],
                ["data1", 1.2, 2.8, 3.44, 4.7, 5.3, 6.777],
            ],
            colors: {
                data1: "#3b98e6"
            },
            onmax: function (data) {
                data.forEach(function (v) {
                    tooltipTarget = v.index;
                    //console.log(v);
                    d3.select(".bb-shapes-" + v.id + " .bb-shape-" + v.index)
                        .style({
                            "fill": "#f6695c",
                            "r": "7",
                            "stroke": "#f6695c"
                        });
                });
            },
        },
        tooltip: {
            format: {
                title: function () {
                    return '';
                },
                name: function (name, ratio, id, index) {
                    return '';
                },
                value: function (value, ratio, id, index) {
                    //console.log('value :' +  value, ratio, id, index);
                    return (value + ' GB');
                },
            }
        },
        color: {
            onover: {
                data1: "#f6695c",

            }
        },
        grid: {
            x: {
                show: false
            },
            y: {
                show: true
            }
        },
        axis: {
            x: {
                type: "category",
                categories: [
                    "5일",
                    "10일",
                    "15일",
                    "20일",
                    "25일",
                    "30일",
                ],
                tick: {
                    outer: false,
                    show: false,
                }
            },
            y: {
                max: 7,
                min: 0,
                tick: {
                    values: [0, 1.4, 2.8, 4.2, 5.6, 7],
                    outer: false,
                    show: false,
                    count: 6,
                    // fit: true,
                    format: function (x) {
                        // x is the datetime data
                        return x + "GB";
                    },
                }
            }
        },
        legend: {
            show: false,
            usepoint: true,
        },
        point: {
            r: 4,
            // pattern: [
            //     "<g><circle cx='6' cy='6' r='6'></circle><circle cx='4' cy='4' r='3' style='fill:#fff'></circle></g>"
            // ]
        },
        //clipPath: false,
        bindto: "#lineChart"
    });

    chart.tooltip.show({
        index: tooltipTarget,
        mouse: [0, 50]
    });
})();


// barChart
(function () {
    var tooltipTarget;
    var chart = bb.generate({
        data: {
            x: "x",
            columns: [
                ["x", "스몰", "레귤러", "미디엄", "패밀리", "Data\n인피니티"],
                ["rowData", 30.541, 25.324, 18.717, 77.343, 36.51554],
            ],
            type: "bar",
            onmax: function (data) {
                data.forEach(function (v) {
                    tooltipTarget = v.index;
                    d3.select(".bb-shapes-" + v.id + " .bb-shape-" + v.index)
                        .style("fill", "#f6695c")
                });
            },
            colors: {
                rowData: "#c4e0f8",
            }
        },
        tooltip: {
            format: {
                title: function () {
                    return '';
                },
                name: function (name, ratio, id, index) {
                    return '';
                },
                value: function (value, ratio, id, index) {
                    return (value + ' %');
                },

            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        legend: {
            show: false
        },
        axis: {
            x: {
                type: "category",
                height: 45,
                tick: {
                    outer: false,
                    show: false,
                    multiline: true,
                    // text: {
                    //     show: true
                    // }
                }
            },
            y: {
                max: 100,
                min: 0,
                tick: {
                    values: [0, 20, 40, 60, 80, 100],
                    outer: false,
                    show: false,
                    fit: true,
                    count: 6,
                    format: function (x) {
                        // x is the datetime data
                        return x + "%";
                    },
                }
            },
        },
        grid: {
            x: {
                show: false
            },
            y: {
                show: true
            }
        },
        bindto: "#barChart"
    });
    chart.tooltip.show({
        index: tooltipTarget,
        mouse: [0, 100]
    });
})();


//barChart2
(function () {
    var chart = bb.generate({
        data: {
            x: "x",
            columns: [
                ["x", "5일", "10일", "15일", "20일", "25일", "30일"],
                ["현재요금제", 0, 1.22, 3.24, 2.11, 6.888, 3.888],
                ["패밀리", 1.22, 3.22, 4.321, 2.33, 5.22, 3.27],
            ],
            type: "bar",
            colors: {
                현재요금제: "#3b98e6",
                패밀리: "#f6695c"
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        legend: {
            contents: {
                bindto: ".bar-chart-2__legend",
                template: "<a><span style='background-color: {=COLOR};'></span>{=TITLE}</a>"
            },
        },
        tooltip: {
            format: {
                title: function () {
                    return '';
                },
            }
        },
        axis: {
            x: {
                type: "category",
                tick: {
                    show: false
                }
            },
            y: {
                max: 7,
                min: 0,
                tick: {
                    values: [0, 1.4, 2.8, 4.2, 5.6, 7],
                    show: false,
                    count: 6,
                    format: function (x) {
                        // x is the datetime data
                        return x + " GB";
                    },
                },
                type: "category"
            }

        },
        grid: {
            x: {
                show: false
            },
            y: {
                show: true
            }
        },
        bindto: "#barChart2"
    });
})();


// accodiion
$(".user-patten-area .pattern-con__tit").on('click', function (e) {
    $(this).parent('.pattern-con').toggleClass('active');
});