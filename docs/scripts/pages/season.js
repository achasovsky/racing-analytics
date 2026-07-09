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

    let lastEventFlagPath = pathImgNationsRect + `${eventsLast['CountryAbbreviation']}.svg`
    getElement(seasonLastEventFlagID).src = lastEventFlagPath

    let nextEventName = nextEventData['EventNameRus']
    let nextEventDate = nextEventData['EventDateMod']

    setText(seasonNextEventNameID, nextEventName)
    setText(seasonNextEventDateID, nextEventDate)
    setText(seasonNextEventTrackNameID, `${nextEventData['TrackNameRus']}`)
    setText(seasonNextEventOrderNumberID, `${nextEventData['EventNumber']} из ${nextEventData['EventsTotal']}`)

    let nextEventFlagPath = pathImgNationsRect + `${nextEventData['CountryAbbreviation']}.svg`
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


function seasonMenuYearsMouseUp(element) {

  if (!element.className.includes('active')) {

    pageContainerGetScroll()

    glVSeason['SeasonID'] = element.getAttribute('SeasonID')

    // glVSeasonPace['Team'] = null
    // glVSeasonPace['IndexStart'] = null
    // glVSeasonPace['IndexEnd'] = null
    // glVSeasonPace['CheckMeanPaceCondition'] = null
    // glVSeasonPace['CheckMeanPaceSmoothCondition'] = null
    
    updateSeasonPages(glVGlobal['Page'])
    
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

  let data = copyObject(data_6)

  data = dropDuplicatesArrayOfObject(data, property='CountryCode')
  data = sortValues(data, 'CountryPointsOfficial')

  data.forEach((obj, i) => {

    if (i == 0) {

      let img = getElement('driver-image-' + tableID)
      let imgPath = pathImgNationsRound + '/' + obj['CountryCode'] + '.svg'

      img.src = imgPath

      let teamName = getElement('team-name-' + tableID)
      teamName.textContent = obj['CountryCodeRus']
      // teamName.style.color = saturateColor(obj['CountryColor'], 0.8)
      teamName.style.color = obj['CountryColor']

      let teamMetric = getElement('team-metric-' + tableID)
      teamMetric.textContent = obj['CountryPointsOfficial']
      // teamMetric.style.color = saturateColor(obj['CountryColor'], 0.8)
      teamMetric.style.color = obj['CountryColor']

      adjustFontSizeByParent(teamName)
      
    }

    aggregationListAddItem(
      'aggregation-elements-' + tableID,
      'aggregation-values-' + tableID,
      obj['CountryCodeRus'],
      obj['CountryPointsOfficial'],
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

          updateImage(img, imgPath)
    
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

  let attributesDict = {
    'tableID': 'id',
  }

  let dropdownTitle = getElement(dropdown12TitleID)
  dropdownTitle.textContent = labels[clickedTable]

  // fill menu
  dropdownMenuFill(
    dropdownID=dropdown12ID,
    itemsList=labels,
    attributesDict=attributesDict,
    widthControl=true,
  )

}


function dropdown12ItemMouseUp(element) {

  let table = getElement(seasonCategoriesRanksTableContainerID)
  table.scrollTop = 0

  let clickedTable = element.getAttribute('tableID')

  seasonCategoriesRanksTableData['clickedTableID'] = clickedTable

  let dropdownTitle = getElement(dropdown12TitleID)
  dropdownTitle.textContent = element.textContent

  dropdownClose(dropdown12ID)

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
    positionValue, imgPath, color, nameValue, idtValue, numberValue, teamValue, ratingValue, deltaValue, deltaBlank=false
    ) {

  let numberValueWithDies = `#${numberValue}`

  let rating = document.createElement('div')
  rating.classList.add('da550x')

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

  // itemContainer.appendChild(item)
  
  if (deltaValue) {
    
    let delta = document.createElement('div')
    delta.classList.add('pg624o')

    if (deltaBlank) {
      delta.textContent = ''
      delta.classList.add('pg624o-blank')
    } else {
      delta.textContent = deltaValue
    }

    item.appendChild(delta)
    
  }

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

  // if active element exist - deactivate it
  if (activeIDT) {
    // and it not clicked
    if (!clickedIDTs.includes(activeIDT)) {
      
      let tableNameActiveEl = getElement(seasonCategoriesRanksTableNameID + activeIDT)
      tableNameActiveEl.style.color = seasonCategoriesRanksTableData['activeColorDefault']
      
      seasonCategoriesChartLineDectivate(activeIDT)
      
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
  
    seasonCategoriesRanksTableData['activeElID'] = null
    seasonCategoriesRanksTableData['activeIDT'] = null
    seasonCategoriesRanksTableData['activeColor'] = null
    seasonCategoriesRanksTableData['activeColorDefault'] = null
    seasonCategoriesRanksTableData['activeDash'] = null
    
  }

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
    line.classList.remove('chart-line-1-line-clicked')

    tablePosition.style.border = ''
    tablePosition.style.background = ''
    tablePosition.style.color = ''
    tablePosition.style.boxShadow = ''

    // remove IDT from clicked data
    seasonCategoriesClickedData = seasonCategoriesClickedData.filter(o => o['idt'] !== idt)

  } else {

    element.classList.add('clicked')
    line.classList.add('chart-line-1-line-clicked')

    tablePosition.style.border = color
    tablePosition.style.background = color
    tablePosition.style.color = cssGetVariable('--color-background')
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
    line.classList.remove('chart-line-1-line-clicked')
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
  line.parentElement.appendChild(line)

  // // put circles in front of other lines
  circlesDNF.parentElement.appendChild(circlesDNF)

  // // put circles in front of other lines
  circles.parentElement.appendChild(circles)

  line.classList.add('chart-line-1-line-active')
  line.style.stroke = color
  line.style.strokeDasharray = dash
  
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

  // put line back of other lines
  line.parentElement.prepend(line)

  // put circles retired back of other circles retired
  circlesDNF.parentElement.prepend(circlesDNF)

  // put circles back of other circles
  circles.parentElement.prepend(circles)

  line.classList.remove('chart-line-1-line-active')
  line.style.stroke = colorThemesChartChartLine1Lines
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
        line.classList.add('chart-line-1-line-clicked')

        let tablePosition = getElement(seasonCategoriesRanksTablePositionID + idt)
        tablePosition.style.border = color
        tablePosition.style.background = color
        tablePosition.style.color = cssGetVariable('--color-background')
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

  let sprintIndex = currentButton.getAttribute('condition')
  let page = glVGlobal['Page']

  seasonMenuRacesprintButtonActivate(currentButton)
  
  glVSeason['SprintIndex'] = sprintIndex

  seasonUpdatePaths(glVSeason['SeasonID'], sprintIndex, glVSeasonPace['Team'])

  if (page == seasonStatistcsPageID) {

    let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData6path)]

    Promise.all(dataPaths).then(function(files) {

      data_1 = files[0]
      data_6 = files[1]
  
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
  
      }).catch(function(err) {
      // handle error here
    })
    
  } else if (page == seasonRatingsPageID) {

    let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData2path)]
    let clickedTable = seasonCategoriesRanksTableData['clickedTableID']

    Promise.all(dataPaths).then(function(files) {
  
      data_1 = files[0]
      data_2 = files[1]

      // fill table
      if (data_2.length != 0) {
        
        dropdown12Fill()
        // fill table
        seasonCategoriesRanksTableFill(data_2)
        // fill info
        seasonCategoriesInfoTableFill(data_2)
        
      }

      let metric = dropdown12Data[clickedTable]['metric']
      let stability = dropdown12Data[clickedTable]['stability']
      let ascending = dropdown12Data[clickedTable]['ascending']

      // draw charts
      chartLine_1(
        data_1, 'chart-season-rating-line', clickedTable,
        dropdown12Data[clickedTable]['chartLine1Metric'])

      seasonCategoriesClickChartsByClickedDrivers()

      }).catch(function(err) {
      // handle error here
    })
    
  } else if (page == seasonComparisonPageID) {

    let dataAvailableLeft = getElement(dropdown13TitleLeftID).getAttribute('dataAvailable')
    let dataAvailableRight = getElement(dropdown13TitleRightID).getAttribute('dataAvailable')
  
    // hideElement(seasonDriversDriverLeftNoDataID)
    // hideElement(seasonDriversDriverRightNoDataID)
  
    getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
    getElement(seasonDriversDriverRightNoDataID).style.opacity = 0
  
    if (seasonDriversDataAvailableCheck(dataAvailableLeft, sprintIndex)
        && seasonDriversDataAvailableCheck(dataAvailableRight, sprintIndex)) {

      let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData2path)]
  
      Promise.all(dataPaths).then(function(files) {
    
        data_1 = files[0]
        data_2 = files[1]
  
        seasonDriversUpdateLists()
        seasonDriversParametersInitiate()
        
        seasonComparisonUpdateBadge(seasonDriversIDTLeft, seasonDriversNameLeft, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
        seasonComparisonUpdateBadge(seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')
  
        // fill dropdowns
        dropdown13CenterFill()
        dropdown13Fill(dropdown13MenuLeftID, seasonDriversIDTLeft)
        dropdown13Fill(dropdown13MenuRightID, seasonDriversIDTRight)
    
        let dataLeft = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTLeft)[0]
        let dataRight = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTRight)[0]
  
        seasonComparisonUpdateCharts(seasonDriversIDTLeft, seasonDriversIDTRight, dataLeft, dataRight)
  
        }).catch(function(err) {
        // handle error here
      })
      
    } 
    
    if (!seasonDriversDataAvailableCheck(dataAvailableLeft, sprintIndex)) {
      seasonDriversManageNoData(seasonDriversIDTLeft, seasonDriversNameLeft, sprintIndex, kind='left')
    }
  
    if (!seasonDriversDataAvailableCheck(dataAvailableRight, sprintIndex)) {
      seasonDriversManageNoData(seasonDriversIDTRight, seasonDriversNameRight, sprintIndex, kind='right')
    }
    
  } else if (page == seasonPacePageID) {

    let dataPaths = [
      d3.csv(seasonData2path),
      d3.csv(seasonData7path),
      d3.csv(seasonData8path),
      d3.csv(seasonData9path),
      d3.csv(seasonData10path)
    ]
  
    Promise.all(dataPaths).then(function(files) {
  
      data_2 = files[0]
      data_7 = files[1]
      data_8 = files[2]
      data_9 = files[3]
      data_10 = files[4]
  
      seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])
  
      seasonPaceUpdateLists()
  
      dropdown15Fill(glVSeasonPace['Team'])
      // dropdown15MakeActive()
  
      dropdown16LeftFill(glVSeasonPace['IndexStart'])
      dropdown16RightFill(glVSeasonPace['IndexEnd'])
  
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
  
      seasonPaceUpdateLaptimes(
        glVSeasonPace['IndexStart'],
        glVSeasonPace['IndexEnd'],
        glVSeasonPace['Team'],
      )
      
      seasonPaceUpdateCharts(
        seasonPaceDataEvents, seasonPaceDataLaptimes, seasonPaceDataTeams,
        seasonPaceDataDrivers, seasonPaceDrivers,
        chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
        chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
      )

      }).catch(function(err) {
      // handle error here
    })
    
  }
  
}


