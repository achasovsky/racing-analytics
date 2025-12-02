function eventAppearElements(page) {

  if (page == eventRatingPageID) {
    
    appearElement(containerEventsRatingID)
    
  } else if (page == eventCategoriesPageID) {
    
    appearElement(containerEventsCategoriesID)
    
  } else if (page == eventComparisonPageID) {
    
    appearElement(containerEventsComparisonID)
    
  } else if (page == eventPacePageID) {
    
    appearElement(containerEventsPaceID)
    
  }

}


function eventUpdatePaths(raceID) {

  pathSummaryActual = pathSummary + raceID + '.csv'
  pathLaptimesRaceActual = pathLaptimes + raceID + '.csv'
  pathProtocolActual = pathProtocols + raceID + '.csv'

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
    values.splice(1, 1); 

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
  plotMetrics(eventSummary, 'plot-metrics', animation=false)

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
      plotMetrics(eventSummary, 'plot-metrics', animation=false) 
    }

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

  // draw timing
  plotTiming(summary, 'plot-timing', '2', '3')

  // draw actions
  plotActions(summary, 'plot-actions', '4', '5')

  // draw timing partners
  chartBars_1(summary, 'plot-bars-2', 'Pace', '2')
  chartBars_1(summary, 'plot-bars-3', 'Consistency', '3')

  // draw actions partners
  chartBars_1(summary, 'plot-bars-4', 'Start', '4')
  chartBars_1(summary, 'plot-bars-5', 'Overtakes', '5')

  window.onresize = () => {

    updateUnits()

    eventMenuEventsSelection(menuEvents21ID, glVEvent['RaceID'])

    if (getElement('plot-timing')) {

      // draw timing
      plotTiming(summary, 'plot-timing', '2', '3')
      
    }

    if (getElement('plot-actions')) {

      // draw actions
      plotActions(summary, 'plot-actions', '4', '5')
      
    }

    if (getElement('plot-bars-2')) {

      // draw timing partners
      chartBars_1(summary, 'plot-bars-2', 'Pace', '2')
      
    }
    
    if (getElement('plot-bars-3')) {

      // draw timing partners
      chartBars_1(summary, 'plot-bars-3', 'Consistency', '3')
      
    }
    
    if (getElement('plot-bars-4')) {

      // draw actions partners
      chartBars_1(summary, 'plot-bars-4', 'Start', '4')
      
    }

    if (getElement('plot-bars-5')) {

      // draw actions partners
      chartBars_1(summary, 'plot-bars-5', 'Overtakes', '5')
      
    }
    
  }
 
}


function dropdown24Fill() {

  // fill menu
  dropdownMenuAddItems(dropdown24MenuID, eventComparisonTeams, dropdown24MenuItemID)

  // attributes
  dropdownItemsSetAttributes(
    dropdown24MenuID, {
      'index': 'index'
    })

  let itemsList = copyObject(eventComparisonTeams)
  itemsList.push('Выберите команду')

  let maximumWidth = getDropdownMaximumwidth(
    dropdown24ContainerID, dropdown24TitleID, dropdown24MenuID, itemsList)

  // // if icons not loaded yet (on hard reset) => we need to correct dropdown width by 2 widths of navigation icons
  // // or preload them in HTML file as regular SVGs, and will recieve WarningMessage in console 
  let dropdownNavIconsNotLoaded = !getElement(iconBackward24ID).children[0].complete
  if (dropdownNavIconsNotLoaded) { maximumWidth = maximumWidth + dropdownNavigationIconsTwoWidths }

  let leftTeam = eventComparisonDriversData['Left']['Team']
  let rightTeam = eventComparisonDriversData['Right']['Team']
    
  // fill title
  if (leftTeam == rightTeam) {
    getElement(dropdown24TitleID).textContent = leftTeam
  } else {
    getElement(dropdown24TitleID).textContent = 'Выберите команду'
  }

  // update widths
  setDropdownWidth(dropdown24ContainerID, dropdown24MenuID, maximumWidth, setMenuWidth=false)
  // updateDropdownWidth(dropdown24ID, dropdown24MenuID)

}


function dropdown24MakeActive() {

  dropdownNoBorderMakeActive(
    dropdown24MenuID, dropdown24CaretID,
    [getElement(dropdown24ID)],
    [document, getElement(dropdown23LeftID), getElement(dropdown23RightID)])

}


