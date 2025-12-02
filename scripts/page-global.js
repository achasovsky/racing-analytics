

window.addEventListener('load', (event) => { startGlobal() })


function globalUpdateFullPageByLocation(page) {

  let pageContainer = getElement(pageContainerID)

  currentLocation = getLocation()

  const { component = ErrorComponent } = findComponentByPath(currentLocation, routesDict) || {}
  pageContainer.innerHTML = component.render()

  if (currentLocation == routeMain) {

    updateEventPages(page, kind='first')

  } else if (currentLocation == routeSeason) {

    updateSeasonPages(page, kind='first')

  } else if (currentLocation == routeEvent) {

    updateEventPages(page, kind='first')

  } else if (currentLocation == routeDrivers) {

    updateDriversPages(page, kind='first')
    
  }
  
}


function globalHeaderButtonMenuClickActivate() {

  let button = getElement(globalHeaderMenuButtonID)
  let caret = getElement(globalHeaderMenuCaretID)
  
  let menuContainer = getElement(globalHeaderMenuContainerID)
  let headerContainer = getElement(clickaAreaHorizontalMenuID)

  button.addEventListener('mouseup', (event) => {
    
    event.stopPropagation()
    
    caret.classList.toggle('dropdown-caret-up')
    
    menuContainer.classList.toggle(globalMenuHeaderShowClass)
    menuContainer.classList.toggle('opened')
    
  })

  document.addEventListener('mouseup', (event) => {

    let element = event.target

    if ((!menuContainer.contains(element)) && (!headerContainer.contains(element))) {

      globalMenuPagesHide()
      
    }
    
  })
  
}


function globalHeaderButtonMenuHoverActivate() {

  let button = getElement(globalHeaderMenuButtonID)
  let caret = getElement(globalHeaderMenuCaretID)

  let menuContainer = getElement(globalHeaderMenuContainerID)
  let headerContainer = getElement(clickaAreaHorizontalMenuID)

  // open menu
  button.addEventListener('mouseenter', (event) => {
    
    caret.classList.add('dropdown-caret-up')
    menuContainer.classList.add(globalMenuHeaderShowClass)

    menuContainer.classList.add('opened')

    getElement(clickaAreaHorizontalMenuID).classList.add('j7kkjj-border-menu-opened')
    
  })

  // close menu
  menuContainer.addEventListener('mouseleave', (event) => {

    let mouseTop = event.pageY
    let menuContainerBottom = getSizes(menuContainer).bottom

    if (mouseTop >= menuContainerBottom) {
      
      globalMenuPagesHide()
      getElement(clickaAreaHorizontalMenuID).classList.remove('j7kkjj-border-menu-opened')
      
    }

  })

  button.addEventListener('mouseup', (event) => {

    caret.classList.toggle('dropdown-caret-up')
    menuContainer.classList.toggle(globalMenuHeaderShowClass)

    menuContainer.classList.toggle('opened')

    getElement(clickaAreaHorizontalMenuID).classList.toggle('j7kkjj-border-menu-opened')
    
  })
  
}


function globalHeaderButtonMainPageActivate() {

  let button = getElement(mainMainPageButtonID)

  button.addEventListener('mouseup', (event) => {

    window.onresize = null

    getElement(guide1ID).classList.add('guide-condition')

    glVGlobal['Segment'] = mainSegmentID
    glVGlobal['Page'] = mainTitlePageID

    globalMenuPagesClear()

    let pageContainer = getElement(pageContainerID)
        
    const { component = ErrorComponent } = findComponentByPath(routeMain, routesDict) || {}
    pageContainer.innerHTML = component.render()

    location = '#' + routeMain
    kind = 'first'

    updateMainPages(glVGlobal['Page'], kind)
    
  })
  
}


function globalHeaderButtonGuideActivate() {

  let guide = getElement(guide1ID)

  // open/close menu element
  let menuButton = getElement(guide1OpenCloseButtonID)

  menuButton.addEventListener('mouseup', (event) => {

    // not overflow body
    document.body.classList.toggle('o-hidden')

    // close menu if opened
    globalMenuPagesHide()

    // close language menu if opened
    globalHideLanguageMenu()
    
    // scroll guide to start
    getElement(guide1OverflowContainerID).scrollTop = 0
    getElement(guide1TocOverflowContainerID).scrollTop = 0
    
    guide.classList.toggle('guide-condition')
    
  })

  globalGuideCloseButtonActivate()

  globalGuideTOCActivate()
  
}


function globalGuideCloseButtonActivate() {

  let guide = getElement(guide1ID)
  let closeButton = getElement(guideCloseIconID)
  
  closeButton.addEventListener('mouseup', (event) => {

    // not overflow body
    document.body.classList.remove('o-hidden')

    guide.classList.add('guide-condition')

  })
  
}


