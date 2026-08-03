

function eventAppearElements(page) {

  if (page == eventResultsPageID) {
    
    appearElement(containerEventsRatingID)
    
  } else if (page == eventCategoriesPageID) {
    
    appearElement(containerEventsCategoriesID)
    
  } else if (page == eventComparisonPageID) {
    
    appearElement(containerEventsComparisonID)
    
  } else if (page == eventPacePageID) {
    
    appearElement(containerEventsPaceID)
    
  }

}


function eventMenuSetPaddingLeft(pageContainerID) {

  let menuEl = getElement(eventsMenuContainerID)
  
  let menuPaddingLeft = parseFloat(window.getComputedStyle(getElement(pageContainerID)).paddingLeft)
  menuPaddingLeft = convertPixelsToRem(menuPaddingLeft)
  
  menuEl.style.paddingLeft = `${menuPaddingLeft}rem`
  
}


function eventUpdatePaths(raceID, sprintIndex, seasonID, teamLeftID, teamRightID) {

  pathSummaryActual = pathSummary + raceID + '.csv'

  event_path_data_9 = pathSeasonData + seasonID + '/' + 'data_9_' + seasonID + '_' + sprintIndex + '.csv'

  if (teamLeftID) {
    event_path_data_8_left = pathSeasonData + seasonID + '/data_8/' + 'data_8_' + seasonID + '_' + sprintIndex + '_' + teamLeftID + '.csv'
  }

  if (teamRightID) {
    event_path_data_8_right = pathSeasonData + seasonID + '/data_8/' + 'data_8_' + seasonID + '_' + sprintIndex + '_' + teamRightID + '.csv'
  }
  

}


function eventMenuYearsMouseUp(element) {

  appearLoader(loaderID)

  pageContainerGetScroll()

  // refresh
  eventGlobalsVariablesRefresh()

  // get SeasonID
  let seasonID = element.getAttribute('SeasonID')
  glVEvent['SeasonID'] = seasonID

  // update calendar
  eventCalendar = copyObject(calendar)
  eventCalendar = eventCalendar.filter(o => o['SeasonID'] == glVEvent['SeasonID'])

  // title
  let title = getElement(menuYears21TitleID)
  title.textContent = seasonID

  // update page
  eventLoadPages(glVGlobal['Page'], kind='year')

}


function eventMenuEventsFill(menuID, itemID, eventsData) {

  let menu = getElement(menuID)

  // clear div
  menu.innerHTML = ''

  eventsData.forEach((eventData, i) => {

    let eventID = eventData['EventID']
    let abb = eventData['EventAbbreviation']
    let available = eventData['DataAvailable']
    let name = eventData['EventNameRus']

    let el = document.createElement('div')

    if (available == 1) {
      el.className = 'menu-events-abb-item'
    } else{
      el.className = 'menu-events-abb-item menu-events-abb-item-na'
    }
    
    el.id = itemID + '-' + eventID
    el.setAttribute('eventID', eventID)
    
    el.textContent = `${abb}`

    menu.appendChild(el)
    
  })

}


function eventMenuEventsSelection(menuID, EventID) {

  let menu = getElement(menuID)

  arrayFromElementChildren(menu).forEach((item, i) => {
    
    item.classList.remove('menu-events-abb-item-active')

    if (item.getAttribute('EventID') == EventID) {
      item.classList.add('menu-events-abb-item-active')
    }

  })
  
}


function eventMenuEventsMouseUp(element) {

  appearLoader(loaderID)

  pageContainerGetScroll()

  eventGlobalsVariablesRefresh()

  glVEvent['EventID'] = element.getAttribute('EventID')

  eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])

  eventLoadPages(glVGlobal['Page'], kind='event')

}


function eventUpdateEventInfoByRaceID() {

  // Current Event Data
  let condition = (o) => (o['RaceID'] == glVEvent['RaceID'])
  eventCurrentEvent = eventCalendar.filter(o => condition(o))[0]

  glVEvent['EventID'] = eventCurrentEvent['EventID']
  glVEvent['EventNameRus'] = eventCurrentEvent['EventNameRus']
  glVEvent['EventAbbreviation'] = eventCurrentEvent['EventAbbreviation']

}


function updateWeatherConditions(eventData) {

  let airTemp = eventData['AirTemp']
  let trackTemp = eventData['TrackTemp']

  let weatherConditions = getElement(eventWeatherConditionsID)

  let type = eventData['Conditions']

  weatherConditions.src = `img/weather/${iconsConditions[type]['Filename']}.svg`

  // weatherConditions.style.width = iconsConditions[type]['Width']
  weatherConditions.style.marginTop = iconsConditions[type]['MarginTopIcon']
  weatherConditions.style.visibility = 'visible'

  let weatherConditionsText = getElement(eventWeatherConditionsTextID)
  
  // weatherConditionsText.innerHTML = `${eventData['ConditionsRus']}`
  // weatherConditionsText.style.marginLeft = iconsConditions[type]['MarginLeftText']
  
  // getElement(eventWeatherAirID).innerHTML = `Воздух: ` + airTemp + ` &deg;C`
  // getElement(eventWeatherTrackID).innerHTML = `Асфальт: ` + trackTemp + ` &deg;C`
  // getElement(eventWeatherWindspeedID).innerHTML = `Ветер: ${eventData['WindSpeed']} м/с`
  // getElement(eventWeatherHumidityID).innerHTML = `Влажность: ${eventData['Humidity']} %`

  getElement(eventWeatherAirID).innerHTML = `${airTemp} &deg;C`
  getElement(eventWeatherTrackID).innerHTML = `${trackTemp} &deg;C`
  getElement(eventWeatherWindspeedID).innerHTML = `${eventData['WindSpeed']} м/с`
  getElement(eventWeatherHumidityID).innerHTML = `${eventData['Humidity']} %`

}


function eventEventInformationUpdate() {

  let currentSessionType

  let titleEvent = eventCurrentEvent['EventNameRusClear']

  if (eventCurrentEvent['SprintIndex'] == 0) {
    getElement(eventEventInfoTrackName2ID).style.width = 'auto'
    getElement(eventEventInfoTrackName2ID).style.visibility = 'visible'
  } else {
    getElement(eventEventInfoTrackName2ID).style.width = 0
    getElement(eventEventInfoTrackName2ID).style.visibility = 'hidden'
  }

  setText(containerEventInformationDate, eventCurrentEvent['EventDateMod'])

  // set event name
  setText(eventEventInfoEventNameID, titleEvent)

  // set track and race number text
  setText(
    eventEventInfoTrackName1ID,
    `${eventCurrentEvent['EventNumber']} из ${eventCurrentEvent['EventsTotal']}`)
  
  // setText(
  //   eventEventInfoTrackName2ID,
  //   `${currentSessionType}`)
  
  setText(
    eventEventInfoTrackName3ID,
    `${eventCurrentEvent[_circuitNameRus]}`)

  // set flag
  let pathFlag = pathImgNationsRect + `${eventCurrentEvent['CountryAbbreviation']}.svg`
  getElement(eventEventInfoFlagID).src = pathFlag

  // update weather conditions
  updateWeatherConditions(eventCurrentEvent)

}


function eventTable21Create() {

  if (getElement('events-ratings-protocol')) { getElement('events-ratings-protocol').innerHTML = '' }

  let captions = ['Имя', 'Время',  'Старт', 'Финиш', 'Очки']
  let metrics = ['FullName', 'Time', 'GLabel', 'PLabel', 'PointsOfficial', 'Number']

  let protocol = copyObject(event_summary)
  protocol = sortObject(protocol, _porder, true)
  protocol = objectDropColumns(protocol, metrics)

  tableAddRow(
    'events-ratings-protocol',
    captions,
    addBorder=true,
    addIndex=true,
    attributes={
      index: '',
      rowClassList: 'tables-row tables-cell-2-1-row mb-05 mt-075',
      cellClassList: 'tables-cell tables-cell-2-1 tables-cell-2-1-caption',
      fontClassList: 'tables-font tables-font-caption',
      nameCellClassList: 'tables-cell-2-1-name',
      indexClassList: 'tables-cell-index tables-cell-2-1-index',
      hoverClass: '',
      additionalCellClasses: [{cellIndex: 2, cellClass: 'tables-cell-2-1-time'}]
    },
    cellAttributes={})

  protocol.forEach((obj, i) => {

    values = Object.values(obj)

    // remove Number column
    values.splice(-1, 1)

    let number = obj['Number']    

    tableAddRow(
      'events-ratings-protocol',
      values,
      addBorder=false,
      addIndex=true,
      attributes={
        index: i + 1,
        rowClassList: 'tables-row tables-cell-2-1-row',
        cellClassList: 'tables-cell tables-cell-2-1',
        fontClassList: 'tables-font',
        nameCellClassList: 'tables-cell-2-1-name',
        indexClassList: 'tables-cell-index tables-cell-2-1-index',
        rowID: 'event-table-protocol-row-' + String(number),
        hoverClass: '',
        additionalCellClasses: [{cellIndex: 2, cellClass: 'tables-cell-2-1-time'}]
      },
      cellAttributes={
        // id: IDs
      })
    
  })
  
}


function eventRatingsChartMetricsMouseOver(elementID) {

  if (notMobileDevice) {

    let element = getElement(elementID)
  
    let number = element.getAttribute('number')
    let color = element.getAttribute('color')
  
    let colorDark = element.getAttribute('colorDark')
    let colorLight1 = element.getAttribute('colorLight1')
    let colorLight2 = element.getAttribute('colorLight2')
  
    let nameEl = getElement(elementID + '-name')
    let teamEl = getElement(elementID + '-team')
    let ratingEl = getElement(elementID + '-rating')
    
    nameEl.style.color = colorDark
    teamEl.style.color = colorDark
  
    ratingEl.style.borderColor = colorLight1
    ratingEl.style.background = colorLight2
  
    element.style.background = colorLight1
  
    let row = getElement('event-table-protocol-row-' + number)
  
    row.style.border = `0.0625rem solid ${colorThemesChartTablesRowFrameSelect}`
    row.style.background = chartProtocolRowHover
  
    for (child of row.children) {
      
      // child.firstChild.firstChild.style.color = saturateColor(color, 0.65)
      child.firstChild.firstChild.style.color = color
      child.firstChild.firstChild.style.fontVariationSettings = "'wght' 650"
      child.firstChild.firstChild.style.opacity = colorThemesTextOpacity
      
    }
    
  }

}


function eventRatingsChartMetricsMouseLeave(elementID) {

  if (notMobileDevice) {

    let element = getElement(elementID)
  
    let number = element.getAttribute('number')
    // let color = element.getAttribute('color')
  
    let nameEl = getElement(elementID + '-name')
    let teamEl = getElement(elementID + '-team')
    let ratingEl = getElement(elementID + '-rating')
    
    nameEl.style.color = ''
    teamEl.style.color = ''
  
    ratingEl.style.borderColor = ''
    ratingEl.style.background = ''
  
    element.style.background = ''
  
    let row = getElement('event-table-protocol-row-' + number)
  
    row.style.border = `0.0625rem solid ${_colorBackground}`
    row.style.background = _colorBackground
  
    for (child of row.children) {
      
      child.firstChild.firstChild.style.color = colorThemesChartFont2
      child.firstChild.firstChild.style.fontVariationSettings = "'wght' 550"
      child.firstChild.firstChild.style.opacity = 1
      
    }
    
  }

}


function eventChartRatingUpdate() {

  // draw topfive plot
  plotTopFive(event_summary)

  // update classification table 
  eventTable21Create()

  // draw metric
  plotMetrics(event_summary, eventsRatingsChartMetrcisID)

  window.onresize = () => {

    updateUnits()

    if (getElement(menuEvents21ID)) {

      eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])
      
    }

    if (getElement('events-ratings-protocol')) {
      eventTable21Create()
    }

    if (getElement('plot-metrics')) {
      plotTopFive(event_summary)
      plotMetrics(event_summary, eventsRatingsChartMetrcisID)
    }

  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {
    
    // draw topfive plot
    plotTopFive(event_summary)
  
    // update classification table 
    eventTable21Create()
  
    // draw metric
    plotMetrics(event_summary, eventsRatingsChartMetrcisID)
    
  }
  
}


