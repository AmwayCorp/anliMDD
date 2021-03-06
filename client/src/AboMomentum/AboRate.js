import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboRate extends Component {
    constructor() {
        super();
        this.state = {
            num_q_month_data_show:[],
            num_q_month_ly_data_show:[],
            months_data_show:[],
            maxYear:"",
            prevYear:"",
            num_consecutive_q_show:[],
            num_consecutive_q_ly_show:[],
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>Consequtive qualification rate</div>
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                <div id="aboRateEcharts" style={{ width: "100%", height: "400px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        // console.log(data)
        // num_q_month_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // num_q_month_ly_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // ytd_consecutive_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // ytd_consecutive_ly_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // months_data: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // months_data_cons: (12)[{ … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }, { … }]
        // maxYear: "PF 20"
        // prevYear: "PF 19"
        // console.log(data)
        var {num_q_month_data,num_q_month_ly_data,months_data,maxYear,prevYear,ytd_consecutive_data,ytd_consecutive_ly_data,num_consecutive_q,num_consecutive_q_ly} = data
        var num_q_month_data_show = []
        var num_q_month_ly_data_show = []
        var months_data_show = []
        var ytd_consecutive_data_show = []
        var ytd_consecutive_ly_data_show = []
        var num_consecutive_q_show = []
        var num_consecutive_q_ly_show = []
        num_q_month_data ? num_q_month_data.map((item,index)=>{
            num_q_month_data_show.push(item.y)
        }) : ""
        num_q_month_ly_data ? num_q_month_ly_data.map((item,index)=>{
            num_q_month_ly_data_show.push(-item.y)
        }) : ""
        months_data ? months_data.map((item,index)=>{
            months_data_show.push(item.x)
        }) : ""
        ytd_consecutive_data ? ytd_consecutive_data.map((item,index)=>{
            ytd_consecutive_data_show.push(Math.round(item.y * 100))
        }) : ""
        ytd_consecutive_ly_data ? ytd_consecutive_ly_data.map((item,index)=>{
            ytd_consecutive_ly_data_show.push(Math.round(item.y * 100))
        }) : ""
        num_consecutive_q ? num_consecutive_q.map((item,index)=>{
            num_consecutive_q_show.push(item.y)
        }) : ""
        num_consecutive_q_ly ? num_consecutive_q_ly.map((item,index)=>{
            num_consecutive_q_ly_show.push(-item.y)
        }) : ""
        num_q_month_data_show = num_q_month_data_show.reverse()
        num_q_month_ly_data_show = num_q_month_ly_data_show.reverse()
        months_data_show = months_data_show.reverse()
        ytd_consecutive_data_show = ytd_consecutive_data_show.reverse()
        ytd_consecutive_ly_data_show = ytd_consecutive_ly_data_show.reverse()
        num_consecutive_q_show = num_consecutive_q_show.reverse()
        num_consecutive_q_ly_show = num_consecutive_q_ly_show.reverse()
        this.setState({
            num_q_month_data_show,num_q_month_ly_data_show,months_data_show,maxYear,prevYear,ytd_consecutive_data_show,ytd_consecutive_ly_data_show,num_consecutive_q_show,num_consecutive_q_ly_show
        },()=>{
            this.aboRateEchartsHandle()
        })
    }
    aboRateEchartsHandle() {
        //页面自适应
        var aboRateEchartsWidth = document.getElementById('aboRateEcharts')
        aboRateEchartsWidth.style.width = (window.innerWidth * 0.32) + "px"

        var aboRateEcharts = echarts.init(document.getElementById('aboRateEcharts'));
        window.addEventListener('resize', function () {
            aboRateEcharts.resize()
        });
        aboRateEcharts.setOption({
            grid: {
                top: '18%',
                left: '4%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'value',
                    show:false,
                    axisTick: {
                            show: false //隐藏X轴刻度
                        },
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    axisLine: {       //y轴
                        show: false
                    },
                    axisTick: {       //y轴刻度线
                        show: false
                    },
                    splitLine: {     //网格线
                        show: false
                    },
                    data : this.state.months_data_show,
                }
            ],
            color: ['#fe9c3b', '#4f90f4'],
            series : [
                {
                    name:this.state.maxYear,
                    type:'bar',
                    stack: '总量',
                    color:"#fe9c3b",
                    label: {
                        normal: {
                            show: true,
                            position:'insideLeft',
                            formatter:(params)=>{
                                var {ytd_consecutive_data_show} = this.state
                                return ytd_consecutive_data_show[params.dataIndex] + "%"
                            },
                        }
                    },
                    data:this.state.num_consecutive_q_show,
                },
                {
                    name:this.state.maxYear,
                    type:'bar',
                    stack: '总量',
                    color:"#fe9c3b",
                    label: {
                        normal: {
                            show: true,
                            position:'insideRight',
                            formatter:(params)=>{
                                var {num_consecutive_q_show} = this.state
                                var valueParamsShow = Number(num_consecutive_q_show[params.dataIndex]).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') || ""
                                return valueParamsShow
                            },
                        }
                    },
                    data:[0,0,0,0,0,0,0,0,0,0,0,0],
                },
                {
                    name:this.state.prevYear,
                    type:'bar',
                    stack: '总量',
                    color:"#4f90f4",
                    label: {
                        normal: {
                            show: true,
                            position:'insideRight',
                            formatter:(params)=>{
                                var {ytd_consecutive_ly_data_show} = this.state
                                return ytd_consecutive_ly_data_show[params.dataIndex] + "%"
                            },
                        }
                    },
                    data:this.state.num_consecutive_q_ly_show,
                },
                {
                    name:this.state.prevYear,
                    type:'bar',
                    stack: '总量',
                    color:"#4f90f4",
                    label: {
                        normal: {
                            show: true,
                            position:'insideLeft',
                            formatter:(params)=>{
                                var {num_consecutive_q_ly_show} = this.state
                                var valueParamsShow2 = Number(-num_consecutive_q_ly_show[params.dataIndex]).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') || ""
                                return valueParamsShow2
                            },
                            // formatter: function(params){return -params.value}
                        }
                    },
                    data:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
                },
            ],
            legend: {
                type: "scroll",
                icon: "rect",
                left:"38%",
                data: [
                    { name: this.state.prevYear },
                    { name: this.state.maxYear },
                ],
                itemWidth: 10,
                itemHeight: 10,
                bottom: 16,
                itemGap: 38,
                // itemGap: 50,
                textStyle: {
                    color: "#333",
                    fontSize: 14
                },
            },
        })
    }
}