function globalGuideTOCActivate() {

  // guide menu elements
  let guideToc = getElement(guide1TocID)
  
  guideToc.addEventListener('mouseup', (event) => {

    let element = event.target
    let elementID = element.id
    
    if (elementID.includes(guide1TocButtonID)) {

      let scrollContainer = getElement(guide1OverflowContainerID)
      
      let scrollTarget = getElement(element.getAttribute('scrollTarget'))
      let scrollY = scrollTarget.offsetTop - scrollTarget.parentNode.offsetTop

      let scrollMarginTop = px16

      scrollContainer.scrollTo({top: scrollY - scrollMarginTop})
      
    }
    
  })

  // TOC menu select while scroll
  getElement(guide1OverflowContainerID).addEventListener('scroll', (event) => {
  
    guideDeactivateTableOfContents()
  
    let scrollTop = event.target.scrollTop
  
    let links = getElementsListByAttribute('link', 'true', getElement(guideMenu1ID))
    let anchors = getElementsListByAttribute('anchor', 'true', getElement(guide1OverflowContainerID))
  
    if (scrollTop == 0) {
  
      getElement(guide1TocButtonID + '1' + '-marker').classList.add('guide-marker-active')
      getElement(guide1TocButtonID + '1').classList.add('ibxahf-active')
      
    } else {
  
      // for all TOC titles in text (anchors)
      for (let i = anchors.length-1; i >= 0; i--) {
  
        let anchorPosition = anchors[i].getBoundingClientRect().top - event.target.getBoundingClientRect().top
        let overflowContainerHalfHeight = 0.5 * event.target.clientHeight
  
        // if anchor upper than middle of container -> active
        if (anchorPosition < overflowContainerHalfHeight) {
  
          links[i].classList.add('ibxahf-active')
  
          let marker = getElement(links[i].id + '-marker')
          if (marker) { marker.classList.add('guide-marker-active') }
  
          // if next anchor also visible -> active
          for (let j = i; j >=0; j--) {
  
            let anchorNextPosition = anchors[j].getBoundingClientRect().top - event.target.getBoundingClientRect().top
  
            if (anchorNextPosition > 0) {
              links[j].classList.add('ibxahf-active')
              if (links[j].children[0]) { links[j].children[0].classList.add('guide-marker-active') }
            }
            else { break }
            
          }
          
          break
          
        }
  
      }
      
    }
  
  })
  
}


function globalMenuPagesHide() {

  let menuContainer = getElement(globalHeaderMenuContainerID)

  if (menuContainer.classList.contains('opened')) {

    menuContainer.classList.remove(globalMenuHeaderShowClass)
    menuContainer.classList.remove('opened')
    
    getElement(globalHeaderMenuCaretID).classList.remove('dropdown-caret-up')
    
  }

}


function globalMenuPagesItemGetActiveElement(button) {

  // button - class 'u62fno'
  // active element - class 'jqmrd5'

  return button.children[0]
  
}


function globalMenuPagesClear() {

  let menu = getElement(globalHeaderMenuID)
  let buttons = getElementsListByAttribute('menuButton', '1', menu)

  buttons.forEach((button, i) => {

    button.classList.remove('clicked')
    
    let elementWithActiveBackground = globalMenuPagesItemGetActiveElement(button)

    if (elementWithActiveBackground) {
      elementWithActiveBackground.classList.remove('oavpfm-active', 'w9kkx4-active', 'ajys3w-active')
    }
    
  })
  
}


function globalMenuPagesSelection(segment, page, buttonToActivate) {

  let menu = getElement(globalHeaderMenuID)
  let buttons = getElementsListByAttribute('menuButton', '1', menu)

  let classActive

  if (segment == seasonSegmentID) {
    classActive = 'oavpfm-active'
  } else if (segment == eventSegmentID) {
    classActive = 'w9kkx4-active'
  } else if (segment == driversSegmentID) {
    classActive = 'ajys3w-active'
  }

  buttons.forEach((button, i) => {

    button.classList.remove('clicked')

    let elementWithActiveBackground = globalMenuPagesItemGetActiveElement(button)

    if (elementWithActiveBackground) {
      elementWithActiveBackground.classList.remove('oavpfm-active', 'w9kkx4-active', 'ajys3w-active')
    }
    
  })

  if (buttonToActivate) {

    let elementWithActiveBackground = globalMenuPagesItemGetActiveElement(buttonToActivate)
    elementWithActiveBackground.classList.add(classActive)

    buttonToActivate.classList.add('clicked')
    
  } else {

    let mainMenu = getElement(globalHeaderMenuID)

    let selectButton = getElementsListByAttribute('page', page, mainMenu)

    if (selectButton.length > 0) {

      selectButton = selectButton[0]

      selectButton.classList.add('clicked')

      let elementWithActiveBackground = globalMenuPagesItemGetActiveElement(selectButton)

      if (elementWithActiveBackground) {
        elementWithActiveBackground.classList.add(classActive)
      }
      
    }

  }

}


