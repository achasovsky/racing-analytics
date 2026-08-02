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


function seasonAppearElements(page) {

  if (page == seasonStatistcsPageID) {
    
    appearElement(containerSeasonStatisticsID)
    
  } else if (page == seasonRatingsPageID) {
    
    appearElement(containerSeasonRatingsID)
    
  } else if (page == seasonComparisonPageID) {

    appearElement(containerSeasonComparisonID)
    
  } else if (page == seasonPacePageID) {

    appearElement(containerSeasonPaceID)
    
  }

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

    // let data_2_local = sortValues(data_6, 'ChampionshipClassification', ascending=true)
 
    // let uniqueWinners = data_5[0]['WinnerRaceUnique']
    // let uniqueQualificationWinners = data_5[0]['WinnerQualificationUnique']
    // let competitionLevel = data_5[0]['CompetitionRating']

    // setText(seasonStatisticsCompetitionWinnersMetricID, uniqueWinners)
    // setText(seasonStatisticsCompetitionPolesMetricID, uniqueQualificationWinners)
    // setText(seasonStatisticsCompetitionLevelMetricID, competitionLevel)

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
    let data_1_local = data_1.filter(d => d.RaceID == lastEventData['RaceID'])

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


function seasonMenuYearsMouseUp(element) {

  appearLoader(loaderID)

  pageContainerGetScroll()

  glVSeason['SeasonID'] = element.getAttribute('SeasonID')

  seasonSegmentDataRefresh()

  let menuTitle = getElement(menuYears11TitleID)
  menuTitle.textContent = glVSeason['SeasonID']
  
  seasonLoadPages(glVGlobal['Page'])

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

  let data = copyObject(data_6)

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

  let data = dropDuplicatesArrayOfObject(data_6, property='Team')
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

  let data = dropDuplicatesArrayOfObject(data_6, property='Engine')
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

  let data = copyObject(data_6)

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

  let clickedTable = seasonCategoriesRanksTableData['clickedTableID']

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
  seasonCategoriesRanksTableData['activeIDT'] = null

  let table = getElement(seasonCategoriesRanksTableContainerID)
  table.scrollTop = 0

  let clickedTable = element.getAttribute('tableID')

  seasonCategoriesRanksTableData['clickedTableID'] = clickedTable

  let dropdownTitle = getElement(dropdown12TitleID)
  dropdownTitle.textContent = element.textContent

  // fill table
  seasonCategoriesRanksTableFill(data_2)

  // fill info
  seasonCategoriesInfoTableFill(data_2)

  // draw charts
  chartLine_1(data_1, 'chart-season-rating-line', clickedTable, dropdown12Data[clickedTable]['chartLine1Metric'])
  
}

function seasonCategoriesInfoTableFill(dataLocal, idt=null, color=null) {

  let clickedTable = seasonCategoriesRanksTableData['clickedTableID']
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

  let clickedTable = seasonCategoriesRanksTableData['clickedTableID']
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
      seasonCategoriesRanksTableData['leaderIDT'] = idt
    }
    
  })

}


function seasonCategoriesRanksTableMouseOver(element) {

  let clickedIDTs = seasonCategoriesClickedData.map(o => o['idt'])

  let activeIDT = seasonCategoriesRanksTableData['activeIDT']
  let currentIDT = element.getAttribute('DriverIDT')

  let colorDefault = element.getAttribute('color')
  let team = element.getAttribute('team')

  let color = colorDefault
  let dash = 0

  // if item is clicked
  if (clickedIDTs.includes(currentIDT)) {

    let dataCurrent = seasonCategoriesClickedData.filter(o => o['idt'] == currentIDT)
    if (dataCurrent.length > 0) { dataCurrent = dataCurrent[0]}

    seasonCategoriesInfoTableFill(data_2, currentIDT, dataCurrent['colorClicked'])

    seasonCategoriesRanksTableData['activeColor'] = dataCurrent['activeColor']
    seasonCategoriesRanksTableData['activeColorDefault'] = dataCurrent['activeColorDefault']

  // if item not clicked
  } else {

    let colorAndDash = seasonCategoriesUpdateColorAndDash(colorDefault, team)
    color = colorAndDash[0]
    dash = colorAndDash[1]
  
    let tableNameEl = getElement(seasonCategoriesRanksTableNameID + currentIDT)
    tableNameEl.style.color = color

    seasonCategoriesInfoTableFill(data_2, currentIDT, color)
    seasonCategoriesChartLineActivate(currentIDT, color, dash)
 
  }
  // if active element exist
  if (activeIDT) {
    // and active element not the one we just leave - deactivate it
    if (activeIDT != currentIDT) {

      // and it not clicked
      if (!clickedIDTs.includes(activeIDT)) {
        
        let tableNameActiveEl = getElement(seasonCategoriesRanksTableNameID + activeIDT)
        tableNameActiveEl.style.color = seasonCategoriesRanksTableData['activeColorDefault']
        
        seasonCategoriesChartLineDectivate(activeIDT)
        
      }
      
    }
    
  }

  seasonCategoriesRanksTableData['activeElID'] = element.id
  seasonCategoriesRanksTableData['activeIDT'] = currentIDT
  seasonCategoriesRanksTableData['activeColor'] = color
  seasonCategoriesRanksTableData['activeColorDefault'] = colorDefault
  seasonCategoriesRanksTableData['activeDash'] = dash

}


function seasonCategoriesRanksTableMouseLeave() {

  let activeIDT = seasonCategoriesRanksTableData['activeIDT']

  if (activeIDT) {

    let clickedIDTs = seasonCategoriesClickedData.map(o => o['idt'])
    let lastClickedIDT = lastElement(clickedIDTs)
  
    let leaderIDT = seasonCategoriesRanksTableData['leaderIDT']
    
    let dataLastClicked = seasonCategoriesClickedData.filter(o => o['idt'] == lastClickedIDT)
    if (dataLastClicked.length > 0) { dataLastClicked = dataLastClicked[0] }

    // if not clicked
    if (!clickedIDTs.includes(activeIDT)) {

      seasonCategoriesChartLineDectivate(activeIDT)
  
      let tableNameEl = getElement(seasonCategoriesRanksTableNameID + activeIDT)
      tableNameEl.style.color = seasonCategoriesRanksTableData['activeColorDefault']
      
    }
  
    if (lastClickedIDT) {
      seasonCategoriesInfoTableFill(data_2, lastClickedIDT, dataLastClicked['colorClicked'])
    } else {
      seasonCategoriesInfoTableFill(data_2, leaderIDT)
    }

  }

  seasonCategoriesRanksTableData['activeElID'] = null
  seasonCategoriesRanksTableData['activeIDT'] = null
  seasonCategoriesRanksTableData['activeColor'] = null
  seasonCategoriesRanksTableData['activeColorDefault'] = null
  seasonCategoriesRanksTableData['activeDash'] = null

}