function wrongEventMessage(seasonID, eventName) {

  let wrongEvent = getElement(wrongEventID)
  let wrongEventText = wrongEvent.children[0]
  let wrongEventIcon = getElement(wrongEventCloseIconID)

  if (eventName.includes(eventSprintMarker)) {
    let name = eventName.replace(eventSprintMarker, '')
    // wrongEventText.textContent = `В ${seasonID} году спринт ${lowercaseFirstWord(name)} не проводился`
    wrongEventText.textContent = `Cпринт ${lowercaseFirstWord(name)} отсутствует в календаре ${seasonID} года`
  } else {
    // wrongEventText.textContent =`В ${seasonID} году ${lowercaseFirstWord(eventName)} не проводился`
    wrongEventText.textContent =`${eventName} отсутствует в календаре ${seasonID} года`
  }

  wrongEvent.style.opacity = 1
  wrongEventIcon.style.pointerEvents = 'auto'

}


function notAvailableEventMessage(seasonID, eventName) {

  let wrongEvent = getElement(wrongEventID)
  let wrongEventText = wrongEvent.children[0]
  let wrongEventIcon = getElement(wrongEventCloseIconID)

  if (eventName.includes(eventSprintMarker)) {
    let name = eventName.replace(eventSprintMarker, '')
    wrongEventText.textContent = `Данные спринта ${lowercaseFirstWord(eventName)} ${seasonID} года отсутствуют`
    
  } else {
    wrongEventText.textContent = `Данные ${lowercaseFirstWord(eventName)} ${seasonID} года отсутствуют`
  }

  wrongEvent.style.opacity = 1
  wrongEventIcon.style.pointerEvents = 'auto'

}


function clearWrongEventMessage() {

  let wrongEvent = getElement(wrongEventID)
  let wrongEventIcon = getElement(wrongEventCloseIconID)
  
  wrongEvent.style.opacity = 0
  wrongEventIcon.style.pointerEvents = 'none'

}


function eventWrongMessageClose() {

  let wrongEvent = getElement(wrongEventID)
  let wrongEventIcon = getElement(wrongEventCloseIconID)
  
  wrongEvent.style.opacity = 0
  wrongEventIcon.style.pointerEvents = 'none'
  
}


function updateChartTimingActions(summary) {

  // eventCategoriesDescsFill()
  eventsCategoriesTimingActionsAdjustContainerWidth()

  // draw timing
  plotTiming(summary, 'plot-timing')

  // draw actions
  plotActions(summary, 'plot-actions')

  // draw timing bar charts
  chartBars_1(summary, 'plot-bars-3', 'Consistency', 'left')
  chartBars_1(summary, 'plot-bars-2', 'Pace', 'right')

  // draw actions bar charts
  chartBars_1(summary, 'plot-bars-4', 'Start', 'left')
  chartBars_1(summary, 'plot-bars-5', 'Overtakes', 'right')

  window.onresize = () => {

    updateUnits()

    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])

    eventsCategoriesTimingActionsAdjustContainerWidth()

    if (getElement('plot-timing')) {

      // draw timing
      plotTiming(summary, 'plot-timing')
      
    }

    if (getElement('plot-actions')) {

      // draw actions
      plotActions(summary, 'plot-actions')
      
    }

    if (getElement('plot-bars-2')) {

      // draw timing bar chart
      chartBars_1(summary, 'plot-bars-2', 'Pace', 'right')
      
    }
    
    if (getElement('plot-bars-3')) {

      // draw timing bar chart
      chartBars_1(summary, 'plot-bars-3', 'Consistency', 'left')
      
    }
    
    if (getElement('plot-bars-4')) {

      // draw actions bar chart
      chartBars_1(summary, 'plot-bars-4', 'Start', 'left')
      
    }

    if (getElement('plot-bars-5')) {

      // draw actions bar chart
      chartBars_1(summary, 'plot-bars-5', 'Overtakes', 'right')
      
    }
    
  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {

    eventCategoriesDescsFill()
    
    // draw timing
    plotTiming(summary, 'plot-timing')
  
    // draw actions
    plotActions(summary, 'plot-actions')
  
    // draw timing bar charts
    chartBars_1(summary, 'plot-bars-3', 'Consistency', 'left')
    chartBars_1(summary, 'plot-bars-2', 'Pace', 'right')
    
    // draw actions bar charts
    chartBars_1(summary, 'plot-bars-4', 'Start', 'left')
    chartBars_1(summary, 'plot-bars-5', 'Overtakes', 'right')
    
  }
 
}


function dropdown24Fill() {

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'teamID': eventComparisonTeamIDs
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown24ID,
    'items': eventComparisonTeams,
    'attributes': itemAttributes,
    'width': true,
    'indexes': dropdown24ItemIndexes,
    'titles': 'Выберите команду',
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let dropdownTitle = getElement(dropdown24TitleID)
  // dropdownTitle.textContent = 'Выберите команду'
    
  // fill title
  dropdownTitle.textContent = 
    (glVEventComparison['LeftTeam'] == glVEventComparison['RightTeam']) ?
    glVEventComparison['LeftTeam'] : 'Выберите команду'

}


function dropdown24ItemMouseUp(itemID) {

  let item = getElement(itemID)

  // team
  let team = item.textContent
  let teamID = item.getAttribute('teamID')

  // index
  let index = item.getAttribute('index')

  // lists
  let data = event_summary.filter(d => d['Team'] == team)

  let nameLeft
  let nameRight

  // dropdown title
  let title = getElement(dropdown24TitleID)
  title.textContent = team
  title.setAttribute('index', index)

  glVEventComparison['LeftTeam'] = team
  glVEventComparison['RightTeam'] = team

  glVEventComparison['LeftTeamID'] = teamID
  glVEventComparison['RightTeamID'] = teamID

  if (data.length > 1) {

    glVEventComparison['LeftDriverID'] = data[0]['DriverID']
    glVEventComparison['RightDriverID'] = data[1]['DriverID']
  
    nameLeft = data[0]['FullName']
    nameRight = data[1]['FullName']
    
  } else {

    nameLeft = data[0]['FullName']
    nameRight = data[0]['FullName']

    glVEventComparison['LeftDriverID'] = data[0]['DriverID']
    glVEventComparison['RightDriverID'] = data[1]['DriverID']
    
  }

  // update title of dropdowns with driver names
  let dropdown23LeftTitle = getElement(dropdown23LeftTitleID)
  dropdown23LeftTitle.textContent = nameLeft
  let dropdown23RightTitle = getElement(dropdown23RightTitleID)
  dropdown23RightTitle.textContent = nameRight

  // charts
  let summaryLeft = event_summary.filter(o => o['DriverID'] == glVEventComparison['LeftDriverID'])[0]
  let summaryRight = event_summary.filter(o => o['DriverID'] == glVEventComparison['RightDriverID'] )[0]

  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID'],
    teamID
  )

  let dataPaths = [d3.csv(event_path_data_8_left)]

  Promise.all(dataPaths).then(function(files) {

    let laptimes = files[0]

    let filterLaptimes = (o) => (
      (o['SprintIndex'] == glVEvent['SprintIndex'])
      && (o['SeasonID'] == glVEvent['SeasonID'])
      && (o['RaceID'] == glVEvent['RaceID'])
    )

    let filterLaptimesLeft = (o) => (o['DriverID'] == glVEventComparison['LeftDriverID'])
    let filterLaptimesRight = (o) => (o['DriverID'] == glVEventComparison['RightDriverID'])

    laptimesLeft = laptimes.filter(o => (filterLaptimes(o) && filterLaptimesLeft(o)))
    laptimesRight = laptimes.filter(o => (filterLaptimes(o) && filterLaptimesRight(o)))

    eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)

    }).catch(function(err) {
    // handle error here
  })

}


function dropdown24NavMouseUp(element) {

  let itemID = dropdownNavItemGetID(element, dropdown24ItemIndexes)
  dropdown24ItemMouseUp(itemID)
  
}


function dropdown23Fill(dropdownID, driverName) {

  // item attributes
  let itemAttributes = {
    'driverID': eventComparisonDriverIDs
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdownID,
    'items': eventComparisonNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true,
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  // fill title
  let dropdownTitle

  if (dropdownID.includes('left')) {
    dropdownTitle = getElement(dropdown23LeftTitleID)
  } else if (dropdownID.includes('right')) {
    dropdownTitle = getElement(dropdown23RightTitleID)
  }

  dropdownTitle.textContent = driverName

}


function dropdown23ItemMouseUp(dropdownID, element) {

  let dropdown
  let dropdownTitle
  let border
  let menu
  let caret
  
  let driverID = element.getAttribute('driverID')
  let driverData = drivers_part_this_season.filter(o => o['DriverID'] == driverID)[0]

  let name = driverData['FullName']
  let team = driverData['Team']
  let teamID = driverData['TeamID']

  if (elementID.includes('left')) {

    glVEventComparison['LeftDriverID'] = driverID
    glVEventComparison['LeftTeam'] = team
    glVEventComparison['LeftTeamID'] = teamID

    dropdownTitle = getElement(dropdown23LeftTitleID)
    dropdownTitle.textContent = name
    
  } else if (elementID.includes('right')) {

    glVEventComparison['RightDriverID'] = driverID
    glVEventComparison['RightTeam'] = team
    glVEventComparison['RightTeamID'] = teamID

    dropdownTitle = getElement(dropdown23RightTitleID)
    dropdownTitle.textContent = name
    
  }

  // fill title of dropdown 24
  let dropdown24Title = getElement(dropdown24TitleID)
  
  if (glVEventComparison['LeftTeam'] == glVEventComparison['RightTeam']) {
    dropdown24Title.textContent = glVEventComparison['LeftTeam']
    dropdown24Title.setAttribute('index', eventComparisonTeams.indexOf(glVEventComparison['LeftTeam']))
  } else {
    dropdown24Title.textContent = 'Выберите команду'
    dropdown24Title.setAttribute('index', null)
  }

  let summaryLeft = event_summary.filter(o => o['DriverID'] == glVEventComparison['LeftDriverID'])[0]
  let summaryRight = event_summary.filter(o => o['DriverID'] == glVEventComparison['RightDriverID'])[0]

  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID'],
    glVEventComparison['LeftTeamID'],
    glVEventComparison['RightTeamID']
  )

  let dataPaths = [d3.csv(event_path_data_8_left), d3.csv(event_path_data_8_right)]

  Promise.all(dataPaths).then(function(files) {

    let laptimesLeft = files[0]
    let laptimesRight = files[1]

    let filterLaptimes = (o) => (
      (o['SprintIndex'] == glVEvent['SprintIndex'])
      && (o['SeasonID'] == glVEvent['SeasonID'])
      && (o['RaceID'] == glVEvent['RaceID'])
    )

    let filterLaptimesLeft = (o) => (o['DriverID'] == glVEventComparison['LeftDriverID'])
    let filterLaptimesRight = (o) => (o['DriverID'] == glVEventComparison['RightDriverID'])

    laptimesLeft = laptimesLeft.filter(o => (filterLaptimes(o) && filterLaptimesLeft(o)))
    laptimesRight = laptimesRight.filter(o => (filterLaptimes(o) && filterLaptimesRight(o)))

    eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)

    }).catch(function(err) {
    // handle error here
  })

}


function eventComparisonImageUpdate(driverIDT, containerID) {

  let imgContainer = getElement(containerID)
  let imgPath = pathImgDrivers + glVEvent['SeasonID'] + '/' + driverIDT + imagesFormat

  imgContainer.children[0].src = imgPath
  
}


function eventsComparisonSetMetricsNameWidth() {

  // define maximum width of names container
  let nameContainer = getElement(eventComparisonMetricsNamesContainerID)
  let nameEl = getElement(raceResultsMetricsNameID + 'left')

  let width
  let widths = []

  eventComparisonNames.forEach((name, i) => {
    nameEl.textContent = name
    widths.push(nameContainer.offsetWidth)
  })

  nameEl.textContent = ''

  widths = sortArray(widths)
  
  width = widths[0]
  width = convertPixelsToRem(widths[0])

  nameContainer.style.width = `${width}rem`
  
}