function dropdown24MouseUp(element) {

  // chosen team
  let team = element.textContent

  // dropdown title
  getElement(dropdown24TitleID).textContent = team

  // lists
  let data = eventSummary.filter(d => d['Team'] == team)

  let numberLeft
  let numberRight

  let nameLeft
  let nameRight

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

  // dropdowns with drivers
  // dropdown23Fill(dropdown23LeftMenuID, nameLeft)
  // dropdown23Fill(dropdown23RightMenuID, nameRight)

  // update title of dropdowns with drive names
  getElement(dropdown23LeftTitleID).textContent = nameLeft
  getElement(dropdown23RightTitleID).textContent = nameRight

  // update widths
  // setDropdownWidth(dropdown24ID, dropdown24MenuID, maximumWidth)
  // updateDropdownWidth(dropdown24ID, dropdown24MenuID)

  // charts
  let summaryLeft = eventSummary.filter(o => o['Number'] == numberLeft)[0]
  let summaryRight = eventSummary.filter(o => o['Number'] == numberRight)[0]

  let laptimesLeft = eventLaptimes.filter(o => o['Number'] == numberLeft)
  let laptimesRight = eventLaptimes.filter(o => o['Number'] == numberRight)

  eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)
  
}


function iconBackward24MouseUp(elementID) {

  let currentTeam = getElement(dropdown24TitleID).textContent

  if (currentTeam == 'Выберите команду') {
    
    let firstTeam = firstElement(eventComparisonTeams)
    
    Array.from(getElement(dropdown24MenuID).children).forEach((item, i) => {
      if (item.textContent == firstTeam) {
        currentTeam = firstTeam
      }
    })
    
  }

  let previousItem = iconBackwardNextItem(dropdown24MenuID, eventComparisonTeams, currentTeam)

  dropdown24MouseUp(previousItem, previousItem.id)
  
}


function iconForward24MouseUp(elementID) {

  let currentTeam = getElement(dropdown24TitleID).textContent

  if (currentTeam == 'Выберите команду') {
    
    let lastTeam = lastElement(eventComparisonTeams)
    
    Array.from(getElement(dropdown24MenuID).children).forEach((item, i) => {
      if (item.textContent == lastTeam) {
        currentTeam = lastTeam
      }
    })
    
  }
  
  let nextItem = iconForwardNextItem(dropdown24MenuID, eventComparisonTeams, currentTeam)

  dropdown24MouseUp(nextItem, nextItem.id)
  
}


function dropdown23Fill(dropdownMenuID, driverName) {

  let dropdownMenuItemID = dropdownMenuID + '-item-'

  // fill menu
  dropdownMenuAddItems(dropdownMenuID, eventComparisonFullNames, dropdownMenuItemID)

  let numbers = eventSummary.map(o => o['Number'])
  let teams = eventSummary.map(o => o['Team'])

  dropdownItemsSetAttributes(
    dropdownMenuID, {
      'index': 'index',
      'number': numbers,
      'team': teams
    })

  let dropdownID
  let dropdownTitleID
  let dropdownTitle

  if (dropdownMenuID.includes('left')) {

    dropdownTitleID = dropdown23LeftTitleID
    
    dropdownID = dropdown23LeftID
    dropdownTitle = getElement(dropdownTitleID)

    dropdownContainerID = dropdown23LeftContainerID

    dropdownTitle.setAttribute('number', eventComparisonDriversData['Left']['Number'])
    
  } else if (dropdownMenuID.includes('right')) {

    dropdownTitleID = dropdown23RightTitleID
    
    dropdownID = dropdown23RightID
    dropdownTitle = getElement(dropdownTitleID)

    dropdownContainerID = dropdown23RightContainerID

    dropdownTitle.setAttribute('number', eventComparisonDriversData['Right']['Number'])
    
  }

  let maximumWidth = getDropdownMaximumwidth(
    dropdownContainerID, dropdownTitleID, dropdownMenuID, eventComparisonFullNames)

  // if icons not loaded yet (on hard reset) => we need to correct dropdown width by 2 widths of navigation icons
  // or preload them in HTML file as regular SVGs, and will recieve WarningMessage in console 
  let dropdownNavIconsNotLoaded = !getElement(eventComparisonIcon23RightBackwardID).children[0].complete
  if (dropdownNavIconsNotLoaded) { maximumWidth = maximumWidth + dropdownNavigationIconsTwoWidths }

  dropdownTitle.textContent = driverName
  
  // update widths
  setDropdownWidth(dropdownContainerID, dropdownMenuID, maximumWidth, setMenuWidth=false)
  // updateDropdownWidth(dropdownID, dropdownMenuID)

}


function dropdown23MakeActive() {

  dropdownNoBorderMakeActive(
      dropdown23LeftMenuID, dropdown23LeftCaretID,
      [getElement(dropdown23LeftID)],
      [document, getElement(dropdown23RightID), getElement(dropdown24ID)])

  dropdownNoBorderMakeActive(
      dropdown23RightMenuID, dropdown23RightCaretID,
      [getElement(dropdown23RightID)],
      [document, getElement(dropdown23LeftID), getElement(dropdown24ID)])
   
}


