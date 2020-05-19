//GrowthContainer第二屏
import React, { Component, Fragment } from 'react'
import * as hlp from '../components/Helper'


export default class GrowthTable extends Component {
    constructor() {
        super();
        this.state = {
            allData: {},
            data: [],
            maxMonthStr: '',
            maxYear: '',
            maxTargCalYear: '',
            displayFlag: false,
        }
    }
    render() {
        var { allData, data, maxMonthStr, maxYear, maxTargCalYear, displayFlag } = this.state
        return (
            <Fragment>
                <div style={{ position: "relative" }}>
                    <div style={{ paddingLeft: '1%', paddingRight: '1%' }}>
                        <div style={{ height: '58px', display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ fontSize: "14px", lineHeight: '58px', margin: '0', fontWeight: '700' }}>Shape of the Business (By Calendar Year)</h3>
                            <div className="kpitanShow" onClick={this.displayShowClose.bind(this)}></div>
                            {/* <div style={{ fontSize: "12px", lineHeight: '58px' }}>As of {maxMonthStr}</div> */}
                        </div>
                        <div style={{ color: "#5b9ae9", fontWeight: '700' }}>
                            <p style={{ margin: 0, marginBottom: "4px" }}>Registered Customers & Customer Equivalents Sales Share</p>
                            <p style={{ margin: 0, marginBottom: "4px" }}>{maxTargCalYear} Target Range:  {Math.round(allData.minTargetSalPct * 100)}% - {Math.round(allData.maxTargetSalPct * 100)}%</p>
                            <p style={{ margin: 0, marginBottom: "4px" }}>{maxYear} YTD Actual:  {Math.round(allData.monthAvg2Rows * 100)}%</p>
                        </div>
                    </div>
                    {/* 弹框内容 */}
                    {
                        displayFlag ? <div className="kpiAgpDisplayFlag">
                            <div className="rightClose" onClick={this.displayShowClose.bind(this)}>X</div>
                            <h5>Definition</h5>
                            <div><span>Registered Customers (Previously “Customers”): </span>Registered with Amway but not eligible to earn Amway incentives (PB, CSI, or other bonus)</div>
                            <div><span>Customer Equivalents (Previously “ABO Purchase Only”): </span>Demonstrate purchase-only behavior. Eligible to earn Amway Incentives (PB, CSI) or equivalent award but has not sponsored, or earned a PB, or earned CSI. May include buyers registered as ABOs in markets where a customer category is not present</div>
                            <div><span>Developing ABO: </span>An ABO that sponsored, or earned a PB, or earned CSI, but has not achieved 9%</div>
                            <div><span>Building ABO: </span>An ABO that has achieved 9% but has not achieved Platinum qualification.</div>
                            <div><span>ABO Leader: </span>An ABO that is Platinum or above.</div>
                            {/* <div><span>Segmentation Development: </span>
                                <p>- Monthly counts/sales by segment represent reporting month only. If an active IMC does not make a purchase in a given month, they will not be counted (with the exception of Leaders).</p>
                                <p>- Can only be "new" in a segment 1 time for 1 month within a 5-year rolling timeline. All other instances will be reported under "existing".</p>
                                <p>- If a buyer is to skip a segment, they cannot fall back and be reported as 1st Time in Segment (or "new").</p>
                                <p>- Example: A buyer moves from ABO Purch Only to Builder, skipping Developing. If they fall back to 6% the next month, they will be considered "Existing“ within the Developing segment.</p>
                            </div> */}
                        </div> : ""
                    }
                    {/* 表格 */}
                    <div style={{ marginLeft: '1%', marginRight: '1%',width: '98%', border: "10px solid #5198ee" }}>
                        <table width="100%" border="0" border-collapse="collapse" cellSpacing="0" cellPadding="0" style={{ textAlign: "center", fontSize: "12px", wordBreak: 'break-all' }}>
                            {/* <thead>
                                <tr>
                                    <th rowSpan="2" style={{ height: "50px", border: "1px solid #e5e6e9" }}>Segment</th>
                                    <th colSpan="3" style={{ height: "50px", border: "1px solid #e5e6e9" }}>Number Purchasing</th>
                                    <th rowSpan="2" style={{ height: "50px", border: "1px solid #e5e6e9" }}>Productivity</th>
                                    <th colSpan="2" style={{ height: "50px", border: "1px solid #e5e6e9" }}>Total</th>
                                </tr>
                                <tr>
                                    <th style={{ height: "50px", border: "1px solid #e5e6e9" }}>First Time Buyer</th>
                                    <th style={{ height: "50px", border: "1px solid #e5e6e9" }}>Existing Buyer</th>
                                    <th style={{ height: "50px", border: "1px solid #e5e6e9" }}>Total Buyer</th>
                                    <th style={{ height: "50px", border: "1px solid #e5e6e9" }}>YTD Monthly Average</th>
                                    <th style={{ height: "50px", border: "1px solid #e5e6e9" }}>YTD vs LY</th>
                                </tr>
                            </thead> */}
                            <thead>
                                <tr>
                                    <th rowSpan="2" style={{ height: "70px", border: "1px solid #e5e6e9" }} className="twoSegmentLine">
                                        <div style={{ position: 'absolute', top: "10px", left: "8px" }}>Segment</div>
                                        <div style={{ position: 'absolute', top: "44px", left: "75px" }}>Mthly Avg</div>
                                    </th>
                                    <th rowSpan="2" style={{ height: "70px", border: "1px solid #e5e6e9" }}>Buyer Count</th>
                                    <th rowSpan="2" style={{ height: "70px", border: "1px solid #e5e6e9" }}>Productivity</th>
                                    <th colSpan="2" style={{ height: "35px", border: "1px solid #e5e6e9" }}>Sales</th>
                                    <th colSpan="2" style={{ height: "35px", border: "1px solid #e5e6e9" }}>% of Total</th>
                                </tr>
                                <tr>
                                    <th style={{ height: "35px", border: "1px solid #e5e6e9" }}>YTD</th>
                                    <th style={{ height: "35px", border: "1px solid #e5e6e9" }}>vs SPLY</th>
                                    <th style={{ height: "35px", border: "1px solid #e5e6e9" }}>YTD</th>
                                    <th style={{ height: "35px", border: "1px solid #e5e6e9" }}>vs SPLY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => {
                                        return index !== 2 ? <tr key={index} style={{ fontWeight: index == 6 ? "700" : "500" }}>
                                            <td style={{ width: "140px", height: "35px", border: "1px solid #e5e6e9", fontWeight: "700", textAlign: " left", paddingLeft: "4px", lineHeight: "22px" }}>{item.segment_desc == 'Customer' ? 'Registered Customers' : item.segment_desc == 'ABO (Purchasing Only)' ? 'Customer Equivalents' : item.segment_desc}</td>
                                            {/* <td style={{ height: "50px", border: "1px solid #e5e6e9" }}>{(item.first_time_buyer_population ? `${hlp.numberWithCommas(item.first_time_buyer_population)} (${Math.round(item.pct_first_time_buyer_population * 100)}%)` : '')}</td>
                                            <td style={{ height: "50px", border: "1px solid #e5e6e9" }}>{hlp.numberWithCommas(item.existing_buyer_population)} ({Math.round(item.pct_existing_buyer_population * 100)}%)</td> */}
                                            <td style={{ height: "35px", border: "1px solid #e5e6e9" }}>{hlp.numberWithCommas(Math.round((item.total_buyer_population / 1000)))}k ({Math.round(item.pct_total_buyer_population * 100)}%)</td>
                                            <td style={{ height: "35px", border: "1px solid #e5e6e9",}}>${Math.round(item.productivity)}</td>
                                            <td style={{ height: "35px", border: "1px solid #e5e6e9", fontWeight: "700" }}>${`${hlp.toShortMil(item.actual_sales)}m`}</td>
                                            <td style={{height: "35px", border: "1px solid #e5e6e9", color: item.yoy_sales[0] == "+" ? "#16b6aa" : "#ff0000" }}>{item.yoy_sales}</td>
                                            <td style={{ height: "35px", border: "1px solid #e5e6e9", fontWeight: "700" }}><span style={{ color: index <= 1 ? "#5198ee" : "" }}>{Math.round(item.pct_actual_sales * 100)}{Math.round(item.pct_actual_sales * 100) >= 10 ? "" : "  "}%</span></td>
                                            <td style={{height: "35px", border: "1px solid #e5e6e9",}}><span style={{ color: "#16b6aa" }}>{item.isTotal ? '' : `${item.yoy_pct_sales}`}</span></td>
                                        </tr> : <tr key={index}></tr>
                                    })
                                }
                                {/* <tr>
                                    <td style={{ height: "50px", border: "1px solid #e5e6e9" }}>Customer</td>
                                    <td>251,191 (26%)</td>
                                    <td>111</td>
                                    <td>111</td>
                                    <td>111</td>
                                    <td>111</td>
                                    <td>111</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                </div>
            </Fragment>
        )
    }
    componentDidMount() {
        const allData = this.props.data || {}
        const data = allData.tableData || []
        console.log(allData, "第二页面的表格allData")

        const maxMonthStr = String(hlp.yearMonthToStr(allData.maxMonth))
        const maxYear = String(allData.maxYear)
        const maxTargCalYear = String(allData.maxTargCalYear)
        this.setState({
            allData,
            data,
            maxMonthStr,
            maxYear,
            maxTargCalYear,
        })

    }
    // 弹窗事件
    displayShowClose() {
        var { displayFlag } = this.state
        displayFlag = !displayFlag
        this.setState({
            displayFlag,
        })
    }
}