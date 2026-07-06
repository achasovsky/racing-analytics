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


function eventUpdatePaths(raceID, sprintIndex, seasonID, teamLeft, teamRight) {

  pathSummaryActual = pathSummary + raceID + '.csv'
  pathProtocolActual = pathProtocols + raceID + '.csv'

  // pathLaptimesRaceActual = pathLaptimes + raceID + '.csv'

  pathLaptimesDriversActual = pathSeasonData + seasonID + '/' + 'data_9_' + seasonID + '_' + sprintIndex + '.csv'

  if (teamLeft) {
    pathEventLaptimesLeft = pathSeasonData + seasonID + '/data_8/' + 'data_8_' + seasonID + '_' + sprintIndex + '_' + teamLeft + '.csv'
  }

  if (teamRight) {
    pathEventLaptimesRight = pathSeasonData + seasonID + '/data_8/' + 'data_8_' + seasonID + '_' + sprintIndex + '_' + teamRight + '.csv'
  }
  

}


function eventUpdateGlobalsBySeasonID() {

  // Events Data
  eventsEventsCurrentSeason = events.filter(d => d['SeasonID'] == glVEvent['SeasonID'])

  // EventID (correct if neccessary - wrong event or not available yet)
  
  let eventsThisSeasonEventIDs = eventsEventsCurrentSeason.map(d => d['EventID'])

  // if current event not in selected season
  if (!eventsThisSeasonEventIDs.includes(glVEvent['EventID'])) {
    
    glVEvent['WrongEvent'] = true
    // take first event of selected season
    glVEvent['EventID'] = eventsThisSeasonEventIDs[0]
    glVEvent['WrongEventNameRus'] = copyObject(glVEvent['EventNameRus'])
    
  }
  
  let eventsThisSeasonDataNotAvailable = eventsEventsCurrentSeason.filter(o => o['DataAvailable'] == 0)
  let eventsThisSeasonDataNotAvailableIDs = eventsThisSeasonDataNotAvailable.map(o => o['EventID'])

  // if event not available
  if (eventsThisSeasonDataNotAvailableIDs.includes(glVEvent['EventID'])) {
    
    glVEvent['NotAvailableEvent'] = true
    // take first event of selected season
    glVEvent['EventID'] = eventsThisSeasonEventIDs[0]
    glVEvent['NotAvailableEventNameRus'] = glVEvent['EventNameRus']
    
  }

  // Current Event Data
  let condition = (o) => (o['SeasonID'] == glVEvent['SeasonID']) & (o['EventID'] == glVEvent['EventID'])
  eventsEvent = eventsEventsCurrentSeason.filter(o => condition(o))[0]

  // RaceID
  glVEvent['RaceID'] = eventsEvent['RaceID']

  // glVEvent['EventNameRus'] = eventsEvent['EventNameRus']
    
}


function eventMenuYearsMouseUp(element) {

  pageContainerGetScroll()

  glVEvent['ComparisonReset'] = true
  glVEvent['PaceReset'] = true

  // get SeasonID
  glVEvent['SeasonID'] = element.getAttribute('SeasonID')

  // update parameters
  eventUpdateGlobalsBySeasonID()

  // fill events menu
  eventMenuEventsFill(menuEvents21ID, menuEvents21ItemID, eventsEventsCurrentSeason)
  eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

  // update page
  updateEventPages(glVGlobal['Page'])

}


function eventMenuEventsFill(menuID, itemID, eventsData) {

  let menu = getElement(menuID)

  // clear div
  menu.innerHTML = ''

  eventsData.forEach((eventData, i) => {

    let raceID = eventData['RaceID']
    let abb = eventData['EventAbbreviation']
    let available = eventData['DataAvailable']
    let eventID = eventData['EventID']
    let name = eventData['EventNameRus']

    let el = document.createElement('div')

    if (available == 1) {
      el.className = 'menu-events-abb-item'
    } else{
      el.className = 'menu-events-abb-item menu-events-abb-item-na'
    }
    
    el.id = itemID + '-' + raceID
    el.setAttribute('EventNameRus', name)
    el.setAttribute('raceID', raceID)
    el.setAttribute('eventID', eventID)
    el.setAttribute('available', available)
    el.setAttribute('abbreviation', abb)
    el.textContent = `${abb}`

    menu.appendChild(el)
    
  })

}


function eventMenuEventsSelection(menuID, raceID) {

  let menu = getElement(menuID)

  arrayFromElementChildren(menu).forEach((item, i) => {
    
    item.classList.remove('menu-events-abb-item-active')

    if (item.getAttribute('RaceID') == raceID) {
      item.classList.add('menu-events-abb-item-active')
    }

  })
  
}


function eventMenuEventsMouseUp(element) {

  pageContainerGetScroll()

  glVEvent['RaceID'] = element.getAttribute('RaceID')
  // glVEvent['EventID'] = element.getAttribute('EventID')
  
  glVEvent['ComparisonReset'] = true

  if (glVEvent['PaceDefaultDriver'] == true) {
    glVEvent['PaceReset'] = true
  }

  updateEventPages(glVGlobal['Page'])

}


function eventUpdateGlobalsByRaceID() {

  // Current Event Data
  let condition = (o) => (o['RaceID'] == glVEvent['RaceID'])
  eventsEvent = eventsEventsCurrentSeason.filter(o => condition(o))[0]

  glVEvent['EventNameRus'] = eventsEvent['EventNameRus']
  glVEvent['EventID'] = eventsEvent['EventID']
  
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

  let titleEvent = eventsEvent['EventNameRusClear']

  if (eventsEvent['SprintIndex'] == 0) {
    getElement(eventEventInfoTrackName2ID).style.width = 'auto'
    getElement(eventEventInfoTrackName2ID).style.visibility = 'visible'
  } else {
    getElement(eventEventInfoTrackName2ID).style.width = 0
    getElement(eventEventInfoTrackName2ID).style.visibility = 'hidden'
  }

  setText(containerEventInformationDate, eventsEvent['EventDateMod'])

  // set event name
  setText(eventEventInfoEventNameID, titleEvent)

  // set track and race number text
  setText(
    eventEventInfoTrackName1ID,
    `${eventsEvent['EventNumber']} из ${eventsEvent['EventsTotal']}`)
  
  // setText(
  //   eventEventInfoTrackName2ID,
  //   `${currentSessionType}`)
  
  setText(
    eventEventInfoTrackName3ID,
    `${eventsEvent['TrackNameRus']}`)

  // set flag
  let pathFlag = pathImgNationsRect + `${eventsEvent['CountryAbbreviation']}.svg`
  getElement(eventEventInfoFlagID).src = pathFlag

  // update weather conditions
  updateWeatherConditions(eventsEvent)

}


