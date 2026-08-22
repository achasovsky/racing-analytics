function seasonUpdatePaths(seasonID, sprintIndex, team) {

  seasonData1path = pathSeasonData + seasonID + '/' + 'data_1_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData2path = pathSeasonData + seasonID + '/' + 'data_2_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData5path = pathSeasonData + seasonID + '/' + 'data_5_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData6path = pathSeasonData + seasonID + '/' + 'data_6_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData7path = pathSeasonData + seasonID + '/' + 'data_7_' + seasonID + '_' + sprintIndex + '.csv'

  seasonData8path = pathSeasonData + seasonID + '/data_8/' + 'data_8_' + seasonID + '_' + sprintIndex + '_' + team + '.csv'

  seasonData9path = pathSeasonData + seasonID + '/' + 'data_9_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData10path = pathSeasonData + seasonID + '/' + 'data_10_' + seasonID + '_' + sprintIndex + '.csv'

}


function seasonMenuYearsMouseUp(element) {

  appearLoader(loaderID)

  let seasonContentContainer = getElement(seasonContentContainerID)
  disappearContentContainer(seasonContentContainer)

  pageContainerGetScroll()

  // get SeasonID
  glVSeason['SeasonID'] = element.getAttribute('SeasonID')

  // title
  let title = getElement(menuYears11TitleID)
  title.textContent = glVSeason['SeasonID']

  // update page
  seasonLoadPages(glVGlobal['Page'], kind='year')

  addSmoothAppearFast(seasonContentContainer)

}


function seasonMenuRacesprintMouseUp(currentButton, buttonsCollection) {

  appearLoader(loaderID)

  pageContainerGetScroll()

  // get SprintIndex
  glVSeason['SprintIndex'] = currentButton.getAttribute('condition')

  // select surrent indes in menu
  seasonMenuRacesprintButtonActivate(currentButton)

  // update page
  seasonLoadPages(glVGlobal['Page'], kind='sprint-index')
  
}


function seasonUpdateEventInformation(lastEventData, nextEventData, seasonSeasonID, seasonOver) {

  let legendContainer = getElement(containerSeasonStatisticsInfoID)

  // if season finished
  if (seasonOver == 1) {

    // getElement('fieldset-1').style.marginTop = '7rem'

    // legendContainer.innerHTML = `
    
    //   <div class='y7i52o'>

    //     <div class='text-1'>
    
    //       <div class='flex-column j-start a-center ps-2'>
    //         <div class=''>Победители</div>
    //         <div class=''>гран-при</div>
    //         <div class='outvdp' id='season-statistics-competition-winners'></div>
    //       </div>
          
    //       <div class='v-line he-5 a-s-center bc-10 mx-2'></div>
          
    //       <div class='flex-column j-center a-center'>
    //         <div class=''>Индекс конкуренции</div>
    //         <div class='outvdp' id='season-statistics-competition-level'></div>
    //       </div>
          
    //       <div class='v-line he-5 a-s-center bc-10 mx-2'></div>
          
    //       <div class='flex-column j-start a-center pe-2'>
    //         <div class=''>Обладатели</div>
    //         <div class=''>поул-позиции</div>
    //         <div class='outvdp' id='season-statistics-competition-poles'></div>
    //       </div>
    
    //     </div>

    //   </div>
      
    // `

    legendContainer.innerHTML = ''
    legendContainer.parentElement.classList.add('invisible')

  // if season continues
  } else {

    // getElement('fieldset-1').style.marginTop = '7rem'

    legendContainer.innerHTML = `

      <div class='y7i52o'>

        <div class='flex-column ps-2 pe-2'>
          
          <div class='text-1' id='season-last-event-date'></div>
          
            <div class='row-100 flex-column text-1 mt-05'>
              <div>
                <div id='season-last-event-order-number'></div>
                <div class='ur4e2r'>
                  <img class='icon-flag-1' id='season-last-event-flag'></img>
                </div>
                <div class='season-last-event-name' id='season-last-event-name'></div>
              </div>
              <div class='weather-text text-1 mt-05' id='season-last-event-track-name'></div>
            </div>
  
        </div>
      
        <div class='v-line he-5 a-s-center bc-10'></div>
  
        <div class='flex-column ps-2 pe-2'>
          
          <div class='text-1' id='season-next-event-date'></div>
          
          <div class='row-100 text-1 mt-05'>
            <div id='season-next-event-order-number'></div>
            <div class='ur4e2r'>
              <img class='icon-flag-1' id='season-next-event-flag'></img>
            </div>
            <div class='season-next-event-name' id='season-next-event-name'></div>
            <div class='v-line he-1 a-s-center bc-10 mx-075'></div>
            <div class='' id='season-next-event-track-name'></div>
          </div>
  
          <div class='mt-05'>
            <div class='weather-text row-100 flex text-1'>
              <div class=''>Погода:</div>
              <img class='icon-weather mx-05' id='season-next-event-weather-forecast-icon'>
              <div class='' id='season-next-event-weather-forecast-temp'></div>
              <div class='ms-025'>&deg;C</div>
              <div class='v-line he-1 a-s-center bc-10 mx-075'></div>
              <div>Ветер:</div>
              <div class='ms-025' id='season-next-event-weather-forecast-wind'></div>
              <div class='ms-025'>м/с</div>
              <div class='v-line he-1 a-s-center bc-10 mx-075'></div>
              <div>Вероятность дождя:</div>
              <div class='ms-025' id='season-next-event-weather-forecast-rain'></div>
              <div class='ms-025'>%</div>
            </div>
          </div>
        
        </div>

      </div>
    `

    let eventsLast = events.filter(o => o['RaceID'] == lastEventData['RaceID'])[0]
    let data_1_local = season_data_1.filter(d => d.RaceID == lastEventData['RaceID'])

    let winnerLast = data_1_local.filter((d) => d.ClassifiedPosition == 1)[0]['FullName']
    let poleLast = data_1_local.filter((d) => d.GridPosition == 1)[0]['FullName']

    let lastEventName = lastEventData['EventNameRus']
    let lastEventDate = lastEventData['EventDateMod']
    
    setText(seasonLastEventNameID, lastEventName)
    setText(seasonLastEventDateID, lastEventDate)
    setText(seasonLastEventTrackNameID, eventsLast['TrackNameRus'])
    setText(seasonLastEventOrderNumberID, `${eventsLast['EventNumber']} из ${eventsLast['EventsTotal']}`)

    let lastEventFlagPath = pathImgNationsRect + `${eventsLast['NationAbbreviation']}.svg`
    getElement(seasonLastEventFlagID).src = lastEventFlagPath

    let nextEventName = nextEventData['EventNameRus']
    let nextEventDate = nextEventData['EventDateMod']

    setText(seasonNextEventNameID, nextEventName)
    setText(seasonNextEventDateID, nextEventDate)
    setText(seasonNextEventTrackNameID, `${nextEventData['TrackNameRus']}`)
    setText(seasonNextEventOrderNumberID, `${nextEventData['EventNumber']} из ${nextEventData['EventsTotal']}`)

    let nextEventFlagPath = pathImgNationsRect + `${nextEventData['NationAbbreviation']}.svg`
    getElement(seasonNextEventFlagID).src = nextEventFlagPath

    let icon = getElement(seasonNextEventWeatherForecastIconID)
    icon.src = 'img/weather/' + `${seasonNextEventConditionsIcon}` + '.svg'
    // icon.style.width = seasonNextEventConditionsWidth
    // icon.style.marginTop = seasonNextEventConditionsIconMarginTop

    let weatherText = getElement(seasonNextEventWeatherForecastTempID)
    weatherText.textContent = seasonNextEventTemperature
    // weatherText.style.marginLeft = seasonNextEventConditionsTextMarginLeft
    
    setText(seasonNextEventWeatherForecastWindID, seasonNextEventWind)
    setText(seasonNextEventWeatherForecastRainID, seasonNextEventRainProbability)

    legendContainer.parentElement.classList.remove('invisible')
    
  }

}


function seasonHorizontalMenuFill(pageID) {

  if (pageID == seasonStatistcsPageID) {

    horizontalTocFill(seasonStatisticsToc0ID, seasonStatisticsToc0Attributes, globalScrollBehavior)

    let hortocStatistics = getElement(seasonStatisticsToc0ID)
    let hortocComparison = getElement(seasonComparisonToc0ID)

    clearContent(hortocComparison)
    invisibleElement(hortocComparison)
    invisibleElement(hortocComparison.parentElement)

    visibleElement(hortocStatistics)
    visibleElement(hortocStatistics.parentElement)

  } else if (pageID == seasonRatingsPageID) {

    let hortocStatistics = getElement(seasonStatisticsToc0ID)
    let hortocComparison = getElement(seasonComparisonToc0ID)
 
    clearContent(hortocStatistics)
    invisibleElement(hortocStatistics)
    invisibleElement(hortocStatistics.parentElement)

    clearContent(hortocComparison)
    invisibleElement(hortocComparison)
    invisibleElement(hortocComparison.parentElement)

  } else if (pageID == seasonComparisonPageID) {

    horizontalTocFill(seasonComparisonToc0ID, seasonComparisonToc0Attributes, globalScrollBehavior)

    let hortocStatistics = getElement(seasonStatisticsToc0ID)
    let hortocComparison = getElement(seasonComparisonToc0ID)

    clearContent(hortocStatistics)
    invisibleElement(hortocStatistics)
    invisibleElement(hortocStatistics.parentElement)

    visibleElement(hortocComparison)
    visibleElement(hortocComparison.parentElement)
    
  } else if (pageID == seasonPacePageID) {

    let hortocStatistics = getElement(seasonStatisticsToc0ID)
    let hortocComparison = getElement(seasonComparisonToc0ID)

    clearContent(hortocStatistics)
    invisibleElement(hortocStatistics)
    invisibleElement(hortocStatistics.parentElement)
    
    clearContent(hortocComparison)
    invisibleElement(hortocComparison)
    invisibleElement(hortocComparison.parentElement)
    
  }
  
}


function aggregationListAddItem(
    elementsContainerID, valuesContainerID, element, value,
    elementAttributes={}, elementStyles={}, valuesAttributes={}, valuesStyles={}) {

  let elementDom = document.createElement('li')
  let valueDom = document.createElement('li')

  Object.assign(elementDom, {
    className: 'aggregation-elements',
    textContent: element,
  })

  Object.assign(valueDom, {
    className: 'aggregation-values',
    textContent: value,
  })

  if (elementAttributes.length > 0) {
    elementAttributes.forEach((attributes, i) => {
      elementDom.setAttribute(Object.keys(attributes), Object.values(attributes))
    })
  }

  if (valuesAttributes.length > 0) {
    valuesAttributes.forEach((attributes, i) => {
      valueDom.setAttribute(Object.keys(attributes), Object.values(attributes))
    })
  }

  if (Object.keys(elementStyles).length > 0) { Object.assign(elementDom.style, elementStyles) }
  if (Object.keys(valuesStyles).length > 0) { Object.assign(valueDom.style, valuesStyles) }

  getElement(elementsContainerID).appendChild(elementDom)
  getElement(valuesContainerID).appendChild(valueDom)
  
}


function seasonAggregationTable1NationsFill() {

  let table = getElement(aggreagationTable1ID)
  let tableID = table.getAttribute('tableID')

  getElement('aggregation-elements-' + tableID).innerHTML = ''
  getElement('aggregation-values-' + tableID).innerHTML = ''

  let data = copyObject(season_stat_data_6)

  data = dropDuplicatesArrayOfObject(data, property='NationCode')
  data = sortValues(data, 'NationPointsOfficial')

  data.forEach((obj, i) => {

    if (i == 0) {

      let img = getElement('driver-image-' + tableID)
      let imgPath = pathImgNationsRound + '/' + obj['NationCode'] + '.svg'

      img.src = imgPath

      let teamName = getElement('team-name-' + tableID)
      teamName.textContent = obj['NationNameRus']
      teamName.style.color = obj['NationColor']

      let teamMetric = getElement('team-metric-' + tableID)
      teamMetric.textContent = obj['NationPointsOfficial']
      teamMetric.style.color = obj['NationColor']

      adjustFontSizeByParent(teamName)
      
    }

    aggregationListAddItem(
      'aggregation-elements-' + tableID,
      'aggregation-values-' + tableID,
      obj['NationNameRus'],
      obj['NationPointsOfficial'],
      elementAttributes = {},
    )
    
  })
  
}


function seasonAggregationTable1TeamsFill() {

  let table = getElement(aggreagationTable3ID)
  let tableID = table.getAttribute('tableID')

  getElement('aggregation-elements-' + tableID).innerHTML = ''
  getElement('aggregation-values-' + tableID).innerHTML = ''

  let data = dropDuplicatesArrayOfObject(season_stat_data_6, property='Team')
  data = sortValues(data, 'TeamPointsOfficial')

  data.forEach((obj, i) => {

    if (i == 0) {

      let imgPath = pathImgConstructors + glVSeason['SeasonID'] + '/' + obj['Team'] + imagesFormat

      getElement('driver-image-' + tableID).src = imgPath

      let teamName = getElement('team-name-' + tableID)
      teamName.textContent = obj['Team']
      teamName.style.color = saturateColor(obj['Color'], 0.8)

      let teamMetric = getElement('team-metric-' + tableID)
      teamMetric.textContent = obj['TeamPointsOfficial']
      teamMetric.style.color = saturateColor(obj['Color'], 0.8)

      getElement('team-constructor-' + tableID).textContent = obj['Engine']

      adjustFontSizeByParent(teamName)
      
    }

    aggregationListAddItem(
      'aggregation-elements-' + tableID,
      'aggregation-values-' + tableID,
      obj['Team'],
      obj['TeamPointsOfficial'],
      elementAttributes = {},
    )

  })
  
}


function seasonAggregationTable1EnginesFill() {

  let table = getElement(aggreagationTable4ID)
  let tableID = table.getAttribute('tableID')

  getElement('aggregation-elements-' + tableID).innerHTML = ''
  getElement('aggregation-values-' + tableID).innerHTML = ''

  let data = dropDuplicatesArrayOfObject(season_stat_data_6, property='Engine')
  data = sortValues(data, 'EnginePointsOfficial')

  data.forEach((obj, i) => {

    if (i == 0) {

      let imgPath = pathImgEngines + glVSeason['SeasonID'] + '/' + obj['Engine'] + imagesFormat

      getElement('driver-image-' + tableID).src = imgPath

      let teamName = getElement('team-name-' + tableID)
      teamName.textContent = obj['Engine']
      teamName.style.color = saturateColor(obj['EngineColor'], 0.8)

      let teamMetric = getElement('team-metric-' + tableID)
      teamMetric.textContent = obj['EnginePointsOfficial']
      teamMetric.style.color = saturateColor(obj['EngineColor'], 0.8)

      adjustFontSizeByParent(teamName)
      
    }

    aggregationListAddItem(
      'aggregation-elements-' + tableID,
      'aggregation-values-' + tableID,
      obj['Engine'],
      obj['EnginePointsOfficial'],
      elementAttributes = {},
    )
    
  })
  
}


function seasonAggregationTable1Fill(tableID, property, sort, lessThanFive=true) {

  getElement('aggregation-elements-' + tableID).innerHTML = ''
  getElement('aggregation-values-' + tableID).innerHTML = ''

  let data = copyObject(season_stat_data_6)

  if (lessThanFive) {

    let dataMoreThanFive = copyObject(data)
    let dataLessThanFive = copyObject(data)

    dataMoreThanFive = dataMoreThanFive.filter(o => o['RacesParticipatedGroupAllTeams'] == 1)
    dataLessThanFive = dataLessThanFive.filter(o => o['RacesParticipatedGroupAllTeams'] == 0)

    for (const [key, value] of Object.entries(sort)) {
      dataMoreThanFive = sortValues(dataMoreThanFive, key, value)
      dataLessThanFive = sortValues(dataLessThanFive, key, value)
    }

    dataMoreThanFive.forEach((obj, i) => {
  

      if (i == 0) {
  
        let driverIDT = obj['DriverIDT']

        let img = getElement('driver-image-' + tableID)
        let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + driverIDT + imagesFormat

        img.src = imgPath

        let driverName = getElement('driver-name-' + tableID)
        driverName.textContent = obj['FullName']
        driverName.style.color = saturateColor(obj['Color'], 0.8)
  
        setText('driver-team-' + tableID, obj['Team'])
  
        let driverMetric = getElement('driver-metric-' + tableID)
        driverMetric.textContent = obj[property]
        driverMetric.style.color = saturateColor(obj['Color'], 0.8)

        adjustFontSizeByParent(driverName)
        
      }

      // let driverNameText = `${obj['FirstName']} ${obj['LastName'].toUpperCase()}`

      aggregationListAddItem(
        'aggregation-elements-' + tableID,
        'aggregation-values-' + tableID,
        obj['FullName'],
        // driverNameText,
        obj[property],
        elementAttributes = {},
      )
      
    })

    if ((data.length != dataLessThanFive.length) && (dataLessThanFive.length > 0)) {

      let lessThanFiveMarkers = getLessThanFiveGPLabel()

      getElement('aggregation-elements-' + tableID).appendChild(lessThanFiveMarkers[0])
      getElement('aggregation-values-' + tableID).appendChild(lessThanFiveMarkers[1])
      
    }

    dataLessThanFive.forEach((obj, i) => {

      if (dataMoreThanFive.length == 0) {

        if (i == 0) {
  
          let driverIDT = obj['DriverIDT']

          let img = getElement('driver-image-' + tableID)
          let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + driverIDT + imagesFormat

          img.src = imgPath
    
          let driverName = getElement('driver-name-' + tableID)
          driverName.textContent = obj['FullName']
          driverName.style.color = saturateColor(obj['Color'], 0.8)

          setText('driver-team-' + tableID, obj['Team'])
    
          let driverMetric = getElement('driver-metric-' + tableID)
          driverMetric.textContent = obj[property]
          driverMetric.style.color = saturateColor(obj['Color'], 0.8)

          adjustFontSizeByParent(driverName)

        }
        
      }

      // let driverNameText = `${obj['FirstName']} ${obj['LastName'].toUpperCase()}`
  
      aggregationListAddItem(
        'aggregation-elements-' + tableID,
        'aggregation-values-' + tableID,
        // driverNameText,
        obj['FullName'],
        obj[property],
        elementAttributes = {},
      )
      
    })
    
  } else {

    let dataAll = copyObject(data)

    // sort
    for (const [key, value] of Object.entries(sort)) {
      dataAll = sortValues(dataAll, key, value)
    }

    dataAll.forEach((obj, i) => {

      if (i == 0) {
  
        let driverIDT = obj['DriverIDT']

        let img = getElement('driver-image-' + tableID)
        let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + driverIDT + imagesFormat

        img.src = imgPath
  
        let driverName = getElement('driver-name-' + tableID)
        driverName.textContent = obj['FullName']
        driverName.style.color = saturateColor(obj['Color'], 0.8)
  
        setText('driver-team-' + tableID, obj['Team'])
  
        let driverMetric = getElement('driver-metric-' + tableID)
        driverMetric.textContent = obj[property]
        driverMetric.style.color = saturateColor(obj['Color'], 0.8)

        adjustFontSizeByParent(driverName)
        
      }

      // let driverNameText = `${obj['FirstName']} ${obj['LastName'].toUpperCase()}`
  
      aggregationListAddItem(
        'aggregation-elements-' + tableID,
        'aggregation-values-' + tableID,
        obj['FullName'],
        // driverNameText,
        obj[property],
        elementAttributes = {},
      )
      
    })

  }

}


