

window.addEventListener('load', (event) => {
  
  startGlobal()
  
})



function findComponentBySegment(segment, routes) {

  let result = routes.filter(o => o['segment'] == segment)[0]['component']

  return result
  
}


function globalHeaderButtonMenuClickActivate() {

  let button = getElement(globalHeaderMenuButtonID)
  // let caret = getElement(globalHeaderMenuCaretID)
  
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

  globalUpdateHeaderLogo()

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

  // // close menu leaving header
  // headerContainer.addEventListener('mouseleave', (event) => {

  //   let mouseCoordY = event.pageY
  //   let mouseCoordX = event.pageX

  //   let confidenceDelta = px3
    
  //   let condTop = (mouseCoordY - confidenceDelta < window.scrollY)


  //   if (condTop) {

  //     globalHeaderMenuSandwichClosed(
  //       sandwich,
  //       sandwichLine1, sandwichLine2, sandwichLine3,
  //       sandwichLine4, sandwichLine5
  //     )
      
  //     globalMenuPagesHide()
      
  //     menuHorizontalLine.classList.remove('ujptft-opened')

  //     document.body.classList.remove('o-hidden')
      
  //   }
    
  // })

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

    window.onresize = null

    getElement(guide1ID).classList.add('guide-condition')

    glVGlobal['Segment'] = mainSegmentID
    glVGlobal['Page'] = mainTitlePageID

    globalMenuPagesClear()

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


function globalMenuPagesClear() {

  let menu = getElement(globalHeaderMenuID)
  let buttons = getElementsListByAttribute('menuButton', '1', menu)

  buttons.forEach((button, i) => {

    button.classList.remove('clicked')
    button.classList.remove('oavpfm-active', 'w9kkx4-active', 'ajys3w-active')
    
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
    button.classList.remove('oavpfm-active', 'w9kkx4-active', 'ajys3w-active')
    
  })

  if (buttonToActivate) {

    buttonToActivate.classList.add(classActive)
    buttonToActivate.classList.add('clicked')
    
  } else {

    let mainMenu = getElement(globalHeaderMenuID)

    let selectButton = getElementsListByAttribute('page', page, mainMenu)

    if (selectButton.length > 0) {

      selectButton = selectButton[0]
      selectButton.classList.add('clicked')
      selectButton.classList.add(classActive)
      
    }

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
        let component
        let kind

        let currentLocation = button.getAttribute('location')
        location = '#' + currentLocation
  
        // activate menu item
        globalMenuPagesSelection(segment, page, button)

        // if change segment
        if (segment != glVGlobal['Segment']) {

          // let currentComponent = button.getAttribute('segment')
          let pageContainer = getElement(pageContainerID)
          
          component = findComponentBySegment(segment, globalRoutes)
          pageContainer.innerHTML = component.render()

          kind = 'first'
  
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


function menuYearsFill(menuID, seasonIDs) {

  // item attributes
  let itemAttributes = {
    'index': 'index',
    'class': 'lq9dkz',
    'seasonID': seasonIDs
  }

  // dropdown attributes
  let dropdownAttributes = {
    'dropdownID': menuID,
    'items': seasonIDs,
    'attributes': itemAttributes,
    'width': true,
    'border': true,
    'itemID': menuYears21ItemID
  }

  // fill menu
  dropdownMenuFill(dropdownAttributes)
  
}


function menuYearsFill1(menuID, seasonIDs) {

  // // item attributes
  // let itemAttributes = {
  //   'index': 'index',
  //   'class': 'lq9dkz',
  //   'seasonID': seasonIDs
  // }

  // // dropdown attributes
  // let dropdownAttributes = {
  //   'dropdownID': menuID,
  //   'items': seasonIDs,
  //   'attributes': itemAttributes,
  //   'width': true,
  //   'border': true,
  // }

  // // fill menu
  // dropdownMenuFill(dropdownAttributes)

  // menu.innerHTML = ''

  // seasonIDs.forEach((id, i) => {

  //   let el = document.createElement('div')

  //   el.className = 'lq9dkz'
  //   el.id = itemID + '-' + id
  //   el.setAttribute('seasonID', id)
  //   el.textContent = `${id}`

  //   menu.appendChild(el)

  // })

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
  let threshold = px200

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


function globalThemeTogglerActivate() {

  let button = getElement(mainChangeThemeButtonID)
  let icon = getElement(mainChangeThemeIconID)

  icon.src = `img/mode-${themeCurrent}.svg`

  button.addEventListener('mouseup', (event) => {

    if (themeCurrent == 'light') {
      
      document.documentElement.setAttribute('data-theme', 'dark')
      themeCurrent = 'dark'
      
    } else {
      
      document.documentElement.setAttribute('data-theme', 'light')
      themeCurrent = 'light'
      
    }

    icon.src = `img/mode-${themeCurrent}.svg`

    variablesUpdateThemeColors()

    globalManageTheme()

    // globalThemeUpdateCharts()

  })
  
}


function mainUpdateLogo() {

  let logo = getElement(mainMainLogoID)
  let path = `img/${themeCurrent}/logo.svg`

  logo.src = path
  
}


function globalUpdateHeaderLogo() {

  let logo = getElement(menuHeaderLogoID)
  let path = `img/main-menu/${themeCurrent}/logo-pale.svg`

  logo.src = path
  
}


function globalUpdateScrollUpIcon() {

  let icon = getElement(globalScrollTopIconID)
  let path = `img/${themeCurrent}/scrolltop-arrow.svg`

  icon.src = path
  
}


function globalManageTheme() {

  // also check on every page chart update functions: themeToggler.onclick = () => {}

  // header menu logo
  globalUpdateHeaderLogo()

  // scroll top icon
  globalUpdateScrollUpIcon()

  // PAGES ELEMENTS

  // main page
  if (page == mainTitlePageID) {

    // main logo
    mainUpdateLogo()
    
  }

}




































function globalUpdateFullPageB(component, segment, page, render, kind) {

  if (render) {

    let pageContainer = getElement(pageContainerID)
    pageContainer.innerHTML = component.render()
    
  }
  
  if (segment == mainSegmentID) {

    updateMainPages(page, kind=kind)

  } else if (segment == seasonSegmentID) {

    updateSeasonPages(page, kind=kind)

  } else if (segment == eventSegmentID) {

    updateEventPages(page, kind=kind)

  } else if (segment == driversSegmentID) {

    updateDriversPages(page, kind=kind)
    
  }
  
}


function startGlobal(firstLoad) {

  updateUnits()

  Promise.all([
    d3.csv(pathCalendar + 'calendar.csv'),
    // d3.csv(pathSeasonData + 'data_2.csv'),
    ]).then(function(files) {

    calendar = files[0]

    seasonIDs = calendar.map(d => d['SeasonID'])
    seasonIDs = dropDuplicates(seasonIDs)

    let currentLocation = getLocation()
    let routesFiltered = globalRoutes.filter(o => o['path'] == currentLocation)[0]

    let component = routesFiltered['component']
    let segment = routesFiltered['segment']
    let page = routesFiltered['page']

    // add guide page
    globalFillGuide()

    // select page
    globalMenuPagesSelection(segment, page)

    // activate menu header
    if (mobileDevice) {
      globalHeaderButtonMenuClickActivate()
    } else {
      globalHeaderButtonMenuHoverActivate()
    }
    
    // activate page button in menu header
    globalHeaderButtonMainPageActivate()
    // activate guide button in menu header
    globalHeaderButtonGuideActivate()

    // activate menu buttons
    globalMenuPagesActivate()

    // activate language menu
    if (mobileDevice) {
      globalLanguageMenuClickActivate()
    } else {
      globalLanguageMenuHoverActivate()
    }

    // activate scrol top element
    globalScrollTopElementActivate()

    // magane theme
    globalManageTheme()

    // scroll top icon
    globalUpdateScrollUpIcon()

    // change theme toggler activate
    globalThemeTogglerActivate()
    
    // update colors for charts
    variablesUpdateThemeColors()

    globalUpdateFullPageB(component, segment, page, render=true, kind='first')

    }).catch(function(err) {
  // handle error here
  })

}





