function seasonCategoriesRanksTableMouseUp(element) {

  let idt = element.getAttribute('DriverIDT')

  let color = seasonCategoriesRanksTableData['activeColor']
  let dash = seasonCategoriesRanksTableData['activeDash']

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
  let leaderIDT = seasonCategoriesRanksTableData['leaderIDT']

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

  seasonCategoriesInfoTableFill(data_2, leaderIDT)

  seasonCategoriesClickedData = []
  seasonCategoriesRanksTableData['activeIDT'] = null

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

  let currentSeasonDriversIDTList = data_2.map(o => o['DriverIDT'])

  if (seasonCategoriesClickedData.length > 0) {

    let clickedTable = seasonCategoriesRanksTableData['clickedTableID']
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
        line.style.strokeWidth = '0.1875rem'
        line.style.opacity = 0.85
        line.style.filter = CSSGetProperty('--chart-line-1-line-clicked-shadow')

        let tablePosition = getElement(seasonCategoriesRanksTablePositionID + idt)
        tablePosition.style.border = color
        tablePosition.style.background = color
        tablePosition.style.color = CSSGetProperty('--color-background')
        tablePosition.style.boxShadow = boxShadowFromColor(color, 0, 0, 0.125)
            
        seasonCategoriesChartLineActivate(idt, color, dash)

        if (i == clickedIDTs.length-1) {
          seasonCategoriesInfoTableFill(data_2, idt, color)
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


function seasonMenuRacesprintMouseUp(currentButton, buttonsCollection) {

  appearLoader(loaderID)

  pageContainerGetScroll()

  seasonSegmentDataRefreshRacesprint()

  let sprintIndex = currentButton.getAttribute('condition')
  let page = glVGlobal['Page']

  seasonMenuRacesprintButtonActivate(currentButton)
  
  glVSeason['SprintIndex'] = sprintIndex

  seasonLoadPages(page)
  
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

  let clickedTable = seasonCategoriesRanksTableData['clickedTableID']

  // draw charts
  chartLine_1(
    data_1, 'chart-season-rating-line', clickedTable,
    dropdown12Data[clickedTable]['chartLine1Metric']
  )

  seasonCategoriesClickChartsByClickedDrivers()

  window.onresize = () => {

    updateUnits()

    let clickedTableResize = Number(seasonCategoriesRanksTableData['clickedTableID'])

    if (getElement('chart-season-rating-line')) {

      chartLine_1(
        data_1, 'chart-season-rating-line', clickedTableResize,
        dropdown12Data[clickedTableResize]['chartLine1Metric']
      )
      
    }

    // seasonCategoriesClickChartsByClickedDrivers()

  }

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {

    seasonRatingsDescChartsFill() 
    
    // draw charts
    chartLine_1(
      data_1, 'chart-season-rating-line', clickedTable,
      dropdown12Data[clickedTable]['chartLine1Metric']
    )
  
    seasonCategoriesClickChartsByClickedDrivers()
    
  }
  
}


function seasonDriversUpdateLists() {

  let data = copyObject(data_2)

  data = sortValues(data, 'TeamPointsOfficial')
  
  seasonDriversTeamsUnique = data.map(row => row['Team'])
  seasonDriversTeamsUnique = dropDuplicates(seasonDriversTeamsUnique)

  seasonDriversTeamLeader = seasonDriversTeamsUnique[0]

  data = sortValuesString(data, 'FullName', ascending=true)

  // globals
  seasonDriversTeamsList = data.map(row => row['Team'])

  seasonDriversNamesList = data.map(row => row['FullName'])
  seasonDriversIDTsList = data.map(row => row['DriverIDT'])
  seasonDriversIDsList = data.map(row => row['DriverID'])
  seasonDriversColorsList = data.map(row => row['Color'])
  seasonDriversNumbersList = data.map(row => row['Number'])

  seasonDriversDataAvailableList = data.map(o => o['DriverEventsAvailable'])

}


function seasonDriversGetLeaders(data_2_local) {

  data_2_local = sortValues(data_2_local, 'TeamPointsOfficial')

  let leaderTeam = data_2_local[0]['Team']

  let data = data_2_local.filter((d) => d['Team'] == leaderTeam)
  if (data.length > 2) { data = sortValues(data, 'RacesParticipated').slice(0, 2) }
  data = sortValues(data, 'RankPointsAvg', ascending=true)
  if (data[0]['RankPointsAvg'] == 'DNC') { data = [...data].reverse() }

  glVSeasonComparison['leftIDT'] = data[0]['DriverIDT']
  glVSeasonComparison['rightIDT'] = data[1]['DriverIDT']

  seasonDriversTeamLeft = leaderTeam
  seasonDriversTeamRight = leaderTeam

  seasonDriversNumberLeft = data[0]['Number']
  seasonDriversNumberRight = data[1]['Number']

  seasonDriversNameLeft = data[0]['FullName']
  seasonDriversNameRight = data[1]['FullName']

  seasonDriversIDLeft = data[0]['DriverID']
  seasonDriversIDRight = data[1]['DriverID']

  seasonDriversColorLeft = data[0]['Color']
  seasonDriversColorRight = data[1]['Color']

  if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft)}

}


function dropdown13CenterFill() {

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'team': seasonDriversTeamsUnique
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown13CenterID,
    'items': seasonDriversTeamsUnique,
    'attributes': itemAttributes,
    'indexes': dropdown14IDItemIndexes,
    'width': true,
    'titles': 'Выберите команду',
    'border': true,
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let dropdownLabel = getElement(dropdown13TitleCenterID)

  let label

  // change text of current label
  if (seasonDriversTeamLeft == seasonDriversTeamRight) {
    label = seasonDriversTeamLeft
  } else {
    label = 'Выберите команду'
  }

  let index = (label == 'Выберите команду') ? null : seasonDriversTeamsUnique.indexOf(label)

  dropdownLabel.textContent = label
  dropdownLabel.setAttribute('index', index)

}


function dropdown13CenterItemMouseUp(elementID) {

  getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
  getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

  let item = getElement(elementID)
  let index = item.getAttribute('index')
  let team = seasonDriversTeamsUnique[index]

  let dropdownLabel = getElement(dropdown13TitleCenterID)

  // if there were more than 2 drivers during champiohship - choose 2 with more races partisipated
  let data = data_2.filter((d) => d['Team'] == team)
  if (data.length > 2) { data = sortValues(data, 'RacesParticipated').slice(0, 2) }
  data = sortValues(data, 'RankPointsAvg', ascending=true)
  if (data[0]['RankPointsAvg'] == 'DNC') { data = [...data].reverse() }

  seasonDriversTeamLeft = team
  seasonDriversTeamRight = team

  seasonDriversNameLeft = data[0]['FullName']
  seasonDriversNameRight = data[1]['FullName']

  seasonDriversIDLeft = data[0]['DriverID']
  seasonDriversIDRight = data[1]['DriverID']

  glVSeasonComparison['leftIDT'] = data[0]['DriverIDT']
  glVSeasonComparison['rightIDT'] = data[1]['DriverIDT']

  seasonDriversColorLeft = data[0]['Color']
  seasonDriversColorRight = data[1]['Color']

  seasonDriversNumberLeft = data[0]['Number']
  seasonDriversNumberRight = data[1]['Number']

  getElement(dropdown13TitleLeftID).setAttribute('color', seasonDriversColorLeft)
  getElement(dropdown13TitleRightID).setAttribute('color', seasonDriversColorRight)

  if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft)}

  // update driver dropdown titles
  getElement(dropdown13TitleLeftID).textContent = seasonDriversNameLeft
  getElement(dropdown13TitleRightID).textContent = seasonDriversNameRight

  // update images
  seasonComparisonUpdateBadge(
    glVSeasonComparison['leftIDT'], seasonDriversNameLeft, seasonDriversColorLeft,
    seasonDriversTeamLeft, seasonDriversNumberLeft, 'left'
  )
  
  seasonComparisonUpdateBadge(
    glVSeasonComparison['rightIDT'], seasonDriversNameRight, seasonDriversColorRight,
    seasonDriversTeamRight, seasonDriversNumberRight, 'right'
  )

  let dataLeft = data[0]
  let dataRight = data[1]
  
  // update content
  seasonComparisonUpdateCharts(glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'], dataLeft, dataRight)

  dropdownLabel.textContent = team
  dropdownLabel.setAttribute('index', index)

}