function eventTable21Create() {

  if (getElement('events-ratings-protocol')) { getElement('events-ratings-protocol').innerHTML = '' }

  // let captions = ['Имя', 'Номер', 'Время',  'Старт', 'Финиш', 'Очки']
  let captions = ['Имя', 'Время',  'Старт', 'Финиш', 'Очки']

  tableAddRow(
    'events-ratings-protocol',
    captions,
    addBorder=true,
    addIndex=true,
    attributes={
      index: '',
      rowClassList: 'tables-row tables-cell-2-1-row mb-05',
      cellClassList: 'tables-cell tables-cell-2-1 tables-cell-2-1-caption',
      fontClassList: 'tables-font tables-font-caption',
      nameCellClassList: 'tables-cell-2-1-name',
      indexClassList: 'tables-cell-index tables-cell-2-1-index',
      hoverClass: '',
      additionalCellClasses: [{cellIndex: 2, cellClass: 'tables-cell-2-1-time'}]
    },
    cellAttributes={})

  eventProtocol.forEach((obj, i) => {

    values = Object.values(obj)
    values.splice(1, 1)

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


function eventChartRatingUpdate() {

  // draw topfive plot
  plotTopFive(eventSummary)

  // update classification table 
  eventTable21Create()

  // draw metric
  plotMetrics(eventSummary, 'plot-metrics')

  window.onresize = () => {

    updateUnits()

    if (getElement(menuEvents21ID)) {

      eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])
      
    }

    if (getElement('events-ratings-protocol')) {
      eventTable21Create()
    }

    if (getElement('plot-metrics')) {
      plotTopFive(eventSummary)
      plotMetrics(eventSummary, 'plot-metrics') 
    }

  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {
    
    // draw topfive plot
    plotTopFive(eventSummary)
  
    // update classification table 
    eventTable21Create()
  
    // draw metric
    plotMetrics(eventSummary, 'plot-metrics')
    
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

  wrongEvent.style.opacity = 0

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

    eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

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

  let attributesDict = {
    'index': 'index'
  }

  let dropdownTitle = getElement(dropdown24TitleID)

  dropdownTitle.textContent = 'Выберите команду'

  // fill menu
  dropdownMenuFill(
    dropdownID=dropdown24ID,
    itemsList=eventComparisonTeams,
    attributesDict=attributesDict,
    widthControl=true,
  )

  let leftTeam = eventComparisonDriversData['Left']['Team']
  let rightTeam = eventComparisonDriversData['Right']['Team']
    
  // fill title
  if (leftTeam == rightTeam) {
    getElement(dropdown24TitleID).textContent = leftTeam
  } else {
    getElement(dropdown24TitleID).textContent = 'Выберите команду'
  }

}


function dropdown24ItemMouseUp(element) {

  // chosen team
  let team = element.textContent

  let dropdown = getElement(dropdown24ID)
  let title = getElement(dropdown24TitleID)
  let menu = getElement(dropdown24MenuID)
  let border = getElement(dropdown24BorderID)
  let caret = getElement(dropdown24CaretID)

  // lists
  let data = eventSummary.filter(d => d['Team'] == team)

  let numberLeft
  let numberRight

  let nameLeft
  let nameRight

  // dropdown title
  title.textContent = team

  dropdownClose(dropdownID, border=border, menu=menu, caret=caret)

  if (data.length > 1) {

    numberLeft = data[0]['Number']
    numberRight = data[1]['Number']
  
    nameLeft = data[0]['FullName']
    nameRight = data[1]['FullName']
    
  } else {

    numberLeft = data[0]['Number']
    numberRight = data[0]['Number']
  
    nameLeft = data[0]['FullName']
    nameRight = data[0]['FullName']
    
  }

  // globals
  eventComparisonDriversData['Left']['Number'] = numberLeft
  eventComparisonDriversData['Right']['Number'] = numberRight
  
  eventComparisonDriversData['Left']['FullName'] = nameLeft
  eventComparisonDriversData['Right']['FullName'] = nameRight

  eventComparisonDriversData['Left']['Team'] = team
  eventComparisonDriversData['Right']['Team'] = team

  // update title of dropdowns with drive names
  getElement(dropdown23LeftTitleID).textContent = nameLeft
  getElement(dropdown23RightTitleID).textContent = nameRight

  // charts
  let summaryLeft = eventSummary.filter(o => o['Number'] == numberLeft)[0]
  let summaryRight = eventSummary.filter(o => o['Number'] == numberRight)[0]

  eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], team)

  let dataPaths = [d3.csv(pathEventLaptimesLeft)]

  Promise.all(dataPaths).then(function(files) {

    let laptimes = files[0]

    let filterLaptimes = (o) => (
      (o['SprintIndex'] == glVEvent['SprintIndex'])
      && (o['SeasonID'] == glVEvent['SeasonID'])
      && (o['RaceID'] == glVEvent['RaceID'])
    )

    let filterLaptimesLeft = (o) => (o['Number'] == numberLeft)
    let filterLaptimesRight = (o) => (o['Number'] == numberRight)

    laptimesLeft = laptimes.filter(o => (filterLaptimes(o) && filterLaptimesLeft(o)))
    laptimesRight = laptimes.filter(o => (filterLaptimes(o) && filterLaptimesRight(o)))

    eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)

    }).catch(function(err) {
    // handle error here
  })

  // let laptimesLeft = eventLaptimes.filter(o => o['Number'] == numberLeft)
  // let laptimesRight = eventLaptimes.filter(o => o['Number'] == numberRight)

}


function iconNav24MouseUp(element) {

  let title = getElement(dropdown24ID + '-title')
  let currentValue = title.textContent

  let kind = element.getAttribute('nav_kind')

  let nextIndex = dropdownGetIndex(
    kind=kind,
    currentValue, valuesList=eventComparisonTeams,
    defaultTitle='Выберите команду'
  )

  let menu = getElement(dropdown24MenuID)
  let nextItem

  arrayFromChildren(menu).forEach((item, i ) => {
    if (item.getAttribute('index') == nextIndex) {
      nextItem = item
    }
  })

  dropdown24ItemMouseUp(nextItem)
  
}


function dropdown23Fill(dropdownID, driverName) {

  let numbers = eventSummary.map(o => o['Number'])
  let teams = eventSummary.map(o => o['Team'])

  let attributesDict = {
    'index': 'index',
    'number': numbers,
    'team': teams
  }

  let dropdownTitle

  // fill menu
  dropdownMenuFill(
    dropdownID=dropdownID,
    itemsList=eventComparisonFullNames,
    attributesDict=attributesDict,
    widthControl=true
  )

  if (dropdownID.includes('left')) {

    dropdownTitle = getElement(dropdown23LeftTitleID)
    dropdownTitle.setAttribute('number', eventComparisonDriversData['Left']['Number'])

  } else if (dropdownID.includes('right')) {
    
    dropdownTitle = getElement(dropdown23RightTitleID)
    dropdownTitle.setAttribute('number', eventComparisonDriversData['Right']['Number'])
    
  }

  dropdownTitle.textContent = driverName

}