function updateEventsDriverMetrics(dataLeft, dataRight, colorLeft, colorRight) {

  // driver left
  let nameLeft = dataLeft['FullName']
  let idtLeft = dataLeft['DriverIDT']
  
  let classifiedPositionLeft = dataLeft[_plabel]
  let cpLeftCheck = noDefinedMetrics.includes(classifiedPositionLeft)
  let classifiedPositionValueLeft = cpLeftCheck ? `${classifiedPositionLeft}` : `P${classifiedPositionLeft}`

  let imageIDLeft = raceResultsMetricsImageID + 'left'
  eventComparisonImageUpdate(idtLeft, imageIDLeft)

  let nameElLeft = getElement(raceResultsMetricsNameID + 'left')
  nameElLeft.textContent = nameLeft
  nameElLeft.style.color = colorLeft

  let positionLeft = getElement(raceResultsMetricsPositionID + 'left')
  positionLeft.textContent = classifiedPositionValueLeft

  let numberLeft = getElement(raceResultsMetricsNumberTeamID + 'left' + '-number')
  numberLeft.textContent = `#${dataLeft['Number']}`

  let teamLeft = getElement(raceResultsMetricsNumberTeamID + 'left' + '-team')
  teamLeft.textContent = `${dataLeft['Team']}`

  let ratingLeft = getElement(raceResultsMetricsRatingID + 'left')
  let ratingValueLeft = dataLeft['RankPoints']
  ratingLeft.textContent = `${ratingValueLeft}`

  let consistencyLeft = getElement(raceResultsMetricsConsistencyID + 'left')
  let consistencyValueLeft = dataLeft['Consistency']
  consistencyLeft.textContent = `${consistencyValueLeft}`

  let paceLeft = getElement(raceResultsMetricsPaceID + 'left')
  paceLeft.textContent = `${dataLeft['PaceSec']}`

  let overtakesLeft = getElement(raceResultsMetricsOvertakesID + 'left')
  let overtakesValueLeft = dataLeft['Overtakes']

  let overtakesTextContentLeft = (overtakesValueLeft == '-') ? '-' : Math.abs(overtakesValueLeft)
  overtakesLeft.textContent = `${overtakesTextContentLeft}`

  let overtakesSignLeft = getElement(raceResultsMetricsOvertakesID + 'left' + '-sign')

  if (overtakesValueLeft < 0) {
    overtakesSignLeft.textContent = '-'
  } else if (overtakesValueLeft > 0) {
    overtakesSignLeft.textContent = '+'
  } else {
    overtakesSignLeft.textContent = ''
  }

  let startLeft = getElement(raceResultsMetricsStartID + 'left')
  let startValueLeft = dataLeft['Start']

  let startTextContentLeft = (startValueLeft == '-') ? '-' : Math.abs(startValueLeft)
  startLeft.textContent = `${startTextContentLeft}`

  let startSignLeft = getElement(raceResultsMetricsStartID + 'left' + '-sign')

  if (startValueLeft < 0) {
    startSignLeft.textContent = '-'
  } else if (startValueLeft > 0) {
    startSignLeft.textContent = '+'
  } else {
    startSignLeft.textContent = ''
  }

  let mistakesCountLeft = getElement(raceResultsMetricsMistakesCountID + 'left')
  let mistakesCountValueLeft = dataLeft['MistakesCount']
  mistakesCountLeft.textContent = `${mistakesCountValueLeft}`

  let mistakesLossesLeft = getElement(raceResultsMetricsMistakesLossesID + 'left')
  let mistakesLossesValueLeft = dataLeft['MistakesLosses']
  mistakesLossesLeft.textContent = `${mistakesLossesValueLeft}`

  // driver right
  let nameRight = dataRight['FullName']
  let idtRight = dataRight['DriverIDT']
  
  let classifiedPositionRight = dataRight[_plabel]
  let cpRightCheck = noDefinedMetrics.includes(classifiedPositionRight)
  let classifiedPositionValueRight = cpRightCheck ? `${classifiedPositionRight}` : `P${classifiedPositionRight}`

  let imageIDRight = raceResultsMetricsImageID + 'right'
  eventComparisonImageUpdate(idtRight, imageIDRight)

  let nameElRight = getElement(raceResultsMetricsNameID + 'right')
  nameElRight.textContent = nameRight
  nameElRight.style.color = colorRight

  let positionRight = getElement(raceResultsMetricsPositionID + 'right')
  positionRight.textContent = classifiedPositionValueRight

  let numberRight = getElement(raceResultsMetricsNumberTeamID + 'right' + '-number')
  numberRight.textContent = `#${dataRight['Number']}`

  let teamRight = getElement(raceResultsMetricsNumberTeamID + 'right' + '-team')
  teamRight.textContent = `${dataRight['Team']}`

  let ratingRight = getElement(raceResultsMetricsRatingID + 'right')
  let ratingValueRight = dataRight['RankPoints']
  ratingRight.textContent = `${ratingValueRight}`

  let consistencyRight = getElement(raceResultsMetricsConsistencyID + 'right')
  let consistencyValueRight = dataRight['Consistency']
  consistencyRight.textContent = `${consistencyValueRight}`

  let paceRight = getElement(raceResultsMetricsPaceID + 'right')
  paceRight.textContent = `${dataRight['PaceSec']}`

  let overtakesRight = getElement(raceResultsMetricsOvertakesID + 'right')
  let overtakesValueRight = dataRight['Overtakes']

  let overtakesTextContentRight = (overtakesValueRight == '-') ? '-' : Math.abs(overtakesValueRight)
  overtakesRight.textContent = `${overtakesTextContentRight}`

  let overtakesSignRight = getElement(raceResultsMetricsOvertakesID + 'right' + '-sign')

  if (overtakesValueRight < 0) {
    overtakesSignRight.textContent = '-'
  } else if (overtakesValueRight > 0) {
    overtakesSignRight.textContent = '+'
  } else {
    overtakesSignRight.textContent = ''
  }

  let startRight = getElement(raceResultsMetricsStartID + 'right')
  let startValueRight = dataRight['Start']

  let startTextContentRight = (startValueRight == '-') ? '-' : Math.abs(startValueRight)
  startRight.textContent = `${startTextContentRight}`

  let startSignRight = getElement(raceResultsMetricsStartID + 'right' + '-sign')

  if (startValueRight < 0) {
    startSignRight.textContent = '-'
  } else if (startValueRight > 0) {
    startSignRight.textContent = '+'
  } else {
    startSignRight.textContent = ''
  }

  let mistakesCountRight = getElement(raceResultsMetricsMistakesCountID + 'right')
  let mistakesCountValueRight = dataRight['MistakesCount']
  mistakesCountRight.textContent = `${mistakesCountValueRight}`

  let mistakesLossesRight = getElement(raceResultsMetricsMistakesLossesID + 'right')
  let mistakesLossesValueRight = dataRight['MistakesLosses']
  mistakesLossesRight.textContent = `${mistakesLossesValueRight}`

  // deltas
  let ratingDelta = getElement(eventComparisonDeltaRatingID)
  let ratingDeltaValue = ratingValueLeft - ratingValueRight
  

  let ratingDeltaColor = eventComparisonGetDeltaColor(
    ratingDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    higherWorse=true
  )

  ratingDeltaValue = Math.abs(ratingDeltaValue)
  ratingDeltaValue = checkNaN(ratingDeltaValue)

  ratingDelta.textContent = ratingDeltaValue
  ratingDelta.style.color = ratingDeltaColor

  let consistencyDelta = getElement(eventComparisonDeltaConsistencyID)
  let consistencyDeltaValue = consistencyValueLeft - consistencyValueRight
  
  let consistencyDeltaColor = eventComparisonGetDeltaColor(
    consistencyDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  consistencyDeltaValue = Math.abs(consistencyDeltaValue).toFixed(3)
  consistencyDeltaValue = checkNaN(consistencyDeltaValue)

  consistencyDelta.textContent = consistencyDeltaValue
  consistencyDelta.style.color = consistencyDeltaColor

  let paceDelta = getElement(eventComparisonDeltaPaceID)
  let paceDeltaValue = dataLeft['Pace'] - dataRight['Pace']

  let paceDeltaColor = eventComparisonGetDeltaColor(
    paceDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  paceDeltaValue = Math.abs(paceDeltaValue).toFixed(3)
  paceDeltaValue = checkNaN(paceDeltaValue)

  paceDelta.textContent = paceDeltaValue
  paceDelta.style.color = paceDeltaColor

  let overtakesDelta = getElement(eventComparisonDeltaOvertakesID)
  let overtakesDeltaValue = overtakesValueLeft - overtakesValueRight
  
  let overtakesDeltaColor = eventComparisonGetDeltaColor(
    overtakesDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=false
  )

  overtakesDeltaValue = Math.abs(overtakesDeltaValue)
  overtakesDeltaValue = checkNaN(overtakesDeltaValue)

  overtakesDelta.textContent = overtakesDeltaValue
  overtakesDelta.style.color = overtakesDeltaColor

  let startDelta = getElement(eventComparisonDeltaStartID)
  let startDeltaValue = startValueLeft - startValueRight
  

  let startDeltaColor = eventComparisonGetDeltaColor(
    startDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=false
  )

  startDeltaValue = Math.abs(startDeltaValue)
  startDeltaValue = checkNaN(startDeltaValue)
  
  startDelta.textContent = startDeltaValue
  startDelta.style.color = startDeltaColor

  let mistakesDelta = getElement(eventComparisonDeltaMistakesCountID)
  let mistakesDeltaValue = mistakesCountValueLeft - mistakesCountValueRight
  
  let mistakesDeltaColor = eventComparisonGetDeltaColor(
    mistakesDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  mistakesDeltaValue = Math.abs(mistakesDeltaValue)
  mistakesDeltaValue = checkNaN(mistakesDeltaValue)

  mistakesDelta.textContent = mistakesDeltaValue
  mistakesDelta.style.color = mistakesDeltaColor

  let mistakesLossesDelta = getElement(eventComparisonDeltaMistakesLossesID)
  let mistakesLossesDeltaValue = mistakesLossesValueLeft - mistakesLossesValueRight
  
  let mistakesLossesDeltaColor = eventComparisonGetDeltaColor(
    mistakesLossesDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  mistakesLossesDeltaValue = Math.abs(mistakesLossesDeltaValue).toFixed(3)
  mistakesLossesDeltaValue = checkNaN(mistakesLossesDeltaValue)

  mistakesLossesDelta.textContent = mistakesLossesDeltaValue
  mistakesLossesDelta.style.color = mistakesLossesDeltaColor

}


function check231MouseUp(element) {

  // show/hide icon
  let checkIcon = element.children[0].children[0]
  checkIcon.classList.toggle('op-100')

  let outliers = getElementsListByAttribute('plot-laptimes-1-mistake', 1)

  outliers.forEach((outlier, i) => {

    if (outlier.localName == 'path') {
      outlier.classList.toggle('laptime-circle-is-outlier')
    } else if (outlier.localName == 'rect') {
      outlier.classList.toggle('laptime-rect-is-outlier')
    }

  })
  
}


function eventPlotLaptimesNoDataManage(kind='both') {

  let ContainerID

  if ((kind == 'both') || (kind == 'left')) {

    ContainerID = plotLaptimesLeftID
    
  } else if (kind == 'right') {

    ContainerID = plotLaptimesRightID
    
  }

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  let heightScale = 0.21

  if (glVEvent['SprintIndex'] == 1) {
    container.style.width = '60rem'
  }

  let containerSizes = getSizes(container)
  
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(heightScale * widthDiv)

  if (getElement(ContainerID).children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svg = d3
    .select(containerID)
    .selectAll('svg')
    .classed('svg-chart', true)
    .attr('width', widthDiv)
    .attr('height', heightDiv)
    // .classed('border-blue', true)
    // .classed('p-relative', true)

  let imageWidth = px36
  let imageWidthHalf = 0.5 * imageWidth

  let noDataMessage = svg
    .append('g')
    .attr("transform", `translate(${0.5 * widthDiv}, ${0.5 * heightDiv})`)

  noDataMessage
    .append("svg:image")
    .attr('x', -imageWidthHalf)
    .attr('y', -imageWidthHalf)
    .attr('width', imageWidth)
    // .attr('height', 24)
    .attr("xlink:href", "/img/nodata.svg")
    .classed('img-theme-filter-no-active', true)
  
}


function eventPlotDifferenceNoDataManage() {

  getElement(eventComparisonplotDiffMeanValueID).textContent = '-'
  getElement(eventComparisonplotDiffMeanValueID).style.color = themeChartsColorNotActive

  let containerID = '#' + plotLaptimesDifferenceID
  let container = getElement(plotLaptimesDifferenceID)

  let heightScale = 0.15
  let widthCoeffForSprints = 0.85
  
  if (glVEvent['SprintIndex'] == 1) {
    container.style.width = '60rem'
  }
  
  let containerSizes = getSizes(container)
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(heightScale * widthDiv)

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svg = d3
    .select(containerID)
    .selectAll('svg')
    .classed('svg-chart', true)
    .attr('width', widthDiv)
    .attr('height', heightDiv)
    // .classed('border-blue', true)
    // .classed('p-relative', true)

  let imageWidth = px36
  let imageWidthHalf = 0.5 * imageWidth

  let noDataMessage = svg
    .append('g')
    .attr("transform", `translate(${0.5 * widthDiv}, ${0.5 * heightDiv})`)

  noDataMessage
    .append("svg:image")
    .attr('x', -imageWidthHalf)
    .attr('y', -imageWidthHalf)
    .attr('width', imageWidth)
    // .attr('height', 24)
    .attr("xlink:href", "/img/nodata.svg")
    .classed('img-theme-filter-no-active', true)
  
}


function eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight) {

  let LapTimesComplited = 5

  let colorLeft = summaryLeft[_color]
  let colorRight = summaryRight[_color]

  let plotOnlyLeft = (
    (summaryLeft[_driverID] == summaryRight[_driverID])
    || (summaryRight[_plabel] == _DSQ)
    || (summaryRight[_plabel] == _DNS)
    || (laptimesRight.length <= LapTimesComplited)
  )

  let plotOnlyRight = (
    ((summaryLeft[_plabel] == _DSQ)
    || (summaryLeft[_plabel] == _DNS)
    || (laptimesLeft.length <= LapTimesComplited))
    && (summaryLeft[_driverID] != summaryRight[_driverID])
  )

  let notPlotBoth = (
    (
      (summaryRight[_plabel] == _DSQ)
      || (summaryRight[_plabel] == _DNS)
      || (laptimesRight.length <= LapTimesComplited)
    )
    &&
    (
      (summaryLeft[_plabel] == _DSQ)
      || (summaryLeft[_plabel] == _DNS)
      || (laptimesLeft.length <= LapTimesComplited)
    )
  )

  let linestyles = ['0', '0']

  if (colorLeft == colorRight) {
    colorRight = modColor(colorLeft)
    linestyles[1] = '10, 5'
  }

  plotComparison('plot-comparison', summaryLeft, summaryRight, colorLeft, colorRight, linestyles)

  updateEventsDriverMetrics(summaryLeft, summaryRight, colorLeft, colorRight)

  resetCheckCollection(check231ID)

  if (!notPlotBoth) {

    if (plotOnlyLeft) {

      plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesLeft, adjustCheckbox=true)

      getElement(plotLaptimesRightID).innerHTML = ''
      getElement(plotLaptimesDifferenceID).innerHTML = ''

      getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

      // eventPlotDifferenceNoDataManage()
      
    } else if (plotOnlyRight) {
      
      plotLaptimes(plotLaptimesLeftID, laptimesRight, colorRight, 'left', laptimesRight, adjustCheckbox=true)
      
      getElement(plotLaptimesRightID).innerHTML = ''
      getElement(plotLaptimesDifferenceID).innerHTML = ''

      getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

      // eventPlotDifferenceNoDataManage()

      
    } else {
      
      plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesRight, adjustCheckbox=true)
      plotLaptimes(plotLaptimesRightID, laptimesRight, colorRight, 'right', laptimesLeft)

      getElement(eventComparisonPlotLaptimesSeparatorID).classList.remove('invisible')

      plotDifference(
        plotLaptimesDifferenceID,
        [laptimesLeft, laptimesRight],
        [summaryLeft, summaryRight],
        [colorLeft, colorRight]
      )

    }

  } else {

    getElement(plotLaptimesLeftID).innerHTML = ''
    getElement(plotLaptimesRightID).innerHTML = ''
    getElement(plotLaptimesDifferenceID).innerHTML = ''
    
    getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

    eventPlotLaptimesNoDataManage(kind='both')
    eventPlotDifferenceNoDataManage()

  }

  window.onresize = () => {

    updateUnits()

    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])

    if (getElement('plot-comparison')) {

      plotComparison('plot-comparison', summaryLeft, summaryRight, colorLeft, colorRight, linestyles)
      
    }

    if (getElement(plotLaptimesLeftID)) {

      if (!notPlotBoth) {

        if (plotOnlyLeft) {

          plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesLeft, adjustCheckbox=true)
          
          getElement(plotLaptimesRightID).innerHTML = ''
          getElement(plotLaptimesDifferenceID).innerHTML = ''

          getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

          // eventPlotDifferenceNoDataManage()
          
        } else if (plotOnlyRight) {

          plotLaptimes(plotLaptimesLeftID, laptimesRight, colorRight, 'left', laptimesRight, adjustCheckbox=true)
          
          getElement(plotLaptimesRightID).innerHTML = ''
          getElement(plotLaptimesDifferenceID).innerHTML = ''

          getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

          // eventPlotDifferenceNoDataManage()

          
        } else {

          plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesRight, adjustCheckbox=true)
          plotLaptimes(plotLaptimesRightID, laptimesRight, colorRight, 'right', laptimesLeft)

          getElement(eventComparisonPlotLaptimesSeparatorID).classList.remove('invisible')

          plotDifference(
            plotLaptimesDifferenceID,
            [laptimesLeft, laptimesRight],
            [summaryLeft, summaryRight],
            [colorLeft, colorRight]
          )
            
        }
        
      } else {

        getElement(plotLaptimesLeftID).innerHTML = ''
        getElement(plotLaptimesRightID).innerHTML = ''
        getElement(plotLaptimesDifferenceID).innerHTML = ''

        getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

        eventPlotLaptimesNoDataManage(kind='both')
        eventPlotDifferenceNoDataManage()
            
      }
      
    }

  }

  let themeToggler = getElement(mainChangeThemeButtonID)
  
  themeToggler.onclick = () => {

    updateUnits()

    eventComparisonDescsFill()

    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])

    if (getElement('plot-comparison')) {

      plotComparison('plot-comparison', summaryLeft, summaryRight, colorLeft, colorRight, linestyles)
      
    }

    if (getElement(plotLaptimesLeftID)) {

      if (!notPlotBoth) {

        if (plotOnlyLeft) {

          plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesLeft, adjustCheckbox=true)
          
          getElement(plotLaptimesRightID).innerHTML = ''
          getElement(plotLaptimesDifferenceID).innerHTML = ''

          getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

          eventPlotDifferenceNoDataManage()

          
        } else if (plotOnlyRight) {

          plotLaptimes(plotLaptimesLeftID, laptimesRight, colorRight, 'left', laptimesRight, adjustCheckbox=true)
          
          getElement(plotLaptimesRightID).innerHTML = ''
          getElement(plotLaptimesDifferenceID).innerHTML = ''

          getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

          eventPlotDifferenceNoDataManage()

          
        } else {

          plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesRight, adjustCheckbox=true)
          plotLaptimes(plotLaptimesRightID, laptimesRight, colorRight, 'right', laptimesLeft)

          getElement(eventComparisonPlotLaptimesSeparatorID).classList.remove('invisible')

          plotDifference(
            plotLaptimesDifferenceID,
            [laptimesLeft, laptimesRight],
            [summaryLeft, summaryRight],
            [colorLeft, colorRight]
          )
            
        }
        
      } else {

        getElement(plotLaptimesLeftID).innerHTML = ''
        getElement(plotLaptimesRightID).innerHTML = ''
        getElement(plotLaptimesDifferenceID).innerHTML = ''

        getElement(eventComparisonPlotLaptimesSeparatorID).classList.add('invisible')

        eventPlotLaptimesNoDataManage(kind='both')
        eventPlotDifferenceNoDataManage()
            
      }
      
    }

  }
  
}