function menuPagesGetPage(element, dataKey) {

  // dict with data for dataKEy : menuPagesData

  let name = element.getAttribute('namerus')
  let data = menuPagesData[dataKey].filter(d => d['NameRus'] == name)[0]
  let page = data['Page']

  return page
  
}


function globalDisappearMainContainer(segment) {

  if (segment == seasonSegmentID) {
    
    disappearElement(seasonMainContainerID)
    
  } else if (segment == eventSegmentID) {
    
    disappearElement(eventMainContainerID)
    
  } else if (segment == driversSegmentID) {
    
    disappearElement(driversMainContainerID)
    
  }

}


function globalMenuPagesActivate() {

  let menu = getElement(globalHeaderMenuID)
  let buttons = getElementsListByAttribute('menuButton', '1', menu)

  buttons.forEach((button, i) => {

    button.addEventListener('mouseup', (event) => {

      window.onresize = null
      scrollPosition = 0

      let buttonNotClicked = !button.classList.contains('clicked')

      if (buttonNotClicked) {

        event.stopPropagation()

        let segment = button.getAttribute('segment')
        let page = button.getAttribute('page')
        let kind = null
  
        // activate menu item
        globalMenuPagesSelection(segment, page, button)
  
        // if change segment
        if (segment != glVGlobal['Segment']) {
  
          let currentLocation = button.getAttribute('location')
          let pageContainer = getElement(pageContainerID)
  
          const { component = ErrorComponent } = findComponentByPath(currentLocation, routesDict) || {}
          pageContainer.innerHTML = component.render()
  
          location = '#' + currentLocation
          kind = 'first'
  
        }
  
        // update globals
        glVGlobal['Segment'] = segment
        glVGlobal['Page'] = page

        globalDisappearMainContainer(segment)
  
        // update pages content
        if (segment == seasonSegmentID) { updateSeasonPages(page, kind) }
        else if (segment == eventSegmentID) { updateEventPages(page, kind) }
        else if (segment == driversSegmentID) { updateDriversPages(page, kind) }
        
      }
      
    })
    
  })
  
}


function menuYearsFill(menuID, itemID, seasonIDs) {

  let menu = getElement(menuID)

  menu.innerHTML = ''

  seasonIDs.forEach((id, i) => {

    let el = document.createElement('div')

    el.className = 'lq9dkz'
    el.id = itemID + '-' + id
    el.setAttribute('seasonID', id)
    el.textContent = `${id}`

    menu.appendChild(el)

  })

}


function menuYearsSelection(menuID, seasonID) {

  let menu = getElement(menuID)

  arrayFromElementChildren(menu).forEach((item, i) => {
    item.classList.remove('lq9dkz-active')

    if (item.getAttribute('seasonID') == seasonID) {
      item.classList.add('lq9dkz-active')
    }
    
  })
  
}


function themeTogglerActivate() {

  getElement('change-theme').addEventListener('mouseup', (event) => {

    if (themeCurrent == 'light') {
      
      document.documentElement.setAttribute('data-theme', 'dark')
      themeCurrent = 'dark'
      
      updateThemeColors()
      
    } else {
      
      document.documentElement.setAttribute('data-theme', 'light')
      themeCurrent = 'light'
      
      updateThemeColors()
      
    }

  })
  
}


function globalHideLanguageMenu() {

  let menu = getElement(mainMenuSelectLanguageMenuID)
  let caret = getElement(mainMenuSelectLanguageCaretID)

  if (menu.classList.contains('opened')) {

    menu.classList.add('invisible')
    caret.classList.remove('dropdown-caret-up')

    menu.classList.remove('opened')
    
  }

}


function globalLanguageMenuClickActivate() {

  let button = getElement(mainMenuSelectLanguageID)
  let menu = getElement(mainMenuSelectLanguageMenuID)
  let caret = getElement(mainMenuSelectLanguageCaretID)

  button.addEventListener('mouseup', (event) => {

    if (event.target.id != mainMenuSelectLanguageMenuID) {

      // close menu if opened
      globalMenuPagesHide()

      menu.classList.toggle('invisible')
      event.stopPropagation()
  
      caret.classList.toggle('dropdown-caret-up')

      menu.classList.toggle('opened')
      
    }
    
  })

  document.addEventListener('mouseup', (event) => {

    if (event.target.id != mainMenuSelectLanguageMenuID) {

      globalHideLanguageMenu()

    }
    
  })

}


