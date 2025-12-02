
window.addEventListener('load', (event) => {

  startGlobal()
  updatePageContainer() 
  
})








function updatePageContainer() {

  updateThemeColors()

  currentLocation = getLocation()
  
  const { component = ErrorComponent } = findComponentByPath(currentLocation, routesDict) || {}
  document.getElementById(pageContainerID).innerHTML = component.render()

  if ((currentLocation == routeMain) || (currentLocation == routePage)) {

    startSeasonPage()

  } else if (currentLocation == routeEvent) {

    startEventsPage()

  } else if (currentLocation == routeDrivers) {

    startDriversPage()
    
  }

  
}