function eventsCategoriesTimingActionsAdjustContainerWidth() {
  
  let kinds  = ['timing', 'actions']
      
  kinds.forEach((kind, i) => {

    let name = getElement(eventCategoriesMetricsNameID + kind)
    let names = event_summary.map(o => o['FullName'])

    let title = name.textContent

    // adjust container with name width on first launch
    let container = getElement(eventCategoriesMetricsContainerID + kind)
    let containerWidth = getMaxWidth(name, container, names)
    container.style.width = `${containerWidth}px`

    name.textContent = title
    
  })
  
}


function eventsCategoriesTimingActionsFill(kind, number=null) {

  let img = getElement(eventCategoriesMetricsImgID + kind)
  let name = getElement(eventCategoriesMetricsNameID + kind)
  let numberEl = getElement(eventCategoriesMetricsNumberID + kind)
  let team = getElement(eventCategoriesMetricsTeamID + kind)
  
  let rank = getElement(eventCategoriesMetricsTotalRankID + kind)
  let points = getElement(eventCategoriesMetricsTotalPointsID + kind)
  
  let consistency = getElement(eventCategoriesMetricsConsistencyID + kind)
  let pace = getElement(eventCategoriesMetricsPaceID + kind)

  let rankConsistency = getElement(eventCategoriesMetricsRankConsistencyID + kind)
  let pointsConsistency = getElement(eventCategoriesMetricsPointsConsistencyID + kind)

  let rankPace = getElement(eventCategoriesMetricsRankPaceID + kind)
  let pointsPace = getElement(eventCategoriesMetricsPointsPaceID + kind)

  let names = event_summary.map(o => o['FullName'])

  if (kind == 'timing') {

    let dataTiming = copyObject(event_summary)
    dataTiming = sortObject(dataTiming, 'RankTiming', ascending=true)

    if (dataTiming.length > 0) {

      if (number) {
        dataTiming = dataTiming.filter(o => o['Number'] == number)
        if (dataTiming.length > 0) {
          dataTiming = dataTiming[0]
        }
      } else {
        dataTiming = dataTiming[0]
      }

      let colorPrimary = saturateColor(dataTiming['Color'], 0.75)
      
      let imgPath = pathImgDrivers + glVEvent['SeasonID'] + '/' + dataTiming['DriverIDT'] + imagesFormat
      img.src = imgPath
      
      name.textContent = dataTiming['FullName']
      name.style.color = colorPrimary
      numberEl.textContent = `#${dataTiming['Number']}`
      team.textContent = dataTiming['Team']
  
      rank.textContent = dataTiming['RankTiming']
      points.textContent = dataTiming['PointsTiming']
  
      consistency.textContent = dataTiming['Consistency']
      pace.textContent = dataTiming['PaceSec']
  
      rankConsistency.textContent = dataTiming['RankConsistency']
      pointsConsistency.textContent = dataTiming['PointsConsistency']
  
      rankPace.textContent = dataTiming['RankPace']
      pointsPace.textContent = dataTiming['PointsPace']
      
    }

  } else if (kind == 'actions') {

    let dataActions = copyObject(event_summary)
    dataActions = sortObject(dataActions, 'RankActions', ascending=true)

    if (dataActions.length > 0) {

      if (number) {
        dataActions = dataActions.filter(o => o['Number'] == number)
        if (dataActions.length > 0) {
          dataActions = dataActions[0]
        }
      } else {
        dataActions = dataActions[0]
      }

      let colorPrimary = saturateColor(dataActions['Color'], 0.75)

      let imgPath = pathImgDrivers + glVEvent['SeasonID'] + '/' + dataActions['DriverIDT'] + imagesFormat
      img.src = imgPath

      name.textContent = dataActions['FullName']
      name.style.color = colorPrimary
  
      numberEl.textContent = `#${dataActions['Number']}`
  
      team.textContent = dataActions['Team']
  
      rank.textContent = dataActions['RankActions']
      points.textContent = dataActions['PointsActions']
  
      let startValue
      
      if (dataActions['Start'] > 0) {
        startValue = `+${dataActions['Start']}`
      } else if (dataActions['Start'] < 0) {
        startValue = `-${Math.abs(dataActions['Start'])}`
      } else {
        startValue = `${dataActions['Start']}`
      }
      
      consistency.textContent = startValue
  
      let overtakesValue
      
      if (dataActions['Overtakes'] > 0) {
        overtakesValue = `+${dataActions['Overtakes']}`
      } else if (dataActions['Overtakes'] < 0) {
        overtakesValue = `-${Math.abs(dataActions['Overtakes'])}`
      } else {
        overtakesValue = `${dataActions['Overtakes']}`
      }
      
      pace.textContent = overtakesValue
  
      rankConsistency.textContent = dataActions['RankStart']
      pointsConsistency.textContent = dataActions['PointsStart']
  
      rankPace.textContent = dataActions['RankOvertakes']
      pointsPace.textContent = dataActions['PointsOvertakes']
      
    }

  }

}


