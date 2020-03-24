import React from 'react'

import { inject, observer } from 'mobx-react'

import { VictoryChart, VictoryScatter, Flyout, VictoryStack, VictoryLegend, VictoryVoronoiContainer, VictoryTooltip, VictoryBar, VictoryAxis, VictoryGroup} from "victory"

// import * as numeral from 'numeral'
import _ from 'lodash'

import * as hlp from './Helper'
//import TooltipEarnSegment from './TooltipEarnSegment';


const BarSocialEarnSeg = observer((props) => {

  if (!props.data) {
    return false
  }
  const chartData = props.data || {}

  //const dataPropName = props.dataPropName

//  const chartDataBar = chartData[dataPropName]

  const bar1 = chartData['abo_lead_data'],
    bar2 = chartData['abo_dev_data'],
    bar3 = chartData['abo_build_data']

  const maxYearStr = String( chartData.maxYear )


//  const needFormatThous = !!props.formatThous

  const COLOR_SCALE = [ "#03305D","#53C95C", "#E91E4F"]
  const BAR_WIDTH = 20
  const tickValues = chartData.isPerfYear ? hlp.PERFORMANCE_YEAR_MONTHS : hlp.CALENDAR_YEAR_MONTHS

  return   <div>

      <div className="main-block">
              <label className="st-card-tl-sm">{props.title}</label>

              <VictoryChart width={700} height={300} 
                theme={hlp.smallChartTheme}
                domainPadding={{x: [20, 0], y: 50}} 
                padding={{left: 60, top: 5, right: 45, bottom: 60}}

                containerComponent={
                  <VictoryVoronoiContainer voronoiDimension="x"
                    labels={({ datum }) => {
                      return datum.labelTooltip
                    }}

                    labelComponent={<VictoryTooltip centerOffset={{ y: -60 }} cornerRadius={0} flyoutStyle={{fill: "#B0C9F4"}}/>}
//                    labelComponent={<TooltipEarnSegment data={chartData.tooltip_data}/>}
             

                  />
                }>

                <VictoryLegend x={65} y={270}

                  orientation="horizontal"
                  gutter={15}
                  style={{ border: { stroke: "none" }, labels: { fontSize: 16, paddingRight: 15 } }}
                  colorScale={COLOR_SCALE}
                  data={[
                    { name: `${maxYearStr} Developing ABO`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} Building ABO`, symbol: {type: 'square'} },
                    { name: `${maxYearStr} ABO Leader`, symbol: {type: 'square'} }
                  ]}
                />


                {/* <VictoryScatter 
                  data={chartData.monthsData}          
                  style={{
                    data: {
                      fill:"none",
                      stroke: "none"
                    },
                    labels: {
                      fill: "#1F486F",
                      fontWeight: 'bold'
                    }
                  }}
                /> */}

                  <VictoryStack colorScale={COLOR_SCALE}>
                      <VictoryBar barWidth={BAR_WIDTH}
                        data={bar1}
                        style={{
                          labels: {fill: COLOR_SCALE[0]}}
                        }

                      />
                      <VictoryBar barWidth={BAR_WIDTH}
                        data={bar2}
                        style={{
                          labels: {fill: COLOR_SCALE[1]}}
                        }

                      />
                      <VictoryBar barWidth={BAR_WIDTH}
                        data={bar3}
                        style={{
                          labels: {fill: COLOR_SCALE[2]}}
                        }

                      />

                  </VictoryStack>



                  <VictoryAxis
                    dependentAxis
                    //tickFormat={(t) => hlp.numberWithCommas( t ) }
                    style={{ grid: {
                        stroke: "none",
                      },
                      axis: {
                        stroke: "none"
                      }
                    }}
                    // Re-scale ticks by multiplying by correct maxima
                    tickFormat={(t) => hlp.toShortThous(t)+'k' }

                  />


                  <VictoryAxis crossAxis
                    style={{ grid: {
                      stroke: "none"
                    },
                    axis: {
                      stroke: "none",
                    }}}
                    offsetY={60}
                    tickValues={tickValues}
                  />

              </VictoryChart>



          </div>
  </div>
})

export default BarSocialEarnSeg