function dropdown23ItemMouseUp(dropdownID, element) {

  let dropdown
  let dropdownTitle
  let border
  let menu
  let caret
  
  let number
  let name
  let team

  if (!element.classList.contains('dropdown-s-item-disabled')) {

    if (elementID.includes('left')) {

      dropdown = getElement(dropdown23LeftID)
      dropdownTitle = getElement(dropdown23LeftTitleID)
      border = getElement(dropdown23LeftBorderID)
      menu = getElement(dropdown23LeftMenuID)
      caret = getElement(dropdown23LeftCaretID)

      dropdownClose(dropdownID, border=border, menu=menu, caret=caret)
  
      number = element.getAttribute('number')
      name = element.textContent
      team = element.getAttribute('team')
      
      eventComparisonDriversData['Left']['Number'] = number
      eventComparisonDriversData['Left']['FullName'] = name
      eventComparisonDriversData['Left']['Team'] = team
      
      dropdownTitle.textContent = name
      dropdownTitle.setAttribute('number', number)
      
    } else if (elementID.includes('right')) {

      dropdown = getElement(dropdown23RightID)
      dropdownTitle = getElement(dropdown23RightTitleID)
      border = getElement(dropdown23RightBorderID)
      menu = getElement(dropdown23RightMenuID)
      caret = getElement(dropdown23RightCaretID)

      dropdownClose(dropdownID, border=border, menu=menu, caret=caret)
  
      number = element.getAttribute('number')
      name = element.textContent
      team = element.getAttribute('team')
      
      eventComparisonDriversData['Right']['Number'] = number
      eventComparisonDriversData['Right']['FullName'] = name
      eventComparisonDriversData['Right']['Team'] = team
  
      dropdownTitle.textContent = name
      dropdownTitle.setAttribute('number', number)
      
    }

    // fill title dropdown teams
    let leftTeam = eventComparisonDriversData['Left']['Team']
    let rightTeam = eventComparisonDriversData['Right']['Team']
    
    if (leftTeam == rightTeam) {
      getElement(dropdown24TitleID).textContent = leftTeam
    } else {
      getElement(dropdown24TitleID).textContent = 'Выберите команду'
    }
    
    let numberLeft = eventComparisonDriversData['Left']['Number']
    let numberRight = eventComparisonDriversData['Right']['Number']
  
    let summaryLeft = eventSummary.filter(o => o['Number'] == numberLeft)[0]
    let summaryRight = eventSummary.filter(o => o['Number'] == numberRight)[0]
  
    eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], leftTeam, rightTeam)
  
    let dataPaths = [d3.csv(pathEventLaptimesLeft), d3.csv(pathEventLaptimesRight)]
  
    Promise.all(dataPaths).then(function(files) {
  
      let laptimesLeft = files[0]
      let laptimesRight = files[1]
  
      let filterLaptimes = (o) => (
        (o['SprintIndex'] == glVEvent['SprintIndex'])
        && (o['SeasonID'] == glVEvent['SeasonID'])
        && (o['RaceID'] == glVEvent['RaceID'])
      )
  
      let filterLaptimesLeft = (o) => (o['Number'] == numberLeft)
      let filterLaptimesRight = (o) => (o['Number'] == numberRight)
  
      laptimesLeft = laptimesLeft.filter(o => (filterLaptimes(o) && filterLaptimesLeft(o)))
      laptimesRight = laptimesRight.filter(o => (filterLaptimes(o) && filterLaptimesRight(o)))
  
      eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)
  
      }).catch(function(err) {
      // handle error here
    })

  }

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

  eventComparisonFullNames.forEach((name, i) => {
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
  
  let classifiedPositionLeft = dataLeft['ClassifiedPositionLabel']
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
  
  let classifiedPositionRight = dataRight['ClassifiedPositionLabel']
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
  ratingDeltaValue = (isNaN(ratingDeltaValue)) ? '-': ratingDeltaValue

  let ratingDeltaColor = eventComparisonGetDeltaColor(
    ratingDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    higherWorse=true
  )

  ratingDelta.textContent = Math.abs(ratingDeltaValue)
  ratingDelta.style.color = ratingDeltaColor

  let consistencyDelta = getElement(eventComparisonDeltaConsistencyID)
  let consistencyDeltaValue = consistencyValueLeft - consistencyValueRight
  consistencyDeltaValue = (isNaN(consistencyDeltaValue)) ? '-': consistencyDeltaValue

  let consistencyDeltaColor = eventComparisonGetDeltaColor(
    consistencyDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  consistencyDelta.textContent = Math.abs(consistencyDeltaValue).toFixed(3)
  consistencyDelta.style.color = consistencyDeltaColor

  let paceDelta = getElement(eventComparisonDeltaPaceID)
  let paceDeltaValue = dataLeft['Pace'] - dataRight['Pace']
  paceDeltaValue = (isNaN(paceDeltaValue)) ? '-': paceDeltaValue

  let paceDeltaColor = eventComparisonGetDeltaColor(
    paceDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  paceDelta.textContent = Math.abs(paceDeltaValue).toFixed(3)
  paceDelta.style.color = paceDeltaColor

  let overtakesDelta = getElement(eventComparisonDeltaOvertakesID)
  let overtakesDeltaValue = overtakesValueLeft - overtakesValueRight
  overtakesDeltaValue = (isNaN(overtakesDeltaValue)) ? '-': overtakesDeltaValue

  let overtakesDeltaColor = eventComparisonGetDeltaColor(
    overtakesDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=false
  )

  overtakesDelta.textContent = Math.abs(overtakesDeltaValue)
  overtakesDelta.style.color = overtakesDeltaColor

  let startDelta = getElement(eventComparisonDeltaStartID)
  let startDeltaValue = startValueLeft - startValueRight
  startDeltaValue = (isNaN(startDeltaValue)) ? '-': startDeltaValue

  let startDeltaColor = eventComparisonGetDeltaColor(
    startDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=false
  )

  startDelta.textContent = Math.abs(startDeltaValue)
  startDelta.style.color = startDeltaColor

  let mistakesDelta = getElement(eventComparisonDeltaMistakesCountID)
  let mistakesDeltaValue = mistakesCountValueLeft - mistakesCountValueRight
  mistakesDeltaValue = (isNaN(mistakesDeltaValue)) ? '-': mistakesDeltaValue

  let mistakesDeltaColor = eventComparisonGetDeltaColor(
    mistakesDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  mistakesDelta.textContent = Math.abs(mistakesDeltaValue)
  mistakesDelta.style.color = mistakesDeltaColor

  let mistakesLossesDelta = getElement(eventComparisonDeltaMistakesLossesID)
  let mistakesLossesDeltaValue = mistakesLossesValueLeft - mistakesLossesValueRight
  mistakesLossesDeltaValue = (isNaN(mistakesLossesDeltaValue)) ? '-': mistakesLossesDeltaValue

  let mistakesLossesDeltaColor = eventComparisonGetDeltaColor(
    mistakesLossesDeltaValue,
    colorLeft, colorRight, colorThemesChartFont3,
    lowerBetter=true
  )

  mistakesLossesDelta.textContent = Math.abs(mistakesLossesDeltaValue).toFixed(3)
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

  let colorLeft = summaryLeft['Color']
  let colorRight = summaryRight['Color']

  let equalNumbers = (summaryLeft['Number'] == summaryRight['Number'])

  let plotOnlyLeft = (
    (summaryLeft['Number'] == summaryRight['Number'])
    || (summaryRight['ClassifiedPositionLabel'] == 'DSQ')
    || (summaryRight['ClassifiedPositionLabel'] == 'DNS')
    || (laptimesRight.length <= LapTimesComplited)
  )

  let plotOnlyRight = (
    (summaryLeft['ClassifiedPositionLabel'] == 'DSQ')
    || (summaryLeft['ClassifiedPositionLabel'] == 'DNS')
    || (laptimesLeft.length <= LapTimesComplited)
  )

  let notPlotBoth = (
    (
      (summaryRight['ClassifiedPositionLabel'] == 'DSQ')
      || (summaryRight['ClassifiedPositionLabel'] == 'DNS')
      || (laptimesRight.length <= LapTimesComplited)
    )
    &&
    (
      (summaryLeft['ClassifiedPositionLabel'] == 'DSQ')
      || (summaryLeft['ClassifiedPositionLabel'] == 'DNS')
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

  window.onresize = () => {

    updateUnits()
    
    eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

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

  let themeToggler = getElement(mainChangeThemeButtonID)
  
  themeToggler.onclick = () => {

    updateUnits()

    eventComparisonDescsFill()

    eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

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
    let names = eventSummary.map(o => o['FullName'])

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

  let names = eventSummary.map(o => o['FullName'])

  if (kind == 'timing') {

    let dataTiming = copyObject(eventSummary)
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

      // // adjust container with name width on first launch
      // if (glVEvent['eventCategoriesFirstLaunch']) {
      //   let container = getElement(eventCategoriesMetricsContainerID + kind)
      //   let containerWidth = getMaxWidth(name, container, names)
      //   container.style.width = `${containerWidth}px`
      // }
      
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

    let dataActions = copyObject(eventSummary)
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

      // // adjust container with name width on first launch
      // if (glVEvent['eventCategoriesFirstLaunch']) {
      //   let container = getElement(eventCategoriesMetricsContainerID + kind)
      //   let containerWidth = getMaxWidth(name, container, names)
      //   container.style.width = `${containerWidth}px`
      // }

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

  if (glVEvent['Radio21Condition'] == 'clear') {
    
    eventLaptimesDriversSorted = sortObject(eventLaptimesDriversSorted, 'PaceDiffClearRankOrder', true)
    
  } else if (glVEvent['Radio21Condition'] == 'regular') {
    
    eventLaptimesDriversSorted = sortObject(eventLaptimesDriversSorted, 'PaceDiffRankOrder', true)
    
  }

  eventPaceBestPaceNumberLeft = eventLaptimesDriversSorted[0]['Number']
  eventPaceBestPaceTeamLeft = eventLaptimesDriversSorted[0]['Team']

  return 
  
}


function eventPaceUpdateLeftVariables() {

  if (!eventPaceBestPaceNumberLeft) {
    
    eventPaceSetLeadersVariables()

    eventPaceBestPaceNumberRight = 'null'

    glVEvent['PaceDefaultDriver'] = true

  }

  let conditionSeasonLeft = (o) => ((o['Number'] == eventPaceBestPaceNumberLeft) && (o['Team'] == eventPaceBestPaceTeamLeft))
  let conditionEventLeft = (o) => (o['RaceID'] == glVEvent['RaceID'])

  eventPaceLaptimesDriversLeft = eventLaptimesDriversSorted.filter(o => o['Number'] == eventPaceBestPaceNumberLeft)

  if (eventPaceLaptimesDriversLeft.length > 0) {
    eventPaceLaptimesDriversLeft = eventPaceLaptimesDriversLeft[0]
  }

  eventPaceLaptimesCurrentSeasonLeft = eventPaceLaptimesLeft.filter(o => conditionSeasonLeft(o))
  eventPaceLaptimesCurrentEventLeft = eventPaceLaptimesCurrentSeasonLeft.filter(o => conditionEventLeft(o))

  eventPaceBestPaceNameLeft = eventPaceLaptimesCurrentEventLeft[0]['FullName']
  eventPaceBestPaceColorLeft = eventPaceLaptimesCurrentEventLeft[0]['Color']

}


function eventPaceUpdateRightVariables() {

  if (eventPaceBestPaceNumberRight != 'null') {

    let conditionSeasonRight = (o) => ((o['Number'] == eventPaceBestPaceNumberRight) && (o['Team'] == eventPaceBestPaceTeamRight))
    let conditionEventRight = (o) => (o['RaceID'] == glVEvent['RaceID'])

    eventPaceLaptimesDriversRight = eventLaptimesDriversSorted.filter(o => o['Number'] == eventPaceBestPaceNumberRight)

    if (eventPaceLaptimesDriversRight.length > 0) {
      eventPaceLaptimesDriversRight = eventPaceLaptimesDriversRight[0]
    }
    
    eventPaceLaptimesCurrentSeasonRight = eventPaceLaptimesRight.filter(o => conditionSeasonRight(o))
    eventPaceLaptimesCurrentEventRight = eventPaceLaptimesCurrentSeasonRight.filter(o => conditionEventRight(o))

    if (eventPaceLaptimesCurrentEventRight) {

      eventPaceBestPaceNameRight = eventPaceLaptimesCurrentEventRight[0]['FullName']
      eventPaceBestPaceColorRight = eventPaceLaptimesCurrentEventRight[0]['Color']

      if (eventPaceBestPaceColorLeft == eventPaceBestPaceColorRight) {
        eventPaceBestPaceColorRight = modColor2(eventPaceBestPaceColorRight)
      }
      
    } else {

      eventPaceLaptimesDriversRight = null
      eventPaceLaptimesCurrentEventRight = null
  
      eventPaceBestPaceNameRight = eventPaceBestPaceMarker
      eventPaceBestPaceColorRight = eventPaceBestPaceMarkerColor
        
    }

  } else {

    eventPaceLaptimesDriversRight = null
    eventPaceLaptimesCurrentEventRight = null

    eventPaceBestPaceNameRight = eventPaceBestPaceMarker
    eventPaceBestPaceColorRight = eventPaceBestPaceMarkerColor
    
  }

}


function eventPaceUpdateRightColor() {

  if (eventPaceBestPaceNumberRight != 'null') {

    eventPaceBestPaceColorRight = eventPaceLaptimesCurrentEventRight[0]['Color']

    if (eventPaceBestPaceColorLeft == eventPaceBestPaceColorRight) {
      eventPaceBestPaceColorRight = modColor2(eventPaceBestPaceColorRight)
    }
    
  } else {

    eventPaceBestPaceColorRight = eventPaceBestPaceMarkerColor
    
  }

}


function eventPaceUpdateChart_9() {

  if (glVEvent['Radio21Condition'] == 'clear') {
    
    chart_9(chart2ID, eventLaptimesDriversSorted, 'PaceDiffClear', '1')
    
  } else if (glVEvent['Radio21Condition'] == 'regular') {
    
    chart_9(chart2ID, eventLaptimesDriversSorted, 'PaceDiff', '1')
    
  }
  
}



function eventPaceUpdateChart_11(laptimesCurrentEventLeft, laptimesCurrentEventRight) {

  if (glVEvent['Radio21Condition'] == 'clear') {

    chart_11(
      chart3ID, 'PaceDiffClear',
      [laptimesCurrentEventLeft, laptimesCurrentEventRight],
      [eventPaceBestPaceColorLeft, eventPaceBestPaceColorRight],
      '1'
    )
    
  } else if (glVEvent['Radio21Condition'] == 'regular') {

    chart_11(
      chart3ID, 'PaceDiff',
      [laptimesCurrentEventLeft, laptimesCurrentEventRight],
      [eventPaceBestPaceColorLeft, eventPaceBestPaceColorRight],
      '1'
    )
    
  }

}


function dropdown25Fill() {

  let title = getElement(dropdown25TitleID)
  let marker = getElement(dropdown25MarkerID)

  let attributesDict = {
    'index': 'index',
    'number': eventPaceDriverNumbersList,
    'team': eventPaceDriverTeamsList, 
    'color': eventPaceDriverColorsList
  }

  marker.style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)
  title.textContent = eventPaceBestPaceNameLeft

  dropdownWOFMenuFill(
    dropdownID=dropdown25ID,
    itemsList=eventPaceDriverNamesList,
    attributesDict=attributesDict,
  )
  
}


function dropdown25MouseUp(element) {

  dropdownWOFClose(dropdown25ID)

  glVEvent['PaceDefaultDriver'] = false

  eventPaceBestPaceNumberLeft = element.getAttribute('number')
  eventPaceBestPaceTeamLeft = element.getAttribute('team')

  eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], eventPaceBestPaceTeamLeft)

  let dataPaths = [d3.csv(pathEventLaptimesLeft)]

    Promise.all(dataPaths).then(function(files) {

      eventPaceLaptimesLeft = files[0]

      eventPaceUpdateLeftVariables()
      eventPaceUpdateRightColor()

      getElement(dropdown25TitleID).textContent = eventPaceBestPaceNameLeft

      getElement(dropdown25MarkerID).style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)
      getElement(dropdown26MarkerID).style.background = paleColor(eventPaceBestPaceColorRight, 0.8)

      eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)

    }).catch(function(err) {
    // handle error here
  })

}


function dropdown26Fill() {

  let title = getElement(dropdown26TitleID)
  let marker = getElement(dropdown26MarkerID)

  let items = copyObject(eventPaceDriverNamesList)
  let numbers = copyObject(eventPaceDriverNumbersList)
  let colors = copyObject(eventPaceDriverColorsList)
  let teams = copyObject(eventPaceDriverTeamsList)
  
  items.unshift(eventPaceBestPaceMarker)
  numbers.unshift(null)
  colors.unshift(null)
  teams.unshift(null)

  let attributesDict = {
    'index': 'index',
    'number': numbers,
    'team': teams,
    'color': colors
  }

  title.textContent = eventPaceBestPaceNameRight
  marker.style.background = paleColor(eventPaceBestPaceColorRight, 0.8)

  dropdownWOFMenuFill(
    dropdownID=dropdown26ID,
    itemsList=items,
    attributesDict=attributesDict,
    widthControl=false,
    maxItems=10,
    disableList=false,
    addSeparatorAfterIdx=[0]
  )

}


function dropdown26MouseUp(element) {

  dropdownWOFClose(dropdown26ID)

  glVEvent['PaceDefaultDriver'] = false

  eventPaceBestPaceNumberRight = element.getAttribute('number')
  eventPaceBestPaceTeamRight = element.getAttribute('team')

  if ((eventPaceBestPaceNumberRight) && (eventPaceBestPaceNumberRight != 'null')) {

    eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], eventPaceBestPaceTeamLeft, eventPaceBestPaceTeamRight)

    let dataPaths = [d3.csv(pathEventLaptimesRight)]
  
      Promise.all(dataPaths).then(function(files) {
  
        eventPaceLaptimesRight = files[0]
  
        eventPaceUpdateRightVariables()
  
        getElement(dropdown26TitleID).textContent = eventPaceBestPaceNameRight
  
        getElement(dropdown25MarkerID).style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)
        getElement(dropdown26MarkerID).style.background = paleColor(eventPaceBestPaceColorRight, 0.8)
     
        eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)
  
      }).catch(function(err) {
    // handle error here
    })
    
  } else {

    eventPaceUpdateRightVariables()
  
    getElement(dropdown26TitleID).textContent = eventPaceBestPaceNameRight

    getElement(dropdown25MarkerID).style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)
    getElement(dropdown26MarkerID).style.background = paleColor(eventPaceBestPaceColorRight, 0.8)
 
    eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)

  }

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

  let data = sortObject(eventLaptimesDriversSorted, metricRank, true)

  // weather conditions

  let conditionsType = eventsEvent['Conditions']
  let weatherConditions = getElement(eventPaceConditionsID)

  let airTempElement = getElement(eventPaceAirTempID)

  weatherConditions.src = `img/weather/${iconsConditions[conditionsType]['Filename']}.svg`
  
  airTempElement.innerHTML = `${eventsEvent['AirTemp']} &deg;C`

  let dataBest = data[0]
  
  let dataWorst = data.filter(o => o[metric] != '-')
  dataWorst = lastElement(dataWorst)

  // best and worst pace
  
  let bestName = getElement(eventPaceLeaderNameID)
  let bestPaceDiff = getElement(eventPaceLeaderPaceDiffID)

  let driversBetterAvg = getElement(eventPaceDriversPaceBetterAverageID)
  let driversWorstAvg = getElement(eventPaceDriversPaceWorstAverageID)

  bestName.textContent = dataBest['FullName']
  bestName.style.color = paleColor(dataBest['Color'], 0.9)

  bestPaceDiff.textContent = Math.abs(dataBest[metric]).toFixed(3)
  bestPaceDiff.style.color = eventPaceGoodPaceColor

  getElement(eventPacePelotonePaceID).textContent = dataBest[paceMarkerLabel]
  getElement(eventPaceLeaderPaceID).textContent = dataBest[paceLabel]

  let worstName = getElement(eventPaceWorstNameID)
  let worstPaceDiff = getElement(eventPaceWorstPaceDiffID)
  
  worstName.textContent = dataWorst['FullName']
  worstName.style.color = paleColor(dataWorst['Color'], 0.9)

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

  let metric
  let radioCondition = radiotGetButtonCondition(currentButton)

  glVEvent['Radio21Condition'] = radioCondition

  eventPaceTable1Fill(type=radioCondition)
  eventPaceUpdateChart_9()

  eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)
  
}


