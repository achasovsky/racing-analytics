function seasonUpdatePaths(seasonID, sprintIndex) {

  seasonData1path = pathSeasonData + seasonID + '/' + 'data_1_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData2path = pathSeasonData + seasonID + '/' + 'data_2_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData5path = pathSeasonData + seasonID + '/' + 'data_5_' + seasonID + '_' + sprintIndex + '.csv'
  seasonData6path = pathSeasonData + seasonID + '/' + 'data_6_' + seasonID + '_' + sprintIndex + '.csv'
    
}


function seasonAppearElements(page) {

  if (page == seasonStatistcsPageID) {
    
    appearElement(containerSeasonStatisticsID)
    
  } else if (page == seasonRatingsPageID) {
    
    appearElement(containerSeasonRatingsID)
    
  } else if (page == seasonComparisonPageID) {

    appearElement(containerSeasonDriversID)
    
  }

}


function seasonUpdateEventInformation(lastEventData, nextEventData, seasonSeasonID, seasonOver) {

  let legendContainer = getElement(containerSeasonStatisticsInfoID)

  // if season finished
  if (seasonOver) {

    // getElement('fieldset-1').style.marginTop = '7rem'

    legendContainer.innerHTML = `
    
      <div class='y7i52o'>

        <div class='text-1'>
    
          <div class='flex-column j-start a-center ps-2'>
            <div class=''>Победители</div>
            <div class=''>гран-при</div>
            <div class='outvdp' id='season-statistics-competition-winners'></div>
          </div>
          
          <div class='v-line he-5 a-s-center bc-10 mx-2'></div>
          
          <div class='flex-column j-center a-center'>
            <div class=''>Индекс конкуренции</div>
            <div class='outvdp' id='season-statistics-competition-level'></div>
          </div>
          
          <div class='v-line he-5 a-s-center bc-10 mx-2'></div>
          
          <div class='flex-column j-start a-center pe-2'>
            <div class=''>Обладатели</div>
            <div class=''>поул-позиции</div>
            <div class='outvdp' id='season-statistics-competition-poles'></div>
          </div>
    
        </div>

      </div>
      
    `

    let data_2_local = sortValues(data_6, 'ChampionshipClassification', ascending=true)
 
    let uniqueWinners = data_5[0]['WinnerRaceUnique']
    let uniqueQualificationWinners = data_5[0]['WinnerQualificationUnique']
    let competitionLevel = data_5[0]['CompetitionRating']

    setText(seasonStatisticsCompetitionWinnersMetricID, uniqueWinners)
    setText(seasonStatisticsCompetitionPolesMetricID, uniqueQualificationWinners)
    setText(seasonStatisticsCompetitionLevelMetricID, competitionLevel)

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
    
  }

}