function dropdown13CenterNavMouseUp(element) {

  let itemID = dropdownNavItemGetID(element, dropdown14IDItemIndexes)
  dropdown13CenterItemMouseUp(itemID)
  
}


function seasonDriversManageNoData(driverIDT, dirverName, sprintIndex, kind='left') {

  let data = data_2.filter(o => o['driverIDT'] == driverIDT)

  let eventMarker

  if (sprintIndex == 2) {
    eventMarker = 'в этом сезоне'
  } else if (sprintIndex == 1) {
    eventMarker = 'гонках'
  } else if (sprintIndex == 0) {
    eventMarker = 'спринтах'
  }

  let noDataElement = getElement(seasonDriversDriverLeftNoDataID)
  let noDataInfo = getElement(seasonDriversDriverLeftNoDataInfoID)

  if (kind == 'left') {
    noDataElement = getElement(seasonDriversDriverLeftNoDataID)
    noDataInfo = getElement(seasonDriversDriverLeftNoDataInfoID)
  } else {
    noDataElement = getElement(seasonDriversDriverRightNoDataID)
    noDataInfo = getElement(seasonDriversDriverRightNoDataInfoID)
  }

  noDataInfo.textContent = `${dirverName} в ${eventMarker}`
  // noDataElement.classList.remove('hidden')
  noDataElement.style.opacity = 1

}


function dropdown13Fill(dropdownID, driverIDT) {

  let dataCurrent = data_2.filter((d) => d['DriverIDT'] == driverIDT)[0]
  let driverCurrentName = dataCurrent['FullName']

  // let dropdownMenuItemID = dropdownMenuID + '-item-'

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'team': seasonDriversTeamsList,
    'idt': seasonDriversIDTsList,
    'driverID': seasonDriversIDsList,
    'color': seasonDriversColorsList,
    'number': seasonDriversNumbersList,
    'dataAvailable': seasonDriversDataAvailableList
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdownID,
    'items': seasonDriversNamesList,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let dropdownCurrent
  let dropdownCurrentTitleID
  let dropdownCurrentContainerID

  if (dropdownID.includes('left')) {

    dropdownCurrent = getElement(dropdown13LeftID)
    
    // dropdownCurrentContainerID = dropdown13LeftContainerID
    dropdownCurrentTitleID = dropdown13TitleLeftID
    seasonDriversNameLeft = driverCurrentName
    
  } else {

    dropdownCurrent = getElement(dropdown13RightID)
    
    // dropdownCurrentContainerID = dropdown13RightContainerID
    dropdownCurrentTitleID = dropdown13TitleRightID
    seasonDriversNameRight = driverCurrentName
    
  }

  let dropdownCurrentTitle = getElement(dropdownCurrentTitleID)

  // change text of current button
  dropdownCurrentTitle.textContent = driverCurrentName
  dropdownCurrentTitle.setAttribute('index', seasonDriversIDTsList.indexOf(driverIDT))
  dropdownCurrentTitle.setAttribute('team', dataCurrent['Team'])
  dropdownCurrentTitle.setAttribute('number', dataCurrent['Number'])
  dropdownCurrentTitle.setAttribute('color', dataCurrent['Color'])
  dropdownCurrentTitle.setAttribute('idt', driverIDT)
  dropdownCurrentTitle.setAttribute('dataAvailable', dataCurrent['DriverEventsAvailable'])

}