function dropdown23MouseUp(element) {

  let dropdownTitle
  let name

  let elementID = element.id

  if (elementID.includes('left')) {
    
    dropdownTitle = getElement(dropdown23LeftTitleID)

    number = element.getAttribute('number')
    name = element.textContent
    team = element.getAttribute('team')
    
    eventComparisonDriversData['Left']['Number'] = number
    eventComparisonDriversData['Left']['FullName'] = name
    eventComparisonDriversData['Left']['Team'] = team
    
    dropdownTitle.textContent = name
    dropdownTitle.setAttribute('number', number)

    // update widths
    // updateDropdownWidth(dropdown23LeftID, dropdown23LeftMenuID)
    
  } else if (elementID.includes('right')) {
    
    dropdownTitle = getElement(dropdown23RightTitleID)

    number = element.getAttribute('number')
    name = element.textContent
    team = element.getAttribute('team')
    
    eventComparisonDriversData['Right']['Number'] = number
    eventComparisonDriversData['Right']['FullName'] = name
    eventComparisonDriversData['Right']['Team'] = team

    dropdownTitle.textContent = name
    dropdownTitle.setAttribute('number', number)

    // update widths
    // updateDropdownWidth(dropdown23RightID, dropdown23RightMenuID)
    
  }

  // dropdown24Fill()
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

  let laptimesLeft = eventLaptimes.filter(o => o['Number'] == numberLeft)
  let laptimesRight = eventLaptimes.filter(o => o['Number'] == numberRight)
  
  eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)

}


function iconForward23MouseUp(elementID) {

  let currentItem
  let nextItem

  if (elementID.includes('left')) {

    currentItem = getElement(dropdown23LeftTitleID).getAttribute('number')
    nextItem = iconForwardNextItem(dropdown23LeftMenuID, eventComparisonNumbers, currentItem)
    
  } else if (elementID.includes('right')) {

    currentItem = getElement(dropdown23RightTitleID).getAttribute('number')
    nextItem = iconForwardNextItem(dropdown23RightMenuID, eventComparisonNumbers, currentItem)

  }

  dropdown23MouseUp(nextItem, nextItem.id)
  
}


function iconBackward23MouseUp(elementID) {

  let currentItem
  let previousItem
    
  if (elementID.includes('left')) {

    currentItem = getElement(dropdown23LeftTitleID).getAttribute('number')
    previousItem = iconBackwardNextItem(dropdown23LeftMenuID, eventComparisonNumbers, currentItem)

  } else if (elementID.includes('right')) {

    currentItem = getElement(dropdown23RightTitleID).getAttribute('number')
    previousItem = iconBackwardNextItem(dropdown23RightMenuID, eventComparisonNumbers, currentItem)
    
  }

  dropdown23MouseUp(previousItem, previousItem.id)
  
}


function eventComparisonImageUpdate(driverIDT, containerID) {

  let imgContainer = getElement(containerID)
  let imgPath = pathImgDrivers + glVEvent['SeasonID'] + '/' + driverIDT + imagesFormat

  imgContainer.children[0].src = imgPath
  
}


// function updateEventsDriverRanks(data, color, containerID) {

//   let name = data['FullName']
//   let idt = data['DriverIDT']

//   let imageContainerID = getElement(containerID).children[0].id
//   eventComparisonImageUpdate(idt, imageContainerID)

//   let nameElement = getElement(containerID).children[1]
//   let nameText = nameElement.children[0].children[0]
//   let namePosition = nameElement.children[0].children[1]

//   nameText.textContent = name
//   nameText.style.color = color

//   let classifiedPosition = data['ClassifiedPositionLabel']
//   let positionDisplay = (noDefinedMetrics.includes(classifiedPosition)) ? `${classifiedPosition}` : `P${classifiedPosition}`

//   namePosition.textContent = positionDisplay

//   let metricElement = getElement(containerID).children[2]
//   metricElement.textContent = `Рейтинг: ${data['RankPoints']}`

//   let consistencyElement = getElement(containerID).children[3]
//   consistencyElement.textContent = `Плотность: ${data['Consistency']}`

//   let paceElement = getElement(containerID).children[4]
//   paceElement.textContent = `Темп: ${data['PaceSec']}`

//   let overtakesElement = getElement(containerID).children[5]
//   overtakesElement.textContent = `Борьба на трассе: ${data['Overtakes']}`

//   let startElement = getElement(containerID).children[6]
//   startElement.textContent = `Действия на старте: ${data['Start']}`

// }


