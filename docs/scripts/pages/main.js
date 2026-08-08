function mainAppearElements(page) {

  if (page == mainTitlePageID) {

    appearElement(mainMainContainerID)

  }

}


function mainTitleScrollToElement(element) {

  let scrollElementID = element.getAttribute('scroll-element-id')
  let scrollElement = getElement(scrollElementID)
  let scrollElementScrollTo = scrollElement.offsetTop - px24

  document.documentElement.scrollTo({top: scrollElementScrollTo, behavior: 'smooth'})
  
}


function mainUpdateCharts() {

  let chart1 = getElement(mainTitleChart1ID)
  let chart2 = getElement(mainTitleChart2ID)
  let chart3 = getElement(mainTitleChart3ID)
  let chart4 = getElement(mainTitleChart4ID)
  let chart5 = getElement(mainTitleChart5ID)
  let chart6 = getElement(mainTitleChart6ID)
  let chart7 = getElement(mainTitleChart7ID)
  let chart8 = getElement(mainTitleChart8ID)
  let chart9 = getElement(mainTitleChart9ID)
  let chart10 = getElement(mainTitleChart10ID)
  let chart11 = getElement(mainTitleChart11ID)
  let chart12 = getElement(mainTitleChart12ID)
  let chart13 = getElement(mainTitleChart13ID)
  let chart14 = getElement(mainTitleChart14ID)
  let chart15 = getElement(mainTitleChart15ID)
  let chart16 = getElement(mainTitleChart16ID)
  let chart17 = getElement(mainTitleChart17ID)
  let chart18 = getElement(mainTitleChart18ID)
  let chart19 = getElement(mainTitleChart19ID)
  let chart20 = getElement(mainTitleChart20ID)
  let chart21 = getElement(mainTitleChart21ID)
  let chart22 = getElement(mainTitleChart22ID)
  let chart23 = getElement(mainTitleChart23ID)
  let chart24 = getElement(mainTitleChart24ID)
  let chart25 = getElement(mainTitleChart25ID)
  let chart26 = getElement(mainTitleChart26ID)
  let chart27 = getElement(mainTitleChart27ID)
  let chart28 = getElement(mainTitleChart28ID)
  let chart29 = getElement(mainTitleChart29ID)
  let chart30 = getElement(mainTitleChart30ID)
  let chart31 = getElement(mainTitleChart31ID)
  let chart32 = getElement(mainTitleChart32ID)
  let chart33 = getElement(mainTitleChart33ID)
  let chart34 = getElement(mainTitleChart34ID)
  let chart35 = getElement(mainTitleChart35ID)
  let chart36 = getElement(mainTitleChart36ID)
  let chart37 = getElement(mainTitleChart37ID)

  chart1.src = `img/main-page/charts/rus/${themeCurrent}/svg-season-categories-lol.svg`
  chart2.src = `img/main-page/charts/rus/${themeCurrent}/svg-season-categories-line.svg`
  chart3.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-comparison-radar.svg`
  chart4.src = `img/main-page/charts/rus/${themeCurrent}/svg-season-drivers-hbars.svg`
  chart5.src = `img/main-page/charts/rus/${themeCurrent}/svg-chart-pent-chart-pent-2.svg`
  chart6.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-categories-chart-timing.svg`
  chart7.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-categories-chart-bars-consistency.svg`
  chart8.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-categories-chart-bars-pace.svg`
  chart9.src = `img/main-page/charts/rus/${themeCurrent}/svg-chart-pent-chart-pent-1.svg`
  chart10.src = `img/main-page/charts/rus/${themeCurrent}/chart-1-0.svg`
  chart11.src = `img/main-page/charts/rus/${themeCurrent}/chart-2-1.svg`
  chart12.src = `img/main-page/charts/rus/${themeCurrent}/svg-laptimes-plot-laptimes-left.svg`
  chart13.src = `img/main-page/charts/rus/${themeCurrent}/svg-laptimes-plot-laptimes-right.svg`
  chart14.src = `img/main-page/charts/rus/${themeCurrent}/svg-laptimes-difference-plot-laptimes-difference.svg`
  chart15.src = `img/main-page/charts/rus/${themeCurrent}/chart-9-1.svg`
  chart16.src = `img/main-page/charts/rus/${themeCurrent}/chart-11-1.svg`
  chart17.src = `img/main-page/charts/rus/${themeCurrent}/chart-7-v9l10p.svg`
  chart18.src = `img/main-page/charts/rus/${themeCurrent}/cards.png`
  chart19.src = `img/main-page/charts/rus/${themeCurrent}/statistics-cards-2.png`
  chart20.src = `img/main-page/charts/rus/${themeCurrent}/stat.png`

  chart21.src = `img/main-page/charts/rus/${themeCurrent}/cards.png`
  chart22.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-comparison-radar.svg`
  chart23.src = `img/main-page/charts/rus/${themeCurrent}/svg-season-drivers-hbars.svg`
  chart24.src = `img/main-page/charts/rus/${themeCurrent}/svg-chart-pent-chart-pent-2.svg`
  chart25.src = `img/main-page/charts/rus/${themeCurrent}/svg-laptimes-plot-laptimes-left.svg`
  chart26.src = `img/main-page/charts/rus/${themeCurrent}/svg-laptimes-plot-laptimes-right.svg`
  chart27.src = `img/main-page/charts/rus/${themeCurrent}/svg-laptimes-difference-plot-laptimes-difference.svg`
  chart28.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-categories-chart-timing.svg`
  chart29.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-categories-chart-bars-consistency.svg`
  chart30.src = `img/main-page/charts/rus/${themeCurrent}/svg-event-categories-chart-bars-pace.svg`
  chart31.src = `img/main-page/charts/rus/${themeCurrent}/chart-11-1.svg`
  chart32.src = `img/main-page/charts/rus/${themeCurrent}/svg-chart-pent-chart-pent-1.svg`
  chart33.src = `img/main-page/charts/rus/${themeCurrent}/chart-1-0.svg`
  chart34.src = `img/main-page/charts/rus/${themeCurrent}/chart-2-1.svg`
  chart35.src = `img/main-page/charts/rus/${themeCurrent}/statistics-cards-2.png`
  chart36.src = `img/main-page/charts/rus/${themeCurrent}/chart-7-v9l10p.svg`
  chart37.src = `img/main-page/charts/rus/${themeCurrent}/stat.png`
  
}


function mainFirstLoad() {

  scrollPosition = 0

  // glVGlobal['FirstLoad'] = false
  
}


function updateMainMainPage(kind) {

  // getElement(globalScrollContainerID).style.scrollBehavior = 'auto'

  updateUnits()

  if (kind == 'first') { mainFirstLoad() }

  glVGlobal['Segment'] = mainSegmentID
  glVGlobal['Page'] = mainTitlePageID

  getElement(mainContentContainerID).innerHTML = ''
  getElement(mainContentContainerID).innerHTML += pageMainTitle

  if (glVGlobal['FirstLoad'] == false) {
    getElement(containerMainTitleID).classList.add('smooth-appear-fast')
  }

  glVGlobal['FirstLoad'] = false

  mainUpdateCharts()

  let themeToggler = getElement(mainChangeThemeButtonID)

  // update charts colors by clicking on theme toggler
  themeToggler.onclick = () => {
    mainUpdateCharts()
  }

  pageContainerScrollTop()

  globalMenuPagesHide()
  mainAppearElements(glVGlobal['Page'])
  appearElement(containerMainTitleID)
  
}


function updateMainPages(pageID, kind) {

  if (pageID == mainTitlePageID) {

    updateMainMainPage(kind)

  }
  
}
