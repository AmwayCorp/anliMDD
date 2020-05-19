import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

// import routes from '../routes'
// import { Redirect } from 'react-router'
// import { Link } from 'react-router-dom'
// import history from '../services/history'

import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

//import CardsLayout from '../components/CardsLayout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'

//import HomeContainer from '../components/HomeContainer'
import SalesPerformanceContainer from '../components/SalesPerformanceContainer'
import AboDynamicsContainer from '../components/AboDynamicsContainer'
//import AboLeaderContainer from '../components/AboLeaderContainer'
import GrowthContainer from '../components/GrowthContainer'
import DailyReportContainer from '../components/DailyReportContainer'
import SocialPromContainer from '../components/SocialPromContainer'



/**
 * Home page extra component
 */
@inject('authStore', 'chartStore', 'chartStoreAbo', 'chartStoreGrowth', 'chartStoreDaily', 'chartStoreSocial') @observer
class Home extends Component {

    @observable selectedTab = 'Sales Performance'
    @observable isPerfYear = true

    constructor(props) {
        super(props)
        this.state = {
            thisWindowWidth: false,
        }
        //        this.onClickEditDashboard = this.onClickEditDashboard.bind(this)
    }

    componentDidMount() {
        // 实现吸顶
        window.addEventListener("scroll", () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(document.getElementById('topTatilShow'))
            let offsetTopNav = document.getElementsByClassName('nav-tabs')[0].offsetTop;
            if (scrollTop > offsetTopNav) {
                document.getElementsByClassName('nav-tabs')[0].style.position = "fixed";
                document.getElementsByClassName('nav-tabs')[0].style.top = "0";
                document.getElementsByClassName('nav-tabs')[0].style.zIndex = "1000";
                document.getElementsByClassName('nav-tabs')[0].style.width = "100%";
            } else {
                document.getElementsByClassName('nav-tabs')[0].style.position = "";
                document.getElementsByClassName('nav-tabs')[0].style.top = "";
            }
            let offsetTop = document.getElementById('topTatilShow').offsetTop;
            if (scrollTop > offsetTop) {
                document.getElementById('topTatilShow').style.position = "fixed";
                document.getElementById('topTatilShow').style.top = "44px";
            } else {
                document.getElementById('topTatilShow').style.position = "absolute";
                document.getElementById('topTatilShow').style.top = "110px";
            }
        })

