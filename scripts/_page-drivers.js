function driversAppearElements(page) {

  if (page == driversCharcterisiticsPageID) {

    appearElement(containerDriversCharacteristicsID)
    
  } else if (page == driversComparisonPageID) {
    
    appearElement(containerDriversComparisonID)
    
  } else if (page == driversTablesPageID) {

    appearElement(containerDriversTablesID)
    
  }

}


function driversUpdatePrimaryPath(driverID) {
  driversDataPrimaryPath = pathDriversData + driverID + '/' + 'data_3_' + driverID + '.csv'
}


function driversUpdateSecondaryPath(driverID) {
  driversDataSecondaryPath = pathDriversData + driverID + '/' + 'data_3_' + driverID + '.csv'
}


function driversUpdateTablesPath() {

  if (glVTables['FirstLoad']) {
      
    driversTablesDataPath = pathSeasonData + 'data_4.csv'
    
  } else {

    let seasonID = glVTables['SeasonID']
    let sprintIndex = glVTables['SprintIndex']
    
    if (seasonID == glVTables['SeasonIDDefault']) {
      
      let seasonIDLocal = seasonID.replace(' ', '_')
      
      driversTablesDataPath = (
        pathSeasonData + seasonIDLocal + '/' + 'data_4_'
        + seasonIDLocal + '_' + sprintIndex + '.csv'
      )
      
    } else {
      
      driversTablesDataPath = (
        pathSeasonData + seasonID + '/' + 'data_4_'
        + seasonID + '_' + sprintIndex + '.csv'
      )

    }
    
  }
  
}


// function driversUpdateTablesPath() {

//   let seasonID = glVTables['SeasonID']
//   let sprintIndex = glVTables['SprintIndex']
  
//   if (seasonID == glVTables['SeasonIDDefault']) {
    
//     let seasonIDLocal = seasonID.replace(' ', '_')
    
//     driversTablesDataPath = (
//       pathSeasonData + seasonIDLocal + '/' + 'data_4_'
//       + seasonIDLocal + '_' + sprintIndex + '.csv'
//     )
    
//   } else {
    
//     driversTablesDataPath = (
//       pathSeasonData + seasonID + '/' + 'data_4_'
//       + seasonID + '_' + sprintIndex + '.csv'
//     )

//   }
  
// }


function driversPrimaryDataSprintUpdate(sprintIndex=2) {

  data_3_primary = data_3_primary.filter(o => o['SprintIndex'] == sprintIndex)
  
}


function driversSecondaryDataSprintUpdate(sprintIndex=2) {

  data_3_secondary = data_3_secondary.filter(o => o['SprintIndex'] == sprintIndex)
  
}


function driversPrimaryDataUpdate(currentSeason, currentLabel) {

  // seasons selected driver participated
  let selectedSeasonsList = data_3_primary.map(o => o['SeasonID'])

  // if new selected driver participated in current season
  if (selectedSeasonsList.includes(currentSeason)) {

    // get his data of current season by seasonID
    data_3_primary_season = data_3_primary.filter(o => o['SeasonID'] == currentSeason)
    
    // if selected driver drives more than one team, take team with most participated races
    if (data_3_primary_season.length > 1) {

      // if e.g. (currentSeason == currentLabel == '2024') and (data_3_primary_season > 1), which means several teams this season,
      // we can't define data, because in this case we need currentLabel to be e.g. '2024 - Ferrari' or '2024 - Haas F1 Team' kind for O.Bearman;
      // so, if (currentSeason == currentLabel) we take team with more participated races
      if (currentSeason == currentLabel) {
        data_3_primary_season = sortValues(data_3_primary_season, 'RacesParticipated')[0]
        // else means that current label is kind '2024 - Haas F1 Team' 
      } else {

        let selectedLabelsList = data_3_primary.map(o => o['Label'])

        // if currentLabel (e.g. '2024 - Ferrari' in selectedLabelsList), which means that selected driver has several teams as previous,
        // and the same time among them he has same team, as selected (e.g. Ferrari, which almost impossible)
        // so, we define data by currentLabel
        if (selectedLabelsList.includes(currentLabel)) {
          data_3_primary_season = data_3_primary_season.filter(o => o['Label'] == currentLabel)[0]
          // if selected driver drove for different teams, then take the one with most participated races
        } else {
          data_3_primary_season = sortValues(data_3_primary_season, 'RacesParticipated')[0]
        }

      }

    } else {
      
      data_3_primary_season = data_3_primary_season[0]
      
    }
    
  } else {

    data_3_primary_season = data_3_primary.filter(o => o['Label'] == driversDefaultSeason)[0]
    
  }
  
}


function driversSecondaryDataUpdate(currentSeason, currentLabel) {

  // seasons selected driver participated
  let selectedSeasonsList = data_3_secondary.map(o => o['SeasonID'])

  // if new selected driver participated in current season
  if (selectedSeasonsList.includes(currentSeason)) {

    // get his data of current season by seasonID
    data_3_secondary_season = data_3_secondary.filter(o => o['SeasonID'] == currentSeason)
    
    // if he drives more than one team, took team with most participated races
    if (data_3_secondary_season.length > 1) {

      if (currentSeason == currentLabel) {
        data_3_secondary_season = sortValues(data_3_secondary_season, 'RacesParticipated')[0]  
      } else {
        
        let selectedLabelsList = data_3_secondary.map(o => o['Label'])

        // if currentLabel (e.g. '2024 - Ferrari' in selectedLabelsList), which means that selected driver has several teams as previous,
        // and the same time among them he has same team, as selected (e.g. Ferrari, which almost impossible)
        // so, we define data by currentLabel
        if (selectedLabelsList.includes(currentLabel)) {
          data_3_secondary_season = data_3_secondary_season.filter(o => o['Label'] == currentLabel)[0]
          // if selected driver drove for different teams, then take the one with most participated races
        } else {
          data_3_secondary_season = sortValues(data_3_secondary_season, 'RacesParticipated')[0]
        }
        
      }

    } else {
      data_3_secondary_season = data_3_secondary_season[0]
    }
    
  } else {

    data_3_secondary_season = data_3_secondary.filter(o => o['Label'] == driversDefaultSeason)[0]
    
  }
  
}


function driversPrimaryDriverParametersUpdate(currentSeason, currentLabel) {

  // update curernt season and team data
  driversPrimaryDataUpdate(currentSeason, currentLabel)

  // update parameters
  driversDriversSelected['Primary']['SeasonID'] = data_3_primary_season['SeasonID']
  driversDriversSelected['Primary']['Label'] = data_3_primary_season['Label']
  driversDriversSelected['Primary']['DriverID'] = data_3_primary_season['DriverID']
  driversDriversSelected['Primary']['FullName'] = data_3_primary_season['FullName']
  driversDriversSelected['Primary']['Color'] = data_3_primary_season['Color']
  driversDriversSelected['Primary']['Team'] = data_3_primary_season['Team']

  driversDriversSelected['Primary']['Labels'] = data_3_primary.map(o => o['Label'])
  
}


function driversUpdateSecondColor(primaryColor, secondaryColor) {

  let color1 = primaryColor.toUpperCase()
  let color2 = secondaryColor.toUpperCase()

  if (complimentaryColors(color1, color2, complimentaryColorsList) || (color1 == color2)) {
    color2 = modColor(color1)
  }

  return color2
  
}