function dropdown13ItemMouseUp(element, elementID) {

  let dataAvailable = element.getAttribute('dataAvailable')
  let sprintIndex = glVSeason['SprintIndex']

  if (seasonDriversDataAvailableCheck(dataAvailable, sprintIndex)) {

    let index = element.getAttribute('index')

    let idt = element.getAttribute('idt')
    let name = element.textContent
    let team = element.getAttribute('team')
    let dirverID = element.getAttribute('driverID')
    let color = element.getAttribute('color')
    let number = element.getAttribute('number')
  
    let driverLeft
    let driverRight
  
    let teamLeft
    let teamRight

    let numberLeft
    let numberRight
    
    let dropdownLabel

    if (elementID.includes('left')) {

      getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
      getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

      seasonDriversTeamLeft = team
      seasonDriversNameLeft = name
      seasonDriversIDLeft = dirverID
      glVSeasonComparison['leftIDT'] = idt
      seasonDriversColorLeft = color
      seasonDriversNumberLeft = number
      seasonDriversColorRight = getElement(dropdown13TitleRightID).getAttribute('color')

      if (seasonDriversColorRight == seasonDriversColorLeft) {
        seasonDriversColorRight = modColor2(seasonDriversColorLeft)
      }

      seasonComparisonUpdateBadge(
        idt, name, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
      seasonComparisonUpdateBadge(
        glVSeasonComparison['rightIDT'], seasonDriversNameRight, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')
  
      dropdownLabel = getElement(dropdown13TitleLeftID)
      
      dropdownLabel.textContent = name
      dropdownLabel.setAttribute('index', index)
      dropdownLabel.setAttribute('color', color)
      dropdownLabel.setAttribute('number', number)
      dropdownLabel.setAttribute('dataAvailable', dataAvailable)

      // update team name
      let titleCenter = getElement(dropdown13TitleCenterID)

      if (seasonDriversTeamLeft != seasonDriversTeamRight) {
        titleCenter.textContent = 'Выберите команду'
        titleCenter.setAttribute('index', null)
      } else {
        titleCenter.textContent = seasonDriversTeamLeft
        titleCenter.setAttribute('index', seasonDriversTeamsUnique.indexOf(seasonDriversTeamLeft))
      }

      let dataLeft = data_2.filter(o => o['DriverIDT'] == idt)[0]
      let dataRight = data_2.filter(o => o['DriverIDT'] == glVSeasonComparison['rightIDT'])[0]

      seasonComparisonUpdateCharts(idt, glVSeasonComparison['rightIDT'], dataLeft, dataRight)
      
    } else {

      getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
      getElement(seasonDriversDriverRightNoDataID).style.opacity = 0
      
      seasonDriversTeamRight = team
      seasonDriversNameRight = name
      seasonDriversIDRight = dirverID
      glVSeasonComparison['rightIDT'] = idt
      seasonDriversColorRight = color
      seasonDriversNumberRight = number
      seasonDriversColorLeft = getElement(dropdown13TitleLeftID).getAttribute('color')
      
      if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft) }

      seasonComparisonUpdateBadge(
        glVSeasonComparison['leftIDT'], seasonDriversNameLeft, seasonDriversColorLeft,
        seasonDriversTeamLeft, seasonDriversNumberLeft, 'left'
      )
      
      seasonComparisonUpdateBadge(
        idt, name, seasonDriversColorRight,
        seasonDriversTeamRight, seasonDriversNumberRight, 'right'
      )

      dropdownLabel = getElement(dropdown13TitleRightID)
      
      dropdownLabel.textContent = name
      dropdownLabel.setAttribute('index', index)
      dropdownLabel.setAttribute('color', color)
      dropdownLabel.setAttribute('number', number)
      dropdownLabel.setAttribute('dataAvailable', dataAvailable)

      // update team name
      let titleCenter = getElement(dropdown13TitleCenterID)

      if (seasonDriversTeamLeft != seasonDriversTeamRight) {
        titleCenter.textContent = 'Выберите команду'
        titleCenter.setAttribute('index', null)
      } else {
        titleCenter.textContent = seasonDriversTeamLeft
        titleCenter.setAttribute('index', seasonDriversTeamsUnique.indexOf(seasonDriversTeamLeft))
      }

      let dataLeft = data_2.filter(o => o['DriverIDT'] == glVSeasonComparison['leftIDT'])[0]
      let dataRight = data_2.filter(o => o['DriverIDT'] == idt)[0]

      seasonComparisonUpdateCharts(glVSeasonComparison['leftIDT'], idt, dataLeft, dataRight)
      
    }
    
  } else {

    let idt = element.getAttribute('idt')
    let name = element.textContent

    if (elementID.includes('left')) {

      getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

      // hideElement(seasonDriversDriverRightNoDataID)
      seasonDriversManageNoData(idt, name, sprintIndex, kind='left')
      
    } else {

      getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0

      // hideElement(seasonDriversDriverLeftNoDataID)
      seasonDriversManageNoData(idt, name, sprintIndex, kind='right')
      
    }
    
  }

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

  // // fill menu
  // dropdownMenuAddItems(
  //   dropdown14MenuID, dropdownLabels, dropdown14MenuItemID,
  //   disableArray=false, addSeparatorAfterIdx=[],
  //   itemClass='dropdown-item px-05'
  // )

  // // items attributes
  // dropdownItemsSetAttributes(
  //   dropdown14MenuID, {
  //     'index': 'index',
  //     'metric': dropdownMetrics,
  //     'label': dropdownLabels
  //     })

  // let itemsList = copyObject(dropdownLabels)

  // let maximumWidth = getDropdownMaximumwidth(
  //   dropdown14ContainerID, dropdown14TitleID, dropdown14MenuID, itemsList)

  let dropdownLabel = getElement(dropdown14TitleID)
  let label = dropdownLabels[0]

  // dropdown label
  dropdownLabel.textContent = label
  dropdownLabel.setAttribute('metric', dropdownMetrics[0])
  dropdownLabel.setAttribute('label', label)

  // update widths
  // updateDropdownWidth(dropdown14ID, dropdown14MenuID)

  // update widths
  // setDropdownWidth(dropdown14ContainerID, dropdown14MenuID, maximumWidth, setMenuWidth=false)
  
}


