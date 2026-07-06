

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

    if (elementID == seasonComparisonSliderMinID) {
      seasonComparisonSliderMouseOver('min')
    }

    if (elementID == seasonComparisonSliderMaxID) {
      seasonComparisonSliderMouseOver('max')
    }

    
    
  } else if (segment == eventSegmentID) {
    
    if (elementID.includes(eventCategoriesTimingAbbID)) {
      eventsCategoriesTimingActionsMouseOver(element, kind='timing')
    }

    else if (elementID.includes(eventCategoriesActionsAbbID)) {
      eventsCategoriesTimingActionsMouseOver(element, kind='actions')
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

    if ((elementID.includes(seasonCategoriesRanksTableItemID)) & (event.relatedTarget != null)) {
      if (!event.relatedTarget.id.includes(seasonCategoriesRanksTableSpaceID)) {
        seasonCategoriesRanksTableMouseLeave()
      }
    }

    if ((elementID.includes(seasonCategoriesRanksTableSpaceID)) & (event.relatedTarget != null)) {
      if (!event.relatedTarget.id.includes(seasonCategoriesRanksTableItemID)) {
        seasonCategoriesRanksTableMouseLeave()
      }
    }

    if (elementID == seasonComparisonSliderMinID) {
      seasonComparisonSliderMouseLeave('min')
    }

    if (elementID == seasonComparisonSliderMaxID) {
      seasonComparisonSliderMouseLeave('max')
    }

    
    
  } else if (segment == eventSegmentID) {
  
    if (elementID.includes(eventCategoriesTimingAbbID)) {
      eventsCategoriesTimingActionsMouseLeave(element, kind='timing')
    }

    else if (elementID.includes(eventCategoriesActionsAbbID)) {
      eventsCategoriesTimingActionsMouseLeave(element, kind='actions')
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

  if (page == seasonRatingsPageID) {

    globalDropdownsSeasonRatings.forEach((dropdownID, i) => {
      if ((!elementID.includes(dropdownID)) & (!element.classList.contains('dropdown-s-separator'))) {
        dropdownClose(dropdownID)
      }
    })
    
  } else if (page == eventComparisonPageID) {

    globalDropdownsEventComparison.forEach((dropdownID, i) => {
      if ((!elementID.includes(dropdownID)) & (!element.classList.contains('dropdown-s-separator'))) {
        dropdownClose(dropdownID)
      }
    })
    
  } else if (page == eventPacePageID) {

    globalDropdownsWOFEventPace.forEach((dropdownID, i) => {
      if ((!elementID.includes(dropdownID)) & (!element.classList.contains('dropdown-wof-separator'))) {
        dropdownWOFClose(dropdownID)
      }
    })
      
  }


  // ----------- segment SEASON ----------- //

  if (segment == seasonSegmentID) {

    if (elementID == seasonComparisonSliderMinID) {
      seasonComparisonSliderMouseDown('min')
    }

    else if (elementID == seasonComparisonSliderMaxID) {
      seasonComparisonSliderMouseDown('max')
    }
    
  } 

  // ----------- segment EVENT ----------- //

  else if (segment == eventSegmentID) {

    
      
  }

  // ----------- segment DRIVERS ----------- //

  else if (segment == driversSegmentID) {
    
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

    else if (elementID.includes(seasonCategoriesRanksTableItemID)) {
      seasonCategoriesRanksTableMouseUp(element)
    }

    else if (elementID.includes(seasonCategoriesRanksTableRefresherID)) {
      seasonCategoriesRanksTableRefresherMouseUp(element)
    }

    else if (elementID == seasonCategoriesDescChartLine1OpenID) {
      seasonRatingsDescChartLine1Open(element)
    }

    else if (elementID == seasonCategoriesDescChartLine1CloseID) {
      seasonRatingsDescChartLine1Close(element)
    }

    else if (elementID == dropdown12ID) {
      dropdownMouseUp(dropdown12ID)
    }

    else if (elementID.includes(dropdown12MenuItemID)) {
      dropdown12ItemMouseUp(element)
    }

    else if (elementParentID.includes(menuRacesprintID)) {
      seasonMenuRacesprintMouseUp(element)
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

    if (elementID == seasonComparisonSliderMinID) {
      seasonComparisonSliderMouseUp('min')
    }

    else if (elementID == seasonComparisonSliderMaxID) {
      seasonComparisonSliderMouseUp('max')
    }

    else if (elementID == seasonComparisonSliderRefresherID) {
      seasonComparisonResfresherMouseUp()
    }

    else if (elementID == seasonPaceChart5DescIconID) {
      seasonComparisonDescChart5Open(element)
    }

    else if (elementID == seasonPaceChart5DescCloseID) {
      seasonComparisonDescChart5Close(element)
    }

    else if (elementID.includes(dropdown13MenuLeftItemID)) {
      dropdown13MouseUp(element, elementID)
    }

    else if (elementID.includes(dropdown13MenuRightItemID)) {
      dropdown13MouseUp(element, elementID)
    }

    else if (elementID.includes(dropdown15MenuItemID)) {
      dropdown15MouseUp(element)
    }

    else if (elementID.includes(dropdown16LeftMenuItemID)) {
      dropdown16LeftMouseUp(element)
    }

    else if (elementID.includes(dropdown16RightMenuItemID)) {
      dropdown16RightMouseUp(element)
    }

    else if (elementID.includes(seasonPaceCheckMeanPaceID)) {
      seasonPaceCheckMeanPaceMouseUp(element)
    }

    else if (elementID.includes(seasonPaceCheckMeanPaceSmoothID)) {
      seasonPaceCheckMeanPaceSmoothMouseUp(element)
    }

    else if (elementID == seasonPaceChart121DescIconID) {
      seasonPaceDescChart121Open(element)
    }

    else if (elementID == seasonPaceChart121DescCloseID) {
      seasonPaceDescChart121Close(element)
    }

    else if (elementID == seasonPaceChart122DescIconID) {
      seasonPaceDescChart122Open(element)
    }

    else if (elementID == seasonPaceChart122DescCloseID) {
      seasonPaceDescChart122Close(element)
    }

    else if (elementID == seasonPaceChart123DescIconID) {
      seasonPaceDescChart123Open(element)
    }

    else if (elementID == seasonPaceChart123DescCloseID) {
      seasonPaceDescChart123Close(element)
    }

    else if (elementID == seasonPaceChart124DescIconID) {
      seasonPaceDescChart124Open(element)
    }

    else if (elementID == seasonPaceChart124DescCloseID) {
      seasonPaceDescChart124Close(element)
    }

    else if (elementID == seasonPaceChart125DescIconID) {
      seasonPaceDescChart125Open(element)
    }

    else if (elementID == seasonPaceChart125DescCloseID) {
      seasonPaceDescChart125Close(element)
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

    else if (elementID == dropdown24ID) {
      dropdownMouseUp(dropdown24ID)
    }

    else if (elementID.includes(dropdown24MenuItemID)) {
      dropdown24ItemMouseUp(element)
    }

    else if (elementID.includes(iconBackward24ID) | elementID.includes(iconForward24ID)) {
      iconNav24MouseUp(element)
    }

    // else if (elementID.includes(iconBackward24ID)) {
    //   iconBackward24MouseUp()
    // }

    // else if (elementID.includes(iconForward24ID)) {
    //   iconForward24MouseUp()
    // }

    else if (elementID == dropdown23LeftID) {
      dropdownMouseUp(dropdown23LeftID)
    }
    
    else if (elementID.includes(dropdown23LeftMenuItemID)) {
      dropdown23ItemMouseUp(dropdown23LeftID, element)
    }

    else if (elementID == dropdown23RightID) {
      dropdownMouseUp(dropdown23RightID)
    }

    else if (elementID.includes(dropdown23RightMenuItemID)) {
      dropdown23ItemMouseUp(dropdown23RightID, element)
    }

    else if (elementID.includes(check231ID)) {
      check231MouseUp(element)
    }

    else if (elementID == dropdown25ID) {
    
      dropdownWOFMouseUp(dropdown25ID)
      dropdownWOFClose(dropdown26ID)
      
    }

    else if (elementID.includes(dropdown25MenuItemID)) {
      dropdown25MouseUp(element)
    }

    else if (elementID == dropdown26ID) {
    
      dropdownWOFMouseUp(dropdown26ID)
      dropdownWOFClose(dropdown25ID)
      
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

    else if (elementID.includes(eventCategoriesTimingAbbID)) {
      eventsCategoriesTimingActionsMouseUp(element, kind='timing')
    }

    else if (elementID.includes(eventCategoriesActionsAbbID)) {
      eventsCategoriesTimingActionsMouseUp(element, kind='actions')
    }

    else if (elementID == eventCategoriesTimingDescIconID) {
      eventCategoriesDescChartTimingOpen(element)
    }

    else if (elementID == eventCategoriesTimingDescCloseID) {
      eventCategoriesDescChartTimingClose(element)
    }

    else if (elementID == eventCategoriesActionsDescIconID) {
      eventCategoriesDescChartActionsOpen(element)
    }

    else if (elementID == eventCategoriesActionsDescCloseID) {
      eventCategoriesDescChartActionsClose(element)
    }

    else if (elementID == eventCategoriesTimingRefresherID) {
      eventCategoriesTimingActionsRefresherMouseUp(kind='timing')
    }

      else if (elementID == eventCategoriesActionsRefresherID) {
      eventCategoriesTimingActionsRefresherMouseUp(kind='actions')
    }

    else if (elementID == eventComparisonLaptimesDescIconID) {
      eventComparisonLaptimesOpen(element)
    }

    else if (elementID == eventComparisonLaptimesDescCloseID) {
      eventComparisonLaptimesClose(element)
    }

    else if (elementID == eventComparisonRadarDescOpenID) {
      eventComparisonRadarOpen(element)
    }

    else if (elementID == eventComparisonRadarDescCloseID) {
      eventComparisonRadarClose(element)
    }

    else if (elementID == eventPaceChart9DescIconID) {
      eventPaceChart9Open(element)
    }

    else if (elementID == eventPaceChart9DescCloseID) {
      eventPaceChart9Close(element)
    }

    else if (elementID == eventPaceChart11DescIconID) {
      eventPaceChart11Open(element)
    }

    else if (elementID == eventPaceChart11DescCloseID) {
      eventPaceChart11Close(element)
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

    // else if (elementID == driversCharacteristicsChart1DescIconID) {
    //   driversCharacteristicsChart1Open(element)
    // }

    // else if (elementID == driversCharacteristicsChart1DescCloseID) {
    //   driversCharacteristicsChart1Close(element)
    // }

    else if (elementID == driversCharacteristicsChartPentDescIconID) {
      driversCharacteristicsChartPentOpen(element)
    }

    else if (elementID == driversCharacteristicsChartPentDescCloseID) {
      driversCharacteristicsChartPentClose(element)
    }

    else if (elementID == driversComparisonChart30DescIconID) {
      driversComparisonChart30Open(element)
    }

    else if (elementID == driversComparisonChart30DescCloseID) {
      driversComparisonChart30Close(element)
    }

    else if (elementID == driversComparisonChart31DescIconID) {
      driversComparisonChart31Open(element)
    }

    else if (elementID == driversComparisonChart31DescCloseID) {
      driversComparisonChart31Close(element)
    }

    else if (elementID == driversComparisonChart32DescIconID) {
      driversComparisonChart32Open(element)
    }

    else if (elementID == driversComparisonChart32DescCloseID) {
      driversComparisonChart32Close(element)
    }

    else if (elementID == driversComparisonChart33DescIconID) {
      driversComparisonChart33Open(element)
    }

    else if (elementID == driversComparisonChart33DescCloseID) {
      driversComparisonChart33Close(element)
    }

    else if (elementID == driversComparisonChart34DescIconID) {
      driversComparisonChart34Open(element)
    }

    else if (elementID == driversComparisonChart34DescCloseID) {
      driversComparisonChart34Close(element)
    }

    else if (elementID == driversComparisonChart35DescIconID) {
      driversComparisonChart35Open(element)
    }

    else if (elementID == driversComparisonChart35DescCloseID) {
      driversComparisonChart35Close(element)
    }

    else if (elementID == driversComparisonChart36DescIconID) {
      driversComparisonChart36Open(element)
    }

    else if (elementID == driversComparisonChart36DescCloseID) {
      driversComparisonChart36Close(element)
    }

    else if (elementID == driversComparisonChart37DescIconID) {
      driversComparisonChart37Open(element)
    }

    else if (elementID == driversComparisonChart37DescCloseID) {
      driversComparisonChart37Close(element)
    }

    else if (elementID == driversComparisonChart38DescIconID) {
      driversComparisonChart38Open(element)
    }

    else if (elementID == driversComparisonChart38DescCloseID) {
      driversComparisonChart38Close(element)
    }

    
  
  }

})


// SAVE CHART BY CLICKING KEYBOARD LETTER 'S'
document.addEventListener("keyup", (event) => {
  
  if (event.key == 's' || event.key == 'ы') {

    // downloadSVG('chart-line-1', 'chart-line-1')
    // downloadSVG('svg-season-drivers-hbars-1', 'svg-season-drivers-hbars')
    // downloadSVG('chart-5-iaem6t', 'chart-5-iaem6t')
    // downloadSVG('chart-7-v9l10p', 'chart-7-v9l10p')
    // downloadSVG('chart-line-3-svg-chart-1', 'chart')
    // downloadSVG('chart-line-4-svg-chart-1', 'chart')
    // downloadSVG('svg-events-plot-metrics', 'chart')
    // downloadSVG('svg-event-categories-chart-timing', 'svg-event-categories-chart-timing')
    // downloadSVG('svg-event-categories-chart-bars-consistency', 'svg-event-categories-chart-bars-consistency')
    // downloadSVG('svg-event-categories-chart-bars-pace', 'svg-event-categories-chart-bars-pace')
    // downloadSVG('svg-event-categories-chart-actions', 'svg-event-categories-chart-actions')
    // downloadSVG('svg-event-categories-chart-bars-start', 'svg-event-categories-chart-bars-start')
    // downloadSVG('svg-event-categories-chart-bars-overtakes', 'svg-event-categories-chart-bars-overtakes')
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
    // downloadSVG('chart-12-1-1', 'chart-12-1-1')
    // downloadSVG('chart-12-2-1', 'chart-12-2-1')
    // downloadSVG('chart-12-v-1', 'chart-12-v-1')
    // downloadSVG('chart-12-d-1', 'chart-12-d-1')
    // downloadSVG('chart-12-lc-1', 'chart-12-lc-1')
    // downloadSVG('chart-5-iaem6t', 'chart-5-iaem6t')
    // downloadSVG('chart-3-0', 'chart-3-0')
    // downloadSVG('chart-3-1', 'chart-3-1')
    // downloadSVG('chart-3-2', 'chart-3-2')
    // downloadSVG('chart-3-3', 'chart-3-3')
    // downloadSVG('chart-3-4', 'chart-3-4')
    // downloadSVG('chart-3-5', 'chart-3-5')
    // downloadSVG('chart-3-6', 'chart-3-6')
    // downloadSVG('chart-3-7', 'chart-3-7')
    // downloadSVG('chart-3-8', 'chart-3-8')
    // downloadSVG('yqieku856l-track', 'yqieku856l-track')


    

    

    
  }
  
})