function driversSecondaryDriverParametersUpdate(currentSeason, currentLabel) {

  // update curernt season and team data
  driversSecondaryDataUpdate(currentSeason, currentLabel)

  // update parameters
  driversDriversSelected['Secondary']['SeasonID'] = data_3_secondary_season['SeasonID']
  driversDriversSelected['Secondary']['Label'] = data_3_secondary_season['Label']
  driversDriversSelected['Secondary']['DriverID'] = data_3_secondary_season['DriverID']
  driversDriversSelected['Secondary']['FullName'] = data_3_secondary_season['FullName']
  driversDriversSelected['Secondary']['Team'] = data_3_secondary_season['Team']

  driversDriversSelected['Secondary']['Labels'] = data_3_secondary.map(o => o['Label'])

  driversDriversSelected['Secondary']['Color'] = 
    driversUpdateSecondColor(
      driversDriversSelected['Primary']['Color'],
      data_3_secondary_season['Color']
    )

}


function dropdown31Fill() {

  // menu items
  dropdownMenuAddItems(dropdown31MenuID, driversDriversNames, dropdown31MenuItemID)

  dropdownItemsSetAttributes(
    dropdown31MenuID, {
      'index': '',
      'driverID': driversDriversIDs,
      'fullName': driversDriversNames
    })

  let maximumWidth = getDropdownMaximumwidth(
    dropdown31ContainerID, dropdown31TitleID, dropdown31MenuID, driversDriversNames)

  let dropdownTitle = getElement(dropdown31TitleID)

  // button title
  dropdownTitle.textContent = driversDriversSelected['Primary']['FullName']
  dropdownTitle.setAttribute('index', driversDriversNames.indexOf(driversDriversSelected['Primary']['FullName']))

  // update widths
  setDropdownWidth(dropdown31ContainerID, dropdown31MenuID, maximumWidth, setMenuWidth=false)
  
}


function dropdown31MouseUp(element) {

  let name = element.getAttribute('fullName')
  let index = element.getAttribute('index')
  
  let dropdownTitle = getElement(dropdown31TitleID)

  dropdownTitle.textContent = name
  dropdownTitle.setAttribute('fullName', name)
  dropdownTitle.setAttribute('index', index)

  // globals
  driversDriversSelected['Primary']['DriverID'] = element.getAttribute('driverID')

  // update primary path
  driversUpdatePrimaryPath(driversDriversSelected['Primary']['DriverID'])

  Promise.all([
    d3.csv(driversDataPrimaryPath),
    ]).then(function(files) {
    
    data_3_primary = files[0]

    // filter SprintIndex
    driversPrimaryDataSprintUpdate(driversDefaultSprintIndex)

    // filter current season/team data and driver paramters
    driversPrimaryDriverParametersUpdate(
      driversDriversSelected['Primary']['SeasonID'],
      driversDriversSelected['Primary']['Label']
    )

    // fill dropdown with year primary
    dropdown32Fill()

    // update content
    driversUpdateChartsCharacteristics()

    }).catch(function(err) {
    // handle error here
  })

}


function driversBioFill(driverID) {

  let driverData = driversInfo.filter(d => d['DriverID'] == driverID)[0]

  getElement(driversPrimaryInfoNameID).textContent = driverData['FullName']
  getElement(driversPrimaryInfoFlagID).src = pathImgNationsRect + `${driverData['CountryCode']}.svg`
  getElement(driversPrimaryInfoBirthdateID).textContent = driverData['BirthDayRus']
  getElement(driversPrimaryInfoBirthplaceID).textContent = driverData['BirthPlaceRus']

}


function dropdown32Fill() {

  let seasons = data_3_primary.map(o => o['SeasonID'])
  let labels = data_3_primary.map(o => o['Label'])
  let colors = data_3_primary.map(o => o['Color'])
  let drivers = data_3_primary.map(o => o['DriverID'])
  
  let label = data_3_primary_season['Label']

  let itemsList = copyObject(labels)
  itemsList.push('Все сезоны')
  
  let maximumWidth = getDropdownMaximumwidth(
    dropdown32ContainerID, dropdown32TitleID, dropdown32MenuID, itemsList)

  let dropdownTitle = getElement(dropdown32TitleID)

  // menu items
  dropdownMenuAddItems(dropdown32MenuID, labels, dropdown32MenuItemID)

  dropdownItemsSetAttributes(
    dropdown32MenuID, {
      'index': 'index',
      'seasonID': seasons,
      'label': labels,
      // 'color': colors,
      // 'driver': drivers
    })

  dropdownTitle.textContent = label
  dropdownTitle.setAttribute('index', labels.length-1)
  dropdownTitle.setAttribute('label', label)

  // update widths
  setDropdownWidth(dropdown32ContainerID, dropdown32MenuID, maximumWidth, setMenuWidth=false)
  // updateDropdownWidth(dropdown32ID, dropdown32MenuID)

}


function dropdown32MouseUp(element) {

  // scrollPosition = getScrollPosition()

  driversPrimaryDriverParametersUpdate(
    element.getAttribute('seasonID'),
    element.getAttribute('label')
  )

  let dropdownTitle = getElement(dropdown32TitleID)

  dropdownTitle.textContent = driversDriversSelected['Primary']['Label']
  dropdownTitle.setAttribute('index', element.getAttribute('index'))
  dropdownTitle.setAttribute('label', driversDriversSelected['Primary']['Label'])

  // update widths
  // updateDropdownWidth(dropdown32ID, dropdown32MenuID)

  driversPrimaryCharacteristicsUpdate(
    driversDriversSelected['Primary']['SeasonID'],
    driversDriversSelected['Primary']['Label'],
    driversDriversSelected['Primary']['Color']
  )

  driversUpdateLinestyles()

  driversUpdateChartsPrimary(
    containerPent='chart-pent-1',
    pentagonDrivers=[driversDriversSelected['Primary']['DriverID']],
    pentagonData=[data_3_primary_season],
    pentagonColors=[driversDriversSelected['Primary']['Color']],
    driversChartPentagon1Linestyles=driversChartPentagon1Linestyles
  )
  
}


function iconBackward32MouseUp() {

  let currentItem = getElement(dropdown32TitleID).getAttribute('label')
  let previousItem = iconBackwardNextItem(dropdown32MenuID, driversDriversSelected['Primary']['Labels'], currentItem)

  dropdown32MouseUp(previousItem)
  
}


function iconForward32MouseUp() {

  let currentItem = getElement(dropdown32TitleID).getAttribute('label')
  let nextItem = iconForwardNextItem(dropdown32MenuID, driversDriversSelected['Primary']['Labels'], currentItem)

  dropdown32MouseUp(nextItem)
  
}


function driversUpdateImage(driverID, imageID) {

  // update image
  let imgPath = pathImgDrivers + 'page-drivers' + '/' + parseInt(driverID) + imagesFormat
  let img = getElement(imageID).children[0]
  img.src = imgPath

  imageNotFound(img)
  
}


function driversUpdateImageByYear(driverIDT, seasonID, imageID) {

  // update image
  let imgPath = pathImgDrivers + String(seasonID) + '/' + driverIDT + imagesFormat
  let img = getElement(imageID).children[0]
  img.src = imgPath

  imageNotFound(img)
  
}