function dropdown14MouseUp(element) {

  // hideElement(seasonDriversDriverLeftNoDataID)
  // hideElement(seasonDriversDriverRightNoDataID)

  getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
  getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

  let dropdownLabel = getElement(dropdown14TitleID)
  let label = element.getAttribute('label')

  dropdownLabel.textContent = label
  dropdownLabel.setAttribute('metric', element.getAttribute('metric'))
  dropdownLabel.setAttribute('label', label)

  // update widths
  // updateDropdownWidth(dropdown14ID, dropdown14MenuID)

  seasonDriversUpdateChart1(
    data_1, data_2,
    glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'],
    seasonDriversColorLeft, seasonDriversColorRight
  )

  seasonComparisonSliderActivate()

  sliderTooltipFill(
    seasonComparisonDataLeft,
    seasonComparisonDataRight,
    seasonComparisonDataDiff,
    seasonDriversColorLeft,
    seasonDriversColorRight,
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
  img.children[0].src = imgPath

  let nameElement = getElement(nameElementID)
  nameElement.textContent = name
  nameElement.style.color = color

  let teamElement = getElement(teamElementID)
  teamElement.textContent = `#${number} ${team}`

}


function seasonComparisonFillLegend(containerID, driversData) {

  let legend = getElement(containerID)
  legend.innerHTML = ''

  let colors = []

  driversData.forEach((obj, i) => {

    let name = obj['FullName']
    let color = obj['Color']

    if (colors.includes(color)) {
      color = modColor2(color)
    }

    colors.push(color)

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

    if (i < driversData.length - 1) {

      let separatorEl = document.createElement('div')

      Object.assign(separatorEl, {
        className: 'mx-125'
      })

      legend.appendChild(separatorEl)
        
    }
    
  })
  
}


function seasonComparisonUpdateCharts(driverLeft, driverRight, dataLeft, dataRight) {

  // data : data_2

  let colorLeft = seasonDriversColorLeft
  let colorRight = seasonDriversColorRight

  seasonComparisonFillLegend(seasonComparisonLegendID, [dataLeft, dataRight])

  chartHBars_1(
    dataLeft, colorLeft,
    'chart-season-drivers-hbar-1',
    dataRight, colorRight,
  )

  seasonComparisonStatisticsFill(seasonComparisonStatisticsDict, dataLeft, dataRight, colorLeft, colorRight)

  // update line chart
  seasonDriversUpdateChart1(data_1, data_2, driverLeft, driverRight, colorLeft, colorRight)

  seasonComparisonSliderParamsUpdate(
    seasonComparisonSliderData['minIdx'],
    seasonComparisonSliderData['maxIdx']
  )

  seasonComparisonSliderActivate()

  sliderTooltipFill(
    seasonComparisonDataLeft,
    seasonComparisonDataRight,
    seasonComparisonDataDiff,
    seasonDriversColorLeft,
    seasonDriversColorRight,
    seasonComparisonSliderData['metrics'],
    seasonComparisonSliderData['type'],
    kind='full',
    seasonComparisonSliderData['subType'],
  )

  window.onresize = () => {

    updateUnits()

    if (getElement('chart-season-drivers-hbar-1')) {

      chartHBars_1(
        dataLeft, colorLeft,
        'chart-season-drivers-hbar-1',
        dataRight, colorRight
      )
      
    }
    
    if (getElement('chart-1')) {

      // update line chart
      seasonDriversUpdateChart1(data_1, data_2, driverLeft, driverRight, colorLeft, colorRight)

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

    seasonComparisonDescChartsFill()

    chartHBars_1(
      dataLeft, colorLeft,
      'chart-season-drivers-hbar-1',
      dataRight, colorRight,
    )
  
    // update line chart
    seasonDriversUpdateChart1(data_1, data_2, driverLeft, driverRight, colorLeft, colorRight)

    seasonComparisonSliderParamsUpdate(
      seasonComparisonSliderData['minIdx'],
      seasonComparisonSliderData['maxIdx']
    )
    
    seasonComparisonSliderActivate()
    
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

  // data1 -> data_1
  // data2 -> data_2

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

    metricLeftAverage = '-'

    metricLeftStintLength = '-'
    
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

    metricRightAverage = '-'

    metricRightStintLength = '-'
    
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
      
      metricLeftStd = '-'
      
    } else if (metricLeftNaN) {

      metricLeftMedian = '-'
      
      metricLeftMin = '-'
      metricLeftMax = '-'
      metricLeftStd = '-'
      
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
      
      metricRightStd = '-'
      
    } else if (metricRightNaN) {

      metricRightMedian = '-'
      
      metricRightMin = '-'
      metricRightMax = '-'
      metricRightStd = '-'
      
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
    if (isNaN(metricMedianDelta)) {metricMedianDelta = '-'}
    if (isNaN(metricMinDelta)) {metricMinDelta = '-'}
    if (isNaN(metricMaxDelta)) {metricMaxDelta = '-'}
    if (isNaN(metricStdDelta)) {metricStdDelta = '-'}

    // deltas fill
    valueDelta1.textContent = metricMinDelta
    valueDelta2.textContent = metricMaxDelta
    valueDelta3.textContent = metricStdDelta
    valueDelta4.textContent = metricMedianDelta
    valueDelta5.textContent = metricDiffDelta

    // if ((metricDiffLeft == 0) && (metricDiffRight == 0)) {
      
    //   valueLeft5.textContent = '-'
    //   valueRight5.textContent = '-'
    //   valueDelta5.textContent = '-'
      
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
      
      metricLeftSum = '-'
      metricLeftStart = '-'
      metricLeftEnd = '-'
      
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
      
      metricRightSum = '-'    
      metricRightStart = '-'
      metricRightEnd = '-'
      
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
    if (isNaN(metricSumDelta)) {metricSumDelta = '-'}
    if (isNaN(metricStartDelta)) {metricStartDelta = '-'}
    if (isNaN(metricEndDelta)) {metricEndDelta = '-'}

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
  if (isNaN(metricAverageDelta)) {metricAverageDelta = '-'}
  if (isNaN(metricStintLengthDelta)) {metricStintLengthDelta = '-'}

  // delta average fill
  valueDelta0.textContent = metricAverageDelta
  valueDelta6.textContent = metricStintLengthDelta

  if ((metricDiffLeft == 0) && (metricDiffRight == 0)) {
      
    valueLeft5.textContent = '-'
    valueRight5.textContent = '-'
    valueDelta5.textContent = '-'
    
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
    legendCircleLeft.classList.add('slider-legend-circle')
    legendCircleLeft.setAttribute('fill', seasonDriversColorLeft)
    legendCircleLeft.setAttribute('cx', `${coordX}`)
    legendCircleLeft.setAttribute('cy', `${-sliderCirclesOffsetY + px1}`)

    sliderLegendCirclesLeft.appendChild(legendCircleLeft)

    let legendCircleRight = document.createElementNS(svgNS, 'circle')
    legendCircleRight.classList.add('slider-legend-circle')
    legendCircleRight.setAttribute('fill', seasonDriversColorRight)
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
      seasonDriversColorLeft,
      seasonDriversColorRight,
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
      seasonDriversColorLeft,
      seasonDriversColorRight,
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
    seasonDriversColorLeft,
    seasonDriversColorRight,
    seasonComparisonSliderData['metrics'],
    seasonComparisonSliderData['type'],
    kind='values',
    seasonComparisonSliderData['subType'],
  )

  seasonComparisonSliderData['on'] = false

}


function seasonComparisonSliderMouseOver(kind) {

  let slider
  let color = paleColor(seasonDriversColorLeft, 0.65)

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
  let color = paleColor(seasonDriversColorLeft, 0.65)

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
  let color = paleColor(seasonDriversColorLeft, 0.65)

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

  let metricsNAN = ['DNC', '-']

  // define metrics
  if ((metricsNAN.includes(metricLeft)) & (!metricsNAN.includes(metricRight))) {

    valueLeft = '-'
    metricLeft = 0
    
  } else if ((!metricsNAN.includes(metricLeft)) & (metricsNAN.includes(metricRight))) {

    valueRight = '-'
    metricRight = 0
    
  } else if ((metricsNAN.includes(metricLeft)) & (metricsNAN.includes(metricRight))) {

    valueLeft = '-'
    valueRight = '-'

    metricLeft = 0
    metricRight = 0
    
  } else {

    valueLeft = metricLeft
    valueRight = metricRight
      
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
    
    coordCircle = width - circleRadius

    coord1 = 0
    coord2 = width - circleRadius - delta

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
    coordCircle = correction + delta
    coord3 = correction + 2*delta
    coord4 = width
    
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

  seasonComparisonFillLegend(seasonComparisonStatisticsLegendID, [dataLeft, dataRight])

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


function seasonPaceUpdateEventsData() {

  let data = copyObject(data_2)

  let calendarLocal = copyObject(calendar)
  
  seasonPaceEvents = copyObject(calendarLocal).filter(o => o['SeasonID'] == glVSeason['SeasonID'])
  seasonPaceEvents = sortValues(seasonPaceEvents, 'EventIndex', true)

  seasonPaceEventIndexes = dropDuplicates(seasonPaceEvents.map(o => o['EventIndex']))
  seasonPaceEventNames = dropDuplicates(seasonPaceEvents.map(o => o['EventNameRus']))

}


function seasonPaceUpdateData(indexStart, indexEnd, teamID) {

  // filter by selected events
  let condition1 = (o) => (o['EventIndex'] >= indexStart) & (o['EventIndex'] <= indexEnd)

  data_7_this_interval = data_7.filter(o => condition1(o))

  data_8_this_interval = copyObject(data_8)
  data_8_this_interval = data_8_this_interval.filter(o => condition1(o))

  // filter by team
  let condition2 = (o) => (condition1(o) && (o['TeamID'] == teamID))

  data_9_this_team = data_9.filter(o => condition2(o))
  data_10_this_team = data_10.filter(o => condition2(o))

  let driverIDsThisInterval = data_9_this_team.map(o => o['DriverID'])
  
  // drivers
  let driverIDTs = drivers_part_this_season.filter(o => (o['TeamID'] == teamID) && (driverIDsThisInterval.includes(o['DriverID'])))
  driverIDTs = driverIDTs.map(o => o['DriverIDT'])

  seasonPaceDrivers = []

  driverIDTs.forEach((driverIDT, i) => {

    let driverData = drivers_part_this_season.filter(o => o['DriverIDT'] == driverIDT)

    if (driverData.length > 0) {

      driverData = driverData[0]

      let driverID = driverData['DriverID']
      let name = driverData['FullName']
      let color = driverData['Color']
      let abb = driverData['Abbreviation']

      let usedColors = seasonPaceDrivers.map(o => o['Color'])
      color = colorCheck(color, usedColors, driverData)
  
      seasonPaceDrivers.push({
        DriverID: driverID,
        DriverIDT: driverIDT,
        Name: name,
        Color: color,
        Abbreviation: abb
      })
      
    }

  })

  seasonPaceFillDriversLegend()

}


function seasonPaceUpdateCharts(
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
  let fillArea = getElement(seasonPaceChart12FillAreaID)
  let meanLine = getElement(seasonPaceChart12MeanLineID)

  lines.classList.add('season-pace-chart-12-fillarea-active')
  fillArea.classList.add('season-pace-chart-12-fillarea-active')
  
  meanLine.classList.add('season-pace-chart-12-meanline-active')
  
}


function seasonPaceChart12Deactivate() {

  let lines = getElement(seasonPaceChart12LinesID)
  let fillArea = getElement(seasonPaceChart12FillAreaID)
  let meanLine = getElement(seasonPaceChart12MeanLineID)

  lines.classList.remove('season-pace-chart-12-fillarea-active')
  fillArea.classList.remove('season-pace-chart-12-fillarea-active')
  
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


function dropdown15Fill(team) {

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
  
  let dropdownLabel = getElement(dropdown15TitleID)
  
  glVSeasonPace['TeamID'] = teamID
  glVSeasonPace['Team'] = drivers_part_this_season.filter(o => o['TeamID'] == teamID)[0]['Team']

  seasonUpdatePaths(
    glVSeason['SeasonID'],
    glVSeason['SprintIndex'],
    glVSeasonPace['TeamID']
  )

  let dataPaths = [d3.csv(seasonData8path)]

  Promise.all(dataPaths).then(function(files) {

    data_8 = files[0]
  
    seasonPaceUpdateData(
      glVSeasonPace['IndexStart'],
      glVSeasonPace['IndexEnd'],
      glVSeasonPace['TeamID']
    )
    
    seasonPaceUpdateCharts(
      data_7_this_interval, data_8_this_interval, data_10_this_team,
      data_9_this_team, seasonPaceDrivers,
      chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
      chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
    )

    dropdownLabel.textContent = glVSeasonPace['Team']
    dropdownLabel.setAttribute('index', index)

    }).catch(function(err) {
    // handle error here
  })

  disappearLoader(loaderID)

}


function dropdown15NavMouseUp(element) {

  let itemID = dropdownNavItemGetID(element, dropdown15ItemIndexes)
  dropdown15ItemMouseUp(itemID)
  
}


function dropdown16Fill(index) {

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'name': seasonPaceEventNames
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown16ID,
    'items': seasonPaceEventNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let titleElement = getElement(dropdown16TitleID)
  let title = seasonPaceEvents.filter(o => o['EventIndex'] == index)[0]['EventNameRus']
  
  titleElement.textContent = title
  titleElement.setAttribute('index', index) 
  
}

function dropdown16MouseUp(element) {

  let titleElement = getElement(dropdown16TitleID)

  let index = Number(element.getAttribute('index'))
  let name = element.getAttribute('name')

  titleElement.textContent = name
  titleElement.setAttribute('index', index)
  titleElement.setAttribute('name', name)

  glVSeasonPace['IndexStart'] = index

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

  seasonPaceUpdateData(
    glVSeasonPace['IndexStart'], glVSeasonPace['IndexEnd'], glVSeasonPace['TeamID']
  )
  
  seasonPaceUpdateCharts(
    data_7_this_interval, data_8_this_interval, data_10_this_team,
    data_9_this_team, seasonPaceDrivers,
    chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
    chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )
  
}


function dropdown17Fill(index) {

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'name': seasonPaceEventNames
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': dropdown17ID,
    'items': seasonPaceEventNames,
    'attributes': itemAttributes,
    'width': true,
    'border': true
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  let titleElement = getElement(dropdown17TitleID)
  let name = seasonPaceEvents.filter(o => o['EventIndex'] == index)[0]['EventNameRus']
  
  titleElement.textContent = name
  titleElement.setAttribute('index', index)
  titleElement.setAttribute('name', name)
  
}


function dropdown17MouseUp(element) {

  if (!element.classList.contains('disabled')) {

    let titleElement = getElement(dropdown17TitleID)

    let index = Number(element.getAttribute('index'))
    let name = element.getAttribute('name')
  
    titleElement.textContent = name
    titleElement.setAttribute('index', index)
    titleElement.setAttribute('name', name)

    glVSeasonPace['IndexEnd'] = index

  }

  seasonPaceUpdateData(
    glVSeasonPace['IndexStart'], glVSeasonPace['IndexEnd'], glVSeasonPace['TeamID']
  )
  
  seasonPaceUpdateCharts(
    data_7_this_interval, data_8_this_interval, data_10_this_team,
    data_9_this_team, seasonPaceDrivers,
    chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
    chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )
  
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


function seasonSegmentDataUpdate(drivers_part) {

  // filter drivers_part
  drivers_part_this_season = drivers_part
    .filter(o => o['SeasonID'] == glVSeason['SeasonID'])

}


function seasonSegmentListsUpdate() {

  // get teams data
  let teamsData = objectDropColumns(drivers_part_this_season, ['TeamID', 'Team'])
  teamsData = dropDuplicatesArrayOfObject(teamsData, 'TeamID')
  teamsData = sortValuesString(teamsData, 'Team', true)

  // define team ids and names list
  seasonTeamIDs = teamsData.map(o => o['TeamID'])
  seasonTeams = teamsData.map(o => o['Team'])
  
}


function seasonSegmentDataRefreshRacesprint() {

  // segment
  drivers_part_this_season = []
  seasonTeamIDs = []
  seasonTeams = []

  // page statistics
  data_6 = []

  // page comparison
  seasonComparisonSliderData['minIdx'] = null
  seasonComparisonSliderData['maxIdx'] = null

  
}


function seasonSegmentDataRefresh() {

  drivers_part_this_season = []
  seasonTeamIDs = []
  seasonTeams = []

  data_1 = []
  data_2 = []
  data_6 = []
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









































function seasonLoadPages(pageID, kind) {

  if (kind=='segment') {

    scrollPosition = 0
  
    // clear globals
    glVSeason = {
      'SeasonIDs': [],
      'SeasonID' : null,
      'SeasonOver': null,
      'Page': null,
      'CategoriesClickedTableID': null,
      'CategoriesClickedDrivers': [],
      'ComparisonRefresh': true,
      // 'FirstLoad': null
    }
  
    glVSeasonPace = {
      'Team': null,
      'IndexStart': null,
      'IndexEnd': null,
      'CheckMeanPaceCondition': null,
      'CheckMeanPaceSmoothCondition': null,
    }
  
    glVSeasonComparison = {
      'sliderMetrics': null,
      'type': null,
      'subType': null
    }
  
    seasonComparisonSliderData = {
      'on': false,
      'minIdx': null,
      'maxIdx': null,
      'minCoordXDec': null,
      'maxCoordXDec': null,
      'thumbWidthHalf': null,
      'paddingXOuter': null
    }

  }

  glVSeason['SeasonID'] ||= lastElement(seasonIDs)
  glVSeason['SprintIndex'] ||= 2

  if (kind=='segment') {

    seasonCalendar = calendar.filter(o => o['SeasonID'] == glVSeason['SeasonID'])

    // menu years
    menuYearsFill(menuYears11ID, seasonIDs, glVSeason['SeasonID'])
  
    // menu race-sprint
    seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])
    
  }

  // update drivers and teams data
  if (drivers_part_this_season.length == 0) {
    seasonSegmentDataUpdate(drivers_part)
    seasonSegmentListsUpdate()
  }

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

    data_1 = files[0]
    data_2 = files[1]

    updateSeasonPages(pageID)
    
    }).catch(function(err) {
  // handle error here
  })

}


function updateSeasonStatisticsPage() {

  let themeToggler = getElement(mainChangeThemeButtonID)
  themeTogglerReset(themeToggler)

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonStatistcsPageID

  getElement(seasonContentContainerID).innerHTML = ''
  getElement(seasonContentContainerID).innerHTML += pageSeasonStatistics

  // fill horizontal menu
  seasonHorizontalMenuFill(seasonStatistcsPageID)

  if (data_6.length) {
  
    updateSeasonStatisticsPageContent(data_1, data_6)
    
  } else {

    seasonUpdatePaths(
      glVSeason['SeasonID'],
      glVSeason['SprintIndex']
    )

    let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData6path)]

    Promise.all(dataPaths).then(function(files) {
  
      data_1 = files[0]
      data_6 = files[1]
  
      updateSeasonStatisticsPageContent(data_1, data_6)
      
      }).catch(function(err) {
    // handle error here
    })
  
  }

}


function updateSeasonStatisticsPageContent(data_1, data_6) {

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

  glVGlobal['FirstLoad'] = false

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  seasonAppearElements(glVGlobal['Page'])
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)

}


function updateSeasonRatingsPage() {

  updateUnits()

  seasonCategoriesClickedData = []

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonRatingsPageID

  seasonCategoriesRanksTableData['clickedTableID'] ||= 0

  // clear content
  getElement(seasonContentContainerID).innerHTML = ''
  getElement(seasonContentContainerID).innerHTML += pageSeasonCategories

  // fill horizontal menu
  seasonHorizontalMenuFill(seasonRatingsPageID)

  // fill descs
  seasonRatingsDescChartsFill()

  updateSeasonRatingsPageContent(data_1, data_2)
  
}


function updateSeasonRatingsPageContent(data_1, data_2) {
    
  // fill dropdown
  dropdown12Fill()

  // fill table
  seasonCategoriesRanksTableFill(data_2)

  // fill info
  seasonCategoriesInfoTableFill(data_2)

  // build charts
  seasonCategoriesUpdateCharts()

  glVGlobal['FirstLoad'] = false

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  seasonAppearElements(glVGlobal['Page'])
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)

}


