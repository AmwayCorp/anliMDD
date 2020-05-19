import React, { Component, Fragment } from 'react'
import handPic from "../styles/assets/fiveHand.png"
import handPics from "../styles/assets/fiveHands.png"
import tuliLine from "../styles/assets/tuliLine.jpg"
import tulibackground from "../styles/assets/tulibackground.png"
import echarts from 'echarts';
import * as hlp from '../components/Helper'

export default class PicFourChange extends Component {
    constructor() {
        super();
        this.state = {
            allEvents: "Net Sales",//下面的可以变化的标题
            allEventsArr: ["Net Sales", "Order BV Sales", "Recruitment", "Buyer Counts"],
            idxIndexShow: 0,

            data: {},
            data2: {},
            data3: [],
            netData: {},
            bvData: {},
            recruitmentDate: {},
            buyerCountsDate: {},
            changeName: [],//切换数据的名字
            elmUpDateBlue: "",//被点击的蓝色的标志

            data3XShow: [],
            data3ThisYear: [],
            data3LastYear: [],
            data3PrevYear: "",
            data3MaxYear: "",
            data3MaxMonth: "",
            pieThreeDataArr: [],//玫瑰图原数据
            pieThreeDataArrAll: [],//饼图的全部数据
            pieThreeLegend: [],//饼图的图例
            pieThreeDataFourNew: {},//第四个的新的独立数据
            thisYearDataTwinkle: [],//散点图
            lastYearPrompBoxData: [],//去年的数据特殊标记
            tempPromptBoxShowAllData:[],
            promptBoxShowLastYearData:[],
            // pieThreeDataArrOne:[],//饼图的第一个图的数据
            // pieThreeDataArrTwo:[],//饼图的第二个图的数据
            // pieThreeDataArrThree:[],//饼图的第三个图的数据
            // pieThreeDataArrFour:[],//饼图的第四个图的数据
            // pieThreeShowData: [],//玫瑰图加了数据

            promptBoxShow: [],//提示框里面要展示的活动的All
        }
    }
    render() {
        var { allEvents, netData, bvData, recruitmentDate, buyerCountsDate, changeName, } = this.state
        return (
            <Fragment>
                <div style={{ height: '160px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div className="greenPic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 0)}>
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Net Sales(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>${netData.monthData || 0}m</h3>
                        <div style={{ position: 'absolute', left: "49%", top: "46px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>Target Completion: {netData.targetCompletionDta || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(netData.lmData >= 0 ? "+" + netData.lmData : netData.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "100px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY :{(netData.splyData >= 0 ? "+" + netData.splyData : netData.splyData) || 0}%</div>
                    </div>
                    <div className="yellowPic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 1)}>
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Order BV Sales(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>${bvData.monthData || 0}m</h3>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(bvData.lmData >= 0 ? "+" + bvData.lmData : bvData.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "102px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY :{(bvData.splyData >= 0 ? "+" + bvData.splyData : bvData.splyData) || 0}%</div>
                    </div>
                    <div className="redPic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 2)} >
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Recruitment(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>{recruitmentDate.monthData || 0}k</h3>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(recruitmentDate.lmData >= 0 ? "+" + recruitmentDate.lmData : recruitmentDate.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "102px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY :{(recruitmentDate.splyData >= 0 ? "+" + recruitmentDate.splyData : recruitmentDate.splyData) || 0}%</div>
                    </div>
                    <div className="bluePic" style={{ width: '24%', height: "140px", position: 'relative' }} onClick={this.picChangeDateHandle.bind(this, 3)} >
                        <img src={handPics} style={{ height: "30px", width: "30px", position: "absolute", right: "10%", top: "6%" }} />
                        <div style={{ marginTop: "16px", fontWeight: "600", fontSize: "14px", color: "#ffffff", marginLeft: '9%' }}>Buyer Counts(MTD)</div>
                        {/* <div style={{ marginTop: "22px", fontSize: "12px", color: "#ffffff", marginLeft: '9%' }}>Month to date</div> */}
                        <h3 style={{ marginTop: "55px", fontSize: "28px", color: "#ffffff", marginLeft: '9%' }}>{buyerCountsDate.monthData || 0}k</h3>
                        <div style={{ position: 'absolute', left: "66%", top: "72px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLM:{(buyerCountsDate.lmData >= 0 ? "+" + buyerCountsDate.lmData : buyerCountsDate.lmData) || 0}%</div>
                        <div style={{ position: 'absolute', left: "66%", top: "102px", fontWeight: "600", fontSize: "12px", color: "#ffffff" }}>vs SPLY :{(buyerCountsDate.splyData >= 0 ? "+" + buyerCountsDate.splyData : buyerCountsDate.splyData) || 0}%</div>
                    </div>
                </div>
                <div style={{ width: '100%', height: "340px", background: "#ffffff", borderRadius: "10px", display: "flex" }}>
                    <div style={{ width: '75%', height: "100%", display: "flex", flexWrap: "wrap" }}>
                        <div style={{ paddingLeft: '1%', paddingRight: '1%', height: '58px', display: 'flex' }}>
                            <h3 style={{ fontSize: "12px", lineHeight: '58px', margin: '0', marginRight: "20px", fontWeight: '700', whiteSpace: 'nowrap' }}>{allEvents}</h3>
                            <ul className="picFourChangeNav">
                                <li className="picFourChangeNav-item picFourChangeNavActive" id="upDateBlueShow" onClick={this.changeDateHandle.bind(this, 0)}>Total</li>
                                {
                                    (changeName && changeName.length >= 0) ? changeName.map((item, index) => {
                                        return <li key={index} className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, index + 1)}>{item}</li>

                                    }) : ""
                                }
                                {/* <li className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, 1)}>Population</li>
                                <li className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, 2)}>Productivity($)</li>
                                <li className="picFourChangeNav-item" onClick={this.changeDateHandle.bind(this, 2)}>Productivity($)</li> */}
                            </ul>
                        </div>
                        <div id="fourChangeLine" style={{ width: "100%", height: '280px' }}></div>
                    </div>
                    <div style={{ width: '25%', height: "100%", display: "flex" }}>
                        <div id="pieAngleEcharts" style={{ width: "100%", height: '320px' }}></div>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        // tableData: Array(5)
        // 0:
        // n_date: "20200225"
        // agg_type: "Net Sales"
        // sales: 5704194.4262069
        // sales_minus_1d: 3741290.88965517
        // sales_minus_2d: 4251392.66068965
        // mtd_sales: 95514621.1986207
        // pct_mtd_splm: -0.52700492819066
        // pct_mtd_sply: -0.0912532014079843
        var data = this.props.data || {}
        var data2 = this.props.data2 || {}
        var data3 = this.props.data3 || {}
        var dataOneLine = this.props.dataOneLine || {}
        var dataPromptBox = this.props.dataPromptBox || {}

        var changeName = []
        var netData = {}
        var bvData = {}
        // 切换数据时下边的选项的变动
        var changeNameArrShow = [
            { name: ["ACCL", "3E", "ECOM"] },
            { name: [] },
            { name: ["New ABO", "New PC"] },
            { name: ["ABO Buyer", "PC Buyer", "FOA Buyer", "New FOA Buyer"] },
        ];
        changeName = changeNameArrShow[0].name
        // n_date: "20200304"
        // agg_type: "ACCL"
        // sales: 6856868.64214831
        // sales_minus_1d: 6699803.26551114
        // sales_minus_2d: 7425065.32687214
        // mtd_sales: 28009179.4089838
        // pct_mtd_splm: 0.562395147931947
        // pct_mtd_sply: 0.103270530035608
        var pieThreeDataArr = []// 饼图的三个数据
        var pieThreeDataArrOne = []//饼图的第一个图的数据
        var pieThreeDataArrTwo = []//饼图的第二个图的数据
        var pieThreeDataArrThree = []//饼图的第三个图的数据
        var pieThreeDataArrFour = []//饼图的第四个图的数据
        var pieThreeDataFourNew = {} //第四个的新的独立数据
        var pieThreeDataArrAll = []//饼图的全数据
        var pieThreeLegend = []//饼图的图例
        // revenue_forecast_usd_data: Array(12)
        // 0: {x: "Jan", y: 219628779.310345, labelTooltip: "target_sales"}
        // 1: {x: "Feb", y: 173510045.37931, labelTooltip: "target_sales"}
        // 2: {x: "Mar", y: 191296390.758621, labelTooltip: "target_sales"}
        // 3: {x: "Apr", y: 175198325.37931, labelTooltip: "target_sales"}
        // 4: {x: "May", y: 191066128.827586, labelTooltip: "target_sales"}
        // console.log(data2)
        data.tableData ? data.tableData.map((item, index) => {
            var pieThreeDataOne = {}
            if (item.agg_type == "Net Sales") {
                var dataNowStr = hlp.yearMonthFiveToStr(item.n_date)
                var oneForecastData = 0
                dataOneLine.revenue_forecast_usd_data ? dataOneLine.revenue_forecast_usd_data.map((items, indexs) => {
                    if (items.x == dataNowStr) {
                        oneForecastData = items.y
                    }
                }) : ""
                netData.targetCompletionDta = Math.round(((item.mtd_sales / oneForecastData) * 100))
                netData.monthData = Math.round(((item.mtd_sales || 0) / 1000000))
                netData.monthData = netData.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                netData.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                netData.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else if (item.agg_type == "Order BV Sales") {
                bvData.monthData = Math.round(((item.mtd_sales || 0) / 1000000))
                bvData.monthData = bvData.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                bvData.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                bvData.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else {
                // 饼图的三个数据
                pieThreeDataOne.value = Math.round(((item.mtd_sales || 0) / 1000000));
                pieThreeDataOne.name = item.agg_type;
                pieThreeDataOne.lmData = Math.round((item.pct_mtd_splm || 0) * 100);
                pieThreeDataOne.splyData = Math.round((item.pct_mtd_sply || 0) * 100);
                pieThreeDataArrOne.push(pieThreeDataOne)
                pieThreeLegend.push(item.agg_type)
            }
        }) : ""
        // var pieThreeShowData = []
        // var sum = 0, max = 0;

        // pieThreeDataArr.forEach(item => {
        //     sum += item.value
        //     if (item.value >= max) max = item.value
        // })

        // // 放大规则
        // var number = Math.round(max * 0.5)

        // pieThreeShowData = pieThreeDataArr.map(item => {
        //     return {
        //         value: number + item.value,
        //         name: item.name,
        //         lmData: item.lmData,
        //         splyData: item.splyData
        //     }
        // })
        // console.log(pieThreeShowData,111)
        var recruitmentDate = {}
        var buyerCountsDate = {}
        // tableData: Array(8)
        // 0:
        // n_date: "20200225"
        // type: "Recruitment"
        // num_population: 120238
        // num_population_minus_1d: 10307
        // num_population_minus_2d: 11403
        // num_population_mtd: 328500
        // pct_mtd_splm: -0.390252956855524
        // pct_mtd_sply: 1.76916073776849
        // date_buyer_count: "20200225"
        // date_recruit_count: "20200225"

        // {n_date: "20200507", type: "Recruitment", num_population: 10597, num_population_minus_1d: 11722, num_population_minus_2d: 9752, …}
        // 1: {n_date: "20200507", type: "ABO", num_population: 2830, num_population_minus_1d: 4042, num_population_minus_2d: 2593, …}
        // 2: {n_date: "20200507", type: "PC", num_population: 243, num_population_minus_1d: 251, num_population_minus_2d: 229, …}
        // 3: {n_date: "20200507", type: "FOA", num_population: 7524, num_population_minus_1d: 7429, num_population_minus_2d: 6930, …}
        // 4: {n_date: "20200507", type: "Buyer Counts", num_population: 39092, num_population_minus_1d: 42547, num_population_minus_2d: 66574, …}
        // 5: {n_date: "20200507", type: "ABO buyer count", num_population: 24522, num_population_minus_1d: 27522, num_population_minus_2d: 49489, …}
        // 6: {n_date: "20200507", type: "PC buyer count", num_population: 983, num_population_minus_1d: 1002, num_population_minus_2d: 1473, …}
        // 7: {n_date: "20200507", type: "FOA buyer count", num_population: 13587, num_population_minus_1d: 14023, num_population_minus_2d: 15612, …}
        data2.tableData ? data2.tableData.map((item, index) => {
            var pieThreeDataThree = {}
            var pieThreeDataFour = {}
            if (item.type == "Recruitment") {
                recruitmentDate.monthData = Math.round(((item.num_population_mtd || 0) / 1000))
                recruitmentDate.monthData = recruitmentDate.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                recruitmentDate.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                recruitmentDate.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else if (item.type == "Buyer Counts") {
                buyerCountsDate.monthData = Math.round(((item.num_population_mtd || 0) / 1000))
                buyerCountsDate.monthData = buyerCountsDate.monthData.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,')
                buyerCountsDate.lmData = Math.round((item.pct_mtd_splm || 0) * 100)
                buyerCountsDate.splyData = Math.round((item.pct_mtd_sply || 0) * 100)
            } else if (item.type == "ABO" || item.type == "PC") {
                pieThreeDataThree.value = Math.round(((item.num_population_mtd || 0) / 1000))
                pieThreeDataThree.name = item.type == "ABO" ? "New ABO" : "New PC";
                pieThreeDataThree.lmData = Math.round((item.pct_mtd_splm || 0) * 100);
                pieThreeDataThree.splyData = Math.round((item.pct_mtd_sply || 0) * 100);
                pieThreeDataArrThree.push(pieThreeDataThree)
            } else if (item.type == "ABO buyer count" || item.type == "PC buyer count" || item.type == "FOA buyer count") {
                pieThreeDataFour.value = Math.round(((item.num_population_mtd || 0) / 1000))
                pieThreeDataFour.name = item.type == "ABO buyer count" ? "ABO Buyer" : item.type == "PC buyer count" ? "PC Buyer" : "FOA Buyer";
                pieThreeDataFour.lmData = Math.round((item.pct_mtd_splm || 0) * 100);
                pieThreeDataFour.splyData = Math.round((item.pct_mtd_sply || 0) * 100);
                pieThreeDataArrFour.push(pieThreeDataFour)
            } else if (item.type == "FOA") {
                pieThreeDataFourNew.value = Math.round(((item.num_population_mtd || 0) / 1000))
                pieThreeDataFourNew.name = "New FOA Buyer";
                pieThreeDataFourNew.lmData = Math.round((item.pct_mtd_splm || 0) * 100);
                pieThreeDataFourNew.splyData = Math.round((item.pct_mtd_sply || 0) * 100);
            }
        }) : ""
        pieThreeDataArrAll.push(pieThreeDataArrOne)
        pieThreeDataArrAll.push(pieThreeDataArrTwo)
        pieThreeDataArrAll.push(pieThreeDataArrThree)
        pieThreeDataArrAll.push(pieThreeDataArrFour)
        pieThreeDataArr = pieThreeDataArrAll[0]
        // sales_data: (31)[{ … }]
        // sales_ly_data: (31)[{ … }]
        // maxYearStr: "2020"
        // prevYearStr: "2019"
        // maxMonth: 3
        var data3XShow = []; //X轴的展示
        var data3ThisYear = []; //今年的数据
        var data3LastYear = []; //去年的数据
        // console.log(data3)
        var data3PrevYear = data3.prevYearStr || ""; //去年的年
        var data3MaxYear = data3.maxYearStr || ""; //今年的年
        var data3MaxMonth = data3.maxMonth || ""; //现在的月
        // 0: {x: "01", y: 12884624.9324138, type: "NET_SALES", labelTooltip: "2020 - 13m↵↵"}
        // 1: {x: "01", y: 9464008.34613366, type: "ACCL", labelTooltip: "2020 - 9m↵↵"}
        // 2: {x: "01", y: 909694.068965517, type: "ECOM", labelTooltip: "2020 - 1m↵↵"}
        // 3: {x: "01", y: 2510922.51731462, type: "3E", labelTooltip: "2020 - 3m↵↵"}
        // console.log(data3)
        data3.sales_data ? data3.sales_data.map((item, index) => {
            if (item.type == "NET_SALES") {
                item.y ? data3ThisYear.push((((item.y || 0) / 1000000)).toFixed(1)) : data3ThisYear.push("")
            }
        }) : ""
        data3.sales_ly_data ? data3.sales_ly_data.map((item, index) => {
            if (item.type == "NET_SALES") {
                item.x ? data3XShow.push(item.x) : ""
                item.y ? data3LastYear.push((((item.y || 0) / 1000000)).toFixed(1)) : ""
            }
        }) : ""
        //         tableData: Array(15)
        // 0: {n_month: "202005", start_day: "May. 11 2020", activity: "PROMOTION", promotion_desc: "May Random Coupon Campaign"}
        var promptBoxShow = []//提示框里面要展示的活动
        dataPromptBox.tableData ? dataPromptBox.tableData.map((item, index) => {
            var itemMonthId = parseInt(String(item.n_month).slice(4, 6))
            if (itemMonthId == data3MaxMonth) {
                promptBoxShow.push(item)
            }
        }) : ""
        //         {n_month: "201905", start_day: "May. 11 2019", end_day: "20190630", activity: "PROMOTION", promotion_desc: "May Artistry Promotion - 2nd wave"}
        //{n_month: "201905", start_day: "May. 06 2019", end_day: "20190630", activity: "PROMOTION", promotion_desc: "May Artistry Promotion"}
        //(12) ["12.9", "3.8", "3.6", "3.0", "5.4", "4.6", "4.1", "3.5", "3.7", "3.8", "3.2", "6.9"]
        var thisYearDataTwinkle = []
        var promptBoxShowAllData = []
        var promptBoxShowLastYear = []//去年的数据集合
        // console.log(promptBoxShow)
        promptBoxShow.map((item, index) => {
            var monthIdDay = parseInt(String(item.start_day).slice(5, 7))//日子
            var yearDay = parseInt(String(item.start_day).slice(-4))//年份
            if (yearDay == data3MaxYear) {
                promptBoxShowAllData.push(monthIdDay)//promptBoxShowAllData集合了活动日期的一个数组
            } else if (yearDay == data3PrevYear) {
                promptBoxShowLastYear.push(monthIdDay)
            }
        })

        function uniq(array) {//数组去重
            var tempPromptBoxShowAll = []; //一个新的临时数组，去重后的集合了活动日期的一个数组
            for (var i = 0; i < array.length; i++) {
                if (tempPromptBoxShowAll.indexOf(array[i]) == -1) {
                    tempPromptBoxShowAll.push(array[i]);
                }
            }
            return tempPromptBoxShowAll;
        }
        var tempPromptBoxShowAllData = uniq(promptBoxShowAllData)
        var promptBoxShowLastYearData = uniq(promptBoxShowLastYear)
        //把当月的数据判断当天是否有活动，有就加入数据，没有加空
        data3ThisYear.map((item, index) => {
            for (var i = 0; i < tempPromptBoxShowAllData.length; i++) {
                if (index + 1 == tempPromptBoxShowAllData[i]) {
                    thisYearDataTwinkle.push(item || "0");
                }
            }
            //第二种方法：判断新数组的长度和当前index进行对比
            // if (thisYearDataTwinkle.length < index) {
            //     thisYearDataTwinkle.push("");
            // }
            if (!thisYearDataTwinkle[index]) {
                thisYearDataTwinkle.push("");
            }
        })
        var lastYearPrompBoxData = []
        data3LastYear.map((item, index) => {
            for (var i = 0; i < promptBoxShowLastYearData.length; i++) {
                var promptBoxShowLastYearDataObj = {}
                if (index + 1 == promptBoxShowLastYearData[i]) {
                    promptBoxShowLastYearDataObj.value = item || ""
                    promptBoxShowLastYearDataObj.yAxis = item || ""
                    promptBoxShowLastYearDataObj.xAxis = index || ""
                    lastYearPrompBoxData.push(promptBoxShowLastYearDataObj);
                }
            }
        })
        this.setState({
            data,
            data2,
            data3,
            netData,
            bvData,
            changeNameArrShow,// 切换数据时下边的选项的变动
            recruitmentDate,
            buyerCountsDate,
            changeName,//切换数据的名字
            data3XShow,
            data3ThisYear,
            data3LastYear,
            data3PrevYear,
            data3MaxYear,
            data3MaxMonth,
            // pieThreeDataArrOne,//饼图的第一个图的数据
            // pieThreeDataArrTwo,//饼图的第二个图的数据
            // pieThreeDataArrThree,//饼图的第三个图的数据
            // pieThreeDataArrFour,//饼图的第四个图的数据
            pieThreeDataArrAll,//饼图的全部数据
            pieThreeDataArr,//饼图的总数据
            pieThreeDataFourNew,//第四个的新的独立数据
            pieThreeLegend,//饼图的图例
            lastYearPrompBoxData,//去年的数据的特殊标记
            tempPromptBoxShowAllData,
            promptBoxShowLastYearData,
            thisYearDataTwinkle,
            // pieThreeShowData,//玫瑰图加了数据的
            promptBoxShow,
        }, () => {
            this.echartsShowLine();
            this.pieAngleHandle();
        })
        // console.log(data2)
    }
    //点击图片下面切换数据
    picChangeDateHandle(idx, e) {
        var { data, data2, changeNameArrShow, changeName, allEvents, allEventsArr, pieThreeDataArr, pieThreeDataArrAll, pieThreeLegend } = this.state

        allEvents = allEventsArr[idx]
        // if(e.target.childNodes[1].innerHTML){
        //     allEvents = e.target.childNodes[1].innerHTML
        // }
        var idxIndexShow = idx
        if (changeNameArrShow[idx].name) {
            changeName = changeNameArrShow[idx].name
        } else {
            changeName = []
        }
        // console.log(changeName)
        // if (idx == 0) {
        //     data.tableData ? data.tableData.map((item, index) => {
        //         if (item.agg_type !== "Net Sales" && item.agg_type !== "Order BV Sales") {
        //             changeName.push(item.agg_type)
        //         }
        //     }) : ""
        // } else if (idx == 1) {
        //     changeName = []
        // } else if (idx == 2) {
        //     data2.tableData ? data2.tableData.map((item, index) => {
        //         if (item.type !== "Recruitment" && item.type !== "Buyer Counts") {
        //             changeName.push(item.type)
        //         }
        //     }) : ""
        //     changeName.length = 3
        // } else if (idx == 3) {
        //     data2.tableData ? data2.tableData.map((item, index) => {
        //         if (item.type !== "Recruitment" && item.type !== "Buyer Counts") {
        //             changeName.push(item.type)
        //         }
        //     }) : ""
        //     changeName = changeName.slice(3)
        // }
        pieThreeDataArr = pieThreeDataArrAll[idxIndexShow]
        pieThreeLegend = []
        pieThreeDataArr && pieThreeDataArr.length > 0 ? pieThreeDataArr.map((item, index) => {
            item.name !== "New FOA Buyer" ? pieThreeLegend.push(item.name) : ""
        }) : ""
        this.setState({
            changeName, allEvents, idxIndexShow, pieThreeDataArr, pieThreeLegend
        }, () => {
            var { elmUpDateBlue } = this.state
            if (elmUpDateBlue) {
                elmUpDateBlue.classList.remove("picFourChangeNavActive");
                document.getElementById("upDateBlueShow").classList.add("picFourChangeNavActive");
            }
            this.changeClickDataHandle(0);
            this.pieAngleHandle();
        })
    }
    // 点击切换数据
    changeDateHandle(index, e) {

        this.changeClickDataHandle(index);

        var elm = e.currentTarget,
            elmClassList = elm.classList;
        if (elmClassList.contains('picFourChangeNavActive')) return false;
        var parent = elm.parentElement,
            activeClassList = parent.querySelector('.picFourChangeNavActive').classList;
        activeClassList.remove('picFourChangeNavActive');
        elmClassList.add('picFourChangeNavActive');
        this.setState({
            elmUpDateBlue: elm,
        })
    }
    // 当被点击的时候数据进行切换的一个专用方法
    changeClickDataHandle(index) {
        var { data3, idxIndexShow,tempPromptBoxShowAllData,promptBoxShowLastYearData } = this.state
        var changeNameArrDataShow = [
            { name: ["NET_SALES", "ACCL", "3E", "ECOM"] },
            { name: ["ORDER_BV_SALES"] },
            { name: ["Recruitment", "ABO", "PC"] },
            { name: ["Buyer Counts", "ABO buyer count", "PC buyer count", "FOA buyer count", "NEW FOA buyer count"] },
        ];
        var dataIndex = changeNameArrDataShow[idxIndexShow].name[index]
        var data3XShow = []; //X轴的展示
        var data3ThisYear = []; //今年的数据
        var data3LastYear = []; //去年的数据
        data3.sales_data ? data3.sales_data.map((item, index) => {
            if (item.type == dataIndex) {
                if (item.y && idxIndexShow < 2) {
                    data3ThisYear.push((((item.y || 0) / 1000000)).toFixed(1))
                } else if (item.y && idxIndexShow >= 2) {
                    data3ThisYear.push((((item.y || 0) / 1000)).toFixed(1))
                }else{
                    data3ThisYear.push("")
                }
            }
        }) : ""
        data3.sales_ly_data ? data3.sales_ly_data.map((item, index) => {
            if (item.type == dataIndex) {
                item.x ? data3XShow.push(item.x) : ""
                if (item.y && idxIndexShow < 2) {
                    data3LastYear.push((((item.y || 0) / 1000000)).toFixed(1))
                } else if (item.y && idxIndexShow >= 2) {
                    data3LastYear.push((((item.y || 0) / 1000)).toFixed(1))
                }
            }
        }) : ""
        var thisYearDataTwinkle = []
        var lastYearPrompBoxData = []
        data3ThisYear.map((item, index) => {
            for (var i = 0; i < tempPromptBoxShowAllData.length; i++) {
                if (index + 1 == tempPromptBoxShowAllData[i]) {
                    thisYearDataTwinkle.push(item || "0");
                }
            }
            //第二种方法：判断新数组的长度和当前index进行对比
            // if (thisYearDataTwinkle.length < index) {
            //     thisYearDataTwinkle.push("");
            // }
            if (!thisYearDataTwinkle[index]) {
                thisYearDataTwinkle.push("");
            }
        })
        data3LastYear.map((item, index) => {
            for (var i = 0; i < promptBoxShowLastYearData.length; i++) {
                var promptBoxShowLastYearDataObj = {}
                if (index + 1 == promptBoxShowLastYearData[i]) {
                    promptBoxShowLastYearDataObj.value = item || ""
                    promptBoxShowLastYearDataObj.yAxis = item || ""
                    promptBoxShowLastYearDataObj.xAxis = index || ""
                    lastYearPrompBoxData.push(promptBoxShowLastYearDataObj);
                }
            }
        })
        this.setState({
            data3XShow,
            data3ThisYear,
            data3LastYear,
            thisYearDataTwinkle,
            lastYearPrompBoxData,
        }, () => {
            this.echartsShowLine();
            this.pieAngleHandle();
        })
    }
    // 可以切换的折线图Echarts
    echartsShowLine() {
        var myChartThree,
            defaultFourOpt = {
                grid: {
                    left: 20,
                    right: 20,
                    bottom: 55,
                    top: 30,
                    containLabel: true
                },
                tooltip: {//鼠标移入
                    trigger: 'axis',
                    confine: true,
                    // var data3PrevYear = data3.prevYearStr || ""; //去年的年
                    // var data3MaxYear = data3.maxYearStr || ""; //今年的年
                    // var data3MaxMonth = data3.maxMonth || ""; //现在的月
                    formatter: (data) => {
                        var { data3MaxMonth, data3MaxYear, data3PrevYear, idxIndexShow, promptBoxShow } = this.state
                        var yearThisData = "";
                        var yearLastData = "";
                        var forecastData = "";
                        var nameShow = "";
                        var thisTool = "";
                        var lastTool = "";
                        var thisToolShow = "";
                        var lastToolShow = "";
                        var monthUp = "";
                        var yearThisTool = data3MaxYear
                        var yearLastTool = data3PrevYear
                        var monthShowTool = hlp.yearMonthFiveTooltipToStr(data3MaxMonth)
                        data.map((item, index) => {
                            if (item.componentIndex && item.componentIndex == 1) {
                                yearLastData = item.value || ""
                            } else if (item.componentIndex && item.componentIndex == 2) {

                            } else {
                                yearThisData = item.value || ""
                            }
                            nameShow = item.name
                            monthUp = item.axisValue
                        })
                        //         tableData: Array(15)
                        // 0: {n_month: "202005", start_day: "May. 11 2020", activity: "PROMOTION", promotion_desc: "May Random Coupon Campaign"}
                        // 0: {n_month: "202005", start_day: "May. 19 2020", end_day: "20991231", activity: "KEY_LAUNCH", promotion_desc: "Hydra V Foundation Open Launch"}
                        // 1: {n_month: "202005", start_day: "May. 19 2020", end_day: "20200531", activity: "PROMOTION", promotion_desc: "Artistry May Full line Promotion"}
                        promptBoxShow.map((item, index) => {
                            var monthIdDay = parseInt(String(item.start_day).slice(5, 7))
                            var monthIdDayEnd = parseInt(String(item.end_day).slice(-2))
                            var monthIdEnd = parseInt(String(item.end_day).slice(4, 6))
                            var yearIdDay = parseInt(String(item.n_month).slice(0, 4))
                            if (monthIdDay == monthUp) {
                                if (yearIdDay == yearThisTool) {
                                    if (item.activity == "PROMOTION") {
                                        thisTool += "<div style='display:flex;justify-content: space-between;font-size:12px;line-height:14px'><span style='margin-right:5px;'>" + data3MaxMonth + "." + monthIdDay + "-" + monthIdEnd + "." + monthIdDayEnd + "</span>" + item.promotion_desc + "</div>"
                                    } else {
                                        thisTool += "<div style='display:flex;justify-content: space-between;font-size:12px;line-height:14px'><span style='color:#f2df3f'>" + " " + "</span>" + item.promotion_desc + "</div>"
                                    }

                                } else if (yearIdDay == yearLastTool) {
                                    if (item.activity == "PROMOTION") {
                                        lastTool += "<div style='display:flex;justify-content: space-between;font-size:12px;line-height:14px'><span style='margin-right:5px;'>" + data3MaxMonth + "." + monthIdDay + "-" + monthIdEnd + "." + monthIdDayEnd + "</span>" + item.promotion_desc + "</div>"
                                    } else {
                                        lastTool += "<div style='display:flex;justify-content: space-between;font-size:12px;line-height:14px'><span style='color:#f2df3f'>" + " " + "</span>" + item.promotion_desc + "</div>"
                                    }
                                }
                            }
                        })

                        if (yearThisData) {
                            if (idxIndexShow < 2) {
                                var yearThisData = yearThisTool + ": " + yearThisData + "m" + "<br/>"
                            } else {
                                var yearThisData = yearThisTool + ": " + yearThisData + "k" + "<br/>"
                            }
                        }

                        if (yearLastData) {
                            if (idxIndexShow < 2) {
                                var yearLastData = yearLastTool + ": " + yearLastData + "m"
                            } else {
                                var yearLastData = yearLastTool + ": " + yearLastData + "k"
                            }
                        }
                        if (thisTool) {
                            var thisToolShow = "<div style='display:flex;font-size:12px;line-height:14px'><span style='color:#f2df3f;font-size:12px;line-height:14px'>" + "★" + "</span>" + yearThisTool + "</div>" + thisTool
                        }
                        if (lastTool) {
                            var lastToolShow = "<div style='display:flex;font-size:12px;line-height:14px'><span style='color:#f2df3f;font-size:12px;line-height:14px'>" + "★" + "</span>" + yearLastTool + "</div>" + lastTool
                        }
                        // var thisNow = "2019 Mar:" + yearThisData;
                        // if (tooltipData && tooltipData[nameShow]) {
                        //     tooltipData[nameShow].events.map((item, index) => {
                        //         toolShow += "<div style='display:flex;justify-content: space-between'><span style='color:#f2df3f'>" + "★" + "</span>" + item + "</div>"
                        //     })
                        // }
                        return "<div style='border-bottom:1px solid #ffffff;font-size:12px;line-height:14px'>" + monthShowTool + " " + monthUp + "</div>" + "<div style='border-bottom:1px solid #ffffff;font-size:12px;line-height:14px'>" + yearThisData + yearLastData + '</div>' + thisToolShow + lastToolShow
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.state.data3XShow,
                        axisTick: {
                            show: false //隐藏X轴刻度
                        },
                        axisLine: {
                            show: false,
                        },
                        boundaryGap: false,//X轴刻度位置
                        axisLabel: {
                            interval: 0,//x轴文字显示不全
                            textStyle: {
                                fontSize: 12,
                                color: '#333'
                            },
                            formatter: function (params) {
                                return params.split(' ')[0]
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: 12,
                            fontFamily: 'ArialMT',
                            formatter: (val) => {
                                var { idxIndexShow } = this.state
                                var valueY = 0
                                if (idxIndexShow < 2) {
                                    valueY = val + 'm'
                                } else {
                                    valueY = val + 'k'
                                }
                                return valueY;
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: '#757575'
                            }
                        }
                    }
                ],
                legend: {
                    left: '30%',
                    bottom: 25,
                    itemWidth: 20,
                    itemHeight: 12,
                    itemGap: 190,//图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
                    data: [
                        { name: this.state.data3MaxMonth + "/" + this.state.data3MaxYear, icon: "image://" + tuliLine },
                        { name: this.state.data3MaxMonth + "/" + this.state.data3PrevYear, icon: "image://" + tulibackground }
                    ],
                }
            },
            chartArray = [
                {
                    series: [
                        {
                            name: this.state.data3MaxMonth + "/" + this.state.data3MaxYear,
                            data: this.state.data3ThisYear,
                            animationDuration: 2000,
                            type: 'line',
                            smooth: true,
                            symbolSize: 8, //折线点的大小
                            itemStyle: {
                                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    color: "#ffffff",
                                    lineStyle: { // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid',
                                        color: "#4d96f1"//折现颜色
                                    },
                                    borderColor: '#4d96f1',  // 拐点边框颜色
                                },

                            }, //线条样式
                        },
                        {
                            name: this.state.data3MaxMonth + "/" + this.state.data3PrevYear,
                            data: this.state.data3LastYear,
                            type: 'line',
                            smooth: true,
                            symbol: "none", //去掉折线点
                            // symbol: (value) => {
                            //     console.log(value)
                            //     var showSymbol = "circle"
                            //     // tooltipData.map((item, index) => {
                            //     //     if (item.y == value) {
                            //     //         showSymbol = "triangle";
                            //     //     }
                            //     // })
                            //     return showSymbol
                            // }, //去掉折线点
                            markPoint: {
                                // symbol: 'triangle',
                                symbolRotate: '0',
                                symbolSize: 15,// 容器大小
                                itemStyle: {
                                    color: '#a2a6ab',
                                },
                                label: {
                                    show: false,
                                },
                                data: this.state.lastYearPrompBoxData
                            },
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
                        },
                        {
                            type: 'effectScatter',
                            coordinateSystem: 'cartesian2d',
                            data: this.state.thisYearDataTwinkle, //2d坐标系
                            symbolSize: 10,
                            label: {
                                show: false,
                                position: 'top',
                                // offset:[0,'-100%'],
                                formatter: (params) => {
                                    // console.log(params)
                                    var { data3MaxMonth, data3MaxYear, promptBoxShow } = this.state
                                    var thisTool = "";
                                    var yearThisTool = data3MaxYear
                                    var dataindex = params.name
                                    promptBoxShow.map((item, index) => {
                                        var monthIdDay = parseInt(String(item.start_day).slice(5, 7))
                                        var monthIdDayEnd = parseInt(String(item.end_day).slice(-2))
                                        var monthIdEnd = parseInt(String(item.end_day).slice(4, 6))
                                        var yearIdDay = parseInt(String(item.n_month).slice(0, 4))
                                        if (monthIdDay == params.name) {
                                            if (yearIdDay == yearThisTool) {
                                                if (item.activity == "PROMOTION") {
                                                    thisTool += '\n' + data3MaxMonth + "." + monthIdDay + "-" + monthIdEnd + "." + monthIdDayEnd + " " + item.promotion_desc
                                                } else {
                                                    thisTool += '\n' + item.promotion_desc
                                                }

                                            }
                                        }
                                    })
                                    return '{' + dataindex + '|' + thisTool + '}';
                                },
                                rich: {
                                    11: {
                                        // width: 1,
                                        height:61,
                                        align: "center",
                                        verticalAlign: "middle",
                                        color:'red',
                                        lineHeight:8,
                                        // padding : [15, 0, 0, 0],
                                    },
                                    16: {
                                        height:20,
                                        align: "center",
                                        verticalAlign: "middle",
                                        lineHeight:8,
                                        // padding : [20, 0, 0, 0],
                                        color:'yellow',
                                    },
                                    19: {
                                        // height:900,
                                        align: "center",
                                        // width : 1,
                                        // padding : [23, 0, 0, 0],
                                        // lineHeight:12,
                                        // color:"blue",
                                        verticalAlign: "middle",
                                    },
                                },
                                // backgroundColor: 'rgba(38,38,39,0.6)',
                                // borderRadius: 5,
                                // padding: 4,
                                textStyle: {
                                    fontSize: 8,
                                    color: '#ffffff',
                                }
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    color: '#4d96f1',
                                    shadowBlur: 0,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        }
                    ]
                }
            ];
        var fourChangeLineWidth = document.getElementById('fourChangeLine')
        fourChangeLineWidth.style.width = (window.innerWidth * 0.72) + "px"

        var myChartThree = echarts.init(document.getElementById('fourChangeLine'));
        window.addEventListener('resize', function () {
            myChartThree && myChartThree.resize && myChartThree.resize();
        });
        myChartThree.setOption({ ...defaultFourOpt, ...chartArray[0] });
        // this.segmentsHandleEcharts(chartArray, defaultFourOpt)
    }
    // segmentsHandleEcharts(chartArray, defaultOpt, idIndex) {
    //     //页面自适应
    //     var fourChangeLineWidth = document.getElementById('fourChangeLine')
    //     fourChangeLineWidth.style.width = (window.innerWidth * 0.72) + "px"

    //     var myChartThree = echarts.init(document.getElementById('fourChangeLine'));
    //     window.addEventListener('resize', function () {
    //         myChartThree && myChartThree.resize && myChartThree.resize();
    //     });
    //     var idx = 0,
    //         option = chartArray[idx];
    //     document.querySelector(`.nav-item:nth-child(${idx + 1})`).classList.add('segmentsNavActive');
    //     idIndex ? myChartThree.setOption(chartArray[idIndex]) : myChartThree.setOption({ ...defaultOpt, ...option });
    // }
    pieAngleHandle() {
        //页面自适应
        var pieAngleWidth = document.getElementById('pieAngleEcharts')
        pieAngleWidth.style.width = (window.innerWidth * 0.24) + "px"

        var pieAngleEcharts = echarts.init(pieAngleWidth);
        window.addEventListener('resize', function () {
            pieAngleEcharts.resize();
        });
        pieAngleEcharts.setOption({
            // backgroundColor: '#2c343c',
            tooltip: {
                trigger: 'item',
                formatter: (data) => {
                    var { pieThreeDataArr, idxIndexShow, pieThreeDataFourNew } = this.state;
                    // console.log(pieThreeDataFourNew)
                    // {value: 78, name: "New FOA Buyer", lmData: -50, splyData: -18}
                    var pieIndex = pieThreeDataArr[data.dataIndex];
                    var namePie = pieIndex.name;
                    if (idxIndexShow < 2) {
                        var valuePie = "MTD:" + pieIndex.value + "m";
                    } else {
                        var valuePie = "MTD:" + pieIndex.value + "k";
                    }
                    if (pieIndex.lmData >= 0) {
                        var lmData = "<span style='color:#16b6aa'>" + "+" + pieIndex.lmData + "%" + "</span>"
                    } else {
                        var lmData = "<span style='color:#eb5652'>" + pieIndex.lmData + "%" + "</span>"
                    }
                    if (pieIndex.splyData >= 0) {
                        var splyData = "<span style='color:#16b6aa'>" + "+" + pieIndex.splyData + "%" + "</span>"
                    } else {
                        var splyData = "<span style='color:#eb5652'>" + pieIndex.splyData + "%" + "</span>"
                    }
                    var lmDataPie = "vs SPLM:" + lmData;
                    var splyDataPie = "vs SPLY:" + splyData;
                    if (idxIndexShow == 3 && data.name == "FOA Buyer") {
                        var namePieNew = "including " + pieThreeDataFourNew.name
                        var valuePieNew = "MTD:" + pieThreeDataFourNew.value + "k";
                        if (pieThreeDataFourNew.lmData >= 0) {
                            var lmDataNew = "<span style='color:#16b6aa'>" + "+" + pieThreeDataFourNew.lmData + "%" + "</span>"
                        } else {
                            var lmDataNew = "<span style='color:#eb5652'>" + pieThreeDataFourNew.lmData + "%" + "</span>"
                        }
                        if (pieThreeDataFourNew.splyData >= 0) {
                            var splyDataNew = "<span style='color:#16b6aa'>" + "+" + pieThreeDataFourNew.splyData + "%" + "</span>"
                        } else {
                            var splyDataNew = "<span style='color:#eb5652'>" + pieThreeDataFourNew.splyData + "%" + "</span>"
                        }
                        var lmDataPieNew = "vs SPLM:" + lmDataNew;
                        var splyDataPieNew = "vs SPLY:" + splyDataNew;
                        return namePie + "</br>" + valuePie + "</br>" + lmDataPie + "</br>" + splyDataPie + "<div style='border-top:1px solid #ffffff;'>" + namePieNew + "</div>" + valuePieNew + "</br>" + lmDataPieNew + "</br>" + splyDataPieNew
                    }
                    return namePie + "</br>" + valuePie + "</br>" + lmDataPie + "</br>" + splyDataPie
                }
            },
            legend: {
                orient: 'horizontal',
                left: "center",
                // right: 20,
                bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
                data: this.state.pieThreeLegend,
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    data: this.state.pieThreeDataArr,
                    // roseType: 'angle',
                    color: ["#5599ea", '#76b9fc', '#c6e2fa'],
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 12,
                                color: '#fff'
                            },
                            position: 'inside',
                            formatter: (data) => {
                                return Math.round(data.percent) + "%"
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },

                }
            ]
        })
    }
}
