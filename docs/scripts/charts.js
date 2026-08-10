

function plotTopFive(summary) {

  // let metrics = ['RankStart', 'RankConsistency', 'RankPoints', 'RankPace', 'RankOvertakes']
  let metrics = [_rankStart, _rankConsistency, _rankPoints, _rankPace, _rankOvertakes]

  metrics.forEach((metric, i) => {

    let metricName = metric.replace('Rank', '')
    if (metricName == _pace) { metricName = _paceSec }
    
    let data = summary.filter(o => o[metric] == 1)[0]

    let fullName = data[_fullName]

    let metricValue = data[metricName]
    let start = data[_glabel]
    let finish = data[_plabel]

    let idt = data[_driverIDT]
    let number = data[_number]
    let team = data[_team]
    let color = data[_color]

    let img = getElement('event-rating-topfive-img-' + i)
    let imgPath = pathImgDrivers + glVEvent['SeasonID'] + '/' + idt + imagesFormat
    
    updateImage(img, imgPath)

    getElement('event-rating-topfive-first-name-' + i).textContent = fullName
    getElement('event-rating-topfive-first-name-' + i).style.color = color

    getElement('event-rating-topfive-metric-' + i).textContent = metricValue

    getElement('event-rating-topfive-start-' + i).textContent = start
    getElement('event-rating-topfive-finish-' + i).textContent = finish

    getElement('event-rating-topfive-number-team-' + i).textContent = `#${number} ${team}`

    // fill stars
    let starsElement = getElement('event-rating-topfive-stars-' + i)

    metrics.forEach((metricLocal, j) => {

      let starPath
      let firstPlace = (data[metricLocal] == 1)

      if (firstPlace) { starPath = 'img/star-leader.svg' }
      else { starPath = 'img/star-base.svg' }

      starsElement.children[j].src = starPath
      
    })
    
  })

}


function plotMetrics(summaryData, ContainerID) {

  let protocolSizes = getSizes(getElement(eventRatingsProtocolID))
  let protocolHeight = protocolSizes.height

  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)
  let containerWidth = containerSizes.width

  let containerParent = getElement(eventsRatingsChartMetrcisContainerID)
  containerParent.style.height = `${protocolHeight}px`

  // container.style.height = `${protocolHeight}px`
  container.innerHTML = ''

  let data = structuredClone(summaryData)
  data = sortObject(data, _rankPoints, ascending=true)

  let lastPoints = data.map(d => d[_points]).map(Number)
  lastPoints = lastElement(arrayDropNaNs(lastPoints))

  data.forEach((d, i) => {

    let svgNS = 'http://www.w3.org/2000/svg'

    let row = document.createElement('div')
    let positionEl = document.createElement('div')
    let lineVertSVGEl = document.createElementNS(svgNS, 'svg')
    // let lineVertLineEl = document.createElementNS(svgNS, 'line')
    let circleEl = document.createElementNS(svgNS, 'circle')
    let bodyEl = document.createElement('div')
    let nameContainer = document.createElement('div')
    let nameEl = document.createElement('div')
    let teamEl = document.createElement('div')
    let ratingEl = document.createElement('div')

    row.classList.add('w551nh')
    positionEl.classList.add('w551nh-p')
    lineVertSVGEl.classList.add('w551nh-c')
    bodyEl.classList.add('w551nh-b')
    nameContainer.classList.add('w551nh-nc')
    nameEl.classList.add('w551nh-n')
    teamEl.classList.add('w551nh-t')
    ratingEl.classList.add('w551nh-r')

    let position = i + 1
    let name = d[_fullName]
    let team = d[_team]
    let rating = d[_points]
    let number = d[_number]

    let elementID = eventsRatingsChartMetricsItemID + `-${number}`

    let color = d[_color]
    
    let colorCircle = alphaColor(color, 0.75)
    let colorRating = saturateColor(color, 0.75)

    let colorDark = shadeColor(color, -0.5)

    let colorLight1
    let colorLight2

    if (themeCurrent == 'light') {

      colorLight1 = alphaColor(color, 0.35)
      // colorLight1 = saturateColor(colorLight1, 0.65)
      colorLight2 = alphaColor(color, 0.15)
      
    } else if (themeCurrent == 'dark') {

      colorLight1 = saturateColor(color, 0.35)
      colorLight2 = _colorBackground
      
    }

    bodyEl.setAttribute('id', elementID)
    nameEl.setAttribute('id', elementID + '-name')
    teamEl.setAttribute('id', elementID + '-team')
    ratingEl.setAttribute('id', elementID + '-rating')

    bodyEl.setAttribute('color', color)
    bodyEl.setAttribute('number', number)
    bodyEl.setAttribute('colorDark', colorDark)
    bodyEl.setAttribute('colorLight1', colorLight1)
    bodyEl.setAttribute('colorLight2', colorLight2)

    circleEl.setAttribute('cx', px6)
    circleEl.setAttribute('cy', px10)
    circleEl.setAttribute('r', px4)
    circleEl.style.stroke = shadeColor(colorCircle, -0.25)
    circleEl.style.fill = colorCircle

    ratingEl.style.color = colorRating
    
    lineVertSVGEl.appendChild(circleEl)

    nameContainer.appendChild(nameEl)
    nameContainer.appendChild(teamEl)

    bodyEl.appendChild(nameContainer)
    bodyEl.appendChild(ratingEl)

    row.appendChild(positionEl)
    row.appendChild(lineVertSVGEl)
    row.appendChild(bodyEl)

    container.appendChild(row)

    positionEl.textContent = position
    nameEl.textContent = name
    teamEl.textContent = team
    ratingEl.textContent = rating

  })

}


function plotTiming(summaryData, ContainerID) {

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // -----------------------------------  DATA  ----------------------------------- //


  let data = structuredClone(summaryData)
  
  data.forEach((obj, i) => {
    if (obj[_points] == _DNC || obj[_points] == _DSQ) {
      obj[_pointsPace] = 1
      obj[_pointsConsistency] = 2
    }
  })

  data = sortObject(data, _rankTiming, ascending=true)

  let barsColor = colorThemesChartDriverBarsTimingActions
  let labelsColor = colorThemesChartDriverAbbsTimingActions
  let radius = px2_5
  let dropShadow = colorThemesChartTimingActionsShadow

  let xMin = 0.9
  let xMax = 2.1
  let yMin = 1.8
  let yMax = 4.2

  let step = 0.5

  let zoneOffset = px6
  let zoneRadius = px16
  let zoneOffsetX2 = 2*zoneOffset

  let gridCentralOffset = -px2

  let filename

  if (data.length > 0) {
    filename = `${glVEvent[_seasonID]}_${glVEvent[_eventAbbreviation].toLowerCase()}_timing`
  } else {
    filename = 'unnamed'
  }

  let buttonSVG = getElement(eventCategoriesTimingDownloadSVGID)
  buttonSVG.setAttribute('download_name', filename)

  let buttonPNG = getElement(eventCategoriesTimingDownloadPNGID)
  buttonPNG.setAttribute('download_name', filename)


  // -----------------------------------  SVG  ----------------------------------- //


  // width and height -  of page size
  let containerSizes = getSizes(getElement(ContainerID))
    
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = widthDiv

  let margin = {top: px50, right: px65, bottom: px50, left: px65}
  
  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  let svg = d3.select(containerID)
    .append('svg')
    .attr('id', 'svg-event-categories-chart-timing')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'events-plot-timing-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // ------------------------------  SCALES  ------------------------------ //
  

  // scales
  let xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])
      
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])

  let xBottomPad = 0
  xBottomPad = height + xBottomPad
  
  let yRightPad = 0
  yRightPad = width + yRightPad

  let xTickValues = range(xMin + 0.1, xMax, 0.5)
  let yTickValues = range(yMin + 0.2, yMax, step)

  let tickSize = px4
  
  let xLabelPad = px25
  let yLabelPad = px40

  let xAxisBottom = d3.axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)

  let xAxisTop = d3.axisTop(xScale)
    .tickValues(xTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)

  let yAxisLeft = d3.axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)

  let yAxisRight = d3.axisRight(yScale)
    .tickValues(yTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)


  // ------------------------------  AXIS  ------------------------------ //


  let xBottom = svg
    .append('g')
    .attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xBottomPad})`)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisBottom)
    .call(g => g.select('.domain').remove())

  let xTop = svg
    .append('g')
    .attr('name', 'axis-top')
    .attr("transform", `translate(0, 0)`)
  
  xTop
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisTop)
    .call(g => g.select('.domain').remove())

  let yLeft = svg
    .append('g')
    .attr('name', 'axis-left')
    .attr("transform", `translate(0, 0)`)
  
  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisLeft)
    .call(g => g.select('.domain').remove())

  let yRight = svg
    .append('g')
    .attr('name', 'axis-right')
    .attr("transform", `translate(${yRightPad}, 0)`)
  
  yRight
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom, xTop }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

  xTop
    .selectAll('text')
    .style('dominant-baseline', 'auto')
    .attr('dy', '-0.5rem')

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', '0.5rem')

  xBottom
    .selectAll('.tick line')
    .style('visibility', d => d3hideTickLineByValue(d, 1.5))

  xTop
    .selectAll('.tick line')
    .style('visibility', d => d3hideTickLineByValue(d, 1.5))

  yLeft
    .selectAll('.tick line')
    .style('visibility', d => d3hideTickLineByValue(d, 3))

  yRight
    .selectAll('.tick line')
    .style('visibility', d => d3hideTickLineByValue(d, 3))


  // ------------------------------  LABELS  ------------------------------ //


  xBottom
    .append("text")
    .text('ТЕМП')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .attr("x", 0.5 * width)
    .attr("y", tickSize + xLabelPad)
    .attr('dy', '0.5rem')
  
  xTop
    .append("text")
    .text('ТЕМП')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr("x", 0.5 * width)
    .attr("y", - tickSize - xLabelPad)
    .attr('dy', '-0.5rem')

  yLeft
    .append("text")
    .text('ПЛОТНОСТЬ')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr("transform", `translate(${- tickSize - yLabelPad}, ${0.5 * height}) rotate(270)`)

  yRight
    .append("text")
    .text('ПЛОТНОСТЬ')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', '#495057')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr("transform", `translate(${tickSize + yLabelPad}, ${0.5 * height}) rotate(90)`)


  // ----------------------------  GRID LINES  ---------------------------- //

  
  let grid = svg
    .append('g')
    .attr('name', 'grid-lines')

  let gridH = grid
    .append('g')
    .attr('name', 'timing-grid-horizontal-lines')
    .attr('id', eventCategoriesTimingGridHNodeID)

  let gridV = grid
    .append('g')
    .attr('name', 'timing-grid-vertical-lines')
    .attr('id', eventCategoriesTimingGridVNodeID)

  let gridPrimary = svg
    .append('g')
    .attr('name', 'grid-lines-primary')

  let gridElement = d3GetElement(grid)

  let zoneWidth = 0.5*(xScale(xMax) - xScale(xMin))
  let zoneHeight = 0.5*(yScale(yMin) - yScale(yMax))

  // grid primary horizotal
  gridPrimary
    .append('line')
    .attr('x1', gridCentralOffset - px4)
    .attr('x2', width - gridCentralOffset + px4)
    .attr('y1', zoneHeight + px0_5)
    .attr('y2', zoneHeight + px0_5)
    .attr('stroke', colorThemesChartAxisRectangle)
    .attr('stroke-width', `${px2}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '5')
    .style('stroke-linecap', 'round')

  // grid primary vertical
  gridPrimary
    .append('line')
    .attr('x1', zoneWidth + px0_5)
    .attr('x2', zoneWidth  + px0_5)
    .attr('y1', yScale(yMin) - gridCentralOffset)
    .attr('y2', yScale(yMax) + gridCentralOffset)
    .attr('stroke', colorThemesChartAxisRectangle)
    .attr('stroke-width', `${px2}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '-2')
    .style('stroke-linecap', 'round')

  // square - blue
  gridPrimary
    .append('rect')
    .attr('name', 'blue-zone')
    .attr('x', zoneOffset - px1)
    .attr('width', 0.5*width - zoneOffsetX2 + px2)
    .attr('y', zoneOffset - px1)
    .attr('height', 0.5*height - zoneOffsetX2 + px2)
    .attr('fill', colorThemesChartTimingActionsBlueZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // square - green
   gridPrimary
    .append('rect')
    .attr('name', 'green-zone')
    .attr('x', zoneWidth + zoneOffset)
    .attr('width', zoneWidth - zoneOffsetX2)
    .attr('y', zoneOffset - px1)
    .attr('height', 0.5*height - zoneOffsetX2 + px2)
    .attr('fill', colorThemesChartTimingActionsGreenZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // square - red
  gridPrimary
    .append('rect')
    .attr('name', 'red-zone')
    .attr('x', zoneOffset - px1)
    .attr('width', 0.5*width - zoneOffsetX2 + px2)
    .attr('y', 0.5*height + zoneOffset)
    .attr('height', 0.5*height - zoneOffsetX2)
    .attr('fill', colorThemesChartTimingActionsRedZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // square - purple
  gridPrimary
    .append('rect')
    .attr('name', 'purple-zone')
    .attr('x', zoneWidth + zoneOffset)
    .attr('width', zoneWidth - zoneOffsetX2)
    .attr('y', 0.5*height + zoneOffset)
    .attr('height', 0.5*height - zoneOffsetX2)
    .attr('fill', colorThemesChartTimingActionsPurpleZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // grid horizontal line
  gridH
    .selectAll("line")
    .data(data)
    .join('line')
    .style('fill', 'none')
    .style('stroke', colorThemesChartGridTimingActions)
    .style('stroke-width', `${px1}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '5')
    .style('shape-rendering', 'crispEdges')
    .style('opacity', 0.75)
    .style('visibility', 'hidden')
    .attr("x1", xScale(xMin) + zoneOffset)
    .attr("y1", d => yScale(d[_pointsConsistency]) + px0_5)
    .attr("x2", xScale(xMax) - zoneOffset)
    .attr("y2", d => yScale(d[_pointsConsistency]) + px0_5)
    .attr('id', d => eventCategoriesTimingGridHNodeID + d[_number])

  // grid vertical line
  gridV
    .selectAll("line")
    .data(data)
    .join('line')
    .style('fill', 'none')
    .style('stroke', colorThemesChartGridTimingActions)
    .style('stroke-width', `${px1}px`)
    .style('stroke-dasharray', '4 4')
    .style('shape-rendering', 'crispEdges')
    .style('opacity', 0.75)
    .style('visibility', 'hidden')
    .attr("x1", d => xScale(d[_pointsPace]) + px0_5)
    .attr("y1", yScale(yMin) - zoneOffset)
    .attr("x2", d => xScale(d[_pointsPace]) + px0_5)
    .attr("y2", yScale(yMax) + zoneOffset)
    .attr('id', d => eventCategoriesTimingGridVNodeID + d[_number])


  // ----------------------------  CIRCLES  ---------------------------- //


  let circles = svg
    .append('g')
    .attr('name', 'circles')
    .attr('id', 'timing-circles-id')

  circles
    .selectAll("circle")
    .data(data)
    .join('circle')
    .style('cursor', 'default')
    .attr("cx", d => xScale(d[_pointsPace]) + px0_5)
    .attr("cy", d => yScale(d[_pointsConsistency]) + px0_5)
    .attr("r", radius)
    .style('fill', d => shadeColor(d[_color], 0.15))
    .style('stroke', d => shadeColor(d[_color], -0.1))
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .style('display', d => { return (d[_points] == _DNC || d[_points] == _DSQ) ? 'none' : 'auto'})
    .classed('theme-colors-control-img', true)


  // ----------------------------  DRIVER ABBS  ---------------------------- //


  let abbs = svg
    .append('g')
    .attr('name', 'abbs')
    .attr('id', 'driver-abbs-timing')

  let abbsRect = abbs
    .append('g')
    .attr('name', 'abbs-rect')

  let abbsText = abbs
    .append('g')
    .attr('name', 'abbs-text')
    .attr('id', eventCategoriesTimingAbbsNodeID)

  let abbsTextDx = px10
  
  let abbsRectDx = px3
  let abbsRectHeight = px5

  let colorThemesChartTimingActionsOpacity

  abbsText
    .selectAll("text")
    .data(data)
    .join('text')
    .attr('id', (d ,i) => eventCategoriesTimingAbbID + i)
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartDriverAbbsTimingActions)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsDriverAbbsWeight)
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'central')
    .style('cursor', 'pointer')
    .text(d => d[_abbreviation])
    .attr("x", d => xScale(d[_pointsPace]) - abbsTextDx)
    .attr('y', d => yScale(d[_pointsConsistency]) + 0.5 * radius - 0.5)
    .style('visibility', d => { return (d[_points] == _DNC || d[_points] == _DSQ) ? 'hidden' : 'visible'})
    .attr('Number', d => d[_number])
    .attr('Color', d => d[_color])

}


function plotActions(summaryData, ContainerID) {

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // -----------------------------------  DATA  ----------------------------------- //


  let data = structuredClone(summaryData)
  
  data.forEach((obj, i) => {
    if (obj[_points] == _DNC || obj[_points] == _DSQ) {
      obj[_pointsStart] = 1
      obj[_pointsOvertakes] = 1
    }
  })

  let barsColor = colorThemesChartDriverBarsTimingActions
  let labelsColor = colorThemesChartDriverAbbsTimingActions
  let metricsColor = colorThemesChartDriverAbbsTimingActions
  let dropShadow = colorThemesChartTimingActionsShadow
  
  let metricsWeight = 700

  let radius = px2_5

  let xMin = 0.9
  let xMax = 2.1
  let yMin = 0.9
  let yMax = 2.1

  let step = 0.5

  let zoneOffset = px6
  let zoneRadius = px16
  let zoneOffsetX2 = 2*zoneOffset

  let gridCentralOffset = -px6

  if (data.length > 0) {
    filename = `${glVEvent[_seasonID]}_${glVEvent[_eventAbbreviation].toLowerCase()}_actions`
  } else {
    filename = 'unnamed'
  }
  
  let buttonSVG = getElement(eventCategoriesActionsDownloadSVGID)
  buttonSVG.setAttribute('download_name', filename)

  let buttonPNG = getElement(eventCategoriesActionsDownloadPNGID)
  buttonPNG.setAttribute('download_name', filename)
  

  // -----------------------------------  SVG  ----------------------------------- //


  // width and height -  of page size
  let containerSizes = getSizes(getElement(ContainerID))
    
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = widthDiv

  let margin = {top: px50, right: px65, bottom: px50, left: px65}
  
  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  let svg = d3
    .select(containerID)
    .append('svg')
    .attr('id', 'svg-event-categories-chart-actions')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'events-plot-actions-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // ------------------------------  SCALES  ------------------------------ //
  

  // scales
  let xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])
      
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])

  let xBottomPad = 0
  xBottomPad = height + xBottomPad
  
  let yRightPad = 0
  yRightPad = width + yRightPad

  let xTickValues = range(xMin + 0.1, xMax, step)
  let yTickValues = range(yMin + 0.1, yMax, step)

  let tickSize = px4
  
  let xLabelPad = px25
  let yLabelPad = px40

  let xAxisBottom = d3.axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)

  let xAxisTop = d3.axisTop(xScale)
    .tickValues(xTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)

  let yAxisLeft = d3.axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)

  let yAxisRight = d3.axisRight(yScale)
    .tickValues(yTickValues)
    .tickSize(tickSize)
    .tickSizeOuter(0)


  // ------------------------------  AXIS  ------------------------------ //


  let xBottom = svg
    .append('g')
    .attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xBottomPad})`)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisBottom)
    .call(g => g.select('.domain').remove())

  let xTop = svg
    .append('g')
    .attr('name', 'axis-top')
    .attr("transform", `translate(0, 0)`)
  
  xTop
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisTop)
    .call(g => g.select('.domain').remove())

  let yLeft = svg
    .append('g')
    .attr('name', 'axis-left')
    .attr("transform", `translate(0, 0)`)
  
  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisLeft)
    .call(g => g.select('.domain').remove())

  let yRight = svg
    .append('g')
    .attr('name', 'axis-right')
    .attr("transform", `translate(${yRightPad}, 0)`)
  
  yRight
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom, xTop }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

  xTop
    .selectAll('text')
    .style('dominant-baseline', 'auto')
    .attr('dy', '-0.5rem')

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', '0.5rem')

  svg
    .selectAll('.tick line')
    .style('visibility', d => d3hideTickLineByValue(d, 1.5))


  // ------------------------------  LABELS  ------------------------------ //


  xBottom
    .append("text")
    .text('СТАРТ')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .attr("x", 0.5 * width)
    .attr("y", tickSize + xLabelPad)
    .attr('dy', '0.5rem')

  xTop
    .append("text")
    .text('СТАРТ')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr("x", 0.5 * width)
    .attr("y", - tickSize - xLabelPad)
    .attr('dy', '-0.5rem')

  yLeft
    .append("text")
    .text('ОБГОНЫ')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', '#495057')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr("transform", `translate(${- tickSize - yLabelPad}, ${0.5 * height}) rotate(270)`)

  yRight
    .append("text")
    .text('ОБГОНЫ')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisLabels)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsLabelsWeight)
    .style('text-anchor', '#495057')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr("transform", `translate(${tickSize + yLabelPad}, ${0.5 * height}) rotate(90)`)


  // ----------------------------  GRID LINES  ---------------------------- //


  let grid = svg
    .append('g')
    .attr('name', 'grid-lines')

  let gridH = grid
    .append('g')
    .attr('name', 'actions-grid-horizontal-lines')
    .attr('id', eventCategoriesActionsGridHNodeID)

  let gridV = grid
    .append('g')
    .attr('name', 'actions-grid-vertical-lines')
    .attr('id', eventCategoriesActionsGridVNodeID)

  let gridPrimary = svg
    .append('g')
    .attr('name', 'grid-lines-primary')

  let gridElement = d3GetElement(grid)

  let zoneWidth = 0.5*(xScale(xMax) - xScale(xMin))
  let zoneHeight = 0.5*(yScale(yMin) - yScale(yMax))

  // grid primary horizotal
  gridPrimary
    .append('line')
    .attr('x1', gridCentralOffset)
    .attr('x2', width - gridCentralOffset)
    .attr('y1', zoneHeight + px0_5)
    .attr('y2', zoneHeight + px0_5)
    .attr('stroke', colorThemesChartAxisRectangle)
    .attr('stroke-width', `${px2}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '5')
    .style('stroke-linecap', 'round')

  // grid primary vertical
  gridPrimary
    .append('line')
    .attr('x1', zoneWidth + px0_5)
    .attr('x2', zoneWidth  + px0_5)
    .attr('y1', yScale(yMin) - gridCentralOffset - px4)
    .attr('y2', yScale(yMax) + gridCentralOffset + px2)
    .attr('stroke', colorThemesChartAxisRectangle)
    .attr('stroke-width', `${px2}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '0')
    .style('stroke-linecap', 'round')

  // square - blue
  gridPrimary
    .append('rect')
    .attr('name', 'blue-zone')
    .attr('x', zoneOffset - px1)
    .attr('width', 0.5*width - zoneOffsetX2 + px2)
    .attr('y', zoneOffset - px1)
    .attr('height', 0.5*height - zoneOffsetX2 + px2)
    .attr('fill', colorThemesChartTimingActionsBlueZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // square- green
   gridPrimary
    .append('rect')
    .attr('name', 'green-zone')
    .attr('x', zoneWidth + zoneOffset)
    .attr('width', zoneWidth - zoneOffsetX2)
    .attr('y', zoneOffset - px1)
    .attr('height', 0.5*height - zoneOffsetX2 + px2)
    .attr('fill', colorThemesChartTimingActionsGreenZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // square - red
  gridPrimary
    .append('rect')
    .attr('name', 'red-zone')
    .attr('x', zoneOffset - px1)
    .attr('width', 0.5*width - zoneOffsetX2 + px2)
    .attr('y', 0.5*height + zoneOffset)
    .attr('height', 0.5*height - zoneOffsetX2)
    .attr('fill', colorThemesChartTimingActionsRedZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // square - purple
  gridPrimary
    .append('rect')
    .attr('name', 'purple-zone')
    .attr('x', zoneWidth + zoneOffset)
    .attr('width', zoneWidth - zoneOffsetX2)
    .attr('y', 0.5*height + zoneOffset)
    .attr('height', 0.5*height - zoneOffsetX2)
    .attr('fill', colorThemesChartTimingActionsPurpleZoneFill)
    .attr('opacity', 0.2)
    .attr('rx', px16)

  // grid horizontal line
  gridH
    .selectAll("line")
    .data(data)
    .join('line')
    .style('fill', 'none')
    .style('stroke', colorThemesChartGridTimingActions)
    .style('stroke-width', `${px1}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '5')
    .style('shape-rendering', 'crispEdges')
    .style('opacity', 0.75)
    .style('visibility', 'hidden')
    .attr("x1", xScale(xMin) + zoneOffset)
    .attr("y1", d => yScale(d[_pointsOvertakes]) + px0_5)
    .attr("x2", xScale(xMax) - zoneOffset)
    .attr("y2", d => yScale(d[_pointsOvertakes]) + px0_5)
    .attr('id', d => eventCategoriesActionsGridHNodeID + d[_number])

  // grid vertical line
  gridV
    .selectAll("line")
    .data(data)
    .join('line')
    .style('fill', 'none')
    .style('stroke', colorThemesChartGridTimingActions)
    .style('stroke-width', `${px1}px`)
    .style('stroke-dasharray', '4 4')
    .style('shape-rendering', 'crispEdges')
    .style('opacity', 0.75)
    .style('visibility', 'hidden')
    .attr("x1", d => xScale(d[_pointsStart]) + px0_5)
    .attr("y1", yScale(yMin) - zoneOffset)
    .attr("x2", d => xScale(d[_pointsStart]) + px0_5)
    .attr("y2", yScale(yMax) + zoneOffset)
    .attr('id', d => eventCategoriesActionsGridVNodeID + d[_number])


  // ----------------------------  CIRCLES  ---------------------------- //


  let circles = svg
    .append('g')
    .attr('name', 'circles')
    .attr('id', 'actions-circles-id')

  circles
    .selectAll("circle")
    .data(data)
    .join('circle')
    .style('cursor', 'default')
    .attr("cx", d => xScale(d[_pointsStart]) + px0_5)
    .attr("cy", d => yScale(d[_pointsOvertakes]) + px0_5)
    .attr("r", radius)
    .style('fill', d => shadeColor(d[_color], 0.15))
    .style('stroke', d => shadeColor(d[_color], -0.1))
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .style('display', d => { return (d[_points] == _DNC || d.Points == _DSQ) ? 'none' : 'auto'})
    .classed('theme-colors-control-img', true)


  // ----------------------------  DRIVER ABBS  ---------------------------- //


  let abbs = svg
    .append('g')
    .attr('name', 'abbs')
    .attr('id', 'driver-abbs-actions')

  let abbsRect = abbs
    .append('g')
    .attr('name', 'abbs-rect')

  let abbsText = abbs
    .append('g')
    .attr('name', 'abbs-text')
    .attr('id', eventCategoriesActionsAbbsNodeID)

  let abbsTextDx = px10
  
  let abbsRectDx = px3
  let abbsRectHeight = px5

  abbsText
    .selectAll("text")
    .data(data)
    .join('text')
    .attr('id', (d, i) => eventCategoriesActionsAbbID + i)
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartDriverAbbsTimingActions)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsDriverAbbsWeight)
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'central')
    .style('cursor', 'pointer')
    // .style('text-shadow', '1px 1px 1px rgba(0,0,0,0.05), 1px -1px 1px rgba(255,255,255,0.1)')
    .text(d => d[_abbreviation])
    .attr("x", d => xScale(d[_pointsStart]) - abbsTextDx)
    .attr('y', d => yScale(d[_pointsOvertakes]) + 0.5 * radius - 0.5)
    .style('visibility', d => {
      return (d[_points] == _DNC || d[_points] == _DSQ) ? 'hidden' : 'visible'
    })
    .attr('Number', d => d[_number])
    .attr('Color', d => d[_color])

}


function chartBars_1(summaryData, ContainerID, metric, kind) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3.select(containerID).select('svg').remove()


  // ---------------------------------  DATA  --------------------------------- //


  let data = structuredClone(summaryData)
  
  if (metric == _start) {
    data = sortObject(data, _rankStartChart, ascending=true)
  } else {
    data = sortObject(data, 'Rank' + metric, ascending=true)
  }

  let dataDNC = []

  data.forEach((obj, i) => {

    if (obj[_points] == _DSQ) {
      obj[metric] = '-'
      obj[metric + 'Normalized'] = 0
      dataDNC.push(obj)
    }

    if (metric == _start) {

      if (obj[_points] == _DNC) {
        obj[metric] = '-'
        obj[metric + 'Normalized'] = 0
        dataDNC.push(obj)
      }
      
    } else if (metric == _overtakes) {

      if (obj[_points] == _DNC) {
        obj[metric] = '-'
        obj[metric + 'Normalized'] = 0
        dataDNC.push(obj)
      }
      
    } else {

      if (obj[_points] == _DNC) {
        obj[metric] = '-'
        obj[metric + 'Normalized'] = 0
        dataDNC.push(obj)
      }
      
    }

    obj['Index'] = i

  })

  let labelsDict = {
    _pace: 'Средний темп',
    _consistency: 'Плотность',
    _start: 'Старт',
    _overtakes: 'Обгоны',
  }

  let yLabel = labelsDict[metric]
  
  let driverAbbs = data.map(d => d[_abbreviation])
  let metricNormalized = metric + 'Normalized'

  let xMin = 0
  let xMax = 10

  let yMin = data.map(d => d['Index'])[0]
  let yMax = lastElement(data.map(d => d['Index']))

  let yTickValues = range(yMin, yMax+1, 1)
  
  let barWidth = px6

  let titlePad = px17


  // ---------------------------------  SVG  --------------------------------- //
  
  
  // width and height -  of page size
  let widthDiv = container.clientWidth

  let plotSizes
  let marginRight

  let container1
  let container2

  let barsID
  let ticklabelsID

  if ((metric == _overtakes) || (metric == _start)) {
    
    marginRight = px40
    plotSizes = getSizes(getElement('plot-actions'))
    
    container1 = getElement(eventCategoriesActionsContainerID)
    container2 = getElement(eventCategoriesActionsBarsContainerID)
    
    barsID = eventCategoriesActionsBarsNodeID
    ticklabelsID = eventCategoriesActionsTicklabelsNodeID
    
  } else {
    
    marginRight = px10
    plotSizes = getSizes(getElement('plot-timing'))
    
    container1 = getElement(eventCategoriesTimingContainerID)
    container2 = getElement(eventCategoriesTimingBarsContainerID)
    
    barsID = eventCategoriesTimingBarsNodeID
    ticklabelsID = eventCategoriesTimingTicklabelsNodeID
    
  }

  let heightDiv = Math.floor(0.85*plotSizes.width)

  let container1Sizes = getSizes(container1)
  container2.style.width = `${container1Sizes.width}px`
  container2.style.height = `${container1Sizes.height}px`

  let margin = {top: px0, right: marginRight, bottom: px50, left: px60}
  
  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  let svg = d3.select(containerID)
    .append('svg')
    // .classed('border-blue', true)
    .attr('id', 'svg-event-categories-chart-bars-' + `${metric.toLowerCase()}`)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)

  let chart = svg
    .append('g')
    .attr('name', 'chart-bars-1-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // ---------------------------------  SCALES AND AXIS  --------------------------------- //
  

  let axisBottomPad = px10
  axisBottomWithPad = height + axisBottomPad
  
  let axisLeftPad = px10
  axisLeftWithPad = axisLeftPad

  let yTickSize = px2

  // scales
  let xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0, width])

  let yScale = d3.scaleLinear()
    .domain([yMax, yMin])
    .range([height, 0])

  let paddingOuter = px12
  d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

  let xAxis = d3.axisBottom(xScale)
    .tickValues(range(0, 11, 2))
    .tickFormat('')
    .tickSize(0)
    .tickSizeOuter(0)
    .tickPadding(px10)

  let yAxis = d3.axisLeft(yScale)
    .tickValues(yTickValues)
    .tickFormat('')
    .tickSize(yTickSize)
    .tickSizeOuter(px5)
    .tickPadding(px10)

  let xBottom = chart.append("g").attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${axisBottomWithPad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    .call(g => g.select('.domain').remove())

  let yLeft = chart.append("g").attr('name', 'axis-left')
    .attr("transform", `translate(${-axisLeftWithPad}, 0)`)

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom, yLeft }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)


  // ---------------------------------  LABELS  --------------------------------- //


  // bars
  let bars = chart
    .append('g')
    .attr('name', 'bars')
    .attr('id', barsID + kind)

  bars
    .selectAll('rect')
    .data(data)
    .join('rect')
    .classed('theme-colors-control-img', true)
    .attr('fill', colorThemesChartDriverBarsTimingActions)
    .attr('stroke', colorThemesChartDriverBarsTimingActions)
    .attr('stroke-width', px2)
    .attr('shape-rendering', 'geometricPrecision')
    // .attr('id', d => 'chart-bar-1-' + kind + '-' + d['Number'])
    .attr('x', xScale(0))
    .attr('y', d => yScale(d['Index']) - 0.5 * barWidth)
    .attr('height', barWidth)
    .attr('width', d => xScale(d[metricNormalized]) - xScale(0))
    .attr('rx', px3)
    .attr('Color', d => d[_color])
    .attr('Number', d => d[_number])
    .attr('id', d => barsID + d[_number] + '-' + kind)


  // start and overtakes labels
  if ((metric == _overtakes) || (metric == _start)) {

    let metrics = chart
      .append('g')
      .attr('name', 'metrics')

    let metricLabels = data.map(o => o[metric]).map(Number)
    metricLabels = arrayDropNaNs(metricLabels)
    metricLabels = dropDuplicates(metricLabels)

    let lineOffset = px10
    let lineColor = colorThemesChartBorder

    let dataSorted = sortObject(data, metricNormalized)

    metricLabels.forEach((label, i) => {

      let value

      if (label == 0) {
        value = label
      } else if (label > 0) {
        value = `+${Math.abs(label)}`
      } else if (label < 0) {
        value = `-${Math.abs(label)}`
      }

      let dataLocal = copyObject(dataSorted)
      dataLocal = dataLocal.filter(o => (o[metric] == String(label)))

      if (dataLocal.length > 1) {

        let line = d3.line()
          .x(d => xScale(d[metricNormalized]) - xScale(0) + lineOffset)
          .y(d => yScale(d['Index']))

        let indexes = dataLocal.map(d => d['Index'])
        let indexMedian = arrayMedian(indexes)
        let xCoord = xScale(dataLocal[0][metricNormalized]) - xScale(0) + lineOffset

        metrics
          .append("path")
          .data([dataLocal])
          .attr('d', line)
          .style('stroke-width', px1)
          .style('stroke', lineColor)
          .style('fill', 'none')
          .style('shape-rendering', 'crispEdges')

        metrics
          .append('text')
          .data(dataLocal)
          .style('font-family', PrimaryFont)
          .style('fill', _ticklabelColor)
          .style('font-size', `${px10}px`)
          .style('font-variation-settings', colorThemesChartTimingActionsMetricWeightHbars)
          .style('text-anchor', 'start')
          .style('dominant-baseline', 'auto')
          .style('cursor', 'default')
          .text(value)
          .attr('x', xCoord)
          .attr('y', yScale(indexMedian))
          .attr('dx', px7)
          .attr('dy', px3)
          
      } else {

        let xCoord = xScale(dataLocal[0][metricNormalized]) - xScale(0) + lineOffset
        let yCoord1 = yScale(dataLocal[0]['Index']) - 0.35 * barWidth
        let yCoord2 = yScale(dataLocal[0]['Index']) + 0.35 * barWidth

        metrics
          .append('line')
          .style('stroke-width', px1)
          .style('stroke', lineColor)
          .style('fill', 'none')
          .style('shape-rendering', 'crispEdges')
          .attr('x1', xCoord)
          .attr('x2', xCoord)
          .attr('y1', yCoord1)
          .attr('y2', yCoord2)

        metrics
          .append('text')
          .data(dataLocal)
          .style('font-family', PrimaryFont)
          .style('fill', _ticklabelColor)
          .style('font-size', `${px10}px`)
          .style('font-variation-settings', colorThemesChartTimingActionsMetricWeightHbars)
          .style('text-anchor', 'start')
          .style('dominant-baseline', 'auto')
          .style('cursor', 'default')
          .text(value)
          .attr('x', d => xScale(d[metricNormalized]) - xScale(0) + lineOffset)
          .attr('y', d => yScale(d['Index']))
          .attr('dx', px7)
          .attr('dy', px3)
            
      }

    })
    
  }

  // DNC labels
  let dnc = chart
    .append('g')
    .attr('name', 'dnc-labels')

  dataDNC.forEach((obj, i) => {

    dnc
      .append('text')
      .text('-')
      .style('font-size', `${px14}px`)
      .style('fill', _ticklabelColor)
      .style('text-anchor', 'start')
      .style('alignment-baseline', 'auto')
      .style('font-variation-settings', "'wght' 700")
      .attr('x', xScale(0))
      .attr('y', yScale(obj['Index']))
      .attr('dy', px4)
      
  })

  // LABELS

  let labels = chart
    .append('g')
    .attr('name', 'labels')
    .attr('id', ticklabelsID + kind)

  let labelsPad = px10
  
  labels
    .selectAll('text')
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartDriverAbbsTimingActions)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsDriverAbbsWeightHbars)
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .attr('Number', d => d[_number])
    .text(d => d[_abbreviation])
    .attr('x', xScale(0) - axisLeftPad - labelsPad)
    .attr('y', d => yScale(d['Index']))
    .attr('dy', px5)
    .attr('id', d => ticklabelsID + d['Number'] + '-' + kind)


  // -----------------------------------  HEIGHT ADJUST  ----------------------------------- //


  let svgEl = d3GetElement(svg)
  let svgElSizes = getSizes(svgEl)
  
  let chartEl = d3GetElement(chart)
  let chartSizes = getSizes(chartEl)

  svgEl.style.height = chartSizes.height

}


function plotComparison(ContainerID, dataLeft, dataRight, colorLeft, colorRight, linestyles=['0', '0']) {

  // data -> summary (data_2)

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  
  d3.select(containerID).select('svg').remove()


  // -----------------------------------  PARAMETERS  ----------------------------------- //


  let containerSizes = getSizes(container)
  let height = containerSizes.height
  let width = 1 * height
  let center = {x: 0.5 * width, y: 0.5 * height}

  let axisOverLength = px10

  let features = [
    _consistencyNormalized, _overtakesNormalized, _paceNormalized, _startNormalized
  ]

  let labels = [
    'ПЛОТНОСТЬ', 'ОБГОНЫ', 'ТЕМП', 'СТАРТ'
  ]

  let sides = features.length
  
  let ticks = [2, 4, 6, 8, 10]
  let grid = ticks.length + 1

  // угол между осями
  let polyangle = (Math.PI * 2) / sides

  let r = 0.53 * width
  // расстояние между центром и крайней окружностью
  let r_0 = 0.65 * r
  // расстояние между центром и самой маленькой окружностью
  let r_1 = r_0 / grid
  // длина осей
  let r_2 = r_0 + axisOverLength

  let attributes = {
    'center': center,
    'polyangle': polyangle,
    'r_0': r_0,
    'r_1': r_1,
    'r_2': r_2,
    // 'axisColorRegular': '#E6EBF0',
    'axisColorRegular': colorThemesChartAxisPoly,
    'axisColorSpecial': colorThemesChartAxisPolyDark,
    'axisWidth': px1,
    'angleDelta': 0,
    'ticksOffset': px4,
    // 'tickColor': '#787B7F',
    'tickColor': _ticklabelColor,
    'fontSize': px10,
    'fontWeight': 600,
    'tickAnchors': ['end', 'end', 'end', 'end', 'end'],
    'tickDominantBaselines': ['auto', 'auto', 'auto', 'auto', 'auto'],
    'labelsFontSize': px10_5,
    'labelsFontWeight': 675,
    // 'labelsColor': '#5F6469',
    'labelsColor': colorThemesChartAxisLabels,
    'labelsTextAnchors': ['middle', 'middle', 'middle', 'middle'],
    'labelsDominantBaselines': ['auto', 'auto', 'hanging', 'hanging'],
    'labelsTextRendering': 'auto',
    'labelsOffsetX': [0, px10, 0, px10],
    'labelsOffsetY': [px10, 0, px10, 0],
    'labelsRotation': [0, 90, 0, 90],
    'lineWidth': px3,
    'meanRadius': px3,
    // 'meanColor': '#32373C'
    'meanColor': colorThemesChartChartMeanComparison
  }


  // ----------------------------------  SVG  ---------------------------------- //


  let svg = d3
    .select(containerID)
    .append('svg')
    .classed('svg-chart', true)
    .attr('id', 'svg-event-comparison-radar')
    .attr('width', `${width}px`)
    .attr('height', `${height}px`)
    .style('background', _colorBackground)

  let main = svg
    .append('g')
    .attr('name', 'plot-comparison-main-node')

  let scale = d3.scaleLinear()
    .domain([0, 10])
    .range([r_1, r_0])


  // ----------------------------------  CHART  ---------------------------------- //


  d3CircleDrawLevels(main, grid, attributes)
  d3CircleDrawAxis(main, sides, attributes)
  d3CircleDrawTicks(main, ticks, attributes)
  d3CircleDrawLabels(main, sides, labels, attributes)

  let sameDrivers = (dataLeft[_driverIDT] == dataRight[_driverIDT])

  if (sameDrivers) {
    d3CircleDrawMetric(main, dataLeft, features, colorLeft, linestyles[0], scale, sides, attributes)
  } else {
    d3CircleDrawMetric(main, dataLeft, features, colorLeft, linestyles[0], scale, sides, attributes)
    d3CircleDrawMetric(main, dataRight, features, colorRight, linestyles[1], scale, sides, attributes)
  }

  d3CircleDrawMeanPoints(main, dataLeft, features, scale, sides, attributes)
 
}


function plotLaptimes(ContainerID, laptimesData, color, kind, laptimesComparison=false, adjustCheckbox=false) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  
  d3.select(containerID).selectAll("svg > *").remove()
  d3.select(containerID).selectAll("svg").attr('width', 0)

  // clear tooltips
  let divs = container.querySelectorAll('div')
  divs.forEach(div => div.remove())


  // -------------------------------------  PARAMETERS  ------------------------------------- //


  let xtickSize = px5
  let ytickSize = px4
  let ytickSizeRight = px5

  let xtickOuterSize = px0
  let ytickOuterSize = px0

  let offsetLeft = px16
  let offsetRight = px16
  let offsetTop = px8
  let offsetBottom = px8

  let xtickPad = px16
  let ytickPad = px16

  let offsetGridX = px6
  let offsetGridY = px6

  let linesOffset = px0
  let stintLabelOffset = px0

  let compoundPadX = px24_5
  let compoundStrokedasharray = `${px16}`
  
  let compoundHeight = px21
  let compoundPadY = px12

  let markerColorBaseAlpha = 0.85

  let paddingXOuter = _axisRadius
  let paddingYOuter = 1.25 * _axisRadius
  let paddingOuterHalf = 0.5 * paddingXOuter

  // -------------------------------------  DATA  ------------------------------------- //


  let name = laptimesData[0][_fullName]
  let raceID = laptimesData[0][_raceID]
  let laps = laptimesData.map(row => row[_lapNumber])
  let lapsTotal

  if (laptimesComparison) {
    
    let lapsComp = laptimesComparison.map(row => row[_lapNumber])
    lapsTotal = laps.concat(lapsComp)

  } else{
    
    lapsTotal = laps
    
  }
  
  lapsTotal = arrayDropDuplicates(lapsTotal)

  let lastLap = Number(Math.max(...lapsTotal))

  let laptimesClear = laptimesData
    .filter(d => d[_laptimeNaN] != 1)
    .map(d => d[_laptime])

  if (laptimesComparison) {

    laptimesComparison.forEach((obj, i) => {
      laptimesComparison[i][_laptime] = Number(laptimesComparison[i][_laptime])
    })

    let laptimesComp = laptimesComparison
      .filter(d => d[_laptimeNaN] != 1)
      .map(d => d[_laptime])

    laptimesClear = laptimesClear.concat(laptimesComp)
    
  }

  let ySmallest = Math.min.apply(null, laptimesClear)
  let yLargest = Math.max.apply(null, laptimesClear)

  laptimesData.forEach((obj, i) => {

    laptimesData[i][_laptime] = Number(laptimesData[i][_laptime])

    if (obj[_laptimeNaN] == 1) {
      laptimesData[i][_laptime] = ySmallest
    }
    
  })
  
  let dataVerticalLinesStints
  
  dataVerticalLinesStints = laptimesData.filter(o => o[_stintVerticalLine] == 1)
  dataVerticalLinesStints = dataVerticalLinesStints.map(row => row[_lapNumber])

  let dataLabelsStints
  
  dataLabelsStints = laptimesData.filter(o => o['StintLabel'] == 1 && o['StintMeanConsistency'] != '-')
  
  dataLabelsStints = dataLabelsStints.map(o => ({
      'LapNumber': o[_lapNumber],
      'Consistency': o['StintMeanConsistency'],
      'Compound': o['Compound'],
      'CompoundColor': o['CompoundColor']
    }))
  
  let dataLabelsStintsLaps = dataLabelsStints.map(row => row[_lapNumber])

  let dataStintsToDecor = laptimesData.map(row => row['Stint'])
  dataStintsToDecor = dropDuplicates(dataStintsToDecor)

  let SafetyCarLeaveLaps = laptimesData.filter(o => o['SafetyCarLeave'] == 1)
  SafetyCarLeaveLaps = SafetyCarLeaveLaps.map(o => o[_lapNumber])

  let SafetyCarEnterLaps = laptimesData.filter(o => o['SafetyCarEnter'] == 1)
  SafetyCarEnterLaps = SafetyCarEnterLaps.map(o => o[_lapNumber])

  let VirtualSafetyCarLeaveLaps = laptimesData.filter(o => o['VirtualSafetyCarLeave'] == 1)
  VirtualSafetyCarLeaveLaps = VirtualSafetyCarLeaveLaps.map(o => o[_lapNumber])

  let VirtualSafetyCarEnterLaps = laptimesData.filter(o => o['VirtualSafetyCarEnter'] == 1)
  VirtualSafetyCarEnterLaps = VirtualSafetyCarEnterLaps.map(o => o[_lapNumber])

  let xMin = (isEven(lastLap)) ? 2 : 1
  let xMax = lastLap

  // let xtickValues = laps.filter((l) => l % 2 === 0)
  let xtickValues = range(xMin, xMax + 2, 2)
  
  let yStd = getStandardDeviation(laptimesClear)
  yStd = (yStd < 1) ? 1 : yStd

  let yMin = roundStep(ySmallest, 0.5, 'floor')
  let yMax = roundStep(yLargest, 0.5, 'ceil')

  // let ytickValues = generateRange(yMin, yMax, '2', res='range')

  let ytickValuesRaw = generateRange(yMin, yMax, '2', res='range')
  ytickValues = arrayAddMeanElementsInside(ytickValuesRaw)

  yMin = firstElement(ytickValues)
  yMax = lastElement(ytickValues)

  let nameEl

  let downloadItemSVG
  let downloadItemPNG

  if (kind == 'left') {
    
    nameEl = getElement(eventComparisonDownloadNameLeftID)
    downloadItemSVG = getElement(eventComparisonDownloadSVGID + '-left')
    downloadItemPNG = getElement(eventComparisonDownloadPNGID + '-left')
    
  } else if (kind == 'right') {
    
    nameEl = getElement(eventComparisonDownloadNameRightID)
    downloadItemSVG = getElement(eventComparisonDownloadSVGID + '-right')
    downloadItemPNG = getElement(eventComparisonDownloadPNGID + '-right')
    
  }

  if (laptimesData.length > 0) {

    let abbEvent = glVEvent['EventAbbreviation'].toLowerCase()

    let dataLocal = laptimesData[0]

    let abb = dataLocal['Abbreviation']
    let colorName = dataLocal['Color']

    let filename = `${glVEvent['SeasonID']}_${abbEvent}_${abb.toLowerCase()}_laptimes`

    nameEl.textContent = abb
    nameEl.style.color = colorName

    downloadItemSVG.setAttribute('download_name', filename)
    downloadItemPNG.setAttribute('download_name', filename)
    
  }


  // -------------------------------------  SVG  ------------------------------------- //
  

  let heightScale = 0.24
  
  let containerSizes = getSizes(container)
  
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(heightScale * widthDiv)

  if (getElement(ContainerID).children.length == 0) { d3.select(containerID).append('svg') }

  let svgID = 'svg-laptimes-' + ContainerID
  
  let svg = d3
    .select(containerID)
    .selectAll('svg')
    .classed('svg-chart', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', heightDiv)
    .style('background', _colorBackground)
    // .style('border', `${colorChartsFrameWidth}rem solid ${colorChartsFrame}`)
    // .style('border-radius', `${_axisRadius}rem`)
    

  let axisG = svg
    .append('g')
    .attr('name', 'axis')

  let chart = svg
    .append('g')
    .attr('name', 'chart')
    .attr('id', 'svg-laptimes-chart-' + ContainerID)


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let height = heightDiv - offsetTop - compoundHeight - compoundPadY - offsetBottom

  let yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  let yAxisLeft = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

  let yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSizeRight)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

  let yLeft = svg
    .append("g")
    .attr('name', 'axis-left')

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisLeft)
    .call(g => g.select('.domain').remove())

   let yRight = svg
    .append("g")
    .attr('name', 'axis-right')

   yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  // d3ShowEveryNTicklabel(yLeft, 2)
  // d3ShowEveryNTicklabel(yRight, 2)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftSizes = getSizes(yLeftElement)
  let yLeftWidth = Math.ceil(yLeftSizes.width)

  let yRightElement = d3GetElement(yRight)
  let yRightSizes = getSizes(yRightElement)
  let yRightWidth = Math.ceil(yRightSizes.width)


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //

  let width = widthDiv - offsetLeft - yLeftWidth - yRightWidth - offsetRight

  glVEventComparison['chartLaptimesWidth'] = width

  let xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([0, width])

  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')

  let xAxis = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickOuterSize)

  let xBottom = svg
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)
  
  let xBottomElement = d3GetElement(xBottom)
  let xBottomSizes = getSizes(xBottomElement)
  let xBottomHeight = Math.ceil(xBottomSizes.height)


  // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //


  height = height - xBottomHeight

  d3GetElement(yLeft).remove()
  d3GetElement(yRight).remove()

  yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  yAxisLeft = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

  yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSizeRight)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

  yLeft = svg
    .append("g")
    .attr('name', 'axis-left')
    .attr('id', 'svg-laptimes-axis-left-' + ContainerID)

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisLeft)
    .call(g => g.select('.domain').remove())
  
  yRight = svg
    .append("g")
    .attr('name', 'axis-right')

  yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  d3ShowEveryNTicklabel(yLeft, 2)
  d3ShowEveryNTicklabel(yRight, 2)

  let yLeftElementCorrected = d3GetElement(yLeft)
  let yRightElementCorrected = d3GetElement(yRight)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl = d3CreateAxisRectangle(axisG, width, height, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITIONS  ------------------------- //


  // y-axis left
  let transformLeftX = Math.ceil(offsetLeft + yLeftWidth)
  let transformLeftY = offsetTop + compoundHeight + compoundPadY
  yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

  // y-axis right
  let transformRightX = Math.ceil(offsetLeft + yLeftWidth + width)
  yRightElementCorrected.setAttribute('transform', `translate(${transformRightX}, ${transformLeftY})`)

   // x-axis
  let transformBottomX = Math.ceil(offsetLeft + yLeftWidth)
  let transformBottomY = Math.ceil(offsetTop + compoundHeight + compoundPadY + height)
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // axis path
  let transformAxisX = transformBottomX
  let transformAxisY = transformLeftY
  axisEl.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

  // chart
  chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)

  // for chart plot Difference
  glVEvent['ComparisonLeftAxisLeft'] = transformLeftX


  // -------------------------------------  GRID  ------------------------------------- //


  // xtick every 4th lap since second lap
  // let gridShow = range(2, xMax, 4)
  let yGridShow = ytickValues.filter((_, index) => index % 2 == 0)

  let gridXmin = height - offsetGridX
  let gridXmax = offsetGridX

  let gridYmin = width - offsetGridY
  let gridYmax = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, _colorGrid, scaleType='linear')
  
  // grid-y
  d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, gridYmin, gridYmax, _colorGrid, scaleType='linear')


  // ------------------------  ELEMENTS  ------------------------- //


  let hoverGrid = chart
    .append('g')
    .attr('name', 'hover-grid')

  // stints lines
  let stintElements = chart
    .append('g')
    .attr('name', 'stint-lines')

  let SCElements = chart
    .append('g')
    .attr('name', 'sc-lines')

  let VSCElements = chart
    .append('g')
    .attr('name', 'vsc-lines')

  let stintAndCompounds = svg
    .append('g')
    .attr('name', 'stint-and-compound-labels')
    .attr('transform', `translate(${transformBottomX}, 0)`)

  let stintLabels = stintAndCompounds
    .append('g')
    .attr('name', 'stint-labels')
  
  // stint-compound
  let compundLabels = stintAndCompounds
    .append('g')
    .attr('name', 'compound-labels')
  
  let movingAverageAndFill = chart
    .append('g')
    .attr('name', 'moving-average')

  let fillArea = movingAverageAndFill
    .append('g')
    .attr('name', 'fill-area')
  
  let movingAverage = movingAverageAndFill
    .append('g')
    .attr('name', 'moving-average')

  let markers = chart
    .append('g')
    .attr('name', 'markers')

  let hoverElements = chart
      .append('g')
      .attr('name', 'hover-elements')


  // -------------------------------------  STINT LINES  ------------------------------------- //


  // enter pit
  for (lap of dataVerticalLinesStints) {

    let xCoord = xScale(lap) + px0_5
    
    let stintLineHideCondition = (
      SafetyCarEnterLaps.includes(lap)
      || VirtualSafetyCarEnterLaps.includes(lap)
      || ((xMin == 2) & (lap == 1))
    )

    let offsetSCEnter = px47
    let offsetVSCEnter = px52

    let offsetSCLeave = px45
    let offsetVSCLeave = px50
    
    stintElements
      .append("line")
      .style('stroke', colorThemesChartStintLines)
      .style('stroke-width', px2)
      .style('stroke-linecap', 'round')
      .attr("x1", xCoord)
      .attr("x2", xCoord)
      .attr("y1", gridXmin - linesOffset)
      .attr("y2", gridXmax + linesOffset + px1)
      .style('visibility', (stintLineHideCondition) ? 'hidden' : 'visible')

    stintElements
      .append('text')
      .text('PitLane')
      .style('fill', colorThemesChartStintLines)
      .style('font-family', PrimaryFont)
      .style('font-size', `${px10}px`)
      .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
      .style('text-anchor', 'end')
      .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
      .attr('dx', (d) => {

        let result

        if (SafetyCarEnterLaps.includes(lap)) {
          result = -offsetSCEnter
        }
        
        if (VirtualSafetyCarEnterLaps.includes(lap)) {
          result = -offsetVSCEnter
        }

        if (SafetyCarLeaveLaps.includes(lap)) {
          result = -offsetSCLeave
        }

        if (VirtualSafetyCarLeaveLaps.includes(lap)) {
          result = -offsetSCLeave
        }

        return result
        
      })
      .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')

  }


  // -------------------------------------  SC LINES  ------------------------------------- //


  // SC enter
  if (SafetyCarEnterLaps.length > 0) {

    for (lap of SafetyCarEnterLaps) {

      let xCoord = xScale(lap) + 0.5 * px1

      SCElements
        .append("line")
        .style('stroke', colorThemesChartSCStart)
        .style('stroke-width', px2)
        .style('stroke-linecap', 'round')
        .attr("x1", xCoord)
        .attr("x2", xCoord)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
  
      SCElements
        .append('text')
        .text('SC Start')
        .style('font-family', PrimaryFont)
        .style('fill', colorThemesChartSCStart)
        .style('font-size', `${px10}px`)
        .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
        .style('text-anchor', 'end')
        .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')

    }

  }

  // SC leaving
  if (SafetyCarLeaveLaps.length > 0) {

    for (lap of SafetyCarLeaveLaps) {

      SCElements
        .append("line")
        .style('stroke', colorThemesChartSCEnd)
        .style('stroke-width', px2)
        .style('stroke-linecap', 'round')
        .attr("x1", xScale(lap) + 0.5 * px1)
        .attr("x2", xScale(lap) + 0.5 * px1)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')

      SCElements
        .append('text')
        .text('SC End')
        .style('font-family', PrimaryFont)
        .style('fill', colorThemesChartSCEnd)
        .style('font-size', `${px10}px`)
        .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
        .style('text-anchor', 'end')
        .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
      
    }
      
  }


  // -------------------------------------  VSC LINES  ------------------------------------- //


  // VSC enter
  if (VirtualSafetyCarEnterLaps.length > 0) {

    for (lap of VirtualSafetyCarEnterLaps) {

      let xCoord1 = xScale(lap) + 0.5 * px1

      VSCElements
        .append("line")
        .style('stroke', colorThemesChartSCStart)
        .style('stroke-width', px2)
        .style('stroke-linecap', 'round')
        .attr("x1", xCoord1)
        .attr("x2", xCoord1)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
  
      VSCElements
        .append('text')
        .text('VSC Start')
        .style('font-family', PrimaryFont)
        .style('fill', colorThemesChartSCStart)
        .style('font-size', `${px10}px`)
        .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
        .style('text-anchor', 'end')
        .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
      
    }

  }

  // VSC leaving
  if (VirtualSafetyCarLeaveLaps.length > 0) {

    for (lap of VirtualSafetyCarLeaveLaps) {

      VSCElements
        .append("line")
        .style('stroke', colorThemesChartSCEnd)
        .style('stroke-width', px2)
        .style('stroke-linecap', 'round')
        .attr("x1", xScale(lap) + 0.5 * px1)
        .attr("x2", xScale(lap) + 0.5 * px1)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')

      VSCElements
        .append('text')
        .text('VSC End')
        .style('font-family', PrimaryFont)
        .style('fill', colorThemesChartSCEnd)
        .style('font-size', `${px10}px`)
        .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
        .style('text-anchor', 'end')
        .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
      
    }
      
  }


  // -----------------------------  STINT LABELS AND COMPOUNDS  ----------------------------- //
  

  // stint-labels
  stintLabels
    .selectAll("text")
    .data(dataLabelsStints)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', color)
    .style('font-size', `${px13}px`)
    .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintConLabelsWeight}`)
    .style('cursor', 'default')
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'middle')
    .style('letter-spacing', '0.025rem')
    .text(d => d[_consistency])
    .attr("x", d => xScale(d[_lapNumber]))
    .attr('y', offsetTop + 0.5*compoundHeight + px1)
    .classed('theme-colors-control-text', true)
  
  compundLabels
    .selectAll('circle')
    .data(dataLabelsStints)
    .join('circle')
    .style('r', px10)
    .attr('r', px10)
    .style('stroke', d => saturateColor(d[_compoundColor], 0.75))
    .style('stroke-width', px2)
    .style('stroke-dasharray', compoundStrokedasharray)
    .style('fill', 'none')
    .style('opacity', 0.85)
    .attr("transform", d => `translate(${xScale(d[_lapNumber]) + compoundPadX}, ${offsetTop + 0.5*compoundHeight}) rotate(0)`)
    .style('visibility', d => (d[_compound] == ' ') ? 'hidden' : 'visible')

  compundLabels
    .selectAll('text')
    .data(dataLabelsStints)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', '#5F6469')
    .style('font-size', `${px10}px`)
    .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintCompoundLabelsWeight}`)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
    .style('cursor', 'default')
    .text(d => d[_compound])
    .attr("x", d => xScale(d[_lapNumber]) + compoundPadX)
    .attr('y', offsetTop + 0.5*compoundHeight + px1)
    .style('visibility', d => (d[_compound] == ' ') ? 'hidden' : 'visible')


  // ---------------------------------  MOVING AVERAGE  --------------------------------- //

  
  let fillAreaLine = d3.area()
    .curve(d3.curveCatmullRom.alpha(0.5))
    .defined(d => d[_laptime])
    .defined((d, i) => {

      // not fill area of alone laptimes
      let result = false

      // not first and last index
      if ((i > 0) & (i != laptimesData.length - 1)) {

        // ma exists in current point and currnt point is not stand alone laptime
        result = (
          (d[_laptimeClearPace] != '-')
          && (laptimesData[i-1][_laptimeClearPace] != '-') | (laptimesData[i+1][_laptimeClearPace] != '-')
        )

      // for last index
      } else if ((i > 0) & (i == laptimesData.length - 1)) {

        // ma exist and previous laptime exist
        result = (
          (d[_laptimeClearPace] != '-')
          && (laptimesData[i-1][_laptimeClearPace] != '-')
        )
        
      }

      return result
      
    })
    .x(d => xScale(d[_lapNumber]))
    .y0(d => yScale(d[_laptimeClearPace]))
    .y1(d => yScale(d[_laptime]))

  let movingAverageLine = d3.line()
    // .curve(d3.curveBumpX)
    // .curve(d3.curveMonotoneX)
    .curve(d3.curveCatmullRom.alpha(0.5))
    .defined(d => d[_laptimeClearPace] != '-')
    .x(d => xScale(d[_lapNumber]))
    .y(d => yScale(d[_laptimeClearPace]))

  // fill area
  fillArea
    .append('path')
    .datum(laptimesData)
    .style('fill', colorThemesChartMovingAverageFill)
    .style('stroke-width', px1)
    .style('stroke', colorThemesChartMovingAverageStroke)
    .style('shape-rendering', 'geometricPrecision')
    .attr('d', fillAreaLine)

  // moving average line
  movingAverage
    .append("path")
    .style('fill', 'none')
    .style('stroke', colorThemesChartMovingAverage)
    .style('stroke-width', convertRemToPixels(0.15))
    .data([laptimesData])
    .attr('d', movingAverageLine)


  // ----------------------------------  HOVER PART 1 - GRID LINES ---------------------------------- //


  if (notMobileDevice) {

    hoverGrid
      .append('g')
      .attr('name', 'grid-x')
      .selectAll('line')
      .data(laptimesData)
      .join('line')
      .attr('x1', d => xScale(d[_lapNumber]) + px0_5)
      .attr('x2', d => xScale(d[_lapNumber]) + px0_5)
      .attr('y1', yScale(yMax) + px1 - linesOffset)
      .attr('y2', yScale(yMin) + linesOffset)
      .style('visibility', d => (d[_laptimeNaN] == 1) ? 'hidden' : 'visible')
      .style('stroke', colorThemesChartGridTimingActions)
      .style('stroke-width', px1)
      .style('stroke-dasharray', '4 2')
      .style('stroke-dashoffset', '2')
      .style('shape-rendering', 'crispEdges')
      .style('opacity', 0)
      .attr('plot-laptimes-grid-hover', (d, i) => i)

    hoverGrid
      .append('g')
      .attr('name', 'grid-y')
      .selectAll('line')
      .data(laptimesData)
      .join('line')
      .attr('x1', xScale(xMin) + px1 - linesOffset)
      .attr('x2', xScale(xMax) + linesOffset)
      .attr('y1', (d, i) => (d[_laptimeNaN] == 1) ? yScale(yMin) : yScale(d[_laptime]))
      .attr('y2', (d, i) => (d[_laptimeNaN] == 1) ? yScale(yMin) : yScale(d[_laptime]))
      .style('visibility', d => (d[_laptimeNaN] == 1) ? 'hidden' : 'visible')
      .style('stroke', colorThemesChartGridTimingActions)
      .style('stroke-width', px1)
      .style('stroke-dasharray', '4 2')
      .style('stroke-dashoffset', '2')
      .style('shape-rendering', 'crispEdges')
      .style('opacity', 0)
      .attr('plot-laptimes-grid-hover', (d, i) => i)
    
  }

  
  // ------------------------------------  MARKERS  ------------------------------------ //


  let radius
  let symbolType
  let symbol
  let size
  let transform

  if (window.innerWidth < 450) {
    radius = px8
  } else if ((window.innerWidth > 450) && (window.innerWidth <= 1000)) {
    radius = px12
  } else if (window.innerWidth > 1000) {
    radius = px20
  }

  symbolType = (d) => {

    if (d[_overtakes] == '0.0') {
      return d3.symbolCircle
    }
    else if (d[_overtakes] == '') {
      return d3.symbolCircle
    }
    else {
      return d3.symbolTriangle2
    }
    
  }

  symbol = d3.symbol().type(symbolType)
  
  // if overtakes or lost more than 1 -> size of triangle multiple by 2.5
  size = (d) => {

    let result

    if (Math.abs(Number(d[_overtakes])) > 1) {
      result = 2.5*radius
    } else {
      result = radius
    }
    return result
    
  }

  transform = (d) => {
    
    if (Number(d[_overtakes]) < 0) {
      return `rotate(180)`
    } else {
      return `rotate(0)`
    }
    
  }

  // // to mark outliers - change their size
  // size = (d) => {

  //   let result
    
  //   if (d['LaptimeOutlier'] == 1) {
  //     result = radius + 20
  //   } else {
  //     result = radius + 0.5*Math.abs(radius * Number(d.Overtakes))
  //   }

  //   return result

  // }

  // laptimes.forEach((laptime, i) => { if (isNaN(laptime)) {laptimes[i] = ySmallest} })

  // laptimesData.forEach((obj, i) => {

  //   if (obj['LaptimeNaN'] == 1) {
  //     laptimes[i] = ySmallest
  //   }
    
  // })

  markers
    .selectAll("circle.marker")
    .data(laptimesData)
    .join("g")
    .attr('class', 'marker')
    .attr("transform", (d, i) => `translate(${xScale(d[_lapNumber]) + px0_5}, ${yScale(d[_laptime])})`)
    .append("path")
    .style('shape-rendering', 'geometricPrecision')
    .attr("d", symbol.size(size))
    .attr("transform", transform)
    .style("fill", alphaColor(color, markerColorBaseAlpha))
    .style('stroke', shadeColor(color, -0.2))
    .style('stroke-width', px1_5)
    .style('opacity', d => (d[_laptimeNaN] == 1) ? 0 : 1)
    .attr('plot-laptimes-1-mistake', d => (d[_laptimeMistake] == 1) ? 1 : 0)
    .attr('plot-laptimes-element-hover', (d, i) => i)
    .attr('color', color)


  // ------------------------------------  HOVER PART 2  ------------------------------------ //


  if (notMobileDevice) {
  
    hoverElements
      .append('g')
      .attr('name', 'circles')
      .selectAll('circle')
      .data(laptimesData)
      .join('circle')
      .attr('cx', d => xScale(d[_lapNumber]) + px0_5)
      .attr('cy', d => yScale(d[_laptime]))
      .attr('r', px6)
      .style('r', px6)
      .style("fill", 'transparent')
      .style('stroke', 'transparent')
      .style('stroke-width', px2)
      .style('opacity', d => (d[_laptimeNaN] == 1) ? 0 : 1)
      .attr('plot-laptimes-element-hover', (d, i) => i)
      .attr('color', color)
      .attr('value', d => d[_laptime])
      .attr('abb', d => d[_abbreviation])
      .attr('laptime-notna', d => (d[_laptimeNaN] == 1) ? 0 : 1)
      .attr('kind', kind)
      .attr('compound', d => d[_compound])
      .attr('tyrelife', d => d[_tyreLife])
      .attr('xcoord', d => xScale(d[_lapNumber]))
      .attr('ycoord', d => yScale(d[_laptime]))
      .attr('laptimediff', d => d[_laptimeDiff])
      .attr('position', d => d[_position])
      .classed('theme-colors-control-img', true)
      
    let rectHeight = px30
    let rectWidth = Math.ceil(0.5 * d3GetBandwidthLinear(xBottom))

    hoverElements
      .append('g')
      .attr('name', 'rectangles')
      .selectAll('rect')
      .data(laptimesData)
      .join('rect')
      .attr('x', o => xScale(o[_lapNumber]) - 0.5*rectWidth)
      .attr('y', o => yScale(o[_laptime]) - 0.5*rectHeight)
      .attr('width', o => (o[_laptimeNaN] == 1) ? 0 : rectWidth)
      .attr('height', o => (o[_laptimeNaN] == 1) ? 0 : rectHeight)
      .style('fill', 'transparent')
      .on('mouseenter', function(event, d) {
  
        let idx = laptimesData.indexOf(d)
    
        let grids = getElementsListByAttribute('plot-laptimes-grid-hover', idx)
        grids.forEach((grid, i) => {
          grid.style.opacity = 1
        })
  
        showTooltip(event, d, idx)
        
      })
      .on('mouseleave', function(event, d) {
  
        let idx = laptimesData.indexOf(d)
  
        let grids = getElementsListByAttribute('plot-laptimes-grid-hover', idx)
        grids.forEach((grid, i) => {
          grid.style.opacity = 0
        })

        hideTooltip(event, d, idx)

      })
    
  }


  // ----------------------------- TOOLTIP ----------------------------- //

  
  let tooltip
  let showTooltip
  let hideTooltip

  let svgElement = d3GetElement(svg)
  let svgSizes1 = getSizes(svgElement)

  let svgLeft = svgSizes1.left - getSizes(getElement(ContainerID)).left

  if (notMobileDevice) {

    tooltip = d3
      .select(containerID)
      .append('div')
      .classed('tooltip p-absolute', true)

    let tooltipElement = d3GetElement(tooltip)
  
    showTooltip = function(event, d, idx) {
  
      let data = {
        'left': {name: null, laptime: null, color: null, compound: null, tyrelife: null},
        'right': {name: null, laptime: null, color: null, compound: null, tyrelife: null},
      }
  
      let elementsHover = getElementsListByAttribute('plot-laptimes-element-hover', idx)

      let rectHover = []
      let circlesHover = []
      let markersHover = []

      elementsHover.forEach((element, i) => {

        if (element['tagName'] == 'circle') {
          circlesHover.push(element)
        } else if (element['tagName'] == 'rect') {
          rectHover.push(element)
        } else if (element['tagName'] == 'path') {
          markersHover.push(element)
        }

      })

      rectHover.forEach((rect, i) => {
        rect.style.fill = alphaColor(rect.getAttribute('color'), 0.5, _colorBackground)
        rect.style.stroke = alphaColor(rect.getAttribute('color'), 0.75, _colorBackground)
      })

      // markersHover.forEach((marker, i) => {
      //   marker.style.fill = marker.getAttribute('color')
      //   marker.style.transition = 'none'
      // })
      
      circlesHover.forEach((circle, i) => {
  
        let kind = circle.getAttribute('kind')
        let notna = circle.getAttribute('laptime-notna') == 1
        let laptime = circle.getAttribute('value')
  
        if (kind == 'left') {
  
          data['left']['name'] = circle.getAttribute('abb')
          data['left']['color'] = circle.getAttribute('color')
          data['left']['tyrelife'] = circle.getAttribute('tyrelife')
          data['left']['xcoord'] = Number(circle.getAttribute('xcoord')) + transformBottomX + offsetLeft + svgLeft
          data['left']['ycoord'] = Number(circle.getAttribute('ycoord')) + transformLeftY + offsetTop
          data['left']['laptimediff'] = circle.getAttribute('laptimediff')
          data['left']['position'] = circle.getAttribute('position')

          let compound = circle.getAttribute('compound')

          if (compound != null) {

            if (compound.trim().length == 0) {
              data['left']['compound'] = '-'
            } else {
              data['left']['compound'] = compound
            }
            
          }
  
          if (notna) {
            data['left']['laptime'] = laptime
            data['left']['label'] = secToLabel(laptime)
          } else {
            data['left']['laptime'] = null
            data['left']['label'] = ''
          }
          
        } else if (kind == 'right') {
  
          data['right']['name'] = circle.getAttribute('abb')
          data['right']['color'] = circle.getAttribute('color')
          data['right']['tyrelife'] = circle.getAttribute('tyrelife')
          data['right']['xcoord'] = Number(circle.getAttribute('xcoord')) + transformBottomX + offsetLeft + svgLeft
          data['right']['ycoord'] = Number(circle.getAttribute('ycoord')) + transformLeftY + offsetTop
          data['right']['laptimediff'] = circle.getAttribute('laptimediff')
          data['right']['position'] = circle.getAttribute('position')

          let compound = circle.getAttribute('compound')

          if (compound != null) {

            if (compound.trim().length == 0) {
              data['right']['compound'] = '-'
            } else {
              data['right']['compound'] = compound
            }
            
          }
  
          if (notna) {
            data['right']['laptime'] = laptime
            data['right']['label'] = secToLabel(laptime)
          } else {
            data['right']['laptime'] = null
            data['right']['label'] = ''
          }
          
        }
  
      })
  
      if (data['left']['color'] == data['right']['color']) {
        data['right']['color'] = modColor(data['left']['color'])
      }

      let leftNotNaN = data['left']['laptime'] != null
      let rightNotNaN = data['right']['laptime'] != null
  
      let diff
      let diffColor

      if ((leftNotNaN) && (rightNotNaN)) {
        diff = data['left']['laptime'] - data['right']['laptime']
      } else{
        diff = ''
      }
  
      if (diff > 0) {
        diffColor = data['right']['color']
      } else if (diff < 0) {
        diffColor = data['left']['color']
      } else {
        diffColor = '#444749'
      }
  
      if (diff != '') {
        diff = Math.abs(diff).toFixed(3)
      }
    
      // lap number
      let lapNumber = Number(d[_lapNumber]).toFixed(0)

      // circle color
      circlesHover.forEach((circle, i) => {
  
        let kind = circle.getAttribute('kind')
  
        if (kind == 'left') {
          circle.style.stroke = data['left']['color']
        } else if (kind == 'right') {
          circle.style.stroke = data['right']['color']
        }
        
      })
  
      let tooltipHTML
      let compondLeftText
      let compondRightText

      if (data['left']['compound'] != '-') {
        compondLeftText = `${data['left']['compound']}, ${data['left']['tyrelife']} кр.`
      } else {
        compondLeftText = '-'
      }

      if (data['right']['compound'] != '-') {
        compondRightText = `${data['right']['compound']}, ${data['right']['tyrelife']} кр.`
      } else {
        compondRightText = '-'
      }

      // only right
      if (!leftNotNaN) {
  
        tooltipHTML = `
          <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
  
            <div class='laptimes-board-title'>
              <div>Круг</div>
              <div class='ms-025'>${lapNumber}</div>
            </div>
          
            <div class='mt-075'>
          
              <div class='tooltip-column-container ms-0'>
                <div>
                  <div class='he-1 laptimes-board-title' style='color:${data['right']['color']}'>${data['right']['name']}</div>
                  <div class='laptimes-board-text laptimes-board-value-laptime he-1 ms-05' >${data['right']['label']}</div>
                </div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>
  
              <div class='tooltip-column-container laptimes-board-text'>
                <div class='laptimes-board-value-laptimediff he-1'>${data['right']['laptimediff']}</div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>
          
              <div class='tooltip-column-container laptimes-board-text'>
                <div class='he-1'>${compondRightText}</div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>

              <div class='tooltip-column-container laptimes-board-text'>
                <div class='he-1'>
                  <div>P</div>
                  <div class='ms-01'>${data['right']['position']}</div>
                </div>
              </div>
              
            </div>
          
          </div>
        `

      // only left
      } else if (!rightNotNaN) {
        
        tooltipHTML = `
          <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
  
            <div class='laptimes-board-title'>
              <div>Круг</div>
              <div class='ms-025'>${lapNumber}</div>
            </div>
  
            <div class='flex mt-075'>
  
              <div class='tooltip-column-container laptimes-board-text ms-0'>
                <div>
                  <div class='laptimes-board-title he-1' style='color:${data['left']['color']}'>${data['left']['name']}</div>
                  <div class='laptimes-board-text laptimes-board-value-laptime he-1 ms-05'>${data['left']['label']}</div>
                </div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>
  
              <div class='tooltip-column-container laptimes-board-text'>
                <div class='laptimes-board-value-laptimediff he-1'>${data['left']['laptimediff']}</div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>
  
              <div class='tooltip-column-container laptimes-board-text'>
                <div class='he-1'>${compondLeftText}</div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>

              <div class='tooltip-column-container laptimes-board-text'>
                <div class='he-1'>
                  <div>P</div>
                  <div class='ms-01'>${data['left']['position']}</div>
                </div>
              </div>
              
            </div>
  
          </div>
  
        `

      // both
      } else {
  
        tooltipHTML = `
          <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
  
            <div class='laptimes-board-title'>
              <div>Круг</div>
              <div class='ms-025'>${lapNumber}</div>
            </div>
  
            <div class='mt-075'>
  
              <div class='tooltip-column-container laptimes-board-title ms-0'>
                <div class='he-1' style='color:${data['left']['color']}'>${data['left']['name']}</div>
                <div class='he-1 mt-05' style='color:${data['right']['color']}'>${data['right']['name']}</div>
              </div>

              <div class='tooltip-column-container laptimes-board-text'>
                <div class='laptimes-board-value-laptime he-1'>${data['left']['label']}</div>
                <div class='laptimes-board-value-laptime he-1 mt-05'>${data['right']['label']}</div>
              </div>
  
              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
                <div class='he-1 mt-05'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>
  
              <div class='tooltip-column-container laptimes-board-text'>
                <div class='laptimes-board-value-laptimediff he-1'>${data['left']['laptimediff']}</div>
                <div class='laptimes-board-value-laptimediff he-1 mt-05'>${data['right']['laptimediff']}</div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
                <div class='he-1 mt-05'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>
  
              <div class='tooltip-column-container laptimes-board-text'>
                <div class='flex he-1'>${compondLeftText}</div>
                <div class='flex he-1 mt-05'>${compondRightText}</div>
              </div>

              <div class='tooltip-column-container'>
                <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
                <div class='he-1 mt-05'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
              </div>

              <div class='tooltip-column-container laptimes-board-text'>
                <div class='flex he-1'>
                  <div>P</div>
                  <div class='ms-01'>${data['left']['position']}</div>
                </div>
                <div class='flex he-1 mt-05'>
                  <div>P</div>
                  <div class='ms-01'>${data['right']['position']}</div>
                </div>
              </div>
              
            </div>
  
          </div>
    
          <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
          
            <div>
              <div class='laptimes-board-text'>Дельта</div>
              <div class='laptimes-board-title ms-05' style='color:${diffColor}'>${diff}</div>
            </div>
          
          </div>
  
        `
        
      }
  
      tooltipElement.innerHTML = tooltipHTML
  
      let tooltipSizes = getSizes(tooltipElement)
      let tooltipHeight = tooltipSizes.height
      let tooltipWidth = tooltipSizes.width
  
      let tooltipXOffset = px16
      let tooltipYOffset = px16
  
      let yAxisRightCoord = getSizes(d3GetElement(yRight)).left
  
      let markerXCoord
      let markerYCoord
  
      if (kind == 'left') {
        
        markerXCoord = Number(data['left']['xcoord']) - offsetLeft
        markerYCoord = Number(data['left']['ycoord']) - offsetTop
        
      } else if (kind == 'right') {
        
        markerXCoord = Number(data['right']['xcoord']) - offsetLeft
        markerYCoord = Number(data['right']['ycoord']) - offsetTop
        
      }
  
      let tooltipAxisPad = px16
  
      let tooltipXPad
  
      let rect = event.target
      let rectSizes = getSizes(rect)
      let rectCenterX = rectSizes.left + 0.5*rectSizes.width
  
      if (tooltipWidth > yAxisRightCoord - rectCenterX - tooltipAxisPad) {
        tooltipXPad = tooltipXOffset + tooltipWidth
      } else {
        tooltipXPad = -tooltipXOffset
      }
  
      let tooltipYPad = tooltipHeight + tooltipYOffset
  
      let tooltipCoordLeft = markerXCoord - tooltipXPad
      let tooltipCoordTop = markerYCoord - tooltipYPad
  
      tooltipElement.style.left = `${tooltipCoordLeft}px`
      tooltipElement.style.top = `${tooltipCoordTop}px`
  
      tooltipElement.style.opacity = 1
      
    }
  
    hideTooltip = function(event, d, idx) {

      let elementsHover = getElementsListByAttribute('plot-laptimes-element-hover', idx)

      let rectHover = []
      let circlesHover = []
      let markersHover = []

      elementsHover.forEach((element, i) => {

        if (element['tagName'] == 'circle') {
          circlesHover.push(element)
        } else if (element['tagName'] == 'rect') {
          rectHover.push(element)
        } else if (element['tagName'] == 'path') {
          markersHover.push(element)
        }
          
      })

      rectHover.forEach((rect, i) => {
        rect.style.fill = rect.getAttribute('color')
        rect.style.stroke = rect.getAttribute('color')
      })

      // markersHover.forEach((marker, i) => {
      //   marker.style.fill = alphaColor(marker.getAttribute('color'), markerColorBaseAlpha)
      //   marker.style.transition = 'all 1s'
      // })

      circlesHover.forEach((circle, i) => {
        circle.style.stroke = 'transparent'
      })
      
      tooltipElement.style.opacity = 0

      window.onresize = () => {
        tooltipElement.style.opacity = 0
      }
        
    }

  }

}


function plotDifference(ContainerID, laptimesData, summaryData, colors) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  
  d3.select(containerID).selectAll("svg > *").remove()


  // -------------------------------------  PARAMETERS  ------------------------------------- //


  let xtickSize = px5
  let ytickSize = px4

  let xtickOuterSize = px0
  let ytickOuterSize = px0

  let offsetLeft = px8
  let offsetRight = offsetLeft + px4
  let offsetTop = px8
  let offsetBottom = px8

  let xTicksOffset = px16
  let yTicksOffset = px16

  let offsetGridX = px6
  let offsetGridY = px6

  let paddingXOuter = _axisRadius
  let paddingYOuter = 1.25 * _axisRadius
  let paddingOuterHalf = 0.5 * paddingXOuter

 
  // -------------------------------------  DATA  ------------------------------------- //


  let dataLeft = laptimesData[0]
  let dataRight = laptimesData[1]

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let summaryLeft = summaryData[0]
  let summaryRight = summaryData[1]

  let raceID = dataLeft[0][_raceID]

  let lapsLeft = dataLeft.map(row => row[_lapNumber])
  let lapsRight = dataRight.map(row => row[_lapNumber])

  let laps = lapsLeft.concat(lapsRight)
  laps = dropDuplicates(laps)
  let lastLap = Number(Math.max(...laps))

  let xMin = (isEven(lastLap)) ? 2 : 1
  let xMax = lastLap

  let xtickValues = range(xMin, xMax + 2, 2)

  let data = []

  let dataRightLaptimesNaNs = dataRight.filter(d => d[_laptimeNaN] == 1)
  let conditionRight = dataRight.length != dataRightLaptimesNaNs.length

  let dataLeftLaptimesNaNs = dataLeft.filter(d => d[_laptimeNaN] == 1)
  let conditionLeft = dataLeft.length != dataLeftLaptimesNaNs.length

  // old method - clear pace
  // let laptimesDifferenceCleared = []

  // if both drivers not retired on first lap or warm-up lap
  if (conditionLeft && conditionRight) {

    laps.forEach((lap, i) => {

      let data1 = dataLeft.filter(o => o[_lapNumber] == lap)[0]
      let data2 = dataRight.filter(o => o[_lapNumber] == lap)[0]
  
      let diff
      let meanLineLap = 1

      let diffClear
      let isMistake = 0

      let paceDiffClear

      if (data1 && data2) {

        diff = data2[_laptime] - data1[_laptime]
        // diffClear = data2['LaptimeClear'] - data1['LaptimeClear']
        paceDiffClear = - (data2[_paceDiffClear] - data1[_paceDiffClear])

        let pitLap = ((data1[_pitLap] == 1) | (data2[_pitLap] == 1))

        if (isNaN(diff) || pitLap) {
          diff = 0
        }

        let laptimeIsNaN = ((data1[_laptimeNaN] == 1) || (data2[_laptimeNaN] == 1))

        if (laptimeIsNaN) {
          meanLineLap = 0
          diff = 0
        }

        if ((data1[_laptimeMistake] == 1) || (data2[_laptimeMistake] == 1)) {
          isMistake = 1
        }
        
        data.push({
          LapNumber: lap,
          LaptimesDifference: diff,
          DrawMeanLine: meanLineLap,
          isMistake: isMistake,
          PaceDiffClear: paceDiffClear
        })
        
      }
      
    })

    let clearPaceDiffAvg = data.map(o => o[_paceDiffClear]).filter(NaNs)
    clearPaceDiffAvg = arrayAverage(clearPaceDiffAvg)
    
    let clearPaceDiffAvgAbs

    if (clearPaceDiffAvg) {
      
      clearPaceDiffAvgAbs = Math.abs(clearPaceDiffAvg.toFixed(3))
      clearPaceDiffAvgAbs = stringAddZeros(clearPaceDiffAvgAbs, 3)
      
    } else {
      
      clearPaceDiffAvgAbs = '-'
      
    }

    let clearPaceDiffColor

    if (clearPaceDiffAvg > 0) {
      clearPaceDiffColor = colorLeft
    } else if (clearPaceDiffAvg < 0) {
      clearPaceDiffColor = colorRight
    } else {
      clearPaceDiffColor = '#BBBBBB'
    }

    let clearPaceValueEl = getElement(eventComparisonplotDiffMeanValueID)

    clearPaceValueEl.textContent = clearPaceDiffAvgAbs
    clearPaceValueEl.style.color = clearPaceDiffColor

    let diffValues = data.map(o => o[_laptimesDifference])
    let diffValuesWAvg = diffValues.concat(clearPaceDiffAvg)
    
    let yMin = Math.min.apply(null, diffValuesWAvg)
    yMin = Math.min(0, yMin)
    let yMax = Math.max.apply(null, diffValuesWAvg)
    yMax = Math.max(0, yMax)
  
    // let ytickValues = generateRange(yMin, yMax, '3', res='range')

    let ytickValuesRaw = generateRange(yMin, yMax, '1', res='range')
    ytickValues = arrayAddMeanElementsInside(ytickValuesRaw)
    // ytickValues = ytickValues.map(Math.abs)

    yMin = firstElement(ytickValues)
    yMax = lastElement(ytickValues)

    let abbLeft = dataLeft[0][_abbreviation].toLowerCase()
    let abbRight = dataRight[0][_abbreviation].toLowerCase()
    let abbEvent = glVEvent[_eventAbbreviation].toLowerCase()

    let filename = `${glVEvent[_seasonID]}_${abbEvent}_${abbLeft}_${abbRight}_laptimes_diff`

    let downloadItemSVG = getElement(eventComparisonDownloadSVGID + '-diff')
    downloadItemSVG.setAttribute('download_name', filename)
    
    let downloadItemPNG = getElement(eventComparisonDownloadPNGID + '-diff')
    downloadItemPNG.setAttribute('download_name', filename)
    

    // -------------------------------------  SVG  ------------------------------------- //


    // let widthInREM = 70
    let heightScale = 0.15

    let containerSizes = getSizes(container)
    let widthDiv = Math.floor(containerSizes.width)
    let heightDiv = Math.floor(heightScale * widthDiv)
  
    if (getElement(ContainerID).children.length == 0) {
      d3.select(containerID).append('svg')
    }
    
    let svg = d3
      .select(containerID).selectAll('svg')
        // .classed('border-blue', true)
      .attr('name', 'svg')
      .attr('id', 'svg-laptimes-difference-' + ContainerID)
      .attr('width', widthDiv)
      .attr('height', heightDiv)
      // .style('border', `${colorChartsFrameWidth}rem solid ${colorChartsFrame}`)
      // .style('border-radius', `${_axisRadius}rem`)
      .style('background', _colorBackground)

    let chart = svg
      .append('g')
      .attr('name', 'chart')


    // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //

    
    let width = glVEventComparison['chartLaptimesWidth']

    let xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])
  
    d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')

    let xMaxScaled = xScale(xMax)
    let xMinScaled = xScale(xMin)
  
    let xAxis = d3
      .axisBottom(xScale)
      .tickValues(xtickValues)
      .tickSize(xtickSize)
      .tickSizeOuter(xtickOuterSize)
  
    let xBottom = svg
      .append("g")
      .attr('name', 'axis-bottom')
  
    xBottom
      .append('g')
      .attr('name', 'ticks')
      .call(xAxis)
      .call(g => g.select('.domain').remove())

    d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksOffset, _axisColor, _ticklabelColor)
  
    let xBottomElement = d3GetElement(xBottom)
    let xBottomSizes = getSizes(xBottomElement)
    let xBottomHeight = Math.ceil(xBottomSizes.height)

  
    // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //
  

    let height = heightDiv - offsetTop - xBottomHeight - offsetBottom
  
    let yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])
  
    d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

    let yMaxScaled = yScale(yMax)
    let yMinScaled = yScale(yMin)

    let yAxisLeft = d3
      .axisLeft(yScale)
      .tickSize(ytickSize)
      .tickValues(ytickValues)
      .tickFormat(d => parseFloat(Math.abs(d).toFixed(0)))
      .tickSizeOuter(ytickOuterSize)
  
    let yAxisRight = d3.axisRight(yScale)
      .tickSize(ytickSize)
      .tickValues(ytickValues)
      .tickFormat(d => parseFloat(Math.abs(d).toFixed(3)))
      .tickSizeOuter(ytickOuterSize)

    let yLeft = svg
      .append("g")
      .attr('name', 'axis-left')
  
    yLeft
      .append('g')
      .attr('name', 'ticks')
      .call(yAxisLeft)
      .call(g => g.select('.domain').remove())

    let yRight = svg
      .append("g")
      .attr('name', 'axis-right')
  
    yRight
      .append('g')
      .attr('name', 'ticks')
      .call(yAxisRight)
      .call(g => g.select('.domain').remove())
  
    d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', yTicksOffset, _axisColor, _ticklabelColor)
  
    yRight
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', yTicksOffset)

    d3ShowEveryNTicklabel(yLeft, 2)
    d3ShowEveryNTicklabel(yRight, 2)

    let yLeftElement = d3GetElement(yLeft)
    let yLeftSizes = getSizes(yLeftElement)
    let yLeftWidth = Math.ceil(yLeftSizes.width)

    let yRightElement = d3GetElement(yRight)
    let yRightSizes = getSizes(yRightElement)
    let yRightWidth = Math.ceil(yRightSizes.width)


    // ------------------------  AXIS PATH  ------------------------- //


    let axisEl = d3CreateAxisRectangle(svg, width, height, _axisRadius, _axisColor, _tickLineWidth)


    // ------------------------  TRANSITIONS  ------------------------- //


    // y-axis
    let transformLeftX = Math.ceil(offsetLeft + yLeftWidth)
    let transformLeftY = offsetTop
    yLeftElement.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

    // y-axis
    let transformRightX = Math.ceil(offsetLeft + yLeftWidth + width)
    yRightElement.setAttribute('transform', `translate(${transformRightX}, ${transformLeftY})`)
  
     // x-axis
    let transformBottomX = Math.ceil(offsetLeft + yLeftWidth)
    let transformBottomY = Math.ceil(offsetTop + height)
    xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

    // axis path
    let transformAxisX = transformBottomX
    let transformAxisY = transformLeftY
    axisEl.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

    // chart
    chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)

    // svg
    let transformSvgX = glVEvent['ComparisonLeftAxisLeft'] - offsetLeft - yLeftWidth
    svg.attr('width', offsetLeft + yLeftWidth + width + yLeftWidth + offsetRight)
    svg.attr('transform', `translate(${transformSvgX}, 0)`)
    

    // -------------------------------------  GRID  ------------------------------------- //
    

    let yGridLessZero = ytickValues.filter(o => o < 0)
    let yGridShowLessZero = ytickValues.filter((_, index) => index % 2 == 0)

    let yGridMoreZero = ytickValues.filter(o => o >= 0)
    let yGridShowMoreZero = ytickValues.filter((_, index) => index % 2 == 0)

    let yGridShow = yGridShowLessZero.concat(yGridShowMoreZero)

    let gridXmin = height - offsetGridX
    let gridXmax = offsetGridX
  
    let gridYmin = width - offsetGridY
    let gridYmax = offsetGridY
    
    // grid-x
    d3DrawXGrid(chart, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, _colorGrid, scaleType='linear')
    
    // grid-y
    d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, gridYmin, gridYmax, _colorGrid, scaleType='linear')


    // -------------------------------------  ELEMENTS  ------------------------------------- //


    let hoverGrid = chart
      .append('g')
      .attr('name', 'hover-grid')

    let bars = chart
      .append('g')
      .attr('name', 'bars')

    let average = chart
      .append('g')
      .attr('name', 'average')


    // ----------------------------------  HOVER PART 1 ---------------------------------- //

  
    if (notMobileDevice) {

      hoverGrid
        .append('g')
        .attr('name', 'grid')
        .selectAll('line')
        .data(data)
        .join('line')
        .attr('x1', d => xScale(d[_lapNumber]) + px0_5)
        .attr('x2', d => xScale(d[_lapNumber]) + px0_5)
        .attr('y1', yScale(yMax) + px1)
        .attr('y2', yScale(yMin))
        .style('visibility', d => (d['DrawMeanLine'] == 0) ? 'hidden' : 'visible')
        .style('stroke', colorThemesChartGridTimingActions)
        .style('stroke-width', px1)
        .style('stroke-dasharray', '4 2')
        .style('stroke-dashoffset', '0')
        .style('shape-rendering', 'crispEdges')
        .style('opacity', 0)
        .attr('plot-laptimes-grid-hover', (d, i) => i)
  
      hoverGrid
        .append('g')
        .attr('name', 'grid')
        .selectAll('line')
        .data(data)
        .join('line')
        .attr('x1', xScale(xMin))
        .attr('x2', xScale(xMax))
        .attr('y1', d => yScale(d[_laptimesDifference]))
        .attr('y2', d => yScale(d[_laptimesDifference]))
        .style('visibility', d => (d[_laptimeNaN] == 1) ? 'hidden' : 'visible')
        .style('stroke', colorThemesChartGridTimingActions)
        .style('stroke-width', px1)
        .style('stroke-dasharray', '4 2')
        .style('stroke-dashoffset', '4')
        .style('shape-rendering', 'crispEdges')
        .style('opacity', 0)
        .attr('plot-laptimes-grid-hover', (d, i) => i)
      
    }
  
  
    // -------------------------------------  BARS  ------------------------------------- //

    let barWidth = px4
    
    if (data.length > 0) {

      bars
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => xScale(d[_lapNumber]) - 0.5 * barWidth + px0_5)
        .attr('y', d => yScale(Math.max(0, d[_laptimesDifference])))
        .attr('width', barWidth)
        .attr('height', d => Math.round(Math.abs(yScale(0) - yScale(d[_laptimesDifference]))))
        .attr('color', d => d[_laptimesDifference] > 0 ? saturateColor(colorLeft, 0.8) : saturateColor(colorRight, 0.8))
        .attr('plot-laptimes-element-hover', (o, i) => i)
        .style('stroke', d => d[_laptimesDifference] > 0 ? saturateColor(colorLeft, 0.8) : saturateColor(colorRight, 0.8))
        .style('stroke-width', px2)
        .style('fill', d => d[_laptimesDifference] > 0 ? saturateColor(colorLeft, 0.8) : saturateColor(colorRight, 0.8))
        .style('shape-rendering', 'geometricPrecision')
        .attr('rx', px3)
      
    }


    // -------------------------------------  AVERAGE CLEAR  ------------------------------------- //

    if (data.length > 0) {

      let dataLine = data.filter(o => o['DrawMeanLine'] == 1)

      if (dataLine.length > 1) {

        average
          .append('line')
          .style('stroke', colorPlotDifferenceMeanLine)
          .style('stroke-width', px2)
          .style('stroke-dasharray', '4 4')
          .style('stroke-dashoffset', '2')
          .attr('shape-rendering', 'geometricPrecision')
          .attr('stroke-linecap', 'round')
          .attr('x1', xScale(dataLine[0][_lapNumber]) - 1.5 * barWidth)
          .attr('x2', xScale(lastElement(dataLine)[_lapNumber]) + 1.5 * barWidth)
          .attr('y1', yScale(clearPaceDiffAvg))
          .attr('y2', yScale(clearPaceDiffAvg))
          
      }
      
    }
    
  }

}


function chartLine_1(data1, ContainerID, tableID, metric) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)

  metric = metric.replace('Avg', '')

  
  // --------------------------------  PARAMETERS  -------------------------------- //


  let xTicksPad = px12
  let yTicksPad = px12
  
  let xPad = px0
  let yPad = px0

  let xtickSize = px5
  let ytickSize = px4

  let axisRadius = _axisRadius

  let paddingXOuter = axisRadius + px2
  let paddingYOuter = axisRadius + px2

  let offsetLeft = yTicksPad
  let offsetRight = px1
  let offsetTop = px0
  let offsetBottom = xTicksPad
  
  let offsetLegendY = px8


  // --------------------------------  DATA  -------------------------------- //


  let data = structuredClone(data1)

  // let positions = data.map(d => d['ClassifiedPositionOrder']).map(Number)
  let metricValues = data.map(d => d[metric]).map(Number)
  metricValues = arrayDropNaNs(metricValues)

  let metricMin = Math.min.apply(Math, metricValues)
  let metricMax = Math.max.apply(Math, metricValues)
  
  metricMin = Math.floor(metricMin)
  metricMax = Math.ceil(metricMax)

  let yTickRangeDensity = 2

  if (metric == 'PointsInterpolated') {
    yTickRangeDensity = 1
  }

  let raceIDs = data.map(row => row['RaceID'])
  raceIDs = dropDuplicates(raceIDs)

  let driverIDTs = data.map(row => row['DriverIDT'])
  driverIDTs = dropDuplicates(driverIDTs)

  let downloadTitle = dropdown12Data.filter(o => o['chartLine1Metric'] == metric)[0]['downloadTitle']
  let filename = `${glVSeason['SeasonID']}_rating_${downloadTitle}`

  let itemSVG = getElement(seasonCategoriesDownloadSVGID)
  downloadItemFill(itemSVG, filename)

  let itemPNG = getElement(seasonCategoriesDownloadPNGID)
  downloadItemFill(itemPNG, filename)


  // --------------------------------  X-TICKVALUES, Y-TICKVALUES  -------------------------------- //


  let xtickValues = []

  let yMin = metricMin
  let yMax = metricMax

  if (isEven(yMax)) { yMax += 1 }
  if (metric == 'PointsInterpolated') {yMax = 10}

  let ytickValues = range(yMin, yMax + 1, yTickRangeDensity)

  raceIDs.forEach((raceID, i) => {

    let dataLocal = data.filter((d) => d.RaceID == raceID)

    xtickValues.push({tick: dataLocal[0]['EventIndex'], label: dataLocal[0]['EventAbbreviation']})
    
  })


  // --------------------------------  SVG  -------------------------------- //


  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(containerSizes.height)

  let svgID = 'chart-line-1'
  let chartID = svgID + '-chart'

  let legendSVGID = svgID + '-legend-svg'
  let legendID = svgID + '-legend'

  let svg
  let svgLegend

  let svgEl = getElement(svgID)
  let svgLegendEl = getElement(legendSVGID)

  if (svgLegendEl) {

    clearElement(svgLegendEl)

    svgLegend = d3.select('#' + legendSVGID)
    
  } else {

    // create legend svg
    svgLegend = d3
      .select(containerID)
      .append('svg')
      .attr('id', legendSVGID)

    svgLegendEl = d3GetElement(svgLegend)
    
  }

  // if svg element exists - chart already builded
  if (svgEl) {

    // clear all svg content
    svgEl.innerHTML = ''

    // select svg
    svg = d3.select('#' + svgID)   

  // if svg not exist
  } else {

    // create svg
    svg = d3
      .select(containerID)
      .append('svg')
      .attr('id', svgID)
    
    svgEl = d3GetElement(svg)

  }

  svgLegend
    // .attr('width', widthDiv)
    .style('background', _colorBackground)

  svg
    .attr('width', widthDiv)
    // .attr('height', heightDiv)
    .style('background', _colorBackground)

  let chart = svg
    .append('g')
    .attr('name', 'chart')
    .attr('id', chartID)

  let chartElement = d3GetElement(chart)
  
  // -------------------------  LEGEND  ------------------------- //


  let legend1Attributes = {
    'intervalInner': px12,
    'labelSize': 0.75,
    'markerCircleNoFillRadius': px5,
    'markerCircleRadius': px5,
    'labelColor': colorThemesChartChartLineLegendInfo
  }

  let legendLabels = [
    'Не финишировал, но классифицирован в рейтинге', 'Не классифицирован в рейтинге'
  ]

  // drivers names legend
  d3legend(
    legendSVGID, 'legend', legendID,
    ['circle w point', 'circle no fill'],
    legendLabels,
    [_ticklabelColor, _ticklabelColor], attributesDict=legend1Attributes)

  let legendEl = getElement(legendID)
  let legendSizes = getSizes(legendEl)
  let legendWidth = legendSizes.width
  let legendHeight = legendSizes.height
  let legendHalfHeight = 0.5*legendHeight


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let height = heightDiv - legendHeight - offsetLegendY -  - offsetTop - xPad - xPad - offsetBottom

  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  let yAxis = d3.axisLeft(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d3.format('d'))

  let yLeft = svg
    .append("g")
    .attr('name', 'axis-left')

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftSizes = getSizes(yLeftElement)
  let yLeftWidth = Math.ceil(yLeftSizes.width)


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


  // border correction
  
  let width = widthDiv - offsetLeft - yLeftWidth - yPad -yPad - offsetRight

  // scales
  let xScale = d3.scaleBand()
    .domain(xtickValues.map(o => o['tick']))
    .range([0, width])
    .paddingInner(1)

  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

  let xAxis = d3.axisBottom(xScale)
    .tickSize(xtickSize)
    .tickFormat('')

  let xBottom = svg
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    .call(g => g.select('.domain').remove())

  xBottom
    .append('g')
    .attr('name', 'labels')
    .selectAll('text')
    .data(xtickValues)
    .join('text')
    .text(d => d['label'])
    .attr("x", d => xScale(d['tick']) + 0.5 * xScale.bandwidth())
    .attr("y", xtickSize)

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px10, axis='x', xTicksPad, _axisColor, _ticklabelColor)
  
  let xBottomElement = d3GetElement(xBottom)
  let xBottomSizes = getSizes(xBottomElement)
  let xBottomHeight = Math.floor(xBottomSizes.height)


  // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  height = height - xBottomHeight
  
  d3GetElement(yLeft).remove()

  yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  yAxis = d3.axisLeft(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d3.format('d'))

  yLeft = svg
    .append("g")
    .attr('name', 'axis-left')

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElementCorrected = d3GetElement(yLeft)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl = d3CreateAxisRectangle(svg, width, height, axisRadius, _axisColor, _tickLineWidth)


  // --------------------------------  TRANSFORM  -------------------------------- //


  // legend svg
  svgLegend.attr('width', legendWidth)
  svgLegend.attr('height', legendHeight)
  
  let svgLegendTranformX = offsetLeft + yLeftWidth + paddingXOuter - legend1Attributes['markerCircleRadius'] - px1
  svgLegendEl.setAttribute('transform', `translate(${svgLegendTranformX}, 0)`)

  // legend
  legendEl.setAttribute('transform', `translate(0, ${legendHalfHeight})`)

  // left
  let transformLeftX = Math.floor(offsetLeft + yLeftWidth)
  let transformLeftY = Math.floor(offsetTop + xPad)
  yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

  // bottom
  let transformBottomX = Math.floor(offsetLeft + yLeftWidth + yPad)
  let transformBottomY = Math.floor(transformLeftY + height + xPad)
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // axis path
  let transformAxisX = transformBottomX
  let transformAxisY = transformLeftY
  axisEl.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

  // chart
  chartElement.setAttribute('transform', `translate(${transformBottomX}, ${transformLeftY})`)

  // svg
  svgEl.setAttribute('height', heightDiv - legendHeight - offsetLegendY)
  svgEl.setAttribute('transform', `translate(0, ${offsetLegendY})`)


  // --------------------------------  LINES AND CIRCLES  -------------------------------- //


  for (idt of driverIDTs) {

    let dataDriver = data.filter((v, i) => v['DriverIDT'] == idt)

    let line = d3.line()
      .curve(d3.curveMonotoneX)
      .x(d => xScale(d['EventIndex']) + 0.5 * xScale.bandwidth())
      .y(d => yScale(d[metric]))

    // line
    chart
      .append('path')
      .attr('id', seasonCategoriesRanksChartLineLineID + idt)
      .style('fill', 'none')
      .style('stroke', colorThemesChartChartLine1Lines)
      .style('stroke-width', px1)
      .style('stroke-linecap', 'round')
      .style('shape-rendering', 'geometricPrecision')
      .datum(dataDriver)
      .attr('d', line)

    let circlesDNF = chart
      .append('g')
      .attr('name', 'circles-dnf-' + idt)

    circlesDNF
      .attr('id', seasonCategoriesRanksChartLineCirclesDnfID + idt)
      .selectAll("circle")
      .data(dataDriver)
      .join('circle')
      .style('fill', _colorBackground)
      .style('stroke', colorThemesChartChartLine1Lines)
      .style('stroke-width', px2)
      .attr('cx', d => xScale(d['EventIndex']) + 0.5 * xScale.bandwidth())
      .attr('cy', d => yScale(d[metric]))
      .style('r', px5)
      .attr('r', px5)
      .style('opacity', d => {
        let result 
        if ((d['Retired'] == 1) || (d['PointsClassified'] == 0)) {
          result = 1
        } else {
          result = 0
        }
        return result
      })

    let circles = chart
      .append('g')
      .attr('name', 'circles-' + idt)

    circles 
      .attr('id', seasonCategoriesRanksChartLineCirclesID + idt)
      .selectAll("circle")
      .data(dataDriver)
      .attr('number', d => d['Number'])
      .attr('idt', d => d['DriverIDT'])
      .join('circle')
      .style('fill', colorThemesChartChartLine1Lines)
      .style('shape-rendering', 'geometricPrecision')
      .attr('cx', d => xScale(d['EventIndex']) + 0.5 * xScale.bandwidth())
      .attr('cy', d => yScale(d[metric]))
      .attr('r', px3)
      .style('r', px3)
      .attr('r', px3)
      .attr('PointsClassified', d => d['PointsClassified'])
      .style('opacity', d => {
        let result 
        if ((d['Retired'] == 1) & (d['PointsClassified'] == 0)) {
          result = 0
        } else {
          result = 1
        }
        return result
      })

  }

}


function chartHBars_1(driverLeftData, colorLeft, ContainerID, driverRightData, colorRight) {

  // data -> data_2

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // ----------------------------------  DATA  ---------------------------------- //


  let noData = ((isEmpty(driverLeftData)) || (isEmpty(driverRightData)))

  // if year < 2023 and sprintIndex == 0 -> not showing qualification data
  let qualiShow = ((glVSeason['SeasonID']< 2023) && (glVSeason['SprintIndex'] == 0)) ? false : true
  
  let labels = [
    'Рейтинговые баллы', 'Средняя плотность', 'Средний темп',
    'Борьба на трассе', 'Действия на старте'
  ]

  let metrics = [
    'RankPointsAvg', 'RankConsistencyAvg', 'RankPaceAvg',
    'RankOvertakesAvg', 'RankStartAvg'
  ]

  if (qualiShow) {

    if ((driverLeftData['QTDiscrAvg'] != '-') && (driverRightData['QTDiscrAvg'] != '-')) {
      labels.push('Квалификация')
      metrics.push('QTDiscrAvg')
    }
    
  }

  let xMin = 0
  let xMax = 100

  let xTickLabels = [
    50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
  ]

  // let xTickLabels = range(-50, 55, 5)

  let yMin = 0
  let yMax = 180

  // length and width of short middle separator line
  let separatorLength = px2
  let separatorWidth = px2

  // bars thicknes (svg bar height naturally)
  let barThick = px9

  // interval between left and right bars
  let separatorInterval = px2

  // interval between label and separator line
  let labelSeparatorInterval = px6

  // interval between separator and bar
  let barSeparatorInterval = px3

  let barStarterLength = 0
  let barStarterWidth = px3

  let labelsFontSize = px11

  let labelsCoordY = range(yMax, 0, -yMax/labels.length)

  let labelsData = []
  
  labels.forEach((label, i) => {
    labelsData.push({Label: label, CoordY: labelsCoordY[i]})
  })

  let driversData = []

  labels.forEach((label, i) => {

    let metric = metrics[i]

    let driverLeft
    let driverRight

    if (noData) {

      driverLeft = 50
      driverRight = 50
      
    } else {

      if ((driverLeftData[metric] == 'DNC') && (driverRightData[metric] != 'DNC')) {
      
        driverLeft = 100
        driverRight = 0
        
      } else if ((driverLeftData[metric] != 'DNC') && (driverRightData[metric] == 'DNC')) {
        
        driverLeft = 0
        driverRight = 100
        
      } else if ((driverLeftData[metric] == 'DNC') && (driverRightData[metric] == 'DNC')) {
        
        driverLeft = 50
        driverRight = 50
        
      } else {
        
        driverLeft = Number(driverLeftData[metric])
        driverRight = Number(driverRightData[metric])
        
      }
      
    }

    let percLeft
    let percRight

    if (metric == 'QTDiscrAvg') {

      if (noData) {

        percLeft = 50
        percRight = 50
        
      } else {

        if ((driverLeft == 0) && (driverRight == 0)) {
        
          percLeft = 50
          percRight = 50
          
        } else {
          
          percLeft = Number((100 * driverLeft / (driverLeft + driverRight)).toFixed(2))
          percRight = Number((100 * driverRight / (driverLeft + driverRight)).toFixed(2))
          
        }
        
      }

      

      driversData.push({
        CoordY: labelsCoordY[i],
        LeftData: percLeft,
        RightData: percRight,
        LeftColor: colorLeft,
        RightColor: colorRight
      })
      
    } else {

      let percLeft = 100 - Number((100 * driverLeft / (driverLeft + driverRight)).toFixed(2))
      let percRight = 100 - Number((100 * driverRight / (driverLeft + driverRight)).toFixed(2))

      driversData.push({
        CoordY: labelsCoordY[i],
        LeftData: percLeft,
        RightData: percRight,
        LeftColor: colorLeft,
        RightColor: colorRight
      })
      
    }
    
  })


  // ----------------------------------  SVG  ---------------------------------- //
  

  // width and height -  of page size
  let widthDiv = getElement(ContainerID).offsetWidth
  let heightDiv = 0.67 * widthDiv

  let margin = {top: px30, right: px30, bottom: px20, left: px30}

  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  // move plot little bit down and right from upper left position
  let svg = d3.select(containerID)
    .append('svg')
    .attr('id', 'svg-season-drivers-hbars-1')
    .attr('width', widthDiv)
    .attr('height', heightDiv)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'chart-hbars-1-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    // .attr("transform", `translate(0, ${margin.top + px10})`)


  

  // ------------------------------  SCALES AND AXIS  ------------------------------ //

  let step = 5
  let xTickValues = range(xMin, xMax + step, step)

  // scales
  let xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])

  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])
      .nice()

  let yPad = px30
  yAxisWpad = yPad

  let xAxis = d3.axisTop(xScale)
    .tickPadding(px10)
    .tickSizeOuter(px8)
    .tickValues(xTickValues)
    // .tickFormat((d, i) => isEven(i) ? d : '')
    .tickFormat('')

  let yAxis = d3.axisLeft(yScale)
    .tickValues([])
    .tickSize(0)

  let xTop = svg
    .append("g")
    .attr('name', 'axis-top')
    // .attr("transform", `translate(0, ${-yAxisWpad})`)

  xTop
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  let yLeft = svg
    .append("g")
    .attr('name', 'axis-left')

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xTop }), _tickLineWidth, px11, axis='x', px8, _axisColorDark, _ticklabelColor)

  xTop
    .selectAll('text')
    .attr('dy', `${-px8}px`)

  let xTopElement = d3GetElement(xTop)
  let xTopTickLines = xTopElement.getElementsByTagName('line')
  let tickLines = Array.from(xTopTickLines)

  tickLines.forEach((tick, i) => {
    tick.setAttribute('y2', (isEven(i)) ? -px6 : -px4)
  })

  let axisTopElementHeight = Math.ceil(getSizes(d3GetElement(xTop)).height)

  let main = svg
    .append('g')
    .attr('name', 'chart')
    .attr("transform", `translate(0, ${margin.top})`)


  // ------------------------------  TICKLABELS  ------------------------------ //


  let tickLabels = xTop
    .append('g')
    .attr('name', 'tick-labels')

  tickLabels
    .selectAll('text')
    .data(xTickLabels)
    .join('text')
    .text(d => d)
    .attr('x', (d, i) => xScale(xTickValues[i]))
    .attr('y', -px16)
    .style('fill', _ticklabelColor)
    .style('font-family', PrimaryFont)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 600")
    .style('text-anchor', 'middle')
    .style('visibility', (d, i) => isEven(i) ? 'visible' : 'hidden')
  

  // ------------------------------  LABELS  ------------------------------ //
  

  let labelsNode = main
    .append('g')
    .attr('name', 'labels')
    .attr('id', 'season-drivers-hbars-1-labels')

  labelsNode
    .selectAll('text')
    .data(labelsData)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', (noData) ? _axisColorDark : colorThemesChartRatingsBarsLabelsColor)
    .style('font-size', `${labelsFontSize}px`)
    .style('font-variation-settings', colorThemesChartRatingsBarsLabelsWeight)
    .style('letter-spacing', colorThemesChartRatingsBarsLabelsSpacing)
    .style('text-transform', 'uppercase')
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'baseline')
    .style('line-height', 2)
    .text(d => d.Label)
    .attr('x', xScale(50))
    .attr('y', d => yScale(d.CoordY))


  // ------------------------------  SEPARATOR LINES  ------------------------------ //
  

  let separatorLines = main
    .append('g')
    .attr('name', 'lines-separator')
  
  separatorLines
    .append('g')
    .attr('name', 'top')
    .attr('id', 'season-drivers-hbars-1-middle-lines-up')
    .selectAll('line')
    .data(driversData)
    .join('line')
    .style('stroke', '#B9BEC3')
    .style('shape-rendering', 'geometricPrecision')
    .style('stroke-linecap', 'round')
    .attr('x1', xScale(50))
    .attr('x2', xScale(50))
    .attr('y1', d => yScale(d.CoordY) + labelSeparatorInterval)
    .attr('y2', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength)
    .style('stroke-width', separatorWidth)

  separatorLines
    .append('g')
    .attr('name', 'bottom')
    .attr('id', 'season-drivers-hbars-1-middle-lines-down')
    .selectAll('line')
    .data(driversData)
    .join('line')
    .attr('x1', xScale(50))
    .attr('x2', xScale(50))
    .attr('y1', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength + barSeparatorInterval + barThick + barSeparatorInterval)
    .attr('y2', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength + barSeparatorInterval + barThick + barSeparatorInterval + separatorLength)
    .style('stroke', '#B9BEC3')
    .style('stroke-width', separatorWidth)
    .style('shape-rendering', 'geometricPrecision')
    .style('stroke-linecap', 'round')


  // ------------------------------  BARS  ------------------------------ //
  

  let barsNode = main
    .append('g')
    .attr('name', 'bars')
    .attr('id', 'season-drivers-hbars-1-bars')

  // left driver
  barsNode
    .append("g")
    .attr('name', 'left')
    .attr('id', 'season-drivers-hbars-1-bars-left')
    .selectAll('rect')
    .data(driversData)
    .join('rect')
    .style('shape-rendering', 'geometricPrecision')
    .attr("x", d => xScale(0))
    .attr("y", d => yScale(d['CoordY']) + labelSeparatorInterval + separatorLength + barSeparatorInterval)
    .attr("height", barThick)
    .attr('width', d => { return (d['RightData'] == 0) ? xScale(d['LeftData']) + separatorInterval : xScale(d['LeftData'])})
    .attr('fill', d => (noData) ? _axisColorDark : saturateColor(d['LeftColor'], colorThemesChartSaturation))
    .attr('rx', px3)

  // right driver
  barsNode
    .append("g")
    .attr('name', 'right')
    .attr('id', 'season-drivers-hbars-1-bars-left')
    .selectAll('rect')
    .data(driversData)
    .join('rect')
    .style('shape-rendering', 'geometricPrecision')
    .attr("x", d => {return (d['LeftData'] == 0) ? xScale(0) : xScale(d['LeftData']) + separatorInterval})
    .attr("y", d => yScale(d['CoordY']) + labelSeparatorInterval + separatorLength + barSeparatorInterval)
    .attr("height", barThick)
    .attr('width', d => { return (d['LeftData'] == 0) ? xScale(d['RightData']) + separatorInterval : xScale(d['RightData'])})
    .attr('fill', d => (noData) ? _axisColorDark : saturateColor(d['RightColor'], colorThemesChartSaturation))
    .attr('rx', px3)

}


function chartLine_2(data1, ContainerID, driverIDTs, metric, colors) {

  let containerID = '#' + ContainerID
  
  // remove chartLine 4 difference plot
  d3.select('#' + 'chart-line-4-svg-1-' + ContainerID).remove()

  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  DATA  ------------------------------- //

  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let dataRaw = structuredClone(data1)

  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  
  let dataLeft = structuredClone(data.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data.filter((d) => d['DriverIDT'] == driverIDTRight))

  let races = data.map(d => d['RaceID'])
  races = dropDuplicates(races)

  let xMin = 0
  let xMax = races.length
  let xtickValues = range(0, xMax)

  let metricValues = dataRaw.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let yMin = 1
  let yMax = lastElement(metricValues)

  if (isEven(yMax)) { yMax +=1 }

  let ytickValues = range(yMin, yMax + 1, 2)

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['RaceID'])
  let dataRightRaces = dataRight.map(d => d['RaceID'])
  
  let eventsData = []
  
  races.forEach((raceID, i) => {

    let dataLocal = data.filter(d => d.RaceID == raceID)[0]

    // events data
    eventsData.push({
      Index: i,
      EventAbbreviation: dataLocal['EventAbbreviation']
    })

    // left data for races driver participated
    if (dataLeftRaces.includes(raceID)) { dataLeft.filter(d => d.RaceID == raceID)[0].Index = i }

    // right data for races driver participated
    if (dataRightRaces.includes(raceID)) { dataRight.filter(d => d.RaceID == raceID)[0].Index = i }
    
  })


  // -------------------------------  SVG  ------------------------------- //

  
  // width and height -  of page size
  let widthDiv = Math.floor(getElement(ContainerID).offsetWidth)
  let heightDiv = 0.25 * widthDiv

  let margin = {top: px40, right: px60, bottom: px37, left: px60}
  
  let width = Math.floor(widthDiv - margin.left - margin.right)
  let height = Math.floor(heightDiv - margin.top - margin.bottom)
  
  if (getElement(ContainerID).children.length == 0) {
    d3.select(containerID).append('svg')
  }
  
  let svg = d3.select(containerID)
    .selectAll('svg')
    .attr('id', 'chart-line-2-svg-' + ContainerID)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'chart-line-2-main-node')
    .attr('id', 'chart-line-2-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
  

  // -------------------------------  SCALES AND AXIS  ------------------------------- //
  
  
  // scales
  let xScale = d3.scaleBand()
      .domain(xtickValues)
      .range([0, width])
      .paddingInner(0)
      .paddingOuter(0.15)

  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  let paddingOuter = px12

  // d3adjustPaddingOuter(paddingOuter, xScale, axis='x', type='band')
  d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

  let xPad = px5
  let xAxisWpad = height + xPad
  
  let yPad = px5
  let yAxisWpad = yPad

  let xtickSize = px4
  let ytickSize = px3

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let ytickPadding = px9

  let xAxis = d3.axisBottom(xScale)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickSizeOuter)
    .tickFormat('')

  let yAxis = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)

  let yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)

  let xBottom = svg
    .append("g")
    .attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  let yLeft = svg
    .append("g")
    .attr('name', 'axis-left')
    .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  let yRight = svg
    .append("g")
    .attr('name', 'axis-right')
    .attr("transform", `translate(${width + yPad}, 0)`)

  yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    // .call(g => g.select('.domain').remove())


  // -------------------------------  AXIS LABELS AND GRID  ------------------------------- //


  xBottom
    .append('g')
    .attr('name', 'labels')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d.EventAbbreviation)
    .attr('x', d => xScale(d.Index) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let xGrid = xBottom.append('g').attr('name', 'grid')
  d3DrawXGrid(svg, 'grid-bottom', xScale, xtickValues, height, 0, _colorGrid, scaleType='band')
  
  let yGrid = yLeft.append('g').attr('name', 'grid')
  d3DrawYGrid(svg, 'grid-left', yScale, ytickValues, 0, width, _colorGrid, scaleType='linear')


  // -------------------------------  CHART RIGHT  ------------------------------- //


  let line = d3.line()
    // .curve(d3.curveCatmullRom.alpha(0.5))
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d.Index) + 0.5 * xScale.bandwidth())
    .y(d => yScale(d[metric]))

  let right = svg.append('g').attr('name', 'chart-right')

  // path right
  right
    .append('g')
    .attr('name', 'line-right')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRight)

  // circles dnf right
  right
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorRight)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px5)
    .attr('r', px5)
    .style('opacity', d => {
      
      let dnfCircleOpacityCondition = (
        (d['Retired'] == 1)
        || (d['NotStarted'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (dnfCircleOpacityCondition) ? 1 : 0
      
    })

  // circles right
  right.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRight)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => { return (d['NotStarted'] == 1) ? 0 : 1 })

  right.style('opacity', plotRightOpacity)


  // -------------------------------  CHART LEFT  ------------------------------- //

  
  let left = svg.append('g').attr('name', 'chart-left')

  // path left
  left
    .append('g')
    .attr('name', 'line-left')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeft)

  // circles dnf left
  left.append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorLeft)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px5)
    .attr('r', px5)
    .style('opacity', d => {

      let dnfCircleOpacityCondition = (
        (d['Retired'] == 1)
        || (d['NotStarted'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (dnfCircleOpacityCondition) ? 1 : 0
      
    })

  // circles left
  left.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeft)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => { return (d.NotStarted == 1) ? 0 : 1 })


  // -------------------------------  LEGEND  ------------------------------- //


  let legend1Attributes = {
    'y': -px20,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames
  }

  if (plotRightOpacity == 1) {

    d3legend(
      'chart-line-2-main-node', 'legend-1', 'chart-line-2-legend-1', ['line', 'line'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      'chart-line-2-main-node', 'legend-1', 'chart-line-2-legend-1', ['line'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend2Attributes = {
    'x': width,
    'y': -px20,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo
  }

  let legendLabels = [
    'Не финишировал', 'Не стартовал'
  ]

  // second legend
  d3legend(
    'chart-line-2-main-node', 'legend-2', 'chart-line-2-legend-2', ['circle w point', 'circle no fill'],
    legendLabels,
    ['#555765', '#555765'], attributesDict=legend2Attributes, align='right')

}


function chartLine_3(data1, ContainerID, driverIDTs, metric, colors) {

  let containerID = '#' + ContainerID
  
  // remove chartLine 4 difference plot
  d3.select('#' + 'chart-line-4-svg-1-' + ContainerID).remove()
  
  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  DATA  ------------------------------- //


  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let dataRaw = structuredClone(data1)

  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  let dataLeft = structuredClone(data.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data.filter((d) => d['DriverIDT'] == driverIDTRight))

  let races = data.map(d => d['RaceID'])
  races = dropDuplicates(races)

  let raceNames = []
  
  races.forEach((raceID, i) => [
    raceNames.push(data.filter((d) => d.RaceID == raceID)[0]['EventAbbreviation'])
  ])

  let lastPosition = dataRaw.map(d => d[metric])
  
  lastPosition = lastPosition.filter(d => isNumeric(d))
  lastPosition = sortArray(lastPosition)[0]
  
  dataLeft.forEach((obj, i) => {
    let condition = ((obj[metric] == 'DNS') || (obj[metric] == 'PLS'))
    if (condition) { dataLeft[i][metric] = lastPosition }
  })

  dataRight.forEach((obj, i) => {
    let condition = ((obj[metric] == 'DNS') || (obj[metric] == 'PLS'))
    if (condition) { dataRight[i][metric] = lastPosition }
  })
  
  let xMin = 0
  let xMax = raceNames.length
  let xtickValues = range(0, xMax)

  let metricValues = dataRaw.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let yMin = 1
  let yMax = lastElement(metricValues)

  if (isEven(yMax)) { yMax +=1 }

  let ytickValues = range(yMin, yMax + 1, 2)

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['RaceID'])
  let dataRightRaces = dataRight.map(d => d['RaceID'])
  
  let eventsData = []
  
  races.forEach((raceID, i) => {

    eventsData.push({
      Index: i,
      EventAbbreviation: data.filter(d => d.RaceID == raceID)[0]['EventAbbreviation']
    })
    
    if (dataLeftRaces.includes(raceID)) {
      dataLeft.filter(d => d.RaceID == raceID)[0].Index = i
    }
    
    if (dataRightRaces.includes(raceID)) {
      dataRight.filter(d => d.RaceID == raceID)[0].Index = i
    }
  })


  // -------------------------------  SVG  ------------------------------- //
  

  // width and height -  of page size
  let widthDiv = getElement(ContainerID).offsetWidth
  let heightDiv = 0.25 * widthDiv

  let margin = {top: px40, right: px60, bottom: px37, left: px60}
  
  let width = Math.round(widthDiv - margin.left - margin.right)
  let height = Math.round(heightDiv - margin.top - margin.bottom)

  if (getElement(ContainerID).children.length == 0) {
    d3.select(containerID).append('svg')
  }
  
  let svg = d3.select(containerID)
    .selectAll('svg')
    .attr('id', 'chart-line-3-svg-' + ContainerID)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'chart-line-2-main-node')
    .attr('id', 'chart-line-3-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // -------------------------------  SCALES AND AXIS  ------------------------------- //
  

  // scales
  let xScale = d3.scaleBand()
      .domain(xtickValues)
      .range([0, width])
      .paddingInner(0)
      .paddingOuter(0.15)

  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  let paddingOuter = px12

  // d3adjustPaddingOuter(paddingOuter, xScale, axis='x', type='band')
  d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

  let xPad = px5
  let xAxisWpad = height + xPad
  
  let yPad = px5
  let yAxisWpad = yPad

  let xtickSize = px4
  let ytickSize = px3

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let ytickPadding = px9

  let xAxis = d3.axisBottom(xScale)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickSizeOuter)
    .tickFormat('')

  let yAxis = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)

  let yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)

   let xBottom = svg.append("g").attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  let yLeft = svg.append("g").attr('name', 'axis-left')
    .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  let yRight = svg
    .append("g")
    .attr('name', 'axis-right')
    .attr("transform", `translate(${width + yPad}, 0)`)

  yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    // .call(g => g.select('.domain').remove())


  // -------------------------------  AXIS LABELS AND GRID  ------------------------------- //


  // xtick labels
  xBottom
    .append('g')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d.EventAbbreviation)
    .attr('x', d => xScale(d.Index) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)
  
  // grid-x
  d3DrawXGrid(svg, 'grid-bottom', xScale, xtickValues, height, 0, _colorGrid)
  
  // grid-y
  d3DrawYGrid(svg, 'grid-left', yScale, ytickValues, 0, width, _colorGrid, scaleType='linear')
  

  // -------------------------------  CHART RIGHT  ------------------------------- //


  let line = d3.line()
    .curve(d3.curveCatmullRom.alpha(0.5))
    .curve(d3.curveMonotoneX)
    .defined(d => d[metric])
    .x(d => xScale(d.Index) + 0.5 * xScale.bandwidth())
    .y(d => yScale(d[metric]))

  let right = svg.append('g').attr('name', 'chart-right')

  right
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRight)

  // circles dnf right
  right.append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorRight)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px5)
    .attr('r', px5)
    .style('opacity', d => { return ((d.PitLaneStart == 1) || (d.NotStarted == 1)) ? 1 : 0 })

  // circles right
  right.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRight)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => { return (d.NotStarted == 1) ? 0 : 1 })

  right.style('opacity', plotRightOpacity)


  // -------------------------------  CHART LEFT  ------------------------------- //

  
  let left = svg.append('g').attr('name', 'chart-left')

  // line left
  left
    .append('g')
    .attr('name', 'line')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeft)

  // circles pit-lane start left
  left.append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorLeft)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px5)
    .attr('r', px5)
    .style('opacity', d => { return ((d.PitLaneStart == 1) || (d.NotStarted == 1)) ? 1 : 0 })

  // circles left
  left.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeft)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => { return (d.NotStarted == 1) ? 0 : 1 })


  // -------------------------------  LEGEND  ------------------------------- //


  let legend1Attributes = {
    'y': -px20,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames
  }

  if (plotRightOpacity == 1) {

    d3legend(
      'chart-line-3-main-node', 'legend-1', 'chart-line-3-legend-1', ['line', 'line'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      'chart-line-3-main-node', 'legend-1', 'chart-line-3-legend-1', ['line'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend2Attributes = {
    'x': width,
    'y': -px20,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo
  }

  // let legendLabels = [
  //   'Pit Lane Start', 'Did Not Start'
  // ]

  let legendLabels = [
    'Стартовал с пит-лейн', 'Не стартовал'
  ]

  // second legend
  d3legend(
    'chart-line-3-main-node', 'legend-2', 'chart-line-3-legend-2', ['circle w point', 'circle no fill'],
    legendLabels,
    ['#555765', '#555765'], attributesDict=legend2Attributes, align='right')

}


function chart_5(data1, ContainerID, metric, driverIDTs, colors, id) {

  // data1 : data_1

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)

  // offset of chart 7 remove
  container.style.marginTop = 0


  // -------------------------------  PARAMETERS  ------------------------------- //

  
  let offsetGridX = px5
  let offsetGridY = px5

  let xtickPad = px12
  let ytickPad = px12
  
  let xtickSize = px5
  let ytickSize = px4

  let paddingXOuter = _axisRadius + px2
  let paddingYOuter = _axisRadius + px2

  let chart1Height = Math.floor(convertRemToPixels(17))
  let chart2Height = Math.floor(convertRemToPixels(12))

  let lineWidth = seasonChart5LineWidth
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  // let offsetLegendX = px49
  let offsetLegendTop = px12

  // for all charts with different y-values (10, 100, 1000, 100000000, etc) 
  // have equal offset
  let defaultOffsetLeft = px48

  let offsetTop = px12
  let offsetTop2 = px12

  let offsetBottom = px12
  let offsetBottom2 = px12

  let sliderShadowRadius = _axisRadius
  let sliderShadowOpacity = 0.2

  
  // -------------------------------  DATA  ------------------------------- //


  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let colorLeftS = saturateColor(colorLeft, colorThemesChartSaturation)
  let colorRightS = saturateColor(colorRight, colorThemesChartSaturation)

  let dataRaw = structuredClone(data1)

  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))

  let dataLeft = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTRight))

  let eventIndexes = dataRaw.map(d => d['EventIndex'])
  eventIndexes = dropDuplicates(eventIndexes)

  let metricValues = dataRaw.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let xMin = 0
  let xMax = eventIndexes.length
  
  let xtickValues = range(0, xMax)

  let yMin1 = 1
  let yMax1 = lastElement(metricValues)

  if (isEven(yMax1)) { yMax1 +=1 }

  let ytickValues1 = range(yMin1, yMax1 + 1, 2)

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['EventIndex'])
  let dataRightRaces = dataRight.map(d => d['EventIndex'])

  let eventsData = []

  eventIndexes.forEach((eventIndex, i) => {

    let eventDataThisIndex = seasonCalendar.filter(o => o['EventIndex'] == eventIndex)
    if (eventDataThisIndex.length) { eventDataThisIndex = eventDataThisIndex[0] }
    
    let eventNameRus = eventDataThisIndex['EventNameRus']
    let eventNameShortRus = eventDataThisIndex['EventNameShortRus']

    let dataFiltered = data.filter(d => d['EventIndex'] == eventIndex)

    if (dataFiltered.length > 0) {

      dataFiltered = dataFiltered[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataFiltered['EventAbbreviation'],
        EventNameRus: eventNameRus,
        EventNameShortRus: eventNameShortRus,
        EventIndex: dataFiltered['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    } else {

      let dataAll = data1.filter(d => d['EventIndex'] == eventIndex)[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataAll['EventAbbreviation'],
        EventNameRus: eventNameRus,
        EventNameShortRus: eventNameShortRus,
        EventIndex: dataAll['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    }

    if (dataLeftRaces.includes(eventIndex)) { dataLeft.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    if (dataRightRaces.includes(eventIndex)) { dataRight.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    
  })


  // ---------------------------  DIFFERENCE DATA  --------------------------- //


  let dataDiff = []
  let noDefineConditions = ['DNS', 'DNF', 'DSQ']

  eventsData.forEach((d, i) => {

    let leftData = dataLeft.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
    let rightData = dataRight.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])

    let metricDiff
    let eventName
    let eventIndex
    let leftFullName
    let rightFullName
    let leftGridPosition
    let rightGridPosition
    let leftClassPosition
    let rightClassPosition
    let leftMarker
    let rightMarker
    let leftMetric
    let rightMetric

    eventNameRus = d['EventNameRus']
    eventIndex = d['EventIndex']

    if (leftData.length == 0) {
      
      metricDiff = 0
      
    } else if (rightData.length == 0) {
      
      metricDiff = 0
      
    } else {

      if (noDefineConditions.includes(leftData[0][_plabel])
          && noDefineConditions.includes(rightData[0][_plabel])) {
        
        metricDiff = 0
        
        leftRetired = 1
        rightRetired = 1
        
        leftMarker = leftData[0][_plabel]
        rightMarker = rightData[0][_plabel]
        
      } else if (noDefineConditions.includes(leftData[0][_plabel])) {
        
        metricDiff = 0
        leftMarker = leftData[0][_plabel]
        
      } else if (noDefineConditions.includes(rightData[0][_plabel])) {
        
        metricDiff = 0
        rightMarker = rightData[0][_plabel]
        
      } else {

        metricDiff =  rightData[0][metric] - leftData[0][metric]
        
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0][_glabel]
      rightGridPosition = rightData[0][_glabel]
      
      leftClassPosition = leftData[0][_plabel]
      rightClassPosition = rightData[0][_plabel]
      
      leftMetric = leftData[0][metric]
      rightMetric = rightData[0][metric]
      
    }

    dataDiff.push({
      'CoordIndex': d['CoordIndex'],
      'MetricDiff': metricDiff,
      'EventIndex': eventIndex,
      'EventNameRus': eventNameRus,
      'LeftFullName': leftFullName,
      'RightFullName': rightFullName,
      'LeftGridPosition': leftGridPosition,
      'RightGridPosition': rightGridPosition,
      'LeftClassPosition': leftClassPosition,
      'RightClassPosition': rightClassPosition,
      'LeftMarker': leftMarker,
      'RightMarker': rightMarker,
      'LeftMetric': leftMetric,
      'RightMetric': rightMetric
    })
    
  })

  let metricOff = dataDiff.map(d => d['MetricDiff'])
  let metricDiffMaxAbs = Math.max.apply(null, metricOff.map(Math.abs))

  let yMin2 = roundStep(-metricDiffMaxAbs, 5, 'floor')
  let yMax2 = roundStep(metricDiffMaxAbs, 5, 'ceil')

  let ytickValues2Length

  if ((yMax2 <= 10) || (yMax2 > 15)) {
    ytickValues2Length = '2'
  } else {
    ytickValues2Length = '3'
  }

  let ytickValues2 = generateRange(yMin2, yMax2, length=ytickValues2Length)

  if ((firstElement(ytickValues2) == 0) && (lastElement(ytickValues2) == 0)) {
    ytickValues2 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px14
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px0
  }
  else {
    barWidth = px14
    paddingOuterX = px0
  }


  // -------------------  DOWNLOAD NAMES  ------------------- //


  let filenameMetric = dropdown14Data.filter(o => o['metric'] == metric)[0]['savename']
  
  let filename = `${glVSeason['SeasonID']}_${filenameMetric}_dynamics`
  let filenameDiff = filename + '_diff'
  let filenameBoth = filename + '_w_diff'

  let itemSVGChart = getElement(seasonComparisonDownloadSVGChartID)
  downloadItemFill(itemSVGChart, filename)

  let itemPNGChart = getElement(seasonComparisonDownloadPNGChartID)
  downloadItemFill(itemPNGChart, filename)

  let itemSVGDiff = getElement(seasonComparisonDownloadSVGDiffID)
  downloadItemFill(itemSVGDiff, filenameDiff)

  let itemPNGDiff = getElement(seasonComparisonDownloadPNGDiffID)
  downloadItemFill(itemPNGDiff, filenameDiff)

  let itemSVGBoth = getElement(seasonComparisonDownloadID + '-svg-both')
  downloadItemFill(itemSVGBoth, filenameBoth)

  let itemPNGBoth = getElement(seasonComparisonDownloadID + '-png-both')
  downloadItemFill(itemPNGBoth, filenameBoth)


  // ------------------------  SVG  ------------------------- //


  let widthContainer = Math.ceil(containerSizes.width)

  let legendID = id + '-legend'
  let legendSVGID = legendID + '-svg'
  let legendSVGel = getElement(legendSVGID)
  
  let svg1ID = seasonComparisonMainChartSVG1ID
  let svg2ID = seasonComparisonMainChartSVG2ID

  let svg1El = getElement(svg1ID)
  let svg2El = getElement(svg2ID)

  let svg1
  let svg2

  let sliderContainer
  
  if (legendSVGel) {
    
    clearElement(legendSVGel)
    
  } else {

    legendSVG = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'legend')
      .attr('id', legendSVGID)

    legendSVGel = d3GetElement(legendSVG)
    
  }

  // clear SVGs
  if (svg1El) {
    
    clearElement(svg1El)
      
    svg1El.setAttribute('width', 0)
    svg1El.setAttribute('height', 0)

    svg1 = d3.select('#' + svg1ID)

  } else {

    svg1 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-5')
      .attr('id', svg1ID)
      
    svg1El = d3GetElement(svg1)
      
  }

  svg1
    .attr('width', widthContainer)
    .style('background', _colorBackground)
  
  let main1 = svg1
    .append('g')
    .attr('name', 'main-1')

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legendAttributes = {
    'x': 0,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo,
    'markerCircleNoFillRadius': px5,
    'markerCircleNoFillStrokeWidth': px1_5,
    'markerCirclePointRadius': px2_5,
  }

  let legendLabels = [
    'Не финишировал', 'Не стартовал или дисквалифицирован'
  ]

  // legend
  d3legend(
    legendSVGID, 'legend', legendID,
    ['circle w point', 'circle no fill'],
    legendLabels,
    ['#6E7378', '#6E7378'], attributesDict=legendAttributes)

  let legendEl = getElement(legendID)
  let legendSizes = getSizes(legendEl)
  let legendWidth = Math.floor(legendSizes.width)
  let legendHeight = Math.floor(legendSizes.height)
  let legendHeightHalf = 0.5 * legendHeight


  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let height1 = chart1Height - offsetTop - offsetBottom

  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([height1, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft1Element = d3GetElement(yLeft1)
  let yRight1Element = d3GetElement(yRight1)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - defaultOffsetLeft - defaultOffsetLeft

  let xScale = d3
    .scaleBand()
    .domain(xtickValues)
    .range([0, width])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    .attr('id', seasonComparisonChartTicksID)
    .call(g => g.select('.domain').remove())

  // hide ticks
  xBottom1
    .selectAll('.tick text')
    .style('opacity', 0)

  // hide ticklabels
  xBottom1
    .selectAll('.tick line')
    .style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .attr('metricLeft', (d) => {

      let value
      let dataLocal = dataLeft.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0][_plabel]
      } else {
        value = ''
      }
        
      return value
      
    })
    .attr('metricRight', (d) => {

      let value
      let dataLocal = dataRight.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0][_plabel]
      } else {
        value = ''
      }
        
      return value
      
    })

  d3StyleAxis(Object.entries({ xBottom1 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl1 = d3CreateAxisRectangle(main1, width, height1, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITION 1 ------------------------- //


  // legend svg
  legendSVGel.setAttribute('width', legendWidth + px1)
  legendSVGel.setAttribute('height', offsetLegendTop + legendHeight + offsetLegendTop - offsetTop)

  let legendSVGTransformX = Math.floor(
    defaultOffsetLeft + paddingXOuter
    - attributesDict['markerCircleNoFillRadius']
    - 0.5*legendAttributes['markerCircleNoFillStrokeWidth']
  )
  legendSVGel.setAttribute('transform', `translate(${legendSVGTransformX}, 0)`)

  // legend
  legendEl.setAttribute('transform', `translate(0, ${offsetLegendTop + legendHeightHalf})`)

  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(defaultOffsetLeft)  
  let yLeftTransformY = offsetTop
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, ${yLeftTransformY})`)
  
  let yRight1TransformX = Math.floor(defaultOffsetLeft + width)
  let yRightTransformY = yLeftTransformY
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, ${yRightTransformY})`)

  // move x-axis
  let xBottomTransformX = defaultOffsetLeft
  let xBottomTransformY = yLeftTransformY + height1
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // axis path
  let transformAxisX = xBottomTransformX
  let transformAxisY = yLeftTransformY
  axisEl1.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

  // move chart1
  let chart1Element = d3GetElement(chart1)
  let chartTransformX = defaultOffsetLeft
  let chartTransformY = yLeftTransformY
  chart1Element.setAttribute('transform', `translate(${chartTransformX}, ${chartTransformY})`)

  let svg1Height = offsetTop + height1 + xBottom1ElementHeight + offsetBottom
  d3GetElement(svg1).setAttribute('height', svg1Height)


  // ------------------------  SLIDER  ------------------------- //

  // clear slider
  sliderContainer = getElement(seasonComparisonSliderContainerID)

  if (sliderContainer) {

    clearElement(sliderContainer)
    
    sliderContainer.style.width = 0
    sliderContainer.style.marginLeft = 0
    
  } else {

    sliderContainer = document.createElement('div')

    // text sizing 11px has area makes size 15px. to compensate this difference add px4 top bottom margin of slider
    sliderContainer.style.marginBottom = `${px4}px`

    sliderContainer.classList.add('slider-container')
    sliderContainer.id = seasonComparisonSliderContainerID

    container.appendChild(sliderContainer)
    
  }

  seasonComparisonSliderCreate(sliderContainer, svg1, xBottom1, dataLeft, dataRight)

  let sliderSizes = getSizes(sliderContainer)
  let sliderHeight = Math.ceil(sliderSizes.height)


  // ------------------------  SVG 2  ------------------------- //


  if (svg2El) {

    clearElement(svg2El)

    svg2El.setAttribute('width', 0)
    svg2El.setAttribute('height', 0)

    svg2 = d3.select('#' + svg2ID)
    
  } else {

    svg2 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-5')
      .attr('id', svg2ID)

    svg2El = d3GetElement(svg2)
    
  }

  svg2
    .attr('width', widthContainer)
    .style('background', _colorBackground)

  let main2ID = 'chart-5-main-2-' + id
  
  let main2 = svg2
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let chart2 = main2
    .append('g')
    .attr('name', 'chart')


  // ------------------------  Y-SCALE 2, Y-AXIS 2, Y-LABELS 2  ------------------------- //


  let height2 = chart2Height - offsetTop2 - offsetBottom2

  let yScale2 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues2), lastElement(ytickValues2)])
    .range([height2, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')

  let yAxis2 = d3
    .axisLeft(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yLeft2 = main2
    .append("g")
    .attr('name', 'axis-left')

  yLeft2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis2)
    .call(g => g.select('.domain').remove())

   let yAxisRight2 = d3
    .axisRight(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yRight2 = main2
    .append("g")
    .attr('name', 'axis-right')

  yRight2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight2)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft2, yRight2 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight2
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft2Element = d3GetElement(yLeft2)
  let yLeft2Width = Math.ceil(getSizes(yLeft2Element).width)
  
  let yRight2Element = d3GetElement(yRight2)
  let yRight2Width = Math.ceil(getSizes(yRight2Element).width)


  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //

  
  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', seasonComparisonChartAxisBottom2ID)

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis2)
    .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom2.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 2 ------------------------- //


  // xtick labels 2
  xBottom2
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsBottomID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    // .attr('EventNumber', d => d['EventNumber'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl2 = d3CreateAxisRectangle(main2, width, height2, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITIONS 2 ------------------------- //


  // move y-axis
  let yLeft2TransformX = Math.floor(defaultOffsetLeft)
  let yRight2TransformX = Math.floor(defaultOffsetLeft + xAxisLength)

  yLeft2Element.setAttribute('transform', `translate(${yLeft2TransformX}, 0)`)
  yRight2Element.setAttribute('transform', `translate(${yRight2TransformX}, 0)`)

  // move x-axis
  let xBottom2TransformY = height2
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom2TransformY})`)

  // axis path
  let transformAxis2X = xBottomTransformX
  axisEl2.setAttribute('transform', `translate(${transformAxis2X}, 0)`)

  // move chart2
  let chart2Element = d3GetElement(chart2)
  chart2Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)

  // main2
  let main2El = d3GetElement(main2)
  let main2TransformY = offsetTop2
  main2El.setAttribute('transform', `translate(0, ${main2TransformY})`)

  let svg2Height = offsetTop2 + height2 + xBottom2ElementHeight + offsetBottom2
  d3GetElement(svg2).setAttribute('height', svg2Height)


  // ------------------------ GRID 1 ------------------------- //


  let gridXmin = height1 - offsetGridX
  let gridXmax = offsetGridX

  let gridYmin = width - offsetGridY
  let gridYmax = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart1, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart1, 'grid-left-2', yScale1, ytickValues1, gridYmin, gridYmax, _colorGrid, scaleType='linear')


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let shadowTop = chart1
    .append('g')
    .attr('name', 'shadow-top')

  let line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .y(d => yScale1(d[metric]))

  // path right
  right
    .append('g')
    .attr('name', 'line-right')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRightS)

  // circles dnf right
  right
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorRightS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('visibility', d => {
      
      let dnfCircleOpacityCondition = (
        (d['Retired'] == 1)
        || (d['NotStarted'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (dnfCircleOpacityCondition) ? 'visible' : 'hidden'
      
    })

  // circles right
  right
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRightS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', d => {

      let condition = (
        (d['Retired'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .attr('r', d => {

      let condition = (
        (d['Retired'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => {
        
        let condition = (
          (d['NotStarted'] == 1)
          || (d['Disqualified'] == 1)
        )
          
        return (condition) ? 'hidden' : 'visible' 
        
      })
    // .style('opacity', d => { return (d['NotStarted'] == 1) ? 0 : 1 })

  right.style('opacity', plotRightOpacity)

  // path left
  left
    .append('g')
    .attr('name', 'line-left')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeftS)

  // circles dnf left
  left
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorLeftS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('visibility', d => {

      let dnfCircleOpacityCondition = (
        (d['Retired'] == 1)
        || (d['NotStarted'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (dnfCircleOpacityCondition) ? 'visible' : 'hidden'
      
    })

  // circles left
  left
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeftS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', d => {

      let condition = (
        (d['Retired'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .attr('r', d => {

      let condition = (
        (d['Retired'] == 1)
        || (d['Disqualified'] == 1)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    // .style('opacity', d => { return (d.NotStarted == 1) ? 0 : 1 })
    .style('visibility', d => {
      
      let condition = (
        (d['NotStarted'] == 1)
        || (d['Disqualified'] == 1)
      )
        
      return (condition) ? 'hidden' : 'visible' 
      
    })

  shadowTop
    .append('rect')
    .attr('id', seasonComparisonSliderShadowTopID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height1 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------ GRID 2 ------------------------- //


  let gridXmin2 = height2 - offsetGridX
  let gridXmax2 = offsetGridX

  let gridYmin2 = width - offsetGridY
  let gridYmax2 = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart2, 'grid-bottom', xScale, xtickValues, gridXmin2, gridXmax2, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart2, 'grid-left-2', yScale2, ytickValues2, gridYmin2, gridYmax2, _colorGrid, scaleType='linear')


  // ------------------------  CHART 2  ------------------------ //


  let dnf = chart2
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart2
    .append('g')
    .attr('name', 'bars')

  let shadowBottom = chart2
    .append('g')
    .attr('name', 'shadow-bottom')

  // DNF labels right
  dnf
    .append('g')
    .attr('name', 'dnf-labels-right')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorRightS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .text(d => d['RightMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) + px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['RightClassPosition'])) ? 1 : 0 })

  // DNF labels left
  dnf
    .append('g')
    .attr('name', 'dnf-labels-left')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorLeftS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .text(d => d['LeftMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftClassPosition'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale2(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale2(0) - yScale2(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)

  shadowBottom
    .append('rect')
    .attr('id', seasonComparisonSliderShadowBottomID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height2 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': metric.replace('Interpolated', ''),
    'Cumulative': null
  }

  seasonComparisonSliderData['legendHeight'] = legendHeight + offsetLegendTop

  seasonComparisonSliderData['paddingXOuter'] = paddingXOuter
  seasonComparisonSliderData['chartStepX'] = xScale.step()
  seasonComparisonSliderData['offsetGrid'] = offsetGridX
  seasonComparisonSliderData['metrics'] = sliderMetrics
  seasonComparisonSliderData['type'] = 'average'
  seasonComparisonSliderData['subType'] = 'lower'

  let dataLeftFiltered = dataLeft.filter(o => !noDefineConditions.includes(o[_plabel]))
  let dataRightFiltered = dataRight.filter(o => !noDefineConditions.includes(o[_plabel]))

  seasonComparisonDataLeft = dataLeftFiltered
  seasonComparisonDataRight = dataRightFiltered
  seasonComparisonDataDiff = dataDiff

}


function chart_6(data1, ContainerID, metric, driverIDTs, colors, id) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)

  // offset of chart 7 remove
  container.style.marginTop = 0


  // -------------------------------  PARAMETERS  ------------------------------- //


  let offsetGridX = px5
  let offsetGridY = px5

  let xtickPad = px12
  let ytickPad = px12
  
  let xtickSize = px5
  let ytickSize = px4

  let paddingXOuter = _axisRadius + px2
  let paddingYOuter = _axisRadius + px2

  let chart1Height = Math.floor(convertRemToPixels(17))
  let chart2Height = Math.floor(convertRemToPixels(12))

  let lineWidth = seasonChart5LineWidth
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  // let offsetLegendX = px49
  let offsetLegendTop = px12

  // for all charts with different y-values (10, 100, 1000, 100000000, etc) 
  // have equal offset
  let defaultOffsetLeft = px48

  let offsetTop = px12
  let offsetTop2 = px12

  let offsetBottom = px12
  let offsetBottom2 = px12

  let sliderShadowRadius = _axisRadius
  let sliderShadowOpacity = 0.2

  
  // -------------------------------  DATA  ------------------------------- //


  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let colorLeftS = saturateColor(colorLeft, colorThemesChartSaturation)
  let colorRightS = saturateColor(colorRight, colorThemesChartSaturation)

  let dataRaw = structuredClone(data1)
  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  
  let dataLeft = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTRight))

  let eventIndexes = dataRaw.map(d => d['EventIndex'])
  eventIndexes = dropDuplicates(eventIndexes)

  let metricValues = dataRaw.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let xMin = 0
  let xMax = eventIndexes.length
  
  let xtickValues = range(0, xMax)

  let yMin1 = 1
  let yMax1 = lastElement(metricValues)

  if (isEven(yMax1)) { yMax1 +=1 }

  let ytickValues1 = range(yMin1, yMax1 + 1, 2)

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['EventIndex'])
  let dataRightRaces = dataRight.map(d => d['EventIndex'])
  
  let eventsData = []

  eventIndexes.forEach((eventIndex, i) => {

    let dataFiltered = data.filter(d => d['EventIndex'] == eventIndex)

    if (dataFiltered.length > 0) {

      dataFiltered = dataFiltered[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataFiltered['EventAbbreviation'],
        EventNameRus: dataFiltered['EventNameRus'],
        EventNameShortRus: dataFiltered['EventNameShortRus'],
        EventIndex: dataFiltered['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    } else {

      let dataAll = data1.filter(d => d['EventIndex'] == eventIndex)[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataAll['EventAbbreviation'],
        EventNameRus: dataAll['EventNameRus'],
        EventNameShortRus: dataAll['EventNameShortRus'],
        EventIndex: dataAll['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    }

    if (dataLeftRaces.includes(eventIndex)) { dataLeft.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    if (dataRightRaces.includes(eventIndex)) { dataRight.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    
  })


  // ---------------------------  DIFFERENCE DATA  --------------------------- //


  let dataDiff = []
  let noDefineConditions = ['DNS', 'PLS']

  eventsData.forEach((d, i) => {

    let leftData = dataLeft.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
    let rightData = dataRight.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])

    let metricDiff
    let eventName
    let eventIndex
    let leftFullName
    let rightFullName
    let leftGridPosition
    let rightGridPosition
    let leftClassPosition
    let rightClassPosition
    let leftMarker
    let rightMarker
    let leftMetric
    let rightMetric

    eventNameRus = d['EventNameRus']
    eventIndex = d['EventIndex']

    if (leftData.length == 0) {
      
      metricDiff = 0
      
    } else if (rightData.length == 0) {
      
      metricDiff = 0
      
    } else {

      if (noDefineConditions.includes(leftData[0][_glabel])
          && noDefineConditions.includes(rightData[0][_glabel])) {
        
        metricDiff = 0
        
        leftRetired = 1
        rightRetired = 1
        
        leftMarker = leftData[0][_glabel]
        rightMarker = rightData[0][_glabel]
        
      } else if (noDefineConditions.includes(leftData[0][_glabel])) {
        
        metricDiff = 0
        leftMarker = leftData[0][_glabel]
        
      } else if (noDefineConditions.includes(rightData[0][_glabel])) {
        
        metricDiff = 0
        rightMarker = rightData[0][_glabel]
        
      } else {
        
        metricDiff =  rightData[0][metric] - leftData[0][metric]
        
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0][_glabel]
      rightGridPosition = rightData[0][_glabel]
      
      leftClassPosition = leftData[0][_plabel]
      rightClassPosition = rightData[0][_plabel]
      
      leftMetric = leftData[0][metric]
      rightMetric = rightData[0][metric]
      
    }

    dataDiff.push({
      'CoordIndex': d['CoordIndex'],
      'MetricDiff': metricDiff,
      'EventIndex': eventIndex,
      'EventNameRus': eventNameRus,
      'LeftFullName': leftFullName,
      'RightFullName': rightFullName,
      'LeftGridPosition': leftGridPosition,
      'RightGridPosition': rightGridPosition,
      'LeftClassPosition': leftClassPosition,
      'RightClassPosition': rightClassPosition,
      'LeftMarker': leftMarker,
      'RightMarker': rightMarker,
      'LeftMetric': leftMetric,
      'RightMetric': rightMetric
    })
    
  })

  let metricOff = dataDiff.map(d => d['MetricDiff'])
  let metricDiffMaxAbs = Math.max.apply(null, metricOff.map(Math.abs))

  let yMin2 = roundStep(-metricDiffMaxAbs, 5, 'floor')
  let yMax2 = roundStep(metricDiffMaxAbs, 5, 'ceil')

  let ytickValues2Length

  if ((yMax2 <= 10) || (yMax2 > 15)) {
    ytickValues2Length = '2'
  } else {
    ytickValues2Length = '3'
  }

  let ytickValues2 = generateRange(yMin2, yMax2, length=ytickValues2Length)

  if ((firstElement(ytickValues2) == 0) && (lastElement(ytickValues2) == 0)) {
    ytickValues2 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px14
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px0
  }
  else {
    barWidth = px14
    paddingOuterX = px0
  }


  // -------------------  DOWNLOAD NAMES  ------------------- //


  let filenameMetric = dropdown14Data.filter(o => o['metric'] == metric)[0]['savename']
  
  let filename = `${glVSeason['SeasonID']}_${filenameMetric}_dynamics`
  let filenameDiff = filename + '_diff'
  let filenameBoth = filename + '_w_diff'

  let itemSVGChart = getElement(seasonComparisonDownloadSVGChartID)
  downloadItemFill(itemSVGChart, filename)

  let itemPNGChart = getElement(seasonComparisonDownloadPNGChartID)
  downloadItemFill(itemPNGChart, filename)

  let itemSVGDiff = getElement(seasonComparisonDownloadSVGDiffID)
  downloadItemFill(itemSVGDiff, filenameDiff)

  let itemPNGDiff = getElement(seasonComparisonDownloadPNGDiffID)
  downloadItemFill(itemPNGDiff, filenameDiff)

  let itemSVGBoth = getElement(seasonComparisonDownloadID + '-svg-both')
  downloadItemFill(itemSVGBoth, filenameBoth)

  let itemPNGBoth = getElement(seasonComparisonDownloadID + '-png-both')
  downloadItemFill(itemPNGBoth, filenameBoth)


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.ceil(containerSizes.width)

  let legendID = id + '-legend'
  let legendSVGID = legendID + '-svg'
  let legendSVGel = getElement(legendSVGID)
  
  let svg1ID = seasonComparisonMainChartSVG1ID
  let svg2ID = seasonComparisonMainChartSVG2ID

  let svg1El = getElement(svg1ID)
  let svg2El = getElement(svg2ID)

  let svg1
  let svg2

  let sliderContainer
  
  if (legendSVGel) {
    
    clearElement(legendSVGel)
    
  } else {

    legendSVG = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'legend')
      .attr('id', legendSVGID)

    legendSVGel = d3GetElement(legendSVG)
    
  }

  // clear SVGs
  if (svg1El) {
    
    clearElement(svg1El)
      
    svg1El.setAttribute('width', 0)
    svg1El.setAttribute('height', 0)

    svg1 = d3.select('#' + svg1ID)

  } else {

    svg1 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-6')
      .attr('id', svg1ID)
    
    svg1El = d3GetElement(svg1)
      
  }

  svg1
    .attr('width', widthContainer)
    .style('background', _colorBackground)


  let main1ID = 'chart-5-main-1-' + id
  
  let main1 = svg1
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legendAttributes = {
    'x': 0,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo,
    'markerCircleNoFillRadius': px5,
    'markerCircleNoFillStrokeWidth': px1_5,
    'markerCirclePointRadius': px2_5,
  }

  let legendLabels = [
    'Стартовал с пит-лейн', 'Не стартовал'
  ]

  // legend
  d3legend(
    legendSVGID, 'legend', legendID,
    ['circle w point', 'circle no fill'],
    legendLabels,
    ['#6E7378', '#6E7378'], attributesDict=legendAttributes)

  let legendEl = getElement(legendID)
  let legendSizes = getSizes(legendEl)
  let legendWidth = Math.floor(legendSizes.width)
  let legendHeight = Math.floor(legendSizes.height)
  let legendHeightHalf = 0.5 * legendHeight


  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let height1 = chart1Height - offsetTop - offsetBottom

  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([height1, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft1Element = d3GetElement(yLeft1)
  let yRight1Element = d3GetElement(yRight1)
  

  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - defaultOffsetLeft - defaultOffsetLeft

  let xScale = d3
    .scaleBand()
    .domain(xtickValues)
    .range([0, width])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    .attr('id', seasonComparisonChartTicksID)
    .call(g => g.select('.domain').remove())

  // hide ticks
  xBottom1
    .selectAll('.tick text')
    .style('opacity', 0)

  // hide ticklabels
  xBottom1
    .selectAll('.tick line')
    .style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .attr('metricLeft', (d) => {

      let value
      let dataLocal = dataLeft.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0][_glabel]
      } else {
        value = ''
      }
        
      return value
      
    })
    .attr('metricRight', (d) => {

      let value
      let dataLocal = dataRight.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0][_glabel]
      } else {
        value = ''
      }
        
      return value
      
    })

  d3StyleAxis(Object.entries({ xBottom1 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl1 = d3CreateAxisRectangle(main1, width, height1, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITION 1 ------------------------- //


  // legend svg
  legendSVGel.setAttribute('width', legendWidth + px1)
  legendSVGel.setAttribute('height', offsetLegendTop + legendHeight + offsetLegendTop - offsetTop)

  let legendSVGTransformX = Math.floor(
    defaultOffsetLeft + paddingXOuter
    - attributesDict['markerCircleNoFillRadius']
    - 0.5*legendAttributes['markerCircleNoFillStrokeWidth']
  )
  legendSVGel.setAttribute('transform', `translate(${legendSVGTransformX}, 0)`)

  // legend
  legendEl.setAttribute('transform', `translate(0, ${offsetLegendTop + legendHeightHalf})`)

  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(defaultOffsetLeft)  
  let yLeftTransformY = offsetTop
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, ${yLeftTransformY})`)
  
  let yRight1TransformX = Math.floor(defaultOffsetLeft + width)
  let yRightTransformY = yLeftTransformY
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, ${yRightTransformY})`)

  // move x-axis
  let xBottomTransformX = defaultOffsetLeft
  let xBottomTransformY = yLeftTransformY + height1
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // axis path
  let transformAxisX = xBottomTransformX
  let transformAxisY = yLeftTransformY
  axisEl1.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

  // move chart1
  let chart1Element = d3GetElement(chart1)
  let chartTransformX = defaultOffsetLeft
  let chartTransformY = yLeftTransformY
  chart1Element.setAttribute('transform', `translate(${chartTransformX}, ${chartTransformY})`)

  let svg1Height = offsetTop + height1 + xBottom1ElementHeight + offsetBottom
  d3GetElement(svg1).setAttribute('height', svg1Height)
  
 
  // ------------------------  SLIDER  ------------------------- //


  // clear slider
  sliderContainer = getElement(seasonComparisonSliderContainerID)

  if (sliderContainer) {

    clearElement(sliderContainer)
    
    sliderContainer.style.width = 0
    sliderContainer.style.marginLeft = 0
    
  } else {

    sliderContainer = document.createElement('div')

    // text sizing 11px has area makes size 15px to compensate this difference add px4 top bottom margin of slider
    sliderContainer.style.marginBottom = `${px4}px`

    sliderContainer.classList.add('slider-container')
    sliderContainer.id = seasonComparisonSliderContainerID

    container.appendChild(sliderContainer)
    
  }

  seasonComparisonSliderCreate(sliderContainer, svg1, xBottom1, dataLeft, dataRight)

  let sliderSizes = getSizes(sliderContainer)
  let sliderHeight = Math.ceil(sliderSizes.height)


  // ------------------------  SVG 2  ------------------------- //


  if (svg2El) {

    clearElement(svg2El)

    svg2El.setAttribute('width', 0)
    svg2El.setAttribute('height', 0)

    svg2 = d3.select('#' + svg2ID)
    
  } else {

    svg2 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-6')
      .attr('id', svg2ID)

    svg2El = d3GetElement(svg2)
    
  }

  svg2
    .attr('width', widthContainer)
    .style('background', _colorBackground)

  let main2ID = 'chart-5-main-2-' + id
  
  let main2 = svg2
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let chart2 = main2
    .append('g')
    .attr('name', 'chart')


  // ------------------------  Y-SCALE 2, Y-AXIS 2, Y-LABELS 2  ------------------------- //


  let height2 = chart2Height - offsetTop2 - offsetBottom2

  let yScale2 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues2), lastElement(ytickValues2)])
    .range([height2, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')

  let yAxis2 = d3
    .axisLeft(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yLeft2 = main2
    .append("g")
    .attr('name', 'axis-left')

  yLeft2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis2)
    .call(g => g.select('.domain').remove())

   let yAxisRight2 = d3
    .axisRight(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yRight2 = main2
    .append("g")
    .attr('name', 'axis-right')

  yRight2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight2)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft2, yRight2 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight2
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft2Element = d3GetElement(yLeft2)
  let yLeft2Width = Math.ceil(getSizes(yLeft2Element).width)
  
  let yRight2Element = d3GetElement(yRight2)
  let yRight2Width = Math.ceil(getSizes(yRight2Element).width)


  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //

  
  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    // .tickFormat('')

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', seasonComparisonChartAxisBottom2ID)

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis2)
    .call(g => g.select('.domain').remove())

  // hide tick labels
  xBottom2
    .selectAll('.tick text')
    .style('opacity', 0)


  // ------------------------  X-LABELS 2 ------------------------- //


  // xtick labels 2
  xBottom2
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsBottomID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    // .attr('EventNumber', d => d['EventNumber'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl2 = d3CreateAxisRectangle(main2, width, height2, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITIONS 2 ------------------------- //


  // move y-axis
  let yLeft2TransformX = Math.floor(defaultOffsetLeft)
  let yRight2TransformX = Math.floor(defaultOffsetLeft + xAxisLength)

  yLeft2Element.setAttribute('transform', `translate(${yLeft2TransformX}, 0)`)
  yRight2Element.setAttribute('transform', `translate(${yRight2TransformX}, 0)`)

  // move x-axis
  let xBottom2TransformY = height2
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom2TransformY})`)

  // axis path
  let transformAxis2X = xBottomTransformX
  axisEl2.setAttribute('transform', `translate(${transformAxis2X}, 0)`)

  // move chart2
  let chart2Element = d3GetElement(chart2)
  chart2Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)

  // main2
  let main2El = d3GetElement(main2)
  let main2TransformY = offsetTop2
  main2El.setAttribute('transform', `translate(0, ${main2TransformY})`)

  let svg2Height = offsetTop2 + height2 + xBottom2ElementHeight + offsetBottom2
  d3GetElement(svg2).setAttribute('height', svg2Height)


  // ------------------------ GRID 1 ------------------------- //

  
  let gridXmin = height1 - offsetGridX
  let gridXmax = offsetGridX

  let gridYmin = width - offsetGridY
  let gridYmax = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart1, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart1, 'grid-left-2', yScale1, ytickValues1, gridYmin, gridYmax, _colorGrid, scaleType='linear')


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let shadowTop = chart1
    .append('g')
    .attr('name', 'shadow-top')

  let line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .y(d => yScale1(d[metric]))

  // path right
  right
    .append('g')
    .attr('name', 'line-right')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRightS)

  // circles dnf right
  right
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorRightS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('visibility', d => { return (noDefineConditions.includes(d[_glabel])) ? 'visible' : 'hidden' })

  // circles right
  right
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRightS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
    .style('r', d => {

      let condition = (
        (d[_glabel] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius
      
    })
    .attr('r', d => {

      let condition = (
        (d[_glabel] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => { return (d[_glabel] == 'DNS') ? 'hidden' : 'visible' })

  right.style('opacity', plotRightOpacity)

  // path left
  left
    .append('g')
    .attr('name', 'line-left')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeftS)

  // circles dnf left
  left
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorLeftS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('opacity', d => { return (noDefineConditions.includes(d[_glabel])) ? 1 : 0 })

  // circles left
  left
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeftS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
    .style('r', d => {

      let condition = (
        (d[_glabel] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .attr('r', d => {

      let condition = (
        (d[_glabel] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => { return (d[_glabel] == 'DNS') ? 'hidden' : 'visible' })

  shadowTop
    .append('rect')
    .attr('id', seasonComparisonSliderShadowTopID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height1 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------ GRID 2 ------------------------- //

  
  let gridXmin2 = height2 - offsetGridX
  let gridXmax2 = offsetGridX

  let gridYmin2 = width - offsetGridY
  let gridYmax2 = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart2, 'grid-bottom', xScale, xtickValues, gridXmin2, gridXmax2, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart2, 'grid-left-2', yScale2, ytickValues2, gridYmin2, gridYmax2, _colorGrid, scaleType='linear')


  // ------------------------  CHART 2  ------------------------ //


  let dnf = chart2
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart2
    .append('g')
    .attr('name', 'bars')

  let shadowBottom = chart2
    .append('g')
    .attr('name', 'shadow-bottom')

  // DNF labels right
  dnf
    .append('g')
    .attr('name', 'dnf-labels-right')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorRightS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .text(d => d['RightMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) + px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['RightGridPosition'])) ? 1 : 0 })

  // DNF labels left
  dnf
    .append('g')
    .attr('name', 'dnf-labels-left')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorLeftS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .text(d => d['LeftMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftGridPosition'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    // .style('cursor', 'pointer')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale2(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale2(0) - yScale2(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)

  shadowBottom
    .append('rect')
    .attr('id', seasonComparisonSliderShadowBottomID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height2 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': metric.replace('Interpolated', ''),
    'Cumulative': null
  }

  seasonComparisonSliderData['legendHeight'] = legendHeight + offsetLegendTop
  
  seasonComparisonSliderData['paddingXOuter'] = paddingXOuter
  seasonComparisonSliderData['chartStepX'] = xScale.step()
  seasonComparisonSliderData['offsetGrid'] = offsetGridX
  seasonComparisonSliderData['metrics'] = sliderMetrics
  seasonComparisonSliderData['type'] = 'average'
  seasonComparisonSliderData['subType'] = 'lower'

  let dataLeftFiltered = dataLeft.filter(o => !noDefineConditions.includes(o[_plabel]))
  let dataRightFiltered = dataRight.filter(o => !noDefineConditions.includes(o[_plabel]))
  
  seasonComparisonDataLeft = dataLeftFiltered
  seasonComparisonDataRight = dataRightFiltered
  seasonComparisonDataDiff = dataDiff
  
}


function chart_7(data1, ContainerID, metric, driverIDTs, colors, id) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)


  // -------------------------------  PARAMETERS  ------------------------------- //


  let offsetGridX = px5
  let offsetGridY = px5

  let xtickPad = px12
  let ytickPad = px12
  
  let xtickSize = px5
  let ytickSize = px4

  let paddingXOuter = _axisRadius + px2
  let paddingYOuter = _axisRadius + px2

  let legendHeight = seasonComparisonSliderData['legendHeight']

  let chart1Height = Math.floor(convertRemToPixels(17)) + legendHeight
  let chart2Height = Math.floor(convertRemToPixels(12))

  let lineWidth = seasonChart5LineWidth
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  // let offsetLegendX = px49
  let offsetLegendTop = px12

  // for all charts with different y-values (10, 100, 1000, 100000000, etc) 
  // have equal offset
  let defaultOffsetLeft = px48

  let offsetTop = px12
  let offsetTop2 = px12

  let offsetBottom = px12
  let offsetBottom2 = px12

  let sliderShadowRadius = _axisRadius
  let sliderShadowOpacity = 0.2

  
  // -------------------------------  DATA  ------------------------------- //


  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let colorLeftS = saturateColor(colorLeft, colorThemesChartSaturation)
  let colorRightS = saturateColor(colorRight, colorThemesChartSaturation)

  let dataRaw = structuredClone(data1)
  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  
  let dataLeft = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTRight))

  let eventIndexes = dataRaw.map(d => d['EventIndex'])
  eventIndexes = dropDuplicates(eventIndexes)

  let metricValues = data.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let xMin = 0
  let xMax = eventIndexes.length
  
  let xtickValues = range(0, xMax)

  let yMin1 = 1
  let yMax1 = lastElement(metricValues)

  if (isEven(yMax1)) { yMax1 +=1 }

  let ytickValues1 = generateRange(yMin1, yMax1, '2')

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['EventIndex'])
  let dataRightRaces = dataRight.map(d => d['EventIndex'])
  
  let eventsData = []
  
  eventIndexes.forEach((eventIndex, i) => {

    let dataFiltered = data.filter(d => d['EventIndex'] == eventIndex)

    if (dataFiltered.length > 0) {

      dataFiltered = dataFiltered[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataFiltered['EventAbbreviation'],
        EventNameRus: dataFiltered['EventNameRus'],
        EventNameShortRus: dataFiltered['EventNameShortRus'],
        EventIndex: dataFiltered['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    } else {

      let dataAll = data1.filter(d => d['EventIndex'] == eventIndex)[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataAll['EventAbbreviation'],
        EventNameRus: dataAll['EventNameRus'],
        EventNameShortRus: dataAll['EventNameShortRus'],
        EventIndex: dataAll['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    }
    
    if (dataLeftRaces.includes(eventIndex)) { dataLeft.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    if (dataRightRaces.includes(eventIndex)) { dataRight.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    
  })


  // ---------------------------  DIFFERENCE DATA  --------------------------- //


  let dataDiff = []
  let noDefineConditions = ['DNS', 'DNF', 'DSQ']
  
  eventsData.forEach((d, i) => {

    let leftData = dataLeft.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
    let rightData = dataRight.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
    
    let pointsDiff
    let eventName
    let leftFullName
    let rightFullName
    let leftGridPosition
    let rightGridPosition
    let leftClassPosition
    let rightClassPosition
    let leftMarker
    let rightMarker
    let leftPointsOfficial
    let rightPointsOfficial

    // eventNameRus = d['EventNameRus']
    let eventNameRus = seasonCalendar.filter(o => o['EventIndex'] == d['CoordIndex'])[0]['EventNameRus']

    if (leftData.length == 0) {
      
      pointsDiff = 0
      
    } else if (rightData.length == 0) {
      
      pointsDiff = 0
      
    } else {

      if (((leftData[0][_plabel] == 'DNF') || (leftData[0][_plabel] == 'DSQ'))
          && ((rightData[0][_plabel] == 'DNF') || (rightData[0][_plabel] == 'DSQ'))) {
        
        pointsDiff = 0
        
      } else if ((leftData[0][_plabel] == 'DNF') || (leftData[0][_plabel] == 'DSQ')) {
        
        pointsDiff = -rightData[0]['PointsOfficial']
        
      } else if ((rightData[0][_plabel] == 'DNF') || (rightData[0][_plabel] == 'DSQ')) {
        
        pointsDiff = +leftData[0]['PointsOfficial']
        
      } else {
        
        pointsDiff = leftData[0]['PointsOfficial'] - rightData[0]['PointsOfficial']
        
      }

      if (noDefineConditions.includes(leftData[0][_plabel])) {
        leftMarker = leftData[0][_plabel]
      }

      if (noDefineConditions.includes(rightData[0][_plabel])) {
        rightMarker = rightData[0][_plabel]
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0][_glabel]
      rightGridPosition = rightData[0][_glabel]
      
      leftClassPosition = leftData[0][_plabel]
      rightClassPosition = rightData[0][_plabel]
      
      leftPointsOfficial = leftData[0]['PointsOfficial']
      rightPointsOfficial = rightData[0]['PointsOfficial']
      
    }

    dataDiff.push({
      'CoordIndex': d['CoordIndex'],
      'MetricDiff': pointsDiff,
      'EventNameRus': eventNameRus,
      'LeftFullName': leftFullName,
      'RightFullName': rightFullName,
      'LeftGridPosition': leftGridPosition,
      'RightGridPosition': rightGridPosition,
      'LeftClassPosition': leftClassPosition,
      'RightClassPosition': rightClassPosition,
      'LeftMarker': leftMarker,
      'RightMarker': rightMarker,
      'LeftPointsOfficial': leftPointsOfficial,
      'RightPointsOfficial': rightPointsOfficial
    })
    
  })

  let pointsOff = dataDiff.map(d => d['MetricDiff'])
  let pointsDiffMaxAbs = Math.max.apply(null, pointsOff.map(Math.abs))

  let yMin2 = roundStep(-pointsDiffMaxAbs, 5, 'floor')
  let yMax2 = roundStep(pointsDiffMaxAbs, 5, 'ceil')

  let ytickValues2 = generateRange(yMin2, yMax2)

  if ((firstElement(ytickValues2) == 0) && (lastElement(ytickValues2) == 0)) {
    ytickValues2 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px14
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px0
  }
  else {
    barWidth = px14
    paddingOuterX = px0
  }


  // -------------------  DOWNLOAD NAMES  ------------------- //


  let filenameMetric = dropdown14Data.filter(o => o['metric'] == metric)[0]['savename']
  
  let filename = `${glVSeason['SeasonID']}_${filenameMetric}_dynamics`
  let filenameDiff = filename + '_diff'
  let filenameBoth = filename + '_w_diff'

  let itemSVGChart = getElement(seasonComparisonDownloadSVGChartID)
  downloadItemFill(itemSVGChart, filename)

  let itemPNGChart = getElement(seasonComparisonDownloadPNGChartID)
  downloadItemFill(itemPNGChart, filename)

  let itemSVGDiff = getElement(seasonComparisonDownloadSVGDiffID)
  downloadItemFill(itemSVGDiff, filenameDiff)

  let itemPNGDiff = getElement(seasonComparisonDownloadPNGDiffID)
  downloadItemFill(itemPNGDiff, filenameDiff)

  let itemSVGBoth = getElement(seasonComparisonDownloadID + '-svg-both')
  downloadItemFill(itemSVGBoth, filenameBoth)

  let itemPNGBoth = getElement(seasonComparisonDownloadID + '-png-both')
  downloadItemFill(itemPNGBoth, filenameBoth)


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.ceil(containerSizes.width)

  let legendID = id + '-legend'
  let legendSVGID = legendID + '-svg'
  let legendSVGel = getElement(legendSVGID)
  
  let svg1ID = seasonComparisonMainChartSVG1ID
  let svg2ID = seasonComparisonMainChartSVG2ID

  let svg1El = getElement(svg1ID)
  let svg2El = getElement(svg2ID)

  let svg1
  let svg2

  let sliderContainer
  
  if (legendSVGel) {
    
    clearElement(legendSVGel)

    legendSVGel.setAttribute('width', 0)
    legendSVGel.setAttribute('height', 0)
    
  } else {

    legendSVG = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'legend')
      .attr('id', legendSVGID)

    legendSVGel = d3GetElement(legendSVG)
    
  }

  // clear SVGs
  if (svg1El) {
    
    clearElement(svg1El)
      
    svg1El.setAttribute('width', 0)
    svg1El.setAttribute('height', 0)

    svg1 = d3.select('#' + svg1ID)

  } else {

    svg1 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-7')
      .attr('id', svg1ID)
    
    svg1El = d3GetElement(svg1)
      
  }

  svg1
    .attr('width', widthContainer)
    .style('background', _colorBackground)


  let main1ID = 'chart-5-main-1-' + id
  
  let main1 = svg1
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')


  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let height1 = chart1Height - offsetTop - offsetBottom

  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([height1, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft1Element = d3GetElement(yLeft1)
  let yRight1Element = d3GetElement(yRight1)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - defaultOffsetLeft - defaultOffsetLeft

  let xScale = d3
    .scaleBand()
    .domain(xtickValues)
    .range([0, width])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    .attr('id', seasonComparisonChartTicksID)
    .call(g => g.select('.domain').remove())

  // hide ticks
  xBottom1
    .selectAll('.tick text')
    .style('opacity', 0)

  // hide ticklabels
  xBottom1
    .selectAll('.tick line')
    .style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .attr('metricLeft', (d) => {

      let value
      let dataLocal = dataLeft.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0]['PointsOfficial']
      } else {
        value = ''
      }
        
      return value
      
    })
    .attr('metricRight', (d) => {

      let value
      let dataLocal = dataRight.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0]['PointsOfficial']
      } else {
        value = ''
      }
        
      return value
      
    })

  d3StyleAxis(Object.entries({ xBottom1 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl1 = d3CreateAxisRectangle(main1, width, height1, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITION 1 ------------------------- //


  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(defaultOffsetLeft)  
  let yRight1TransformX = Math.floor(defaultOffsetLeft + width)
  
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, 0)`)
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, 0)`)

  // move x-axis
  let xBottomTransformX = defaultOffsetLeft
  let xBottomTransformY = height1
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // axis path
  let transformAxisX = xBottomTransformX
  axisEl1.setAttribute('transform', `translate(${transformAxisX}, 0)`)

  // move chart1
  let chart1Element = d3GetElement(chart1)
  let chartTransformX = defaultOffsetLeft
  chart1Element.setAttribute('transform', `translate(${chartTransformX}, 0)`)

  // move main
  let main1El = d3GetElement(main1)
  let main1TransformY = offsetTop
  main1El.setAttribute('transform', `translate(0, ${main1TransformY})`)

  let svg1Height = offsetTop + height1 + xBottom1ElementHeight + offsetBottom
  d3GetElement(svg1).setAttribute('height', svg1Height)


  // ------------------------  SLIDER  ------------------------- //


  // clear slider
  sliderContainer = getElement(seasonComparisonSliderContainerID)

  if (sliderContainer) {

    clearElement(sliderContainer)
    
    sliderContainer.style.width = 0
    sliderContainer.style.marginLeft = 0
    
  } else {

    sliderContainer = document.createElement('div')

    // text sizing 11px has area makes size 15px. to compensate this difference add px4 top bottom margin of slider
    sliderContainer.style.marginBottom = `${px4}px`

    sliderContainer.classList.add('slider-container')
    sliderContainer.id = seasonComparisonSliderContainerID

    container.appendChild(sliderContainer)
    
  }

  seasonComparisonSliderCreate(sliderContainer, svg1, xBottom1, dataLeft, dataRight)

  let sliderSizes = getSizes(sliderContainer)
  let sliderHeight = Math.ceil(sliderSizes.height)


  // ------------------------  SVG 2  ------------------------- //


  if (svg2El) {

    clearElement(svg2El)

    svg2El.setAttribute('width', 0)
    svg2El.setAttribute('height', 0)

    svg2 = d3.select('#' + svg2ID)
    
  } else {

    svg2 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-7')
      .attr('id', svg2ID)

    svg2El = d3GetElement(svg2)
    
  }

  svg2
    .attr('width', widthContainer)
    .style('background', _colorBackground)

  let main2ID = 'chart-5-main-2-' + id
  
  let main2 = svg2
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let chart2 = main2
    .append('g')
    .attr('name', 'chart')


  // ------------------------  Y-SCALE 2, Y-AXIS 2, Y-LABELS 2  ------------------------- //


  let height2 = chart2Height - offsetTop2 - offsetBottom2

  let yScale2 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues2), lastElement(ytickValues2)])
    .range([height2, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')

  let yAxis2 = d3
    .axisLeft(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yLeft2 = main2
    .append("g")
    .attr('name', 'axis-left')

  yLeft2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis2)
    .call(g => g.select('.domain').remove())

   let yAxisRight2 = d3
    .axisRight(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yRight2 = main2
    .append("g")
    .attr('name', 'axis-right')

  yRight2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight2)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft2, yRight2 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight2
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft2Element = d3GetElement(yLeft2)
  let yLeft2Width = Math.ceil(getSizes(yLeft2Element).width)
  
  let yRight2Element = d3GetElement(yRight2)
  let yRight2Width = Math.ceil(getSizes(yRight2Element).width)


  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //

  
  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', seasonComparisonChartAxisBottom2ID)

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis2)
    .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom2.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 2 ------------------------- //


  // xtick labels 2
  xBottom2
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsBottomID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)
  

  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl2 = d3CreateAxisRectangle(main2, width, height2, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITIONS 2 ------------------------- //

  
  // move y-axis
  let yLeft2TransformX = Math.floor(defaultOffsetLeft)
  let yRight2TransformX = Math.floor(defaultOffsetLeft + xAxisLength)

  yLeft2Element.setAttribute('transform', `translate(${yLeft2TransformX}, 0)`)
  yRight2Element.setAttribute('transform', `translate(${yRight2TransformX}, 0)`)

  // move x-axis
  let xBottom2TransformY = height2
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom2TransformY})`)

  // axis path
  let transformAxis2X = xBottomTransformX
  axisEl2.setAttribute('transform', `translate(${transformAxis2X}, 0)`)

  // move chart2
  let chart2Element = d3GetElement(chart2)
  chart2Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)

  // main2
  let main2El = d3GetElement(main2)
  let main2TransformY = offsetTop2
  main2El.setAttribute('transform', `translate(0, ${main2TransformY})`)

  let svg2Height = offsetTop2 + height2 + xBottom2ElementHeight + offsetBottom2
  d3GetElement(svg2).setAttribute('height', svg2Height)


  // ------------------------ GRID 1 ------------------------- //

  
  let gridXmin = height1 - offsetGridX
  let gridXmax = offsetGridX

  let gridYmin = width - offsetGridY
  let gridYmax = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart1, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart1, 'grid-left-2', yScale1, ytickValues1, gridYmin, gridYmax, _colorGrid, scaleType='linear')


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let shadowTop = chart1
    .append('g')
    .attr('name', 'shadow-top')

  let line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .y(d => yScale1(d[metric]))

  // path right
  right
    .append('g')
    .attr('name', 'line-right')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRightS)

  // circles right
  right
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRightS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleRadius)
    .attr('r', circleRadius)

  right.style('opacity', plotRightOpacity)

  // path left
  left
    .append('g')
    .attr('name', 'line-left')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeftS)

  // circles left
  left
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeftS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleRadius)
    .attr('r', circleRadius)

  shadowTop
    .append('rect')
    .attr('id', seasonComparisonSliderShadowTopID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height1 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------ GRID 2 ------------------------- //

  
  let gridXmin2 = height2 - offsetGridX
  let gridXmax2 = offsetGridX

  let gridYmin2 = width - offsetGridY
  let gridYmax2 = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart2, 'grid-bottom', xScale, xtickValues, gridXmin2, gridXmax2, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart2, 'grid-left-2', yScale2, ytickValues2, gridYmin2, gridYmax2, _colorGrid, scaleType='linear')


  // ------------------------  CHART 2  ------------------------ //


  let dnf = chart2
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart2
    .append('g')
    .attr('name', 'bars')

  let shadowBottom = chart2
    .append('g')
    .attr('name', 'shadow-bottom')

  // DNF labels right
  dnf
    .append('g')
    .attr('name', 'dnf-labels-right')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorRightS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .text(d => d['RightMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) + px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['RightClassPosition'])) ? 1 : 0 })

  // DNF labels left
  dnf
    .append('g')
    .attr('name', 'dnf-labels-left')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorLeftS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .text(d => d['LeftMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftClassPosition'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    // .style('cursor', 'pointer')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale2(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale2(0) - yScale2(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)
    .on('mouseover', function(event, d) {
      if (notMobileDevice) {
        d3.select(this).style('opacity', 0.75)
      }
    })
    .on('mousemove', (event, d) => {
      if (notMobileDevice) {
        showTooltip(event, d, d3.pointer(event, container))
      }
    })
    .on('mouseleave', function(event, d) {
      if (notMobileDevice) {
        d3.select(this).style('opacity', 1)
        hideTooltip(event, d)
      }
    })

  shadowBottom
    .append('rect')
    .attr('id', seasonComparisonSliderShadowBottomID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height2 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // -------------------------------------  TOOLTIP  ------------------------------------- //


  let tooltipElement = getElement(seasonComparisonMainChartTooltipID)

  if (!tooltipElement) {
    
    tooltip  = d3
      .select(containerID)
      .append('div')
      .attr('class', 'tooltip')
      .attr('id', seasonComparisonMainChartTooltipID)

    tooltipElement = d3GetElement(tooltip)
      
  }

  let showTooltip = function(event, d, coord) {

    // let element = event.target

    let tooltipColor

    if (d['MetricDiff'] >= 0) {
      tooltipColor = colorLeftS
    } else {
      tooltipColor = colorRightS
    }

    let tooltipHTML = `
      <div class='flex-column a-start tooltip-text ps-075 pe-075 pt-05 pb-05'>
      
        <div style='color:${tooltipColor}'><b>${d['EventNameRus']}</b></div>

        <div class='flex mt-05'>
          <div class=''>Разница по очкам:</div>
          <div class='tooltip-title ms-025'>${Math.abs(d['MetricDiff'])}</div>
        </div>

        <div class='tooltip-title mt-05'>Набранные очки</div>
        
        <div class='mt-025'>${d['LeftFullName']}: ${d['LeftPointsOfficial']}</div>
        <div class='mt-025'>${d['RightFullName']}: ${d['RightPointsOfficial']}</div>

        <div class='tooltip-title mt-05'>Стартовые позиции</div>
        
        <div class='mt-025'>${d['LeftFullName']}: ${d['LeftGridPosition']}</div>
        <div class='mt-025'>${d['RightFullName']}: ${d['RightGridPosition']}</div>
        
        <div class='tooltip-title mt-05'>Финишные позиции</div>
        
        <div class='mt-025'>${d['LeftFullName']}: ${d['LeftClassPosition']}</div>
        <div class='mt-025'>${d['RightFullName']}: ${d['RightClassPosition']}</div>

      </div>
    `
    
    tooltipElement.innerHTML = tooltipHTML

    // let barCoordY = Number(element.getAttribute('y'))

    let tooltipWidth = tooltipElement.offsetWidth
    let tooltipHeight = tooltipElement.offsetHeight

    let tooltipOffsetX = px16
    let tooltipOffsetY = px16

    let tooltipAxisPad = px10

    let mouseXCoord = coord[0]
    let mouseYCoord = coord[1]

    let tooltipCoordLeft = mouseXCoord - tooltipOffsetX - tooltipWidth

    let tooltipTop = mouseYCoord - tooltipOffsetY - tooltipHeight
    let tooltipLeft = mouseXCoord - tooltipOffsetX - tooltipWidth

    if (tooltipCoordLeft < tooltipAxisPad) {
      tooltipLeft = mouseXCoord + tooltipOffsetX
    }
    
    tooltipElement.style.left = `${tooltipLeft}px`
    tooltipElement.style.top = `${tooltipTop}px`

    tooltipElement.style.opacity = 1
    
  }

  let hideTooltip = function() { tooltipElement.style.opacity = 0 }


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': 'PointsOfficial',
    'Cumulative': metric
  }

  seasonComparisonSliderData['paddingXOuter'] = paddingXOuter
  seasonComparisonSliderData['chartStepX'] = xScale.step()
  seasonComparisonSliderData['offsetGrid'] = offsetGridX
  seasonComparisonSliderData['metrics'] = sliderMetrics
  seasonComparisonSliderData['type'] = 'cumulative'
  seasonComparisonSliderData['subType'] = 'higher'

  let dataLeftFiltered = dataLeft.filter(o => !noDefineConditions.includes(o[_plabel]))
  let dataRightFiltered = dataRight.filter(o => !noDefineConditions.includes(o[_plabel]))
  
  seasonComparisonDataLeft = dataLeftFiltered
  seasonComparisonDataRight = dataRightFiltered
  seasonComparisonDataDiff = dataDiff

}


function chart_8(data1, ContainerID, metric, driverIDTs, colors, id) {
  
  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)

  // offset of chart 7 remove
  container.style.marginTop = 0


  // -------------------------------  PARAMETERS  ------------------------------- //


  let offsetGridX = px5
  let offsetGridY = px5

  let xtickPad = px12
  let ytickPad = px12
  
  let xtickSize = px5
  let ytickSize = px4

  let paddingXOuter = _axisRadius + px2
  let paddingYOuter = _axisRadius + px2

  let chart1Height = Math.floor(convertRemToPixels(17))
  let chart2Height = Math.floor(convertRemToPixels(12))

  let lineWidth = seasonChart5LineWidth
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  // let offsetLegendX = px49
  let offsetLegendTop = px12

  // for all charts with different y-values (10, 100, 1000, 100000000, etc) 
  // have equal offset
  let defaultOffsetLeft = px48

  let offsetTop = px12
  let offsetTop2 = px12

  let offsetBottom = px12
  let offsetBottom2 = px12

  let sliderShadowRadius = _axisRadius
  let sliderShadowOpacity = 0.2

  
  // -------------------------------  DATA  ------------------------------- //


  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let colorLeftS = saturateColor(colorLeft, colorThemesChartSaturation)
  let colorRightS = saturateColor(colorRight, colorThemesChartSaturation)

  let dataRaw = structuredClone(data1)
  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  
  let dataLeft = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTRight))

  let eventIndexes = dataRaw.map(d => d['EventIndex'])
  eventIndexes = dropDuplicates(eventIndexes)

  let metricValues = dataRaw.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let xMin = 0
  let xMax = eventIndexes.length
  
  let xtickValues = range(0, xMax)

  let yMin1 = 1
  let yMax1 = lastElement(metricValues)

  if (isEven(yMax1)) { yMax1 +=1 }

  let ytickValues1 = range(yMin1, yMax1 + 1, 2)

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['EventIndex'])
  let dataRightRaces = dataRight.map(d => d['EventIndex'])
  
  let eventsData = []
  
  eventIndexes.forEach((eventIndex, i) => {

    let dataFiltered = data.filter(d => d['EventIndex'] == eventIndex)

    if (dataFiltered.length > 0) {

      dataFiltered = dataFiltered[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataFiltered['EventAbbreviation'],
        EventNameRus: dataFiltered['EventNameRus'],
        EventNameShortRus: dataFiltered['EventNameShortRus'],
        EventIndex: dataFiltered['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    } else {

      let dataAll = data1.filter(d => d['EventIndex'] == eventIndex)[0]

      eventsData.push({
        CoordIndex: i,
        EventAbbreviation: dataAll['EventAbbreviation'],
        EventNameRus: dataAll['EventNameRus'],
        EventNameShortRus: dataAll['EventNameShortRus'],
        EventIndex: dataAll['EventIndex'],
        // EventNumber: dataFiltered['EventNumber'],
      })
      
    }
    
    if (dataLeftRaces.includes(eventIndex)) { dataLeft.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    if (dataRightRaces.includes(eventIndex)) { dataRight.filter(d => d['EventIndex'] == eventIndex)[0]['CoordIndex'] = i }
    
  })


  // ---------------------------  DIFFERENCE DATA  --------------------------- //


  let dataDiff = []
  let noDefineConditions = ['DNC']

  let metricCleared = metric.replace('Interpolated', '')

  eventsData.forEach((d, i) => {

    let leftData = dataLeft.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
    let rightData = dataRight.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])

    let metricDiff
    let eventName
    let eventIndex
    let leftFullName
    let rightFullName
    let leftGridPosition
    let rightGridPosition
    let leftClassPosition
    let rightClassPosition
    let leftMarker
    let rightMarker
    let leftMetric
    let rightMetric

    eventNameRus = d['EventNameRus']
    eventIndex = d['EventIndex']

    if (leftData.length == 0) {
      
      metricDiff = 0
      
    } else if (rightData.length == 0) {
      
      metricDiff = 0
      
    } else {

      if (noDefineConditions.includes(leftData[0][metricCleared])
          && noDefineConditions.includes(rightData[0][metricCleared])) {
        
        metricDiff = 0
        
        leftRetired = 1
        rightRetired = 1
        
        leftMarker = leftData[0]['RankPoints']
        rightMarker = rightData[0]['RankPoints']
        
      } else if (noDefineConditions.includes(leftData[0][metricCleared])) {
        
        metricDiff = 0
        leftMarker = leftData[0]['RankPoints']
        
      } else if (noDefineConditions.includes(rightData[0][metricCleared])) {
        
        metricDiff = 0
        rightMarker = rightData[0]['RankPoints']
        
      } else {
        
        metricDiff =  rightData[0][metric] - leftData[0][metric]
        
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0][_glabel]
      rightGridPosition = rightData[0][_glabel]
      
      leftClassPosition = leftData[0][_plabel]
      rightClassPosition = rightData[0][_plabel]
      
      leftMetric = leftData[0][metricCleared]
      rightMetric = rightData[0][metricCleared]

    }

    dataDiff.push({
      'CoordIndex': d['CoordIndex'],
      'MetricDiff': metricDiff,
      'EventIndex': eventIndex,
      'EventNameRus': eventNameRus,
      'LeftFullName': leftFullName,
      'RightFullName': rightFullName,
      'LeftGridPosition': leftGridPosition,
      'RightGridPosition': rightGridPosition,
      'LeftClassPosition': leftClassPosition,
      'RightClassPosition': rightClassPosition,
      'LeftMarker': leftMarker,
      'RightMarker': rightMarker,
      'LeftMetric': leftMetric,
      'RightMetric': rightMetric
    })
    
  })

  let metricOff = dataDiff.map(d => d['MetricDiff'])
  let metricDiffMaxAbs = Math.max.apply(null, metricOff.map(Math.abs))

  let yMin2 = roundStep(-metricDiffMaxAbs, 5, 'floor')
  let yMax2 = roundStep(metricDiffMaxAbs, 5, 'ceil')

  let ytickValues2Length

  if ((yMax2 <= 10) || (yMax2 > 15)) {
    ytickValues2Length = '2'
  } else {
    ytickValues2Length = '3'
  }

  let ytickValues2 = generateRange(yMin2, yMax2, length=ytickValues2Length)

  if ((firstElement(ytickValues2) == 0) && (lastElement(ytickValues2) == 0)) {
    ytickValues2 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px14
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px0
  }
  else {
    barWidth = px14
    paddingOuterX = px0
  }


  // -------------------  DOWNLOAD NAMES  ------------------- //


  let filenameMetric = dropdown14Data.filter(o => o['metric'] == metric)[0]['savename']
  
  let filename = `${glVSeason['SeasonID']}_${filenameMetric}_dynamics`
  let filenameDiff = filename + '_diff'
  let filenameBoth = filename + '_w_diff'

  let itemSVGChart = getElement(seasonComparisonDownloadSVGChartID)
  downloadItemFill(itemSVGChart, filename)

  let itemPNGChart = getElement(seasonComparisonDownloadPNGChartID)
  downloadItemFill(itemPNGChart, filename)

  let itemSVGDiff = getElement(seasonComparisonDownloadSVGDiffID)
  downloadItemFill(itemSVGDiff, filenameDiff)

  let itemPNGDiff = getElement(seasonComparisonDownloadPNGDiffID)
  downloadItemFill(itemPNGDiff, filenameDiff)

  let itemSVGBoth = getElement(seasonComparisonDownloadID + '-svg-both')
  downloadItemFill(itemSVGBoth, filenameBoth)

  let itemPNGBoth = getElement(seasonComparisonDownloadID + '-png-both')
  downloadItemFill(itemPNGBoth, filenameBoth)


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.ceil(containerSizes.width)

  let legendID = id + '-legend'
  let legendSVGID = legendID + '-svg'
  let legendSVGel = getElement(legendSVGID)
  
  let svg1ID = seasonComparisonMainChartSVG1ID
  let svg2ID = seasonComparisonMainChartSVG2ID

  let svg1El = getElement(svg1ID)
  let svg2El = getElement(svg2ID)

  let svg1
  let svg2

  let sliderContainer
  
  if (legendSVGel) {
    
    clearElement(legendSVGel)
    
  } else {

    legendSVG = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'legend')
      .attr('id', legendSVGID)

    legendSVGel = d3GetElement(legendSVG)
    
  }

  // clear SVGs
  if (svg1El) {
    
    clearElement(svg1El)
      
    svg1El.setAttribute('width', 0)
    svg1El.setAttribute('height', 0)

    svg1 = d3.select('#' + svg1ID)

  } else {

    svg1 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-8')
      .attr('id', svg1ID)
    
    svg1El = d3GetElement(svg1)
      
  }

  svg1
    .attr('width', widthContainer)
    .style('background', _colorBackground)


  let main1ID = 'chart-5-main-1-' + id
  
  let main1 = svg1
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legendAttributes = {
    'x': 0,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo,
    'markerCircleNoFillRadius': px5,
    'markerCircleNoFillStrokeWidth': px1_5,
    'markerCirclePointRadius': px2_5,
  }

  let legendLabels = [
    'Не классифицирован в рейтинге',
  ]

  // legend
  d3legend(
    legendSVGID, 'legend', legendID,
    ['circle no fill'],
    legendLabels,
    ['#6E7378', '#6E7378'], attributesDict=legendAttributes)

  let legendEl = getElement(legendID)
  let legendSizes = getSizes(legendEl)
  let legendWidth = Math.floor(legendSizes.width)
  let legendHeight = Math.floor(legendSizes.height)
  let legendHeightHalf = 0.5 * legendHeight


  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let height1 = chart1Height - offsetTop - offsetBottom

  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([height1, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft1Element = d3GetElement(yLeft1)
  let yRight1Element = d3GetElement(yRight1)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - defaultOffsetLeft - defaultOffsetLeft

  let xScale = d3
    .scaleBand()
    .domain(xtickValues)
    .range([0, width])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    .attr('id', seasonComparisonChartTicksID)
    .call(g => g.select('.domain').remove())

  // hide ticks
  xBottom1
    .selectAll('.tick text')
    .style('opacity', 0)

  // hide ticklabels
  xBottom1
    .selectAll('.tick line')
    .style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .attr('metricLeft', (d) => {
      
      let value
      let dataLocal = dataLeft.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0][metricCleared]
      } else {
        value = ''
      }
        
      return value
      
    })
    .attr('metricRight', (d) => {

      let value
      let dataLocal = dataRight.filter(o => o['CoordIndex'] == d['CoordIndex'])
  
      if (dataLocal.length > 0) {
        value = dataLocal[0][metricCleared]
      } else {
        value = ''
      }
        
      return value
      
    })

  d3StyleAxis(Object.entries({ xBottom1 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl1 = d3CreateAxisRectangle(main1, width, height1, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITION 1 ------------------------- //


  // legend svg
  legendSVGel.setAttribute('width', legendWidth + px1)
  legendSVGel.setAttribute('height', offsetLegendTop + legendHeight + offsetLegendTop - offsetTop)

  let legendSVGTransformX = Math.floor(
    defaultOffsetLeft + paddingXOuter
    - attributesDict['markerCircleNoFillRadius']
    - 0.5*legendAttributes['markerCircleNoFillStrokeWidth']
  )
  legendSVGel.setAttribute('transform', `translate(${legendSVGTransformX}, 0)`)

  // legend
  legendEl.setAttribute('transform', `translate(0, ${offsetLegendTop + legendHeightHalf})`)

  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(defaultOffsetLeft)  
  let yLeftTransformY = offsetTop
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, ${yLeftTransformY})`)
  
  let yRight1TransformX = Math.floor(defaultOffsetLeft + width)
  let yRightTransformY = yLeftTransformY
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, ${yRightTransformY})`)

  // move x-axis
  let xBottomTransformX = defaultOffsetLeft
  let xBottomTransformY = yLeftTransformY + height1
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // axis path
  let transformAxisX = xBottomTransformX
  let transformAxisY = yLeftTransformY
  axisEl1.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

  // move chart1
  let chart1Element = d3GetElement(chart1)
  let chartTransformX = defaultOffsetLeft
  let chartTransformY = yLeftTransformY
  chart1Element.setAttribute('transform', `translate(${chartTransformX}, ${chartTransformY})`)

  let svg1Height = offsetTop + height1 + xBottom1ElementHeight + offsetBottom
  d3GetElement(svg1).setAttribute('height', svg1Height)


  // ------------------------  SLIDER  ------------------------- //


  // clear slider
  sliderContainer = getElement(seasonComparisonSliderContainerID)

  if (sliderContainer) {

    clearElement(sliderContainer)
    
    sliderContainer.style.width = 0
    sliderContainer.style.marginLeft = 0
    
  } else {

    sliderContainer = document.createElement('div')

    // text sizing 11px has area makes size 15px. to compensate this difference add px4 top bottom margin of slider
    sliderContainer.style.marginBottom = `${px4}px`

    sliderContainer.classList.add('slider-container')
    sliderContainer.id = seasonComparisonSliderContainerID

    container.appendChild(sliderContainer)
    
  }

  seasonComparisonSliderCreate(sliderContainer, svg1, xBottom1, dataLeft, dataRight)

  let sliderSizes = getSizes(sliderContainer)
  let sliderHeight = Math.ceil(sliderSizes.height)


  // ------------------------  SVG 2  ------------------------- //


  if (svg2El) {

    clearElement(svg2El)

    svg2El.setAttribute('width', 0)
    svg2El.setAttribute('height', 0)

    svg2 = d3.select('#' + svg2ID)
    
  } else {

    svg2 = d3
      .select(containerID)
      .append('svg')
      .attr('name', 'chart-8')
      .attr('id', svg2ID)

    svg2El = d3GetElement(svg2)
    
  }

  svg2
    .attr('width', widthContainer)
    .style('background', _colorBackground)

  let main2ID = 'chart-5-main-2-' + id
  
  let main2 = svg2
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let chart2 = main2
    .append('g')
    .attr('name', 'chart')


  // ------------------------  Y-SCALE 2, Y-AXIS 2, Y-LABELS 2  ------------------------- //


  let height2 = chart2Height - offsetTop2 - offsetBottom2

  let yScale2 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues2), lastElement(ytickValues2)])
    .range([height2, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')

  let yAxis2 = d3
    .axisLeft(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yLeft2 = main2
    .append("g")
    .attr('name', 'axis-left')

  yLeft2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis2)
    .call(g => g.select('.domain').remove())

   let yAxisRight2 = d3
    .axisRight(yScale2)
    .tickValues(ytickValues2)
    .tickSize(ytickSize)
    .tickFormat(v => Math.abs(v))

  let yRight2 = main2
    .append("g")
    .attr('name', 'axis-right')

  yRight2
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight2)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft2, yRight2 }), _tickLineWidth, px11, axis='y', ytickPad, _axisColor, _ticklabelColor)

  yRight2
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', ytickPad)

  let yLeft2Element = d3GetElement(yLeft2)
  let yLeft2Width = Math.ceil(getSizes(yLeft2Element).width)
  
  let yRight2Element = d3GetElement(yRight2)
  let yRight2Width = Math.ceil(getSizes(yRight2Element).width)


  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //

  
  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', seasonComparisonChartAxisBottom2ID)

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis2)
    .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom2.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 2 ------------------------- //


  // xtick labels 2
  xBottom2
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', seasonComparisonChartLabelsBottomID)
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventAbb', d => d['EventAbbreviation'])
    .attr('eventName', d => d['EventNameShortRus'])
    // .attr('EventNumber', d => d['EventNumber'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px11, axis='x', xtickPad, _axisColor, _ticklabelColor)

  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl2 = d3CreateAxisRectangle(main2, width, height2, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITIONS 2 ------------------------- //


  // move y-axis
  let yLeft2TransformX = Math.floor(defaultOffsetLeft)
  let yRight2TransformX = Math.floor(defaultOffsetLeft + xAxisLength)

  yLeft2Element.setAttribute('transform', `translate(${yLeft2TransformX}, 0)`)
  yRight2Element.setAttribute('transform', `translate(${yRight2TransformX}, 0)`)

  // move x-axis
  let xBottom2TransformY = height2
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom2TransformY})`)

  // axis path
  let transformAxis2X = xBottomTransformX
  axisEl2.setAttribute('transform', `translate(${transformAxis2X}, 0)`)

  // move chart2
  let chart2Element = d3GetElement(chart2)
  chart2Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)

  // main2
  let main2El = d3GetElement(main2)
  let main2TransformY = offsetTop2
  main2El.setAttribute('transform', `translate(0, ${main2TransformY})`)

  let svg2Height = offsetTop2 + height2 + xBottom2ElementHeight + offsetBottom2
  d3GetElement(svg2).setAttribute('height', svg2Height)


  // ------------------------ GRID 1 ------------------------- //

  
  let gridXmin = height1 - offsetGridX
  let gridXmax = offsetGridX

  let gridYmin = width - offsetGridY
  let gridYmax = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart1, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart1, 'grid-left-2', yScale1, ytickValues1, gridYmin, gridYmax, _colorGrid, scaleType='linear')


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let shadowTop = chart1
    .append('g')
    .attr('name', 'shadow-top')

  let line = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .y(d => yScale1(d[metric]))

  // path right
  right
    .append('g')
    .attr('name', 'line-right')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRightS)

  // circles dnf right
  right
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorRightS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('opacity', d => { return (d['PointsClassified'] == 0) ? 1 : 0 })

  // circles right
  right
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRightS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
    .style('r', d => {

      let condition = (
        (d['PointsClassified'] == 0)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .attr('r', d => {

      let condition = (
        (d['PointsClassified'] == 0)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => {
        
      let condition = (
        d['PointsClassified'] == 0
      )
        
      return (condition) ? 'hidden' : 'visible' 
      
    })

  right.style('opacity', plotRightOpacity)

  // path left
  left
    .append('g')
    .attr('name', 'line-left')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', lineWidth)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeftS)

  // circles dnf left
  left
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorLeftS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('opacity', d => { return (d['PointsClassified'] == 0) ? 1 : 0 })

  // circles left
  left
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeftS)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
    .style('r', d => {

      let condition = (
        (d['PointsClassified'] == 0)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .attr('r', d => {

      let condition = (
        (d['PointsClassified'] == 0)
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => {
        
      let condition = (
        d['PointsClassified'] == 0
      )
        
      return (condition) ? 'hidden' : 'visible' 
      
    })

  shadowTop
    .append('rect')
    .attr('id', seasonComparisonSliderShadowTopID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height1 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------ GRID 2 ------------------------- //

  
  let gridXmin2 = height2 - offsetGridX
  let gridXmax2 = offsetGridX

  let gridYmin2 = width - offsetGridY
  let gridYmax2 = offsetGridY
  
  // grid-x
  d3DrawXGrid(chart2, 'grid-bottom', xScale, xtickValues, gridXmin2, gridXmax2, _colorGrid, scaleType='band')

  // grid-y
  d3DrawYGrid(chart2, 'grid-left-2', yScale2, ytickValues2, gridYmin2, gridYmax2, _colorGrid, scaleType='linear')


  // ------------------------  CHART 2  ------------------------ //


  let dnf = chart2
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart2
    .append('g')
    .attr('name', 'bars')

  let shadowBottom = chart2
    .append('g')
    .attr('name', 'shadow-bottom')

  // DNF labels right
  dnf
    .append('g')
    .attr('name', 'dnf-labels-right')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorRightS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .text(d => d['RightMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) + px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['RightMarker'])) ? 1 : 0 })

  // DNF labels left
  dnf
    .append('g')
    .attr('name', 'dnf-labels-left')
    .selectAll('text')
    .data(dataDiff)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorLeftS)
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .text(d => d['LeftMarker'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', yScale2(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftMarker'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    // .style('cursor', 'pointer')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale2(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale2(0) - yScale2(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)

  shadowBottom
    .append('rect')
    .attr('id', seasonComparisonSliderShadowBottomID)
    .classed('bg291o', true)
    .attr('y', offsetGridX)
    .attr('height', height2 - 2*offsetGridX)
    .attr('fill', sliderShadowColor)
    .attr('rx', `${sliderShadowRadius - offsetGridX}px`)
    .attr('fill-opacity', sliderShadowOpacity)


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': metric.replace('Interpolated', ''),
    'Cumulative': null
  }

  seasonComparisonSliderData['legendHeight'] = legendHeight + offsetLegendTop

  seasonComparisonSliderData['paddingXOuter'] = paddingXOuter
  seasonComparisonSliderData['chartStepX'] = xScale.step()
  seasonComparisonSliderData['offsetGrid'] = offsetGridX
  seasonComparisonSliderData['metrics'] = sliderMetrics
  seasonComparisonSliderData['type'] = 'average'
  seasonComparisonSliderData['subType'] = 'lower'

  let dataLeftFiltered = dataLeft.filter(o => !noDefineConditions.includes(o[_plabel]))
  let dataRightFiltered = dataRight.filter(o => !noDefineConditions.includes(o[_plabel]))
  
  seasonComparisonDataLeft = dataLeftFiltered
  seasonComparisonDataRight = dataRightFiltered
  seasonComparisonDataDiff = dataDiff
  
}


function chartLine_4(data1, seasonSummary, ContainerID, metric, driverIDTs, colors) {

  // data1 : data_1

  let containerID = '#' + ContainerID
  
  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  DATA  ------------------------------- //


  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  let dataLeft = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data1.filter((d) => d['DriverIDT'] == driverIDTRight))

  let races = data.map(d => d['RaceID'])
  races = dropDuplicates(races)

  let raceNames = []
  
  races.forEach((raceID, i) => [
    raceNames.push(data.filter((d) => d.RaceID == raceID)[0]['EventAbbreviation'])
  ])

  let metricValues = data.map(d => d[metric])
  metricValues = sortArray(metricValues, ascending=true)

  let xMin = 0
  let xMax = raceNames.length
  
  let xTickValues1 = range(0, xMax)

  let yMin = 0
  let yMax = lastElement(metricValues)

  let yAxisRange1 = generateRange(yMin, yMax, '2', res='step')
  let ytickValues1 = yAxisRange1[0]
  let yStep1 = yAxisRange1[1]

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['RaceID'])
  let dataRightRaces = dataRight.map(d => d['RaceID'])
  
  let eventsData = []
  
  races.forEach((raceID, i) => {

    eventsData.push({
      Index: i,
      EventAbbreviation: data.filter(d => d.RaceID == raceID)[0]['EventAbbreviation'],
      EventNameRus: data.filter(d => d.RaceID == raceID)[0]['EventNameRus']
    })
    
    if (dataLeftRaces.includes(raceID)) { dataLeft.filter(d => d.RaceID == raceID)[0].Index = i }
    if (dataRightRaces.includes(raceID)) { dataRight.filter(d => d.RaceID == raceID)[0].Index = i }
    
  })


  // -------------------------------  SVG  ------------------------------- //
  

  // width and height -  of page size
  let widthDiv = getElement(ContainerID).offsetWidth
  
  let heightDiv

  if (plotRightOpacity == 1) { heightDiv = 0.45 * widthDiv }
  else { heightDiv = 0.25 * widthDiv }

  let margin = {top: px40, topDifferencePlot: px10, right: px60, bottom: px37, left: px60}
  
  let width = Math.round(widthDiv - margin.left - margin.right)
  let height = Math.round(heightDiv - margin.top - margin.bottom)

  let heightChartTop = 0.25 * widthDiv - margin.top - margin.bottom
  
  let svgID = 'chart-line-4-svg-' + ContainerID

  if (getElement(ContainerID).children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svg = d3
    .select(containerID)
    .select('svg')
    .attr('id', svgID)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'chart-line-2-main-node')
    .attr('id', 'chart-line-4-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // -------------------------------  SCALES AND AXIS  ------------------------------- //


  // scales
  let xScale1 = d3.scaleBand()
      .domain(xTickValues1)
      .range([0, width])
      .paddingInner(0)
      .paddingOuter(0.15)

  // d3.extent calculates min and max
  let yScale1 = d3.scaleLinear()
      .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
      .range([heightChartTop, 0])

  // make space between end of axis and first tick equals for both x and y axises
  let paddingOuter = px12

  // d3adjustPaddingOuter(paddingOuter, xScale1, axis='x', type='band')
  d3adjustPaddingOuter(paddingOuter, yScale1, axis='y', type='linear')

  let xPad1 = px5
  let xAxisWpad1 = heightChartTop + xPad1
  
  let yPad1 = px5
  let yAxisWpad1 = yPad1

  let xtickSize = px4
  let ytickSize = px3

  let xtickOuterSize = px5
  let ytickOuterSize = px4

  let tickPaddingIndicator = String(Math.round(yMax)).length

  let ytickPadding = px9

  if (tickPaddingIndicator == 3) {
    ytickPadding = px5
  }

  let axisBottom1 = d3.axisBottom(xScale1)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickOuterSize)
    .tickFormat('')

  let xBottom1 = svg.append("g").attr('name', 'axis-bottom-1')
    .attr("transform", `translate(0, ${xAxisWpad1})`)

  xBottom1
    .append('g')
    .attr('name', 'ticks')
    .call(axisBottom1)
    // .call(g => g.select('.domain').remove())

  let ticksNumber1 = (yMax < 10) ? 5 : 8

  let axisLeft1 = d3
    .axisLeft(yScale1)
    .ticks(ticksNumber1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickSizeOuter(ytickOuterSize)

  // let yTickValues1 = axisLeft1.scale().ticks()

  let yLeft1 = svg
    .append("g")
    .attr('name', 'axis-left-1')
    .attr("transform", `translate(${-yAxisWpad1}, 0)`)

  yLeft1
    .append('g')
    .attr('name', 'ticks')
    .call(axisLeft1)
    // .call(g => g.select('.domain').remove())

  let axisRight1 = d3
    .axisRight(yScale1)
    .ticks(ticksNumber1)
    .tickValues(ytickValues1)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickSizeOuter(ytickOuterSize)

  let yRight1 = svg
    .append("g")
    .attr('name', 'axis-right-1')
    .attr("transform", `translate(${width + yPad1}, 0)`)

  yRight1
    .append('g')
    .attr('name', 'ticks')
    .call(axisRight1)
    // .call(g => g.select('.domain').remove())


  // -------------------------------  AXIS LABELS AND GRID  ------------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d.EventAbbreviation)
    .attr('x', d => xScale1(d.Index) + 0.5 * xScale1.bandwidth())
    .attr('y', xtickSize)

  d3StyleAxis(Object.entries({ xBottom1 }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  // grid-x
  d3DrawXGrid(svg, 'grid-bottom', xScale1, xTickValues1, heightChartTop, 0, _colorGrid, scaleType='band')
  
  // grid-y
  d3DrawYGrid(svg, 'grid-left', yScale1, ytickValues1, 0, width, _colorGrid, scaleType='linear')

  
  // -------------------------------  CHART RIGHT  ------------------------------- //


  let line = d3.line()
    .curve(d3.curveMonotoneX)
    // .curve(d3.curveCatmullRom.alpha(0.5))
    .defined(d => d[metric])
    .x(d => xScale1(d.Index) + 0.5*xScale1.bandwidth())
    .y(d => yScale1(d[metric]))
  
  let right = svg
    .append('g')
    .attr('name', 'chart-right')

  // line right
  right
    .append('g')
    .attr('name', 'line')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRight)

  // circles right
  right.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRight)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale1(d.Index) + 0.5*xScale1.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => { return (d.NotStarted == 1) ? 0 : 1 })

  right.style('opacity', plotRightOpacity)


  // -------------------------------  CHART LEFT  ------------------------------- //

  
  let left = svg
    .append('g')
    .attr('name', 'chart-left')

  // line right
  left
    .append('g')
    .attr('name', 'line')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeft)

  // circles right
  left.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeft)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale1(d.Index) + 0.5*xScale1.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    // .attr('r', px3)
    .style('r', px3)
    .attr('r', px3)


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legend1Attributes = {
    'y': -px20,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames,
  }

  if (plotRightOpacity == 1) {

    // drivers names legend
    d3legend(
      'chart-line-4-main-node', 'legend-1', 'chart-line-3-legend-1', ['line', 'line'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    // drivers names legend
    d3legend(
      'chart-line-4-main-node', 'legend-1', 'chart-line-3-legend-1', ['line'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
    
  }
  

  // -------------------------------------  DIFFERENCE PLOT  ------------------------------------- //
  // -------------------------------------  DIFFERENCE PLOT  ------------------------------------- //
  // -------------------------------------  DIFFERENCE PLOT  ------------------------------------- //
  // -------------------------------------  DIFFERENCE PLOT  ------------------------------------- //

  if (plotRightOpacity == 1) {


    // ---------------------------  DIFFERENCE DATA  --------------------------- //


    let dataDiff = []
  
    eventsData.forEach((d, i) => {
  
      let leftData = dataLeft.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
      let rightData = dataRight.filter(dl => dl['EventAbbreviation'] == d['EventAbbreviation'])
      
      let pointsDiff
      let eventName
      let leftFullName
      let rightFullName
      let leftGridPosition
      let rightGridPosition
      let leftClassPosition
      let rightClassPosition
      let leftMarker
      let rightMarker
      let leftPointsOfficial
      let rightPointsOfficial
  
      eventNameRus = d['EventNameRus']
  
      if (leftData.length == 0) {
        
        pointsDiff = '0'
        
      } else if (rightData.length == 0) {
        
        pointsDiff = '0'
        
      } else {
  
        if (((leftData[0][_plabel] == 'DNF') || (leftData[0][_plabel] == 'DSQ'))
            && ((rightData[0][_plabel] == 'DNF') || (rightData[0][_plabel] == 'DSQ'))) {
          
          pointsDiff = '0'
          leftRetired = 1
          rightRetired = 1
          leftMarker = leftData[0][_plabel]
          rightMarker = rightData[0][_plabel]
          
        } else if ((leftData[0][_plabel] == 'DNF') || (leftData[0][_plabel] == 'DSQ')) {
          
          pointsDiff = -rightData[0]['PointsOfficial']
          leftMarker = leftData[0][_plabel]
          
        } else if ((rightData[0][_plabel] == 'DNF') || (rightData[0][_plabel] == 'DSQ')) {
          
          pointsDiff = +leftData[0]['PointsOfficial']
          rightMarker = rightData[0][_plabel]
          
        } else {
          
          pointsDiff = leftData[0]['PointsOfficial'] - rightData[0]['PointsOfficial']
          
        }

        leftFullName = leftData[0]['FullName']
        rightFullName = rightData[0]['FullName']
        
        leftGridPosition = leftData[0][_glabel]
        rightGridPosition = rightData[0][_glabel]
        
        leftClassPosition = leftData[0][_plabel]
        rightClassPosition = rightData[0][_plabel]
        
        leftPointsOfficial = leftData[0]['PointsOfficial']
        rightPointsOfficial = rightData[0]['PointsOfficial']
        
      }
  
      dataDiff.push({
        'Index': d.Index,
        'PointsOfficial': pointsDiff,
        'EventNameRus': eventNameRus,
        'LeftFullName': leftFullName,
        'RightFullName': rightFullName,
        'LeftGridPosition': leftGridPosition,
        'RightGridPosition': rightGridPosition,
        'LeftClassPosition': leftClassPosition,
        'RightClassPosition': rightClassPosition,
        'LeftMarker': leftMarker,
        'RightMarker': rightMarker,
        'LeftPointsOfficial': leftPointsOfficial,
        'RightPointsOfficial': rightPointsOfficial
      })
      
    })

    let pointsOff = dataDiff.map(d => d['PointsOfficial'])
    let pointsDiffMaxAbs = Math.max.apply(null, pointsOff.map(Math.abs))

    let yMin2 = roundStep(-pointsDiffMaxAbs, 5, 'floor')
    let yMax2 = roundStep(pointsDiffMaxAbs, 5, 'ceil')

    let ytickValues2 = generateRange(yMin2, yMax2)

    if ((firstElement(ytickValues2) == 0) && (lastElement(ytickValues2) == 0)) {
      ytickValues2 = [-1, 0, 1]
    }

    let barWidth

    if (dataDiff.length < 10) { barWidth = px40 }
    else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) { barWidth = px14 }
    else { barWidth = px14 }
    

    // -------------------------------------  SVG  ------------------------------------- //


    let heightChartBottom = 0.2 * widthDiv - margin.topDifferencePlot - margin.bottom


    // -------------------------------  SCALES AND AXIS  ------------------------------- //
    

    let xPad2 = px5
    let xAxisWpad2 = height + xPad2
  
    let yPad2 = px5
    let yAxisWpad2 = yPad2

    let ytickPadding2 = px9
  
    let yScale2 = d3
      .scaleLinear()
      .domain([firstElement(ytickValues2), lastElement(ytickValues2)])
      .range([height, height - heightChartBottom])

    // make space between end of axis and first tick equals for both x and y axises 
    // d3adjustPaddingOuter(paddingOuter, xScale1, axis='x', type='band')
    // d3adjustPaddingOuter(paddingOuter, yScale2, axis='y', type='linear')
  
    let xBottom2 = svg
      .append("g")
      .attr('name', 'axis-bottom-2')
      .attr("transform", `translate(0, ${xAxisWpad2})`)
      .call(axisBottom1)
      // .call(g => g.select('.domain').remove())
  
    let axisLeft2 = d3
      .axisLeft(yScale2)
      .tickSize(ytickSize)
      .tickPadding(ytickPadding2)
      .tickValues(ytickValues2)
      .tickSizeOuter(ytickOuterSize)
      .tickFormat(d3.format('c'))
      .tickFormat(v => Math.abs(v))
  
    let yLeft2 = svg
      .append("g")
      .attr('name', 'axis-left-2')
      .attr("transform", `translate(${-yAxisWpad1}, 0)`)

    yLeft2
      .append('g')
      .attr('name', 'ticks')
      .call(axisLeft2)
      // .call(g => g.select('.domain').remove())

    let axisRight2 = d3
      .axisRight(yScale2)
      .tickSize(ytickSize)
      .tickPadding(ytickPadding2)
      .tickValues(ytickValues2)
      .tickSizeOuter(ytickOuterSize)
      .tickFormat(d3.format('c'))
      .tickFormat(v => Math.abs(v))

    let yRight2 = svg
      .append("g")
      .attr('name', 'axis-right-2')
      .attr("transform", `translate(${width + yPad2}, 0)`)

    yRight2
      .append('g')
      .attr('name', 'ticks')
      .call(axisRight2)
      // .call(g => g.select('.domain').remove())


    // -------------------------------  AXIS LABELS AND GRID  ------------------------------- //
    

    // xtick labels 2
    xBottom2
      .append('g')
      .selectAll('text')
      .data(eventsData)
      .join('text')
      .text(d => d.EventAbbreviation)
      .attr('x', d => xScale1(d.Index) + 0.5 * xScale1.bandwidth())
      .attr('y', xtickSize)

    d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
    d3StyleAxis(Object.entries({ yLeft2, yRight2 }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

    yRight2
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', px8)
  
    // grid-x
    d3DrawXGrid(svg, 'grid-bottom-2', xScale1, xTickValues1, height, height - heightChartBottom, _colorGrid, scaleType='band')
    
    // grid-y
    d3DrawYGrid(svg, 'grid-left-2', yScale2, ytickValues2, 0, width, _colorGrid, scaleType='linear')


    // -------------------------------------  DNF LABELS  ------------------------------------- //


    let dnf = svg.append('g').attr('name', 'dnf-labels')
  
    // DNF labels right
    dnf
      .append('g')
      .attr('name', 'dnf-labels-right')
      .selectAll('text')
      .data(dataDiff)
      .join("text")
      .style('font-family', PrimaryFont)
      .style('fill', colorRight)
      .style('font-size', `${px11}px`)
      .style('font-variation-settings', "'wght' 750")
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'hanging')
      .style('cursor', 'default')
      .text(d => d['RightMarker'])
      .attr('x', d => xScale1(d.Index) + 0.5 * xScale1.bandwidth())
      .attr('y', yScale2(0) + px8)
      .style('opacity', d => { return ((d['RightClassPosition'] == 'DNF') || (d['RightClassPosition'] == 'DSQ')) ? 1 : 0 })
  
    // DNF labels left
    dnf
      .append('g')
      .attr('name', 'dnf-labels-left')
      .selectAll('text')
      .data(dataDiff)
      .join("text")
      .style('font-family', PrimaryFont)
      .style('fill', colorLeft)
      .style('font-size', `${px11}px`)
      .style('font-variation-settings', "'wght' 750")
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'auto')
      .style('cursor', 'default')
      .text(d => d['LeftMarker'])
      .attr('x', d => xScale1(d.Index) + 0.5 * xScale1.bandwidth())
      .attr('y', yScale2(0) - px8)
      .style('opacity', d => { return ((d['LeftClassPosition'] == 'DNF') || (d['LeftClassPosition'] == 'DSQ')) ? 1 : 0 })

  
    // -------------------------------------  BARS  ------------------------------------- //
  
    let bars = svg.append('g').attr('name', 'bars')
    
    let mouseXCoord
    let mouseYCoord
  
    bars
      .selectAll('rect')
      .data(dataDiff)
      .join('rect')
      .style('cursor', 'pointer')
      .style('shape-rendering', 'geometricPrecision')
      .attr('x', d => xScale1(d.Index) +  0.5 * xScale1.bandwidth() - 0.5 * barWidth)
      .attr('y', d => yScale2(Math.max(0, d.PointsOfficial)))
      .attr('width', barWidth)
      .attr('height', d => Math.abs(yScale2(0) - yScale2(d.PointsOfficial)))
      .attr('fill', d => d.PointsOfficial > 0 ? saturateColor(colorLeft, 0.75) : colorRight)
      .attr('rx', px7)
      .on('mouseover', function(event, d) {
        if (notMobileDevice) {
          d3.select(this).style('opacity', 0.75)
        }
      })
      .on('mousemove', (event, d) => {
        if (notMobileDevice) { showTooltip(event, d) }
      })
      .on('mouseleave', function(event, d) {
        if (notMobileDevice) {
          d3.select(this).style('opacity', 1)
          hideTooltip(event, d)
        }
      })
  

    // -------------------------------------  TOOLTIP  ------------------------------------- //
    

    let tooltip  = d3.select(containerID)
      .append('div')
      .attr('class', 'tooltip')
      // .attr('id', 'chart-line-4-tooltip')

    let tooltipElement = d3GetElement(tooltip)
  
    let showTooltip = function(event, d) {
  
      let tooltipColor
  
      if (d.PointsOfficial >= 0) {
        tooltipColor = colorLeft
      } else {
        tooltipColor = colorRight
      }
  
      let tooltipHTML = `
        <div class='flex-column a-start tooltip-text ps-075 pe-075 pt-05 pb-05'>
        
          <div style='color:${tooltipColor}'><b>${d['EventNameRus']}</b></div>

          <div class='flex mt-05'>
            <div class=''>Разница по очкам:</div>
            <div class='tooltip-title ms-025'>${Math.abs(d['PointsOfficial'])}</div>
          </div>
  
          <div class='tooltip-title mt-05'>Набранные очки</div>
          
          <div class='mt-025'>${d['LeftFullName']}: ${d['LeftPointsOfficial']}</div>
          <div class='mt-025'>${d['RightFullName']}: ${d['RightPointsOfficial']}</div>
          
          <div class='tooltip-title mt-05'>Финишные позиции</div>
          
          <div class='mt-025'>${d['LeftFullName']}: ${d['LeftClassPosition']}</div>
          <div class='mt-025'>${d['RightFullName']}: ${d['RightClassPosition']}</div>
          
          <div class='tooltip-title mt-05'>Стартовые позиции</div>
          
          <div class='mt-025'>${d['LeftFullName']}: ${d['LeftGridPosition']}</div>
          <div class='mt-025'>${d['RightFullName']}: ${d['RightGridPosition']}</div>
        
        </div>
      `
      
      tooltipElement.innerHTML = tooltipHTML

      let tooltipWidth = tooltipElement.offsetWidth
      let tooltipHeight = tooltipElement.offsetHeight

      let tooltipOffsetX = 0.5
      let tooltipOffsetY = 0

      let tooltipAxisPad = px10

      let svgElementLeft = getSizes(tooltipElement.parentElement).left
      let svgElementLTop = getSizes(tooltipElement.parentElement).top

      let mouseXCoord = event.pageX - svgElementLeft
      let mouseYCoord = event.pageY - svgElementLTop

      let tooltipCoordLeft = mouseXCoord  - convertRemToPixels(tooltipOffsetX) - tooltipWidth

      let tooltipTop = mouseYCoord - convertRemToPixels(tooltipOffsetY) - tooltipHeight
      let tooltipLeft = mouseXCoord - convertRemToPixels(tooltipOffsetX) - tooltipWidth
      
      if (tooltipCoordLeft < tooltipAxisPad) {
        tooltipLeft = mouseXCoord + convertRemToPixels(tooltipOffsetX)
      }

      tooltipElement.style.left = `${tooltipLeft}px`
      tooltipElement.style.top = `${tooltipTop}px`

      tooltipElement.style.opacity = 1
      
    }
  
    let hideTooltip = function() { tooltipElement.style.opacity = 0 }


    // -------------------------------------  LEGEND  ------------------------------------- //


    let legend2Attributes = {
      'x': width,
      'y': -px20,
      'intervalInner': px12,
      'labelSize': 0.75,
      'labelColor': colorThemesChartChartLineLegendInfo,
      'markerLabelWeight': colorThemesChartChartLineLegendMarkersWeight,      
    }

    // let legendLabels = [
    //   'Did Not Finish'
    // ]

    let legendLabels = [
      'Не финишировал', 'Дисквалифицирован'
    ]

    // second legend
    d3legend(
      'chart-line-4-main-node', 'legend-2', 'chart-line-4-legend-2', ['label', 'label'],
      legendLabels,
      [colorThemesChartChartLineLegendMarkersColor, colorThemesChartChartLineLegendMarkersColor],
      attributesDict=legend2Attributes,
      align='right',
      loc='right',
      markerLabels=['DNF', 'DSQ']
    )
        
  }

}


function chartLine_7(data1, ContainerID, driverIDTs, metric, colors) {

  let containerID = '#' + ContainerID
  
  // remove chartLine 4 difference plot
  d3.select('#' + 'chart-line-4-svg-1-' + ContainerID).remove()

  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  DATA  ------------------------------- //

  let driverIDTLeft = driverIDTs[0]
  let driverIDTRight = driverIDTs[1]

  let plotRightOpacity = (driverIDTLeft == driverIDTRight) ? 0 : 1

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let dataRaw = structuredClone(data1)

  let data = structuredClone(data1.filter((d) => (d['DriverIDT'] == driverIDTLeft) || (d['DriverIDT'] == driverIDTRight)))
  
  let dataLeft = structuredClone(data.filter((d) => d['DriverIDT'] == driverIDTLeft))
  let dataRight = structuredClone(data.filter((d) => d['DriverIDT'] == driverIDTRight))

  let races = data.map(d => d['RaceID'])
  races = dropDuplicates(races)

  let xMin = 0
  let xMax = races.length
  let xtickValues = range(0, xMax)

  let metricValues = dataRaw.map(d => d[metric])
  
  metricValues = metricValues.filter(d => isNumeric(d))
  metricValues = sortArray(metricValues, ascending=true)

  let yMin = 1
  let yMax = lastElement(metricValues)

  if (isEven(yMax)) { yMax +=1 }

  let ytickValues = range(yMin, yMax + 1, 2)

  // create index for races, where driver took place
  let dataLeftRaces = dataLeft.map(d => d['RaceID'])
  let dataRightRaces = dataRight.map(d => d['RaceID'])
  
  let eventsData = []
  
  races.forEach((raceID, i) => {

    let dataLocal = data.filter(d => d.RaceID == raceID)[0]

    // events data
    eventsData.push({
      Index: i,
      EventAbbreviation: dataLocal['EventAbbreviation']
    })

    // left data for races driver participated
    if (dataLeftRaces.includes(raceID)) { dataLeft.filter(d => d.RaceID == raceID)[0].Index = i }

    // right data for races driver participated
    if (dataRightRaces.includes(raceID)) { dataRight.filter(d => d.RaceID == raceID)[0].Index = i }
    
  })


  // -------------------------------  SVG  ------------------------------- //

  
  // width and height -  of page size
  let widthDiv = getElement(ContainerID).offsetWidth
  let heightDiv = 0.25 * widthDiv

  let margin = {top: px40, right: px60, bottom: px37, left: px60}
  
  let width = Math.round(widthDiv - margin.left - margin.right)
  let height = Math.round(heightDiv - margin.top - margin.bottom)
  
  if (getElement(ContainerID).children.length == 0) {
    d3.select(containerID).append('svg')
  }
  
  let svg = d3.select(containerID)
    .selectAll('svg')
    .attr('id', 'chart-line-2-svg-' + ContainerID)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background', _colorBackground)
    .append('g')
    .attr('name', 'chart-line-2-main-node')
    .attr('id', 'chart-line-2-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
  

  // -------------------------------  SCALES AND AXIS  ------------------------------- //
  
  
  // scales
  let xScale = d3.scaleBand()
      .domain(xtickValues)
      .range([0, width])
      .paddingInner(0)
      .paddingOuter(0.15)

  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])
      // .nice()

  // make space between end of axis and first tick equals for both x and y axises
  let paddingOuter = px12

  // d3adjustPaddingOuter(paddingOuter, xScale, axis='x', type='band')
  d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

  let xPad = px5
  let xAxisWpad = height + xPad
  
  let yPad = px5
  let yAxisWpad = yPad

  let xtickSize = px4
  let ytickSize = px3

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let ytickPadding = px9

  let xAxis = d3.axisBottom(xScale)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickSizeOuter)
    .tickFormat('')

  let yAxis = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)

  let yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)

  let xBottom = svg.append("g").attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  let yLeft = svg.append("g").attr('name', 'axis-left')
    .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  let yRight = svg
    .append("g")
    .attr('name', 'axis-right')
    .attr("transform", `translate(${width + yPad}, 0)`)

  yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    // .call(g => g.select('.domain').remove())


  // -------------------------------  AXIS LABELS AND GRID  ------------------------------- //


  xBottom
    .append('g')
    .attr('name', 'labels')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d.EventAbbreviation)
    .attr('x', d => xScale(d.Index) + 0.5 * xScale.bandwidth())
    .attr('y', xtickSize)

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', px8, _axisColor, _ticklabelColor)
  d3StyleAxis(Object.entries({ yLeft, yRight }), _tickLineWidth, px11, axis='y', px8, _axisColor, _ticklabelColor)

  yRight
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', px8)

  let xGrid = xBottom.append('g').attr('name', 'grid')
  d3DrawXGrid(svg, 'grid-bottom', xScale, xtickValues, height, 0, _colorGrid, scaleType='band')
  
  let yGrid = yLeft.append('g').attr('name', 'grid')
  d3DrawYGrid(svg, 'grid-left', yScale, ytickValues, 0, width, _colorGrid, scaleType='linear')


  // -------------------------------  CHART RIGHT  ------------------------------- //


  let line = d3.line()
    // .curve(d3.curveMonotoneX)
    .curve(d3.curveCatmullRom.alpha(0.5))
    .x(d => xScale(d.Index) + 0.5 * xScale.bandwidth())
    .y(d => yScale(d[metric]))

  let right = svg.append('g').attr('name', 'chart-right')

  // path right
  right
    .append('g')
    .attr('name', 'line-right')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataRight)
    .attr('d', line)
    .style('stroke', colorRight)

  // circles dnf right
  right
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorRight)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px5)
    .attr('r', px5)
    .style('opacity', d => (d['PointsClassified'] == 0) ? 1 : 0)

  // circles right
  right.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRight)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => (d['PointsClassified'] == 1) ? 1 : 0)

  right.style('opacity', plotRightOpacity)


  // -------------------------------  CHART LEFT  ------------------------------- //

  
  let left = svg.append('g').attr('name', 'chart-left')

  // path left
  left
    .append('g')
    .attr('name', 'line-left')
    .append('path')
    .style('fill', 'none')
    .style('stroke-width', px3)
    .style('stroke-linecap', 'round')
    .style('shape-rendering', 'geometricPrecision')
    // .style('filter', colorThemesChartChartLineLineShadow)
    .datum(dataLeft)
    .attr('d', line)
    .style('stroke', colorLeft)

  // circles dnf left
  left.append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', _colorBackground)
    .style('stroke', colorLeft)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px5)
    .attr('r', px5)
    .style('opacity', d => (d['PointsClassified'] == 0) ? 1 : 0)

  // circles left
  left.append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataLeft)
    .join('circle')
    .style('fill', colorLeft)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d.Index) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale(d[metric]))
    .style('r', px3)
    .attr('r', px3)
    .style('opacity', d => (d['PointsClassified'] == 1) ? 1 : 0)


  // -------------------------------  LEGEND  ------------------------------- //


  let legend1Attributes = {
    'y': -px20,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames
  }

  if (plotRightOpacity == 1) {

    d3legend(
      'chart-line-2-main-node', 'legend-1', 'chart-line-2-legend-1', ['line', 'line'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      'chart-line-2-main-node', 'legend-1', 'chart-line-2-legend-1', ['line'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend2Attributes = {
    'x': width,
    'y': -px20,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo
  }

  let legendLabels = [
    'Не классифицирован в рейтинге',
  ]

  // second legend
  d3legend(
    'chart-line-2-main-node', 'legend-2', 'chart-line-2-legend-2', ['circle no fill'],
    legendLabels,
    ['#555765'], attributesDict=legend2Attributes, align='right')

}


function chartPolygon_1(ContainerID, driverIDsList, listWData, colorsList, linestyles=['0', '0']) {

  // data -> data_3

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)


  // -----------------------------------  PARAMETERS  ----------------------------------- //


  // let width = remToPix(33)
  let containerSizes = getSizes(container)

  let width = containerSizes.width
  let height = 0.8 * width
  let center = {x: 0.5 * width, y: 0.48 * height}

  let features = [
    'StartNormalizedAvg', 'ConsistencyNormalizedAvg', 'OvertakesNormalizedAvg', 'PaceNormalizedAvg', 
    'MistakesTeammateDiscreteAvg', 'PaceTeammateDiscreteAvg', 'QTDiscrAvg', 'ConsistencyTeammateDiscreteAvg',
  ]

  let labels = [
    'СТАРТ', 'ПЛОТНОСТЬ', 'ОБГОНЫ', 'ТЕМП',
    'ОШИБКИ', 'ТЕМП', 'КВАЛИФИКАЦИЯ', 'ПЛОТНОСТЬ',
  ]

  let subLabels = [
    '', '', '', '',
    'ПО НАПАРНИКУ', 'ПО НАПАРНИКУ', 'ПО НАПАРНИКУ', 'ПО НАПАРНИКУ',
  ]

  // sides number: 5 - pentagon, 3 - triangle
  let sides = features.length
  
  let ticks = [2, 4, 6, 8, 10]
  let grid = ticks.length + 1
  
  // угол между осями полигона
  let polyangle = (Math.PI * 2) / sides
  // повернуть полигон по часовой стрелке 
  let angleDelta = -1.5 * polyangle
  // angleDelta = 0

  let r = 0.5 * width
  // расстояние между центром и вершинами последнего полигона
  let r_0 = 0.5 * r
  // расстояние между центром и вершинами самого маленького полигона
  let r_1 = (1 / grid) * r_0
  // радиус окружности, вписанной в самый маленький полигон
  let r_2 = r_1 * Math.cos(Math.PI / sides)
  // длина осей
  let r_3 = r_0 + px20

  let attributes = {
    'center': center,
    'polyangle': polyangle,
    'angleDelta': angleDelta,
    'r': r,
    'r_0': r_0,
    'r_1': r_1,
    'r_2': r_2,
    'r_3': r_3,
    'axisColor': colorThemesChartAxisPolyDark,
    'levelColor': colorThemesChartAxisPoly,
    'levelColorDark': colorThemesChartAxisPolyDark,
    'drawDriverLevel': true,
    'levelDriverLevelSides': [0, 1, 2],
    'levelDriverLevelWidth': px3,
    'levelDriverLevelColor': _axisColor,
    'ticksOffset': px4,
    'ticksAngle': 0.5 * polyangle,
    'midPointSides': [4, 5, 6, 7],
    'midPointRadius': px2_5,
    'midPointColor': colorThemesChartChartMeanPoly,
    'midPointLineColor': colorThemesChartChartMeanPoly,
    'metricLineWidth': px3,
    'alpha': 0.5
  }

  // начинается с "Старт" и по часовой
  labelsAttributes = {
    'labelsOffset': px25,
    'labelsOffsetY': [-px4, px8, px8, -px4, px8, -px4, -px4, px8],
    'textAnchors': ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
    'dominantBaselines': ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
    'fontSize': px11,
    'fontWeight': colorThemesChartPolyLabelWeight,
    'color': colorThemesChartAxisLabels,
    'textRendering': 'auto',
  }

  subLabelsAttributes = {
    'labelsOffset': px25,
    'labelsOffsetY': [0, 0, 0, 0, px22, px12, px12, px22],
    'textAnchors': ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
    'dominantBaselines': ['hanging', 'hanging', 'hanging', 'hanging', 'hanging', 'hanging', 'hanging', 'hanging'],
    'dominantBaselines': ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
    'fontSize': px9,
    'fontWeight': colorThemesChartPolySubLabelWeight,
    'color': colorThemesChartAxisSubLabels,
    'textRendering': 'geometricPrecision',
  }


  // ---------------------------------  CHART  --------------------------------- //

  
  d3.select(containerID).selectAll("svg > *").remove()

  if (getElement(ContainerID).children.length == 0) { d3.select(containerID).append('svg') }

  let svgID = 'svg-chart-pent-' + ContainerID
  
  let svg = d3
    .select(containerID)
    .selectAll('svg')
    .attr('id', svgID)
    // .classed('border-blue', true)
    .attr('width', width)
    .attr('height', height)
    .style('background', _colorBackground)

  let mainID = svgID + '-main'

  let main = svg
    .append('g')
    .attr('name', 'chart-6-main')
    .attr('id',  mainID)
  
  let scale = d3.scaleLinear()
    .domain([0, 10])
    .range([r_1, r_0])

  d3PolyDrawAxis(main, sides, attributes)
  d3PolyDrawLevels(main, grid, sides, attributes)
  d3PolyDrawTicks(main, ticks, attributes)
  d3PolyDrawLabels(main, sides, labels, attributes, labelsAttributes)
  d3PolyDrawLabels(main, sides, subLabels, attributes, subLabelsAttributes)

  let sameDriversAndSameSeasonIDs = false
  
  if (listWData.length > 1) {
    
    sameDriversAndSameSeasonIDs = (
      (listWData[0]['DriverIDT'] == listWData[1]['DriverIDT'])
      && (listWData[0]['SeasonID'] == listWData[1]['SeasonID'])
    )
    
  }

  d3PolyDrawData(main, listWData[0], features, scale, sides, colorsList[0], linestyles[0], attributes)
  
  if ((listWData.length > 1) && (!sameDriversAndSameSeasonIDs)) {
    d3PolyDrawData(main, listWData[1], features, scale, sides, colorsList[1], linestyles[1], attributes)
  }

  if (listWData.length == 1) {
    d3PolyDrawMiddlePoints(main, sides, attributes, addLine=true)
  }






  
  
  // let svgElement = d3GetElement(svg).parentElement
  // let svgElementSizes = getSizes(svgElement)
  // let currentWidth = svgElementSizes.width
  // let currentHeight = svgElementSizes.height
  
  // svgElement.setAttribute('width', Math.ceil(currentWidth))
  // svgElement.setAttribute('height', Math.ceil(currentHeight))

  // let svgEl = getElement(svgID)
  
  // let mainEl = getElement(mainID)
  // let mainSizes = getSizes(mainEl)
  
  // let mainWidth = mainSizes.width
  // let mainHeight = mainSizes.height

  // svgEl.setAttribute('width', Math.floor(mainWidth))
  // svgEl.setAttribute('height', Math.floor(mainHeight))

}


function chart_1(ContainerID, data_3, chartID) {

  // data -> data_3

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerMain = getNthParent(container, 2)

  d3.select(containerID).selectAll('svg > *').remove()


  // ------------------------  PARAMETERS  ------------------------ //


  let labelsSize 

  let xTickSize = px4
  let yTickSize = px3

  let xPad = px3
  let yPad = px3

  let paddingOuterX = px24
  let paddingOuterY = px12

  let xLabelFontSize = px11
  let xLabelFontWeight = 600

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let circleSpaceR = px7
  let circleR = px3_5
  let circleStrokeWidth = px2_5

  let xTicksPad = px8
  let yTicksPad = px8

  let yOffset = yTicksPad + yTickSize
  let xOffset = yOffset + px3

  let id = String(chartID)

  // let teamLabelsPad = px7
  let teammateLabelsPad = px7

  // let teamLabelsSize = px9
  let teammateLabelsSize = px11
  

  // ------------------------  DATA  ------------------------ //


  let data = structuredClone(data_3)

  data.forEach((obj, i) => {
    obj['Index'] = i
  })

  let indexes = data.map(o => o['Index'])

  if (indexes.length > 10) {
    xLabelFontSize = px10
  }

  let color = data.map(d => d['Color'])  
  let metric = 'LevelNormalizedAvg'
  let xTickValues = data.map(d => d['SeasonID'])


  // ------------------------  SVG  ------------------------- //


  // set SVG width to 0 after previous driver
  let svgElementRaw = getElement(ContainerID).children[0]
  if (svgElementRaw) { svgElementRaw.setAttribute('width', 0) }

  let width = container.offsetWidth
  let height = Math.ceil(remToPix(12))

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-1-' + id

  let svg = d3.select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', width)
    .attr('height', height)
    .style('background', _colorBackground)

  let main = svg
    .append('g')
    .attr('id', 'chart-1-main-' + id)


  // ------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let metricValues = data.map(d => Number(d[metric]))
  metricValues = metricValues.filter(x => !Number.isNaN(x))
  
  let yMin = Math.min.apply(Math, (metricValues))
  let yMax = Math.max.apply(Math, (metricValues))

  let ytickValues

  if (yMin == yMax) {

    let value = roundStep(yMin, 0.5)

    ytickValues = [value - 1, value, value + 1]
    
  } else {

    yMin = Math.floor(yMin)
    yMax = Math.ceil(yMax)
  
    ytickValues = generateRange(yMin, yMax, '2', res='range')
    
  }

  let yScale = d3
    .scaleLinear()
    .domain([firstElement(ytickValues), lastElement(ytickValues)])
    .range([height - xPad, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale, axis='y', type='linear')

  let yAxis = d3
    .axisLeft(yScale)
    .tickValues(ytickValues)
    .tickSize(yTickSize)
    .tickSizeOuter(ytickSizeOuter)
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    .tickFormat(d3.format('c'))

  let yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = Math.ceil(getSizes(yLeftElement).width)


  // ------------------------  X-SCALE and X-AXIS  ------------------------- //
  

  let xScale = d3
    .scaleBand()
    .domain(data.map(d => d['Index']))
    .range([yLeftWidth + yOffset + yPad, width - xOffset])
    .paddingInner(1)
    // .paddingOuter(1)

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterX, xScale, axis='x', type='band')

  let xAxis = d3
    .axisBottom(xScale)
    // .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xtickSizeOuter)
    // .tickFormat('')

  let xBottom = main
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)

  // hide tick d3 labels
  xBottom.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS  ------------------------- //


  let xTickLabels = xBottom
    .append('g')
    .attr('name', 'labels-bottom')
    .attr('id', 'chart-1-labels-bottom-' + id)

  xTickLabels
    // .append('g')
    // .attr('name', 'labels-year')
    .selectAll('text')
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', _ticklabelColor)
    .style('font-size', `${xLabelFontSize}px`)
    .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .text(d => d['SeasonID'])
    .attr('x', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize + xTicksPad)

  // xTickLabels
  //   .append('g')
  //   .attr('name', 'labels-team')
  //   .selectAll('text')
  //   .data(data)
  //   .join('text')
  //   .style('font-family', PrimaryFont)
  //   .style('fill', '#6F767F')
  //   .style('font-size', `${teamLabelsSize}px`)
  //   .style('font-weight', 600)
  //   .style('text-anchor', 'middle')
  //   .style('dominant-baseline', 'hanging')
  //   .text(d => d['Team'])
  //   .attr('x', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
  //   .attr('y', xTickSize + xTicksPad + xLabelFontSize + teamLabelsPad)
  //   .style('font-weight', 700)
  //   .style('fill', d => (saturateColor(d['Color'], 0.9)))

  xTickLabels
    .append('g')
    .attr('name', 'labels-teammate')
    .selectAll('text')
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', d => d['Color'])
    .style('font-size', `${teammateLabelsSize}px`)
    .style('font-variation-settings', colorThemesChart123TeammateWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .text(d => d['TeammateAbb'])
    .attr('x', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize + xTicksPad + xLabelFontSize + teammateLabelsPad)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomElementSizes = getSizes(xBottomElement)
  let xBottomElementHeight = Math.ceil(xBottomElementSizes.height)


  // ------------------------  TRANSITIONS  ------------------------- //


  // move y-axis
  yLeftElement.setAttribute('transform', `translate(${yLeftWidth + yOffset}, 0)`)

  // move x-axis
  xBottomElement.setAttribute('transform', `translate(0, ${height})`)

  // adjust SVG height
  d3GetElement(svg).setAttribute('height', height + xBottomElementHeight)


  // ------------------------  GRID  ------------------------- //


  // grid-vertical
  d3DrawXGrid(
    axis=main, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=height - xPad, end=0,
    color=_colorGrid,
    scaleType='band'
  )

  // grid-horizontal
  d3DrawYGrid(
    axis=main, name='grid-left', scale=yScale, tickValues=ytickValues,
    start=yLeftWidth + yOffset + yPad, end=width - xOffset,
    color=_colorGrid,
    scaleType='linear'
  )


  // // ----------------------------  TOOLTIP  ---------------------------- //
  

  // let tooltip = d3
  //   .select('#' + containerDriversCharacteristicsID)
  //   .append('div')
  //   .classed('tooltip', true)

  // let tooltipLocal = d3GetElement(tooltip)

  // let showTooltip = function(event, d) {

  //   let colorPrimary = d['Color']
  //   let colorSecondary = saturateColor(d['Color'], 0.75)

  //   let tooltipHTML = `
  //     <div class='fs-08 fw-700'>Сезон ${d['SeasonID']} года</div>
      
  //     <div class='mt-05 fs-09 fw-700' style='color:${colorPrimary}'>${d['FullName']} #${d['Number']}</div>
  //     <div class='fs-08' style='color:#1E2326'><b>${d['Team']}</b></div>

  //     <div class='mt-05 fs-08 fw-700'>Партнер по команде</div>
  //     <div class='fw-600' style='color:${colorSecondary}'>${d['Teammate']}</div>

  //     <div class='mt-05 fs-08 fw-700'>Характеристики</div>
  //     <div class='mt-025 fs-075 fw-600'>Уровень: ${d['LevelNormalizedAvg']}</div>
  //     <div class='mt-025 fs-075 fw-600'>Квалификация: ${d['QualificationTeammateAvg']}</div>
  //     <div class='mt-025 fs-075 fw-600'>Темп: ${d['PaceNormalizedAvg']}</div>
  //     <div class='mt-025 fs-075 fw-600'>Плотность: ${d['ConsistencyNormalizedAvg']}</div>
  //     <div class='mt-025 fs-075 fw-600'>Борьба на трассе: ${d['OvertakesNormalizedAvg']}</div>
  //     <div class='mt-025 fs-075 fw-600'>Действия на старте: ${d['StartNormalizedAvg']}</div>
  //   `

  //   tooltipLocal.innerHTML = tooltipHTML

  //   let tooltipHeight = tooltipLocal.offsetHeight
  //   let tooltipWidth = tooltipLocal.offsetWidth

  //   let containerMiddle = elementMiddleCoord(container.parentElement)
  //   let containerXMiddle = containerMiddle[0]
  //   let containerYMiddle = containerMiddle[1]

  //   let mouseXcoord = event.pageX
  //   let mouseYcoord = event.pageY

  //   let tooltipDisplayXKind
  //   let tooltipDisplayYKind

  //   if (mouseXcoord > 1.25 * containerXMiddle) {
  //     tooltipDisplayXKind = -2 * remToPix(1) - tooltipWidth
  //   } else {
  //     tooltipDisplayXKind = 0
  //   }

  //   if (mouseYcoord > containerYMiddle) {
  //     tooltipDisplayYKind = -0.75
  //   } else {
  //     tooltipDisplayYKind = -0.25
  //   }

  //   let tooltipXPad = remToPix(1) + tooltipDisplayXKind
  //   let tooltipYPad = tooltipDisplayYKind * tooltipHeight
    
  //   let tooltipCoordLeft = mouseXcoord + tooltipXPad
  //   let tooltipCoordTop = mouseYcoord + tooltipYPad

  //   tooltipLocal.style.left = `${tooltipCoordLeft}px`
  //   tooltipLocal.style.top = `${tooltipCoordTop}px`

  //   tooltipLocal.style.opacity = 1

  // }

  // let hideTooltip = function() {
  //   tooltipLocal.style.opacity = 0
  // }


  // ----------------------  PLOT LEVEL  --------------------- //


  let level = main
    .append('g')
    .attr('name', 'level-chart')
    .attr('id', 'chart-1-lines-' + id)

  let line = d3.line()
    // .curve(d3.curveCatmullRom.alpha(0.5))
    .curve(d3.curveMonotoneX)
    .x(d => xScale(d['Index']) + 0.5*xScale.bandwidth())
    .y(d => {return yScale(d[metric])})
    .defined(d => d[metric] != '-')

  // lines
  level
    .append('g')
    .attr('name', 'path')
    // .attr('id', 'chart-5-path')
    .append('path')
    .style('fill', 'none')
    .style('stroke', colorThemesChartChart1Line)
    .style('stroke-width', px2)
    .datum(data)
    .attr('d', line)

  // circles empty space around
  level
    .append('g')
    .attr('name', 'circles-space')
    // .attr('id', 'chart-5-circles')
    .selectAll("circle")
    .data(data)
    .join('circle')
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['Index']) + 0.5*xScale.bandwidth() + px0_5)
    .attr('cy', d => yScale(d[metric]))
    .attr('r', circleSpaceR)
    .style('r', circleSpaceR)
    .style('fill', _colorBackground)
    .style('opacity', d => (d[metric] == '-') ? 0 : 1)
    .style('pointer-events', 'none')

  // // circles hover
  // level
  //   .append('g')
  //   .attr('name', 'circles-hover')
  //   // .attr('id', 'chart-5-circles')
  //   .selectAll("circle")
  //   .data(data)
  //   .join('circle')
  //   .style('shape-rendering', 'geometricPrecision')
  //   .attr('cx', d => xScale(d['Index']) + 0.5*xScale.bandwidth() + px0_5)
  //   .attr('cy', d => yScale(d[metric]))
  //   .attr('r', circleSpaceR + px0_5)
  //   .style('r', circleSpaceR + px0_5)
  //   .style('fill', 'transparent')
  //   .style('stroke-width', 0)
  //   .style('stroke', d=> alphaColor(shadeColor(d['Color'], -0.25), 0.75))
  //   // .style('stroke', d=> d['Color'])
  //   // .style('stroke', '#BEC3C8')
  //   .style('opacity', d => (d[metric] == '-') ? 0 : 1)
  //   .style('cursor', 'pointer')
  //   .on('mousemove', function(event, d) {
      
  //     d3.select(this).style('stroke-width', px2)
  //     // d3.select(this).style('filter', 'drop-shadow(0rem 0rem 0.125rem rgba(0, 0, 0, 0.25))')
  //     showTooltip(event, d)
      
  //   })
  //   .on('mouseout', function(event, d) {
      
  //     d3.select(this).style('stroke-width', 0)
  //     hideTooltip()
      
  //   })
  
  // circles
  level
    .append('g')
    .attr('name', 'circles')
    // .attr('id', 'chart-5-circles')
    .selectAll("circle")
    .data(data)
    .join('circle')
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['Index']) + 0.5*xScale.bandwidth() + px0_5)
    .attr('cy', d => yScale(d[metric]))
    .attr('r', circleR)
    .style('r', circleR)
    .style('fill', d => alphaColor(d['Color'], 0.75))
    .style('stroke', d => shadeColor(d['Color'], -0.25))
    .style('stroke-width', circleStrokeWidth)
    .style('opacity', d => (d[metric] == '-') ? 0 : 1)
    .style('pointer-events', 'none')

}


function chart_2(ContainerID, data_3, chartID) {

  // data -> data_3

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerMain = getNthParent(container, 2)

  d3.select(containerID).selectAll('svg > *').remove()


  // ------------------------  PARAMETERS  ------------------------ //


  let labelsSize 

  let xTickSize = px4
  let yTickSize = px3

  let xPad = px3
  let yPad = px3

  let paddingOuterX = px24
  let paddingOuterY = px12

  let xLabelFontSize = px11
  let xLabelFontWeight = 600

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let circleSpaceR = px7
  let circleR = px3_5
  let circleStrokeWidth = px2_5

  let xTicksPad = px8
  let yTicksPad = px8

  let yOffset = yTicksPad + yTickSize
  let xOffset = yOffset + px3

  let id = String(chartID)

  let legendOffsetX = px10
  let legendOffsetY = px10

  let teammateLabelsPad = px7
  let teammateLabelsSize = px11
  

  // ------------------------  DATA  ------------------------ //


  let data = structuredClone(data_3)

  data.forEach((obj, i) => {
    obj['Index'] = i
  })

  let indexes = data.map(o => o['Index'])

  if (indexes.length > 10) {
    xLabelFontSize = px10
  }
  
  let color = data.map(d => d['Color'])
  let metric = 'LevelNormalizedAvg'
  let xTickValues = data.map(d => d['SeasonID'])

  let characteristicsList = [
    'ConsistencyNormalizedAvg', 'PaceNormalizedAvg', 
    'StartNormalizedAvg', 'OvertakesNormalizedAvg',
    'QTDiscrAvg',
    // 'PaceTeammateDiscreteAvg',
  ]

  let legendLabels = [
    'Плотность', 'Темп', 
    'Старт', 'Обгоны',
    'Квалификация',
    // 'Темп'
  ]

  let characteristicsColors = [
    '#D8332C', '#7851A9', 
    '#D98141', '#47AC64',
    '#316EAF',
    // '#464B50'
  ]

  let characteristicsValues = []
  
  characteristicsList.forEach((char, i) => {
    characteristicsValues.push(data.map(d => d[char]))
  })

  characteristicsValues = characteristicsValues.flat()
  characteristicsValues = characteristicsValues.filter(v => v !== '-')


  // ------------------------  SVG  ------------------------- //


  // set SVG width to 0 after previous driver
  let svgElementRaw = getElement(ContainerID).children[0]
  if (svgElementRaw) { svgElementRaw.setAttribute('width', 0) }
  
  let width = container.offsetWidth
  let height = Math.ceil(remToPix(12))

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-2-' + id

  let svg = d3.select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', width)
    .attr('height', height)
    .style('background', _colorBackground)

  let main = svg
    .append('g')
    .attr('id', 'chart-2-main-' + id)


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legendID = 'chart-2-legend-' + id

  let legendAttributesDict = {
    'labelSize': 0.75,
    'addSeparatorBefore': [4],
    'labelColor': colorThemesChartChartLineLegendInfo,
    'labelWeight': colorThemesChartChartLineLegendNamesWeight
  }

  d3legend(
    MainNodeID='chart-2-main-' + id,
    legendName='legend',
    legendID=legendID,
    // markersList=Array(legendLabels.length).fill('circle'),
    markersList=['circle', 'circle', 'circle', 'circle', 'circle'],
    labelsList=legendLabels,
    colorsList=characteristicsColors,
    attributesDict=legendAttributesDict,
    // align = 'left', loc='left', 
    // markerLabels=['', '', '', '', '|', '', '']
  )

  let legend = getElement(legendID)
  let legendSizes = getSizes(legend)
  let legendTransform = Math.floor(0.5 * legendSizes.height)
  let legendHeight = Math.floor(legendSizes.height)


  // ------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let yMin = Math.min.apply(Math, characteristicsValues)
  let yMax = Math.max.apply(Math, characteristicsValues)

  let ytickValues

  if (yMin == yMax) {

    let value = roundStep(yMin, 0.5)

    ytickValuesC = [value - 1, value, value + 1]
    
  } else {

    yMin = Math.floor(yMin)
    yMax = Math.ceil(yMax)
  
    ytickValues = generateRange(yMin, yMax, '2', res='range')
    
  }

  let yScale = d3
    .scaleLinear()
    .domain([firstElement(ytickValues), lastElement(ytickValues)])
    .range([height - xPad, legendHeight + legendOffsetY])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale, axis='y', type='linear')

  let yAxis = d3
    .axisLeft(yScale)
    .tickValues(ytickValues)
    .tickSize(yTickSize)
    .tickSizeOuter(ytickSizeOuter)
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    .tickFormat(d3.format('c'))

  let yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = Math.ceil(getSizes(yLeftElement).width)


  // ------------------------  X-SCALE and X-AXIS  ------------------------- //
  

  let xScale = d3
    .scaleBand()
    .domain(data.map(d => d['Index']))
    .range([yLeftWidth + yOffset + yPad, width - xOffset])
    .paddingInner(1)
    // .paddingOuter(1)

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterX, xScale, axis='x', type='band')

  let xAxis = d3
    .axisBottom(xScale)
    // .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xtickSizeOuter)
    // .tickFormat('')

  let xBottom = main
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)

  // hide tick d3 labels
  xBottom.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS  ------------------------- //


  let xTickLabels = xBottom
    .append('g')
    .attr('name', 'labels-bottom')
    .attr('id', 'chart-1-labels-bottom-' + id)

  xTickLabels
    // .append('g')
    // .attr('name', 'labels-year')
    .selectAll('text')
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', _ticklabelColor)
    .style('font-size', `${xLabelFontSize}px`)
    .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .text(d => d['SeasonID'])
    .attr('x', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize + xTicksPad)

  xTickLabels
    .append('g')
    .attr('name', 'labels-teammate')
    .selectAll('text')
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', d => d['Color'])
    .style('font-size', `${teammateLabelsSize}px`)
    // .style('font-weight', 700)
    .style('font-variation-settings', colorThemesChart123TeammateWeight)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .text(d => d['TeammateAbb'])
    .attr('x', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize + xTicksPad + xLabelFontSize + teammateLabelsPad)


  let xBottomElement = d3GetElement(xBottom)
  let xBottomElementSizes = getSizes(xBottomElement)
  let xBottomElementHeight = Math.ceil(xBottomElementSizes.height)


  // ------------------------  TRANSITIONS  ------------------------- //


  // move legend
  legend.setAttribute('transform', `translate(${yLeftWidth + legendOffsetX + yOffset}, ${legendTransform})`)

  // move y-axis
  yLeftElement.setAttribute('transform', `translate(${yLeftWidth + yOffset}, 0)`)
  
  // move x-axis
  xBottomElement.setAttribute('transform', `translate(0, ${height})`)

  // adjust SVG height
  d3GetElement(svg).setAttribute('height', height + xBottomElementHeight)


  // ------------------------  GRID  ------------------------- //


  // grid-vertical
  d3DrawXGrid(
    axis=main, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=height - xPad, end=legendHeight + legendOffsetY,
    color=_colorGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=main, name='grid-left', scale=yScale, tickValues=ytickValues,
    start=yLeftWidth + yOffset + yPad, end=width - xOffset,
    color=_colorGrid,
    scaleType='linear'
  )


  // ----------------  PLOT CHARACTERISTICS  ----------------- //


  let characteristics = main
    .append('g')
    .attr('name', 'characteristics-chart')
    .attr('id', 'chart-1-lines-' + id)

  characteristicsList.forEach((metric, i) => {

    let line = d3.line()
      // .curve(d3.curveCatmullRom.alpha(0.5))
      .curve(d3.curveMonotoneX)
      .x(d => xScale(d['Index']) + 0.5*xScale.bandwidth())
      .y(d => yScale(d[metric]))
      .defined(d => d[metric] != '-')
      // .y(d => {return (d[metric] == '-') ? 0 : yScale(d[metric])})

    // lines
    characteristics.append('g')
      .attr('name', `path-${metric}-C`)
      .append('path')
      .datum(data)
      .attr('d', line)
      // .attr('class', 'line-line-1')
      .style('stroke', characteristicsColors[i])
      .style('fill', 'none')
      .style('stroke-width', px2)
      .style('stroke-opacity', 0.5)

    // circles
    characteristics.append('g')
      .attr('name', `circles-${metric}-C`)
      .selectAll("circle")
      .data(data)
      .join('circle')
      .attr('cx', d => xScale(d['Index']) + 0.5*xScale.bandwidth())
      .attr('cy', d => yScale(d[metric]))
      .attr('r', px4)
      .style('r', px4)
      .attr('r', px4)
      .style('stroke', _colorBackground)
      .style('stroke-width', px1)
      // .attr('class', 'circle-line-1')
      .style('fill', characteristicsColors[i])
      .style('stroke-width', px2)
      .style('opacity', d => (d[metric] == '-') ? 0 : 1)
    
  })

}


function chart_3(ContainerID, dataPrimary, dataSecondary, metric, colors, linestyles, chartID, heightCoeff=1) {

  // data -> data_3

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3.select(containerID).selectAll('svg > *').remove()


  // ---------------------  PARAMETERS  --------------------- //

  let opacityBase = 0.5
  let secondaryOpacity = (dataPrimary[0]['DriverID'] == dataSecondary[0]['DriverID']) ? 0 : opacityBase

  let tickFormat = 1

  let paddingYOuter = px12
  let paddingXOuter = 0.2
  
  colorPrimary = colors[0]
  colorSecondary = colors[1]

  let id = String(chartID)

  let legendOffsetX = px20
  let legendOffsetY = px10

  let xPad = px3
  let yPad = px3

  let xTickSize = px4
  let yTickSize = px3

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let xTicksPad = px8
  let yTicksPad = px8

  let yOffset = yTicksPad + yTickSize
  

  // ------------------------  DATA  ------------------------ //

  
  let xTickValues = dataPrimary.map(d => d['SeasonID']).concat(dataSecondary.map(d => d['SeasonID']))
  xTickValues = dropDuplicates(xTickValues)
  xTickValues = sortArray(xTickValues, ascending=true).map(String)

  let metricValues = dataPrimary.map(d => d[metric]).concat(dataSecondary.map(d => d[metric]))
  metricValues = metricValues.filter(x => x != '-')
  
  let yMin = Math.min.apply(Math, (metricValues))
  let yMax = Math.max.apply(Math, (metricValues))

  let ytickValues

  if (yMin == yMax) {

    let value = roundStep(yMin, 0.5)

    ytickValues = [value - 1, value, value + 1]
    
  } else {

    yMin = Math.floor(yMin)
    yMax = Math.ceil(yMax)
  
    ytickValues = generateRange(yMin, yMax, '2', res='range')
    
  }


  // ------------------------  SVG  ------------------------- //


  let width = container.offsetWidth
  let height = remToPix(13) * heightCoeff
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-3-' + id

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', width)
    .attr('height', height)
    .style('background', _colorBackground)

  let main = svg
    .append('g')
    .attr('id', 'chart-3-main-' + id)


  // ------------------------  LEGEND  ------------------------ //
  

  let legendID = 'chart-3-legend-' + id

  let namePrimary = lastElement(dataPrimary)['LastName']
  let nameSecondary = lastElement(dataSecondary)['LastName']

  let legendAttributesDict = {
    interval: px30,
    'labelColor': colorThemesChartChartLineLegendNames,
    'labelWeight': colorThemesChartChartLineLegendNamesWeight
  }

  let markersList = (secondaryOpacity == 0) ? ['line'] : ['line', 'line']
  let labelsList = (secondaryOpacity == 0) ? [namePrimary] : [namePrimary, nameSecondary]
  let colorsList = (secondaryOpacity == 0) ? [colors[0]] : [colors[0], colors[1]]
  
  d3legend(
    MainNodeID='chart-3-main-' + id,
    legendName='legend',
    legendID=legendID,
    markersList=markersList,
    labelsList=[namePrimary, nameSecondary],
    colorsList=colorsList,
    attributesDict=legendAttributesDict,
    align='left'
  )

  let legend = getElement(legendID)
  let legendSizes = getSizes(legend)
  let legendTransform = Math.floor(0.5 * legendSizes.height)
  let legendHeight = Math.floor(legendSizes.height)


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //

  
  let yScale = d3
    .scaleLinear()
    .domain([firstElement(ytickValues), lastElement(ytickValues)])
    .range([height - xPad, legendHeight + legendOffsetY])
    // .nice()

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  let yAxis = d3
    .axisLeft(yScale)
    .tickValues(ytickValues)
    .tickSize(yTickSize)
    .tickSizeOuter(ytickSizeOuter)
    // .tickFormat(x => x.toFixed(tickFormat))
    .tickFormat(d3.format('c'))

  let yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    // .style('transform-box', 'fill-box')
    // .style('transform', 'translate(100%, 0)')

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-left-axis-' + id)
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = getSizes(yLeftElement).width


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


   let xScale = d3
     .scaleBand()
     .domain(xTickValues)
     .range([yLeftWidth + yOffset + yPad, width - yOffset])
     .paddingInner(1)
     .paddingOuter(paddingXOuter)

  let xAxis = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xtickSizeOuter)
    // .tickFormat('')

  let xBottom = main
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-bottom-axis-' + id)
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomElementSizes = getSizes(xBottomElement)
  let xBottomElementHeight = Math.ceil(xBottomElementSizes.height)


  // ------------------------  TRANSITIONS  ------------------------- //


  // move legend and y-axis
  yLeftElement.setAttribute('transform', `translate(${yLeftWidth + yOffset}, 0)`)
  legend.setAttribute('transform', `translate(${yLeftWidth + legendOffsetX + yOffset}, ${legendTransform})`)

   // move x-axis
  xBottomElement.setAttribute('transform', `translate(0, ${height})`)

  // adjust SVG height
  d3GetElement(svg).setAttribute('height', height + xBottomElementHeight)
  

  // ---------------------------  GRID  ---------------------------- //

  // grid-vertical
  d3DrawXGrid(
    axis=main, name='grid-bottom', scale=xScale, tickValues=xTickValues,
    start=height - xPad, end=legendHeight + legendOffsetY,
    color=_colorGrid,
    scaleType='band'
  )

  // grid-horizontal
  d3DrawYGrid(
    axis=main, name='grid-left-2', scale=yScale, tickValues=ytickValues,
    start=yLeftWidth + yOffset + yPad, end=width - yOffset,
    color=_colorGrid,
    scaleType='linear'
  )


  // ------------------------  LINES  ------------------------ //


  let lines = main
    .append('g')
    .attr('name', 'lines')
    .attr('id', 'chart-6-lines-' + id)

  let line = d3.line()
      // .curve(d3.curveCatmullRom.alpha(0.5))
      .curve(d3.curveMonotoneX)
      .x(d => xScale(d['SeasonID']) + 0.5*xScale.bandwidth())
      .y(d => yScale(d[metric]))
      .defined(d => d[metric] != '-')

  // line secondary
  lines
    .append('g')
    .attr('name', 'secondary')
    // .attr('id', 'chart-3-lines')
    .append('path')
    .style('fill', 'none')
    .datum(dataSecondary)
    .attr('d', line)
    .style('stroke-width', px2)
    .style('stroke', colorSecondary)
    .style('stroke-dasharray', linestyles[1])
    .style('shape-rendering', 'geometricPrecision')
    .style('opacity', secondaryOpacity)

  // line primary
  lines
    .append('g')
    .attr('name', 'primary')
    // .attr('id', 'chart-6-path')
    .append('path')
    .style('fill', 'none')
    .datum(dataPrimary)
    .attr('d', line)
    .style('stroke-width', px2)
    .style('stroke', colorPrimary)
    .style('stroke-dasharray', linestyles[0])
    .style('shape-rendering', 'geometricPrecision')
    .style('opacity', opacityBase)

   // ------------------------  CIRCLES  ------------------------ //


  let circles = svg
    .append('g')
    .attr('name', 'circles')
    .attr('id', 'chart-6-circles')
  
  // circles secondary
  circles
    .append('g')
    .attr('name', 'secondary')
    .attr('id', 'chart-6-circles')
    .selectAll("circle")
    .data(dataSecondary)
    .join('circle')
    .style('stroke', _colorBackground)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['SeasonID']) + 0.5*xScale.bandwidth())
    .attr('cy', d => (d[metric] == '-') ? yScale(0) : yScale(d[metric]))
    .style('r', px4)
    .attr('r', px4)
    .style('fill', colorSecondary)
    .style('opacity', d => (d[metric] == '-') ? 0 : 1)

  // circles primary
  circles
    .append('g')
    .attr('name', 'primary')
    .attr('id', 'chart-6-circles')
    .selectAll("circle")
    .data(dataPrimary)
    .join('circle')
    .style('stroke', _colorBackground)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['SeasonID']) + 0.5*xScale.bandwidth())
    .attr('cy', d => (d[metric] == '-') ? yScale(0) : yScale(d[metric]))
    .style('r', px4)
    .attr('r', px4)
    .style('fill', colorPrimary)
    .style('opacity', d => (d[metric] == '-') ? 0 : 1)

}


function chart_9(ContainerID, dataLaptimesDrivers, metric, id) {

  // metric - PaceDiffClearByWorst
  // data -> data_9_current_race

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3ResetSVG(ContainerID)


  // ---------------------  PARAMETERS  --------------------- //

  
  let textLineHeightCorrection = px4
  
  let xTickSize = px5
  let yTickSize = px4

  let xTicksPad = px12
  let yTicksPad = px12

  let offsetLeft = px12
  let offsetRight = px14
  let offsetTop = px12
  let offsetBottom = xTicksPad + xTickSize - textLineHeightCorrection

  let offsetGridX = px6
  let offsetGridY = px6

  let barWidth = px22
  let barWidthHalf = 0.5 * barWidth
  let barRadius = px6
  
  let barsOffset = px2
  let barHeightMin = px2

  let paddingXOuter = 2 * _axisRadius
  let paddingYOuter = 1.25 * _axisRadius

  let dnfList = ['DNS', 'DSQ']
  

  // ---------------------  DATA  --------------------- //


  let metricDiff = glVEventPace['metric']
  let metricOrder = glVEventPace['metricOrder']
  let varnamePaceLabel = _paceAvgLabel
  let varnamePaceClearLabel = _paceClearAvgLabel

  let tooltipPaceName
  
  let data = copyObject(dataLaptimesDrivers)
  data = sortObject(data, metricOrder, true)

  // add info from drivers
  data.forEach((obj, i) => {
    
    let id = obj['DriverID']
    
    let driverData = drivers.filter( o => o['DriverID'] == id)[0]
    
    let abb = driverData[_abbreviation]
    let color = tableGetColor(obj[_seasonID], obj[_teamID])
    let fullName = driverData[_fullName]

    data[i][_abbreviation] = abb
    data[i][_color] = color
    data[i][_fullName] = fullName
      
  })

  let xTickValues = data.map(o => o[_abbreviation])

  let yTickValuesRaw = data.map(o => o[metric]).map(Number)
  yTickValuesRaw = dropNaNs(yTickValuesRaw)
  
  let yMin = lastElement(yTickValuesRaw)
  let yMax = firstElement(yTickValuesRaw)

  let yTickValues = generateRange(yMin, yMax)
  
  yMin = firstElement(yTickValues)
  yMax = lastElement(yTickValues)

  if (yTickValues.length <= 5) {
    let step = 0.5 * (yTickValues[1] - yTickValues[0])
    yTickValues = range(yMin, yMax + step, step)
    
  }

  yTickValuesGrid = yTickValues.slice(1, yTickValues.length - 1)

  let paceDiffMarker = data[0][metric + 'Mean']

  // fill download icons
  let filename = `${glVEvent[_seasonID]}_${glVEvent[_eventAbbreviation].toLowerCase()}_pace_pelotone`

  let itemSVG = getElement(eventPaceChart9DownloadSVGID)
  downloadItemFill(itemSVG, filename)

  let itemPNG = getElement(eventPaceChart9DownloadPNGID)
  downloadItemFill(itemPNG, filename)


  // ------------------------  SVG  ------------------------- //


  let containerSizes = getSizes(container)

  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(containerSizes.height)

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = eventPaceChart9SVGID

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('name', 'chart-9')
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', `${heightDiv}px`)
    // .style('border', `${colorChartsFrameWidth}rem solid ${colorChartsFrame}`)
    // .style('border-radius', `${_axisRadius}rem`)
    .style('background', _colorBackground)

  let chart = svg
    .append('g')
    .attr('name', 'chart')
  

  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let height = heightDiv - offsetTop - offsetBottom

  let yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])
    // .nice()

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  let yAxis = d3
    .axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(yTickSize)
    .tickFormat(x => x.toFixed(2))
    // .tickFormat(d3.format('c'))

  let yLeft = svg
    .append("g")
    .attr('name', 'axis-left')
    // .style('transform-box', 'fill-box')
    // .style('transform', 'translate(100%, 0)')

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-left-axis-' + id)
    .call(yAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = getSizes(yLeftElement).width


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


  let width = widthDiv - offsetLeft - yLeftWidth - offsetRight
  
  let xScale = d3
     .scaleBand()
     .domain(xTickValues)
     .range([0, width])
     .paddingInner(1)

  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

  let xAxis = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)

  let xBottom = svg
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-bottom-axis-' + id)
    .call(xAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor, 625)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomSizes = getSizes(xBottomElement)
  let xBottomtHeight = Math.ceil(xBottomSizes.height)


  // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //
  
  
  height = height - xBottomtHeight

  d3GetElement(yLeft).remove()

  yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  yAxis = d3
    .axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(yTickSize)
    .tickFormat(x => x.toFixed(2))

  yLeft = svg
    .append("g")
    .attr('name', 'axis-left')

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-left-axis-' + id)
    .call(yAxis)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElementCorrected = d3GetElement(yLeft)

  
  // ------------------------  AXIS PATH  ------------------------- //


  let axisEl = d3CreateAxisRectangle(svg, width, height, _axisRadius, _axisColor, _tickLineWidth)


  // ------------------------  TRANSITIONS  ------------------------- //

  
  // y-axis
  let transformLeftX = Math.floor(offsetLeft + yLeftWidth)
  let transformLeftY = offsetTop
  yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

   // x-axis
  let transformBottomX = Math.floor(offsetLeft + yLeftWidth)
  let transformBottomY = transformLeftY + height
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // axis path
  let transformAxisX = transformBottomX
  let transformAxisY = transformLeftY
  axisEl.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

  // chart
  chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)


  // ------------------------  GRID  ------------------------- //


  let gridXmin = height - offsetGridX
  let gridXmax = offsetGridX

  let gridYmin = width - offsetGridY
  let gridYmax = offsetGridY

  // grid-x
  d3DrawXGrid(chart, 'grid-bottom', xScale, xTickValues, gridXmin, gridXmax, _colorGrid, scaleType='linear')
  
  // grid-y
  d3DrawYGrid(chart, 'grid-left', yScale, yTickValues, gridYmin, gridYmax, _colorGrid, scaleType='linear')


  // ------------------------  ELEMENTS  ------------------------- //


  let paceAvg = chart
    .append("g")
    .attr('name', 'pace-average')

  let bars = chart
    .append("g")
    .attr('name', 'bars')

  let dnfLabels = chart
    .append("g")
    .attr('name', 'dnf-labels')


  // ------------------------  BARS  ------------------------- //


  bars
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('width', barWidth)
    .attr('height', d => {

      let result

      if (isNumeric(d[metric])) {

        // better pace
        if (d[metric] > 0) {
          
          result = yScale(0) - yScale(d[metric])
          
          if (result < 0) {
            // result = barHeightMin
          }

        // worst pace
        } else {
          
          result = yScale(d[metric]) - yScale(0)

          if (result < 0) {
            // result = barHeightMin
          }
          
        }
        
      } else {
        result = yScale(0)
      }

      return result
    
    })
    .attr('x', d => xScale(d[_abbreviation]) - barWidthHalf + px0_5)
    // .attr('y', d => (d[metric] > 0) ? yScale(d[metric]) - barsOffset : yScale(0) + barsOffset)
    .attr('y', d => {

      let result

      // better pace
      if (d[metric] > 0) {
        
        result = yScale(d[metric]) - barsOffset

        if (yScale(0) - yScale(d[metric]) - barsOffset < 0) {

          // result = yScale(0) - barHeightMin
          
        }

      // worst pace
      } else {
        result = yScale(0) + px1 + barsOffset
        
      }
      
      return result
      
    })
    .style('fill', eventPaceChart9BarsColor)
    .style('stroke', eventPaceChart9BarsBorderColor)
    .style('stroke-width', px2)
    .style('visibility', d => isNumeric(d[metric]) ? 'visible' : 'hidden')
    .attr('rx', barRadius)
    .attr('left', d => xScale(d[_abbreviation]) + barWidthHalf + px0_5)
    .on('mouseover', (event, d, i) => {

      let element = event.target

      element.style.fill = paleColor(d[_color], 0.65)
      element.style.stroke = saturateColor(d[_color], 0.75)

      showTooltip(event, d, i)
      
    })
    .on('mouseleave', (event, d, i) => {
      
      let element = event.target
      
      element.style.fill = eventPaceChart9BarsColor
      element.style.stroke = eventPaceChart9BarsBorderColor

      hideTooltip(event, d, i)
      
    })


  // ------------------------  DNF LABELS  ------------------------- //


  dnfLabels
    .selectAll('text')
    .data(data)
    .join('text')
    .text(d => d[_plabel])
    .attr('x', d => xScale(d[_abbreviation]))
    .attr('y', yScale(0) + px8)
    .style('font-family', PrimaryFont)
    .style('fill', '#7F8286')
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'hanging')
    .style('cursor', 'default')
    .style('visibility', d => d[metric] == '-' ? 'visible' : 'hidden')


  // ------------------------  NATURAL PACE  ------------------------- //

  
  // paceAvg
  //   .selectAll('line')
  //   .data(data)
  //   .join('line')
  //   .attr('x1', 0.75*barWidth)
  //   .attr('x2', width - 0.75*barWidth)
  //   // .attr('x1', 0)
  //   // .attr('x2', width)
  //   .attr('y1', yScale(0) + px0_5)
  //   .attr('y2', yScale(0) + px0_5)
  //   .style('fill', 'none')
  //   .style('stroke', eventPaceChart9AverageColor)
  //   // .style('stroke', '#CFCFCF')
  //   .style('stroke-width', px1)
  //   .style('shape-rendering', 'crispEdges')
  //   // .style('shape-rendering', 'geometricPrecision')
  //   // .style('stroke-linecap', 'round')


  // ------------------------  TOOLTIP  ------------------------- //
  

  let tooltip
  let showTooltip
  let hideTooltip

  let metricBest = data[0][metric]

  if (notMobileDevice) {

    let tooltipElement = getElement('cztafk')

    if (!tooltipElement) {
      
      tooltip = d3
        .select(containerID)
        .append('div')
        .attr('name', 'tooltip')
        .attr('id', 'cztafk')
        .classed('tooltip p-absolute', true)

      tooltipElement = d3GetElement(tooltip)
      
    }

    // tooltip = d3
    //   .select(containerID)
    //   .append('div')
    //   .classed('tooltip p-absolute', true)

    // let tooltipElement = d3GetElement(tooltip)

    showTooltip = function(event, d, idx) {

      let element = event.target

      // let color = saturateColor(d[_color], 0.75)
      let color = d[_color]
      
      let deltaPelotone = Math.abs(d[metricDiff]).toFixed(3)
      let deltaPelotoneColor

      if (d[metricDiff] < 0) {
        deltaPelotoneColor = eventPaceBadPaceColor
      } else if (d[metricDiff] > 0) {
        deltaPelotoneColor = eventPaceGoodPaceColor
      } else {
        deltaPelotoneColor = '#5A5F64'
      }

      let deltaWorst = Math.abs(d[metric + 'ByWorst']).toFixed(3)
      deltaWorst = (deltaWorst == 0) ? '-' : deltaWorst
      
      let deltaWorstColor

      if (d[metric  + 'ByWorst'] < 0) {
        deltaWorstColor = eventPaceBadPaceColor
      } else if (d[metric  + 'ByWorst'] > 0) {
        deltaWorstColor = eventPaceGoodPaceColor
      } else {
        deltaWorstColor = '#5A5F64'
      }

      let deltaBest = Math.abs(d[metric + 'ByBest']).toFixed(3)
      deltaBest = (deltaBest == 0) ? '-' : deltaBest

      let deltaBestColor = (deltaBest == '-') ? '#5A5F64' : eventPaceBadPaceColor

      let pace = d[varnamePaceLabel]
      let paceClear = d[varnamePaceClearLabel]

      let tooltipHTML = `

        <div class='row-100 flex-column a-start ps-075 pe-075 py-05'>
        
          <div class='n2lu1d' style='color:${color}'>${d[_fullName]}</div>

          <div class='o9tuco mt-05' >
            <div>Дельта от пелотона:</div>
            <div class='yvvtgu ms-025' style='color:${deltaPelotoneColor}'>${deltaPelotone}</div>
          </div>

          <div class='o9tuco mt-05'>
            <div>Дельта от лучшего:</div>
            <div class='yvvtgu ms-025' style='color:${deltaBestColor}'>${deltaBest}</div>
          </div>

          <div class='o9tuco'>
            <div>Дельта от худшего:</div>
            <div class='yvvtgu ms-025' style='color:${deltaWorstColor}'>${deltaWorst}</div>
          </div>

          <div class='o9tuco mt-05'>
            <div>Средний темп:</div>
            <div class='yvvtgu ms-025'>${pace}</div>
          </div>

          <div class='o9tuco'>
            <div>Средний чистый темп:</div>
            <div class='yvvtgu ms-025'>${paceClear}</div>
          </div>
        
        </div>
      
      `

      tooltipElement.innerHTML = tooltipHTML

      let tooltipOffsetX = barWidthHalf + px10
      let tooltipOffsetY = px10
      
      let elementSizes = getSizes(element)
      let elementHeight = elementSizes.height
      
      let top = Number(element.getAttribute('y')) + transformLeftY
      let left = Number(element.getAttribute('left')) + transformBottomX - barWidthHalf
      let height = Number(element.getAttribute('height'))

      let tooltipSizes = getSizes(tooltipElement)
      let tooltipHeight = tooltipSizes.height
      let tooltipWidth = tooltipSizes.width

      let tooltipTop

      if (d[metric] < 0) {
        
        tooltipTop = top + height + tooltipOffsetY
        tooltipLeft = left - tooltipWidth - tooltipOffsetX
        
      } else {
        
        tooltipTop = top - tooltipHeight - tooltipOffsetY
        tooltipLeft = left + tooltipOffsetX
        
      }

      tooltipElement.style.top = `${tooltipTop}px`
      tooltipElement.style.left = `${tooltipLeft}px`
      
      tooltipElement.style.opacity = 1
      
    }

    hideTooltip = function(event, d, idx) {

      tooltipElement.style.opacity = 0
      
    }
    
  }

}


function chart_10(ContainerID, summary, metric, id) {

  // data -> eventSummary

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3.select(containerID).selectAll('svg > *').remove()

  // ---------------------  PARAMETERS  --------------------- //


  let xTickSize = px4
  let xTickSizeOuter = px5

  let yTickSize = px4
  let yTickSizeOuter = px5

  let offsetLeft = px0
  let offsetRight = px4
  let offsetTop = px5

  let xPad = px5
  let yPad = px5

  let xTicksPad = px3
  let yTicksPad = px3

  let paddingXOuter = 0.625
  let paddingYOuter = px12

  let barWidth = px30
  

  // ---------------------  DATA  --------------------- //


  let data = copyObject(summary)

  data = sortObject(data, metric, true)

  let xTickValues = data.map(o => o['Abbreviation'])
  let yTickValuesRaw = data.map(o => o[metric]).map(Number)
  yTickValuesRaw = yTickValuesRaw.map(num => num * -1);

  let ySmallest = Math.min.apply(null, yTickValuesRaw)
  let yLargest = Math.max.apply(null, yTickValuesRaw)

  let yTickValues = generateRange(ySmallest, yLargest)

  let yMin = firstElement(yTickValues)
  let yMax = lastElement(yTickValues)

  yTickValues = range(yMin, yMax + 0.25, 0.25)

  // let yTickValuesGrid = range(yMin, yMax + 0.25, 0.25)
  yTickValuesGrid = yTickValues.slice(1, yTickValues.length)


  // ------------------------  SVG  ------------------------- //


  let widthDiv = container.offsetWidth
  let heightDiv = remToPix(17)

  let width = widthDiv - offsetLeft - offsetRight
  let height = heightDiv - offsetTop
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-10-' + id

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', heightDiv)
    .style('background', _colorBackground)

  let main = svg
    .append('g')
    .attr('id', 'chart-10-main-' + id)
    .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])
    // .nice()

  // make space between end of axis and first tick equals for both x and y axises
  // d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  let yAxis = d3
    .axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(yTickSize)
    .tickSizeOuter(yTickSizeOuter)
    .tickFormat(x => x.toFixed(2))
    // .tickFormat(d3.format('c'))

  let yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    // .style('transform-box', 'fill-box')
    // .style('transform', 'translate(100%, 0)')

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-left-axis-' + id)
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = getSizes(yLeftElement).width


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


   let xScale = d3
     .scaleBand()
     .domain(xTickValues)
     .range([yLeftWidth + yPad, width])
     .paddingInner(1)
     .paddingOuter(paddingXOuter)

  let xAxis = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    // .tickFormat('')

  let xBottom = main
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-3-bottom-axis-' + id)
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomElementSizes = getSizes(xBottomElement)
  let xBottomElementHeight = Math.ceil(xBottomElementSizes.height)


  // ------------------------  TRANSITIONS  ------------------------- //


  // y-axis
  let transformLeftX = yLeftWidth
  yLeftElement.setAttribute('transform', `translate(${transformLeftX}, 0)`)

   // x-axis
  let transformBottomY = height + xPad
  xBottomElement.setAttribute('transform', `translate(0, ${transformBottomY})`)

  // adjust SVG height
  let heightAdjusted = offsetTop + height + xPad + xBottomElementHeight
  d3GetElement(svg).setAttribute('height', heightAdjusted)


  // ------------------------  GRID  ------------------------- //


  let grid = main
    .append('g')
    .attr('name', 'grid')

  grid
    .selectAll('line')
    .data(yTickValuesGrid)
    .join('line')
    .attr('x1', yLeftWidth + yPad)
    .attr('x2', width)
    .attr('y1', d => yScale(d) + px0_5)
    .attr('y2', d => yScale(d) + px0_5)
    .style('stroke', colorThemesChartGrid)
    .style('fill', 'none')
    .style('shape-rendering', 'crispEdges')


  // ------------------------  BARS  ------------------------- //

  let bars = main
    .append("g")
    .attr('name', 'bars')

  bars
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', d => xScale(d['Abbreviation']) - 0.5*barWidth + px0_5)
    .attr('y', d => yScale(-Math.min(0, d[metric])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale(d[metric]) - yScale(0)))
    .style('fill', '#909090')
    .attr('rx', px5)

  
}


function chart_11(ContainerID, metric, laptimesData, colors) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3ResetSVG(ContainerID)


  // ---------------------  FUNCTIONS  --------------------- //


  function chartLeftBuildOrNot(data) {
    return notEmpty(data)
  }

  function chartRightBuildOrNot(data) {
    
    let result
    
    if (notNULL(glVEventPace['rightDriverIDT']) && isEmpty(data)) {
      
      result = false
      
    } else {
      
      result = true
      
    }

    return result
    
  }

  // ---------------------  PARAMETERS  --------------------- //


  let textLineHeightCorrection = px4
  
  let xTickSize = px5
  let xTickSizeOuter = px4

  let yTickSize = px4
  let yTickSizeOuter = px4

  let xTicksPad = px12
  let yTicksPad = px12

  let offsetLeft = px12
  let offsetRight = px14
  let offsetTop = px12
  let offsetBottom = xTicksPad + xTickSize - textLineHeightCorrection

  let offsetGridX = px6
  let offsetGridY = px6

  let paddingXOuter = 1.25 * _axisRadius
  let paddingYOuter = 1.25 * _axisRadius

  let fillAreaStrokeWidth = px2

  let lapByLapCondition = glVEventPace['chart11LapByLapCondition']
  let lapByLapTooltipHeight = glVEventPace['chart11LapByLapHeight']

  let lapByLapCheckEl = getElement(eventPaceLapByLapCheckID)


  // ---------------------  SVG  --------------------- //
  

  // container width minus paddings
  let containreSizes = getSizes(container)

  let widthDiv = Math.floor(containreSizes.width)
  let heightDiv = Math.floor(containreSizes.height)

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = eventPaceChart11SVGID

  let svg = d3
    .select(containerID)
    .select('svg')
    .attr('name', 'chart-11')
    .attr('id', svgID)
    .attr('width', '100%')
    .attr('height', '100%')
    .style('background', _colorBackground)
    // .classed('border-blue o-visible', true)

  
  // ---------------------  DATA  --------------------- //


  let laptimeMetric = glVEventPace['metricLaptimes']

  let dataLeft = copyObject(laptimesData[0])
  let dataRight = copyObject(laptimesData[1])

  let chartLeftBuild = chartLeftBuildOrNot(dataLeft)
  let chartRightBuild = chartRightBuildOrNot(dataRight)

  // if both data available

  if (chartLeftBuild && chartRightBuild) {

    let colorLeft = colors[0]
    let colorRight = colors[1]
  
    let laps = dataLeft.map(o => o['LapNumber'])
    let lapsRight
  
    laps = dropDuplicates(laps)
    laps = sortArray(laps, true)
  
    let lastLapLeft = lastElement(laps)
    let lastLapRight
  
    if (notEmpty(dataRight)) {
      
      lapsRight = dataRight.map(o => o['LapNumber'])
  
      lapsRight = dropDuplicates(lapsRight)
      lapsRight = sortArray(lapsRight, true)
      lastLapRight = lastElement(lapsRight)
      
      laps = laps.concat(lapsRight)
      laps = dropDuplicates(laps)
      
    }
  
    let lastLap = Math.max.apply(null, laps)

    let data = []
  
    if (notEmpty(dataRight)) {

      laps.forEach((lap, i) => {
  
        if ((lap <= lastLapLeft) && (lap <= lastLapRight)) {
  
          let condition = (o) => o['LapNumber'] == lap
    
          let data1 = dataLeft.filter(o => condition(o))[0]
          let data2 = dataRight.filter(o => condition(o))[0]
      
          let diff
      
          if (data1 && data2) {
            diff = data1[metric] - data2[metric]
          }
  
          data.push({x: Number(lap), y: Number(diff)})
          
        }
  
      })
      
    } else {

      laps.forEach((lap, i) => {
  
        let condition = (o) => o['LapNumber'] == lap
    
        let data1 = dataLeft.filter(o => condition(o))[0]
  
        data.push({x: Number(lap), y: Number(data1[metric])})
  
      })
      
    }

    // if only 0 or 1 notNaN value in data.y - show NoData message
    let dataAllNaNs = data.map(o => o['y']).filter(val => !Number.isNaN(val)).length < 2

    let xMax = data.map(o => o.x)
    xMax = dropNaNs(xMax)
    xMax = Math.max.apply(null, xMax)
  
    let xMin = data.map(o => o.x)
    xMin = dropNaNs(xMin)
    xMin = Math.min.apply(null, xMin)
    xMin = (isEven(xMax)) ? 2 : 1
    
    let xTickValues = range(xMin, xMax + 2, 2)

    // let paceDiff = data.map(o => o['Diff'])
    let paceDiff = data.map(o => o['y'])
    paceDiff = dropNaNs(paceDiff)
  
    let ySmallest = Math.min.apply(null, paceDiff)
    let yLargest = Math.max.apply(null, paceDiff)
  
    if (isInfinity(ySmallest)) { ySmallest = -1 }
    if (isInfinity(yLargest)) { yLargest = 1 }
  
    ySmallest = (ySmallest >= 0) ? -Math.abs(0.25*yLargest) : ySmallest
    yLargest = (yLargest <= 0) ? Math.abs(0.25*ySmallest) : yLargest
  
    // ySmallest = roundStep(ySmallest, 0.5, kind='floor')
    // yLargest = roundStep(yLargest, 0.5, kind='ceil')
  
    let ytickValuesRaw = generateRange(ySmallest, yLargest, '2')
  
    let yTickValues = arrayAddMeanElementsInside(ytickValuesRaw)
    yTickValues = ytickValuesRaw

    let yMin = firstElement(yTickValues)
    let yMax = lastElement(yTickValues)
  
    // fill download icons
    let filename
  
    if (dataLeft.length > 0) {
      filename = `${glVEvent['SeasonID']}_${glVEvent['EventAbbreviation'].toLowerCase()}_${dataLeft[0]['Abbreviation'].toLowerCase()}_pace`
    } else {
      filename = `${glVEvent['SeasonID']}_${glVEvent['EventAbbreviation'].toLowerCase()}_pace`
    }
  
    let itemSVG = getElement(eventPaceChart11DownloadSVGID)
    downloadItemFill(itemSVG, filename)
  
    let itemPNG = getElement(eventPaceChart11DownloadPNGID)
    downloadItemFill(itemPNG, filename)

    // if less than 2 correct values - show NoData table
    if (dataAllNaNs) {

      lapByLapCheckEl.classList.add('disabled')

      svg
      .append("svg:image")
      .attr('x', 0.5 * widthDiv - px24)
      .attr('y', 0.5 * heightDiv - px24)
      .attr('width', px48)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

      function eventPaceTooltip1NoData() {
    
        let nameElement = getElement(eventPaceTooltip1NameID)
        nameElement.textContent = '-'
        nameElement.style.color = '#808080'
    
        let nameComapreElement = getElement(eventPaceTooltip1CompareNameID)
        nameComapreElement.textContent = '-' 
        nameComapreElement.style.color = '#808080'
    
        let stintElement = getElement(eventPaceTooltip1StintID)
        stintElement.textContent = '-'
    
        let paceDiffSumElement = getElement(eventPaceTooltip1TimeGainedID)
        paceDiffSumElement.textContent = '-'
        paceDiffSumElement.style.color = '#808080'
    
        let paceDiffAvgElement = getElement(eventPaceTooltip1TimeGainedByLapID)
        paceDiffAvgElement.textContent = '-'
        paceDiffAvgElement.style.color = '#808080'
    
        let tyresLeftElement = getElement(eventPaceTooltip1TyresLeftID)
        tyresLeftElement.textContent = '-'
    
        let tyresRightElement = getElement(eventPaceTooltip1TyresRightID)
        tyresRightElement.textContent = '-'
    
        let lapsBetterPaceElement = getElement(eventPaceTooltip1LapsBetterPaceID)
        let lapsWorsePaceElement = getElement(eventPaceTooltip1LapsWorsePaceID)
    
        let bestTimeStintElement = getElement(eventPaceTooltip1BestTimeStintID)
        let bestTimeStintLapElement = getElement(eventPaceTooltip1BestTimeStintLapID)
        let bestTimeStintDeltaElement = getElement(eventPaceTooltip1BestTimeStintDeltaID)
    
        let worstTimeStintElement = getElement(eventPaceTooltip1WorstTimeStintID)
        let worstTimeStintLapElement = getElement(eventPaceTooltip1WorstTimeStintLapID)
        let worstTimeStintDeltaElement = getElement(eventPaceTooltip1WorstTimeStintDeltaID)
    
        bestTimeStintDeltaElement.textContent = '-'
        bestTimeStintDeltaElement.style.color = '#808080'
  
        worstTimeStintDeltaElement.textContent = '-'
        worstTimeStintDeltaElement.style.color = '#808080'
    
        lapsBetterPaceElement.textContent = '-'
        lapsWorsePaceElement.textContent = '-'
  
        bestTimeStintElement.textContent = '-'
        worstTimeStintElement.textContent = '-'
    
        bestTimeStintLapElement.textContent = '-'
        worstTimeStintLapElement.textContent = '-'
      
      }
  
      eventPaceTooltip1NoData()
  
      elementRemoveEventListeners(svgID)
      
    } else {

      lapByLapCheckEl.classList.remove('disabled')
      

      // ---------------------  CHART  --------------------- //


      let main1 = svg
        .append('g')
        .attr('name', 'main-1')
        .attr('id', eventPaceChart11Main1ID)
        .style('transition', 'opacity 0.25s')
    
      let main1El = d3GetElement(main1)
    
      let chart = main1
        .append('g')
        .attr('name', 'chart')
    
      // radio condition
      if (lapByLapCondition == 1) {
    
        main1
          .style('opacity', 0)
          .style('pointer-events', 'none')
        
      } else if (lapByLapCondition == 0) {
    
        main1
          .style('opacity', 1)
          .style('pointer-events', 'auto')
    
      }
    
      let main2 = svg
        .append('g')
        .attr('name', 'main-2')
        .attr('id', eventPaceChart11Main2ID)
        .style('transition', 'opacity 0.25s')
    
      let main2El = d3GetElement(main2)
      
      let chart2 = main2
        .append('g')
        .attr('name', 'chart')
    
      // radio condition
      if (lapByLapCondition == 0) {
    
        main2
          .style('opacity', 0)
          .style('pointer-events', 'none')
        
      } else if (lapByLapCondition == 1) {
    
        main2
          .style('opacity', 1)
          .style('pointer-events', 'auto')
    
      }
      
    
      // -------------------------  CHART 1 : Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //
  
      
      let height = heightDiv - offsetTop - offsetBottom
      height += lapByLapCondition ? lapByLapTooltipHeight : 0
  
      let yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0])
        // .nice()
    
      // make space between end of axis and first tick equals for both x and y axises
      d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')
  
      let yAxis = d3
        .axisLeft(yScale)
        .tickValues(yTickValues)
        .tickSize(yTickSize)
        .tickSizeOuter(yTickSizeOuter)
        .tickFormat(x => x.toFixed(2))
  
      let yLeft = main1
        .append("g")
        .attr('name', 'axis-left')
  
      yLeft
        .append("g")
        .attr('name', 'ticks')
        .attr('id', 'left-axis-' + svgID)
        .call(yAxis)
        .call(g => g.select('.domain').remove())
  
      d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
  
      let yLeftElement = d3GetElement(yLeft)
      let yLeftSizes = getSizes(yLeftElement)
      let yLeftWidth = yLeftSizes.width
  
  
      // -------------------------  CHART 1 : X-SCALE, X-AXIS, X-LABELS  ------------------------- //
    
      let width = widthDiv - offsetLeft - yLeftWidth - offsetRight
  
      let xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([0, width])
  
      d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')
  
      let xAxis = d3
        .axisBottom(xScale)
        .tickValues(xTickValues)
        .tickSize(xTickSize)
        .tickSizeOuter(xTickSizeOuter)
        .tickFormat(d3.format('c'))
        // .tickFormat('')
    
      let xBottom = main1
        .append("g")
        .attr('name', 'axis-bottom')
    
      xBottom
        .append("g")
        .attr('name', 'ticks')
        .attr('id', 'bottom-axis-' + svgID)
        .call(xAxis)
        .call(g => g.select('.domain').remove())
  
      d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)
  
      let xBottomElement = d3GetElement(xBottom)
      let xBottomSizes = getSizes(xBottomElement)
      let xBottomHeight = Math.ceil(xBottomSizes.height)
    
   
      // ------------------------- CHART 1 : CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //
    
  
      height = height - xBottomHeight
    
      d3GetElement(yLeft).remove()
      
      yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0])
        // .nice()
    
      // make space between end of axis and first tick equals for both x and y axises
      d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')
    
      yAxis = d3
        .axisLeft(yScale)
        .tickValues(yTickValues)
        .tickSize(yTickSize)
        .tickSizeOuter(yTickSizeOuter)
        .tickFormat(x => x.toFixed(2))
    
      yLeft = main1
        .append("g")
        .attr('name', 'axis-left')
    
      yLeft
        .append("g")
        .attr('name', 'ticks')
        .attr('id', 'left-axis-' + svgID)
        .call(yAxis)
        .call(g => g.select('.domain').remove())
    
      d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
    
      let yLeftElementCorrected = d3GetElement(yLeft)
  
  
      // ------------------------  CHART 1 : AXIS PATH  ------------------------- //
  
  
      let axisEl = d3CreateAxisRectangle(main1, width, height, _axisRadius, _axisColor, _tickLineWidth)
        

      // ------------------------  CHART 1 : TRANSITIONS  ------------------------- //
    
    
      // y-axis
      let transformLeftX = Math.floor(yLeftWidth)
      let transformLeftY = 0
      yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)
    
       // x-axis
      let transformBottomX = Math.floor(yLeftWidth)
      let transformBottomY = transformLeftY + height
      xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)
    
      // axis path
      let transformAxisX = transformBottomX
      let transformAxisY = transformLeftY
      axisEl.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)
  
      // main1
      main1El.setAttribute('transform', `translate(${offsetLeft}, ${offsetTop})`)
  
      // chart
      chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)
  
      
      // -------------------------------------  CHART 1 : GRID  ------------------------------------- //
        
  
      // xtick every 4th lap since second lap
      // let yGridShow = yTickValues.filter((_, index) => index % 2 == 0)
      // yGridShow = yTickValues
    
      let gridXmin = height - offsetGridX
      let gridXmax = offsetGridX
    
      let gridYmin = width - offsetGridY
      let gridYmax = offsetGridY
  
      // grid-x
      d3DrawXGrid(chart, 'grid-bottom', xScale, xTickValues, gridXmin, gridXmax, _colorGrid, scaleType='linear')
      
      // grid-y
      d3DrawYGrid(chart, 'grid-left', yScale, yTickValues, gridYmin, gridYmax, _colorGrid, scaleType='linear')
    
    
      // ------------------------  CHART 1 : ELEMENTS  ------------------------- //
    
    
      let fillArea = chart
        .append('g')
        .attr('name', 'fill-area')
        .attr('id', eventPaceChart11FillAreaID)
        .style('transition', 'opacity 5s')
  
  
      // -------------------------  CHART 2 : Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //
    
      let height2 = heightDiv - offsetTop - offsetBottom
      height2 -= lapByLapCondition ? 0: lapByLapTooltipHeight
  
      let yScale2 = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height2, 0])
        // .nice()
    
      // make space between end of axis and first tick equals for both x and y axises
      d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')
  
      let yAxis2 = d3
        .axisLeft(yScale2)
        .tickValues(yTickValues)
        .tickSize(yTickSize)
        .tickSizeOuter(yTickSizeOuter)
        .tickFormat(x => x.toFixed(2))
  
      let yLeft2 = main2
        .append("g")
        .attr('name', 'axis-left')
  
      yLeft2
        .append("g")
        .attr('name', 'ticks')
        .attr('id', 'left-axis-' + svgID)
        .call(yAxis2)
        .call(g => g.select('.domain').remove())
  
      d3StyleAxis(Object.entries({ yLeft2 }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
  
      let yLeftElement2 = d3GetElement(yLeft2)
      let yLeftSizes2 = getSizes(yLeftElement2)
      let yLeftWidth2 = yLeftSizes2.width
  
  
      // -------------------------  CHART 1 : X-SCALE, X-AXIS, X-LABELS  ------------------------- //
    
      // let width = widthDiv - offsetLeft - yLeftWidth - offsetRight
    
      // let xScale = d3
      //   .scaleLinear()
      //   .domain([xMin, xMax])
      //   .range([0, width])
  
      // d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')
    
      let xAxis2 = d3
        .axisBottom(xScale)
        .tickValues(xTickValues)
        .tickSize(xTickSize)
        .tickSizeOuter(xTickSizeOuter)
        .tickFormat(d3.format('c'))
        // .tickFormat('')
    
      let xBottom2 = main2
        .append("g")
        .attr('name', 'axis-bottom')
    
      xBottom2
        .append("g")
        .attr('name', 'ticks')
        .attr('id', 'bottom-axis-' + svgID)
        .call(xAxis2)
        .call(g => g.select('.domain').remove())
    
      d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)
    
      let xBottomElement2 = d3GetElement(xBottom2)
      let xBottomSizes2 = getSizes(xBottomElement2)
      let xBottomHeight2 = Math.ceil(xBottomSizes2.height)
    
    
      // ------------------------- CHART 2 : CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //
    
    
      height2 = height2 - xBottomHeight2
    
      d3GetElement(yLeft2).remove()
      
      yScale2 = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height2, 0])
        // .nice()
    
      // make space between end of axis and first tick equals for both x and y axises
      d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')
    
      yAxis2 = d3
        .axisLeft(yScale2)
        .tickValues(yTickValues)
        .tickSize(yTickSize)
        .tickSizeOuter(yTickSizeOuter)
        .tickFormat(x => x.toFixed(2))
    
      yLeft2 = main2
        .append("g")
        .attr('name', 'axis-left')
    
      yLeft2
        .append("g")
        .attr('name', 'ticks')
        .attr('id', 'left-axis-' + svgID)
        .call(yAxis2)
        .call(g => g.select('.domain').remove())
    
      d3StyleAxis(Object.entries({ yLeft2 }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
    
      let yLeftElementCorrected2 = d3GetElement(yLeft2)
  
  
      // ------------------------  CHART 2 : AXIS PATH  ------------------------- //
  
  
      let axisEl2 = d3CreateAxisRectangle(main2, width, height2, _axisRadius, _axisColor, _tickLineWidth)
        
  
      // ------------------------  CHART 2 : TRANSITIONS  ------------------------- //
    
    
      // y-axis
      let transformLeftX2 = Math.floor(yLeftWidth2)
      let transformLeftY2 = 0
      yLeftElementCorrected2.setAttribute('transform', `translate(${transformLeftX2}, ${transformLeftY2})`)
    
       // x-axis
      let transformBottomX2 = Math.floor(yLeftWidth)
      let transformBottomY2 = transformLeftY2 + height2
      xBottomElement2.setAttribute('transform', `translate(${transformBottomX2}, ${transformBottomY2})`)
    
      // axis path
      let transformAxisX2 = transformBottomX2
      let transformAxisY2 = transformLeftY2
      axisEl2.setAttribute('transform', `translate(${transformAxisX2}, ${transformAxisY2})`)
  
      // main2
      main2El.setAttribute('transform', `translate(${offsetLeft}, ${offsetTop})`)
  
      // chart
      chart2.attr("transform", `translate(${transformBottomX2}, ${transformLeftY2})`)
      
  
        // -------------------------------------  CHART 2 : GRID  ------------------------------------- //
      
        
      // xtick every 4th lap since second lap
      // let yGridShow = yTickValues.filter((_, index) => index % 2 == 0)
      // yGridShow = yTickValues
    
      let gridXmin2 = height2 - offsetGridX
      let gridXmax2 = offsetGridX
    
      let gridYmin2 = width - offsetGridY
      let gridYmax2 = offsetGridY
  
      // grid-x
      d3DrawXGrid(chart2, 'grid-bottom', xScale, xTickValues, gridXmin2, gridXmax2, _colorGrid, scaleType='linear')
      
      // grid-y
      d3DrawYGrid(chart2, 'grid-left', yScale2, yTickValues, gridYmin2, gridYmax2, _colorGrid, scaleType='linear')
    
    
      // ------------------------  CHART 2 : ELEMENTS  ------------------------- //
      
  
      let LapbyLap = chart2
        .append('g')
        .attr('name', 'lap-by-lap')
        .attr('id', eventPaceChart11LapByLapID)
        .style('transition', 'opacity 0.25s')
  
      let lapByLapSegmentHoverArea = LapbyLap
        .append('g')
        .attr('name', 'segment-hover')
        // .style('pointer-events', 'none')
  
      let byLapLines = LapbyLap
        .append('g')
        .attr('name', 'lines')
        .style('pointer-events', 'none')
  
      let byLapCirclesHover = LapbyLap
        .append('g')
        .attr('name', 'circles-hover')
        
      let byLapCircles = LapbyLap
        .append('g')
        .attr('name', 'circles')
        .style('pointer-events', 'none')
  
      
      // ------------------------  LINES  ------------------------- //

      
      let conditionCrossZero = (dataCurrent, dataPrevious) => (
        (dataPrevious.y >= 0 && dataCurrent.y < 0) || (dataPrevious.y < 0 && dataCurrent.y >= 0)
      )
  
      let segments = d3getDataForColoredPathsZeroLine(data, conditionCrossZero)
    
      let smoother = d3.curveCatmullRom
    
      let fillGenerator = d3
        .area()
        .curve(smoother)
        // .defined(d => notNaN(d.x) && notNaN(d.y))
        .x(d => xScale(d.x))
        .y0(d => yScale(0))
        .y1(d => yScale(d.y))
  
      let fillGenerator2 = d3
        .area()
        .curve(smoother)
        // .defined(d => notNaN(d.x) && notNaN(d.y))
        .x((d, i, data) => {
  
          let delta
  
          if (i == 0) {
            delta = -px6
          } else if (i == data.length - 1) {
            delta = px6
          } else {
            delta = 0
          }
  
          let result = xScale(d.x) + delta
          
          return result
          
        })
        .y0((d, i) => {
  
          let result = yScale2(0)
          let delta = (d.y > 0) ? px24 : -px24
          
          result += delta
  
          return result
        
        })
        .y1(d => {
          
          let result = yScale2(d.y)
          let delta = (d.y > 0) ? -px24 : px24
          
          result += delta
  
          return result
        
        })
  
      let lapByLapTooltipFillCounter = 0

      segments.forEach((part, i) => {
    
        let segment = part['segment']
        let type = part['type']
        let color_ = (type == 'y_upper') ? colorLeft : colorRight
  
        let fillColor = alphaColor(color_, 0.6, _colorBackground)
  
        segment = objectRemoveNaNs(segment, 'x')
    
        // for segments with only one lap value
        if ((segment.length == 2) && isNaN(segment[0]['y'])) {
          segment[0]['y'] = 0
        }

        let segmentCleaned = segment.filter(d => isInteger(d.x)&& notNaN(d.x) && notNaN(d.y))

        if (segmentCleaned.length > 1) {
          
          let segmentID = eventPaceChart11FillAreaID + '-' + i
  
          let segmentColor
  
          if (segmentID == eventPaceChart11SegmentClickedID) {
            segmentColor = paleColor(fillColor, eventPaceChart11ShadeCoeff, _colorBackground)
          } else {
            segmentColor = fillColor
          }
  
          // ------------------------  chart 1  ------------------------- //
    
          fillArea
            .append('path')
            .datum(segmentCleaned)
            .attr('d', fillGenerator)
            .attr('id', segmentID)
            .attr('fill-color', fillColor)
            .style('fill', segmentColor)
            .style('stroke', paleColor(color_, 0.9))
            .style('stroke-width', px2)
            // .style('shape-rendering', 'geometricPrecision')
            .style('cursor', 'pointer')
            .on('mouseleave', (event, d) => {
              
              let element = event.target
  
              if (elNotClicked(element)) {
  
                let color = element.getAttribute('fill-color')
  
                element.style.fill = color
  
                eventPaceTooltip1ChartDeactivate(d, data, dataLeft)
  
              }
              
              if (eventPaceTooltip1LapsLocalClicked) {
                eventPaceTooltip1Fill(data, dataLeft, eventPaceTooltip1LapsLocalClicked)
              } else {
                eventPaceTooltip1Fill(data, dataLeft, laps)
              }
            
            })
            .on('mouseover', (event, d) => {
              
              let element = event.target
              let color = element.getAttribute('fill-color')
  
              if (elNotClicked(element)) {
                element.style.fill = alphaColor(color, 0.8, _colorBackground)
              }
  
              eventPaceTooltipActivate(d, data, dataLeft)
  
            })
            .on('mouseup', (event, d) => {
    
              let element = event.target
    
              if (elClicked(element)) {
                
                eventPaceTooltip1LapsLocalClicked = null
                eventPaceChart11SegmentClickedID = null
                
              } else {
                
                eventPaceTooltip1LapsLocalClicked = d.filter(o => notNaN(o['x']) && notNaN(o['y']))
                eventPaceTooltip1LapsLocalClicked = eventPaceTooltip1LapsLocalClicked.map(o => o['x'])
                eventPaceTooltip1LapsLocalClicked = eventPaceTooltip1LapsLocalClicked.filter(o => Number.isInteger(o))
                
                eventPaceChart11SegmentClickedID = segmentID
  
              }
              
              eventPaceTooltip1ChartClick(element, d)
    
            })

          let barHoverWidth = px16
          let barHoverWidthHalf = 0.5 * barHoverWidth
          let barHoverHeight = px40
          let barHoverHeightHalf = 0.5 * barHoverHeight
  
          let lineColor = alphaColor(color_, 0.25, _colorBackground)
  
          let circleFillColor = alphaColor(color_, 0.5, _colorBackground)
          let strokeColor = saturateColor(color_, 0.75, _colorBackground)
          let strokeWidth = px2
          
          // byLap
          //   .append('g')
          //   .selectAll('rect')
          //   .data(segmentCleaned)
          //   .join('rect')
          //   .attr('x', d => xScale(d.x))
          //   .attr('y', d => d.y < 0 ? yScale(0) : yScale(d.y))
          //   .attr('width', barWidth)
          //   .attr('height', d => d.y < 0 ? -(yScale(0) - yScale(d.y)) : yScale(0) - yScale(d.y))
          //   .style('fill', fillColor)
          //   .style('stroke', 'none')
  
          // ------------------------  chart 2  ------------------------- //
  
          byLapLines
            .append('g')
            .selectAll('line')
            .data(segmentCleaned)
            .join('line')
            .attr('id', (d, j) => eventPaceChart11LineID + '-' + i + '-' + j)
            .attr('x1', d => xScale(d.x))
            .attr('x2', d => xScale(d.x))
            .attr('y1', d => yScale2(0))
            .attr('y2', d => yScale2(d.y))
            .style('fill', 'none')
            .style('stroke', lineColor)
            .style('stroke-width', strokeWidth)
            .style('shape-rendering', 'crispEdges')
  
          byLapCircles
            .append('g')
            .selectAll('circle')
            .data(segmentCleaned)
            .join('circle')
            .attr('id', (d, j) => eventPaceChart11CircleID + '-' + i + '-' + j)
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale2(d.y))
            .attr('r', px3)
            .attr('fill', circleFillColor)
            .attr('stroke', strokeColor)
            .attr('stroke-width', strokeWidth)
            .attr('x', d => d.x)
            .style('visibility', d => {
              
              let lap = d.x
  
              let dataLap = dataLeft.filter(o => o['LapNumber'] == lap)[0]
              let laptime = dataLap['Laptime']
  
              let result = (laptime == '-') ? 'hidden': 'visible'
  
              return result
              
            })

          byLapCirclesHover
            .append('g')
            .selectAll('rect')
            .data(segmentCleaned)
            .join('rect')
            .attr('x', d => xScale(d.x) - barHoverWidthHalf)
            .attr('width', barHoverWidth)
            .attr('y', d => yScale2(d.y) - barHoverHeightHalf)
            .attr('height', barHoverHeight)
            .style('opacity', 0)
            // .style('pointer-events', 'none')
            // .attr('fill', _colorBackground)
            .attr('circle_id', (d, j) => eventPaceChart11CircleID + '-' + i + '-' + j)
            .attr('line_id', (d, j) => eventPaceChart11LineID + '-' + i + '-' + j)
            .attr('fill_area_id', (d, j) => eventPaceChart11FillAreaID + '-' + i)
            .on('mouseover', (event, d) => {
  
              let lap = d.x
  
              let element = event.target
              
              let circleID = element.getAttribute('circle_id')
              let cirlce = getElement(circleID)
              
              cirlce.style.r = px5
              cirlce.style.stroke = color_
              // cirlce.style.strokeWidth = px3
              // cirlce.style.fill = alphaColor(fillColor, 0.25)
  
              let lineID = element.getAttribute('line_id')
              let line = getElement(lineID)
  
              line.style.stroke = color_
              
              // activate fill area tooltip
              eventPaceTooltipActivate(segmentCleaned, data, dataLeft)
  
              // activate lap by lap tooltip
              eventPaceLapByLapTooltipActivate(lap, dataLeft)
              
              
            })
            .on('mouseleave', (event, d) => {
  
              let element = event.target
  
              let circleID = element.getAttribute('circle_id')
              let cirlce = getElement(circleID)
  
              cirlce.style.r = ''
              cirlce.style.stroke = strokeColor
              cirlce.style.strokeWidth = ''
              cirlce.style.fill = ''
  
              let lineID = element.getAttribute('line_id')
              let line = getElement(lineID)
  
              line.style.stroke = lineColor
  
              eventPaceTooltip1Fill(data, dataLeft, laps)
  
              eventPaceLapByLapTooltipClean()
              
            })

          lapByLapSegmentHoverArea
            .append('path')
            .datum(segmentCleaned)
            .attr('d', fillGenerator2)
            .attr('id', segmentID)
            .style('fill', 'lightgrey')
            .style('opacity', 0)
            .on('mouseover', (event, d) => {
              eventPaceTooltipActivate(d, data, dataLeft)
            })
            .on('mouseleave', (event, d) => {
              eventPaceTooltip1Fill(data, dataLeft, laps)
            })
  
 
          // ------------------------  lap by lap tooltip  ------------------------- //
  
  
          if (lapByLapTooltipFillCounter == 0) {
            eventPaceLapByLapTooltipFill(dataLeft, colorLeft, dataRight, colorRight)
            lapByLapTooltipFillCounter += 1
          }
          
        }
  
      })

      d3GetElement(svg).addEventListener('mousedown', (event) => {
    
        if (!event.target.id.includes(eventPaceChart11FillAreaID) & (lapByLapCondition == 0)) {
    
          eventPaceTooltip1LapsLocalClicked = null
          eventPaceChart11SegmentClickedID = null
    
          eventPaceTooltip1ChartDeactivateAll()
          eventPaceTooltip1Fill(data, dataLeft, laps)
          
        }
        
      })
  
    
      // ------------------------  TOOLTIP  ------------------------- //

    
      function eventPaceTooltipActivate(segment, data, dataLeft) {
  
        let lapsLocal = segment.filter(o => notNaN(o['x']) && notNaN(o['y']))
          
        lapsLocal = lapsLocal.map(o => o['x'])
        lapsLocal = lapsLocal.filter(o => Number.isInteger(o))
          
        eventPaceTooltip1Fill(data, dataLeft, lapsLocal)
        
      }
    
    
      function eventPaceTooltip1ChartDeactivate(segment, data, dataLeft) {
  
        let lapsLocal = segment.filter(o => notNaN(o['x']) && notNaN(o['y']))
        
        lapsLocal = lapsLocal.map(o => o['x'])
        lapsLocal = lapsLocal.filter(o => Number.isInteger(o))
  
        eventPaceTooltip1Fill(data, dataLeft, lapsLocal)
    
      }
      
    
      function eventPaceTooltip1ChartClick(element, segment) {
    
        let color = element.getAttribute('fill-color')
    
        if (elClicked(element)) {
    
          element.classList.remove('clicked')
          
        } else {
    
          let fillAreaElement = d3GetElement(fillArea)
          let areas = childrenToArray(fillAreaElement)
        
          areas.forEach((area, i) => {
    
            if (area != element) {
              
              area.classList.remove('clicked')
              area.style.fill = area.getAttribute('fill-color')
              
            } else {
              
              element.classList.add('clicked')
              
              color = paleColor(color, eventPaceChart11ShadeCoeff, _colorBackground)
              
            }
            
          })
    
        }
    
        element.style.fill = color
        
      }
    
      function eventPaceTooltip1ChartDeactivateAll() {
    
        let fillAreaElement = d3GetElement(fillArea)
        let areas = childrenToArray(fillAreaElement)
      
        areas.forEach((area, i) => {
    
          area.classList.remove('clicked')
          area.classList.remove('chart-11-1-area-active')
          
          area.style.fill = area.getAttribute('fill-color')
          
        })
        
      }
      
      function eventPaceTooltip1Fill(data, dataLeft, lapsLocal, kind='Clear') {
    
        let dataLocal = data.filter(o => lapsLocal.includes(o['x']))
        let lapsLocalBoth = dataLocal.filter(o => notNaN(o['y'])).map(o => o['x'])
  
        let dataLeftLocal = dataLeft.filter(o => lapsLocalBoth.includes(Number(o['LapNumber'])))
        let dataLeftLocalStart = firstElement(dataLeftLocal)
        let dataLeftLocalEnd = lastElement(dataLeftLocal)
        
        let dataRightLocal
        let dataRightLocalStart
        let dataRightLocalEnd
    
        if (notEmpty(dataRight)) {
          
          dataRightLocal = dataRight.filter(o => lapsLocalBoth.includes(Number(o['LapNumber'])))
          dataRightLocalStart = firstElement(dataRightLocal)
          dataRightLocalEnd = lastElement(dataRightLocal)
          
        }
    
        let dataDiffLocal = data.filter(o => lapsLocalBoth.includes(o['x']))
        dataDiffLocal = dataDiffLocal.map(o => o['y']).filter(NaNs)
    
        let tooltipElement = getElement(eventPaceTooltip1ID)
    
        let nameElement = getElement(eventPaceTooltip1NameID)
        nameElement.textContent = dataLeftLocal[0]['FullName']
        nameElement.style.color = colorLeft
    
        let nameComapreElement = getElement(eventPaceTooltip1CompareNameID)
        let nameComapreText
        let nameComapreColor
  
        if (notEmpty(dataRight)) {
    
          nameComapreText = dataRightLocal[0]['FullName']
          nameComapreColor = colorRight   
          
        } else {
    
          nameComapreText = 'Пелотон'
          nameComapreColor = '#808080'
          
        }
    
        nameComapreElement.textContent = nameComapreText 
        nameComapreElement.style.color = nameComapreColor
    
        let stintElement = getElement(eventPaceTooltip1StintID)
    
        let stintStart = firstElement(lapsLocalBoth)
        let stintEnd = lastElement(lapsLocalBoth)
        let stintDiff = stintEnd - stintStart
    
        let stintText = `${stintDiff + 1} (${stintStart} - ${stintEnd})`
    
        if (stintStart == stintEnd) {
          stintText = `${1} (${stintStart})`
        }
        
        let stintElementText = (
          (dataLocal.length == data.length) ? 'Вся дистанция' : stintText
        )
        
        stintElement.textContent = stintElementText
    
        let paceDiffSumElement = getElement(eventPaceTooltip1TimeGainedID)
        let paceDiffSum = arraySum(dataDiffLocal)
        let paceDiffSumColor = (paceDiffSum >= 0) ? eventPaceGoodPaceColor : eventPaceBadPaceColor
    
        paceDiffSumElement.textContent = Math.abs(paceDiffSum).toFixed(3)
        paceDiffSumElement.style.color = paceDiffSumColor
    
        let paceDiffAvgElement = getElement(eventPaceTooltip1TimeGainedByLapID)
        let paceDiffAvg = arrayAverage(dataDiffLocal)
        let paceDiffAvgColor = (paceDiffAvg >= 0) ? eventPaceGoodPaceColor : eventPaceBadPaceColor
    
        paceDiffAvgElement.textContent = Math.abs(paceDiffAvg).toFixed(3)
        paceDiffAvgElement.style.color = paceDiffAvgColor
    
        let tyresLeftElement = getElement(eventPaceTooltip1TyresLeftID)
  
        let tyresLeftStart = `${dataLeftLocalStart['Compound']}${dataLeftLocalStart['TyreLife']}`
        tyresLeftStart = (dataLeftLocalStart['Compound'] == ' ') ? '' : tyresLeftStart
  
        let tyresLeftEnd = `${dataLeftLocalEnd['Compound']}${dataLeftLocalEnd['TyreLife']}`
        tyresLeftEnd = (dataLeftLocalEnd['Compound'] == ' ') ? '' : tyresLeftEnd
        
        let tyresLeftText = `${tyresLeftStart} - ${tyresLeftEnd}`
        
        tyresLeftElement.textContent = tyresLeftText
    
        let tyresRightElement = getElement(eventPaceTooltip1TyresRightID)
        let tyresRightStart
        let tyresRightEnd
        let tyresRightText
      
        if (notEmpty(dataRight)) {
    
          tyresRightStart = `${dataRightLocalStart['Compound']}${dataRightLocalStart['TyreLife']}`
          tyresRightStart = (dataRightLocalStart['Compound'] == ' ') ? '' : tyresRightStart
              
          tyresRightEnd = `${dataRightLocalEnd['Compound']}${dataRightLocalEnd['TyreLife']}`
          tyresRightEnd = (dataRightLocalEnd['Compound'] == ' ') ? '' : tyresRightEnd
          
          tyresRightText = `${tyresRightStart} - ${tyresRightEnd}`
          
        } else {
          tyresRightText = '-'
        }
    
        tyresRightElement.textContent = tyresRightText
    
        let lapsBetterPaceElement = getElement(eventPaceTooltip1LapsBetterPaceID)
        let lapsWorsePaceElement = getElement(eventPaceTooltip1LapsWorsePaceID)
    
        let bestTimeStintElement = getElement(eventPaceTooltip1BestTimeStintID)
        let bestTimeStintLapElement = getElement(eventPaceTooltip1BestTimeStintLapID)
        let bestTimeStintDeltaElement = getElement(eventPaceTooltip1BestTimeStintDeltaID)
    
        let worstTimeStintElement = getElement(eventPaceTooltip1WorstTimeStintID)
        let worstTimeStintLapElement = getElement(eventPaceTooltip1WorstTimeStintLapID)
        let worstTimeStintDeltaElement = getElement(eventPaceTooltip1WorstTimeStintDeltaID)
    
        let dataFiltered = dataLocal.filter(o => notNaN(o['y']))
        
        let objWithBestPace
        let objWithWorstPace
    
        let lapsBetterPaceCount
        let lapsWorsePaceCount
    
        let bestPaceLap
        let bestPaceDiff
    
        let worstPaceLap
        let worstPaceDiff
        let worstPaceDiffColor
    
        if (dataFiltered.length > 0) {
    
          objWithBestPace = objectGetMax(dataFiltered, 'y', 'object')
          objWithWorstPace = objectGetMin(dataFiltered, 'y', 'object')
    
          bestPaceLap = objWithBestPace['x']
          bestPaceDiff = objWithBestPace['y']
    
          lapsBetterPaceCount = dataFiltered.filter(o => o['y'] > 0).length
          lapsWorsePaceCount = dataFiltered.filter(o => o['y'] < 0).length
    
          bestPaceDiffColor = (bestPaceDiff >= 0) ? eventPaceGoodPaceColor : eventPaceBadPaceColor
    
          bestTimeStintDeltaElement.textContent = Math.abs(bestPaceDiff).toFixed(3)
          bestTimeStintDeltaElement.style.color = bestPaceDiffColor
    
          worstPaceLap = objWithWorstPace['x']
          worstPaceDiff = objWithWorstPace['y']
          worstPaceDiffColor = (worstPaceDiff >= 0) ? eventPaceGoodPaceColor : eventPaceBadPaceColor
    
          worstTimeStintDeltaElement.textContent = Math.abs(worstPaceDiff).toFixed(3)
          worstTimeStintDeltaElement.style.color = worstPaceDiffColor
          
        } else {
    
          lapsBetterPaceCount = ''
          lapsWorsePaceCount = ''
    
          bestPaceLap = ''
          bestPaceDiff = ''
    
          bestTimeStintDeltaElement.textContent = ''
    
          worstPaceLap = ''
          worstPaceDiff = ''
          
        }
    
        lapsBetterPaceElement.textContent = lapsBetterPaceCount
        lapsWorsePaceElement.textContent = lapsWorsePaceCount
    
        let bestLapTime = dataLeftLocal.filter(o => o['LapNumber'] == bestPaceLap)
          
        if (bestLapTime.length > 0) {
    
          bestLapTime = bestLapTime[0][laptimeMetric]
          bestTimeStintElement.textContent = secToLabel(bestLapTime)
          
        } else {
          bestTimeStintElement.textContent = ''
        }
     
        let worstLapTime = dataLeftLocal.filter(o => o['LapNumber'] == worstPaceLap)
    
        if (worstLapTime.length > 0) {
    
          worstLapTime = worstLapTime[0][laptimeMetric]
          worstTimeStintElement.textContent = secToLabel(worstLapTime)
          
        } else {
          worstTimeStintElement.textContent = ''
        }
    
        bestTimeStintLapElement.textContent = bestPaceLap
        worstTimeStintLapElement.textContent = worstPaceLap
      
      }
  
      if (eventPaceTooltip1LapsLocalClicked) {
        eventPaceTooltip1Fill(data, dataLeft, eventPaceTooltip1LapsLocalClicked)
      } else {
        eventPaceTooltip1Fill(data, dataLeft, laps)
      }
      
    }

  } else {

    lapByLapCheckEl.classList.add('disabled')

    svg
      .append("svg:image")
      .attr('x', 0.5 * widthDiv - px24)
      .attr('y', 0.5 * heightDiv - px24)
      .attr('width', px48)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

    function eventPaceTooltip1NoData() {
  
      let nameElement = getElement(eventPaceTooltip1NameID)
      nameElement.textContent = '-'
      nameElement.style.color = '#808080'
  
      let nameComapreElement = getElement(eventPaceTooltip1CompareNameID)
      nameComapreElement.textContent = '-' 
      nameComapreElement.style.color = '#808080'
  
      let stintElement = getElement(eventPaceTooltip1StintID)
      stintElement.textContent = '-'
  
      let paceDiffSumElement = getElement(eventPaceTooltip1TimeGainedID)
      paceDiffSumElement.textContent = '-'
      paceDiffSumElement.style.color = '#808080'
  
      let paceDiffAvgElement = getElement(eventPaceTooltip1TimeGainedByLapID)
      paceDiffAvgElement.textContent = '-'
      paceDiffAvgElement.style.color = '#808080'
  
      let tyresLeftElement = getElement(eventPaceTooltip1TyresLeftID)
      tyresLeftElement.textContent = '-'
  
      let tyresRightElement = getElement(eventPaceTooltip1TyresRightID)
      tyresRightElement.textContent = '-'
  
      let lapsBetterPaceElement = getElement(eventPaceTooltip1LapsBetterPaceID)
      let lapsWorsePaceElement = getElement(eventPaceTooltip1LapsWorsePaceID)
  
      let bestTimeStintElement = getElement(eventPaceTooltip1BestTimeStintID)
      let bestTimeStintLapElement = getElement(eventPaceTooltip1BestTimeStintLapID)
      let bestTimeStintDeltaElement = getElement(eventPaceTooltip1BestTimeStintDeltaID)
  
      let worstTimeStintElement = getElement(eventPaceTooltip1WorstTimeStintID)
      let worstTimeStintLapElement = getElement(eventPaceTooltip1WorstTimeStintLapID)
      let worstTimeStintDeltaElement = getElement(eventPaceTooltip1WorstTimeStintDeltaID)
  
      bestTimeStintDeltaElement.textContent = '-'
      bestTimeStintDeltaElement.style.color = '#808080'

      worstTimeStintDeltaElement.textContent = '-'
      worstTimeStintDeltaElement.style.color = '#808080'
  
      lapsBetterPaceElement.textContent = '-'
      lapsWorsePaceElement.textContent = '-'

      bestTimeStintElement.textContent = '-'
      worstTimeStintElement.textContent = '-'
  
      bestTimeStintLapElement.textContent = '-'
      worstTimeStintLapElement.textContent = '-'
    
    }

    eventPaceTooltip1NoData()

    elementRemoveEventListeners(svgID)
    
  }

}


function chart_12(
    ContainerID, Container2ID, ContainerVID, ContainerDID, ContainerLID, metric,
    dataLaptimesEvents, dataLaptimesFull, dataLaptimesTeams, dataLatimesDrivers, dataDrivers,
    active=false, smooth=false, id
  ) {

  // dataEventsLaptimes -> data_7
  // dataLaptimes -> data_8
  // dataLatimesSummary -> data_9

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3.select(containerID).selectAll('svg > *').remove()
  d3.select(containerID).selectAll('svg').attr('width', 0)

  let container2ID = '#' + Container2ID
  let container2 = getElement(Container2ID)

  d3.select(container2ID).selectAll('svg > *').remove()
  d3.select(container2ID).selectAll('svg').attr('width', 0)

  let containerVID = '#' + ContainerVID
  let containerV = getElement(ContainerVID)

  d3.select(containerVID).selectAll('svg > *').remove()
  d3.select(containerVID).selectAll('svg').attr('width', 0)

  let containerDID = '#' + ContainerDID
  let containerD = getElement(ContainerDID)

  d3.select(containerDID).selectAll('svg > *').remove()
  d3.select(containerDID).selectAll('svg').attr('width', 0)

  let containerLID = '#' + ContainerLID
  let containerL = getElement(ContainerLID)

  d3.select(containerLID).selectAll('svg > *').remove()
  d3.select(containerLID).selectAll('svg').attr('width', 0)

  // set SVG width to 0 after previous driver
  let svgElementLapsCount = getElement(ContainerLID).children[0]
  if (svgElementLapsCount) { svgElementLapsCount.setAttribute('width', 0) }

  // ---------------------------------  PARAMETERS  --------------------------------- //


  let chart1Height = remToPix(25)
  let chart2Height = remToPix(15)
  let chartVHeight = remToPix(15)

  let yAxisLeftDecimals = 2

  let textLineHeightCorrection = px4
  
  let xTickSize = px6
  let xTickSizeSprints = px4

  let yTickSize = px4

  let xTicksPad = px12
  let xTicksPadL = px12
  
  let yTicksPad = px12
  let yTicksPadL = px12

  let paddingXOuter = _axisRadius + px2
  let paddingXOuterV = _axisRadius + px2
  let paddingXOuterL = _axisRadius + px2
  
  let paddingYOuter = _axisRadius + px2
  let paddingYOuterL = _axisRadius + px2

  let offsetLeft = px12
  let offsetLeftV = px12
  let offsetLeftL = px12
  
  let offsetRight = px12
  let offsetRightL = px12
  
  let offsetTop1 = px12
  let offsetTop2 = px12
  let offsetTopV = px12
  let offsetTopL = px12

  let offsetBottom1 = xTicksPad + xTickSize - textLineHeightCorrection
  let offsetBottom2 = xTicksPad + xTickSize - textLineHeightCorrection
  let offsetBottomV = xTicksPad + xTickSize - textLineHeightCorrection
  let offsetBottomL = xTicksPad + xTickSize - textLineHeightCorrection

  let offsetGridX1 = px6
  let offsetGridY1 = px6

  let offsetGridX2 = px6
  let offsetGridY2 = px6

  let offsetGridXV = px6
  let offsetGridYV = px6

  let offsetGridXL = px6
  let offsetGridYL = px6

  let xLabelFontSize = px11
  let xLabelFontWeight = 600

  let xLabelVFontSize = px8
  let xLabelVFontWeight = 675

  let xLabelLFontSize = px10
  let xLabelLFontWeight = 675

  let variationLineWidth = px1_5
  
  let variationCircleR = px2_5
  let variationCircleRNa = px4

  let sprintMarkerAddEventsNumber = 9

  let sliceD = 0.75

  let barWidth = px12
  let barRx = px6
  
  let barWidthSprint = px4
  let barRxSprint = px2


  // ---------------------------------  SVG : CHART LAPTIMES  --------------------------------- //
  
  
  let widthSvg = container.offsetWidth

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  if (container2.children.length == 0) {
    d3.select(container2ID).append('svg')
  }

  let svgID = id + '-laptimes'

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('name', 'chart-12')
    .attr('id', svgID)
    .attr('width', widthSvg)
    .attr('height', chart1Height)
    .style('background', _colorBackground)

  let main = svg
    .append('g')
    .attr('class', 'main')
    .attr("transform", `translate(${offsetLeft}, ${offsetTop1})`)

  let chart = main
    .append('g')
    .attr('name', 'chart')
    // .classed('overflow-hidden', true)

  let grid = chart
    .append('g')
    .attr('name', 'grid')

  let svg2ID = id + '-laptimes-2'
  let main2ID = svg2ID + '-main'

  let svg2 = d3
    .select(container2ID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('name', 'chart-12')
    .attr('id', svg2ID)
    .attr('width', widthSvg)
    .attr('height', chart2Height)
    .style('background', _colorBackground)
    
  let main2 = svg2
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)
    .attr("transform", `translate(${offsetLeft}, ${offsetTop2})`)
  
  let chart2 = main2
    .append('g')
    .attr('name', 'chart')
    
    .classed('overflow-hidden', true)

  let grid2 = chart2
    .append('g')
    .attr('name', 'grid')


  // ---------------------------------  SVG : CHART VARIANCE  --------------------------------- //


  let widthSvgV = containerV.offsetWidth
  
  if (containerV.children.length == 0) {
    d3.select(containerVID).append('svg')
  }

  let svgVID = id + '-chart-v'
  let mainVID = svgVID + '-main'

  let svgV = d3
    .select(containerVID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('name', 'chart-12')
    .attr('id', svgVID)
    .attr('width', widthSvgV)
    .attr('height', chartVHeight)
    .style('background', _colorBackground)
    
  let mainV = svgV
    .append('g')
    .attr('name', 'main')
    .attr('id', mainVID)
    .attr("transform", `translate(${offsetLeftV}, ${offsetTopV})`)

  let chartV = mainV
    .append('g')
    .attr('name', 'chart')
    .classed('overflow-hidden', true)

  let gridV = chartV
    .append('g')
    .attr('name', 'grid')


  // ---------------------------------  SVG : DONUT  --------------------------------- //


  let heightDSvg = containerD.offsetHeight
  let widthDSvg = heightDSvg
  
  let radiusD = heightDSvg / 2
    
  if (containerD.children.length == 0) {
    d3.select(containerDID).append('svg')
  }
  
  let svgDID = id + '-chart-d'
  
  let svgD = d3
    .select(containerDID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('name', 'chart-12')
    .attr('id', svgDID)
    .attr('width', widthDSvg)
    .attr('height', heightDSvg)
    .style('background', _colorBackground)
  
  let chartD = svgD
    .append('g')
    .classed('overflow-hidden', true)
    .attr('name', 'chart')
    .attr("transform", `translate(${radiusD}, ${radiusD})`)


  // ---------------------------------  SVG : LAPS COUNT  --------------------------------- //


  let widthLSvg = containerL.offsetWidth
  let chartLHeight = containerL.offsetHeight

  if (containerL.children.length == 0) {
    d3.select(containerLID).append('svg')
  }

  let svgLID = id + '-chart-l'

  let svgL = d3
    .select(containerLID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('name', 'chart-12')
    .attr('id', svgLID)
    .attr('width', widthLSvg)
    .attr('height', chartLHeight)
    .style('background', _colorBackground)
    
  let mainL = svgL
    .append('g')
    .attr('class', 'main')
    .attr("transform", `translate(${offsetLeftL}, ${offsetTopL})`)
  
  let chartL = mainL
    .append('g')
    .attr('name', 'chart')
    .classed('overflow-hidden', true)

  let gridL = chartL
    .append('g')
    .attr('name', 'grid')


  // --------------------------------- DATAs  --------------------------------- //


  let sprintIndex = glVSeason['SprintIndex']

  let dataEvents = copyObject(dataLaptimesEvents)

  let dataLaptimes = copyObject(dataLaptimesFull)
  let dataLength = dataLaptimes.length

  let dataTeams = copyObject(dataLaptimesTeams)

  if (dataLength > 0) {

    
    // --------------------------------- VARIABLES  --------------------------------- //
    

    let metricTeammateMean = metric + 'Mean'
    let metricTeammatesMeanEvent = metric + 'Avg'
    
    let metricVariance = metric + 'DeltaAvg'

    let metricBetterDriverID = metric + 'ValueBetterID'
    let metricBetterPace = metric + 'ValueBetterID'

    let metricBetterLaps = metric + 'BetterLapsCount'
    let metricBetterLapsPerc = metric + 'BetterLapsCountPerc'


    // --------------------------------- CHART LAPTIMES : DATA  --------------------------------- //


    let color = dataLaptimes[0]['Color']

    let dataLastElement = lastElement(dataLaptimes)

    let eventIndexesActual = arrayDropDuplicates(dataLaptimes.map(o => o['EventIndex'])).map(Number)
    eventIndexesActual = sortValues(eventIndexesActual)
  
    let eventIndexesFirst = firstElement(eventIndexesActual)
    let eventIndexesLast = lastElement(eventIndexesActual)

    dataEvents = dataEvents.filter(o => (o['EventIndex'] >= eventIndexesFirst) && (o['EventIndex'] <= eventIndexesLast))

    let raceIDs = dataLaptimes.map(o => Number(o['RaceID']))
    raceIDs = dropDuplicates(raceIDs)

    let raceIDsLength = raceIDs.length
    
    let lapFlows = dataLaptimes.map(o => Number(o['LapNumberFlow']))
    lapFlows = dropDuplicates(lapFlows)

    let driverIDs = dataDrivers.map(o => o['DriverID'])
    driverIDs = arrayDropDuplicates(driverIDs)

    let lapFlowsGlobal = dataEvents.map(o => Number(o['LapNumberFlow']))
    lapFlowsGlobal = dropDuplicates(lapFlowsGlobal)

    let lastLapGlobal = Math.max.apply(null, lapFlowsGlobal)

    let dataEventsMiddles = dataEvents.filter(o => (o['EventAbbMiddleMarker'] == 1))

    let xTickLines = dataEvents.filter(o => o['EventTicksMarker'] == 1)
    xTickLines  = xTickLines.map(o => o['LapNumberFlow'])
    
    let dataXTicksSprintsInner = dataEvents.filter(o => o['EventTicksMarker'] == 2)

    let xGrid = dataEvents.filter(o => o['EventTicksMarker'] == 1)
    xGrid = xGrid.map(o => Number(o['LapNumberFlow']))
    xGrid.push(lastLapGlobal)

    let xGridLight = dataEvents.filter(o => (o['EventTicksMarker'] == 2))
    xGridLight = xGridLight.map(o => o['LapNumberFlow'])

    let xSmallest = Math.min( ...lapFlowsGlobal)
    let xLargest = lastLapGlobal

    let xTickValues = range(xSmallest, xLargest + 1, 1)

    let xMax = lastElement(xTickValues)

    if (raceIDsLength == 1) {

      if (isEven(xMax)) {
        xTickValues = xTickValues.filter(o => isEven(o))
      } else {
        xTickValues = xTickValues.filter(o => !isEven(o))
      }

    }

    let xMin = firstElement(xTickValues)

    let dataMetric = dataLaptimes.map(o => Number(o[metric])).filter(notNaN)

    let scaleIQR = 5

    let dataIQR = arrayIQR(dataMetric, scaleIQR)

    let minValue = dataIQR['Min']
    let maxValue = dataIQR['Max']

    dataMetric = arrayDropOutliers(dataMetric, scaleIQR)

    let ySmallest = Math.min.apply(null, dataMetric)
    let yLargest = Math.max.apply(null, dataMetric)
  
    ySmallest = roundStep(ySmallest, 0.5, 'floor')
    yLargest = roundStep(yLargest, 0.5, 'ceil')
  
    let ytickValuesRaw = generateRange(ySmallest, yLargest, '2')
    
    let yTickValues = arrayAddMeanElementsInside(ytickValuesRaw)
  
    let yMin = firstElement(yTickValues)
    let yMax = lastElement(yTickValues)
  
    let yStepHover = yTickValues[1] - yTickValues[0]

    if (yMin == 0) {
      yTickValues.splice(0, 0, -yStepHover)
      yMin = -yStepHover
    }

    if (yMax == 0) {
      yTickValues.push(yStepHover)
      yMax = yStepHover
    }

    // mean values for bars
    let barsMeanValues = dataTeams.map(o => Number(o[metricTeammatesMeanEvent])).filter(notNaN)

    let barsMeanValuesAvg
    let barsMeanValuesMed

    if (barsMeanValues.length == 0) {

      barsMeanValuesAvg = '-'
      barsMeanValuesMed = '-'
      
    } else {

      barsMeanValuesAvg = arrayAverage(barsMeanValues).toFixed(3)
      barsMeanValuesMed = arrayMedian(barsMeanValues).toFixed(3)
      
    }

    let buildBarsChart = (barsMeanValues.length > 0)

    if (barsMeanValues.length == 1) {
      barsMeanValues.push(0)
    }

    let ySmallest2 = Math.min.apply(null, barsMeanValues)
    let yLargest2 = Math.max.apply(null, barsMeanValues)

    if (ySmallest2 > 0) {
      ySmallest2 = 0
    }

    if (yLargest2 < 0) {
      yLargest2 = 0
    }

    let yTickValues2 = generateRange(ySmallest2, yLargest2, '1')

    if (barsMeanValues.length == 0) {
      yTickValues2 = [-1, 0, 1]
    }

    let step2 = yTickValues2[1] - yTickValues2[0]

    if (firstElement(yTickValues2) == 0) {
      ySmallest2 = -step2
      yTickValues2 = generateRange(ySmallest2, yLargest2, '1')
    } 
    
    if (lastElement(yTickValues2) == 0) {
      yLargest2 = step2
      yTickValues2 = generateRange(ySmallest2, yLargest2, '1')
    }

    let yMin2 = firstElement(yTickValues2)
    let yMax2 = lastElement(yTickValues2)

    let filename = `${glVSeason['SeasonID']}_pace_by_pelotone`

    let downloadItemLaptimesSVG = getElement(seasonPaceLaptimesDownloadSVGID)
    let downloadItemLaptimesPNG = getElement(seasonPaceLaptimesDownloadPNGID)

    downloadItemFill(downloadItemLaptimesSVG, filename)
    downloadItemFill(downloadItemLaptimesPNG, filename)

    let filename2 = `${glVSeason['SeasonID']}_pace_diff_by_pelotone`

    let downloadItemLaptimesSVG2 = getElement(seasonPaceLaptimes2DownloadSVGID)
    let downloadItemLaptimesPNG2 = getElement(seasonPaceLaptimes2DownloadPNGID)

    downloadItemFill(downloadItemLaptimesSVG2, filename2)
    downloadItemFill(downloadItemLaptimesPNG2, filename2)
    

    // ------------------------ CHART VARIANCE : DATA ------------------------ //


    let varianceValues = dataTeams.map(o => Number(o[metricVariance]))

    let dataVariance = []

    dataTeams.forEach((obj, i) => {

      dataVariance.push({
        'x': Number(dataEventsMiddles[i]['LapNumberFlow']),
        'y': Math.abs(varianceValues[i]),
        'better_pace_id': obj[metricBetterPace]
      })

    })

    let dataVarianceYvalues = dataVariance.map(o => o['y']).filter(notNaN)

    let yLargestV = Math.max.apply(null, dataVarianceYvalues)
    let ySmallestV = -yLargestV

    let yTickValuesV = generateRange(ySmallestV, yLargestV, '2')

    let buildVarianceChart = (yTickValuesV.length > 0)

    if (yTickValuesV.length == 0) {
      yTickValuesV = [-1, 0, 1]
    }

    let yMinV = firstElement(yTickValuesV)
    let yMaxV = lastElement(yTickValuesV)

    let xTickValuesV = range(0, dataTeams.length)
    let xMinV = firstElement(xTickValuesV)
    let xMaxV = lastElement(xTickValuesV)

    let filenameV = `${glVSeason['SeasonID']}_teammates_pace_variance`

    let downloadItemChartVSVG = getElement(seasonPaceChartVDownloadSVGID)
    let downloadItemChartVPNG = getElement(seasonPaceChartVDownloadPNGID)

    downloadItemFill(downloadItemChartVSVG, filenameV)
    downloadItemFill(downloadItemChartVPNG, filenameV)


    // ------------------------ CHART DONUT : DATA ------------------------ //


    let dataDriversL = copyObject(dataLatimesDrivers)

    let dataDonut = []

    driverIDs.forEach((driverID, i) => {
    
      let dataSummaryCurrentDriver = dataDriversL.filter(o => o['DriverID'] == driverID)
      let dataDriversCurrentDriver = dataDrivers.filter(o => o['DriverID'] == driverID)

      let color
      let abb

      if (dataDriversCurrentDriver.length > 0) {
        
        color = dataDriversCurrentDriver[0]['Color']
        abb = dataDriversCurrentDriver[0]['Abbreviation']

      } else {
        
        color= NaN
        abb = NaN
        
      }
    
      let laps = dataSummaryCurrentDriver.map(o => Number(o[metricBetterLaps]))
      laps = laps.filter(notNaN)
      laps = arraySum(laps)
    
      dataDonut.push({
        'DriverID': driverID,
        'Color': color,
        'Value': laps,
        'Abbreviation': abb,
      })
      
    })

    let valueDonutSum = arraySum(dataDonut.map(o => o['Value']))
    let sumDonutElement = getElement(seasonPaceChartBetterLaptimesTotalLapsID)

    sumDonutElement.textContent = valueDonutSum

    let buildDonutChart = (valueDonutSum > 0)

    seasonPaceDonutLegendsIDs.forEach((legendID, i) => {
      getElement(legendID).classList.add('invisible')
    })

    driverIDs.forEach((driverID, i) => {

      if (i < 3) {

        if (i > 1) {

          seasonPaceDonutValuesIDs.forEach((id, j) => {
            getElement(id).classList.add('ms-025')
          })
          
        } else {
          
          seasonPaceDonutValuesIDs.forEach((id, j) => {
            getElement(id).classList.remove('ms-025')
          })
          
        }

        let dataDonutCurrentDriver = dataDonut.filter(o => o['DriverID'] == driverID)

        if (dataDonutCurrentDriver.length > 0) {
          dataDonutCurrentDriver = dataDonutCurrentDriver[0]
        }

        let legendElement = getElement(seasonPaceDonutLegendsIDs[i])
        let labelElement = getElement(seasonPaceDonutLabelsIDs[i])
        let valueElement = getElement(seasonPaceDonutValuesIDs[i])

        let name_ = dataDonutCurrentDriver['Abbreviation']
        let value_ = dataDonutCurrentDriver['Value']
        let color_ = dataDonutCurrentDriver['Color']

        labelElement.textContent = name_

        valueElement.textContent = value_
        valueElement.style.color = color_

        legendElement.classList.remove('invisible')

        if (driverIDs.length > 2) {
          legendElement.classList.add('f28jfx-small')
        } else {
          legendElement.classList.remove('f28jfx-small')
        }
        
      }
      
    })


    // ------------------------ CHART LAPS COUNT : DATA ------------------------ //


    let dataLapsCount = []

    eventIndexesActual.forEach((eventIndex, i) => {

      let result = {
        'EventIndex': eventIndex,
        'value1': NaN,
        'value2': NaN,
        'color1': NaN,
        'color2': NaN,
      }

      let dataCurrentIndex = dataDriversL.filter(o => o['EventIndex'] == eventIndex)

      driverIDs.forEach((driverID, i) => {

        let dataCurrentDriver = dataCurrentIndex.filter(o => o['DriverID'] == driverID)
        let colorCurrentDriver = dataDrivers.filter(o => o['DriverID'] == driverID)

        let value

        if (colorCurrentDriver.length > 0) {
          colorCurrentDriver = colorCurrentDriver[0]['Color']
        } else {
          colorCurrentDriver = NaN
        }
        
        if (dataCurrentDriver.length > 0) {
          value = Number(dataCurrentDriver[0][metricBetterLaps])
        } else {
          value = NaN
        }

        if (notNaN(value)) {

          let value1 = result['value1']

          if (value1) {
            
            result['value2'] = value
            result['color2'] = colorCurrentDriver
            
          } else {
            
            result['value1'] = value
            result['color1'] = colorCurrentDriver
    
          }
          
        }
        
      })

      dataLapsCount.push(result)

    })

    let dataLapsCountPercent = []

    driverIDs.forEach((driverID, i) => {

      let dataDriversCurrentDriver = dataDrivers.filter(o => o['DriverID'] == driverID)[0]
      let color = dataDriversCurrentDriver['Color']
      
      let dataSummaryCurrentDriver = dataDriversL.filter(o => o['DriverID'] == driverID)
      
      let value = dataSummaryCurrentDriver.map(o => o[metricBetterLapsPerc]).filter(notNaN)
      let avg = arrayAverage(value)

      if (isNaN(avg)) {
        avg = '-'
      } else {
        avg = avg.toFixed(1)
      }

      dataLapsCountPercent.push({
        'DriverID': driverID,
        'Value': avg,
        'Color': color
      })
      
    })

    let buildLapsCount = notNaN(arraySum(dataLapsCountPercent.map(o => Number(o['Value']))))

    let yMinL = 0
    let yMaxL = 100
    let yTickValuesL = generateRange(yMinL, yMaxL, '2')
    
    let xTickValuesL = range(0, eventIndexesActual.length)
    let xMinL = firstElement(xTickValuesL)
    let xMaxL = lastElement(xTickValuesL)

    if (xMinL == xMaxL) {

      xMinL -= 1
      xMaxL += 1
      
    }

    let filenameL = `${glVSeason['SeasonID']}_teammates_better_laps_percentage`

    let downloadItemChartLSVG = getElement(seasonPaceChartLDownloadSVGID)
    let downloadItemChartLPNG = getElement(seasonPaceChartLDownloadPNGID)

    downloadItemFill(downloadItemChartLSVG, filenameL)
    downloadItemFill(downloadItemChartLPNG, filenameL)


    // ---------------------------------  CHART LAPTIMES 1 : Y-SCALE, Y-AXIS, Y-LABELS  --------------------------------- //


    let height1 = chart1Height - offsetTop1 - offsetBottom1
    let tickFormatFunction = (x) => (x.toFixed(yAxisLeftDecimals))
  
    let yScale = d3YScale(type='linear', minmax=[yMin, yMax], d3range=[height1, 0])
    d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')
   
    let yAxis = d3YAxis(type='left', yScale, yTickValues, yTickSize, ytickSizeOuter=null, tickFormatFunction)
    let yLeft = d3YElement(main, yAxis, 'chart-12-left-axis-' + id)
    
    d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
  
    let yLeftElement = d3GetElement(yLeft)
    let yLeftWidth = getSizes(yLeftElement).width


    // ---------------------------------  CHART LAPTIMES 1 : X-SCALE, X-AXIS, X-LABELS  --------------------------------- //
  

    let width = widthSvg - offsetLeft - offsetRight - yLeftWidth
    let tickLabelsFormat = (x) => ('')

    let xScale = d3XScale(type='linear', minmax=[xMin, xMax], d3range=[0, width])
    d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')

    let xAxis

    if (raceIDsLength == 1) {
      
      // let xTickShow = xTickValues.filter((_, index) => index % 2 == 0)
      
      xAxis = d3XAxis(type='bottom', xScale, xTickValues, xTickSize, xtickSizeOuter=null, tickLabelsFormat)
      
    } else {
      xAxis = d3XAxis(type='bottom', xScale, xTickLines, xTickSize, xtickSizeOuter=null, tickLabelsFormat)
    }

    let xBottom = d3XElement(main, xAxis, 'chart-12-bottom-axis-' + id)
  
    d3StyleAxis(Object.entries({ xBottom }), _tickLineWidth, px10, axis='x', xTicksPad, _axisColor, _ticklabelColor)
  
    let xBottomLabels = xBottom
      .append('g')
      .attr('name', 'ticklabels')
  
    let xBottomSprintLabels = xBottom
      .append('g')
      .attr('name', 'ticklabels-sprint')
  
    let xBottomTicksAdditional = xBottom
      .append('g')
      .attr('name', 'ticks-additional')

    if (raceIDsLength == 1) {

      let dataFiltered = objectDropDuplicatesByColumnValue(dataLaptimes, 'LapNumberFlow')
      dataFiltered = dataFiltered.filter(o => xTickValues.includes(Number(o['LapNumberFlow'])))

      xBottomLabels
        .selectAll('text')
        .data(dataFiltered)
        .join('text')
        .style('font-family', PrimaryFont)
        .style('fill', _ticklabelColor)
        .style('font-size', `${xLabelFontSize}px`)
        .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'hanging')
        .text(d => Number(d['LapNumber']))
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y', xTickSize + xTicksPad)
      
    } else {

      xBottomLabels
        .selectAll('text')
        .data(dataEventsMiddles)
        .join('text')
        .style('font-family', PrimaryFont)
        .style('fill', _ticklabelColor)
        .style('font-size', `${xLabelFontSize}px`)
        .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'hanging')
        .text(d => d['EventAbbreviation'])
        .classed('invisible', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? true : false)
        .style('opacity', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? 0 : 1)
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y', xTickSize + xTicksPad)

      xBottomTicksAdditional
        .append('g')
        .attr('name', 'ticks-short-for-sprints')
        .selectAll('line')
        .data(dataXTicksSprintsInner)
        .join('line')
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x1', d => xScale(d['LapNumberFlow']))
        .attr('x2', d => xScale(d['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', d => xTickSizeSprints)
    
      // last tick
      xBottomTicksAdditional
        .append('g')
        .attr('name', 'last-tick')
        .append('line')
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x1', xScale(lastLapGlobal))
        .attr('x2', xScale(lastLapGlobal))
        .attr('y1', px1)
        .attr('y2', xTickSize)
      
    }
  
    let xBottomElement = d3GetElement(xBottom)
    let xBottomElementSizes = getSizes(xBottomElement)
    let xBottomElementHeight = Math.ceil(xBottomElementSizes.height)
  

    // --------------------------------- CHART LAPTIMES 1 : CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED  --------------------------------- //
  

    height1 = height1 - xBottomElementHeight
    d3GetElement(yLeft).remove()
  
    yScale = d3YScale(type='linear', minmax=[yMin, yMax], d3range=[height1, 0])
    d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')
   
    yAxis = d3YAxis(type='left', yScale, yTickValues, yTickSize, ytickSizeOuter=null, tickFormatFunction)
    yLeft = d3YElement(main, yAxis, 'chart-12-left-axis-' + id)
  
    d3StyleAxis(Object.entries({ yLeft }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
  
    let yLeftElementCorrected = d3GetElement(yLeft)


    // ---------------------------------  CHART LAPTIMES 2 : Y-SCALE, Y-AXIS, Y-LABELS  --------------------------------- //
  
    
    let height2 = chart2Height - offsetTop2 - offsetBottom2
  
    let yScale2 = d3YScale(type='linear', minmax=[yMin2, yMax2], d3range=[height2, 0])
    d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')

    let yAxis2 = d3YAxis(type='left', yScale2, yTickValues2, yTickSize, ytickSizeOuter=null, tickFormatFunction)
    let yLeft2 = d3YElement(main2, yAxis2, 'chart-12-2-left-axis-' + id)
 
    d3StyleAxis(Object.entries({ yLeft2 }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)


    // ---------------------------------  CHART LAPTIMES 2 : X-SCALE, X-AXIS, X-LABELS  --------------------------------- //


    let xBottom2 = d3XElement(main2, xAxis, 'chart-12-2-bottom-axis-' + id)

    d3StyleAxis(Object.entries({ xBottom2 }), _tickLineWidth, px10, axis='x', xTicksPad, _axisColor, _ticklabelColor)

    let xBottomLabels2 = xBottom2
      .append('g')
      .attr('name', 'ticklabels')

    let xBottomTicksAdditional2 = xBottom2
      .append('g')
      .attr('name', 'ticks-additional')

    if (raceIDsLength == 1) {

      d3.select('#' + main2ID)
        .selectAll('.tick')
        .selectAll('line')
        .remove()

      // middle tick
      xBottomTicksAdditional2
        .append('g')
        .attr('name', 'middle-tick')
        .append('line')
        .data(dataEventsMiddles)
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', xTickSize)
      
      xBottomLabels2
        .selectAll('text')
        .data(dataEventsMiddles)
        .join('text')
        .style('font-family', PrimaryFont)
        .style('fill', _ticklabelColor)
        .style('font-size', `${xLabelFontSize}px`)
        .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'hanging')
        .text(d => d['EventAbbreviation'])
        .classed('invisible', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? true : false)
        .style('opacity', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? 0 : 1)
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y', xTickSize + xTicksPad)

    } else {

      xBottomTicksAdditional2
        .append('g')
        .attr('name', 'ticks-short')
        .selectAll('line')
        .data(dataXTicksSprintsInner)
        .join('line')
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x1', d => xScale(d['LapNumberFlow']))
        .attr('x2', d => xScale(d['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', d => xTickSizeSprints)
  
      // last tick
      xBottomTicksAdditional2
        .append('g')
        .attr('name', 'last-tick')
        .append('line')
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x1', xScale(dataLastElement['LapNumberFlow']))
        .attr('x2', xScale(dataLastElement['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', xTickSize)

      xBottomLabels2
        .selectAll('text')
        .data(dataEventsMiddles)
        .join('text')
        .style('font-family', PrimaryFont)
        .style('fill', _ticklabelColor)
        .style('font-size', `${xLabelFontSize}px`)
        .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'hanging')
        .text(d => d['EventAbbreviation'])
        .classed('invisible', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? true : false)
        .style('opacity', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? 0 : 1)
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y', xTickSize + xTicksPad)
      
    }

    let xBottom2Element = d3GetElement(xBottom2)
    let xBottom2ElementSizes = getSizes(xBottom2Element)
    let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


    // --------------------------------- CHART LAPTIMES 2 : CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED  --------------------------------- //

    
    height2 = height2 - xBottom2ElementHeight
    d3GetElement(yLeft2).remove()
  
    yScale2 = d3YScale(type='linear', minmax=[yMin2, yMax2], d3range=[height2, 0])
    d3adjustPaddingOuter(paddingYOuter, yScale2, axis='y', type='linear')
   
    yAxis2 = d3YAxis(type='left', yScale2, yTickValues2, yTickSize, ytickSizeOuter=null, tickFormatFunction)
    yLeft2 = d3YElement(main2, yAxis2, 'chart-12-left-axis-' + id)
  
    d3StyleAxis(Object.entries({ yLeft2 }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
  
    let yLeft2ElementCorrected = d3GetElement(yLeft2)


    // ---------------------------------  CHART LAPTIMES : AXIS PATHS  --------------------------------- //


    let axisPath1 = d3CreateAxisRectangle(main, width, height1, _axisRadius, _axisColor, _tickLineWidth)
    let axisPath2 = d3CreateAxisRectangle(main2, width, height2, _axisRadius, _axisColor, _tickLineWidth)

    
    // ---------------------------------  CHART LAPTIMES : TRANSITIONS  --------------------------------- //

    // chart 1
  
    // y-axis
    let transformLeftX = Math.floor(yLeftWidth)
    let transformLeftY = 0
    yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)
  
    // x-axis
    let transformBottomX = Math.floor(transformLeftX)
    let transformBottomY = Math.floor(transformLeftY + height1)
    xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

    // axis path
    let transformAxisX = transformBottomX
    let transformAxisY = transformLeftY
    axisPath1.setAttribute('transform', `translate(${transformAxisX}, ${transformAxisY})`)

    chart.attr("transform", `translate(${yLeftWidth}, ${transformLeftY})`)

    // chart 2

    // y-axis
    let transformLeft2X = Math.floor(yLeftWidth)
    let transformLeft2Y = 0
    yLeft2ElementCorrected.setAttribute('transform', `translate(${transformLeft2X}, ${transformLeft2Y})`)
    
     // x-axis
    let transformBottom2X = Math.floor(transformLeft2X)
    let transformBottom2Y = Math.floor(transformLeft2Y + height2)
    xBottom2Element.setAttribute('transform', `translate(${transformBottom2X}, ${transformBottom2Y})`)

    let mainElement = d3GetElement(main)
    let mainElementHeight = getSizes(mainElement).height

    // axis path
    let transformAxis2X = transformBottom2X
    let transformAxis2Y = transformLeft2Y
    axisPath2.setAttribute('transform', `translate(${transformAxis2X}, ${transformAxis2Y})`)

    // chart2
    chart2.attr("transform", `translate(${yLeftWidth}, ${transformLeft2Y})`)


    // ---------------------------------  CHART LAPTIMES 1 : GRID  --------------------------------- //


    let gridXmin1 = height1 - offsetGridX1
    let gridXmax1 = offsetGridX1

    let gridYmin1 = width - offsetGridY1
    let gridYmax1 = offsetGridY1

    // grid-y
    d3DrawYGrid(grid, 'grid-left', yScale, yTickValues, gridYmin1, gridYmax1, _colorGrid, scaleType='linear')

    // grid-x
    if (raceIDsLength == 1) {
      
      // let xGridShow = xTickValues.filter((_, index) => index % 2 == 0)
      d3DrawXGrid(grid, 'grid-bottom-dark-additional', xScale, xTickValues, gridXmin1, gridXmax1, _colorGrid, scaleType='linear')
      
    } else {

      d3DrawXGrid(
        grid, 'grid-bottom-light', xScale, xGridLight, gridXmin1, gridXmax1, _colorGrid, scaleType='linear')
      
      d3DrawXGrid(
        grid, 'grid-bottom-dark-additional', xScale, xGrid, gridXmin1, gridXmax1, _colorGrid, scaleType='linear')
      
    }


    // ---------------------------------  CHART LAPTIMES 2 : GRID  --------------------------------- //
      

    let yGridShow2 = yTickValues2

    let gridXmin2 = height2 - offsetGridX2
    let gridXmax2 = offsetGridX2

    let gridYmin2 = width - offsetGridY2
    let gridYmax2 = offsetGridY2
    
    d3DrawYGrid(grid2, 'grid-left', yScale2, yGridShow2, gridYmin2, gridYmax2, _colorGrid, scaleType='linear')

    if (raceIDsLength > 1) {

      d3DrawXGrid(
        grid2, 'grid-bottom-light', xScale, xGridLight, gridXmin2, gridXmax2, _colorGrid, scaleType='linear')
      
      d3DrawXGrid(
        grid2, 'grid-bottom-dark-additional', xScale, xGrid, gridXmin2, gridXmax2, _colorGrid, scaleType='linear')
      
    }

    
    // ---------------------------------  CHART VARIANCE : Y-SCALE, Y-AXIS, Y-LABELS  --------------------------------- //
  

    let heightV = chartVHeight - offsetTopV - offsetBottomV
 
    let yScaleV = d3YScale(type='linear', minmax=[yMinV, yMaxV], d3range=[heightV, 0])
    d3adjustPaddingOuter(paddingYOuter, yScaleV, axis='y', type='linear')

    let tickFormatFunctionV = (x) => (Math.abs(x).toFixed(2))

    let yAxisV = d3YAxis(type='left', yScaleV, yTickValuesV, yTickSize, ytickSizeOuter=null, tickFormatFunctionV)
    let yLeftV = d3YElement(mainV, yAxisV, 'chart-12-1-left-axis-v-' + id)

    d3StyleAxis(Object.entries({ yLeftV }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)


    // ---------------------------------  CHART VARIANCE : X-SCALE, X-AXIS, X-LABELS  --------------------------------- //


    let xBottomV = d3XElement(mainV, xAxis, 'chart-12-2-bottom-axis-v-' + id)
  
    d3StyleAxis(Object.entries({ xBottomV }), _tickLineWidth, px11, axis='x', xTicksPad, _axisColor, _ticklabelColor)

    let xBottomLabelsV = xBottomV
      .append('g')
      .attr('name', 'ticklabels')

    let xBottomTicksAdditionalV = xBottomV
      .append('g')
      .attr('name', 'ticks-additional')

    if (raceIDsLength == 1) {

      d3.select('#' + mainVID)
        .selectAll('.tick')
        .selectAll('line')
        .remove()

      // middle tick
      xBottomTicksAdditionalV
        .append('g')
        .attr('name', 'middle-tick')
        .append('line')
        .data(dataEventsMiddles)
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', xTickSize)

      xBottomLabelsV
        .selectAll('text')
        .data(dataEventsMiddles)
        .join('text')
        .style('font-family', PrimaryFont)
        .style('fill', _ticklabelColor)
        .style('font-size', `${xLabelFontSize}px`)
        .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'hanging')
        .text(d => d['EventAbbreviation'])
        .classed('invisible', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? true : false)
        .style('opacity', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? 0 : 1)
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y', xTickSize + xTicksPad)
      
    } else {

      xBottomTicksAdditionalV
        .append('g')
        .attr('name', 'ticks-short')
        .selectAll('line')
        .data(dataXTicksSprintsInner)
        .join('line')
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x1', d => xScale(d['LapNumberFlow']))
        .attr('x2', d => xScale(d['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', d => xTickSizeSprints)
  
      // last tick
      xBottomTicksAdditionalV
        .append('g')
        .attr('name', 'last-tick')
        .append('line')
        .attr('stroke', _axisColor)
        .attr('shape-rendering', 'crispEdges')
        .attr('x1', xScale(dataLastElement['LapNumberFlow']))
        .attr('x2', xScale(dataLastElement['LapNumberFlow']))
        .attr('y1', px1)
        .attr('y2', xTickSize)

      xBottomLabelsV
        .selectAll('text')
        .data(dataEventsMiddles)
        .join('text')
        .style('font-family', PrimaryFont)
        .style('fill', _ticklabelColor)
        .style('font-size', `${xLabelFontSize}px`)
        .style('font-variation-settings', `'wght' ${xLabelFontWeight}`)
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'hanging')
        .text(d => d['EventAbbreviation'])
        .classed('invisible', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? true : false)
        .style('opacity', d => ((d['isSprint'] == 1) && (raceIDsLength > sprintMarkerAddEventsNumber)) ? 0 : 1)
        .attr('x', d => xScale(d['LapNumberFlow']))
        .attr('y', xTickSize + xTicksPad)
      
    }

    let xBottomVElement = d3GetElement(xBottomV)
    let xBottomVElementSizes = getSizes(xBottomVElement)
    let xBottomVElementHeight = Math.ceil(xBottomVElementSizes.height)


    // --------------------------------- CHART VARIANCE : CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED  --------------------------------- //

    
    heightV = heightV - xBottomVElementHeight
    d3GetElement(yLeftV).remove()
  
    yScaleV = d3YScale(type='linear', minmax=[yMinV, yMaxV], d3range=[heightV, 0])
    d3adjustPaddingOuter(paddingYOuter, yScaleV, axis='y', type='linear')
   
    yAxisV = d3YAxis(type='left', yScaleV, yTickValuesV, yTickSize, ytickSizeOuter=null, tickFormatFunctionV)
    yLeftV = d3YElement(mainV, yAxisV, 'chart-12-left-axis-v-' + id)
  
    d3StyleAxis(Object.entries({ yLeftV }), _tickLineWidth, px11, axis='y', yTicksPad, _axisColor, _ticklabelColor)
  
    let yLeftVElementCorrected = d3GetElement(yLeftV)


    // ---------------------------------  CHART VARIANCE : AXIS PATHS  --------------------------------- //


    let axisPathV = d3CreateAxisRectangle(mainV, width, heightV, _axisRadius, _axisColor, _tickLineWidth)

    
    // ---------------------------------  CHART VARIANCE : TRANSITIONS  --------------------------------- //
    

    // y-axis
    let transformLeftVX = Math.floor(yLeftWidth)
    let transformLeftVY = 0
    yLeftVElementCorrected.setAttribute('transform', `translate(${transformLeftVX}, ${transformLeftVY})`)

    // x-axis
    let transformBottomVX = Math.floor(transformLeftVX)
    let transformBottomVY = Math.floor(transformLeftVY + heightV)
    xBottomVElement.setAttribute('transform', `translate(${transformBottomVX}, ${transformBottomVY})`)

    // axis path
    let transformAxisVX = transformBottomVX
    let transformAxisVY = transformLeftVY
    axisPathV.setAttribute('transform', `translate(${transformAxisVX}, ${transformAxisVY})`)

    chartV.attr("transform", `translate(${transformBottomVX}, ${transformLeftVY})`)


    // ---------------------------------  CHART VARIANCE : GRID  --------------------------------- //


    let gridXminV = heightV - offsetGridXV
    let gridXmaxV = offsetGridXV

    let gridYminV = width - offsetGridYV
    let gridYmaxV = offsetGridYV

    d3DrawYGrid(gridV, 'grid-left', yScaleV, yTickValuesV, gridYminV, gridYmaxV, _colorGrid, scaleType='linear')

    if (raceIDsLength > 1) {

      d3DrawXGrid(
        gridV, 'grid-bottom-light', xScale, xGridLight, gridXminV, gridXmaxV, _colorGrid, scaleType='linear')
      
      d3DrawXGrid(
        gridV, 'grid-bottom-dark-additional', xScale, xGrid, gridXminV, gridXmaxV, _colorGrid, scaleType='linear')
      
    }


    // ---------------------------------  CHART LAPS COUNT : Y-SCALE, Y-AXIS, Y-LABELS  --------------------------------- //


    let heightL = chartLHeight - offsetTopL - offsetBottomL
 
    let yScaleL = d3YScale(type='linear', minmax=[yMinL, yMaxL], d3range=[heightL, 0])
    d3adjustPaddingOuter(paddingYOuterL, yScaleL, axis='y', type='linear')

    let tickFormatFunctionYL = (x) => (Math.abs(x).toFixed(0))

    let yAxisL = d3YAxis(type='left', yScaleL, yTickValuesL, yTickSize, ytickSizeOuter=null, tickFormatFunctionYL)
    let yLeftL = d3YElement(mainL, yAxisL, 'chart-12-1-left-axis-l-' + id)

    d3StyleAxis(Object.entries({ yLeftL }), _tickLineWidth, px10, axis='y', yTicksPadL, _axisColor, _ticklabelColor)

    let yLeftLElement = d3GetElement(yLeftL)
    let yLeftLWidth = getSizes(yLeftLElement).width


    // ---------------------------------  CHART LAPS COUNT : X-SCALE, X-AXIS, X-LABELS  --------------------------------- //


    let widthL = widthLSvg - offsetLeftL - offsetRightL - yLeftLWidth

    if (raceIDsLength < 15) {
      
      paddingXOuterL = widthL / xTickValuesL.length
      
    }

    let xScaleL = d3XScale(type='linear', minmax=[xMinL, xMaxL], d3range=[0, widthL])
    d3adjustPaddingOuter(paddingXOuterL, xScaleL, axis='x', type='linear')

    let xAxisL = d3XAxis(type='bottom', xScaleL, xTickValuesL, xTickSize, xtickSizeOuter=null, tickLabelsFormat)
    let xBottomL = d3XElement(mainL, xAxisL, 'chart-12-bottom-axis-l-' + id)

    d3StyleAxis(Object.entries({ xBottomL }), _tickLineWidth, px11, axis='x', xTicksPadL, _axisColor, _ticklabelColor)

    let xBottomLabelsL = xBottomL
      .append('g')
      .attr('name', 'ticklabels')

    xBottomLabelsL
      .selectAll('text')
      .data(dataTeams)
      .join('text')
      .style('font-family', PrimaryFont)
      .style('fill', _ticklabelColor)
      .style('font-size', `${xLabelLFontSize}px`)
      .style('font-variation-settings', `'wght' ${xLabelLFontWeight}`)
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'hanging')
      .text(d => {

        let id = d['RaceID']
        let abb = dataEvents.filter(o => o['RaceID'] == id)

        if (abb.length > 0) {
          abb = abb[0]['EventAbbreviation']
        } else {
          abb = ''
        }

        return abb
        
      })
      .attr('x', (d, i) => xScaleL(xTickValuesL[i]))
      .attr('y', xTickSize + xTicksPad)

    let xBottomLElement = d3GetElement(xBottomL)
    let xBottomLElementSizes = getSizes(xBottomLElement)
    let xBottomLElementHeight = Math.ceil(xBottomLElementSizes.height)


    // --------------------------------- CHART LAPS COUNT : CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED  --------------------------------- //

    
    heightL = heightL - xBottomLElementHeight
    d3GetElement(yLeftL).remove()
  
    yScaleL = d3YScale(type='linear', minmax=[yMinL, yMaxL], d3range=[heightL, 0])
    d3adjustPaddingOuter(paddingYOuterL, yScaleL, axis='y', type='linear')
   
    yAxisL = d3YAxis(type='left', yScaleL, yTickValuesL, yTickSize, ytickSizeOuter=null, tickFormatFunctionYL)
    yLeftL = d3YElement(mainL, yAxisL, 'chart-12-left-axis-l-' + id)
  
    d3StyleAxis(Object.entries({ yLeftL }), _tickLineWidth, px10, axis='y', yTicksPadL, _axisColor, _ticklabelColor)
  
    let yLeftLElementCorrected = d3GetElement(yLeftL)


    // ---------------------------------  CHART VARIANCE : AXIS PATHS  --------------------------------- //


    let axisPathL = d3CreateAxisRectangle(mainL, widthL, heightL, _axisRadius, _axisColor, _tickLineWidth)


    // ---------------------------------  CHART LAPS COUNT : TRANSITIONS  --------------------------------- //
    

    // y-axis
    let transformLeftLX = Math.floor(yLeftLWidth)
    let transformLeftLY = 0

    yLeftLElementCorrected.setAttribute('transform', `translate(${transformLeftLX}, ${transformLeftLY})`)

    // x-axis
    let transformBottomLX = Math.floor(transformLeftLX)
    let transformBottomLY = Math.floor(transformLeftLY + heightL)
    xBottomLElement.setAttribute('transform', `translate(${transformBottomLX}, ${transformBottomLY})`)

    // axis path
    let transformAxisLX = transformBottomLX
    let transformAxisLY = transformLeftLY
    axisPathL.setAttribute('transform', `translate(${transformAxisLX}, ${transformAxisLY})`)

    chartL.attr("transform", `translate(${yLeftLWidth}, ${transformLeftLY})`)


    // ---------------------------------  CHART LAPS COUNT : GRID  --------------------------------- //


    let gridXminL = heightL - offsetGridXL
    let gridXmaxL = offsetGridXL

    let gridYminL = widthL - offsetGridYL
    let gridYmaxL = offsetGridYL

    d3DrawYGrid(gridL, 'grid-left', yScaleL, yTickValuesL, gridYminL, gridYmaxL, _colorGrid, scaleType='linear')

    if (raceIDsLength > 1) {
      d3DrawXGrid(gridL, 'grid-bottom', xScaleL, xTickValuesL, gridXminL, gridXmaxL, _colorGrid, scaleType='linear')
    }


    // ---------------------------------  CHART LAPTIMES 1 : ELEMENTS  --------------------------------- //
  
    
    let pacePelotone = chart
      .append('g')
      .attr('name', 'pace-pelotone')
  
    let selectedArea = chart
      .append('g')
      .attr('name', 'selected-area')
    
    let lines = chart
      .append('g')
      .attr('name', 'lines')
      .attr('id', seasonPaceChart12LinesID)
      // .style('transition', 'opacity 0.5s')
  
    let fillArea = chart
      .append('g')
      .attr('name', 'fill-area')
      .attr('id', seasonPaceChart12FillAreaID)

    let fillAreaScreen = chart
      .append('g')
      .attr('name', 'fill-area-screen')
      .attr('id', seasonPaceChart12FillAreaScreenID)
      .style('opacity', 0)
      .style('transition', 'opacity 0.25s')

    let meanLineEl = chart
      .append('g')
      .attr('name', 'mean-line')
      .attr('id', seasonPaceChart12MeanLineID)
      .style('opacity', 0)
      .style('transition', 'opacity 0.25s')
  
    let hoverArea = chart
      .append('g')
      .attr('name', 'hover-area')
  
    let smoother
      smoother = d3.curveCatmullRom
      // smoother = d3.curveCatmullRom.alpha(0)
      // smoother = d3.curveBasisOpen
      // smoother = d3.curveBasis
      // smoother = d3.curveCardinal
      
  
    let smootherMeanLine
      smootherMeanLine = d3.curveBundle.beta(0.75)
  
    if (active == 1) {
      d3GetElement(lines).classList.add('season-pace-chart-12-fillarea-active')
      d3GetElement(fillAreaScreen).classList.add('season-pace-chart-12-fillarea-active')
      d3GetElement(meanLineEl).classList.add('season-pace-chart-12-meanline-active')
    }


    // ---------------------------------  CHART LAPTIMES 2 : ELEMENTS  --------------------------------- //


    let pacePelotone2 = chart2
      .append('g')
      .attr('name', 'pace-pelotone')

    let barsMeanPace = chart2
      .append('g')
      .attr('name', 'bars')

    let meanLineEl2 = chart2
      .append('g')
      .attr('name', 'mean-line')


    // ---------------------------------  CHART VARIANCE : ELEMENTS  --------------------------------- //


    let zeroLineV = chartV
      .append('g')
      .attr('name', 'line')

    let barsV = chartV
      .append('g')
      .attr('name', 'bars')


    // ---------------------------------  CHART LAPS COUNT : ELEMENTS  --------------------------------- //

    
    let zeroLineL = chartL
      .append('g')
      .attr('name', 'line-zero')

    let middleLinesL = chartL
      .append('g')
      .attr('name', 'middle-lines')

    let circlesL = chartL
      .append('g')
      .attr('name', 'circles')
    

    // ---------------------------------  CHARTS BUILD  --------------------------------- //


    raceIDs.forEach((raceID, i) => {

      let dataCurrentEvent = dataLaptimes.filter(o => o['RaceID'] == raceID)

      let lapsFlowLocal = dataCurrentEvent.map(o => o['LapNumberFlow'])
      lapsFlowLocal = arrayDropDuplicates(lapsFlowLocal)

      let driverIDs = dataCurrentEvent.map(o => o['DriverID'])
      driverIDs = dropDuplicates(driverIDs)
  
      let driverID1 = driverIDs[0]
      let driverID2 = driverIDs[1]
  
      let color1
      let color2
  
      let driver1Data = dataDrivers.filter(o => o['DriverID'] == driverID1)
      let driver2Data = dataDrivers.filter(o => o['DriverID'] == driverID2)

      if (driver1Data.length > 0) {
        color1 = driver1Data[0]['Color']
      } else {
        color1 = _colorBackground
      }
      if (driver2Data.length > 0) {
        color2 = driver2Data[0]['Color']
      } else {
        color2 = _colorBackground
      }

      let dataPrepared = []

      lapsFlowLocal.forEach((lapFlow, j) => {

        let condition = (o) => o['LapNumberFlow'] == lapFlow
  
        let data1 = null
        let data2 = null
        
        let value1 = NaN
        let value2 = NaN
    
        let drawLine1 = NaN
        let drawLine2 = NaN

        let meanValue

        let betterPace
  
        let dataFiltered = dataCurrentEvent.filter(o => condition(o))
  
        let dataSplitted = Object.groupBy(dataFiltered, (item) => {
          return item['DriverID']
        })
  
        let dataSplittedKeys = Object.keys(dataSplitted)

        // data
        if (dataSplittedKeys.includes(driverID1)) {
          data1 = dataSplitted[driverID1][0]
        }
  
        if (dataSplittedKeys.includes(driverID2)) {
          data2 = dataSplitted[driverID2][0]
        }

        // values
        if (data1) { value1 = Number(data1[metric]) }
        if (data2) { value2 = Number(data2[metric]) }

        // drawLine2 (if another out and not in pit)
        if (isNaN(value1) && !data1) { drawLine2 = Number(data2[metric]) }
        else { drawLine2 = NaN }
    
        // drawLine1 if another out and not in pit
        if (isNaN(value2) && !data2) { drawLine1 = Number(data1[metric]) }
        else { drawLine1 = NaN }

        // clear values, drawLines and means conditions
        let conditionClear1 = (
          ((value1 >= maxValue) || (value1 <= minValue))
          || ((value1 < yMin) || (value1 > yMax))
        )
  
        let conditionClear2 = (
          ((value2 >= maxValue) || (value2 <= minValue))
          || ((value2 < yMin) || (value2 > yMax))
        )
  
        if (conditionClear1) {
          value1 = NaN
          drawLine1 = NaN
        }
  
        if (conditionClear2) {
          value2 = NaN
          drawLine2 = NaN
        }

        if ((data1) && (data2)) {
          meanValue = Number(data1[metricTeammateMean])
        } else {
          meanValue = NaN
        }

        let conditionClear3 = (
          ((meanValue >= maxValue) || (meanValue <= minValue))
          || ((meanValue < yMin) || (meanValue > yMax))
        )

        if (conditionClear3) {
          meanValue = NaN
        }

        if (data1) {
          betterPace = data1[metricBetterDriverID]
        } else if (data2) {
          betterPace = data2[metricBetterDriverID]
        } else {
          betterPace = NaN
        }

        dataPrepared.push({
          x: Number(lapFlow),
          y: value1,
          z: value2,
          Mean: meanValue,
          yLine: drawLine1,
          zLine: drawLine2,
          betterPaceDriverID: betterPace
        })
        
      })

      let metricMeanPrepared

      // let metricMeanNoDuplicates = objectDropDuplicatesByColumnValue(dataPrepared, 'x')
      let metricMean = dataPrepared.map(o => o['Mean'])
      let metricMeanNoNaNs = metricMean.filter(notNaN)

      let metricMeanEvent = NaN

      // if there is data for both drivers
      if (metricMeanNoNaNs.length > 1) {
        metricMeanEvent = arrayAverage(metricMeanNoNaNs)
      }

      // ------------ smooth data for mean line of chart 1 if necessary ------------ //
  
      if (smooth == 1) {
        
        let metricMeanLength = metricMean.length
        let metricMeanNoNaNsLength = metricMeanNoNaNs.length
    
        // if notNaN values more than 25%
        if (metricMeanNoNaNsLength > 0.25*metricMeanLength) {
          metricMeanPrepared = arrayFillNaNsByMean(metricMean)
        } else {
          metricMeanPrepared = new Array(metricMeanLength).fill(NaN);
        }
        
        metricMeanPrepared = arraySmooth(metricMeanPrepared, 0.5)
        
      } else {
  
        metricMeanPrepared = metricMean
          
      }

      let conditionCrossEachOther = (dataCurrent, dataPrevious) => (
        ((dataPrevious.y >= dataPrevious.z) && (dataCurrent.y < dataCurrent.z))
        || ((dataPrevious.y <= dataPrevious.z) && (dataCurrent.y > dataCurrent.z))
      )

      let dataSegments = d3getDataForColoredPathsBothMarker(dataPrepared, conditionCrossEachOther, 'betterPaceDriverID')

      let segments = copyObject(dataSegments.map(o => o['segment']))
      
      segments = segments.flat(1)
      segments = segments.filter(o => notNaN(o['Mean']))

      // ------------ chart 1 : generators ------------ //
  
      let lineGenerator1 = d3
        .line()
        .curve(smoother)
        .defined(d => notNaN(d.x) && notNaN(d.yLine))
        .x(d => xScale(d.x))
        .y(d => yScale(d.yLine))
    
      let lineGenerator2 = d3
        .line()
        .curve(smoother)
        // .defined(d => notNaN(d.x) && notNaN(d.z) && isNaN(d.y))
        .defined(d => notNaN(d.x) && notNaN(d.zLine))
        .x(d => xScale(d.x))
        .y(d => yScale(d.zLine))
    
      let fillGenerator = d3
        .area()
        .curve(smoother)
        .defined(d => notNaN(d.y) && notNaN(d.z))
        .x(d => xScale(d.x))
        .y0(d => yScale(d.y))
        .y1(d => yScale(d.z))
  
      let lineGeneratorMeanPace = d3.line()

      if (smooth == 1) {
        lineGeneratorMeanPace = lineGeneratorMeanPace.curve(smootherMeanLine)
      }
  
      lineGeneratorMeanPace = lineGeneratorMeanPace
        .defined((d, i) => notNaN(d.x) && notNaN(metricMeanPrepared[i]))
        .x(d => xScale(d.x))
        .y((d, i) => yScale(metricMeanPrepared[i]))
  
      let hoverAreaGenerator = d3
        .area()
        .curve(smoother)
        .defined((d, i) => notNaN(d.x) && notNaN(metricMeanPrepared[i]))
        .x(d => xScale(d.x))
        .y0((d, i) => yScale(metricMeanPrepared[i] + 2*yStepHover))
        .y1((d, i) => yScale(metricMeanPrepared[i] - 2*yStepHover))

      
      // ------------ chart 1 : build ------------ //

 
      dataSegments.forEach((part, k) => {

        let segment = part['segment']
        let type = part['type']
        let color_

        let driverData = dataDrivers.filter(o => o['DriverID'] == type)

        if (driverData.length > 0) {
          color_ = driverData[0]['Color']
        } else {
          color_ = NaN
        }
        
        fillArea
          .append('path')
          .attr('name', k)
          .datum(segment)
          .attr('d', fillGenerator)
          .style('fill', color_)
          .style('shape-rendering', 'geometricPrecision')

      })
      
      // line1 if no teammate data
      lines
        .append("path")
        .data([dataPrepared])
        .attr('d', lineGenerator1)
        .style('stroke', color1)
        .style('stroke-width', px1)
        .style('fill', 'none')
        .style('pointer-events', 'none')

      // line2 if no teammate data
      lines
        .append("path")
        .data([dataPrepared])
        .attr('d', lineGenerator2)
        .style('stroke', color2)
        .style('stroke-width', px1)
        .style('fill', 'none')
        .style('pointer-events', 'none')

      // screen
      fillAreaScreen
        .append('rect')
        .attr('x', offsetGridX1)
        .attr('width', width - 2*offsetGridX1)
        .attr('y', offsetGridY1)
        .attr('height', height1 - 2*offsetGridY1)
        .style('rx', '1.5rem')
        .style('shape-rendering', 'geometricPrecision')
        .style('fill', _colorBackground)

      // mean
      meanLineEl
        .append("path")
        .datum(dataPrepared)
        .attr('d', lineGeneratorMeanPace)
        .style('stroke', seasonPaceChart12MeanLineStroke)
        .style('stroke-width', px2)
        .style('fill', 'none')
        .style('pointer-events', 'none')
        .style('shape-rendering', 'geometricPrecision')

      // pace pelotone - zero line
      pacePelotone
        .append('line')
        // .attr('stroke-linecap', 'round')
        .attr('shape-rendering', 'crispEdges')
        .attr('fill', 'none')
        .attr('stroke', seasonPaceChart12PacePelotoneStroke)
        .attr('stroke-width', px1)
        .attr('x1', offsetGridX1)
        .attr('x2', width - offsetGridX1)
        .attr('y1', yScale(0) + px0_5)
        .attr('y2', yScale(0) + px0_5)

      // selected area
      if (segments.length > 2) {
  
        let selectedAreaX = xScale(firstElement(segments)['x'])
        let selectedAreaWidth = xScale(lastElement(segments)['x']) - selectedAreaX
  
        selectedArea
          .append('rect')
          .attr('id', seasonPaceChart12SelectedAreadID + '-' + raceID)
          .style('fill', seasonPaceChart12SelectedColor)
          .style('opacity', 0)
          .attr('x', selectedAreaX)
          .attr('width', selectedAreaWidth)
          .attr('y', 0)
          .attr('height', height1)
        
      }

      // // hover area
      // hoverArea
      //   .append('path')
      //   .datum(dataPrepared)
      //   .attr('d', hoverAreaGenerator)
      //   .style('shape-rendering', 'geometricPrecision')
      //   .style('cursor', 'pointer')
      //   .style('fill', 'transparent')
      //   .style('opacity', 0)
      //   .on('mousemove', (event, d) => {
  
      //     let selectedRect = getElement(seasonPaceChart12SelectedAreadID + '-' + raceID)      
      //     selectedRect.style.opacity = 0.1

      //   })
      //   .on('mouseleave', (event, d) => {
  
      //     let selectedRect = getElement(seasonPaceChart12SelectedAreadID + '-' + raceID)
      //     selectedRect.style.opacity = 0
          
      //   })

      // ------------ chart 2 : build ------------ //

      if (buildBarsChart) {
  
        // bar width for shorter intervals
        if ((raceIDsLength >= 10) & (raceIDsLength < 15)) {
          
          barWidth = px16
          barRx = px8
          
          barWidthSprint = px8
          barRxSprint = px4
          
        } else if (raceIDsLength < 10) {
          
          barWidth = px32
          barRx = px8
  
          barWidthSprint = px16
          barRxSprint = px6
          
        }
  
        let eventBarsLocal = dataEventsMiddles.filter(o => (o['RaceID'] == raceID) & (o['EventAbbMiddleMarker'] == 1))
        let dataSummaryLocal = dataTeams.filter(o => (o['RaceID'] == raceID))
  
        if (dataSummaryLocal.length > 0) {
          dataSummaryLocal = dataSummaryLocal[0]
        }
  
        let barsValue = dataSummaryLocal[metricTeammatesMeanEvent]
  
        let drawBar = (
          notNaN(barsValue)
          & (eventBarsLocal.length > 0)
        )
  
        if (drawBar) {
  
          eventBarsLocal = eventBarsLocal[0]
          
          let lapFlow = eventBarsLocal['LapNumberFlow']
          let isSprint = (lastElement(String(eventBarsLocal['RaceID'])) == 0)
          
          let barWidthLocal = (isSprint) ? barWidthSprint : barWidth
          let barWidthHalf = 0.5 * barWidthLocal
          let barRxLocal = (isSprint) ? barRxSprint : barRx
  
          let barHeight = yScale2(0) - yScale2(barsValue)
  
          // let barsX = (raceIDs.length > 1) ? xScale(lapFlow) - barWidthHalf : 0.5*width - barWidthHalf
          let barsX = xScale(lapFlow) - barWidthHalf
          let barsY = (barsValue > 0) ? yScale2(barsValue) - px1_5 : yScale2(0) + px2_5
          
          let barsHeight = (barsValue > 0) ? barHeight : -barHeight
  
          barsMeanPace
            .append('rect')
            .style('rx', barRxLocal)
            .style('fill', color)
            .style('stroke', color)
            .style('stroke-width', px1)
            .attr('x', barsX + px1)
            .attr('width', barWidthLocal)
            .attr('y', barsY)
            .attr('height', barsHeight)
  
        }
        
      } else {

        d3GetElement(chart2).classList.add('invisible')

        let imageWidth = px36
        let imageWidthHalf = 0.5 * imageWidth

        let noDataMessage = main2
          .append('g')
          .attr("transform", `translate(${yLeftWidth}, ${transformLeft2Y})`)

        noDataMessage
          .append("svg:image")
          .attr('x', 0.5 * width - imageWidthHalf)
          .attr('y', 0.5 * height2 - imageWidthHalf)
          .attr('width', imageWidth)
          // .attr('height', 24)
          .attr("xlink:href", "/img/nodata.svg")
        
      }

    })

    if (buildBarsChart) {

      // pace peloton - zero line
      pacePelotone2
        .append('line')
        .style('shape-rendering', 'crispEdges')
        // .style('stroke-linecap', 'round')
        .style('fill', 'none')
        .attr('stroke', seasonPaceChart12PacePelotoneStroke)
        .attr('stroke-width', px1)
        .attr('x1', offsetGridX2)
        .attr('x2', width - offsetGridX2)
        .attr('y1', yScale2(0) + px0_5)
        .attr('y2', yScale2(0) + px0_5)

    } else {

      barsMeanValuesAvg = '-'
      barsMeanValuesMed = '-'
      
    }

    getElement(seasonPaceChart12MeanValueID).textContent = barsMeanValuesAvg
    getElement(seasonPaceChart12MedianValueID).textContent = barsMeanValuesMed

    // ------------------------ variance chart : bars ------------------------ //

    let barsVValues = dataVariance.map(o => o['y']).filter(notNaN)

    // let buildVarianceChart = (barsVValues.length > 0)

    let barsVMeanElement = getElement(seasonPaceChart12VariationMeanID)
    let barsVMedianElement = getElement(seasonPaceChart12VariationMedianID)

    let barsVMean
    let barsVMedian

    if (buildVarianceChart) {

      barsVMean = arrayAverage(barsVValues).toFixed(3)
      barsVMedian = arrayMedian(barsVValues).toFixed(3)
      
      let barsVWidth = px4
      let barsVRx = px2

      barsV
        .selectAll('rect')
        .data(dataVariance)
        .join('rect')
        .style('rx', barsVRx)
        .style('stroke-width', px1)
        .style('stroke', d => {

          let stroke

          if ((d['better_pace_id'] == 'equal') || (d['better_pace_id'] == '-')) {
            stroke = seasonPaceChart12VarianceEqualBorder
          } else {
            stroke = dataDrivers.filter(o => o['DriverID'] == d['better_pace_id'])[0]['Color']
          }

          return stroke
          
        })
        .style('fill', d => {
  
          let fill
  
          if ((d['better_pace_id'] == 'equal') || (d['better_pace_id'] == '-')) {
            fill = _colorBackground
          } else {
            fill = dataDrivers.filter(o => o['DriverID'] == d['better_pace_id'])[0]['Color']
          }
  
          return fill
  
        })
        .attr('x', d => xScale(d['x']) - 0.5*barsVWidth + px1)
        .attr('width', barsVWidth)
        .attr('y', d => (isNaN(d['y'])) ? yScaleV(0) : yScaleV(d['y']))
        .attr('height', d => (isNaN(d['y'])) ? 0 : yScaleV(-d['y']) - yScaleV(d['y']))

      zeroLineV
        .append('line')
        // .attr('stroke-linecap', 'round')
        .attr('shape-rendering', 'crispEdges')
        .style('stroke', seasonPaceChart12PacePelotoneStroke)
        .style('stroke-width', px1)
        .attr('x1', offsetGridXV)
        .attr('x2', width - offsetGridXV)
        .attr('y1', yScaleV(0) + px0_5)
        .attr('y2', yScaleV(0) + px0_5)
      
    } else {

      d3GetElement(chartV).classList.add('invisible')

      barsVMean = '-'
      barsVMedian = '-'

      let imageWidth = px36
      let imageWidthHalf = 0.5 * imageWidth

      let noDataMessage = mainV
        .append('g')

      noDataMessage
        .append("svg:image")
        .attr('x', 0.5 * width - imageWidthHalf)
        .attr('y', 0.5 * heightV - imageWidthHalf)
        .attr('width', imageWidth)
        // .attr('height', 24)
        .attr("xlink:href", "/img/nodata.svg")
      
    }

    barsVMeanElement.textContent = barsVMean
    // barsVMeanElement.style.color = color

    barsVMedianElement.textContent = barsVMedian
    // barsVMedianElement.style.color = color
 
    // ------------------------ donut chart ------------------------ //

    if (buildDonutChart) {

      let pie = d3
        .pie()
        .value(d => d['Value'])
        // .sort(null)
        .sort((a, b) => b['DriverID'] - a['DriverID'])

      let arc = d3.arc()
        .innerRadius(radiusD * sliceD)
        .outerRadius(radiusD)
    
      let dataPie = pie(dataDonut)

      chartD
        .selectAll('path')
        .data(dataPie)
        .join('path')
        .attr('d', arc)
        .style('shape-rendering', 'geometricPrecision')
        .style('fill', d => d.data['Color'])
        .style('stroke-width', px3)
        .style('stroke', _colorBackground)
        .style('opacity', 0.9)

      getElement(seasonPaceDonutLegendID).classList.remove('invisible')
      
    } else {

      getElement(seasonPaceChartBetterLaptimesTotalLapsID).textContent = '-'
      
      getElement(seasonPaceDonutLegendID).classList.add('invisible')

      let imageWidth = px36
      let imageWidthHalf = 0.5 * imageWidth

      let noDataMessage = svgD
        .append('g')

      let svgDElement = d3GetElement(svgD)
      let svgDElementSizes = getSizes(svgDElement)
      let svgDElementWidth = svgDElementSizes.width
      
      noDataMessage
        .append("svg:image")
        .attr('x', 0.5 * svgDElementWidth - imageWidthHalf)
        .attr('y', 0.5 * svgDElementWidth - imageWidthHalf)
        .attr('width', imageWidth)
        // .attr('height', 24)
        .attr("xlink:href", "/img/nodata.svg")
      
    }

    // ------------------------ laps count chart ------------------------ //

    if (buildLapsCount) {

      eventIndexesActual.forEach((eventIndex, i) => {

        let dataCurrentIndex = dataLapsCount.filter(o => o['EventIndex'] == eventIndex)[0]
  
        // let xCoord = xScaleL(dataCurrentIndex['EventIndex'])
        let xCoord = xScaleL(i)
        
        let value1 = dataCurrentIndex['value1']
        let value2 = dataCurrentIndex['value2']
  
        let sum = value1 + value2
  
        if (notNaN(sum)) {
  
          value1 = 100 * (value1 / sum)
          value2 = 100 * (value2 / sum)
          
        } else {
  
          value1 = NaN
          value2 = NaN
          
        }
  
        if ((notNaN(value1)) && (notNaN(value2))) {
  
          let yCoord1 = yScaleL(value1)
          let yCoord2 = yScaleL(value2)
  
          let yCoordTop
          let yCoordBottom
  
          let rTop = px3_5
          let rBottom = px2
  
          let colorTop
          let colorBottom
  
          if (value1 > value2) {
  
            yCoordTop = yScaleL(value1)
            yCoordBottom = yScaleL(value2)
  
            colorTop = dataCurrentIndex['color1']
            colorBottom = seasonPaceLapsCountLightGrey
            
          } else if (value1 < value2) {
  
            yCoordTop = yScaleL(value2)
            yCoordBottom = yScaleL(value1)
  
            colorTop = dataCurrentIndex['color2']
            colorBottom = seasonPaceLapsCountLightGrey
            
          } else {
  
            yCoordTop = yScaleL(50)
            yCoordBottom = yScaleL(50)
  
            colorTop = seasonPaceLapsCountLightGrey
            colorBottom = seasonPaceLapsCountLightGrey
  
            rTop = px2
            rBottom = 0
            
          }

          // circles bottom
          circlesL
            .append('circle')
            .attr('cx', xCoord)
            .attr('cy', yCoordBottom)
            .style('r', rBottom)
            .style('fill', colorBottom)
            .classed('invisible', (rBottom == 0) ? true : false)

          // circles top
          circlesL
            .append('circle')
            .attr('cx', xCoord)
            .attr('cy', yCoordTop)
            .style('r', rTop)
            .style('fill', alphaColor(colorTop, 0.5))
            // .style('fill', shadeColor(colorTop, -0.075))
            // .style('fill', colorTop)
            // .style('fill', '#FFFFFF')
            .style('stroke-width', px2)
            .style('stroke', shadeColor(colorTop, -0.15))
            // .style('stroke', colorTop)
  
          middleLinesL
            .append('line')
            .attr('x1', xCoord)
            .attr('x2', xCoord)
            .attr('y1', yCoord1)
            .attr('y2', yCoord2)
            .style('stroke-width', px1)
            .style('stroke', seasonPaceLapsCountLightGrey)
          
        }
  
      })

      zeroLineL
        .append('line')
        .attr('shape-rendering', 'crispEdges')
        .style('stroke', seasonPaceChart12PacePelotoneStroke)
        .style('stroke-width', px1)
        .attr('x1', offsetGridXL)
        .attr('x2', widthL - offsetGridXL)
        .attr('y1', yScaleL(50) + px0_5)
        .attr('y2', yScaleL(50) + px0_5)

    // ALL DATA NOT AVAILABLE MANAGING
      
    } else {

      d3GetElement(chartL).classList.add('invisible')

      let imageWidth = px36
      let imageWidthHalf = 0.5 * imageWidth

      let noDataMessage = mainL
        .append('g')

      noDataMessage
        .append("svg:image")
        .attr('x', 0.5 * widthL - imageWidthHalf)
        .attr('y', 0.5 * heightL - imageWidthHalf)
        .attr('width', imageWidth)
        // .attr('height', 24)
        .attr("xlink:href", "/img/nodata.svg")
      
    }

    let percentElL = getElement(seasonPaceChartLapsCountAvgPercentID)
    percentElL.innerHTML = ''

    driverIDs.forEach((driverID, i) => {

      let dataPercentCurrentDriver = dataLapsCountPercent.filter(o => o['DriverID'] == driverID)[0]

      let value = dataPercentCurrentDriver['Value']
      let color = dataPercentCurrentDriver['Color']

      let valueEl = document.createElement('div')

      Object.assign(valueEl, {
        className: 'seja7d m-0',
        textContent: value,
      })

      valueEl.style.color = color

      percentElL.appendChild(valueEl)

      if (i != driverIDs.length - 1) {

        let separatorEl = document.createElement('div')

        Object.assign(separatorEl, {
          className: 'pd689v',
        })

        percentElL.appendChild(separatorEl)
            
      }
      
    })
    
  } else {

    let imageWidth = px36
    let imageWidthHalf = 0.5 * imageWidth

    d3GetElement(chart).classList.add('invisible')

    let svgElement = d3GetElement(svg)
    let svgSizes = getSizes(svgElement)
    let svgWidth = svgSizes.width
    let svgHeight = svgSizes.height

    let noDataMessage = svg
      .append('g')
      .attr("transform", `translate(${0.5 * svgWidth}, ${0.5 * svgHeight})`)

    noDataMessage
      .append("svg:image")
      .attr('x', -imageWidthHalf)
      .attr('y', -imageWidthHalf)
      .attr('width', imageWidth)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

    d3GetElement(chart2).classList.add('invisible')

    let svg2Element = d3GetElement(svg2)
    let svg2Sizes = getSizes(svg2Element)
    let svg2Width = svg2Sizes.width
    let svg2Height = svg2Sizes.height

    let noDataMessage2 = svg2
      .append('g')
      .attr("transform", `translate(${0.5 * svg2Width}, ${0.5 * svg2Height})`)

    noDataMessage2
      .append("svg:image")
      .attr('x', -imageWidthHalf)
      .attr('y', -imageWidthHalf)
      .attr('width', imageWidth)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

    getElement(seasonPaceChart12MeanValueID).textContent = '-'
    getElement(seasonPaceChart12MedianValueID).textContent = '-'

    d3GetElement(chartV).classList.add('invisible')

    let svgVElement = d3GetElement(svgV)
    let svgVSizes = getSizes(svgVElement)
    let svgVWidth = svgVSizes.width
    let svgVHeight = svgVSizes.height

    let noDataMessageV = svgV
      .append('g')
      .attr("transform", `translate(${0.5 * svgVWidth}, ${0.5 * svgVHeight})`)

    noDataMessageV
      .append("svg:image")
      .attr('x', -imageWidthHalf)
      .attr('y', -imageWidthHalf)
      .attr('width', imageWidth)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

    let barsVMeanElement = getElement(seasonPaceChart12VariationMeanID)
    let barsVMedianElement = getElement(seasonPaceChart12VariationMedianID)

    barsVMeanElement.textContent = '-'
    barsVMedianElement.textContent = '-'

    d3GetElement(chartD).classList.add('invisible')
    getElement(seasonPaceDonutLegendID).classList.add('invisible')

    let svgDElement = d3GetElement(svgD)
    let svgDSizes = getSizes(svgDElement)
    let svgDWidth = svgDSizes.width
    let svgDHeight = svgDSizes.height

    let noDataMessageD = svgD
      .append('g')
      .attr("transform", `translate(${0.5 * svgDWidth}, ${0.5 * svgDHeight})`)

    noDataMessageD
      .append("svg:image")
      .attr('x', -imageWidthHalf)
      .attr('y', -imageWidthHalf)
      .attr('width', imageWidth)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

    getElement(seasonPaceChartBetterLaptimesTotalLapsID).textContent = '-'

    d3GetElement(chartL).classList.add('invisible')

    let svgLElement = d3GetElement(svgL)
    let svgLSizes = getSizes(svgLElement)
    let svgLWidth = svgLSizes.width
    let svgLHeight = svgLSizes.height

    let noDataMessageL = svgL
      .append('g')
      .attr("transform", `translate(${0.5 * svgLWidth}, ${0.5 * svgLHeight})`)

    noDataMessageL
      .append("svg:image")
      .attr('x', -imageWidthHalf)
      .attr('y', -imageWidthHalf)
      .attr('width', imageWidth)
      // .attr('height', 24)
      .attr("xlink:href", "/img/nodata.svg")

    let percentElL = getElement(seasonPaceChartLapsCountAvgPercentID)
    percentElL.innerHTML = ''

    let dummyList = [0, 1]
    
    dummyList.forEach((driverID, i) => {

      // let dataPercentCurrentDriver = dataLapsCountPercent.filter(o => o['DriverID'] == driverID)[0]

      let value = '-'
      let color = '#BBBBBB'

      let valueEl = document.createElement('div')

      Object.assign(valueEl, {
        className: 'seja7d m-0',
        textContent: value,
      })

      valueEl.style.color = color

      percentElL.appendChild(valueEl)

      if (i < 1) {

        let separatorEl = document.createElement('div')

        Object.assign(separatorEl, {
          className: 'bnavzo',
        })

        percentElL.appendChild(separatorEl)
            
      }
      
    })
    
  }

}
