function eventsCategoriesTimingActionsActivateBarEl(el, color) {

  if (elNotClicked(el)) {

    if (elCheckTag(el, 'text')) {

      el.style.fill = color
      el.classList.add('timing-actions-tickalbel-active')
      
    } else if (elCheckTag(el, 'rect')) {

      el.style.fill = color
      el.style.stroke = color
      
    }
    
  }
  
}


function eventsCategoriesTimingActionsDeactivateBarEl(el) {

  if (elNotClicked(el)) {

    if (elCheckTag(el, 'text')) {

      el.style.fill = colorThemesChartDriverAbbsTimingActions
      el.classList.remove('timing-actions-tickalbel-active')
      
    } else if (elCheckTag(el, 'rect')) {

      el.style.fill = colorThemesChartDriverBarsTimingActions
      el.style.stroke = colorThemesChartDriverBarsTimingActions
      
    }
    
  }
  
}


function eventsCategoriesTimingActionsActivate(element, barsID, ticklabelsID, gridHID, gridVID) {

  let number = element.getAttribute('Number')

  if (elNotClicked(element)) {

    let color = element.getAttribute('Color')
    
    element.classList.add('timing-actions-tickalbel-active')
  
    let barLeftID = barsID + number + '-' + 'left'
    let barLeft = getElement(barLeftID)
    
    let barRightID = barsID + number + '-' + 'right'
    let barRight = getElement(barRightID)

    let ticklabelLeftID = ticklabelsID + number + '-' + 'left'
    let ticklabelLeft = getElement(ticklabelLeftID)

    let ticklabelRightID = ticklabelsID + number + '-' + 'right'
    let ticklabelRight = getElement(ticklabelRightID)

    let elsList = [barLeft, barRight, ticklabelLeft, ticklabelRight]

    elsList.forEach((el, i) => {
      eventsCategoriesTimingActionsActivateBarEl(el, color)
    })

    let gridH = getElement(gridHID + number)
    let gridV = getElement(gridVID + number)
  
    gridH.style.visibility = 'visible'
    gridV.style.visibility = 'visible'
    
  }

}


function eventsCategoriesTimingActionsDeactivate(element, barsID, ticklabelsID, gridHID, gridVID) {

  let number = element.getAttribute('Number')

  if (elNotClicked(element)) {

    let color = element.getAttribute('Color')

    element.classList.remove('timing-actions-tickalbel-active')
  
    let barLeftID = barsID + number + '-' + 'left'
    let barLeft = getElement(barLeftID)
    
    let barRightID = barsID + number + '-' + 'right'
    let barRight = getElement(barRightID)

    let ticklabelLeftID = ticklabelsID + number + '-' + 'left'
    let ticklabelLeft = getElement(ticklabelLeftID)

    let ticklabelRightID = ticklabelsID + number + '-' + 'right'
    let ticklabelRight = getElement(ticklabelRightID)

    let elsList = [barLeft, barRight, ticklabelLeft, ticklabelRight]

    elsList.forEach((el, i) => {
      eventsCategoriesTimingActionsDeactivateBarEl(el, color)
    })

    let gridH = getElement(gridHID + number)
    let gridV = getElement(gridVID + number)
  
    gridH.style.visibility = 'hidden'
    gridV.style.visibility = 'hidden'
    
  }

}


function eventsCategoriesTimingActionsReset(abbsID, barsID, ticklabelsID, gridHID, gridVID) {

  let abbs = getElement(abbsID)
  abbs = arrayFromChildren(abbs)

  let barsLeft = getElement(barsID + 'left')
  barsLeft = arrayFromChildren(barsLeft)
  
  let barsRight = getElement(barsID + 'right')
  barsRight = arrayFromChildren(barsRight)

  let ticklabelsLeft = getElement(ticklabelsID + 'left')
  ticklabelsLeft = arrayFromChildren(ticklabelsLeft)
  
  let ticklabelsRight = getElement(ticklabelsID + 'right')
  ticklabelsRight = arrayFromChildren(ticklabelsRight)

  let gridH = getElement(gridHID)
  gridH = arrayFromChildren(gridH)
  
  let gridV = getElement(gridVID)
  gridV = arrayFromChildren(gridV)

  abbs.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.filter = 'none'
      el.classList.remove('timing-actions-tickalbel-active')
    }
  })

  barsLeft.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.fill = colorThemesChartDriverBarsTimingActions
      el.style.stroke = colorThemesChartDriverBarsTimingActions
      el.style.filter = 'none'
    }
  })

  barsRight.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.fill = colorThemesChartDriverBarsTimingActions
      el.style.stroke = colorThemesChartDriverBarsTimingActions
      el.style.filter = 'none'
    }
  })

  ticklabelsLeft.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.fill = colorThemesChartDriverAbbsTimingActions
      el.classList.remove('timing-actions-tickalbel-active')
      el.style.filter = 'none'
    }
  })

  ticklabelsRight.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.fill = colorThemesChartDriverAbbsTimingActions
      el.classList.remove('timing-actions-tickalbel-active')
      el.style.filter = 'none'
    }
  })

  gridH.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.visibility = 'hidden'
      el.style.visibility = 'hidden'
      el.style.opacity = 0.75
      el.style.opacity = 0.75
    }
  })

  gridV.forEach((el, i) => {
    if (elClicked(el)) {
      el.classList.remove('clicked')
      el.style.visibility = 'hidden'
      el.style.visibility = 'hidden'
      el.style.opacity = 0.75
      el.style.opacity = 0.75
    }
  })
  
}


function eventsCategoriesTimingActionsClick(kind, element, abbsID, barsID, ticklabelsID, gridHID, gridVID) {

  let color = element.getAttribute('Color')
  let number = element.getAttribute('Number')

  let barLeftID = barsID + number + '-' + 'left'
  let barLeft = getElement(barLeftID)
  
  let barRightID = barsID + number + '-' + 'right'
  let barRight = getElement(barRightID)

  let ticklabelLeftID = ticklabelsID + number + '-' + 'left'
  let ticklabelLeft = getElement(ticklabelLeftID)

  let ticklabelRightID = ticklabelsID + number + '-' + 'right'
  let ticklabelRight = getElement(ticklabelRightID)

  let gridH = getElement(gridHID + number)
  let gridV = getElement(gridVID + number)

  if (elClicked(element)) {

    element.classList.remove('clicked')
    element.style.filter = 'none'

    barLeft.classList.remove('clicked')
    barLeft.style.filter = 'none'
    barLeft.style.fill = color
    barLeft.style.stroke = color

    barRight.classList.remove('clicked')
    barRight.style.filter = 'none'
    barRight.style.fill = color
    barRight.style.stroke = color

    ticklabelLeft.classList.remove('clicked')
    ticklabelLeft.style.filter = 'none'

    ticklabelRight.classList.remove('clicked')
    ticklabelRight.style.filter = 'none'

    gridH.classList.remove('clicked')
    gridV.classList.remove('clicked')
    gridH.style.opacity = 0.75
    gridV.style.opacity = 0.75

    if (kind == 'timing') {
      eventCategoriesTimingClickedNumber = null
    } else if ('actions') {
      eventCategoriesActionsClickedNumber = null
    }

  // if not clicked
  } else {

    eventsCategoriesTimingActionsReset(abbsID, barsID, ticklabelsID, gridHID, gridVID)
    
    element.classList.add('clicked')
    element.style.filter = colorThemesChartTimingActionsShadow
    element.classList.add('timing-actions-tickalbel-active')

    barLeft.classList.add('clicked')
    barLeft.style.filter = colorThemesChartTimingActionsShadow
    barLeft.style.fill = alphaColor(color, 0.5)
    barLeft.style.stroke = color

    barRight.classList.add('clicked')
    barRight.style.filter = colorThemesChartTimingActionsShadow
    barRight.style.fill = alphaColor(color, 0.5)
    barRight.style.stroke = color

    ticklabelLeft.classList.add('clicked')
    ticklabelLeft.style.filter = colorThemesChartTimingActionsShadow
    ticklabelLeft.classList.add('timing-actions-tickalbel-active')
    ticklabelLeft.style.fill = color

    ticklabelRight.classList.add('clicked')
    ticklabelLeft.style.filter = colorThemesChartTimingActionsShadow
    ticklabelRight.classList.add('timing-actions-tickalbel-active')
    ticklabelRight.style.fill = color

    gridH.classList.add('clicked')
    gridV.classList.add('clicked')
    gridH.style.opacity = 1
    gridV.style.opacity = 1

    if (kind == 'timing') {
      eventCategoriesTimingClickedNumber = number
    } else if ('actions') {
      eventCategoriesActionsClickedNumber = number
    }

  }

  

}


function eventsCategoriesTimingActionsMouseOver(element, kind) {

  let barsID
  let ticklabelsID
  let gridHID
  let gridVID

  let number = element.getAttribute('Number')

  if (kind == 'timing') {

    barsID = eventCategoriesTimingBarsNodeID
    ticklabelsID = eventCategoriesTimingTicklabelsNodeID
    gridHID = eventCategoriesTimingGridHNodeID
    gridVID = eventCategoriesTimingGridVNodeID
    
  } else if (kind == 'actions') {

    barsID = eventCategoriesActionsBarsNodeID
    ticklabelsID = eventCategoriesActionsTicklabelsNodeID
    gridHID = eventCategoriesActionsGridHNodeID
    gridVID = eventCategoriesActionsGridVNodeID
    
  }

  eventsCategoriesTimingActionsActivate(element, barsID, ticklabelsID, gridHID, gridVID)
  eventsCategoriesTimingActionsFill(kind, number)
  
}


function eventsCategoriesTimingActionsMouseLeave(element, kind) {

  let barsID
  let ticklabelsID
  let gridHID
  let gridVID

  let clickedNumber

  if (kind == 'timing') {

    barsID = eventCategoriesTimingBarsNodeID
    ticklabelsID = eventCategoriesTimingTicklabelsNodeID
    gridHID = eventCategoriesTimingGridHNodeID
    gridVID = eventCategoriesTimingGridVNodeID
    clickedNumber = eventCategoriesTimingClickedNumber
    
  } else if (kind == 'actions') {

    barsID = eventCategoriesActionsBarsNodeID
    ticklabelsID = eventCategoriesActionsTicklabelsNodeID
    gridHID = eventCategoriesActionsGridHNodeID
    gridVID = eventCategoriesActionsGridVNodeID
    clickedNumber = eventCategoriesActionsClickedNumber
    
  }

  eventsCategoriesTimingActionsDeactivate(element, barsID, ticklabelsID, gridHID, gridVID)
  eventsCategoriesTimingActionsFill(kind, clickedNumber)

}


function eventsCategoriesTimingActionsMouseUp(element, kind) {

  let abbsID
  let barsID
  let ticklabelsID
  let gridHID
  let gridVID

  if (kind == 'timing') {

    abbsID = eventCategoriesTimingAbbsNodeID
    barsID = eventCategoriesTimingBarsNodeID
    ticklabelsID = eventCategoriesTimingTicklabelsNodeID
    gridHID = eventCategoriesTimingGridHNodeID
    gridVID = eventCategoriesTimingGridVNodeID
    
  } else if (kind == 'actions') {

    abbsID = eventCategoriesActionsAbbsNodeID
    barsID = eventCategoriesActionsBarsNodeID
    ticklabelsID = eventCategoriesActionsTicklabelsNodeID
    gridHID = eventCategoriesActionsGridHNodeID
    gridVID = eventCategoriesActionsGridVNodeID
    
  }

  eventsCategoriesTimingActionsClick(kind, element, abbsID, barsID, ticklabelsID, gridHID, gridVID)
  
}


