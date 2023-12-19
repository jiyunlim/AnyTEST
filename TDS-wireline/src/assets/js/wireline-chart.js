// donutChart : tds 소스 참고
(function () {
    var agechart = bb.generate({
        size: {
            height: 220,
            width: 220,
        },
        padding: {
            //top:40,
            //right:100,
            // bottom:20,
            //left:100,
        },
        data: {
            columns: [
                ["광랜 인터넷", 60],
                ["기가 인터넷", 30],
                ["기타", 10],
            ],
            type: "pie",
            // !--[D] 웹 접근성: 07 / 24 칼라 값 대신 백그라운드 패턴 이미지
            colors: {
                "광랜 인터넷": "url(#patternPaste_01)",
                "기가 인터넷": "url(#patternPaste_02)",
                "기타": "url(#patternPaste_03)",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend",
                // [D] 웹 접근성: 07 / 24 라벨 개별적으로 이미지 등록
                template: function (title, color) {
                    //[D] 웹접근성 08.02 스크린 리더기를 읽히게 하기 위한 수정
                    var data = this.api.data(title)[0].values.map(v => `${v.value}%`).join(' ');
                    var rtn = "";
                    switch (title) {
                        case "광랜 인터넷":
                            rtn = `<div><span style='background:url(../img/wireline/pattern_01.svg)'></span> ${title} <span class="value"> ${data}</span></div>`;
                            break;
                        case "기가 인터넷":
                            rtn = `<div><span style='background:url(../img/wireline/pattern_02.svg)'></span> ${title} <span class="value"> ${data}</span></div>`;
                            break;
                        case "기타":
                            rtn = `<div><span style='background:url(../img/wireline/pattern_03.svg)'></span> ${title} <span class="value"> ${data}</span></div>`;
                            break;
                        default:
                            rtn = `<div><span style='background-color:" + color + ";'></span> ${title} <span class="value"> ${data}</span></div>`;
                    }
                    return rtn;
                }
            },
        },
        pie: {
            title: "",
            innerRadius: 50,
            label: {
                ratio: 1
            },
            // padding: 0,
        },
        bindto: "#agechart"
    });

    var townchart = bb.generate({
        size: {
            height: 220,
            width: 220,
        },
        // padding: {
        //     //top:40,
        //     //right:100,
        //     //bottom:40,
        //     //left:100,
        // },
        data: {
            columns: [
                ["광랜 인터넷", 68],
                // ["기가 라이트", 13],
                ["기가 인터넷", 30],
                ["기타", 2],
            ],
            type: "pie",
            colors: {
                "광랜 인터넷": "#3617ce",
                // "기가 라이트": "#7575e0",
                "기가 인터넷": "#a4a6ea",
                "기타": "#d3d5f4",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend_town1",
                //[D] 수정 디자인 반영 2023.07.11 
                template(title, color) {
                    const data = this.api.data(title)[0].values.map(v => `${v.value}%`).join(' ');
                    return `<div><span style="background:${color}"></span><span class="title">${title}</span><span class="value">${data}</span></div>`;
                }
            },
        },
        pie: {
            title: "",
            innerRadius: 50,
            label: {
                ratio: 1
            }
        },
        bindto: "#townchart_1"
    });

    var townchart = bb.generate({
        size: {
            height: 220,
            width: 220,
        },
        // padding: {
        //     //top:40,
        //     //right:100,
        //     //bottom:40,
        //     //left:100,
        // },
        data: {
            columns: [
                ["광랜 인터넷", 68],
                // ["기가 라이트", 13],
                ["기가 인터넷", 30],
                ["기타", 2],
            ],
            type: "pie",
            colors: {
                "광랜 인터넷": "#3617ce",
                // "기가 라이트": "#7575e0",
                "기가 인터넷": "#a4a6ea",
                "기타": "#d3d5f4",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend_town2",
                //[D] 수정 디자인 반영 2023.07.11 
                template(title, color) {
                    const data = this.api.data(title)[0].values.map(v => `${v.value}%`).join(' ');
                    return `<a><span style="background:${color}"></span><span class="title">${title}</span><span class="value">${data}</span></a>`;
                }
            },
        },
        pie: {
            title: "",
            innerRadius: 50,
            label: {
                ratio: 1
            }
        },
        bindto: "#townchart_2"
    });
    // [D] 컬러코드 값 100% 때 예시 입니다. 2023.09.05
    var chartFullshot = bb.generate({
        size: {
            height: 220,
            width: 220,
        },
        data: {
            columns: [
                ["광랜 인터넷", 100],
            ],
            type: "pie",
            // !--[D] 칼라 값 대신 백그라운드 패턴 이미지
            colors: {
                "광랜 인터넷": "url(#patternPaste_ex)",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend_fullshot",
                // [D] 라벨 개별적으로 이미지 등록
                template: function (title, color) {
                    
                    var data = this.api.data(title)[0].values.map(v => `${v.value}%`).join(' ');
                    var rtn = "";
                    switch (title) {
                        case "광랜 인터넷":
                            rtn = `<div><span style='background:url(../img/wireline/pattern_01.svg)'></span> ${title} <span class="value"> ${data}</span></div>`;
                            break;
                        case "기가 인터넷":
                            rtn = `<div><span style='background:url(../img/wireline/pattern_02.svg)'></span> ${title} <span class="value"> ${data}</span></div>`;
                            break;
                        case "기타":
                            rtn = `<div><span style='background:url(../img/wireline/pattern_03.svg)'></span> ${title} <span class="value"> ${data}</span></div>`;
                            break;
                        default:
                            rtn = `<div><span style='background-color:" + color + ";'></span> ${title} <span class="value"> ${data}</span></div>`;
                    }
                    return rtn;
                }
            },
        },
        pie: {
            title: "",
            innerRadius: 50,
            label: {
                ratio: 1
            },
        },
        bindto: "#chartFullshot"
    });
})();