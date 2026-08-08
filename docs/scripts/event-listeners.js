

// ------------------------------------------ CONTENT SCREEN ------------------------------------------ //


let segment 
let page

let element
let elementParent

let elementID
let elementParentID

// ------------------------------------------ MOUSE OVER ------------------------------------------ //


getElement(pageContainerID).addEventListener('mouseover', (event) => {

  segment = glVGlobal['Segment']
  page = glVGlobal['Page']

  element = event.target
  elementParent = element.parentElement

  elementID = element.id
  elementParentID = elementParent.id

  if (segment == seasonSegmentID) {

    if (elementID.includes(seasonCategoriesRanksTableItemID)) {
      seasonCategoriesRanksTableMouseOver(element)
    }

    // if (elementID == seasonComparisonSliderMinID) {
    //   seasonComparisonSliderMouseOver('min')
    // }

    // if (elementID == seasonComparisonSliderMaxID) {
    //   seasonComparisonSliderMouseOver('max')
    // }

    
    
  } else if (segment == eventSegmentID) {

    if (elementID.includes(eventCategoriesTimingAbbID)) {
      eventsCategoriesTimingActionsMouseOver(element, kind='timing')
    }

    else if (elementID.includes(eventCategoriesActionsAbbID)) {
      eventsCategoriesTimingActionsMouseOver(element, kind='actions')
    }

    else if (elementID.includes(eventsRatingsChartMetricsItemID)) {
      eventRatingsChartMetricsMouseOver(elementID)
    }


    
    
  }
  
})


// ------------------------------------------ MOUSE LEAVE ------------------------------------------ //


getElement(pageContainerID).addEventListener('mouseout', (event) => {

  segment = glVGlobal['Segment']
  page = glVGlobal['Page']

  element = event.target
  elementParent = element.parentElement

  elementID = element.id
  elementParentID = elementParent.id

  if (segment == seasonSegmentID) {

    // if mouse leave item
    if ((elementID.includes(seasonCategoriesRanksTableItemID)) & (event.relatedTarget != null)) {
      if (!event.relatedTarget.id.includes(seasonCategoriesRanksTableSpaceID)) {
        seasonCategoriesRanksTableMouseLeave()
      }
    }

    // if mouse leaving space between items
    if ((elementID.includes(seasonCategoriesRanksTableSpaceID)) & (event.relatedTarget != null)) {
      if (!event.relatedTarget.id.includes(seasonCategoriesRanksTableItemID)) {
        seasonCategoriesRanksTableMouseLeave()
      }
    }

    // if (elementID == seasonComparisonSliderMinID) {
    //   seasonComparisonSliderMouseLeave('min')
    // }

    // if (elementID == seasonComparisonSliderMaxID) {
    //   seasonComparisonSliderMouseLeave('max')
    // }

    
    
  } else if (segment == eventSegmentID) {

    if (elementID.includes(eventCategoriesTimingAbbID)) {
      eventsCategoriesTimingActionsMouseLeave(element, kind='timing')
    }

    else if (elementID.includes(eventCategoriesActionsAbbID)) {
      eventsCategoriesTimingActionsMouseLeave(element, kind='actions')
    }

    else if (elementID.includes(eventsRatingsChartMetricsItemID)) {
      eventRatingsChartMetricsMouseLeave(elementID)
    }
  
    
    
  }
  
})


// -------------------------- MOUSEDOWN -------------------------- //