function eventCategoriesTimingActionsRefresherMouseUp(kind) {

  let abbsID
  let barsID
  let ticklabelsID
  let gridHID
  let gridVID

  if (kind == 'timing') {

    abbsID = eventCategoriesTimingAbbsNodeID
    barsID = eventCategoriesTimingBarsNodeID
    ticklabelsID = eventCategoriesTimingTicklabelsNodeID
    gridHID = eventCategoriesTimingGridHNodeID
    gridVID = eventCategoriesTimingGridVNodeID
    
    eventCategoriesTimingClickedNumber = null
    
  } else if (kind == 'actions') {

    abbsID = eventCategoriesActionsAbbsNodeID
    barsID = eventCategoriesActionsBarsNodeID
    ticklabelsID = eventCategoriesActionsTicklabelsNodeID
    gridHID = eventCategoriesActionsGridHNodeID
    gridVID = eventCategoriesActionsGridVNodeID

    eventCategoriesActionsClickedNumber = null
    
  }

  eventsCategoriesTimingActionsReset(abbsID, barsID, ticklabelsID, gridHID, gridVID)
  eventsCategoriesTimingActionsFill(kind)
  
}


function eventPaceSetLeadersVariables() {

  if (glVEventPace['radioCondition'] == 'clear') {
    
    data_9_current_race = sortObject(data_9_current_race, 'PaceDiffClearRankOrder', true)
    
  } else if (glVEventPace['radioCondition'] == 'regular') {
    
    data_9_current_race = sortObject(data_9_current_race, 'PaceDiffRankOrder', true)
    
  }

  glVEventPace['leftTeamID'] = data_9_current_race[0]['TeamID']

  return 
  
}


function eventPaceUpdateLeftDataset(data_8_left, raceID, driverID) {

  if (notNULL(driverID)) {

    let conditionEvent = (o) => ((o['RaceID'] == raceID) && (o['DriverID'] == driverID))
  
    data_8_left_current_event = data_8_left.filter(o => conditionEvent(o))

    if (data_8_left_current_event.length == 0) {
      data_8_left_current_event = null
    }

  } else {

    data_8_left_current_event = null
    
  }
  
}


function eventPaceUpdateRightDataset(data_8_right, raceID, driverID) {

  if (notNULL(driverID)) {

    let conditionEvent = (o) => ((o['RaceID'] == raceID) && (o['DriverID'] == driverID))

    data_8_right_current_event = data_8_right.filter(o => conditionEvent(o))

    if (data_8_right_current_event.length == 0) {
      data_8_right_current_event = null
    }
    
  } else {

    data_8_right_current_event = null
    
  }

}


function eventPaceUpdateRightColor(colorRightToCheck=null) {

  if (notNULL(glVEventPace['rightDriverID'])) {

    if (!colorRightToCheck) {
      colorRightToCheck = tableGetColor(glVEvent['SeasonID'], glVEventPace['rightTeamID'])
    }

    if (colorRightToCheck == glVEventPace['leftColor']) {
      glVEventPace['rightColor'] = tableGetColor(glVEvent['SeasonID'], glVEventPace['rightTeamID'], 1)
    } else {
      glVEventPace['rightColor'] = colorRightToCheck
    }
    
  } else {

    glVEventPace['rightColor'] = glVEventPace['colorPelotone']
    
  }

}


function eventPaceUpdateChart_9(dataCurrentRace) {
  chart_9(chart2ID, dataCurrentRace, glVEventPace['metric'])
}


function eventPaceUpdateChart_11(laptimesCurrentEventLeft, laptimesCurrentEventRight) {

  chart_11(
    chart3ID, glVEventPace['metric'],
    [laptimesCurrentEventLeft, laptimesCurrentEventRight],
    [glVEventPace['leftColor'], glVEventPace['rightColor']],
  )

}


function eventPaceUpdateDriverVariables(driverID, kind) {

  if (kind == 'left') {

    if (isNULL(driverID)) {
      driverID = glVEventPace['leaderDriverID']
    }

    let driverData = drivers_part_this_season.filter(o => o['DriverID'] == driverID)

    if (driverData.length > 0) {
      
      driverData = driverData[0]

      // glVEventPace['leftDriverID'] = driverID
      glVEventPace['leftName'] = driverData['FullName']
      glVEventPace['leftTeamID'] = driverData['TeamID']
      glVEventPace['leftColor'] = driverData['Color']
      
    }

  } else if (kind == 'right') {

    if (isNULL(driverID)) {

      // glVEventPace['rightDriverID'] = null
      glVEventPace['rightName'] = glVEventPace['namePelotone']
      glVEventPace['rightTeamID'] = null
      glVEventPace['rightColor'] = glVEventPace['colorPelotone']
      
    } else {

      let driverData = drivers_part_this_season.filter( o => o['DriverID'] == driverID)
      
      if (driverData.length > 0) {

        driverData = driverData[0]

        // glVEventPace['rightDriverID'] = driverID
        glVEventPace['rightName'] = driverData['FullName']
        glVEventPace['rightTeamID'] = driverData['TeamID']
        glVEventPace['rightColor'] = driverData['Color']
        
      }

    }

  }

}


function dropdown25Fill() {

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'driverID': eventDriverIDs,
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown25ID,
    'items': eventNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true,
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let title = getElement(dropdown25TitleID)
  let marker = getElement(dropdown25MarkerID)

  marker.style.background = glVEventPace['leftColor']
  title.textContent = glVEventPace['leftName']

}


function dropdown25ItemMouseUp(element) {

  // glVEventPace['displayLeader'] = false

  glVEventPace['leftDriverID'] = element.getAttribute('driverID')
  eventPaceUpdateDriverVariables(glVEventPace['leftDriverID'], 'left')

  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID'],
    glVEventPace['leftTeamID']
  )

  let dataPaths = [d3.csv(event_path_data_8_left)]

  Promise.all(dataPaths).then(function(files) {

    data_8_left = files[0]
    
    eventPaceUpdateLeftDataset(data_8_left, glVEvent['RaceID'], glVEventPace['leftDriverID'])
    eventPaceUpdateRightColor()

    let dropdown25Title = getElement(dropdown25TitleID)
    dropdown25Title.textContent = glVEventPace['leftName']

    eventPaceFillMarkers(glVEventPace['leftColor'], glVEventPace['rightColor'])

    eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)

  }).catch(function(err) {
  // handle error here
  })

}


function dropdown26Fill() {

  let items = copyObject(eventNames)
  let driverIDs = copyObject(eventDriverIDs)
  let teamIDs = copyObject(eventTeamIDs)
  
  items.unshift(glVEventPace['namePelotone'])
  driverIDs.unshift(null)
  teamIDs.unshift(null)

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'driverID': driverIDs,
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown26ID,
    'items': items,
    'attributes': itemAttributes,
    'width': true,
    'border': true,
    'addSeparatorAfterIdx': [0]
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let title = getElement(dropdown26TitleID)
  let marker = getElement(dropdown26MarkerID)

  title.textContent = glVEventPace['rightName']
  marker.style.background = glVEventPace['rightColor']

}


function dropdown26ItemMouseUp(element) {

  glVEventPace['rightDriverID'] = element.getAttribute('driverID')
  eventPaceUpdateDriverVariables(glVEventPace['rightDriverID'], 'right')
  eventPaceUpdateRightColor(glVEventPace['rightColor'])

  let dropdown26Title = getElement(dropdown26TitleID)

  // if click driver
  if (notNULL(glVEventPace['rightDriverID'])) {

    eventUpdatePaths(
      glVEvent['RaceID'],
      glVEvent['SprintIndex'],
      glVEvent['SeasonID'],
      glVEventPace['leftTeamID'],
      glVEventPace['rightTeamID']
    )

    let dataPaths = [d3.csv(event_path_data_8_right)]

    Promise.all(dataPaths).then(function(files) {

      data_8_right = files[0]

      eventPaceUpdateRightDataset(data_8_right, glVEvent['RaceID'], glVEventPace['rightDriverID'])

      dropdown26Title.textContent = glVEventPace['rightName']

      eventPaceFillMarkers(glVEventPace['leftColor'], glVEventPace['rightColor'])

      eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)

    }).catch(function(err) {
    // handle error here
    })

  // if click pelotone
  } else {
    
    eventPaceUpdateRightDataset(data_8_right, glVEvent['RaceID'], glVEventPace['rightDriverID'])
  
    dropdown26Title.textContent = glVEventPace['rightName']
      
    eventPaceFillMarkers(glVEventPace['leftColor'], glVEventPace['rightColor'])
 
    eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)

  }

}


function eventPaceFillMarkers(colorLeft, colorRight) {

  let markerLeft = getElement(dropdown25MarkerID)
  let markerRight = getElement(dropdown26MarkerID)

  markerLeft.style.background = colorLeft
  markerRight.style.background = colorRight
  
}


function eventPaceTable1Fill(type='clear') {

  // if metric - RankPaceDiffClearByWorst

  let metric
  let metricRank
  let metricMean
  let paceMarkerLabel
  let paceLabel
  let paceAvg

  if (type == 'clear') {

    metric = 'PaceDiffClear'
    metricRank = metric + 'RankOrder'
    metricMean = 'PaceDiffClearMean'
    paceMarkerLabel = 'PaceClearPelotoneAvgLabel'
    paceLabel = 'PaceClearAvgLabel'
    paceAvg = 'PaceClearAvg'
    
  } else if (type == 'regular') {

    metric = 'PaceDiff'
    metricRank = metric + 'RankOrder'
    metricMean = 'PaceDiffMean'
    paceMarkerLabel = 'PacePelotoneAvgLabel'
    paceLabel = 'PaceAvgLabel'
    paceAvg = 'PaceAvg'
    
  }

  let data = sortObject(data_9_current_race, metricRank, true)

  // weather conditions

  let conditionsType = eventCurrentEvent[_conditions]
  let weatherConditions = getElement(eventPaceConditionsID)

  let airTempElement = getElement(eventPaceAirTempID)

  weatherConditions.src = `img/weather/${iconsConditions[conditionsType]['Filename']}.svg`

  airTempElement.innerHTML = `${eventCurrentEvent[_airTemp]} &deg;C`

  let dataBest = data[0]
  
  let dataWorst = data.filter(o => o[metric] != '-')
  dataWorst = lastElement(dataWorst)

  // best and worst pace
  
  let bestName = getElement(eventPaceLeaderNameID)
  let bestPaceDiff = getElement(eventPaceLeaderPaceDiffID)

  let driversBetterAvg = getElement(eventPaceDriversPaceBetterAverageID)
  let driversWorstAvg = getElement(eventPaceDriversPaceWorstAverageID)

  let bestNameValue = tableGetFullName(dataBest[_driverID])
  let bestColor = tableGetColor(dataBest[_seasonID], dataBest[_teamID])
 
  bestName.textContent = bestNameValue
  bestName.style.color = bestColor

  bestPaceDiff.textContent = Math.abs(dataBest[metric]).toFixed(3)
  bestPaceDiff.style.color = eventPaceGoodPaceColor

  getElement(eventPacePelotonePaceID).textContent = dataBest[paceMarkerLabel]
  getElement(eventPaceLeaderPaceID).textContent = dataBest[paceLabel]

  let worstName = getElement(eventPaceWorstNameID)
  let worstPaceDiff = getElement(eventPaceWorstPaceDiffID)

  let worstNameValue = tableGetFullName(dataWorst[_driverID])
  let worstColor = tableGetColor(dataWorst[_seasonID], dataWorst[_teamID])
  
  worstName.textContent = worstNameValue
  worstName.style.color = worstColor

  worstPaceDiffValue = Math.abs(dataWorst[metric]).toFixed(3)

  worstPaceDiff.textContent = worstPaceDiffValue
  worstPaceDiff.style.color = eventPaceBadPaceColor
  
  getElement(eventPaceWorstPaceID).textContent = dataWorst[paceLabel]

  let driversBetterAvgValue = data.filter(o => o[metric] > 0).length
  let driversWorstAvgValue = data.filter(o => o[metric] < 0).length

  driversBetterAvg.textContent = driversBetterAvgValue
  driversWorstAvg.textContent = driversWorstAvgValue

  let leaderSecondElement = getElement(eventPaceDriversPaceLeaderSecondDeltaID)
  let leaderSecondElementValue = Math.abs(data[1][paceAvg] - data[0][paceAvg])

  leaderSecondElementValue = Math.abs(data[0][metric] - data[1][metric])

  leaderSecondElementValue = leaderSecondElementValue.toFixed(3)
  leaderSecondElement.textContent = leaderSecondElementValue
  
}