function driversPrimaryCharacteristicsUpdate(season, label, color) {

  if (season == driversDefaultSeason) {
    setText(driversLevelTitleID, 'СРЕДНИЙ УРОВЕНЬ')
  }  else {
    // if multiple teams
    if (label.includes('-')) {
      let team = data_3_primary_season['Team']
      setText(driversLevelTitleID, `УРОВЕНЬ В ${season} (${team})`)
    } else {
      setText(driversLevelTitleID, `УРОВЕНЬ В ${season}`)
    }
  }

  // update characteristics
  let contanersIDs = [
    driversMetricRatingID,
    driversMetricConsistencyID, driversMetricStartID, driversMetricOvertakesID, driversMetricPaceID,
    driversMetricConsistencyTeammateID, driversMetricQTeammateID, driversMetricPaceTeammateID,
    driversMetricMistakesTeammateID,
  ]

  // driversCharacteristicsMetrics - in variables
  contanersIDs.forEach((id, i) => {
    setText(id, data_3_primary_season[driversCharacteristicsMetrics[i]])
  })

  // set color of level characteristic
  getElement(driversMetricRatingID).style.color = color

  // set image
  if (season == 'Все сезоны') {
    driversUpdateImage(data_3_primary_season['DriverID'], driversDriverImageID)
  } else {
    driversUpdateImageByYear(data_3_primary_season['DriverIDT'], season, driversDriverImageID)
  }

  // // set nationality
  // getElement(driversDriverNationID).textContent = `${data_3_primary_season['CountryCodeRus']}`

  // // set flag
  // let imgPath = pathImgNationsRect + `${data_3_primary_season['CountryCode']}.svg`
  // getElement(driversFlagID).src = imgPath

}


function driversUpdateLinestyles() {

  if (driversDriversSelected['Primary']['Color']) {

    if (driversDriversSelected['Secondary']['Color'] == modColor(driversDriversSelected['Primary']['Color'])) {
      driversChartPentagon1Linestyles[1] = ['30 2 4 2']
    } else {
      driversChartPentagon1Linestyles[1] = ['0']
    }
    
  }

}


function driversUpdateChartLineProgress() {

  let data = data_3_primary.slice(0, -1)

  chart_1('chart-drivers-1-1', data, 0)
  chart_2('chart-drivers-1-2', data, 1)
  
}


function driversUpdateChartsPrimary(
    containerPent, pentagonDrivers, pentagonData, pentagonColors,
    driversChartPentagon1Linestyles) {

  // update chart pentagon 2
  chartPolygon_1(
    ContainerID=containerPent,
    driverIDsList=pentagonDrivers,
    listWData=pentagonData,
    colorsList=pentagonColors,
    linestyles=driversChartPentagon1Linestyles
  )

  // update chart progress
  driversUpdateChartLineProgress()

  window.onresize = () => {

    updateUnits()

    if (getElement(containerPent)) {

      // update chart pentagon 2
      chartPolygon_1(
        ContainerID=containerPent,
        driverIDsList=pentagonDrivers,
        listWData=pentagonData,
        colorsList=pentagonColors,
        linestyles=driversChartPentagon1Linestyles
      )
      
    }


    // update chart progress
  driversUpdateChartLineProgress()

  }
  
}


function dropdown33Fill() {

  // menu items
  dropdownMenuAddItems(dropdown33MenuID, driversDriversNames, dropdown33MenuItemID)

  dropdownItemsSetAttributes(
    dropdown33MenuID, {
      'index': '',
      'driverID': driversDriversIDs,
      'fullName': driversDriversNames
    })

  let maximumWidth = getDropdownMaximumwidth(
    dropdown33ContainerID, dropdown33TitleID, dropdown33MenuID, driversDriversNames)

  let dropdownTitle = getElement(dropdown33TitleID)

  // button title
  dropdownTitle.textContent = driversDriversSelected['Primary']['FullName']
  dropdownTitle.setAttribute('index', driversDriversNames.indexOf(driversDriversSelected['Primary']['FullName']))

  // update widths
  setDropdownWidth(dropdown33ContainerID, dropdown33MenuID, maximumWidth, setMenuWidth=false)
  
}


function dropdown33MouseUp(element) {

  let name = element.getAttribute('fullName')
  
  let dropdownTitle = getElement(dropdown33TitleID)

  dropdownTitle.textContent = name
  dropdownTitle.setAttribute('fullName', name)
  dropdownTitle.setAttribute('index', element.getAttribute('index'))

  // globals
  driversDriversSelected['Primary']['DriverID'] = element.getAttribute('driverID')

  driversUpdatePrimaryPath(driversDriversSelected['Primary']['DriverID'])

  Promise.all([
    d3.csv(driversDataPrimaryPath),
    ]).then(function(files) {
    
    data_3_primary = files[0]

    // filter SprintIndex
    driversPrimaryDataSprintUpdate(driversDefaultSprintIndex)

    // filter current season/team data and driver paramters
    driversPrimaryDriverParametersUpdate(
      driversDriversSelected['Primary']['SeasonID'],
      driversDriversSelected['Primary']['Label']
    )

    // fill dropdown with year primary
    dropdown34Fill()

    // badges
    driversComparePrimaryBadgeUpdate()

    let pentagonDrivers = [
      data_3_primary_season['DriverID'],
      data_3_secondary_season['DriverID']
    ]
    
    let pentagonData = [
      data_3_primary_season,
      data_3_secondary_season
    ]
    
    let pentagonColors = [
      driversDriversSelected['Primary']['Color'],
      driversDriversSelected['Secondary']['Color']
    ]

    driversUpdateLinestyles()

    driversUpdateChartsCompare(
      containerPent='chart-pent-2',
      containerLine='chart-drivers-compare',
      driverIDsList=pentagonDrivers,
      listWData=pentagonData,
      colorsList=pentagonColors,
      linestyles=driversChartPentagon1Linestyles
    )

    }).catch(function(err) {
    // handle error here
  })

}


function dropdown34Fill() {

  getElement(dropdown34ID).style.width = 'max-content'

  let seasons = data_3_primary.map(o => o['SeasonID'])
  let labels = data_3_primary.map(o => o['Label'])
  let colors = data_3_primary.map(o => o['Color'])
  let drivers = data_3_primary.map(o => o['DriverID'])

  let label = data_3_primary_season['Label']

  let dropdownTitle = getElement(dropdown34TitleID)

  // menu items
  dropdownMenuAddItems(dropdown34MenuID, labels, dropdown34MenuItemID)

  dropdownItemsSetAttributes(
    dropdown34MenuID, {
      'index': 'index',
      'seasonID': seasons,
      'label': labels,
      // 'color': colors,
      // 'driver': drivers
    })

  let maximumWidth = getDropdownMaximumwidth(
    dropdown34ID, dropdown34TitleID, dropdown34MenuID, labels)

  dropdownTitle.textContent = label
  dropdownTitle.setAttribute('index', labels.length-1)
  dropdownTitle.setAttribute('label', label)

  // update widths
  setDropdownWidth(dropdown34ID, dropdown34MenuID, maximumWidth, setMenuWidth=false)
  // updateDropdownWidth(dropdown34ID, dropdown34MenuID)

}


