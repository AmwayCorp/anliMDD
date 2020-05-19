import { observable, computed, action, runInAction, toJS } from 'mobx'
import ApiService from '../services/ApiService'
import * as jslinq from 'jslinq'
import * as hlp from '../components/Helper'
import _ from 'lodash'

const MONTHS_MAP = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const MONTHS_MAP_F = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

class ChartStoreAbo {
  @observable isLoading = true
  @observable isFailure = false
  @observable isPerfYear = false
  @observable aboCisKpiData = []
  @observable aboRenewalData = []
  @observable aboPinData = []
  @observable aboNonPinData = []
  @observable aboRetentionData = []
  @observable aboQualificationData = []
  @observable aboNewQualData = []

  @observable aboMigBotData = []
  @observable aboMigTopData = []
  @observable aboQMonthPvData = []

  @observable keyDriverData = []

  // abo leader
  @observable aboLeaderData1 = []
  @observable aboGarData1 = []
  @observable aboGarData2 = []
  @observable aboBonusData = []
  @observable aboPinPopData = []

  @action async fetchAboCisKpiData(params) {
    try {
      const data = await ApiService.get_abo_cis_kpi_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboCisKpiData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboCisKpiData = []
      })
    }
  }

  @action async fetchAboRenewalData(params) {
    try {
      const data = await ApiService.get_abo_renewal_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboRenewalData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboRenewalData = []
      })
    }
  }

  @action async fetchAboPinData(params) {
    try {
      const data = await ApiService.get_abo_pin_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboPinData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboPinData = []
      })
    }
  }

  @action async fetchAboNonPinData(params) {
    try {
      const data = await ApiService.get_abo_non_pin_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboNonPinData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboNonPinData = []
      })
    }
  }

  @action async fetchAboRetentionData(params) {
    try {
      const data = await ApiService.get_abo_retention_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboRetentionData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboRetentionData = []
      })
    }
  }

  @action async fetchAboQualificationData(params) {
    try {
      const data = await ApiService.get_abo_qualification_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboQualificationData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboQualificationData = []
      })
    }
  }

  @action async fetchAboNewQualData(params) {
    try {
      const data = await ApiService.get_abo_newqual_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboNewQualData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboNewQualData = []
      })
    }
  }

  @action async fetchAboLeaderData1(params) {
    try {
      const data = await ApiService.get_abo_leader_data1(params)
      runInAction(() => {
        this.isLoading = false
        this.aboLeaderData1 = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboLeaderData1 = []
      })
    }
  }

  @action async fetchAboBonusData(params) {
    try {
      const data = await ApiService.get_abo_bonus_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboBonusData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboBonusData = []
      })
    }
  }

  @action async fetchAboQMonthPvData(params) {
    try {
      const data = await ApiService.get_abo_qmonth_pv_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboQMonthPvData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboQMonthPvData = []
      })
    }
  }

  @action async fetchAboGar1(params) {
    try {
      const data = await ApiService.get_abo_gar1_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboGarData1 = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboGarData1 = []
      })
    }
  }

  @action async fetchAboGar2(params) {
    try {
      const data = await ApiService.get_abo_gar2_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboGarData2 = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboGarData2 = []
      })
    }
  }

  @action async fetchAboPinPopData(params) {
    try {
      const data = await ApiService.get_abo_pinpop_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboPinPopData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboPinPopData = []
      })
    }
  }

  @action async fetchAboMigTop(params) {
    try {
      const data = await ApiService.get_abo_migtop_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboMigTopData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboMigTopData = []
      })
    }
  }

  @action async fetchAboMigBot(params) {
    try {
      const data = await ApiService.get_abo_migbot_data(params)
      runInAction(() => {
        this.isLoading = false
        this.aboMigBotData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.aboMigBotData = []
      })
    }
  }

  @action async fetchKeyDriverData(params) {
    try {
      const data = await ApiService.get_key_driver_data(params)
      runInAction(() => {
        this.isLoading = false
        this.keyDriverData = data ? JSON.parse(data) : []
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isFailure = true
        this.keyDriverData = []
      })
    }
  }
  //新建最后一个图表
  @computed get aboCisKpiDataHandle() {
    // console.log(this.aboCisKpiData, "this.aboCisKpiData")
    const jsArr = toJS(this.aboCisKpiData) || []

    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr
//     0: {clnd_month: "202003", data_period: "2020", data_desc: "PF20YTD", kpi_code: "CSI_COUNT", kpi_desc: "获取CSI的ABO户数", …}
// 1: {clnd_month: "202003", data_period: "202001", data_desc: "PF20", kpi_code: "QUALIF_CSI_SR", kpi_desc: "有资格领取CSI营销人员 202001月之后开始计算", …}
// 2: {clnd_month: "202003", data_period: "202001", data_desc: "PF20", kpi_code: "CSI_COUNT", kpi_desc: "获取CSI的ABO户数", …}
// 3: {clnd_month: "202003", data_period: "202003", data_desc: "PF20", kpi_code: "CSI_COUNT", kpi_desc: "获取CSI的ABO户数", …}
// 4: {clnd_month: "202003", data_period: "2020", data_desc: "PF20YTD", kpi_code: "QUALIF_CSI_SR", kpi_desc: "有资格领取CSI营销人员 202001月之后开始计算", …}
// 5: {clnd_month: "202003", data_period: "2020", data_desc: "PF20YTD", kpi_code: "CSI_AMT", kpi_desc: "CSI 实际获取金额", …}
// 6: {clnd_month: "202003", data_period: "2020", data_desc: "PF20YTD", kpi_code: "TOTAL_ORDER_BV", kpi_desc: "整体BV值", …}
// 7: {clnd_month: "202003", data_period: "202002", data_desc: "PF20", kpi_code: "QUALIF_CSI_SR", kpi_desc: "有资格领取CSI营销人员 202001月之后开始计算", …}
// 8: {clnd_month: "202003", data_period: "202003", data_desc: "PF20", kpi_code: "VCS_AMT", kpi_desc: "VCS整体金额（按BV)", …}
// 9: {clnd_month: "202003", data_period: "202002", data_desc: "PF20", kpi_code: "CSI_COUNT", kpi_desc: "获取CSI的ABO户数", …}
// 10: {clnd_month: "202003", data_period: "202002", data_desc: "PF20", kpi_code: "VCS_AMT", kpi_desc: "VCS整体金额（按BV)", …}
// 11: {clnd_month: "202003", data_period: "202002", data_desc: "PF20", kpi_code: "TOTAL_ORDER_BV", kpi_desc: "整体BV值", …}
// 12: {clnd_month: "202003", data_period: "202001", data_desc: "PF20", kpi_code: "VCS_AMT", kpi_desc: "VCS整体金额（按BV)", …}
// 13: {clnd_month: "202003", data_period: "202003", data_desc: "PF20", kpi_code: "QUALIF_CSI_SR", kpi_desc: "有资格领取CSI营销人员 202001月之后开始计算", …}
// 14: {clnd_month: "202003", data_period: "2020", data_desc: "PF20YTD", kpi_code: "VCS_AMT", kpi_desc: "VCS整体金额（按BV)", …}
// 15: {clnd_month: "202003", data_period: "202002", data_desc: "PF20", kpi_code: "CSI_AMT", kpi_desc: "CSI 实际获取金额", …}
// 16: {clnd_month: "202003", data_period: "202001", data_desc: "PF20", kpi_code: "TOTAL_ORDER_BV", kpi_desc: "整体BV值", …}
// 17: {clnd_month: "202003", data_period: "202001", data_desc: "PF20", kpi_code: "CSI_AMT", kpi_desc: "CSI 实际获取金额", …}
// 18: {clnd_month: "202003", data_period: "202003", data_desc: "PF20", kpi_code: "FOA_ORDER_BV_1B", kpi_desc: "FOA order BV（按BV，使用月底身份）202001月之后开始计算", …}
// 19: {clnd_month: "202003", data_period: "202001", data_desc: "PF20", kpi_code: "FOA_ORDER_BV_1B", kpi_desc: "FOA order BV（按BV，使用月底身份）202001月之后开始计算", …}
// 20: {clnd_month: "202003", data_period: "202003", data_desc: "PF20", kpi_code: "TOTAL_ORDER_BV", kpi_desc: "整体BV值", …}
// 21: {clnd_month: "202003", data_period: "202002", data_desc: "PF20", kpi_code: "FOA_ORDER_BV_1B", kpi_desc: "FOA order BV（按BV，使用月底身份）202001月之后开始计算", …}
// 22: {clnd_month: "202003", data_period: "2020", data_desc: "PF20YTD", kpi_code: "FOA_ORDER_BV_1B", kpi_desc: "FOA order BV（按BV，使用月底身份）202001月之后开始计算", …}
// 23: {clnd_month: "202003", data_period: "202003", data_desc: "PF20", kpi_code: "CSI_AMT", kpi_desc: "CSI 实际获取金额", …}
    // const maxYear = parseInt(dataState.length && dataState[0].max_perf_yr)
    // let maxMonthStr
    // if (dataState.length) {
    //   maxMonthStr = dataState[0].max_month
    // }

    // const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    // const MAX_YEAR_PROP = this.isPerfYear ? 'max_perf_yr' : 'max_calendar_yr'
    // const maxYear = parseInt(jsArr.length && jsArr[0][MAX_YEAR_PROP])

    // let dataState = jslinq(jsArr)


    // dataState = dataState
    //   .groupBy(function (el) {
    //     return el[YEAR_TYPE];
    //   })
    //   .toList()

    // dataState = _.reduce(dataState, (obj, param) => {
    //   obj[param.key] = param.elements
    //   return obj;
    // }, {});

    // // dataState = jslinq(dataState[maxYear].concat())
    // dataState = dataState.toList()

    let YTD_DATA = [];
    let CSI_AMT = [];
    let CSI_COUNT = [];
    let QUALIF_CSI_SR = [];
    let TOTAL_ORDER_BV = [];
    let FOA_ORDER_BV_1B = [];
    let VCS_AMT = [];
    dataState.sort((a,b)=>{
      return b.clnd_month-a.clnd_month
    })
    dataState.sort((a,b)=>{
      return a.data_period-b.data_period
    })
    let NOW_MAXDATE = dataState[0].clnd_month
    // console.log(dataState)
    // console.log(dataState, "dataState")
    dataState && dataState.length >= 0 ? dataState.map((o,index)=>{
      var objData = {}
      if(o.clnd_month == NOW_MAXDATE){
        if(o.data_desc.indexOf("YTD") >= 0){
          objData = {
            clnd_month:o.clnd_month,
            data_period: o.data_period,
            kpi_cy_values: o.kpi_cy_values_usd,
            data_desc:o.data_desc,
            kpi_code:o.kpi_code,
            kpi_desc:o.kpi_desc,
          }
          YTD_DATA.push(objData)
        }else if(o.kpi_code == "CSI_AMT" && o.data_desc.indexOf("YTD") == -1){
          // objData = {
          //   clnd_month:o.clnd_month,
          //   data_period: o.data_period,
          //   kpi_cy_values: o.kpi_cy_values,
          //   data_desc:o.data_desc,
          //   kpi_code:o.kpi_code,
          //   kpi_desc:o.kpi_desc,
          // }
          CSI_AMT.push(o.kpi_cy_values_usd)
        }else if(o.kpi_code == "CSI_COUNT" && o.data_desc.indexOf("YTD") == -1){
          // objData = {
          //   clnd_month:o.clnd_month,
          //   data_period: o.data_period,
          //   kpi_cy_values: o.kpi_cy_values,
          //   data_desc:o.data_desc,
          //   kpi_code:o.kpi_code,
          //   kpi_desc:o.kpi_desc,
          // }
          CSI_COUNT.push(o.kpi_cy_values_usd)
        }else if(o.kpi_code == "QUALIF_CSI_SR_PPV" && o.data_desc.indexOf("YTD") == -1){
          QUALIF_CSI_SR.push(o.kpi_cy_values_usd)
        }else if(o.kpi_code == "TOTAL_ORDER_BV" && o.data_desc.indexOf("YTD") == -1){
          TOTAL_ORDER_BV.push(o.kpi_cy_values_usd)
        }else if(o.kpi_code == "FOA_ORDER_BV_1B" && o.data_desc.indexOf("YTD") == -1){
          FOA_ORDER_BV_1B.push(o.kpi_cy_values_usd)
        }else if(o.kpi_code == "VCS_AMT" && o.data_desc.indexOf("YTD") == -1){
          VCS_AMT.push(o.kpi_cy_values_usd)
        }
      }
    }) : ""
    var maxYearStr = NOW_MAXDATE.toString()
    var maxYearStrPF = hlp.yearToPfPref2(maxYearStr)
    return {
      YTD_DATA:YTD_DATA,
      CSI_AMT:CSI_AMT,
      CSI_COUNT:CSI_COUNT,
      QUALIF_CSI_SR:QUALIF_CSI_SR,
      TOTAL_ORDER_BV:TOTAL_ORDER_BV,
      FOA_ORDER_BV_1B:FOA_ORDER_BV_1B,
      VCS_AMT:VCS_AMT,
      NOW_MAXDATE:maxYearStr,
      NOW_MAXDATEPF:maxYearStrPF
    }
  }

  @computed get aboRenewalRate() {
    // console.log(this.aboRenewalData, "this.aboRenewalData")
    const jsArr = toJS(this.aboRenewalData) || []
    if (!jsArr.length) {
      return false
    }

    const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

    const MAX_YEAR_PROP = this.isPerfYear ? 'max_perf_yr' : 'max_calendar_yr'
    const maxYear = parseInt(jsArr.length && jsArr[0][MAX_YEAR_PROP])
    let dataState = jslinq(jsArr)

    dataState = dataState
      .groupBy(function (el) {
        return el[YEAR_TYPE];
      })
      .toList()

    // const maxYear = jslinq(dataState)
    //   .max((el)=>{
    //       return parseInt( el['key'] );
    //   });


    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataState = jslinq(dataState[maxYear].concat())

    // dataState = dataState.groupBy(function(el){
    //   return el.month;
    // })
    // .toList()

    dataState = dataState.toList()


    let renewal_rate_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.renewal_rate
      }
    })

    renewal_rate_data = _.filter(renewal_rate_data, (o) => {
      return o.y !== null
    })

    let renewal_rate_prediction_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.renewal_rate_prediction
      }
    })

    renewal_rate_prediction_data = _.filter(renewal_rate_prediction_data, (o) => {
      return o.y !== null
    })

    let scatter_data = renewal_rate_data.concat(renewal_rate_prediction_data)
    if (renewal_rate_data.length && renewal_rate_prediction_data.length) {
      renewal_rate_prediction_data.unshift(renewal_rate_data[renewal_rate_data.length - 1])
    }

    return {
      renewal_rate_data: renewal_rate_data,
      renewal_rate_prediction_data: renewal_rate_prediction_data,
      scatter_data: scatter_data,
      isPerfYear: this.isPerfYear
    }
  }


  @computed get aboPinBarData() {
    const jsArr = toJS(this.aboPinData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    const maxYear = parseInt(dataState.length && dataState[0].perf_yr)

    let maxMonthStr
    if (dataState.length) {
      maxMonthStr = dataState[0].max_month
    }

    let prevYear = _.map(dataState, (o) => {
      return {
        x: o.c_pin_code,
        y: o.avg_income_per_person_ly,
        labelTooltip: `Avg income: ${Math.round(o.avg_income_per_person_ly)}`
      }
    })

    let curYear = _.map(dataState, (o) => {
      return {
        x: o.c_pin_code,
        y: o.avg_income_per_person,
        labelTooltip: `Avg income: ${Math.round(o.avg_income_per_person)}`
      }
    })

    let prevYearMed = _.map(dataState, (o) => {
      return {
        x: o.c_pin_code,
        y: o.median_income_per_person_ly,
        labelTooltip: `Median income: ${Math.round(o.median_income_per_person_ly)}`
      }
    })

    let curYearMed = _.map(dataState, (o) => {
      return {
        x: o.c_pin_code,
        y: o.median_income_per_person,
        labelTooltip: `Median income: ${Math.round(o.median_income_per_person)}`
      }
    })

    return {
      prevYear: prevYear.reverse(),
      curYear: curYear.reverse(),
      prevYearMed: prevYearMed.reverse(),
      curYearMed: curYearMed.reverse(),
      maxMonth: maxMonthStr,
      maxYear: maxYear
    }
  }

  @computed get aboNonPinBarData() {
    const jsArr = toJS(this.aboNonPinData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    const maxYear = parseInt(dataState.length && dataState[0].max_perf_yr)

    let maxMonthStr
    if (dataState.length) {
      maxMonthStr = dataState[0].max_month
    }

    const avgNoPinPb = _.map(dataState, (o) => {
      return {
        x: o.abo_type,
        y: o.pfytd_avg_nopin_income,
        labelTooltip: `Avg income: ${Math.round(o.pfytd_avg_nopin_income)}\nMedian income: ${Math.round(o.pfytd_median_nopin_income)}`
      }
    })

    const avgNoPinPbLy = _.map(dataState, (o) => {
      return {
        x: o.abo_type,
        y: o.pfytd_avg_nopin_income_ly,
        labelTooltip: `Avg income: ${Math.round(o.pfytd_avg_nopin_income_ly)}\nMedian income: ${Math.round(o.pfytd_median_nopin_income_ly)}`
      }
    })

    // const avgNoPinRc = _.map(dataState, (o)=>{
    //   return {
    //     x: o.abo_type,
    //     y: o.pfytd_avg_nopin_rc
    //   }
    // })

    // const avgNoPinRcLy = _.map(dataState, (o)=>{
    //   return {
    //     x: o.abo_type,
    //     y: o.pfytd_avg_nopin_rc_ly
    //   }
    // })

    const noPinMedian = _.map(dataState, (o) => {
      return {
        x: o.abo_type,
        y: o.pfytd_median_nopin_income
      }
    })

    const noPinMedianLy = _.map(dataState, (o) => {
      return {
        x: o.abo_type,
        y: o.pfytd_median_nopin_income_ly
      }
    })

    const pctEarn = _.map(dataState, (o) => {
      return {
        x: o.abo_type,
        y: o.ytd_pct_earner_of_total
      }
    })

    const pctEarnLy = _.map(dataState, (o) => {
      return {
        x: o.abo_type,
        y: o.ytd_pct_earner_of_total_ly
      }
    })

    return {
      avgNoPinPb,
      avgNoPinPbLy,
      // avgNoPinRc,
      // avgNoPinRcLy,
      noPinMedian,
      noPinMedianLy,
      pctEarn,
      pctEarnLy,
      maxMonth: maxMonthStr,
      maxYear
    }
  }

  @computed get aboQMonthPv() {
    const jsArr = toJS(this.aboQMonthPvData) || [{}]
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr[0]

    let maxMonthStr = dataState.max_month

    const X_VALS = ['acc_of_q', 'pv_per_q']

    let prevYear = [
      {
        x: X_VALS[0],
        y: dataState.ytd_num_q_ly
      },
      {
        x: X_VALS[1],
        y: dataState.pv_per_q_ly
      }
    ]

    let curYear = [
      {
        x: X_VALS[0],
        y: dataState.ytd_num_q
      },
      {
        x: X_VALS[1],
        y: dataState.pv_per_q
      }
    ]

    const maxYear = parseInt(dataState.perf_yr)


    return {
      prevYear,
      curYear,
      maxMonth: maxMonthStr,
      maxYear
    }
  }

  @computed get aboRetention() {

    const jsArr = toJS(this.aboRetentionData)
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

    const maxYear = jslinq(dataState)
      .max((el) => {
        return parseInt(el['key']);
      });

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataState = dataState[maxYear]

    let new_abo_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.num_new_abo,
        labelTooltip: 'New recruited ABO: '
      }
    })

    let renew_abo_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: parseFloat(o.num_existing_wo_new_abo) / 3,
        labelTooltip: 'Exiting ABO: ',
        multiplyBy3: true
      }
    })

    // !NOTE: churn data should be with the "-" sign, we add it below
    let churn_abo_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: -o.num_churn_abo,
        labelTooltip: 'Churned ABO: '
      }
    })

    const months_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: 0,
        info: MONTHS_MAP_F[o.month]
      }
    })

    return {
      new_abo_data: new_abo_data,
      renew_abo_data: renew_abo_data,
      churn_abo_data: churn_abo_data,
      months_data: months_data
    }
  }

  @computed get aboQualification() {
    const jsArr = toJS(this.aboQualificationData) || []
    if (!jsArr.length) {
      return false
    }

    let queryObj = jslinq(jsArr)


    let dataState = queryObj
      .groupBy(function (el) {
        return el.perf_yr;
      })
      .toList()

    let maxYear

    if (dataState.length && dataState[0].elements.length) {
      maxYear = dataState[0].elements[0][`max_perf_yr`]
    }

    // const maxYear = jslinq(dataState)
    //   .max((el)=>{
    //       return parseInt( el['key'] );
    //   });

    let prevYearStr = (maxYear - 1).toString(),
      maxYearStr = maxYear.toString()

    prevYearStr = hlp.yearToPfPref2(prevYearStr)
    maxYearStr = hlp.yearToPfPref2(maxYearStr)


    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    dataState = dataState[maxYear]

    // console.log(dataState)
    let num_q_month_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.num_q_month || null,
        labelTooltip: maxYearStr
      }
    })

    let num_consecutive_q = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.num_consecutive_q || null,
        labelTooltip: maxYearStr
      }
    })

    let num_consecutive_q_ly = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.num_consecutive_q_ly || null,
        labelTooltip: maxYearStr
      }
    })

    let num_q_month_ly_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.num_q_month_ly || null,
        labelTooltip: prevYearStr
      }
    })

    let ytd_consecutive_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.ytd_consecutive_q_rate || null,
        labelTooltip: maxYearStr
      }
    })

    let ytd_consecutive_ly_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: o.ytd_consecutive_q_rate_ly || null,
        labelTooltip: prevYearStr
      }
    })

    const months_data = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: 0,
        info: MONTHS_MAP[o.month]
      }
    })

    const months_data_cons = _.map(dataState, (o) => {
      return {
        x: MONTHS_MAP[o.month],
        y: 0,
        info: MONTHS_MAP[o.month]
      }
    })

    return {
      num_q_month_data,
      num_q_month_ly_data,
      ytd_consecutive_data,
      ytd_consecutive_ly_data,
      months_data: months_data,
      months_data_cons: months_data_cons,
      num_consecutive_q: num_consecutive_q,
      num_consecutive_q_ly: num_consecutive_q_ly,
      maxYear: maxYearStr,
      prevYear: prevYearStr
    }
  }

  @computed get aboLeader1() {

    const jsArr = toJS(this.aboLeaderData1)
    if (!jsArr.length) {
      return false
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

    dataState = dataState[maxYear]

    dataState = jslinq(dataState)
      .groupBy(function (el) {
        return el.buyer_type;
      })
      .toList()

    return dataState
  }

  @computed get aboBonus() {
    const jsArr = toJS(this.aboBonusData) || []
    if (!jsArr.length) {
      return false
    }

    return jsArr
  }

  @computed get aboGar1() {
    const jsArr = toJS(this.aboGarData1) || []
    const jsArr2 = toJS(this.aboGarData2) || []

    if (!jsArr.length || !jsArr2.length) {
      return false
    }

    let maxMonthStr = jsArr[0].latest_month


    let garPinData = jslinq(jsArr2)
      .groupBy(function (el) {
        return el.gar_pin;
      })
      .toList()

    garPinData = _.reduce(garPinData, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    let garNewData = jslinq(jsArr2)
      .groupBy(function (el) {
        return el.gar_new;
      })
      .toList()

    garNewData = _.reduce(garNewData, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    let garOrigData = jslinq(jsArr2)
      .groupBy(function (el) {
        return el.orig_account;
      })
      .toList()

    garOrigData = _.reduce(garOrigData, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    let garOrigNewData = jslinq(jsArr2)
      .groupBy(function (el) {
        return el.orig_new;
      })
      .toList()

    garOrigNewData = _.reduce(garOrigNewData, (obj, param) => {
      obj[param.key] = param.elements
      return obj;
    }, {});

    //      console.log('garOrigData', garOrigData, garOrigNewData)

    let dataState = _.sortBy(jsArr, 'pin_rank')
    // console.log(dataState)
    // update rank 1-4
    const RANK_TT = 4
    dataState = _.map(dataState, (o) => {
      if (o.pin_rank <= RANK_TT) {
        if (garPinData[o.pin] && o.pin !== null) {
          o.pin_tt_data = _.map(garPinData[o.pin], 'fc_name')
        }
        if (garNewData[o.pin] && o.gar_new !== null) {
          o.new_tt_data = _.map(garNewData[o.pin], 'fc_name')
        }
        if (garOrigData[o.pin] && o.orig_account !== null) {
          o.orig_tt_data = _.map(garOrigData[o.pin], 'fc_name')
        }
        if (garOrigNewData[o.pin] && o.orig_new !== null) {
          o.orig_new_tt_data = _.map(garOrigNewData[o.pin], 'fc_name')
        }
      }
      return o
    })

    return {
      data: dataState,
      maxMonth: maxMonthStr
    }
  }

  @computed get aboMigTop() {
    const jsArr = toJS(this.aboMigTopData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    const recPerfYear = dataState.length && dataState[0]['recent_perf_yr_actual'],
      prevRecPerfYear = recPerfYear - 1,
      futurePerfYear = dataState.length && dataState[0]['future_perf_year_pred']

    dataState = jslinq(dataState)
      .groupBy(function (el) {
        return el.start_pin;
      })
      .toList()

    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements.length && param.elements[0]
      return obj;
    }, {});

    return {
      tableData: dataState,
      recPerfYear,
      prevRecPerfYear,
      futurePerfYear
    }
  }

  @computed get aboMigBot() {
    const jsArr = toJS(this.aboMigBotData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    const actualMonth = dataState.length && dataState[0]['n_month_actual'],
      futureMonth = dataState.length && dataState[0]['future_n_month']

    dataState = jslinq(dataState)
      .groupBy(function (el) {
        return el.start_bonus_dist;
      })
      .toList()
      // console.log(dataState)
    dataState = _.reduce(dataState, (obj, param) => {
      obj[param.key] = param.elements.length && param.elements[0]
      return obj;
    }, {});
    return {
      tableData: dataState,
      actualMonth,
      futureMonth
    }
  }

  @computed get aboPinPop() {
    const jsArr = toJS(this.aboPinPopData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr

    const maxPredYear = parseInt(dataState.length && dataState[0].predicted_year),
      maxActualYear = parseInt(dataState.length && dataState[0].actual_year)

    const actualYear = _.map(dataState, (o) => {
      return {
        x: o.pin,
        y: o.actual_population
      }
    })

    const predYear = _.map(dataState, (o) => {
      return {
        x: o.pin,
        y: o.predicted_population,
      }
    })

    const pctU35 = _.map(dataState, (o) => {
      return {
        x: o.pin,
        y: o.pct_u35
      }
    })

    return {
      actualYear,
      predYear,
      pctU35,
      maxPredYear,
      maxActualYear
    }
  }

  @computed get aboNewQual() {
    const jsArr = toJS(this.aboNewQualData)
    if (!jsArr.length) {
      return false
    }

    let result = false

    try {
      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

      let queryObj = jslinq(jsArr)

      // !TODO: verify search approach, probably need to add extra flag in SQL
      const extraBuyerTypes = [
        'Reach new Emerald PF',
        'Reach new Diamond PF',
        'Reach new EDC PF'
      ]
      // find non expandable buyer types
      let extraSegments = _.filter(jsArr, (o) => {
        let bType = String(o.buyer_type)
        bType = bType.substring(0, bType.length - 5)
        return extraBuyerTypes.indexOf(bType) !== -1
      })

      extraSegments = _.sortBy(extraSegments, (o) => {
        let bType = String(o.buyer_type)
        bType = bType.substring(0, bType.length - 5)
        return extraBuyerTypes.indexOf(bType)
      })

      let dataState = queryObj
        .groupBy(function (el) {
          return el[YEAR_TYPE];
        })
        .toList()


      let maxYear, maxMonth, maxMonthStr, maxPerfYear

      if (dataState.length && dataState[0].elements.length) {
        maxYear = dataState[0].elements[0][`max_${YEAR_TYPE}`]
        //maxPerfYear = dataState[0].elements[0]['max_perf_yr']
        maxMonthStr = dataState[0].elements[0].max_month
        maxMonth = parseInt(maxMonthStr.slice(4, 6))
      }

      // const maxYear = jslinq(dataState)
      //   .max((el)=>{
      //       return parseInt( el['key'] );
      //   });

      dataState = _.reduce(dataState, (obj, param) => {
        obj[param.key] = param.elements
        return obj;
      }, {});

      dataState = dataState[maxYear]

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      // get max month of a current year
      // const maxMonth = jslinq(dataState)
      //   .max((el)=>{
      //       return el[MONTH_TYPE];
      //   });


      dataState = jslinq(dataState)
        .groupBy(function (el) {
          return el.buyer_type;
        })
        .toList()


      const SEG_ORDER_MAP = {
        'Reach bonus 9%': 1,
        'Reach bonus 15%': 2,
        'Reach new SP': 3,
        'Reach new GP': 4,
        'Reach new DD': 5
      }

      dataState = _.map(dataState, (o) => {
        o.rank = SEG_ORDER_MAP[o.key]
        return o
      })

      dataState = _.sortBy(dataState, 'rank');

      // extraSegments = _.map(extraSegments, (o)=>{
      //   o.rank = SEG_ORDER_MAP[o.buyer_type]
      //   return o
      // })

      // extraSegments = _.sortBy(extraSegments, 'rank');

      let curLastMonth, count
      for (count = 0; count < dataState.length; count++) {


        curLastMonth = _.find(dataState[count].elements, { ['n_month']: maxMonthStr })

        dataState[count].avgAgeAbo = curLastMonth && curLastMonth['avg_age_abo']
        dataState[count].firstTimeMigUp = curLastMonth && curLastMonth['first_time_migrate_up_months']

        dataState[count].chartData = {}

        dataState[count].chartData.newAboData = _.sortBy(_.map(dataState[count].elements, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o['num_abo'],
            rank: o[MONTH_TYPE]
            //labelTooltip: 'Monthly sales ',
          }
        }), 'rank')

        dataState[count].chartData.newAboLyData = _.sortBy(_.map(dataState[count].elements, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o['num_abo_ly'],
            rank: o[MONTH_TYPE]
            //labelTooltip: 'Monthly sales ',
          }
        }), 'rank')

        dataState[count].chartData.firstMigUpData = _.sortBy(_.map(dataState[count].elements, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o['first_time_migrate_up_months'],
            rank: o[MONTH_TYPE]
            //labelTooltip: 'Monthly sales ',
          }
        }), 'rank')

      }

      // let monthsData = []
      // if (dataState.length) {
      //   monthsData = _.map( dataState[0].elements, (o)=>{
      //     return {
      //       x: MONTHS_MAP[o.month],
      //       y: 0,
      //       info: MONTHS_MAP[o.month],
      //       rank: o[MONTH_TYPE]
      //     }
      //   } )
      //   monthsData = _.sortBy(monthsData, 'rank')
      //}

      result = {
        segments: dataState,
        extraSegments: extraSegments,
        //monthsData: monthsData,
        isPerfYear: this.isPerfYear,
        maxMonth: maxMonthStr,
        maxYear: maxYear
      }
    } catch (e) {
      result = false
      // console.log(e)
    }
    return result
  }

  @computed get aboKeyDriver() {
    const jsArr = toJS(this.keyDriverData) || []
    if (!jsArr.length) {
      return false
    }

    let dataState = jsArr


    let firstTable = _.map(dataState, (o) => {
      return [o.pin_feature, o.pin_feature_value, o.pin_feature_tag]
    })
    let secondTable = _.map(dataState, (o) => {
      return [o.bns_feature, o.bns_feature_value, o.bns_feature_tag]
    })
    let thirdTable = _.map(dataState, (o) => {
      return [o.renewal_feature, o.renewal_feature_value, o.renewal_feature_tag]
    })

    //console.log( 'aboKeyDriver', firstTable, secondTable, thirdTable )

    return [
      firstTable,
      secondTable,
      thirdTable
    ]
  }
}

export default new ChartStoreAbo()
export { ChartStoreAbo }