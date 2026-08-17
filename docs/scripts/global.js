window.addEventListener('load', (event) => {

  startGlobal()
  
})


function findComponentBySegment(segment, routes) {

  let result = routes.filter(o => o['segment'] == segment)[0]['component']

  return result
  
}


function globalHeaderButtonMenuClickActivate() {

  let button = getElement(globalHeaderMenuButtonID)
  
  let menuContainer = getElement(globalHeaderMenuContainerID)
  let headerContainer = getElement(clickaAreaHorizontalMenuID)

  button.addEventListener('mouseup', (event) => {
    
    event.stopPropagation()
    
    // caret.classList.toggle('dropdown-caret-up')
    
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


function globalHeaderMenuSandwichOpened(
    sandwich,
    sandwichLine1, sandwichLine2, sandwichLine3,
    sandwichLine4, sandwichLine5
  ) {

  // sandwichLine1.setAttribute('d', 'M 8 6 L 16 14')
  // sandwichLine2.setAttribute('d', 'M 12 10 L 12 10')
  // sandwichLine3.setAttribute('d', 'M 8 14 L 16 6')

  sandwichLine1.classList.add('hidden')
  sandwichLine2.classList.add('hidden')
  sandwichLine3.classList.add('hidden')

  sandwich.style.width = '1.25rem'
  sandwich.style.height = '1rem'

  sandwichLine4.classList.remove('hidden')
  sandwichLine5.classList.remove('hidden')

}


function globalHeaderMenuSandwichClosed(
    sandwich,
    sandwichLine1, sandwichLine2, sandwichLine3,
    sandwichLine4, sandwichLine5
  ) {

  // sandwichLine1.setAttribute('d', 'M 2 4 L 22 4')
  // sandwichLine2.setAttribute('d', 'M 2 10 L 22 10')
  // sandwichLine3.setAttribute('d', 'M 2 16 L 22 16')

  sandwichLine4.classList.add('hidden')
  sandwichLine5.classList.add('hidden')

  sandwich.style.width = ''
  sandwich.style.height = ''

  sandwichLine1.classList.remove('hidden')
  sandwichLine2.classList.remove('hidden')
  sandwichLine3.classList.remove('hidden')

}


function globalHeaderButtonMenuHoverActivate() {

  let button = getElement(globalHeaderMenuButtonID)
  let sandwich = getElement(globalHeaderMenuImgID)
  
  let sandwichLine1 = getElement(globalHeaderMenuImg1ID)
  let sandwichLine2 = getElement(globalHeaderMenuImg2ID)
  let sandwichLine3 = getElement(globalHeaderMenuImg3ID)
  let sandwichLine4 = getElement(globalHeaderMenuImg4ID)
  let sandwichLine5 = getElement(globalHeaderMenuImg5ID)
  
  // let caret = getElement(globalHeaderMenuCaretID)
  // let buttonClose = getElement(mainMenuCloseIconID)

  let menuContainer = getElement(globalHeaderMenuContainerID)
  let headerContainer = getElement(clickaAreaHorizontalMenuID)
  let menuHorizontalLine = getElement(clickaAreaHorizontalMenuBottomLineID)

  // open menu
  button.addEventListener('mouseenter', (event) => {

    globalHeaderMenuSandwichOpened(
      sandwich,
      sandwichLine1, sandwichLine2, sandwichLine3,
      sandwichLine4, sandwichLine5
    )

    menuContainer.classList.add(globalMenuHeaderShowClass)
    menuContainer.classList.add('opened')

    menuHorizontalLine.classList.add('ujptft-opened')

    document.body.classList.add('o-hidden')
    
  })

  // close menu leaving menu
  menuContainer.addEventListener('mouseleave', (event) => {

    let mouseCoordY = event.pageY
    let mouseCoordX = event.pageX
    
    let containerSizes = getSizes(menuContainer)

    // let menuContainerTop = containerSizes.top
    // let menuContainerRight = containerSizes.right
    let menuContainerBottom = containerSizes.bottom
    // let menuContainerLeft = containerSizes.left

    let confidenceDelta = px3

    // let condTop = (mouseCoordY <= menuContainerTop)
    // let condRight = (mouseCoordX <= menuContainerRight)
    let condBottom = (mouseCoordY + confidenceDelta >= menuContainerBottom + window.scrollY)
    // let condLeft = (mouseCoordX >= menuContainerLeft)

    if (condBottom) {

      globalHeaderMenuSandwichClosed(
        sandwich,
        sandwichLine1, sandwichLine2, sandwichLine3,
        sandwichLine4, sandwichLine5
      )
      
      globalMenuPagesHide()
      
      menuHorizontalLine.classList.remove('ujptft-opened')

      document.body.classList.remove('o-hidden')
      
    }

  })

  // close menu clicking button
  button.addEventListener('mouseup', (event) => {

    if (menuContainer.classList.contains('opened')) {
      
      globalHeaderMenuSandwichClosed(
        sandwich,
        sandwichLine1, sandwichLine2, sandwichLine3,
        sandwichLine4, sandwichLine5
      )
      
    } else {
      
      globalHeaderMenuSandwichOpened(
        sandwich,
        sandwichLine1, sandwichLine2, sandwichLine3,
        sandwichLine4, sandwichLine5  
      )
      
    }

    menuContainer.classList.toggle(globalMenuHeaderShowClass)
    menuContainer.classList.toggle('opened')

    menuHorizontalLine.classList.toggle('ujptft-opened')

    document.body.classList.toggle('o-hidden')
    
  })
  
}


function globalHeaderButtonMainPageActivate() {

  let button = getElement(mainMainPageButtonID)

  button.addEventListener('mouseup', (event) => {

    globalHideBlurScreen()

    window.onresize = null

    getElement(guide1ID).classList.add('guide-condition')

    glVGlobal['Segment'] = mainSegmentID
    glVGlobal['Page'] = mainTitlePageID

    globalMenuPagesDeactivateButton(globalHeaderMenuClickedButtonID)

    let pageContainer = getElement(pageContainerID)

    let component = findComponentBySegment(mainSegmentID, globalRoutes)
    pageContainer.innerHTML = component.render()

    location = '#' + mainTitlePagePath
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

  // let guide = getElement(guide1ID)
  let closeButton = getElement(guideCloseIconID)
  
  closeButton.addEventListener('mouseup', (event) => {

    // not overflow body
    document.body.classList.remove('o-hidden')

    // guide.classList.add('guide-condition')

    globalGuideClose()

  })
  
}


function globalGuideClose() {

  let guide = getElement(guide1ID)
  guide.classList.add('guide-condition')
  
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
  let headerContainer = getElement(clickaAreaHorizontalMenuID)
  let menuHorizontalLine = getElement(clickaAreaHorizontalMenuBottomLineID)
  
  let button = getElement(globalHeaderMenuButtonID)
  let sandwich = getElement(globalHeaderMenuImgID)

  let sandwichLine1 = getElement(globalHeaderMenuImg1ID)
  let sandwichLine2 = getElement(globalHeaderMenuImg2ID)
  let sandwichLine3 = getElement(globalHeaderMenuImg3ID)
  let sandwichLine4 = getElement(globalHeaderMenuImg4ID)
  let sandwichLine5 = getElement(globalHeaderMenuImg5ID)

  if (menuContainer.classList.contains('opened')) {

    globalHeaderMenuSandwichClosed(
      sandwich,
      sandwichLine1, sandwichLine2, sandwichLine3,
      sandwichLine4, sandwichLine5
    )

    menuContainer.classList.remove(globalMenuHeaderShowClass)
    menuContainer.classList.remove('opened')

    document.body.classList.remove('o-hidden')

    // headerContainer.classList.remove('j7kkjj-border-menu-opened')
    menuHorizontalLine.classList.remove('ujptft-opened')
    
  }

}


function globalMenuPagesDeactivateButton(buttonID) {

  let button = getElement(buttonID)

  if (button) {

    let svgID = buttonID + '-svg'
    let svg = getElement(svgID)

    button.classList.remove('clicked')
    svg.classList.remove('active')
    
  }
  
}


function globalMenuPagesActivateButton(buttonID) {

  let button = getElement(buttonID)
  
  if (button) {

    globalMenuPagesDeactivateButton(globalHeaderMenuClickedButtonID)

    let svgID = buttonID + '-svg'
    let svg = getElement(svgID)

    button.classList.add('clicked') 
    svg.classList.add('active')

    globalHeaderMenuClickedButtonID = buttonID

  }
  
}


function globalMenuPagesSelection(segment, page, buttonID) {

  // if no buttonID - try to define
  if (!buttonID) {

    let mainMenu = getElement(globalHeaderMenuID)
    let selectButton = getElementsListByAttribute('page', page, mainMenu)

    if (selectButton.length > 0) {
      selectButton = selectButton[0]
      buttonID = selectButton.id
    }
    
  }

  // if buttonID defined after try
  if (buttonID) {
    globalMenuPagesActivateButton(buttonID)
  }

}


function globalDisappearMainContainer(segment) {

  if (segment == mainSegmentID) {

    disappearElement(mainMainContainerID)
    
  } else if (segment == seasonSegmentID) {

    disappearElement(seasonMainContainerID)
    
  } else if (segment == eventSegmentID) {
    
    disappearElement(eventMainContainerID)
    
  } else if (segment == driversSegmentID) {
    
    disappearElement(driversMainContainerID)
    
  }

}


function globalMenuPagesActivate() {

  globalHeaderMenuButtonsIDs.forEach((id, i) => {

    let button = getElement(id)

    button.addEventListener('mouseup', (event) => {

      globalHideBlurScreen()

      window.onresize = null
      scrollPosition = 0

      let buttonNotClicked = !button.classList.contains('clicked')

      if (buttonNotClicked) {

        event.stopPropagation()

        let segment = button.getAttribute('segment')
        let page = button.getAttribute('page')
        let component
        let kind

        let currentLocation = button.getAttribute('location')
        location = '#' + currentLocation
  
        // activate menu item
        globalMenuPagesSelection(segment, page, id)

        // if change segment
        if (segment != glVGlobal['Segment']) {

          // let currentComponent = button.getAttribute('segment')
          let pageContainer = getElement(pageContainerID)
          
          component = findComponentBySegment(segment, globalRoutes)
          pageContainer.innerHTML = component.render()

          kind = 'segment'
  
        } else {
  
          kind = 'page'
          
        }
  
        // update globals
        glVGlobal['Segment'] = segment
        glVGlobal['Page'] = page

        globalDisappearMainContainer(segment)
        globalUpdateFullPageB(component, segment, page, render=false, kind=kind)
        
      }
      
    })
    
  })
  
}


function menuYearsFill(menuID, seasonIDs, title=null) {

  // item attributes
  let itemAttributes = {
    // 'index': 'index',
    'seasonID': seasonIDs
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': menuID,
    'items': seasonIDs,
    'attributes': itemAttributes,
    'width': true,
    'border': true,
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)

  // title
  let titleEl = getElement(menuID + '-title')
  let titleValue = title ?? lastElement(seasonIDs)
  titleEl.textContent = titleValue

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
    // globalMenuPagesHide()

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
  let threshold = px100

  // element show/hide
  window.addEventListener('scroll', (event) => {

  let scrollTop = window.pageYOffset || document.documentElement.scrollTop
  let thresholdCondition = scrollTop > threshold
    
  // let pageCondition = globalScrollTopButtonAppearsOnPagesList.includes(page)
  
  if (thresholdCondition) {
    element.classList.add('hh6m79-visible')
  } else {
    element.classList.remove('hh6m79-visible')
  }
    
  })

  // element activate
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
  
}





function globalNextEventCountdown(elementID) {

  let now = new Date()

  // to last year - remove
  now = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  )

  now = now.getTime()

  let diff = targetDate - now

  // 3. Check if the countdown is finished
  if (diff < 0) {
    clearInterval(timerInterval);
    document.getElementById(elementID).innerHTML = "The event has arrived!";
    return;
  }

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // 5. Output the result into the HTML element
  document.getElementById(elementID).innerHTML = 
    `${days} дня ${hours}:${minutes}:${seconds}s`;
  
}


function globalNextEventCountdownActivate(calendar) {

  // id of element with time
  // let elementID = 

  let now = new Date()

  // to last year - remove
  now = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  )

  let calendarFuture = calendar.filter(o => new Date(o['RaceTime']) > now)

  let eventNext

  if (calendarFuture.length > 0) {
    eventNext = calendarFuture[0]
  }

  targetDate = new Date(eventNext['RaceTime']).getTime()

  globalNextEventCountdown(elementID)

  setInterval(() => {
    globalNextEventCountdown(elementID)
  }, 1000)
  
}


function globalThemeTogglerActivate() {

  let button = getElement(mainChangeThemeButtonID)

  button.addEventListener('mouseup', (event) => {

    // get current theme
    let currentTheme = document.documentElement.getAttribute('data-theme')

    // change theme variable
    themeCurrent = (currentTheme === 'dark') ? 'light' : 'dark'

    // set new theme
    document.documentElement.setAttribute('data-theme', themeCurrent);

    // save to loca storage
    localStorage.setItem('theme', themeCurrent)

    // update colors
    variablesUpdateThemeColors(themeCurrent)

  })
  
}


function globalMangeTheme() {

  // get theme
  themeCurrent = localStorage.getItem('theme') || 'light'

  // apply to website
  document.documentElement.setAttribute('data-theme', themeCurrent)

  // save to loca storage
  localStorage.setItem('theme', themeCurrent)

  // update colors
  variablesUpdateThemeColors(themeCurrent)
  
}







































function globalUpdateFullPageB(component, segment, page, render, kind) {

  if (render) {

    let pageContainer = getElement(pageContainerID)
    pageContainer.innerHTML = component.render()
    
  }
  
  if (segment == mainSegmentID) {

    updateMainPages(page, kind=kind)

  } else if (segment == seasonSegmentID) {

    seasonLoadPages(page, kind=kind)

  } else if (segment == eventSegmentID) {

    eventLoadPages(page, kind=kind)

  } else if (segment == driversSegmentID) {

    driversLoadPages(page, kind=kind)
    
  }
  
}


function startGlobal(firstLoad) {

  updateUnits()
  globalMangeTheme()

  Promise.all([
    d3.csv(pathCalendar + 'calendar.csv'),
    d3.csv(pathTables + 'teams.csv'),
    d3.csv(pathTables + 'drivers.csv'),
    d3.csv(pathTables + 'colors.csv'),
    d3.csv(pathTables + 'nations.csv'),
    d3.csv(pathTables + 'events.csv'),
    d3.csv(pathTables + 'drivers-part.csv'),
    // d3.csv(pathSeasonData + 'data_2.csv'),
    ]).then(function(files) {

    calendar = files[0]
    teams = files[1]
    drivers = files[2]
    colors = files[3]
    nations = files[4]
    events = files[5]
    drivers_part = files[6]

    seasonIDs = calendar.map(d => d['SeasonID'])
    seasonIDs = dropDuplicates(seasonIDs)

    let currentLocation = getLocation()
    let routesFiltered = globalRoutes.filter(o => o['path'] == currentLocation)[0]

    let component = routesFiltered['component']
    let segment = routesFiltered['segment']
    let page = routesFiltered['page']

    // activate countdown
    // globalNextEventCountdownActivate(events)

    // select page
    globalMenuPagesSelection(segment, page)

    // activate menu header
    if (mobileDevice) {
      globalHeaderButtonMenuClickActivate()
    } else {
      globalHeaderButtonMenuHoverActivate()
    }

    // activate menu buttons
    globalMenuPagesActivate()

    // activate scrol top element
    globalScrollTopElementActivate()

    // change theme toggler activate
    globalThemeTogglerActivate()

    globalUpdateFullPageB(component, segment, page, render=true, kind='segment')

    }).catch(function(err) {
  // handle error here
  })

}





