function dropdown34MouseUp(element) {

  driversPrimaryDriverParametersUpdate(
    element.getAttribute('seasonID'),
    element.getAttribute('label')
  )

  let index = element.getAttribute('index')
  let driver = driversDriversSelected['Primary']['DriverID']
  let season = driversDriversSelected['Primary']['SeasonID']
  let label = driversDriversSelected['Primary']['Label']
  let color = driversDriversSelected['Primary']['Color']

  let dropdownTitle = getElement(dropdown34TitleID)

  dropdownTitle.textContent = label
  dropdownTitle.setAttribute('index', index)
  dropdownTitle.setAttribute('label', label)

  // update widths
  // updateDropdownWidth(dropdown34ID, dropdown34MenuID)

  let seasonSecondary = driversDriversSelected['Secondary']['SeasonID']
  let labelSecondary = driversDriversSelected['Secondary']['Label']
  
  driversSecondaryDriverParametersUpdate(seasonSecondary, labelSecondary)

  driversComparePrimaryBadgeUpdate()
  driversCompareSecondaryBadgeUpdate()

  let pentagonDrivers = [
    data_3_primary_season['DriverID'],
    data_3_secondary_season['DriverID']
  ]
  
  let pentagonData = [
    data_3_primary_season,
    data_3_secondary_season
  ]
  
  let pentagonColors = [
    driversDriversSelected['Primary']['Color'],
    driversDriversSelected['Secondary']['Color']
  ]

  driversUpdateLinestyles()

  driversUpdateChartsCompare(
    containerPent='chart-pent-2',
    containerLine='chart-drivers-compare',
    driverIDsList=pentagonDrivers,
    listWData=pentagonData,
    colorsList=pentagonColors,
    linestyles=driversChartPentagon1Linestyles
  )
  
}


function iconForward34MouseUp() {

  let currentItem = getElement(dropdown34TitleID).getAttribute('label')
  let nextItem = iconForwardNextItem(dropdown34MenuID, driversDriversSelected['Primary']['Labels'], currentItem)

  dropdown34MouseUp(nextItem)
  
}


function iconBackward34MouseUp() {

  let currentItem = getElement(dropdown34TitleID).getAttribute('label')
  let previousItem = iconBackwardNextItem(dropdown34MenuID, driversDriversSelected['Primary']['Labels'], currentItem)

  dropdown34MouseUp(previousItem)
  
}


function dropdown35Fill() {

  // menu items
  dropdownMenuAddItems(dropdown35MenuID, driversDriversNames, dropdown35MenuItemID)

  // items attributes
  dropdownItemsSetAttributes(
    dropdown35MenuID, {
      'index': '',
      'DriverID': driversDriversIDs,
      'FullName': driversDriversNames
    })

  let maximumWidth = getDropdownMaximumwidth(
    dropdown35ContainerID, dropdown35TitleID, dropdown35MenuID, driversDriversNames)

  let dropdownTitle = getElement(dropdown35TitleID)

  let name = (data_3_secondary_season) ? data_3_secondary_season['FullName'] : title

  // button title
  dropdownTitle.textContent = name
  dropdownTitle.setAttribute('index', driversDriversNames.indexOf(name))

  // update widths
  setDropdownWidth(dropdown35ContainerID, dropdown35MenuID, maximumWidth, setMenuWidth=false)
  
}


function dropdown35MouseUp(element) {

  let name = element.getAttribute('fullName')
  
  let dropdownTitle = getElement(dropdown35TitleID)

  dropdownTitle.textContent = name
  dropdownTitle.setAttribute('fullName', name)
  dropdownTitle.setAttribute('index', element.getAttribute('index'))

  // globals
  driversDriversSelected['Secondary']['DriverID'] = element.getAttribute('driverID')

  driversUpdateSecondaryPath(driversDriversSelected['Secondary']['DriverID'])

  Promise.all([
    d3.csv(driversDataSecondaryPath),
    ]).then(function(files) {
    
    data_3_secondary = files[0]

    // filter SprintIndex
    driversSecondaryDataSprintUpdate(driversDefaultSprintIndex)

    // filter current season/team data and driver paramters
    driversSecondaryDriverParametersUpdate(
      driversDriversSelected['Secondary']['SeasonID'],
      driversDriversSelected['Secondary']['Label']
    )

    // fill dropdown with year primary
    dropdown36Fill()

    // badges
    driversCompareSecondaryBadgeUpdate()

    let pentagonDrivers = [
      data_3_primary_season['DriverID'],
      data_3_secondary_season['DriverID']
    ]
    
    let pentagonData = [
      data_3_primary_season,
      data_3_secondary_season
    ]
    
    let pentagonColors = [
      driversDriversSelected['Primary']['Color'],
      driversDriversSelected['Secondary']['Color']
    ]

    driversUpdateLinestyles()

    driversUpdateChartsCompare(
      containerPent='chart-pent-2',
      containerLine='chart-drivers-compare',
      driverIDsList=pentagonDrivers,
      listWData=pentagonData,
      colorsList=pentagonColors,
      linestyles=driversChartPentagon1Linestyles
    )

    }).catch(function(err) {
    // handle error here
  })
  
}


function dropdown36Fill() {

  getElement(dropdown36ID).style.width = 'max-content'

  let seasons = data_3_secondary.map(o => o['SeasonID'])
  let labels = data_3_secondary.map(o => o['Label'])
  let colors = data_3_secondary.map(o => o['Color'])
  let drivers = data_3_secondary.map(o => o['driverID'])

  let label = data_3_secondary_season['Label']

  let dropdownTitle = getElement(dropdown36TitleID)

  // menu items
  dropdownMenuAddItems(dropdown36MenuID, labels, dropdown36MenuItemID)

  dropdownItemsSetAttributes(
    dropdown36MenuID, {
      'index': 'index',
      'seasonID': seasons,
      'label': labels,
      // 'color': colors,
      // 'driver': drivers
    })

  let maximumWidth = getDropdownMaximumwidth(
    dropdown36ID, dropdown36TitleID, dropdown36MenuID, labels)

  dropdownTitle.textContent = label
  dropdownTitle.setAttribute('index', labels.length-1)
  dropdownTitle.setAttribute('label', label)

  // update widths
  setDropdownWidth(dropdown36ID, dropdown36MenuID, maximumWidth, setMenuWidth=false)

}


function dropdown36MouseUp(element) {
  
  driversSecondaryDriverParametersUpdate(
    element.getAttribute('seasonID'),
    element.getAttribute('label')
  )

  let index = element.getAttribute('index')
  let driver = driversDriversSelected['Secondary']['DriverID']
  let season = driversDriversSelected['Secondary']['SeasonID']
  let label = driversDriversSelected['Secondary']['Label']
  let color = driversDriversSelected['Secondary']['Color']

  let dropdownTitle = getElement(dropdown36TitleID)

  dropdownTitle.textContent = label
  dropdownTitle.setAttribute('index', index)
  dropdownTitle.setAttribute('label', label)

  driversSecondaryDriverParametersUpdate(season, label)

  driversComparePrimaryBadgeUpdate()
  driversCompareSecondaryBadgeUpdate()

  let pentagonDrivers = [
    data_3_primary_season['DriverID'],
    data_3_secondary_season['DriverID']
  ]
  
  let pentagonData = [
    data_3_primary_season,
    data_3_secondary_season
  ]
  
  let pentagonColors = [
    driversDriversSelected['Primary']['Color'],
    driversDriversSelected['Secondary']['Color']
  ]

  driversUpdateLinestyles()

  driversUpdateChartsCompare(
    containerPent='chart-pent-2',
    containerLine='chart-drivers-compare',
    driverIDsList=pentagonDrivers,
    listWData=pentagonData,
    colorsList=pentagonColors,
    linestyles=driversChartPentagon1Linestyles
  )
  
}


function iconForward36MouseUp() {

  let currentItem = getElement(dropdown36TitleID).getAttribute('label')
  let nextItem = iconForwardNextItem(dropdown36MenuID, driversDriversSelected['Secondary']['Labels'], currentItem)

  dropdown36MouseUp(nextItem)
  
}


