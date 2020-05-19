import React from 'react'

import { observer } from 'mobx-react'

import * as hlp from './Helper'


/**
 * TableViewGrowth
 * @param {object} props 
 */
const TableViewComments = observer((props) => {
  // console.log(props)
  const allData = props.data || {}
  const data = allData.tableData || []
  // var contrastData = props.contrastData
  // var contrastDate = contrastData ? contrastData.contrastDate : ""

  const maxMonthStr = props.isMaxDate ? allData.maxDate : String(hlp.yearMonthToStr(allData.maxMonth))

  const rowsHtml = data.map((o, ind) => {
    return <div className="row" key={o + ind}>
      <div className={`comm-row ${o === null ? 'comm-row-empty' : ''}`}>
        {o}
      </div>
    </div>
  })


  return <div className="main-block">
    <div className="main-block-header">
      <div className="row align-items-center">
        <div className="col-md-9 col-sm-8">
          <label className="st-card-tl-sm com-sm-lbl">Up to {maxMonthStr}</label>
        </div>
        <div className="col-md-3 col-sm-4">
        </div>
      </div>
      {rowsHtml}
    </div>
  </div>

})

export default TableViewComments