function globalLanguageMenuHoverActivate() {

  let button = getElement(mainMenuSelectLanguageID)
  let menu = getElement(mainMenuSelectLanguageMenuID)
  let caret = getElement(mainMenuSelectLanguageCaretID)

  button.addEventListener('mouseenter', (event) => {

    // close menu if opened
    globalMenuPagesHide()

    menu.classList.remove('invisible')
    menu.classList.add('opened')

    caret.classList.add('dropdown-caret-up')

  })

  button.addEventListener('mouseleave', (event) => {

    globalHideLanguageMenu()
    
  })
  
}


function scrollTopMouseUp() {

  // document.documentElement.scrollTo({top: 0, behavior: 'smooth'})
  document.documentElement.scrollTo({top: 0, behavior: globalScrollBehavior})

}


function globalScrollTopElementActivate() {

  let element = getElement(globalScrollTopButtonID)
  // let scrollContainer = getElement(globalScrollContainerID)

  // let threshold = getElement('season-statistics-scroll-leaders').offsetTop - 5
  let threshold = px200

  // scrollContainer.addEventListener('scroll', (event) => {
  window.addEventListener('scroll', (event) => {

    // let thresholdCondition = scrollContainer.scrollTop > threshold

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    let thresholdCondition = scrollTop > threshold
    
    // let pageCondition = (
    //   (page == seasonStatistcsPageID)
    //   || (page == driversComparisonPageID)
    //   || (page == mainTitlePageID)
    // )

   let pageCondition = globalScrollTopButtonAppearsOnPagesList.includes(page)
    
    if (thresholdCondition && pageCondition) {
      element.classList.add('hh6m79-visible')
    } else {
      element.classList.remove('hh6m79-visible')
    }
    
  })

  element.addEventListener('mouseup', (event) => {
    scrollTopMouseUp()
  })

}


function guideDeactivateTableOfContents() {

  let links = getElementsListByAttribute('link', 'true', getElement(guideMenu1ID))

  for (link of links) {
    
    link.classList.remove('ibxahf-active')

    let marker = getElement(link.id + '-marker')
    if (marker) { marker.classList.remove('guide-marker-active') }

  }
  
}


function globalFillGuide() {

  getElement(guide1ID).innerHTML = ''
  getElement(guide1ID).innerHTML = pageGlobalGuide
  // getElement(guide1ID).innerHTML = pageGlobalOldGuide
  
}


function themeTogglerActivate() {

  getElement('change-theme').addEventListener('mouseup', (event) => {

    if (themeCurrent == 'light') {
      
      document.documentElement.setAttribute('data-theme', 'dark')
      themeCurrent = 'dark'
      
      updateThemeColors()
      
    } else {
      
      document.documentElement.setAttribute('data-theme', 'light')
      themeCurrent = 'light'
      
      updateThemeColors()
      
    }

  })
  
}





































function startGlobal() {

  updateUnits()

  Promise.all([
    d3.csv(pathEvents + 'events.csv'),
    // d3.csv(pathSeasonData + 'data_2.csv'),
    ]).then(function(files) {

    events = files[0]

    seasonIDs = events.map(d => d['SeasonID'])
    seasonIDs = dropDuplicates(seasonIDs)

    let currentLocation = getLocation()

    let segment = routesDict.filter(o => o['path'] == currentLocation)[0]['segment']
    let page

    if (segment == mainSegmentID) {
      
      page = eventRatingPageID
    
    }
    else if (segment == seasonSegmentID) {
      
      page = seasonStatistcsPageID
      // page = seasonRatingsPageID
      // page = seasonComparisonPageID
    
    }
    else if (segment == eventSegmentID) {

      page = eventRatingPageID
      // page = eventCategoriesPageID
      // page = eventComparisonPageID
      // page = eventPacePageID
      
    } else if (segment == driversSegmentID) {
      
      page = driversCharcterisiticsPageID
      // page = driversComparisonPageID
      // page = driversTablesPageID
      
    }

    // select page
    globalMenuPagesSelection(segment, page)

    // activate menu header
    if (mobileDevice) {
      globalHeaderButtonMenuClickActivate()
    } else {
      globalHeaderButtonMenuHoverActivate()
    }

    // activate pages menu
    globalMenuPagesActivate()

    // activate scrol top element
    globalScrollTopElementActivate()

    updateThemeColors()

    globalUpdateFullPageByLocation(page)

    }).catch(function(err) {
  // handle error here
  })

}





