function seasonRatingsDescChartsFill() {

  seasonRatingsDescChartLine1Fill()
  
}


function seasonRatingsDescChartLine1Fill() {

  getElement(seasonCategoriesDescChartLine1ContentID).innerHTML = chartDescBodyChartLine1

  let img1 = getElement(seasonCategoriesDescChartLine1Img1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-line-1.svg`
    
}


function seasonRatingsDescChartLine1Open(element) {

  descCloseAllExcept(element, seasonCategoriesDescsIDs)
  
  let body = getElement(seasonCategoriesDescChartLine1BodyID)
  body.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonCategoriesDescChartLine1ContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function seasonRatingsDescChartLine1Close(element) {

  let body = getElement(seasonCategoriesDescChartLine1BodyID)
  body.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonCategoriesDescChartLine1ContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
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

    seasonCategoriesClickChartsByClickedDrivers()

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

  seasonDriversIDTLeft = data[0]['DriverIDT']
  seasonDriversIDTRight = data[1]['DriverIDT']

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


function seasonDriversParametersInitiate() {

  let refresh = glVSeason['ComparisonRefresh']

  // if no comparison drivers data - random team
  if (refresh) {

    glVSeason['ComparisonRefresh'] = false

    let randomTeam = arrayGetRandom(seasonDriversTeamsList)

    // if there were more than 2 drivers in current team during champiohship - choose 2 with more races partisipated
    let data = data_2.filter((d) => d['Team'] == randomTeam)
    if (data.length > 2) { data = sortValues(data, 'RacesParticipated').slice(0, 2) }
    data = sortValues(data, 'RankPointsAvg', ascending=true)
    if (data[0]['RankPointsAvg'] == 'DNC') { data = [...data].reverse() }

    seasonDriversIDTLeft = data[0]['DriverIDT']
    seasonDriversIDTRight = data[1]['DriverIDT']

    seasonDriversTeamLeft = randomTeam
    seasonDriversTeamRight = randomTeam

    seasonDriversNumberLeft = data[0]['Number']
    seasonDriversNumberRight = data[1]['Number']

    seasonDriversNameLeft = data[0]['FullName']
    seasonDriversNameRight = data[1]['FullName']

    seasonDriversIDLeft = data[0]['DriverID']
    seasonDriversIDRight = data[1]['DriverID']

    seasonDriversColorLeft = data[0]['Color']
    seasonDriversColorRight = data[1]['Color']

    if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft)}

  // if comparison drivers chosen
  } else {

    let currentSeasonDriversID = data_2.map(o => o['DriverID'])

    // if both comparison drivers participated in selected season
    if (currentSeasonDriversID.includes(seasonDriversIDLeft) && currentSeasonDriversID.includes(seasonDriversIDRight)) {

      // define them by ID (because they can change number season-by-season)
      let dataLeft = data_2.filter(o => o['DriverID'] == seasonDriversIDLeft)
      let dataRight = data_2.filter(o => o['DriverID'] == seasonDriversIDRight)

      // if driver participated in more than one team
      if (dataLeft.length > 1) {
        // select team with more races
        dataLeft = sortValues(dataLeft, 'RacesParticipated')
      }

      dataLeft = dataLeft[0]

      // if driver participated in more than one team
      if (dataRight.length > 1) {
        // select team with more races
        dataRight = sortValues(dataRight, 'RacesParticipated')
      }
      
      dataRight = dataRight[0]

      seasonDriversIDTLeft = dataLeft['DriverIDT']
      seasonDriversIDTRight = dataRight['DriverIDT']

      seasonDriversTeamLeft = dataLeft['Team']
      seasonDriversTeamRight = dataRight['Team']

      seasonDriversNumberLeft = dataLeft['Number']
      seasonDriversNumberRight = dataRight['Number']

      seasonDriversNameLeft = dataLeft['FullName']
      seasonDriversNameRight = dataRight['FullName']

      seasonDriversIDLeft = dataLeft['DriverID']
      seasonDriversIDRight = dataRight['DriverID']

      seasonDriversColorLeft = dataLeft['Color']
      seasonDriversColorRight = dataRight['Color']
  
      if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft)}
 
    } else {

      // if only left participated in selected season
      if (currentSeasonDriversID.includes(seasonDriversIDLeft)) {

        let dataLeft = data_2.filter(o => o['DriverID'] == seasonDriversIDLeft)[0]
        let teamLeft = dataLeft['Team']

        // get his teammates data
        let dataRight = data_2.filter(o => (o['Team'] == teamLeft) & (o['DriverID'] != seasonDriversIDLeft))
        // sort by most races
        dataRight = sortValues(dataRight, 'RacesParticipated')
        // choose teammate
        dataRight = dataRight[0]

        seasonDriversIDTLeft = dataLeft['DriverIDT']
        seasonDriversIDTRight = dataRight['DriverIDT']

        seasonDriversTeamLeft = dataLeft['Team']
        seasonDriversTeamRight = dataRight['Team']

        seasonDriversNumberLeft = dataLeft['Number']
        seasonDriversNumberRight = dataRight['Number']

        seasonDriversNameLeft = dataLeft['FullName']
        seasonDriversNameRight = dataRight['FullName']
  
        seasonDriversIDLeft = dataLeft['DriverID']
        seasonDriversIDRight = dataRight['DriverID']

        seasonDriversColorLeft = dataLeft['Color']
        seasonDriversColorRight = dataRight['Color']
    
        if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft)}

        // if only right participated in selected season
      } else if (currentSeasonDriversID.includes(seasonDriversIDRight)) {

        // get his teammate data
        let dataRight = data_2.filter(o => o['DriverID'] == seasonDriversIDRight)[0]
        let teamRight = dataRight['Team']

        // get his teammates data
        let dataLeft = data_2.filter(o => (o['Team'] == teamRight) & (o['DriverID'] != seasonDriversIDRight))
        // sort by most races
        dataLeft = sortValues(dataLeft, 'RacesParticipated')
        // choose teammate
        dataLeft = dataLeft[0]

        seasonDriversIDTLeft = dataLeft['DriverIDT']
        seasonDriversIDTRight = dataRight['DriverIDT']

        seasonDriversTeamLeft = dataLeft['Team']
        seasonDriversTeamRight = dataRight['Team']

        seasonDriversNumberLeft = dataLeft['Number']
        seasonDriversNumberRight = dataRight['Number']

        seasonDriversNameLeft = dataLeft['FullName']
        seasonDriversNameRight = dataRight['FullName']
  
        seasonDriversIDLeft = dataLeft['DriverID']
        seasonDriversIDRight = dataRight['DriverID']

        seasonDriversColorLeft = dataLeft['Color']
        seasonDriversColorRight = dataRight['Color']
    
        if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft)}

      // if no one participated in selected season, then get team leader
      } else {

        seasonDriversGetLeaders(data_2)

      }
      
    }
    
  }

}


function dropdown13CenterFill() {

  // fill menu
  dropdownMenuAddItems(dropdown13MenuCenterID, seasonDriversTeamsUnique, dropdown13MenuCenterItemID)

  dropdownItemsSetAttributes(
    dropdown13MenuCenterID, {
      'index': 'index',
      'team': seasonDriversTeamsUnique
      })

  let itemsList = copyObject(seasonDriversTeamsUnique)
  itemsList.push('Выберите команду')

  let maximumWidth = getDropdownMaximumwidth(
    dropdown13CenterContainerID, dropdown13TitleCenterID, dropdown13MenuCenterID, itemsList)

  // if icons not loaded yet (on hard reset) => we need to correct dropdown width by 2 widths of navigation icons
  // or preload them in HTML file as regular SVGs, and will recieve WarningMessage in console 
  let dropdownNavIconsNotLoaded = !getElement(iconNavBackward13ID).children[0].complete
  if (dropdownNavIconsNotLoaded) { maximumWidth = maximumWidth + dropdownNavigationIconsTwoWidths }

  let dropdownLabel = getElement(dropdown13TitleCenterID)

  let label
  // let color

  // change text of current label
  if (seasonDriversTeamLeft == seasonDriversTeamRight) {
    
    label = seasonDriversTeamLeft
    
  } else {
    
    label = 'Выберите команду'
    
  }

  let index = (label == 'Выберите команду') ? 'none' : seasonDriversTeamsUnique.indexOf(label)

  dropdownLabel.textContent = label
  // dropdownLabel.style.color = color
  dropdownLabel.setAttribute('team', label)
  dropdownLabel.setAttribute('index', index)

  // update widths
  setDropdownWidth(dropdown13CenterContainerID, dropdown13MenuCenterID, maximumWidth, setMenuWidth=false)

}


function dropdown13CenterMouseUp(element) {

  getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
  getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

  let team = element.textContent

  let dropdownLabel = getElement(dropdown13TitleCenterID)

  dropdownLabel.textContent = team
  dropdownLabel.setAttribute('index', element.getAttribute('index'))
  dropdownLabel.setAttribute('team', element.getAttribute('team'))

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

  seasonDriversIDTLeft = data[0]['DriverIDT']
  seasonDriversIDTRight = data[1]['DriverIDT']

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
    seasonDriversIDTLeft, seasonDriversNameLeft, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
  seasonComparisonUpdateBadge(
    seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')

  let dataLeft = data[0]
  let dataRight = data[1]
  
  // update content
  seasonComparisonUpdateCharts(seasonDriversIDTLeft, seasonDriversIDTRight, dataLeft, dataRight)

}


function iconForward13CenterMouseUp() {

  let currentTeam = getElement(dropdown13TitleCenterID).getAttribute('team')

  if (currentTeam == 'Выберите команду') {
    
    let lastTeam = lastElement(seasonDriversTeamsUnique)
    
    Array.from(getElement(dropdown13MenuCenterID).children).forEach((item, i) => {
      if (item.getAttribute('team') == lastTeam) {
        currentTeam = lastTeam
      }
    })
    
  }

  let nextItem = iconForwardNextItem(dropdown13MenuCenterID, seasonDriversTeamsUnique, currentTeam)
  
  dropdown13CenterMouseUp(nextItem)
  
}


function iconBackward13CenterMouseUp() {

  let currentTeam = getElement(dropdown13TitleCenterID).getAttribute('team')

  if (currentTeam == 'Выберите команду') {
    
    let firstTeam = firstElement(seasonDriversTeamsUnique)
    
    Array.from(getElement(dropdown13MenuCenterID).children).forEach((item, i) => {
      if (item.getAttribute('team') == firstTeam) {
        currentTeam = firstTeam
      }
    })
    
  }

  let previousItem = iconBackwardNextItem(dropdown13MenuCenterID, seasonDriversTeamsUnique, currentTeam)

  dropdown13CenterMouseUp(previousItem)

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


function dropdown13Fill(dropdownMenuID, driverIDT) {

  let dataCurrent = data_2.filter((d) => d['DriverIDT'] == driverIDT)[0]
  let driverCurrentName = dataCurrent['FullName']

  let dropdownMenuItemID = dropdownMenuID + '-item-'

  // fill menu
  dropdownMenuAddItems(dropdownMenuID, seasonDriversNamesList, dropdownMenuItemID)

  // items attributes
  dropdownItemsSetAttributes(
    dropdownMenuID, {
      'index': 'index',
      'team': seasonDriversTeamsList,
      'idt': seasonDriversIDTsList,
      'driverID': seasonDriversIDsList,
      'color': seasonDriversColorsList,
      'number': seasonDriversNumbersList,
      'dataAvailable': seasonDriversDataAvailableList
      })

  // make clickable dropdown and navigation icons
  
  let dropdownMenu = getElement(dropdownMenuID)

  // get current dropdown and label
  // let dropdownCurrent = getElement(dropdownMenuID).parentElement.parentElement
  
  // let dropdownCurrentContainerID = dropdownMenu.parentElement.parentElement.id
  // let dropdownCurrentTitle = dropdownMenu.parentElement.parentElement.children[0].children[0]

  let dropdownCurrent
  let dropdownCurrentTitleID
  let dropdownCurrentContainerID

  if (dropdownMenuID.includes('left')) {

    dropdownCurrent = getElement(dropdown13LeftID)
    
    dropdownCurrentContainerID = dropdown13LeftContainerID
    dropdownCurrentTitleID = dropdown13TitleLeftID
    seasonDriversNameLeft = driverCurrentName
    
  } else {

    dropdownCurrent = getElement(dropdown13RightID)
    
    dropdownCurrentContainerID = dropdown13RightContainerID
    dropdownCurrentTitleID = dropdown13TitleRightID
    seasonDriversNameRight = driverCurrentName
    
  }

  let dropdownCurrentTitle = getElement(dropdownCurrentTitleID)

  let maximumWidth = getDropdownMaximumwidth(
    dropdownCurrentContainerID, dropdownCurrentTitleID, dropdownMenuID, seasonDriversNamesList)

  // change text of current button
  dropdownCurrentTitle.textContent = driverCurrentName
  dropdownCurrentTitle.setAttribute('index', seasonDriversIDTsList.indexOf(driverIDT))
  dropdownCurrentTitle.setAttribute('team', dataCurrent['Team'])
  dropdownCurrentTitle.setAttribute('number', dataCurrent['Number'])
  dropdownCurrentTitle.setAttribute('color', dataCurrent['Color'])
  dropdownCurrentTitle.setAttribute('idt', driverIDT)
  dropdownCurrentTitle.setAttribute('dataAvailable', dataCurrent['DriverEventsAvailable'])

  // if (dropdownMenuID.includes('left')) {
  //   seasonDriversNameLeft = driverCurrentName
  // } else if (dropdownMenuID.includes('right')) {
  //   seasonDriversNameRight = driverCurrentName
  // }

  // update widths
  setDropdownWidth(dropdownCurrentContainerID, dropdownMenuID, maximumWidth, setMenuWidth=false)

}


function dropdown13MouseUp(element, elementID) {

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

      // hideElement(seasonDriversDriverLeftNoDataID)
      // hideElement(seasonDriversDriverRightNoDataID)

      getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
      getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

      seasonDriversTeamLeft = team
      seasonDriversNameLeft = name
      seasonDriversIDLeft = dirverID
      seasonDriversIDTLeft = idt
      seasonDriversColorLeft = color
      seasonDriversNumberLeft = number
      seasonDriversColorRight = getElement(dropdown13TitleRightID).getAttribute('color')

      if (seasonDriversColorRight == seasonDriversColorLeft) {
        
        seasonDriversColorRight = modColor2(seasonDriversColorLeft)
        
        // seasonComparisonUpdateBadge(
        //   seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, 'right')
        
      }

      seasonComparisonUpdateBadge(
        idt, name, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
      seasonComparisonUpdateBadge(
        seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')
  
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
      } else {
        titleCenter.textContent = seasonDriversTeamLeft
      }

      let dataLeft = data_2.filter(o => o['DriverIDT'] == idt)[0]
      let dataRight = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTRight)[0]

      seasonComparisonUpdateCharts(idt, seasonDriversIDTRight, dataLeft, dataRight)
      
    } else {

      // hideElement(seasonDriversDriverLeftNoDataID)
      // hideElement(seasonDriversDriverRightNoDataID)

      getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
      getElement(seasonDriversDriverRightNoDataID).style.opacity = 0
      
      seasonDriversTeamRight = team
      seasonDriversNameRight = name
      seasonDriversIDRight = dirverID
      seasonDriversIDTRight = idt
      seasonDriversColorRight = color
      seasonDriversNumberRight = number
      seasonDriversColorLeft = getElement(dropdown13TitleLeftID).getAttribute('color')
      
      if (seasonDriversColorRight == seasonDriversColorLeft) { seasonDriversColorRight = modColor2(seasonDriversColorLeft) }

      seasonComparisonUpdateBadge(
        seasonDriversIDTLeft, seasonDriversNameLeft, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
      seasonComparisonUpdateBadge(
        idt, name, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')

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
      } else {
        titleCenter.textContent = seasonDriversTeamLeft
      }

      let dataLeft = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTLeft)[0]
      let dataRight = data_2.filter(o => o['DriverIDT'] == idt)[0]

      seasonComparisonUpdateCharts(seasonDriversIDTLeft, idt, dataLeft, dataRight)
      
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


function dropdown13MakeActive() {

  // make dropdown left active
  dropdownNoBorderShowWhileClickOn(
    dropdown13MenuLeftID, dropdown13CaretLeftID,
    [getElement(dropdown13LeftID)])

  dropdownNoBorderHideWhileClickOn(
    dropdown13MenuLeftID, dropdown13CaretLeftID,
    [
      document,
      getElement(dropdown13RightID),
      getElement(dropdown13CenterID),
      getElement(dropdown14ID),
    ])


  // make dropdown right active
  dropdownNoBorderShowWhileClickOn(
    dropdown13MenuRightID, dropdown13CaretRightID,
    [getElement(dropdown13RightID)])
  
  dropdownNoBorderHideWhileClickOn(
    dropdown13MenuRightID, dropdown13CaretRightID,
    [
      document,
      getElement(dropdown13LeftID),
      getElement(dropdown13CenterID),
      getElement(dropdown14ID),
    ])

  // make dropdown center active
  dropdownNoBorderShowWhileClickOn(
    dropdown13MenuCenterID, dropdown13CaretCenterID,
    [getElement(dropdown13CenterID)])
  
  dropdownNoBorderHideWhileClickOn(
    dropdown13MenuCenterID, dropdown13CaretCenterID,
    [
      document,
      getElement(dropdown13LeftID),
      getElement(dropdown13RightID),
      getElement(dropdown14ID),
    ])

}


function dropdown14Fill() {

  let dropdownMetrics = dropdown14Data.map(o => o['metric'])
  let dropdownLabels = dropdown14Data.map(o => o['label'])

  // fill menu
  dropdownMenuAddItems(
    dropdown14MenuID, dropdownLabels, dropdown14MenuItemID,
    disableArray=false, addSeparatorAfterIdx=[],
    itemClass='dropdown-item px-05'
  )

  // items attributes
  dropdownItemsSetAttributes(
    dropdown14MenuID, {
      'index': 'index',
      'metric': dropdownMetrics,
      'label': dropdownLabels
      })

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
    seasonDriversIDTLeft, seasonDriversIDTRight,
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


function dropdown14MakeActive() {

  dropdownNoBorderShowWhileClickOn(
    dropdown14MenuID, dropdown14CaretID,
    [getElement(dropdown14ID)])

  dropdownNoBorderHideWhileClickOn(
    dropdown14MenuID, dropdown14CaretID,
    [
      document,
      document, getElement(dropdown13LeftID),
      getElement(dropdown13CenterID)
    ])
  
}


function seasonComparisonDescCloseAll(element) {

  seasonComparisonChartDescTablesIDs.forEach((id, i) => {

    let elementLocal = getElement(id)

    let con1 = !elementLocal.id.includes(element.id)
    let con2 = !elementLocal.classList.contains('invisible')

    if (con1 && con2) {
      
      document.body.classList.remove('o-hidden')
      elementLocal.classList.add('invisible')
      
    }
    
  })
  
}


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


function seasonComparisonDescChart5Open(element) {

  seasonComparisonDescCloseAll(element)

  let table = getElement(seasonPaceChart5DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonPaceChart5DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function seasonComparisonDescChart5Close(element) {

  let table = getElement(seasonPaceChart5DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonPaceChart5DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
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


function seasonDriversUpdateChart1(data1, data2, driverIDTLeft, driverIDTRight, colorLeft, colorRight) {

  // data1 -> data_1
  // data2 -> data_2

  let metric = getElement(dropdown14TitleID).getAttribute('metric')
  let chart = dropdown14Data.filter(o => o['metric'] == metric)[0]['chart']

  if (chart == 5) {

    chart_5(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      'iaem6t'
    )
    
  } else if (chart == 6) {

    chart_6(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      'iaem6t'
    )
    
  } else if (chart == 7) {

    chart_7(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      'iaem6t'
    )
    
  } else if (chart == 8) {

    chart_8(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      'iaem6t'
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
  let ticks = getElement(seasonComparisonSliderInfoTicksID)
  ticks = arrayFromChildren(ticks)

  let tick1 = ticks[1]
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

  let sliderMax = document.createElement('input')
  sliderMax.type = 'range'
  sliderMax.id = seasonComparisonSliderMaxID

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
  let ticklabels = getElement(seasonComparisonSliderInfoLabelsID)
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
  let chartLabelsTop = getElement(seasonComparisonSliderInfoLabelsID)
  chartLabelsTop = arrayFromChildren(chartLabelsTop)
  
  let chartLabelsBottom = getElement(seasonComparisonSliderInfoLabelsBottomID)
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

  let paddingOuter = seasonComparisonSliderData['paddingXDistance']
  let step = seasonComparisonSliderData['chartStepX']

  let coordX = paddingOuter + indexMin*step - 0.5*step
  let width = indexMax*step - coordX + step

  shadowRectTop.setAttribute('x', coordX)
  shadowRectTop.setAttribute('width', width)

  shadowRectBottom.setAttribute('x', coordX)
  shadowRectBottom.setAttribute('width', width)

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
    
  let paddingOuter = seasonComparisonSliderData['paddingXDistance']
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

  slider.style.setProperty('--slider-point-background', color)
  
}


function seasonComparisonSliderMouseLeave(kind) {

  let slider

  if (kind == 'min') {
    slider = getElement(seasonComparisonSliderMinID)
  } else if (kind == 'max') {
    slider = getElement(seasonComparisonSliderMaxID)
  }

  slider.style.setProperty('--slider-point-background', 'var(--color-border-9)')
  
}


function seasonComparisonSliderMouseDown(kind) {

  let slider
  let color = paleColor(seasonDriversColorLeft, 0.65)

  if (kind == 'min') {
    
    slider = getElement(seasonComparisonSliderMinID)
    
  } else if (kind == 'max') {
    
    slider = getElement(seasonComparisonSliderMaxID)
    
  }
  
}


function seasonComparisonSliderMouseUp(kind) {

  let slider
  let color = paleColor(seasonDriversColorLeft, 0.65)

  if (kind == 'min') {
    
    slider = getElement(seasonComparisonSliderMinID)
    
  } else if (kind == 'max') {
    
    slider = getElement(seasonComparisonSliderMaxID)
    
  }
  
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

  let metricLeft = Number(dataLeft[metric])
  let metricRight = Number(dataRight[metric])

  let valueLeft
  let valueRight

  let metricTotal = metricLeft + metricRight
  let width = getSizes(svg).width

  let fraction = width / metricTotal

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

  // // define coordinates
  // if (lowerBetter == true) {

  //   coord2 = fraction * metricRight - delta
  //   coord3 = width - fraction * metricLeft + delta
    
  // } else {

  //   coord2 = fraction * metricLeft - delta
  //   coord3 = width - fraction * metricRight + delta
    
  // }

  coord2 = fraction * metricLeft - delta
  coord3 = width - fraction * metricRight + delta

  if (metricLeft == 0) {

    // left line to zero
    coord1 = 0
    coord2 = 0
    
    coordCircle = circleRadius
    
    coord3 = circleRadius + delta
    coord4 = width

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

  // seasonComparisonStatBlocklFill(
  //   id='b191ecmnvf',
  //   dataLeft=dataLeft, 
  //   dataRight=dataRight,
  //   colorLeft=colorLeft,
  //   colorRight=colorRight,
  //   title='',
  //   metric='RetiredSum',
  //   lowerBetter=true
  // )

  // seasonComparisonStatBlocklFill(
  //   id='t315vgpprd',
  //   dataLeft=dataLeft, 
  //   dataRight=dataRight,
  //   colorLeft=colorLeft,
  //   colorRight=colorRight,
  //   title='',
  //   metric='RacesParticipated',
  //   lowerBetter=false
  // )
  
}


function seasonPaceUpdateLists() {

  let data = copyObject(data_2)
  
  seasonPaceEvents = copyObject(events).filter(o => o['SeasonID'] == glVSeason['SeasonID'])
  seasonPaceEvents = sortValues(seasonPaceEvents, 'EventIndex', true)

  seasonPaceEventIndexes = dropDuplicates(seasonPaceEvents.map(o => o['EventIndex']))
  seasonPaceEventNames = dropDuplicates(seasonPaceEvents.map(o => o['EventNameRus']))

  let dataTeams = copyObject(data)

  dataTeams = sortValues(dataTeams, 'ChampionshipClassification', true)

  seasonPaceTeamsUnique = dataTeams.map(row => row['Team'])
  seasonPaceTeamsUnique = dropDuplicates(seasonPaceTeamsUnique)

}


function seasonPaceUpdateLaptimes(indexStart, indexEnd, team) {

  // filter by selected events
  let condition1 = (o) => (o['EventIndex'] >= indexStart) & (o['EventIndex'] <= indexEnd)

  seasonPaceDataEvents = data_7.filter(o => condition1(o))

  seasonPaceDataLaptimes = copyObject(data_8)
  seasonPaceDataLaptimes = seasonPaceDataLaptimes.filter(o => condition1(o))

  // filter by team
  let condition2 = (o) => (condition1(o) && (o['Team'] == team))

  seasonPaceDataDrivers = data_9.filter(o => condition2(o))
  seasonPaceDataTeams = data_10.filter(o => condition2(o))

  // drivers
  let driverIDs = seasonPaceDataDrivers.map(o => o['DriverID'])
  driverIDs = arrayDropDuplicates(driverIDs)
  driverIDs = arraySort(driverIDs, true)

  seasonPaceDrivers = []

  driverIDs.forEach((driverID, i) => {
    
    let driverData = seasonPaceDataDrivers.filter(o => o['DriverID'] == driverID)

    if (driverData.length > 0) {

      driverData = driverData[0]

      let name = driverData['FullName']
      let color = driverData['Color']
      let abb = driverData['Abbreviation']
  
      if (seasonPaceDrivers.length > 0) {
        seasonPaceDrivers.forEach((obj, j) => {
          if (color == obj['Color']) {
            color = modColor(color)
          }
        })
      }
  
      seasonPaceDrivers.push({
        DriverID: driverID,
        Name: name,
        Color: color,
        Abbreviation: abb
      })
      
    }

  })

  seasonPaceFillDriversLegend()

}


function seasonPaceUpdateCharts(
    seasonPaceDataEvents, seasonPaceDataLaptimes, seasonPaceDataTeams,
    seasonPaceDataDrivers, seasonPaceDrivers,
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
    dataLaptimesEvents=seasonPaceDataEvents,
    dataLaptimesFull=seasonPaceDataLaptimes,
    dataLaptimesSummary=seasonPaceDataTeams,
    dataLatimesSummaryDrivers=seasonPaceDataDrivers,
    dataDrivers=seasonPaceDrivers,
    active=glVSeasonPace['CheckMeanPaceCondition'],
    smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
    id='1'
  )

  seasonPaceDescsFill()

  window.onresize = () => {

    updateUnits()

    chart_12(
      ContainerID=seasonPaceChart12ID,
      Container2ID=seasonPaceChart12Chart2ID,
      ContainerVID=seasonPaceChart12VariationID,
      ContainerDID=seasonPaceChartBetterLaptimesID,
      ContainerLID=seasonPaceChartLapsCountID,
      metric='PaceDiff',
      dataLaptimesEvents=seasonPaceDataEvents,
      dataLaptimesFull=seasonPaceDataLaptimes,
      dataLaptimesSummary=seasonPaceDataTeams,
      dataLatimesSummaryDrivers=seasonPaceDataDrivers,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id='1'
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
      dataLaptimesEvents=seasonPaceDataEvents,
      dataLaptimesFull=seasonPaceDataLaptimes,
      dataLaptimesSummary=seasonPaceDataTeams,
      dataLatimesSummaryDrivers=seasonPaceDataDrivers,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id='1'
    )

    seasonPaceDescsFill()

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
      dataLaptimesEvents=seasonPaceDataEvents,
      dataLaptimesFull=seasonPaceDataLaptimes,
      dataLaptimesSummary=seasonPaceDataTeams,
      dataLatimesSummaryDrivers=seasonPaceDataDrivers,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id='1'
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
      dataLaptimesEvents=seasonPaceDataEvents,
      dataLaptimesFull=seasonPaceDataLaptimes,
      dataLaptimesSummary=seasonPaceDataTeams,
      dataLatimesSummaryDrivers=seasonPaceDataDrivers,
      dataDrivers=seasonPaceDrivers,
      active=glVSeasonPace['CheckMeanPaceCondition'],
      smooth=glVSeasonPace['CheckMeanPaceSmoothCondition'],
      id='1'
    )
    
  }

  checkElementClick(
    seasonPaceCheckMeanPaceSmoothID, seasonPaceCheckMeanPaceSmoothIconID,
    condition=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )
  
}


function dropdown15Fill(team) {

  // fill menu
  dropdownMenuAddItems(dropdown15MenuID, seasonPaceTeamsUnique, dropdown15MenuItemID)

  dropdownItemsSetAttributes(
    dropdown15MenuID, {
      'index': 'index',
      'team': seasonPaceTeamsUnique
      })

  let itemsList = copyObject(seasonPaceTeamsUnique)

  let maximumWidth = getDropdownMaximumwidth(
    dropdown15ContainerID, dropdown15TitleID, dropdown15MenuID, itemsList)

  let dropdownLabel = getElement(dropdown15TitleID)

  let index = seasonPaceTeamsUnique.indexOf(team)

  dropdownLabel.textContent = team
  dropdownLabel.setAttribute('team', team)
  dropdownLabel.setAttribute('index', index)

  // update widths
  setDropdownWidth(dropdown15ContainerID, dropdown15MenuID, maximumWidth, setMenuWidth=false)

}


function dropdown15MakeActive() {

  dropdownNoBorderShowWhileClickOn(
    dropdown15MenuID, dropdown15CaretID,
    [getElement(dropdown15ID)])

  dropdownNoBorderHideWhileClickOn(
    dropdown15MenuID, dropdown15CaretID,
    [
      document,
      getElement(dropdown16LeftID),
      getElement(dropdown16RightID),
    ])

}


function dropdown15MouseUp(element) {

  let team = element.textContent
  let dropdownLabel = getElement(dropdown15TitleID)

  dropdownLabel.textContent = team
  dropdownLabel.setAttribute('index', element.getAttribute('index'))
  dropdownLabel.setAttribute('team', element.getAttribute('team'))

  glVSeasonPace['Team'] = team

  seasonUpdatePaths(
    glVSeason['SeasonID'],
    glVSeason['SprintIndex'],
    glVSeasonPace['Team']
  )

  let dataPaths = [d3.csv(seasonData8path)]

  Promise.all(dataPaths).then(function(files) {

    data_8 = files[0]
  
    seasonPaceUpdateLaptimes(
      glVSeasonPace['IndexStart'], glVSeasonPace['IndexEnd'], glVSeasonPace['Team']
    )
    
    seasonPaceUpdateCharts(
      seasonPaceDataEvents, seasonPaceDataLaptimes, seasonPaceDataTeams,
      seasonPaceDataDrivers, seasonPaceDrivers,
      chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
      chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
    )

    }).catch(function(err) {
    // handle error here
  })

}


function dropdown16LeftFill(index) {

  let titleElement = getElement(dropdown16LeftTitleID)

  // fill menu
  dropdownMenuAddItems(dropdown16LeftMenuID, seasonPaceEventNames, dropdown16LeftMenuItemID)

  dropdownItemsSetAttributes(
    dropdown16LeftMenuID, {
      'index': 'index',
      'name': seasonPaceEventNames
      })
  
  let title = seasonPaceEvents.filter(o => o['EventIndex'] == index)[0]['EventNameRus']
  titleElement.textContent = title
  titleElement.setAttribute('index', index) 
  
}


function dropdown16RightFill(index) {

  let titleElement = getElement(dropdown16RightTitleID)

  // fill menu
  dropdownMenuAddItems(dropdown16RightMenuID, seasonPaceEventNames, dropdown16RightMenuItemID)

  dropdownItemsSetAttributes(
    dropdown16RightMenuID, {
      'index': 'index',
      'name': seasonPaceEventNames
      })
  
  let name = seasonPaceEvents.filter(o => o['EventIndex'] == index)[0]['EventNameRus']
  
  titleElement.textContent = name
  titleElement.setAttribute('index', index)
  titleElement.setAttribute('name', name)
  
}


function dropdown16LeftMakeActive() {

  dropdownNoBorderShowWhileClickOn(
    dropdown16LeftMenuID, dropdown16LeftCaretID,
    [getElement(dropdown16LeftID)])

  dropdownNoBorderHideWhileClickOn(
    dropdown16LeftMenuID, dropdown16LeftCaretID,
    [
      document,
      getElement(dropdown15ID),
      getElement(dropdown16RightID),
    ])
  
}


function dropdown16RightMakeActive() {

  dropdownNoBorderShowWhileClickOn(
    dropdown16RightMenuID, dropdown16RightCaretID,
    [getElement(dropdown16RightID)])

  dropdownNoBorderHideWhileClickOn(
    dropdown16RightMenuID, dropdown16RightCaretID,
    [
      document,
      getElement(dropdown15ID),
      getElement(dropdown16LeftID),
    ])
  
}


function dropdown16LeftMouseUp(element) {

  let titleElement = getElement(dropdown16LeftTitleID)

  let index = Number(element.getAttribute('index'))
  let name = element.getAttribute('name')

  titleElement.textContent = name
  titleElement.setAttribute('index', index)
  titleElement.setAttribute('name', name)

  glVSeasonPace['IndexStart'] = index

  let menuRight = getElement(dropdown16RightMenuID)
  let menuRightElements = arrayFromChildren(menuRight)
  
  // add disabled to all right menu items, that earlier than left
  menuRightElements.forEach((el, i) => {

    let indexRight = Number(el.getAttribute('index'))

    if (indexRight < index) {
      el.classList.add('dropdown-item-disabled', 'disabled')
    } else {
      el.classList.remove('dropdown-item-disabled', 'disabled')
    }
    
  })

  seasonPaceUpdateLaptimes(
    glVSeasonPace['IndexStart'], glVSeasonPace['IndexEnd'], glVSeasonPace['Team']
  )
  
  seasonPaceUpdateCharts(
    seasonPaceDataEvents, seasonPaceDataLaptimes, seasonPaceDataTeams,
    seasonPaceDataDrivers, seasonPaceDrivers,
    chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
    chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
  )
  
}


function dropdown16RightMouseUp(element) {

  if (!element.classList.contains('disabled')) {

    let titleElement = getElement(dropdown16RightTitleID)

    let index = Number(element.getAttribute('index'))
    let name = element.getAttribute('name')
  
    titleElement.textContent = name
    titleElement.setAttribute('index', index)
    titleElement.setAttribute('name', name)

    glVSeasonPace['IndexEnd'] = index

  }

  seasonPaceUpdateLaptimes(
    glVSeasonPace['IndexStart'], glVSeasonPace['IndexEnd'], glVSeasonPace['Team']
  )
  
  seasonPaceUpdateCharts(
    seasonPaceDataEvents, seasonPaceDataLaptimes, seasonPaceDataTeams,
    seasonPaceDataDrivers, seasonPaceDrivers,
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


function seasonPaceDescChart121Open(element) {

  seasonPaceDescCloseAll(element)

  let table = getElement(seasonPaceChart121DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonPaceChart121DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
 
}


function seasonPaceDescChart121Close(element) {

  let table = getElement(seasonPaceChart121DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonPaceChart121DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function seasonPaceDescChart122Fill() {

  getElement(seasonPaceChart122DescContentID).innerHTML = chartDescBodyChart122

  let img1 = getElement(seasonPaceChart122DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-2-1.svg`
    
}


function seasonPaceDescChart122Open(element) {

  seasonPaceDescCloseAll(element)

  let table = getElement(seasonPaceChart122DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonPaceChart122DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function seasonPaceDescChart122Close(element) {

  let table = getElement(seasonPaceChart122DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonPaceChart122DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function seasonPaceDescChart123Fill() {

  getElement(seasonPaceChart123DescContentID).innerHTML = chartDescBodyChart123

  let img1 = getElement(seasonPaceChart123DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-v-1.svg`
    
}


function seasonPaceDescChart123Open(element) {

  seasonPaceDescCloseAll(element)

  let table = getElement(seasonPaceChart123DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonPaceChart123DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function seasonPaceDescChart123Close(element) {

  let table = getElement(seasonPaceChart123DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonPaceChart123DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function seasonPaceDescChart124Fill() {

  getElement(seasonPaceChart124DescContentID).innerHTML = chartDescBodyChart124

  let img1 = getElement(seasonPaceChart124DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-d-1.svg`
    
}


function seasonPaceDescChart124Open(element) {

  seasonPaceDescCloseAll(element)

  let table = getElement(seasonPaceChart124DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonPaceChart124DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function seasonPaceDescChart124Close(element) {

  let table = getElement(seasonPaceChart124DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonPaceChart124DescContentID).scrollTo(0, 0)
  
  getElement(blurScreenID).classList.add('hidden')
  
}


function seasonPaceDescChart125Fill() {

  getElement(seasonPaceChart125DescContentID).innerHTML = chartDescBodyChart125

  let img1 = getElement(seasonPaceChart125DescImg1ID)
  img1.src = `img/chart-descriptions/${themeCurrent}/chart-12-lc-1.svg`
    
}


function seasonPaceDescChart125Open(element) {

  seasonPaceDescCloseAll(element)

  let table = getElement(seasonPaceChart125DescTableID)
  table.classList.toggle('invisible')

  document.body.classList.toggle('o-hidden')

  getElement(seasonPaceChart125DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.toggle('hidden')
  
}


function seasonPaceDescChart125Close(element) {

  let table = getElement(seasonPaceChart125DescTableID)
  table.classList.add('invisible')

  document.body.classList.remove('o-hidden')

  getElement(seasonPaceChart125DescContentID).scrollTo(0, 0)

  getElement(blurScreenID).classList.add('hidden')
  
}


function seasonPaceDescsFill() {

  seasonPaceDescChart121Fill()
  seasonPaceDescChart122Fill()
  seasonPaceDescChart123Fill()
  seasonPaceDescChart124Fill()
  seasonPaceDescChart125Fill()
  
}









































function seasonFirstLoad() {

  scrollPosition = 0

  // glVGlobal['FirstLoad'] = false

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
    'paddingXDistance': null
  }

  glVSeason['SeasonID'] = lastElement(seasonIDs)
  glVSeason['SprintIndex'] ||= 2

  menuYearsFill(menuYears11ID, menuYears11ItemID, seasonIDs)

}


function updateSeasonStatisticsPage(kind) {

  // getElement(globalScrollContainerID).style.scrollBehavior = 'auto'

  let themeToggler = getElement(mainChangeThemeButtonID)
  themeTogglerReset(themeToggler)

  updateUnits()
  
  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonStatistcsPageID

  // data for both race and sprint
  seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['SprintIndex'])

  let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData6path)]

  Promise.all(dataPaths).then(function(files) {

    data_1 = files[0]
    data_6 = files[1]

    getElement(seasonContentContainerID).innerHTML = ''
    getElement(seasonContentContainerID).innerHTML += pageSeasonStatistics

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerSeasonStatisticsID).classList.add('smooth-appear-fast')
    // }

    seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])

    horizontalTocFill(seasonStatisticsToc0ID, seasonStatisticsToc0Attributes, globalScrollBehavior)

    let condition1 = (o) => (o['SeasonID'] == glVSeason['SeasonID']) && (o['DataAvailable'] == 1)
    lastEventData = events.filter(o => condition1(o)).slice(-1)[0]

    let condition2 = (o) => (o['SeasonID'] == glVSeason['SeasonID']) && (o['DataAvailable'] == 0)
    nextEventData = events.filter(o => condition2(o))[0]

    glVSeason['SeasonOver'] = getSeasonOver(glVSeason['SeasonID'])

    seasonUpdateEventInformation(lastEventData, nextEventData, glVSeason['SeasonID'], glVSeason['SeasonOver'])

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

    menuYearsSelection(menuYears11ID, glVSeason['SeasonID'])

    // disappearElement(menuYears11ID)

    // pageContainerScrollTop()
    pageContainerSetScroll(scrollPosition)

    // appearElement(menuYears11ID)
    globalMenuPagesHide()
    seasonAppearElements(glVGlobal['Page'])
    appearElement(seasonMainContainerID)
  
    }).catch(function(err) {
  // handle error here
  })
  
}


function updateSeasonRatingsPage(kind) {

  updateUnits()

  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonRatingsPageID

  seasonCategoriesRanksTableData['clickedTableID'] ||= 0

  seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['SprintIndex'])

  let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData2path)]

  Promise.all(dataPaths).then(function(files) {

    data_1 = files[0]
    data_2 = files[1]

    // clear content
    getElement(seasonContentContainerID).innerHTML = ''
    getElement(seasonContentContainerID).innerHTML += pageSeasonCategories

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerSeasonRatingsID).classList.add('smooth-appear-fast')
    // }

    // dropdown12
    dropdown12Fill()

    // fill table
    seasonCategoriesRanksTableFill(data_2)
  
    // fill info
    seasonCategoriesInfoTableFill(data_2)

    // fill descs
    seasonRatingsDescChartsFill()

    // build charts
    seasonCategoriesUpdateCharts()

    // glVGlobal['FirstLoad'] = false

    menuYearsSelection(menuYears11ID, glVSeason['SeasonID'])

    seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])

    // pageContainerScrollTop()
    pageContainerSetScroll(scrollPosition)

    // appearElement(menuYears11ID)
    globalMenuPagesHide()
    seasonAppearElements(glVGlobal['Page'])
    appearElement(seasonMainContainerID)

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateSeasonComparisonPage(kind) {

  updateUnits()

  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonComparisonPageID

  seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['SprintIndex'])

  let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData2path)]

  Promise.all(dataPaths).then(function(files) {

    data_1 = files[0]
    data_2 = files[1]

    getElement(seasonContentContainerID).innerHTML = ''
    getElement(seasonContentContainerID).innerHTML += pageSeasonComparison

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerSeasonComparisonID).classList.add('smooth-appear-fast')
    // }

    seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])

    horizontalTocFill(seasonComparisonToc0ID, seasonComparisonToc0Attributes, globalScrollBehavior)

    seasonDriversUpdateLists()
    seasonDriversParametersInitiate()

    // fill dropdowns
    dropdown13CenterFill()
    dropdown13Fill(dropdown13MenuLeftID, seasonDriversIDTLeft)
    dropdown13Fill(dropdown13MenuRightID, seasonDriversIDTRight)

    dropdown13MakeActive()

    dropdown14Fill()
    dropdown14MakeActive()

    seasonComparisonUpdateBadge(
      seasonDriversIDTLeft, seasonDriversNameLeft,
      seasonDriversColorLeft, seasonDriversTeamLeft,
      seasonDriversNumberLeft, 'left'
    )

    seasonComparisonUpdateBadge(
      seasonDriversIDTRight, seasonDriversNameRight,
      seasonDriversColorRight, seasonDriversTeamRight,
      seasonDriversNumberRight, 'right'
    )

    let dataLeft = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTLeft)[0]
    let dataRight = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTRight)[0]

    seasonComparisonDescChartsFill()
    
    // update charts
    seasonComparisonUpdateCharts(
      seasonDriversIDTLeft, seasonDriversIDTRight,
      dataLeft, dataRight
    )

    menuYearsSelection(menuYears11ID, glVSeason['SeasonID'])

    // disappearElement(menuYears11ID)
    
    // pageContainerScrollTop()
    pageContainerSetScroll(scrollPosition)

    // appearElement(menuYears11ID)
    globalMenuPagesHide()
    seasonAppearElements(glVGlobal['Page'])
    appearElement(seasonMainContainerID)

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateSeasonPacePage(kind) {

  updateUnits()

  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonPacePageID

  glVSeasonPace['CheckMeanPaceCondition'] ||= 0
  glVSeasonPace['CheckMeanPaceSmoothCondition'] ||= 1

  // remove it
  // glVSeason['SprintIndex'] = 0

  seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['SprintIndex'])

  let dataPaths = [d3.csv(seasonData2path)]

  Promise.all(dataPaths).then(function(files) {

    data_2 = files[0]

    getElement(seasonContentContainerID).innerHTML = ''
    getElement(seasonContentContainerID).innerHTML += pageSeasonPace

    seasonMenuRacesprintButtonActivateByCondition(glVSeason['SprintIndex'])

    seasonPaceUpdateLists()

    glVSeasonPace['Team'] ||= arrayGetRandom(seasonPaceTeamsUnique)

    // remove it
    // glVSeasonPace['Team'] = 'McLaren'
    // glVSeasonPace['Team'] = 'Aston Martin'
    // glVSeasonPace['Team'] = 'Ferrari'
     // glVSeasonPace['Team'] = 'Red Bull Racing'
    // glVSeasonPace['Team'] = 'Racing Bulls'
    // glVSeasonPace['Team'] = 'Mercedes'
    // glVSeasonPace['Team'] = 'Williams'

    seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['SprintIndex'], glVSeasonPace['Team'])

    let dataPathsSec = [
      d3.csv(seasonData7path),
      d3.csv(seasonData8path),
      d3.csv(seasonData9path),
      d3.csv(seasonData10path)
    ]

    Promise.all(dataPathsSec).then(function(files) {

      data_7 = files[0]
      data_8 = files[1]
      data_9 = files[2]
      data_10 = files[3]

      // glVSeasonPace['CheckMeanPaceCondition'] = 1
      // glVSeasonPace['CheckMeanPaceSmoothCondition'] = 0

      let indexStart = Number(firstElement(seasonPaceEventIndexes))
      let indexEnd = Number(lastElement(seasonPaceEventIndexes))
  
      glVSeasonPace['IndexStart'] = indexStart
      glVSeasonPace['IndexEnd'] = indexEnd

      // remove it
      // glVSeasonPace['IndexStart'] = 0
      // glVSeasonPace['IndexEnd'] = 0
  
      dropdown15Fill(glVSeasonPace['Team'])
      dropdown15MakeActive()
  
      dropdown16LeftFill(glVSeasonPace['IndexStart'])
      dropdown16RightFill(glVSeasonPace['IndexEnd'])
  
      dropdown16LeftMakeActive()
      dropdown16RightMakeActive()
  
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

      seasonPaceUpdateLaptimes(
        glVSeasonPace['IndexStart'],
        glVSeasonPace['IndexEnd'],
        glVSeasonPace['Team']
      )

      seasonPaceUpdateCharts(
        seasonPaceDataEvents, seasonPaceDataLaptimes, seasonPaceDataTeams,
        seasonPaceDataDrivers, seasonPaceDrivers,
        chart12Active=glVSeasonPace['CheckMeanPaceCondition'], 
        chart12Smooth=glVSeasonPace['CheckMeanPaceSmoothCondition']
      )

      menuYearsSelection(menuYears11ID, glVSeason['SeasonID'])
  
      pageContainerSetScroll(scrollPosition)
  
      globalMenuPagesHide()
      seasonAppearElements(glVGlobal['Page'])
      appearElement(seasonMainContainerID)

      }).catch(function(err) {
      // handle error here
    })

    }).catch(function(err) {
    // handle error here
  })
  
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