function updateSeasonComparisonPage() {

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonComparisonPageID

  getElement(seasonContentContainerID).innerHTML = ''
  getElement(seasonContentContainerID).innerHTML += pageSeasonComparison

  // fill horizontal menu
  seasonHorizontalMenuFill(seasonComparisonPageID)

  // fill descs
  seasonComparisonDescChartsFill()

  updateSeasonComparisonPageContent(data_1, data_2)
  
}


function updateSeasonComparisonPageContent(data_1, data_2) {

  seasonDriversUpdateLists()
  seasonDriversGetLeaders(data_2)

  // fill dropdowns
  dropdown13CenterFill()
  dropdown13Fill(dropdown13LeftID, glVSeasonComparison['leftIDT'])
  dropdown13Fill(dropdown13RightID, glVSeasonComparison['rightIDT'])
  dropdown14Fill()

  // fill badge left
  seasonComparisonUpdateBadge(
    glVSeasonComparison['leftIDT'], seasonDriversNameLeft,
    seasonDriversColorLeft, seasonDriversTeamLeft,
    seasonDriversNumberLeft, 'left'
  )

  // fill badge right
  seasonComparisonUpdateBadge(
    glVSeasonComparison['rightIDT'], seasonDriversNameRight,
    seasonDriversColorRight, seasonDriversTeamRight,
    seasonDriversNumberRight, 'right'
  )

  let dataLeft = data_2.filter(o => o['DriverIDT'] == glVSeasonComparison['leftIDT'])[0]
  let dataRight = data_2.filter(o => o['DriverIDT'] == glVSeasonComparison['rightIDT'])[0]

  // update charts
  seasonComparisonUpdateCharts(
    glVSeasonComparison['leftIDT'], glVSeasonComparison['rightIDT'],
    dataLeft, dataRight
  )

  glVGlobal['FirstLoad'] = false

  // scroll to specific position
  pageContainerSetScroll(scrollPosition)

  // hide pages menu
  globalMenuPagesHide()

  // appear elements
  seasonAppearElements(glVGlobal['Page'])
  appearElement(seasonMainContainerID)

  // hide loader
  disappearLoader(loaderID)

}


