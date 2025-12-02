

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
  getElement(mainContentContainerID).innerHTML += pageMainMain

  if (glVGlobal['FirstLoad'] == false) {
    getElement(containerMainTitleID).classList.add('smooth-appear-fast')
  }

  glVGlobal['FirstLoad'] = false

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
