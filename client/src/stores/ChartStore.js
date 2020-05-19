import { observable, computed, action, runInAction, toJS } from 'mobx'
import ApiService from '../services/ApiService'
import * as jslinq from 'jslinq'
import * as hlp from '../components/Helper'
import _ from 'lodash'

const MONTHS_MAP = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const MONTHS_MAP_F = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }
const MAXYEARSHOW = new Date().getFullYear()
class ChartStore {
  @observable isLoading = true
  @observable isFailure = false
  @observable isPerfYear = false
  @observable performanceData1 = []
  @observable performanceData2 = []
  @observable performanceData3 = []
  @observable performanceData2Tooltip = []
  @observable performanceData2Com = []

  @action async fetchPerformanceData1(params) {
    try {
      const data = await ApiService.get_performance_data1(params)
      runInAction(() => {
        this.isLoading = false
        this.performanceData1 = JSON.parse(data)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.performanceData1 = []
      })
    }
  }

  @action async fetchPerformanceData2(params) {
    try {
      const data = await ApiService.get_performance_data2(params)
      runInAction(() => {
        this.isLoading = false
        this.performanceData2 = JSON.parse(data)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.performanceData2 = []
      })
    }
  }

  @action async fetchPerformanceData2Tooltip(params) {
    try {
      const data = await ApiService.get_performance_data2_tt(params)
      runInAction(() => {
        this.isLoading = false
        this.performanceData2Tooltip = JSON.parse(data)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.performanceData2Tooltip = []
      })
    }
  }

  @action async fetchPerformanceData3(params) {
    try {
      const data = await ApiService.get_performance_data3(params)
      runInAction(() => {
        this.isLoading = false
        this.performanceData3 = JSON.parse(data)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.performanceData3 = []
      })
    }
  }

  @action async fetchPerformanceData2Com(params) {
    try {
      const data = await ApiService.get_performance_data2_com(params)
      runInAction(() => {
        this.isLoading = false
        this.performanceData2Com = JSON.parse(data)
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.performanceData2Com = []
      })
    }
  }

  calcTotalSalesTable() {
    const jsArr = toJS(this.performanceData1) || []
    if (!jsArr.length) {
      return false
    }

    let maxMonthStr
    if (jsArr.length) {
      maxMonthStr = jsArr[0].max_month
    }

    let queryObj = jslinq(jsArr)

    let dataState = queryObj
      .groupBy(function (el) {
        return el.perf_yr;
      })
      .toList()

    const maxYear = jslinq(dataState)
      .max((el) => {
        return parseInt(el['key']);
      });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataState = dataState[maxYear].concat()

    const MONTH_TYPE = 'nth_month_of_perf_yr'

    // get max month of a current year
    const maxMonth = jslinq(dataState)
      .max((el) => {
        return el[MONTH_TYPE];
      });

    dataState = _.filter(dataState, (o) => {
      return o.nth_month_of_perf_yr === maxMonth
    })

    dataState = jslinq(dataState).groupBy(function (el) {
      return el.fc_name;
    })
      .toList()

    dataState = _.map(dataState, (o) => {
      o.total_sales_sum = jslinq(o.elements).sum(function (el) {
        return el.total_sales || 0;
      })
      o.total_sales_ly_sum = jslinq(o.elements).sum(function (el) {
        return el.total_sales_ly || 0;
      })
      return o
    })

    dataState = jslinq(dataState).orderByDescending(function (el) {
      return el.total_sales_sum;
    })
      .toList();

    const totalSumAllRegions = jslinq(dataState).sum(function (el) {
      return el.total_sales_sum;
    });

    dataState = _.map(dataState, (o) => {
      o.perc_of_total_sales = Math.round((o.total_sales_sum / totalSumAllRegions) * 1000) / 10 + ' %'
      let sales_vs_sply_res = Math.round((o.total_sales_sum / o.total_sales_ly_sum - 1) * 1000) / 10
      o.sales_vs_sply = sales_vs_sply_res !== Infinity ? `${sales_vs_sply_res} %` : 'no data'
      o.sales_vs_sply_cur = o.total_sales_sum - o.total_sales_ly_sum
      return o
    })

    dataState = _.map(dataState, (o) => {
      return {
        fc_group: o.key,
        total_sales_sum: o.total_sales_sum,
        perc_of_total_sales: o.perc_of_total_sales,
        sales_vs_sply: o.sales_vs_sply,
        sales_vs_sply_cur: o.sales_vs_sply_cur
      }
    })
    // force AMWAY fc group as last item
    const amwInd = _.findIndex(dataState, { 'fc_group': 'AMWAY' })
    let amwObj
    if (amwInd !== -1) {
      amwObj = dataState.splice(amwInd, 1)[0]
      dataState.push(amwObj)
    }

    return {
      data: dataState,
      maxMonth: maxMonthStr
    }
  }

