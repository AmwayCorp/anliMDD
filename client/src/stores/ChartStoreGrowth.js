import { observable, computed, action, runInAction, toJS } from 'mobx'
import ApiService from '../services/ApiService'
import * as jslinq from 'jslinq'
import _ from 'lodash'

const MONTHS_MAP = { 1: 'Jan', 2: 'Feb', 3:'Mar', 4:'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' }
const MONTHS_MAP_F = { 1: 'January', 2: 'February', 3:'March', 4:'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

class ChartStoreGrowth {
    @observable isLoading = true
    @observable isFailure = false
    @observable isPerfYear = false
    @observable growthSustData = []
    @observable growthSalesSegData = []
    @observable growthPopSegData = []
    @observable growthBuyerData = []
    @observable growthTableData = []

    @action async fetchGrowthSustData(params) {
      try {
          const data = await ApiService.get_growth_sust_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.growthSustData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.growthSustData = []
          })
      }
    }

    @action async fetchGrowthSalesSegData(params) {
      try {
          const data = await ApiService.get_growth_sales_seg_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.growthSalesSegData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.growthSalesSegData = []
          })
      }
    }

    @action async fetchGrowthPopSegData(params) {
      try {
          const data = await ApiService.get_growth_pop_seg_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.growthPopSegData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.growthPopSegData = []
          })
      }
    }

    @action async fetchGrowthBuyerData(params) {
      try {
          const data = await ApiService.get_growth_buyer_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.growthBuyerData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.growthBuyerData = []
          })
      }
    }

    @action async fetchGrowthTableData(params) {
      try {
          const data = await ApiService.get_growth_table_data(params)          
          runInAction(() => {
              this.isLoading = false
              this.growthTableData = data ? JSON.parse(data) : []
          })
      } catch (e) {
          runInAction(() => {
              this.isLoading = false
              this.isFailure = true
              this.growthTableData = []
          })
      }
    }

    @computed get growthSustainability() {
      const jsArr = toJS(this.growthSustData)
      if (!jsArr.length) {
        return false
      }

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

      let maxMonthStr
      if (jsArr.length) {
        maxMonthStr = jsArr[0].max_month
      }

      const maxCalendarYear = parseInt( jsArr.length && jsArr[0].max_calendar_year )

      let queryObj = jslinq( jsArr )

      let dataState=queryObj
        .groupBy(function(el){
            return el[YEAR_TYPE];
        })
        .toList()

      const maxYear = jslinq(dataState)
        .max((el)=>{
            return parseInt( el['key'] );
        });

      dataState = _.reduce(dataState, (obj,param)=>{
        obj[param.key] = param.elements
        return obj;
      }, {});

      dataState = dataState[maxYear]


      // filter ytd_highppv_pct by maxMonthStr -> n_month

      const maxMonthObj = _.findLast(dataState, {n_month: maxMonthStr}) || {}

      const last_ytd_highppv_pct = maxMonthObj.ytd_highppv_pct || 0,
        last_target_high_ppv_pct = maxMonthObj.target_high_ppv_pct || 0,
        last_ytd_end_of_month_pct = maxMonthObj.ytd_end_of_month_pct || 0,
        last_target_eom_pct = maxMonthObj.target_eom_pct || 0

      let high_ppv_pct_of_sales_actual_data = _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.high_ppv_pct_of_sales_actual,
          labelTooltip: maxYear
        }
      } )

      let eom_pct_of_sales_actual_data = _.map( dataState, (o) => {
        return {
          x: MONTHS_MAP[o.month],
          y: o.eom_pct_of_sales_actual,
          labelTooltip: maxYear
        }
      } )

      const months_data = _.map( dataState, (o)=>{
        return {
          x: MONTHS_MAP[o.month],
          y: 0,
          info: MONTHS_MAP[o.month]
        }
      } )

      return {
        high_ppv_pct_of_sales_actual_data,
        eom_pct_of_sales_actual_data,
        last_ytd_highppv_pct,
        last_target_high_ppv_pct,
        last_ytd_end_of_month_pct,
        last_target_eom_pct,
        months_data,
        isPerfYear: this.isPerfYear,
        maxYear,
        maxCalendarYear
      }
    }

    @computed get growthSalesSeg() {
      const jsArr = toJS(this.growthSalesSegData)
      if (!jsArr.length) {
        return false
      }

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

      let maxMonthStr
      if (jsArr.length) {
        maxMonthStr = jsArr[0].max_month
      }

      let queryObj = jslinq( jsArr )

      let dataState=queryObj
        .groupBy(function(el){
            return el[YEAR_TYPE];
        })
        .toList()

      const maxYear = jslinq(dataState)
        .max((el)=>{
            return parseInt( el['key'] );
        });

      dataState = _.reduce(dataState, (obj,param)=>{
        obj[param.key] = param.elements
        return obj;
      }, {});

      dataState = dataState[maxYear]

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      // get max month of a current year
      const maxMonth = jslinq(dataState)
        .max((el)=>{
            return el[MONTH_TYPE];
        });

      dataState = jslinq(dataState)
        .groupBy(function(el){
            return el.segment_desc;
        })
        .toList()

      const SEG_ORDER_MAP = {
        'Customer' : 1,
        'ABO (Purchasing Only)' : 2,
        'Developing ABO' : 3,
        'Building ABO': 4,
        'ABO Leader': 5
      }
  
      dataState = _.map(dataState, (o)=>{
        o.rank = SEG_ORDER_MAP[o.key]
        return o
      })

      dataState = jslinq(dataState).orderBy(function(el){
        return el.rank;
      })
      .toList();

      let count, curLastMonth
      for (count=0; count<dataState.length; count++) {
        curLastMonth = _.find( dataState[count].elements, {[MONTH_TYPE]: maxMonth})
        dataState[count].lastMonthVal = curLastMonth && curLastMonth.actual_sales

        dataState[count].chartData = _.map( dataState[count].elements, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o.actual_sales,
            labelTooltip: 'Monthly sales ',
            rank: o[MONTH_TYPE]
          }
        } )
        dataState[count].chartData = _.sortBy(dataState[count].chartData, 'rank')
      }

      let monthsData = []
      if (dataState.length) {
        monthsData = _.map( dataState[0].elements, (o)=>{
          return {
            x: MONTHS_MAP[o.month],
            y: 0,
            info: MONTHS_MAP[o.month],
            rank: o[MONTH_TYPE]
          }
        } )
        monthsData = _.sortBy(monthsData, 'rank')

      }

      return {
        segments: dataState,
        monthsData: monthsData,
        isPerfYear: this.isPerfYear,
        maxMonth: maxMonthStr,
        maxYear: maxYear
      }
    }

    calcGrowthPopSegData(chartPropertyName, tooltipTitle) {
      const jsArr = toJS(this.growthPopSegData)
      if (!jsArr.length) {
        return false
      }

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

      let maxMonthStr
      if (jsArr.length) {
        maxMonthStr = jsArr[0].max_month
      }

      let queryObj = jslinq( jsArr )

      let dataState=queryObj
        .groupBy(function(el){
            return el[YEAR_TYPE];
        })
        .toList()

      const maxYear = jslinq(dataState)
        .max((el)=>{
            return parseInt( el['key'] );
        });

      dataState = _.reduce(dataState, (obj,param)=>{
        obj[param.key] = param.elements
        return obj;
      }, {});

      dataState = dataState[maxYear]

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      // get max month of a current year
      const maxMonth = jslinq(dataState)
        .max((el)=>{
            return el[MONTH_TYPE];
        });

      dataState = jslinq(dataState)
        .groupBy(function(el){
            return el.segment_desc;
        })
        .toList()

      const SEG_ORDER_MAP = {
        'Customer' : 1,
        'ABO (Purchasing Only)' : 2,
        'Developing ABO' : 3,
        'Building ABO': 4,
        'ABO Leader': 5
      }

      dataState = _.map(dataState, (o)=>{
        o.rank = SEG_ORDER_MAP[o.key]
        return o
      })

      dataState = jslinq(dataState).orderBy(function(el){
        return el.rank;
      })
      .toList();

      let curLastMonth, count
      for (count=0; count<dataState.length; count++) {
//        console.log('dataState[count].elements', dataState[count].elements)

        curLastMonth = _.find( dataState[count].elements, {[MONTH_TYPE]: maxMonth})
        dataState[count].lastMonthVal = curLastMonth && curLastMonth[chartPropertyName]
        dataState[count].chartData = _.map( dataState[count].elements, (o) => {
          return {
            x: MONTHS_MAP[o.month],
            y: o[chartPropertyName],
            labelTooltip: `${tooltipTitle} `,
            rank: o[MONTH_TYPE]
          }
        } )
        dataState[count].chartData = _.sortBy(dataState[count].chartData, 'rank')
  
      }

      let monthsData = []
      if (dataState.length) {
        monthsData = _.map( dataState[0].elements, (o)=>{
          return {
            x: MONTHS_MAP[o.month],
            y: 0,
            info: MONTHS_MAP[o.month],
            rank: o[MONTH_TYPE]
          }
        } )
        monthsData = _.sortBy(monthsData, 'rank')
      }
      
      return {
        segments: dataState,
        monthsData: monthsData,
        isPerfYear: this.isPerfYear,
        maxMonth: maxMonthStr,
        maxYear: maxYear
      }
    }

    @computed get growthPopSeg() {
      return this.calcGrowthPopSegData('population', 'Monthly population')
    }

    @computed get growthProdSeg() {
      return this.calcGrowthPopSegData('avg_sales_per_person', 'Monthly BV per Buyer')
    }

    calcGrowthBuyerData(chartPropertyName, addAllBuyers) {
      const jsArr = toJS(this.growthBuyerData)
      if (!jsArr.length) {
        return false
      }

      const YEAR_TYPE = this.isPerfYear ? 'perf_yr' : 'calendar_yr'

      let maxMonthStr
      if (jsArr.length) {
        maxMonthStr = jsArr[0].max_month
      }

      let queryObj = jslinq( jsArr )

      let dataState=queryObj
        .groupBy(function(el){
            return el[YEAR_TYPE];
        })
        .toList()

      const maxYear = jslinq(dataState)
        .max((el)=>{
            return parseInt( el['key'] );
        });

      dataState = _.reduce(dataState, (obj,param)=>{
        obj[param.key] = param.elements
        return obj;
      }, {});

      dataState = dataState[maxYear]

      const MONTH_TYPE = this.isPerfYear ? 'nth_month_of_perf_yr' : 'month'

      // get max month of a current year
      const maxMonth = jslinq(dataState)
        .max((el)=>{
            return el[MONTH_TYPE];
        });

      dataState=jslinq( dataState )
        .groupBy(function(el){
            return el.buyer_type;
        })
        .toList()

      dataState = _.reduce(dataState, (obj,param)=>{
        obj[param.key] = param.elements
        return obj;
      }, {});

      const FIRST_TIME_BUYER = 'First time'
      const EXISTING_BUYER = 'Existing'
      const ALL_BUYER = 'All Buyers'

      /* find last month sum across all categories */
      let lastMonthVal = {}

      lastMonthVal[FIRST_TIME_BUYER] = _.filter(dataState[FIRST_TIME_BUYER], (o)=>{
        return o[MONTH_TYPE] === maxMonth
      })
      lastMonthVal[FIRST_TIME_BUYER] = jslinq( lastMonthVal[FIRST_TIME_BUYER] ).sum((el)=>el[chartPropertyName] || 0);
      
      lastMonthVal[EXISTING_BUYER] = _.filter(dataState[EXISTING_BUYER], (o)=>{
        return o[MONTH_TYPE] === maxMonth
      })
      lastMonthVal[EXISTING_BUYER] = jslinq( lastMonthVal[EXISTING_BUYER] ).sum((el)=>el[chartPropertyName] || 0);
      
      lastMonthVal[ALL_BUYER] = _.filter(dataState[ALL_BUYER], (o)=>{
        return o[MONTH_TYPE] === maxMonth
      })
      lastMonthVal[ALL_BUYER] = jslinq( lastMonthVal[ALL_BUYER] ).sum((el)=>(el[chartPropertyName] || 0) );  

      /* group by segemnts of a category */
      dataState[FIRST_TIME_BUYER] = jslinq( dataState[FIRST_TIME_BUYER] )
        .groupBy(function(el){
            return el.segment_desc;
        })
        .toList()
      dataState[FIRST_TIME_BUYER] = _.reduce(dataState[FIRST_TIME_BUYER], (obj,param)=>{
          obj[param.key] = param.elements
          return obj;
        }, {});
  

      dataState[EXISTING_BUYER] = jslinq( dataState[EXISTING_BUYER] )
        .groupBy(function(el){
            return el.segment_desc;
        })
        .toList()
      dataState[EXISTING_BUYER] = _.reduce(dataState[EXISTING_BUYER], (obj,param)=>{
          obj[param.key] = param.elements
          return obj;
        }, {});

      dataState[ALL_BUYER] = jslinq( dataState[ALL_BUYER] )
      .groupBy(function(el){
          return el.segment_desc;
      })
      .toList()
        dataState[ALL_BUYER] = _.reduce(dataState[ALL_BUYER], (obj,param)=>{
            obj[param.key] = param.elements
            return obj;
          }, {});        


      // prepare data for x and y axis
      const SEG_TYPES = [
        'Customer',
        'ABO (Purchasing Only)',
        'Developing ABO',
        'Building ABO',
        'ABO Leader'
      ]

      let count
      for (count=0; count<SEG_TYPES.length; count ++) {

        if ( dataState[EXISTING_BUYER][ SEG_TYPES[count] ] ) {
          dataState[EXISTING_BUYER][ SEG_TYPES[count] ] = _.map(dataState[EXISTING_BUYER][ SEG_TYPES[count] ], (o)=>{

            return {
                x: MONTHS_MAP[o.month],
                y: o[chartPropertyName],
                labelTooltip: `${SEG_TYPES[count]} :`,
                rank: o[MONTH_TYPE]
            }
          })

          dataState[EXISTING_BUYER][ SEG_TYPES[count] ] = _.sortBy(dataState[EXISTING_BUYER][ SEG_TYPES[count] ], 'rank')
        }

        if ( dataState[FIRST_TIME_BUYER][ SEG_TYPES[count] ] ) {
          dataState[FIRST_TIME_BUYER][ SEG_TYPES[count] ] = _.map(dataState[FIRST_TIME_BUYER][ SEG_TYPES[count] ], (o)=>{

            return {
                x: MONTHS_MAP[o.month],
                y: o[chartPropertyName],
                labelTooltip: `${SEG_TYPES[count]} :`,
                rank: o[MONTH_TYPE]
            }
          })

          dataState[FIRST_TIME_BUYER][ SEG_TYPES[count] ] = _.sortBy(dataState[FIRST_TIME_BUYER][ SEG_TYPES[count] ], 'rank')
        }

          if ( dataState[ALL_BUYER][ SEG_TYPES[count] ] ) {
            dataState[ALL_BUYER][ SEG_TYPES[count] ] = _.map(dataState[ALL_BUYER][ SEG_TYPES[count] ], (o)=>{
  
              return {
                  x: MONTHS_MAP[o.month],
                  y: o[chartPropertyName],
                  labelTooltip: `${SEG_TYPES[count]} :`,
                  rank: o[MONTH_TYPE]
              }
            })

            dataState[ALL_BUYER][ SEG_TYPES[count] ] = _.sortBy(dataState[ALL_BUYER][ SEG_TYPES[count] ], 'rank')  
          }
  
        
      }


      dataState[FIRST_TIME_BUYER] = {
        chartData: dataState[FIRST_TIME_BUYER],
        key: FIRST_TIME_BUYER,
        lastMonthVal: lastMonthVal[FIRST_TIME_BUYER]
      }
  
      dataState[EXISTING_BUYER] = {
        chartData: dataState[EXISTING_BUYER],
        key: EXISTING_BUYER,
        lastMonthVal: lastMonthVal[EXISTING_BUYER]
      }

        dataState[ALL_BUYER] = {
          chartData: dataState[ALL_BUYER],
          key: ALL_BUYER,
          lastMonthVal: lastMonthVal[ALL_BUYER]
        }  

      let monthsData = []
      if ( dataState[FIRST_TIME_BUYER].chartData[ SEG_TYPES[0] ].length ) {
        monthsData = _.map( dataState[FIRST_TIME_BUYER].chartData[ SEG_TYPES[0] ], (o)=>{
          return {
            x: o.x,
            y: 0,
            info: o.x,
            rank: o.rank
          }
        } )
        monthsData = _.sortBy(monthsData, 'rank')
      }

      let segments = [ dataState[FIRST_TIME_BUYER], dataState[EXISTING_BUYER] ]

      if (addAllBuyers) {
        segments.push(dataState[ALL_BUYER])
      }

      return {
        segments: segments,
        isPerfYear: this.isPerfYear,
        maxYear: maxYear,
        maxMonth: maxMonthStr,
        monthsData: monthsData
      }
    }

    @computed get growthBuyer() {
      return this.calcGrowthBuyerData('population', true)
    }

    @computed get growthBuyerLine() {
      return this.calcGrowthBuyerData('avg_sales_per_person')
    }

    @computed get growthTable() {
      const jsArr = toJS(this.growthTableData) || []
      if (!jsArr.length) {
        return false
      }

      let maxMonthStr = jsArr[0].max_month
      let maxYear = jsArr[0].calendar_yr
      const maxTargCalYear = jsArr[0].max_target_calendar_year

      const SEG_ORDER_MAP = {
        'Customer' : 1,
        'ABO (Purchasing Only)' : 2,
        'Developing/Building/Leader ABOs': 3,
        'Developing ABO' : 4,
        'Building ABO': 5,
        'ABO Leader': 6,
        'Total': 7
      }

      const SUBTITLES = [
        'Developing ABO',
        'Building ABO',
        'ABO Leader'
      ]

      const SQUARE_LAST_COL = [
          'Customer',
          'ABO (Purchasing Only)'
      ]
      console.log(jsArr,"jsArr")
      let dataState = _.map(jsArr, (o)=>{
        o.rank = SEG_ORDER_MAP[o.segment_desc]
        if ( SUBTITLES.indexOf(o.segment_desc) !== -1 ) {
          o.isSubtitle = true
        }
        if (o.segment_desc === 'Total') {
          o.isTotal = true
        }
        if ( SQUARE_LAST_COL.indexOf(o.segment_desc) !== -1 ) {
          o.isSquarePerc = true
        }

        return o
      })
      console.log(dataState,"dataState")
      dataState = _.sortBy(dataState, 'rank')


      const minTargetSalPct = dataState[0]['min_target_sales_pct'],
        maxTargetSalPct = dataState[0]['max_target_sales_pct'],
        monthAvg1 = dataState[0]['pct_actual_sales'],
        monthAvg2 = dataState[1] && dataState[1]['pct_actual_sales'],
        monthAvg2Rows = monthAvg1 + monthAvg2

      return { 
        tableData:dataState,
        minTargetSalPct,
        maxTargetSalPct,
        monthAvg2Rows,
        maxMonth: maxMonthStr,
        maxYear,
        maxTargCalYear
      }
    }

  }

  export default new ChartStoreGrowth()
  export { ChartStoreGrowth }