function iconBackward36MouseUp() {

  let currentItem = getElement(dropdown36TitleID).getAttribute('label')
  let previousItem = iconBackwardNextItem(dropdown36MenuID, driversDriversSelected['Secondary']['Labels'], currentItem)

  dropdown36MouseUp(previousItem)
  
}


function driversComparePrimaryBadgeUpdate() {

  let element = getElement(driversCompareDriverPrimaryTitleID)
  
  let driver = driversDriversSelected['Primary']['DriverID']
  let season = driversDriversSelected['Primary']['SeasonID']
  let name = driversDriversSelected['Primary']['FullName']
  
  let color = driversDriversSelected['Primary']['Color']

  element.textContent = name
  element.style.color = color

  let teamElement = getElement(driversComparisonTeamLeftID)
  
  let team = data_3_primary_season['Team']
  let number = data_3_primary_season['Number']

  if (season == driversDefaultSeason) {
    
    driversUpdateImage(driver, imageDrivers1PrimaryDriverID)
    teamElement.textContent = ''
    
  } else {
    
    let idt = data_3_primary_season['DriverIDT']
    driversUpdateImageByYear(idt, season, imageDrivers1PrimaryDriverID)

    teamElement.textContent = `#${number} ${team}`
    
  }

}

function driversCompareSecondaryBadgeUpdate() {

  let element = getElement(driversCompareDriverSecondaryTitleID)

  let driver = driversDriversSelected['Secondary']['DriverID']
  let season = driversDriversSelected['Secondary']['SeasonID']
  let name = driversDriversSelected['Secondary']['FullName']
  let color = driversDriversSelected['Secondary']['Color']

  element.textContent = name
  element.style.color = color

  let teamElement = getElement(driversComparisonTeamRightID)
  
  let team = data_3_secondary_season['Team']
  let number = data_3_secondary_season['Number']

  if (season == driversDefaultSeason) {
    
    driversUpdateImage(driver, imageDrivers1SecondaryDriverID)
    teamElement.textContent = ''
    
  } else {
    
    let idt = data_3_secondary_season['DriverIDT']
    driversUpdateImageByYear(idt, season, imageDrivers1SecondaryDriverID)

    teamElement.textContent = `#${number} ${team}`
    
  }
    
}


function driversUpdateChartLineCompare(colors, linestyles) {

  let dataPrimary = data_3_primary.slice(0, -1)
  let dataSecondary = data_3_secondary.slice(0, -1)

  // chart_3(chartDrivers21ID, dataPrimary, dataSecondary, metric, colors, linestyles, 0)

  driversComparisonMetrics.forEach((metric, i) => {

    let heightCoeff = 1

    if (i == 0) {
      heightCoeff = 1.1
    }

    let containerID = 'chart-drivers-2-' + String(i)
    chart_3(containerID, dataPrimary, dataSecondary, metric, colors, linestyles, i, heightCoeff)
    
  })
  
}


function driversUpdateChartsPrimary(
    containerPent, pentagonDrivers, pentagonData, pentagonColors,
    driversChartPentagon1Linestyles) {

  // update chart pentagon 2
  chartPolygon_1(
    ContainerID=containerPent,
    driverIDsList=pentagonDrivers,
    listWData=pentagonData,
    colorsList=pentagonColors,
    linestyles=driversChartPentagon1Linestyles
  )

  // update chart progress
  driversUpdateChartLineProgress()

  window.onresize = () => {

    updateUnits()

    if (getElement(containerPent)) {

      // update chart pentagon 2
      chartPolygon_1(
        ContainerID=containerPent,
        driverIDsList=pentagonDrivers,
        listWData=pentagonData,
        colorsList=pentagonColors,
        linestyles=driversChartPentagon1Linestyles
      )
      
    }


    // update chart progress
  driversUpdateChartLineProgress()
        
    

  }
  
}


function driversUpdateChartsCompare(
    containerPent, containerLine, pentagonDrivers, pentagonData, pentagonColors,
    driversChartPentagon1Linestyles) {

  // update chart pentagon 2
  chartPolygon_1(
    ContainerID=containerPent,
    driverIDsList=pentagonDrivers,
    listWData=pentagonData,
    colorsList=pentagonColors,
    linestyles=driversChartPentagon1Linestyles
  )

  driversUpdateChartLineCompare(
    colors=pentagonColors,
    linestyles=driversChartPentagon1Linestyles
  )

  window.onresize = () => {

    updateUnits()

    if (getElement(containerPent)) {

      // update chart pentagon 2
      chartPolygon_1(
        ContainerID=containerPent,
        driverIDsList=pentagonDrivers,
        listWData=pentagonData,
        colorsList=pentagonColors,
        linestyles=driversChartPentagon1Linestyles
      )
      
    }

    if (getElement(containerLine)) {

      driversUpdateChartLineCompare(
        colors=pentagonColors,
        linestyles=driversChartPentagon1Linestyles
      )
      
    }

  }
  
}


function driversTable1ParametersByCategoryUpdate() {

  driversTable1Columns = driversTablesTable1Data[glVTables['Category']]['Columns']

}


function driversTablesDataFilter() {

  data_4_filtered = copyObject(data_4)
  data_4_filtered = arrayOfObjectsFilterSeveralColumns(data_4_filtered, driversTable1Columns)
  
}


function dropdown38Fill() {

  // menu items
  dropdownMenuAddItems(dropdown38MenuID, driversTable1MetricCategories, dropdown38MenuItemID)

  // items attributes
  Array.from(getElement(dropdown38MenuID).children).forEach((item, i) => {
    item.setAttribute('index', i)
    item.setAttribute('category', driversTable1MetricCategories[i])
  })

  let dropdownTitle = getElement(dropdown38TitleID)

  let category = glVTables['Category']

  dropdownTitle.textContent = category
  dropdownTitle.setAttribute('category', category)

  setText(driversTablesMetricsNameTitleID, category)
  setText(driversTablesMetricsDescriptionsID, driversTablesTable1Data[category]['Description'])

  // update widths
  updateDropdownWidth(dropdown38ID, dropdown38MenuID)
  
}


function dropdown38MouseUp(element) {

  scrollPosition = getScrollPosition()

  let category = element.getAttribute('category')

  // globals
  glVTables['SeasonID'] = glVTables['SeasonIDDefault']
  glVTables['ClickedColumn'] = null
  glVTables['ClickedColumnAscending'] = null
  glVTables['Category'] = category

  let dropdownTitle = getElement(dropdown38TitleID)

  dropdownTitle.textContent = category
  dropdownTitle.setAttribute('category', category)

  setText(driversTablesMetricsNameTitleID, category)
  
  setText(
    driversTablesMetricsDescriptionsID,
    driversTablesTable1Data[category]['Description']
  )

  // update widths
  updateDropdownWidth(dropdown38ID, dropdown38MenuID)

  driversUpdateTablesPath()

  let dataPaths = [d3.csv(driversTablesDataPath)]

  Promise.all(dataPaths).then(function(files) {

    data_4 = files[0]

    // define columns
    driversTable1ParametersByCategoryUpdate()
  
    // filter data
    driversTablesDataFilter()
  
    driversTable1MetricCategories = Object.keys(driversTablesTable1Data)
  
    dropdown37Fill()
  
    driversResetTable1(data_4_filtered)

    }).catch(function(err) {
    // handle error here
  })
  
}