getElement(pageContainerID).addEventListener('mousedown', (event) => {

  segment = glVGlobal['Segment']
  page = glVGlobal['Page']

  element = event.target
  elementParent = element.parentElement

  elementID = element.id
  elementParentID = elementParent.id

  
  // ----------- segment SEASON ----------- //

  if (segment == seasonSegmentID) {

    // close season years dropdowns
    globalDropdownsSeason.forEach((dropdownID, i) => {
      dropdownClose(dropdownID, elementID, element)
    })

    // ----------------- by pages ----------------- //

    if (page == seasonRatingsPageID) {

      // close season ratings dropdowns
      globalDropdownsSeasonRatings.forEach((dropdownID, i) => {
        dropdownClose(dropdownID, elementID, element)
      })
  
      // close season ratings download menus
      seasonRatingsDownloads.forEach((downloadID, i) => {
        downloadButtonClose(downloadID, elementID)
      })
      
    } 
  
    else if (page == seasonComparisonPageID) {
  
      // close season comparison dropdowns
      globalDropdownsSeasonComparison.forEach((dropdownID, i) => {
        dropdownClose(dropdownID, elementID, element)
      })

      // close season comparison download menus
      seasonComparisonDownloads.forEach((downloadID, i) => {
        downloadButtonClose(downloadID, elementID)
      })
      
    }
  
    else if (page == seasonPacePageID) {
  
      // close season pace dropdowns
      globalDropdownsSeasonPace.forEach((dropdownID, i) => {
        dropdownClose(dropdownID, elementID, element)
      })

      // close season pace download menus
      seasonPaceDownloads.forEach((downloadID, i) => {
        downloadButtonClose(downloadID, elementID)
      })
      
    }

    // ----------------- for all pages ----------------- //

    if (elementID == seasonComparisonSliderMinID) {
      seasonComparisonSliderMouseDown('min')
    }

    else if (elementID == seasonComparisonSliderMaxID) {
      seasonComparisonSliderMouseDown('max')
    }
    
  } 

  // ----------- segment EVENT ----------- //

  else if (segment == eventSegmentID) {

    // close event years dropdowns
    globalDropdownsEvents.forEach((dropdownID, i) => {
      dropdownClose(dropdownID, elementID, element)
    })

    // ----------------- by pages ----------------- //

    if (page == eventResultsPageID) {

      
      
    }

    else if (page == eventCategoriesPageID) {

      // close event categories download menues
      globalEventCategoriesDownloads.forEach((downloadID, i) => {
        downloadButtonClose(downloadID, elementID)
      })
        
    }
  
    else if (page == eventComparisonPageID) {
  
      // close event comparison dropdowns
      globalDropdownsEventComparison.forEach((dropdownID, i) => {
        dropdownClose(dropdownID, elementID, element)
      })
  
      // close event comparison download menus
      eventComparisonDownloads.forEach((downloadID, i) => {
        downloadButtonClose(downloadID, elementID)
      })
  
    }
      
    else if (page == eventPacePageID) {
  
      // close event pace dropdowns
      globalDropdownsEventPace.forEach((dropdownID, i) => {
        dropdownClose(dropdownID, elementID, element)
      })
  
      // close event pace download menus
      eventPaceDownloads.forEach((downloadID, i) => {
        downloadButtonClose(downloadID, elementID)
      })
        
    }

    // ----------------- for all pages ----------------- //

    
    
      
  }

  // ----------- segment DRIVERS ----------- //

  else if (segment == driversSegmentID) {

    // ----------------- by pages ----------------- //

    if (page == driversCharacteristicsPageID) {

      // close drivers charactertistics dropdowns
      globalDropdownsDriversCharacteristics.forEach((dropdownID, i) => {
        dropdownClose(dropdownID, elementID, element)
      })
      
    }
    
  }
  
})


// -------------------------- MOUSEUP -------------------------- //