  calcTotalSalesCityClusterTable() {
    const jsArr = toJS(this.performanceData3) || []
    if (!jsArr.length) {
      return false
    }
    // always calendar year
    const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'// this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    let queryObj = jslinq(jsArr)

    let maxMonthStr
    if (jsArr.length) {
      maxMonthStr = jsArr[0].max_month
    }

    let dataState = queryObj
      .groupBy(function (el) {
        return el[YEAR_TYPE];
      })
      .toList()

    const maxYear = jslinq(dataState)
      .max((el) => {
        return parseInt(el['key']);
      });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    queryObj = jslinq(dataState[maxYear].concat())

    dataState = queryObj.groupBy(function (el) {
      return el.city_cluster;
    })
      .toList()

    dataState = _.map(dataState, (o) => {
      o.actual_sales_sum = jslinq(o.elements).sum(function (el) {
        return el.actual_sales;
      })
      o.actual_sales_ly_sum = jslinq(o.elements).sum(function (el) {
        return el.actual_sales_ly || 0;
      })
      return o
    })

    dataState = jslinq(dataState).orderByDescending(function (el) {
      return el.actual_sales_sum;
    })
      .toList();

    // caluclate total sum

    const actualSumAllRegions = jslinq(dataState).sum(function (el) {
      return el.actual_sales_sum;
    });

    dataState = _.map(dataState, (o) => {
      o.perc_of_actual_sales = Math.round((o.actual_sales_sum / actualSumAllRegions) * 1000) / 10 + ' %'
      o.sales_vs_sply = Math.round((o.actual_sales_sum / o.actual_sales_ly_sum - 1) * 1000) / 10 + ' %'
      // !? TODO: Do we need this data for the waterfall chart as well ?
      //  o.sales_vs_sply_cur = o.actual_sales_sum - o.actual_sales_ly_sum
      return o
    })

    dataState = _.map(dataState, (o) => {
      return {
        city_cluster: o.key,
        actual_sales_sum: o.actual_sales_sum,
        perc_of_actual_sales: o.perc_of_actual_sales,
        sales_vs_sply: o.sales_vs_sply,
        maxYear: maxYear
      }
    })
    return {
      data: dataState,
      maxMonth: maxMonthStr,
      isPerfYear: this.isPerfYear
    }
  }

  @computed get totalSales() {
    return this.calcTotalSalesTable()
  }

  @computed get totalSalesCityCluster() {
    return this.calcTotalSalesCityClusterTable()
  }

  @computed get waterfallChartData() {
    const allData = this.calcTotalSalesTable()
    let waterfallData = allData.data
    waterfallData = _.map(waterfallData, (o) => {
      return {
        x: o.fc_group,
        val: o.sales_vs_sply_cur
      }
    })
    waterfallData = jslinq(waterfallData).orderByDescending(function (el) {
      return el.val;
    })
      .toList();


    if (waterfallData.length > 0) {
      waterfallData[0].open = 0
      waterfallData[0].close = waterfallData[0].val
    }

    let count
    for (count = 1; count < waterfallData.length; count++) {
      waterfallData[count].open = waterfallData[count - 1].close
      waterfallData[count].close = waterfallData[count].open + waterfallData[count].val
    }

    // push last item - TOTAL
    if (waterfallData.length > 0) {
      let lastVal = waterfallData[waterfallData.length - 1].close
      let lastObj = {
        x: 'Total',
        val: lastVal
      }
      if (lastVal > 0) {
        lastObj.open = lastVal
        lastObj.close = 0
      } else {
        lastObj.close = lastVal
        lastObj.open = 0
      }

      waterfallData.push(lastObj)
    }

    waterfallData = _.map(waterfallData, (o) => {

      if (o.open > o.close) {
        o.high = o.open
        o.low = o.close
      } else {
        o.high = o.close
        o.low = o.open
      }

      return o
    })

    return {
      data: waterfallData,
      maxMonth: allData.maxMonth
    }
  }