function updateEventsDriverMetrics(data, color, kind) {

  let name = data['FullName']
  let idt = data['DriverIDT']
  let classifiedPosition = data['ClassifiedPositionLabel']
  let classifiedPositionValue = (noDefinedMetrics.includes(classifiedPosition)) ? `${classifiedPosition}` : `P${classifiedPosition}`

  let imageID = raceResultsMetricsImageID + kind
  eventComparisonImageUpdate(idt, imageID)

  let nameEl = getElement(raceResultsMetricsNameID + kind)
  nameEl.textContent = name
  nameEl.style.color = color

  let position = getElement(raceResultsMetricsPositionID + kind)
  position.textContent = classifiedPositionValue

  let number = getElement(raceResultsMetricsNumberTeamID + kind + '-number')
  number.textContent = `#${data['Number']}`

  let team = getElement(raceResultsMetricsNumberTeamID + kind + '-team')
  team.textContent = `${data['Team']}`

  let rating = getElement(raceResultsMetricsRatingID + kind)
  rating.textContent = `Рейтинг: ${data['RankPoints']}`

  let consistency = getElement(raceResultsMetricsConsistencyID + kind)
  consistency.textContent = `${data['Consistency']}`

  let pace = getElement(raceResultsMetricsPaceID + kind)
  pace.textContent = `${data['PaceSec']}`

  let overtakes = getElement(raceResultsMetricsOvertakesID + kind)

  let overtakesTextContent = (data['Overtakes'] == '-') ? '-' : Math.abs(data['Overtakes'])
  overtakes.textContent = `${overtakesTextContent}`

  let overtakesSign = getElement(raceResultsMetricsOvertakesID + kind + '-sign')

  if (data['Overtakes'] < 0) {
    overtakesSign.textContent = '-'
  } else if (data['Overtakes'] > 0) {
    overtakesSign.textContent = '+'
  } else {
    overtakesSign.textContent = ''
  }
  
  let start = getElement(raceResultsMetricsStartID + kind)

  let startTextContent = (data['Start'] == '-') ? '-' : Math.abs(data['Start'])
  start.textContent = `${startTextContent}`

  let startSign = getElement(raceResultsMetricsStartID + kind + '-sign')

  if (data['Start'] < 0) {
    startSign.textContent = '-'
  } else if (data['Start'] > 0) {
    startSign.textContent = '+'
  } else {
    startSign.textContent = ''
  }

  let mistakesCount = getElement(raceResultsMetricsMistakesCountID + kind)
  mistakesCount.textContent = `${data['MistakesCount']}`

  let mistakesLosses = getElement(raceResultsMetricsMistakesLossesID + kind)
  mistakesLosses.textContent = `${data['MistakesLosses']}`

}


function resetCheckCollection(checkID) {

  let collection = getElement(checkID)
  let elements = arrayFromElementChildren(collection)

  elements.forEach((element, i) => {

    let checkIcon = element.children[0].children[0]
    checkIcon.classList.remove('op-100')
      
  })
  
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
  
  updateEventsDriverMetrics(summaryLeft, colorLeft, 'left')
  updateEventsDriverMetrics(summaryRight, colorRight, 'right')

  resetCheckCollection(check231ID)

  if (!notPlotBoth) {

    if (plotOnlyLeft) {

      visibleElement(plotLaptimesContainerID)
      
      plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesLeft, adjustCheckbox=true)
      
      getElement(plotLaptimesRightID).innerHTML = ''
      getElement(plotLaptimesDifferenceID).innerHTML = ''

      invisibleElement(plotLaptimesDifferenceContainerID)
      
    } else if (plotOnlyRight) {

      visibleElement(plotLaptimesContainerID)
      
      plotLaptimes(plotLaptimesLeftID, laptimesRight, colorRight, 'left', laptimesRight, adjustCheckbox=true)
      
      getElement(plotLaptimesRightID).innerHTML = ''
      getElement(plotLaptimesDifferenceID).innerHTML = ''

      invisibleElement(plotLaptimesDifferenceContainerID)
      
    } else {

      visibleElement(plotLaptimesContainerID)
      
      plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesRight, adjustCheckbox=true)
      plotLaptimes(plotLaptimesRightID, laptimesRight, colorRight, 'right', laptimesLeft)
      
      visibleElement(plotLaptimesDifferenceContainerID)

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

    invisibleElement(plotLaptimesDifferenceContainerID)
    invisibleElement(plotLaptimesContainerID)
    
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

          visibleElement(plotLaptimesContainerID)
          plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesLeft, adjustCheckbox=true)
          
          getElement(plotLaptimesRightID).innerHTML = ''
          getElement(plotLaptimesDifferenceID).innerHTML = ''

          invisibleElement(plotLaptimesDifferenceContainerID)
          
        } else if (plotOnlyRight) {

          visibleElement(plotLaptimesContainerID)
          plotLaptimes(plotLaptimesLeftID, laptimesRight, colorRight, 'left', laptimesRight, adjustCheckbox=true)
          
          getElement(plotLaptimesRightID).innerHTML = ''
          getElement(plotLaptimesDifferenceID).innerHTML = ''

          invisibleElement(plotLaptimesDifferenceContainerID)
          
        } else {

          visibleElement(plotLaptimesContainerID)
          plotLaptimes(plotLaptimesLeftID, laptimesLeft, colorLeft, 'left', laptimesRight, adjustCheckbox=true)
          plotLaptimes(plotLaptimesRightID, laptimesRight, colorRight, 'right', laptimesLeft)

          visibleElement(plotLaptimesDifferenceContainerID)

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
    
        invisibleElement(plotLaptimesDifferenceContainerID)
        invisibleElement(plotLaptimesContainerID)
            
      }
      
    }

  }
  
}


