

// ------------------------------------------ CONTENT SCREEN ------------------------------------------ //


let segment 
let page

let element
let elementParent

let elementID
let elementParentID

// ------------------------------------------ MOUSE OVER ------------------------------------------ //


getElement(clickaAreaContentID).addEventListener('mouseover', (event) => {

  segment = glVGlobal['Segment']
  page = glVGlobal['Page']

  element = event.target
  elementParent = element.parentElement

  elementID = element.id
  elementParentID = elementParent.id

  if (segment == seasonSegmentID) {

    if (elementID.includes(seasonCategoriesElementsID)) {
      seasonCategoriesElementMouseHover(event)
    }

    else if (elementID.includes(infoIcon1ID)) {
      info1TableOn()
    }
    
  }
  
})


// ------------------------------------------ MOUSE LEAVE ------------------------------------------ //


getElement(clickaAreaContentID).addEventListener('mouseout', (event) => {

  segment = glVGlobal['Segment']
  page = glVGlobal['Page']

  element = event.target
  elementParent = element.parentElement

  elementID = element.id
  elementParentID = elementParent.id

  if (segment == seasonSegmentID) {

    if (elementID.includes(seasonCategoriesElementsID)) {
      seasonCategoriesElementMouseHover(event)
    }
    
    else if (elementID.includes(infoIcon1ID)) {
      info1TableOff()
    }
    
  }
  
})


// -------------------------- MOUSEDOWN / MOUSEUP -------------------------- //

getElement(clickaAreaContentID).addEventListener('mousedown', (event) => {

  segment = glVGlobal['Segment']
  page = glVGlobal['Page']

  element = event.target
  elementParent = element.parentElement

  elementID = element.id
  elementParentID = elementParent.id

  // ----------- segment SEASON ----------- //

  if (segment == seasonSegmentID) {
    
  } 

  // ----------- segment EVENT ----------- //

  else if (segment == eventSegmentID) {

    
    
  }

  // ----------- segment DRIVERS ----------- //

  else if (segment == driversSegmentID) {
    
  }
  
})

// document.body.addEventListener('mousedown', (event) => {
getElement(clickaAreaContentID).addEventListener('mouseup', (event) => {

  // segment = glVGlobal['Segment']
  // page = glVGlobal['Page']

  // element = event.target
  // elementParent = element.parentElement

  // elementID = element.id
  // elementParentID = elementParent.id


  // ----------- segment MAIN ----------- //

  if (segment == mainSegmentID) {

    if (elementID.includes(mainTitleScrollelementID)) {

      mainTitleScrollToElement(element)
      
    }
    
  }

  // ----------- segment SEASON ----------- //

  else if (segment == seasonSegmentID) {

    if (elementID.includes(menuYears11ItemID)) {
      seasonMenuYearsMouseUp(element)
    }

    else if (elementID.includes(seasonCategoriesElementsID)) {
      seasonCategoriesElementMouseUp(element)
    }

    else if (!(elementID.includes(seasonCategoriesElementsID)
        || elementID.startsWith('chart-lol-1-hover-circle'))
        && (elementID.includes(containerAggTable2ID) || elementID.includes('svg-season-categories-lol'))) {
      seasonCategoriesDocumentMouseUp(event)
    }

    else if (elementID.includes(dropdown12MenuItemID)) {
      dropdown12MouseUp(element)
    }

    else if (elementParentID.includes(radio11ID)) {
      radio11MouseUp(element)
    }

    else if (elementID.includes(dropdown13MenuCenterItemID)) {
      dropdown13CenterMouseUp(element)
    }

    else if (elementID.includes(iconNavBackward13ID)) {
      iconBackward13CenterMouseUp()
    }

    else if (elementID.includes(iconNavForward13ID)) {
      iconForward13CenterMouseUp()
    }

    else if (elementID.includes(dropdown14MenuItemID)) {
      dropdown14MouseUp(element)
    }

    else if (elementID.includes(dropdown13MenuLeftItemID)) {
      dropdown13MouseUp(element, elementID)
    }

    else if (elementID.includes(dropdown13MenuRightItemID)) {
      dropdown13MouseUp(element, elementID)
    }

    else if (elementParentID.includes(radio12ID)) {
      radio12MouseUp(element)
    }

  }

  // ----------- segment EVENT ----------- //

  else if (segment == eventSegmentID) {

    clearWrongEventMessage()

    if (elementID.includes(menuYears21ItemID)) {
      eventMenuYearsMouseUp(element)
    }

    else if (elementID.includes(menuEvents21ItemID)) {
      eventMenuEventsMouseUp(element)
    }

    else if (elementID.includes(wrongEventCloseIconID)) {
      eventWrongMessageClose()
    }

    else if (elementID.includes(dropdown24MenuItemID)) {
      dropdown24MouseUp(element)
    }

    else if (elementID.includes(iconBackward24ID)) {
      iconBackward24MouseUp()
    }

    else if (elementID.includes(iconForward24ID)) {
      iconForward24MouseUp()
    }

    else if (elementID.includes(dropdown23LeftMenuItemID)) {
      dropdown23MouseUp(element)
    }

    else if (elementID.includes(dropdown23RightMenuItemID)) {
      dropdown23MouseUp(element)
    }

    else if (elementID.includes(eventComparisonIcon23LeftBackwardID)) {
      iconBackward23MouseUp(elementID)
    }

    else if (elementID.includes(eventComparisonIcon23LeftForwardID)) {
      iconForward23MouseUp(elementID)
    }

    else if (elementID.includes(eventComparisonIcon23RightBackwardID)) {
      iconBackward23MouseUp(elementID)
    }

    else if (elementID.includes(eventComparisonIcon23RightForwardID)) {
      iconForward23MouseUp(elementID)
    }

    else if (elementParentID.includes(check231ID)) {
      check231MouseUp(element)
    }

    else if (elementID.includes(dropdown25MenuItemID)) {
      dropdown25MouseUp(element)
    }

    else if (elementID.includes(dropdown26MenuItemID)) {
      dropdown26MouseUp(element)
    }

    else if (elementParentID.includes(radio21ID)) {
      radio21MouseUp(element)
    }

    else if (elementID == refresh21ID) {
      refresh21MouseUp(element)
    }



  } 
  
  // ----------- segment DRIVERS ----------- //

  else if (segment == driversSegmentID) {

    // driver primary dropdown
    if (elementID.includes(dropdown31MenuItemID)) {
      dropdown31MouseUp(element)
    }

    // driver primary seasons
    else if (elementID.includes(dropdown32MenuItemID)) {
      dropdown32MouseUp(element)
    }

    // driver primary seasons icon backward
    else if (elementID.includes(iconBackward32ID)) {
      iconBackward32MouseUp()
    }

    // driver primary seasons icon forward
    else if (elementID.includes(iconForward32ID)) {
      iconForward32MouseUp()
    }

    // driver primary seasons
    else if (elementID.includes(dropdown34MenuItemID)) {
      dropdown34MouseUp(element)
    }

    else if (elementID.includes(iconBackward34ID)) {
      iconBackward34MouseUp()
    }

    else if (elementID.includes(iconForward34ID)) {
      iconForward34MouseUp()
    }

    else if (elementID.includes(dropdown33MenuItemID)) {
      dropdown33MouseUp(element)
    }

    else if (elementID.includes(dropdown35MenuItemID)) {
      dropdown35MouseUp(element)
    }

    else if (elementID.includes(iconBackward36ID)) {
      iconBackward36MouseUp()
    }

    else if (elementID.includes(iconForward36ID)) {
      iconForward36MouseUp()
    }

    else if (elementID.includes(dropdown36MenuItemID)) {
      dropdown36MouseUp(element)
    }

    else if (elementID.includes(dropdown37MenuItemID)) {
      dropdown37MouseUp(element)
    }

    else if (elementID.includes(iconBackward37ID)) {
      iconBackward37MouseUp()
    }

    else if (elementID.includes(iconForward37ID)) {
      iconForward37MouseUp()
    }

    else if (elementID.includes(driversTablesMainTableCellID)) {
      driversTablesTable31MouseUp(element)
    }

    else if (elementID.includes(dropdown38MenuItemID)) {
      dropdown38MouseUp(element)
    }

    else if ((glVGlobal['Page'] == driversTablesPageID) & (!elementID.includes(driversTablesMainTableCellID))
      & !elementID.includes(driversTablesMainTableID)
      & !elementID.includes(dropdown38ID)
      & !elementID.includes(dropdown37ID)
      & !elementID.includes(iconBackward37ID)
      & !elementID.includes(iconForward37ID)) {

      driversResetTable1(data_4)

      glVTables['ClickedColumn'] = null
      glVTables['ClickedColumnAscending'] = null
      
    }
    
  }

  

})