function dropdown37Fill() {

  // menu items
  dropdownMenuAddItems(dropdown37MenuID, driversTable1SeasonIDs, dropdown37MenuItemID)

  // items attributes
  Array.from(getElement(dropdown37MenuID).children).forEach((item, i) => {
    item.setAttribute('index', i)
    item.setAttribute('seasonID', driversTable1SeasonIDs[i])
  })

  let dropdownTitle = getElement(dropdown37TitleID)

  let seasonID = glVTables['SeasonID']

  dropdownTitle.textContent = seasonID
  dropdownTitle.setAttribute('index', driversTable1SeasonIDs.indexOf[seasonID])
  dropdownTitle.setAttribute('seasonID', seasonID)

  // update widths
  updateDropdownWidth(dropdown37ID, dropdown37MenuID)
  
}


function dropdown37MouseUp(element) {

  let seasonID = element.getAttribute('seasonID')
  let page = glVGlobal['Page']

  // globals
  glVTables['SeasonID'] = seasonID

  let dropdownTitle = getElement(dropdown37TitleID)

  dropdownTitle.textContent = seasonID
  dropdownTitle.setAttribute('seasonID', seasonID)

  // update widths
  updateDropdownWidth(dropdown37ID, dropdown37MenuID)

  driversUpdateTablesPath()

  Promise.all([
    d3.csv(driversTablesDataPath),
    ]).then(function(files) {

    data_4 = files[0]

    driversTablesDataFilter()

    // update table
    driversResetTable1(data_4_filtered)

    if (glVTables['ClickedColumn']) {

      sortTable31(data_4_filtered, glVTables['ClickedColumn'], glVTables['ClickedColumnAscending'])

      driversTablesTable31Activate(
        glVTables['ClickedColumn'],
        classListAdd=['sorted-false'],
        classListRemove=['sorted-true'])
      
    }

    }).catch(function(err) {
    // handle error here
  })
  
}

function iconBackward37MouseUp() {

  let currentItem = getElement(dropdown37TitleID).getAttribute('seasonID')
  let previousItem = iconBackwardNextItem(dropdown37MenuID, driversTable1SeasonIDs, currentItem)

  dropdown37MouseUp(previousItem)
  
}


function iconForward37MouseUp() {

  let currentItem = getElement(dropdown37TitleID).getAttribute('seasonID')
  let nextItem = iconForwardNextItem(dropdown37MenuID, driversTable1SeasonIDs, currentItem)

  dropdown37MouseUp(nextItem)
  
}


function clearTable(tableContainerID) {
  getElement(tableContainerID).innerHTML = ''
}


function sortTable31(data, column, ascending) {

  clearTable(driversTablesMainTableID)
  driversTablesTable31Construct(data, column, ascending)

  glVTables['ClickedColumn'] = column
  glVTables['ClickedColumnAscending'] = ascending

}


function driversResetTable1(data) {

  clearTable(driversTablesMainTableID)

  driversTablesTable31Construct(data_4_filtered, 'LevelNormalizedAvg', false)

}


function driversTablesTable31Construct(data, column, ascending) {

  data = sortValuesStringNumbers(data, column, ascending)

  let category = glVTables['Category']

  let captions = driversTablesTable1Data[category]['Captions']
  let columns = driversTablesTable1Data[category]['Columns']
  let sortColumns = driversTablesTable1Data[category]['SortColumns']
  let colors = driversTablesTable1Data[category]['Colors']
  let ascendingAttribute = driversTablesTable1Data[category]['Ascending']

  let dataOrdered = []

  let IDs = []
  
    captions.forEach((caption, j) => {
      IDs.push('drivers-tables-table-3-1' + '-col-' + j + '-row-' + 0)
    })

  IDs = arrayAddElementFirst(IDs, '')

  // captions
  tableAddRow(
    driversTablesMainTableID,
    captions,
    addBorder=true,
    addIndex=true,
    attributes={
      index: '',
      rowClassList: 'tables-row tables-row-caption',
      cellClassList: 'tables-cell tables-cell-caption',
      fontClassList: 'tables-font tables-font-caption tables-font-caption-3-1',
      indexClassList: 'tables-cell-index',
      hoverClass: '',
      cellWidths: driversTablesTable1Data[category]['CellWidths']
    },
    cellAttributes={
      'sortColumn': sortColumns,
      'color': colors,
      'id': IDs,
      'ascending': ascendingAttribute
    })

  let captionsSeparatorContainer = document.createElement('div')
  let captionsSeparator = document.createElement('div')

  Object.assign(
    target=captionsSeparatorContainer,
    source={
      className: 'w-100 px-075'
    })

  Object.assign(
    target=captionsSeparator,
    source={
      className: 'h-line my-05'
    })

  let table = document.createElement('div')

  table.appendChild(captionsSeparator)
  captionsSeparatorContainer.appendChild(captionsSeparator)
  getElement(driversTablesMainTableID).appendChild(captionsSeparatorContainer)

  Object.assign(
    target=table,
    source={
      className: 'tables-content-container table-3-1-container',
      id: 'drivers-tables-table-3-1-container'
    })

  getElement(driversTablesMainTableID).appendChild(table)

  // rows
  data.forEach((obj, i) => {

    // let background = (isEven(i)) ? '#FFFFFF' : '#D2D7DC1A'

    let values = []
    let IDs = []

    columns.forEach((column, j) => {
      values.push(obj[column])
      IDs.push('drivers-tables-table-3-1' + '-col-' + j + '-row-' + Number(i+1))
    })

    tableAddRow(
      'drivers-tables-table-3-1-container',
      values,
      addBorder=false,
      addIndex=true,
      attributes={
        index: i + 1,
        rowClassList: 'tables-row',
        cellClassList: 'tables-cell',
        fontClassList: 'tables-font tables-font-3-1',
        indexClassList: 'tables-cell-index',
        cellWidths: driversTablesTable1Data[category]['CellWidths']
        // rowBackground: background
      },
      cellAttributes={
        'sortColumn': sortColumns,
        'color': colors,
        'id': IDs,
        'ascending': ascendingAttribute
      })
      
  })
  
}


function driversTablesTable31Activate(sortColumn, classListAdd=[], classListRemove=[]) {

  let table = getElement(driversTablesMainTableID)
  let columnCells = getElementsListByAttribute('sortColumn', sortColumn, table)

  let alphaColumn
  
  if (themeCurrent == 'dark') {
    alphaColumn = String(10)
  } else {
    alphaColumn = String(20)
  }
  
  let alphaBorder = 0.75

  columnCells.forEach((cell, i) => {

    let color = cell.getAttribute('color')
    let borderColor

    if (themeCurrent == 'dark') {
      borderColor = shadeColor(color, -alphaBorder)
    } else {
     borderColor = alphaColor(color, alphaBorder)
    }

    cell.style.background = color + alphaColumn
    cell.style.fontWeight = 700
    cell.style.borderLeft = `1px solid ${borderColor}`
    cell.style.borderRight = `1px solid ${borderColor}`

    if (i == 0) {

      cell.style.borderTop = `1px solid ${borderColor}`
      cell.classList.add('tables-cell-round-top')

      let row = cell.parentElement
      let column = Number(cell.getAttribute('column'))

      let previousColumn = getElementsListByAttribute('column', column - 1, row)[0]
      let previousBorder = getElementsListByAttribute('table-border-line', true, previousColumn)[0]

      let currentBorder = getElementsListByAttribute('table-border-line', true, cell)[0]

      if (previousColumn) { previousBorder.style.opacity = 0 }
      if (currentBorder) { currentBorder.style.opacity = 0 }
      
    } else if (i == columnCells.length - 1) {

      cell.style.borderBottom = `1px solid ${borderColor}`
      cell.classList.add('tables-cell-round-bottom')
      
    }

    classListAdd.forEach((class_, i) => {
      cell.classList.add(class_)
    })

    classListRemove.forEach((class_, i) => {
      cell.classList.remove(class_)
    })

    cell.style.width = `${Math.ceil(cell.offsetWidth)}px`

  })

}