function eventsCategoriesTimingActionsFill(kind) {

  let name = getElement(eventCategoriesMetricsNameID + kind)
  let number = getElement(eventCategoriesMetricsNumberID + kind)
  let team = getElement(eventCategoriesMetricsTeamID + kind)
  
  let rank = getElement(eventCategoriesMetricsTotalRankID + kind)
  let points = getElement(eventCategoriesMetricsTotalPointsID + kind)
  
  let consistency = getElement(eventCategoriesMetricsConsistencyID + kind)
  let pace = getElement(eventCategoriesMetricsPaceID + kind)

  let rankConsistency = getElement(eventCategoriesMetricsRankConsistencyID + kind)
  let pointsConsistency = getElement(eventCategoriesMetricsPointsConsistencyID + kind)

  let rankPace = getElement(eventCategoriesMetricsRankPaceID + kind)
  let pointsPace = getElement(eventCategoriesMetricsPointsPaceID + kind)

  if (kind == 'timing') {

    let dataTiming = copyObject(eventSummary)
    dataTiming = sortObject(dataTiming, 'RankTiming', ascending=true)

    let colorPrimary = saturateColor(dataTiming[0]['Color'], 0.75)

    name.textContent = dataTiming[0]['FullName']
    name.style.color = colorPrimary
    number.textContent = `#${dataTiming[0]['Number']}`
    team.textContent = dataTiming[0]['Team']

    rank.textContent = dataTiming[0]['RankTiming']
    points.textContent = dataTiming[0]['PointsTiming']

    consistency.textContent = dataTiming[0]['Consistency']
    pace.textContent = dataTiming[0]['PaceSec']

    rankConsistency.textContent = dataTiming[0]['RankConsistency']
    pointsConsistency.textContent = dataTiming[0]['PointsConsistency']

    rankPace.textContent = dataTiming[0]['RankPace']
    pointsPace.textContent = dataTiming[0]['PointsPace']
    
  } else if (kind == 'actions') {

    let dataActions = copyObject(eventSummary)

    dataActions = sortObject(dataActions, 'RankActions', ascending=true)

    let colorPrimary = saturateColor(dataActions[0]['Color'], 0.75)

    name.textContent = dataActions[0]['FullName']
    name.style.color = colorPrimary

    number.textContent = `#${dataActions[0]['Number']}`

    team.textContent = dataActions[0]['Team']

    rank.textContent = dataActions[0]['RankActions']
    points.textContent = dataActions[0]['PointsActions']

    let startValue
    
    if (dataActions[0]['Start'] > 0) {
      startValue = `+${dataActions[0]['Start']}`
    } else if (dataActions[0]['Start'] < 0) {
      startValue = `-${Math.abs(dataActions[0]['Start'])}`
    } else {
      startValue = `${dataActions[0]['Start']}`
    }
    
    consistency.textContent = startValue

    let overtakesValue
    
    if (dataActions[0]['Overtakes'] > 0) {
      overtakesValue = `+${dataActions[0]['Overtakes']}`
    } else if (dataActions[0]['Overtakes'] < 0) {
      overtakesValue = `-${Math.abs(dataActions[0]['Overtakes'])}`
    } else {
      overtakesValue = `${dataActions[0]['Overtakes']}`
    }
    
    pace.textContent = overtakesValue

    rankConsistency.textContent = dataActions[0]['RankStart']
    pointsConsistency.textContent = dataActions[0]['PointsStart']

    rankPace.textContent = dataActions[0]['RankOvertakes']
    pointsPace.textContent = dataActions[0]['PointsOvertakes']

  }

}


function eventPaceGetLeaderNumber() {

  if (glVEvent['Radio21Condition'] == 'clear') {
    
    eventSummarySorted = sortObject(eventSummarySorted, 'PaceDiffClear', true)
    
  } else if (glVEvent['Radio21Condition'] == 'regular') {
    
    eventSummarySorted = sortObject(eventSummarySorted, 'PaceDiff', true)
    
  }

  return eventSummarySorted[0]['Number']
  
}


function eventPaceUpdateLeftVariablesByNumber() {

  eventPaceSummaryLeft = eventSummarySorted.filter(o => o['Number'] == eventPaceBestPaceNumberLeft)[0]
  eventPaceLaptimesLeft = eventLaptimes.filter(o => o['Number'] == eventPaceBestPaceNumberLeft)

  if (eventPaceSummaryLeft) {

    eventPaceBestPaceNameLeft = eventPaceSummaryLeft['FullName']
    eventPaceBestPaceColorLeft = eventPaceSummaryLeft['Color']
    
  } else {

    eventPaceBestPaceNumberLeft = eventPaceGetLeaderNumber()

    eventPaceSummaryLeft = eventSummarySorted.filter(o => o['Number'] == eventPaceBestPaceNumberLeft)[0]
    eventPaceLaptimesLeft = eventLaptimes.filter(o => o['Number'] == eventPaceBestPaceNumberLeft)

    eventPaceBestPaceNameLeft = eventPaceSummaryLeft['FullName']
    eventPaceBestPaceColorLeft = eventPaceSummaryLeft['Color']

    eventPaceBestPaceNumberRight = 'null'

    glVEvent['PaceDefaultDriver'] = true
    
  }

}


