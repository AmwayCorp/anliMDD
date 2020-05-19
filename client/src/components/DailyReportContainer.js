//第五个页面
import React from "react";

import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import _ from 'lodash'

import LineChartDailySales from './LineChartDailySales'
import TableViewDailySales from './TableViewDailySales'
import PicFourChange from './../DailyReport/PicFourChange'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import TableViewComments from "./TableViewComments";
import LineChartDailyRec from "./LineChartDailyRec";
import TableViewDailySalEvents from "./TableViewDailySalEvents";


@inject('chartStoreDaily','chartStore') @observer
class DailyReportContainer extends React.PureComponent {

  @observable selectedTab = 'Sales Impact'

  constructor(props) {
    super(props);
    this.state = {
      toUpDateYear: "",
      toUpDateMonth: "",
      toUpDateDay: "",
    }
  }


  render() {

    const chartStore = this.props.chartStore//拿到第一图折线图的数据
    const chartStoreDaily = this.props.chartStoreDaily
    var contrastData = this.props.chartStoreDaily.queryDailySalesLineHandle
    var contrastDate = contrastData ? contrastData.pageUpShowDate : ""
    var contrastAllData = this.props.chartStoreDaily.dailyComments
    var contrastmaxMonthStr = contrastAllData ? contrastAllData.maxDate : ""
    var { toUpDateYear,toUpDateMonth,toUpDateDay, } = this.state
    // console.log(contrastDate,contrastmaxMonthStr,"!1111")

    return (
      <div style={{ paddingBottom: "20px",marginTop:"40px",position:"relative" }}>
        {/* <div className="container-fluid"> */}

        {/* <div style={{ height: "56px", width: "100%", lineHeight: "56px", paddingLeft: "22px", fontWeight: 600, }}>
          Daily Sales <span style={{ fontSize:'12px',position:"absolute",top:"-39px",left:"12%",zIndex:"1000"}}>{toUpDateMonth}.{toUpDateDay} {toUpDateYear}</span>
        </div> */}
        <div style={{ height: '500px', width: "100%", }}>
          <PicFourChange data={chartStoreDaily.dailyTableSales} data2={chartStoreDaily.dailyTableRecruit} data3={chartStoreDaily.queryDailySalesLineHandle} dataOneLine={chartStore.totalSalesLineMonth} dataPromptBox={chartStoreDaily.dailySalesEvents}/>
        </div>


        {/* 
        <div className="page-block">
          <TableViewDailySales data={chartStoreDaily.dailyTableSales} 
            columnNames={['agg_type','sales_minus_2d','sales_minus_1d','sales','mtd_sales','pct_mtd_splm','pct_mtd_sply']}
            formatThous={false}
            title={'Daily Sales'}/>
        </div>

        <div className="page-block">
          <TableViewDailySales data={chartStoreDaily.dailyTableRecruit} 
            columnNames={['type','num_population_minus_2d','num_population_minus_1d','num_population','num_population_mtd','pct_mtd_splm','pct_mtd_sply']}
            formatThous={true}
            title={''}/>
        </div>


        <div className="page-block">
          <div className="main-block-header">
            <h6 className="text-blue">
                Key Events
            </h6>
          </div>
          <Tabs className="main-nav-daily" activeKey={this.selectedTab} onSelect={k => this.selectedTab= k}>
              <Tab eventKey="Sales Impact" title={<div>Daily Sales ($)</div>}>
                <div className="sb-wrap mt-0">
                    <LineChartDailySales data={chartStoreDaily.dailySales} 
                      dataPropName={'sales'} formatThous={false}/>
                </div>
              </Tab>
              <Tab eventKey="Recruitment Impact" title={<div>ABO Recruitment</div>}>
                <div className="sb-wrap mt-0">
                    <LineChartDailyRec data={chartStoreDaily.dailyRecruit} 
                      dataPropName={'num_recruitment'} formatThous={true}/>
                </div>
              </Tab>
          </Tabs>
        </div>

        <div className="page-block">
          <div className="sb-wrap">
            <TableViewDailySalEvents data={chartStoreDaily.dailySalesEvents}/>
          </div>
        </div> */}

        <div className="page-block">
          <div className="sb-wrap" style={{ marginBottom: "0", height: "auto" }}>
            {
              contrastDate == contrastmaxMonthStr ? <TableViewComments data={chartStoreDaily.dailyComments} isMaxDate={true} /> : ""
            }
          </div>
        </div>

      </div>
    );
  }
  componentDidMount() {
    var date = new Date();
    var toUpDateYear = date.getFullYear()
    var toUpDateMonth = date.toDateString().split(" ")[1]
    var toUpDateDay = date.getDate()
    this.setState({
      toUpDateYear,
      toUpDateMonth,
      toUpDateDay,
    })
  }
}

export default DailyReportContainer;