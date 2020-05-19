//第一个页面
import React from "react";

import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import _ from 'lodash'
import * as hlp from './Helper'

import DonutChart from '../components/DonutChart'
//import LineChart from '../components/LineChart'
import LineChartMonthly from '../components/LineChartMonthly'
import LineChartMonthlyEchaets from '../components/LineChartMonthlyEchaets'
import EchartsMapCity from '../components/EchartsMapCity'
import MapYidCity from '../components/MapYidCity'
import WaterfallChart from '../components/WaterfallChart'
import TableView from '../components/TableView'
import TableViewCity from '../components/TableViewCity'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TableViewComments from "./TableViewComments";
import EchartsFCWaterfall from "./EchartsFCWaterfall";



/**
 * This layout demonstrates how to sync to localstorage.
 */
@inject('authStore', 'chartStore') @observer
class SalesPerformanceContainer extends React.PureComponent {


  // @observable isPerfYear = false

  // handleSwitchChange = nr => () => {
  //   this.isPerfYear = !this.isPerfYear

  //   console.log('this.isPerfYear ', this.isPerfYear)

  //   const chartStore = this.props.chartStore
  //   chartStore.isPerfYear = !chartStore.isPerfYear

  //   console.log('chartStore.isPerfYear ', chartStore.isPerfYear)

  // }



  constructor(props) {
    super(props);
  }


  componentWillUnmount() {
    //    this.props.onRef(undefined)
  }

  async componentDidMount() {
    //    this.props.onRef(this)
  }

  render() {

    const authStore = this.props.authStore
    const chartStore = this.props.chartStore
    const thisWindowWidth = this.props.thisWindowWidth
    var contrastData = this.props.chartStore.donutTotalSalesYear
    var contrastDate = contrastData ? contrastData.contrastDate : ""
    var contrastAllData = this.props.chartStore.performance2Com
    var contrastmaxMonthStr = String( hlp.yearMonthToStr( contrastAllData.maxMonth ) )

    return (

      // <div className="container-fluid">
      <div>
        {/* <Row>
          <Col>
          </Col>
          <Col>
          <div className='custom-control custom-switch perf-switch-wrap'>
            <label className='perf-lbl'>
              See as Performance Year
            </label>
            <input
              type='checkbox'
              className='custom-control-input'
              id='customSwitchesTwo'
              checked={this.isPerfYear}
              onChange={this.handleSwitchChange()}
              readOnly
            />
            <label className='custom-control-label' htmlFor='customSwitchesTwo'>
              Calendar Year
            </label>
          </div>
          </Col>
        </Row> */}


        <div className="page-block">
          <label className="tab-cont-title">
            Sales Overview
          </label>
          <Row>
            <Col>
              <div className="block-wrapper salesOverview-left">
                <DonutChart data={chartStore.donutTotalSalesYear} isMonth={false} dataFalg={chartStore.totalSalesLineMonth}/>
              </div>
            </Col>
            <Col>
              <div className="block-wrapper salesOverview-right">
                <DonutChart data={chartStore.donutTotalSalesLastMonth} isMonth={true} dataFalg={chartStore.totalSalesLineMonth}/>
              </div>
            </Col>
          </Row>
          {/* <Row>
                <Col>
                  <div className="sb-wrap">
                    <LineChart data={chartStore.totalSalesLineYear}/>
                  </div>
                </Col> 
              </Row> */}
          {/* <Row>
            <Col>
              <div className="sb-wrap sb-wrapFirst" style={{display:"flex"}}>
                <LineChartMonthly data={chartStore.totalSalesLineMonth} />
                <LineChartMonthlyEchaets data={chartStore.totalSalesLineMonth} datas={chartStore.totalSalesLineYear}/>
              </div>
            </Col>
            <Col>
              <div className="sb-wrap">
                <TableViewComments data={chartStore.performance2Com} />
              </div>
            </Col>
          </Row> */}
          <div style={{ display: 'flex', justifyContent: 'space-between',padding:'0 0.5%'}}>
            <div className="sb-wrap sb-wrapFirst" style={{ width: '48.5%', height: '300px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* 多功能折线图 */}
              <LineChartMonthlyEchaets data={chartStore.totalSalesLineMonth} datas={chartStore.totalSalesLineYear}/>
            </div>
            <div className="sb-wrap" style={{ width: '48.5%', height: '300px', background: '#ffffff', borderRadius: "10px", position: "relative" }}>
              {/* text */}
              {
                contrastDate == contrastmaxMonthStr ? <TableViewComments data={chartStore.performance2Com}/> : ""
              }
            </div>
          </div>
          {/* <Row>
            <Col>
              <div className="sb-wrap">
                <TableViewComments data={chartStore.performance2Com} />
              </div>
            </Col>
          </Row> */}


        </div>
        {/* YTD Sales by City Cluster */}
        {/* <div className="page-block">
          <div className="sb-wrap-table">
            <TableViewCity data={chartStore.totalSalesCityCluster} />
          </div>
        </div> */}
        {/* YTD Sales by City Cluster */}
        {/* <div className="page-block">
          <div className="sb-wrap-table">
            <TableView data={chartStore.totalSales} />
          </div>
        </div> */}
        <div className="echartsMapCityAndYidCity">
          <div className="echartsMapCityCss">
            <EchartsMapCity data={chartStore.totalSalesCityCluster} bigSmall={chartStore.donutTotalSalesYear}/>
          </div>
          {/* <div className="echartsMapCityCssOpacity" style={{paddingRight: '34%',display:'none'}}>
            <EchartsMapCity data={chartStore.totalSalesCityCluster} />
          </div> */}
          <div className="mapYidCityCss">
            <MapYidCity data={chartStore.totalSalesCityCluster} />
          </div>
        </div>

        {/* <div className="page-block">
          <div className="sb-wrap">
            <WaterfallChart data={chartStore.waterfallChartData} />
          </div>
        </div> */}


        <div className="echartsFCWaterfall">
          <EchartsFCWaterfall data={chartStore.waterfallChartData}  datas={chartStore.totalSales}/>
        </div>


      </div>
    );
  }
  // handleHiddenShow(e){
  //   // console.log(e.target.previousSibling)
  //   // console.log(e.target.nextSibling)
  //   var last = e.target.previousSibling
  //   var next = e.target.nextSibling
  //   last.style.width = "66%";
  //   next.style.display = "block";
  // }
}

export default SalesPerformanceContainer;