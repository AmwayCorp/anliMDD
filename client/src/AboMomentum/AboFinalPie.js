import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'
import echarts from 'echarts';

export default class AboFinalPie extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            chartData: {},
        }
    }
    render() {
        var { title, chartData } = this.state
        return (
            <Fragment>
                <div style={{ position: "absolute", left: ' 2%', top: '4%', fontSize: '14px', fontWeight: '600' }}>{title}</div>
                <div style={{ width: "100%", height: "350px", marginTop: "50px" }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px" }}>
                        <div style={{ width: "50%" }}>
                            <div style={{ fontWeight: "600" }}>Total FAA Bonus</div>
                            <div>{chartData.total_tracking_faa} ships</div>
                        </div>
                        <div style={{ width: "50%" }}>
                            <div style={{ fontWeight: "600" }}>Total EDC & up</div>
                            <div>{chartData.num_est_edc_up} ships</div>
                        </div>
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", fontSize: "14px", lineHeight: "32px", marginTop: "15px" }}>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#61d8c5" }}>Tracking New FAA Bonus</div>
                            <div>{chartData.num_tracking_new_faa} ships</div>
                        </div>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#81b1ef" }}>Tracking Old FAA Bonus</div>
                            <div>{chartData.num_tracking_old_faa} ships</div>
                        </div>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#f4ec67" }}>by GAR</div>
                            <div>{chartData.num_by_gar} ships</div>
                        </div>
                        <div style={{ width: "25%" }}>
                            <div style={{ fontWeight: "600", color: "#fbb671" }}>by Original Plan</div>
                            <div>{chartData.num_by_orig_plan} ships</div>
                        </div>
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', textAlign: "center", marginTop: "15px", height: "190px",color:"#ffffff",fontSize:"16px" }}>
                        <div id="pieAboFinalAllLeft" style={{ width: "50%", position: "relative", }}>
                            <div id="pieAboFinalLeft" style={{ position: "absolute",textAlign: "left", height: "90px", borderRadius: "50%", background: "rgba(100, 218, 194,0.8)" }}>{chartData.num_tracking_new_faa_only}</div>
                            <div id="pieAboFinalRight" style={{ position: "absolute",textAlign: "right", height: "90px", borderRadius: "50%", background: "rgba(129, 179, 248,0.8)" }}>{chartData.num_tracking_old_faa_only}</div>
                            <div id="pieAboFinalCenter" style={{ position: "absolute", top: "45px",textAlign: "center", width: "90px", height: "90px",lineHeight:"90px", borderRadius: "50%", background: "rgba(86, 167, 230,0.5)" }}>{chartData.num_new_old_faa}</div>
                        </div>
                        <div style={{ width: "50%", position: "relative", }}>
                            <div id="pieAboFinalLeft2" style={{ position: "absolute",textAlign: "left", height: "90px", borderRadius: "50%", background: "rgba(248, 231, 101,0.8)" }}>{chartData.num_by_gar_only}</div>
                            <div id="pieAboFinalRight2" style={{ position: "absolute",textAlign: "right", height: "90px", borderRadius: "50%", background: "rgba(255, 183, 111,0.8)" }}>{chartData.num_by_orig_plan_only}</div>
                            <div id="pieAboFinalCenter2" style={{ position: "absolute", top: "45px",textAlign: "center", width: "90px", height: "90px",lineHeight:"90px", borderRadius: "50%", background: 'rgba(255, 177, 69, 0.5)' }}>{chartData.num_gar_orig_plan}</div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
    componentDidMount() {
        var data = this.props.data;
        // console.log(data)
        var chartData = data.length && data[0]
        var title = this.props.titleData && this.props.titleData['gar_title']

        // var pieAboFinalAllLeft = document.getElementById("pieAboFinalAllLeft")
        var pieAboFinalLeft = document.getElementById("pieAboFinalLeft")
        var pieAboFinalRight = document.getElementById("pieAboFinalRight")
        var pieAboFinalCenter = document.getElementById("pieAboFinalCenter")
        var pieAboFinalLeftWidth = window.innerWidth * 0.25
        pieAboFinalLeft.style.width = (90 + chartData.num_tracking_new_faa_only) + "px"
        pieAboFinalLeft.style.lineHeight = (90 + chartData.num_tracking_new_faa_only) + "px"
        pieAboFinalLeft.style.height = (90 + chartData.num_tracking_new_faa_only) + "px"
        pieAboFinalLeft.style.top = (45 - (chartData.num_tracking_new_faa_only / 2)) + "px"
        pieAboFinalCenter.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        pieAboFinalLeft.style.left = ((pieAboFinalLeftWidth * 0.4) - chartData.num_tracking_new_faa_only) + "px"
        pieAboFinalRight.style.width = (90 + chartData.num_tracking_old_faa_only) + "px"
        pieAboFinalRight.style.lineHeight = (90 + chartData.num_tracking_old_faa_only) + "px"
        pieAboFinalRight.style.height = (90 + chartData.num_tracking_old_faa_only) + "px"
        pieAboFinalRight.style.top = (45 - (chartData.num_tracking_old_faa_only / 2)) + "px"
        pieAboFinalRight.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        var pieAboFinalLeft2 = document.getElementById("pieAboFinalLeft2")
        var pieAboFinalRight2 = document.getElementById("pieAboFinalRight2")
        var pieAboFinalCenter2 = document.getElementById("pieAboFinalCenter2")
        pieAboFinalCenter2.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        pieAboFinalLeft2.style.width = (90 + chartData.num_by_gar_only) + "px"
        pieAboFinalLeft2.style.lineHeight = (90 + chartData.num_by_gar_only) + "px"
        pieAboFinalLeft2.style.height = (90 + chartData.num_by_gar_only) + "px"
        pieAboFinalLeft2.style.top = (45 - (chartData.num_by_gar_only / 2)) + "px"
        pieAboFinalLeft2.style.left = ((pieAboFinalLeftWidth * 0.4) - chartData.num_by_gar_only) + "px"
        pieAboFinalRight2.style.width = (90 + chartData.num_by_orig_plan_only) + "px"
        pieAboFinalRight2.style.lineHeight = (90 + chartData.num_by_orig_plan_only) + "px"
        pieAboFinalRight2.style.height = (90 + chartData.num_by_orig_plan_only) + "px"
        pieAboFinalRight2.style.top = (45 - (chartData.num_by_orig_plan_only / 2)) + "px"
        pieAboFinalRight2.style.left = (pieAboFinalLeftWidth * 0.4) + "px"
        this.setState({
            title, chartData
        })
    }
}