function dropdown12Fill() {

  let clickedTable = glVSeasonRatings['clickedTableID']

  let labels = dropdown12Data.map(o => o['label'])
  let metrics = dropdown12Data.map(o => o['metric'])
  let stabilities = dropdown12Data.map(o => o['stability'])
  let ascendings = dropdown12Data.map(o => o['ascending'])

  // item attributes
  let itemAttributes = {
    'tableID': 'id',
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown12ID,
    'items': labels,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let dropdownTitle = getElement(dropdown12TitleID)
  dropdownTitle.textContent = labels[clickedTable]

}


function dropdown12ItemMouseUp(element) {

  seasonCategoriesClickedData = []
  glVSeasonRatings['activeIDT'] = null

  let table = getElement(seasonCategoriesRanksTableContainerID)
  table.scrollTop = 0

  let clickedTable = element.getAttribute('tableID')

  glVSeasonRatings['clickedTableID'] = clickedTable

  let dropdownTitle = getElement(dropdown12TitleID)
  dropdownTitle.textContent = element.textContent

  // fill table
  seasonCategoriesRanksTableFill(season_data_2)

  // fill info
  seasonCategoriesInfoTableFill(season_data_2)

  // draw charts
  chartLine_1(season_data_1, 'chart-season-rating-line', clickedTable, dropdown12Data[clickedTable]['chartLine1Metric'])
  
}

function seasonCategoriesInfoTableFill(dataLocal, idt=null, color=null) {

  let clickedTable = glVSeasonRatings['clickedTableID']
  let metric = dropdown12Data[clickedTable]['metric']
  let ascending = dropdown12Data[clickedTable]['ascending']

  let data = copyObject(dataLocal)
  
  data = sortValues(data, 'ChampionshipClassification', false)
  data = sortValues(data, metric.replace('Avg', '') + 'Stability', true)
  data = sortValues(data, metric, ascending)
  data = sortValues(data, 'RacesParticipatedGroup', false)

  if (!idt) {
    idt = data[0]['DriverIDT']
  }

  data = data.filter(o => o['DriverIDT'] == idt)
  if (data.length > 0) { data = data[0] }

  let tableElement = getElement(seasonCategoriesRanksTableItemID + idt)
  let position = tableElement.getAttribute('position')

  let imgEl = getElement(seasonCategoriesRanksDriverImgID)
  let nameEl = getElement(seasonCategoriesRanksDriverNameID)
  let numberEl = getElement(seasonCategoriesRanksDriverNumberID)
  let teamEl = getElement(seasonCategoriesRanksDriverTeamID)
  let titleEl = getElement(seasonCategoriesRanksInfoTitleID)
  let metricEl = getElement(seasonCategoriesRanksInfoMetricValueID)
  let rankValueEl = getElement(seasonCategoriesRanksInfoRankValueID)
  let cardsTotalEl = getElement(seasonCategoriesRanksCardsTotalID)
  let eventWithCardsEl = getElement(seasonCategoriesRanksEventWithCardsID)
  let cardSumEl = getElement(seasonCategoriesRanksCardsSumID)
  let cardMoreOneEl = getElement(seasonCategoriesRanksCardsMoreThanOneID)
  let cardConsistencyEl = getElement(seasonCategoriesRanksCardsConsistencyID)
  let cardPaceEl = getElement(seasonCategoriesRanksCardsPaceID)
  let cardStartEl = getElement(seasonCategoriesRanksCardsStartID)
  let cardOvertakesEl = getElement(seasonCategoriesRanksCardsOvertakesID)
  let mistakesLossesEl = getElement(seasonCategoriesRanksMistakesLossesID)
  let mistaksPercEl = getElement(seasonCategoriesRanksMistakesPercID)
  let mistakesCountEl = getElement(seasonCategoriesRanksMistakesPerEventID)

  let names = dataLocal.map(o => o['FullName'])
  let container = getElement(seasonCategoriesRanksDriverNameContainerID)
  let nameElWidth = getMaxWidth(nameEl, container, names)

  nameEl.textContent = data['FullName']

  if (color) {
    nameEl.style.color = color
  } else {
    nameEl.style.color = data['Color']
  }
  
  container.style.width = `${nameElWidth}px`

  numberEl.textContent = `#${data['Number']}`
  teamEl.textContent = data['Team']

  titleEl.textContent = dropdown12Data[clickedTable]['infoTitle']
  metricEl.textContent = data[metric]
  rankValueEl.textContent = position

  let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + data['DriverIDT'] + imagesFormat
  imgEl.src = imgPath

  cardsTotalEl.textContent = data['CardsEventSumAllTeams']
  eventWithCardsEl.textContent = data['CardSumAllTeams']
  cardSumEl.textContent = data['CardPointsSumAllTeams']
  cardMoreOneEl.textContent = data['CardMultipleSumAllTeams']
  cardConsistencyEl.textContent = data['CardConsistencySumAllTeams']
  cardPaceEl.textContent = data['CardPaceSumAllTeams']
  cardStartEl.textContent = data['CardStartSumAllTeams']
  cardOvertakesEl.textContent = data['CardOvertakesSumAllTeams']
  mistakesLossesEl.textContent = data['MistakesLossesPerLapAvgAllTeams']
  mistaksPercEl.textContent = `${data['MistakesCountPerLapPercAllTeams']}%`
  mistakesCountEl.textContent = data['MistakesCountAvgAllTeams']

  
}


function seasonCategoriesFillRanksTableCreateItem(
    positionValue, imgPath, color, nameValue, idtValue, numberValue, teamValue, ratingValue) {

  let numberValueWithDies = `#${numberValue}`

  let rating = document.createElement('div')
  rating.classList.add('da550x')
  rating.id = seasonCategoriesRanksTableRatingID + idtValue

  let number = document.createElement('div')
  
  let team = document.createElement('div')
  team.classList.add('td628a')

  let teamContainer = document.createElement('div')
  teamContainer.classList.add('vl212e')

  let name = document.createElement('div')
  name.classList.add('cn856g')
  name.id = seasonCategoriesRanksTableNameID + idtValue

  let nameContainer = document.createElement('div')
  nameContainer.classList.add('mf399m')

  let img = document.createElement('img')
  img.classList.add('driver-image', 'gn176l')

  let position = document.createElement('div')
  position.classList.add('on546x')
  position.id = seasonCategoriesRanksTablePositionID + idtValue

  let item = document.createElement('div')
  item.classList.add('fl643w')
  item.setAttribute('Id', seasonCategoriesRanksTableItemID + idtValue)
  item.setAttribute('DriverIDT', idtValue)
  item.setAttribute('color', color)
  item.setAttribute('team', teamValue)

  // let itemContainer = document.createElement('div')
  // itemContainer.classList.add('hk211k')

  img.src = imgPath
  name.style.color = color
  
  position.textContent = positionValue
  name.textContent = nameValue
  number.textContent = numberValueWithDies
  team.textContent = teamValue
  rating.textContent = ratingValue

  teamContainer.appendChild(number)
  teamContainer.appendChild(team)

  nameContainer.appendChild(name)
  nameContainer.appendChild(teamContainer)

  item.appendChild(position)
  // item.appendChild(img)
  item.appendChild(nameContainer)
  item.appendChild(rating)

  return item
  
}


function seasonCategoriesRanksTableFill(dataLocal) {

  let table = getElement(seasonCategoriesRanksTableContainerID)
  table.innerHTML = ''

  let dropdownLabel = getElement(dropdown12TitleID)

  let clickedTable = glVSeasonRatings['clickedTableID']
  let dropdownData = dropdown12Data[clickedTable]

  let metric = dropdownData['metric']
  let ascending = dropdownData['ascending']

  let data = copyObject(dataLocal)
  data = sortValues(data, 'ChampionshipClassification', false)
  data = sortValues(data, metric.replace('Avg', '') + 'Stability', true)
  data = sortValues(data, metric, ascending)
  data = sortValues(data, 'RacesParticipatedGroup', false)

  let previousRating = 0
  let lessThanFiveIndicator = 0

  let dataPrimary = data.filter(d => d['RacesParticipatedGroup'] == 1)
  let dataSecondary = data.filter(d => d['RacesParticipatedGroup'] == 0)

  data.forEach((object, i) => {

    // less than 5 gp
    if (object['RacesParticipatedGroup'] == 0) {

      if (lessThanFiveIndicator == 0) {

        let lessThan = document.createElement('div')
        lessThan.classList.add('iu172o')
        lessThan.textContent = 'МЕНЕЕ 5 ГРАН-ПРИ'
        
        table.appendChild(lessThan)
        lessThanFiveIndicator = 1
        
      }
      
    }

    let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + object['DriverIDT'] + imagesFormat

    let position = i + 1
    let name = object['FullName']
    let idt = object['DriverIDT']
    let number = object['Number']
    let team = object['Team']
    let color = object['Color']
    let rating = object[metric]

    previousRating = rating

    let item = seasonCategoriesFillRanksTableCreateItem(position, imgPath, color, name, idt, number, team, rating)
    item.setAttribute('position', position)

    table.appendChild(item)

    // add space between items - need to correct working hover
    if (i != data.length - 1) {

      let space = document.createElement('div')
      space.classList.add('b717hl')
      space.id = seasonCategoriesRanksTableSpaceID
      
      table.appendChild(space)
      
    }

    // save leader number
    if (i == 0) {
      glVSeasonRatings['leaderIDT'] = idt
    }
    
  })

}


function seasonCategoriesRanksTableMouseOver(element) {

  let clickedIDTs = seasonCategoriesClickedData.map(o => o['idt'])

  let activeIDT = glVSeasonRatings['activeIDT']
  let currentIDT = element.getAttribute('DriverIDT')

  let colorDefault = element.getAttribute('color')
  let team = element.getAttribute('team')

  let color = colorDefault
  let dash = 0

  // if item is clicked
  if (clickedIDTs.includes(currentIDT)) {

    let dataCurrent = seasonCategoriesClickedData.filter(o => o['idt'] == currentIDT)
    if (dataCurrent.length > 0) { dataCurrent = dataCurrent[0]}

    seasonCategoriesInfoTableFill(season_data_2, currentIDT, dataCurrent['colorClicked'])

    glVSeasonRatings['activeColor'] = dataCurrent['activeColor']
    glVSeasonRatings['activeColorDefault'] = dataCurrent['activeColorDefault']

  // if item not clicked
  } else {

    let colorAndDash = seasonCategoriesUpdateColorAndDash(colorDefault, team)
    color = colorAndDash[0]
    dash = colorAndDash[1]
  
    let tableNameEl = getElement(seasonCategoriesRanksTableNameID + currentIDT)
    tableNameEl.style.color = color

    seasonCategoriesInfoTableFill(season_data_2, currentIDT, color)
    seasonCategoriesChartLineActivate(currentIDT, color, dash)
 
  }
  // if active element exist
  if (activeIDT) {
    // and active element not the one we just leave - deactivate it
    if (activeIDT != currentIDT) {

      // and it not clicked
      if (!clickedIDTs.includes(activeIDT)) {
        
        let tableNameActiveEl = getElement(seasonCategoriesRanksTableNameID + activeIDT)
        tableNameActiveEl.style.color = glVSeasonRatings['activeColorDefault']
        
        seasonCategoriesChartLineDectivate(activeIDT)
        
      }
      
    }
    
  }

  glVSeasonRatings['activeElID'] = element.id
  glVSeasonRatings['activeIDT'] = currentIDT
  glVSeasonRatings['activeColor'] = color
  glVSeasonRatings['activeColorDefault'] = colorDefault
  glVSeasonRatings['activeDash'] = dash

}


function seasonCategoriesRanksTableMouseLeave() {

  let activeIDT = glVSeasonRatings['activeIDT']

  if (activeIDT) {

    let clickedIDTs = seasonCategoriesClickedData.map(o => o['idt'])
    let lastClickedIDT = lastElement(clickedIDTs)
  
    let leaderIDT = glVSeasonRatings['leaderIDT']
    
    let dataLastClicked = seasonCategoriesClickedData.filter(o => o['idt'] == lastClickedIDT)
    if (dataLastClicked.length > 0) { dataLastClicked = dataLastClicked[0] }

    // if not clicked
    if (!clickedIDTs.includes(activeIDT)) {

      seasonCategoriesChartLineDectivate(activeIDT)
  
      let tableNameEl = getElement(seasonCategoriesRanksTableNameID + activeIDT)
      tableNameEl.style.color = glVSeasonRatings['activeColorDefault']
      
    }
  
    if (lastClickedIDT) {
      seasonCategoriesInfoTableFill(season_data_2, lastClickedIDT, dataLastClicked['colorClicked'])
    } else {
      seasonCategoriesInfoTableFill(season_data_2, leaderIDT)
    }

  }

  glVSeasonRatings['activeElID'] = null
  glVSeasonRatings['activeIDT'] = null
  glVSeasonRatings['activeColor'] = null
  glVSeasonRatings['activeColorDefault'] = null
  glVSeasonRatings['activeDash'] = null

}


function seasonCategoriesRanksTableMouseUp(element) {

  let idt = element.getAttribute('DriverIDT')

  let color = glVSeasonRatings['activeColor']
  let dash = glVSeasonRatings['activeDash']

  let colorDefault = element.getAttribute('color')
  let team = element.getAttribute('team')

  let line = getElement(seasonCategoriesRanksChartLineLineID + idt)
  let tablePosition = getElement(seasonCategoriesRanksTablePositionID + idt)

  // if element is clicked
  if (elClicked(element)) {

    element.classList.remove('clicked')

    line.style.strokeWidth = '0.125rem'
    line.style.opacity = 1
    line.style.filter = ''

    tablePosition.style.border = ''
    tablePosition.style.background = ''
    tablePosition.style.color = ''
    tablePosition.style.boxShadow = ''

    // remove IDT from clicked data
    seasonCategoriesClickedData = seasonCategoriesClickedData.filter(o => o['idt'] !== idt)

  } else {

    element.classList.add('clicked')

    line.style.strokeWidth = '0.1875rem'
    line.style.opacity = 0.85
    line.style.filter = CSSGetProperty('--chart-line-1-line-clicked-shadow')

    tablePosition.style.border = color
    tablePosition.style.background = color
    tablePosition.style.color = CSSGetProperty('--color-background')
    tablePosition.style.boxShadow = boxShadowFromColor(color, 0, 0, 0.125)

    seasonCategoriesUpdateClickedData(idt, colorDefault, color, team, dash)

  }

}


function seasonCategoriesRanksTableRefresherMouseUp(element) {

  let table = getElement(seasonCategoriesRanksTableContainerID)
  table.scrollTop = 0

  let ckicledIDTs = seasonCategoriesClickedData.map(o => o['idt'])
  let leaderIDT = glVSeasonRatings['leaderIDT']

  // for all clicked elements
  ckicledIDTs.forEach((idt, i) => {

    let dataCurrent = seasonCategoriesClickedData.filter(o => o['idt'] == idt)[0]

    let tableItem = getElement(seasonCategoriesRanksTableItemID + idt)
    let tableName = getElement(seasonCategoriesRanksTableNameID + idt)
    let tablePosition = getElement(seasonCategoriesRanksTablePositionID + idt)
  
    let line = getElement(seasonCategoriesRanksChartLineLineID + idt)
    let circles = getElement(seasonCategoriesRanksChartLineCirclesID + idt)
    let circlesDNF = getElement(seasonCategoriesRanksChartLineCirclesDnfID + idt)

    tableItem.classList.remove('clicked')

    line.style.strokeWidth = '0.0625rem'
    line.style.opacity = 1
    line.style.filter = ''
    
    tableName.style.color = dataCurrent['colorDefault']
    tablePosition.style.border = ''
    tablePosition.style.background = ''
    tablePosition.style.color = ''
    tablePosition.style.boxShadow = ''

    seasonCategoriesChartLineDectivate(idt)
    
  })

  seasonCategoriesInfoTableFill(season_data_2, leaderIDT)

  seasonCategoriesClickedData = []
  glVSeasonRatings['activeIDT'] = null

}


function seasonCategoriesChartLineActivate(idt, color, dash) {

  let line = getElement(seasonCategoriesRanksChartLineLineID + idt) 
  let circles = getElement(seasonCategoriesRanksChartLineCirclesID + idt)
  let circlesDNF = getElement(seasonCategoriesRanksChartLineCirclesDnfID + idt)

  // put line in front of other lines
  svgElementMoveAhead(line)

  // // put circles in front of other lines
  svgElementMoveAhead(circlesDNF)

  // // put circles in front of other lines
  svgElementMoveAhead(circles)

  line.style.stroke = color
  line.style.strokeWidth = '0.125rem'
  line.style.strokeDasharray = dash
  // line.style.opacity = 1
  
  for (child of circlesDNF.children) {
    child.style.stroke = saturateColor(color, 0.8)
  }

  for (child of circles.children) {
    if (child.attributes['PointsClassified'].value == 1) {
      child.style.fill = saturateColor(color, 0.8)
    }
  }

}


function seasonCategoriesChartLineDectivate(idt) {

  let line = getElement(seasonCategoriesRanksChartLineLineID + idt)
  let circles = getElement(seasonCategoriesRanksChartLineCirclesID + idt)
  let circlesDNF = getElement(seasonCategoriesRanksChartLineCirclesDnfID + idt)

  // put circles back of other circles
  svgElementMoveBehind(circles)

  // put circles retired back of other circles retired
  svgElementMoveBehind(circlesDNF)

  // put line back of other lines
  svgElementMoveBehind(line)

  line.style.stroke = colorThemesChartChartLine1Lines
  line.style.strokeWidth = '0.0625rem'
  line.style.strokeDasharray = 0

  for (child of circlesDNF.children) {
    child.style.stroke = colorThemesChartChartLine1Lines
  }

  for (child of circles.children) {
    child.style.fill = colorThemesChartChartLine1Lines
  }

}


function seasonCategoriesUpdateClickedData(idt, colorDefault, color, team, dash) {

  let clickedIDTs = seasonCategoriesClickedData.map(o => o['idt'])

  if (!clickedIDTs.includes(idt)) {
    
    seasonCategoriesClickedData.push({
      idt: idt, colorDefault: colorDefault, colorClicked: color, team: team, dash: dash
    })
    
  } else {
    seasonCategoriesClickedData = seasonCategoriesClickedData.filter(item => item.idt !== idt)
  }
  
}


function seasonCategoriesUpdateColorAndDash(color, team) {

  let dash = 0

  let clickedTeams = seasonCategoriesClickedData.map(o => o['team'])
  let clickedColors = seasonCategoriesClickedData.map(o => o['colorClicked'])

  if (clickedTeams.length > 0) {
    if (clickedTeams.includes(team)) {

      let count = clickedTeams.count(team)

      for (let i = 0; i < count; i++) {

        if (clickedColors.includes(color)) {

          if (i == 0) {
          
            color = modColor(color)
            // dash = '3 4'
            dash = 0
            
          } else {

            color = shadeColor(color, -0.35)
            
            if (!isEven(i)) {
              // let dashElement = String(randomInteger(2, 6))
              // dash = `${dashElement} ` + `${dashElement}`
              dash = '4 4'
            } else {
              dash = 0
            }
            
          }
        }
      }
    }
  }

  return [color, dash]
  
}


function seasonCategoriesClickChartsByClickedDrivers() {

  let currentSeasonDriversIDTList = season_data_2.map(o => o['DriverIDT'])

  if (seasonCategoriesClickedData.length > 0) {

    let clickedTable = glVSeasonRatings['clickedTableID']
    let clickedIDTs = seasonCategoriesClickedData.map(o => o['idt'])

    // if there was clicked lines and circles - make them active
    clickedIDTs.forEach((idt, i) => {

      // and they took part in selected season
      if (currentSeasonDriversIDTList.includes(idt)) {

        let tableElement = getElement(seasonCategoriesRanksTableItemID + idt)
        tableElement.classList.add('clicked')

        let clickedData = seasonCategoriesClickedData.filter(o => o['idt'] == idt)
        if (clickedData.length > 0) { clickedData = clickedData[0] }

        let color = clickedData['colorClicked']
        let dash = clickedData['dash']
        let team = clickedData['team']

        let tableNameEl = getElement(seasonCategoriesRanksTableNameID + idt)
        tableNameEl.style.color = color

        let line = getElement(seasonCategoriesRanksChartLineLineID + idt) 

        seasonCategoriesChartLineActivate(idt, color, dash)

        line.style.strokeWidth = '0.1875rem'
        line.style.opacity = 0.85
        line.style.filter = CSSGetProperty('--chart-line-1-line-clicked-shadow')

        let tablePosition = getElement(seasonCategoriesRanksTablePositionID + idt)
        tablePosition.style.border = color
        tablePosition.style.background = color
        tablePosition.style.color = CSSGetProperty('--color-background')
        tablePosition.style.boxShadow = boxShadowFromColor(color, 0, 0, 0.125)
            
        

        if (i == clickedIDTs.length-1) {
          seasonCategoriesInfoTableFill(season_data_2, idt, color)
        }
        
      } else {

        // if driver in clicked not participated in current season - remove him from clicked
        // if could be situation like this:
            // 1. season-ratings - clicked drivers
            // 2. go to season-comparison page
            // 3. change season
            // 4. back to season-ratings
            // 5. new drivers of new season may not match drivers of previous season, that been clicked at frist visit of season-ratings
        
        seasonCategoriesClickedData = seasonCategoriesClickedData.filter(o => o['idt'] != idt)
        
      }

    })

  }

}


function seasonMenuRacesprintButtonActivate(currentButton) {

  let collection = getElement(menuRacesprintID)
  let buttons = arrayFromChildren(collection)

  buttons.forEach((button, i) => {
    button.classList.remove('r7vm3d-active')
  })

  currentButton.classList.add('r7vm3d-active')
  
}


function seasonMenuRacesprintButtonActivateByCondition(buttonCondition) {

  let collection = getElement(menuRacesprintID)
  let buttons = arrayFromChildren(collection)

  buttons.forEach((button, i) => {

    let condition = button.getAttribute('condition')

    if (condition == buttonCondition) {
      button.classList.add('r7vm3d-active')
    } else {
      button.classList.remove('r7vm3d-active')
    }
    
  })
  
}


function seasonRatingsDescChartsFill() {

  seasonRatingsDescChartLine1Fill()
  
}


function seasonRatingsDescChartLine1Fill() {

  getElement(seasonCategoriesDescChartLine1ContentID).innerHTML = chartDescBodyChartLine1

  let img1 = getElement(seasonCategoriesDescChartLine1Img1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-line-1.svg`
    
}


function seasonCategoriesUpdateCharts() {

  let clickedTable = glVSeasonRatings['clickedTableID']

  // draw charts
  chartLine_1(
    season_data_1, 'chart-season-rating-line', clickedTable,
    dropdown12Data[clickedTable]['chartLine1Metric']
  )

  seasonCategoriesClickChartsByClickedDrivers()

  window.onresize = () => {

    updateUnits()

    let clickedTableResize = Number(glVSeasonRatings['clickedTableID'])

    if (getElement('chart-season-rating-line')) {

      chartLine_1(
        season_data_1, 'chart-season-rating-line', clickedTableResize,
        dropdown12Data[clickedTableResize]['chartLine1Metric']
      )
      
    }

    seasonCategoriesClickChartsByClickedDrivers()

  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {
    
    // draw charts
    chartLine_1(
      season_data_1, 'chart-season-rating-line', clickedTable,
      dropdown12Data[clickedTable]['chartLine1Metric']
    )
  
    seasonCategoriesClickChartsByClickedDrivers()
    
  }
  
}


function dropdown13CenterFill() {

  let teamIDs = seasonTeamIDs
  let teams = seasonTeams

  let leftTeam = glVSeasonComparison['leftTeam']
  let rightTeam = glVSeasonComparison['rightTeam']

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'teamID': teamIDs
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown13CenterID,
    'items': teams,
    'attributes': itemAttributes,
    'indexes': dropdown14IDItemIndexes,
    'width': true,
    'titles': 'Выберите команду',
    'border': true,
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  // title
  let title = getElement(dropdown13TitleCenterID)

  // change text of current label
  if (leftTeam == rightTeam) {
    
    title.textContent = leftTeam
    title.setAttribute('index', teams.indexOf(leftTeam))
    
  } else {
    
    title.textContent = 'Выберите команду'
    title.setAttribute('index', null)
    
  }

}


function dropdown13CenterItemMouseUp(elementID) {

  let element = getElement(elementID)
  let index = element.getAttribute('index')
  let teamID = element.getAttribute('teamID')
  let team = drivers_part_this_season.filter(o => o['TeamID'] == teamID)[0]['Team']

  glVSeasonComparison['teamID'] = teamID

  seasonComparisonUpdateAllByTeamID(glVSeasonComparison['teamID'])
  
  updateSeasonComparisonPageContent(
    season_comparison_data_2_left, season_comparison_data_2_right,
    glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'],
    glVSeasonComparison['leftFullName'], glVSeasonComparison['rightFullName'],
    glVSeasonComparison['leftColor'], glVSeasonComparison['rightColor'],
    glVSeasonComparison['leftTeam'], glVSeasonComparison['rightTeam'],
    glVSeasonComparison['leftNumber'], glVSeasonComparison['rightNumber']
  )

  let title = getElement(dropdown13TitleCenterID)
  title.textContent = team
  title.setAttribute('index', index)

  let titleLeft = getElement(dropdown13TitleLeftID)
  let titleRight = getElement(dropdown13TitleRightID)

  titleLeft.textContent = glVSeasonComparison['leftFullName']
  titleRight.textContent = glVSeasonComparison['rightFullName']

}


function dropdown13CenterNavMouseUp(element) {

  let itemID = dropdownNavItemGetID(element, dropdown14IDItemIndexes)
  dropdown13CenterItemMouseUp(itemID)
  
}


function dropdown13Fill(dropdownID) {

  // item attributes
  let itemAttributes = {
    'driverIDT': seasonDriverIDTs,
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdownID,
    'items': seasonFullNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let title

  if (dropdownID.includes('left')) {

    title = getElement(dropdown13TitleLeftID)
    title.textContent = glVSeasonComparison['leftFullName']
    
  } else {

    title = getElement(dropdown13TitleRightID)
    title.textContent = glVSeasonComparison['rightFullName']

  }

}


function dropdown13ItemMouseUp(element, elementID) {

  if (elementID.includes('left')) {

    glVSeasonComparison['leftIDT'] = element.getAttribute('driverIDT')

    seasonComparisonUpdateAllByDriverIDT()

    let title = getElement(dropdown13TitleLeftID)
    title.textContent = glVSeasonComparison['leftFullName']
    
  } else if (elementID.includes('right')) {

    glVSeasonComparison['rightIDT'] = element.getAttribute('driverIDT')

    seasonComparisonUpdateAllByDriverIDT()

    let title = getElement(dropdown13TitleRightID)
    title.textContent = glVSeasonComparison['rightFullName']
    
  }

  let titleCenter = getElement(dropdown13TitleCenterID)

  if (glVSeasonComparison['leftTeamID'] == glVSeasonComparison['rightTeamID']) {
    titleCenter.textContent = glVSeasonComparison['leftTeam']
  } else {
    titleCenter.textContent = 'Выберите команду'
  }

  updateSeasonComparisonPageContent(
    season_comparison_data_2_left, season_comparison_data_2_right,
    glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'],
    glVSeasonComparison['leftFullName'], glVSeasonComparison['rightFullName'],
    glVSeasonComparison['leftColor'], glVSeasonComparison['rightColor'],
    glVSeasonComparison['leftTeam'], glVSeasonComparison['rightTeam'],
    glVSeasonComparison['leftNumber'], glVSeasonComparison['rightNumber']
  )

}


function dropdown14Fill() {

  let dropdownMetrics = dropdown14Data.map(o => o['metric'])
  let dropdownLabels = dropdown14Data.map(o => o['label'])

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'metric': dropdownMetrics,
    'label': dropdownLabels
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown14ID,
    'items': dropdownLabels,
    'attributes': itemAttributes,
    // 'width': true,
    // 'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let title = getElement(dropdown14TitleID)
  let label = dropdownLabels[0]

  // dropdown label
  title.textContent = label
  title.setAttribute('metric', dropdownMetrics[0])
  title.setAttribute('label', label)
  
}


function dropdown14MouseUp(element) {

  let title = getElement(dropdown14TitleID)
  let label = element.getAttribute('label')

  title.textContent = label
  title.setAttribute('metric', element.getAttribute('metric'))
  title.setAttribute('label', label)

  seasonDriversUpdateChart1(
    season_data_1, season_data_2,
    glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'],
    glVSeasonComparison['leftColor'], glVSeasonComparison['rightColor']
  )

  seasonComparisonSliderActivate()

  sliderTooltipFill(
    seasonComparisonDataLeft,
    seasonComparisonDataRight,
    seasonComparisonDataDiff,
    glVSeasonComparison['leftColor'],
    glVSeasonComparison['rightColor'],
    seasonComparisonSliderData['metrics'],
    seasonComparisonSliderData['type'],
    kind='full',
    seasonComparisonSliderData['subType'],
  )

}


// function seasonComparisonDescCloseAll(element) {

//   seasonComparisonChartDescTablesIDs.forEach((id, i) => {

//     let elementLocal = getElement(id)

//     let con1 = !elementLocal.id.includes(element.id)
//     let con2 = !elementLocal.classList.contains('invisible')

//     if (con1 && con2) {
      
//       document.body.classList.remove('o-hidden')
//       elementLocal.classList.add('invisible')
      
//     }
    
//   })
  
// }


function seasonComparisonDescChartsFill() {

  seasonComparisonDescChart5Fill()
  
}


function seasonComparisonDescChart5Fill() {

  getElement(seasonPaceChart5DescContentID).innerHTML = chartDescBodyChart5

  let img1 = getElement(seasonPaceChart5DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-5-iaem6t-1.svg`

  let img2 = getElement(seasonPaceChart5DescImg2ID)
  img2.src = `img/chart-descriptions/${themeCurrent}/chart-5-iaem6t-2.png`

  let img3 = getElement(seasonPaceChart5DescImg3ID)
  img3.src = `img/chart-descriptions/${themeCurrent}/chart-5-iaem6t-3.svg`
    
}


function seasonComparisonUpdateBadge(driverIDT, name, color, team, number, kind) {

  let imgContainerID
  let nameElementID
  let teamElementID

  if (kind == 'left') {
    
    imgContainerID = seasonDriversImageLeftID
    nameElementID = seasonDriversNameLeftID
    teamElementID = seasonDriversTeamLeftID
    
  } else if (kind == 'right') {
    
    imgContainerID = seasonDriversImageRightID
    nameElementID = seasonDriversNameRightID
    teamElementID = seasonDriversTeamRightID
    
  }

  let img = getElement(imgContainerID)
  let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + driverIDT + imagesFormat
  
  let nameElement = getElement(nameElementID)
  let teamElement = getElement(teamElementID)
  
  if (driverIDT) {

    img.children[0].classList.remove('img-error')
    img.children[0].src = imgPath
    
    nameElement.textContent = name
    nameElement.style.color = color

    teamElement.textContent = `#${number} ${team}`
    
  } else {

    img.children[0].src = imgPath

    nameElement.textContent = ''
    nameElement.style.color = '#AAAAAA'

    teamElement.textContent = ''
    
  }

}


function seasonComparisonFillLegend(leftName, leftColor, rightName, rightColor) {

  let leftMarker = getElement(seasonComparisonLegendMarkerLeftID)
  let leftNameEl = getElement(seasonComparisonLegendNameLeftID)
  
  let rightMarker = getElement(seasonComparisonLegendMarkerRightID)
  let rightNameEl = getElement(seasonComparisonLegendNameRightID)

  let leftMarkerStat = getElement(seasonComparisonStatisticsLegendMarkerLeftID)
  let leftNameElStat = getElement(seasonComparisonStatisticsLegendNameLeftID)
  
  let rightMarkerStat = getElement(seasonComparisonStatisticsLegendMarkerRightID)
  let rightNameElStat = getElement(seasonComparisonStatisticsLegendNameRightID)

  leftMarker.style.background = leftColor
  leftMarkerStat.style.background = leftColor

  rightMarker.style.background = rightColor
  rightMarkerStat.style.background = rightColor

  if (leftName == '-') {
    
    leftNameEl.textContent = ''
    leftNameElStat.textContent = ''
    
  } else {
    
    leftNameEl.textContent = leftName
    leftNameElStat.textContent = leftName
    
  }

  if (rightName == '-') {
    
    rightNameEl.textContent = ''
    rightNameElStat.textContent = ''
    
  } else {
    
    rightNameEl.textContent = rightName
    rightNameElStat.textContent = rightName
    
  }

}


function seasonComparisonDownloadAllCharts(elementID, event) {

  let element = getElement(elementID)
  let type = element.getAttribute('download_type')

  let svg = getElement(seasonComparisonDownloadChartsSVGID)

  let chart1G = getElement(seasonComparisonMainChartSVG1ID)
  let chart2G = getElement(seasonComparisonMainChartSVG2ID)

  let chart1Gcopy = chart1G.cloneNode(true)
  let chart2Gcopy = chart2G.cloneNode(true)

  let chart1GSizes = getSizes(chart1G)
  let chart1GWidth = chart1GSizes.width
  let chart1GHeight = chart1GSizes.height

  let chart2GSizes = getSizes(chart2G)
  let chart2GHeight = chart2GSizes.height

  let axisBottom2Real = chart2G.querySelector('#' + seasonComparisonChartAxisBottom2ID)
  let axisBottom2RealSizes = getSizes(axisBottom2Real)
  let axisBottom2RealHeight = axisBottom2RealSizes.height
  
  let axisBottom2 = chart2Gcopy.querySelector('#' + seasonComparisonChartAxisBottom2ID)
  let axisBottomHeight2 = getSizes(axisBottom2).height

  chart2GHeight -= axisBottom2RealHeight
  chart2Gcopy.style.height = chart2GHeight

  axisBottom2.remove()
  
  svg.appendChild(chart1Gcopy)
  svg.appendChild(chart2Gcopy)

  chart2Gcopy.setAttribute('transform', `translate(0, ${chart1GHeight})`)

  svg.style.width = chart1GWidth
  svg.style.height = chart1GHeight + chart2GHeight

  let filename = element.getAttribute('download_name')

  if (type == 'svg') {
    downloadD3SvgAsSVG(seasonComparisonDownloadChartsSVGID, filename)
  } else if (type == 'png') {
    downloadD3SvgAsPNG(seasonComparisonDownloadChartsSVGID, filename)
  }

  clearElement(svg)

  svg.style.width = 0
  svg.style.height = 0
  
}


function seasonDriversUpdateChart1(data1, data2, driverIDTLeft, driverIDTRight, colorLeft, colorRight) {

  // data1 -> season_data_1
  // data2 -> season_data_2

  let metric = getElement(dropdown14TitleID).getAttribute('metric')
  let chart = dropdown14Data.filter(o => o['metric'] == metric)[0]['chart']

  if (chart == 5) {

    chart_5(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      seasonComparisonMainChartID
    )
    
  } else if (chart == 6) {

    chart_6(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      seasonComparisonMainChartID
    )
    
  } else if (chart == 7) {

    chart_7(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      seasonComparisonMainChartID
    )
    
  } else if (chart == 8) {

    chart_8(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      seasonComparisonMainChartID
    )
    
  }

}


function seasonDriversDataAvailableCheck(value, sprintIndex) {

  let result

  if (sprintIndex == 2) {

    result = (value[2] == '1') ? true : false

  } else if (sprintIndex == 1) {
    
    result = (value[1] == '1') ? true : false
    
  } else if (sprintIndex == 0) {
    
    result = (value[0] == '1') ? true : false
    
  }

  return result
  
}


function sliderTooltipFill(
    dataLeft, dataRight, dataDiff, colorLeft, colorRight,
    metrics, type, kind, subType) {

  let metric = metrics['Average']

  let coordIndexesSelected = range(
    seasonComparisonSliderData['minIdx'],
    seasonComparisonSliderData['maxIdx'] + 1
  )

  let eventNames = [
    seasonComparisonSliderData['minEventName'],
    seasonComparisonSliderData['maxEventName']
  ]

  let emptyValue = ''

  let dataLeftFiltered = dataLeft.filter(o => coordIndexesSelected.includes(o['CoordIndex']))
  let dataRightFiltered = dataRight.filter(o => coordIndexesSelected.includes(o['CoordIndex']))

  let metricLeft = dataLeftFiltered.map(o => o[metric]).map(Number).filter(notNaN)
  let metricRight = dataRightFiltered.map(o => o[metric]).map(Number).filter(notNaN)
  
  let metricLeftCorrect = (metricLeft.length > 1)
  let metricLeftOneValue = (metricLeft.length == 1)
  let metricLeftNaN = (((metricLeft.length == 1) && !isNumeric(metricLeft[0])) || ((metricLeft.length == 0)))

  let metricRightCorrect = (metricRight.length > 1)
  let metricRightOneValue = (metricRight.length == 1)
  let metricRightNaN = (((metricRight.length == 1) && !isNumeric(metricRight[0])) || (metricRight.length == 0))

  let metricLeftAverage
  let metricRightAverage
  let metricAverageDelta

  let metricLeftMedian
  let metricRightMedian
  let metricMedianDelta

  let metricLeftMin
  let metricRightMin
  let metricMinDelta

  let metricLeftMax
  let metricRightMax
  let metricMaxDelta

  let metricLeftStd
  let metricRightStd
  let metricStdDelta

  let metricDiffLeft
  let metricDiffRight
  let metricDiffDelta

  let metricLeftStintLength
  let metricRightStintLength
  let metricStintLengthDelta

  let tooltipTitle1 = getElement(seasonComparisonSliderEventFirstID)
  let tooltipTitle2 = getElement(seasonComparisonSliderEventLastID)
  let refreshIcon = getElement(seasonComparisonSliderRefresherID)

  tooltipTitle1.textContent = firstElement(eventNames)
  tooltipTitle2.textContent = lastElement(eventNames)

  if (kind == 'full') {

    let label0 = getElement('wm13qbey')
    let label1 = getElement('y045ulke')
    let label2 = getElement('zeqq0liw')
    let label3 = getElement('j4f2osp8')
    let label4 = getElement('t8aily60')
    let label5 = getElement('vcgkxxa7')
    let label6 = getElement('prfvd03t')

    if (type == 'average') {

      label0.textContent = 'СРЕДНЕЕ ЗНАЧЕНИЕ'
      label1.textContent = 'ЛУЧШИЙ РЕЗУЛЬТАТ'
      label2.textContent = 'ХУДШИЙ РЕЗУЛЬТАТ'
      label3.textContent = 'РАЗБРОС'
      label4.textContent = 'ОЖИДАЕМОЕ ЗНАЧЕНИЕ'
      label5.textContent = 'ЛУЧШЕ ОППОНЕНТА'
      label6.textContent = 'ДЛИНА ОТРЕЗКА'
      
    } else if (type == 'cumulative') {

      label0.textContent = 'СРЕДНЕЕ'
      label1.textContent = 'НАЧАЛО ОТРЕЗКА'
      label2.textContent = 'СУММА'
      label3.textContent = 'КОНЕЦ ОТРЕЗКА'
      label6.textContent = 'ДЛИНА ОТРЕЗКА'
      
    }

  }

  let valueLeft0 = getElement('say2l7si')
  let valueRight0 = getElement('t1b0x3rl')
  let valueDelta0 = getElement('uk07khe1')

  let valueLeft1 = getElement('uw1q4ud4')
  let valueRight1 = getElement('br6xybkp')
  let valueDelta1 = getElement('tvyu31si')

  let valueLeft2 = getElement('o7c4nc5c')
  let valueRight2 = getElement('a2240qhn')
  let valueDelta2 = getElement('spcmgfl7')

  let valueLeft3 = getElement('ld617048')
  let valueRight3 = getElement('rx7k86gw')
  let valueDelta3 = getElement('gg578ded')

  let valueLeft4 = getElement('pcwkmynh')
  let valueRight4 = getElement('fzm00ouo')
  let valueDelta4 = getElement('jebq2drs')

  let valueLeft5 = getElement('zmhbodlq')
  let valueRight5 = getElement('a1kaelds')
  let valueDelta5 = getElement('fl0hw0vb')

  let valueLeft6 = getElement('poh691a2')
  let valueRight6 = getElement('fevtnh98')
  let valueDelta6 = getElement('rbjthadn')

  let element4 = getElement('gwvucfux')
  let element5 = getElement('mdfm1icc')

  // more or les calculate
  let dataDiffFiltered

  if (coordIndexesSelected) {
    dataDiffFiltered = dataDiff.filter(o => coordIndexesSelected.includes(o['CoordIndex']))
  } else {
    dataDiffFiltered = dataDiff
  }
  
  metricDiff = dataDiffFiltered.map(o => o['MetricDiff'])
  metricDiffLeft = metricDiff.filter(o => o > 0).length
  metricDiffRight = metricDiff.filter(o => o < 0).length

  // average calculate
  if (metricLeftCorrect) {

    metricLeftAverage = arrayAverage(metricLeft)
    metricLeftAverage = toFixedWithoutZeroes(metricLeftAverage, 1)
    // metricLeftAverage = metricLeftAverage.toFixed(1)

    metricLeftStintLength = metricLeft.length

  } else if (metricLeftOneValue) {

    metricLeftAverage = metricLeft[0]
    metricLeftAverage = toFixedWithoutZeroes(metricLeftAverage, 1)
    // metricLeftAverage = metricLeftAverage.toFixed(1)

    metricLeftStintLength = metricLeft.length
    
  } else if (metricLeftNaN) {

    metricLeftAverage = emptyValue

    metricLeftStintLength = emptyValue
    
  }

  if (metricRightCorrect) {

    metricRightAverage = arrayAverage(metricRight)
    metricRightAverage = toFixedWithoutZeroes(metricRightAverage, 1)
    // metricRightAverage = metricRightAverage.toFixed(1)

    metricRightStintLength = metricRight.length
    
  } else if (metricRightOneValue) {

    metricRightAverage = metricRight[0]
    metricRightAverage = toFixedWithoutZeroes(metricRightAverage, 1)
    // metricRightAverage = metricRightAverage.toFixed(1)

    metricRightStintLength = metricRight.length
    
  } else if (metricRightNaN) {

    metricRightAverage = emptyValue

    metricRightStintLength = emptyValue
    
  }

  // median, best, worst, deviation
  if (type == 'average') {

    // calculate left values
    if (metricLeftCorrect) {

      metricLeftMedian = arrayMedian(metricLeft)
      metricLeftMedian = toFixedWithoutZeroes(metricLeftMedian, 1)
      // metricLeftMedian = metricLeftMedian.toFixed(1)

      metricLeftMin = arrayMin(metricLeft)
      metricLeftMax = arrayMax(metricLeft)
      
      metricLeftStd = arrayStd(metricLeft)
      metricLeftStd = toFixedWithoutZeroes(metricLeftStd, 2)
      // metricLeftStd = metricLeftStd.toFixed(2)
      
    } else if (metricLeftOneValue) {

      metricLeftMedian = metricLeft[0]
      metricLeftMedian = toFixedWithoutZeroes(metricLeftMedian, 1)
      // metricLeftMedian = metricLeftMedian.toFixed(1)
      
      metricLeftMin = metricLeft[0]
      metricLeftMax = metricLeft[0]
      
      metricLeftStd = emptyValue
      
    } else if (metricLeftNaN) {

      metricLeftMedian = emptyValue
      
      metricLeftMin = emptyValue
      metricLeftMax = emptyValue
      metricLeftStd = emptyValue
      
    }

    // calculate right values
    if (metricRightCorrect) {

      metricRightMedian = arrayMedian(metricRight)
      metricRightMedian = toFixedWithoutZeroes(metricRightMedian, 1)
      // metricRightMedian = metricRightMedian.toFixed(1)
      
      metricRightMin = arrayMin(metricRight)
      metricRightMax = arrayMax(metricRight)
      
      metricRightStd = arrayStd(metricRight)
      metricRightStd = toFixedWithoutZeroes(metricRightStd, 2)
      // metricRightStd = metricRightStd.toFixed(2)
      
    } else if (metricRightOneValue) {

      metricRightMedian = metricRight[0]
      metricRightMedian = toFixedWithoutZeroes(metricRightMedian, 1)
      // metricRightMedian = metricRightMedian.toFixed(1)
      
      metricRightMin = metricRight[0]
      metricRightMax = metricRight[0]
      
      metricRightStd = emptyValue
      
    } else if (metricRightNaN) {

      metricRightMedian = emptyValue
      
      metricRightMin = emptyValue
      metricRightMax = emptyValue
      metricRightStd = emptyValue
      
    }

    // fill values
    if (subType == 'lower') {

      valueLeft1.textContent = metricLeftMin
      valueLeft1.style.color = colorLeft
      
      valueRight1.textContent = metricRightMin
      valueRight1.style.color = colorRight

      valueLeft2.textContent = metricLeftMax
      valueLeft2.style.color = colorLeft
      
      valueRight2.textContent = metricRightMax
      valueRight2.style.color = colorRight

      valueLeft5.textContent = metricDiffLeft
      valueLeft5.style.color = colorLeft

      valueRight5.textContent = metricDiffRight
      valueRight5.style.color = colorRight

      metricDiffDelta = metricDiffLeft - metricDiffRight

    } else if (subType == 'higher') {

      valueLeft2.textContent = metricLeftMin
      valueLeft2.style.color = colorLeft
      
      valueRight2.textContent = metricRightMin
      valueRight2.style.color = colorRight

      valueLeft1.textContent = metricLeftMax
      valueLeft1.style.color = colorLeft
      
      valueRight1.textContent = metricRightMax
      valueRight1.style.color = colorRight

      valueLeft5.textContent = metricDiffRight
      valueLeft5.style.color = colorLeft

      valueRight5.textContent = metricDiffLeft
      valueRight5.style.color = colorRight

      metricDiffDelta = metricDiffRight - metricDiffLeft
      
    }

    valueLeft3.textContent = metricLeftStd
    valueLeft3.style.color = colorLeft
    
    valueRight3.textContent = metricRightStd
    valueRight3.style.color = colorRight

    valueLeft4.textContent = metricLeftMedian
    valueLeft4.style.color = colorLeft
    
    valueRight4.textContent = metricRightMedian
    valueRight4.style.color = colorRight

    // deltas calculate
    metricMedianDelta = (metricLeftMedian - metricRightMedian)
    metricMedianDelta = toFixedWithoutZeroes(metricMedianDelta, 1)
    // metricMedianDelta = metricMedianDelta.toFixed(1)
    
    metricMinDelta = (metricLeftMin - metricRightMin)
    metricMaxDelta = (metricLeftMax - metricRightMax)
    
    metricStdDelta = (metricLeftStd - metricRightStd)
    metricStdDelta = toFixedWithoutZeroes(metricStdDelta, 2)
    // metricStdDelta = metricStdDelta.toFixed(2)

    // deltas NaN management
    if (isNaN(metricMedianDelta)) {metricMedianDelta = emptyValue}
    if (isNaN(metricMinDelta)) {metricMinDelta = emptyValue}
    if (isNaN(metricMaxDelta)) {metricMaxDelta = emptyValue}
    if (isNaN(metricStdDelta)) {metricStdDelta = emptyValue}

    // deltas fill
    valueDelta1.textContent = metricMinDelta
    valueDelta2.textContent = metricMaxDelta
    valueDelta3.textContent = metricStdDelta
    valueDelta4.textContent = metricMedianDelta
    valueDelta5.textContent = metricDiffDelta

    // if ((metricDiffLeft == 0) && (metricDiffRight == 0)) {
      
    //   valueLeft5.textContent = emptyValue
    //   valueRight5.textContent = emptyValue
    //   valueDelta5.textContent = emptyValue
      
    // }

    element4.classList.remove('invisible')
    element5.classList.remove('invisible')

  // start, end, sum
  } else if (type == 'cumulative') {

    let metricCumulative = metrics['Cumulative']

    let metricLeftC = dataLeftFiltered.map(o => o[metricCumulative]).map(Number).filter(notNaN)
    let metricRightC = dataRightFiltered.map(o => o[metricCumulative]).map(Number).filter(notNaN)

    let metricFirstLeft = metricLeft[0]
    let metricFirstRight = metricRight[0]

    let metricLeftSum
    let metricRightSum
    let metricSumDelta

    let metricLeftStart
    let metricRightStart
    let metricStartDelta
    
    let metricLeftEnd
    let metricRightEnd
    let metricEndDelta

    // calculate left values
    if (metricLeftCorrect) {

      metricLeftSum = arraySum(metricLeft)
      metricLeftSum = toFixedWithoutZeroes(metricLeftSum, 1)
      
      metricLeftStart = metricLeftC[0] - metricFirstLeft
      metricLeftStart = toFixedWithoutZeroes(metricLeftStart, 1)
      
      metricLeftEnd = lastElement(metricLeftC)
      metricLeftEnd = toFixedWithoutZeroes(metricLeftEnd, 1)
      
    } else if (metricLeftOneValue) {
      
      metricLeftSum = metricLeft[0]
      metricLeftSum = toFixedWithoutZeroes(metricLeftSum, 1)
      
      metricLeftStart = metricLeftC[0] - metricFirstLeft
      metricLeftStart = toFixedWithoutZeroes(metricLeftStart, 1)
      
      metricLeftEnd = metricLeftC[0]
      metricLeftEnd = toFixedWithoutZeroes(metricLeftEnd, 1)
      
    } else if (metricLeftNaN) {
      
      metricLeftSum = emptyValue
      metricLeftStart = emptyValue
      metricLeftEnd = emptyValue
      
    }

    // calculate right values
    if (metricRightCorrect) {

      metricRightSum = arraySum(metricRight)
      metricRightSum = toFixedWithoutZeroes(metricRightSum, 1)
      
      metricRightStart = metricRightC[0] - metricFirstRight
      metricRightStart = toFixedWithoutZeroes(metricRightStart, 1)
      
      metricRightEnd = lastElement(metricRightC)
      metricRightEnd = toFixedWithoutZeroes(metricRightEnd, 1)
      
    } else if (metricRightOneValue) {
      
      metricRightSum = metricRight[0]
      metricRightSum = toFixedWithoutZeroes(metricRightSum, 1)
      
      metricRightStart = metricRightC[0] - metricFirstRight
      metricRightStart = toFixedWithoutZeroes(metricRightStart, 1)
      
      metricRightEnd = metricRightC[0]
      metricRightEnd = toFixedWithoutZeroes(metricRightEnd, 1)
      
    } else if (metricRightNaN) {
      
      metricRightSum = emptyValue
      metricRightStart = emptyValue
      metricRightEnd = emptyValue
      
    }

    // values fill
    valueLeft1.textContent = metricLeftStart
    valueLeft1.style.color = colorLeft
    
    valueRight1.textContent = metricRightStart
    valueRight1.style.color = colorRight

    valueLeft2.textContent = metricLeftSum
    valueLeft2.style.color = colorLeft
    
    valueRight2.textContent = metricRightSum
    valueRight2.style.color = colorRight

    valueLeft3.textContent = metricLeftEnd
    valueLeft3.style.color = colorLeft
    
    valueRight3.textContent = metricRightEnd
    valueRight3.style.color = colorRight

    // fill values
    if (subType == 'higher') {

      valueLeft5.textContent = metricDiffLeft
      valueLeft5.style.color = colorLeft

      valueRight5.textContent = metricDiffRight
      valueRight5.style.color = colorRight

      metricDiffDelta = metricDiffLeft - metricDiffRight
      
    } else if (subType == 'lower') {

      valueLeft5.textContent = metricDiffRight
      valueLeft5.style.color = colorLeft

      valueRight5.textContent = metricDiffLeft
      valueRight5.style.color = colorRight

      metricDiffDelta = metricDiffRight - metricDiffLeft
      
    }

    // deltas calculate
    metricSumDelta = (metricLeftSum - metricRightSum)
    metricSumDelta = toFixedWithoutZeroes(metricSumDelta, 1)
    
    metricStartDelta = (metricLeftStart - metricRightStart)
    metricStartDelta = toFixedWithoutZeroes(metricStartDelta, 1)
    
    metricEndDelta = (metricLeftEnd - metricRightEnd)
    metricEndDelta = toFixedWithoutZeroes(metricEndDelta, 1)

    // deltas NaN management
    if (isNaN(metricSumDelta)) {metricSumDelta = emptyValue}
    if (isNaN(metricStartDelta)) {metricStartDelta = emptyValue}
    if (isNaN(metricEndDelta)) {metricEndDelta = emptyValue}

    // deltas fill
    valueDelta1.textContent = metricStartDelta
    valueDelta2.textContent = metricSumDelta
    valueDelta3.textContent = metricEndDelta
    valueDelta5.textContent = metricDiffDelta
    
    element4.classList.add('invisible')
    element5.classList.add('invisible')
    
  }

  // average
  valueLeft0.textContent = metricLeftAverage
  valueLeft0.style.color = colorLeft
  
  valueRight0.textContent = metricRightAverage
  valueRight0.style.color = colorRight

  // stint length
  valueLeft6.textContent = metricLeftStintLength
  valueLeft6.style.color = colorLeft

  valueRight6.textContent = metricRightStintLength
  valueRight6.style.color = colorRight

  // delta average
  metricAverageDelta = (metricLeftAverage - metricRightAverage)
  metricAverageDelta = toFixedWithoutZeroes(metricAverageDelta, 1)

  metricStintLengthDelta = (metricLeftStintLength - metricRightStintLength)
  metricStintLengthDelta = toFixedWithoutZeroes(metricStintLengthDelta, 1)

  // delta average NaN management
  if (isNaN(metricAverageDelta)) {metricAverageDelta = emptyValue}
  if (isNaN(metricStintLengthDelta)) {metricStintLengthDelta = emptyValue}

  // delta average fill
  valueDelta0.textContent = metricAverageDelta
  valueDelta6.textContent = metricStintLengthDelta

  if ((metricDiffLeft == 0) && (metricDiffRight == 0)) {
      
    valueLeft5.textContent = emptyValue
    valueRight5.textContent = emptyValue
    valueDelta5.textContent = emptyValue
    
  }

}


function seasonComparisonSliderValidateMin(sliderMin, sliderMax) {
  if (parseInt(sliderMin.value) >= parseInt(sliderMax.value)) {
    sliderMin.value = sliderMax.value - 1; // Enforce gap
  }
}

function seasonComparisonSliderValidateMax(sliderMin, sliderMax) {
  if (parseInt(sliderMax.value) <= parseInt(sliderMin.value)) {
    sliderMax.value = parseInt(sliderMin.value) + 1; // Enforce gap
  }
}


function seasonComparisonSliderCreate(sliderContainer, svg, xBottom, dataLeft, dataRight) {

  // find left margin and length of slider
  // depending on position first and last tick of axis-bottom
  let ticks = getElement(seasonComparisonChartTicksID)
  ticks = arrayFromChildren(ticks)

  let tick1 = ticks[0]
  let tick1Sizes = getSizes(tick1)

  let tick2 = lastElement(ticks)
  let tick2Sizes = getSizes(tick2)

  let svgEl = d3GetElement(svg)
  let svgElSizes = getSizes(svgEl)

  let sliderMarginLeft = tick1Sizes.left - svgElSizes.left
  let sliderWidth = tick2Sizes.left - tick1Sizes.left

  // create slider
  let svgNS = 'http://www.w3.org/2000/svg'

  let sliderTrack = document.createElementNS(svgNS, 'svg')
  sliderTrack.classList.add('slider-track')
  sliderTrack.id = seasonComparisonSliderTrackID

  let sliderLine = document.createElementNS(svgNS, 'line')
  sliderLine.classList.add('slider-line')
  sliderLine.id = seasonComparisonSliderLineID

  let sliderLineColored = document.createElementNS(svgNS, 'line')
  sliderLineColored.classList.add('slider-line', 'slider-line-colored')
  sliderLineColored.id = seasonComparisonSliderLineColoredID

  let sliderCircles = document.createElementNS(svgNS, 'g')
  sliderCircles.id = seasonComparisonSliderCirclesID
  
  let sliderLabelsLeft = document.createElementNS(svgNS, 'g')
  sliderLabelsLeft.classList.add('slider-labels-left')
  sliderLabelsLeft.id = seasonComparisonSliderLabelsLeftID

  let sliderLabelsRight = document.createElementNS(svgNS, 'g')
  sliderLabelsRight.classList.add('slider-labels-right')
  sliderLabelsRight.id = seasonComparisonSliderLabelsRightID

  let sliderLegendCirclesLeft = document.createElementNS(svgNS, 'g')
  sliderLegendCirclesLeft.classList.add('slider-legend-circles', 'slider-labels-left')

  let sliderLegendCirclesRight = document.createElementNS(svgNS, 'g')
  sliderLegendCirclesRight.classList.add('slider-legend-circles', 'slider-labels-right')

  let sliderMin = document.createElement('input')
  sliderMin.type = 'range'
  sliderMin.id = seasonComparisonSliderMinID
  // sliderMin.classList.add('slider-min')

  let sliderMax = document.createElement('input')
  sliderMax.type = 'range'
  sliderMax.id = seasonComparisonSliderMaxID
  // sliderMax.classList.add('slider-max')

  sliderTrack.appendChild(sliderCircles)
  sliderTrack.appendChild(sliderLabelsLeft)
  sliderTrack.appendChild(sliderLabelsRight)
  sliderTrack.appendChild(sliderLegendCirclesLeft)
  sliderTrack.appendChild(sliderLegendCirclesRight)
  sliderTrack.appendChild(sliderLine)
  sliderTrack.appendChild(sliderLineColored)

  sliderContainer.appendChild(sliderTrack)
  sliderContainer.appendChild(sliderMin)
  sliderContainer.appendChild(sliderMax)

  // fill slider
  let ticklabels = getElement(seasonComparisonChartLabelsID)
  ticklabels = arrayFromChildren(ticklabels)

  let sliderItemsFreq = ticklabels.length

  let sliderLabelsOffsetY = px12

  let sliderCirclesOffsetX = px24
  let sliderCirclesOffsetY = px12
  let sliderCirclesLegendCoordXs = []

  let min = 0
  let max = sliderItemsFreq - 1

  let valueMin = seasonComparisonSliderData['minIdx'] ?? min
  let valueMax = seasonComparisonSliderData['maxIdx'] ?? max

  seasonComparisonSliderData['minIdx'] = valueMin
  seasonComparisonSliderData['maxIdx'] = valueMax

  sliderMin.setAttribute('min', min)
  sliderMin.setAttribute('max', max)
  sliderMin.setAttribute('value', valueMin)
  sliderMin.value = valueMin

  sliderMax.setAttribute('min', min)
  sliderMax.setAttribute('max', max)
  sliderMax.setAttribute('value', valueMax)
  sliderMax.value = valueMax

  let sliderStyle = getStyle(sliderMin)

  let pointWidth = sliderStyle.getPropertyValue('--slider-point-width')
  pointWidth = convertRemToPixels(pointWidth.replace('rem', ''))
  pointWidthHalf = 0.5*pointWidth

  seasonComparisonSliderData['thumbWidthHalf'] = pointWidthHalf

  let sliderContainerWidth = Math.ceil (sliderWidth + pointWidth)
  sliderContainer.style.width = `${sliderContainerWidth}px`
  sliderContainer.style.marginLeft = `${sliderMarginLeft - pointWidthHalf}px`

  let sliderTrackSizes = getSizes(sliderTrack)
  let sliderTrackWidth = sliderTrackSizes.width

  let sliderActiveArea = sliderTrackWidth - pointWidth
  let step = sliderActiveArea / (sliderItemsFreq - 1)
  
  sliderLine.setAttribute('x1', pointWidthHalf)
  sliderLine.setAttribute('x2', sliderTrackWidth - pointWidthHalf)

  sliderLine.setAttribute('y1', '50%')
  sliderLine.setAttribute('y2', '50%')

  sliderLineColored.setAttribute('x1', pointWidthHalf)
  sliderLineColored.setAttribute('x2', sliderTrackWidth - pointWidthHalf)

  sliderLineColored.setAttribute('y1', '50%')
  sliderLineColored.setAttribute('y2', '50%')

  seasonComparisonSliderSeries = []

  ticklabels.forEach((ticklabel, i) => {

    let coordIndex = ticklabel.getAttribute('CoordIndex')

    let coordX = i * step + pointWidthHalf
    let coordXDec = coordX

    // important: coordinates correction for correct rendering
    let coordXRounded = Math.round(coordX)

    // important: coordinates correction for correct rendering
    if (coordX < coordXRounded) {
      coordX = Math.floor(coordX)
    } else {
      coordX = Math.round(coordX)
    }

    if (i == 0) {
      
      sliderCirclesLegendCoordXs.push(coordX)
      seasonComparisonSliderData['minCoordXDec'] = coordXDec
      seasonComparisonSliderData['minEventName'] ||= ticklabel.getAttribute('eventName')
      
    } else if (i == sliderItemsFreq-1) {
      
      sliderCirclesLegendCoordXs.push(coordX)
      seasonComparisonSliderData['maxCoordXDec'] = coordXDec
      seasonComparisonSliderData['maxEventName'] ||= ticklabel.getAttribute('eventName')
      
    }

    seasonComparisonSliderSeries.push({
      'idx': coordIndex,
      'coordX': coordX, 
      'coordXDec': coordXDec,
      'eventName': ticklabel.getAttribute('eventName')
    })

    let tickCircle = document.createElementNS(svgNS, 'circle')

    tickCircle.classList.add('slider-circle', 'slider-circle-colored')
    tickCircle.setAttribute('r', '0.125rem')
    tickCircle.setAttribute('cx', `${coordX}px`)
    tickCircle.setAttribute('cy', '50%')
    tickCircle.setAttribute('value', i)
    tickCircle.setAttribute('coordX', coordX)

    sliderCircles.appendChild(tickCircle)

    let tickLabelLeft = document.createElementNS(svgNS, 'text')

    tickLabelLeft.setAttribute('x', `${coordX}`)
    tickLabelLeft.setAttribute('y', `${-sliderLabelsOffsetY + px1}`)

    tickLabelLeft.textContent = ticklabel.getAttribute('metricLeft')
    tickLabelLeft.setAttribute('fill', colorThemesChartFont7)
    tickLabelLeft.setAttribute('font-size', px10)
    tickLabelLeft.setAttribute('text-anchor', 'middle')
    tickLabelLeft.setAttribute('dominant-baseline', 'auto')
    tickLabelLeft.style.fontVariationSettings = "'wght' 650"
    tickLabelLeft.setAttribute('value', i)

    sliderLabelsLeft.appendChild(tickLabelLeft)

    let tickLabelRight = document.createElementNS(svgNS, 'text')

    tickLabelRight.setAttribute('x', `${coordX}`)
    tickLabelRight.setAttribute('y', `${sliderLabelsOffsetY}`)

    tickLabelRight.textContent = ticklabel.getAttribute('metricRight')
    tickLabelRight.setAttribute('fill', colorThemesChartFont7)
    tickLabelRight.setAttribute('font-size', px10)
    tickLabelRight.setAttribute('text-anchor', 'middle')
    tickLabelRight.setAttribute('dominant-baseline', 'hanging')
    tickLabelRight.style.fontVariationSettings = "'wght' 650"
    tickLabelRight.setAttribute('value', i)

    sliderLabelsRight.appendChild(tickLabelRight)

  })

  sliderCirclesLegendCoordXs.forEach((coord, i) => {

    let coordX

    if (i == 0) {
      coordX = coord - sliderCirclesOffsetX
    } else {
      coordX = coord + sliderCirclesOffsetX
    }

    let legendCircleLeft = document.createElementNS(svgNS, 'circle')
    let leftColor = glVSeasonComparison['leftColor']
    
    legendCircleLeft.classList.add('slider-legend-circle')
    legendCircleLeft.setAttribute('fill', leftColor)
    legendCircleLeft.setAttribute('cx', `${coordX}`)
    legendCircleLeft.setAttribute('cy', `${-sliderCirclesOffsetY + px1}`)

    sliderLegendCirclesLeft.appendChild(legendCircleLeft)

    let legendCircleRight = document.createElementNS(svgNS, 'circle')
    let rightColor = glVSeasonComparison['rightColor']
    
    legendCircleRight.classList.add('slider-legend-circle')
    legendCircleRight.setAttribute('fill', rightColor)
    legendCircleRight.setAttribute('cx', `${coordX}`)
    legendCircleRight.setAttribute('cy', `${sliderCirclesOffsetY}`)

    sliderLegendCirclesRight.appendChild(legendCircleRight)
    
  })

  sliderMin.addEventListener('input', (event) => {

    let minIdx = Number(event.target.value)

    seasonComparisonSliderData['on'] = true
    seasonComparisonSliderValidateMin(sliderMin, sliderMax)
    seasonComparisonSliderParamsUpdate(minIdx, seasonComparisonSliderData['maxIdx'])
    
    seasonComparisonSliderActivate()

    sliderTooltipFill(
      seasonComparisonDataLeft,
      seasonComparisonDataRight,
      seasonComparisonDataDiff,
      glVSeasonComparison['leftColor'],
      glVSeasonComparison['rightColor'],
      seasonComparisonSliderData['metrics'],
      seasonComparisonSliderData['type'],
      kind='values',
      seasonComparisonSliderData['subType'],
    )

  })

  sliderMax.addEventListener('input', (event) => {

    let maxIdx = Number(event.target.value)

    seasonComparisonSliderData['on'] = true
    seasonComparisonSliderValidateMax(sliderMin, sliderMax)
    seasonComparisonSliderParamsUpdate(seasonComparisonSliderData['minIdx'], maxIdx)
    
    seasonComparisonSliderActivate()

    sliderTooltipFill(
      seasonComparisonDataLeft,
      seasonComparisonDataRight,
      seasonComparisonDataDiff,
      glVSeasonComparison['leftColor'],
      glVSeasonComparison['rightColor'],
      seasonComparisonSliderData['metrics'],
      seasonComparisonSliderData['type'],
      kind='values',
      seasonComparisonSliderData['subType'],
    )
    
  })

  sliderMin.addEventListener('change', (event) => {
    seasonComparisonSliderMouseUp('min')
  })

  sliderMax.addEventListener('change', (event) => {
    seasonComparisonSliderMouseUp('min')
  })

  // sliderMin.style.setProperty('--slider-point-background', colorLeft)
  // sliderMax.style.setProperty('--slider-point-background', colorRight)
  
}


function seasonComparisonSliderParamsUpdate(indexMin, indexMax) {

  let minSeries = seasonComparisonSliderSeries.filter(o => o['idx'] == indexMin)[0]
  let maxSeries = seasonComparisonSliderSeries.filter(o => o['idx'] == indexMax)[0]

  seasonComparisonSliderData['minIdx'] = indexMin
  seasonComparisonSliderData['maxIdx'] = indexMax

  seasonComparisonSliderData['minCoordX'] = minSeries['coordX']
  seasonComparisonSliderData['maxCoordX'] = maxSeries['coordX']

  seasonComparisonSliderData['minCoordXDec'] = minSeries['coordXDec']
  seasonComparisonSliderData['maxCoordXDec'] = maxSeries['coordXDec']

  seasonComparisonSliderData['minEventName'] = minSeries['eventName']
  seasonComparisonSliderData['maxEventName'] = maxSeries['eventName']

}


function seasonComparisonSliderMove(indexMin, indexMax) {

  let sliderMin = getElement(seasonComparisonSliderMinID)
  let sliderMax = getElement(seasonComparisonSliderMaxID)

  let sliderLineColored = getElement(seasonComparisonSliderLineColoredID)
  let circles = childrenToArray(getElement(seasonComparisonSliderCirclesID))

  // slider labels
  let labelsLeft = childrenToArray(getElement(seasonComparisonSliderLabelsLeftID))
  let labelsRight = childrenToArray(getElement(seasonComparisonSliderLabelsRightID))

  // charts labels
  let chartLabelsTop = getElement(seasonComparisonChartLabelsID)
  chartLabelsTop = arrayFromChildren(chartLabelsTop)
  
  let chartLabelsBottom = getElement(seasonComparisonChartLabelsBottomID)
  chartLabelsBottom = arrayFromChildren(chartLabelsBottom)

  // let valuesColored = []
  // let coordsColored = []

  circles.forEach((circle, i) => {
    
    let value = Number(circle.getAttribute('value'))

    if ((value >= indexMin) & (value <= indexMax)) {
      
      // valuesColored.push(value)
      
      // let coord = circle.getAttribute('coordX')
      // coordsColored.push(coord)

      circle.classList.add('slider-circle-colored')
      
    } else {
      circle.classList.remove('slider-circle-colored')
    }
    
  })

  labelsLeft.forEach((label, i) => {

    let value = Number(label.getAttribute('value'))

    if ((value >= indexMin) & (value <= indexMax)) {
      label.classList.remove('slider-label-light')
    } else {
      label.classList.add('slider-label-light')
    }
    
  })

  labelsRight.forEach((label, i) => {

    let value = Number(label.getAttribute('value'))

    if ((value >= indexMin) & (value <= indexMax)) {
      label.classList.remove('slider-label-light')
    } else {
      label.classList.add('slider-label-light')
    }
    
  })

  chartLabelsTop.forEach((label, i) => {

    let value = label.getAttribute('CoordIndex')

    if ((value >= indexMin) & (value <= indexMax)) {
      label.classList.remove('slider-label-light')
    } else {
      label.classList.add('slider-label-light')
    }
      
  })

  chartLabelsBottom.forEach((label, i) => {

    let value = label.getAttribute('CoordIndex')

    if ((value >= indexMin) & (value <= indexMax)) {
      label.classList.remove('slider-label-light')
    } else {
      label.classList.add('slider-label-light')
    }
      
  })

  sliderLineColored.setAttribute('x1', seasonComparisonSliderData['minCoordX'])
  sliderLineColored.setAttribute('x2', seasonComparisonSliderData['maxCoordX'])

  sliderMin.setAttribute('value', indexMin)
  sliderMin.value = indexMin

  sliderMax.setAttribute('value', indexMax)
  sliderMax.value = indexMax

}


function seasonComparisonSliderShadowActivate(indexMin, indexMax) {

  let pointWidthHalf = seasonComparisonSliderData['thumbWidthHalf']

  let shadowRectTop = getElement(seasonComparisonSliderShadowTopID)
  let shadowRectBottom = getElement(seasonComparisonSliderShadowBottomID)

  let paddingOuter = seasonComparisonSliderData['paddingXOuter']
  let step = seasonComparisonSliderData['chartStepX']
  let offsetGridX = seasonComparisonSliderData['offsetGrid']

  let sliderMin = getElement(seasonComparisonSliderMinID)
  let sliderMax = getElement(seasonComparisonSliderMaxID)

  let idxMinGeneral = sliderMin.getAttribute('min')
  let idxMaxGeneral = sliderMin.getAttribute('max')

  let delta
  let deltaWidth

  // make shadow offset equals offsetGrid, when indexMin is 0 and indexsMax is max
  if ((idxMinGeneral == indexMin) & (idxMaxGeneral == indexMax)) {
    delta = paddingOuter - 0.5*step - offsetGridX
    deltaWidth = 2*delta
  } else if (idxMinGeneral == indexMin) {
    delta = paddingOuter - 0.5*step - offsetGridX
    deltaWidth = delta
  } else if (idxMaxGeneral == indexMax) {
    delta = 0
    deltaWidth = paddingOuter - 0.5*step - offsetGridX
  } else {
    delta = 0
    deltaWidth = 0
  }

  let coordX = paddingOuter + indexMin*step - 0.5*step
  let width = paddingOuter + indexMax*step + 0.5*step - coordX

  shadowRectTop.setAttribute('x', coordX - delta)
  shadowRectTop.setAttribute('width', width + deltaWidth)

  shadowRectBottom.setAttribute('x', coordX - delta)
  shadowRectBottom.setAttribute('width', width + deltaWidth)

  shadowRectTop.classList.add('active')
  shadowRectBottom.classList.add('active')

}


function seasonComparisonSliderActivate() {

  if (seasonComparisonSliderData['on']) {

    seasonComparisonSliderMove(seasonComparisonSliderData['minIdx'], seasonComparisonSliderData['maxIdx'])
    seasonComparisonSliderShadowActivate(seasonComparisonSliderData['minIdx'], seasonComparisonSliderData['maxIdx'])
    
  }

}


function seasonComparisonResfresherMouseUp() {

  let sliderMin = getElement(seasonComparisonSliderMinID)
  let sliderMax = getElement(seasonComparisonSliderMaxID)

  let shadowRectTop = getElement(seasonComparisonSliderShadowTopID)
  let shadowRectBottom = getElement(seasonComparisonSliderShadowBottomID)

  let indexMin = Number(sliderMin.getAttribute('min'))
  let indexMax = Number(sliderMin.getAttribute('max'))

  shadowRectTop.classList.remove('active')
  shadowRectBottom.classList.remove('active')

  seasonComparisonSliderParamsUpdate(indexMin, indexMax)
  seasonComparisonSliderMove(indexMin, indexMax)
    
  let paddingOuter = seasonComparisonSliderData['paddingXOuter']
  let step = seasonComparisonSliderData['chartStepX']

  let coordX = paddingOuter + indexMin*step - 0.5*step
  let width = indexMax*step - coordX + step

  shadowRectTop.setAttribute('x', coordX)
  shadowRectTop.setAttribute('width', width)

  shadowRectBottom.setAttribute('x', coordX)
  shadowRectBottom.setAttribute('width', width)

  sliderTooltipFill(
    seasonComparisonDataLeft,
    seasonComparisonDataRight,
    seasonComparisonDataDiff,
    glVSeasonComparison['leftColor'],
    glVSeasonComparison['rightColor'],
    seasonComparisonSliderData['metrics'],
    seasonComparisonSliderData['type'],
    kind='values',
    seasonComparisonSliderData['subType'],
  )

  seasonComparisonSliderData['on'] = false

}


function seasonComparisonSliderMouseOver(kind) {

  let slider
  let color = paleColor(glVSeasonComparison['leftColor'], 0.65)

  if (kind == 'min') {
    slider = getElement(seasonComparisonSliderMinID)
  } else if (kind == 'max') {
    slider = getElement(seasonComparisonSliderMaxID)
  }

  // slider.style.setProperty('--slider-point-background', color)
  
}


function seasonComparisonSliderMouseLeave(kind) {

  let slider

  if (kind == 'min') {
    slider = getElement(seasonComparisonSliderMinID)
  } else if (kind == 'max') {
    slider = getElement(seasonComparisonSliderMaxID)
  }

  // slider.style.setProperty('--slider-point-background', 'var(--color-border-9)')
  
}


function seasonComparisonSliderMouseDown(kind) {

  let slider
  let color = paleColor(glVSeasonComparison['leftColor'], 0.65)

  if (kind == 'min') {
    
    slider = getElement(seasonComparisonSliderMinID)
    
  } else if (kind == 'max') {
    
    slider = getElement(seasonComparisonSliderMaxID)
    
  }

  // slider.style.setProperty('--slider-point-width', '0.625rem')
  // slider.style.setProperty('--slider-point-background', color)
  
}


function seasonComparisonSliderMouseUp(kind) {

  let slider
  let color = paleColor(glVSeasonComparison['leftColor'], 0.65)

  if (kind == 'min') {
    
    slider = getElement(seasonComparisonSliderMinID)
    
  } else if (kind == 'max') {
    
    slider = getElement(seasonComparisonSliderMaxID)
    
  }

  // slider.style.setProperty('--slider-point-width', '1rem')
  // slider.style.setProperty('--slider-point-background', 'var(--color-border-9)')
  
}


function seasonComparisonStatBlocklFill(id, dataLeft, dataRight, colorLeft, colorRight, title, metric, lowerBetter) {

  // let titleEl = getElement(id + '-title')
  let svg = getElement(id + '-svg')
  let point = getElement(id + '-point')
  let lineLeft = getElement(id + '-line-left')
  let lineRight = getElement(id + '-line-right')
  let valueLeftEL = getElement(id + '-value-left')
  let valueRightEl = getElement(id + '-value-right')

  let delta = 7
  let correction = 2

  let opacity = 0.75

  let metricLeft = dataLeft[metric]
  let metricRight = dataRight[metric]

  let valueLeft
  let valueRight

  let width = getSizes(svg).width

  let coord1 = correction
  let coord2
  let coord3
  let coord4 = width - correction

  let circleRadius = convertRemToPixels(0.15)
  let coordCircle

  let metricsNAN = ['DNC', '-', NaN, undefined]

  // define metrics
  if ((metricsNAN.includes(metricLeft)) & (!metricsNAN.includes(metricRight))) {

    valueLeft = ''
    metricLeft = 0

    valueRight = metricRight

  } else if ((!metricsNAN.includes(metricLeft)) & (metricsNAN.includes(metricRight))) {

    valueRight = ''
    metricRight = 0

    valueLeft = metricLeft
    
  } else if ((metricsNAN.includes(metricLeft)) & (metricsNAN.includes(metricRight))) {

    valueLeft = ''
    valueRight = ''

    metricLeft = 50
    metricRight = 50
    
  } else {

    valueLeft = metricLeft
    valueRight = metricRight
      
  }

  if ((isEmpty(dataLeft)) && (notEmpty(dataRight))) {

    if (lowerBetter) {
      metricLeft = 100
      metricRight = 0
    } else {
      metricLeft = 0
      metricRight = 100
    }

    valueLeft = ''
    
  } else if ((isEmpty(dataRight)) && (notEmpty(dataLeft))) {
    
    metricRight = 0
    metricLeft = 100

    if (lowerBetter) {
      metricRight = 100
      metricLeft = 0
    } else {
      metricRight = 0
      metricLeft = 100
    }

    valueRight = ''
  
  } else if ((isEmpty(dataRight)) && (isEmpty(dataLeft))) {

    metricRight = 50
    metricLeft = 50

    valueLeft = ''
    valueRight = ''
    
  }

  let metricTotal = Number(metricLeft) + Number(metricRight)
  let fraction = width / metricTotal

  coord2 = fraction * metricLeft - delta
  coord3 = width - fraction * metricRight + delta

  if (metricLeft == 0) {

    // left line to zero
    coord1 = 0
    coord2 = 0
    
    coordCircle = circleRadius
    
    coord3 = circleRadius + delta
    coord4 = width

    lineRight.style.opacity = opacity

    // opacity of line to 0,
    // because even with coords x1=0, x2=0 its visible because of stroke-linecap
    lineLeft.style.opacity = 0
    
  } else if (metricRight == 0) {

    // right line to zero
    coord3 = width
    coord4 = width

    coord1 = 0
    coord2 = width - circleRadius - delta

    coordCircle = coord2 + delta

    lineLeft.style.opacity = opacity

    // opacity of line to 0,
    // because even with coords x1=width, x2=width its visible because of stroke-linecap
    lineRight.style.opacity = 0
    
  } else {
    
    coordCircle = coord2 + delta

    lineLeft.style.opacity = opacity
    lineRight.style.opacity = opacity
    
  }

  if (coord2 < 0) {

    coord1 = correction
    coord2 = correction
    
    coord3 = correction + 2*delta
    coord4 = width

    coordCircle = correction + delta
    
  } else if (coord3 > width) {

    coord1 = 0
    coord2 = width - correction - 2*delta
    
    coord3 = width - correction
    coord4 = width - correction
    
    coordCircle = width - correction - delta
    
  }

  if (lowerBetter == true) {

    // abort coordinates coord2 and coord3
    let coord1Local = coord1
    let coord2Local = coord2
    let coord3Local = coord3
    let coord4Local = coord4

    coord2 = width - coord3Local
    coord3 = width - coord2Local

    coordCircle = coord2 + delta

    // abort lines opacity
    if (metricLeft == 0) {
      
      lineLeft.style.opacity = opacity
      lineRight.style.opacity = 0
      
    } else if (metricRight == 0) {

      coordCircle = coord2 + circleRadius
      
      lineLeft.style.opacity = 0
      lineRight.style.opacity = opacity
      
    }
    
  }

  // titleEl.textContent = title

  valueLeftEL.textContent = valueLeft
  valueRightEl.textContent = valueRight

  lineLeft.setAttribute('x1', coord1)
  lineLeft.setAttribute('x2', coord2)
  lineLeft.setAttribute('stroke', colorLeft)

  lineRight.setAttribute('x1', coord3)
  lineRight.setAttribute('x2', coord4)
  lineRight.setAttribute('stroke', colorRight)

  point.setAttribute('cx', coordCircle)
  
}


function seasonComparisonStatisticsFill(statisticsDict, dataLeft, dataRight, colorLeft, colorRight) {

  seasonComparisonFillLegend(
    glVSeasonComparison['leftFullName'], glVSeasonComparison['leftColor'],
    glVSeasonComparison['rightFullName'], glVSeasonComparison['rightColor'],
  )

  let nameEl = getElement(seasonComparisonStatisticsNameID)
  let seasonID = glVSeason['SeasonID']

  nameEl.textContent = `СТАТИСТИКА ВЫСТУПЛЕНИЙ В ${seasonID} ГОДУ`

  // fill titles first to correct containers widths
  statisticsDict.forEach((object, i) => {

    let id = object['id']
    let titleEl = getElement(id + '-title')
    let title = object['title']

    titleEl.textContent = title
    
  })

  statisticsDict.forEach((object, i) => {

    seasonComparisonStatBlocklFill(
      id=object['id'],
      dataLeft=dataLeft, 
      dataRight=dataRight,
      colorLeft=colorLeft,
      colorRight=colorRight,
      title=object['title'],
      metric=object['metric'],
      lowerBetter=object['lowerBetter'],
    )
    
  })
  
}


function seasonPaceUpdateAllByIndexesAndTeamID(indexStart, indexEnd, teamID) {

  // filter by selected events
  let condition1 = (o) => (o['EventIndex'] >= indexStart) && (o['EventIndex'] <= indexEnd)

  data_7_this_interval = data_7.filter(o => condition1(o))
  data_8_this_interval = data_8.filter(o => condition1(o))

  // filter by team
  let condition2 = (o) => (condition1(o) && (o['TeamID'] == teamID))

  data_9_this_team = data_9.filter(o => condition2(o))
  data_10_this_team = data_10.filter(o => condition2(o))

  // drivers
  let driverIDTsThisInterval = data_9_this_team.map(o => o['DriverIDT'])
  driverIDTsThisInterval = dropDuplicates(driverIDTsThisInterval)

  let condition3 = (o) => ((o['TeamID'] == teamID) && (driverIDTsThisInterval.includes(o['DriverIDT'])))
  let dataDriversThisInterval = drivers_part_this_season.filter(o => condition3(o))

  seasonPaceDrivers = []

  dataDriversThisInterval.forEach((d, i) => {

    let driverIDT = d['DriverIDT']
    let driverID = d['DriverID']
    let name = d['FullName']
    let color = d['Color']
    let abb = d['Abbreviation']

    let usedColors = seasonPaceDrivers.map(o => o['Color'])
    color = colorCheck(color, usedColors, d)

    seasonPaceDrivers.push({
      DriverID: driverID,
      DriverIDT: driverIDT,
      Name: name,
      Color: color,
      Abbreviation: abb
    })

  })

  seasonPaceFillDriversLegend()

}


function updateSeasonPacePageContent(
    data_7_this_interval, data_8_this_interval, data_10_this_team,
    data_9_this_team, seasonPaceDrivers,
    chart12Active, chart12Smooth
  ) {

  // dataLaptimes -> data_7

  chart_12(
    ContainerID=seasonPaceChart12ID,
    Container2ID=seasonPaceChart12Chart2ID,
    ContainerVID=seasonPaceChart12VariationID,
    ContainerDID=seasonPaceChartBetterLaptimesID,
    ContainerLID=seasonPaceChartLapsCountID,
    metric='PaceDiff',
    dataLaptimesEvents=data_7_this_interval,
    dataLaptimesFull=data_8_this_interval,
    dataLaptimesSummary=data_10_this_team,
    dataLatimesSummaryDrivers=data_9_this_team,
    dataDrivers=seasonPaceDrivers,
    active=glVSeasonPace['CheckMeanPaceCondition'],
    smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
    id=seasonPaceChartsID
  )

  // seasonPaceDescsFill()

  window.onresize = () => {

    updateUnits()

    chart_12(
      ContainerID=seasonPaceChart12ID,
      Container2ID=seasonPaceChart12Chart2ID,
      ContainerVID=seasonPaceChart12VariationID,
      ContainerDID=seasonPaceChartBetterLaptimesID,
      ContainerLID=seasonPaceChartLapsCountID,
      metric='PaceDiff',
      dataLaptimesEvents=data_7_this_interval,
      dataLaptimesFull=data_8_this_interval,
      dataLaptimesSummary=data_10_this_team,
      dataLatimesSummaryDrivers=data_9_this_team,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id=seasonPaceChartsID
    )
        
  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {

    chart_12(
      ContainerID=seasonPaceChart12ID,
      Container2ID=seasonPaceChart12Chart2ID,
      ContainerVID=seasonPaceChart12VariationID,
      ContainerDID=seasonPaceChartBetterLaptimesID,
      ContainerLID=seasonPaceChartLapsCountID,
      metric='PaceDiff',
      dataLaptimesEvents=data_7_this_interval,
      dataLaptimesFull=data_8_this_interval,
      dataLaptimesSummary=data_10_this_team,
      dataLatimesSummaryDrivers=data_9_this_team,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id=seasonPaceChartsID
    )

    

  }

}


function seasonPaceChart12Activate() {

  let lines = getElement(seasonPaceChart12LinesID)
  let fillAreaScreen = getElement(seasonPaceChart12FillAreaScreenID)
  let meanLine = getElement(seasonPaceChart12MeanLineID)

  lines.classList.add('season-pace-chart-12-fillarea-active')
  fillAreaScreen.classList.add('season-pace-chart-12-fillarea-active')
  
  meanLine.classList.add('season-pace-chart-12-meanline-active')
  
}


function seasonPaceChart12Deactivate() {

  let lines = getElement(seasonPaceChart12LinesID)
  let fillAreaScreen = getElement(seasonPaceChart12FillAreaScreenID)
  let meanLine = getElement(seasonPaceChart12MeanLineID)

  lines.classList.remove('season-pace-chart-12-fillarea-active')
  fillAreaScreen.classList.remove('season-pace-chart-12-fillarea-active')
  
  meanLine.classList.remove('season-pace-chart-12-meanline-active')
  
}


function seasonPaceCheckMeanPaceMouseUp(element) {

  let condition = element.getAttribute('condition')

  let smoothCheckbox = getElement(seasonPaceCheckMeanPaceSmoothID).parentElement

  if (condition == '1') {

    glVSeasonPace['CheckMeanPaceCondition'] = '0'
    seasonPaceChart12Deactivate()

    // resetCheckCollection(seasonPaceCheckMeanPaceSmoothID)
    smoothCheckbox.classList.add('n-a')

  } else if (condition == '0') {

    glVSeasonPace['CheckMeanPaceCondition'] = '1'
    seasonPaceChart12Activate()
    
    smoothCheckbox.classList.remove('n-a')
      
  }

  checkElementClick(
    seasonPaceCheckMeanPaceID, seasonPaceCheckMeanPaceIconID,
    condition=glVSeasonPace['CheckMeanPaceCondition']
  )
  
}


function seasonPaceCheckMeanPaceSmoothMouseUp(element) {

  let condition = element.getAttribute('condition')

  if (condition == '1') {

    glVSeasonPace['CheckMeanPaceSmoothCondition'] = 0

    chart_12(
      ContainerID=seasonPaceChart12ID,
      Container2ID=seasonPaceChart12Chart2ID,
      ContainerVID=seasonPaceChart12VariationID,
      ContainerDID=seasonPaceChartBetterLaptimesID,
      ContainerLID=seasonPaceChartLapsCountID,
      metric='PaceDiff',
      dataLaptimesEvents=data_7_this_interval,
      dataLaptimesFull=data_8_this_interval,
      dataLaptimesSummary=data_10_this_team,
      dataLatimesSummaryDrivers=data_9_this_team,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id=seasonPaceChartsID
    )
    
  } else if (condition == '0') {

    glVSeasonPace['CheckMeanPaceSmoothCondition'] = 1

    chart_12(
      ContainerID=seasonPaceChart12ID,
      Container2ID=seasonPaceChart12Chart2ID,
      ContainerVID=seasonPaceChart12VariationID,
      ContainerDID=seasonPaceChartBetterLaptimesID,
      ContainerLID=seasonPaceChartLapsCountID,
      metric='PaceDiff',
      dataLaptimesEvents=data_7_this_interval,
      dataLaptimesFull=data_8_this_interval,
      dataLaptimesSummary=data_10_this_team,
      dataLatimesSummaryDrivers=data_9_this_team,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id=seasonPaceChartsID
    )
    
  }

  checkElementClick(
    seasonPaceCheckMeanPaceSmoothID, seasonPaceCheckMeanPaceSmoothIconID,
    condition=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )
  
}


function dropdown15Fill() {

  let team = glVSeasonPace['team']

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'teamID': seasonTeamIDs
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown15ID,
    'items': seasonTeams,
    'attributes': itemAttributes,
    'indexes': dropdown15ItemIndexes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let index = seasonTeams.indexOf(team)
  let dropdownLabel = getElement(dropdown15TitleID)

  dropdownLabel.textContent = team
  dropdownLabel.setAttribute('index', index)

}


function dropdown15ItemMouseUp(elementID) {

  appearLoader(loaderID)

  let item = getElement(elementID)
  let index = item.getAttribute('index')
  let teamID = item.getAttribute('teamID')

  glVSeasonPace['teamID'] = teamID
  glVSeasonPace['team'] = drivers_part_this_season.filter(o => o['TeamID'] == teamID)[0]['Team']

  // title
  let titleEl = getElement(dropdown15TitleID)
  titleEl.setAttribute('index', index)

  seasonUpdatePaths(
    glVSeason['SeasonID'],
    glVSeason['SprintIndex'],
    glVSeasonPace['teamID']
  )

  let dataPaths = [d3.csv(seasonData8path)]

  Promise.all(dataPaths).then(function(files) {

    data_8 = files[0]
  
    seasonPaceUpdateAllByIndexesAndTeamID(
      glVSeasonPace['startIndex'],
      glVSeasonPace['endIndex'],
      glVSeasonPace['teamID']
    )
    
    updateSeasonPacePageContent(
      data_7_this_interval,
      data_8_this_interval,
      data_10_this_team,
      data_9_this_team,
      seasonPaceDrivers,
      chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
      chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
    )

    // title
    titleEl.textContent = glVSeasonPace['team']

    }).catch(function(err) {
    // handle error here
  })

  disappearLoader(loaderID)

}


function dropdown15NavMouseUp(element) {

  let itemID = dropdownNavItemGetID(element, dropdown15ItemIndexes)
  dropdown15ItemMouseUp(itemID)
  
}


function dropdown16Fill() {

  let index = glVSeasonPace['startIndex']
  let eventName = glVSeasonPace['startEventName']

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'name': seasonEventNames
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown16ID,
    'items': seasonEventNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  // title
  let titleEl = getElement(dropdown16TitleID)
  titleEl.textContent = eventName
  titleEl.setAttribute('index', index) 
  
}

function dropdown16ItemMouseUp(element) {

  let index = Number(element.getAttribute('index'))
  let name = element.getAttribute('name')

  // title
  let titleEl = getElement(dropdown16TitleID)
  titleEl.setAttribute('index', index)

  glVSeasonPace['startIndex'] = index

  let menuRight = getElement(dropdown17MenuID)
  let menuRightElements = arrayFromChildren(menuRight)
  
  // add disabled to all right menu items, that earlier than left
  menuRightElements.forEach((el, i) => {

    let indexRight = Number(el.getAttribute('index'))

    if (indexRight < index) {
      el.classList.add('disabled')
    } else {
      el.classList.remove('disabled')
    }
    
  })

  seasonPaceUpdateAllByIndexesAndTeamID(
    glVSeasonPace['startIndex'],
    glVSeasonPace['endIndex'],
    glVSeasonPace['teamID']
  )
  
  updateSeasonPacePageContent(
    data_7_this_interval, data_8_this_interval, data_10_this_team,
    data_9_this_team, seasonPaceDrivers,
    chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
    chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )

  // title
  titleEl.textContent = name
  
}


function dropdown17Fill() {

  let index = glVSeasonPace['endIndex']
  let eventName = glVSeasonPace['endEventName']

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'name': seasonEventNames
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown17ID,
    'items': seasonEventNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  // title
  let titleEl = getElement(dropdown17TitleID)
  titleEl.textContent = eventName
  titleEl.setAttribute('index', index)
  
}


function dropdown17ItemMouseUp(element) {

  if (!element.classList.contains('disabled')) {

    let index = Number(element.getAttribute('index'))
    let name = element.getAttribute('name')

    // title
    let titleEl = getElement(dropdown17TitleID)
    titleEl.setAttribute('index', index)

    glVSeasonPace['endIndex'] = index

    seasonPaceUpdateAllByIndexesAndTeamID(
      glVSeasonPace['startIndex'],
      glVSeasonPace['endIndex'],
      glVSeasonPace['teamID']
    )
    
    updateSeasonPacePageContent(
      data_7_this_interval, data_8_this_interval, data_10_this_team,
      data_9_this_team, seasonPaceDrivers,
      chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
      chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
    )

    // title
    titleEl.textContent = name

  }

}


function seasonPaceFillDriversLegend() {

  let legend = getElement(seasonPaceDriversLegendID)
  legend.innerHTML = ''

  if (seasonPaceDrivers.length == 0) {

    seasonPaceDrivers = [
      {'Name': '-'},
      {'Name': '-'}
    ]
    
  }

  seasonPaceDrivers.forEach((obj, i) => {

    let name = obj['Name']
    let color = obj['Color']

    let rectEl = document.createElement('div')
    let nameEl = document.createElement('div')

    Object.assign(rectEl, {
      className: 'nrpa21 rtiuvb'
    })

    rectEl.style.background = color

    Object.assign(nameEl, {
      className: 'i35xe4 jjylp2',
      textContent: name,
    })

    legend.appendChild(rectEl)
    legend.appendChild(nameEl)

    if (i < seasonPaceDrivers.length - 1) {

      let separatorEl = document.createElement('div')

      Object.assign(separatorEl, {
        className: 'mx-125'
      })

      legend.appendChild(separatorEl)
        
    }
    
  })
  
}


function seasonPaceDescCloseAll(element) {

  seasonPaceChartDescTablesIDs.forEach((id, i) => {

    let elementLocal = getElement(id)

    let con1 = !elementLocal.id.includes(element.id)
    let con2 = !elementLocal.classList.contains('invisible')

    if (con1 && con2) {
      
      document.body.classList.remove('o-hidden')
      elementLocal.classList.add('invisible')
      
    }
    
  })
  
}


function seasonPaceDescChart121Fill() {

  getElement(seasonPaceChart121DescContentID).innerHTML = chartDescBodyChart121

  let img1 = getElement(seasonPaceChart121DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-1-1.svg`
    
}


function seasonPaceDescChart122Fill() {

  getElement(seasonPaceChart122DescContentID).innerHTML = chartDescBodyChart122

  let img1 = getElement(seasonPaceChart122DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-2-1.svg`
    
}


function seasonPaceDescChart123Fill() {

  getElement(seasonPaceChart123DescContentID).innerHTML = chartDescBodyChart123

  let img1 = getElement(seasonPaceChart123DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-v-1.svg`
    
}


function seasonPaceDescChart124Fill() {

  getElement(seasonPaceChart124DescContentID).innerHTML = chartDescBodyChart124

  let img1 = getElement(seasonPaceChart124DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-d-1.svg`
    
}


function seasonPaceDescChart125Fill() {

  getElement(seasonPaceChart125DescContentID).innerHTML = chartDescBodyChart125

  let img1 = getElement(seasonPaceChart125DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-lc-1.svg`
    
}


function seasonPaceDescsFill() {

  seasonPaceDescChart121Fill()
  seasonPaceDescChart122Fill()
  seasonPaceDescChart123Fill()
  seasonPaceDescChart124Fill()
  seasonPaceDescChart125Fill()
  
}


function seasonSegmentDataUpdate(calendar, drivers_part) {

  // define calendar
  seasonCalendar = copyObject(calendar)
  seasonCalendar = seasonCalendar.filter(o => o['SeasonID'] == glVSeason['SeasonID'])
  seasonCalendar = sortValues(seasonCalendar, 'EventIndex', true)
  
  // filter drivers_part
  drivers_part_this_season = drivers_part
    .filter(o => o['SeasonID'] == glVSeason['SeasonID'])

  let data = copyObject(drivers_part_this_season)

  // define drivers idts and fullnames
  data = sortValuesString(data, 'FullName', true)
  seasonDriverIDTs = data.map(o => o['DriverIDT'])
  seasonFullNames = data.map(o => o['FullName'])

  // define teams idts and names
  data = sortValuesString(data, 'Team', true)
  data = dropDuplicatesArrayOfObject(data, 'TeamID')
  seasonTeamIDs = data.map(o => o['TeamID'])
  seasonTeams = data.map(o => o['Team'])

}


function seasonSegmentDataRefresh() {

  drivers_part_this_season = []
  seasonTeamIDs = []
  seasonTeams = []

  season_data_1 = []
  season_data_2 = []
  season_stat_data_6 = []
  data_7 = []
  data_8 = []
  data_9 = []
  data_10 = []

  seasonComparisonSliderData['minIdx'] = null
  seasonComparisonSliderData['maxIdx'] = null

  let shadowRectTop = getElement(seasonComparisonSliderShadowTopID)
  let shadowRectBottom = getElement(seasonComparisonSliderShadowBottomID)

  if (shadowRectTop) {
    shadowRectTop.classList.remove('active')
  }

  if (shadowRectBottom) {
    shadowRectBottom.classList.remove('active')
  }
  
}


function seasonComparisonUpdateAllByTeamID(teamID) {

  // update paramteters and data by TeamID

  let data2ThisSeason = copyObject(season_data_2)
  data2ThisSeason = data2ThisSeason.filter(o => o['TeamID'] == glVSeasonComparison['teamID'])

  if (data2ThisSeason.length > 2) {
    data2ThisSeason = sortValues(data2ThisSeason, 'RacesParticipated').slice(0, 2)
  }

  data2ThisSeason = sortValues(data2ThisSeason, 'RankPointsAvg', ascending=true)

  if (data2ThisSeason.length == 0) {
    
    season_comparison_data_2_left = []
    season_comparison_data_2_right = []
    
  } else if (data2ThisSeason.length == 1) {
    
    season_comparison_data_2_left = data2ThisSeason[0]
    season_comparison_data_2_right = []
    
  } else if (data2ThisSeason.length == 2) {
    
    season_comparison_data_2_left = data2ThisSeason[0]
    season_comparison_data_2_right = data2ThisSeason[1]
    
  }

  glVSeasonComparison['leftIDT'] = season_comparison_data_2_left['DriverIDT'] ?? null
  glVSeasonComparison['rightIDT'] = season_comparison_data_2_right['DriverIDT'] ?? null

  seasonComparisonUpdateParametersByDriverIDT(
    glVSeasonComparison['leftIDT'],
    glVSeasonComparison['rightIDT'],
    glVSeason['SeasonID']
  )
  
}


function seasonComparisonUpdateAllByDriverIDT() {

  // update paramteters and data by DriverIDTs
  
  let seasonID = glVSeason['SeasonID']
  let leftIDT = glVSeasonComparison['leftIDT']
  let rightIDT = glVSeasonComparison['rightIDT']

  seasonComparisonUpdateDataByDriverIDT(
    glVSeasonComparison['leftIDT'],
    glVSeasonComparison['rightIDT']
  )

  seasonComparisonUpdateParametersByDriverIDT(
    glVSeasonComparison['leftIDT'],
    glVSeasonComparison['rightIDT'],
    glVSeason['SeasonID']
  )

}


function seasonComparisonUpdateDataByDriverIDT(leftIDT, rightIDT) {

  season_comparison_data_2_left = season_data_2.filter(o => o['DriverIDT'] == leftIDT)
  if (notEmpty(season_comparison_data_2_left)) { season_comparison_data_2_left = season_comparison_data_2_left[0] }
  
  season_comparison_data_2_right = season_data_2.filter(o => o['DriverIDT'] == rightIDT)
  if (notEmpty(season_comparison_data_2_right)) { season_comparison_data_2_right = season_comparison_data_2_right[0] }

}


function seasonComparisonUpdateParametersByDriverIDT(leftIDT, rightIDT, seasonID) {

  let leftData = drivers_part_this_season.filter(o => (o['DriverIDT'] == leftIDT) && (o['SeasonID'] == seasonID))[0]
  let rightData = drivers_part_this_season.filter(o => (o['DriverIDT'] == rightIDT) && (o['SeasonID'] == seasonID))[0]

  if (leftData) {

    glVSeasonComparison['leftFullName'] = leftData['FullName']
    glVSeasonComparison['leftTeamID'] = leftData['TeamID']
    glVSeasonComparison['leftTeam'] = leftData['Team']
    glVSeasonComparison['leftColor'] = leftData['Color']
    glVSeasonComparison['leftNumber'] = leftData['Number']
    
  } else {

    glVSeasonComparison['leftIDT'] = null
    glVSeasonComparison['leftFullName'] = '-'
    glVSeasonComparison['leftTeamID'] = null
    glVSeasonComparison['leftTeam'] = '-'
    glVSeasonComparison['leftColor'] = null
    glVSeasonComparison['leftNumber'] = null
    
  }

  if (rightData) {

    glVSeasonComparison['rightIDT'] = rightData['DriverIDT']
    glVSeasonComparison['rightFullName'] = rightData['FullName']
    glVSeasonComparison['rightTeamID'] = rightData['TeamID']
    glVSeasonComparison['rightTeam'] = rightData['Team']
    glVSeasonComparison['rightColor'] = rightData['Color']
    glVSeasonComparison['rightNumber'] = rightData['Number']

    if (glVSeasonComparison['leftColor'] == glVSeasonComparison['rightColor']) {
      glVSeasonComparison['rightColor'] = setColor1(
        glVSeasonComparison['rightColor'], glVSeason['SeasonID'], colors
      )
    }
    
  } else {

    glVSeasonComparison['rightIDT'] = null
    glVSeasonComparison['rightFullName'] = '-'
    glVSeasonComparison['rightTeamID'] = null
    glVSeasonComparison['rightTeam'] = '-'
    glVSeasonComparison['rightColor'] = null
    glVSeasonComparison['rightNumber'] = null
    
  }

}










































function seasonLoadPages(pageID, kind) {
  
// console.time('total')
  if (kind=='segment') {


    scrollPosition = 0

    glVGlobal['FirstLoad'] = false

    season_data_1 = []
    season_data_2 = []

    glVSeasonComparison['teamID'] = null
    glVSeasonComparison['team'] = null

    // clear statistics
    season_stat_data_6 = []

    // clear ratings
    seasonCategoriesClickedData = []

    // clear comparison
    season_comparison_data_2_left = []
    season_comparison_data_2_right = []

    glVSeasonComparison['leaderTeamID'] = null
    glVSeasonComparison['teamID'] = null
    glVSeasonComparison['team'] = null
    glVSeasonComparison['leftIDT'] = null
    glVSeasonComparison['rightIDT'] = null

    // clear pace
    data_7 = []

    glVSeasonPace['CheckMeanPaceCondition'] = null
    glVSeasonPace['CheckMeanPaceSmoothCondition'] = null

    glVSeasonPace['leaderTeamID'] = null
    glVSeasonPace['teamID'] = null
    glVSeasonPace['team'] = null

    // define season globals
    glVSeason['SeasonID'] = lastElement(seasonIDs)
    glVSeason['SprintIndex'] = 2

    glVSeasonRatings['clickedTableID'] = 0

    // update calendar, drivers and teams data
    seasonSegmentDataUpdate(calendar, drivers_part)

    // menu years
    menuYearsFill(menuYears11ID, seasonIDs, glVSeason['SeasonID'])
  
    // menu race-sprint
    seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])


  } else if (kind == 'year') {
    

    season_data_1 = []
    season_data_2 = []
    
    // clear statistics
    season_stat_data_6 = []

    // clear ratings
    seasonCategoriesClickedData = []

    glVSeasonRatings['clickedTableID'] = 0

    // clear comparison
    season_comparison_data_2_left = []
    season_comparison_data_2_right = []

    glVSeasonComparison['leaderTeamID'] = null
    glVSeasonComparison['teamID'] = null
    glVSeasonComparison['team'] = null

    seasonComparisonSliderData['minIdx'] = null
    seasonComparisonSliderData['maxIdx'] = null

    // clear pace
    data_7 = []

    glVSeasonPace['leaderTeamID'] = null
    // glVSeasonPace['teamID'] = null
    // glVSeasonPace['team'] = null
    
    // update calendar, drivers and teams data
    seasonSegmentDataUpdate(calendar, drivers_part)


  } else if (kind == 'sprint-index') {
    

    season_data_1 = []
    season_data_2 = []

    // clear statistics
    season_stat_data_6 = []
    
    // clear comparison
    seasonComparisonSliderData['minIdx'] = null
    seasonComparisonSliderData['maxIdx'] = null

    // clear pace
    data_7 = []


  } else if (kind == 'page') {


    // clear season ratings
    seasonCategoriesClickedData = []

    glVSeasonRatings['clickedTableID'] = 0

  }

  if ((notEmpty(season_data_1)) && (notEmpty(season_data_2))) {

    updateSeasonPages(pageID, kind)

  } else {

    // update paths
    seasonUpdatePaths(
      glVSeason['SeasonID'],
      glVSeason['SprintIndex'],
    )
  
    let dataPaths = [
      d3.csv(seasonData1path),
      d3.csv(seasonData2path)
    ]
  
    Promise.all(dataPaths).then(function(files) {
  
      season_data_1 = files[0]
      season_data_2 = files[1]

      updateSeasonPages(pageID, kind)
  
      }).catch(function(err) {
    // handle error here
    })
    
  }
// console.timeEnd('total')
}


function updateSeasonStatisticsPage(kind) {

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonStatistcsPageID

  // clear content - without blinking on changing sprint-index
  if ((kind == 'segment') || (kind == 'year') || (kind == 'page')) {

    let contentContainer = getElement(seasonContentContainerID)
    contentContainer.innerHTML = ''
    contentContainer.innerHTML += pageSeasonStatistics

    // fill horizontal menu
    seasonHorizontalMenuFill(seasonStatistcsPageID)
    
  }

  // // clear content - with blinking on changing sprint-index
  // let contentContainer = getElement(seasonContentContainerID)
  // contentContainer.innerHTML = ''
  // contentContainer.innerHTML += pageSeasonStatistics

  if (notEmpty(season_stat_data_6)) {

    updateSeasonStatisticsPage1(season_data_1, season_stat_data_6)
    
  } else {

    seasonUpdatePaths(
      glVSeason['SeasonID'],
      glVSeason['SprintIndex']
    )

    let dataPaths = [d3.csv(seasonData6path)]

    Promise.all(dataPaths).then(function(files) {
  
      season_stat_data_6 = files[0]

      updateSeasonStatisticsPage1(season_data_1, season_stat_data_6)
      
      }).catch(function(err) {
    // handle error here
    })
  
  }

}


function updateSeasonStatisticsPage1(season_data_1, season_stat_data_6) {

  let condition1 = (o) => (o['SeasonID'] == glVSeason['SeasonID']) && (o['DataAvailable'] == 1)
  let lastEventData = calendar.filter(o => condition1(o)).slice(-1)[0]

  let condition2 = (o) => (o['SeasonID'] == glVSeason['SeasonID']) && (o['DataAvailable'] == 0)
  let nextEventData = calendar.filter(o => condition2(o))[0]

  // check if season is over
  glVSeason['SeasonOver'] = getSeasonOver(glVSeason['SeasonID'])

  // update main info board
  seasonUpdateEventInformation(lastEventData, nextEventData, glVSeason['SeasonID'], glVSeason['SeasonOver'])

  // fill boxes
  seasonAggregationTable1NationsFill()
  seasonAggregationTable1TeamsFill()
  seasonAggregationTable1EnginesFill()

  seasonStatisticsTables2Info.forEach((obj, i) => {

  seasonAggregationTable1Fill(
    tableID=obj['id'],
    property=obj['metric'],
    sort=obj['sort'],
    lessThanFive=obj['lessThanFive'])
  })

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {}

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  appearElement(seasonContentContainerID)
  addSmoothAppear(seasonMainContainerID)
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)

}


function updateSeasonRatingsPage(kind) {

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonRatingsPageID

  // clear content - without blinking on changing sprint-index
  if ((kind == 'segment') || (kind == 'year') || (kind == 'page')) {

    let contentContainer = getElement(seasonContentContainerID)
    contentContainer.innerHTML = ''
    contentContainer.innerHTML += pageSeasonCategories
    
  }

  // // clear content - with blinking on changing sprint-index
  // let contentContainer = getElement(seasonContentContainerID)
  // contentContainer.innerHTML = ''
  // contentContainer.innerHTML += pageSeasonCategories

  // fill horizontal menu
  seasonHorizontalMenuFill(seasonRatingsPageID)

  // fill dropdown
  dropdown12Fill()

  // fill table
  seasonCategoriesRanksTableFill(season_data_2)

  // fill info
  seasonCategoriesInfoTableFill(season_data_2)

  // build charts
  seasonCategoriesUpdateCharts()

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  appearElement(seasonContentContainerID)
  addSmoothAppear(seasonMainContainerID)
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)
  
}


function updateSeasonComparisonPage(kind) {

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonComparisonPageID

  if ((kind == 'segment') || (kind == 'year') || (kind == 'page')) {

    // clear content - without blinking on changing sprint-index
    let contentContainer = getElement(seasonContentContainerID)
    contentContainer.innerHTML = ''
    contentContainer.innerHTML += pageSeasonComparison

    // fill horizontal menu
    seasonHorizontalMenuFill(seasonComparisonPageID)

    // if team leader no defined
    if (isNULL(glVSeasonComparison['leaderTeamID'])) {
  
      // define leaders
      let teamsData = copyObject(season_data_2)
      teamsData = sortValues(teamsData, 'TeamPointsOfficial', false)
      
      glVSeasonComparison['leaderTeamID'] = teamsData[0]['TeamID']
      glVSeasonComparison['leaderTeam'] = teamsData[0]['Team']
      
    }

    // define team
    glVSeasonComparison['teamID'] ||= glVSeasonComparison['leaderTeamID']
    glVSeasonComparison['team'] ||= glVSeasonComparison['leaderTeam']

    // if team not participated in selected season
    if (!seasonTeamIDs.includes(glVSeasonComparison['teamID'])) {

      glVSeasonComparison['teamID'] = glVSeasonComparison['leaderTeamID']
      glVSeasonComparison['team'] = glVSeasonComparison['leaderTeam']
      
    }

    // update paramteres and data
    seasonComparisonUpdateAllByTeamID(glVSeasonComparison['teamID'])

    // fill dropdowns
    dropdown13CenterFill()
    dropdown13Fill(dropdown13LeftID)
    dropdown13Fill(dropdown13RightID)
    dropdown14Fill()
    
  } else if (kind == 'sprint-index') {

    seasonComparisonUpdateDataByDriverIDT(
      glVSeasonComparison['leftIDT'],
      glVSeasonComparison['rightIDT']
    )
    
  }
  
  updateSeasonComparisonPageContent(
    season_comparison_data_2_left, season_comparison_data_2_right,
    glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'],
    glVSeasonComparison['leftFullName'], glVSeasonComparison['rightFullName'],
    glVSeasonComparison['leftColor'], glVSeasonComparison['rightColor'],
    glVSeasonComparison['leftTeam'], glVSeasonComparison['rightTeam'],
    glVSeasonComparison['leftNumber'], glVSeasonComparison['rightNumber']
  )

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  appearElement(seasonContentContainerID)
  addSmoothAppear(seasonMainContainerID)
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)

}


function updateSeasonComparisonPageContent(
    leftData, rightData, leftIDT, rightIDT, leftName, rightName,
    leftColor, rightColor, leftTeam, rightTeam, leftNumber, rightNumber
  ) {

  // fill badge left
  seasonComparisonUpdateBadge(
    leftIDT, leftName, leftColor, leftTeam, leftNumber, 'left'
  )

  // fill badge right
  seasonComparisonUpdateBadge(
    rightIDT, rightName, rightColor, rightTeam, rightNumber, 'right'
  )

  seasonComparisonFillLegend(
    glVSeasonComparison['leftFullName'], glVSeasonComparison['leftColor'],
    glVSeasonComparison['rightFullName'], glVSeasonComparison['rightColor'],
  )

  chartHBars_1(
    leftData, leftColor,
    'chart-season-drivers-hbar-1',
    rightData, rightColor,
  )

  seasonComparisonStatisticsFill(seasonComparisonStatisticsDict, leftData, rightData, leftColor, rightColor)

  // update line chart
  seasonDriversUpdateChart1(season_data_1, season_data_2, leftIDT, rightIDT, leftColor, rightColor)

  seasonComparisonSliderParamsUpdate(
    seasonComparisonSliderData['minIdx'],
    seasonComparisonSliderData['maxIdx']
  )

  seasonComparisonSliderActivate()

  sliderTooltipFill(
    seasonComparisonDataLeft,
    seasonComparisonDataRight,
    seasonComparisonDataDiff,
    leftColor,
    rightColor,
    seasonComparisonSliderData['metrics'],
    seasonComparisonSliderData['type'],
    kind='full',
    seasonComparisonSliderData['subType'],
  )

  window.onresize = () => {

    updateUnits()

    if (getElement('chart-season-drivers-hbar-1')) {

      chartHBars_1(
        leftData, leftColor,
        'chart-season-drivers-hbar-1',
        rightData, rightColor
      )
      
    }
    
    if (getElement('chart-1')) {

      // update line chart
      seasonDriversUpdateChart1(season_data_1, season_data_2, leftIDT, rightIDT, leftColor, rightColor)

      seasonComparisonSliderParamsUpdate(
        seasonComparisonSliderData['minIdx'],
        seasonComparisonSliderData['maxIdx']
      )
      
      seasonComparisonSliderActivate()
      
    }

  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {

    chartHBars_1(
      leftData, leftColor,
      'chart-season-drivers-hbar-1',
      rightData, rightColor,
    )
  
    // update line chart
    seasonDriversUpdateChart1(season_data_1, season_data_2, leftIDT, rightIDT, leftColor, rightColor)

    seasonComparisonSliderParamsUpdate(
      seasonComparisonSliderData['minIdx'],
      seasonComparisonSliderData['maxIdx']
    )
    
    seasonComparisonSliderActivate()
    
  }

}


function updateSeasonPacePage(kind) {

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonPacePageID

  if ((kind == 'segment') || (kind == 'year') || (kind == 'page')) {

    // clear content - without blinking on changing sprint-index
    let contentContainer = getElement(seasonContentContainerID)
    contentContainer.innerHTML = ''
    contentContainer.innerHTML += pageSeasonPace

    glVSeasonPace['CheckMeanPaceCondition'] ||= 0
    glVSeasonPace['CheckMeanPaceSmoothCondition'] ||= 1

    // fill horizontal menu
    seasonHorizontalMenuFill(seasonPacePageID)

    // if team leader no defined
    if (isNULL(glVSeasonPace['leaderTeamID'])) {

      // define leaders
      let teamsData = copyObject(season_data_2)
      teamsData = sortValues(teamsData, 'TeamPointsOfficial', false)
      
      glVSeasonPace['leaderTeamID'] = teamsData[0]['TeamID']
      glVSeasonPace['leaderTeam'] = teamsData[0]['Team']
      
    }
    
    // define team
    glVSeasonPace['teamID'] ||= glVSeasonPace['leaderTeamID']
    glVSeasonPace['team'] ||= glVSeasonPace['leaderTeam']
  
    // if team not participated in selected season
    if (!seasonTeamIDs.includes(glVSeasonPace['teamID'])) {
  
      glVSeasonPace['teamID'] = glVSeasonPace['leaderTeamID']
      glVSeasonPace['team'] = glVSeasonPace['leaderTeam']
      
    }

    // define event indexes and names
    seasonEventIndexes = seasonCalendar.map(o => o['EventIndex'])
    seasonEventNames = seasonCalendar.map(o => o['EventNameRus'])

    // define event abbreviations
    seasonEventAbbs = []
    seasonCalendar.forEach((d, i) => {
      
      let eventID = d['EventID']
      let eventAbb = events.filter(o => o['EventID'] == eventID)[0]['EventAbbreviation']
      
      seasonEventAbbs.push(eventAbb)
      
    })

    // define indexes for dropdowns
    let indexStart = Number(firstElement(seasonEventIndexes))
    let indexEnd = Number(lastElement(seasonEventIndexes))
  
    glVSeasonPace['startIndex'] = indexStart
    glVSeasonPace['endIndex'] = indexEnd

    glVSeasonPace['startEventName'] = seasonCalendar.filter(o => o['EventIndex'] == indexStart)[0]['EventNameRus']
    glVSeasonPace['endEventName'] = seasonCalendar.filter(o => o['EventIndex'] == indexEnd)[0]['EventNameRus']

    dropdown15Fill()
    dropdown16Fill()
    dropdown17Fill()

    resetCheckCollection(seasonPaceCheckMeanPaceID)
    resetCheckCollection(seasonPaceCheckMeanPaceSmoothID)
  
    checkElementClick(
      seasonPaceCheckMeanPaceID, seasonPaceCheckMeanPaceIconID,
      glVSeasonPace['CheckMeanPaceCondition']
    )
  
    checkElementClick(
      seasonPaceCheckMeanPaceSmoothID, seasonPaceCheckMeanPaceSmoothIconID,
      glVSeasonPace['CheckMeanPaceSmoothCondition']
    )

    
  }

  if (notEmpty(data_7)) {

    updateSeasonPacePage1()
    
  } else {

    // update paths
    seasonUpdatePaths(
      glVSeason['SeasonID'],
      glVSeason['SprintIndex'],
      glVSeasonPace['teamID']
    )

    let dataPaths = [
      d3.csv(seasonData7path),
      d3.csv(seasonData8path),
      d3.csv(seasonData9path),
      d3.csv(seasonData10path)
    ]
  
    Promise.all(dataPaths).then(function(files) {
  
      data_7 = files[0]
      data_8 = files[1]
      data_9 = files[2]
      data_10 = files[3]
  
      updateSeasonPacePage1()
  
      }).catch(function(err) {
      // handle error here
    })
    
  }

}


function updateSeasonPacePage1() {

  // // test
  // glVSeasonPace['startIndex'] = 29
  // glVSeasonPace['endIndex'] = 29

  seasonPaceUpdateAllByIndexesAndTeamID(
    glVSeasonPace['startIndex'],
    glVSeasonPace['endIndex'],
    glVSeasonPace['teamID']
  )

  updateSeasonPacePageContent(
    data_7_this_interval,
    data_8_this_interval,
    data_10_this_team,
    data_9_this_team,
    seasonPaceDrivers,
    chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
    chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  appearElement(seasonContentContainerID)
  addSmoothAppear(seasonMainContainerID)
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)
  
}


function updateSeasonPages(pageID, kind) {

  if (pageID == seasonStatistcsPageID) {
    updateSeasonStatisticsPage(kind)
  } else if (pageID == seasonRatingsPageID) {
    updateSeasonRatingsPage(kind)
  } else if (pageID == seasonComparisonPageID) {
    updateSeasonComparisonPage(kind)
  } else if (pageID == seasonPacePageID) {
    updateSeasonPacePage(kind)
  }
  
}