// SAVE CHART BY CLICKING KEYBOARD LETTER 'S'
document.addEventListener("keyup", (event) => {
  
  if (event.key == 's' || event.key == 'ы') {

    // downloadSVG('svg-season-categories-lol-0', 'svg-season-categories-lol')
    // downloadSVG('svg-season-categories-line-0', 'svg-season-categories-line')
    // downloadSVG('svg-season-drivers-hbars-1', 'svg-season-drivers-hbars')
    // downloadSVG('chart-5-iaem6t', 'chart-5-iaem6t')
    downloadSVG('chart-7-v9l10p', 'chart-7-v9l10p')
    // downloadSVG('chart-line-3-svg-chart-1', 'chart')
    // downloadSVG('chart-line-4-svg-chart-1', 'chart')
    // downloadSVG('svg-events-plot-metrics', 'chart')
    // downloadSVG('svg-event-categories-chart-timing', 'svg-event-categories-chart-timing')
    // downloadSVG('svg-event-categories-chart-bars-consistency', 'svg-event-categories-chart-bars-consistency')
    // downloadSVG('svg-event-categories-chart-bars-pace', 'svg-event-categories-chart-bars-pace')
    // downloadSVG('svg-event-categories-chart-actions', 'chart')
    // downloadSVG('svg-event-categories-chart-bars-start', 'chart')
    // downloadSVG('svg-event-categories-chart-bars-overtakes', 'chart')
    // downloadSVG('svg-event-comparison-radar', 'svg-event-comparison-radar')
    // downloadSVG('svg-laptimes-plot-laptimes-left', 'svg-laptimes-plot-laptimes-left')
    // downloadSVG('svg-laptimes-plot-laptimes-right', 'svg-laptimes-plot-laptimes-right')
    // downloadSVG('svg-laptimes-difference-plot-laptimes-difference', 'svg-laptimes-difference-plot-laptimes-difference')
    // downloadSVG('chart-9-1', 'chart-9-1')
    // downloadSVG('chart-11-1', 'chart-11-1')
    // downloadSVG('svg-chart-pent-chart-pent-1', 'svg-chart-pent-chart-pent-1')
    // downloadSVG('chart-1-0', 'chart-1-0')
    // downloadSVG('chart-2-1', 'chart-2-1')
    // downloadSVG('svg-chart-pent-chart-pent-2', 'svg-chart-pent-chart-pent-2')
    // downloadSVG('svg-drivers-comparison-chart-line', 'chart')
    // downloadSVG('chart-8-gl2g97', 'chart-8-gl2g97')

    

    
  }
  
})

