  @computed get totalSalesLineYear() {

    if (!(this.performanceData2.length && this.performanceData2Tooltip.length)) {
      return false
    }

    // prepare tooltip data map
    // const monthToInfoMap = _.reduce(this.performanceData2Tooltip, (obj,param)=>{
    //   obj[param.n_month] = param.promotion_desc
    //   return obj;
    // }, {});

    let monthToInfoMap = {}
    _.each(this.performanceData2Tooltip, (o) => {
      if (!monthToInfoMap[o.n_month]) {
        monthToInfoMap[o.n_month] = []
      }
      monthToInfoMap[o.n_month].push(o.promotion_desc)
    })

    //prepare axis data
    const jsArr = toJS(this.performanceData2) || []
    if (!jsArr.length) {
      return false
    }


    const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    let queryObj = jslinq(jsArr)

    let dataState = queryObj
      .groupBy(function (el) {
        return el[YEAR_TYPE];
      })
      .toList()
    const maxYear = MAXYEARSHOW ? MAXYEARSHOW : jslinq(dataState)
      .max((el) => {
        return parseInt(el['key']);
      });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    // if we have only one month data, we should display all 12 months always

    // const needOneMoreMonth = dataState[maxYear].length === 1
    // let prevYearData
    // if ( dataState[ maxYear-1 ] ) {
    //   prevYearData = jslinq( dataState[maxYear-1].concat() )
    // }
    dataState = dataState[maxYear].concat()

    //原版
    // dataState = jslinq( dataState[maxYear].concat() )
    // dataState = dataState.groupBy(function(el){
    //   return el.month;
    // })
    // .toList()
    // dataState = _.map( dataState, (o) => {
    //   o.actual_sales_sum = jslinq( o.elements ).sum(function(el){
    //       return el.actual_sales || 0;
    //   })
    //   o.target_sales_sum = jslinq( o.elements ).sum(function(el){
    //       return el.target_sales || 0;
    //   })
    //   o.actual_sales_ly_sum = jslinq( o.elements ).sum(function(el){
    //       return el.actual_sales_ly || 0
    //   })
    //   return o
    // } )

    let tooltip_data_map = {}

    let actual_sales_data = _.map(dataState, (o) => {

      tooltip_data_map[MONTHS_MAP[o.month]] = {
        monthName: hlp.yearMonthToStrFull(o.n_month),
        actual_sales: o.actual_sales && `$${hlp.toShortMil(o.actual_sales)}m`,
        actual_sales_ly: o.actual_sales_ly && `$${hlp.toShortMil(o.actual_sales_ly)}m`,
        sales_forecast: o.revenue_forecast_usd && `$${hlp.toShortMil(o.revenue_forecast_usd)}m`,
        events: monthToInfoMap[o.n_month]
      }

      return {
        // x: MONTHS_MAP[o.key],
        // y: o.actual_sales_sum,
        x: MONTHS_MAP[o.month],
        y: o.actual_sales || null,
        labelTooltip: 'YTD Sales'
      }
    })

    // 原本的forecast数据
    // const target_sales_data = _.map( dataState, (o) => {
    //   return {
    //     // x: MONTHS_MAP[o.month],
    //     // y: o.target_sales_sum,
    //     x: MONTHS_MAP[o.month],
    //     y: o.revenue_forecast_usd || null,
    //     labelTooltip: 'Planned Target'
    //   }
    // } )

    const actual_sales_ly_data = _.map(dataState, (o) => {
      return {
        // x: MONTHS_MAP[o.month],
        // y: o.actual_sales_ly_sum,
        x: MONTHS_MAP[o.month],
        y: o.actual_sales_ly || null,
        labelTooltip: `${maxYear - 1} Sales`
      }
    })

    const target_sales_data = _.map(dataState, (o) => {
      return {
        // x: MONTHS_MAP[o.month],
        // y: o.actual_sales_ly_sum,
        x: MONTHS_MAP[o.month],
        y: o.target_sales || null,
        labelTooltip: 'target_sales'
      }
    })

    const padNumber = (d) => {
      return (d < 10) ? '0' + d.toString() : d.toString()
    }

    const LETTERS_PER_LINE = 12

    const addNewlines = (str) => {
      var result = '';
      while (str.length > 0) {
        result += str.substring(0, LETTERS_PER_LINE) + '\n';
        str = str.substring(LETTERS_PER_LINE);
      }
      return result;
    }

    const months_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: 0,
        info: MONTHS_MAP_F[o.month]
      }
    })

    //tooltip_info_data
    const tooltip_info_data = _.map(dataState, (o) => {
      // const monthId = `${maxYear}${padNumber(o.month-1)}`
      const monthId = `${maxYear}${padNumber(o.month)}`

      return {
        x: MONTHS_MAP[o.month],
        y: 0,
        info: monthToInfoMap[monthId]// && addNewlines( monthToInfoMap[monthId])
      }
    })


    if (actual_sales_data.length !== target_sales_data.length
      || actual_sales_data.length !== actual_sales_ly_data.length) {
      throw 'Sales data is incorrect. Wrong array length.';
    }

    // calculate cumulative value for the first line performance chart
    let count
    for (count = 1; count < actual_sales_data.length; count++) {
      actual_sales_data[count].y += actual_sales_data[count - 1].y
      target_sales_data[count].y += target_sales_data[count - 1].y
      actual_sales_ly_data[count].y += actual_sales_ly_data[count - 1].y
    }

    return {
      actual_sales_data: actual_sales_data,
      revenue_forecast_usd_data: target_sales_data,
      actual_sales_ly_data: actual_sales_ly_data,
      tooltip_data_map: tooltip_data_map,
      months_data: months_data,
      maxYear: maxYear
    }
  }

  @computed get totalSalesLineMonth() {

    const jsArr = toJS(this.performanceData2) || []
    if (!jsArr.length) {
      return false
    }

    // prepare tooltip data map
    let monthToInfoMap = {}

    _.each(this.performanceData2Tooltip, (o) => {
      if (!monthToInfoMap[o.n_month]) {
        monthToInfoMap[o.n_month] = []
      }
      monthToInfoMap[o.n_month].push(o.promotion_desc)
    })

    // const monthToInfoMap = _.reduce(this.performanceData2Tooltip, (obj,param)=>{
    //   obj[param.n_month] = param.promotion_desc
    //   return obj;
    // }, {});

    const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    let queryObj = jslinq(jsArr)

    let dataState = queryObj
      .groupBy(function (el) {
        return el[YEAR_TYPE];
      })
      .toList()
    const maxYear = dataState.length && dataState[0].elements.length && dataState[0].elements[0][`max_${YEAR_TYPE}`]

    // const maxCalendarYear = dataState.length && dataState[0].elements.length && dataState[0].elements[0][ 'max_calendar_yr' ]
    // dataState
    //  jslinq(dataState)
    //   .max((el)=>{
    //       return parseInt( el['key'] );
    //   });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataState = dataState[maxYear].concat()

    // dataState = jslinq( dataState[ maxYear ].concat() )

    // dataState = dataState.groupBy(function(el){
    //   return el.month;
    // })
    // .toList()

    // dataState = _.map( dataState, (o) => {
    //   o.actual_sales_sum = jslinq( o.elements ).sum(function(el){
    //       return el.actual_sales || 0;
    //   })
    //   o.actual_sales_ly_sum = jslinq( o.elements ).sum(function(el){
    //     return el.actual_sales_ly || 0;
    //   })
    //   // o.target_baseline_no_promo_sum = jslinq( o.elements ).sum(function(el){
    //   //     return el.target_baseline_no_promo || 0;
    //   // })
    //   // o.target_baseline_promo_sum = jslinq( o.elements ).sum(function(el){
    //   //     return el.target_sales || 0
    //   // })
    //   o.revenue_forecast_usd_sum = jslinq( o.elements ).sum(function(el){
    //       return el.revenue_forecast_usd || 0
    //   })
    //   return o
    // } )



    const padNumber = (d) => {
      return (d < 10) ? '0' + d.toString() : d.toString()
    }

    const LETTERS_PER_LINE = 12

    const addNewlines = (str) => {
      var result = '';
      while (str.length > 0) {
        result += str.substring(0, LETTERS_PER_LINE) + '\n';
        str = str.substring(LETTERS_PER_LINE);
      }
      return result;
    }


    let tooltip_data_map = {}
    let actual_sales_data = _.map(dataState, (o) => {
      // fill tooltip data months and actual sales
      const monthId = `${maxYear}${padNumber(o.month)}`

      tooltip_data_map[MONTHS_MAP[o.month]] = {
        monthName: hlp.yearMonthToStrFull(o.n_month),
        actual_sales: o.actual_sales && `$${hlp.toShortMil(o.actual_sales)}m`,
        actual_sales_ly: o.actual_sales_ly && `$${hlp.toShortMil(o.actual_sales_ly)}m`,
        sales_forecast: o.revenue_forecast_usd && `$${hlp.toShortMil(o.revenue_forecast_usd)}m`,
        // events: monthToInfoMap[monthId]// && addNewlines( monthToInfoMap[monthId]),
        events: monthToInfoMap[o.n_month]
      }


      return {
        x: MONTHS_MAP[o.month],
        y: o.actual_sales || null,
        labelTooltip: 'Monthly Sales'
      }
    })


    actual_sales_data = _.filter(actual_sales_data, o => o.y !== null)

    const actual_sales_ly_data = _.map(dataState, (o) => {

      return {
        x: MONTHS_MAP[o.month],
        y: o.actual_sales_ly || null,
        labelTooltip: 'Monthly Sales Last Year'
      }
    })

    // const target_baseline_no_promo_data = _.map( dataState, (o) => {
    //   return {
    //     x: MONTHS_MAP[o.key],
    //     y: o.target_baseline_no_promo_sum || null,
    //     labelTooltip: 'Baseline (without promotion)'
    //   }
    // } )

    // const target_baseline_promo_data = _.map( dataState, (o) => {
    //   return {
    //     x: MONTHS_MAP[o.key],
    //     y: o.target_baseline_promo_sum || null,
    //     labelTooltip: 'Target (with promotion)'
    //   }
    // } )

    let revenue_forecast_usd_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        // y: o.revenue_forecast_usd || null,      //forecast
        y: o.target_sales || null,
        labelTooltip: 'target_sales'
      }
    })

    revenue_forecast_usd_data = _.filter(revenue_forecast_usd_data, o => o.y !== null)

    //预测值添加一个实际值作为预测值开始的日期数据；
    // if (revenue_forecast_usd_data.length && actual_sales_data.length) {
    //   revenue_forecast_usd_data.unshift( actual_sales_data[ actual_sales_data.length-1 ] )
    // }

    //const t_sales_with_forecast_data = actual_sales_data.concat( revenue_forecast_usd_data )

    // const months_data = _.map( dataState, (o)=>{
    //   return {
    //     x: MONTHS_MAP[o.month],
    //     y: 0,
    //     info: MONTHS_MAP_F[o.month]
    //   }
    // } )


    // const tooltip_info_data = _.map( dataState, (o) => {
    //   const monthId = `${maxYear}${padNumber(o.month)}`
    //   return {
    //     x: MONTHS_MAP[o.month],
    //     y: 0,
    //     info: monthToInfoMap[monthId] && addNewlines( monthToInfoMap[monthId])
    //   }
    // } )



    // if ( actual_sales_data.length !== target_baseline_no_promo_data.length 
    //     || actual_sales_data.length !== target_baseline_promo_data.length ) {
    //       throw 'Sales data is incorrect. Wrong array length.';
    // }

    // target_baseline_no_promo_data,
    // target_baseline_promo_data,

    return {
      revenue_forecast_usd_data,
      actual_sales_data,
      actual_sales_ly_data,
      tooltip_data_map,
      //tooltip_info_data,
      // t_sales_with_forecast_data,
      // months_data,
      isPerfYear: this.isPerfYear
    }
  }

  @computed get donutTotalSalesYear() {
    const jsArr = toJS(this.performanceData2) || []
    if (!jsArr.length) {
      return false
    }

    let queryObj = jslinq(jsArr)
    // always calendar year
    const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'// this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    let dataState = queryObj
      .groupBy(function (el) {
        return el[YEAR_TYPE];
      })
      .toList()

    let maxYear, maxMonth, yearTitle
    if (dataState.length && dataState[0].elements.length) {
      maxYear = dataState[0].elements[0][`max_${YEAR_TYPE}`]
      yearTitle = parseInt(dataState[0].elements[0].max_n_month.slice(0, 4))
      maxMonth = parseInt(dataState[0].elements[0].max_n_month.slice(4, 6))
    }

    // dataState
    //  jslinq(dataState)
    //   .max((el)=>{
    //       return parseInt( el['key'] );
    //   });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    const rawDataState = dataState[maxYear].concat()
    dataState = jslinq(rawDataState)

    const yearActualSales = dataState.sum(function (el) {
      return el.actual_sales || 0;
    });

    const yearActualSalesLY = dataState.sum(function (el) {
      return el.actual_sales_ly_for_compare || 0;
    });

    const yearTargetSales = dataState.sum(function (el) {
      return el.target_sales_for_compare || 0;
    });

    const actualToTargetRatioPerc = Math.round((yearActualSales / yearTargetSales) * 1000) / 10
    const splyVal = Math.round((yearActualSales / yearActualSalesLY) * 1000) / 10

    const monthNum = maxMonth
    const monthName = MONTHS_MAP_F[monthNum]
    const contrastMonth = MONTHS_MAP[monthNum]
    const title = `${monthName} ${yearTitle}`
    const contrastDate = `${yearTitle} ${contrastMonth}`

    return {
      percentVal: actualToTargetRatioPerc,
      percentVal2: splyVal,
      totalSales: yearActualSales,
      maxYear: maxYear,
      contrastDate: contrastDate,
      title: title
    }
  }



  @computed get donutTotalSalesLastMonth() {
    const jsArr = toJS(this.performanceData2) || []
    if (!jsArr.length) {
      return false
    }

    let queryObj = jslinq(jsArr)

    // always calendar year
    const YEAR_TYPE = 'calendar_yr'// this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    let dataState = queryObj
      .groupBy(function (el) {
        return el[YEAR_TYPE];
      })
      .toList()

    let maxYear, maxMonth, yearTitle

    if (dataState.length && dataState[0].elements.length) {
      maxYear = dataState[0].elements[0][`max_${YEAR_TYPE}`]
      yearTitle = parseInt(dataState[0].elements[0].max_n_month.slice(0, 4))
      maxMonth = parseInt(dataState[0].elements[0].max_n_month.slice(4, 6))
    }

    // dataState
    //  jslinq(dataState)
    //   .max((el)=>{
    //       return parseInt( el['key'] );
    //   });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});


    const rawDataState = dataState[maxYear].concat()
    dataState = jslinq(rawDataState)

    //      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

    // get max month of a current year
    // const maxMonth = dataState
    //   .max((el)=>{
    //       return el[MONTH_TYPE];
    //   });

    dataState = dataState.where(function (el) {
      return el['month'] == maxMonth;
    })
      .toList();

    const monthNum = maxMonth
    const monthName = MONTHS_MAP_F[monthNum]
    const title = `${monthName} ${yearTitle}`

    dataState = jslinq(dataState)

    const monthActualSales = dataState.sum(function (el) {
      return el.actual_sales || 0;
    });

    const monthActualSalesLY = dataState.sum(function (el) {
      return el.actual_sales_ly_for_compare || 0;
    });

    const monthTargetSales = dataState.sum(function (el) {
      return el.target_sales_for_compare || 0;
    });

    const actualToTargetRatioPerc = Math.round((monthActualSales / monthTargetSales) * 1000) / 10
    const splyVal = Math.round((monthActualSales / monthActualSalesLY) * 1000) / 10

    return {
      percentVal: actualToTargetRatioPerc,
      percentVal2: splyVal,
      totalSales: monthActualSales,
      title: title
    }
  }

  @computed get performance2Com() {
    const jsArr = toJS(this.performanceData2Com) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    const maxMonth = parseInt(dataState.length && dataState[0].n_month)

    dataState = _.sortBy(dataState, (o) => parseInt(o.order_row));

    dataState = _.map(dataState, 'comment_row')

    return {
      tableData: dataState,
      maxMonth: maxMonth
    }
  }


}



export default new ChartStore()
export { ChartStore }