function driversTablesTable31MouseUp(element) {

  let sortColumn = element.getAttribute('sortColumn')
  let ascending = element.getAttribute('ascending') == 'true'

  let table = getElement(driversTablesMainTableID)

  if (element.classList.contains('sorted-true')) {
    
    sortTable31(data_4_filtered, sortColumn, false)

    driversTablesTable31Activate(
      sortColumn,
      classListAdd=['sorted-false'],
      classListRemove=['sorted-true'])

    if (!ascending) {
      driversResetTable1()
    }

  } else if (element.classList.contains('sorted-false')) {

    sortTable31(data_4_filtered, sortColumn, true)

    driversTablesTable31Activate(
      sortColumn,
      classListAdd=['sorted-true'],
      classListRemove=['sorted-false'])

    if (ascending) {
      driversResetTable1()
    }
    
  } else {

    sortTable31(data_4_filtered, sortColumn, ascending=ascending)

    let ascendingClass = 'sorted-' + String(ascending)

    driversTablesTable31Activate(
      sortColumn,
      classListAdd=[ascendingClass],
      classListRemove=[])

  }

}


function driversUpdateChartsCharacteristics() {

  // primary bio fill
  driversBioFill(driversDriversSelected['Primary']['DriverID'])

  // fill characteristics
  driversPrimaryCharacteristicsUpdate(
    driversDriversSelected['Primary']['SeasonID'],
    driversDriversSelected['Primary']['Label'],
    driversDriversSelected['Primary']['Color']
  )

  driversUpdateLinestyles()

  driversUpdateChartsPrimary(
    containerPent='chart-pent-1',
    driverIDsList=[driversDriversSelected['Primary']['DriverID']],
    listWData=[data_3_primary_season],
    colorsList=[driversDriversSelected['Primary']['Color']],
    linestyles=driversChartPentagon1Linestyles,
  )
  
}


function driversDefinePrimaryDriver() {

  if (glVDrivers['PrimaryDriverDefine']) {

    glVDrivers['PrimaryDriverDefine'] = false

    driversDriversNames.forEach((name, id) => {
      driversDriversIDs.push(
        driversInfo.filter(o => o['FullName'] == name)[0]['DriverID']
      )
    })

    driversDriversSelected['Primary']['DriverID'] ||= arrayGetRandom(driversDriversIDs)
    driversDriversSelected['Primary']['SeasonID'] ||= driversDefaultSeason
    driversDriversSelected['Primary']['Label'] ||= driversDefaultSeason
    
  }
  
}


function driversDefineSecondaryDriver() {

  if (glVDrivers['SecondaryDriverDefine']) {

    glVDrivers['SecondaryDriverDefine'] = false

    driversDriversSelected['Secondary']['DriverID'] = arrayGetRandom(
      driversDriversIDs, driversDriversSelected['Primary']['DriverID']
    )

    driversDriversSelected['Secondary']['SeasonID'] ||= driversDefaultSeason
    driversDriversSelected['Secondary']['Label'] ||= driversDefaultSeason

  }
  
}

































function driversFirstLoad() {

  // glVGlobal['FirstLoad'] = false

  // clear globals
  glVDrivers = {
    'Page': null,
    'PrimaryDriverDefine': true,
    'SecondaryDriverDefine': true,
    'FirstLoad': true
  }

  glVTables = {
    'SeasonID': null,
    'SeasonIDDefault': 'Все сезоны',
    'SprintIndex': null,
    'SprintIndexDefault': 2,
    'Category': null,
    'CategoryDefault': 'Относительные показатели',
    'FirstLoad': true,
    'ClickedColumn': null,
    'ClickedColumnAscending': null
  }

}


function driversTablesFirstLoad() {

  glVTables['FirstLoad'] = false

  driversTable1SeasonIDs = data_4.map(d => d['SeasonID'])
  driversTable1SeasonIDs = dropDuplicates(driversTable1SeasonIDs)
  driversTable1SeasonIDs = sortArrayString(driversTable1SeasonIDs, ascending=false)
  
  if (driversTable1SeasonIDs[0] == 'Все сезоны') { driversTable1SeasonIDs = driversTable1SeasonIDs.reverse() }

  let condition1 = (o) => (o['SeasonID'] == glVTables['SeasonID']) && (o['SprintIndex'] == glVTables['SprintIndex'])
  data_4 = data_4.filter(o => condition1(o))

}


function updateDriversCharacterisitcsPage(kind) {

  updateUnits()

  if (kind == 'first') { driversFirstLoad() }

  glVGlobal['Segment'] = driversSegmentID
  glVGlobal['Page'] = driversCharcterisiticsPageID

  // define primary DriverID if necessary
  driversDefinePrimaryDriver()

  // update primary path
  driversUpdatePrimaryPath(driversDriversSelected['Primary']['DriverID'])

  let dataPaths = [d3.csv(driversDataPrimaryPath)]

  Promise.all(dataPaths).then(function(files) {
    
    data_3_primary = files[0]

    getElement(driversContentContainerID).innerHTML = ''
    getElement(driversContentContainerID).innerHTML += pageDriversCharacteristics

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerDriversCharacteristicsID).classList.add('smooth-appear-fast')
    // }

    // filter SprintIndex
    driversPrimaryDataSprintUpdate(driversDefaultSprintIndex)

    // filter current season/team data and driver paramters
    driversPrimaryDriverParametersUpdate(
      driversDriversSelected['Primary']['SeasonID'],
      driversDriversSelected['Primary']['Label']
    )

    // primary bio fill
    driversBioFill(driversDriversSelected['Primary']['DriverID'])

    // fill dropdown with year primary
    dropdown31Fill()
    dropdown32Fill()

    dropdownNoBorderMakeActive(
      dropdown31MenuID, dropdown31CaretID,
      [getElement(dropdown31ID)],
      [document, getElement(dropdown32ID)])

    dropdownNoBorderMakeActive(
      dropdown32MenuID, dropdown32CaretID,
      [getElement(dropdown32ID)],
      [document, getElement(dropdown31ID)])

    // fill characteristics
    driversPrimaryCharacteristicsUpdate(
      driversDriversSelected['Primary']['SeasonID'],
      driversDriversSelected['Primary']['Label'],
      driversDriversSelected['Primary']['Color']
    )

    driversUpdateLinestyles()

    driversUpdateChartsPrimary(
      containerPent='chart-pent-1',
      driverIDsList=[driversDriversSelected['Primary']['DriverID']],
      listWData=[data_3_primary_season],
      colorsList=[driversDriversSelected['Primary']['Color']],
      linestyles=driversChartPentagon1Linestyles,
    )

    glVDrivers['FirstLoad'] = false
    glVGlobal['FirstLoad'] = false

    pageContainerScrollTop()

    globalMenuPagesHide()
    driversAppearElements(glVGlobal['Page'])
    appearElement(driversMainContainerID)
    
    }).catch(function(err) {
    // handle error here
  })

}


