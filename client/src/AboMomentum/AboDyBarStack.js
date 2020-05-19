import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboDyBarStack extends Component {
    constructor() {
        super();
        this.state = {
            monthShowAbo: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            newAboData: [],
            enewAboData: [],
            churnAboData: [],
            isPerfYearAbo: false,
        }
    }
    render() {
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>ABO force movement</div>
                <div style={{ width: "100%", height: "420px", display: 'flex' }}>
                    <div id="aboBarEcharts" style={{ width: "100%", height: "420px" }}></div>
                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        this.upDateShowData()
    }
    componentWillReceiveProps(nextProps) {
        var { data } = nextProps
        var { monthShowAbo, isPerfYearAbo } = this.state
        isPerfYearAbo = !isPerfYearAbo
        if (isPerfYearAbo) {
            monthShowAbo = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        } else {
            monthShowAbo = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
        this.setState({
            monthShowAbo, isPerfYearAbo
        }, () => {
            this.upDateShowData()
        })
    }
    upDateShowData() {
        var data = this.props.data || {}
        //         new_abo_data: (2) [{…}, {…}]
        // renew_abo_data: (2) [{…}, {…}]
        // churn_abo_data: (2) [{…}, {…}]
        // months_data: (2) [{…}, {…}]
        var newAboData = []
        data.new_abo_data.map((item, index) => {
            newAboData.push(item.y)
        })
        var enewAboData = []
        data.renew_abo_data.map((item, index) => {
            enewAboData.push((item.y) * 3)
        })
        var churnAboData = []
        data.churn_abo_data.map((item, index) => {
            churnAboData.push(item.y)
        })
        this.setState({
            newAboData, enewAboData, churnAboData
        }, () => {
            this.aboDyBarEcharts()
        })
    }
    aboDyBarEcharts() {
        //页面自适应
        var aboBarEchartsWidth = document.getElementById('aboBarEcharts')
        aboBarEchartsWidth.style.width = (window.innerWidth * 0.47) + "px"

        var aboBarEcharts = echarts.init(document.getElementById('aboBarEcharts'));
        window.addEventListener('resize', function () {
            aboBarEcharts.resize()
        });
        aboBarEcharts.setOption({
            grid: {
                top: '18%',
                left: '1%',
                right: '2%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: this.state.monthShowAbo,
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                    }
                },
                boundaryGap: false,//X轴刻度位置
                axisLabel: {
                    // show:false,
                    interval: 0,  //x轴文字全部显示
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    formatter: function (params) {
                        return params.split(' ')[0]
                    }
                }
            },
            yAxis: {
                show: false,
                axisLine: {       //y轴
                    show: false
                },
                axisTick: {       //y轴刻度线
                    show: false
                },
                splitLine: {     //网格线
                    show: false
                }
            },
            tooltip: {//鼠标移入
                trigger: 'axis',
                confine: true,
                formatter: (data) => {
                    var existingABOData = 0;
                    var newRecruitedABOData = 0;
                    var aboDataAddNumber = 0
                    var churnedABOData = 0;
                    var monthUp = "";
                    data.map((item, index) => {
                        if (item.componentIndex && item.componentIndex == 1) {
                            newRecruitedABOData = Math.round((item.data || 0) / 1000) || 0
                        } else if (item.componentIndex && item.componentIndex == 2) {
                            churnedABOData = Math.round((item.data || 0) / 1000) || 0
                        } else {
                            existingABOData = Math.round((item.data || 0) / 1000) || 0
                        }
                        monthUp = item.axisValue
                    })
                    if(newRecruitedABOData && existingABOData){
                        aboDataAddNumber = (Number(existingABOData) + Number(newRecruitedABOData)).toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        var thisAboDataAddNumber = 'ABO force size:' + aboDataAddNumber + "k";
                    }
                    if (newRecruitedABOData) {
                        newRecruitedABOData = newRecruitedABOData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        var thisNewRecruitedABOData = 'New recruited ABO:' + newRecruitedABOData + "k";
                    }
                    if (existingABOData) {
                        existingABOData = existingABOData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        var thisExistingABOData = 'Existing ABO:' + existingABOData + "k";
                    }
                    if (churnedABOData) {
                        churnedABOData = churnedABOData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                        var thisChurnedABOData = 'Churned ABO:' + churnedABOData + "k";
                    }
                    return "<div style='border-bottom:1px solid #ffffff;color:#333;'>" + monthUp + "</div>" + "<div style='color:#29ccaf;'>" + thisNewRecruitedABOData + "</div>" + "<div style='border-bottom:1px solid #ffffff;color:#4d96f2;'>" + thisExistingABOData + "</div>" + "<div style='border-bottom:1px solid #ffffff;color:#ffffff;'>" + thisAboDataAddNumber + "</div>" + "<div style='color:#eb5652;'>" + thisChurnedABOData + "</div>"
                }
            },
            color: ['#4d96f2', '#29ccaf', '#eb5652'],
            legend: {
                type: "plain",
                left: 'center',
                bottom: 16,
                icon: 'rect',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 30,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                data: ['# of New recruited ABO', '# of Existing ABO', '# of Churned ABO']
            },
            series: [

                {
                    name: '# of Existing ABO',
                    type: 'bar',
                    stack: 'stack',
                    data: this.state.enewAboData
                },
                {
                    name: '# of New recruited ABO',
                    type: 'bar',
                    barWidth: 18,
                    stack: 'stack',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: (val) => {
                            var value = Math.round((val.data / 1000))
                            var valueShow = value.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                            return valueShow + "k"
                        },
                        textStyle: {
                            fontSize: 12,
                            color: '#29ccaf',
                        }
                    },
                    data: this.state.newAboData
                },
                {
                    name: '# of Churned ABO',
                    type: 'bar',
                    stack: 'stack',
                    data: this.state.churnAboData
                }
            ]
        })
    }
}