function eventPaceUpdateRightVariablesByNumber() {

  if (eventPaceBestPaceNumberRight != 'null') {

    eventPaceSummaryRight = eventSummarySorted.filter(o => o['Number'] == eventPaceBestPaceNumberRight)[0]
    eventPaceLaptimesRight = eventLaptimes.filter(o => o['Number'] == eventPaceBestPaceNumberRight)

    if (eventPaceSummaryRight) {

      eventPaceBestPaceNameRight = eventPaceSummaryRight['FullName']
      eventPaceBestPaceColorRight = eventPaceSummaryRight['Color']

      if (eventPaceBestPaceColorLeft == eventPaceBestPaceColorRight) {
        eventPaceBestPaceColorRight = modColor2(eventPaceBestPaceColorRight)
      }
      
    } else {

      eventPaceSummaryRight = null
      eventPaceLaptimesRight = null
  
      eventPaceBestPaceNameRight = eventPaceBestPaceMarker
      eventPaceBestPaceColorRight = eventPaceBestPaceMarkerColor
        
    }

  } else {

    eventPaceSummaryRight = null
    eventPaceLaptimesRight = null

    eventPaceBestPaceNameRight = eventPaceBestPaceMarker
    eventPaceBestPaceColorRight = eventPaceBestPaceMarkerColor
    
  }

}


function eventPaceUpdateRightColor() {

  if (eventPaceBestPaceNumberRight != 'null') {

    eventPaceBestPaceColorRight = eventPaceSummaryRight['Color']

    if (eventPaceBestPaceColorLeft == eventPaceBestPaceColorRight) {
      eventPaceBestPaceColorRight = modColor2(eventPaceBestPaceColorRight)
    }
    
  } else {

    eventPaceBestPaceColorRight = eventPaceBestPaceMarkerColor
    
  }

}


function eventPaceUpdateChart_9() {

  if (glVEvent['Radio21Condition'] == 'clear') {
    
    chart_9(chart2ID, eventSummary, 'PaceDiffClear', '1')
    
  } else if (glVEvent['Radio21Condition'] == 'regular') {
    
    chart_9(chart2ID, eventSummary, 'PaceDiff', '1')
    
  }
  
}



function eventPaceUpdateChart_11() {

  if (glVEvent['Radio21Condition'] == 'clear') {

    chart_11(
      chart4ID, 'PaceDiffClear',
      [eventPaceLaptimesLeft, eventPaceLaptimesRight],
      [eventPaceBestPaceColorLeft, eventPaceBestPaceColorRight],
      '1'
    )

    // chart_12(
    //   chart3ID, 'PaceDiffClear',
    //   [eventPaceLaptimesLeft, eventPaceLaptimesRight],
    //   [eventPaceBestPaceColorLeft, eventPaceBestPaceColorRight],
    //   '1'
    // )
    
  } else if (glVEvent['Radio21Condition'] == 'regular') {

    chart_11(
      chart4ID, 'PaceDiff',
      [eventPaceLaptimesLeft, eventPaceLaptimesRight],
      [eventPaceBestPaceColorLeft, eventPaceBestPaceColorRight],
      '1'
    )
    
  }

}


function dropdown25Fill() {

  // fill menu  
  dropdownMenuAddItems(dropdown25MenuID, eventPaceDriverNamesList, dropdown25MenuItemID)

  // attributes
  dropdownItemsSetAttributes(
    dropdown25MenuID, {
      'index': 'index',
      'number': eventPaceDriverNumbersList,
      'color': eventPaceDriverColorsList
    })

  getElement(dropdown25TitleID).textContent = eventPaceBestPaceNameLeft
  // getElement(dropdown25MarkerID).style.background = saturateColor(alphaColor(eventPaceBestPaceColorLeft, 0.75), 0.75)
  getElement(dropdown25MarkerID).style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)

  let topWidth = getDropdownMaximumwidth(
    dropdown25ContainerID, dropdown25TitleID, dropdown25MenuID, eventPaceDriverNamesList)

  // update widths
  setDropdownWidth(dropdown25ContainerID, dropdown25MenuID, topWidth, setMenuWidth=false)
  // updateDropdownWidth(dropdown24ID, dropdown24MenuID)

}


function dropdown25MouseUp(element) {

  glVEvent['PaceDefaultDriver'] = false

  eventPaceBestPaceNumberLeft = element.getAttribute('number')

  eventPaceUpdateLeftVariablesByNumber()
  eventPaceUpdateRightColor()

  getElement(dropdown25TitleID).textContent = eventPaceBestPaceNameLeft
  
  getElement(dropdown25MarkerID).style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)
  getElement(dropdown26MarkerID).style.background = paleColor(eventPaceBestPaceColorRight, 0.8)

  eventPaceUpdateChart_11()
  
}