function radio21MouseUp(currentButton) {

  radioActivateByClick(currentButton)

  let radioCondition = radiotGetButtonCondition(currentButton)

  glVEventPace['radioCondition'] = radioCondition

  eventPaceUpateMetrics()
  eventPaceTable1Fill(type=radioCondition)
  
  eventPaceUpdateChart_9(data_9_current_race)
  eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)
  
}


function refresh21MouseUp(element) {

  // glVEventPace['displayLeader'] = true
  glVEventPace['leftDriverID'] = null
  glVEventPace['rightDriverID'] = null

  eventPaceUpdateDriverVariables(null, 'left')
  eventPaceUpdateDriverVariables(null, 'right')

  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID'],
    glVEventPace['leaderTeamID']
  )

  let dataPaths = [d3.csv(event_path_data_8_left)]

    Promise.all(dataPaths).then(function(files) {

      data_8_left = files[0]
      data_8_right = null

      eventPaceUpdateLeftDataset(data_8_left, glVEvent['RaceID'], glVEventPace['leaderDriverID'])
      eventPaceUpdateRightDataset(data_8_right, glVEvent['RaceID'], glVEventPace['rightDriverID'])
      
      eventPaceUpdateRightColor()

      dropdown25Fill()
      dropdown26Fill()
      
      eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)

    }).catch(function(err) {
    // handle error here
  })

}


function eventCategoriesTimingDescFill() {

  getElement(eventCategoriesTimingDescContentID).innerHTML = chartDescBodyChartTiming

  let img1 = getElement(eventCategoriesTimingDescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/svg-event-categories-chart-timing.svg`

  let img2 = getElement(eventCategoriesTimingBarsDescImg1ID)
  img2.src = `img/chart-descriptions/${themeCurrent}/svg-event-categories-chart-bars-consistency.svg`

  let img3 = getElement(eventCategoriesTimingBarsDescImg2ID)
  img3.src = `img/chart-descriptions/${themeCurrent}/svg-event-categories-chart-bars-pace.svg`
    
}


function eventCategoriesActionsDescFill() {

  getElement(eventCategoriesActionsDescContentID).innerHTML = chartDescBodyChartActions

  let img1 = getElement(eventCategoriesActionsDescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/svg-event-categories-chart-actions.svg`

  let img2 = getElement(eventCategoriesActionsBarsDescImg1ID)
  img2.src = `img/chart-descriptions/${themeCurrent}/svg-event-categories-chart-bars-start.svg`

  let img3 = getElement(eventCategoriesActionsBarsDescImg2ID)
  img3.src = `img/chart-descriptions/${themeCurrent}/svg-event-categories-chart-bars-overtakes.svg`
    
}


function eventCategoriesDescsFill() {

  eventCategoriesTimingDescFill()
  eventCategoriesActionsDescFill()
  
}


function eventComparisonRadarDescFill() {

  // laptimes
  getElement(eventComparisonRadarDescContentID).innerHTML = chartDescEventComparisonRadar

  let img1 = getElement(eventComparisonRadarDescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/svg-event-comparison-radar.svg`
    
}


function eventComparisonLaptimesDescFill() {

  // laptimes
  getElement(eventComparisonLaptimesDescContentID).innerHTML = chartDescBodyChartEventLaptimes

  let img1 = getElement(eventComparisonLaptimesDescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/svg-laptimes-plot-laptimes-left.svg`

  let img2 = getElement(eventComparisonDifferencesDescImg1ID)
  img2.src = `img/chart-descriptions/${themeCurrent}/svg-laptimes-difference-plot-laptimes-difference.svg`
    
}


function eventComparisonDescsFill() {

  eventComparisonRadarDescFill()
  eventComparisonLaptimesDescFill()
  
}


function eventPaceChart9DescFill() {

  getElement(eventPaceChart9DescContentID).innerHTML = chartDescBodyChart9

  let img1 = getElement(eventPaceChart9DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-9-1.svg`
    
}


function eventPaceChart11DescFill() {

  getElement(eventPaceChart11DescContentID).innerHTML = chartDescBodyChart11

  let img1 = getElement(eventPaceChart11DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-11-1.svg`
    
}


function eventPaceDescFill() {

  eventPaceChart9DescFill()
  eventPaceChart11DescFill()
  
}


function eventPaceLapByLapTooltipFill(dataLeft, colorLeft, dataRight, colorRight) {

  let driverLeftName = getElement(eventPaceLapByLapTooltipDriverLeftID)
  driverLeftName.textContent = dataLeft[0]['Abbreviation']
  driverLeftName.style.color = colorLeft

  let driverRightName = getElement(eventPaceLapByLapTooltipDriverRightID)

  if (dataRight) {

    driverRightName.textContent = dataRight[0]['Abbreviation']
    driverRightName.style.color = colorRight
    
  } else {

    driverRightName.textContent = 'ПЕЛОТОН'
    driverRightName.style.color = ''
    
  }
  
}


function eventPaceLapByLapTooltipActivate(lap, dataLeft) {

  let dataLap = dataLeft.filter(o => o['LapNumber'] == lap)[0]

  let lapEl = getElement(eventPaceLapByLapTooltipLapID)
  lapEl.textContent = lap

  let driverLeftEl = getElement(eventPaceLapByLapTooltipDriverLeftID)
  driverLeftEl.textContent = dataLap['Abbreviation']

  let valueLeftEl = getElement(eventPaceLapByLapTooltipValueLeftID)
  valueLeftEl.textContent = secToLabel(dataLap['Laptime'])
  
}


function eventPaceLapByLapTooltipClean() {

  let lapEl = getElement(eventPaceLapByLapTooltipLapID)
  let valueLeftEl = getElement(eventPaceLapByLapTooltipValueLeftID)

  lapEl.textContent = ''
  valueLeftEl.textContent = ''

}


function eventPaceLapByLapCheckFirstLoad(condition) {

  // first load and when year changes
  
  let lapByLapTooltip = getElement(eventPaceLapByLapTooltipID)

  if (condition == '1') {
    
    let lapByLapTooltipHeight = glVEventPace['chart11LapByLapHeight']
    
    lapByLapTooltip.style.height = `${lapByLapTooltipHeight}px`
    
  } else if (condition == '0') {
    
    lapByLapTooltip.style.height = 0
    
  }

  checkElementClick(
    eventPaceLapByLapCheckID, eventPaceLapByLapCheckIconID,
    condition
  )
  
}


function eventPaceLapByLapCheckMouseUp(elementID) {

  let condition = element.getAttribute('condition')
  
  let lapByLapTooltip = getElement(eventPaceLapByLapTooltipID)
  let lapByLapTooltipHeight = glVEventPace['chart11LapByLapHeight']

  let chartContainer = getElement(chart3ID)
  let chartContainerHeight = chartContainer.offsetHeight

  let svg = getElement(eventPaceChart11SVGID)
  let svgSizes = getSizes(svg)
  let svgHeight = svgSizes.height
  
  let main1 = getElement(eventPaceChart11Main1ID)
  let main2 = getElement(eventPaceChart11Main2ID)

  if (condition == '0') {
    
    glVEventPace['chart11LapByLapCondition'] = 1
    
    lapByLapTooltip.style.height = `${lapByLapTooltipHeight}px`
    
    main1.style.opacity = 0
    main1.style.pointerEvents = 'none'
    
    main2.style.opacity = 1
    main2.style.pointerEvents = 'auto'

    chartContainer.style.height = `${chartContainerHeight - lapByLapTooltipHeight}px`

    
  } else if (condition == '1') {
    
    glVEventPace['chart11LapByLapCondition'] = 0
    
    lapByLapTooltip.style.height = 0

    main1.style.opacity = 1
    main1.style.pointerEvents = 'auto'
    
    main2.style.opacity = 0
    main2.style.pointerEvents = 'none'
    
  }

  checkElementClick(
    eventPaceLapByLapCheckID, eventPaceLapByLapCheckIconID,
    glVEventPace['chart11LapByLapCondition']
  )
  
}


function eventSegmentDriversDataUpdate(drivers_part) {

  // filter drivers_part
  drivers_part_this_season = drivers_part
    .filter(o => o['SeasonID'] == glVEvent['SeasonID'])

  drivers_part_this_season = sortValuesString(drivers_part_this_season, 'FullName', true)
  
}


function eventListsRefresh() {

  eventDriverIDs = []
  eventNames = []
  eventNumbers = []
  eventTeams = []
  eventTeamIDs = []
  eventColors = []
  
}


function eventListsCreate(driversData) {

  if (eventDriverIDs.length == 0) { eventDriverIDs = driversData.map(o => o['DriverID']) }
  if (eventNames.length == 0) { eventNames = driversData.map(o => o['FullName']) }
  if (eventNumbers.length == 0) { eventNumbers = driversData.map(o => o['Number']) }
  if (eventTeams.length == 0) { eventTeams = driversData.map(o => o['Team']) }
  if (eventTeamIDs.length == 0) { eventTeamIDs = driversData.map(o => o['TeamID']) }
  if (eventColors.length == 0) { eventColors = driversData.map(o => o['Color']) }

}


function eventPaceUpateMetrics() {

  if (glVEventPace['radioCondition'] == 'clear') {

    glVEventPace['metric'] = 'PaceDiffClear'
    glVEventPace['metricOrder'] = 'PaceDiffClearRankOrder'
    glVEventPace['metricLaptimes'] = 'LaptimeClear'
    
  } else {

    glVEventPace['metric'] = 'PaceDiff'
    glVEventPace['metricOrder'] = 'PaceDiffRankOrder'
    glVEventPace['metricLaptimes'] = 'Laptime'
    
  }
  
}


function eventWrongEventFill() {

  if (glVEvent['WrongEvent'] == true) {
    
    wrongEventMessage(glVEvent['SeasonID'], glVEvent['WrongEventNameRus'])
    
    glVEvent['WrongEvent'] = false
    
  }

}


function eventComparisonGetDeltaColor(value, color1, color2, color3, lowerBetter=true) {

  let color

  if (lowerBetter) {

    if (value < 0) {
      color = color1
    } else if (value > 0) {
      color = color2
    } else {
      color = color3
    }
    
  } else {

    if (value > 0) {
      color = color1
    } else if (value < 0) {
      color = color2
    } else {
      color = color3
    }
    
  }

  return color
  
}


function eventGlobalsVariablesRefresh() {

  // all pages
  event_summary = null
  eventListsRefresh()

  // comparison
  event_laptimes_left = null
  event_laptimes_right = null
  event_results_summary_left = null
  event_results_summary_right = null

  eventComparisonNames = []
  eventComparisonIDs = []

  // pace
  data_9 = null
  data_8_left = null
  data_8_right = null
  
}








































function eventLoadPages(pageID, kind) {

  // 3 types
  // 1 - segment - when cahnge segment
  // 2 - year - when change year
  // 3 - event - when change event

  if (kind == 'segment') {

    scrollPosition = 0

    drivers_part_this_season = []

    // clear globals
    glVEvent['SeasonID'] = lastElement(seasonIDs)
    glVEvent['RaceID'] = null
    glVEvent['EventNameRus'] = null
    glVEvent['EventID'] = null
  
    glVEvent['WrongEvent'] = false
    glVEvent['WrongEventNameRus'] = null
    
    glVEventPace['chart11LapByLapHeight'] = px28

    // define calendar
    eventCalendar = copyObject(calendar)
    eventCalendar = eventCalendar.filter(o => o['SeasonID'] == glVEvent['SeasonID'])

    // define current event as last event
    eventCurrentEvent = eventCalendar.filter(o => o['DataAvailable'] == 1).slice(-1)[0]

    // define other paramters
    glVEvent['SprintIndex'] = eventCurrentEvent['SprintIndex']
    glVEvent['RaceID'] = eventCurrentEvent['RaceID']
    glVEvent['EventID'] = eventCurrentEvent['EventID']

    // update event drivers data and lists
    if (drivers_part_this_season.length == 0) {
      eventSegmentDriversDataUpdate(drivers_part)
      eventListsCreate(drivers_part_this_season)
    }

    // fill menu years
    menuYearsFill(menuYears21ID, seasonIDs)

    // fill menu events
    eventMenuEventsFill(menuEvents21ID, menuEvents21ItemID, eventCalendar)
    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])

  // here we already know eventCalendar, SeasonID and EventID
  } else if (kind == 'year') {

    // define calendar
    eventCalendar = copyObject(calendar)
    eventCalendar = eventCalendar.filter(o => o['SeasonID'] == glVEvent['SeasonID'])

    // check wrong event and define eventCurrentEvent

    // event IDs of current calendar
    let eventIDs = eventCalendar.map(o => o['EventID'])

    // if event not available - set first event of calendar
    if (!eventIDs.includes(glVEvent['EventID'])) {
  
      eventCurrentEvent = firstElement(eventCalendar)
  
      glVEvent['WrongEvent'] = true
      glVEvent['WrongEventNameRus'] = copyObject(glVEvent['EventNameRus'])

      // update eventID
      glVEvent['EventID'] = eventCurrentEvent['EventID']
  
      eventWrongEventFill()
  
    // if event available - select by EventID
    } else {
  
      eventCurrentEvent = eventCalendar.filter(o => o['EventID'] == glVEvent['EventID'])[0]
  
      glVEvent['WrongEvent'] = false
      glVEvent['WrongEventNameRus'] = null
      
    }

    // define other paramters
    glVEvent['SprintIndex'] = eventCurrentEvent['SprintIndex']
    glVEvent['RaceID'] = eventCurrentEvent['RaceID']
    
    // update event drivers data and lists
    if (!drivers_part_this_season.length) {
      eventSegmentDriversDataUpdate(drivers_part)
      eventListsCreate(drivers_part_this_season)
    }

    // fill menu events
    eventMenuEventsFill(menuEvents21ID, menuEvents21ItemID, eventCalendar)
    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])

  // we know eventCalendar, SeasonID and EventID after click on event abbreviation
  } else if (kind == 'event') {

    // define event
    eventCurrentEvent = eventCalendar.filter(o => o['EventID'] == glVEvent['EventID'])[0]

    // define other paramters
    glVEvent['SprintIndex'] = eventCurrentEvent['SprintIndex']
    glVEvent['RaceID'] = eventCurrentEvent['RaceID']

    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])
    
  }

  eventUpdatePaths(glVEvent['RaceID'])

  let dataPaths = [d3.csv(pathSummaryActual)]

  Promise.all(dataPaths).then(function(files) {

    event_summary = files[0]

    updateEventPages(pageID)

    }).catch(function(err) {
    // handle error here
  })

}


