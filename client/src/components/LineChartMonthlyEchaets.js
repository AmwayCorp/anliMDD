import React, { Component, Fragment } from 'react'
// import { observer, inject } from 'mobx-react'
// import { observable } from 'mobx'
import tuliLine from "../styles/assets/tuliLine.jpg"
import tulibackground from "../styles/assets/tulibackground.png"
import tuliforecast from "../styles/assets/tuliforecast.png"
import echarts from 'echarts';

// 引入图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// @inject('authStore', 'chartStore') 
// @observer
export default class LineChartMonthlyEchaets extends Component {
    // @observable isPerfYear = true
    constructor() {
        super();
        this.state = {
            thisYearLength: 0,
            allData: [],
            dataShowForClick: true,
            monthShow: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            thisYear: [],
            lastYear: [],
            forecastYear: [],
            nowColor: false,
            yearShow: '2020',
            lastYearShow: '2019',
            nameFroecast: "2020 Target",
        }
    }
    render() {
        return (
            <Fragment>
                <div className="salesButt" onClick={this.handleClickChangeColor.bind(this)}>
                    <span className="salesButt-ytd">Monthly</span>
                    <span className="salesButt-Monthly">YTD</span>
                </div>
                <div style={{display:"flex"}}>
                <div id="LineChartMonthlyEchaetsMain" style={{ width: "100%", height:"300px", background: "#ffffff", }}></div>
                </div>
                {/* <div className='custom-control custom-switch perf-switch-wrap lineChartMonthlyButt' style={{position:"absolute",left:"75px"}}>
                    <label className='perf-lbl' htmlFor='lineChartMonthlyEchaets'>
                        PF
                    </label>
                    <input
                        type='checkbox'
                        className='custom-control-input'
                        id='lineChartMonthlyEchaets'
                        checked={this.isPerfYear}
                        onChange={this.handleSwitchChange()}
                    />
                    <label className='custom-control-label' htmlFor='lineChartMonthlyEchaets'>
                        CY
                    </label>
                </div> */}
            </Fragment>
        )
    }
    //PF和CY数据的切换
    handleSwitchChange = nr => () => {
        this.isPerfYear = !this.isPerfYear
        this.props.chartStore.isPerfYear = !this.props.chartStore.isPerfYear

        var { monthShow } = this.state
        if (!this.isPerfYear) {
            monthShow = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShow = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        setTimeout(() => {
            this.setState({
                monthShow,
            }, () => {
                this.dataUpdate()
            })
        }, 500);

    }
    componentWillReceiveProps(nextProps) {
        var { data, datas } = nextProps
        var isPerfYear = data.isPerfYear
        var { monthShow, allData, dataShowForClick, thisYearLength } = this.state
        if (dataShowForClick) {
            allData = data
        } else {
            allData = datas
        }
        if (isPerfYear) {
            monthShow = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShow = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        thisYearLength = data.actual_sales_data.length || 12
        this.setState({
            monthShow, allData, thisYearLength
        }, () => {
            this.dataUpdate()
        })
    }
    componentDidMount() {
        var allData = this.props.data;
        var thisYearLength = allData.actual_sales_data.length || 12
        // revenue_forecast_usd_data: Array(2)
        // 0: {x: "Nov", y: 194158289.726068, labelTooltip: "Monthly Sales"}
        // 1: {x: "Dec", y: 205400000, labelTooltip: "Sales Forecast"}
        this.setState({
            allData, thisYearLength
        }, () => {
            this.dataUpdate()
        })
    }
    dataUpdate() {
        var { allData, dataShowForClick, thisYearLength } = this.state
        // var allData = this.props.data;
        var thisYear = [];
        var lastYear = [];
        var forecastYear = [];
        var tooltipData = allData.tooltip_data_map
        if (allData && allData.actual_sales_data.length > 0) {
            allData.actual_sales_data.map((item, index) => {
                thisYear.push(item.y)
            })
        }
        if (allData && allData.actual_sales_ly_data.length > 0) {
            allData.actual_sales_ly_data.map((item, index) => {
                lastYear.push(item.y)
            })
        }
        // if (dataShowForClick) {
        if (allData && allData.revenue_forecast_usd_data.length > 0) {
            allData.revenue_forecast_usd_data.map((item, index) => {
                forecastYear.push(item.y)
            })
        }
        for (var i = 0; forecastYear.length < 12; i++) {
            forecastYear.unshift("")
        }
        // }
        var yearShow = new Date().getFullYear() //今年
        var lastYearShow = (yearShow - 1).toString()   //去年
        yearShow = yearShow.toString()//转换成字符串可以显示在图例里，数字不可以
        var nameFroecast = yearShow + ' Target'
        thisYear.length = thisYearLength
        this.setState({
            thisYear, lastYear, forecastYear, tooltipData, yearShow, lastYearShow, nameFroecast
        }, () => {
            this.handleEcharts();
        })
    }
    handleClickChangeColor(e) {
        var { nowColor, allData, dataShowForClick } = this.state
        if (nowColor !== e.target && nowColor) {
            if (dataShowForClick) {
                dataShowForClick = false
                allData = this.props.datas
            } else {
                dataShowForClick = true
                allData = this.props.data
            }
        } else if (!nowColor) {
            dataShowForClick = false
            allData = this.props.datas
        }
        if (nowColor) {
            nowColor.style.background = "#f7f8fa";
            nowColor.style.color = "#333"
        } else {
            if (e.target.innerHTML === "YTD") {
                e.target.previousSibling.style.background = "#f7f8fa";
                e.target.previousSibling.style.color = "#333";
            }
        }
        nowColor = e.target
        nowColor.style.background = "#5198ee";
        nowColor.style.color = "#ffffff"
        this.setState({
            nowColor, allData, dataShowForClick
        }, () => {
            this.dataUpdate()
        })
    }
    handleEcharts() {
        //页面自适应
        var myChartEchartsWidth = document.getElementById('LineChartMonthlyEchaetsMain')
        myChartEchartsWidth.style.width = (window.innerWidth * 0.46) + "px"
        var myChart = echarts.init(document.getElementById('LineChartMonthlyEchaetsMain'));
        window.addEventListener('resize', function () {
            myChart.resize()
        });
        myChart.setOption({
            title: [
                {
                    text: 'Sales($)',
                    x: '0',
                    y: '0',
                    textStyle: {                  //标题样式
                        fontSize: '16',
                        color: '#333333',
                        fontWeight:"500",
                    },
                }
            ],
            tooltip: {//鼠标移入
                trigger: 'axis',
                confine: true,
                //                 tooltip_data_map:
                // Jan:
                // monthName: "2019 January"
                // actual_sales: "$277m"
                // actual_sales_ly: "$235m"
                // sales_forecast: null
                // events: (3) ["Olive Oil Launch", "Nutrilite XS Jan Promotion", "Olive Oil Experience"]
                formatter: (data) => {
                    var { tooltipData } = this.state
                    var yearThisData = 0;
                    var yearLastData = 0;
                    var forecastData = 0;
                    var nameShow = "";
                    var toolShow = "";
                    var monthUp = "";
                    var thisNow = "";
                    var thisForecast = "";
                    var yearUp = new Date().getFullYear()
                    data.map((item, index) => {
                        if (item.componentIndex && item.componentIndex == 1) {
                            yearThisData = Math.round((item.data || 0) / 1000000) || 0
                        } else if (item.componentIndex && item.componentIndex == 2) {
                            yearLastData = Math.round((item.data || 0) / 1000000) || 0
                        } else {
                            forecastData = Math.round((item.data || 0) / 1000000) || 0
                        }
                        nameShow = item.name
                        monthUp = item.axisValue
                    })
                    if (yearThisData) {
                        yearThisData = yearThisData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        var thisNow = this.state.yearShow + " Actual:" + yearThisData + "m";
                        // var thisNow = "Monthly Sales This Year:" + yearThisData;
                    }
                    if (forecastData) {
                        forecastData = forecastData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        var thisForecast = this.state.nameFroecast + ":" + forecastData + "m";
                    }
                    if (yearLastData) {
                        yearLastData = yearLastData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                    }
                    if (tooltipData && tooltipData[nameShow] && tooltipData[nameShow].events) {
                        tooltipData[nameShow].events.sort()
                        tooltipData[nameShow].events.map((item, index) => {
                            toolShow += "<div style='display:flex;justify-content: space-between;font-size:12px;line-height:14px'><span style='color:#f2df3f'>" + "★" + "</span>" + item + "</div>"
                        })
                    }
                    return "<div style='border-bottom:1px solid #ffffff'>" + monthUp + "</div>" + "<div style='color:#ff9c46'>" + thisForecast + "</div>" + "<div style='color:#5198ee'>" + thisNow + "</div>" + "<div style='border-bottom:1px solid #ffffff;color:rgba(211,212,214)'>" + this.state.lastYearShow + " Actual:" + yearLastData + "m" + "</div>" + toolShow
                    // return "<div style='border-bottom:1px solid #ffffff'>" + yearUp + "  " + monthUp + "</div>" + "<div style='border-bottom:1px solid #ffffff'>" + thisNow + "m" + "<br/>" + "Monthly Sales Last Year:" + yearLastData + "m" + "</div>" + toolShow
                }
            },
            grid: {
                top: '18%',
                left: '2%',
                right: '5%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.monthShow,
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: false,
                },
                boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    formatter: function (params) {
                        return params.split(' ')[0]
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#333"
                        },
                        formatter: function (params) {
                            return params / 1000000 + "m"
                        }
                    },
                    axisLine: {//隐藏X轴
                        show: false
                    },
                    axisTick: {
                        show: false //隐藏X轴刻度
                    },
                    splitLine: {//Y轴的样式虚线
                        lineStyle: {
                            type: 'dashed',
                            color: '#e5e9ee'
                        }
                    }
                }
            ],
            series: [
                {
                    name: this.state.nameFroecast,
                    type: 'line',
                    symbolSize: 5,   //拐点圆的大小
                    // color:['#fd0022'],  //折线条的颜色
                    data: this.state.forecastYear,
                    // symbol: "none", //去掉折线点
                    smooth: false,   //关键点，为true是不支持虚线的，实线就用true
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 3,
                                type: 'dotted',  //'dotted'虚线 'solid'实线
                                color: "#ff9c46"
                            },
                        }
                    },
                    label: {
                        show: true,
                        // position: 'top',
                        position: ['0', '-20'],
                        formatter: (params) => {
                            if (params.dataIndex < this.state.thisYearLength) {
                                return `\{bg1|${""}\}`
                            }
                            // return 
                            return `\{bg0|${(Math.round((params.data || 0) / 1000000)).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') + 'm'}\}`
                        },
                        // backgroundColor: '#ff9c46',
                        // borderRadius: 5,
                        // padding: 4,
                        rich: {
                            bg0: {
                                fontSize: 8,
                                color: '#ffffff',
                                padding: 4,
                                borderRadius: 5,
                                backgroundColor: '#ff9c46'
                            },
                            bg1: {
                                color: '#ffffff',
                                padding: 0,
                                borderRadius: 0,
                                backgroundColor: '#ffffff'
                            },
                        },
                        // textStyle: {
                        //     fontSize: 8,
                        //     color: '#ffffff',
                        // }
                    },
                }, {
                    name: this.state.yearShow,
                    data: this.state.thisYear,
                    type: 'line',
                    smooth: true,
                    // symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    label: {
                        show: true,
                        // position: 'top',
                        position: ['0', '-20'],
                        formatter: function (params) {
                            return (Math.round((params.data || 0) / 1000000)).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') + "m"
                        },
                        backgroundColor: '#5198ee',
                        borderRadius: 5,
                        padding: 4,
                        textStyle: {
                            fontSize: 8,
                            color: '#ffffff',
                        }
                    },
                    // stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            //     // color: 'rgba(253,0,34,0.1)', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 3,
                                type: 'solid',
                                color: "#5198ee"//折现颜色
                            },
                            borderColor: '#5198ee',  // 拐点边框颜色
                        },
                        // emphasis: {
                        //     color: '#fd0022',
                        //     lineStyle: { // 系列级个性化折线样式
                        //         width: 0.5,
                        //         type: 'dotted',
                        //         color: "#fd0022" //折线的颜色
                        //     }
                        // }
                    }, //线条样式
                }, {
                    name: this.state.lastYearShow,
                    data: this.state.lastYear,
                    type: 'line',
                    smooth: true,
                    symbol: "none", //去掉折线点
                    symbolSize: 5, //折线点的大小
                    stack: 100,
                    itemStyle: {
                        normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                            color: 'rgba(211,212,214)', //背景渐变色
                            lineStyle: { // 系列级个性化折线样式
                                width: 0.5,
                                type: 'solid',
                                color: "rgba(211,212,214)"//折现颜色
                            }
                        },
                    }, //线条样式
                    areaStyle: {
                        normal: {}
                    },
                }
            ],
            //图例名
            legend: {
                // type: "scroll",
                // icon: "line",
                left: 'center',
                bottom: 'bottom',
                symbolKeepAspect: false,//是否在缩放时保持该图形的长宽比
                // data:(val)=>{
                //     console.log(val)
                // },
                data: [
                    { name: this.state.lastYearShow, icon: "image://" + tulibackground },
                    { name: this.state.yearShow, icon: "image://" + tuliLine },
                    { name: this.state.nameFroecast, icon: "image://" + tuliforecast }
                ],
                // data: [
                //     { name: '2020', icon: "image://" + tuliLine },
                //     { name: '2019', icon: "image://" + tulibackground },
                //     { name: 'Sales forecast', icon: "image://" + tuliforecast }
                // ],
                // y: '220',
                textStyle: {
                    color: "#333",
                    fontSize: 10
                },
            },
        })
    }
}