function dropdown26Fill() {

  let items = copyObject(eventPaceDriverNamesList)
  items.unshift(eventPaceBestPaceMarker)

  let numbers = copyObject(eventPaceDriverNumbersList)
  numbers.unshift(null)

  let colors = copyObject(eventPaceDriverColorsList)
  colors.unshift(null)

  // fill menu
  dropdownMenuAddItems(
    dropdown26MenuID, items, dropdown26MenuItemID,
    disableArray=false, addSeparatorAfterIdx=[0]
  )

  // attributes
  dropdownItemsSetAttributes(
    dropdown26MenuID, {
      'index': 'index',
      'number': numbers,
      'color': colors
    })

  getElement(dropdown26TitleID).textContent = eventPaceBestPaceNameRight
  getElement(dropdown26MarkerID).style.background = paleColor(eventPaceBestPaceColorRight, 0.8)

  let topWidth = getDropdownMaximumwidth(
    dropdown26ContainerID, dropdown26TitleID, dropdown26MenuID, items)

  // update widths
  setDropdownWidth(dropdown26ContainerID, dropdown26MenuID, topWidth, setMenuWidth=false)
  // updateDropdownWidth(dropdown24ID, dropdown24MenuID)

}


function dropdown26MouseUp(element) {

  glVEvent['PaceDefaultDriver'] = false

  eventPaceBestPaceNumberRight = element.getAttribute('number')

  eventPaceUpdateRightVariablesByNumber()

  getElement(dropdown26TitleID).textContent = eventPaceBestPaceNameRight

  getElement(dropdown25MarkerID).style.background = paleColor(eventPaceBestPaceColorLeft, 0.8)
  getElement(dropdown26MarkerID).style.background = paleColor(eventPaceBestPaceColorRight, 0.8)

  eventPaceUpdateChart_11()
  
}


function dropdownEventPaceMakeActive() {

  dropdownNoBorderMakeActive(
      dropdown25MenuID, dropdown25CaretID,
      [getElement(dropdown25ID)],
      [document, getElement(dropdown26ID)])

  dropdownNoBorderMakeActive(
      dropdown26MenuID, dropdown26CaretID,
      [getElement(dropdown26ID)],
      [document, getElement(dropdown25ID)])
  
}


function eventPaceTable1Fill(type='clear') {

  // if metric - RankPaceDiffClearByWorst

  let metric
  let metricRank
  let metricMean
  let paceMarkerLabel
  let paceLabel
  let paceBetterThanAvg
  let paceAvg

  if (type == 'clear') {

    metric = 'PaceDiffClear'
    metricRank = 'RankPaceDiffClear'
    metricMean = 'PaceDiffClearMean'
    paceMarkerLabel = 'PaceClearMarkerLabel'
    paceLabel = 'PaceClearLabel'
    paceBetterThanAvg = 'PaceDiffClearByWorstBetterThanAvg'
    paceAvg = 'PaceClear'
    
  } else if (type == 'regular') {

    metric = 'PaceDiff'
    metricRank = 'RankPaceDiff'
    metricMean = 'PaceDiffMean'
    paceMarkerLabel = 'PaceMarkerLabel'
    paceLabel = 'PaceSec'
    paceBetterThanAvg = 'PaceDiffByWorstBetterThanAvg'
    paceAvg = 'Pace'
    
  }

  let data = sortObject(eventSummarySorted, metricRank + 'ByWorst', true)
  data = data.filter(o => o['LaptimeSeriesActual'] == 1)

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

  let driversBetterAvgValue = (
    data
    .filter(o => o[paceBetterThanAvg] == 1)
    .length
  )

  let driversWorstAvgValue = (
    data
    .filter(o => o[paceBetterThanAvg] == 0)
    .length
  )

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
  let kind = radiotGetButtonCondition(currentButton)

  glVEvent['Radio21Condition'] = kind

  eventPaceTable1Fill(type=kind)
  eventPaceUpdateChart_9()

  eventPaceUpdateChart_11()
  
}