function updateDriversComparisonPage(kind) {

  updateUnits()

  if (kind == 'first') { driversFirstLoad() }

  glVGlobal['Segment'] = driversSegmentID
  glVGlobal['Page'] = driversComparisonPageID

  // define drivers if necessary
  driversDefinePrimaryDriver()
  driversDefineSecondaryDriver()

  // update paths
  driversUpdatePrimaryPath(driversDriversSelected['Primary']['DriverID'])
  driversUpdateSecondaryPath(driversDriversSelected['Secondary']['DriverID'])

  let dataPaths = [d3.csv(driversDataPrimaryPath), d3.csv(driversDataSecondaryPath)]

  Promise.all(dataPaths).then(function(files) {

    data_3_primary = files[0]
    data_3_secondary = files[1]

    getElement(driversContentContainerID).innerHTML = ''
    getElement(driversContentContainerID).innerHTML += pageDriversComparison

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerDriversComparisonID).classList.add('smooth-appear-fast')
    // }

    // filter SprintIndex
    driversPrimaryDataSprintUpdate(driversDefaultSprintIndex)
    driversSecondaryDataSprintUpdate(driversDefaultSprintIndex)

    // filter current season data
    driversPrimaryDriverParametersUpdate(
      driversDriversSelected['Primary']['SeasonID'],
      driversDriversSelected['Primary']['Label']
    )
    
    driversSecondaryDriverParametersUpdate(
      driversDriversSelected['Secondary']['SeasonID'],
      driversDriversSelected['Secondary']['Label']
    )

    // fill dropdowns
    dropdown33Fill()
    dropdown34Fill()
    dropdown35Fill()
    dropdown36Fill()

    // dropdowns make active
    dropdownNoBorderMakeActive(
      dropdown33MenuID, dropdown33CaretID,
      [getElement(dropdown33ID)],
      [document, getElement(dropdown34ID), getElement(dropdown35ID),
       getElement(dropdown36ID)])

    dropdownNoBorderMakeActive(
      dropdown34MenuID, dropdown34CaretID,
      [getElement(dropdown34ID)],
      [document, getElement(dropdown33ID), getElement(dropdown35ID),
        getElement(dropdown36ID)])

    dropdownNoBorderMakeActive(
      dropdown35MenuID, dropdown35CaretID,
      [getElement(dropdown35ID)],
      [document, getElement(dropdown33ID), getElement(dropdown34ID),
        getElement(dropdown36ID)])

    dropdownNoBorderMakeActive(
      dropdown36MenuID, dropdown36CaretID,
      [getElement(dropdown36ID)],
      [document, getElement(dropdown33ID), getElement(dropdown34ID),
        getElement(dropdown35ID)])

    // update badges
    driversComparePrimaryBadgeUpdate()
    driversCompareSecondaryBadgeUpdate()

    let pentagonDrivers = [
      data_3_primary_season['DriverID'],
      data_3_secondary_season['DriverID']
    ]
    
    let pentagonData = [
      data_3_primary_season,
      data_3_secondary_season
    ]
    
    let pentagonColors = [
      driversDriversSelected['Primary']['Color'],
      driversDriversSelected['Secondary']['Color']
    ]

    // update linestyles
    driversUpdateLinestyles()

    // update charts
    driversUpdateChartsCompare(
      containerPent='chart-pent-2',
      containerLine='chart-drivers-compare',
      driverIDsList=pentagonDrivers,
      listWData=pentagonData,
      colorsList=pentagonColors,
      linestyles=driversChartPentagon1Linestyles
    )

    // glVGlobal['FirstLoad'] = false

    pageContainerScrollTop()

    globalMenuPagesHide()
    driversAppearElements(glVGlobal['Page'])
    appearElement(driversMainContainerID)

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateDriversTablesPage(kind) {

  updateUnits()

  if (kind == 'first') { driversFirstLoad() }

  glVGlobal['Segment'] = driversSegmentID
  glVGlobal['Page'] = driversTablesPageID

  glVTables['SeasonID'] ||= glVTables['SeasonIDDefault']
  glVTables['SprintIndex'] ||= glVTables['SprintIndexDefault']
  glVTables['Category'] ||= glVTables['CategoryDefault']

  driversUpdateTablesPath()

  let dataPaths = [d3.csv(driversTablesDataPath)]

  Promise.all(dataPaths).then(function(files) {

    data_4 = files[0]

    getElement(driversContentContainerID).innerHTML = ''
    getElement(driversContentContainerID).innerHTML += pageDriversTables

    // if (glVGlobal['FirstLoad'] == false) {
    //   getElement(containerDriversTablesID).classList.add('smooth-appear-fast')
    // }

    // first load - define ids and then filter by sprint index and seasonID
    if (glVTables['FirstLoad']) { driversTablesFirstLoad() }

    // define columns
    driversTable1ParametersByCategoryUpdate()

    // filter data
    driversTablesDataFilter()

    driversTable1MetricCategories = Object.keys(driversTablesTable1Data)

    dropdown38Fill()
    dropdown37Fill()
 
    dropdownMakeActive(
      dropdown38MenuID,
      [getElement(dropdown38ID)],
      [document, getElement(dropdown37ID)])

    dropdownMakeActive(
      dropdown37MenuID,
      [getElement(dropdown37ID)],
      [document, getElement(dropdown38ID)])

    let clickedColumn = glVTables['ClickedColumn']

    // click clicked columns
    if (clickedColumn) {

      sortTable31(
        data_4_filtered,
        clickedColumn,
        glVTables['ClickedColumnAscending']
      )

      driversTablesTable31Activate(
        clickedColumn,
        classListAdd=['sorted-false'],
        classListRemove=['sorted-true'])
      
    } else {
      driversResetTable1(data_4_filtered)
    }
    
    window.onresize = () => {

      if (glVGlobal['Page'] == driversTablesPageID) {

        updateUnits()
        updateThemeColors()
  
        if (glVTables['ClickedColumn']) {
  
          let clickedColumn = glVTables['ClickedColumn']
  
          sortTable31(data_4_filtered, clickedColumn, glVTables['ClickedColumnAscending'])
  
          driversTablesTable31Activate(
            clickedColumn,
            classListAdd=['sorted-false'],
            classListRemove=['sorted-true'])
            
        } else {
          driversResetTable1(data_4_filtered)
        }
        
      }
      
    }

    // glVGlobal['FirstLoad'] = false

    // getElement(driversContentContainerID).scrollTop = scrollPosition
    pageContainerScrollTop()

    globalMenuPagesHide()
    driversAppearElements(glVGlobal['Page'])
    appearElement(driversMainContainerID)

    }).catch(function(err) {
    // handle error here
  })
  
}


function updateDriversPages(page, kind) {

  let dataPaths = [d3.csv(pathDrivers + 'drivers.csv')]

  Promise.all(dataPaths).then(function(files) {

    driversInfo = files[0]

    driversDriversNames = driversInfo.map(d => d['FullName']).sort()

    if (page == driversCharcterisiticsPageID) {
      updateDriversCharacterisitcsPage(kind)
    }
      
    else if (page == driversComparisonPageID) {
      updateDriversComparisonPage(kind)
    }
      
    else if (page == driversTablesPageID) {
      updateDriversTablesPage(kind)
    }

    }).catch(function(err) {
  // handle error here
  })
  
}




























