// donutChart : tds 소스 참고
(function () {
    // 연령대별 차트 삭제 : 필요 시 추가 가능

    var townchart = bb.generate({
        size: {
            height: 200,
            width: 200,
        },
        data: {
            labels: true,
            columns: [
                ["광랜 인터넷", 68],
                ["기가 인터넷", 30],
                // ["기타", 2],
            ],
            type: "pie",
            colors: {
                "광랜 인터넷": "#3617ce",
                "기가 인터넷": "#f54967",
                // "기타": "#d3d5f4",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend_town1",
                //[D] 수정 디자인 반영
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

    // [D] 컬러코드 값 100% 때 예시 입니다. 2023.09.01  
    var chartFullshot = bb.generate({
        size: {
            height: 200,
            width: 200,
        },
        data: {
            labels: true,
            columns: [
                ["광랜 인터넷", 100],
            ],
            type: "pie",
            colors: {
                "광랜 인터넷": "#3617ce",
            },
        },
        legend: {
            contents: {
                bindto: ".donut-chart__legend_fullshot",
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
        bindto: "#chartFullshot"
    });
})();