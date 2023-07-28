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
                ["광랜 인터넷", 58],
                // ["기가 라이트", 23],
                ["기가 인터넷", 33],
                ["기타", 9],
            ],
            type: "pie",
            colors: {
                //"광랜 인터넷": "#3617ce",
                "광랜 인터넷": "url(#jstest)",
                // "기가 라이트": "#7575e0",
                "기가 인터넷": "#a4a6ea",
                "기타": "#d3d5f4",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend",
                //template: "<a><span style='background-color: {=COLOR};'></span>{=TITLE}</a>"
                template: function(title, color) {
                    
                    var rtn = "";
                    switch(title) {
                        case "광랜 인터넷" :
                            rtn = "<a><span style='background:url(https://naver.github.io/billboard.js/img/logo/billboard.js.svg);'></span>"+title+"</a>";
                            break;
                        case "XXX" :
                            rtn = "<a><span style='background:url(https://naver.github.io/billboard.js/img/logo/billboard.js.svg);'></span>"+title+"</a>";
                            break;
                        default :
                            rtn = "<a><span style='background-color:"+color+";'></span>"+title+"</a>";
                    }
                    return rtn;
                    
                    /*
                    if (title=="광랜 인터넷") {
                        return "<a><span style='background:url(https://naver.github.io/billboard.js/img/logo/billboard.js.svg);'></span>"+title+"</a>"
                    } else {
                        return "<a><span style='background-color:"+color+";'></span>"+title+"</a>"
                    }
                    */
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
})();