function refresh21MouseUp(element) {

  glVEvent['PaceDefaultDriver'] = true

  let metricSort

  if (glVEvent['Radio21Condition'] == 'clear') {
    metricSort = 'RankPaceDiffClearByWorst'
  } else {
    metricSort = 'RankPaceDiffByWorst'
  }

  eventLaptimesDriversSorted = sortObject(eventLaptimesDriversSorted, metricSort, true)

  eventPaceBestPaceNumberLeft = eventLaptimesDriversSorted[0]['Number']
  eventPaceBestPaceTeamLeft = eventLaptimesDriversSorted[0]['Team']
  eventPaceBestPaceNumberRight = 'null'

  eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], eventPaceBestPaceTeamLeft)

  let dataPaths = [d3.csv(pathEventLaptimesLeft)]

    Promise.all(dataPaths).then(function(files) {

      eventPaceLaptimesLeft = files[0]

      eventPaceUpdateLeftVariables()
      eventPaceUpdateRightVariables()

      dropdown25Fill()
      dropdown26Fill()
      
      eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)

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


function eventCategoriesDescChartTimingOpen(element) {

  // eventCategoriesDescCloseAll(element)
  chartsDescCloseAll(eventCategoriesDescTablesIDs, element)

  let table = getElement(eventCategoriesTimingDescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(eventCategoriesTimingDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function eventCategoriesDescChartTimingClose(element) {

  let table = getElement(eventCategoriesTimingDescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(eventCategoriesTimingDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
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


function eventCategoriesDescChartActionsOpen(element) {

  // eventCategoriesDescCloseAll(element)
  chartsDescCloseAll(eventCategoriesDescTablesIDs, element)

  let table = getElement(eventCategoriesActionsDescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(eventCategoriesActionsDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function eventCategoriesDescChartActionsClose(element) {

  let table = getElement(eventCategoriesActionsDescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(eventCategoriesActionsDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
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

function eventComparisonRadarOpen(element) {

  descCloseAllExcept(element, eventComparisonDescTablesIDs)

  let table = getElement(eventComparisonRadarDescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(eventComparisonRadarDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function eventComparisonRadarClose(element) {

  let table = getElement(eventComparisonRadarDescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(eventComparisonRadarDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function eventComparisonLaptimesDescFill() {

  // laptimes
  getElement(eventComparisonLaptimesDescContentID).innerHTML = chartDescBodyChartEventLaptimes

  let img1 = getElement(eventComparisonLaptimesDescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/svg-laptimes-plot-laptimes-left.svg`

  let img2 = getElement(eventComparisonDifferencesDescImg1ID)
  img2.src = `img/chart-descriptions/${themeCurrent}/svg-laptimes-difference-plot-laptimes-difference.svg`
    
}


function eventComparisonLaptimesOpen(element) {

  chartsDescCloseAll(eventComparisonDescTablesIDs, element)

  let table = getElement(eventComparisonLaptimesDescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(eventComparisonLaptimesDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function eventComparisonLaptimesClose(element) {

  let table = getElement(eventComparisonLaptimesDescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(eventComparisonLaptimesDescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
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


function eventPaceChart9Open(element) {

  chartsDescCloseAll(eventPaceDescTablesIDs, element)

  let table = getElement(eventPaceChart9DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(eventPaceChart9DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function eventPaceChart9Close(element) {

  let table = getElement(eventPaceChart9DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(eventPaceChart9DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function eventPaceChart11DescFill() {

  getElement(eventPaceChart11DescContentID).innerHTML = chartDescBodyChart11

  let img1 = getElement(eventPaceChart11DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-11-1.svg`
    
}


function eventPaceChart11Open(element) {

  chartsDescCloseAll(eventPaceDescTablesIDs, element)

  let table = getElement(eventPaceChart11DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(eventPaceChart11DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function eventPaceChart11Close(element) {

  let table = getElement(eventPaceChart11DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(eventPaceChart11DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function eventPaceDescFill() {

  eventPaceChart9DescFill()
  eventPaceChart11DescFill()
  
}










































function eventFirstLoad() {

  // glVGlobal['FirstLoad'] = false

  scrollPosition = 0

  // // clear globals
  // glVEvent = {
  //   // 'ActualSeasonID': null,
  //   // 'ActualEventRaceID': null,
  //   'SeasonID': null,
  //   'RaceID': null,
  //   'EventNameRus': null,
  //   // 'EventLabel': null,
  //   // 'Page': null,
  //   'EventID': null,
  //   'WrongEvent': false,
  //   'WrongEventNameRus': null,
  //   'NotAvailableEvent': false,
  //   'NotAvailableEventNameRus': null,
  //   'ComparisonReset': true,
  //   'PaceReset': true
  // }

  // clear globals
  glVEvent['SeasonID'] = null
  glVEvent['RaceID'] = null
  glVEvent['EventNameRus'] = null
  glVEvent['EventID'] = null

  glVEvent['WrongEvent'] = false
  glVEvent['WrongEventNameRus'] = null
  glVEvent['NotAvailableEvent'] = false
  glVEvent['NotAvailableEventNameRus'] = null

  glVEvent['ComparisonReset'] = true
  glVEvent['PaceReset'] = true

  glVEvent['PaceTeams'] = []
  glVEvent['PaceLoadRightLaptimesData'] = false
  
  // last data available
  eventsEvent = copyObject(events)
  eventsEvent = eventsEvent.filter(o => o['DataAvailable'] == 1)
  eventsEvent = eventsEvent.slice(-1)[0]

  glVEvent['SeasonID'] = eventsEvent['SeasonID']
  glVEvent['RaceID'] = eventsEvent['RaceID']
  glVEvent['EventID'] = eventsEvent['EventID']

  glVEvent['SprintIndex'] ||= 2

  eventsEventsCurrentSeason = copyObject(events)
  eventsEventsCurrentSeason = eventsEventsCurrentSeason.filter(o => o['SeasonID'] == glVEvent['SeasonID'])

  glVEvent['Radio21Condition'] = 'clear'

  eventPaceBestPaceNumberLeft = null
  eventPaceBestPaceNumberRight = null
  eventPaceBestPaceNameLeft = null
  eventPaceBestPaceNameRight = null
  eventPaceBestPaceColorLeft = null
  eventPaceBestPaceColorRight = null

  menuYearsFill(menuYears21ID, menuYears21ItemID, seasonIDs)
  eventMenuEventsFill(menuEvents21ID, menuEvents21ItemID, eventsEventsCurrentSeason)

}


function updateEventRatingPage(kind) {

  updateUnits()

  if (kind == 'first') { eventFirstLoad() }

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventResultsPageID

  eventUpdateGlobalsByRaceID()
  eventUpdatePaths(glVEvent['RaceID'])

  let dataPaths = [d3.csv(pathSummaryActual), d3.csv(pathProtocolActual)]

  Promise.all(dataPaths).then(function(files) {

    eventSummary = files[0]
    eventProtocol = files[1]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventRating

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerEventsRatingID).classList.add('smooth-appear-fast')
    // }

    eventEventInformationUpdate()
    eventChartRatingUpdate()

    if (glVEvent['WrongEvent'] == true) {
      wrongEventMessage(glVEvent['SeasonID'], glVEvent['WrongEventNameRus'])
      glVEvent['WrongEvent'] = false
    }

    if (glVEvent['NotAvailableEvent'] == true) {
      notAvailableEventMessage(glVEvent['SeasonID'], glVEvent['NotAvailableEventNameRus'])
      glVEvent['NotAvailableEvent'] = false
    }

    glVGlobal['FirstLoad'] = false

    menuYearsSelection(menuYears21ID, glVEvent['SeasonID'])
    eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

    // pageContainerSetScroll()
    pageContainerSetScroll(scrollPosition)

    globalMenuPagesHide()
    eventAppearElements(glVGlobal['Page'])
    appearElement(eventMainContainerID)
    
    }).catch(function(err) {
    // handle error here
  })
  
}


function updateEventCategoriesPage(kind) {

  updateUnits()

  if (kind == 'first') { eventFirstLoad() }

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventCategoriesPageID

  // eventUpdateGlobals(glVEvent['RaceID'])
  eventUpdateGlobalsByRaceID()
  eventUpdatePaths(glVEvent['RaceID'])

  eventCategoriesActionsClickedNumber = null

  let dataPaths = [d3.csv(pathSummaryActual)]

  Promise.all(dataPaths).then(function(files) {

    eventSummary = files[0]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventCategories

    if (glVGlobal['FirstLoad'] == false) {
      getElement(containerEventsCategoriesID).classList.add('smooth-appear-fast')
    }

    eventCategoriesDescsFill()

    eventsCategoriesTimingActionsFill(kind='timing')
    eventsCategoriesTimingActionsFill(kind='actions')
    
    updateChartTimingActions(eventSummary)

    if (glVEvent['WrongEvent'] == true) {
      wrongEventMessage(glVEvent['SeasonID'], glVEvent['WrongEventNameRus'])
      glVEvent['WrongEvent'] = false
    }

    if (glVEvent['NotAvailableEvent'] == true) {
      notAvailableEventMessage(glVEvent['SeasonID'], glVEvent['NotAvailableEventNameRus'])
      glVEvent['NotAvailableEvent'] = false
    }

    glVGlobal['FirstLoad'] = false
    // glVEvent['eventCategoriesFirstLaunch'] = false

    menuYearsSelection(menuYears21ID, glVEvent['SeasonID'])
    eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])
    
    // pageContainerScrollTop()
    pageContainerSetScroll(scrollPosition)

    globalMenuPagesHide()
    eventAppearElements(glVGlobal['Page'])
    appearElement(eventMainContainerID)

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateEventComparisonPage(kind) {

  updateUnits()

  if (kind == 'first') { eventFirstLoad() }

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventComparisonPageID

  // eventUpdateGlobals(glVEvent['RaceID'])
  eventUpdateGlobalsByRaceID()
  eventUpdatePaths(glVEvent['RaceID'])

  let dataPaths = [d3.csv(pathSummaryActual)]

  Promise.all(dataPaths).then(function(files) {

    eventSummary = files[0]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventComparison

    eventComparisonDescsFill()

    let summaryLeft
    let summaryRight

    if (glVEvent['ComparisonReset']) {

      glVEvent['ComparisonReset'] = false

      summaryLeft = eventSummary[0]
      summaryRight = eventSummary[1]

      eventComparisonDriversData['Left']['Number'] = summaryLeft['Number']
      eventComparisonDriversData['Right']['Number'] = summaryRight['Number']
    
      eventComparisonDriversData['Left']['FullName'] = summaryLeft['FullName']
      eventComparisonDriversData['Right']['FullName'] = summaryRight['FullName']
    
      eventComparisonDriversData['Left']['Team'] = summaryLeft['Team']
      eventComparisonDriversData['Right']['Team'] = summaryRight['Team']
      
    } else {

      summaryLeft = eventSummary.filter(o => o['Number'] == eventComparisonDriversData['Left']['Number'])[0]
      summaryRight = eventSummary.filter(o => o['Number'] == eventComparisonDriversData['Right']['Number'])[0]
      
    }

    eventComparisonNumbers = eventSummary.map(o => o['Number'])
    eventComparisonFullNames = eventSummary.map(o => o['FullName'])

    eventComparisonTeams = eventSummary.map(o => o['Team'])
    eventComparisonTeams = dropDuplicates(eventComparisonTeams)
    eventComparisonTeams = sortArrayString(eventComparisonTeams)

    dropdown24Fill()

    dropdown23Fill(dropdown23LeftID, eventComparisonDriversData['Left']['FullName'])
    dropdown23Fill(dropdown23RightID, eventComparisonDriversData['Right']['FullName'])

    let teamLeft = summaryLeft['Team']
    let teamRight = summaryRight['Team']

    let driverIDLeft = summaryLeft['DriverID']
    let driverIDRight = summaryRight['DriverID']

    eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], teamLeft, teamRight)

    let dataPaths2 = [d3.csv(pathEventLaptimesLeft), d3.csv(pathEventLaptimesRight)]

    Promise.all(dataPaths2).then(function(files) {

      let laptimesLeft = files[0]
      let laptimesRight = files[1]

      let filterLaptimes = (o) => (
        (o['SprintIndex'] == glVEvent['SprintIndex'])
        && (o['SeasonID'] == glVEvent['SeasonID'])
        && (o['RaceID'] == glVEvent['RaceID'])
      )

      let filterLaptimesLeft = (o) => (o['DriverID'] == driverIDLeft)
      let filterLaptimesRight = (o) => (o['DriverID'] == driverIDRight)

      laptimesLeft = laptimesLeft.filter(o => (filterLaptimes(o) && filterLaptimesLeft(o)))
      laptimesRight = laptimesRight.filter(o => (filterLaptimes(o) && filterLaptimesRight(o)))

      eventsComparisonSetMetricsNameWidth()
      
      eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)

      let themeToggler = getElement(mainChangeThemeButtonID)

      // update charts colors by clicking on theme toggler
      themeToggler.onclick = () => {

        eventComparisonDescsFill()

        eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)
        
      }
  
      if (glVEvent['WrongEvent'] == true) {
        wrongEventMessage(glVEvent['SeasonID'], glVEvent['WrongEventNameRus'])
        glVEvent['WrongEvent'] = false
      }
  
      if (glVEvent['NotAvailableEvent'] == true) {
        notAvailableEventMessage(glVEvent['SeasonID'], glVEvent['NotAvailableEventNameRus'])
        glVEvent['NotAvailableEvent'] = false
      }
  
      glVGlobal['FirstLoad'] = false
  
      menuYearsSelection(menuYears21ID, glVEvent['SeasonID'])
      eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

      // pageContainerScrollTop()
      pageContainerSetScroll(scrollPosition)
  
      globalMenuPagesHide()
      eventAppearElements(glVGlobal['Page'])
      appearElement(eventMainContainerID)

      }).catch(function(err) {
      // handle error here
    })

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateEventPacePage(kind) {

  updateUnits()

  if (kind == 'first') { eventFirstLoad() }

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventPacePageID

  eventUpdateGlobalsByRaceID()
  eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'])

  let dataPaths = [d3.csv(pathLaptimesDriversActual)]

  // if (glVEvent['PaceLoadSecondaryLaptimesData']) {
  //   dataPaths = [d3.csv(pathLaptimesDriversActual), d3.csv(pathEventLaptimesActual1)]
  // } else {
  //   dataPaths = [d3.csv(pathLaptimesDriversActual), d3.csv(pathEventLaptimesActual1), d3.csv(pathEventLaptimesActual2)]
  // }

  Promise.all(dataPaths).then(function(files) {

    eventLaptimesDrivers = files[0]
    // eventLaptimes = files[1]
    // eventLaptimesDrivers = files[2]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventPace

    eventPaceDescFill()

    if (glVEvent['PaceReset']) {

      glVEvent['PaceReset'] = false

      eventPaceBestPaceNumberLeft = null
      eventPaceBestPaceNumberRight = null
      
      eventPaceBestPaceNameLeft = null
      eventPaceBestPaceNameRight = null
      
      eventPaceBestPaceColorLeft = null
      eventPaceBestPaceColorRight = null

      eventPaceBestPaceTeamLeft = null
      eventPaceBestPaceTeamRight = null
      
    }

    let metricSort

    if (glVEvent['Radio21Condition'] == 'clear') {
      metricSort = 'PaceDiffClearRankOrder'
    } else {
      metricSort = 'PaceDiffRankOrder'
    }

    eventLaptimesDriversSorted = copyObject(eventLaptimesDrivers)

    let filterDrivers = (o) => (
      (o['SprintIndex'] == glVEvent['SprintIndex'])
      && (o['SeasonID'] == glVEvent['SeasonID'])
      && (o['RaceID'] == glVEvent['RaceID'])
    )

    eventLaptimesDriversSorted = eventLaptimesDriversSorted.filter(o => filterDrivers(o))
    eventLaptimesDriversSorted = sortObjectString(eventLaptimesDriversSorted, 'FullName')

    eventPaceDriverNamesList = eventLaptimesDriversSorted.map(o => o['FullName'])
    eventPaceDriverNumbersList = eventLaptimesDriversSorted.map(o => o['Number'])
    eventPaceDriverTeamsList = eventLaptimesDriversSorted.map(o => o['Team'])
    eventPaceDriverColorsList = eventLaptimesDriversSorted.map(o => o['Color'])

    eventLaptimesDriversSorted = sortObject(eventLaptimesDriversSorted, metricSort, true)

    eventPaceBestPaceNumberLeft ||= eventLaptimesDriversSorted[0]['Number']
    eventPaceBestPaceNumberRight ||= 'null'

    eventPaceBestPaceTeamLeft ||= eventLaptimesDriversSorted[0]['Team']
    eventPaceBestPaceTeamRight ||= 'null'

    glVEvent['SprintIndex'] = (eventLaptimesDriversSorted.length > 0) ? eventLaptimesDriversSorted[0]['SprintIndex'] : null
    glVEvent['SeasonID'] = (eventLaptimesDriversSorted.length > 0) ? eventLaptimesDriversSorted[0]['SeasonID'] : null

    eventUpdatePaths(glVEvent['RaceID'], glVEvent['SprintIndex'], glVEvent['SeasonID'], eventPaceBestPaceTeamLeft)

    let dataPaths2

    if (glVEvent['PaceLoadRightLaptimesData']) {
      dataPaths2 = [d3.csv(pathEventLaptimesLeft), d3.csv(pathEventLaptimesRight)]
    } else {
      dataPaths2 = [d3.csv(pathEventLaptimesLeft)]
    }

    Promise.all(dataPaths2).then(function(files2) {

      eventPaceLaptimesLeft = files2[0]

      if (glVEvent['PaceLoadSecondaryLaptimesData']) {
        eventPaceLaptimesRight = files2[1]
      }

      eventPaceUpdateLeftVariables()
      eventPaceUpdateRightVariables()

      dropdown25Fill()
      dropdown26Fill()

      radioActivateByCondition(radio21ID, glVEvent['Radio21Condition'])
  
      eventPaceTable1Fill(glVEvent['Radio21Condition'])

      eventPaceUpdateChart_9()
      eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)
  
      let themeToggler = getElement(mainChangeThemeButtonID)
  
      // update charts colors by clicking on theme toggler
      themeToggler.onclick = () => {

        eventPaceDescFill()
        
        eventPaceUpdateChart_9()
        eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)
        
      }
  
      window.onresize = () => {
  
        updateUnits()
  
        eventPaceUpdateChart_9()
        eventPaceUpdateChart_11(eventPaceLaptimesCurrentEventLeft, eventPaceLaptimesCurrentEventRight)
        
      }
  
      if (glVEvent['WrongEvent'] == true) {
        wrongEventMessage(glVEvent['SeasonID'], glVEvent['WrongEventNameRus'])
        glVEvent['WrongEvent'] = false
      }
  
      if (glVEvent['NotAvailableEvent'] == true) {
        notAvailableEventMessage(glVEvent['SeasonID'], glVEvent['NotAvailableEventNameRus'])
        glVEvent['NotAvailableEvent'] = false
      }
  
      menuYearsSelection(menuYears21ID, glVEvent['SeasonID'])
      eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])
  
      // glVGlobal['FirstLoad'] = false
  
      // pageContainerScrollTop()
      pageContainerSetScroll(scrollPosition)
      
      globalMenuPagesHide()
      eventAppearElements(glVGlobal['Page'])
      appearElement(eventMainContainerID)

      }).catch(function(err) {
      // handle error here
    })

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateEventPages(pageID, kind) {

  

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










