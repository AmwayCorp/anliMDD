import React, { Component, Fragment } from 'react'
import echarts from 'echarts';
import * as hlp from './Helper'
// 引入图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class MapYidCity extends Component {
    constructor() {
        super();
        this.state = {
            cityClusterAllTable: [],
            maxMonthStr: "",
            sortFalg: true,
            sortFalg2: true,
        }
    }
    render() {
        var { maxMonthStr } = this.state
        return (
            <Fragment>
                <div id="tableShowHidden">
                    {/* <div className="mapTitle">YIL sales by city cluster</div> */}
                    <div className="mapTitleTwo">As of {maxMonthStr}</div>
                    <div style={{ display: "flex" }}>
                        <div id="cityMap" className="centerItemTable"></div>
                    </div>
                    <div className="mapSortData" onClick={this.mapSortDataHandler.bind(this)}></div>
                    <div className="changeButt">
                        <div>YTD sales</div>
                        <div style={{ marginLeft: '13%' }}>% of total</div>
                        <div>vs SPLY</div>
                    </div>
                    <div className="mapSortData2" onClick={this.mapSortDataHandler2.bind(this)}></div>
                </div>
                <div className="hiddenButton" onClick={this.handleHiddenShow.bind(this)}></div>
            </Fragment>
        )
    }

    mapSortDataHandler2() {
        var { cityClusterAllTable, sortFalg2 } = this.state
        sortFalg2 ? cityClusterAllTable.sort((a, b) => {
            var thisA = a.sales_vs_sply.replace(/%/g, '')
            var thisB = b.sales_vs_sply.replace(/%/g, '')
            return thisA - thisB;
        }) : cityClusterAllTable.sort((a, b) => {
            var thisA = a.sales_vs_sply.replace(/%/g, '')
            var thisB = b.sales_vs_sply.replace(/%/g, '')
            return thisB - thisA;
        })
        sortFalg2 = !sortFalg2
        this.setState({
            cityClusterAllTable, sortFalg2
        }, () => {
            this.echartsCityData(); //执行echarts地图展示
        })
    }
    mapSortDataHandler() {
        var { cityClusterAllTable, sortFalg } = this.state
        sortFalg ? cityClusterAllTable.sort((a, b) => {
            return a.actual_sales_sum - b.actual_sales_sum;
        }) : cityClusterAllTable.sort((a, b) => {
            return b.actual_sales_sum - a.actual_sales_sum;
        })
        sortFalg = !sortFalg
        this.setState({
            cityClusterAllTable, sortFalg
        }, () => {
            this.echartsCityData(); //执行echarts地图展示
        })
    }

    // componentWillReceiveProps(nextProps){
    //     // console.log(nextProps)
    //     var {data} = nextProps
    //     console.log(nextProps)
    //     var isPerfYear = data.isPerfYear
    //     this.echartsCityData(); //执行echarts地图展示
    // }

    handleHiddenShow(e) {
        var tableShowHidden = document.getElementById("tableShowHidden")
        if (tableShowHidden.style.opacity == "0") {
            return tableShowHidden.style.opacity = "1";
        }
        tableShowHidden.style.opacity = "0"
        this.echartsCityData(); //执行echarts地图展示

        // var tableShowHidden = document.getElementById("tableShowHidden")
        // var mapEchartsWidth = document.getElementsByClassName("echartsMapCityCss")[0];
        // var mapOpacityEchartsWidth = document.getElementsByClassName("echartsMapCityCssOpacity")[0];
        // if(mapEchartsWidth.style.opacity == "1"){
        //     mapEchartsWidth.style.opacity = "0";
        //     mapOpacityEchartsWidth.style.opacity = "1";
        // }else{
        //     mapEchartsWidth.style.opacity = "1";
        //     mapOpacityEchartsWidth.style.opacity = "0";
        // }
        // if (tableShowHidden.style.opacity == "1") {
        //     // return tableShowHidden.style.opacity = "0";
        //     tableShowHidden.style.opacity = "0";
        // }else{
        //     tableShowHidden.style.opacity = "1"
        // }
        // // tableShowHidden.style.opacity = "1"
        // this.echartsCityData(); //执行echarts地图展示
    }
    componentWillReceiveProps(nextProps) {
        // var {data} = nextProps
        this.setState({
            sortFalg:true
        }, () => {
            this.dataUpdateMapYid()
        })
    }
    componentDidMount() {
        this.dataUpdateMapYid()
    }
    dataUpdateMapYid() {

        // city_cluster: "哈尔滨城市群", actual_sales_sum: 4407761.54344828, perc_of_actual_sales: "2 %", sales_vs_sply: "-14.9 %", maxYear: 2020
        // cityClusterAllTable.sort((a, b) => {
        //     console.log(a.actual_sales_sum,111)
        //     // a = a[actual_sales_sum] || 0;
        //     // b = b[actual_sales_sum] || 0;
        //     return b.actual_sales_sum - a.actual_sales_sum;
        // });
        // console.log(cityClusterAllTable,111)
        var data = this.props.data || {}
        var cityClusterAllTable = data.data || []
        var maxMonthStr = String(hlp.yearMonthToStr(data.maxMonth))
        this.setState({
            cityClusterAllTable,
            maxMonthStr,
        }, () => {
            this.mapSortDataHandler()
            // this.dataUpdateMapYid(); //执行echarts地图展示
            // this.echartsCityData(); //执行echarts地图展示
        })
    }
    echartsCityData() {
        var myChartCityMapEchartsWidth = document.getElementById('cityMap')
        myChartCityMapEchartsWidth.style.width = (window.innerWidth * 0.32) + "px"
        var myChartCity = echarts.init(document.getElementById('cityMap'));
        window.addEventListener('resize', function () {
            myChartCity.resize()
        });
        // city_cluster: "杭州城市群"
        // actual_sales_sum: 118605668.12960227
        // perc_of_actual_sales: "5.6 %"
        // sales_vs_sply: "-4.4 %"
        // maxYear: 2019
        var dataShowBar = (data) => {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                res.push(data[i].city_cluster)
            }
            return res;
        }
        var dataShowNumber = (data) => {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var number = Math.round((data[i].actual_sales_sum || 0) / 1000000)
                res.push(number)
            }
            return res;
        }
        var garyNumberData = (data) => {
            var res = [];
            var fastNumber = Math.round((data[0].actual_sales_sum || 0) / 1000000)
            for (var i = 0; i < data.length; i++) {
                var thisData = Math.round((data[i].actual_sales_sum || 0) / 1000000)
                thisData > fastNumber ? fastNumber = thisData : null
                var number = Math.round((data[i].actual_sales_sum || 0) / 1000000)
                res.push(fastNumber - number)
            }
            return res;
        }
        var dataShowNumberTotal = (data) => {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var numberSo = data[i].perc_of_actual_sales.replace(/%/g, '')
                var number = Math.round(numberSo || 0) + "%"
                // var number = Math.round((number || 0) / 1000000)
                res.push(number)
            }
            return res;
        }
        var dataShowNumberSply = (data) => {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var numberSo = data[i].sales_vs_sply.replace(/%/g, '')
                var number = Math.round(numberSo || 0) + "%"
                // var number = Math.round((number || 0) / 1000000)
                // if (Number(number) >= 0) {
                //     number = "<span style='color:#16b6aa'>" + number + "%" + "</span>"
                // } else {
                //     number = "<span style='color:#ff0025'>" + number + "%" + "</span>"
                // }
                res.push(number)
            }
            return res;
        }
        myChartCity.setOption({
            tooltip: {
                trigger: 'axis',
                show: false,
                // formatter: (params) => {
                //     // console.log('params', params)
                //     return params[0].name + `<br/> ` + `装机容量：` + params[0].value + `万千瓦`;
                // },
                // axisPointer: {
                //     type: 'shadow'
                // }
            },
            grid: {
                left: '8%',
                right: '35%',
                bottom: '0%',
                width: '70%',
                // height: '100%',
                top: 80,
                containLabel: true
            },
            xAxis: {
                show: false,
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: [{
                type: 'category',
                data: dataShowBar(this.state.cityClusterAllTable),
                axisLabel: {
                    show: true,
                    // inside: true,
                    // 强制显示所有标签
                    interval: 0,
                    textStyle: {
                        color: "#333",
                        fontSize: 12
                    },
                    // formatter: function (value) {
                    //     var res = value;
                    //     if (res.length > 5) {
                    //         res = res.substring(0, 4) + "..";
                    //     }
                    //     return res;
                    // }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'red',
                        width: 0, //这里是为了突出显示加上的
                    }
                },
                // 隐藏x轴刻度
                axisTick: {
                    show: false
                },
                // max :38,
                // min : 0,
            }, {
                type: 'category',
                data: dataShowNumberTotal(this.state.cityClusterAllTable),
                position: 'right',
                offset: 22,
                axisLabel: {
                    show: true,
                    // inside: true,
                    // 强制显示所有标签
                    interval: 0,
                    textStyle: {
                        color: "#333",
                        fontSize: 12
                    },
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'red',
                        width: 0, //这里是为了突出显示加上的
                    }
                },
                // 隐藏x轴刻度
                axisTick: {
                    show: false
                },
            }, {
                type: 'category',
                data: dataShowNumberSply(this.state.cityClusterAllTable),
                position: 'right',
                offset: 95,
                nameRotate: 0.2,
                // nameLoaction: "center",
                axisLabel: {
                    show: true,
                    // inside: true,
                    // 强制显示所有标签
                    interval: 0,
                    textStyle: {
                        color: (value) => {
                            var value = value.replace(/%/g, '')
                            if (Number(value) >= 0) {
                                return "#16b6aa"
                            } else {
                                return "#ff0025"
                            }
                        },
                        fontSize: 12
                    },
                    formatter: function (value) {
                        var value = value.replace(/%/g, '')
                        if (Number(value) > -10 && Number(value) < 0) {
                            value = "  " + value + "%"
                        } else if (Number(value) == 0 && 1 / Number(value) < 0) {
                            value = " " + "-" + value + "%"
                        } else if (Number(value) == 0 && 1 / Number(value) > 0) {
                            value = " " + "+" + value + "%"
                        } else if (Number(value) > 0 && Number(value) < 10) {
                            value = " " + "+" + value + "%"
                        } else if (Number(value) >= 10) {
                            value = "+" + value + "%"
                        } else {
                            value = value + "%"
                        }
                        return value;
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'red',
                        width: 0, //这里是为了突出显示加上的
                    }
                },
                // 隐藏x轴刻度
                axisTick: {
                    show: false
                },
            }
            ],
            series: [{
                name: '',
                type: 'bar',
                // barGap: '-100%',
                // zlevel: 10,
                z: 6,
                stack: 'chart',
                data: dataShowNumber(this.state.cityClusterAllTable),
                barWidth: '80%',//宽度
                label: {
                    normal: {
                        position: 'right',
                        show: true,
                        fontSize: 12,
                        color: "#333",
                        formatter: (data) => {
                            return data.data + "m"
                        }
                    },

                },
                itemStyle: {
                    normal: {
                        color: "#ff9c47",
                        // 设置柱状图的圆角  上右下左
                        // barBorderRadius: [100, 100, 100, 100]
                    }
                },
            }, {
                type: 'bar',
                stack: 'chart',
                silent: true,
                itemStyle: {
                    normal: {
                        color: '#f3f5fa'
                    }
                },
                data: garyNumberData(this.state.cityClusterAllTable)
            }
            ]
        })
    }
}