        this.apiDataUpdate()
    }

    apiDataUpdate(){
        
        this.props.chartStore.fetchPerformanceData1();
        this.props.chartStore.fetchPerformanceData2Tooltip();
        this.props.chartStore.fetchPerformanceData2Com()
        this.props.chartStore.fetchPerformanceData2();
        this.props.chartStore.fetchPerformanceData3();



        this.props.chartStoreAbo.fetchAboCisKpiData();
        this.props.chartStoreAbo.fetchAboRenewalData();
        this.props.chartStoreAbo.fetchAboPinData();
        this.props.chartStoreAbo.fetchAboNonPinData();
        this.props.chartStoreAbo.fetchAboRetentionData();
        this.props.chartStoreAbo.fetchAboQualificationData();
        this.props.chartStoreAbo.fetchAboMigBot()
        this.props.chartStoreAbo.fetchAboMigTop()
        this.props.chartStoreAbo.fetchAboQMonthPvData()
        this.props.chartStoreAbo.fetchAboNewQualData()
        this.props.chartStoreAbo.fetchKeyDriverData()

        //this.props.chartStoreAbo.fetchAboLeaderData1();
        this.props.chartStoreAbo.fetchAboBonusData()
        this.props.chartStoreAbo.fetchAboGar2()
        this.props.chartStoreAbo.fetchAboGar1()
        this.props.chartStoreAbo.fetchAboPinPopData()

        this.props.chartStoreGrowth.fetchGrowthSustData()
        this.props.chartStoreGrowth.fetchGrowthSalesSegData()
        this.props.chartStoreGrowth.fetchGrowthPopSegData()
        this.props.chartStoreGrowth.fetchGrowthBuyerData()
        this.props.chartStoreGrowth.fetchGrowthTableData()


        this.props.chartStoreDaily.fetchDailySalEventsData()
        this.props.chartStoreDaily.fetchDailySalesData()
        this.props.chartStoreDaily.fetchDailyRecData()
        this.props.chartStoreDaily.fetchDailyTableSalData()
        this.props.chartStoreDaily.fetchDailyTableRecData()
        this.props.chartStoreDaily.fetchManualInputsData()
        this.props.chartStoreDaily.fetchDailyCommentsData()
        this.props.chartStoreDaily.fetchGetQueryDailySalesLine()

        this.props.chartStoreSocial.fetchSocialRepBuyData()
        this.props.chartStoreSocial.fetchSocialFoaProdData()
        this.props.chartStoreSocial.fetchSocialPopData()
        this.props.chartStoreSocial.fetchSocialConvData()
        this.props.chartStoreSocial.fetchSocialReferData()

        this.props.chartStoreSocial.fetchSocialBusImpData()
        this.props.chartStoreSocial.fetchSocialBusImp35Data()
        this.props.chartStoreSocial.fetchSocialBusImpMonData()
        this.props.chartStoreSocial.fetchSocialEarnSegData()
        this.props.chartStoreSocial.fetchSocialEarnDurData()
        this.props.chartStoreSocial.fetchSocial3eSalData()
        this.props.chartStoreSocial.fetchSocialEarnAttrData()
        this.props.chartStoreSocial.fetchSocialBuyLoyData()
        this.props.chartStoreSocial.fetchSocialBuyPenData()
        this.props.chartStoreSocial.fetchSocialProdFirstData()
        this.props.chartStoreSocial.fetchSocialAttrRateData()
        this.props.chartStoreSocial.fetchSocialRndPartData()
        this.props.chartStoreSocial.fetchSocialPartDistData()
        this.props.chartStoreSocial.fetchSocialSopSalData()
    }

    handleSwitchChange = nr => () => {
        this.isPerfYear = !this.isPerfYear

        if (this.props.chartStore && this.props.chartStoreAbo) {
            this.props.chartStore.isPerfYear = !this.props.chartStore.isPerfYear
            this.props.chartStoreAbo.isPerfYear = !this.props.chartStoreAbo.isPerfYear
            this.props.chartStoreGrowth.isPerfYear = !this.props.chartStoreGrowth.isPerfYear
            this.props.chartStoreDaily.isPerfYear = !this.props.chartStoreDaily.isPerfYear
            this.props.chartStoreSocial.isPerfYear = !this.props.chartStoreSocial.isPerfYear
        }
    }
    handleClickToUp = () => {
        // console.log(window.innerWidth)
        // var thisWindowWidth = window.innerWidth
        // window.location.reload()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // this.setState({
        //     thisWindowWidth,
        // })
    }
    handleDataUpdate = () =>{
        // this.apiDataUpdate()
        this.props.chartStoreGrowth.fetchGrowthTableData()
        this.props.chartStoreAbo.fetchAboPinPopData()
    }
    // onClickEditDashboard() {
    //     this.dashboardRef.onClickEditDashboard()
    // }

    //每一页的标题
    //     <div className="page-title">
    //     <div className="container-fluid">
    //         <div className="row align-items-center headerTitle">
    //             <div className="col-md-4">
    //                 <h2 className="main-subtitle">Overview</h2>
    //                 <h1 className="main-title">{this.selectedTab}</h1>
    //             </div>

    //             {/* <div className="col-md-5">
    //         <div className='custom-control custom-switch perf-switch-wrap'>
    //             <label className='perf-lbl' htmlFor='perfYearSwitcher'>
    //             See as Performance Year
    //             </label>
    //             <input
    //             type='checkbox'
    //             className='custom-control-input'
    //             id='perfYearSwitcher'
    //             checked={this.isPerfYear}
    //             onChange={this.handleSwitchChange()}
    //             readOnly
    //             />
    //             <label className='custom-control-label' htmlFor='perfYearSwitcher'>
    //             Calendar Year
    //             </label>
    //         </div>
    //     </div> */}

    //             <div className="col-md-3">
    //                 <div className="page-title-btn-wrap">



    //                     {/* <a href="javascript:void(0)" className="btn btn-outline-grey btn-rounded btn-sm">
    //                 Rolling 12 months <i className="far fa-calendar text-blue ml-2"></i>
    //             </a> */}
    //                     {/* <a href="javascript:void(0)" className="btn btn-outline-blue btn-rounded btn-sm">
    //                 <i className="fas fa-filter"></i> Filters <span className="btn-label ml-2">2</span>
    //             </a> */}
    //                     {/* <a href="javascript:void(0)" className="btn btn-outline-green btn-rounded btn-sm"
    //             onClick={this.onClickEditDashboard}>
    //                 <i className="far fa-edit"></i> Customize Dashboard
    //             </a> */}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    render() {
        const authStore = this.props.authStore
        const fivePageDateUp = this.props.chartStoreDaily.queryDailySalesLineHandle.pageUpShowDate//第五屏的时间显示
        // console.log('AUTH STORE IN RENDER', authStore, authStore.isAuthenticated)

        // TODO: temporary add auto login
        // const isAutoAuth = true
        // if (authStore.currentUser) {
        //     // redirect to users list
        //     return <Redirect to={routes.users} />
        // }


        // if (!authStore.currentUser) {
        //     // redirect to users list
        //     return <div className="ut__home">
        //         <section className="ut__btn-group">
        //             <Link className="ut__button" to={routes.login}>Sign in</Link>
        //             <Link className="ut__button" to={routes.sign_up}>Sign up!</Link>
        //         </section>
        //     </div>
        // }
        var { thisWindowWidth } = this.state
        return <div className="dashboard-wrap">
            {authStore.isAuthenticated &&
                <React.Fragment>
                    <div className="container-fluid">
                        {/* <div className="col-md-5" style={{ position: 'fixed', left: '88%', zIndex: '11' }}>
                            <div className='custom-control custom-switch perf-switch-wrap'>
                                <label className='perf-lbl' htmlFor='perfYearSwitcher'>
                                    PF
                                                        </label>
                                <input
                                    type='checkbox'
                                    className='custom-control-input'
                                    id='perfYearSwitcher'
                                    checked={this.isPerfYear}
                                    onChange={this.handleSwitchChange()}
                                    readOnly
                                />
                                <label className='custom-control-label' htmlFor='perfYearSwitcher'>
                                    CY
                                                        </label>
                            </div>
                        </div> */}
                        <div className="page-title bigTatie" id="topTatilShow">
                            <h1 className="main-title">{this.selectedTab}</h1>
                            {
                                this.selectedTab === "AGP KPI" ? "" : this.selectedTab === "Daily Report" ? <div style={{ marginRight: "11%", lineHeight: "30px" }}>{fivePageDateUp}</div> : <div className='custom-control custom-switch perf-switch-wrap' style={{ marginRight: "11%" }}>
                                    <label className='perf-lbl' htmlFor='perfYearSwitcher'>
                                        Performance Year
                                </label>
                                    <input
                                        type='checkbox'
                                        className='custom-control-input'
                                        id='perfYearSwitcher'
                                        checked={this.isPerfYear}
                                        onChange={this.handleSwitchChange()}
                                        readOnly
                                    />
                                    <label className='custom-control-label' htmlFor='perfYearSwitcher'>
                                        Calendar Year
                                </label>
                                </div>
                            }
                        </div>
                        <div className="main-navigation">
                            <Tabs activeKey={this.selectedTab} onSelect={k => this.selectedTab = k} onClick={this.handleClickToUp.bind(this)}>
                                {/* <Tab eventKey="Home" title={<div><i className="fas fa-home"></i>Home</div>}>
                            <HomeContainer />
                        </Tab> */}
                                <Tab eventKey="Sales Performance" title={<div><i className="fas fa-dollar-sign"></i>Sales Performance</div>}>
                                    {/* <div className="page-title bigTatie" id="topTatilShow">
                                        <div className="container-fluid">
                                            <div className="row align-items-center headerTitle">
                                                <div className="col-md-4">
                                                    <h2 className="main-subtitle">Overview</h2>
                                                    <h1 className="main-title">{this.selectedTab}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <SalesPerformanceContainer thisWindowWidth={thisWindowWidth} />
                                </Tab>
                                <Tab eventKey="AGP KPI" title={<div><i className="fas fa-chart-bar"></i>AGP KPI</div>}>
                                    <GrowthContainer />
                                </Tab>
                                <Tab eventKey="ABO Momentum and Goal Tracking" title={<div><i className="fas fa-dollar-sign"></i>ABO Momentum & Goal Tracking</div>}>
                                    <AboDynamicsContainer />
                                </Tab>
                                {/* <Tab eventKey="ABO Leader Dynamics" title={<div><i className="fas fa-home"></i>ABO Leader Dynamics</div>}>
                            <AboLeaderContainer/>
                        </Tab> */}
                                <Tab eventKey="Customer Dynamics" title={<div><i className="fas fa-home"></i>Customer Dynamics</div>}>
                                    <SocialPromContainer />
                                </Tab>
                                <Tab eventKey="Daily Report" title={<div><i className="fas fa-home"></i>Daily Report</div>}>
                                    <DailyReportContainer />
                                    {/* <CardsLayout onRef={ref => (this.dashboardRef = ref)}/> */}
                                </Tab>
                                {/* <Tab style={{}} className="aaaa"  title={<div onClick={this.handleDataUpdate.bind(this)}><i className="fa fa-retweet" aria-hidden="true"></i></div>}>

                                </Tab> */}
                                
                            </Tabs>

                        </div>
                    </div>
                </React.Fragment>
            }
        </div>
    }

}

export default Home