function seasonMenuYearsMouseUp(element) {

  if (!element.className.includes('active')) {

    pageContainerGetScroll()

    glVSeason['SeasonID'] = element.getAttribute('SeasonID')
    
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

      updateImage(img, imgPath)
      
      // getElement('driver-image-' + tableID).src = imgPath

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


function seasonAggregationTable2Fill(data_2Local, tableID) {

  getElement('aggregation-list-rating').innerHTML = ''
  getElement('aggregation-list-values-rating').innerHTML = ''

  if (data_2Local.length > 0) {

    setAttribute_(containerSeasonRatingsID, 'tableID', tableID)
  
    setAttribute_('aggregation-list-rating', 'tableID', tableID)
    setAttribute_('aggregation-list-values-rating', 'tableID', tableID)

    setAttribute_(containerTable2AndChartLolID, 'tableID', tableID)
    setAttribute_('chart-season-rating-lol', 'tableID', tableID)

    setAttribute_(containerChartLine1ID, 'tableID', tableID)
    setAttribute_('chart-season-rating-line', 'tableID', tableID)

    // setAttribute_(containerSeasonRatingsTitle1ID, 'tableID', tableID)
    // setAttribute_(containerSeasonRatingsTitle2ID, 'tableID', tableID)
  
    let dropdownLabel = getElement(dropdown12TitleID)
    
    let metric = dropdownLabel.getAttribute('metric')
    let ascending = dropdownLabel.getAttribute('ascending')

    let data = copyObject(data_2Local)
    data = sortValues(data, 'ChampionshipClassification', false)
    data = sortValues(data, metric.replace('Avg', '') + 'Stability', true)
    data = sortValues(data, metric, ascending)
    data = sortValues(data, 'RacesParticipatedGroup', false)

    let titleColor = saturateColor(data[0]['Color'], 0.8)
    seasonAggregationTable2DefaultTitleColor = titleColor
  
    let titleName = data[0]['FullName']
    seasonAggregationTable2DefaultTitleName = titleName

    let titleIDT = data[0]['DriverIDT']
    seasonAggregationTable2DefaultTitleIDT = titleIDT
    
    let titleTeam = data[0]['Team']
    seasonAggregationTable2DefaultTitleTeam = titleTeam
    
    let titleMetric = data[0][metric]
    seasonAggregationTable2DefaultTitleMetricValue = titleMetric

    let dataPrimary = data.filter(d => d['RacesParticipatedGroup'] == 1)
    let dataSecondary = data.filter(d => d['RacesParticipatedGroup'] == 0)

    let driverIDTsPrimary = dataPrimary.map(row => row['DriverIDT'])
    let driverIDTsSecondary = dataSecondary.map(row => row['DriverIDT'])

    // image
    let img = getElement('image-season-rating-table')
    let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + data[0]['DriverIDT'] + imagesFormat
    
    updateImage(img, imgPath)

    // title 
    let titleHeader = getElement('title-season-rating-table')
    
    titleHeader.textContent = titleName
    titleHeader.setAttribute('idt', titleIDT)
    titleHeader.style.color = titleColor

    adjustFontSizeByParent(titleHeader)

    // team
    setText('team-season-rating-table', titleTeam)

    //metric
    let metricTitle = getElement('metric-season-rating-table')
    metricTitle.textContent = titleMetric
    metricTitle.style.color = titleColor

    // fill menu with names and values of drivers, who participated in at least 5 races
    // for (driverIDT of driverIDTsPrimary) {
    if (dataPrimary.length > 0) {

      driverIDTsPrimary.forEach((driverIDT, i) => {
  
        let driverData = dataPrimary.filter(d => d['DriverIDT'] == driverIDT)
        let name = document.createElement('li')
        let value = document.createElement('li')

        Object.assign(name, {
          className: 'aggregation-elements agg-el-1',
          id: seasonCategoriesElementsID + tableID + '-' + String(driverIDT),
          textContent: driverData[0]['FullName'],
        })

        name.setAttribute('idt', driverIDT)
        name.setAttribute('tableID', tableID)
        name.setAttribute('color', saturateColor(driverData[0]['Color'], 0.8))
        name.setAttribute('strokeDasharray', 0)
        name.setAttribute('name', driverData[0]['FullName'])
        name.setAttribute('team', driverData[0]['Team'])
        name.setAttribute('metricvalue', driverData[0][metric])

        Object.assign(value, {
          className: 'aggregation-values agg-el-1',
          id: 'aggregation-table-2-values-' + tableID + '-' + String(driverIDT),
          textContent: driverData[0][metric],
        })
  
        value.setAttribute('idt', driverIDT)
        value.setAttribute('color', saturateColor(driverData[0]['Color'], 0.8))
    
        getElement('aggregation-list-rating').appendChild(name)
        getElement('aggregation-list-values-rating').appendChild(value)
   
      })
      
    }

    let lessThanFiveMarkers = getLessThanFiveGPLabel()

    if ((dataPrimary.length > 0) && (dataSecondary.length > 0)) {

      getElement('aggregation-list-rating').appendChild(lessThanFiveMarkers[0])
      getElement('aggregation-list-values-rating').appendChild(lessThanFiveMarkers[1])
      
    }

    if (dataSecondary.length > 0) {

      // fill menu with names and values of drivers, who participated in less than 5 races
      driverIDTsSecondary.forEach((driverIDT, i) => {

        let driverData = dataSecondary.filter(d => d['DriverIDT'] == driverIDT)
        let name = document.createElement('li')
        let value = document.createElement('li')

        Object.assign(name, {
          className: 'aggregation-elements agg-el-1',
          id: seasonCategoriesElementsID + tableID + '-' + String(driverIDT),
          textContent: driverData[0]['FullName'],
        })

        // position in ordred list
        // name.setAttribute('value', (i + 1))
        name.setAttribute('idt', driverIDT)
        name.setAttribute('tableID', tableID)
        name.setAttribute('color', saturateColor(driverData[0]['Color'], 0.8))
        name.setAttribute('strokeDasharray', 0)
        name.setAttribute('name', driverData[0]['FullName'])
        name.setAttribute('team', driverData[0]['Team'])
        name.setAttribute('metricvalue', driverData[0][metric])

        Object.assign(value, {
          className: 'aggregation-values agg-el-1',
          id: 'aggregation-table-2-values-' + tableID + '-' + String(driverIDT),
          textContent: driverData[0][metric],
        })
  
        value.setAttribute('idt', driverIDT)
        value.setAttribute('tableID', tableID)
        value.setAttribute('color', saturateColor(driverData[0]['Color'], 0.8))
    
        getElement('aggregation-list-rating').appendChild(name)
        getElement('aggregation-list-values-rating').appendChild(value)
     
      })
      
    }

  } else {

    // image
    let img = getElement('image-season-rating-table')
    let imgPath = pathImgDrivers + 'blank.svg'
    
    updateImage(img, imgPath)
    
    // title 
    let titleHeader = getElement('title-season-rating-table')
    titleHeader.textContent = ''
    
    // team
    setText('team-season-rating-table', '')
    
    //metric
    let metricTitle = getElement('metric-season-rating-table')
    metricTitle.textContent = ''
    
  }

}


function dropdown12Fill() {

  let clickedTable = glVSeason['CategoriesClickedTableID']

  let labels = dropdown12Data.map(o => o['label'])
  let metrics = dropdown12Data.map(o => o['metric'])
  let stabilities = dropdown12Data.map(o => o['stability'])
  let ascendings = dropdown12Data.map(o => o['ascending'])

  let dropdownLabel = getElement(dropdown12TitleID)
  let label = labels[clickedTable]

  // add items
  dropdownMenuAddItems(dropdown12MenuID, labels, dropdown12MenuItemID)

  // items attributes
  Array.from(getElement(dropdown12MenuID).children).forEach((item, i) => {
    
    item.setAttribute('tableID', i)
    item.setAttribute('metric', metrics[i])
    item.setAttribute('stability', stabilities[i])
    item.setAttribute('ascending', ascendings[i])
    
  })

  let metric = metrics[clickedTable]
  let stability = stabilities[clickedTable]
  let ascending = ascendings[clickedTable]

  dropdownLabel.textContent = label
  dropdownLabel.setAttribute('metric', metric)
  dropdownLabel.setAttribute('stability', stability)
  dropdownLabel.setAttribute('ascending', ascending)

  let data = copyObject(data_2)
  data = sortValues(data, 'ChampionshipClassification', true)
  data = sortValues(data, metric, ascending)

  // fill table
  seasonAggregationTable2Fill(data, clickedTable)

  // update widths
  updateDropdownWidth(dropdown12ID, dropdown12MenuID)

}


function dropdown12MouseUp(element) {

  // global variables
  let clickedTable = element.getAttribute('tableID')

  // globals
  glVSeason['CategoriesClickedTableID'] = clickedTable
  
  // let metric = attribute_('metric', element)
  // let stability = attribute_('stability', element)

  let dropdownLabel = getElement(dropdown12TitleID)
  
  let metric = element.getAttribute('metric')
  let stability = element.getAttribute('stability')
  let ascending = element.getAttribute('ascending')

  // label
  dropdownLabel.textContent = element.textContent
  dropdownLabel.setAttribute('metric', metric)
  dropdownLabel.setAttribute('stability',  stability)
  dropdownLabel.setAttribute('ascending', element.getAttribute('ascending'))

  // fill table
  seasonAggregationTable2Fill(data_2, clickedTable)

  // draw charts
  chartLol_1(data_2, 'chart-season-rating-lol', clickedTable, metric, stability, ascending)
  chartLine_1(data_1, 'chart-season-rating-line', clickedTable, dropdown12Data[clickedTable]['chartLine1Metric'])

  // click charts if neccessary
  seasonCategoriesClickChartsByClickedDrivers()

  // adjust width of driver's name in title
  let title = getElement('title-season-rating-table')
  adjustFontSizeByParent(title)

  // update widths
  updateDropdownWidth(dropdown12ID, dropdown12MenuID)
  
}


function seasonCategoriesClickChartsByClickedDrivers() {

  let clickedDrivers = glVSeason['CategoriesClickedDrivers']
  let currentSeasonDriversIDTList = data_2.map(o => o['DriverIDT'])

  if (clickedDrivers.length > 0) {

    let clickedTable = glVSeason['CategoriesClickedTableID']
    let IDTs = clickedDrivers.map(o => o['idt'])

    // if there was clicked lines and circles - make them active
    IDTs.forEach((idt, i) => {

      if (currentSeasonDriversIDTList.includes(idt)) {

        let color = clickedDrivers[i]['color']
        let team = clickedDrivers[i]['dash']
  
        // define color considering current clicked drivers
        let colorAndDash = seasonCategoriesUpdateColorAndDash(color, team)
      
        color = colorAndDash[0]
        dash = colorAndDash[1]
  
        seasonAggregationTable2Activate(clickedTable, idt, color)
        seasonChartLol_1Activate(clickedTable, idt, color, dash)
        seasonChartLine_1Activate(clickedTable, idt, color, dash)
  
        // name
        let name = getElement(seasonCategoriesElementsID + clickedTable + '-' + idt)
        name.classList.add('clicked')
  
        // circle
        let hoverCircle = getElement('chart-lol-1-hover-circle-' + clickedTable + '-' + idt)
        hoverCircle.classList.add('clicked')
  
        // line
        let line = getElement('chart-line-1-path-' + clickedTable + '-' +  idt).children[0]
        line.classList.add('clicked')
        
      } else {

        glVSeason['CategoriesClickedDrivers'] = clickedDrivers.filter(o => o['idt'] != idt)
        
      }

    })

    let lastClickedDriver = lastElement(clickedDrivers)

    if (currentSeasonDriversIDTList.includes(lastClickedDriver['idt'])) {

      seasonActivateTogglerAggregationTable2Header(
        clickedTable,
        lastClickedDriver['idt'],
        lastClickedDriver['color'])
      
      }
      
    }

}


function seasonCategoriesUpdateCharts() {

  let clickedTable = glVSeason['CategoriesClickedTableID']

  // draw charts
  chartLol_1(
    data_2, 'chart-season-rating-lol', clickedTable,
    dropdown12Data[clickedTable]['metric'],
    dropdown12Data[clickedTable]['stability'],
    dropdown12Data[clickedTable]['ascending'],
  )

  chartLine_1(
    data_1, 'chart-season-rating-line', clickedTable,
    dropdown12Data[clickedTable]['chartLine1Metric']
  )

  seasonCategoriesClickChartsByClickedDrivers()

  window.onresize = () => {

    updateUnits()

    let clickedTableResize = Number(glVSeason['CategoriesClickedTableID'])

    if (getElement('chart-season-rating-lol')) {

      chartLol_1(
        data_2, 'chart-season-rating-lol', clickedTableResize,
        dropdown12Data[clickedTableResize]['metric'],
        dropdown12Data[clickedTableResize]['stability'],
        dropdown12Data[clickedTableResize]['ascending'],
      )
      
    }

    if (getElement('chart-season-rating-line')) {

      chartLine_1(
        data_1, 'chart-season-rating-line', clickedTableResize,
        dropdown12Data[clickedTableResize]['chartLine1Metric']
      )
      
    }

    seasonCategoriesClickChartsByClickedDrivers()

  }
  
}


function seasonCategoriesUpdateColorAndDash(color, team) {

  let dash = 0

  let clickedDrivers = glVSeason['CategoriesClickedDrivers']
  let clickedTeams = clickedDrivers.map(o => o['team'])
  let clickedColorsTeam = clickedDrivers.filter(o => o['team'] == team)
  clickedColorsTeam = clickedColorsTeam.map(o => o['color'])

  if (clickedTeams.length > 0) {
    if (clickedTeams.includes(team)) {
      
      let count = clickedTeams.count(team)

      for (let i = 0; i < count; i++) {

        if (clickedColorsTeam.includes(color)) {

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


function seasonCategoriesUpdateClickedDrivers(driverIDT, driverTeam, driverColor, driverDash) {

  let clickedDrivers = glVSeason['CategoriesClickedDrivers']
  let driverIDTs = clickedDrivers.map(o => o['idt'])

  if (!driverIDTs.includes(driverIDT)) {
    clickedDrivers.push({idt: driverIDT, team: driverTeam, color: driverColor, dash: driverDash})
  } else {
    clickedDrivers = clickedDrivers.filter(item => item.idt !== driverIDT)
  }

  // globals
  glVSeason['CategoriesClickedDrivers'] = clickedDrivers
  
}


function seasonCategoriesElementToggleClicked(idt) {

  let elements = getElementsListByAttribute('idt', idt)

  elements.forEach((element, i) => {

    // aggregation table eelements and values
    if (element.id.includes(seasonCategoriesElementsID)) {
      
      // add active to element if not active, and remove active if element is active
      if (element.classList.contains('clicked')) {
        element.classList.remove('clicked')
      } else {
        element.classList.add('clicked')
      }
      
    }
    // chart lol 
    else if (element.id.includes('chart-lol-1-hover-circle-')) {
      
      // add active to element if not active, and remove active if element is active
      if (element.classList.contains('clicked')) {
        element.classList.remove('clicked')
      } else {
        element.classList.add('clicked')
      }
      
    }
    // chart line
    else if (element.id.includes('chart-line-1-path-')) {

      // add active to element if not active, and remove active if element is active
      if (element.children[0].classList.contains('clicked')) {
        element.children[0].classList.remove('clicked')
      } else {
        element.children[0].classList.add('clicked')
      }
      
    }
    
  })
  
}


function seasonCategoriesAggregationTable2ScrollToElement(tableID, driverIDT) {

  let currentSeasonDriversIDTList = data_2.map(o => o['DriverIDT'])

  if (currentSeasonDriversIDTList.includes(driverIDT)) {

    let aggregationList = getElement('aggregation-list-rating')
    let scrollBox = getElement('scroll-box-season-rating')
    let tableName = getElement(seasonCategoriesElementsID + tableID + '-' + driverIDT)
  
    let dY = convertRemToPixels(0.25)
    let yCoord = tableName.offsetTop - scrollBox.offsetTop - 0.5 * scrollBox.offsetHeight + 0.5 * tableName.offsetHeight - 1
  
    scrollBox.scrollTo(0, yCoord)
    
  }

}


function seasonCategoriesElementToggleActive(idt) {

  let elements = getElementsListByAttribute('idt', idt)

  elements.forEach((element, i) => {

    // aggregation table eelements and values
    if (element.id.includes(seasonCategoriesElementsID)) {
      
      // add active to element if not active, and remove active if element is active
      if (element.classList.contains('active')) {
        element.classList.remove('active')
      } else {
        element.classList.add('active')
      }
      
    }
    // chart lol 
    else if (element.id.includes('chart-lol-1-hover-circle-')) {
      
      // add active to element if not active, and remove active if element is active
      if (element.classList.contains('active')) {
        element.classList.remove('active')
      } else {
        element.classList.add('active')
      }
      
    }
    // chart line
    else if (element.id.includes('chart-line-1-path-')) {

      // add active to element if not active, and remove active if element is active
      if (element.children[0].classList.contains('active')) {
        element.children[0].classList.remove('active')
      } else {
        element.children[0].classList.add('active')
      }
      
    }
    
  })
  
}


function seasonCategoriesScrollAndHeader(element) {

  let clickedDrivers = glVSeason['CategoriesClickedDrivers']

  // scroll and update header
  if (clickedDrivers.length > 0) {

    let clickedTable = glVSeason['CategoriesClickedTableID']
  
    let lastClickedElement = lastElement(clickedDrivers)
    seasonActivateTogglerAggregationTable2Header(clickedTable, lastClickedElement['idt'], lastClickedElement['color'])

    // scroll to driver name
    if (element.id.includes('chart-lol-1-hover-circle-')) {
      seasonCategoriesAggregationTable2ScrollToElement(clickedTable, lastClickedElement['idt'])
    }
    
  } else {

    let clickedTable = glVSeason['CategoriesClickedTableID']

    seasonActivateTogglerAggregationTable2Header('', '', '', defaultHeader=true)

    // scroll to driver name
    if (element.id.includes('chart-lol-1-hover-circle-')) {
      seasonCategoriesAggregationTable2ScrollToElement(clickedTable, seasonAggregationTable2DefaultTitleIDT)
    }
    
  }
  
}


function seasonActivateTogglerAggregationTable2Header(tableID, driverIDT, driverColor, defaultHeader=false) {

  let name
  let color
  let team
  let metric
  
  if (defaultHeader) {

    name = seasonAggregationTable2DefaultTitleName
    color = seasonAggregationTable2DefaultTitleColor
    team = seasonAggregationTable2DefaultTitleTeam
    metric = seasonAggregationTable2DefaultTitleMetricValue
    idt = seasonAggregationTable2DefaultTitleIDT

  } else {

    let tableName = getElement(seasonCategoriesElementsID + tableID + '-' + driverIDT)
    let tableValue = getElement('aggregation-table-2-values-' + tableID + '-' + driverIDT)

    idt = driverIDT
    name = tableName.textContent
    color = driverColor
    team = tableName.attributes['team'].value
    metric = tableValue.textContent
    
  }

  // img
  let img = getElement('image-season-rating-table')
  let imgPath = pathImgDrivers + glVSeason['SeasonID'] + '/' + idt + imagesFormat
  updateImage(img, imgPath)

  // name
  let title = getElement('title-season-rating-table')

  title.style.fontSize = ''
  title.textContent = name
  title.style.color = color
  title.setAttribute('idt', idt)

  // team
  setText('team-season-rating-table', team)

  // metric
  let metricTitle = getElement('metric-season-rating-table')
  metricTitle.textContent = metric
  metricTitle.style.color = color

  adjustFontSizeByParent(title)
  
}


function seasonAggregationTable2Activate(tableID, driverIDT, color, click=true) {

  let tableName = getElement(seasonCategoriesElementsID + tableID + '-' + driverIDT)
  let tableValue = getElement('aggregation-table-2-values-' + tableID + '-' + driverIDT)

  tableName.classList.add('aggregation-elements-active')
  tableValue.classList.add('aggregation-elements-active')

  tableName.style.color = color
  tableValue.style.color = color

  if (click) {

    tableName.classList.add('aggregation-elements-clicked')
    tableValue.classList.add('aggregation-elements-clicked')
    
  }

}


function seasonAggregationTable2Deactivate(tableID, driverIDT, active=true) {

  let tableName = getElement(seasonCategoriesElementsID + tableID + '-' + driverIDT)
  let tableValue = getElement('aggregation-table-2-values-' + tableID + '-' + driverIDT)

  tableName.classList.remove('aggregation-elements-clicked')
  tableValue.classList.remove('aggregation-elements-clicked')

  if (active) {

    tableName.classList.remove('aggregation-elements-active')
    tableValue.classList.remove('aggregation-elements-active')

    tableName.style.color = colorThemesChartFont2
    tableValue.style.color = colorThemesChartFont2
    
  }
  
}


function seasonChartLol_1Activate(tableID, driverIDT, color, dash, click=true) {

  // let circle = getElement('chart-lol-1-circle-' + tableID + '-' + driverIDT)
  let abb = getElement('chart-lol-1-abb-' + tableID + '-' + driverIDT)
  // let grid = getElement('chart-lol-1-grid-' + tableID + '-' + driverIDT)
  
  let stdLine = getElement('chart-lol-1-std-line-' + tableID + '-' + driverIDT)
  // let stdLineUp = getElement('chart-lol-1-std-line-up-' + tableID + '-' + driverIDT)
  // let stdLineDown = getElement('chart-lol-1-std-line-down-' + tableID + '-' + driverIDT)
  
  let decorLine = getElement('chart-lol-1-decor-line-' + tableID + '-' + driverIDT)
  let decorCircle = getElement('chart-lol-1-decor-circle-' + tableID + '-' + driverIDT)
  
  let tickLabel = getElement('chart-lol-1-ticklabel-' + tableID + '-' + driverIDT)

  let hoverCircle = getElement('chart-lol-1-hover-circle-' + tableID + '-' + driverIDT)

  // circle.style.fill = color
  // circle.style.stroke = shadeColor(color, -0.25)
  // circle.classList.add('chart-lol-1-circle-active')

  abb.style.fill = color
  abb.classList.add('chart-lol-1-abb-active')

  // grid.style.stroke = color

  if (stdLine) {
    
    stdLine.style.stroke = color
    // stdLine.classList.add('chart-lol-1-std-line-active')

    // stdLineUp.style.stroke = color
    // stdLineUp.classList.add('chart-lol-1-std-line-active')

    // stdLineDown.style.stroke = color
    // stdLineDown.classList.add('chart-lol-1-std-line-active')

  }

  decorLine.style.stroke = color
  decorLine.style.strokeDasharray = dash

  decorCircle.style.fill = color
  decorCircle.classList.add('chart-lol-1-circle-active')
  
  tickLabel.style.fill = color
  tickLabel.classList.add('chart-lol-1-ticklabel-active')

  if (click) {

    // circle.classList.add('chart-lol-1-circle-clicked')
    abb.classList.add('chart-lol-1-abb-clicked')

    if (stdLine) {
      
      stdLine.classList.add('chart-lol-1-std-line-clicked')
      
      // stdLineUp.classList.add('chart-lol-1-std-line-clicked')
      // stdLineDown.classList.add('chart-lol-1-std-line-clicked')
      
    }

    decorLine.classList.add('chart-lol-1-decor-line-clicked')
    tickLabel.classList.add('chart-lol-1-ticklabel-clicked')
    
  }
  
}


function seasonChartLol_1Deactivate(tableID, driverIDT, active=true) {

  // let circle = getElement('chart-lol-1-circle-' + tableID + '-' + driverIDT)
  let abb = getElement('chart-lol-1-abb-' + tableID + '-' + driverIDT)
  // let grid = getElement('chart-lol-1-grid-' + tableID + '-' + driverIDT)
  
  let stdLine = getElement('chart-lol-1-std-line-' + tableID + '-' + driverIDT)
  // let stdLineUp = getElement('chart-lol-1-std-line-up-' + tableID + '-' + driverIDT)
  // let stdLineDown = getElement('chart-lol-1-std-line-down-' + tableID + '-' + driverIDT)
  
  let decorLine = getElement('chart-lol-1-decor-line-' + tableID + '-' + driverIDT)
  let decorCircle = getElement('chart-lol-1-decor-circle-' + tableID + '-' + driverIDT)
  
  let tickLabel = getElement('chart-lol-1-ticklabel-' + tableID + '-' + driverIDT)

  let hoverCircle = getElement('chart-lol-1-hover-circle-' + tableID + '-' + driverIDT)

  // let colorDefault = circle.getAttribute('color')

  // circle.classList.remove('chart-lol-1-circle-clicked')

  let colorDefault = abb.getAttribute('color')

  abb.classList.remove('chart-lol-1-abb-clicked')

  if (stdLine) {

    stdLine.classList.remove('chart-lol-1-std-line-clicked')
    
    // stdLineUp.classList.remove('chart-lol-1-std-line-clicked')
    // stdLineDown.classList.remove('chart-lol-1-std-line-clicked')
    
  }

  decorLine.classList.remove('chart-lol-1-decor-line-clicked')
  // decorCircle.classList.remove('chart-lol-1-circle-active')

  tickLabel.classList.remove('chart-lol-1-ticklabel-clicked')

  if (active) {

    // circle.style.fill = colorDefault
    // circle.style.stroke = shadeColor(colorDefault, -0.25)
    // circle.classList.remove('chart-lol-1-circle-active')

    abb.style.fill = colorThemesChartAbbsLolColor
    abb.classList.remove('chart-lol-1-abb-active')

    // grid.style.stroke = ''

    if (stdLine) {

      stdLine.style.stroke = colorThemesChartStdLinesLolColor
      // stdLine.classList.remove('chart-lol-1-std-line-active')
      
      // stdLineUp.classList.remove('chart-lol-1-std-line-active')
      // stdLineDown.classList.remove('chart-lol-1-std-line-active')
      
      // stdLine.style.stroke = colorDefault
      
      // stdLineUp.style.stroke = colorDefault
      // stdLineDown.style.stroke = colorDefault
      
    }

    decorCircle.style.fill = colorDefault

    decorLine.style.stroke = colorThemesChartDecorLinesLolColor
    decorLine.style.strokeDasharray = 0

    tickLabel.classList.remove('chart-lol-1-ticklabel-active')
    tickLabel.style.fill = colorThemesChartAxisTickLabels

  }
  
}


function seasonChartLine_1Activate(tableID, driverIDT, color, dash, click=true) {

  let lineNode = getElement('chart-line-1-path-' + tableID + '-' + driverIDT)
  let line = lineNode.children[0]
  let circles = getElement('chart-line-1-circles-' + tableID + '-' + driverIDT)
  let circlesRetired = getElement('chart-line-1-circles-dnf-' + tableID + '-' + driverIDT)

  // put line in front of other lines
  line.parentElement.parentNode.appendChild(line.parentElement)

  // line.classList.add('clicked')
  line.classList.add('chart-line-1-line-active')
  line.style.stroke = color
  line.style.strokeDasharray = dash

  // put circles in front of other lines
  circlesRetired.parentNode.appendChild(circlesRetired)
  
  for (child of circlesRetired.children) {
    child.style.stroke = saturateColor(color, 0.8)
  }

  // put circles in front of other lines
  circles.parentNode.appendChild(circles)
  
  for (child of circles.children) {
    if (child.attributes['PointsClassified'].value == 1) {
      child.style.fill = saturateColor(color, 0.8)
    }
  }

  if (click) {

    line.classList.add('chart-line-1-line-clicked')
    
  }
  
}


function seasonChartLine_1Deactivate(tableID, driverIDT, active=true) {

  let lineNode = getElement('chart-line-1-path-' + tableID + '-' + driverIDT)
  let line = lineNode.children[0]
  let circles = getElement('chart-line-1-circles-' + tableID + '-' + driverIDT)
  let circlesRetired = getElement('chart-line-1-circles-dnf-' + tableID + '-' + driverIDT)

  line.classList.remove('chart-line-1-line-clicked')
  
  if (active) {
  
    // put circles back of other circles
    circles.parentElement.prepend(circles)
    
    for (child of circles.children) {
      child.style.fill = colorThemesChartChartLine1Lines
    }

    // put circles retired back of other circles retired
    circlesRetired.parentElement.prepend(circlesRetired)
    
    for (child of circlesRetired.children) {
      child.style.stroke = colorThemesChartChartLine1Lines
    }

    // put line back of other lines
    lineNode.parentElement.prepend(lineNode)
  
    line.classList.remove('chart-line-1-line-active')
    line.style.stroke = colorThemesChartChartLine1Lines
    line.style.strokeDasharray = 0
    
  }
  
}


function seasonCategoriesElementMouseUp(element) {

  let clickedTable = glVSeason['CategoriesClickedTableID']

  let idt = element.attributes['idt'].value
  let tableName = getElement(seasonCategoriesElementsID + clickedTable + '-' + idt)
  
  let team = tableName.attributes['team'].value
  let color = tableName.getAttribute('color')
  let dash = 0

  // if clicked
  if (element.classList.contains('clicked')) {
 
    if (mobileDevice) {

      seasonAggregationTable2Deactivate(clickedTable, idt, active=true)
      seasonChartLol_1Deactivate(clickedTable, idt, active=true)
      seasonChartLine_1Deactivate(clickedTable, idt, active=true)
      
    } else {

      seasonAggregationTable2Deactivate(clickedTable, idt, active=false)
      seasonChartLol_1Deactivate(clickedTable, idt, active=false)
      seasonChartLine_1Deactivate(clickedTable, idt, active=false)
      
    }
    
  } else {

    // define color considering current clicked drivers
    let colorAndDash = seasonCategoriesUpdateColorAndDash(color, team)
  
    color = colorAndDash[0]
    dash = colorAndDash[1]
    
    seasonAggregationTable2Activate(clickedTable, idt, color)
    seasonChartLol_1Activate(clickedTable, idt, color, dash)
    seasonChartLine_1Activate(clickedTable, idt, color, dash)
    
  }

  // update clicked drivers
  seasonCategoriesUpdateClickedDrivers(idt, team, color, dash)

  // update header and scroll to last clicked or to leader if no last clicked
  if (mobileDevice) {
    seasonCategoriesScrollAndHeader(element)
  }

  // toggle clicked class
  seasonCategoriesElementToggleClicked(idt)

}


function seasonCategoriesElementMouseHover(event) {

  let element = event.target
  let clickedTable = glVSeason['CategoriesClickedTableID']

  let idt = element.attributes['idt'].value
  let tableName = getElement(seasonCategoriesElementsID + clickedTable + '-' + idt)

  let team = tableName.getAttribute('team')
  let color = tableName.getAttribute('color')
  let dash = 0

  // define color considering current clicked drivers
  let colorAndDash = seasonCategoriesUpdateColorAndDash(color, team)

  color = colorAndDash[0]
  dash = colorAndDash[1]

  // if not clicked and not active
  if (!element.classList.contains('clicked') & (!element.classList.contains('active'))) {

    seasonAggregationTable2Activate(clickedTable, idt, color, click=false)
    seasonChartLol_1Activate(clickedTable, idt, color, dash, click=false)
    seasonChartLine_1Activate(clickedTable, idt, color, dash, click=false)

    seasonActivateTogglerAggregationTable2Header(clickedTable, idt, color)
    
    // scroll to driver name
    if (element.id.includes('chart-lol-1-hover-circle-')) {
      seasonCategoriesAggregationTable2ScrollToElement(clickedTable, idt)
    }
  
    
  // if not clicked and active
  } else if (!element.classList.contains('clicked') & (element.classList.contains('active'))) {

    seasonAggregationTable2Deactivate(clickedTable, idt)
    seasonChartLol_1Deactivate(clickedTable, idt)
    seasonChartLine_1Deactivate(clickedTable, idt)

    // update header and scroll to last clicked or to leader if no last clicked
    seasonCategoriesScrollAndHeader(element)

  }
  
  // toggle class active
  seasonCategoriesElementToggleActive(idt)

}


function seasonCategoriesDocumentMouseUp(event) {

  let clickedDrivers = glVSeason['CategoriesClickedDrivers']

  if (clickedDrivers.length > 0) {

    let clickedTable = glVSeason['CategoriesClickedTableID']
    let clickedIDTs = clickedDrivers.map(o => o['idt'])

    clickedIDTs.forEach((idt, i) => {

      // unclick
      seasonAggregationTable2Deactivate(clickedTable, idt)
      seasonChartLol_1Deactivate(clickedTable, idt)
      seasonChartLine_1Deactivate(clickedTable, idt)
      
      let name = getElement(seasonCategoriesElementsID + clickedTable + '-' + idt)
      let color = name.getAttribute('color')
      name.classList.remove('clicked')

      let hoverCircle = getElement('chart-lol-1-hover-circle-' + clickedTable + '-' + idt)
      hoverCircle.classList.remove('clicked')

      let line = getElement('chart-line-1-path-' + clickedTable + '-' +  idt).children[0]
      line.classList.remove('clicked')

    })

    glVSeason['CategoriesClickedDrivers'] = []

    seasonActivateTogglerAggregationTable2Header('', '', '', defaultHeader=true)

    // scroll to last clicked driver name if exist
    seasonCategoriesAggregationTable2ScrollToElement(
        clickedTable, seasonAggregationTable2DefaultTitleIDT)
    
  }

}


function seasonCategoriesClickChartsByClickedDrivers() {

  let clickedDrivers = glVSeason['CategoriesClickedDrivers']
  let currentSeasonDriversIDTList = data_2.map(o => o['DriverIDT'])

  if (clickedDrivers.length > 0) {

    let clickedTable = glVSeason['CategoriesClickedTableID']
    let IDTs = clickedDrivers.map(o => o['idt'])

    // if there was clicked lines and circles - make them active
    IDTs.forEach((idt, i) => {

      if (currentSeasonDriversIDTList.includes(idt)) {

        let color = clickedDrivers[i]['color']
        let team = clickedDrivers[i]['dash']
  
        // define color considering current clicked drivers
        let colorAndDash = seasonCategoriesUpdateColorAndDash(color, team)
      
        color = colorAndDash[0]
        dash = colorAndDash[1]
  
        seasonAggregationTable2Activate(clickedTable, idt, color)
        seasonChartLol_1Activate(clickedTable, idt, color, dash)
        seasonChartLine_1Activate(clickedTable, idt, color, dash)
  
        // name
        let name = getElement(seasonCategoriesElementsID + clickedTable + '-' + idt)
        name.classList.add('clicked')
  
        // circle
        let hoverCircle = getElement('chart-lol-1-hover-circle-' + clickedTable + '-' + idt)
        hoverCircle.classList.add('clicked')
  
        // line
        let line = getElement('chart-line-1-path-' + clickedTable + '-' +  idt).children[0]
        line.classList.add('clicked')
        
      } else {

        glVSeason['CategoriesClickedDrivers'] = clickedDrivers.filter(o => o['idt'] != idt)
        
      }

    })

    let lastClickedDriver = lastElement(clickedDrivers)

    if (currentSeasonDriversIDTList.includes(lastClickedDriver['idt'])) {

      seasonActivateTogglerAggregationTable2Header(
        clickedTable,
        lastClickedDriver['idt'],
        lastClickedDriver['color'])
      
      }
      
    }

}


function radio11MouseUp(currentButton) {

  radioActivateByClick(currentButton)
  let sprintIndex = radiotGetButtonCondition(currentButton)

  // globals
  glVSeason['radio11Condition'] = sprintIndex

  let clickedTable = glVSeason['CategoriesClickedTableID']

  seasonUpdatePaths(glVSeason['SeasonID'], sprintIndex)

  Promise.all([
    d3.csv(seasonData1path),
    d3.csv(seasonData2path),
    ]).then(function(files) {

    data_1 = files[0]
    data_2 = files[1]

    // fill table
    if (data_2.length != 0) {
      dropdown12Fill()
    }

    seasonAggregationTable2Fill(data_2, clickedTable)

    let dropdownLabel = getElement(dropdown12TitleID)

    let metric = dropdownLabel.getAttribute('metric')
    let stability = dropdownLabel.getAttribute('stability')
    let ascending = dropdownLabel.getAttribute('ascending')
  
    // draw charts
    chartLol_1(data_2, 'chart-season-rating-lol', clickedTable, metric, stability, ascending)
    chartLine_1(
      data_1, 'chart-season-rating-line', clickedTable,
      dropdown12Data[clickedTable]['chartLine1Metric'])
  
    seasonCategoriesClickChartsByClickedDrivers()

  }).catch(function(err) {
    // handle error here
  })
    
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
  seasonDriversUpdateDriversStatistics(
    seasonDriversIDTLeft, seasonDriversNameLeft, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
  seasonDriversUpdateDriversStatistics(
    seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')

  let dataLeft = data[0]
  let dataRight = data[1]
  
  // update content
  seasonDriversUpdateCharts(seasonDriversIDTLeft, seasonDriversIDTRight, dataLeft, dataRight)

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
  let sprintIndex = glVSeason['radio12Condition']

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
        
        // seasonDriversUpdateDriversStatistics(
        //   seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, 'right')
        
      }

      seasonDriversUpdateDriversStatistics(
        idt, name, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
      seasonDriversUpdateDriversStatistics(
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

      seasonDriversUpdateCharts(idt, seasonDriversIDTRight, dataLeft, dataRight)
      
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

      seasonDriversUpdateDriversStatistics(
        seasonDriversIDTLeft, seasonDriversNameLeft, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
      seasonDriversUpdateDriversStatistics(
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

      seasonDriversUpdateCharts(seasonDriversIDTLeft, idt, dataLeft, dataRight)
      
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

  let dropdownLabel = getElement(dropdown14TitleID)
  let label = dropdownLabels[0]

  // dropdown label
  dropdownLabel.textContent = label
  dropdownLabel.setAttribute('metric', dropdownMetrics[0])
  dropdownLabel.setAttribute('label', label)

  // update widths
  updateDropdownWidth(dropdown14ID, dropdown14MenuID)
  
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
  updateDropdownWidth(dropdown14ID, dropdown14MenuID)

  seasonDriversUpdateChart1(
    data_1, data_2,
    seasonDriversIDTLeft, seasonDriversIDTRight,
    seasonDriversColorLeft, seasonDriversColorRight
  )
  
}


function dropdown14MakeActive() {

  dropdownMakeActive(
    dropdown14MenuID,
    [getElement(dropdown14ID)],
    [document, getElement(dropdown13LeftID),
     getElement(dropdown13RightID),
     getElement(dropdown13CenterID)])
  
}


function seasonDriversUpdateDriversStatistics(driverIDT, name, color, team, number, kind) {

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


function seasonDriversUpdateCharts(driverLeft, driverRight, dataLeft, dataRight) {

  // data : data_2

  let colorLeft = seasonDriversColorLeft
  let colorRight = seasonDriversColorRight

  // let colorLeft = dataLeft['Color']
  // let colorRight = dataRight['Color']

  // if (colorLeft == colorRight) { colorRight = modColor2(colorLeft) }

  // seasonDriversColorLeft = colorLeft
  // seasonDriversColorRight = colorRight

  // getElement(seasonDriversChartStatisticsDriverLeftID).textContent = dataLeft['FullName']
  // getElement(seasonDriversChartStatisticsDriverRightID).textContent = dataRight['FullName']

  // getElement(seasonDriversChartStatisticsDriverLeftTeamID).textContent = dataLeft['Team']
  // getElement(seasonDriversChartStatisticsDriverRightTeamID).textContent = dataRight['Team']

  // getElement(seasonDriversChartStatisticsDriverLeftID).style.color = alphaColor(colorLeft, 0.75)
  // getElement(seasonDriversChartStatisticsDriverRightID).style.color = alphaColor(colorRight, 0.75)


  chartHBars_1(
    dataLeft, colorLeft,
    'chart-season-drivers-hbar-1',
    dataRight, colorRight,
  )

  chartStatistics_1(
    chartStatisticsMainDict,
    dataLeft, colorLeft,
    'chart-season-drivers-statistics-1',
    dataRight, colorRight,
  )

  chartStatistics_1(
    chartStatisticsStartDict,
    dataLeft, colorLeft,
    'chart-season-drivers-statistics-2',
    dataRight, colorRight,
  )

  chartStatistics_1(
    chartStatisticsFinishDict,
    dataLeft, colorLeft,
    'chart-season-drivers-statistics-3',
    dataRight, colorRight,
  )

  chartStatistics_1(
    chartStatisticsCompareDict1,
    dataLeft, colorLeft,
    'chart-season-drivers-statistics-4',
    dataRight, colorRight,
  )

  chartStatistics_1(
    chartStatisticsCompareDict2,
    dataLeft, colorLeft,
    'chart-season-drivers-statistics-5',
    dataRight, colorRight,
  )

  // update line chart
  seasonDriversUpdateChart1(data_1, data_2, driverLeft, driverRight, colorLeft, colorRight)

  window.onresize = () => {

    updateUnits()

    if (getElement('chart-season-drivers-hbar-1')) {

      chartHBars_1(
        dataLeft, colorLeft,
        'chart-season-drivers-hbar-1',
        dataRight, colorRight
      )
      
    }

    if (getElement('chart-season-drivers-statistics-1')) {

      chartStatistics_1(
        chartStatisticsMainDict,
        dataLeft, colorLeft,
        'chart-season-drivers-statistics-1',
        dataRight, colorRight,
      )
      
      chartStatistics_1(
        chartStatisticsStartDict,
        dataLeft, colorLeft,
        'chart-season-drivers-statistics-2',
        dataRight, colorRight,
      )
      
      chartStatistics_1(
        chartStatisticsFinishDict,
        dataLeft, colorLeft,
        'chart-season-drivers-statistics-3',
        dataRight, colorRight,
      )

      chartStatistics_1(
        chartStatisticsCompareDict1,
        dataLeft, colorLeft,
        'chart-season-drivers-statistics-4',
        dataRight, colorRight,
      )

      chartStatistics_1(
        chartStatisticsCompareDict2,
        dataLeft, colorLeft,
        'chart-season-drivers-statistics-5',
        dataRight, colorRight,
      )
      
    }
    
    if (getElement('chart-1')) {

      // update line chart
      seasonDriversUpdateChart1(data_1, data_2, driverLeft, driverRight, colorLeft, colorRight)
      
    }
  
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
      'y0z1v4'
    )
    
  } else if (chart == 7) {

    chart_7(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      'v9l10p'
    )
    
  } else if (chart == 8) {

    chart_8(
      data1, 'chart-1', metric,
      [driverIDTLeft, driverIDTRight], [colorLeft, colorRight],
      'gl2g97'
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


function radio12MouseUp(currentButton) {

  let clickedCondition = radiotGetButtonCondition(currentButton)

  let dataAvailableLeft = getElement(dropdown13TitleLeftID).getAttribute('dataAvailable')
  let dataAvailableRight = getElement(dropdown13TitleRightID).getAttribute('dataAvailable')

  // hideElement(seasonDriversDriverLeftNoDataID)
  // hideElement(seasonDriversDriverRightNoDataID)

  getElement(seasonDriversDriverLeftNoDataID).style.opacity = 0
  getElement(seasonDriversDriverRightNoDataID).style.opacity = 0

  if (seasonDriversDataAvailableCheck(dataAvailableLeft, clickedCondition)
      && seasonDriversDataAvailableCheck(dataAvailableRight, clickedCondition)) {

    // globals
    glVSeason['radio12Condition'] = clickedCondition

    radioActivateByClick(currentButton)

    seasonUpdatePaths(glVSeason['SeasonID'], clickedCondition)

    Promise.all([
      d3.csv(seasonData1path),
      d3.csv(seasonData2path),
      ]).then(function(files) {
  
      data_1 = files[0]
      data_2 = files[1]

      seasonDriversUpdateLists()
      seasonDriversParametersInitiate()
      
      seasonDriversUpdateDriversStatistics(seasonDriversIDTLeft, seasonDriversNameLeft, seasonDriversColorLeft, seasonDriversTeamLeft, seasonDriversNumberLeft, 'left')
      seasonDriversUpdateDriversStatistics(seasonDriversIDTRight, seasonDriversNameRight, seasonDriversColorRight, seasonDriversTeamRight, seasonDriversNumberRight, 'right')

      // fill dropdowns
      dropdown13CenterFill()
      dropdown13Fill(dropdown13MenuLeftID, seasonDriversIDTLeft)
      dropdown13Fill(dropdown13MenuRightID, seasonDriversIDTRight)
  
      let dataLeft = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTLeft)[0]
      let dataRight = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTRight)[0]

      seasonDriversUpdateCharts(seasonDriversIDTLeft, seasonDriversIDTRight, dataLeft, dataRight)

      }).catch(function(err) {
      // handle error here
    })
    
  } 
  
  if (!seasonDriversDataAvailableCheck(dataAvailableLeft, clickedCondition)) {
    seasonDriversManageNoData(seasonDriversIDTLeft, seasonDriversNameLeft, clickedCondition, kind='left')
  }

  if (!seasonDriversDataAvailableCheck(dataAvailableRight, clickedCondition)) {
    seasonDriversManageNoData(seasonDriversIDTRight, seasonDriversNameRight, clickedCondition, kind='right')
  }

}


function info1TableOn() {

  getElement(infoTable1ID).classList.add('ku1i1d')
  getElement(infoSign1ID).classList.add('w177lp-active')
  
}


function info1TableOff() {

  getElement(infoTable1ID).classList.remove('ku1i1d')
  getElement(infoSign1ID).classList.remove('w177lp-active')
  
}


function seasonComparisonSliderCreate(
    sliderElementID, axisBottomID, svgID,
    dataDiff, dataLeft, dataRight, colorLeft, colorRight,
    metrics, type, subType) {

  // type : type of data - cumulative, ordinary
  // subType : what means best value - lower, higher

  let slider = getElement(sliderElementID)
  let sliderHeight = getSizes(slider).height

  // remove previous slider elements and all eventlisteners
  slider.innerHTML = ''

  let elementsY = sliderHeight - px12

  let axisBottom = getElement(axisBottomID)
  let axisBottomSizes = getSizes(axisBottom)
  let axisBottomWidth = axisBottomSizes.width
  // let axisBottomLeft = axisBottomSizes.left

  let axisTicklabels = axisBottom.children[1]
  let ticks = arrayFromChildren(axisTicklabels)

  let coordIndexes = ticks.map(o => o.getAttribute('CoordIndex'))
  let eventNames = ticks.map(o => o.getAttribute('eventName'))

  let eventsActiveCoordIndexes = [null, null]
  let eventsActiveNames = [null, null]

  // let svgChart = getElement(svgID)
  // let svgChartSizes = getSizes(svgChart)
  // let svgChartLeft = svgChartSizes.left

  let sliderLineSec = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  let sliderLinePrim = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  let sliderLineChart2 = getElement('slider-1-absolute-values-path')

  let sliderLinePrimCoords = [null, null]

  let newTickHoverG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  let newTickSecG = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  let newTickPrimG = document.createElementNS('http://www.w3.org/2000/svg', 'g')

  let rectWidth = px32
  let rectWidthHalf = px16
  // let rectHeight = px48

  let firstLaunch = true

  let tooltipTitle0 = getElement('upafzy6y')
  let tooltipTitle1 = getElement('x5q9m3t0')
  let tooltipTitle2 = getElement('b9tuvti6')
  let tooltipTitle3 = getElement('yb5okfxp')
  let refreshIcon = getElement('q4u45u0a')

  let tooltipTitle0Text0 = 'ДЛЯ ВЫБОРА ОТРЕЗКА КЛИКНИТЕ НА АББРЕВИАТУРЫ ГРАН-ПРИ'
  let tooltipTitle0Text1 = 'ВЫБРАННЫЙ ОТРЕЗОК'

  slider.style.width = axisBottomWidth

  sliderLineSec.setAttribute('class', 'bxajqi')
  sliderLineSec.setAttribute('y1', elementsY)
  sliderLineSec.setAttribute('y2', elementsY)

  sliderLinePrim.setAttribute('class', 'dzpaj1')
  sliderLinePrim.setAttribute('id', 'knwutcaj')

  slider.append(sliderLineSec)
  slider.append(sliderLinePrim)
  
  newTickHoverG.setAttribute('name', 'rect-hover')
  newTickSecG.setAttribute('name', 'circles-sec')
  newTickPrimG.setAttribute('name', 'circles-prim')
  newTickPrimG.setAttribute('id', 'o42ot1ub')


  // ---------------------- CREATE ELEMENTS ---------------------- //


  ticks.forEach((tick, i) => {

    let x = Number(tick.getAttribute('x'))
    let coordIndex = tick.getAttribute('CoordIndex')

    let newTickHover = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    let newTickSec = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    let newTickPrim = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

    newTickHover.setAttribute('x', x - rectWidthHalf)
    newTickHover.setAttribute('y', 0)
    newTickHover.setAttribute('width', rectWidth)
    newTickHover.setAttribute('height', sliderHeight)
    newTickHover.setAttribute('cx', x)
    newTickHover.setAttribute('CoordIndex', coordIndex)
    newTickHover.setAttribute('class', 'a8jv6f')
    newTickHover.setAttribute('id', 'slider-1-hover-' + i)
 
    newTickSec.setAttribute('class', 'v1boyl')
    newTickSec.setAttribute('cy', elementsY)
    newTickSec.setAttribute('cx', x)

    newTickPrim.setAttribute('class', 'cduc14')
    newTickPrim.setAttribute('id', 'slider-1-circle-' + i)
    newTickPrim.setAttribute('cy', elementsY)
    newTickPrim.setAttribute('cx', x)
    newTickPrim.setAttribute('CoordIndex', coordIndex)
    newTickPrim.style.opacity = 0

    if (i == 0) {

      // newTickPrim.classList.add('cduc14-active')
      // newTickPrim.style.fill = colorLeft
      
      sliderLineSec.setAttribute('x1', x)
      sliderLinePrimCoordX1 = x
      
    }

    if (i == ticks.length-1) {

      // newTickPrim.classList.add('cduc14-active')
      // newTickPrim.style.fill = colorLeft
      
      sliderLineSec.setAttribute('x2', x)
      sliderLinePrimCoordX2 = x
      
    }

    newTickHoverG.append(newTickHover)
    newTickSecG.append(newTickSec)
    newTickPrimG.append(newTickPrim)

  })


  // ---------------------- TOOLTIP FILL ---------------------- //


  function tooltipFill(
      dataLeftFiltered, dataRightFiltered, colorLeft, colorRight, eventNames,
      coordIndexesSelected, metrics, type, kind) {

    let metric = metrics['Average']

    // let metricLeft = dataLeftFiltered.map(o => o[metric]).map(Number).filter(notNaN)
    // let metricRight = dataRightFiltered.map(o => o[metric]).map(Number).filter(notNaN)

    let dataLeft = dataLeftFiltered.filter(o => isNumeric(o['ClassifiedPosition']))
    let dataRight = dataRightFiltered.filter(o => isNumeric(o['ClassifiedPosition']))

    let metricLeft = dataLeft.map(o => o[metric]).map(Number)
    let metricRight = dataRight.map(o => o[metric]).map(Number)

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

    if (firstLaunch) {

      tooltipTitle0.textContent = tooltipTitle0Text0
      
      tooltipTitle3.classList.add('invisible')
      
    } else {

      tooltipTitle0.textContent = tooltipTitle0Text1

      tooltipTitle1.textContent = firstElement(eventNames)
      tooltipTitle2.textContent = lastElement(eventNames)
      
      tooltipTitle3.classList.remove('invisible')
      // refreshIcon.style.visibility = 'visible'
      
    }
    
    if (kind == 'full') {

      let label0 = getElement('wm13qbey')
      let label1 = getElement('y045ulke')
      let label2 = getElement('zeqq0liw')
      let label3 = getElement('j4f2osp8')
      let label4 = getElement('t8aily60')
      let label5 = getElement('vcgkxxa7')
      let label6 = getElement('prfvd03t')

      if (type == 'average') {

        label0.textContent = 'Среднее'
        label1.textContent = 'Лучшее'
        label2.textContent = 'Худшее'
        label3.textContent = 'Разброс'
        label4.textContent = 'Ожидаемое'
        label5.textContent = 'Лучше оппонента'
        label6.textContent = 'Длина отрезка'
        
      } else if (type == 'cumulative') {

        label0.textContent = 'Среднее'
        label1.textContent = 'Начало отрезка'
        label2.textContent = 'Сумма'
        label3.textContent = 'Конец отрезка'
        label6.textContent = 'Длина отрезка'
        
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
    
    let sep4 = getElement('ngcp5pj2')
    let sep5 = getElement('x6rl8aic')

    // more or les calculate
    let dataDiffFiltered

    if (coordIndexesSelected) {
      dataDiffFiltered = dataDiff.filter(o => coordIndexesSelected.includes(String(o['CoordIndex'])))
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

      metricLeftStintLength = metricLeft.length

    } else if (metricLeftOneValue) {

      metricLeftAverage = metricLeft[0]

      metricLeftStintLength = metricLeft.length
      
    } else if (metricLeftNaN) {

      metricLeftAverage = '-'

      metricLeftStintLength = '-'
      
    }

    if (metricRightCorrect) {

      metricRightAverage = arrayAverage(metricRight)
      metricRightAverage = toFixedWithoutZeroes(metricRightAverage, 1)

      metricRightStintLength = metricRight.length
      
    } else if (metricRightOneValue) {

      metricRightAverage = metricRight[0]

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
        
        metricLeftMin = arrayMin(metricLeft)
        metricLeftMax = arrayMax(metricLeft)
        
        metricLeftStd = arrayStd(metricLeft)
        metricLeftStd = toFixedWithoutZeroes(metricLeftStd, 2)
        
      } else if (metricLeftOneValue) {

        metricLeftMedian = metricLeft[0]
        
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
        
        metricRightMin = arrayMin(metricRight)
        metricRightMax = arrayMax(metricRight)
        
        metricRightStd = arrayStd(metricRight)
        metricRightStd = toFixedWithoutZeroes(metricRightStd, 2)
        
      } else if (metricRightOneValue) {

        metricRightMedian = metricRight[0]
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
      
      metricMinDelta = (metricLeftMin - metricRightMin)
      metricMaxDelta = (metricLeftMax - metricRightMax)
      
      metricStdDelta = (metricLeftStd - metricRightStd)
      metricStdDelta = toFixedWithoutZeroes(metricStdDelta, 2)

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

      if ((metricDiffLeft == 0) && (metricDiffRight == 0)) {
        valueLeft5.textContent = '-'
        valueRight5.textContent = '-'
        valueDelta5.textContent = '-'
      }

      sep4.classList.remove('invisible')
      sep5.classList.remove('invisible')
      
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
        metricLeftStart = metricLeftC[0] - metricFirstLeft
        metricLeftEnd = lastElement(metricLeftC)
        
      } else if (metricLeftOneValue) {
        
        metricLeftSum = metricLeft[0]
        metricLeftStart = metricLeftC[0] - metricFirstLeft
        metricLeftEnd = metricLeftC[0]
        
      } else if (metricLeftNaN) {
        
        metricLeftSum = '-'
        metricLeftStart = '-'
        metricLeftEnd = '-'
        
      }

      // calculate right values
      if (metricRightCorrect) {

        metricRightSum = arraySum(metricRight)
        metricRightStart = metricRightC[0] - metricFirstRight       
        metricRightEnd = lastElement(metricRightC)
        
      } else if (metricRightOneValue) {
        
        metricRightSum = metricRight[0]
        metricRightStart = metricRightC[0] - metricFirstRight        
        metricRightEnd = metricRightC[0]
        
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

      // deltas calculate
      metricSumDelta = (metricLeftSum - metricRightSum)
      metricStartDelta = (metricLeftStart - metricRightStart)
      metricEndDelta = (metricLeftEnd - metricRightEnd)

      // deltas NaN management
      if (isNaN(metricSumDelta)) {metricSumDelta = '-'}
      if (isNaN(metricStartDelta)) {metricStartDelta = '-'}
      if (isNaN(metricEndDelta)) {metricEndDelta = '-'}

      // deltas fill
      valueDelta1.textContent = metricStartDelta
      valueDelta2.textContent = metricSumDelta
      valueDelta3.textContent = metricEndDelta
      
      element4.classList.add('invisible')
      element5.classList.add('invisible')
      
      sep4.classList.add('invisible')
      sep5.classList.add('invisible')
      
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

    // delta average NaN management
    if (isNaN(metricAverageDelta)) {metricAverageDelta = '-'}
    if (isNaN(metricStintLengthDelta)) {metricStintLengthDelta = '-'}

    // delta average fill
    valueDelta0.textContent = metricAverageDelta
    valueDelta6.textContent = metricStintLengthDelta

  }

  
  function seasonComparisonSliderChart2Activate(CoordIndexesSelected) {

    // let labelsLeft = getElement('slider-1-absolute-values-left')
    // let labelsRight = getElement('slider-1-absolute-values-right')
    
    let circles = getElement('slider-1-absolute-values-circles')
    let circlesActivate = []

    let line = getElement('slider-1-absolute-values-path')

    arrayFromChildren(circles).forEach((circle, i) => {

      let coordIndex = circle.getAttribute('CoordIndex')

      if (CoordIndexesSelected.includes(coordIndex)) {
        circlesActivate.push(circle)
      }
      
    })

    circlesActivate.forEach((circle, i) => {

      circle.classList.add('f3or44-active')

      if ((i == 0) || (i == circlesActivate.length - 1)) {
        circle.classList.add('f3or44-active-sides')
      }
      
    })

    // arrayFromChildren(labelsLeft).forEach((child, i) => {

    //   let coordIndex = child.getAttribute('CoordIndex')

    //   if (CoordIndexesSelected.includes(coordIndex)) {
    //     child.classList.add('omu64m-active')
    //   }
      
    // })

    // arrayFromChildren(labelsRight).forEach((child, i) => {

    //   let coordIndex = child.getAttribute('CoordIndex')

    //   if (CoordIndexesSelected.includes(coordIndex)) {
    //     child.classList.add('omu64m-active')
    //   }
      
    // })

    if (line.style.opacity == 0) {
      line.style.opacity = 1
    }

  }


  function seasonComparisonSliderChart2Deactivate(full=false) {

    // let labels2LeftElement = getElement('slider-1-absolute-values-left')
    // let labels2Left = arrayFromChildren(labels2LeftElement)
    
    // let labels2RightElement = getElement('slider-1-absolute-values-right')
    // let labels2Right = arrayFromChildren(labels2RightElement)
    
    let circlesElement = getElement('slider-1-absolute-values-circles')
    let circles = arrayFromChildren(circlesElement)

    let line = getElement('slider-1-absolute-values-path')

    let labels3Element = getElement('slider-1-ticklabels-group')
    let labels3 = arrayFromChildren(labels3Element)

    let tickHovers = arrayFromChildren(newTickHoverG)

    // labels2Left.forEach((child, i) => {
    //   child.classList.remove('omu64m-active')
    // })

    // labels2Right.forEach((child, i) => {
    //   child.classList.remove('omu64m-active')
    // })

    circles.forEach((circle, i) => {

      circle.classList.remove('f3or44-active')
      circle.classList.remove('f3or44-active-sides')
      // circle.style.opacity = 0

    })

    labels3.forEach((label, i) => {
      label.classList.remove('idn0h8-hover')
    })

    tickHovers.forEach((tickhover, i) => {
      tickhover.classList.remove('clicked')
    })

    if (full) {
      
      line.style.opacity = 0
      eventsActiveCoordIndexes = [null, null]
      eventsActiveNames = [null, null]
      sliderLinePrimCoords = [null, null]
      
    }

  }

  slider.append(newTickSecG)
  slider.append(newTickPrimG)
  slider.append(newTickHoverG)

  tooltipFill(
    dataLeft, dataRight, colorLeft, colorRight, eventNames, null,
    metrics, type, kind='full'
  )

  
  // ---------------------- ACTIVATE ELEMENTS ---------------------- //


  arrayFromChildren(newTickHoverG).forEach((element, i) => {

    element.addEventListener('mouseover', (event) => {

      let id = element.id.replace('slider-1-hover-', '')

      let ticklabel = getElement('slider-1-ticklabel-' + id)
      let circle = getElement('slider-1-circle-' + id)

      // ticklabel.classList.add('fw-775')
      ticklabel.classList.add('idn0h8-hover')
      circle.classList.add('cduc14-hover')

      // if (colorRight == modColor2(colorLeft)) {
      //   ticklabel.style.fill = colorLeft
      //   circle.style.fill = colorLeft
      // }
      
    })

    element.addEventListener('mouseleave', (event) => {

      let id = element.id.replace('slider-1-hover-', '')

      let ticklabel = getElement('slider-1-ticklabel-' + id)
      let circle = getElement('slider-1-circle-' + id)

      if (!element.classList.contains('clicked')) {

        // ticklabel.classList.remove('fw-775')
        // ticklabel.style.fill = colorThemesChartAxisTickLabels

        ticklabel.classList.remove('idn0h8-hover')
        circle.classList.remove('cduc14-hover')
        
        // if (!circle.classList.contains('active')) {
        //   circle.style.fill = ''
        // }
        
      }
      
    })

    element.addEventListener('mouseup', (event) => {

      // remove clicked from other elements
      arrayFromChildren(newTickHoverG).forEach((child, i) => {
        child.classList.remove('clicked')
      })

      let element = event.target

      let id = element.id.replace('slider-1-hover-', '')

      let lineCoordX = Number(element.getAttribute('cx'))

      let eventName = getElement('slider-1-ticklabel-'+id).getAttribute('eventName')
      let coordIndex = element.getAttribute('CoordIndex')

      if (sliderLinePrimCoords[0] == null) {

        element.classList.add('clicked')
        
        sliderLinePrimCoords[0] = lineCoordX
        
        eventsActiveNames[0] = eventName
        eventsActiveCoordIndexes[0] = coordIndex

        let ticklabel = getElement('slider-1-ticklabel-' + id)
        let circleCurrent = getElement('slider-1-circle-'+id)
        
        // ticklabel.classList.add('fw-775')
        // ticklabel.classList.add('idn0h8-hover')

        circleCurrent.classList.remove('cduc14-hover')
        circleCurrent.classList.add('cduc14-active')
        
        // if (colorRight == modColor2(colorLeft)) {
        //   ticklabel.style.fill = colorLeft
        //   circleCurrent.style.fill = colorLeft
        // }

        if (firstLaunch) {

          pathChangeCoordinates(
            sliderLinePrim,
            x1=sliderLinePrimCoords[0], x2=sliderLinePrimCoords[0],
            y1=elementsY, y2=elementsY
          )

          pathChangeCoordinates(
            path=sliderLineChart2,
            x1=sliderLinePrimCoords[0], x2=sliderLinePrimCoords[0],
            y1=px0_5, y2=px0_5
          )
          
        }
        
      } else {

        if (firstLaunch) { firstLaunch = false }
  
        sliderLinePrimCoords[1] = lineCoordX
        
        eventsActiveNames[1] = eventName
        eventsActiveCoordIndexes[1] = coordIndex

        // clear abbs from active
        arrayFromChildren(axisTicklabels).forEach((child, i) => {
          child.classList.remove('idn0h8-hover')
          // child.classList.remove('fw-775')
          // child.style.fill = colorThemesChartAxisTickLabels
        })

        // clear circles from active
        arrayFromChildren(newTickPrimG).forEach((child, i) => {
          
          child.classList.remove('cduc14-hover')
          child.classList.remove('cduc14-active')
          child.classList.remove('active')
          
        })

        // activate new start and end circles
        let circleFirstNew = getElementsListByAttribute('CoordIndex', eventsActiveCoordIndexes[0], newTickPrimG)[0]
        let circleLastNew = getElementsListByAttribute('CoordIndex', eventsActiveCoordIndexes[1], newTickPrimG)[0]

        circleFirstNew.classList.add('cduc14-active')
        circleFirstNew.classList.add('active')
          
        circleLastNew.classList.add('cduc14-active')
        circleLastNew.classList.add('active')
        
        // if (colorRight == modColor2(colorLeft)) {
        //   circleFirstNew.style.fill = colorLeft
        //   circleLastNew.style.fill = colorLeft
        // }

        // activate circles between start-end and hide circles out ofr start-end
        arrayFromChildren(newTickPrimG).forEach((circle, i) => {

          let cx = Number(circle.getAttribute('cx'))

          if (sliderLinePrimCoords[0] < sliderLinePrimCoords[1]) {

            if ((cx < sliderLinePrimCoords[0]) || (cx > sliderLinePrimCoords[1])) {
              circle.style.opacity = 0
            } else {
              circle.style.opacity = 1
            }
            
          } else {

            if ((cx > sliderLinePrimCoords[0]) || (cx < sliderLinePrimCoords[1])) {
              circle.style.opacity = 0
            } else {
              circle.style.opacity = 1
            }
            
          }

        })

        if (sliderLinePrimCoords[0] > sliderLinePrimCoords[1]) {

          sliderLinePrimCoords = arrayExchangeIndexes(sliderLinePrimCoords, 0, 1)
          eventsActiveNames = arrayExchangeIndexes(eventsActiveNames, 0, 1)
          eventsActiveCoordIndexes = arrayExchangeIndexes(eventsActiveCoordIndexes, 0, 1)
          
        }


        // ---------------------- ACTIVATE TOOLTIP ---------------------- //


        let idx0 = coordIndexes.indexOf(eventsActiveCoordIndexes[0])
        let idx1 = coordIndexes.indexOf(eventsActiveCoordIndexes[1])

        let coordIndexesSelected = coordIndexes.slice(idx0, idx1 + 1)

        let dataLeftSelected = dataLeft.filter(o => coordIndexesSelected.includes(String(o['CoordIndex'])))
        let dataRightSelected = dataRight.filter(o => coordIndexesSelected.includes(String(o['CoordIndex'])))

        tooltipFill(
          dataLeftSelected, dataRightSelected, colorLeft, colorRight, eventsActiveNames,
          coordIndexesSelected, metrics, type, kind='values'
        )


        // ---------------------------------------------------------------- //
        

        seasonComparisonSliderChart2Deactivate()
        seasonComparisonSliderChart2Activate(coordIndexesSelected)

        pathChangeCoordinates(
          sliderLinePrim,
          x1=sliderLinePrimCoords[0], x2=sliderLinePrimCoords[1],
          y1=elementsY, y2=elementsY
        )
        
        pathChangeCoordinates(
          path=sliderLineChart2,
          x1=sliderLinePrimCoords[0], x2=sliderLinePrimCoords[1],
          y1=px0_5, y2=px0_5
        )

        if (sliderLinePrim.style.opacity == 0) {
          sliderLinePrim.style.opacity = 1
        }

        sliderLinePrimCoords[0] = null
        sliderLinePrimCoords[1] = null

      }

    })
    
  })

  // ---------------------- ACTIVATE REFRESH BUTTON ---------------------- //


  function seasonComparisonSliderDeactivate() {

    firstLaunch = true

    let line = getElement('knwutcaj')
    let ticks = getElement('o42ot1ub')

    // hide line primary
    line.style.opacity = 0
    
    // clear circles from active
    arrayFromChildren(ticks).forEach((child, i) => {
      
      child.classList.remove('cduc14-hover')
      child.classList.remove('cduc14-active')
      child.classList.remove('active')
      
      child.style.opacity = 0
      
    })

    tooltipTitle0.textContent = tooltipTitle0Text0
    tooltipTitle3.classList.add('invisible')

    tooltipFill(
      dataLeft, dataRight, colorLeft, colorRight, eventNames,
      null, metrics, type, kind='full'
    )
    
    seasonComparisonSliderChart2Deactivate(full=true)
    
  }

  elementRemoveEventListeners('q4u45u0a')
  
  let refreshButton1 = getElement('q4u45u0a')
    
  refreshButton1.addEventListener('mouseup', (event) => {
    seasonComparisonSliderDeactivate()
  })

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
    'radio11Condition': null,
    'radio12Condition': null,
    // 'FirstLoad': null
  }

  glVSeason['SeasonID'] = lastElement(seasonIDs)

  menuYearsFill(menuYears11ID, menuYears11ItemID, seasonIDs)

}


function updateSeasonStatisticsPage(kind) {

  // getElement(globalScrollContainerID).style.scrollBehavior = 'auto'

  updateUnits()
  
  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonStatistcsPageID

  // data for both race and sprint
  seasonUpdatePaths(glVSeason['SeasonID'], 2)

  let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData5path), d3.csv(seasonData6path)]

  Promise.all(dataPaths).then(function(files) {

    data_1 = files[0]
    data_5 = files[1]
    data_6 = files[2]

    getElement(seasonContentContainerID).innerHTML = ''
    getElement(seasonContentContainerID).innerHTML += pageSeasonStatistics

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerSeasonStatisticsID).classList.add('smooth-appear-fast')
    // }

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

    window.onresize = () => {

      // seasonAggregationTable1NationsFill()
      // seasonAggregationTable1TeamsFill()
      // seasonAggregationTable1EnginesFill()
  
      // seasonStatisticsTables2Info.forEach((obj, i) => {
      //   seasonAggregationTable1Fill(
      //     tableID=obj['id'],
      //     property=obj['metric'],
      //     sort=obj['sort'],
      //     lessThanFive=obj['lessThanFive'])
      // })
      
    }

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

  // getElement(globalScrollContainerID).style.scrollBehavior = 'auto'

  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonRatingsPageID

  glVSeason['CategoriesClickedTableID'] ||= 0
  glVSeason['radio11Condition'] ||= 2

  seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['radio11Condition'])

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

    radioActivateByCondition(radio11ID, glVSeason['radio11Condition'])

    // dropdown12
    dropdown12Fill()
    dropdownMakeActive(dropdown12MenuID, [getElement(dropdown12ID)], [document])

    seasonCategoriesUpdateCharts()

    // scroll to last clicked driver if exist
    if (glVSeason['CategoriesClickedDrivers'].length > 0) {
      seasonCategoriesAggregationTable2ScrollToElement(
        glVSeason['CategoriesClickedTableID'], lastElement(glVSeason['CategoriesClickedDrivers'])['idt'])
    }

    // glVGlobal['FirstLoad'] = false

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


function updateSeasonComparisonPage(kind) {

  // getElement(globalScrollContainerID).style.scrollBehavior = 'auto'

  updateUnits()

  if (kind == 'first') { seasonFirstLoad() }

  glVGlobal['Segment'] = seasonSegmentID
  glVGlobal['Page'] = seasonComparisonPageID

  glVSeason['radio12Condition'] ||= 2

  seasonUpdatePaths(glVSeason['SeasonID'], glVSeason['radio12Condition'])

  let dataPaths = [d3.csv(seasonData1path), d3.csv(seasonData2path)]

  Promise.all(dataPaths).then(function(files) {

    data_1 = files[0]
    data_2 = files[1]

    getElement(seasonContentContainerID).innerHTML = ''
    getElement(seasonContentContainerID).innerHTML += pageSeasonComparison

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerSeasonDriversID).classList.add('smooth-appear-fast')
    // }

    horizontalTocFill(seasonComparisonToc0ID, seasonComparisonToc0Attributes, globalScrollBehavior)

    radioActivateByCondition(radio12ID, glVSeason['radio12Condition'])

    seasonDriversUpdateLists()
    seasonDriversParametersInitiate()

    // fill dropdowns
    dropdown13CenterFill()
    dropdown13Fill(dropdown13MenuLeftID, seasonDriversIDTLeft)
    dropdown13Fill(dropdown13MenuRightID, seasonDriversIDTRight)

    dropdown13MakeActive()

    dropdown14Fill()
    dropdown14MakeActive()

    seasonDriversUpdateDriversStatistics(
      seasonDriversIDTLeft, seasonDriversNameLeft,
      seasonDriversColorLeft, seasonDriversTeamLeft,
      seasonDriversNumberLeft, 'left'
    )

    seasonDriversUpdateDriversStatistics(
      seasonDriversIDTRight, seasonDriversNameRight,
      seasonDriversColorRight, seasonDriversTeamRight,
      seasonDriversNumberRight, 'right'
    )

    setText(
      seasonDriversStatisticsTitleID,
      `СТАТИСТИКА ВЫСТУПЛЕНИЙ В ${glVSeason['SeasonID']} ГОДУ`
    )

    let dataLeft = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTLeft)[0]
    let dataRight = data_2.filter(o => o['DriverIDT'] == seasonDriversIDTRight)[0]
    
    // update charts
    seasonDriversUpdateCharts(
      seasonDriversIDTLeft, seasonDriversIDTRight,
      dataLeft, dataRight
    )

    // seasonComparisonSliderActivate(data_1, type='average')

    // glVGlobal['FirstLoad'] = false

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


function updateSeasonPages(pageID, kind) {

  if (pageID == seasonStatistcsPageID) {

    updateSeasonStatisticsPage(kind)
    
  } else if (pageID == seasonRatingsPageID) {

    updateSeasonRatingsPage(kind)
    
  } else if (pageID == seasonComparisonPageID) {

    updateSeasonComparisonPage(kind)
    
  }
  
}