// document.body.addEventListener('mousedown', (event) => {
getElement(pageContainerID).addEventListener('mouseup', (event) => {

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

    else if (elementParentID.includes(menuRacesprintID)) {
      seasonMenuRacesprintMouseUp(element)
    }

    else if (elementID.includes(seasonCategoriesRanksTableItemID)) {
      seasonCategoriesRanksTableMouseUp(element)
    }

    else if (elementID.includes(seasonCategoriesRanksTableRefresherID)) {
      seasonCategoriesRanksTableRefresherMouseUp(element)
    }

    else if (elementID.includes(dropdown12MenuItemID)) {
      dropdown12ItemMouseUp(element)
    }

    else if (elementID.includes(dropdown13MenuCenterItemID)) {
      dropdown13CenterItemMouseUp(elementID)
    }

    else if (elementID.includes(dropdown14MenuItemID)) {
      dropdown14MouseUp(element)
    }

    if (elementID == seasonComparisonSliderMinID) {
      seasonComparisonSliderMouseUp('min')
    }

    else if (elementID == seasonComparisonSliderMaxID) {
      seasonComparisonSliderMouseUp('max')
    }

    else if (elementID == seasonComparisonSliderRefresherID) {
      seasonComparisonResfresherMouseUp()
    }

    else if (elementID.includes(dropdown13MenuLeftItemID)) {
      dropdown13ItemMouseUp(element, elementID)
    }

    else if (elementID.includes(dropdown13MenuRightItemID)) {
      dropdown13ItemMouseUp(element, elementID)
    }

    else if (elementID.includes(dropdown15MenuItemID)) {
      dropdown15ItemMouseUp(elementID)
    }

    else if (elementID.includes(dropdown16MenuItemID)) {
      dropdown16ItemMouseUp(element)
    }

    else if (elementID.includes(dropdown17MenuItemID)) {
      dropdown17ItemMouseUp(element)
    }

    else if (elementID.includes(seasonPaceCheckMeanPaceID)) {
      seasonPaceCheckMeanPaceMouseUp(element)
    }

    else if (elementID.includes(seasonPaceCheckMeanPaceSmoothID)) {
      seasonPaceCheckMeanPaceSmoothMouseUp(element)
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

    else if (elementID.includes(dropdown27MenuItemID)) {
      dropdown27ItemMouseUp(elementID)
    }
    
    else if (elementID.includes(dropdown23MenuItemID)) {
      dropdown23ItemMouseUp(dropdown23ID, element)
    }

    else if (elementID.includes(dropdown24MenuItemID)) {
      dropdown24ItemMouseUp(dropdown24ID, element)
    }

    else if (elementID.includes(check231ID)) {
      check231MouseUp(element)
    }

    else if (elementID.includes(dropdown25MenuItemID)) {
      dropdown25ItemMouseUp(element)
    }

    else if (elementID.includes(dropdown26MenuItemID)) {
      dropdown26ItemMouseUp(element)
    }

    else if (elementParentID.includes(radio21ID)) {
      radio21MouseUp(element)
    }

    else if (elementID == refresh21ID) {
      refresh21MouseUp(element)
    }

    else if (elementID.includes(eventCategoriesTimingAbbID)) {
      eventsCategoriesTimingActionsMouseUp(element, kind='timing')
    }

    else if (elementID.includes(eventCategoriesActionsAbbID)) {
      eventsCategoriesTimingActionsMouseUp(element, kind='actions')
    }

    else if (elementID == eventCategoriesTimingRefresherID) {
      eventCategoriesTimingActionsRefresherMouseUp(kind='timing')
    }

    else if (elementID == eventCategoriesActionsRefresherID) {
      eventCategoriesTimingActionsRefresherMouseUp(kind='actions')
    }

    else if (elementID == eventPaceLapByLapCheckID) {
      eventPaceLapByLapCheckMouseUp(element)
    }

    

  } 
  
  // ----------- segment DRIVERS ----------- //

  else if (segment == driversSegmentID) {

    // driver primary dropdown
    if (elementID.includes(dropdown31MenuItemID)) {
      dropdown31ItemMouseUp(element)
    }

    // driver primary seasons
    else if (elementID.includes(dropdown32MenuItemID)) {
      dropdown32ItemMouseUp(element)
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

    // downloadD3SvgAsSVG('chart-line-1', 'chart-line-1')
    // downloadD3SvgAsSVG('svg-season-drivers-hbars-1', 'svg-season-drivers-hbars')
    // downloadD3SvgAsSVG('chart-5-iaem6t', 'chart-5-iaem6t')
    // downloadD3SvgAsSVG('chart-5-iaem6t-2', 'chart-5-iaem6t-2')
    // downloadD3SvgAsSVG('chart-7-v9l10p', 'chart-7-v9l10p')
    // downloadD3SvgAsSVG('chart-line-3-svg-chart-1', 'chart')
    // downloadD3SvgAsSVG('chart-line-4-svg-chart-1', 'chart')
    // downloadD3SvgAsSVG('svg-events-plot-metrics', 'chart')
    // downloadD3SvgAsSVG('svg-event-categories-chart-timing', 'svg-event-categories-chart-timing')
    // downloadD3SvgAsSVG('svg-event-categories-chart-bars-consistency', 'svg-event-categories-chart-bars-consistency')
    // downloadD3SvgAsSVG('svg-event-categories-chart-bars-pace', 'svg-event-categories-chart-bars-pace')
    // downloadD3SvgAsSVG('svg-event-categories-chart-actions', 'svg-event-categories-chart-actions')
    // downloadD3SvgAsSVG('svg-event-categories-chart-bars-start', 'svg-event-categories-chart-bars-start')
    // downloadD3SvgAsSVG('svg-event-categories-chart-bars-overtakes', 'svg-event-categories-chart-bars-overtakes')
    // downloadD3SvgAsSVG('svg-event-comparison-radar', 'svg-event-comparison-radar')
    // downloadD3SvgAsSVG('svg-laptimes-plot-laptimes-left', 'svg-laptimes-plot-laptimes-left')
    // downloadD3SvgAsSVG('svg-laptimes-plot-laptimes-right', 'svg-laptimes-plot-laptimes-right')
    // downloadD3SvgAsSVG('svg-laptimes-difference-plot-laptimes-difference', 'svg-laptimes-difference-plot-laptimes-difference')
    // downloadD3SvgAsSVG('chart-9-1', 'chart-9-1')
    // downloadD3SvgAsSVG('chart-11-1', 'chart-11-1')
    // downloadD3SvgAsSVG('svg-chart-pent-chart-pent-1', 'svg-chart-pent-chart-pent-1')
    // downloadD3SvgAsSVG('chart-1-0', 'chart-1-0')
    // downloadD3SvgAsSVG('chart-2-1', 'chart-2-1')
    // downloadD3SvgAsSVG('svg-chart-pent-chart-pent-2', 'svg-chart-pent-chart-pent-2')
    // downloadD3SvgAsSVG('svg-drivers-comparison-chart-line', 'chart')
    // downloadD3SvgAsSVG('chart-8-gl2g97', 'chart-8-gl2g97')
    // downloadD3SvgAsSVG('chart-12-1-1', 'chart-12-1-1')
    // downloadD3SvgAsSVG('chart-12-2-1', 'chart-12-2-1')
    // downloadD3SvgAsSVG('chart-12-v-1', 'chart-12-v-1')
    // downloadD3SvgAsSVG('chart-12-d-1', 'chart-12-d-1')
    // downloadD3SvgAsSVG('chart-12-lc-1', 'chart-12-lc-1')
    // downloadD3SvgAsSVG('chart-5-iaem6t', 'chart-5-iaem6t')
    // downloadD3SvgAsSVG('chart-3-0', 'chart-3-0')
    // downloadD3SvgAsSVG('chart-3-1', 'chart-3-1')
    // downloadD3SvgAsSVG('chart-3-2', 'chart-3-2')
    // downloadD3SvgAsSVG('chart-3-3', 'chart-3-3')
    // downloadD3SvgAsSVG('chart-3-4', 'chart-3-4')
    // downloadD3SvgAsSVG('chart-3-5', 'chart-3-5')
    // downloadD3SvgAsSVG('chart-3-6', 'chart-3-6')
    // downloadD3SvgAsSVG('chart-3-7', 'chart-3-7')
    // downloadD3SvgAsSVG('chart-3-8', 'chart-3-8')
    // downloadD3SvgAsSVG('yqieku856l-track', 'yqieku856l-track')


    

    

    
  }
  
})