function updateSeasonPacePage() {

  updateUnits()

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonPacePageID

  glVSeasonPace['CheckMeanPaceCondition'] ||= 0
  glVSeasonPace['CheckMeanPaceSmoothCondition'] ||= 1

  getElement(seasonContentContainerID).innerHTML = ''
  getElement(seasonContentContainerID).innerHTML += pageSeasonPace

  // fill horizontal menu
  seasonHorizontalMenuFill(seasonPacePageID)

  // fill descs
  seasonPaceDescsFill()

  // define teamID
  glVSeasonPace['TeamID'] ||= arrayGetRandom(seasonTeamIDs)

  // check if team participated in selected season
  if (!seasonTeamIDs.includes(glVSeasonPace['TeamID'])) {
    glVSeasonPace['TeamID'] = arrayGetRandom(seasonTeamIDs)
  }

  glVSeasonPace['Team'] = drivers_part_this_season
    .filter(o => o['TeamID'] == glVSeasonPace['TeamID'])[0]['Team']

  updateSeasonPacePageContent(data_2)

}


function updateSeasonPacePageContent(data_2) {

  // update paths
  seasonUpdatePaths(
    glVSeason['SeasonID'],
    glVSeason['SprintIndex'],
    glVSeasonPace['TeamID']
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

    // define events data
    seasonPaceUpdateEventsData()

    let indexStart = Number(firstElement(seasonPaceEventIndexes))
    let indexEnd = Number(lastElement(seasonPaceEventIndexes))

    glVSeasonPace['IndexStart'] = indexStart
    glVSeasonPace['IndexEnd'] = indexEnd

    // // remove
    // glVSeasonPace['IndexStart'] = 29
    // glVSeasonPace['IndexEnd'] = 29

    dropdown15Fill(glVSeasonPace['Team'])
    dropdown16Fill(glVSeasonPace['IndexStart'])
    dropdown17Fill(glVSeasonPace['IndexEnd'])

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

    seasonPaceUpdateData(
      glVSeasonPace['IndexStart'],
      glVSeasonPace['IndexEnd'],
      glVSeasonPace['TeamID']
    )

    seasonPaceUpdateCharts(
      data_7_this_interval, data_8_this_interval, data_10_this_team,
      data_9_this_team, seasonPaceDrivers,
      chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
      chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
    )

    glVGlobal['FirstLoad'] = false

    // scroll to specific position
    pageContainerSetScroll(scrollPosition)

    // hide pages menu
    globalMenuPagesHide()

    // appear elements
    seasonAppearElements(glVGlobal['Page'])
    appearElement(seasonMainContainerID)

    // hide loader
    disappearLoader(loaderID)
      
    }).catch(function(err) {
    // handle error here
  })

}


function updateSeasonPages(pageID) {

  if (pageID == seasonStatistcsPageID) {
    updateSeasonStatisticsPage()
  } else if (pageID == seasonRatingsPageID) {
    updateSeasonRatingsPage()
  } else if (pageID == seasonComparisonPageID) {
    updateSeasonComparisonPage()
  } else if (pageID == seasonPacePageID) {
    updateSeasonPacePage()
  }

  // getElement('loader').classList.add('hidden')
  
}