function updateEventRatingPage(kind) {

  updateUnits()

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventResultsPageID

  eventUpdateEventInfoByRaceID()

  getElement(eventContentContainerID).innerHTML = ''
  getElement(eventContentContainerID).innerHTML += pageEventRating

  eventMenuSetPaddingLeft(containerEventsRatingID)

  eventEventInformationUpdate()
  eventChartRatingUpdate()

  glVGlobal['FirstLoad'] = false

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  eventAppearElements(glVGlobal['Page'])
  appearElement(eventMainContainerID)

  // hide loader
  disappearLoader(loaderID)
  
}


function updateEventCategoriesPage(kind) {

  updateUnits()

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventCategoriesPageID

  eventUpdateEventInfoByRaceID()

  eventCategoriesActionsClickedNumber = null

  getElement(eventContentContainerID).innerHTML = ''
  getElement(eventContentContainerID).innerHTML += pageEventCategories

  eventMenuSetPaddingLeft(containerEventsCategoriesID)

  eventsCategoriesTimingActionsFill(kind='timing')
  eventsCategoriesTimingActionsFill(kind='actions')

  updateChartTimingActions(event_summary)

  glVGlobal['FirstLoad'] = false
  
  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  eventAppearElements(glVGlobal['Page'])
  appearElement(eventMainContainerID)

  // hide loader
  disappearLoader(loaderID)

}


function updateEventComparisonPage(kind) {

  updateUnits()

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventComparisonPageID

  eventUpdateEventInfoByRaceID()

  getElement(eventContentContainerID).innerHTML = ''
  getElement(eventContentContainerID).innerHTML += pageEventComparison

  eventMenuSetPaddingLeft(containerEventsComparisonID)

  let eventTeamsData = []
  let eventTeamsDuplicates = []

  // event comparison lists
  event_summary.forEach((d, i) => {
    
    eventComparisonNames.push(d['FullName'])
    eventComparisonDriverIDs.push(d['DriverID'])

    if (!eventTeamsDuplicates.includes(d['Team'])) {
      eventTeamsData.push({Team: d['Team'], TeamID: d['TeamID']})
      eventTeamsDuplicates.push(d['Team'])
    }

  })

  eventTeamsData = sortValuesString(eventTeamsData, 'Team', true)
  eventComparisonTeams = eventTeamsData.map(o => o['Team'])
  eventComparisonTeamIDs = eventTeamsData.map(o => o['TeamID'])

  glVEventComparison['LeftDriverID'] = event_summary[0]['DriverID']
  glVEventComparison['RightDriverID'] = event_summary[1]['DriverID']

  event_results_summary_left = event_summary.filter(o => o['DriverID'] == glVEventComparison['LeftDriverID'])[0]
  event_results_summary_right = event_summary.filter(o => o['DriverID'] == glVEventComparison['RightDriverID'])[0]

  glVEventComparison['LeftTeamID'] = event_results_summary_left['TeamID']
  glVEventComparison['RightTeamID'] = event_results_summary_right['TeamID']

  glVEventComparison['LeftTeam'] = event_results_summary_left['Team']
  glVEventComparison['RightTeam'] = event_results_summary_right['Team']

  dropdown24Fill()
  dropdown23Fill(dropdown23LeftID, event_results_summary_left['FullName'])
  dropdown23Fill(dropdown23RightID, event_results_summary_right['FullName'])

  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID'],
    glVEventComparison['LeftTeamID'],
    glVEventComparison['RightTeamID']
  )

  if ((notNULL(event_laptimes_left)) && (notNULL(event_laptimes_right))) {

    updateEventComparisonPageContent(event_laptimes_left, event_laptimes_right)
    
  } else {

    let dataPaths2 = [d3.csv(event_path_data_8_left), d3.csv(event_path_data_8_right)]

    Promise.all(dataPaths2).then(function(files) {
  
      event_laptimes_left = files[0]
      event_laptimes_right = files[1]

      updateEventComparisonPageContent(event_laptimes_left, event_laptimes_right)
  
      }).catch(function(err) {
      // handle error here
    })
    
  }

}


function updateEventComparisonPageContent(event_laptimes_left, event_laptimes_right) {

  let filterLaptimes = (o) => (
    (o['SprintIndex'] == glVEvent['SprintIndex'])
    && (o['SeasonID'] == glVEvent['SeasonID'])
    && (o['RaceID'] == glVEvent['RaceID'])
  )

  let laptimesLeftCondition = (o) => (o['DriverID'] == glVEventComparison['LeftDriverID'])
  let laptimesRightCondition = (o) => (o['DriverID'] == glVEventComparison['RightDriverID'])

  event_laptimes_left = event_laptimes_left.filter(o => (filterLaptimes(o) && laptimesLeftCondition(o)))
  event_laptimes_right = event_laptimes_right.filter(o => (filterLaptimes(o) && laptimesRightCondition(o)))

  eventsComparisonSetMetricsNameWidth()

  eventUpdateChartsComparison(event_results_summary_left, event_results_summary_right, event_laptimes_left, event_laptimes_right)

  glVGlobal['FirstLoad'] = false

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  eventAppearElements(glVGlobal['Page'])
  appearElement(eventMainContainerID)

  // hide loader
  disappearLoader(loaderID)
  
}


function updateEventPacePage(kind) {

  updateUnits()

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventPacePageID

  glVEventPace['radioCondition'] ||= 'clear'
  glVEventPace['chart11LapByLapCondition'] = 0
  
  eventUpdateEventInfoByRaceID()
  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID']
  )
  
  getElement(eventContentContainerID).innerHTML = ''
  getElement(eventContentContainerID).innerHTML += pageEventPace

  eventMenuSetPaddingLeft(containerEventsPaceID)

  if (data_9) {

    updateEventPacePageContent1(data_9, data_8_left, data_8_right)
    
  } else {

    let dataPaths = [d3.csv(event_path_data_9)]

    Promise.all(dataPaths).then(function(files) {

      data_9 = files[0]

      updateEventPacePageContent1(data_9, data_8_left, data_8_right)
  
      }).catch(function(err) {
      // handle error here
    })
    
  }

}


function updateEventPacePageContent1(data_9, data_8_left, data_8_right) {

  eventPaceUpateMetrics()

  let currentRaceCondition = (o) => (
    (o['SeasonID'] == glVEvent['SeasonID'])
    && (o['RaceID'] == glVEvent['RaceID'])
  )

  // get sorted data_9 for current event
  data_9_current_race = copyObject(data_9)
  data_9_current_race = data_9_current_race.filter(o => currentRaceCondition(o))
  data_9_current_race = sortObject(data_9_current_race, glVEventPace['metricOrder'], true)

  glVEventPace['leaderDriverID'] = data_9_current_race[0]['DriverID']
  glVEventPace['leaderTeamID'] = data_9_current_race[0]['TeamID']

  let leftDriverID = glVEventPace['leftDriverID'] ?? glVEventPace['leaderDriverID']

  eventPaceUpdateDriverVariables(leftDriverID, 'left')
  eventPaceUpdateDriverVariables(glVEventPace['rightDriverID'], 'right')

  eventUpdatePaths(
    glVEvent['RaceID'],
    glVEvent['SprintIndex'],
    glVEvent['SeasonID'],
    glVEventPace['leftTeamID'],
    glVEventPace['rightTeamID']
  )

  if (notNULL(data_8_left) && (notNULL(data_8_right))) {

    updateEventPacePageContent2(data_8_left, data_8_right, leftDriverID)
    
  } else {

    let dataPaths2
  
    if (notNULL(glVEventPace['rightDriverID'])) {
      dataPaths2 = [d3.csv(event_path_data_8_left), d3.csv(event_path_data_8_right)]
    } else {
      dataPaths2 = [d3.csv(event_path_data_8_left)]
    }
  
    Promise.all(dataPaths2).then(function(files2) {
  
      data_8_left = files2[0]

      if (notNULL(glVEventPace['rightDriverID'])) {
        data_8_right = files2[1]
      }

      updateEventPacePageContent2(data_8_left, data_8_right, leftDriverID)
  
      }).catch(function(err) {
      // handle error here
    })
    
  }

}


function updateEventPacePageContent2(data_8_left, data_8_right, leftDriverID) {

  eventPaceUpdateLeftDataset(data_8_left, glVEvent['RaceID'], leftDriverID)
  eventPaceUpdateRightDataset(data_8_right, glVEvent['RaceID'], glVEventPace['rightDriverID'])

  dropdown25Fill()
  dropdown26Fill()

  radioActivateByCondition(radio21ID, glVEventPace['radioCondition'])

  eventPaceTable1Fill(glVEventPace['radioCondition'])

  eventPaceUpdateChart_9(data_9_current_race)
  eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)
  
  eventPaceLapByLapCheckFirstLoad(glVEventPace['chart11LapByLapCondition'])

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {

    eventPaceDescFill()
    
    eventPaceUpdateChart_9(data_9_current_race)
    eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)

    eventPaceLapByLapCheckFirstLoad(glVEventPace['chart11LapByLapCondition'])
    
  }

  window.onresize = () => {

    updateUnits()

    eventPaceUpdateChart_9(data_9_current_race)
    eventPaceUpdateChart_11(data_8_left_current_event, data_8_right_current_event)

    eventPaceLapByLapCheckFirstLoad(glVEventPace['chart11LapByLapCondition'])

    eventMenuEventsSelection(menuEvents21ID, glVEvent['EventID'])
    
  }

  glVGlobal['FirstLoad'] = false

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  eventAppearElements(glVGlobal['Page'])
  appearElement(eventMainContainerID)

  // hide loader
  disappearLoader(loaderID)
  
}


function updateEventPages(pageID) {

  if (pageID == eventResultsPageID) {
    updateEventRatingPage(kind)
  } else if (pageID == eventCategoriesPageID) {
    updateEventCategoriesPage(kind)
  } else if (pageID == eventComparisonPageID) {
    updateEventComparisonPage(kind)
  } else if (pageID == eventPacePageID) {
    updateEventPacePage(kind)
  }
  
}