function refresh21MouseUp(element) {

  glVEvent['PaceDefaultDriver'] = true

  let metricSort

  if (glVEvent['Radio21Condition'] == 'clear') {
    metricSort = 'RankPaceDiffClearByWorst'
  } else {
    metricSort = 'RankPaceDiffByWorst'
  }

  eventSummarySorted = sortObject(eventSummarySorted, metricSort, true)

  eventPaceBestPaceNumberLeft = eventSummarySorted[0]['Number']
  eventPaceBestPaceNumberRight = 'null'

  eventPaceUpdateLeftVariablesByNumber()
  eventPaceUpdateRightVariablesByNumber()

  dropdown25Fill()
  dropdown26Fill()
  
  eventPaceUpdateChart_11()
  
  
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
  
  // last data available
  eventsEvent = copyObject(events)
  eventsEvent = eventsEvent.filter(o => o['DataAvailable'] == 1)
  eventsEvent = eventsEvent.slice(-1)[0]

  glVEvent['SeasonID'] = eventsEvent['SeasonID']
  glVEvent['RaceID'] = eventsEvent['RaceID']
  glVEvent['EventID'] = eventsEvent['EventID']

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
  glVGlobal['Page'] = eventRatingPageID

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

  let dataPaths = [d3.csv(pathSummaryActual)]

  Promise.all(dataPaths).then(function(files) {

    eventSummary = files[0]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventCategories

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerEventsCategoriesID).classList.add('smooth-appear-fast')
    // }

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

    // glVGlobal['FirstLoad'] = false

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

  let dataPaths = [d3.csv(pathSummaryActual), d3.csv(pathLaptimesRaceActual)]

  Promise.all(dataPaths).then(function(files) {

    eventSummary = files[0]
    eventLaptimes = files[1]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventComparison

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerEventsComparisonID).classList.add('smooth-appear-fast')
    // }

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
    dropdown24MakeActive()

    dropdown23Fill(dropdown23LeftMenuID, eventComparisonDriversData['Left']['FullName'])
    dropdown23Fill(dropdown23RightMenuID, eventComparisonDriversData['Right']['FullName'])
    dropdown23MakeActive()

    let laptimesLeft = eventLaptimes.filter(o => o['Number'] == eventComparisonDriversData['Left']['Number'])
    let laptimesRight = eventLaptimes.filter(o => o['Number'] == eventComparisonDriversData['Right']['Number'])

    eventUpdateChartsComparison(summaryLeft, summaryRight, laptimesLeft, laptimesRight)

    if (glVEvent['WrongEvent'] == true) {
      wrongEventMessage(glVEvent['SeasonID'], glVEvent['WrongEventNameRus'])
      glVEvent['WrongEvent'] = false
    }

    if (glVEvent['NotAvailableEvent'] == true) {
      notAvailableEventMessage(glVEvent['SeasonID'], glVEvent['NotAvailableEventNameRus'])
      glVEvent['NotAvailableEvent'] = false
    }

    // glVGlobal['FirstLoad'] = false

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


function updateEventPacePage(kind) {

  updateUnits()

  if (kind == 'first') { eventFirstLoad() }

  glVGlobal['Segment'] = eventSegmentID
  glVGlobal['Page'] = eventPacePageID

  eventUpdateGlobalsByRaceID()
  eventUpdatePaths(glVEvent['RaceID'])

  let dataPaths = [d3.csv(pathSummaryActual), d3.csv(pathLaptimesRaceActual)]

  Promise.all(dataPaths).then(function(files) {

    eventSummary = files[0]
    eventLaptimes = files[1]

    getElement(eventContentContainerID).innerHTML = ''
    getElement(eventContentContainerID).innerHTML += pageEventPace
  
    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerEventsPaceID).classList.add('smooth-appear-fast')
    // }

    if (glVEvent['PaceReset']) {

      glVEvent['PaceReset'] = false

      eventPaceBestPaceNumberLeft = null
      eventPaceBestPaceNumberRight = null
      eventPaceBestPaceNameLeft = null
      eventPaceBestPaceNameRight = null
      eventPaceBestPaceColorLeft = null
      eventPaceBestPaceColorRight = null
      
    }

    eventSummarySorted = copyObject(eventSummary)
    eventSummarySorted = sortObjectString(eventSummarySorted, 'FullName')

    eventPaceDriverNamesList = eventSummarySorted.map(o => o['FullName'])
    eventPaceDriverNumbersList = eventSummarySorted.map(o => o['Number'])
    eventPaceDriverColorsList = eventSummarySorted.map(o => o['Color'])

    let metricSort

    if (glVEvent['Radio21Condition'] == 'clear') {
      metricSort = 'RankPaceDiffClearByWorst'
    } else {
      metricSort = 'RankPaceDiffByWorst'
    }

    eventSummarySorted = sortObject(eventSummarySorted, metricSort, true)

    eventPaceBestPaceNumberLeft ||= eventSummarySorted[0]['Number']
    eventPaceBestPaceNumberRight ||= 'null'

    eventPaceUpdateLeftVariablesByNumber()
    eventPaceUpdateRightVariablesByNumber()

    dropdown25Fill()
    dropdown26Fill()
    dropdownEventPaceMakeActive()

    radioActivateByCondition(radio21ID, glVEvent['Radio21Condition'])

    eventPaceTable1Fill(glVEvent['Radio21Condition'])

    eventPaceUpdateChart_9()
    eventPaceUpdateChart_11()

    window.onresize = () => {

      updateUnits()

      eventPaceUpdateChart_9()
      eventPaceUpdateChart_11()
      
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
  
}


function updateEventPages(pageID, kind) {

  

  if (pageID == eventRatingPageID) {

    updateEventRatingPage(kind)
    
  } else if (pageID == eventCategoriesPageID) {

    updateEventCategoriesPage(kind)
    
  } else if (pageID == eventComparisonPageID) {

    updateEventComparisonPage(kind)
    
  } else if (pageID == eventPacePageID) {

    updateEventPacePage(kind)
    
  }
  
}










