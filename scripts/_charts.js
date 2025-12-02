

function plotTopFive(summary) {

  let metrics = ['RankStart', 'RankConsistency', 'RankPoints', 'RankPace', 'RankOvertakes']

  metrics.forEach((metric, i) => {

    let metricName = metric.replace('Rank', '')
    if (metricName == 'Pace') { metricName = 'PaceSec' }
    
    let data = summary.filter(o => o[metric] == 1)[0]

    let fullName = data['FullName']

    let metricValue = data[metricName]
    let start = data['GridPositionLabel']
    let finish = data['ClassifiedPositionLabel']

    let idt = data['DriverIDT']
    let number = data['Number']
    let team = data['Team']
    let color = data['Color']

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


// function plotMetrics(summaryData, ContainerID, PaletteD3, animation=true) {

//   let containerID = '#' + ContainerID

//   d3.select(containerID).select('svg').remove()


//   // ---------------------------------- DATA  ---------------------------------- //


//   let data = structuredClone(summaryData)
//   data = sortObject(data, 'RankPoints', ascending=true)

//   let lastPoints = data.map(d => d['Points']).map(Number)
//   lastPoints = lastElement(arrayDropNaNs(lastPoints))

//   data.forEach((d, i) => {
    
//     if (d['Points'] == 'DNC' || d['Points'] == 'DSQ') {

//       data[i]['xCoord'] = lastPoints     
//       data[i]['RankPoints'] = String(Number(data[i-1]['RankPoints']) + 1)

//     } else {
      
//       data[i]['xCoord'] = data[i]['Points']

//     }
    
//   })

//   let xMin = 0
  
//   let xMax = data.map(row => row['Points']).map(Number)
//   xMax = arrayDropNaNs(xMax)
//   xMax = Math.max(...xMax)

//   let yTickValues = data.map(row => row['RankPoints'])

//   let barWidth = px22


//   // ----------------------------------  SVG  ---------------------------------- //

  
//   // width and height
//   let containerSizes = getSizes(getElement(ContainerID))
//   let widthDiv = containerSizes.width

//   let protocolSizes = getSizes(getElement(eventRatingsProtocolID))
//   let heightDiv = protocolSizes.height

//   // equal heights of fieldsets width protocol and plot metrics
//   // getElement(eventsRatingsMetricsFieldsetID).style.height = 
//   //   getElement(eventsRatingsProtocolFieldsetID).offsetHeight

//   let margin = { top: px10, right: px10, bottom: px10, left: px40 }
  
//   let width = widthDiv - margin.left - margin.right
//   let height = heightDiv - margin.top - margin.bottom

//   let svg = d3.select(containerID)
//       // .classed('border-blue', true)
//       .append('svg')
//       .attr('id', 'svg-events-plot-metrics')
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('name', 'events-plot-metrics-main-node')
//       .attr("transform", `translate(${margin.left}, ${margin.top})`)


//   // -------------------------------  SCALES AND AXIS  ------------------------------- //
  

//   // scales
//   let xScale = d3.scaleLinear()
//       .domain([xMin, xMax])
//       .range([0, width])
      
//   let yScale = d3.scaleBand()
//       .domain(yTickValues)
//       .range([0, height])
//       .paddingInner(0.25) // barwidth adjustment

//   // axis
//   let xAxis = d3.axisBottom(xScale)
//     .tickSize(0)
//     .tickFormat('')
    
//   let yAxis = d3.axisLeft(yScale)
//     .tickSize(0)
//     .tickPadding(px15)
//     .tickFormat('')

//   svg.append('g')
//     .attr('name', 'axis-bottom')
//     .call(xAxis)
//     .call(g => g.select('.domain').remove())
  
//   svg.append("g")
//     .attr('name', 'axis-left')
//     .call(yAxis)
//     .call(g => g.select('.domain').remove())


//   // -------------------------------  BARS  ------------------------------- //
  

//   // bars
//   let bars = svg.append('g').attr('name', 'bars')
  
//   bars
//     .selectAll('rect')
//     .data(data)
//     .join('rect')
//     .style("stroke", d => saturateColor(d['Color'], 0.65))
//     // .style("stroke", d => shadeColor(d['Color'], -0.65))
//     .style("stroke-width", `${px2}px`)
//     .style('cursor', 'pointer')
//     .attr('x', xScale(0))
//     .attr('y', d => yScale(d['RankPoints']) + 0.5 * yScale.bandwidth() - 0.5 * barWidth)
//     .attr('height', barWidth)
//     .attr('width', d => xScale(d['xCoord']) - xScale(0))
//     .attr('rx', `${px5}px`)
//     .style('fill', d => saturateColor(d['Color'], 0.85))
//     .classed('theme-colors-control-img', true)
//     .on("mouseover", function(event, d) {

//       if (notMobileDevice) {

//         d3.select(this).style('opacity', colorThemesChartOpacity_1)
      
//         let row = getElement('event-table-protocol-row-' + d['Number'])
  
//         row.style.border = `1px solid ${colorThemesChartTablesRowFrameSelect}`
  
//         for (child of row.children) {
          
//           child.firstChild.firstChild.style.color = d['Color']
//           child.firstChild.firstChild.style.fontVariationSettings = "'wght' 650"
//           child.firstChild.firstChild.style.opacity = colorThemesTextOpacity
          
//         }
        
//       }

//     })
//     .on("mouseout", function(event, d) {

//       if (notMobileDevice) {

//         d3.select(this).style('opacity', '')
      
//         let row = getElement('event-table-protocol-row-' + d['Number'])
  
//         row.style.border = `1px solid ${colorThemesChartBackground}`
  
//         for (child of row.children) {
          
//           child.firstChild.firstChild.style.color = colorThemesChartFont2
//           child.firstChild.firstChild.style.fontVariationSettings = "'wght' 550"
//           child.firstChild.firstChild.style.opacity = 1
          
//         }
        
//       }
      
//     })


//   // ---------------------------  TICKS, NAMES, METRICS  --------------------------- //
  

//   // y-ticks
//   let yTicks = svg
//     .append('g')
//     .attr('name', 'ticks-left')
  
//   yTicks
//     .selectAll('text')
//     .data(data)
//     .join("text")
//     .style('font-family', PrimaryFont)
//     .style('fill', colorThemesChartAxisTickLabels)
//     .style('font-size', `${px12}px`)
//     // .style('font-weight', 700)
//     .style('font-variation-settings', "'wght' 700")
//     .style('text-anchor', 'end')
//     .style('cursor', 'deafult')
//     .style('pointer-events', 'none')
//     .style('dominant-baseline', 'central')
//     .text((d, i) => i + 1)
//     .attr("x", d => xScale(0) - px15)
//     .attr("y", d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth() + px0_5)

//   // let test = svg.append('g').attr('name', 'test')
//   // test
//   //   .append('line')
//   //   .data(data)
//   //   .attr('x1', d => xScale(0))
//   //   .attr('x2', d => xScale(10))
//   //   .attr('y1', d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())
//   //   .attr('y2', d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())
//   //   .style('stroke', '#000000')

//   // annotations fullnames
//   let names = svg.append('g').attr('name', 'annotations-names')
  
//   names
//     .selectAll('text')
//     .data(data)
//     .join("text")
//     .style('font-family', PrimaryFont)
//     .style('fill', plotMetricsAbbs)
//     .style('font-size', `${px13}px`)
//     // .style('font-weight', 700)
//     .style('font-variation-settings', "'wght' 725")
//     .style('text-anchor', 'start')
//     .style('cursor', 'deafult')
//     .style('pointer-events', 'none')
//     .style('dominant-baseline', 'central')
//     .text(d => d.FullName)
//     .attr("x", xScale(0) + px15)
//     .attr("y", d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())

//   // annotations metric
//   let metrics = svg.append('g').attr('name', 'annotations-metrics')
  
//   metrics
//     .selectAll('text')
//     .data(data)
//     .join("text")
//     .style('font-family', PrimaryFont)
//     .text(d => d.Points)
//     .style('fill', plotMetricsAbbs)
//     .style('font-size', `${px13}px`)
//     // .style('font-weight', 700)
//     .style('font-variation-settings', "'wght' 800")
//     .style('text-anchor', 'end')
//     .style('cursor', 'deafult')
//     .style('pointer-events', 'none')
//     .style('dominant-baseline', 'central')
//     .attr("x", d => xScale(d.xCoord) - px10)
//     .attr("y", d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())

//   // animation
//   // if (animation) {
//   //   svg.selectAll('rect')
//   //     .attr('width', d => xScale(0))
//   //     .transition()
//   //     .duration(1000)
//   //     .attr('x', xScale(0))
//   //     .attr('width', d => xScale(d.Points) - xScale(0))
//   //     .delay((d, i) => i*2)
//   // }
  
// }


function plotMetrics(summaryData, ContainerID, PaletteD3, animation=true) {

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // ---------------------------------- DATA  ---------------------------------- //


  let data = structuredClone(summaryData)
  data = sortObject(data, 'RankPoints', ascending=true)

  let lastPoints = data.map(d => d['Points']).map(Number)
  lastPoints = lastElement(arrayDropNaNs(lastPoints))

  data.forEach((d, i) => {
    
    if (d['Points'] == 'DNC' || d['Points'] == 'DSQ') {

      data[i]['xCoord'] = lastPoints     
      data[i]['RankPoints'] = String(Number(data[i-1]['RankPoints']) + 1)

    } else {
      
      data[i]['xCoord'] = data[i]['Points']

    }
    
  })

  let xMin = 0
  
  let xMax = data.map(row => row['Points']).map(Number)
  xMax = arrayDropNaNs(xMax)
  xMax = Math.max(...xMax)

  let yTickValues = data.map(row => row['RankPoints'])

  let barWidth = px22
  let barColoredDelta = 0


  // ----------------------------------  SVG  ---------------------------------- //

  
  // width and height
  let containerSizes = getSizes(getElement(ContainerID))
  let widthDiv = containerSizes.width

  let protocolSizes = getSizes(getElement(eventRatingsProtocolID))
  let heightDiv = protocolSizes.height

  // equal heights of fieldsets width protocol and plot metrics
  // getElement(eventsRatingsMetricsFieldsetID).style.height = 
  //   getElement(eventsRatingsProtocolFieldsetID).offsetHeight

  let margin = { top: px10, right: px10, bottom: px10, left: px40 }
  
  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  let svg = d3.select(containerID)
      // .classed('border-blue', true)
      .append('svg')
      .attr('id', 'svg-events-plot-metrics')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('name', 'events-plot-metrics-main-node')
      .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // -------------------------------  SCALES AND AXIS  ------------------------------- //
  

  // scales
  let xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, width])
      
  let yScale = d3.scaleBand()
      .domain(yTickValues)
      .range([0, height])
      .paddingInner(0.25) // barwidth adjustment

  // axis
  let xAxis = d3.axisBottom(xScale)
    .tickSize(0)
    .tickFormat('')
    
  let yAxis = d3.axisLeft(yScale)
    .tickSize(0)
    .tickPadding(px15)
    .tickFormat('')

  svg.append('g')
    .attr('name', 'axis-bottom')
    .call(xAxis)
    .call(g => g.select('.domain').remove())
  
  svg.append("g")
    .attr('name', 'axis-left')
    .call(yAxis)
    .call(g => g.select('.domain').remove())


  // -------------------------------  BARS  ------------------------------- //
  

  // bars
  let bars = svg
    .append('g')
    .attr('name', 'bars')

  let barsGrey = bars
    .append('g')
    .attr('name', 'bars-grey')

  let barsColored = bars
    .append('g')
    .attr('name', 'bars-colored')

  barsGrey
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', xScale(0))
    .attr('y', d => yScale(d['RankPoints']) + 0.5 * yScale.bandwidth() - 0.5 * barWidth)
    .attr('height', barWidth)
    .attr('width', xScale(10) - xScale(0))
    .style('fill', colorThemesChartPlotMetricsBarGrey)
    .attr('rx', `${0.5 * barWidth}px`)
    .style('stroke-width', px2)
    .style('stroke', colorThemesChartPlotMetricsBarGrey)

  barsColored
    .selectAll('rect')
    .data(data)
    .join('rect')
    .style('cursor', 'pointer')
    .attr('x', xScale(0) + barColoredDelta)
    .attr('y', d => yScale(d['RankPoints']) + 0.5 * yScale.bandwidth() - 0.5 * barWidth + barColoredDelta)
    .attr('height', barWidth - 2*barColoredDelta)
    .attr('width', d => xScale(d['xCoord']) - xScale(0))
    .style('fill', d => saturateColor(d['Color'], 0.85))
    .style('stroke-width', px2)
    .style('stroke', d => saturateColor(d['Color'], 0.75))
    .attr('rx', `${0.5 * barWidth - barColoredDelta}px`)
    .on("mouseover", function(event, d) {

      if (notMobileDevice) {

        d3.select(this).style('opacity', colorThemesChartOpacity_1)
      
        let row = getElement('event-table-protocol-row-' + d['Number'])
  
        row.style.border = `1px solid ${colorThemesChartTablesRowFrameSelect}`
  
        for (child of row.children) {
          
          child.firstChild.firstChild.style.color = d['Color']
          child.firstChild.firstChild.style.fontVariationSettings = "'wght' 650"
          child.firstChild.firstChild.style.opacity = colorThemesTextOpacity
          
        }
        
      }

    })
    .on("mouseout", function(event, d) {

      if (notMobileDevice) {

        d3.select(this).style('opacity', '')
      
        let row = getElement('event-table-protocol-row-' + d['Number'])
  
        row.style.border = `1px solid ${colorThemesChartBackground}`
  
        for (child of row.children) {
          
          child.firstChild.firstChild.style.color = colorThemesChartFont2
          child.firstChild.firstChild.style.fontVariationSettings = "'wght' 550"
          child.firstChild.firstChild.style.opacity = 1
          
        }
        
      }
      
    })


  // function rightRoundedRect(x, y, width, height, radius, kind='left') {

  //   let result

  //   if (kind == 'left') {

  //     result = "M" + (x + width) + "," + y
  //       + "h" + (radius - width)
  //       + "a" + radius + "," + radius + " 1 0 0 " + -radius + "," + radius
  //       + "v" + (height - 2 * radius)
  //       + "a" + radius + "," + radius + " 1 0 0 " + radius + "," + radius
  //       + "h" + (width - radius)
  //       + "z"
        
  //   } else if (kind == 'right') {

  //     result = "M" + x + "," + y
  //       + "h" + (width - radius)
  //       + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
  //       + "v" + (height - 2 * radius)
  //       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
  //       + "h" + (radius - width)
  //       + "z"
      
  //   }
    
  //   return result
    
  // }

  // barsColored
  //   .selectAll('path')
  //   .data(data)
  //   .join('path')
  //   .attr("d", function(d) {
  //     return rightRoundedRect(
  //       xScale(0),
  //       yScale(d['RankPoints']) + 0.5 * yScale.bandwidth() - 0.5 * barWidth,
  //       xScale(d['xCoord']) - xScale(0),
  //       barWidth,
  //       0.5 * barWidth,
  //       kind='left'
  //     )
  //   })
  //   .style('cursor', 'pointer')
  //   .style('fill', d => saturateColor(d['Color'], 0.75))


  // ---------------------------  TICKS, NAMES, METRICS  --------------------------- //
  

  // y-ticks
  let yTicks = svg
    .append('g')
    .attr('name', 'ticks-left')
  
  yTicks
    .selectAll('text')
    .data(data)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartAxisTickLabels)
    .style('font-size', `${px12}px`)
    // .style('font-weight', 700)
    .style('font-variation-settings', "'wght' 700")
    .style('text-anchor', 'end')
    .style('cursor', 'deafult')
    .style('pointer-events', 'none')
    .style('dominant-baseline', 'central')
    .text((d, i) => i + 1)
    .attr("x", d => xScale(0) - px15)
    .attr("y", d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth() + px0_5)

  // let test = svg.append('g').attr('name', 'test')
  // test
  //   .append('line')
  //   .data(data)
  //   .attr('x1', d => xScale(0))
  //   .attr('x2', d => xScale(10))
  //   .attr('y1', d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())
  //   .attr('y2', d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())
  //   .style('stroke', '#000000')

  // annotations fullnames
  let names = svg.append('g').attr('name', 'annotations-names')
  
  names
    .selectAll('text')
    .data(data)
    .join("text")
    .style('font-family', PrimaryFont)
    .style('fill', plotMetricsAbbs)
    .style('font-size', `${px13}px`)
    // .style('font-weight', 700)
    .style('font-variation-settings', "'wght' 725")
    .style('text-anchor', 'start')
    .style('cursor', 'deafult')
    .style('pointer-events', 'none')
    .style('dominant-baseline', 'central')
    .text(d => d.FullName)
    .attr("x", xScale(0) + px15)
    .attr("y", d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())

  // annotations metric
  let metrics = svg.append('g').attr('name', 'annotations-metrics')
  
  metrics
    .selectAll('text')
    .data(data)
    .join("text")
    .style('font-family', PrimaryFont)
    .text(d => d.Points)
    .style('fill', plotMetricsAbbs)
    .style('font-size', `${px13}px`)
    // .style('font-weight', 700)
    .style('font-variation-settings', "'wght' 800")
    .style('text-anchor', 'end')
    .style('cursor', 'deafult')
    .style('pointer-events', 'none')
    .style('dominant-baseline', 'central')
    .attr("x", d => xScale(d.xCoord) - px10)
    .attr("y", d => yScale(d.RankPoints) + 0.5 * yScale.bandwidth())

  // animation
  // if (animation) {
  //   svg.selectAll('rect')
  //     .attr('width', d => xScale(0))
  //     .transition()
  //     .duration(1000)
  //     .attr('x', xScale(0))
  //     .attr('width', d => xScale(d.Points) - xScale(0))
  //     .delay((d, i) => i*2)
  // }
  
}


function plotTiming(summaryData, ContainerID, partner1ID, partner2ID) {

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // -----------------------------------  DATA  ----------------------------------- //


  let data = structuredClone(summaryData)
  
  data.forEach((obj, i) => {
    if (obj['Points'] == 'DNC' || obj['Points'] == 'DSQ') {
      obj['PointsPace'] = 1
      obj['PointsConsistency'] = 2
    }
  })

  data = sortObject(data, 'RankTiming', ascending=true)

  let barsColor = fikip5
  let labelsColor = colorThemesChartDriverAbbsTimingActions
  let radius = px2_5
  let dropShadow = colorThemesChartTimingActionsShadow

  let xMin = 0.9
  let xMax = 2.1
  let yMin = 1.8
  let yMax = 4.2

  let step = 0.5


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

  let tickSize = px5
  
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


  let xBottom = svg.append('g').attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xBottomPad})`)

  xBottom
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisBottom)
    .call(g => g.select('.domain').remove())

  let xTop = svg.append('g').attr('name', 'axis-top')
    .attr("transform", `translate(0, 0)`)
  
  xTop
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisTop)
    .call(g => g.select('.domain').remove())

  let yLeft = svg.append('g').attr('name', 'axis-left')
    .attr("transform", `translate(0, 0)`)
  
  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisLeft)
    .call(g => g.select('.domain').remove())

  let yRight = svg.append('g').attr('name', 'axis-right')
    .attr("transform", `translate(${yRightPad}, 0)`)
  
  yRight
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom, xTop }), px1, px11, axis='x', px8, colorThemesChartAxisRectangle, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxisRectangle, colorThemesChartAxisTickLabels)

  xTop
    .selectAll('text')
    .style('dominant-baseline', 'auto')
    .attr('dy', '-0.5rem')

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', '0.5rem')

  // rectangle border
  svg
    .append('g')
    .attr('name', 'borders-rectangle')
    .append('rect')
    .style('fill', 'none')
    .style('stroke', colorThemesChartAxisRectangle)
    .style('stroke-width', `${px1}px`)
    .style('shape-rendering', 'crispEdges')
    .attr('x', xScale(xMin))
    .attr('y', yScale(yMax))
    .attr('height', height)
    .attr('width', width)
    // .attr('rx', '2px')


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
    // .attr('dx', '-0.5rem')

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
    // .attr('dx', '-0.5rem')
    .attr("transform", `translate(${tickSize + yLabelPad}, ${0.5 * height}) rotate(90)`)


  // ----------------------------  GRID LINES  ---------------------------- //


  let grid = svg
    .append('g')
    .attr('name', 'grid-lines')

  let gridElement = d3GetElement(grid)

  // grid horizontal line
  grid
    .append('g')
    .attr('name', 'timing-grid-horizontal-lines')
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
    .attr('id', d => 'timing-line-x-1-' + d['Number'])
    .attr("x1", xScale(xMin))
    .attr("y1", d => yScale(d['PointsConsistency']) + px0_5)
    .attr("x2", xScale(xMax))
    .attr("y2", d => yScale(d['PointsConsistency']) + px0_5)

  // grid vertical line
  grid
    .append('g')
    .attr('name', 'timing-grid-vertical-lines')
    .selectAll("line")
    .data(data)
    .join('line')
    .style('fill', 'none')
    .style('stroke', colorThemesChartGridTimingActions)
    .style('stroke-width', `${px1}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '-2')
    .style('shape-rendering', 'crispEdges')
    .style('opacity', 0.75)
    .style('visibility', 'hidden')
    .attr('id', d => 'timing-line-y-1-' + d['Number'])
    .attr("x1", d => xScale(d['PointsPace']) + px0_5)
    .attr("y1", yScale(yMin))
    .attr("x2", d => xScale(d['PointsPace']) + px0_5)
    .attr("y2", yScale(yMax))


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
    .attr("cx", d => xScale(d.PointsPace) + px0_5)
    .attr("cy", d => yScale(d.PointsConsistency) + px0_5)
    .attr("r", radius)
    .style('fill', d => shadeColor(d['Color'], 0.15))
    .style('stroke', d => shadeColor(d['Color'], -0.1))
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .style('display', d => { return (d.Points == 'DNC' || d.Points == 'DSQ') ? 'none' : 'auto'})
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

  let abbsTextDx = px10
  
  let abbsRectDx = px3
  let abbsRectHeight = px5

  abbsRect
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('height', abbsRectHeight)
    .style('fill', colorThemesChartBackground)
    // .style('fill', '#99bbff')
    .style('visibility', d => { return (d.Points == 'DNC' || d.Points == 'DSQ') ? 'hidden' : 'visible'})

  abbsText
    .selectAll("text")
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartDriverAbbsTimingActions)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsDriverAbbsWeight)
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'central')
    .style('cursor', 'pointer')
    // .style('text-shadow', '1px 1px 1px rgba(0,0,0,0.05), 1px -1px 1px rgba(255,255,255,0.1)')
    .attr('Number', d => d.Number)
    .text(d => d.Abbreviation)
    .attr("x", d => xScale(d.PointsPace) - abbsTextDx)
    .attr('y', d => yScale(d.PointsConsistency) + 0.5 * radius - 0.5)
    .style('visibility', d => { return (d.Points == 'DNC' || d.Points == 'DSQ') ? 'hidden' : 'visible'})
    .on('mousemove', (e, d) => {

      if (notMobileDevice) {

        showTooltip(e, d)
        showGrid(d['Number'])

        if (clickedDriverNumber != d['Number']) {

          let barColor = saturateColor(d['Color'], 0.75)
          // let borderColor = shadeColor(d['Color'], -0.5)
          let ticklabelColor = saturateColor(saturateColor(d['Color'], colorThemesImgSaturation), 0.75)

          let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + d['Number'])
          let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + d['Number'])

          bar1.style.fill = barColor
          bar2.style.fill = barColor

          bar1.style.stroke = barColor
          bar2.style.stroke = barColor

          let label1 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner1ID)
          let label2 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner2ID)

          label1.style.fill = ticklabelColor
          label2.style.fill = ticklabelColor
            
        }
        
      }

    })
    .on('mouseleave', (e, d) => {

      if (notMobileDevice) {

        hideTooltip(clickedDriverNumber)
        
        if (clickedDriverNumber != d['Number']) {

          hideGrid(d['Number'])

          let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + d['Number'])
          let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + d['Number'])

          bar1.style.fill = barsColor
          bar2.style.fill = barsColor

          bar1.style.stroke = barsColor
          bar2.style.stroke = barsColor

          let label1 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner1ID)
          let label2 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner2ID)

          label1.style.fill = labelsColor
          label2.style.fill = labelsColor

        }
        
      }

    })
    .on('click', (e, d) => {
      drawGridChangeOpacity(e, d)
    })


  let textElements = childrenToArray(d3GetElement(abbsText))
  let rectElements = childrenToArray(d3GetElement(abbsRect))
  
  textElements.forEach((abb, i) => {

    let abbWidth = getSizes(abb).width
    let abbHeight = getSizes(abb).height

    let rect = rectElements[i]
    let d = data[i]

    rect.setAttribute('x', xScale(d.PointsPace) - abbWidth - abbsTextDx - abbsRectDx)
    rect.setAttribute('y', yScale(d.PointsConsistency) - 0.5*abbsRectHeight)
    rect.setAttribute('width', abbWidth + 2*abbsRectDx)
    // rect.setAttribute('height', abbHeight)
    
  })


  function showGrid(number, kind='normal') {

    let lineX = getElement('timing-line-x-1-' + number)
    let lineY = getElement('timing-line-y-1-' + number)

    lineX.style.visibility = 'visible'
    lineY.style.visibility = 'visible' 

    if (kind=='full') {
      lineX.style.opacity = 1
      lineY.style.opacity = 1
    }
    
  }

  function hideGrid(number, kind='normal') {

    let lineX = getElement('timing-line-x-1-' + number)
    let lineY = getElement('timing-line-y-1-' + number)

    lineX.style.visibility = 'hidden'
    lineY.style.visibility = 'hidden' 

    if (kind=='full') {
      lineX.style.opacity = 0.75
      lineY.style.opacity = 0.75
    }
    
  }

  function clearGrid() {

    let horizontalLines = getElementsListByAttribute('name', 'timing-grid-horizontal-lines', gridElement)[0]
    horizontalLines = arrayFromChildren(horizontalLines)
    
    let verticalLines = getElementsListByAttribute('name', 'timing-grid-vertical-lines', gridElement)[0]
    verticalLines = arrayFromChildren(verticalLines)

    horizontalLines.forEach((line, i) => {
      line.style.visibility = 'hidden'
      line.style.opacity = 0.5
    })

    verticalLines.forEach((line, i) => {
      line.style.visibility = 'hidden'
      line.style.opacity = 0.5
    })
    
  }


  function clearAbbs() {

    d3.select('#driver-abbs-timing')
      .selectAll('text')
      .classed('event-categories-text-active', false)

    d3.select('#driver-abbs-timing')
      .selectAll('text')
      .classed('event-categories-text-passive', false)

    d3.select('#timing-circles-id')
      .selectAll('circle')
      .classed('circles-lighter', false)

    clickedDriverNumber = null
    
  }
  
  let drawGridChangeOpacity = function (e, d) {

    // ------------------------- additional functions ------------------------- //

    function deactivatePartnerBar(clickedDriverNumber, full=true) {

      let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + clickedDriverNumber)
      let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + clickedDriverNumber)

      let label1 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner1ID)
      let label2 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner2ID)

      if (full) {

        bar1.style.fill = barsColor
        bar2.style.fill = barsColor

        bar1.style.stroke = barsColor
        bar2.style.stroke = barsColor

        bar1.style.filter = ''
        bar2.style.filter = ''

        label1.style.fill = labelsColor
        label2.style.fill = labelsColor

        label1.classList.remove('timing-actions-tickalbel-active')
        label2.classList.remove('timing-actions-tickalbel-active')

        label1.style.filter = ''
        label2.style.filter = ''
        
      } else {

        // if not mobile - stay colored without borders
        if (notMobileDevice) {

          let barColor = saturateColor(d['Color'], 0.75)
          let ticklabelColor = saturateColor(saturateColor(d['Color'], colorThemesImgSaturation), 0.75)

          bar1.style.fill = barColor
          bar2.style.fill = barColor
  
          bar1.style.stroke = barColor
          bar2.style.stroke = barColor

          bar1.style.filter = ''
          bar2.style.filter = ''

          label1.style.fill = ticklabelColor
          label2.style.fill = ticklabelColor

          label1.classList.add('timing-actions-tickalbel-active')
          label2.classList.add('timing-actions-tickalbel-active')
  
          label1.style.filter = ''
          label2.style.filter = ''
  
        // if mobile - full deactivate
        } else {

          bar1.style.fill = barsColor
          bar2.style.fill = barsColor
  
          bar1.style.stroke = barsColor
          bar2.style.stroke = barsColor

          bar1.style.filter = ''
          bar2.style.filter = ''

          label1.style.fill = labelsColor
          label2.style.fill = labelsColor
  
          label1.classList.remove('timing-actions-tickalbel-active')
          label2.classList.remove('timing-actions-tickalbel-active')
  
          label1.style.filter = ''
          label2.style.filter = ''
          
        }
        
      }
    
    }

    function activatePartnerBar(clickedDriverNumber) {

      let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + clickedDriverNumber)
      let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + clickedDriverNumber)

      let label1 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner1ID)
      let label2 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner2ID)

      let barColor = alphaColor(d['Color'], 0.75)
      let ticklabelColor = saturateColor(d['Color'], 0.75)

      bar1.style.fill = barColor
      bar2.style.fill = barColor

      bar1.style.stroke = shadeColor(d['Color'], -0.2)
      bar2.style.stroke = shadeColor(d['Color'], -0.2)

      bar1.style.filter = dropShadow
      bar2.style.filter = dropShadow

      label1.style.fill = ticklabelColor
      label2.style.fill = ticklabelColor

      label1.classList.add('timing-actions-tickalbel-active')
      label2.classList.add('timing-actions-tickalbel-active')

      label1.style.filter = dropShadow
      label2.style.filter = dropShadow
      
    }

    function activateCurrentAbb() {

      // activate current abb
      d3.select('#driver-abbs-timing')
        .selectAll('text')
        .filter ( (n) => { return n.Number == d.Number })
        .classed('event-categories-text-active', true)
  
      // add passive for others
      d3.select('#driver-abbs-timing')
        .selectAll('text')
        .filter ( (n) => { return n.Number != d.Number })
        .classed('event-categories-text-passive', true)

      // change opacity of non-selected circles
      d3.select('#timing-circles-id')
        .selectAll('circle')
        .filter( (n) => { return n.Number !== d.Number })
        .classed('circles-lighter', true)
      
    }

    // ------------------------------- function logic ------------------------------- //

    // if there were clicked driver, deactivate his bar
    if (clickedDriverNumber) {
      deactivatePartnerBar(clickedDriverNumber, full=true)
      hideGrid(clickedDriverNumber)
    }

    // if click current abb and it's active
    if ((clickedDriverNumber == d['Number'])
        & (e.target.classList.value.includes('active'))) {

      // deactivate bar
      if (clickedDriverNumber) { deactivatePartnerBar(clickedDriverNumber, full=false) }

      // clear all abbs
      clearAbbs()

    // if click passive abb
    } else {

      // clear all abbs
      clearAbbs()

      // activate current
      activateCurrentAbb()
  
      // change clicked driver for current
      clickedDriverNumber = d['Number']
  
      // and activate his bar
      activatePartnerBar(clickedDriverNumber)

      showGrid(d['Number'], kind='full')
      
    }

  }

  getElement('svg-event-categories-chart-timing').addEventListener('mouseup', (event) => {

    if (!event.target.parentElement.parentElement.id.includes('driver-abbs-timing')
        & !event.target.id.includes('chart-bar-1')
        & (clickedDriverNumber != null)) {

      let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + clickedDriverNumber)
      let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + clickedDriverNumber)

      let label1 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner1ID)
      let label2 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner2ID)

      bar1.style.fill = barsColor
      bar2.style.fill = barsColor

      bar1.style.stroke = barsColor
      bar2.style.stroke = barsColor

      bar1.style.filter = ''
      bar2.style.filter = ''

      label1.style.fill = labelsColor
      label2.style.fill = labelsColor

      label1.classList.remove('timing-actions-tickalbel-active')
      label2.classList.remove('timing-actions-tickalbel-active')

      label1.style.filter = ''
      label2.style.filter = ''
  
      // clear all abbs
      clearAbbs()

      // clear tooltip
      hideTooltip()

      // clear grid
      clearGrid()
      
    }

  })
  

  // ----------------------------  TOOLTIP  ---------------------------- //


  let dataSorted = copyObject(data)
  dataSorted = sortObject(dataSorted, 'RankTiming', true)
  dataSorted = dataSorted[0]

  let showTooltip = function(e, d) {

    let kind = 'timing'

    let colorPrimary = saturateColor(d['Color'], 0.75)

    let name = getElement(eventCategoriesMetricsNameID + kind)
    let number = getElement(eventCategoriesMetricsNumberID + kind)
    let team = getElement(eventCategoriesMetricsTeamID + kind)
    
    let rank = getElement(eventCategoriesMetricsTotalRankID + kind)
    let points = getElement(eventCategoriesMetricsTotalPointsID + kind)
    
    let consistency = getElement(eventCategoriesMetricsConsistencyID + kind)
    let pace = getElement(eventCategoriesMetricsPaceID + kind)
    
    let rankConsistency = getElement(eventCategoriesMetricsRankConsistencyID + kind)
    let pointsConsistency = getElement(eventCategoriesMetricsPointsConsistencyID + kind)
    
    let rankPace = getElement(eventCategoriesMetricsRankPaceID + kind)
    let pointsPace = getElement(eventCategoriesMetricsPointsPaceID + kind)

    name.textContent = d['FullName']
    name.style.color = colorPrimary
    number.textContent = `#${d['Number']}`
    team.textContent = d['Team']

    rank.textContent = d['RankTiming']
    points.textContent = d['PointsTiming']

    consistency.textContent = d['Consistency']
    pace.textContent = d['PaceSec']

    rankConsistency.textContent = d['RankConsistency']
    pointsConsistency.textContent = d['PointsConsistency']

    rankPace.textContent = d['RankPace']
    pointsPace.textContent = d['PointsPace']

  }

  let hideTooltip = function(clickedDriverNumber) {

    let kind = 'timing'

    let dataLocal

    let name = getElement(eventCategoriesMetricsNameID + kind)
    let number = getElement(eventCategoriesMetricsNumberID + kind)
    let team = getElement(eventCategoriesMetricsTeamID + kind)
    
    let rank = getElement(eventCategoriesMetricsTotalRankID + kind)
    let points = getElement(eventCategoriesMetricsTotalPointsID + kind)
    
    let consistency = getElement(eventCategoriesMetricsConsistencyID + kind)
    let pace = getElement(eventCategoriesMetricsPaceID + kind)
    
    let rankConsistency = getElement(eventCategoriesMetricsRankConsistencyID + kind)
    let pointsConsistency = getElement(eventCategoriesMetricsPointsConsistencyID + kind)
    
    let rankPace = getElement(eventCategoriesMetricsRankPaceID + kind)
    let pointsPace = getElement(eventCategoriesMetricsPointsPaceID + kind)

    if (clickedDriverNumber) {
      dataLocal = data.filter(o => o['Number'] == clickedDriverNumber)[0]
    } else {
      dataLocal = dataSorted
    }

    let colorPrimary = saturateColor(dataLocal['Color'], 0.75)
    
    name.textContent = dataLocal['FullName']
    name.style.color = colorPrimary
    number.textContent = `#${dataLocal['Number']}`
    team.textContent = dataLocal['Team']

    rank.textContent = dataLocal['RankTiming']
    points.textContent = dataLocal['PointsTiming']

    consistency.textContent = dataLocal['Consistency']
    pace.textContent = dataLocal['PaceSec']

    rankConsistency.textContent = dataLocal['RankConsistency']
    pointsConsistency.textContent = dataLocal['PointsConsistency']

    rankPace.textContent = dataLocal['RankPace']
    pointsPace.textContent = dataLocal['PointsPace']
    
  }

  let clickCondition = false;
  let pointDriverNumber = null;
  let clickedDriverNumber = null;

  let changeOpacity = function(e, d) {
    
    // if now grid on and click on another driver circle
    if (pointDriverNumber !== d.Number) {
      pointDriverNumber = d.Number
    }

  // change opacity of non-selected circles
  d3.select('#timing-circles-id')
    .selectAll('circle')
    .filter ( (n) => { return n.Number !== d.Number })
    .classed('circles-lighter', true);

  // change opacity of selected circles
  d3.select('#timing-circles-id')
    .selectAll('circle')
    .filter ( (n) => { return n.Number === d.Number })
    .classed('circles-lighter', false)
    
  }

}


function plotActions(summaryData, ContainerID, partner1ID, partner2ID) {

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // -----------------------------------  DATA  ----------------------------------- //


  let data = structuredClone(summaryData)
  
  data.forEach((obj, i) => {
    if (obj['Points'] == 'DNC' || obj['Points'] == 'DSQ') {
      obj['PointsStart'] = 1
      obj['PointsOvertakes'] = 1
    }
  })

  let barsColor = fikip5
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

  let tickSize = px5
  
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

  let xTop = svg.append('g').attr('name', 'axis-top')
    .attr("transform", `translate(0, 0)`)
  
  xTop
    .append("g")
    .attr('name', 'ticks')
    .call(xAxisTop)
    .call(g => g.select('.domain').remove())

  let yLeft = svg.append('g').attr('name', 'axis-left')
    .attr("transform", `translate(0, 0)`)
  
  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisLeft)
    .call(g => g.select('.domain').remove())

  let yRight = svg.append('g').attr('name', 'axis-right')
    .attr("transform", `translate(${yRightPad}, 0)`)
  
  yRight
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight)
    .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom, xTop }), px1, px11, axis='x', px8, colorThemesChartAxisRectangle, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxisRectangle, colorThemesChartAxisTickLabels)

  xTop
    .selectAll('text')
    .style('dominant-baseline', 'auto')
    .attr('dy', '-0.5rem')

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', '0.5rem')

  // rectangle border
  svg
    .append('g')
    .attr('name', 'borders-rectangle')
    .append('rect')
    .style('fill', 'none')
    .style('stroke', colorThemesChartAxisRectangle)
    .style('stroke-width', `${px1}px`)
    .style('shape-rendering', 'crispEdges')
    .attr('x', xScale(xMin))
    .attr('y', yScale(yMax))
    .attr('height', height)
    .attr('width', width)
    // .attr('rx', '2px')


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

  let gridElement = d3GetElement(grid)

  // grid horizontal line
  grid
    .append('g')
    .attr('name', 'actions-grid-horizontal-lines')
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
    .attr('id', d => 'actions-line-x-1-' + d['Number'])
    .attr("x1", xScale(xMin))
    .attr("y1", d => yScale(d['PointsOvertakes']) + px0_5)
    .attr("x2", xScale(xMax))
    .attr("y2", d => yScale(d['PointsOvertakes']) + px0_5)

  // grid vertical line
  grid
    .append('g')
    .attr('name', 'actions-grid-vertical-lines')
    .selectAll("line")
    .data(data)
    .join('line')
    .style('fill', 'none')
    .style('stroke', colorThemesChartGridTimingActions)
    .style('stroke-width', `${px1}px`)
    .style('stroke-dasharray', '4 4')
    .style('stroke-dashoffset', '-2')
    .style('shape-rendering', 'crispEdges')
    .style('opacity', 0.75)
    .style('visibility', 'hidden')
    .attr('id', d => 'actions-line-y-1-' + d['Number'])
    .attr("x1", d => xScale(d['PointsStart']) + px0_5)
    .attr("y1", yScale(yMin))
    .attr("x2", d => xScale(d['PointsStart']) + px0_5)
    .attr("y2", yScale(yMax))


  // ----------------------------  CIRCLES  ---------------------------- //


  let circles = svg.append('g').attr('name', 'circles').attr('id', 'actions-circles-id')

  circles
    .selectAll("circle")
    .data(data)
    .join('circle')
    .style('cursor', 'default')
    .attr("cx", d => xScale(d.PointsStart) + px0_5)
    .attr("cy", d => yScale(d.PointsOvertakes) + px0_5)
    .attr("r", radius)
    .style('fill', d => shadeColor(d['Color'], 0.15))
    .style('stroke', d => shadeColor(d['Color'], -0.1))
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .style('display', d => { return (d.Points == 'DNC' || d.Points == 'DSQ') ? 'none' : 'auto'})
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

  let abbsTextDx = px10
  
  let abbsRectDx = px3
  let abbsRectHeight = px5

  abbsRect
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('height', abbsRectHeight)
    .style('fill', colorThemesChartBackground)
    // .style('fill', '#99bbff')
    .style('visibility', d => { return (d.Points == 'DNC' || d.Points == 'DSQ') ? 'hidden' : 'visible'})

  abbsText
    .selectAll("text")
    .data(data)
    .join('text')
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartDriverAbbsTimingActions)
    .style('font-size', `${px12}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsDriverAbbsWeight)
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'central')
    .style('cursor', 'pointer')
    // .style('text-shadow', '1px 1px 1px rgba(0,0,0,0.05), 1px -1px 1px rgba(255,255,255,0.1)')
    .attr('Number', d => d.Number)
    .text(d => d.Abbreviation)
    .attr("x", d => xScale(d.PointsStart) - abbsTextDx)
    .attr('y', d => yScale(d.PointsOvertakes) + 0.5 * radius - 0.5)
    .style('visibility', d => { return (d.Points == 'DNC' || d.Points == 'DSQ') ? 'hidden' : 'visible'})
    .on('mousemove', (e, d) => {

      if (notMobileDevice) {

        showTooltip(e, d)
        showGrid(d['Number'])

        if (clickedDriverNumber != d['Number']) {

          let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + d['Number'])
          let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + d['Number'])

          let label1 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner1ID)
          let label2 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner2ID)

          let barColor = saturateColor(d['Color'], 0.75)
          // let borderColor = shadeColor(d['Color'], -0.5)
          let ticklabelColor = saturateColor(saturateColor(d['Color'], colorThemesImgSaturation), 0.75)

          bar1.style.fill = barColor
          bar2.style.fill = barColor

          bar1.style.stroke = barColor
          bar2.style.stroke = barColor

          label1.style.fill = ticklabelColor
          label2.style.fill = ticklabelColor
            
        }
        
      }

    })
    .on('mouseleave', (e, d) => {

      if (notMobileDevice) {

        hideTooltip(clickedDriverNumber)
      
        if (clickedDriverNumber != d['Number']) {

          hideGrid(d['Number'])

          let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + d['Number'])
          let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + d['Number'])

          let label1 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner1ID)
          let label2 = getElementByAttribute('Number', d['Number'], 'chart-bars-1-ticklabels-' + partner2ID)

          bar1.style.fill = barsColor
          bar2.style.fill = barsColor

          bar1.style.stroke = barsColor
          bar2.style.stroke = barsColor

          label1.style.fill = labelsColor
          label2.style.fill = labelsColor
          
        }
        
      }

    })
    .on('click', (e, d) => {
      drawGridChangeOpacity(e, d)
    })

  let textElements = childrenToArray(d3GetElement(abbsText))
  let rectElements = childrenToArray(d3GetElement(abbsRect))
  
  textElements.forEach((abb, i) => {

    let abbWidth = getSizes(abb).width
    let abbHeight = getSizes(abb).height

    let rect = rectElements[i]
    let d = data[i]

    rect.setAttribute('x', xScale(d.PointsStart) - abbWidth - abbsTextDx - abbsRectDx)
    rect.setAttribute('y', yScale(d.PointsOvertakes) - 0.5*abbsRectHeight)
    rect.setAttribute('width', abbWidth + 2*abbsRectDx)
    
  })

  function showGrid(number, kind='normal') {

    let lineX = getElement('actions-line-x-1-' + number)
    let lineY = getElement('actions-line-y-1-' + number)

    lineX.style.visibility = 'visible'
    lineY.style.visibility = 'visible' 

    if (kind=='full') {
      lineX.style.opacity = 1
      lineY.style.opacity = 1
    }
    
  }

  function hideGrid(number, kind='normal') {

    let lineX = getElement('actions-line-x-1-' + number)
    let lineY = getElement('actions-line-y-1-' + number)

    lineX.style.visibility = 'hidden'
    lineY.style.visibility = 'hidden' 

    if (kind=='full') {
      lineX.style.opacity = 0.75
      lineY.style.opacity = 0.75
    }
    
  }

  function clearGrid() {

    let horizontalLines = getElementsListByAttribute('name', 'actions-grid-horizontal-lines', gridElement)[0]
    horizontalLines = arrayFromChildren(horizontalLines)
    
    let verticalLines = getElementsListByAttribute('name', 'actions-grid-vertical-lines', gridElement)[0]
    verticalLines = arrayFromChildren(verticalLines)

    horizontalLines.forEach((line, i) => {
      line.style.visibility = 'hidden'
      line.style.opacity = 0.5
    })

    verticalLines.forEach((line, i) => {
      line.style.visibility = 'hidden'
      line.style.opacity = 0.5
    })
    
  }
  
  function clearAbbs() {
  
    d3.select('#driver-abbs-actions')
      .selectAll('text')
      .classed('event-categories-text-active', false)

    d3.select('#driver-abbs-actions')
      .selectAll('text')
      .classed('event-categories-text-passive', false)

    d3.select('#actions-circles-id')
      .selectAll('circle')
      .classed('circles-lighter', false)

    clickedDriverNumber = null
    
  }
  
  let drawGridChangeOpacity = function (e, d) {

    // ------------------------- additional functions ------------------------- //

    function deactivatePartnerBar(clickedDriverNumber, full=true) {

      let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + clickedDriverNumber)
      let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + clickedDriverNumber)

      let label1 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner1ID)
      let label2 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner2ID)

      if (full) {

        bar1.style.fill = barsColor
        bar2.style.fill = barsColor

        bar1.style.stroke = barsColor
        bar2.style.stroke = barsColor

        bar1.style.filter = ''
        bar2.style.filter = ''

        label1.style.fill = labelsColor
        label2.style.fill = labelsColor

        label1.classList.remove('timing-actions-tickalbel-active')
        label2.classList.remove('timing-actions-tickalbel-active')

        label1.style.filter = ''
        label2.style.filter = ''
        
      } else {

        // if not mobile - stay colored without borders
        if (notMobileDevice) {

          let barColor = saturateColor(d['Color'], 0.75)
          let ticklabelColor = saturateColor(saturateColor(d['Color'], colorThemesImgSaturation), 0.75)

          bar1.style.fill = barColor
          bar2.style.fill = barColor
  
          bar1.style.stroke = barColor
          bar2.style.stroke = barColor
  
          bar1.style.filter = ''
          bar2.style.filter = ''

          label1.style.fill = ticklabelColor
          label2.style.fill = ticklabelColor
  
          label1.classList.add('timing-actions-tickalbel-active')
          label2.classList.add('timing-actions-tickalbel-active')
  
          label1.style.filter = ''
          label2.style.filter = ''
  
        // if mobile - full deactivate
        } else {

          bar1.style.fill = barsColor
          bar2.style.fill = barsColor
  
          bar1.style.stroke = barsColor
          bar2.style.stroke = barsColor
  
          bar1.style.filter = ''
          bar2.style.filter = ''

          label1.style.fill = labelsColor
          label2.style.fill = labelsColor
  
          label1.classList.remove('timing-actions-tickalbel-active')
          label2.classList.remove('timing-actions-tickalbel-active')
  
          label1.style.filter = ''
          label2.style.filter = ''
          
        }
        
      }
    
    }

    function activatePartnerBar(clickedDriverNumber) {

      let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + clickedDriverNumber)
      let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + clickedDriverNumber)

      let label1 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner1ID)
      let label2 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner2ID)

      let barColor = alphaColor(d['Color'], 0.75)
      let ticklabelColor = saturateColor(d['Color'], 0.75)

      bar1.style.fill = barColor
      bar2.style.fill = barColor

      bar1.style.stroke = shadeColor(d['Color'], -0.2)
      bar2.style.stroke = shadeColor(d['Color'], -0.2)

      bar1.style.filter = dropShadow
      bar2.style.filter = dropShadow

      label1.style.fill = ticklabelColor
      label2.style.fill = ticklabelColor

      label1.classList.add('timing-actions-tickalbel-active')
      label2.classList.add('timing-actions-tickalbel-active')

      label1.style.filter = dropShadow
      label2.style.filter = dropShadow
      
    }

    function activateCurrentAbb() {

      // activate current abb
      d3.select('#driver-abbs-actions')
        .selectAll('text')
        .filter ( (n) => { return n.Number == d.Number })
        .classed('event-categories-text-active', true)
  
      // add passive for others
      d3.select('#driver-abbs-actions')
        .selectAll('text')
        .filter ( (n) => { return n.Number != d.Number })
        .classed('event-categories-text-passive', true)

      // change opacity of non-selected circles
      d3.select('#actions-circles-id')
        .selectAll('circle')
        .filter ( (n) => { return n.Number !== d.Number })
        .classed('circles-lighter', true)

    }

    // ------------------------------- function logic ------------------------------- //

    // if there were clicked driver, deactivate his bar
    if (clickedDriverNumber) {
      deactivatePartnerBar(clickedDriverNumber, full=true)
      hideGrid(clickedDriverNumber)
    }

    // if click current abb and it's active
    if ((clickedDriverNumber == d['Number'])
        & (e.target.classList.value.includes('active'))) {

      // deactivate bar
      if (clickedDriverNumber) { deactivatePartnerBar(clickedDriverNumber, full=false) }

      // clear all abbs
      clearAbbs()

    // if click passive abb
    } else {

      // clear all abbs
      clearAbbs()

      // activate current
      activateCurrentAbb()
  
      // change clicked driver for current
      clickedDriverNumber = d['Number']
  
      // and activate his bar
      activatePartnerBar(clickedDriverNumber)

      showGrid(d['Number'], kind='full')
      
    }

  }

  // getElement('plot-actions').addEventListener('mouseup', (event) => {
  getElement('svg-event-categories-chart-actions').addEventListener('mouseup', (event) => {

    if (!event.target.parentElement.parentElement.id.includes('driver-abbs-actions')
        & !event.target.id.includes('chart-bar-1')
        & (clickedDriverNumber != null)) {

      let bar1 = getElement('chart-bar-1-' + partner1ID + '-' + clickedDriverNumber)
      let bar2 = getElement('chart-bar-1-' + partner2ID + '-' + clickedDriverNumber)

      let label1 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner1ID)
      let label2 = getElementByAttribute('Number', clickedDriverNumber, 'chart-bars-1-ticklabels-' + partner2ID)

      bar1.style.fill = barsColor
      bar2.style.fill = barsColor

      bar1.style.stroke = barsColor
      bar2.style.stroke = barsColor

      bar1.style.filter = ''
      bar2.style.filter = ''

      label1.style.fill = labelsColor
      label2.style.fill = labelsColor

      label1.classList.remove('timing-actions-tickalbel-active')
      label2.classList.remove('timing-actions-tickalbel-active')

      label1.style.filter = ''
      label2.style.filter = ''
  
      // clear all abbs
      clearAbbs()

      // clear tooltip
      hideTooltip()

      // clear grid
      clearGrid()
      
    }

  })
  

  // ----------------------------  TOOLTIP  ---------------------------- //


  let dataSorted = copyObject(data)
  dataSorted = sortObject(dataSorted, 'RankActions', true)
  dataSorted = dataSorted[0]

  let showTooltip = function(e, d) {

    let kind = 'actions'

    let colorPrimary = saturateColor(d['Color'], 0.75)

    let name = getElement(eventCategoriesMetricsNameID + kind)
    let number = getElement(eventCategoriesMetricsNumberID + kind)
    let team = getElement(eventCategoriesMetricsTeamID + kind)
    
    let rank = getElement(eventCategoriesMetricsTotalRankID + kind)
    let points = getElement(eventCategoriesMetricsTotalPointsID + kind)
    
    let start = getElement(eventCategoriesMetricsConsistencyID + kind)

    let startValue = d['Start']
    
    if (startValue > 0) {
      startValue = `+${startValue}`
    } else if (startValue < 0) {
      startValue = `-${Math.abs(startValue)}`
    } else {
      startValue = `${startValue}`
    }
      
    let overtakes = getElement(eventCategoriesMetricsPaceID + kind)

    let overtakesValue = d['Overtakes']
    
    if (overtakesValue > 0) {
      overtakesValue = `+${overtakesValue}`
    } else if (overtakesValue < 0) {
      overtakesValue = `-${Math.abs(overtakesValue)}`
    } else {
      overtakesValue = `${overtakesValue}`
    }
    
    let rankStart = getElement(eventCategoriesMetricsRankConsistencyID + kind)
    let pointsStart = getElement(eventCategoriesMetricsPointsConsistencyID + kind)
    
    let rankOvertakes = getElement(eventCategoriesMetricsRankPaceID + kind)
    let pointsOvertakes = getElement(eventCategoriesMetricsPointsPaceID + kind)

    name.textContent = d['FullName']
    name.style.color = colorPrimary
    number.textContent = `#${d['Number']}`
    team.textContent = d['Team']

    rank.textContent = d['RankActions']
    points.textContent = d['PointsActions']

    start.textContent = startValue
    overtakes.textContent = overtakesValue

    rankStart.textContent = d['RankStart']
    pointsStart.textContent = d['PointsStart']

    rankOvertakes.textContent = d['RankOvertakes']
    pointsOvertakes.textContent = d['PointsOvertakes']

  }

  let hideTooltip = function(clickedDriverNumber) {

    let kind = 'actions'

    let dataLocal

    let name = getElement(eventCategoriesMetricsNameID + kind)
    let number = getElement(eventCategoriesMetricsNumberID + kind)
    let team = getElement(eventCategoriesMetricsTeamID + kind)
    
    let rank = getElement(eventCategoriesMetricsTotalRankID + kind)
    let points = getElement(eventCategoriesMetricsTotalPointsID + kind)
    
    let start = getElement(eventCategoriesMetricsConsistencyID + kind)
    let overtakes = getElement(eventCategoriesMetricsPaceID + kind)
    
    let rankStart = getElement(eventCategoriesMetricsRankConsistencyID + kind)
    let pointsStart = getElement(eventCategoriesMetricsPointsConsistencyID + kind)
    
    let rankOvertakes = getElement(eventCategoriesMetricsRankPaceID + kind)
    let pointsOvertakes = getElement(eventCategoriesMetricsPointsPaceID + kind)

    if (clickedDriverNumber) {
      dataLocal = data.filter(o => o['Number'] == clickedDriverNumber)[0]
    } else {
      dataLocal = dataSorted
    }

    let colorPrimary = saturateColor(dataLocal['Color'], 0.75)

    let startValue = dataLocal['Start']
    
    if (startValue > 0) {
      startValue = `+${startValue}`
    } else if (startValue < 0) {
      startValue = `-${Math.abs(startValue)}`
    } else {
      startValue = `${startValue}`
    }

    let overtakesValue = dataLocal['Overtakes']
    
    if (overtakesValue > 0) {
      overtakesValue = `+${overtakesValue}`
    } else if (overtakesValue < 0) {
      overtakesValue = `-${Math.abs(overtakesValue)}`
    } else {
      overtakesValue = `${overtakesValue}`
    }
    
    name.textContent = dataLocal['FullName']
    name.style.color = colorPrimary
    number.textContent = `#${dataLocal['Number']}`
    team.textContent = dataLocal['Team']

    rank.textContent = dataLocal['RankActions']
    points.textContent = dataLocal['PointsActions']

    start.textContent = startValue
    overtakes.textContent = overtakesValue

    rankStart.textContent = dataLocal['RankStart']
    pointsStart.textContent = dataLocal['PointsStart']

    rankOvertakes.textContent = dataLocal['RankOvertakes']
    pointsOvertakes.textContent = dataLocal['PointsOvertakes']
    
  }

  let clickCondition = false;
  let pointDriverNumber = null;
  let clickedDriverNumber = null;

  let changeOpacity = function(e, d) {
    
    // if now grid on and click on another driver circle
    if (pointDriverNumber !== d.Number) {
      pointDriverNumber = d.Number
    }

  // change opacity of non-selected circles
  d3.select('#actions-circles-id')
    .selectAll('circle')
    .filter ( (n) => { return n.Number !== d.Number })
    .classed('circles-lighter', true);

  // change opacity of selected circles
  d3.select('#actions-circles-id')
    .selectAll('circle')
    .filter ( (n) => { return n.Number === d.Number })
    .classed('circles-lighter', false)
    
  }

}


function chartBars_1(summaryData, ContainerID, metric, chartID) {

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // ---------------------------------  DATA  --------------------------------- //


  let data = structuredClone(summaryData)
  
  if (metric == 'Start') {
    data = sortObject(data, 'RankStartChart', ascending=true)
  } else {
    data = sortObject(data, 'Rank' + metric, ascending=true)
  }

  let dataDNC = []

  data.forEach((obj, i) => {

    if (obj['Points'] == 'DSQ') {
      obj[metric] = '-'
      obj[metric + 'Normalized'] = 0
      dataDNC.push(obj)
    }

    if (metric == 'Start') {

      if (obj['Points'] == 'DNC') {
        obj[metric] = '-'
        obj[metric + 'Normalized'] = 0
        dataDNC.push(obj)
      }
      
    } else if (metric == 'Overtakes') {

      if (obj['Points'] == 'DNC') {
        obj[metric] = '-'
        obj[metric + 'Normalized'] = 0
        dataDNC.push(obj)
      }
      
    } else {

      if (obj['Points'] == 'DNC') {
        obj[metric] = '-'
        obj[metric + 'Normalized'] = 0
        dataDNC.push(obj)
      }
      
    }

    obj['Index'] = i

  })

  let labelsDict = {
    'Pace': 'Средний темп',
    'Consistency': 'Плотность',
    'Start': 'Старт',
    'Overtakes': 'Обгоны',
  }

  let yLabel = labelsDict[metric]
  
  let driverAbbs = data.map(d => d['Abbreviation'])
  let metricNormalized = metric + 'Normalized'

  let xMin = 0
  let xMax = 10

  let yMin = data.map(d => d['Index'])[0]
  let yMax = lastElement(data.map(d => d['Index']))

  let yTickValues = range(yMin, yMax+1, 1)
  
  let barWidth = px10
  // let barsPad = px8

  let titlePad = px17


  // ---------------------------------  SVG  --------------------------------- //
  

  // width and height -  of page size
  let containerSizes = getSizes(getElement(ContainerID))
  let widthDiv = Math.floor(containerSizes.width)

  let plotSizes = getSizes(getElement('plot-timing'))
  let heightDiv = Math.floor(plotSizes.width)

  let marginRight

  if ((metric == 'Overtakes') || (metric == 'Start')) {
    marginRight = px40
  } else {
    marginRight = px10
  }

  let margin = {top: px50, right: marginRight, bottom: px50, left: px60}
  
  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  let svg = d3.select(containerID)
    .append('svg')
    // .classed('border-blue', true)
    .attr('id', 'svg-event-categories-chart-bars-' + `${metric.toLowerCase()}`)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
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

  let xBottom = svg.append("g").attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${axisBottomWithPad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    .call(g => g.select('.domain').remove())

  let yLeft = svg.append("g").attr('name', 'axis-left')
    .attr("transform", `translate(${-axisLeftWithPad}, 0)`)

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom, yLeft }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)


  // ---------------------------------  LABELS  --------------------------------- //


  // title
  let title = svg
    .append('g')
    .attr('name', 'title')
  
  title
    .append('text')
    // .attr('class', 'title h-5')
    .text(yLabel)
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartHBarsTitle)
    .style('font-size', `${px16}px`)
    .style('font-variation-settings', colorThemesChartTimingActionsTitleWeightHbars)
    .style('line-height', `${px16}px`)
    .style('cursor', 'default')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle')
    .attr('x', 0.5 * width)
    .attr('y', -titlePad)

  // bars
  let bars = svg
    .append('g')
    .attr('name', 'bars')

  bars
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('fill', fikip5)
    .attr('stroke', fikip5)
    .attr('stroke-width', px2)
    .attr('shape-rendering', 'geometricPrecision')
    .attr('id', d => 'chart-bar-1-' + chartID + '-' + d['Number'])
    .attr('x', xScale(0))
    .attr('y', d => yScale(d['Index']) - 0.5 * barWidth)
    .attr('height', barWidth)
    .attr('width', d => xScale(d[metricNormalized]) - xScale(0))
    .attr('rx', px3)
    .classed('theme-colors-control-img', true)

  // start and overtakes labels
  if ((metric == 'Overtakes') || (metric == 'Start')) {

    let metrics = svg
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
          .style('fill', colorThemesChartAxisTickLabels)
          .style('font-size', `${px10}px`)
          .style('font-variation-settings', colorThemesChartTimingActionsMetricWeightHbars)
          .style('text-anchor', 'start')
          .style('dominant-baseline', 'auto')
          .style('cursor', 'default')
          .text(value)
          .attr('x', xCoord)
          .attr('y', yScale(indexMedian))
          // .attr('dx', d => (d[metric] >= 0) ? px7 : px7)
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
          .style('fill', colorThemesChartAxisTickLabels)
          .style('font-size', `${px10}px`)
          .style('font-variation-settings', colorThemesChartTimingActionsMetricWeightHbars)
          .style('text-anchor', 'start')
          .style('dominant-baseline', 'auto')
          .style('cursor', 'default')
          .attr('id', d => 'chart-bar-1-text-' + chartID + '-' + d['Number'])
          .text(value)
          .attr('x', d => xScale(d[metricNormalized]) - xScale(0) + lineOffset)
          .attr('y', d => yScale(d['Index']))
          // .attr('dx', d => (d[metric] >= 0) ? px7 : px7)
          .attr('dx', px7)
          .attr('dy', px3)
          // .style('opacity', d => (d['Points'] == 'DNC' || d['Points'] == 'DSQ') ? 0 : 1)
            
      }

    })
    
  }

  // DNC labels
  let dnc = svg
    .append('g')
    .attr('name', 'dnc-labels')

  dataDNC.forEach((obj, i) => {

    dnc
      .append('text')
      .text('-')
      // .text('DNC')
      .style('font-size', `${px14}px`)
      .style('fill', colorThemesChartAxisTickLabels)
      .style('text-anchor', 'start')
      .style('alignment-baseline', 'auto')
      // .style('alignment-baseline', 'central')
      // .style('font-variation-settings', colorThemesChartTimingActionsDriverAbbsWeightHbars)
      .style('font-variation-settings', "'wght' 700")
      .attr('x', xScale(0))
      .attr('y', yScale(obj['Index']))
      .attr('dy', px4)
      
  })

  // LABELS

  let labels = svg
    .append('g')
    .attr('name', 'labels')
    .attr('id', 'chart-bars-1-ticklabels-' + chartID)

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
    .attr('Number', d => d['Number'])
    .text(d => d['Abbreviation'])
    .attr('x', xScale(0) - axisLeftPad - labelsPad)
    .attr('y', d => yScale(d['Index']))
    .attr('dy', px5)

}


function plotComparison(ContainerID, dataLeft, dataRight, colorLeft, colorRight, linestyles=['0', '0']) {

  // data -> summary (data_2)

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  
  d3.select(containerID).select('svg').remove()


  // -----------------------------------  PARAMETERS  ----------------------------------- //


  let containerSizes = getSizes(container)
  // let width = remToPix(plotComparisonWidth)
  let width = containerSizes.width
  let height = 0.8 * width
  let center = {x: 0.5 * width, y: 0.5 * height}

  let features = [
    'ConsistencyNormalized', 'OvertakesNormalized', 'PaceNormalized', 'StartNormalized'
  ]

  let labels = [
    'ПЛОТНОСТЬ', 'ОБГОНЫ', 'ТЕМП', 'СТАРТ'
  ]

  let sides = features.length
  
  let ticks = [2, 4, 6, 8, 10]
  let grid = ticks.length + 1

  // угол между осями
  let polyangle = (Math.PI * 2) / sides

  let r = 0.5 * width
  // расстояние между центром и крайней окружностью
  let r_0 = 0.5 * r
  // расстояние между центром и самой маленькой окружностью
  let r_1 = r_0 / grid
  // длина осей
  let r_2 = r_0 + px20

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
    'tickColor': colorThemesChartAxisTickLabels,
    'fontSize': px11,
    'fontWeight': 700,
    'tickAnchors': ['end', 'end', 'end', 'end', 'end'],
    'tickDominantBaselines': ['auto', 'auto', 'auto', 'auto', 'auto'],
    'labelsFontSize': px12_5,
    'labelsFontWeight': 700,
    // 'labelsColor': '#5F6469',
    'labelsColor': colorThemesChartAxisLabels,
    'labelsTextAnchors': ['middle', 'start', 'middle', 'end'],
    'labelsDominantBaselines': ['auto', 'middle', 'hanging', 'middle'],
    'labelsTextRendering': 'auto',
    'labelsOffset': px10,
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
    .attr('width', width)
    .attr('height', height)

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

  let sameDrivers = (dataLeft['DriverIDT'] == dataRight['DriverIDT'])

  if (sameDrivers) {
    d3CircleDrawMetric(main, dataLeft, features, colorLeft, linestyles[0], scale, sides, attributes)
  } else {
    d3CircleDrawMetric(main, dataLeft, features, colorLeft, linestyles[0], scale, sides, attributes)
    d3CircleDrawMetric(main, dataRight, features, colorRight, linestyles[1], scale, sides, attributes)
  }

  d3CircleDrawMeanPoints(main, dataLeft, features, scale, sides, attributes)
 
}


// function plotLaptimes(ContainerID, laptimesData, color, kind, laptimesComparison=false, adjustCheckbox=false) {

//   let containerID = '#' + ContainerID
//   let container = getElement(ContainerID)
  
//   d3.select(containerID).selectAll("svg > *").remove()

//   // clear tooltips
//   let divs = container.querySelectorAll('div');
//   divs.forEach(div => div.remove());


//   // -------------------------------------  PARAMETERS  ------------------------------------- //

  
//   let paddingOuter = px16
//   let paddingOuterHalf = px8
  
//   let xPad = px3
//   let yPad = px3

//   let xtickSize = px4
//   let ytickSize = px3

//   let xtickOuterSize = px5
//   let ytickOuterSize = px4

//   let offsetLeft = px0
//   let offsetRight = px4
//   let offsetTop = px0

//   let driverLabelOffsetX = px10
//   let driverLabelOffsetY = px0

//   let linesOffset = px0
//   let stintLabelOffset = px0

//   let compoundPadX = px24_5
//   let compoundStrokedasharray = `${px16}`
  
//   let compoundHeight = px21
//   let compoundPadY = px0

//   let markerColorBaseAlpha = 0.85


//   // -------------------------------------  DATA  ------------------------------------- //

  
//   let name = laptimesData[0]['FullName']
//   let raceID = laptimesData[0]['RaceID']
//   let laps = laptimesData.map(row => row['LapNumber'])
//   let lapsTotal
    
//   if (laptimesComparison) {
    
//     let lapsComp = laptimesComparison.map(row => row['LapNumber'])
//     lapsTotal = laps.concat(lapsComp)

    
//   } else{
    
//     lapsTotal = laps
    
//   }

//   let lastLap = Number(Math.max(...lapsTotal))

//   let laptimesClear = laptimesData
//     .filter(d => d['LaptimeNaN'] != 1)
//     .map(d => d['Laptime'])

//   if (laptimesComparison) {

//     laptimesComparison.forEach((obj, i) => {
//       laptimesComparison[i]['Laptime'] = Number(laptimesComparison[i]['Laptime'])
//     })

//     let laptimesComp = laptimesComparison
//       .filter(d => d['LaptimeNaN'] != 1)
//       .map(d => d['Laptime'])

//     laptimesClear = laptimesClear.concat(laptimesComp)
    
//   }

//   let ySmallest = Math.min.apply(null, laptimesClear)
//   let yLargest = Math.max.apply(null, laptimesClear)

//   laptimesData.forEach((obj, i) => {

//     laptimesData[i]['Laptime'] = Number(laptimesData[i]['Laptime'])

//     if (obj['LaptimeNaN'] == 1) {
//       laptimesData[i]['Laptime'] = ySmallest
//     }
    
//   })
  
//   let dataVerticalLinesStints
  
//   dataVerticalLinesStints = laptimesData.filter(o => o['StintVerticalLine'] == 1)
//   dataVerticalLinesStints = dataVerticalLinesStints.map(row => row['LapNumber'])

//   let dataLabelsStints
  
//   dataLabelsStints = laptimesData.filter(o => o['StintLabel'] == 1 && o['StintMeanConsistency'] != '-')
  
//   dataLabelsStints = dataLabelsStints.map(o => ({
//       'LapNumber': o['LapNumber'],
//       'Consistency': o['StintMeanConsistency'],
//       'Compound': o['Compound'],
//       'CompoundColor': o['CompoundColor']
//     }))
  
//   let dataLabelsStintsLaps = dataLabelsStints.map(row => row['LapNumber'])
  
//   let dataDecorLineStints 
  
//   dataDecorLineStints = laptimesData.filter((v, i) => (v['StintDecorLineMark'] == 1) && (v['StintDecorLine'] == 1))
  
//   dataDecorLineStints = dataDecorLineStints.map(row => ({
//       'LapNumber': row['LapNumber'],
//       'Stint': row['Stint']
//     }))

//   let dataStintsToDecor = laptimesData.map(row => row['Stint'])
//   dataStintsToDecor = dropDuplicates(dataStintsToDecor)

//   let SafetyCarLeaveLaps = laptimesData.filter(o => o['SafetyCarLeave'] == 1)
//   SafetyCarLeaveLaps = SafetyCarLeaveLaps.map(o => o['LapNumber'])

//   let SafetyCarEnterLaps = laptimesData.filter(o => o['SafetyCarEnter'] == 1)
//   SafetyCarEnterLaps = SafetyCarEnterLaps.map(o => o['LapNumber'])

//   let VirtualSafetyCarLeaveLaps = laptimesData.filter(o => o['VirtualSafetyCarLeave'] == 1)
//   VirtualSafetyCarLeaveLaps = VirtualSafetyCarLeaveLaps.map(o => o['LapNumber'])

//   let VirtualSafetyCarEnterLaps = laptimesData.filter(o => o['VirtualSafetyCarEnter'] == 1)
//   VirtualSafetyCarEnterLaps = VirtualSafetyCarEnterLaps.map(o => o['LapNumber'])

//   let xMin = (isEven(lastLap)) ? 2 : 1
//   let xMax = lastLap

//   // let xtickValues = laps.filter((l) => l % 2 === 0)
//   let xtickValues = range(xMin, xMax + 2, 2)
  
//   let yStd = getStandardDeviation(laptimesClear)
//   yStd = (yStd < 1) ? 1 : yStd

//   let yMin = roundStep(ySmallest, 0.5, 'floor')
//   let yMax = roundStep(yLargest, 0.5, 'ceil')

//   // let ytickValues = generateRange(yMin, yMax, '2', res='range')

//   let ytickValuesRaw = generateRange(yMin, yMax, '2', res='range')
//   ytickValues = arrayAddMeanElementsInside(ytickValuesRaw)

//   yMin = firstElement(ytickValues)
//   yMax = lastElement(ytickValues)


//   // -------------------------------------  SVG  ------------------------------------- //
  

//   // width and height -  of page size
//   // let widthDiv = getElement(ContainerID).offsetWidth
//   // let heightDiv = widthDiv / 3.6

//   // let widthInREM = 50
//   let heightScale = 0.23
//   let widthCoeffForSprints = 0.85

//   let containerSizes = getSizes(container)
  
//   let widthDiv = Math.floor(containerSizes.width)
//   let heightDiv = Math.floor(heightScale * widthDiv)

//   // if sprint width -> 50% of standard width
//   if (lastElement(raceID) == 0) {
//     widthDiv = Math.round(widthCoeffForSprints * widthDiv)
//   }

//   // let margin = {top: px40, right: px80, bottom: px45, left: px105}
//   // let width = Math.floor(widthDiv - margin.left - margin.right)
//   // let height = Math.floor(heightDiv - margin.top - margin.bottom)

//   if (getElement(ContainerID).children.length == 0) { d3.select(containerID).append('svg') }

//   let svgID = 'svg-laptimes-' + ContainerID
  
//   let svg = d3
//     .select(containerID)
//     .selectAll('svg')
//     .classed('svg-chart', true)
//     .attr('id', svgID)
//     .attr('width', widthDiv)
//     .attr('height', heightDiv)
//     // .classed('border-blue', true)
//     // .classed('p-relative', true)

//   let main = svg
//     .append('g')
//     .attr('name', 'main')
//     .attr('id', 'svg-laptimes-main-' + ContainerID)
//     .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)
//     // .attr("transform", `translate(${margin.left}, ${margin.top})`)

//   let chart = main
//     .append('g')
//     .attr('name', 'chart')
//     .attr('id', 'svg-laptimes-chart-' + ContainerID)


//   // ---------------------------------  DRIVER LABEL --------------------------------- //


//   // driver label y-axis
//   let driverLabel = main
//     .append('g')
//     .attr('name', 'driver-label')

//   driverLabel
//     .append("text")
//     .text(name)
//     // .attr('x', 0)
//     // .attr('y', 0)
//     .style('font-family', PrimaryFont)
//     .style('fill', color)
//     .style('font-size', `${colorPlotLaptimesDriverNamesFontSize}px`)
//     .style('font-variation-settings', `'wght' ${colorPlotLaptimesDriverNamesWeight}`)
//     // .style('letter-spacing', '0.025rem')
//     .style('cursor', 'default')
//     .style('text-anchor', 'end')
//     .style('dominant-baseline', 'hanging')
//     // .attr("transform", `translate(${offsetLeft}, ${0}) rotate(-90)`)
//     .attr("transform", `rotate(-90)`)
//     // .attr("dy", -px70 - yPad - ytickSize)
//     .classed('theme-colors-control-text', true)

//   let driverLabelElement = d3GetElement(driverLabel)
//   let driverLabelElementSizes = getSizes(driverLabelElement)
//   let driverLabelWidth = Math.floor(driverLabelElementSizes.width)


//   // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //

  
//   let height = heightDiv - offsetTop - compoundHeight - xPad
  
//   let yScale = d3
//     .scaleLinear()
//     .domain([yMin, yMax])
//     .range([height, 0])

//   d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

//   let yAxisLeft = d3
//     .axisLeft(yScale)
//     .tickSize(ytickSize)
//     .tickValues(ytickValues)
//     .tickFormat(d => secToLabel(d))
//     .tickSizeOuter(ytickOuterSize)

//   let yAxisRight = d3
//     .axisRight(yScale)
//     .tickSize(ytickSize)
//     .tickValues(ytickValues)
//     .tickFormat(d => secToLabel(d))
//     .tickSizeOuter(ytickOuterSize)

//    let yLeft = main
//     .append("g")
//     .attr('name', 'axis-left')
//     // .attr('id', 'svg-laptimes-axis-left' + ContainerID)
//     // .attr("transform", `translate(${-yPad}, 0)`)

//    yLeft
//     .append('g')
//     .attr('name', 'ticks')
//     .call(yAxisLeft)
//     // .call(g => g.select('.domain').remove())

//    let yRight = main
//     .append("g")
//     .attr('name', 'axis-right')
//     // .attr("transform", `translate(${yRightWithPad}, 0)`)

//    yRight
//     .append('g')
//     .attr('name', 'ticks')
//     .call(yAxisRight)
//     // .call(g => g.select('.domain').remove())

//   d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

//   yRight
//     .selectAll('text')
//     .style('text-anchor', 'start')
//     .attr('dx', px8)

//   // d3ShowEveryNTicklabel(yLeft, 2)
//   // d3ShowEveryNTicklabel(yRight, 2)

//   let yLeftElement = d3GetElement(yLeft)
//   let yLeftSizes = getSizes(yLeftElement)
//   let yLeftWidth = Math.ceil(yLeftSizes.width)

//   let yRightElement = d3GetElement(yRight)
//   let yRightSizes = getSizes(yRightElement)
//   let yRightWidth = Math.ceil(yRightSizes.width)


//   // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //

//   let width = widthDiv - offsetLeft - driverLabelWidth - driverLabelOffsetX - yLeftWidth - yPad - yPad - yRightWidth - offsetRight 

//   let xScale = d3
//     .scaleLinear()
//     .domain([xMin, xMax])
//     .range([0, width])

//   d3adjustPaddingOuter(paddingOuter, xScale, axis='x', type='linear')

//   let xAxis = d3
//     .axisBottom(xScale)
//     .tickValues(xtickValues)
//     .tickSize(xtickSize)
//     .tickSizeOuter(xtickOuterSize)

//   let xBottom = main
//     .append("g")
//     .attr('name', 'axis-bottom')

//   xBottom
//     .append('g')
//     .attr('name', 'ticks')
//     .call(xAxis)
//     // .call(g => g.select('.domain').remove())

//   d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
//   let xBottomElement = d3GetElement(xBottom)
//   let xBottomSizes = getSizes(xBottomElement)
//   let xBottomHeight = Math.ceil(xBottomSizes.height)


//   // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //


//   height = height - compoundPadY - xBottomHeight

//   d3GetElement(yLeft).remove()
//   d3GetElement(yRight).remove()

//   yScale = d3
//     .scaleLinear()
//     .domain([yMin, yMax])
//     .range([height, 0])

//   d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

//   yAxisLeft = d3
//     .axisLeft(yScale)
//     .tickSize(ytickSize)
//     .tickValues(ytickValues)
//     .tickFormat(d => secToLabel(d))
//     .tickSizeOuter(ytickOuterSize)

//   yAxisRight = d3
//     .axisRight(yScale)
//     .tickSize(ytickSize)
//     .tickValues(ytickValues)
//     .tickFormat(d => secToLabel(d))
//     .tickSizeOuter(ytickOuterSize)

//    yLeft = main
//     .append("g")
//     .attr('name', 'axis-left')
//     .attr('id', 'svg-laptimes-axis-left-' + ContainerID)
//     // .attr("transform", `translate(${-yPad}, 0)`)

//    yLeft
//     .append('g')
//     .attr('name', 'ticks')
//     .call(yAxisLeft)
//     // .call(g => g.select('.domain').remove())

//    yRight = main
//     .append("g")
//     .attr('name', 'axis-right')
//     // .attr("transform", `translate(${yRightWithPad}, 0)`)

//    yRight
//     .append('g')
//     .attr('name', 'ticks')
//     .call(yAxisRight)
//     // .call(g => g.select('.domain').remove())

//   d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

//   yRight
//     .selectAll('text')
//     .style('text-anchor', 'start')
//     .attr('dx', px8)

//   d3ShowEveryNTicklabel(yLeft, 2)
//   d3ShowEveryNTicklabel(yRight, 2)

//   let yLeftElementCorrected = d3GetElement(yLeft)
//   let yRightElementCorrected = d3GetElement(yRight)


//   // ------------------------  TRANSITIONS  ------------------------- //

//   // y-axis left
//   let transformLeftX = Math.ceil(driverLabelWidth + driverLabelOffsetX + yLeftWidth)
//   let transformLeftY = compoundHeight + compoundPadY
//   yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

//   // y-axis right
//   let transformRightX = Math.ceil(driverLabelWidth + driverLabelOffsetX + yLeftWidth + yPad + width + yPad)
//   yRightElementCorrected.setAttribute('transform', `translate(${transformRightX}, ${transformLeftY})`)

//   // driver label
//   let driverLabelTransformTop = transformLeftY + driverLabelOffsetY
//   driverLabelElement.setAttribute('transform', `translate(${offsetLeft}, ${driverLabelTransformTop})`)

//    // x-axis
//   let transformBottomX = Math.ceil(driverLabelWidth + driverLabelOffsetX + yLeftWidth + yPad)
//   let transformBottomY = Math.ceil(compoundHeight + compoundPadY + height + xPad)
//   xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

//   // // adjust SVG height
//   // let heightAdjusted = offsetTop + height + xPad + xBottomHeight
//   // d3GetElement(svg).setAttribute('height', heightAdjusted)

//   // containers height adjust
//   // let chartContainerHeight = getElement(eventPaceTooltip1ChartID).offsetHeight
//   // getElement(eventPaceTooltip1ID).style.height = `${chartContainerHeight}px`

//   chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)


//   // -------------------------------------  GRID  ------------------------------------- //


//   // xtick every 4th lap since second lap
//   // let gridShow = range(2, xMax, 4)
//   let yGridShow = ytickValues.filter((_, index) => index % 2 == 0)

//   let gridXmin = yScale(yMin) + paddingOuterHalf
//   let gridXmax = yScale(yMax) - paddingOuterHalf

//   let gridYmin = xScale(xMin) - paddingOuterHalf
//   let gridYmax = xScale(xMax) + paddingOuterHalf

//   // let gridXmin = height
//   // let gridXmax = 0

//   // let gridYmin = 0
//   // let gridYmax = width
  
//   // grid-x
//   d3DrawXGrid(chart, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, colorThemesChartGrid, scaleType='linear')
  
//   // grid-y
//   d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, gridYmin, gridYmax, colorThemesChartGrid, scaleType='linear')


//   // ------------------------  ELEMENTS  ------------------------- //


//   // stints lines
//   let stintElements = chart
//     .append('g')
//     .attr('name', 'stint-lines')

//   let SCElements = chart
//     .append('g')
//     .attr('name', 'sc-lines')

//   let VSCElements = chart
//     .append('g')
//     .attr('name', 'vsc-lines')

//   let stintAndCompounds = main
//     .append('g')
//     .attr('name', 'stint-and-compound-labels')
//     .attr('transform', `translate(${transformBottomX}, 0)`)

//   let stintLabels = stintAndCompounds
//     .append('g')
//     .attr('name', 'stint-labels')
  
//   // stint-compound
//   let compundLabels = stintAndCompounds
//     .append('g')
//     .attr('name', 'compound-labels')
  
//   let movingAverageAndFill = chart
//     .append('g')
//     .attr('name', 'moving-average')

//   let fillArea = movingAverageAndFill
//     .append('g')
//     .attr('name', 'fill-area')
  
//   let movingAverage = movingAverageAndFill
//     .append('g')
//     .attr('name', 'moving-average')

//   let hoverGrid = chart
//       .append('g')
//       .attr('name', 'hover-grid')

//   let markers = chart
//     .append('g')
//     .attr('name', 'markers')

//   let hoverElements = chart
//       .append('g')
//       .attr('name', 'hover-elements')


//   // -------------------------------------  STINT LINES  ------------------------------------- //


//   for (lap of dataVerticalLinesStints) {

//     let xCoord = xScale(lap) + px0_5
    
//     let stintLineHideCondition = (
//       SafetyCarEnterLaps.includes(lap)
//       || VirtualSafetyCarEnterLaps.includes(lap)
//       || ((xMin == 2) & (lap == 1))
//     )
    
//     stintElements
//       .append("line")
//       // .style('stroke', '#6F767F')
//       .style('stroke', colorThemesChartStintLines)
//       .style('stroke-width', px2)
//       // .style('stroke-dasharray', '4 4')
//       .style('stroke-linecap', 'round')
//       .attr("x1", xCoord)
//       .attr("x2", xCoord)
//       // .attr("y1", 0 + 0.1 * height)
//       // .attr("y2", height - 0.1 * height)
//       .attr("y1", gridXmin - linesOffset)
//       .attr("y2", gridXmax + linesOffset + px1)
//       .style('visibility', (stintLineHideCondition) ? 'hidden' : 'visible')
//       // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
//       // .style('visibility', (SafetyCarEnterLaps.includes(lap)) ? 'hidden' : 'visible')
      

//     // stintElements
//     //   .append('text')
//     //   .text('Pit')
//     //   .style('fill', '#D2D7DC')
//     //   .style('font-size', `${px12}px`)
//     //   .style('font-weight', 700)
//     //   .style('text-anchor', 'start')
//     //   // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
//     //   .attr('x', xScale(lap) + px3)
//     //   .attr('y', 0.1 * height - px5)
//     //   .style('transform-box', 'fill-box')
//     //   // .style('transform', 'translate(50%, 0)')
//     //   .style('opacity', (lap > 1) ? 1 : 0)

//     stintElements
//       .append('text')
//       .text('PitLane')
//       .style('fill', colorThemesChartStintLines)
//       .style('font-family', PrimaryFont)
//       .style('font-size', `${px10}px`)
//       .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
//       .style('text-anchor', 'end')
//       // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
//       .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
//       .attr('dx', (SafetyCarEnterLaps.includes(lap)) ? -px47 : 0)
//       .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//       // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
//       // .style('opacity', 0.75)
//       // .style('visibility', ((SafetyCarEnterLaps.includes(lap)) | (lap < 2)) ? 'hidden' : 'visible')

//   }


//   // -------------------------------------  SC LINES  ------------------------------------- //


//   // SC enter
//   if (SafetyCarEnterLaps.length > 0) {

//     for (lap of SafetyCarEnterLaps) {

//       let xCoord = xScale(lap) + 0.5 * px1

//       SCElements
//         .append("line")
//         // .style('stroke', '#6F767F')
//         .style('stroke', colorThemesChartSCStart)
//         .style('stroke-width', px2)
//         // .style('stroke-dasharray', '4 4')
//         .style('stroke-linecap', 'round')
//         .attr("x1", xCoord)
//         .attr("x2", xCoord)
//         // .attr("y1", 0 + 0.1 * height)
//         // .attr("y2", height - 0.1 * height)
//         // .attr("y1", yScale(yMax) + px2 - linesOffset)
//         // .attr("y2", yScale(yMin) - px1 + linesOffset)
//         .attr("y1", gridXmin - linesOffset)
//         .attr("y2", gridXmax + linesOffset + px1)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
  
//       SCElements
//         .append('text')
//         .text('SC Start')
//         // .text('SC Deploy')
//         .style('font-family', PrimaryFont)
//         .style('fill', colorThemesChartSCStart)
//         .style('font-size', `${px10}px`)
//         .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
//         .style('text-anchor', 'end')
//         .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
//         // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
//         // .style('text-anchor', 'start')
//         // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
//         // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
//     }

//   }

//   // SC leaving
//   if (SafetyCarLeaveLaps.length > 0) {

//     for (lap of SafetyCarLeaveLaps) {

//       SCElements
//         .append("line")
//         // .style('stroke', '#6F767F')
//         .style('stroke', colorThemesChartSCEnd)
//         .style('stroke-width', px2)
//         // .style('stroke-dasharray', '4 4')
//         .style('stroke-linecap', 'round')
//         .attr("x1", xScale(lap) + 0.5 * px1)
//         .attr("x2", xScale(lap) + 0.5 * px1)
//         // .attr("y1", 0 + 0.1 * height)
//         // .attr("y2", height - 0.1 * height)
//         // .attr("y1", yScale(yMax) + px2 - linesOffset)
//         // .attr("y2", yScale(yMin) - px1 + linesOffset)
//         .attr("y1", gridXmin - linesOffset)
//         .attr("y2", gridXmax + linesOffset + px1)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)

//       SCElements
//         .append('text')
//         .text('SC End')
//         .style('font-family', PrimaryFont)
//         .style('fill', colorThemesChartSCEnd)
//         .style('font-size', `${px10}px`)
//         .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
//         .style('text-anchor', 'end')
//         .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
//         // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
//         // .style('text-anchor', 'start')
//         // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
//         // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
//     }
      
//   }


//   // -------------------------------------  VSC LINES  ------------------------------------- //


//   // VSC enter
//   if (VirtualSafetyCarEnterLaps.length > 0) {

//     for (lap of VirtualSafetyCarEnterLaps) {

//       let xCoord1 = xScale(lap) + 0.5 * px1

//       VSCElements
//         .append("line")
//         // .style('stroke', '#6F767F')
//         .style('stroke', colorThemesChartSCStart)
//         .style('stroke-width', px2)
//         // .style('stroke-dasharray', '4 4')
//         .style('stroke-linecap', 'round')
//         .attr("x1", xCoord1)
//         .attr("x2", xCoord1)
//         // .attr("y1", 0 + 0.1 * height)
//         // .attr("y2", height - 0.1 * height)
//         // .attr("y1", yScale(yMax) + px2 - linesOffset)
//         // .attr("y2", yScale(yMin) - px1 + linesOffset)
//         .attr("y1", gridXmin - linesOffset)
//         .attr("y2", gridXmax + linesOffset + px1)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
  
//       VSCElements
//         .append('text')
//         .text('VSC Start')
//         // .text('SC Deploy')
//         .style('font-family', PrimaryFont)
//         .style('fill', colorThemesChartSCStart)
//         .style('font-size', `${px10}px`)
//         .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
//         .style('text-anchor', 'end')
//         .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
//         // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
//         // .style('text-anchor', 'start')
//         // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
//         // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
//     }

//   }

//   // VSC leaving
//   if (VirtualSafetyCarLeaveLaps.length > 0) {

//     for (lap of VirtualSafetyCarLeaveLaps) {

//       VSCElements
//         .append("line")
//         // .style('stroke', '#6F767F')
//         .style('stroke', colorThemesChartSCEnd)
//         .style('stroke-width', px2)
//         // .style('stroke-dasharray', '4 4')
//         .style('stroke-linecap', 'round')
//         .attr("x1", xScale(lap) + 0.5 * px1)
//         .attr("x2", xScale(lap) + 0.5 * px1)
//         // .attr("y1", 0 + 0.1 * height)
//         // .attr("y2", height - 0.1 * height)
//         // .attr("y1", yScale(yMax) + px2 - linesOffset)
//         // .attr("y2", yScale(yMin) - px1 + linesOffset)
//         .attr("y1", gridXmin - linesOffset)
//         .attr("y2", gridXmax + linesOffset + px1)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)

//       VSCElements
//         .append('text')
//         .text('VSC End')
//         .style('font-family', PrimaryFont)
//         .style('fill', colorThemesChartSCEnd)
//         .style('font-size', `${px10}px`)
//         .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
//         .style('text-anchor', 'end')
//         .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
//         .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
//         // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
//         // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
//         // .style('text-anchor', 'start')
//         // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
//         // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
//     }
      
//   }


//   // -----------------------------  STINT LABELS AND COMPOUNDS  ----------------------------- //
  

//   // stint-labels
//   stintLabels
//     .selectAll("text")
//     .data(dataLabelsStints)
//     .join('text')
//     .attr('alignment-baseline', 'hanging')
//     .style('font-family', PrimaryFont)
//     .style('fill', color)
//     .style('font-size', `${px13}px`)
//     .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintConLabelsWeight}`)
//     .style('cursor', 'default')
//     .style('text-anchor', 'end')
//     .style('letter-spacing', '0.025rem')
//     // .attr('class', 'stint-label')
//     .text(d => d['Consistency'])
//     .attr("x", d => xScale(d['LapNumber']))
//     .attr('y', 0)
//     .classed('theme-colors-control-text', true)
  
//   compundLabels
//     .selectAll('circle')
//     .data(dataLabelsStints)
//     .join('circle')
//     // .style('r', px12)
//     // .attr('r', px12)
//     .style('r', px10)
//     .attr('r', px10)
//     .style('stroke', d => saturateColor(d['CompoundColor'], 0.75))
//     .style('stroke-width', px2)
//     .style('stroke-dasharray', compoundStrokedasharray)
//     .style('fill', 'none')
//     .style('opacity', 0.85)
//     // to rotate as below --> `translate(${xCoord}, ${yCoord}) rotate(45)`
//     .attr("transform", d=> `translate(${xScale(d['LapNumber']) + compoundPadX}, ${px5}) rotate(0)`)
//     .style('visibility', d => (d['Compound'] == ' ') ? 'hidden' : 'visible')
//     // .classed('theme-colors-control-img', true)
//     // .style('opacity', d => (d['Compound'] == ' ') ? 0 : 1)

//   compundLabels
//     .selectAll('text')
//     .data(dataLabelsStints)
//     .join('text')
//     .attr('alignment-baseline', 'hanging')
//     .style('font-family', PrimaryFont)
//     .style('fill', '#5F6469')
//     .style('font-size', `${px10}px`)
//     .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintCompoundLabelsWeight}`)
//     .style('text-anchor', 'middle')
//     .style('dominant-baseline', 'middle')
//     .style('cursor', 'default')
//     .text(d => d['Compound'])
//     .attr("x", d => xScale(d['LapNumber']) + compoundPadX)
//     .attr('y', 0)
//     .style('visibility', d => (d['Compound'] == ' ') ? 'hidden' : 'visible')
//     // .classed('theme-colors-control-img', true)
//     // .style('opacity', d => (d['Compound'] == ' ') ? 0 : 1)


//   // ---------------------------------  MOVING AVERAGE  --------------------------------- //

  
//   let fillAreaLine = d3.area()
//     // .curve(d3.curveBumpX)
//     // .curve(d3.curveMonotoneX)
//     .curve(d3.curveCatmullRom.alpha(0.5))
//     .defined(d => d['Laptime'])
//     // .defined(d => d['LaptimeClearPace'] != '-')
//     .defined((d, i) => {

//       // not fill area of alone laptimes
//       let result = false

//       // not first and last index
//       if ((i > 0) & (i != laptimesData.length - 1)) {

//         // ma exists in current point and currnt point is not stand alone laptime
//         result = (
//           (d['LaptimeClearPace'] != '-')
//           && (laptimesData[i-1]['LaptimeClearPace'] != '-') | (laptimesData[i+1]['LaptimeClearPace'] != '-')
//         )

//       // for last index
//       } else if ((i > 0) & (i == laptimesData.length - 1)) {

//         // ma exist and previous laptime exist
//         result = (
//           (d['LaptimeClearPace'] != '-')
//           && (laptimesData[i-1]['LaptimeClearPace'] != '-')
//         )
        
//       }

//       return result
      
//     })
//     .x(d => xScale(d['LapNumber']))
//     .y0(d => yScale(d['LaptimeClearPace']))
//     .y1(d => yScale(d['Laptime']))

//   let movingAverageLine = d3.line()
//     // .curve(d3.curveBumpX)
//     // .curve(d3.curveMonotoneX)
//     .curve(d3.curveCatmullRom.alpha(0.5))
//     .defined(d => d['LaptimeClearPace'] != '-')
//     .x(d => xScale(d['LapNumber']))
//     .y(d => yScale(d['LaptimeClearPace']))

//   // fill area
//   fillArea
//     .append('path')
//     .datum(laptimesData)
//     .style('fill', colorThemesChartMovingAverageFill)
//     .style('stroke-width', px1)
//     .style('stroke', colorThemesChartMovingAverageStroke)
//     .style('shape-rendering', 'geometricPrecision')
//     .attr('d', fillAreaLine)

//   // moving average line
//   movingAverage
//     .append("path")
//     .style('fill', 'none')
//     .style('stroke', colorThemesChartMovingAverage)
//     .style('stroke-width', convertRemToPixels(0.15))
//     .data([laptimesData])
//     .attr('d', movingAverageLine)


//   // ----------------------------------  HOVER PART 1 - GRID LINES ---------------------------------- //


//   if (notMobileDevice) {

//     hoverGrid
//       .append('g')
//       .attr('name', 'grid-x')
//       .selectAll('line')
//       .data(laptimesData)
//       .join('line')
//       .attr('x1', d => xScale(d['LapNumber']) + px0_5)
//       .attr('x2', d => xScale(d['LapNumber']) + px0_5)
//       .attr('y1', yScale(yMax) + px1 - linesOffset)
//       .attr('y2', yScale(yMin) + linesOffset)
//       .style('visibility', d => (d['LaptimeNaN'] == 1) ? 'hidden' : 'visible')
//       .style('stroke', colorThemesChartGridTimingActions)
//       .style('stroke-width', px1)
//       .style('stroke-dasharray', '4 2')
//       .style('stroke-dashoffset', '2')
//       .style('shape-rendering', 'crispEdges')
//       .style('opacity', 0)
//       .attr('plot-laptimes-grid-hover', (d, i) => i)

//     hoverGrid
//       .append('g')
//       .attr('name', 'grid-y')
//       .selectAll('line')
//       .data(laptimesData)
//       .join('line')
//       .attr('x1', xScale(xMin) + px1 - linesOffset)
//       .attr('x2', xScale(xMax) + linesOffset)
//       .attr('y1', (d, i) => (d['LaptimeNaN'] == 1) ? yScale(yMin) : yScale(d['Laptime']))
//       .attr('y2', (d, i) => (d['LaptimeNaN'] == 1) ? yScale(yMin) : yScale(d['Laptime']))
//       .style('visibility', d => (d['LaptimeNaN'] == 1) ? 'hidden' : 'visible')
//       .style('stroke', colorThemesChartGridTimingActions)
//       .style('stroke-width', px1)
//       .style('stroke-dasharray', '4 2')
//       .style('stroke-dashoffset', '2')
//       .style('shape-rendering', 'crispEdges')
//       .style('opacity', 0)
//       .attr('plot-laptimes-grid-hover', (d, i) => i)
    
//   }

  
//   // ------------------------------------  MARKERS  ------------------------------------ //


//   let radius

//   if (window.innerWidth < 450) {
//     radius = px8
//   } else if ((window.innerWidth > 450) && (window.innerWidth <= 1000)) {
//     radius = px12
//   } else if (window.innerWidth > 1000) {
//     radius = px20
//   }

//   let symbol = d3.symbol().type((d) => {
//     if (d['Overtakes'] == '0.0') {
//       return d3.symbolCircle
//     }
//     else if (d['Overtakes'] == '') {
//       return d3.symbolCircle
//     }
//     else {
//       return d3.symbolTriangle2
//     }
//   })
  
//   let transform = (d) => {
//     if (Number(d['Overtakes']) < 0) { return `rotate(180)` } else { return `rotate(0)` }
//   }

//   // if overtakes or lost more than 1 -> size of triangle multiple by 2.5
//   let size
  
//   size = (d) => {

//     let result

//     if (Math.abs(Number(d['Overtakes'])) > 1) {
//       result = 2.5*radius
//     } else {
//       result = radius
//     }
//     return result
//     // return radius + 0.5*Math.abs(radius * Number(d['Overtakes']))
//   }

//   // // to mark outliers - change their size
//   // size = (d) => {

//   //   let result
    
//   //   if (d['LaptimeOutlier'] == 1) {
//   //     result = radius + 20
//   //   } else {
//   //     result = radius + 0.5*Math.abs(radius * Number(d.Overtakes))
//   //   }

//   //   return result

//   // }

//   // laptimes.forEach((laptime, i) => { if (isNaN(laptime)) {laptimes[i] = ySmallest} })

//   // laptimesData.forEach((obj, i) => {

//   //   if (obj['LaptimeNaN'] == 1) {
//   //     laptimes[i] = ySmallest
//   //   }
    
//   // })

//   markers
//     .selectAll("circle.marker")
//     .data(laptimesData)
//     .join("g")
//     .attr('class', 'marker')
//     .attr("transform", (d, i) => `translate(${xScale(d['LapNumber']) + px0_5}, ${yScale(d['Laptime'])})`)
//     .append("path")
//     .style('shape-rendering', 'geometricPrecision')
//     .attr("d", symbol.size(size))
//     .attr("transform", transform)
//     // .style("fill", color)
//     .style("fill", alphaColor(color, markerColorBaseAlpha))
//     .style('stroke', shadeColor(color, -0.2))
//     // .style('stroke', saturateColor(color, 0.75))
//     .style('stroke-width', px1_5)
//     .style('opacity', d => (d['LaptimeNaN'] == 1) ? 0 : 1)
//     .style('transition', 'all 1s')
//     .attr('plot-laptimes-1-mistake', d => (d['LaptimeMistake'] == 1) ? 1 : 0)
//     .attr('plot-laptimes-element-hover', (d, i) => i)
//     .attr('color', color)
//     // .classed('theme-colors-control-text', true)
//     // // to mark outliers
//     // .style('fill', d => (d['LaptimeOutlier'] == 1) ? '#FFFFFF' : color)
//     // .style('stroke', d => (d['LaptimeOutlier'] == 1) ? '#C0C5C9' : shadeColor(color, -0.2))
//     // .style('stroke-width', d => (d['LaptimeOutlier'] == 1) ? 2 : 1)


//   // ------------------------------------  HOVER PART 2  ------------------------------------ //


//   if (notMobileDevice) {
  
//     hoverElements
//       .append('g')
//       .attr('name', 'circles')
//       .selectAll('circle')
//       .data(laptimesData)
//       .join('circle')
//       .attr('cx', d => xScale(d['LapNumber']) + px0_5)
//       .attr('cy', d => yScale(d['Laptime']))
//       .attr('r', px6)
//       .style('r', px6)
//       .style("fill", 'transparent')
//       .style('stroke', 'transparent')
//       .style('stroke-width', px2)
//       .style('opacity', d => (d['LaptimeNaN'] == 1) ? 0 : 1)
//       .attr('plot-laptimes-element-hover', (d, i) => i)
//       .attr('color', d => d['Color'])
//       .attr('value', d => d['Laptime'])
//       .attr('abb', d => d['Abbreviation'])
//       .attr('laptime-notna', d => (d['LaptimeNaN'] == 1) ? 0 : 1)
//       .attr('kind', kind)
//       .attr('compound', d => d['Compound'])
//       .attr('tyrelife', d => d['TyreLife'])
//       .attr('xcoord', d => xScale(d['LapNumber']))
//       .attr('ycoord', d => yScale(d['Laptime']))
//       .attr('laptimediff', d => d['LaptimeDiff'])
//       .attr('position', d => d['Position'])
//       .classed('theme-colors-control-img', true)
      
//     let rectHeight = px30
//     let rectWidth = Math.ceil(0.5 * d3GetBandwidthLinear(xBottom))

//     hoverElements
//       .append('g')
//       .attr('name', 'rectangles')
//       .selectAll('rect')
//       .data(laptimesData)
//       .join('rect')
//       .attr('x', o => xScale(o['LapNumber']) - 0.5*rectWidth)
//       .attr('y', o => yScale(o['Laptime']) - 0.5*rectHeight)
//       .attr('width', o => (o['LaptimeNaN'] == 1) ? 0 : rectWidth)
//       .attr('height', o => (o['LaptimeNaN'] == 1) ? 0 : rectHeight)
//       .style('cursor', 'pointer')
//       .style('fill', 'transparent')
//       // .style('fill', '#8EACD0')
//       .on('mouseenter', function(event, d) {
  
//         let idx = laptimesData.indexOf(d)
    
//         let grids = getElementsListByAttribute('plot-laptimes-grid-hover', idx)
//         grids.forEach((grid, i) => {
//           grid.style.opacity = 1
//         })
  
//         showTooltip(event, d, idx)
        
//       })
//       .on('mouseleave', function(event, d) {
  
//         let idx = laptimesData.indexOf(d)
  
//         let grids = getElementsListByAttribute('plot-laptimes-grid-hover', idx)
//         grids.forEach((grid, i) => {
//           grid.style.opacity = 0
//         })

//         hideTooltip(event, d, idx)

//       })
    
//   }


//   // ----------------------------- TOOLTIP ----------------------------- //

  
//   let tooltip
//   let showTooltip
//   let hideTooltip

//   let svgElement = d3GetElement(svg)
//   let svgSizes = getSizes(svgElement)

//   // let chartElement = d3GetElement(chart)
//   // let chartSizes = getSizes(chartElement)

//   let svgLeft = svgSizes.left - getSizes(getElement(ContainerID)).left

//   if (notMobileDevice) {

//     tooltip = d3
//       .select(containerID)
//       .append('div')
//       .classed('tooltip p-absolute', true)

//     let tooltipElement = d3GetElement(tooltip)
  
//     showTooltip = function(event, d, idx) {
  
//       let data = {
//         'left': {name: null, laptime: null, color: null, compound: null, tyrelife: null},
//         'right': {name: null, laptime: null, color: null, compound: null, tyrelife: null},
//       }
  
//       let elementsHover = getElementsListByAttribute('plot-laptimes-element-hover', idx)

//       let rectHover = []
//       let circlesHover = []
//       let markersHover = []

//       elementsHover.forEach((element, i) => {

//         if (element['tagName'] == 'circle') {
//           circlesHover.push(element)
//         } else if (element['tagName'] == 'rect') {
//           rectHover.push(element)
//         } else if (element['tagName'] == 'path') {
//           markersHover.push(element)
//         }

//       })

//       rectHover.forEach((rect, i) => {
//         rect.style.fill = alphaColor(rect.getAttribute('color'), 0.5, colorThemesChartBackground)
//         rect.style.stroke = alphaColor(rect.getAttribute('color'), 0.75, colorThemesChartBackground)
//       })

//       // markersHover.forEach((marker, i) => {
//       //   marker.style.fill = marker.getAttribute('color')
//       //   marker.style.transition = 'none'
//       // })
      
//       circlesHover.forEach((circle, i) => {
  
//         let kind = circle.getAttribute('kind')
//         let notna = circle.getAttribute('laptime-notna') == 1
//         let laptime = circle.getAttribute('value')
  
//         if (kind == 'left') {
  
//           data['left']['name'] = circle.getAttribute('abb')
//           data['left']['color'] = circle.getAttribute('color')
//           data['left']['tyrelife'] = circle.getAttribute('tyrelife')
//           data['left']['xcoord'] = Number(circle.getAttribute('xcoord')) + transformBottomX + offsetLeft + svgLeft
//           data['left']['ycoord'] = Number(circle.getAttribute('ycoord')) + transformLeftY + offsetTop
//           data['left']['laptimediff'] = circle.getAttribute('laptimediff')
//           data['left']['position'] = circle.getAttribute('position')

//           let compound = circle.getAttribute('compound')

//           if (compound != null) {

//             if (compound.trim().length == 0) {
//               data['left']['compound'] = '-'
//             } else {
//               data['left']['compound'] = compound
//             }
            
//           }
  
//           if (notna) {
//             data['left']['laptime'] = laptime
//             data['left']['label'] = secToLabel(laptime)
//           } else {
//             data['left']['laptime'] = null
//             data['left']['label'] = ''
//           }
          
//         } else if (kind == 'right') {
  
//           data['right']['name'] = circle.getAttribute('abb')
//           data['right']['color'] = circle.getAttribute('color')
//           data['right']['tyrelife'] = circle.getAttribute('tyrelife')
//           data['right']['xcoord'] = Number(circle.getAttribute('xcoord')) + transformBottomX + offsetLeft + svgLeft
//           data['right']['ycoord'] = Number(circle.getAttribute('ycoord')) + transformLeftY + offsetTop
//           data['right']['laptimediff'] = circle.getAttribute('laptimediff')
//           data['right']['position'] = circle.getAttribute('position')

//           let compound = circle.getAttribute('compound')

//           if (compound != null) {

//             if (compound.trim().length == 0) {
//               data['right']['compound'] = '-'
//             } else {
//               data['right']['compound'] = compound
//             }
            
//           }
  
//           if (notna) {
//             data['right']['laptime'] = laptime
//             data['right']['label'] = secToLabel(laptime)
//           } else {
//             data['right']['laptime'] = null
//             data['right']['label'] = ''
//           }
          
//         }
  
//       })
  
//       if (data['left']['color'] == data['right']['color']) {
//         data['right']['color'] = modColor(data['left']['color'])
//       }

//       let leftNotNaN = data['left']['laptime'] != null
//       let rightNotNaN = data['right']['laptime'] != null
  
//       let diff
//       let diffColor

//       if ((leftNotNaN) && (rightNotNaN)) {
//         diff = data['left']['laptime'] - data['right']['laptime']
//       } else{
//         diff = ''
//       }
  
//       if (diff > 0) {
//         diffColor = data['right']['color']
//       } else if (diff < 0) {
//         diffColor = data['left']['color']
//       } else {
//         diffColor = '#444749'
//       }
  
//       if (diff != '') {
//         diff = Math.abs(diff).toFixed(3)
//       }
    
//       // lap number
//       let lapNumber = Number(d['LapNumber']).toFixed(0)

//       // circle color
//       circlesHover.forEach((circle, i) => {
  
//         let kind = circle.getAttribute('kind')
  
//         if (kind == 'left') {
//           circle.style.stroke = data['left']['color']
//         } else if (kind == 'right') {
//           circle.style.stroke = data['right']['color']
//         }
        
//       })
  
//       let tooltipHTML
//       let compondLeftText
//       let compondRightText

//       if (data['left']['compound'] != '-') {
//         compondLeftText = `${data['left']['compound']}, ${data['left']['tyrelife']} кр.`
//       } else {
//         compondLeftText = '-'
//       }

//       if (data['right']['compound'] != '-') {
//         compondRightText = `${data['right']['compound']}, ${data['right']['tyrelife']} кр.`
//       } else {
//         compondRightText = '-'
//       }

//       // only right
//       if (!leftNotNaN) {
  
//         tooltipHTML = `
//           <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
  
//             <div class='laptimes-board-title'>
//               <div>Круг</div>
//               <div class='ms-025'>${lapNumber}</div>
//             </div>
          
//             <div class='mt-075'>
          
//               <div class='tooltip-column-container ms-0'>
//                 <div>
//                   <div class='he-1 laptimes-board-title' style='color:${data['right']['color']}'>${data['right']['name']}</div>
//                   <div class='laptimes-board-text laptimes-board-value-laptime he-1 ms-05' >${data['right']['label']}</div>
//                 </div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>
  
//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='laptimes-board-value-laptimediff he-1'>${data['right']['laptimediff']}</div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>
          
//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='he-1'>${compondRightText}</div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>

//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='he-1'>
//                   <div>P</div>
//                   <div class='ms-01'>${data['right']['position']}</div>
//                 </div>
//               </div>
              
//             </div>
          
//           </div>
//         `

//       // only left
//       } else if (!rightNotNaN) {
        
//         tooltipHTML = `
//           <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
  
//             <div class='laptimes-board-title'>
//               <div>Круг</div>
//               <div class='ms-025'>${lapNumber}</div>
//             </div>
  
//             <div class='flex mt-075'>
  
//               <div class='tooltip-column-container laptimes-board-text ms-0'>
//                 <div>
//                   <div class='laptimes-board-title he-1' style='color:${data['left']['color']}'>${data['left']['name']}</div>
//                   <div class='laptimes-board-text laptimes-board-value-laptime he-1 ms-05'>${data['left']['label']}</div>
//                 </div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>
  
//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='laptimes-board-value-laptimediff he-1'>${data['left']['laptimediff']}</div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>
  
//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='he-1'>${compondLeftText}</div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>

//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='he-1'>
//                   <div>P</div>
//                   <div class='ms-01'>${data['left']['position']}</div>
//                 </div>
//               </div>
              
//             </div>
  
//           </div>
  
//         `

//       // both
//       } else {
  
//         tooltipHTML = `
//           <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
  
//             <div class='laptimes-board-title'>
//               <div>Круг</div>
//               <div class='ms-025'>${lapNumber}</div>
//             </div>
  
//             <div class='mt-075'>
  
//               <div class='tooltip-column-container laptimes-board-title ms-0'>
//                 <div class='he-1' style='color:${data['left']['color']}'>${data['left']['name']}</div>
//                 <div class='he-1 mt-05' style='color:${data['right']['color']}'>${data['right']['name']}</div>
//               </div>

//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='laptimes-board-value-laptime he-1'>${data['left']['label']}</div>
//                 <div class='laptimes-board-value-laptime he-1 mt-05'>${data['right']['label']}</div>
//               </div>
  
//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//                 <div class='he-1 mt-05'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>
  
//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='laptimes-board-value-laptimediff he-1'>${data['left']['laptimediff']}</div>
//                 <div class='laptimes-board-value-laptimediff he-1 mt-05'>${data['right']['laptimediff']}</div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//                 <div class='he-1 mt-05'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>
  
//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='flex he-1'>${compondLeftText}</div>
//                 <div class='flex he-1 mt-05'>${compondRightText}</div>
//               </div>

//               <div class='tooltip-column-container'>
//                 <div class='he-1'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//                 <div class='he-1 mt-05'><div class='v-line a-s-center tooltip-line he-085 mb-01'></div></div>
//               </div>

//               <div class='tooltip-column-container laptimes-board-text'>
//                 <div class='flex he-1'>
//                   <div>P</div>
//                   <div class='ms-01'>${data['left']['position']}</div>
//                 </div>
//                 <div class='flex he-1 mt-05'>
//                   <div>P</div>
//                   <div class='ms-01'>${data['right']['position']}</div>
//                 </div>
//               </div>
              
//             </div>
  
//           </div>
      
//           <div class='row-100 ps-075 pe-075'>
//             <div class='h-line tooltip-line-1'></div>
//           </div>
    
//           <div class='row-100 flex-column a-start fc-2 ps-075 pe-125 pt-075 pb-075'>
          
//             <div>
//               <div class='laptimes-board-text'>Дельта</div>
//               <div class='laptimes-board-title ms-05' style='color:${diffColor}'>${diff}</div>
//             </div>
          
//           </div>
  
//         `
        
//       }
  
//       tooltipElement.innerHTML = tooltipHTML
  
//       let tooltipSizes = getSizes(tooltipElement)
//       let tooltipHeight = tooltipSizes.height
//       let tooltipWidth = tooltipSizes.width
  
//       let tooltipXOffset = px16
//       let tooltipYOffset = px16
  
//       let yAxisRightCoord = getSizes(d3GetElement(yRight)).left
  
//       let markerXCoord
//       let markerYCoord
  
//       if (kind == 'left') {
        
//         markerXCoord = Number(data['left']['xcoord'])
//         markerYCoord = Number(data['left']['ycoord'])
        
//       } else if (kind == 'right') {
        
//         markerXCoord = Number(data['right']['xcoord'])
//         markerYCoord = Number(data['right']['ycoord'])
        
//       }
  
//       let tooltipAxisPad = px16
  
//       let tooltipXPad
  
//       let rect = event.target
//       let rectSizes = getSizes(rect)
//       let rectCenterX = rectSizes.left + 0.5*rectSizes.width
  
//       if (tooltipWidth > yAxisRightCoord - rectCenterX - tooltipAxisPad) {
//         tooltipXPad = tooltipXOffset + tooltipWidth
//       } else {
//         tooltipXPad = -tooltipXOffset
//       }
  
//       let tooltipYPad = tooltipHeight + tooltipYOffset
  
//       let tooltipCoordLeft = markerXCoord - tooltipXPad
//       let tooltipCoordTop = markerYCoord - tooltipYPad
  
//       tooltipElement.style.left = `${tooltipCoordLeft}px`
//       tooltipElement.style.top = `${tooltipCoordTop}px`
  
//       tooltipElement.style.opacity = 1
      
//     }
  
//     hideTooltip = function(event, d, idx) {

//       let elementsHover = getElementsListByAttribute('plot-laptimes-element-hover', idx)

//       let rectHover = []
//       let circlesHover = []
//       let markersHover = []

//       elementsHover.forEach((element, i) => {

//         if (element['tagName'] == 'circle') {
//           circlesHover.push(element)
//         } else if (element['tagName'] == 'rect') {
//           rectHover.push(element)
//         } else if (element['tagName'] == 'path') {
//           markersHover.push(element)
//         }
          
//       })

//       rectHover.forEach((rect, i) => {
//         rect.style.fill = rect.getAttribute('color')
//         rect.style.stroke = rect.getAttribute('color')
//       })

//       // markersHover.forEach((marker, i) => {
//       //   marker.style.fill = alphaColor(marker.getAttribute('color'), markerColorBaseAlpha)
//       //   marker.style.transition = 'all 1s'
//       // })

//       circlesHover.forEach((circle, i) => {
//         circle.style.stroke = 'transparent'
//       })
      
//       tooltipElement.style.opacity = 0

//       window.onresize = () => {
//         tooltipElement.style.opacity = 0
//       }
        
//     }

//   }

//   // ----------------------------  CHECKBOX POSITION  ---------------------------- //

//   if (adjustCheckbox) {

//     let yLeftElement = d3GetElement(yLeft)
//     let yLeftElementSizes = getSizes(yLeftElement)
//     let containerSizes = getSizes(container.parentElement.parentElement)
    
//     let checkOffsetX = px0
    
//     let coordX = yLeftElementSizes.left + yLeftElementSizes.width - containerSizes.left + checkOffsetX
  
//     getElement(check231ID).style.left = Math.ceil(coordX) + 'px'
      
//   }

// }


function plotLaptimes(ContainerID, laptimesData, color, kind, laptimesComparison=false, adjustCheckbox=false) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  
  d3.select(containerID).selectAll("svg > *").remove()

  // clear tooltips
  let divs = container.querySelectorAll('div');
  divs.forEach(div => div.remove());


  // -------------------------------------  PARAMETERS  ------------------------------------- //

  
  let paddingOuter = px16
  let paddingOuterHalf = px8
  
  let xPad = px3
  let yPad = px3

  let xtickSize = px4
  let ytickSize = px3

  let xtickOuterSize = px5
  let ytickOuterSize = px4

  let offsetLeft = px0
  let offsetRight = px4
  let offsetTop = px0

  let driverLabelOffsetX = px10
  let driverLabelOffsetY = px0

  let linesOffset = px0
  let stintLabelOffset = px0

  let compoundPadX = px24_5
  let compoundStrokedasharray = `${px16}`
  
  let compoundHeight = px21
  let compoundPadY = px0

  let markerColorBaseAlpha = 0.85


  // -------------------------------------  DATA  ------------------------------------- //

  
  let name = laptimesData[0]['FullName']
  let raceID = laptimesData[0]['RaceID']
  let laps = laptimesData.map(row => row['LapNumber'])
  let lapsTotal
    
  if (laptimesComparison) {
    
    let lapsComp = laptimesComparison.map(row => row['LapNumber'])
    lapsTotal = laps.concat(lapsComp)

    
  } else{
    
    lapsTotal = laps
    
  }

  let lastLap = Number(Math.max(...lapsTotal))

  let laptimesClear = laptimesData
    .filter(d => d['LaptimeNaN'] != 1)
    .map(d => d['Laptime'])

  if (laptimesComparison) {

    laptimesComparison.forEach((obj, i) => {
      laptimesComparison[i]['Laptime'] = Number(laptimesComparison[i]['Laptime'])
    })

    let laptimesComp = laptimesComparison
      .filter(d => d['LaptimeNaN'] != 1)
      .map(d => d['Laptime'])

    laptimesClear = laptimesClear.concat(laptimesComp)
    
  }

  let ySmallest = Math.min.apply(null, laptimesClear)
  let yLargest = Math.max.apply(null, laptimesClear)

  laptimesData.forEach((obj, i) => {

    laptimesData[i]['Laptime'] = Number(laptimesData[i]['Laptime'])

    if (obj['LaptimeNaN'] == 1) {
      laptimesData[i]['Laptime'] = ySmallest
    }
    
  })
  
  let dataVerticalLinesStints
  
  dataVerticalLinesStints = laptimesData.filter(o => o['StintVerticalLine'] == 1)
  dataVerticalLinesStints = dataVerticalLinesStints.map(row => row['LapNumber'])

  let dataLabelsStints
  
  dataLabelsStints = laptimesData.filter(o => o['StintLabel'] == 1 && o['StintMeanConsistency'] != '-')
  
  dataLabelsStints = dataLabelsStints.map(o => ({
      'LapNumber': o['LapNumber'],
      'Consistency': o['StintMeanConsistency'],
      'Compound': o['Compound'],
      'CompoundColor': o['CompoundColor']
    }))
  
  let dataLabelsStintsLaps = dataLabelsStints.map(row => row['LapNumber'])
  
  let dataDecorLineStints 
  
  dataDecorLineStints = laptimesData.filter((v, i) => (v['StintDecorLineMark'] == 1) && (v['StintDecorLine'] == 1))
  
  dataDecorLineStints = dataDecorLineStints.map(row => ({
      'LapNumber': row['LapNumber'],
      'Stint': row['Stint']
    }))

  let dataStintsToDecor = laptimesData.map(row => row['Stint'])
  dataStintsToDecor = dropDuplicates(dataStintsToDecor)

  let SafetyCarLeaveLaps = laptimesData.filter(o => o['SafetyCarLeave'] == 1)
  SafetyCarLeaveLaps = SafetyCarLeaveLaps.map(o => o['LapNumber'])

  let SafetyCarEnterLaps = laptimesData.filter(o => o['SafetyCarEnter'] == 1)
  SafetyCarEnterLaps = SafetyCarEnterLaps.map(o => o['LapNumber'])

  let VirtualSafetyCarLeaveLaps = laptimesData.filter(o => o['VirtualSafetyCarLeave'] == 1)
  VirtualSafetyCarLeaveLaps = VirtualSafetyCarLeaveLaps.map(o => o['LapNumber'])

  let VirtualSafetyCarEnterLaps = laptimesData.filter(o => o['VirtualSafetyCarEnter'] == 1)
  VirtualSafetyCarEnterLaps = VirtualSafetyCarEnterLaps.map(o => o['LapNumber'])

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


  // -------------------------------------  SVG  ------------------------------------- //
  

  // width and height -  of page size
  // let widthDiv = getElement(ContainerID).offsetWidth
  // let heightDiv = widthDiv / 3.6

  // let widthInREM = 50
  let heightScale = 0.23
  let widthCoeffForSprints = 0.85

  let containerSizes = getSizes(container)
  
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(heightScale * widthDiv)

  // if sprint width -> 50% of standard width
  if (lastElement(raceID) == 0) {
    widthDiv = Math.round(widthCoeffForSprints * widthDiv)
  }

  // let margin = {top: px40, right: px80, bottom: px45, left: px105}
  // let width = Math.floor(widthDiv - margin.left - margin.right)
  // let height = Math.floor(heightDiv - margin.top - margin.bottom)

  if (getElement(ContainerID).children.length == 0) { d3.select(containerID).append('svg') }

  let svgID = 'svg-laptimes-' + ContainerID
  
  let svg = d3
    .select(containerID)
    .selectAll('svg')
    .classed('svg-chart', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', heightDiv)
    // .classed('border-blue', true)
    // .classed('p-relative', true)

  let main = svg
    .append('g')
    .attr('name', 'main')
    .attr('id', 'svg-laptimes-main-' + ContainerID)
    .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)

  let chart = main
    .append('g')
    .attr('name', 'chart')
    .attr('id', 'svg-laptimes-chart-' + ContainerID)


  // ---------------------------------  DRIVER LABEL --------------------------------- //


  // driver label y-axis
  let driverLabel = main
    .append('g')
    .attr('name', 'driver-label')

  driverLabel
    .append("text")
    .text(name)
    // .attr('x', 0)
    // .attr('y', 0)
    .style('font-family', PrimaryFont)
    .style('fill', color)
    .style('font-size', `${colorPlotLaptimesDriverNamesFontSize}px`)
    .style('font-variation-settings', `'wght' ${colorPlotLaptimesDriverNamesWeight}`)
    // .style('letter-spacing', '0.025rem')
    .style('cursor', 'default')
    .style('text-anchor', 'end')
    .style('dominant-baseline', 'hanging')
    // .attr("transform", `translate(${offsetLeft}, ${0}) rotate(-90)`)
    .attr("transform", `rotate(-90)`)
    // .attr("dy", -px70 - yPad - ytickSize)
    .classed('theme-colors-control-text', true)

  let driverLabelElement = d3GetElement(driverLabel)
  let driverLabelElementSizes = getSizes(driverLabelElement)
  let driverLabelWidth = Math.floor(driverLabelElementSizes.width)


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //

  
  let height = heightDiv - offsetTop - compoundHeight - xPad
  
  let yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

  let yAxisLeft = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

  let yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

   let yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    // .attr('id', 'svg-laptimes-axis-left' + ContainerID)
    // .attr("transform", `translate(${-yPad}, 0)`)

   yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisLeft)
    // .call(g => g.select('.domain').remove())

   let yRight = main
    .append("g")
    .attr('name', 'axis-right')
    // .attr("transform", `translate(${yRightWithPad}, 0)`)

   yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  // d3ShowEveryNTicklabel(yLeft, 2)
  // d3ShowEveryNTicklabel(yRight, 2)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftSizes = getSizes(yLeftElement)
  let yLeftWidth = Math.ceil(yLeftSizes.width)

  let yRightElement = d3GetElement(yRight)
  let yRightSizes = getSizes(yRightElement)
  let yRightWidth = Math.ceil(yRightSizes.width)


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //

  let width = widthDiv - offsetLeft - driverLabelWidth - driverLabelOffsetX - yLeftWidth - yPad - yPad - yRightWidth - offsetRight 

  let xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([0, width])

  d3adjustPaddingOuter(paddingOuter, xScale, axis='x', type='linear')

  let xAxis = d3
    .axisBottom(xScale)
    .tickValues(xtickValues)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickOuterSize)

  let xBottom = main
    .append("g")
    .attr('name', 'axis-bottom')

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
  let xBottomElement = d3GetElement(xBottom)
  let xBottomSizes = getSizes(xBottomElement)
  let xBottomHeight = Math.ceil(xBottomSizes.height)


  // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //


  height = height - compoundPadY - xBottomHeight

  d3GetElement(yLeft).remove()
  d3GetElement(yRight).remove()

  yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

  yAxisLeft = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

  yAxisRight = d3
    .axisRight(yScale)
    .tickSize(ytickSize)
    .tickValues(ytickValues)
    .tickFormat(d => secToLabel(d))
    .tickSizeOuter(ytickOuterSize)

   yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    .attr('id', 'svg-laptimes-axis-left-' + ContainerID)
    // .attr("transform", `translate(${-yPad}, 0)`)

   yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisLeft)
    // .call(g => g.select('.domain').remove())

   yRight = main
    .append("g")
    .attr('name', 'axis-right')
    // .attr("transform", `translate(${yRightWithPad}, 0)`)

   yRight
    .append('g')
    .attr('name', 'ticks')
    .call(yAxisRight)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  d3ShowEveryNTicklabel(yLeft, 2)
  d3ShowEveryNTicklabel(yRight, 2)

  let yLeftElementCorrected = d3GetElement(yLeft)
  let yRightElementCorrected = d3GetElement(yRight)


  // ------------------------  TRANSITIONS  ------------------------- //

  // y-axis left
  let transformLeftX = Math.ceil(driverLabelWidth + driverLabelOffsetX + yLeftWidth)
  let transformLeftY = compoundHeight + compoundPadY
  yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

  // y-axis right
  let transformRightX = Math.ceil(driverLabelWidth + driverLabelOffsetX + yLeftWidth + yPad + width + yPad)
  yRightElementCorrected.setAttribute('transform', `translate(${transformRightX}, ${transformLeftY})`)

  // driver label
  let driverLabelTransformTop = transformLeftY + driverLabelOffsetY
  driverLabelElement.setAttribute('transform', `translate(${offsetLeft}, ${driverLabelTransformTop})`)

   // x-axis
  let transformBottomX = Math.ceil(driverLabelWidth + driverLabelOffsetX + yLeftWidth + yPad)
  let transformBottomY = Math.ceil(compoundHeight + compoundPadY + height + xPad)
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // // adjust SVG height
  // let heightAdjusted = offsetTop + height + xPad + xBottomHeight
  // d3GetElement(svg).setAttribute('height', heightAdjusted)

  // containers height adjust
  // let chartContainerHeight = getElement(eventPaceTooltip1ChartID).offsetHeight
  // getElement(eventPaceTooltip1ID).style.height = `${chartContainerHeight}px`

  chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)


  // -------------------------------------  GRID  ------------------------------------- //


  // xtick every 4th lap since second lap
  // let gridShow = range(2, xMax, 4)
  let yGridShow = ytickValues.filter((_, index) => index % 2 == 0)

  let gridXmin = yScale(yMin) + paddingOuterHalf
  let gridXmax = yScale(yMax) - paddingOuterHalf

  let gridYmin = xScale(xMin) - paddingOuterHalf
  let gridYmax = xScale(xMax) + paddingOuterHalf

  // let gridXmin = height
  // let gridXmax = 0

  // let gridYmin = 0
  // let gridYmax = width
  
  // grid-x
  d3DrawXGrid(chart, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, colorThemesChartGrid, scaleType='linear')
  
  // grid-y
  d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, gridYmin, gridYmax, colorThemesChartGrid, scaleType='linear')


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

  let stintAndCompounds = main
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

    let stintDeltaCondition = (
      SafetyCarEnterLaps.includes(lap)
      || VirtualSafetyCarEnterLaps.includes(lap)
    )
    
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
          result = -px47
        } else if (VirtualSafetyCarEnterLaps.includes(lap)) {
          result = -px52
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
        // .style('stroke', '#6F767F')
        .style('stroke', colorThemesChartSCStart)
        .style('stroke-width', px2)
        // .style('stroke-dasharray', '4 4')
        .style('stroke-linecap', 'round')
        .attr("x1", xCoord)
        .attr("x2", xCoord)
        // .attr("y1", 0 + 0.1 * height)
        // .attr("y2", height - 0.1 * height)
        // .attr("y1", yScale(yMax) + px2 - linesOffset)
        // .attr("y2", yScale(yMin) - px1 + linesOffset)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
  
      SCElements
        .append('text')
        .text('SC Start')
        // .text('SC Deploy')
        .style('font-family', PrimaryFont)
        .style('fill', colorThemesChartSCStart)
        .style('font-size', `${px10}px`)
        .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
        .style('text-anchor', 'end')
        .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
        // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
        // .style('text-anchor', 'start')
        // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
        // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
    }

  }

  // SC leaving
  if (SafetyCarLeaveLaps.length > 0) {

    for (lap of SafetyCarLeaveLaps) {

      SCElements
        .append("line")
        // .style('stroke', '#6F767F')
        .style('stroke', colorThemesChartSCEnd)
        .style('stroke-width', px2)
        // .style('stroke-dasharray', '4 4')
        .style('stroke-linecap', 'round')
        .attr("x1", xScale(lap) + 0.5 * px1)
        .attr("x2", xScale(lap) + 0.5 * px1)
        // .attr("y1", 0 + 0.1 * height)
        // .attr("y2", height - 0.1 * height)
        // .attr("y1", yScale(yMax) + px2 - linesOffset)
        // .attr("y2", yScale(yMin) - px1 + linesOffset)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)

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
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
        // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
        // .style('text-anchor', 'start')
        // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
        // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
    }
      
  }


  // -------------------------------------  VSC LINES  ------------------------------------- //


  // VSC enter
  if (VirtualSafetyCarEnterLaps.length > 0) {

    for (lap of VirtualSafetyCarEnterLaps) {

      let xCoord1 = xScale(lap) + 0.5 * px1

      VSCElements
        .append("line")
        // .style('stroke', '#6F767F')
        .style('stroke', colorThemesChartSCStart)
        .style('stroke-width', px2)
        // .style('stroke-dasharray', '4 4')
        .style('stroke-linecap', 'round')
        .attr("x1", xCoord1)
        .attr("x2", xCoord1)
        // .attr("y1", 0 + 0.1 * height)
        // .attr("y2", height - 0.1 * height)
        // .attr("y1", yScale(yMax) + px2 - linesOffset)
        // .attr("y2", yScale(yMin) - px1 + linesOffset)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
  
      VSCElements
        .append('text')
        .text('VSC Start')
        // .text('SC Deploy')
        .style('font-family', PrimaryFont)
        .style('fill', colorThemesChartSCStart)
        .style('font-size', `${px10}px`)
        .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintSepLabelsWeight}`)
        .style('text-anchor', 'end')
        .attr("transform", `translate(${xScale(lap) - px4}, ${gridXmax + linesOffset + stintLabelOffset}) rotate(-90)`)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
        // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
        // .style('text-anchor', 'start')
        // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
        // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
    }

  }

  // VSC leaving
  if (VirtualSafetyCarLeaveLaps.length > 0) {

    for (lap of VirtualSafetyCarLeaveLaps) {

      VSCElements
        .append("line")
        // .style('stroke', '#6F767F')
        .style('stroke', colorThemesChartSCEnd)
        .style('stroke-width', px2)
        // .style('stroke-dasharray', '4 4')
        .style('stroke-linecap', 'round')
        .attr("x1", xScale(lap) + 0.5 * px1)
        .attr("x2", xScale(lap) + 0.5 * px1)
        // .attr("y1", 0 + 0.1 * height)
        // .attr("y2", height - 0.1 * height)
        // .attr("y1", yScale(yMax) + px2 - linesOffset)
        // .attr("y2", yScale(yMin) - px1 + linesOffset)
        .attr("y1", gridXmin - linesOffset)
        .attr("y2", gridXmax + linesOffset + px1)
        .style('visibility', ((xMin == 2) & (lap == 1)) ? 'hidden' : 'visible')
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)

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
        // .style('opacity', ((xMin == 2) & (lap == 1)) ? 0 : 1)
        // .attr("transform", `translate(${xScale(lap) - px4}, ${0.1 * height}) rotate(-90)`)
        // .style('text-anchor', 'start')
        // .attr("transform", `translate(${xScale(lap) + px4}, ${0.1 * height}) rotate(90)`)
        // .style('visibility', (lap < 2) ? 'hidden' : 'visible')
      
    }
      
  }


  // -----------------------------  STINT LABELS AND COMPOUNDS  ----------------------------- //
  

  // stint-labels
  stintLabels
    .selectAll("text")
    .data(dataLabelsStints)
    .join('text')
    .attr('alignment-baseline', 'hanging')
    .style('font-family', PrimaryFont)
    .style('fill', color)
    .style('font-size', `${px13}px`)
    .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintConLabelsWeight}`)
    .style('cursor', 'default')
    .style('text-anchor', 'end')
    .style('letter-spacing', '0.025rem')
    // .attr('class', 'stint-label')
    .text(d => d['Consistency'])
    .attr("x", d => xScale(d['LapNumber']))
    .attr('y', 0)
    .classed('theme-colors-control-text', true)
  
  compundLabels
    .selectAll('circle')
    .data(dataLabelsStints)
    .join('circle')
    // .style('r', px12)
    // .attr('r', px12)
    .style('r', px10)
    .attr('r', px10)
    .style('stroke', d => saturateColor(d['CompoundColor'], 0.75))
    .style('stroke-width', px2)
    .style('stroke-dasharray', compoundStrokedasharray)
    .style('fill', 'none')
    .style('opacity', 0.85)
    // to rotate as below --> `translate(${xCoord}, ${yCoord}) rotate(45)`
    .attr("transform", d=> `translate(${xScale(d['LapNumber']) + compoundPadX}, ${px5}) rotate(0)`)
    .style('visibility', d => (d['Compound'] == ' ') ? 'hidden' : 'visible')
    // .classed('theme-colors-control-img', true)
    // .style('opacity', d => (d['Compound'] == ' ') ? 0 : 1)

  compundLabels
    .selectAll('text')
    .data(dataLabelsStints)
    .join('text')
    .attr('alignment-baseline', 'hanging')
    .style('font-family', PrimaryFont)
    .style('fill', '#5F6469')
    .style('font-size', `${px10}px`)
    .style('font-variation-settings', `'wght' ${colorPlotLaptimesStintCompoundLabelsWeight}`)
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'middle')
    .style('cursor', 'default')
    .text(d => d['Compound'])
    .attr("x", d => xScale(d['LapNumber']) + compoundPadX)
    .attr('y', 0)
    .style('visibility', d => (d['Compound'] == ' ') ? 'hidden' : 'visible')
    // .classed('theme-colors-control-img', true)
    // .style('opacity', d => (d['Compound'] == ' ') ? 0 : 1)


  // ---------------------------------  MOVING AVERAGE  --------------------------------- //

  
  let fillAreaLine = d3.area()
    // .curve(d3.curveBumpX)
    // .curve(d3.curveMonotoneX)
    .curve(d3.curveCatmullRom.alpha(0.5))
    .defined(d => d['Laptime'])
    // .defined(d => d['LaptimeClearPace'] != '-')
    .defined((d, i) => {

      // not fill area of alone laptimes
      let result = false

      // not first and last index
      if ((i > 0) & (i != laptimesData.length - 1)) {

        // ma exists in current point and currnt point is not stand alone laptime
        result = (
          (d['LaptimeClearPace'] != '-')
          && (laptimesData[i-1]['LaptimeClearPace'] != '-') | (laptimesData[i+1]['LaptimeClearPace'] != '-')
        )

      // for last index
      } else if ((i > 0) & (i == laptimesData.length - 1)) {

        // ma exist and previous laptime exist
        result = (
          (d['LaptimeClearPace'] != '-')
          && (laptimesData[i-1]['LaptimeClearPace'] != '-')
        )
        
      }

      return result
      
    })
    .x(d => xScale(d['LapNumber']))
    .y0(d => yScale(d['LaptimeClearPace']))
    .y1(d => yScale(d['Laptime']))

  let movingAverageLine = d3.line()
    // .curve(d3.curveBumpX)
    // .curve(d3.curveMonotoneX)
    .curve(d3.curveCatmullRom.alpha(0.5))
    .defined(d => d['LaptimeClearPace'] != '-')
    .x(d => xScale(d['LapNumber']))
    .y(d => yScale(d['LaptimeClearPace']))

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
      .attr('x1', d => xScale(d['LapNumber']) + px0_5)
      .attr('x2', d => xScale(d['LapNumber']) + px0_5)
      .attr('y1', yScale(yMax) + px1 - linesOffset)
      .attr('y2', yScale(yMin) + linesOffset)
      .style('visibility', d => (d['LaptimeNaN'] == 1) ? 'hidden' : 'visible')
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
      .attr('y1', (d, i) => (d['LaptimeNaN'] == 1) ? yScale(yMin) : yScale(d['Laptime']))
      .attr('y2', (d, i) => (d['LaptimeNaN'] == 1) ? yScale(yMin) : yScale(d['Laptime']))
      .style('visibility', d => (d['LaptimeNaN'] == 1) ? 'hidden' : 'visible')
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

    if (d['Overtakes'] == '0.0') {
      return d3.symbolCircle
    }
    else if (d['Overtakes'] == '') {
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

    if (Math.abs(Number(d['Overtakes'])) > 1) {
      result = 2.5*radius
    } else {
      result = radius
    }
    return result
    
  }

  transform = (d) => {
    
    if (Number(d['Overtakes']) < 0) {
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
    .attr("transform", (d, i) => `translate(${xScale(d['LapNumber']) + px0_5}, ${yScale(d['Laptime'])})`)
    .append("path")
    .style('shape-rendering', 'geometricPrecision')
    .attr("d", symbol.size(size))
    .attr("transform", transform)
    // .style("fill", color)
    .style("fill", alphaColor(color, markerColorBaseAlpha))
    .style('stroke', shadeColor(color, -0.2))
    // .style('stroke', saturateColor(color, 0.75))
    .style('stroke-width', px1_5)
    .style('opacity', d => (d['LaptimeNaN'] == 1) ? 0 : 1)
    .style('transition', 'all 1s')
    .attr('plot-laptimes-1-mistake', d => (d['LaptimeMistake'] == 1) ? 1 : 0)
    .attr('plot-laptimes-element-hover', (d, i) => i)
    .attr('color', color)
    // .classed('theme-colors-control-text', true)
    // // to mark outliers
    // .style('fill', d => (d['LaptimeOutlier'] == 1) ? '#FFFFFF' : color)
    // .style('stroke', d => (d['LaptimeOutlier'] == 1) ? '#C0C5C9' : shadeColor(color, -0.2))
    // .style('stroke-width', d => (d['LaptimeOutlier'] == 1) ? 2 : 1)


  // ------------------------------------  HOVER PART 2  ------------------------------------ //


  if (notMobileDevice) {
  
    hoverElements
      .append('g')
      .attr('name', 'circles')
      .selectAll('circle')
      .data(laptimesData)
      .join('circle')
      .attr('cx', d => xScale(d['LapNumber']) + px0_5)
      .attr('cy', d => yScale(d['Laptime']))
      .attr('r', px6)
      .style('r', px6)
      .style("fill", 'transparent')
      .style('stroke', 'transparent')
      .style('stroke-width', px2)
      .style('opacity', d => (d['LaptimeNaN'] == 1) ? 0 : 1)
      .attr('plot-laptimes-element-hover', (d, i) => i)
      .attr('color', d => d['Color'])
      .attr('value', d => d['Laptime'])
      .attr('abb', d => d['Abbreviation'])
      .attr('laptime-notna', d => (d['LaptimeNaN'] == 1) ? 0 : 1)
      .attr('kind', kind)
      .attr('compound', d => d['Compound'])
      .attr('tyrelife', d => d['TyreLife'])
      .attr('xcoord', d => xScale(d['LapNumber']))
      .attr('ycoord', d => yScale(d['Laptime']))
      .attr('laptimediff', d => d['LaptimeDiff'])
      .attr('position', d => d['Position'])
      .classed('theme-colors-control-img', true)
      
    let rectHeight = px30
    let rectWidth = Math.ceil(0.5 * d3GetBandwidthLinear(xBottom))

    hoverElements
      .append('g')
      .attr('name', 'rectangles')
      .selectAll('rect')
      .data(laptimesData)
      .join('rect')
      .attr('x', o => xScale(o['LapNumber']) - 0.5*rectWidth)
      .attr('y', o => yScale(o['Laptime']) - 0.5*rectHeight)
      .attr('width', o => (o['LaptimeNaN'] == 1) ? 0 : rectWidth)
      .attr('height', o => (o['LaptimeNaN'] == 1) ? 0 : rectHeight)
      .style('cursor', 'pointer')
      .style('fill', 'transparent')
      // .style('fill', '#8EACD0')
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
  let svgSizes = getSizes(svgElement)

  // let chartElement = d3GetElement(chart)
  // let chartSizes = getSizes(chartElement)

  let svgLeft = svgSizes.left - getSizes(getElement(ContainerID)).left

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
        rect.style.fill = alphaColor(rect.getAttribute('color'), 0.5, colorThemesChartBackground)
        rect.style.stroke = alphaColor(rect.getAttribute('color'), 0.75, colorThemesChartBackground)
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
      let lapNumber = Number(d['LapNumber']).toFixed(0)

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
      
          <div class='row-100 ps-075 pe-075'>
            <div class='h-line tooltip-line-1'></div>
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
        
        markerXCoord = Number(data['left']['xcoord'])
        markerYCoord = Number(data['left']['ycoord'])
        
      } else if (kind == 'right') {
        
        markerXCoord = Number(data['right']['xcoord'])
        markerYCoord = Number(data['right']['ycoord'])
        
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

  // ----------------------------  CHECKBOX POSITION  ---------------------------- //

  if (adjustCheckbox) {

    let yLeftElement = d3GetElement(yLeft)
    let yLeftElementSizes = getSizes(yLeftElement)
    let containerSizes = getSizes(container.parentElement.parentElement)
    
    let checkOffsetX = px0
    
    let coordX = yLeftElementSizes.left + yLeftElementSizes.width - containerSizes.left + checkOffsetX
  
    getElement(check231ID).style.left = Math.ceil(coordX) + 'px'
      
  }

}


function plotDifference(ContainerID, laptimesData, summaryData, colors) {

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  
  d3.select(containerID).selectAll("svg > *").remove()


  // -------------------------------------  PARAMETERS  ------------------------------------- //


  // make space between end of axis and first tick equals for both x and y axises
  let paddingOuter = px16
  let paddingOuterHalf = px8

  let xPad = px4
  let yPad = px4

  let xtickSize = px4
  let ytickSize = px3

  let xtickOuterSize = px5
  let ytickOuterSize = px4

  let offsetLeft = px5
  let offsetRight = px6
  let offsetTop = px0

  let laptimesAxisLeft = getElement('svg-laptimes-axis-left-plot-laptimes-left')
  let laptimesAxisLeftTransform = window.getComputedStyle(laptimesAxisLeft).getPropertyValue('transform')
  let laptimesAxisLeftTransformX = laptimesAxisLeft.transform['baseVal'][0]['matrix']['e']

  let laptimesAxisLeftTicksWidth = getSizes(laptimesAxisLeft.children[0]).width

  let legendPad = px16


  // -------------------------------------  DATA  ------------------------------------- //


  let dataLeft = laptimesData[0]
  let dataRight = laptimesData[1]

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let summaryLeft = summaryData[0]
  let summaryRight = summaryData[1]

  let raceID = dataLeft[0]['RaceID']

  let lapsLeft = dataLeft.map(row => row['LapNumber'])
  let lapsRight = dataRight.map(row => row['LapNumber'])

  let laps = lapsLeft.concat(lapsRight)
  laps = dropDuplicates(laps)
  let lastLap = Number(Math.max(...laps))

  let xMin = (isEven(lastLap)) ? 2 : 1
  let xMax = lastLap

  let xtickValues = range(xMin, xMax + 2, 2)

  let data = []

  let dataRightLaptimesNaNs = dataRight.filter(d => d['LaptimesNAN'] == 1)
  let conditionRight = dataRight.length != dataRightLaptimesNaNs.length

  let dataLeftLaptimesNaNs = dataLeft.filter(d => d['LaptimesNAN'] == 1)
  let conditionLeft = dataLeft.length != dataLeftLaptimesNaNs.length

  // old method - clear pace
  // let laptimesDifferenceCleared = []

  // if both drivers not retired on first lap or warm-up lap
  if (conditionLeft && conditionRight) {

    laps.forEach((lap, i) => {

      let data1 = dataLeft.filter(o => o['LapNumber'] == lap)[0]
      let data2 = dataRight.filter(o => o['LapNumber'] == lap)[0]
  
      let diff
      let meanLineLap = 1

      let diffClear
      let isMistake = 0

      if (data1 && data2) {

        diff = data2['Laptime'] - data1['Laptime']
        diffClear = data2['LaptimeClear'] - data1['LaptimeClear']

        let pitLap = ((data1['PitLap'] == 1) | (data2['PitLap'] == 1))

        if (isNaN(diff) || pitLap) {
          diff = 0
        }

        let laptimeIsNaN = ((data1['LaptimeNaN'] == 1) || (data2['LaptimeNaN'] == 1))

        if (laptimeIsNaN) {
          meanLineLap = 0
          diff = 0
        }

        if ((data1['LaptimeMistake'] == 1) || (data2['LaptimeMistake'] == 1)) {
          isMistake = 1
        }
        
        data.push({
          LapNumber: lap,
          LaptimesDifference: diff,
          DrawMeanLine: meanLineLap,
          isMistake: isMistake,
          LaptimesDifferenceClear: diffClear
        })
        
      }
      
    })

    let clearPaceDiffAvg = data.map(o => o['LaptimesDifferenceClear']).filter(NaNs)
    clearPaceDiffAvg = arrayAverage(clearPaceDiffAvg)

    let diffValues = data.map(o => o['LaptimesDifference'])
    let diffValuesWAvg = diffValues.concat(clearPaceDiffAvg)
    
    let yMin = Math.min.apply(null, diffValuesWAvg)
    yMin = Math.min(0, yMin)
    let yMax = Math.max.apply(null, diffValuesWAvg)
    yMax = Math.max(0, yMax)
  
    // let ytickValues = generateRange(yMin, yMax, '3', res='range')

    let ytickValuesRaw = generateRange(yMin, yMax, '2', res='range')
    ytickValues = arrayAddMeanElementsInside(ytickValuesRaw)
    // ytickValues = ytickValues.map(Math.abs)

    yMin = firstElement(ytickValues)
    yMax = lastElement(ytickValues)
    

    // -------------------------------------  SVG  ------------------------------------- //


    // let widthInREM = 70
    let heightScale = 0.17
    let widthCoeffForSprints = 0.85
  
    // let widthDiv = Math.round(remToPix(widthInREM))
    let containerSizes = getSizes(container)
    let widthDiv = Math.floor(containerSizes.width)
    let heightDiv = Math.floor(heightScale * widthDiv)

    let mistakesLegendOffset = 0

    // if sprint width -> 50% of standard width
    if (lastElement(raceID) == 0) {
      widthDiv = Math.round(widthCoeffForSprints * widthDiv)
      mistakesLegendOffset = 0.5 * (1 - widthCoeffForSprints) * widthDiv
    }

    // let margin = {top: px40, right: px80, bottom: px45, left: px105}
    // let width = widthDiv - margin.left - margin.right
    // let height = heightDiv - margin.top - margin.bottom
  
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

    let main = svg
      .append('g')
      .attr('name', 'main')
      .attr('id', 'plot-laptimes-difference-main-node')
      .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)

    let chart = main
      .append('g')
      .attr('name', 'chart')


    // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


    let width = widthDiv - offsetLeft - laptimesAxisLeftTransformX - yPad - yPad - laptimesAxisLeftTicksWidth - offsetRight 

    let xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])
  
    d3adjustPaddingOuter(paddingOuter, xScale, axis='x', type='linear')

    let xMaxScaled = xScale(xMax)
    let xMinScaled = xScale(xMin)
  
    let xAxis = d3
      .axisBottom(xScale)
      .tickValues(xtickValues)
      .tickSize(xtickSize)
      .tickSizeOuter(xtickOuterSize)
  
    let xBottom = main
      .append("g")
      .attr('name', 'axis-bottom')
  
    xBottom
      .append('g')
      .attr('name', 'ticks')
      .call(xAxis)
      // .call(g => g.select('.domain').remove())

    d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
    let xBottomElement = d3GetElement(xBottom)
    let xBottomSizes = getSizes(xBottomElement)
    let xBottomHeight = Math.ceil(xBottomSizes.height)


    // -------------------------------------  LEGEND  ------------------------------------- //
  
  
    let legendNode = main
      .append('g')
      .attr('name', 'legend')
  
    let legend1OffsetX = xScale(xMin)
    let legend2OffsetX = px5

    let legendText
    // let legendWeight
    let legendSize
    let legendColor
    let legendDy

    legendText = Math.abs(clearPaceDiffAvg).toFixed(3)
    // legendWeight = 700
    legendSize = px14
    // legendDy = px1

    if (clearPaceDiffAvg > 0) {
      legendColor = colorLeft
    } else {
      legendColor = colorRight
    }

    legendNode
      .append('text')
      .attr('id', 'plot-laptimes-difference-legend-1')
      .style('font-family', PrimaryFont)
      .style('fill', colorThemesChartFont2)
      .style('font-size', `${px14}px`)
      .style('font-variation-settings', `'wght' ${colorPlotComparisonLegendWeight1}`)
      .text('Разница по чистому темпу:')
      .attr('x', legend1OffsetX)
      .attr('y', 0)

    let legend1Element = getElement('plot-laptimes-difference-legend-1')
    let legend1ElementSizes = getSizes(legend1Element)
    
    let legend1Width = legend1ElementSizes.width
  
    legendNode
      .append('text')
      .attr('id', 'plot-laptimes-difference-legend-2')
      .style('font-family', PrimaryFont)
      .style('fill', legendColor)
      .style('font-size', `${legendSize}px`)
      .style('font-variation-settings', `'wght' ${colorPlotComparisonLegendWeight2}`)
      .style('letter-spacing', '0.025rem')
      .text(legendText)
      .attr('x', legend1OffsetX + legend1Width + legend2OffsetX)
      .attr('y', 0)
      // .attr('dy', legendDy)
      // .classed('theme-colors-control-text', true)

    let legendElement = d3GetElement(legendNode)
    let legendElementSizes = getSizes(legendElement)
    let legendElementHeight = Math.ceil(legendElementSizes.height)

  
    // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //
  

    let height = heightDiv - offsetTop - legendElementHeight - legendPad - xBottomHeight - xPad
  
    let yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])
  
    d3adjustPaddingOuter(paddingOuter, yScale, axis='y', type='linear')

    let yMaxScaled = yScale(yMax)
    let yMinScaled = yScale(yMin)

    let yAxisLeft = d3
      .axisLeft(yScale)
      .tickSize(ytickSize)
      .tickValues(ytickValues)
      // .tickFormat(d => d3.format('.3f')(Math.abs(d)))
      // .tickFormat(d => Math.abs(d))
      // .tickFormat(Math.abs)
      .tickFormat(d => parseFloat(Math.abs(d).toFixed(3)))
      .tickSizeOuter(ytickOuterSize)
  
    let yAxisRight = d3.axisRight(yScale)
      .tickSize(ytickSize)
      .tickValues(ytickValues)
      // .tickFormat(d => d3.format('.3f')(Math.abs(d)))
      // .tickFormat(d => Math.abs(d))
      // .tickFormat(d => d3.format(format)(Math.abs(d)))
      .tickFormat(d => parseFloat(Math.abs(d).toFixed(3)))
      .tickSizeOuter(ytickOuterSize)

    let yLeft = main
      .append("g")
      .attr('name', 'axis-left')
  
    yLeft
      .append('g')
      .attr('name', 'ticks')
      .call(yAxisLeft)
      // .call(g => g.select('.domain').remove())

    let yRight = main
      .append("g")
      .attr('name', 'axis-right')
  
    yRight
      .append('g')
      .attr('name', 'ticks')
      .call(yAxisRight)
      // .call(g => g.select('.domain').remove())
  
    d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
    yRight
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', px8)

    d3ShowEveryNTicklabel(yLeft, 2)
    d3ShowEveryNTicklabel(yRight, 2)

    let yLeftElement = d3GetElement(yLeft)
    let yLeftSizes = getSizes(yLeftElement)
    let yLeftWidth = Math.ceil(yLeftSizes.width)
  
    let yRightElement = d3GetElement(yRight)
    let yRightSizes = getSizes(yRightElement)
    let yRightWidth = Math.ceil(yRightSizes.width)


    // ------------------------  TRANSITIONS  ------------------------- //


    // y-axis
    let transformLeftX = Math.ceil(laptimesAxisLeftTransformX)
    let transformLeftY = legendElementHeight + legendPad
    yLeftElement.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

    // y-axis
    let transformRightX = Math.ceil(laptimesAxisLeftTransformX + yPad + width + yPad)
    yRightElement.setAttribute('transform', `translate(${transformRightX}, ${transformLeftY})`)
  
     // x-axis
    let transformBottomX = Math.ceil(laptimesAxisLeftTransformX + yPad)
    let transformBottomY = Math.ceil(legendElementHeight + legendPad + height + xPad)
    xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

    // legend
    legendElement.setAttribute('transform', `translate(${transformBottomX}, ${legendElementHeight})`)
  
    chart.attr("transform", `translate(${transformBottomX}, ${transformLeftY})`)

    
    // -------------------------------------  GRID  ------------------------------------- //
    

    let yGridLessZero = ytickValues.filter(o => o < 0)
    let yGridShowLessZero = ytickValues.filter((_, index) => index % 2 == 0)

    let yGridMoreZero = ytickValues.filter(o => o >= 0)
    let yGridShowMoreZero = ytickValues.filter((_, index) => index % 2 == 0)

    let yGridShow = yGridShowLessZero.concat(yGridShowMoreZero)

    let gridXmin = yMinScaled + paddingOuterHalf
    let gridXmax = yMaxScaled - paddingOuterHalf
  
    let gridYmin = xMinScaled - paddingOuterHalf
    let gridYmax = xMaxScaled + paddingOuterHalf
    
    // grid-x
    d3DrawXGrid(chart, 'grid-bottom', xScale, xtickValues, gridXmin, gridXmax, colorThemesChartGrid, scaleType='linear')
    
    // grid-y
    d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, gridYmin, gridYmax, colorThemesChartGrid, scaleType='linear')


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
        .attr('x1', d => xScale(d['LapNumber']) + px0_5)
        .attr('x2', d => xScale(d['LapNumber']) + px0_5)
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
        .attr('y1', d => yScale(d['LaptimesDifference']))
        .attr('y2', d => yScale(d['LaptimesDifference']))
        .style('visibility', d => (d['LaptimeNaN'] == 1) ? 'hidden' : 'visible')
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
        .attr('x', d => xScale(d['LapNumber']) - 0.5 * barWidth + px0_5)
        .attr('y', d => yScale(Math.max(0, d['LaptimesDifference'])))
        .attr('width', barWidth)
        .attr('height', d => Math.round(Math.abs(yScale(0) - yScale(d['LaptimesDifference']))))
        .attr('color', d => d['LaptimesDifference'] > 0 ? saturateColor(colorLeft, 0.8) : saturateColor(colorRight, 0.8))
        .attr('plot-laptimes-element-hover', (o, i) => i)
        .style('stroke', d => d['LaptimesDifference'] > 0 ? saturateColor(colorLeft, 0.8) : saturateColor(colorRight, 0.8))
        .style('stroke-width', px2)
        .style('fill', d => d['LaptimesDifference'] > 0 ? saturateColor(colorLeft, 0.8) : saturateColor(colorRight, 0.8))
        .style('shape-rendering', 'geometricPrecision')
        .attr('rx', px3)
      
    }


    // -------------------------------------  AVERAGE CLEAR  ------------------------------------- //

    if (data.length > 0) {

      let dataLine = data.filter(o => o['DrawMeanLine'] == 1)

      if (dataLine.length > 1) {

        average
          .append('line')
          .style('stroke', '#969BA0')
          .style('stroke-width', px2)
          .style('stroke-dasharray', '4 4')
          .style('stroke-dashoffset', '2')
          // .style('shape-rendering', 'crispEdges')
          .attr('shape-rendering', 'geometricPrecision')
          .attr('stroke-linecap', 'round')
          .attr('x1', xScale(dataLine[0]['LapNumber']) - 1.5 * barWidth)
          .attr('x2', xScale(lastElement(dataLine)['LapNumber']) + 1.5 * barWidth)
          .attr('y1', yScale(clearPaceDiffAvg))
          .attr('y2', yScale(clearPaceDiffAvg))
          
      }
      
    }
    
  }

}


function chartLol_1(data_2, ContainerID, tableID, metric, stability, ascending) {

  let containerID = '#' + ContainerID

  d3ResetSVG(ContainerID)

  
  // -----------------------------------  DATA  ----------------------------------- //


  let dataAvailable = data_2.length > 0
  
  let radius = px6

  let data = structuredClone(data_2)

  // if equals - sort by stability (if pace equals - by champ classification)
  data = sortObject(data, 'ChampionshipClassification', false)
  data = sortObject(data, metric.replace('Avg', '') + 'Stability', true)
  data = sortObject(data, metric, ascending)
  data = sortObject(data, 'RacesParticipatedGroup', false)

  // let driverNumbers = data.map(row => row['Number'])
  let driverIDTs = data.map(row => row['DriverIDT'])

  let metricValues = data.map(o => o[metric])

  // if some value not number-like
  metricValues.forEach((value, i) => {
    if (!isNumeric(value)) {
      metricValues[i] = Number(metricValues[i-1] + 1)
    }
  })
  
  let metricMin = Math.min.apply(Math, metricValues)
  let metricMax = Math.max.apply(Math, metricValues)

  data.forEach((obj, i) => {
    if (obj[metric] == 'DNC') {
      obj[metric] = metricMax
    }
  })

  // filter data for primary and secondary drivers
  let dataPrimary = data.filter((d) => Number(d.RacesParticipatedGroup) == 1)
  let dataSecondary = data.filter((d) => Number(d.RacesParticipatedGroup) == 0)

  let lessThanFiveOpacity = 1
  let primarySecondaryInterval = 1
  let firstIntervalLineIndex = dataPrimary.length + primarySecondaryInterval - 1

  if (dataPrimary.length == 0) {
    
    dataPrimary = dataSecondary
    dataSecondary = []
    primarySecondaryInterval = 0
    firstIntervalLineIndex = 0
    lessThanFiveOpacity = 0
    
  }

  let xAxisRange = range(0, data.length + primarySecondaryInterval)

  // create indexes for filtered drivers
  dataPrimary.forEach((v ,i) => { v.Index = i })
  dataSecondary.forEach((v ,i) => { v.Index = i + primarySecondaryInterval + dataPrimary.length })

  // let stdLineOffset = 2 * radius
  // let decorLineOffset = 2 * radius
  let decorCircleRadius = px3_5
  let decorLineOffset = decorCircleRadius
  let abbsOffset = px5
  let abbsFontSize = px11
  let stdLineOffset = decorCircleRadius


  // -----------------------------------  SVG  ----------------------------------- //


  // width and height -  of page size
  let widthDiv = getElement(ContainerID).offsetWidth
  
  let heightDiv = getElement(containerAggTable2ID).offsetHeight
  heightDiv = heightDiv - convertRemToPixels(0.125)

  let margin = {top: px20, right: px20, bottom: px37, left: px55}
  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  if (getElement(ContainerID).children.length == 0) { d3.select(containerID).append('svg') }

  let svg = d3.select(containerID).selectAll('svg')
    // .classed('border-blue', true)
    .attr('id', 'svg-season-categories-lol-' + tableID)
    .attr('tableID', tableID)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('name', 'chart-lol-1-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  // // clear chart and agg table whle click on empty space in chart
  // d3GetElement(svg).parentElement.addEventListener('mousedown', (event) => {
  //   if (!event.target.id.startsWith('chart-lol-1-hover-circle')) {
  //     seasonCategoriesDocumentMouseUp(event)
  //   }
    
  // })

  // ------------------------------  SCALES AND AXIS  ------------------------------ //


  let yMin
  let yMax

  let yTicksRangeDensity
  let yAxisDelta

  if (metric != 'PointsAvg') {
    
    yMax = Math.ceil(metricMax + 4)
    yMin = Math.floor(metricMin)

    yTicksRangeDensity = 2
    
  } else {
    
    yMax = Math.ceil(metricMax + 0.5)
    yMin = Math.floor(metricMin)

    yTicksRangeDensity = 1

  }

  if ((!isEven(yMin) && isEven(yMax)) || (isEven(yMin) && !isEven(yMax))) {
    yMax -= 1
  }

  let ytickValues = range(yMin, yMax + 1, yTicksRangeDensity)

  // scales
  let xScale = d3
    .scaleBand()
    .domain(xAxisRange)
    .range([0, width])
    .paddingInner(0.15)
    .paddingOuter(0.35)

  // d3.extent calculates min and max
  let yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])

  d3adjustPaddingOuter(px20, yScale, axis='y', type='linear')

  let xPad = px3
  let xAxisWpad = height + xPad
  
  let yPad = px3
  yAxisWpad = yPad

  let xtickSize = px4
  let ytickSize = px3

  let xtickOuterSize = px5
  let ytickOuterSize = px4

  let yTickPadding = px9

  let xAxis = d3
    .axisBottom(xScale)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickOuterSize)
    .tickFormat('')

  let yAxis = d3
    .axisLeft(yScale)
    .tickSize(ytickSize)
    .tickPadding(yTickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickOuterSize)
    .tickFormat(d3.format('d'))

  let xBottom = svg
    .append("g")
    .attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  let allLessFiveData = data.map(o => Number(o['RacesParticipatedGroup']))
  let allLessFiveDataSum = allLessFiveData.reduce((a, b) => a + b, 0)

  if (allLessFiveDataSum == 0) {

    // tick labels - rank
    xBottom
      .append('g')
      .attr('id', 'ticklabels-' + tableID)
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('id', d => 'chart-lol-1-ticklabel-' + tableID + '-' + d['DriverIDT'])
      .text(d => d['Index'] + 1)
      .attr('x', d => xScale(d['Index']) + 0.5*xScale.bandwidth())
      .attr('y', xtickSize)
      
  } else {

    // tick labels - rank
    xBottom
      .append('g')
      .attr('id', 'ticklabels-' + tableID)
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('id', d => 'chart-lol-1-ticklabel-' + tableID + '-' + d['DriverIDT'])
      .text(d => (d['RacesParticipatedGroup'] == 1) ? d['Index'] + 1 : '')
      .attr('x', d => xScale(d['Index']) + 0.5*xScale.bandwidth())
      .attr('y', xtickSize)
    
  }

  let yLeft = svg
    .append("g")
    .attr('name', 'axis-left')
    .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  if (dataAvailable) {

    
    // ------------------------------  GRID  ------------------------------ //

    // let grid = svg
    //   .append('g')
    //   .attr('name', 'grid')

    // // horizontal
    // grid
    //   .selectAll('line')
    //   .data(data)
    //   .join('line')
    //   // .style('stroke', '#B9BEC3')
    //   // .style('stroke', d =>d['Color'])
    //   .style('stroke-width', px1)
    //   .style('shape-rendering', 'crispEdges')
    //   .style('stroke-dasharray', '4 4')
    //   .style('opacity', 0.5)
    //   .attr('x1', yAxisWpad)
    //   .attr('x2', d => xScale(d['Index']) + 0.5*xScale.bandwidth() - decorCircleRadius - decorLineOffset)
    //   .attr('y1', d => yScale(d[metric]))
    //   .attr('y2', d => yScale(d[metric]))
    //   // .attr('visibility', 'hidden')
    //   .attr('id', d => 'chart-lol-1-grid-' + tableID + '-' + d['DriverIDT'])
    

    // ------------------------------  ABBS  ------------------------------ //


    let abbs = svg
      .append('g')
      .attr('name', 'names')

    abbs
      .attr('id', 'abbs-'+ tableID)
      .selectAll('text')
      .data(data)
      .join('text')
      .text(d => d['Abbreviation'])
      .attr('x', d => xScale(d.Index) + 0.5 * xScale.bandwidth())
      .attr('y', (d) => yScale(d[metric]) - decorCircleRadius - abbsOffset)
      .style('font-family', PrimaryFont)
      .style('fill', d => d['Color'])
      // .style('fill', colorThemesChartAxisTickLabels)
      .style('fill', colorThemesChartAbbsLolColor)
      .style('font-size', `${abbsFontSize}px`)
      .style('font-variation-settings', `'wght' ${600}`)
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'baseline')
      // .style('opacity', colorThemesChartCirclesLolOpacity)
      // .style('line-height', 1)
      .attr('id', d => 'chart-lol-1-abb-' + tableID + '-' + d['DriverIDT'])
      .attr('number', d => d['Number'])
      .attr('color', d => d['Color'])
      .attr('idt', d => d['DriverIDT'])


    // ------------------------------  DECOR CIRCLES ------------------------------ //


    let decorCircles = svg
      .append('g')
      .attr('name', 'circles-decor')

    decorCircles
      .selectAll('circle')
      .data(data)
      .join('circle')
      .style('fill', d => d['Color'])
      .style('r', `${decorCircleRadius}px`)
      .attr('r', `${decorCircleRadius}px`)
      // .style('opacity', colorThemesChartCirclesLolOpacity)
      .attr('cx', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
      .attr('cy', (d) => yScale(d[metric]))
      .attr('id', d => 'chart-lol-1-decor-circle-' + tableID + '-' + d['DriverIDT'])

    // decorCircles
    //   .selectAll('circle')
    //   .data(data)
    //   .join('circle')
    //   .style('fill', d => d['Color'])
    //   .style('stroke', d => shadeColor(d['Color'], -0.15))
    //   .style('stroke-width', px2)
    //   .style('r', `${decorCircleRadius}px`)
    //   .attr('r', `${decorCircleRadius}px`)
    //   // .style('opacity', colorThemesChartCirclesLolOpacity)
    //   .attr('cx', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
    //   .attr('cy', (d) => yScale(d[metric]))
    //   .attr('id', d => 'chart-lol-1-decor-circle-' + tableID + '-' + d['DriverIDT'])

    
    // ------------------------------  DECOR AND STD LINES  ------------------------------ //

  
    let decorLines = svg
      .append('g')
      .attr('name', 'lines-decor')

    decorLines
      .attr('id', 'decor-lines-' + tableID)
      .selectAll('line')
      .data(data)
      .join('line')
      .style('stroke', colorThemesChartDecorLinesLolColor)
      .style('stroke-width', px1)
      // .style('opacity', 0.5)
      .style('shape-rendering', 'crispEdges')
      .attr('x1', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
      .attr('x2', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
      .attr('y1', height)
      .attr('y2', d => yScale(d[metric]) + decorCircleRadius + decorLineOffset)
      .attr('id', d => 'chart-lol-1-decor-line-' + tableID + '-' + d['DriverIDT'])
      .attr('number', d => d['Number'])
      .attr('idt', d => d['DriverIDT'])
  
    let stdLines = svg
      .append('g')
      .attr('name', 'lines-std')
      .attr('id', 'std-lines-' + tableID)

    stdLines
      .selectAll('line')
      .data(data)
      .join('line')
      .style('stroke', d => d['Color'])
      .style('stroke', colorThemesChartStdLinesLolColor)
      .style('shape-rendering', 'geometricPrecision')
      .style('stroke-linecap', 'round')
      .style('stroke-width', px2)
      // .style('opacity', colorThemesChartCirclesLolStdOpacity)
      .attr('id', d => 'chart-lol-1-std-line-' + tableID + '-' + d['DriverIDT'])
      .attr('x1', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
      .attr('x2', d => xScale(d['Index']) + 0.5 * xScale.bandwidth())
      .attr('y1', d => yScale(d[metric]) - decorCircleRadius - abbsOffset - abbsFontSize - stdLineOffset)
      .attr('y2', d => (d[stability] != '-') ? yScale(Number(d[metric]) + 0.5*Number(d[stability])) - decorCircleRadius - abbsOffset - abbsFontSize - stdLineOffset : yScale(d[metric]) - decorCircleRadius - abbsOffset - abbsFontSize - stdLineOffset)
      .style('visibility', d => (d[stability] != '-') ? 'visible' : 'hidden')
      .attr('number', d => d['Number'])
      .attr('color', d => d['Color'])
    
  
    // ------------------------------  GROUPS DEVIDER  ------------------------------ //
  

    let groupsDevider = svg
      .append('g')
      .attr('name', 'devider-groups')
      .attr('id', 'group-devider-' + tableID)
  
    // line
    groupsDevider
      .append('line')
      .style('stroke', colorThemesChartGroupsDevider)
      .style('stroke-width', px1)
      .style('stroke-dasharray', 4)
      .attr('x1', xScale(firstIntervalLineIndex) + 0.5 * xScale.bandwidth())
      .attr('x2', xScale(firstIntervalLineIndex) + 0.5 * xScale.bandwidth())
      .attr('y1', yScale(yMin))
      .attr('y2', yScale(yMax))
      .attr('class', 'groups-devider-line-lol-1')
      .style('opacity', lessThanFiveOpacity)
  
    // hide xtick for devider line
    xBottom.selectAll('g.tick')
    .filter(d => d == firstIntervalLineIndex)
    .select('line')
    .style('opacity', 0)


    // ------------------------------  CIRCLES HOVER  ------------------------------ //
    

    let circlesHover = svg
      .append('g')
      .attr('name', 'circles-hover')
  
    circlesHover
      .attr('id', 'circles-hover-' + tableID)
      .selectAll('circle')
      .data(data)
      .join('circle')
      .style('cursor', 'pointer')
      // .style('fill', '#878D93')
      .style('opacity', 0)
      .attr('id', d => 'chart-lol-1-hover-circle-' + tableID + '-' + d['DriverIDT'])
      .attr('cx', d => xScale(d.Index) + 0.5 * xScale.bandwidth())
      .attr('cy', (d, i) => yScale(d[metric]))
      .style('r', px23)
      .attr('r', px23)
      .attr('number', d => d['Number'])
      .attr('tableID', tableID)
      .attr('idt', d => d['DriverIDT'])
      .on('mouseover', function(event, d) {
        seasonCategoriesElementMouseHover(event)
      })
      .on('mouseleave', function(event, d) {
        seasonCategoriesElementMouseHover(event)
      })
      .on('mousedown', function(event, d) {
        seasonCategoriesElementMouseUp(event.target)
      })
    
  } else {

    svg
      .append('text')
      // .text('No Data Available')
      .text('Данные отсутствуют')
      .attr('x', 0.5 * width)
      .attr('y', 0.5 * height)
      .style('text-anchor', 'middle')
      .style('font-size', `${px30}px`)
      .style('fill', colorThemesChartGray7)
      .style('font-weight', 600)
    
  }

}


function chartLine_1(data1, ContainerID, tableID, metric) {

  let containerID = '#' + ContainerID

  metric = metric.replace('Avg', '')

  d3ResetSVG(ContainerID)


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
  
  // // remove nans
  // positions = arrayDropNaNs(positions)
  // // sort
  // positions = sortArray(positions)
  
  // let lastPosition = positions[0]
  // let lastPosition = Number(metricMax)

  if (metric == 'PointsInterpolated') {

    yTickRangeDensity = 1
    // yTicksDelta = 0.5
    
  }

  let raceIDs = data.map(row => row['RaceID'])
  raceIDs = dropDuplicates(raceIDs)

  let driverIDTs = data.map(row => row['DriverIDT'])
  driverIDTs = dropDuplicates(driverIDTs)


  // --------------------------------  SVG  -------------------------------- //
  

  // width and height -  of page size
  let widthDiv = getElement(ContainerID).offsetWidth
  let heightDiv = getElement(ContainerID).offsetHeight

  // let height1 = getElement('bkyv96').offsetHeight
  // let height2 = getElement('dr8rtm').offsetHeight
  // let heightDiv = height1 - height2 - convertRemToPixels(seasonRatingsTitlesHeight)

  let margin = {top: px40, right: px15, bottom: px37, left: px55}
  
  let width = Math.round(widthDiv - margin.left - margin.right)
  let height = Math.round(heightDiv - margin.top - margin.bottom)

  if (getElement(ContainerID).children.length == 0) { d3.select(containerID).append('svg') }
  
  let svg = d3.select(containerID).selectAll('svg')
    .attr('id', 'svg-season-categories-line-' + tableID)
    .attr('tableID', tableID)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('id', 'chart-line-1-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // --------------------------------  SCALES  -------------------------------- //
  

  // let yMin = 0
  // let yMax = []

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

  let paddingOuter

  if ((0 <= xtickValues.length) && (xtickValues.length < 5)) { paddingOuter = 0.1 }
  else if ((5 <= xtickValues.length) && (xtickValues.length < 10)) { paddingOuter = 0.25 }
  else if (10 <= xtickValues.length) { paddingOuter = 0.5 }

  // scales
  let xScale = d3.scaleBand()
    .domain(xtickValues.map(o => o['tick']))
    .range([0, width])
    .paddingInner(1)
    .paddingOuter(paddingOuter)

  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])
    // .nice()

  d3adjustPaddingOuter(px12, yScale, axis='y', type='linear')

  let xPad = px5
  let xAxisWpad = height + xPad

  let yPad = px5
  yAxisWpad = yPad

  let xtickSize = px4
  let ytickSize = px3

  let xtickSizeOuter = px5
  let ytickSizeOuter = px4

  let ytickPadding = px9

  let xAxis = d3.axisBottom(xScale)
    .tickSize(xtickSize)
    .tickSizeOuter(xtickSizeOuter)
    .tickSizeOuter(xtickSizeOuter)
    .tickFormat('')

  let yAxis = d3.axisLeft(yScale)
    .tickSize(ytickSize)
    .tickPadding(ytickPadding)
    .tickValues(ytickValues)
    .tickSizeOuter(ytickSizeOuter)
    .tickFormat(d3.format('d'))

  let xBottom = svg.append("g").attr('name', 'axis-bottom')
    .attr("transform", `translate(0, ${xAxisWpad})`)

  xBottom
    .append('g')
    .attr('name', 'ticks')
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  xBottom
    .append('g')
    .attr('name', 'labels')
    .selectAll('text')
    .data(xtickValues)
    .join('text')
    .text(d => d['label'])
    .attr("x", d => xScale(d['tick']) + 0.5 * xScale.bandwidth())
    .attr("y", xtickSize)

  let yLeft = svg.append("g").attr('name', 'axis-left')
    .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft
    .append('g')
    .attr('name', 'ticks')
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)


  // --------------------------------  LINES AND CIRCLES  -------------------------------- //


  for (idt of driverIDTs) {

    let dataDriver = data.filter((v, i) => v['DriverIDT'] == idt)

    let line = d3.line()
      // .curve(d3.curveCatmullRom.alpha(0.5))
      // .curve(d3.curveBumpX)
      // .curve(d3.curveCardinal.tension(0.25))
      .curve(d3.curveMonotoneX)
      .x(d => xScale(d['EventIndex']) + 0.5 * xScale.bandwidth())
      .y(d => yScale(d[metric]))

    let lines = svg.append('g').attr('name', 'lines')

    lines
      .attr('id', 'chart-line-1-path-' + tableID + '-' + idt)
      .append('path')
      .style('fill', 'none')
      .style('stroke', colorThemesChartChartLine1Lines)
      .style('stroke-width', px1)
      .style('stroke-linecap', 'round')
      .style('shape-rendering', 'geometricPrecision')
      .datum(dataDriver)
      .attr('number', d => d.Number)
      .attr('idt', d => d.DriverIDT)
      .attr('d', line)

    let circlesDNF = svg.append('g').attr('name', 'circles-dnf')

    circlesDNF
      .attr('id', 'chart-line-1-circles-dnf-' + tableID + '-' + idt)
      .selectAll("circle")
      .data(dataDriver)
      .attr('number', d => d.Number)
      .attr('idt', d => d.DriverIDT)
      .join('circle')
      .style('fill', colorThemesChartBackground)
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

    let circles = svg.append('g').attr('name', 'circles')

    circles
      .attr('id', 'chart-line-1-circles-' + tableID + '-' + idt)
      .selectAll("circle")
      .data(dataDriver)
      .attr('number', d => d.Number)
      .attr('idt', d => d.DriverIDT)
      .join('circle')
      .style('fill', colorThemesChartChartLine1Lines)
      .style('shape-rendering', 'geometricPrecision')
      .attr('cx', d => xScale(d['EventIndex']) + 0.5 * xScale.bandwidth())
      .attr('cy', d => yScale(d[metric]))
      .attr('r', px3)
      .style('r', px3)
      .attr('r', px3)
      .attr('PointsClassified', d => d.PointsClassified)
      .style('opacity', d => {
        let result 
        if ((d.Retired == 1) & (d.PointsClassified == 0)) {
          result = 0
        } else {
          result = 1
        }
        return result
      })

  }

  let legend1Attributes = {
    'y': -px15,
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
    'chart-line-1-main-node', 'legend', 'chart-line-1-legend',
    ['circle w point', 'circle no fill'],
    legendLabels,
    [colorThemesChartAxisTickLabels, colorThemesChartAxisTickLabels], attributesDict=legend1Attributes)

}


function chartHBars_1(driverLeftData, colorLeft, ContainerID, driverRightData, colorRight) {

  // data -> data_2

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // ----------------------------------  DATA  ---------------------------------- //


  let labels = [
    'Рейтинговые баллы', 'Средняя плотность', 'Средний темп',
    'Борьба на трассе', 'Действия на старте'
  ]

  let metrics = [
    'RankPointsAvg', 'RankConsistencyAvg', 'RankPaceAvg',
    'RankOvertakesAvg', 'RankStartAvg'
  ]

  if ((driverLeftData['QualiTeammateDiscreteAvg'] != '-') && (driverRightData['QualiTeammateDiscreteAvg'] != '-')) {
    labels.push('Квалификация')
    metrics.push('QualiTeammateDiscreteAvg')
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

    let percLeft
    let percRight

    if (metric == 'QualiTeammateDiscreteAvg') {

      if ((driverLeft == 0) && (driverRight == 0)) {
        percLeft = 50
        percRight = 50
      } else {
        percLeft = Number((100 * driverLeft / (driverLeft + driverRight)).toFixed(2))
        percRight = Number((100 * driverRight / (driverLeft + driverRight)).toFixed(2))
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

  d3StyleAxis(Object.entries({ xTop }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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
    .style('fill', colorThemesChartAxisTickLabels)
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
    .style('fill', colorThemesChartRatingsBarsLabelsColor)
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
    .style('shape-rendering', 'crispEdges')
    .style('shape-rendering', 'geometricPrecision')
    .attr("x", d => xScale(0))
    .attr("y", d => yScale(d['CoordY']) + labelSeparatorInterval + separatorLength + barSeparatorInterval)
    .attr("height", barThick)
    .attr('width', d => { return (d['RightData'] == 0) ? xScale(d['LeftData']) + separatorInterval : xScale(d['LeftData'])})
    .attr('fill', d => saturateColor(d['LeftColor'], colorThemesChartSaturation))
    .attr('rx', px3)

  // right driver
  barsNode
    .append("g")
    .attr('name', 'right')
    .attr('id', 'season-drivers-hbars-1-bars-left')
    .selectAll('rect')
    .data(driversData)
    .join('rect')
    .style('shape-rendering', 'crispEdges')
    .style('shape-rendering', 'geometricPrecision')
    .attr("x", d => {return (d['LeftData'] == 0) ? xScale(0) : xScale(d['LeftData']) + separatorInterval})
    .attr("y", d => yScale(d['CoordY']) + labelSeparatorInterval + separatorLength + barSeparatorInterval)
    .attr("height", barThick)
    .attr('width', d => { return (d['LeftData'] == 0) ? xScale(d['RightData']) + separatorInterval : xScale(d['RightData'])})
    .attr('fill', d => saturateColor(d['RightColor'], colorThemesChartSaturation))
    .attr('rx', px3)


  // ------------------------------  STARTER LINES  ------------------------------ //
  

  // let starter = main
  //   .append('g')
  //   .attr('name', 'lines-starter')

  // starter
  //   .append('g')
  //   .attr('name', 'right')
  //   .attr('id', 'season-drivers-hbars-1-starter-left')
  //   .selectAll('line')
  //   .data(driversData)
  //   .join('line')
  //   .style('shape-rendering', 'geometricPrecision')
  //   .style('stroke-linecap', 'round')
  //   .attr('x1', d => xScale(0) + px1)
  //   .attr('x2', d => xScale(0) + px1)
  //   .attr('y1', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength + barSeparatorInterval - barStarterLength)
  //   .attr('y2', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength + barSeparatorInterval - barStarterLength + barThick + barStarterLength)
  //   .style('stroke-width', barStarterWidth)
  //   .style('stroke', d => { return (d.LeftData == 0) ? d.RightColor : d.LeftColor })

  // starter
  //   .append('g')
  //   .attr('name', 'left')
  //   .attr('id', 'season-drivers-hbars-1-starter-right')
  //   .selectAll('line')
  //   .data(driversData)
  //   .join('line')
  //   .style('shape-rendering', 'geometricPrecision')
  //   .style('stroke-linecap', 'round')
  //   .attr('x1', d => xScale(d.RightData + d.LeftData) + separatorInterval - px1)
  //   .attr('x2', d => xScale(d.RightData + d.LeftData) + separatorInterval - px1)
  //   .attr('y1', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength + barSeparatorInterval - barStarterLength)
  //   .attr('y2', d => yScale(d.CoordY) + labelSeparatorInterval + separatorLength + barSeparatorInterval - barStarterLength + barThick + barStarterLength)
  //   .style('stroke-width', barStarterWidth)
  //   .style('stroke', d => { return (d.RightData == 0) ? d.LeftColor : d.RightColor })

}


function chartStatistics_1(attributes, driverLeftData, colorLeft, ContainerID, driverRightData, colorRight, size=1) {

  // data -> data_2

  let containerID = '#' + ContainerID

  d3.select(containerID).select('svg').remove()


  // -------------------------------  SVG  ------------------------------- //


  let labelSize = px14 * size
  let labelPad = 1.5 * labelSize * size
  
  let separatorRadius = px2_5 * size
  let separatorLength = px5 * size
  let separatorInterval = px5 * size
  
  let primaryLineWidth = px3 * size
  let decorLineOffset = px10 * size
  
  let valuesSize = px14 * size
  let valuesPad = px12 * size

  // let lineHeight = px50
  let lineHeight = labelSize + 2 * labelPad

  let labels = attributes.map(d => d['Labels'])
  
  // let margin = {top: px20, right: px70, bottom: -px5, left: px65}
  let margin = {top: 0, right: 0, bottom: 0, left: 0}
  
  // width and height -  of page size
  let widthDiv = (getElement(ContainerID).offsetWidth) * size
  let heightDiv = (labels.length * lineHeight + margin.top + margin.bottom) * size

  let width = widthDiv - margin.left - margin.right
  let height = heightDiv - margin.top - margin.bottom

  // move plot little bit down and right from upper left position
  let svg = d3.select(containerID)
    .append('svg')
    // .classed('border-blue o-visible', true)
    .classed('o-visible', true)
    .attr('id', 'svg-season-drivers-statistics-1')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  let mainNode = svg
    .append('g')
    .attr('id', 'chart-season-drivers-statistics-1-main-node')
    .attr("transform", `translate(${margin.left}, ${margin.top})`)


  // -------------------------------  DATA  ------------------------------- //


  let xMin = 0
  let xMax = 100

  let yMin = 0
  let yMax = height

  let labelsCoordY = range(yMax, yMax - lineHeight*labels.length, -lineHeight)
  let yTicks = labelsCoordY
  
  let labelsData = []
  let linesData = []

  attributes.forEach((obj, i) => {

    let label = obj['Label']
    let metric = obj['Metric']
    let ascending = obj['Ascending']

    let leftValue
    let rightValue

    let leftMetric
    let rightMetric

    let metricsNAN = ['DNC', '-']

    if ((metricsNAN.includes(driverLeftData[metric])) && (!metricsNAN.includes(driverRightData[metric]))) {
      
      leftValue = 100
      rightValue = 0

      leftMetric = '-'
      rightMetric = Number(driverRightData[metric])

      ascending = true
      
    } else if ((!metricsNAN.includes(driverLeftData[metric])) && (metricsNAN.includes(driverRightData[metric]))) {
      
      leftValue = 0
      rightValue = 100

      leftMetric = Number(driverLeftData[metric])
      rightMetric = '-'

      ascending = true
      
    } else if ((metricsNAN.includes(driverLeftData[metric])) && (metricsNAN.includes(driverRightData[metric]))) {
      
      leftValue = 50
      rightValue = 50

      leftMetric = '-'
      rightMetric = '-'

      ascending = true
      
    } else {
      
      leftValue = Number(driverLeftData[metric])
      rightValue = Number(driverRightData[metric])

      leftMetric = Number(driverLeftData[metric])
      rightMetric = Number(driverRightData[metric])

    }

    let leftPerc
    let rightPerc

    if ((leftValue == 0) && (rightValue == 0)) {

      leftPerc = 50
      rightPerc = 50
      
    } else {

      if (!ascending) {
      
        leftPerc = Number((100 * leftValue / (leftValue + rightValue)).toFixed(2))
        rightPerc = Number((100 * rightValue / (leftValue + rightValue)).toFixed(2))
        
      } else {
        
        leftPerc = 100 - Number((100 * leftValue / (leftValue + rightValue)).toFixed(2))
        rightPerc = 100 - Number((100 * rightValue / (leftValue + rightValue)).toFixed(2))
        
      }
    
    }

    labelsData.push({
      'Label': label,
      'CoordY': labelsCoordY[i]
    })
    
    linesData.push({
      'Index': i,
      'Label': label,
      'leftValue': leftValue,
      'leftMetric': leftMetric,
      'leftPerc': leftPerc,
      'rightValue': rightValue,
      'rightMetric': rightMetric,
      'rightPerc': rightPerc,
      'CoordY': labelsCoordY[i] - 2 * labelPad
    })
    
  })


  // -------------------------  Y-SCALE AND Y-AXIS  -------------------------- //


  // d3.extent calculates min and max
  let yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0])
      // .nice()

  let yPad = 0
  let yAxisWpad = yPad

  let yAxis = d3.axisLeft(yScale)
    // .tickValues([])
    .tickSize(0)
    .tickFormat('')

  let yLeft = mainNode.append("g").attr('name', 'axis-left')

  yLeft
    .append('g')
    .attr('name', 'ticks')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)
    .call(yAxis)
    .call(g => g.select('.domain').remove())


  // -------------------------------  VALUES  ------------------------------- //


  let values = mainNode.append('g').attr('name', 'values')

  let valuesLeft = values.append('g')
    .attr('id', 'season-drivers-statistics-1-values-left')
    .style('transform', 'translate(100%, 0)')
    .style('transform-box', 'fill-box')

  let valuesRight = values.append('g')
    .attr('id', 'season-drivers-statistics-1-values-right')
    .style('transform', 'translate(-100%, 0)')
    .style('transform-box', 'fill-box')
  
  valuesLeft
    .selectAll('text')
    .data(linesData)
    .join('text')
    .text(d => d['leftMetric'])
    .attr('x', 0)
    .attr('y', d => yScale(d['CoordY']))
    .attr('id', d => 'season-drivers-statistics-1-values-left-' + d['Index'])
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartStatisticsValuesFontColor)
    .style('font-size', `${valuesSize}px`)
    .style('font-variation-settings', colorThemesChartStatisticsValuesWeight)
    .style('text-transform', 'uppercase')
    .style('text-anchor', 'end')
    .style('alignment-baseline', 'central')

  valuesRight
    .selectAll('text')
    .data(linesData)
    .join('text')
    .text(d => d['rightMetric'])
    .attr('x', widthDiv)
    .attr('y', d => yScale(d['CoordY']))
    .attr('id', d => 'season-drivers-statistics-1-values-right-' + d['Index'])
    .style('font-family', PrimaryFont)
    .style('fill', colorThemesChartStatisticsValuesFontColor)
    .style('font-size', `${valuesSize}px`)
    .style('font-variation-settings', colorThemesChartStatisticsValuesWeight)
    .style('text-transform', 'uppercase')
    .style('text-anchor', 'start')
    .style('alignment-baseline', 'central')


  // -------------------------------  X-SCALE AND AXIS  ------------------------------- //


  let lineLeftOffsetX = d3GetElement(valuesLeft).getBoundingClientRect().width + valuesPad
  let lineRightOffsetX = d3GetElement(valuesRight).getBoundingClientRect().width + valuesPad

  // scales
  let xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([lineLeftOffsetX, width-lineRightOffsetX])

  let xPad = 0
  let xAxisWpad = height + xPad


  let xAxis = d3.axisBottom(xScale)
    // .tickValues([])
    .tickSize(0)
    .tickFormat('')


  let xBottom = mainNode.append("g").attr('name', 'axis-bottom')

  xBottom
    .append('g')
    .attr('name', 'ticks')
    // .attr("transform", `translate(0, ${xAxisWpad})`)
    .call(xAxis)
    .call(g => g.select('.domain').remove())


  // -------------------------------  LABELS  ------------------------------- //
  

  let labelsNode = mainNode.append('g').attr('name', 'labels')
    .attr('id', 'season-drivers-statistics-1-labels')

  labelsNode
    .selectAll('text')
    .data(labelsData)
    .join('text')
    .text(d => d['Label'])
    .attr('x', xScale(50))
    .attr('y', d => yScale(d['CoordY'] - labelPad))
    .style('font-family', PrimaryFont)
    .style('text-rendering', 'geometricPrecision')
    .style('fill', colorThemesChartStatisticsLabelsColor)
    .style('font-size', `${labelSize}px`)
    .style('font-variation-settings', colorThemesChartStatisticsLabelsWeight)
    // .style('text-transform', 'uppercase')
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'central')


  // ----------------------------------  LINES  ---------------------------------- //


  let lines = mainNode.append('g').attr('name', 'lines')
  
  lines
    .append('g')
    .attr('name', 'separator-lines-left')
    .attr('id', 'season-drivers-statistics-1-primary-lines')
    .selectAll('lines')
    .data(linesData)
    .join('line')
    .attr("x1", xScale(xMin))
    .attr('x2', d => xScale(d['leftPerc']) - separatorInterval - separatorRadius)
    .attr('y1', d => yScale(d['CoordY']))
    .attr('y2', d => yScale(d['CoordY']))
    .style('stroke-linecap', 'round')
    .style('stroke', colorLeft)
    .style('stroke-width', primaryLineWidth)
    .style('opacity', d => (d['leftPerc'] == 0) ? 0 : 0.5)

  lines
    .append('g')
    .attr('name', 'separator-lines-right')
    .selectAll('lines')
    .data(linesData)
    .join('line')
    .attr('x1', d => xScale(d['leftPerc']) + separatorInterval + separatorRadius)
    .attr('x2', d => xScale(xMax))
    .attr('y1', d => yScale(d['CoordY']))
    .attr('y2', d => yScale(d['CoordY']))
    .style('stroke-linecap', 'round')
    .style('stroke', colorRight)
    .style('stroke-width', primaryLineWidth)
    .style('opacity', d => (d['rightPerc'] == 0) ? 0 : 0.5)


  // // -------------------------------  SEPARATOR  ------------------------------- //
  

  let separator = mainNode.append('g').attr('name', 'separator')

  separator
    .append('g')
    .attr('name', 'separator-circles')
    .attr('id', 'season-drivers-statistics-1-decor-lines')
    .selectAll('circle')
    .data(linesData)
    .join('circle')
    .attr('cx', d => xScale(d['leftPerc']))
    .attr("cy", d => yScale(d['CoordY']))
    .style('r', separatorRadius)
    .attr('r', separatorRadius)
    .style('fill', '#32373C')
    .style('fill', '#5A5F64')
    .style('shape-rendering', 'geometricPrecision')

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let xGrid = xBottom.append('g').attr('name', 'grid')
  d3DrawXGrid(svg, 'grid-bottom', xScale, xtickValues, height, 0, colorThemesChartGrid, scaleType='band')
  
  let yGrid = yLeft.append('g').attr('name', 'grid')
  d3DrawYGrid(svg, 'grid-left', yScale, ytickValues, 0, width, colorThemesChartGrid, scaleType='linear')


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
    .style('fill', colorThemesChartBackground)
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
    .style('fill', colorThemesChartBackground)
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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)
  
  // grid-x
  d3DrawXGrid(svg, 'grid-bottom', xScale, xtickValues, height, 0, colorThemesChartGrid)
  
  // grid-y
  d3DrawYGrid(svg, 'grid-left', yScale, ytickValues, 0, width, colorThemesChartGrid, scaleType='linear')
  

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
    .style('fill', colorThemesChartBackground)
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
    .style('fill', colorThemesChartBackground)
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
  
  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  PARAMETERS  ------------------------------- //


  let xTickSize = px4
  let yTickSizeLeft = px3
  let yTickSizeRight = px4

  let xTickSize2 = px5

  let xTickSizeOuter = px5
  let yTickSizeOuterLeft = px4
  let yTickSizeOuterRight = px5

  let xTickPad = px8
  let xTickPad2 = px8
  let yTickPad = px8
  
  let xPad = px3
  let yPad = px3

  let paddingOuterX
  let paddingOuterY = px12

  let yAxisWidth = px40
  let yAxisRightOffsetCorrection = px2

  let chart1Height = Math.floor(convertRemToPixels(15))
  let chart3Height = Math.floor(convertRemToPixels(10))

  let lineWidth = px2
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  let offsetLegendX = px17

  let offsetYmain1 = px14
  let offsetYmain2 = px16
  let offsetYmain3 = px14

  let offsetX = px5
  let offsetY = px0

  let chart2LegendCirclesRadius = px3
  let chart2LegendCirclesOpacity = 0.3

  
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
  
  let xTickValues = range(0, xMax)

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

      if (noDefineConditions.includes(leftData[0]['ClassifiedPositionLabel'])
          && noDefineConditions.includes(rightData[0]['ClassifiedPositionLabel'])) {
        
        metricDiff = 0
        
        leftRetired = 1
        rightRetired = 1
        
        leftMarker = leftData[0]['ClassifiedPositionLabel']
        rightMarker = rightData[0]['ClassifiedPositionLabel']
        
      } else if (noDefineConditions.includes(leftData[0]['ClassifiedPositionLabel'])) {
        
        metricDiff = 0
        leftMarker = leftData[0]['ClassifiedPositionLabel']
        
      } else if (noDefineConditions.includes(rightData[0]['ClassifiedPositionLabel'])) {
        
        metricDiff = 0
        rightMarker = rightData[0]['ClassifiedPositionLabel']
        
      } else {
        
        metricDiff =  rightData[0][metric] - leftData[0][metric]
        
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0]['GridPositionLabel']
      rightGridPosition = rightData[0]['GridPositionLabel']
      
      leftClassPosition = leftData[0]['ClassifiedPositionLabel']
      rightClassPosition = rightData[0]['ClassifiedPositionLabel']
      
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

  let yMin3 = roundStep(-metricDiffMaxAbs, 5, 'floor')
  let yMax3 = roundStep(metricDiffMaxAbs, 5, 'ceil')

  let ytickValues3Length

  if ((yMax3 <= 10) || (yMax3 > 15)) {
    ytickValues3Length = '2'
  } else {
    ytickValues3Length = '3'
  }

  let ytickValues3 = generateRange(yMin3, yMax3, length=ytickValues3Length)

  if ((firstElement(ytickValues3) == 0) && (lastElement(ytickValues3) == 0)) {
    ytickValues3 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px30
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px18
  }
  else {
    barWidth = px14
    paddingOuterX = px18
  }


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.floor(containerSizes.width)
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-5-' + id

  let svg = d3.select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthContainer)
    // .attr('height', height)

  let legendID = 'legend-5-' + id
  let legend = svg
    .append('g')
    .attr('name', 'legend')
    .attr('id', legendID)

  let main1ID = 'chart-5-main-1-' + id
  let main1 = svg
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')

  let main2ID = 'chart-5-main-2-' + id
  let main2 = svg
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let main3ID = 'chart-5-main-3-' + id
  let main3 = svg
    .append('g')
    .attr('name', 'main-3')
    .attr('id', main3ID)

  let chart3 = main3
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legend1ID = 'legend-5-1-' + id

  let legend1Attributes = {
    'x': 0,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames,
    'markerCircleRadius': px4,
    'intervalInner': px14,
    'intervalNodes': px24,
  }

  if (plotRightOpacity == 1) {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle', 'circle'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend1 = getElement(legend1ID)
  let legend1Sizes = getSizes(legend1)
  let legend1Height = Math.floor(legend1Sizes.height)

  let legend2ID = 'legend-5-2-' + id

  let legend2Attributes = {
    'x': 0,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo,
    'markerCircleNoFillStrokeWidth': px1_5,
    'markerCirclePointRadius': px2_5,
  }

  let legend2Labels = [
    'Не финишировал', 'Не стартовал / Дисквалификация'
  ]

  // second legend
  d3legend(
    legendID, 'legend-2', legend2ID, ['circle w point', 'circle no fill'],
    legend2Labels,
    ['#6E7378', '#6E7378'], attributesDict=legend2Attributes, align='right')

  let legend2 = getElement(legend2ID)
  let legend2Sizes = getSizes(legend2)
  let legend2Width = Math.floor(legend2Sizes.width)
  let legend2Height = Math.floor(legend2Sizes.height)

  let legendElement = getElement(legendID)
  let legendElementSizes = getSizes(legendElement)
  let legendElementHeight = Math.floor(legendElementSizes.height)


  // ------------------------  TRANSITION LEGEND ------------------------- //


  // move legend1
  let legend1TransformX = Math.floor(yAxisWidth + offsetLegendX)
  legend1.setAttribute('transform', `translate(${legend1TransformX}, 0)`)

  // move legend2 later when 'width' calculated

  // move legend
  let legendTransformX = Math.floor(offsetX)
  let legendTransformY = Math.floor(offsetY + 0.5 * legendElementHeight)
  legendElement.setAttribute('transform', `translate(${legendTransformX}, ${legendTransformY})`)
  

  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([chart1Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    // .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft1Element = d3GetElement(yLeft1)

  let yLeft1Width = Math.ceil(getSizes(yLeft1Element).width)

  let yRight1Element = d3GetElement(yRight1)
  let yRight1Width = Math.ceil(getSizes(yRight1Element).width)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - offsetX - yAxisWidth - yPad - yPad - yAxisWidth - offsetX - yAxisRightOffsetCorrection

  let xScale = d3
    .scaleBand()
    // .domain(data.map(d => d['Index']))
    .domain(xTickValues)
    .range([0, width])
    // .paddingInner(1)
    // .paddingOuter(1)

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterX, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom1.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)

  d3StyleAxis(Object.entries({ xBottom1 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  TRANSITION 1 ------------------------- //


  // move legend2
  let legend2TransformX = Math.floor(yAxisWidth + yPad + width - legend2Width - offsetLegendX)
  legend2.setAttribute('transform', `translate(${legend2TransformX}, 0)`)

  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(yAxisWidth)
  let yRight1TransformX = Math.floor(yAxisWidth + yPad + width + yPad)
  
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, 0)`)
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, 0)`)

  // move x-axis
  let xBottomTransformX = yAxisWidth + yPad
  let xBottomTransformY = chart1Height + xPad
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // move main1
  let main1Element = d3GetElement(main1)
  let main1TransformX = offsetX
  let main1TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1
  )

  main1Element.setAttribute('transform', `translate(${main1TransformX}, ${main1TransformY})`)
  
  // move chart1
  let chart1Element = d3GetElement(chart1)
  chart1Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)
  

  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //


  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize2)
    .tickSizeOuter(0)
    .tickFormat('')

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis')
    // .attr('id', 'slider-1-bottom-axis')

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'slider-1-absolute-values-ticks')
    .call(xAxis2)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  // xBottom2.selectAll('.tick text').style('opacity', 0)
  // xBottom2.selectAll('.tick line').attr('transform', `translate(0, ${-0.5*xTickSize + px0_5})`)
  xBottom2.selectAll('.tick').style('visibility', 'hidden')

  // d3StyleAxis(Object.entries({ xBottom2 }), px1, px11, axis='x', xTickPad2, colorThemesChartAxis, colorThemesChartFont8)


  // ------------------------  CHART 2 ------------------------- //


  // adjust and cut domain length by 'paddingOuterX'
  let ticks2Element = d3GetElement(xBottom2)
  let ticks2Domain = getElementsListByClass('domain', ticks2Element)[0]
  let ticks2DomainD = ticks2Domain.getAttribute('d')

  let ticks2DomainDSplitted = ticks2DomainD.split('H')
  let ticks2DomainDM = ticks2DomainDSplitted[0]
  let ticks2DomainDH = ticks2DomainDSplitted[1]

  let ticks2DomainDMSplitted = ticks2DomainDM.replace('M', '').split(',')
  let ticks2DomainDMCoordX = ticks2DomainDMSplitted[0]
  let ticks2DomainDMCoordY = ticks2DomainDMSplitted[1]

  let ticks2DomainDHCoord = ticks2DomainDH.replace('H', '')

  ticks2DomainDMCoordX = Number(ticks2DomainDMCoordX) + paddingOuterX
  ticks2DomainDHCoord = Number(ticks2DomainDHCoord) - paddingOuterX

  let ticks2DomainDNew = `M${ticks2DomainDMCoordX}${ticks2DomainDMCoordY}H${ticks2DomainDHCoord}`

  ticks2Domain.setAttribute('d', ticks2DomainDNew)
  ticks2Domain.style.stroke = colorThemesChartAxis

  // create elements
  let chart2 = xBottom2
    .append("g")
    .attr('name', 'chart')

  let labels2Left = chart2
    .append("g")
    .attr('name', 'labels-left')
    .attr('id', 'slider-1-absolute-values-left')

  let labels2Right = chart2
    .append("g")
    .attr('name', 'labels-right')
    .attr('id', 'slider-1-absolute-values-right')

  let path = xBottom2
    .append("g")
    .attr('name', 'line')

  let circles = chart2
    .append("g")
    .attr('name', 'circles')
    .attr('id', 'slider-1-absolute-values-circles')

  let circlesLegend2Left = chart2
    .append("g")
    .attr('name', 'circles-legend-left')
  
  let circlesLegend2Right = chart2
    .append("g")
    .attr('name', 'circles-legend-right')

  // draw elements
  labels2Left
    .selectAll("text")
    .data(dataLeft)
    .join('text')
    .classed('ti9x7f', true)
    // .text(d => d[metric.replace('Interpolated', '')])
    .text(d => d['ClassifiedPositionLabel'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('y', -xTickPad2)
    .attr('CoordIndex', d => d['CoordIndex'])

  labels2Right
    .selectAll("text")
    .data(dataRight)
    .join('text')
    .classed('ti9x7f', true)
    // .text(d => d[metric.replace('Interpolated', '')])
    .text(d => d['ClassifiedPositionLabel'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('y', 0)
    .attr('dy', d => {

      let result = px10 - px2 + xTickPad2
      let metricCleared = metric.replace('Interpolated', '')
      
      if (d[metricCleared] == '-') {
        result -= px1_5
      }

      return result
      
    })
    .attr('CoordIndex', d => d['CoordIndex'])

  circlesLegend2Left
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Left
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  path
    .append('path')
    .attr('id', 'slider-1-absolute-values-path')
    .classed('bvgagu', true)

  circles
    .selectAll('circle')
    .data(eventsData)
    .join('circle')
    .classed('f3or44', true)
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', px0_5)
    .attr('CoordIndex', d => d['CoordIndex'])
  
  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  TRANSITION 2  ------------------------- //

  
  // move axis
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${0})`)

  // move main1
  let main2Element = d3GetElement(main2)
  let main2TransformX = offsetX
  let main2TransformY = main1TransformY + chart1Height + xBottom1ElementHeight + 0.5*xBottom2ElementHeight + offsetYmain2

  main2Element.setAttribute('transform', `translate(${main1TransformX}, ${main2TransformY})`)


  // ------------------------  Y-SCALE 3, Y-AXIS 3, Y-LABELS 3  ------------------------- //


  let yScale3 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues3), lastElement(ytickValues3)])
    .range([chart3Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale3, axis='y', type='linear')

  let yAxis3 = d3
    .axisLeft(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yLeft3 = main3
    .append("g")
    .attr('name', 'axis-left')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis3)
    // .call(g => g.select('.domain').remove())

   let yAxisRight3 = d3
    .axisRight(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yRight3 = main3
    .append("g")
    .attr('name', 'axis-right')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yRight3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight3)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft3, yRight3 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight3
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft3Element = d3GetElement(yLeft3)
  let yLeft3Width = Math.ceil(getSizes(yLeft3Element).width)
  
  let yRight3Element = d3GetElement(yRight3)
  let yRight3Width = Math.ceil(getSizes(yRight3Element).width)


  // ------------------------  X-SCALE 3 and X-AXIS 3  ------------------------- //

  
  let xAxis3 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    // .tickFormat('')

  let xBottom3 = main3
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', 'slider-1-bottom-axis')

  xBottom3
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis3)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom3.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 3 ------------------------- //


  // xtick labels 2
  xBottom3
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', 'slider-1-ticklabels-group')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventName', d => d['EventNameShortRus'])
    // .attr('EventNumber', d => d['EventNumber'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom3 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom3Element = d3GetElement(xBottom3)
  let xBottom3ElementSizes = getSizes(xBottom3Element)
  let xBottom3ElementHeight = Math.ceil(xBottom3ElementSizes.height)


  // ------------------------  TRANSITIONS 3 ------------------------- //


  // move y-axis
  let yLeft3TransformX = Math.floor(yAxisWidth)
  let yRight3TransformX = Math.floor(yAxisWidth + yPad + yPad + xAxisLength)

  yLeft3Element.setAttribute('transform', `translate(${yLeft3TransformX}, 0)`)
  yRight3Element.setAttribute('transform', `translate(${yRight3TransformX}, 0)`)

  // move x-axis
  let xBottom3TransformY = chart3Height + xPad
  
  xBottom3Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom3TransformY})`)

  // move main1
  let main3Element = d3GetElement(main3)
  let main3TransformX = offsetX
  let main3TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3
  )

  main3Element.setAttribute('transform', `translate(${main3TransformX}, ${main3TransformY})`)

  // move chart1
  let chart3Element = d3GetElement(chart3)
  chart3Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)


  // ------------------------ SVG HEIGHT ------------------------ //


  let height = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3 + chart3Height + xPad + xBottom3ElementHeight
  )

  d3GetElement(svg).setAttribute('height', height)


  // ------------------------ GRID 1 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart1, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart1Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart1, name='grid-left', scale=yScale1, tickValues=ytickValues1,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let line = d3
    .line()
    // .curve(d3.curveCatmullRom.alpha(1))
    // .curve(d3.curveBumpX)
    // .curve(d3.curveCardinal.tension(0.4))
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
    .style('fill', colorThemesChartBackground)
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
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
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
    .style('fill', colorThemesChartBackground)
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
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
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


  // ------------------------ GRID 3 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart3, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart3Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart3, name='grid-left', scale=yScale3, tickValues=ytickValues3,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 3  ------------------------ //


  let dnf = chart3
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart3
    .append('g')
    .attr('name', 'bars')

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
    .attr('y', yScale3(0) + px8)
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
    .attr('y', yScale3(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftClassPosition'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    // .style('cursor', 'pointer')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale3(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale3(0) - yScale3(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)
    // .on('mouseover', function(event, d) {
    //   if (notMobileDevice) {
    //     d3.select(this).style('opacity', 0.75)
    //   }
    // })
    // .on('mousemove', (event, d) => {
    //   if (notMobileDevice) { showTooltip(event, d) }
    // })
    // .on('mouseleave', function(event, d) {
    //   if (notMobileDevice) {
    //     d3.select(this).style('opacity', 1)
    //     hideTooltip(event, d)
    //   }
    // })


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': metric.replace('Interpolated', ''),
    'Cumulative': null
  }

  seasonComparisonSliderCreate(
    sliderElementID='test',
    axisBottomID='slider-1-bottom-axis',
    svgID=svgID,
    dataDiff=dataDiff,
    dataLeft=dataLeft,
    dataRight=dataRight,
    colorLeft=colorLeftS,
    colorRight=colorRightS,
    metric=sliderMetrics,
    type='average',
    subType='lower'
  )
  
}


function chart_6(data1, ContainerID, metric, driverIDTs, colors, id) {

  // data1 : data_1

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)
  
  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  PARAMETERS  ------------------------------- //


  let xTickSize = px4
  let yTickSizeLeft = px3
  let yTickSizeRight = px4

  let xTickSize2 = px5

  let xTickSizeOuter = px5
  let yTickSizeOuterLeft = px4
  let yTickSizeOuterRight = px5

  let xTickPad = px8
  let xTickPad2 = px8
  let yTickPad = px8
  
  let xPad = px3
  let yPad = px3

  let paddingOuterX
  let paddingOuterY = px12

  let yAxisWidth = px40
  let yAxisRightOffsetCorrection = px2

  let chart1Height = Math.floor(convertRemToPixels(15))
  let chart3Height = Math.floor(convertRemToPixels(10))

  let lineWidth = px2
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  let offsetLegendX = px17

  let offsetYmain1 = px14
  let offsetYmain2 = px16
  let offsetYmain3 = px14

  let offsetX = px5
  let offsetY = px0

  let chart2LegendCirclesRadius = px3
  let chart2LegendCirclesOpacity = 0.3

  
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
  
  let xTickValues = range(0, xMax)

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

      if (noDefineConditions.includes(leftData[0]['GridPositionLabel'])
          && noDefineConditions.includes(rightData[0]['GridPositionLabel'])) {
        
        metricDiff = 0
        
        leftRetired = 1
        rightRetired = 1
        
        leftMarker = leftData[0]['GridPositionLabel']
        rightMarker = rightData[0]['GridPositionLabel']
        
      } else if (noDefineConditions.includes(leftData[0]['GridPositionLabel'])) {
        
        metricDiff = 0
        leftMarker = leftData[0]['GridPositionLabel']
        
      } else if (noDefineConditions.includes(rightData[0]['GridPositionLabel'])) {
        
        metricDiff = 0
        rightMarker = rightData[0]['GridPositionLabel']
        
      } else {
        
        metricDiff =  rightData[0][metric] - leftData[0][metric]
        
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0]['GridPositionLabel']
      rightGridPosition = rightData[0]['GridPositionLabel']
      
      leftClassPosition = leftData[0]['ClassifiedPositionLabel']
      rightClassPosition = rightData[0]['ClassifiedPositionLabel']
      
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

  let yMin3 = roundStep(-metricDiffMaxAbs, 5, 'floor')
  let yMax3 = roundStep(metricDiffMaxAbs, 5, 'ceil')

  let ytickValues3Length

  if ((yMax3 <= 10) || (yMax3 > 15)) {
    ytickValues3Length = '2'
  } else {
    ytickValues3Length = '3'
  }

  let ytickValues3 = generateRange(yMin3, yMax3, length=ytickValues3Length)

  if ((firstElement(ytickValues3) == 0) && (lastElement(ytickValues3) == 0)) {
    ytickValues3 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px30
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px18
  }
  else {
    barWidth = px14
    paddingOuterX = px18
  }


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.floor(containerSizes.width)
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-6-' + id

  let svg = d3.select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthContainer)
    // .attr('height', height)

  let legendID = 'legend-5-' + id
  let legend = svg
    .append('g')
    .attr('name', 'legend')
    .attr('id', legendID)

  let main1ID = 'chart-5-main-1-' + id
  let main1 = svg
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')

  let main2ID = 'chart-5-main-2-' + id
  let main2 = svg
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let main3ID = 'chart-5-main-3-' + id
  let main3 = svg
    .append('g')
    .attr('name', 'main-3')
    .attr('id', main3ID)

  let chart3 = main3
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legend1ID = 'legend-5-1-' + id

  let legend1Attributes = {
    'x': 0,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames,
    'markerCircleRadius': px4,
    'intervalInner': px14,
    'intervalNodes': px24,
  }

  if (plotRightOpacity == 1) {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle', 'circle'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend1 = getElement(legend1ID)
  let legend1Sizes = getSizes(legend1)
  let legend1Height = Math.floor(legend1Sizes.height)

  let legend2ID = 'legend-5-2-' + id

  let legend2Attributes = {
    'x': 0,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo,
    'markerCircleNoFillStrokeWidth': px1_5,
    'markerCirclePointRadius': px2_5,
  }

  let legend2Labels = [
    'Стартовал с пит-лейн', 'Не стартовал'
  ]

  // second legend
  d3legend(
    legendID, 'legend-2', legend2ID, ['circle w point', 'circle no fill'],
    legend2Labels,
    ['#6E7378', '#6E7378'], attributesDict=legend2Attributes, align='right')

  let legend2 = getElement(legend2ID)
  let legend2Sizes = getSizes(legend2)
  let legend2Width = Math.floor(legend2Sizes.width)
  let legend2Height = Math.floor(legend2Sizes.height)

  let legendElement = getElement(legendID)
  let legendElementSizes = getSizes(legendElement)
  let legendElementHeight = Math.floor(legendElementSizes.height)


  // ------------------------  TRANSITION LEGEND ------------------------- //


  // move legend1
  let legend1TransformX = Math.floor(yAxisWidth + offsetLegendX)
  legend1.setAttribute('transform', `translate(${legend1TransformX}, 0)`)

  // move legend2 later when 'width' calculated

  // move legend
  let legendTransformX = Math.floor(offsetX)
  let legendTransformY = Math.floor(offsetY + 0.5 * legendElementHeight)
  legendElement.setAttribute('transform', `translate(${legendTransformX}, ${legendTransformY})`)
  

  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([chart1Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    // .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft1Element = d3GetElement(yLeft1)

  let yLeft1Width = Math.ceil(getSizes(yLeft1Element).width)

  let yRight1Element = d3GetElement(yRight1)
  let yRight1Width = Math.ceil(getSizes(yRight1Element).width)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - offsetX - yAxisWidth - yPad - yPad - yAxisWidth - offsetX - yAxisRightOffsetCorrection

  let xScale = d3
    .scaleBand()
    // .domain(data.map(d => d['Index']))
    .domain(xTickValues)
    .range([0, width])
    // .paddingInner(1)
    // .paddingOuter(1)

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterX, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom1.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)

  d3StyleAxis(Object.entries({ xBottom1 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  TRANSITION 1 ------------------------- //


  // move legend2
  let legend2TransformX = Math.floor(yAxisWidth + yPad + width - legend2Width - offsetLegendX)
  legend2.setAttribute('transform', `translate(${legend2TransformX}, 0)`)

  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(yAxisWidth)
  let yRight1TransformX = Math.floor(yAxisWidth + yPad + width + yPad)
  
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, 0)`)
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, 0)`)

  // move x-axis
  let xBottomTransformX = yAxisWidth + yPad
  let xBottomTransformY = chart1Height + xPad
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // move main1
  let main1Element = d3GetElement(main1)
  let main1TransformX = offsetX
  let main1TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1
  )

  main1Element.setAttribute('transform', `translate(${main1TransformX}, ${main1TransformY})`)
  
  // move chart1
  let chart1Element = d3GetElement(chart1)
  chart1Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)
  

  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //


  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize2)
    .tickSizeOuter(0)
    .tickFormat('')

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis')
    // .attr('id', 'slider-1-bottom-axis')

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'slider-1-absolute-values-ticks')
    .call(xAxis2)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  // xBottom2.selectAll('.tick text').style('opacity', 0)
  // xBottom2.selectAll('.tick line').attr('transform', `translate(0, ${-0.5*xTickSize + px0_5})`)
  xBottom2.selectAll('.tick').style('visibility', 'hidden')

  // d3StyleAxis(Object.entries({ xBottom2 }), px1, xTicklabelSize2, axis='x', xTickPad2, colorThemesChartAxis, colorThemesChartFont8)


  // ------------------------  CHART 2 ------------------------- //


  // adjust and cut domain length by 'paddingOuterX'
  let ticks2Element = d3GetElement(xBottom2)
  let ticks2Domain = getElementsListByClass('domain', ticks2Element)[0]
  let ticks2DomainD = ticks2Domain.getAttribute('d')

  let ticks2DomainDSplitted = ticks2DomainD.split('H')
  let ticks2DomainDM = ticks2DomainDSplitted[0]
  let ticks2DomainDH = ticks2DomainDSplitted[1]

  let ticks2DomainDMSplitted = ticks2DomainDM.replace('M', '').split(',')
  let ticks2DomainDMCoordX = ticks2DomainDMSplitted[0]
  let ticks2DomainDMCoordY = ticks2DomainDMSplitted[1]

  let ticks2DomainDHCoord = ticks2DomainDH.replace('H', '')

  ticks2DomainDMCoordX = Number(ticks2DomainDMCoordX) + paddingOuterX
  ticks2DomainDHCoord = Number(ticks2DomainDHCoord) - paddingOuterX

  let ticks2DomainDNew = `M${ticks2DomainDMCoordX}${ticks2DomainDMCoordY}H${ticks2DomainDHCoord}`

  ticks2Domain.setAttribute('d', ticks2DomainDNew)
  ticks2Domain.style.stroke = colorThemesChartAxis

  // create elements
  let chart2 = xBottom2
    .append("g")
    .attr('name', 'chart')

  let labels2Left = chart2
    .append("g")
    .attr('name', 'labels-left')
    .attr('id', 'slider-1-absolute-values-left')

  let labels2Right = chart2
    .append("g")
    .attr('name', 'labels-right')
    .attr('id', 'slider-1-absolute-values-right')

  let path = xBottom2
    .append("g")
    .attr('name', 'line')

  let circles = chart2
    .append("g")
    .attr('name', 'circles')
    .attr('id', 'slider-1-absolute-values-circles')

  let circlesLegend2Left = chart2
    .append("g")
    .attr('name', 'circles-legend-left')
  
  let circlesLegend2Right = chart2
    .append("g")
    .attr('name', 'circles-legend-right')

  // draw elements
  labels2Left
    .selectAll("text")
    .data(dataLeft)
    .join('text')
    .classed('ti9x7f', true)
    .text(d => d[metric.replace('Interpolated', '')])
    .attr('x', d => xScale(Number(d['CoordIndex'])) + 0.5*xScale.bandwidth())
    .attr('y', -xTickPad2)
    .attr('CoordIndex', d => d['CoordIndex'])

  labels2Right
    .selectAll("text")
    .data(dataRight)
    .join('text')
    .classed('ti9x7f', true)
    .text(d => d[metric.replace('Interpolated', '')])
    .attr('x', d => xScale(Number(d['CoordIndex'])) + 0.5*xScale.bandwidth())
    .attr('y', 0)
    .attr('dy', d => {

      let result = px10 - px2 + xTickPad2
      let metricCleared = metric.replace('Interpolated', '')
      
      if (d[metricCleared] == '-') {
        result -= px1_5
      }

      return result
      
    })
    .attr('CoordIndex', d => d['CoordIndex'])

  circlesLegend2Left
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Left
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  path
    .append('path')
    .attr('id', 'slider-1-absolute-values-path')
    .classed('bvgagu', true)

  circles
    .selectAll('circle')
    .data(eventsData)
    .join('circle')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', px0_5)
    .classed('f3or44', true)
    .attr('CoordIndex', d => d['CoordIndex'])
  
  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  TRANSITION 2  ------------------------- //

  
  // move axis
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${0})`)

  // move main1
  let main2Element = d3GetElement(main2)
  let main2TransformX = offsetX
  let main2TransformY = main1TransformY + chart1Height + xBottom1ElementHeight + 0.5*xBottom2ElementHeight + offsetYmain2

  main2Element.setAttribute('transform', `translate(${main1TransformX}, ${main2TransformY})`)


  // ------------------------  Y-SCALE 3, Y-AXIS 3, Y-LABELS 3  ------------------------- //


  let yScale3 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues3), lastElement(ytickValues3)])
    .range([chart3Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale3, axis='y', type='linear')

  let yAxis3 = d3
    .axisLeft(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yLeft3 = main3
    .append("g")
    .attr('name', 'axis-left')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis3)
    // .call(g => g.select('.domain').remove())

   let yAxisRight3 = d3
    .axisRight(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yRight3 = main3
    .append("g")
    .attr('name', 'axis-right')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yRight3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight3)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft3, yRight3 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight3
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft3Element = d3GetElement(yLeft3)
  let yLeft3Width = Math.ceil(getSizes(yLeft3Element).width)
  
  let yRight3Element = d3GetElement(yRight3)
  let yRight3Width = Math.ceil(getSizes(yRight3Element).width)


  // ------------------------  X-SCALE 3 and X-AXIS 3  ------------------------- //

  
  let xAxis3 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    // .tickFormat('')

  let xBottom3 = main3
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', 'slider-1-bottom-axis')

  xBottom3
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis3)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom3.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 3 ------------------------- //


  // xtick labels 2
  xBottom3
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', 'slider-1-ticklabels-group')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom3 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom3Element = d3GetElement(xBottom3)
  let xBottom3ElementSizes = getSizes(xBottom3Element)
  let xBottom3ElementHeight = Math.ceil(xBottom3ElementSizes.height)


  // ------------------------  TRANSITIONS 3 ------------------------- //


  // move y-axis
  let yLeft3TransformX = Math.floor(yAxisWidth)
  let yRight3TransformX = Math.floor(yAxisWidth + yPad + yPad + xAxisLength)

  yLeft3Element.setAttribute('transform', `translate(${yLeft3TransformX}, 0)`)
  yRight3Element.setAttribute('transform', `translate(${yRight3TransformX}, 0)`)

  // move x-axis
  let xBottom3TransformY = chart3Height + xPad
  
  xBottom3Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom3TransformY})`)

  // move main1
  let main3Element = d3GetElement(main3)
  let main3TransformX = offsetX
  let main3TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3
  )

  main3Element.setAttribute('transform', `translate(${main3TransformX}, ${main3TransformY})`)

  // move chart1
  let chart3Element = d3GetElement(chart3)
  chart3Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)


  // ------------------------ SVG HEIGHT ------------------------ //


  let height = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3 + chart3Height + xPad + xBottom3ElementHeight
  )

  d3GetElement(svg).setAttribute('height', height)


  // ------------------------ GRID 1 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart1, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart1Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart1, name='grid-left', scale=yScale1, tickValues=ytickValues1,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let line = d3
    .line()
    // .curve(d3.curveCatmullRom.alpha(1))
    // .curve(d3.curveBumpX)
    // .curve(d3.curveCardinal.tension(0.4))
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
    .style('stroke', colorRight)

  // circles dnf right
  right
    .append('g')
    .attr('name', 'circles-dnf')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorThemesChartBackground)
    .style('stroke', colorRight)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('visibility', d => { return (noDefineConditions.includes(d['GridPositionLabel'])) ? 'visible' : 'hidden' })

  // circles right
  right
    .append('g')
    .attr('name', 'circles')
    .selectAll("circle")
    .data(dataRight)
    .join('circle')
    .style('fill', colorRight)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    // .style('r', circleRadius)
    // .attr('r', circleRadius)
    .style('r', d => {

      let condition = (
        (d['GridPositionLabel'] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius
      
    })
    .attr('r', d => {

      let condition = (
        (d['GridPositionLabel'] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => { return (d['GridPositionLabel'] == 'DNS') ? 'hidden' : 'visible' })

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
    .style('fill', colorThemesChartBackground)
    .style('stroke', colorLeftS)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', d => yScale1(d[metric]))
    .style('r', circleDNFRadiusBorder)
    .attr('r', circleDNFRadiusBorder)
    .style('opacity', d => { return (noDefineConditions.includes(d['GridPositionLabel'])) ? 1 : 0 })

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
        (d['GridPositionLabel'] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .attr('r', d => {

      let condition = (
        (d['GridPositionLabel'] == 'PLS')
      )
      
      return (condition) ? circleDNFRadius : circleRadius 
      
    })
    .style('visibility', d => { return (d['GridPositionLabel'] == 'DNS') ? 'hidden' : 'visible' })


  // ------------------------ GRID 3 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart3, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart3Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart3, name='grid-left', scale=yScale3, tickValues=ytickValues3,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 3  ------------------------ //


  let dnf = chart3
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart3
    .append('g')
    .attr('name', 'bars')

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
    .attr('y', yScale3(0) + px8)
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
    .attr('y', yScale3(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftGridPosition'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    // .style('cursor', 'pointer')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale3(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale3(0) - yScale3(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)
    // .on('mouseover', function(event, d) {
    //   if (notMobileDevice) {
    //     d3.select(this).style('opacity', 0.75)
    //   }
    // })
    // .on('mousemove', (event, d) => {
    //   if (notMobileDevice) { showTooltip(event, d) }
    // })
    // .on('mouseleave', function(event, d) {
    //   if (notMobileDevice) {
    //     d3.select(this).style('opacity', 1)
    //     hideTooltip(event, d)
    //   }
    // })


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': metric.replace('Interpolated', ''),
    'Cumulative': null
  }

  seasonComparisonSliderCreate(
    sliderElementID='test',
    axisBottomID='slider-1-bottom-axis',
    svgID=svgID,
    dataDiff=dataDiff,
    dataLeft=dataLeft,
    dataRight=dataRight,
    colorLeft=colorLeftS,
    colorRight=colorRightS,
    metric=sliderMetrics,
    type='average',
    subType='lower'
  )
  
}


function chart_7(data1, ContainerID, metric, driverIDTs, colors, id) {

  // data1 : data_1

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)
  
  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  PARAMETERS  ------------------------------- //


  let xTickSize = px4
  let yTickSizeLeft = px3
  let yTickSizeRight = px4

  let xTickSize2 = px5
  // let xTicklabelSize2 = px10

  let xTickSizeOuter = px5
  let yTickSizeOuterLeft = px4
  let yTickSizeOuterRight = px5

  let xTickPad = px8
  let xTickPad2 = px8
  let yTickPad = px8
  
  let xPad = px3
  let yPad = px3

  let paddingOuterX
  let paddingOuterY = px12

  let yAxisWidth = px40
  let yAxisRightOffsetCorrection = px2

  let chart1Height = Math.floor(convertRemToPixels(15))
  let chart3Height = Math.floor(convertRemToPixels(10))

  let lineWidth = px2
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  let offsetLegendX = px17

  let offsetYmain1 = px14
  let offsetYmain2 = px16
  let offsetYmain3 = px14

  let offsetX = px5
  let offsetY = px0

  let chart2LegendCirclesRadius = px3
  let chart2LegendCirclesOpacity = 0.3

  
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
  
  let xTickValues = range(0, xMax)

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

    eventNameRus = d['EventNameRus']

    if (leftData.length == 0) {
      
      pointsDiff = 0
      
    } else if (rightData.length == 0) {
      
      pointsDiff = 0
      
    } else {

      if (((leftData[0]['ClassifiedPositionLabel'] == 'DNF') || (leftData[0]['ClassifiedPositionLabel'] == 'DSQ'))
          && ((rightData[0]['ClassifiedPositionLabel'] == 'DNF') || (rightData[0]['ClassifiedPositionLabel'] == 'DSQ'))) {
        
        pointsDiff = 0
        
        leftRetired = 1
        rightRetired = 1
        
        leftMarker = leftData[0]['ClassifiedPositionLabel']
        rightMarker = rightData[0]['ClassifiedPositionLabel']
        
      } else if ((leftData[0]['ClassifiedPositionLabel'] == 'DNF') || (leftData[0]['ClassifiedPositionLabel'] == 'DSQ')) {
        
        pointsDiff = -rightData[0]['PointsOfficial']
        leftMarker = leftData[0]['ClassifiedPositionLabel']
        
      } else if ((rightData[0]['ClassifiedPositionLabel'] == 'DNF') || (rightData[0]['ClassifiedPositionLabel'] == 'DSQ')) {
        
        pointsDiff = +leftData[0]['PointsOfficial']
        rightMarker = rightData[0]['ClassifiedPositionLabel']
        
      } else {
        
        pointsDiff = leftData[0]['PointsOfficial'] - rightData[0]['PointsOfficial']
        
      }

      leftFullName = leftData[0]['FullName']
      rightFullName = rightData[0]['FullName']
      
      leftGridPosition = leftData[0]['GridPositionLabel']
      rightGridPosition = rightData[0]['GridPositionLabel']
      
      leftClassPosition = leftData[0]['ClassifiedPositionLabel']
      rightClassPosition = rightData[0]['ClassifiedPositionLabel']
      
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

  let yMin3 = roundStep(-pointsDiffMaxAbs, 5, 'floor')
  let yMax3 = roundStep(pointsDiffMaxAbs, 5, 'ceil')

  let ytickValues3 = generateRange(yMin3, yMax3)

  if ((firstElement(ytickValues3) == 0) && (lastElement(ytickValues3) == 0)) {
    ytickValues3 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px30
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px18
  }
  else {
    barWidth = px14
    paddingOuterX = px18
  }


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.floor(containerSizes.width)
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-7-' + id

  let svg = d3.select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthContainer)
    // .attr('height', height)

  let legendID = 'legend-5-' + id
  let legend = svg
    .append('g')
    .attr('name', 'legend')
    .attr('id', legendID)

  let main1ID = 'chart-5-main-1-' + id
  let main1 = svg
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')

  let main2ID = 'chart-5-main-2-' + id
  let main2 = svg
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let main3ID = 'chart-5-main-3-' + id
  let main3 = svg
    .append('g')
    .attr('name', 'main-3')
    .attr('id', main3ID)

  let chart3 = main3
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legend1ID = 'legend-5-1-' + id

  let legend1Attributes = {
    'x': 0,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames,
    'markerCircleRadius': px4,
    'intervalInner': px14,
    'intervalNodes': px24,
  }

  if (plotRightOpacity == 1) {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle', 'circle'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend1 = getElement(legend1ID)
  let legend1Sizes = getSizes(legend1)
  let legend1Height = Math.floor(legend1Sizes.height)

  // let legend2ID = 'legend-5-2-' + id

  // let legend2Attributes = {
  //   'x': 0,
  //   'intervalInner': px12,
  //   'labelSize': 0.75,
  //   'labelColor': colorThemesChartChartLineLegendInfo,
  //   'markerCircleNoFillStrokeWidth': px1_5,
  //   'markerCirclePointRadius': px2_5,
  // }

  // let legend2Labels = [
  //   'Стартовал с пит-лейн', 'Не стартовал'
  // ]

  // // second legend
  // d3legend(
  //   legendID, 'legend-2', legend2ID, ['circle w point', 'circle no fill'],
  //   legend2Labels,
  //   ['#6E7378', '#6E7378'], attributesDict=legend2Attributes, align='right')

  // let legend2 = getElement(legend2ID)
  // let legend2Sizes = getSizes(legend2)
  // let legend2Width = Math.floor(legend2Sizes.width)
  // let legend2Height = Math.floor(legend2Sizes.height)

  let legendElement = getElement(legendID)
  let legendElementSizes = getSizes(legendElement)
  let legendElementHeight = Math.floor(legendElementSizes.height)


  // ------------------------  TRANSITION LEGEND ------------------------- //


  // move legend1
  let legend1TransformX = Math.floor(yAxisWidth + offsetLegendX)
  legend1.setAttribute('transform', `translate(${legend1TransformX}, 0)`)

  // move legend2 later when 'width' calculated

  // move legend
  let legendTransformX = Math.floor(offsetX)
  let legendTransformY = Math.floor(offsetY + 0.5 * legendElementHeight)
  legendElement.setAttribute('transform', `translate(${legendTransformX}, ${legendTransformY})`)
  

  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([chart1Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    // .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft1Element = d3GetElement(yLeft1)

  let yLeft1Width = Math.ceil(getSizes(yLeft1Element).width)

  let yRight1Element = d3GetElement(yRight1)
  let yRight1Width = Math.ceil(getSizes(yRight1Element).width)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - offsetX - yAxisWidth - yPad - yPad - yAxisWidth - offsetX - yAxisRightOffsetCorrection

  let xScale = d3
    .scaleBand()
    // .domain(data.map(d => d['Index']))
    .domain(xTickValues)
    .range([0, width])
    // .paddingInner(1)
    // .paddingOuter(1)

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterX, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom1.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)

  d3StyleAxis(Object.entries({ xBottom1 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  TRANSITION 1 ------------------------- //


  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(yAxisWidth)
  let yRight1TransformX = Math.floor(yAxisWidth + yPad + width + yPad)
  
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, 0)`)
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, 0)`)

  // move x-axis
  let xBottomTransformX = yAxisWidth + yPad
  let xBottomTransformY = chart1Height + xPad
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // move main1
  let main1Element = d3GetElement(main1)
  let main1TransformX = offsetX
  let main1TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1
  )

  main1Element.setAttribute('transform', `translate(${main1TransformX}, ${main1TransformY})`)
  
  // move chart1
  let chart1Element = d3GetElement(chart1)
  chart1Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)
  

  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //


  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize2)
    .tickSizeOuter(0)
    .tickFormat('')

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis')
    // .attr('id', 'slider-1-bottom-axis')

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'slider-1-absolute-values-ticks')
    .call(xAxis2)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  // xBottom2.selectAll('.tick text').style('opacity', 0)
  // xBottom2.selectAll('.tick line').attr('transform', `translate(0, ${-0.5*xTickSize + px0_5})`)
  xBottom2.selectAll('.tick').style('visibility', 'hidden')

  // d3StyleAxis(Object.entries({ xBottom2 }), px1, xTicklabelSize2, axis='x', xTickPad2, colorThemesChartAxis, colorThemesChartFont8)


  // ------------------------  CHART 2 ------------------------- //


  // adjust and cut domain length by 'paddingOuterX'
  let ticks2Element = d3GetElement(xBottom2)
  let ticks2Domain = getElementsListByClass('domain', ticks2Element)[0]
  let ticks2DomainD = ticks2Domain.getAttribute('d')

  let ticks2DomainDSplitted = ticks2DomainD.split('H')
  let ticks2DomainDM = ticks2DomainDSplitted[0]
  let ticks2DomainDH = ticks2DomainDSplitted[1]

  let ticks2DomainDMSplitted = ticks2DomainDM.replace('M', '').split(',')
  let ticks2DomainDMCoordX = ticks2DomainDMSplitted[0]
  let ticks2DomainDMCoordY = ticks2DomainDMSplitted[1]

  let ticks2DomainDHCoord = ticks2DomainDH.replace('H', '')

  ticks2DomainDMCoordX = Number(ticks2DomainDMCoordX) + paddingOuterX
  ticks2DomainDHCoord = Number(ticks2DomainDHCoord) - paddingOuterX

  let ticks2DomainDNew = `M${ticks2DomainDMCoordX}${ticks2DomainDMCoordY}H${ticks2DomainDHCoord}`

  ticks2Domain.setAttribute('d', ticks2DomainDNew)
  ticks2Domain.style.stroke = colorThemesChartAxis

  // create elements
  let chart2 = xBottom2
    .append("g")
    .attr('name', 'chart')

  let labels2Left = chart2
    .append("g")
    .attr('name', 'labels-left')
    .attr('id', 'slider-1-absolute-values-left')

  let labels2Right = chart2
    .append("g")
    .attr('name', 'labels-right')
    .attr('id', 'slider-1-absolute-values-right')

  let path = xBottom2
    .append("g")
    .attr('name', 'line')

  let circles = chart2
    .append("g")
    .attr('name', 'circles')
    .attr('id', 'slider-1-absolute-values-circles')

  let circlesLegend2Left = chart2
    .append("g")
    .attr('name', 'circles-legend-left')
  
  let circlesLegend2Right = chart2
    .append("g")
    .attr('name', 'circles-legend-right')

  // draw elements
  labels2Left
    .selectAll("text")
    .data(dataLeft)
    .join('text')
    // .style('font-family', PrimaryFont)
    // .style('text-anchor', 'middle')
    // .style('font-size', '0.625rem')
    // .style('font-variation-settings', "'wght' 600")
    // .style('fill', colorThemesChartFont8)
    .classed('ti9x7f', true)
    .text(d => d['PointsOfficial'])
    .attr('x', d => xScale(Number(d['CoordIndex'])) + 0.5*xScale.bandwidth())
    .attr('y', -xTickPad2)
    .attr('CoordIndex', d => d['CoordIndex'])

  labels2Right
    .selectAll("text")
    .data(dataRight)
    .join('text')
    // .style('font-family', PrimaryFont)
    // .style('text-anchor', 'middle')
    // .style('font-size', '0.625rem')
    // .style('font-variation-settings', "'wght' 600")
    .style('fill', colorThemesChartFont8)
    .classed('ti9x7f', true)
    .text(d => d['PointsOfficial'])
    .attr('x', d => xScale(Number(d['CoordIndex'])) + 0.5*xScale.bandwidth())
    // .attr('y', 0)
    .attr('y', d => {

      let result = px10 - px2 + xTickPad2
      let metricCleared = metric.replace('Interpolated', '')
      
      if (d[metricCleared] == '-') {
        result -= px1_5
      }

      return result
      
    })
    .attr('CoordIndex', d => d['CoordIndex'])

  circlesLegend2Left
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Left
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  path
    .append('path')
    .attr('id', 'slider-1-absolute-values-path')
    .classed('bvgagu', true)

  circles
    .selectAll('circle')
    .data(eventsData)
    .join('circle')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', px0_5)
    .classed('f3or44', true)
    .attr('CoordIndex', d => d['CoordIndex'])
  
  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  TRANSITION 2  ------------------------- //

  
  // move axis
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${0})`)

  // move main1
  let main2Element = d3GetElement(main2)
  let main2TransformX = offsetX
  let main2TransformY = main1TransformY + chart1Height + xBottom1ElementHeight + 0.5*xBottom2ElementHeight + offsetYmain2

  main2Element.setAttribute('transform', `translate(${main1TransformX}, ${main2TransformY})`)


  // ------------------------  Y-SCALE 3, Y-AXIS 3, Y-LABELS 3  ------------------------- //


  let yScale3 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues3), lastElement(ytickValues3)])
    .range([chart3Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale3, axis='y', type='linear')

  let yAxis3 = d3
    .axisLeft(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yLeft3 = main3
    .append("g")
    .attr('name', 'axis-left')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis3)
    // .call(g => g.select('.domain').remove())

   let yAxisRight3 = d3
    .axisRight(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yRight3 = main3
    .append("g")
    .attr('name', 'axis-right')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yRight3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight3)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft3, yRight3 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight3
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft3Element = d3GetElement(yLeft3)
  let yLeft3Width = Math.ceil(getSizes(yLeft3Element).width)
  
  let yRight3Element = d3GetElement(yRight3)
  let yRight3Width = Math.ceil(getSizes(yRight3Element).width)


  // ------------------------  X-SCALE 3 and X-AXIS 3  ------------------------- //

  
  let xAxis3 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    // .tickFormat('')

  let xBottom3 = main3
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', 'slider-1-bottom-axis')

  xBottom3
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis3)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom3.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 3 ------------------------- //


  // xtick labels 2
  xBottom3
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', 'slider-1-ticklabels-group')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom3 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom3Element = d3GetElement(xBottom3)
  let xBottom3ElementSizes = getSizes(xBottom3Element)
  let xBottom3ElementHeight = Math.ceil(xBottom3ElementSizes.height)


  // ------------------------  TRANSITIONS 3 ------------------------- //


  // move y-axis
  let yLeft3TransformX = Math.floor(yAxisWidth)
  let yRight3TransformX = Math.floor(yAxisWidth + yPad + yPad + xAxisLength)

  yLeft3Element.setAttribute('transform', `translate(${yLeft3TransformX}, 0)`)
  yRight3Element.setAttribute('transform', `translate(${yRight3TransformX}, 0)`)

  // move x-axis
  let xBottom3TransformY = chart3Height + xPad
  
  xBottom3Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom3TransformY})`)

  // move main1
  let main3Element = d3GetElement(main3)
  let main3TransformX = offsetX
  let main3TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3
  )

  main3Element.setAttribute('transform', `translate(${main3TransformX}, ${main3TransformY})`)

  // move chart1
  let chart3Element = d3GetElement(chart3)
  chart3Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)


  // ------------------------ SVG HEIGHT ------------------------ //


  let height = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3 + chart3Height + xPad + xBottom3ElementHeight
  )

  d3GetElement(svg).setAttribute('height', height)


  // ------------------------ GRID 1 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart1, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart1Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart1, name='grid-left', scale=yScale1, tickValues=ytickValues1,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let line = d3
    .line()
    // .curve(d3.curveCatmullRom.alpha(0.5))
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
    // .style('filter', colorThemesChartChartLineLineShadow)
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
    // .style('opacity', d => { return (d.NotStarted == 1) ? 0 : 1 })

  
  // ------------------------ GRID 3 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart3, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart3Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart3, name='grid-left', scale=yScale3, tickValues=ytickValues3,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 3  ------------------------ //


  let dnf = chart3
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart3
    .append('g')
    .attr('name', 'bars')

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
    .attr('y', yScale3(0) + px8)
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
    .attr('y', yScale3(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftClassPosition'])) ? 1 : 0 })

  bars
      .selectAll('rect')
      .data(dataDiff)
      .join('rect')
      .style('cursor', 'pointer')
      .style('shape-rendering', 'geometricPrecision')
      .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
      .attr('y', d => yScale3(Math.max(0, d['MetricDiff'])))
      .attr('width', barWidth)
      .attr('height', d => Math.abs(yScale3(0) - yScale3(d['MetricDiff'])))
      .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
      .attr('rx', px7)
      .on('mouseover', function(event, d) {
        if (notMobileDevice) {
          d3.select(this).style('opacity', 0.75)
        }
      })
      .on('mousemove', (event, d) => {
        if (notMobileDevice) { showTooltip(event, d, d3.pointer(event, svg.node())) }
      })
      .on('mouseleave', function(event, d) {
        if (notMobileDevice) {
          d3.select(this).style('opacity', 1)
          hideTooltip(event, d)
        }
      })


  // -------------------------------------  TOOLTIP  ------------------------------------- //


  let tooltipElement = getElement('tooltip-' + id)

  if (!tooltipElement) {
    
    tooltip  = d3.select(containerID)
      .append('div')
      .attr('class', 'tooltip')
      .attr('id', 'tooltip-' + id)

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

    let svgElement = d3GetElement(svg)
    let svgElementSizes = getSizes(svgElement)

    let svgElementLeft = svgElementSizes.left
    let svgElementTop = svgElementSizes.top

    let mouseXCoord = coord[0]
    let mouseYCoord = coord[1] + px16
    
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

  seasonComparisonSliderCreate(
    sliderElementID='test',
    axisBottomID='slider-1-bottom-axis',
    svgID=svgID,
    dataDiff=dataDiff,
    dataLeft=dataLeft,
    dataRight=dataRight,
    colorLeft=colorLeftS,
    colorRight=colorRightS,
    metric=sliderMetrics,
    type='cumulative',
    subType='higher'
  )
  
}


function chart_8(data1, ContainerID, metric, driverIDTs, colors, id) {

  // data1 : data_1

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)
  let containerSizes = getSizes(container)
  
  d3.select(containerID).selectAll('svg > *').remove()


  // -------------------------------  PARAMETERS  ------------------------------- //


  let xTickSize = px4
  let yTickSizeLeft = px3
  let yTickSizeRight = px4

  let xTickSize2 = px5

  let xTickSizeOuter = px5
  let yTickSizeOuterLeft = px4
  let yTickSizeOuterRight = px5

  let xTickPad = px8
  let xTickPad2 = px8
  let yTickPad = px8
  
  let xPad = px3
  let yPad = px3

  let paddingOuterX
  let paddingOuterY = px12

  let yAxisWidth = px40
  let yAxisRightOffsetCorrection = px2

  let chart1Height = Math.floor(convertRemToPixels(15))
  let chart3Height = Math.floor(convertRemToPixels(10))

  let lineWidth = px2
  let circleRadius = px3_5

  let circleDNFRadius = px2_5
  let circleDNFRadiusBorder = px5

  let offsetLegendX = px17

  let offsetYmain1 = px14
  let offsetYmain2 = px16
  let offsetYmain3 = px14

  let offsetX = px5
  let offsetY = px0

  let chart2LegendCirclesRadius = px3
  let chart2LegendCirclesOpacity = 0.3

  
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
  
  let xTickValues = range(0, xMax)

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

  eventsData.forEach((d, i) => {

    let metricCleared = metric.replace('Interpolated', '')

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
      
      leftGridPosition = leftData[0]['GridPositionLabel']
      rightGridPosition = rightData[0]['GridPositionLabel']
      
      leftClassPosition = leftData[0]['ClassifiedPositionLabel']
      rightClassPosition = rightData[0]['ClassifiedPositionLabel']
      
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

  let yMin3 = roundStep(-metricDiffMaxAbs, 5, 'floor')
  let yMax3 = roundStep(metricDiffMaxAbs, 5, 'ceil')

  let ytickValues3Length

  if ((yMax3 <= 10) || (yMax3 > 15)) {
    ytickValues3Length = '2'
  } else {
    ytickValues3Length = '3'
  }

  let ytickValues3 = generateRange(yMin3, yMax3, length=ytickValues3Length)

  if ((firstElement(ytickValues3) == 0) && (lastElement(ytickValues3) == 0)) {
    ytickValues3 = [-1, 0, 1]
  }

  let barWidth

  if (dataDiff.length < 10) {
    barWidth = px30
    paddingOuterX = px30
  }
  else if ((dataDiff.length >= 10) && (dataDiff.length < 20)) {
    barWidth = px14
    paddingOuterX = px18
  }
  else {
    barWidth = px14
    paddingOuterX = px18
  }


  // ------------------------  SVG  ------------------------- //

  
  let widthContainer = Math.floor(containerSizes.width)
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-8-' + id

  let svg = d3.select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthContainer)
    // .attr('height', height)

  let legendID = 'legend-5-' + id
  let legend = svg
    .append('g')
    .attr('name', 'legend')
    .attr('id', legendID)

  let main1ID = 'chart-5-main-1-' + id
  let main1 = svg
    .append('g')
    .attr('name', 'main-1')
    .attr('id', main1ID)

  let chart1 = main1
    .append('g')
    .attr('name', 'chart')

  let main2ID = 'chart-5-main-2-' + id
  let main2 = svg
    .append('g')
    .attr('name', 'main-2')
    .attr('id', main2ID)

  let main3ID = 'chart-5-main-3-' + id
  let main3 = svg
    .append('g')
    .attr('name', 'main-3')
    .attr('id', main3ID)

  let chart3 = main3
    .append('g')
    .attr('name', 'chart')


  // ----------------------------------  LEGEND  ---------------------------------- //


  let legend1ID = 'legend-5-1-' + id

  let legend1Attributes = {
    'x': 0,
    'labelSize': 0.8125,
    'labelColor': colorThemesChartChartLineLegendNames,
    'markerCircleRadius': px4,
    'intervalInner': px14,
    'intervalNodes': px24,
  }

  if (plotRightOpacity == 1) {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle', 'circle'],
      [dataLeft[0]['LastName'], dataRight[0]['LastName']],
      [colorLeft, colorRight], attributesDict=legend1Attributes)
    
  } else {

    d3legend(
      legendID, 'legend-1', legend1ID, ['circle'],
      [dataLeft[0]['LastName']],
      [colorLeft], attributesDict=legend1Attributes)
      
  }

  let legend1 = getElement(legend1ID)
  let legend1Sizes = getSizes(legend1)
  let legend1Height = Math.floor(legend1Sizes.height)

  let legend2ID = 'legend-5-2-' + id

  let legend2Attributes = {
    'x': 0,
    'intervalInner': px12,
    'labelSize': 0.75,
    'labelColor': colorThemesChartChartLineLegendInfo,
    'markerCircleNoFillStrokeWidth': px1_5,
    'markerCirclePointRadius': px2_5,
  }

  let legend2Labels = [
    'Не классифицирован в рейтинге',
  ]

  // second legend
  d3legend(
    legendID, 'legend-2', legend2ID, ['circle no fill'],
    legend2Labels,
    ['#6E7378', '#6E7378'], attributesDict=legend2Attributes, align='right')

  let legend2 = getElement(legend2ID)
  let legend2Sizes = getSizes(legend2)
  let legend2Width = Math.floor(legend2Sizes.width)
  let legend2Height = Math.floor(legend2Sizes.height)

  let legendElement = getElement(legendID)
  let legendElementSizes = getSizes(legendElement)
  let legendElementHeight = Math.floor(legendElementSizes.height)


  // ------------------------  TRANSITION LEGEND ------------------------- //


  // move legend1
  let legend1TransformX = Math.floor(yAxisWidth + offsetLegendX)
  legend1.setAttribute('transform', `translate(${legend1TransformX}, 0)`)

  // move legend2 later when 'width' calculated

  // move legend
  let legendTransformX = Math.floor(offsetX)
  let legendTransformY = Math.floor(offsetY + 0.5 * legendElementHeight)
  legendElement.setAttribute('transform', `translate(${legendTransformX}, ${legendTransformY})`)
  

  // ------------------------  Y-SCALE 1, Y-AXIS 1, Y-LABELS 1  ------------------------- //


  let yScale1 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues1), lastElement(ytickValues1)])
    .range([chart1Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale1, axis='y', type='linear')

  let yAxis1Left = d3
    .axisLeft(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)

  let yLeft1 = main1
    .append("g")
    .attr('name', 'axis-left')

  yLeft1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Left)
    // .call(g => g.select('.domain').remove())

  let yAxis1Right = d3
    .axisRight(yScale1)
    .tickValues(ytickValues1)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)

  let yRight1 = main1
    .append("g")
    .attr('name', 'axis-right')

  yRight1
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis1Right)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft1Element = d3GetElement(yLeft1)

  let yLeft1Width = Math.ceil(getSizes(yLeft1Element).width)

  let yRight1Element = d3GetElement(yRight1)
  let yRight1Width = Math.ceil(getSizes(yRight1Element).width)


  // ------------------------  X-SCALE and X-AXIS 1  ------------------------- //


  let width = widthContainer - offsetX - yAxisWidth - yPad - yPad - yAxisWidth - offsetX - yAxisRightOffsetCorrection

  let xScale = d3
    .scaleBand()
    // .domain(data.map(d => d['Index']))
    .domain(xTickValues)
    .range([0, width])
    // .paddingInner(1)
    // .paddingOuter(1)

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterX, xScale, axis='x', type='band')

  let xAxis1 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    .tickFormat('')

  let xBottom1 = main1
    .append("g")
    .attr('name', 'axis-bottom')
    // .attr('id', 'chart-1-bottom-axis-' + id)

  xBottom1
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis1)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom1.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 1 ------------------------- //


  // xtick labels 1
  xBottom1
    .append('g')
    .attr('name', 'ticklabels')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)

  d3StyleAxis(Object.entries({ xBottom1 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom1Element = d3GetElement(xBottom1)
  let xBottom1ElementSizes = getSizes(xBottom1Element)
  let xBottom1ElementHeight = Math.ceil(xBottom1ElementSizes.height)


  // ------------------------  TRANSITION 1 ------------------------- //


  // move legend2
  let legend2TransformX = Math.floor(yAxisWidth + yPad + width - legend2Width - offsetLegendX)
  legend2.setAttribute('transform', `translate(${legend2TransformX}, 0)`)

  // move left and right y-axis
  let xAxisLength = xScale.range()[1] - xScale.range()[0]

  let yLeft1TransformX = Math.floor(yAxisWidth)
  let yRight1TransformX = Math.floor(yAxisWidth + yPad + width + yPad)
  
  yLeft1Element.setAttribute('transform', `translate(${yLeft1TransformX}, 0)`)
  yRight1Element.setAttribute('transform', `translate(${yRight1TransformX}, 0)`)

  // move x-axis
  let xBottomTransformX = yAxisWidth + yPad
  let xBottomTransformY = chart1Height + xPad
  xBottom1Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottomTransformY})`)

  // move main1
  let main1Element = d3GetElement(main1)
  let main1TransformX = offsetX
  let main1TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1
  )

  main1Element.setAttribute('transform', `translate(${main1TransformX}, ${main1TransformY})`)
  
  // move chart1
  let chart1Element = d3GetElement(chart1)
  chart1Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)
  

  // ------------------------  X-SCALE 2 and X-AXIS 2  ------------------------- //


  let xAxis2 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize2)
    .tickSizeOuter(0)
    .tickFormat('')

  let xBottom2 = main2
    .append("g")
    .attr('name', 'axis')
    // .attr('id', 'slider-1-bottom-axis')

  xBottom2
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'slider-1-absolute-values-ticks')
    .call(xAxis2)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  // xBottom2.selectAll('.tick text').style('opacity', 0)
  // xBottom2.selectAll('.tick line').attr('transform', `translate(0, ${-0.5*xTickSize + px0_5})`)
  xBottom2.selectAll('.tick').style('visibility', 'hidden')

  // d3StyleAxis(Object.entries({ xBottom2 }), px1, xTicklabelSize2, axis='x', xTickPad2, colorThemesChartAxis, colorThemesChartFont8)


  // ------------------------  CHART 2 ------------------------- //


  // adjust and cut domain length by 'paddingOuterX'
  let ticks2Element = d3GetElement(xBottom2)
  let ticks2Domain = getElementsListByClass('domain', ticks2Element)[0]
  let ticks2DomainD = ticks2Domain.getAttribute('d')

  let ticks2DomainDSplitted = ticks2DomainD.split('H')
  let ticks2DomainDM = ticks2DomainDSplitted[0]
  let ticks2DomainDH = ticks2DomainDSplitted[1]

  let ticks2DomainDMSplitted = ticks2DomainDM.replace('M', '').split(',')
  let ticks2DomainDMCoordX = ticks2DomainDMSplitted[0]
  let ticks2DomainDMCoordY = ticks2DomainDMSplitted[1]

  let ticks2DomainDHCoord = ticks2DomainDH.replace('H', '')

  ticks2DomainDMCoordX = Number(ticks2DomainDMCoordX) + paddingOuterX
  ticks2DomainDHCoord = Number(ticks2DomainDHCoord) - paddingOuterX

  let ticks2DomainDNew = `M${ticks2DomainDMCoordX}${ticks2DomainDMCoordY}H${ticks2DomainDHCoord}`

  ticks2Domain.setAttribute('d', ticks2DomainDNew)
  ticks2Domain.style.stroke = colorThemesChartAxis

  // create elements
  let chart2 = xBottom2
    .append("g")
    .attr('name', 'chart')

  let labels2Left = chart2
    .append("g")
    .attr('name', 'labels-left')
    .attr('id', 'slider-1-absolute-values-left')

  let labels2Right = chart2
    .append("g")
    .attr('name', 'labels-right')
    .attr('id', 'slider-1-absolute-values-right')

  let path = xBottom2
    .append("g")
    .attr('name', 'line')

  let circles = chart2
    .append("g")
    .attr('name', 'circles')
    .attr('id', 'slider-1-absolute-values-circles')

  let circlesLegend2Left = chart2
    .append("g")
    .attr('name', 'circles-legend-left')
  
  let circlesLegend2Right = chart2
    .append("g")
    .attr('name', 'circles-legend-right')

  // draw elements
  labels2Left
    .selectAll("text")
    .data(dataLeft)
    .join('text')
    .classed('ti9x7f', true)
    .text(d => d[metric.replace('Interpolated', '')])
    .attr('x', d => xScale(Number(d['CoordIndex'])) + 0.5*xScale.bandwidth())
    .attr('y', -xTickPad2)
    .attr('CoordIndex', d => d['CoordIndex'])

  labels2Right
    .selectAll("text")
    .data(dataRight)
    .join('text')
    .classed('ti9x7f', true)
    .text(d => d[metric.replace('Interpolated', '')])
    .attr('x', d => xScale(Number(d['CoordIndex'])) + 0.5*xScale.bandwidth())
    .attr('y', 0)
    .attr('dy', d => {

      let result = px10 - px2 + xTickPad2
      let metricCleared = metric.replace('Interpolated', '')
      
      if (d[metricCleared] == '-') {
        result -= px1_5
      }

      return result
      
    })
    .attr('CoordIndex', d => d['CoordIndex'])

  circlesLegend2Left
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Left
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', -px4 + px1 - xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorLeft)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', -0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  circlesLegend2Right
    .append('circle')
    .attr('cx', width + 0.25*chart2LegendCirclesRadius)
    .attr('cy', px4 + xTickPad2)
    .attr('r', chart2LegendCirclesRadius)
    .style('r', chart2LegendCirclesRadius)
    .style('fill', colorRight)
    .style('opacity', chart2LegendCirclesOpacity)

  path
    .append('path')
    .attr('id', 'slider-1-absolute-values-path')
    .classed('bvgagu', true)

  circles
    .selectAll('circle')
    .data(eventsData)
    .join('circle')
    .attr('cx', d => xScale(d['CoordIndex']) + 0.5*xScale.bandwidth())
    .attr('cy', px0_5)
    .classed('f3or44', true)
    .attr('CoordIndex', d => d['CoordIndex'])
  
  let xBottom2Element = d3GetElement(xBottom2)
  let xBottom2ElementSizes = getSizes(xBottom2Element)
  let xBottom2ElementHeight = Math.ceil(xBottom2ElementSizes.height)


  // ------------------------  TRANSITION 2  ------------------------- //

  
  // move axis
  xBottom2Element.setAttribute('transform', `translate(${xBottomTransformX}, ${0})`)

  // move main1
  let main2Element = d3GetElement(main2)
  let main2TransformX = offsetX
  let main2TransformY = main1TransformY + chart1Height + xBottom1ElementHeight + 0.5*xBottom2ElementHeight + offsetYmain2

  main2Element.setAttribute('transform', `translate(${main1TransformX}, ${main2TransformY})`)


  // ------------------------  Y-SCALE 3, Y-AXIS 3, Y-LABELS 3  ------------------------- //


  let yScale3 = d3
    .scaleLinear()
    .domain([firstElement(ytickValues3), lastElement(ytickValues3)])
    .range([chart3Height, 0])

  // make space between end of axis and first tick equals for both x and y axises
  d3adjustPaddingOuter(paddingOuterY, yScale3, axis='y', type='linear')

  let yAxis3 = d3
    .axisLeft(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeLeft)
    .tickSizeOuter(yTickSizeOuterLeft)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yLeft3 = main3
    .append("g")
    .attr('name', 'axis-left')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yLeft3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxis3)
    // .call(g => g.select('.domain').remove())

   let yAxisRight3 = d3
    .axisRight(yScale3)
    .tickValues(ytickValues3)
    .tickSize(yTickSizeRight)
    .tickSizeOuter(yTickSizeOuterRight)
    .tickFormat(v => Math.abs(v))
    // .tickFormat(x => x.toFixed(countDecimals(x)))
    // .tickFormat(d3.format('c'))

  let yRight3 = main3
    .append("g")
    .attr('name', 'axis-right')
    // .attr('id', 'chart-1-left-axis-' + id)
    // .style('transform-box', 'fill-box')
    // .attr("transform", `translate(${-yAxisWpad}, 0)`)

  yRight3
    .append("g")
    .attr('name', 'ticks')
    .call(yAxisRight3)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft3, yRight3 }), px1, px11, axis='y', yTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight3
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  let yLeft3Element = d3GetElement(yLeft3)
  let yLeft3Width = Math.ceil(getSizes(yLeft3Element).width)
  
  let yRight3Element = d3GetElement(yRight3)
  let yRight3Width = Math.ceil(getSizes(yRight3Element).width)


  // ------------------------  X-SCALE 3 and X-AXIS 3  ------------------------- //

  
  let xAxis3 = d3
    .axisBottom(xScale)
    .tickValues(xTickValues)
    .tickSize(xTickSize)
    .tickSizeOuter(xTickSizeOuter)
    // .tickFormat('')

  let xBottom3 = main3
    .append("g")
    .attr('name', 'axis-bottom')
    .attr('id', 'slider-1-bottom-axis')

  xBottom3
    .append("g")
    .attr('name', 'ticks')
    .call(xAxis3)
    // .call(g => g.select('.domain').remove())

  // hide tick d3 labels
  xBottom3.selectAll('.tick text').style('opacity', 0)


  // ------------------------  X-LABELS 3 ------------------------- //


  // xtick labels 2
  xBottom3
    .append('g')
    .attr('name', 'ticklabels')
    .attr('id', 'slider-1-ticklabels-group')
    .selectAll('text')
    .data(eventsData)
    .join('text')
    .text(d => d['EventAbbreviation'])
    .attr('x', d => xScale(d['CoordIndex']) + 0.5 * xScale.bandwidth())
    .attr('y', xTickSize)
    .attr('id', (d, i) => 'slider-1-ticklabel-' + i)
    .attr('eventName', d => d['EventNameShortRus'])
    .attr('CoordIndex', d => d['CoordIndex'])
    .style('pointer-events', 'none')

  d3StyleAxis(Object.entries({ xBottom3 }), px1, px11, axis='x', xTickPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottom3Element = d3GetElement(xBottom3)
  let xBottom3ElementSizes = getSizes(xBottom3Element)
  let xBottom3ElementHeight = Math.ceil(xBottom3ElementSizes.height)


  // ------------------------  TRANSITIONS 3 ------------------------- //


  // move y-axis
  let yLeft3TransformX = Math.floor(yAxisWidth)
  let yRight3TransformX = Math.floor(yAxisWidth + yPad + yPad + xAxisLength)

  yLeft3Element.setAttribute('transform', `translate(${yLeft3TransformX}, 0)`)
  yRight3Element.setAttribute('transform', `translate(${yRight3TransformX}, 0)`)

  // move x-axis
  let xBottom3TransformY = chart3Height + xPad
  
  xBottom3Element.setAttribute('transform', `translate(${xBottomTransformX}, ${xBottom3TransformY})`)

  // move main1
  let main3Element = d3GetElement(main3)
  let main3TransformX = offsetX
  let main3TransformY = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3
  )

  main3Element.setAttribute('transform', `translate(${main3TransformX}, ${main3TransformY})`)

  // move chart1
  let chart3Element = d3GetElement(chart3)
  chart3Element.setAttribute('transform', `translate(${xBottomTransformX}, 0)`)


  // ------------------------ SVG HEIGHT ------------------------ //


  let height = (
    offsetY + legendElementHeight
    + offsetYmain1 + chart1Height + xPad + xBottom1ElementHeight
    + offsetYmain2 + xBottom2ElementHeight
    + offsetYmain3 + chart3Height + xPad + xBottom3ElementHeight
  )

  d3GetElement(svg).setAttribute('height', height)


  // ------------------------ GRID 1 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart1, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart1Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart1, name='grid-left', scale=yScale1, tickValues=ytickValues1,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 1  ------------------------ //


  let right = chart1
    .append('g')
    .attr('name', 'chart-right')

  let left = chart1
    .append('g')
    .attr('name', 'chart-left')

  let line = d3
    .line()
    // .curve(d3.curveCatmullRom.alpha(1))
    // .curve(d3.curveBumpX)
    // .curve(d3.curveCardinal.tension(0.4))
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
    .style('fill', colorThemesChartBackground)
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
    .style('fill', colorThemesChartBackground)
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


  // ------------------------ GRID 3 ------------------------- //

  
  // grid-vertical
  d3DrawXGrid(
    axis=chart3, name='grid-bottom', scale=xScale, tickValues=xScale.domain(),
    start=0,
    end=chart3Height,
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=chart3, name='grid-left', scale=yScale3, tickValues=ytickValues3,
    start=0,
    end=width,
    color=colorThemesChartGrid,
    scaleType='linear'
  )


  // ------------------------  CHART 3  ------------------------ //


  let dnf = chart3
    .append('g')
    .attr('name', 'dnf-labels')

  let bars = chart3
    .append('g')
    .attr('name', 'bars')

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
    .attr('y', yScale3(0) + px8)
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
    .attr('y', yScale3(0) - px8)
    .style('opacity', d => { return (noDefineConditions.includes(d['LeftMarker'])) ? 1 : 0 })

  bars
    .selectAll('rect')
    .data(dataDiff)
    .join('rect')
    // .style('cursor', 'pointer')
    .style('shape-rendering', 'geometricPrecision')
    .attr('x', d => xScale(d['CoordIndex']) +  0.5 * xScale.bandwidth() - 0.5 * barWidth)
    .attr('y', d => yScale3(Math.max(0, d['MetricDiff'])))
    .attr('width', barWidth)
    .attr('height', d => Math.abs(yScale3(0) - yScale3(d['MetricDiff'])))
    .attr('fill', d => d['MetricDiff'] > 0 ? colorLeftS : colorRightS)
    .attr('rx', px7)
    .style('visibility', d => (d['MetricDiff'] == 0) ? 'hidden' : 'visible')
    // .on('mouseover', function(event, d) {
    //   if (notMobileDevice) {
    //     d3.select(this).style('opacity', 0.75)
    //   }
    // })
    // .on('mousemove', (event, d) => {
    //   if (notMobileDevice) { showTooltip(event, d) }
    // })
    // .on('mouseleave', function(event, d) {
    //   if (notMobileDevice) {
    //     d3.select(this).style('opacity', 1)
    //     hideTooltip(event, d)
    //   }
    // })


  // ------------------------  SLIDER  ------------------------ //


  let sliderMetrics = {
    'Average': metric.replace('Interpolated', ''),
    'Cumulative': null
  }

  seasonComparisonSliderCreate(
    sliderElementID='test',
    axisBottomID='slider-1-bottom-axis',
    svgID=svgID,
    dataDiff=dataDiff,
    dataLeft=dataLeft,
    dataRight=dataRight,
    colorLeft=colorLeftS,
    colorRight=colorRightS,
    metric=sliderMetrics,
    type='average',
    subType='lower'
  )
  
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

  d3StyleAxis(Object.entries({ xBottom1 }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft1, yRight1 }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight1
    .selectAll('text')
    .style('text-anchor', 'start')
    .attr('dx', px8)

  // grid-x
  d3DrawXGrid(svg, 'grid-bottom', xScale1, xTickValues1, heightChartTop, 0, colorThemesChartGrid, scaleType='band')
  
  // grid-y
  d3DrawYGrid(svg, 'grid-left', yScale1, ytickValues1, 0, width, colorThemesChartGrid, scaleType='linear')

  
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
  
        if (((leftData[0]['ClassifiedPositionLabel'] == 'DNF') || (leftData[0]['ClassifiedPositionLabel'] == 'DSQ'))
            && ((rightData[0]['ClassifiedPositionLabel'] == 'DNF') || (rightData[0]['ClassifiedPositionLabel'] == 'DSQ'))) {
          
          pointsDiff = '0'
          leftRetired = 1
          rightRetired = 1
          leftMarker = leftData[0]['ClassifiedPositionLabel']
          rightMarker = rightData[0]['ClassifiedPositionLabel']
          
        } else if ((leftData[0]['ClassifiedPositionLabel'] == 'DNF') || (leftData[0]['ClassifiedPositionLabel'] == 'DSQ')) {
          
          pointsDiff = -rightData[0]['PointsOfficial']
          leftMarker = leftData[0]['ClassifiedPositionLabel']
          
        } else if ((rightData[0]['ClassifiedPositionLabel'] == 'DNF') || (rightData[0]['ClassifiedPositionLabel'] == 'DSQ')) {
          
          pointsDiff = +leftData[0]['PointsOfficial']
          rightMarker = rightData[0]['ClassifiedPositionLabel']
          
        } else {
          
          pointsDiff = leftData[0]['PointsOfficial'] - rightData[0]['PointsOfficial']
          
        }

        leftFullName = leftData[0]['FullName']
        rightFullName = rightData[0]['FullName']
        
        leftGridPosition = leftData[0]['GridPositionLabel']
        rightGridPosition = rightData[0]['GridPositionLabel']
        
        leftClassPosition = leftData[0]['ClassifiedPositionLabel']
        rightClassPosition = rightData[0]['ClassifiedPositionLabel']
        
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

    d3StyleAxis(Object.entries({ xBottom2 }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
    d3StyleAxis(Object.entries({ yLeft2, yRight2 }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

    yRight2
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', px8)
  
    // grid-x
    d3DrawXGrid(svg, 'grid-bottom-2', xScale1, xTickValues1, height, height - heightChartBottom, colorThemesChartGrid, scaleType='band')
    
    // grid-y
    d3DrawYGrid(svg, 'grid-left-2', yScale2, ytickValues2, 0, width, colorThemesChartGrid, scaleType='linear')


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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  d3StyleAxis(Object.entries({ yLeft, yRight }), px1, px11, axis='y', px8, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  yRight
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', px8)

  let xGrid = xBottom.append('g').attr('name', 'grid')
  d3DrawXGrid(svg, 'grid-bottom', xScale, xtickValues, height, 0, colorThemesChartGrid, scaleType='band')
  
  let yGrid = yLeft.append('g').attr('name', 'grid')
  d3DrawYGrid(svg, 'grid-left', yScale, ytickValues, 0, width, colorThemesChartGrid, scaleType='linear')


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
    .style('fill', colorThemesChartBackground)
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
    .style('fill', colorThemesChartBackground)
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
  let height = 0.79 * width
  let center = {x: 0.5 * width, y: 0.45 * height}

  let features = [
    'StartNormalizedAvg', 'ConsistencyNormalizedAvg', 'OvertakesNormalizedAvg', 'PaceNormalizedAvg', 
    'MistakesTeammateDiscreteAvg', 'PaceTeammateDiscreteAvg', 'QualiTeammateDiscreteAvg', 'ConsistencyTeammateDiscreteAvg',
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
    'levelDriverLevelColor': colorThemesChartAxis,
    'ticksOffset': px4,
    'ticksAngle': 0.5 * polyangle,
    'midPointSides': [4, 5, 6, 7],
    'midPointRadius': px2_5,
    'midPointColor': colorThemesChartChartMeanPoly,
    'midPointLineColor': colorThemesChartChartMeanPoly,
    'metricLineWidth': px3,
    'alpha': 0.5
  }

  labelsAttributes = {
    'labelsOffset': px15,
    'labelsOffsetY': [-px10, 0, 0, -px10, px10, 0, 0, px10],
    'textAnchors': ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
    'dominantBaselines': ['middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle', 'middle'],
    'fontSize': px12_5,
    'fontWeight': colorThemesChartPolyLabelWeight,
    'color': colorThemesChartAxisLabels,
    'textRendering': 'auto',
  }

  subLabelsAttributes = {
    'labelsOffset': px15,
    'labelsOffsetY': [0, 0, 0, 0, px27, px17, px17, px27],
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
  
  let svg = d3
    .select(containerID)
    .selectAll('svg')
    .attr('id', 'svg-chart-pent-' + ContainerID.toLowerCase())
    // .classed('border-blue', true)
    .attr('width', width)
    .attr('height', height)

  let main = svg
    .append('g')
    .attr('name', 'chart-6-main')
    .attr('id', 'chart-6-main')
  
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
  
  let svgElement = d3GetElement(svg).parentElement
  let svgElementSizes = getSizes(svgElement)
  let currentWidth = svgElementSizes.width
  let currentHeight = svgElementSizes.height
  
  svgElement.setAttribute('width', Math.ceil(currentWidth))
  svgElement.setAttribute('height', Math.ceil(currentHeight))

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

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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
    .style('fill', colorThemesChartAxisTickLabels)
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
    color=colorThemesChartGrid,
    scaleType='band'
  )

  // grid-horizontal
  d3DrawYGrid(
    axis=main, name='grid-left', scale=yScale, tickValues=ytickValues,
    start=yLeftWidth + yOffset + yPad, end=width - xOffset,
    color=colorThemesChartGrid,
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
  //     <div class='mt-025 fs-075 fw-600'>Квалификация: ${d['QualiTeammateAvg']}</div>
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
    .style('fill', colorThemesChartBackground)
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
    'QualiTeammateDiscreteAvg',
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

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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
    .style('fill', colorThemesChartAxisTickLabels)
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
    color=colorThemesChartGrid,
    scaleType='band'
  )
  
  // grid-horizontal
  d3DrawYGrid(
    axis=main, name='grid-left', scale=yScale, tickValues=ytickValues,
    start=yLeftWidth + yOffset + yPad, end=width - xOffset,
    color=colorThemesChartGrid,
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
      .style('stroke', colorThemesChartBackground)
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

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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
    color=colorThemesChartGrid,
    scaleType='band'
  )

  // grid-horizontal
  d3DrawYGrid(
    axis=main, name='grid-left-2', scale=yScale, tickValues=ytickValues,
    start=yLeftWidth + yOffset + yPad, end=width - yOffset,
    color=colorThemesChartGrid,
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
    .style('stroke', colorThemesChartBackground)
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
    .style('stroke', colorThemesChartBackground)
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .attr('cx', d => xScale(d['SeasonID']) + 0.5*xScale.bandwidth())
    .attr('cy', d => (d[metric] == '-') ? yScale(0) : yScale(d[metric]))
    .style('r', px4)
    .attr('r', px4)
    .style('fill', colorPrimary)
    .style('opacity', d => (d[metric] == '-') ? 0 : 1)

}


function chart_9(ContainerID, summary, metric, id) {

  // чистый темп относительно худшего

  // metric - PaceDiffClearByWorst
  // data -> eventSummary

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3ResetSVG(ContainerID)


  // ---------------------  PARAMETERS  --------------------- //


  let xTickSize = px4
  let xTickSizeOuter = px5

  let yTickSize = px4
  let yTickSizeOuter = px5

  let offsetLeft = px0
  let offsetRight = px4
  let offsetTop = px5

  let xPad = px3
  let yPad = px3

  let xTicksPad = px3
  let yTicksPad = px3

  // let paddingXOuter = 0.625
  

  let barWidth = px20
  let barRadius = px10
  
  let barsOffset = px2
  let barHeightMin = px2

  let paddingXOuter = 1.75 * barWidth
  let paddingYOuter = px12

  let legendOffsetX = px0
  let legendOffsetY = px5

  let dnfList = [
    'DNS', 'DSQ'
  ]
  

  // ---------------------  DATA  --------------------- //


  let metricPaceLabel
  let metricDiff
  let metricOrder

  let tooltipPaceName
  
  if (metric == 'PaceDiffClear') {

    metricDiff = 'PaceDiffClear'
    // metricPaceLabel = 'PaceClearLabel'
    metricOrder = 'RankPaceDiffClearOrder'

    // tooltipPaceName = 'Средний чистый темп'
    
  } else {

    metricDiff = 'PaceDiff'
    // metricPaceLabel = 'PaceSec'
    metricOrder = 'RankPaceDiffOrder'

    // tooltipPaceName = 'Средний темп'
    
  }

  let data = copyObject(summary)
  
  data.forEach((obj, i) => {
    if (obj['LaptimeSeriesActual'] == 0) { obj[metric] = '-' }
    if (obj[metric] != '-') { obj[metric] *= -1 }
  })

  data = sortObject(data, metricOrder, true)

  let xTickValues = data.map(o => o['Abbreviation'])

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
  // yTickValuesGrid = yTickValues

  // let paceDiffMarker = Number(data[0][metric]) + Number(data[0]['PaceDiff'])
  // let paceDiffMarker = data.map(o => o[metric]).map(Number)
  // paceDiffMarker = dropNaNs(paceDiffMarker)
  // paceDiffMarker = arrayAverage(paceDiffMarker)

  let paceDiffMarker = data[0][metric + 'Mean']


  // ------------------------  SVG  ------------------------- //


  let containerSizes = getSizes(container)
  
  let widthDiv = Math.floor(containerSizes.width)
  let heightDiv = Math.floor(containerSizes.height)

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-9-' + id

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', `${heightDiv}px`)

  let mainID = 'chart-9-main-' + id

  let main = svg
    .append('g')
    .attr('id', mainID)
    .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)

  let chart = main
    .append('g')
    .attr('name', 'chart')


  // ------------------------  LEGEND  ------------------------- //


  let legendID = 'chart-9-legend-' + id

  let label = 'Естественный темп пелотона'
  // label = 'Pelotone natural pace'

  let legendAttributesDict = {
    'y': 0,
    'interval': px30,
    'markerLineWidth': px1,
    // 'markerLineWidth': px0,
    'markerLineLength': px20,
    'markerLineShapeRendering': 'crispEdges',
    'labelSize': 0.75,
    // 'labelSize': 0,
    // 'labelColor': '#7F8286',
    'labelColor': '#6B6F72',
    // 'labelColor': '#585B5E',
    'labelWeight': 575,
    // 'letterSpacing': 0.015625,
    // 'textRendering': 'geometricPrecision'
    // 'letterSpacing': 0.03125
  }

  d3legend(
    MainNodeID=mainID,
    legendName='legend',
    legendID=legendID,
    markersList=['line'],
    labelsList=[label],
    colorsList=['#BCBCBC'],
    attributesDict=legendAttributesDict,
    align='left',
    // loc='right',
  )

  let legendElement = getElement(legendID)
  let legendSizes = getSizes(legendElement)
  let legendWidth = Math.floor(legendSizes.width)
  let legendHeight = Math.floor(legendSizes.height)
  let legendTransformY = Math.floor(0.25 * legendSizes.height)
  

  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //


  let height = heightDiv - offsetTop - legendTransformY - legendHeight - legendOffsetY - xPad

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

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = getSizes(yLeftElement).width


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


  let width = widthDiv - offsetLeft - yLeftWidth - yPad - offsetRight
  
  let xScale = d3
     .scaleBand()
     .domain(xTickValues)
     .range([0, width])
     .paddingInner(1)
     // .paddingOuter(paddingXOuter)

  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels, 625)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomSizes = getSizes(xBottomElement)
  let xBottomtHeight = Math.ceil(xBottomSizes.height)


  // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //


  d3GetElement(yLeft).remove()

  height = height - xBottomtHeight

  yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0])
    // .nice()

  // make space between end of axis and first tick equals for both x and y axises
  // d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  yAxis = d3
    .axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(yTickSize)
    .tickSizeOuter(yTickSizeOuter)
    .tickFormat(x => x.toFixed(2))
    // .tickFormat(d3.format('c'))

  yLeft = main
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

  d3StyleAxis(Object.entries({ yLeft }), px1, px10, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let yLeftElementCorrected = d3GetElement(yLeft)
  // let yLeftWidth = getSizes(yLeftElement).width


  // ------------------------  TRANSITIONS  ------------------------- //


  // y-axis
  let transformLeftX = Math.floor(yLeftWidth)
  let transformLeftY = legendTransformY + legendHeight + legendOffsetY
  yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, ${transformLeftY})`)

   // x-axis
  let transformBottomX = Math.floor(yLeftWidth + yPad)
  let transformBottomY = transformLeftY + height + xPad
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // legend
  // let legendTranslateX = transformBottomX + legendOffsetX + px1
  let legendTranslateX = widthDiv - offsetRight - legendWidth
  legendElement.setAttribute('transform', `translate(${legendTranslateX}, ${legendTransformY})`)
  // legendElement.setAttribute('transform', `translate(0, ${legendTransformY})`)

  // chart
  let transformChartX = Math.floor(yLeftWidth + yPad)
  chart.attr("transform", `translate(${transformChartX}, ${transformLeftY})`)

  // adjust SVG height
  // let heightAdjusted = offsetTop + height + xPad + xBottomElementHeight
  // d3GetElement(svg).setAttribute('height', heightAdjusted)

  // containers height adjust
  // let chartContainerHeight = getElement(eventPaceTable1ChartID).offsetHeight
  // getElement(eventPaceTable1ID).style.height = `${chartContainerHeight}px`


  // ------------------------  GRID  ------------------------- //


  let gridX = chart
    .append('g')
    .attr('name', 'grid-x')

  let gridY = chart
    .append('g')
    .attr('name', 'grid-y')

  gridX
    .selectAll('line')
    .data(yTickValuesGrid)
    .join('line')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', d => yScale(d) + px0_5)
    .attr('y2', d => yScale(d) + px0_5)
    .style('stroke', colorThemesChartGrid)
    .style('fill', 'none')
    .style('shape-rendering', 'crispEdges')

  gridY
    .selectAll('line')
    .data(data)
    .join('line')
    .attr('x1', d => xScale(d['Abbreviation']) + px0_5)
    .attr('x2', d => xScale(d['Abbreviation']) + px0_5)
    .attr('y1', d => yScale(yMin) + px0_5)
    .attr('y2', d => yScale(yMax) + px0_5)
    .style('stroke', colorThemesChartGrid)
    .style('fill', 'none')
    .style('shape-rendering', 'crispEdges')

  // gridY
  //   .append('line')
  //   .attr('x1', px0_5)
  //   .attr('x2', px0_5)
  //   .attr('y1', d => yScale(yMin) + px0_5)
  //   .attr('y2', d => yScale(yMax) + px0_5)
  //   .style('stroke', colorThemesChartGrid)
  //   .style('fill', 'none')
  //   .style('shape-rendering', 'crispEdges')

  // gridY
  //   .append('line')
  //   .attr('x1', width)
  //   .attr('x2', width)
  //   .attr('y1', d => yScale(yMin) + px0_5)
  //   .attr('y2', d => yScale(yMax) + px0_5)
  //   .style('stroke', colorThemesChartGrid)
  //   .style('fill', 'none')
  //   .style('shape-rendering', 'crispEdges')


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
    .attr('x', d => xScale(d['Abbreviation']) - 0.5*barWidth + px0_5)
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
    .style('cursor', 'pointer')
    .style('visibility', d => isNumeric(d[metric]) ? 'visible' : 'hidden')
    .attr('rx', barRadius)
    // .attr('top', d => isNumeric(d[metric]) ? yScale(d[metric]) : yScale(0))
    .attr('left', d => xScale(d['Abbreviation']) + 0.5*barWidth + px0_5)
    .on('mouseover', (event, d, i) => {

      let element = event.target
      
      element.style.fill = saturateColor(d['Color'], 0.75)

      showTooltip(event, d, i)
      
    })
    .on('mouseleave', (event, d, i) => {
      
      let element = event.target
      
      element.style.fill = eventPaceChart9BarsColor

      hideTooltip(event, d, i)
      
    })


  // ------------------------  DNF LABELS  ------------------------- //


  dnfLabels
    .selectAll('text')
    .data(data)
    .join('text')
    .text(d => d['ClassifiedPositionLabel'])
    .attr('x', d => xScale(d['Abbreviation']))
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

  
  paceAvg
    .selectAll('line')
    .data(data)
    .join('line')
    .attr('x1', 0.75*barWidth)
    .attr('x2', width - 0.75*barWidth)
    // .attr('x1', 0)
    // .attr('x2', width)
    .attr('y1', yScale(0) + px0_5)
    .attr('y2', yScale(0) + px0_5)
    .style('fill', 'none')
    .style('stroke', eventPaceChart9AverageColor)
    // .style('stroke', '#CFCFCF')
    .style('stroke-width', px1)
    .style('shape-rendering', 'crispEdges')
    // .style('shape-rendering', 'geometricPrecision')
    // .style('stroke-linecap', 'round')


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

      let color = saturateColor(d['Color'], 0.75)
      
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

      let deltaBest = Math.abs(metricBest - d[metric]).toFixed(3)
      deltaBest = (deltaBest == 0) ? '-' : deltaBest

      let deltaBestColor = (deltaBest == '-') ? '#5A5F64' : eventPaceBadPaceColor

      let pace = d['PaceSec']
      let paceClear = d['PaceClearLabel']

      let tooltipHTML = `

        <div class='row-100 flex-column a-start ps-075 pe-075 py-05'>
        
          <div class='n2lu1d' style='color:${color}'>${d['FullName']}</div>

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

      let tooltipOffsetX = px5
      let tooltipOffsetY = px5
      
      let elementSizes = getSizes(element)
      let elementHeight = elementSizes.height
      
      let top = offsetTop + transformLeftY + Number(element.getAttribute('y'))
      let left = Number(element.getAttribute('left')) + offsetLeft + transformChartX
      let height = Number(element.getAttribute('height'))

      let tooltipSizes = getSizes(tooltipElement)
      let tooltipHeight = tooltipSizes.height
      let tooltipWidth = tooltipSizes.width

      let tooltipTop

      // if (d[metric] < 0) {
      //   tooltipTop = top - tooltipHeight - tooltipOffsetY
      // } else {
      //   tooltipTop = top - tooltipHeight - tooltipOffsetY
      // }

      if (d[metric] < 0) {
        tooltipTop = top + height + tooltipOffsetY
        tooltipLeft = left - tooltipWidth - tooltipOffsetX - barWidth
      } else {
        tooltipTop = top - tooltipHeight - tooltipOffsetY
        tooltipLeft = left + tooltipOffsetX
      }

      // if (left + tooltipOffsetX + tooltipWidth > width + transformBottomX) {
      //   tooltipLeft = left - tooltipWidth - tooltipOffsetX - barWidth
      // } else {
      //   tooltipLeft = left + tooltipOffsetX
      // }

      tooltipElement.style.top = `${tooltipTop}px`
      tooltipElement.style.left = `${tooltipLeft}px`
      
      tooltipElement.style.opacity = 1
      
    }

    hideTooltip = function(event, d, idx) {

      tooltipElement.style.opacity = 0
      
    }
    
  }

}


function chart_9_1(ContainerID, summary, metric, id) {

  // чистый темп относительно худшего

  // metric - PaceDiffClearByWorst
  // data -> eventSummary

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  d3ResetSVG(ContainerID)


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

  // let paddingXOuter = 0.625
  

  let barWidth = px30

  let paddingXOuter = barWidth
  let paddingYOuter = px12

  let dnfList = [
    'DNS', 'DSQ'
  ]
  

  // ---------------------  DATA  --------------------- //


  let metricPaceLabel
  let metricDiff
  let metricOrder

  let tooltipPaceName
  
  if (metric == 'PaceDiffClearByWorst') {

    metricDiff = 'PaceDiffClear'
    metricPaceLabel = 'PaceClearLabel'
    metricOrder = 'RankPaceDiffClearByWorstOrder'

    tooltipPaceName = 'Средний чистый темп'
    
  } else {

    metricDiff = 'PaceDiff'
    metricPaceLabel = 'PaceSec'
    metricOrder = 'RankPaceDiffByWorstOrder'

    tooltipPaceName = 'Средний темп'
    
  }

  let data = copyObject(summary)
  data = sortObject(data, metricOrder, true)

  let xTickValues = data.map(o => o['Abbreviation'])

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

  yTickValuesGrid = yTickValues.slice(1, yTickValues.length)

  // let paceDiffMarker = Number(data[0][metric]) + Number(data[0]['PaceDiff'])
  // let paceDiffMarker = data.map(o => o[metric]).map(Number)
  // paceDiffMarker = dropNaNs(paceDiffMarker)
  // paceDiffMarker = arrayAverage(paceDiffMarker)

  let paceDiffMarker = data[0][metric + 'Mean']


  // ------------------------  SVG  ------------------------- //


  let widthDiv = container.offsetWidth
  let heightDiv = container.offsetHeight

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-9-' + id

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', `${heightDiv}px`)

  let mainID = 'chart-9-main-' + id

  let main = svg
    .append('g')
    .attr('id', mainID)
    .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)

  let chart = main
    .append('g')
    .attr('name', 'chart')


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //

  
  let height = heightDiv - offsetTop

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

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = getSizes(yLeftElement).width


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //


  let width = widthDiv - offsetLeft - yLeftWidth - yPad - offsetRight
  
  let xScale = d3
     .scaleBand()
     .domain(xTickValues)
     .range([0, width])
     .paddingInner(1)
     // .paddingOuter(paddingXOuter)

  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='band')

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels, 625)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomSizes = getSizes(xBottomElement)
  let xBottomtHeight = Math.ceil(xBottomSizes.height)


  // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //


  d3GetElement(yLeft).remove()

  let heightCorrected = height - xPad - xBottomtHeight

  yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([heightCorrected, 0])
    // .nice()

  // make space between end of axis and first tick equals for both x and y axises
  // d3adjustPaddingOuter(paddingYOuter, yScale, axis='y', type='linear')

  yAxis = d3
    .axisLeft(yScale)
    .tickValues(yTickValues)
    .tickSize(yTickSize)
    .tickSizeOuter(yTickSizeOuter)
    .tickFormat(x => x.toFixed(2))
    // .tickFormat(d3.format('c'))

  yLeft = main
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

  d3StyleAxis(Object.entries({ yLeft }), px1, px10, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let yLeftElementCorrected = d3GetElement(yLeft)
  // let yLeftWidth = getSizes(yLeftElement).width


  // ------------------------  TRANSITIONS  ------------------------- //


  // y-axis
  let transformLeftX = Math.ceil(yLeftWidth)
  yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, 0)`)

   // x-axis
  let transformBottomX = Math.ceil(yLeftWidth + yPad)
  let transformBottomY = height - xBottomtHeight
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // chart
  let transformChartX = Math.ceil(yLeftWidth + yPad)
  chart.attr("transform", `translate(${transformChartX}, 0)`)

  // adjust SVG height
  // let heightAdjusted = offsetTop + height + xPad + xBottomElementHeight
  // d3GetElement(svg).setAttribute('height', heightAdjusted)

  // containers height adjust
  // let chartContainerHeight = getElement(eventPaceTable1ChartID).offsetHeight
  // getElement(eventPaceTable1ID).style.height = `${chartContainerHeight}px`


  // ------------------------  GRID  ------------------------- //


  // let gridX = main
  //   .append('g')
  //   .attr('name', 'grid')

  // let gridY = main
    // .append('g')
    // .attr('name', 'grid')

  // gridX
  //   .selectAll('line')
  //   .data(yTickValuesGrid)
  //   .join('line')
  //   .attr('x1', yLeftWidth + yPad)
  //   .attr('x2', width)
  //   .attr('y1', d => yScale(d) + px0_5)
  //   .attr('y2', d => yScale(d) + px0_5)
  //   .style('stroke', colorThemesChartGrid)
  //   .style('fill', 'none')
  //   .style('shape-rendering', 'crispEdges')

  // gridY
  //   .selectAll('line')
  //   .data(data)
  //   .join('line')
  //   .attr('x1', d => xScale(d['Abbreviation']) + px0_5)
  //   .attr('x2', d => xScale(d['Abbreviation']) + px0_5)
  //   .attr('y1', d => yScale(yMin) + px0_5)
  //   .attr('y2', d => yScale(yMax) + px0_5)
  //   .style('stroke', colorThemesChartGrid)
  //   .style('fill', 'none')
  //   .style('shape-rendering', 'crispEdges')


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
    .attr('x', d => xScale(d['Abbreviation']) - 0.5*barWidth + px0_5)
    .attr('y', d => isNumeric(d[metric]) ? yScale(d[metric]) : yScale(0))
    .attr('width', barWidth)
    .attr('height', d => isNumeric(d[metric]) ? yScale(0) - yScale(d[metric]) : 0)
    // .attr('height', d => (d[metric] == '-') ? 0 : yScale(0) - yScale(d[metric]))
    .style('fill', '#909090')
    .style('cursor', 'pointer')
    .style('visibility', d => isNumeric(d[metric]) ? 'visible' : 'hidden')
    .attr('rx', px5)
    .attr('top', d => isNumeric(d[metric]) ? yScale(d[metric]) : yScale(0))
    .attr('left', d => xScale(d['Abbreviation']) + 0.5*barWidth + px0_5)
    .on('mouseover', (event, d, i) => {

      let element = event.target
      
      element.style.fill = saturateColor(d['Color'], 0.75)

      showTooltip(event, d, i)
      
    })
    .on('mouseleave', (event, d, i) => {
      
      let element = event.target
      
      element.style.fill = '#909090'

      hideTooltip(event, d, i)
      
    })


  // ------------------------  DNF LABELS  ------------------------- //


  dnfLabels
    .selectAll('text')
    .data(data)
    .join('text')
    .text(d => d['ClassifiedPositionLabel'])
    .attr('x', d => xScale(d['Abbreviation']))
    .attr('y', yScale(0) - px5)
    .style('font-family', PrimaryFont)
    .style('fill', '#7F8286')
    .style('font-size', `${px11}px`)
    .style('font-variation-settings', "'wght' 750")
    .style('text-anchor', 'middle')
    .style('dominant-baseline', 'auto')
    .style('cursor', 'default')
    .style('visibility', d => d[metric] == '-' ? 'visible' : 'hidden')

  

  // ------------------------  PACE AVERAGE  ------------------------- //

  
  paceAvg
    .selectAll('line')
    .data(data)
    .join('line')
    .attr('x1', 0.25*barWidth)
    .attr('x2', width - 0.25*barWidth)
    .attr('y1', yScale(paceDiffMarker))
    .attr('y2', yScale(paceDiffMarker))
    .style('fill', 'none')
    .style('stroke', '#EFEFEF')
    .style('stroke-width', px2)
    .style('shape-rendering', 'geometricPrecision')
    .style('stroke-linecap', 'round')


  // ------------------------  LEGEND  ------------------------- //


  let legendID = 'chart-9-legend-' + id

  let label = 'Среднее пелотона'

  let legendAttributesDict = {
    'y': px4,
    'interval': px30,
    'labelSize': 0.75,
    'labelColor': '#92969A',
    'labelWeight': 500
  }

  d3legend(
    MainNodeID=mainID,
    legendName='legend',
    legendID=legendID,
    markersList=['line'],
    labelsList=[label],
    colorsList=['#EFEFEF'],
    attributesDict=legendAttributesDict,
    align='left',
    loc='right',
  )

  // let legend = getElement(legendID)
  // let legendSizes = getSizes(legend)
  // let legendTransform = Math.floor(0.5 * legendSizes.height)
  // let legendHeight = Math.floor(legendSizes.height)



  let tooltip
  let showTooltip
  let hideTooltip

  if (notMobileDevice) {

    tooltip = d3
      .select(containerID)
      .append('div')
      .classed('tooltip p-absolute', true)

    let tooltipElement = d3GetElement(tooltip)

    showTooltip = function(event, d, idx) {

      let element = event.target

      let color = saturateColor(d['Color'], 0.75)
      
      let deltaPelotone = Math.abs(d[metricDiff]).toFixed(3)
      let deltaPelotoneColor = d[metricDiff] <= 0 ? eventPaceGoodPaceColor : eventPaceBadPaceColor

      let deltaWorst = Math.abs(d[metric]).toFixed(3)
      let deltaWorstColor = d[metric] >= 0 ? eventPaceGoodPaceColor : eventPaceBadPaceColor

      let tooltipHTML = `

        <div class='row-100 flex-column a-start ps-075 pe-075 py-05'>
        
          <div class='n2lu1d' style='color:${color}'>${d['FullName']}</div>

          <div class='o9tuco mt-05' >
            <div>Дельта от пелотона:</div>
            <div class='yvvtgu ms-025' style='color:${deltaPelotoneColor}'>${deltaPelotone}</div>
          </div>

          <div class='o9tuco' >
            <div>Дельта от худшего:</div>
            <div class='yvvtgu ms-025' style='color:${deltaWorstColor}'>${deltaWorst}</div>
          </div>

          <div class='o9tuco mt-05'>
            <div>${tooltipPaceName}:</div>
            <div class='yvvtgu ms-025'>${d[metricPaceLabel]}</div>
          </div>
        
        </div>
      
      `

      tooltipElement.innerHTML = tooltipHTML

      let tooltipOffsetX = px10
      

      let elementSizes = getSizes(element)
      let elementHeight = elementSizes.height
      let top = Number(element.getAttribute('top')) + offsetTop
      let left = Number(element.getAttribute('left')) + offsetLeft + transformChartX

      let tooltipSizes = getSizes(tooltipElement)
      let tooltipHeight = tooltipSizes.height
      let tooltipWidth = tooltipSizes.width

      let tooltipOffsetYCoeff = 1
      let tooltipOffsetY = tooltipOffsetYCoeff * tooltipHeight
      let tooltipBottomPart = tooltipHeight - tooltipOffsetY

      let tooltipTop = top - tooltipOffsetY

      // if (top < tooltipOffsetY) {
      //   tooltipTop = top
      // } else if (elementHeight < tooltipBottomPart) {
      //   tooltipTop = top - tooltipHeight
      // } else {
      //   tooltipTop = top - tooltipOffsetY
      // }

      if (elementHeight < tooltipBottomPart) {
        tooltipTop = top - tooltipHeight
      }

      if (left + tooltipOffsetX + tooltipWidth > width + transformBottomX) {
        tooltipLeft = left - tooltipWidth - tooltipOffsetX - barWidth
      } else {
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

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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

  d3StyleAxis(Object.entries({ xBottom }), px1, px11, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

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


function chart_11(ContainerID, metric, laptimesData, colors, id) {

  // data -> eventSummary

  let containerID = '#' + ContainerID
  let container = getElement(ContainerID)

  // d3.select(containerID).selectAll('svg > *').remove()

  d3ResetSVG(ContainerID)


  // ---------------------  FUNCTIONS  --------------------- //


  function checkDataNotAvailable(data, metric) {

    let condition1
    let condition2

    if (data) {

      let metricsArray = data.map(o => o[metric]).map(Number).filter(NaNs)

      condition1 = data.length > 0
      condition2 = metricsArray.length > 0
      
    } else {

      if (laptimesData[1]) {

        condition1 = false
        condition2 = false
        
      } else {

        condition1 = true
        condition2 = true
        
      }

    }

    return !(condition1 && condition2)
    
  }

  
  // ---------------------  PARAMETERS  --------------------- //


  let xTickSize = px4
  let xTickSizeOuter = px5

  let yTickSize = px4
  let yTickSizeOuter = px5

  let offsetLeft = px0
  let offsetRight = px5
  let offsetTop = px5

  let xPad = px3
  let yPad = px3

  let xTicksPad = px3
  let yTicksPad = px3

  let paddingXOuter = px10
  let paddingYOuter = px20

  let fillAreaStrokeWidth = px2
  

  // ---------------------  DATA  --------------------- //


  let laptimeMetric

  if (metric == 'PaceDiffClear') {

    laptimeMetric = 'LaptimeClear'
    
  } else if (metric == 'PaceDiff') {

    laptimeMetric = 'Laptime'
    
  }
 
  let dataLeft = copyObject(laptimesData[0])
  let dataRight = copyObject(laptimesData[1])

  let dataLeftNotAvailable = checkDataNotAvailable(dataLeft, metric)
  let dataRightNotAvailable = checkDataNotAvailable(dataRight, metric)

  let colorLeft = colors[0]
  let colorRight = colors[1]

  let laps = dataLeft.map(o => o['LapNumber'])
  let lapsRight

  laps = dropDuplicates(laps)
  laps = sortArray(laps, true)

  let lastLapLeft = lastElement(laps)
  let lastLapRight

  if (dataRight) {
    
    lapsRight = dataRight.map(o => o['LapNumber'])

    lapsRight = dropDuplicates(lapsRight)
    lapsRight = sortArray(lapsRight, true)
    lastLapRight = lastElement(lapsRight)
    
    laps = laps.concat(lapsRight)
    laps = dropDuplicates(laps)
    
  }

  let lastLap = Math.max.apply(null, laps)

  let data = []

  if (dataRight) {

    laps.forEach((lap, i) => {

      if ((lap <= lastLapLeft) && (lap <= lastLapRight)) {

        let condition = (o) => o['LapNumber'] == lap
  
        let data1 = dataLeft.filter(o => condition(o))[0]
        let data2 = dataRight.filter(o => condition(o))[0]
    
        let diff
    
        if (data1 && data2) {
          diff = - (data1[metric] - data2[metric])
        }

        data.push({x: Number(lap), y: Number(diff)})
        
      }

    })
    
  } else {

    laps.forEach((lap, i) => {

      let condition = (o) => o['LapNumber'] == lap
  
      let data1 = dataLeft.filter(o => condition(o))[0]

      data.push({x: Number(lap), y: Number(-data1[metric])})

      // if (notNaN(data1['PaceDiff']) && (data1['PaceDiff'] != '-')) {
        
      // }

    })
    
  }

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

  
  // ------------------------  SVG  ------------------------- //


  // container width minus paddings
  let containreSizes = getSizes(container)
  
  let widthDiv = Math.floor(containreSizes.width)
  let heightDiv = Math.floor(containreSizes.height)

  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-11-' + id

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', heightDiv)

  // если данные отсутствуют, отображается табличка NoData
  if (dataLeftNotAvailable || dataRightNotAvailable) {

    svg
      .append('text')
      .text('Данные отсутствуют')
      // .style('font-family', 'NunitoSans')
      .attr('x', 0.5 * widthDiv)
      .attr('y', 0.5 * heightDiv + px20)
      .style('fill', '#CDD2D7')
      .style('text-anchor', 'middle')
      .style('font-size', px20)
      .style('font-variation-settings', "'wght' 700")

    svg
      .append("svg:image")
      .attr('x', 0.5 * widthDiv - px24)
      .attr('y', 0.5 * heightDiv - px50)
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
    
  } else {

    let main = svg
      .append('g')
      .attr('id', 'main-' + svgID)
      .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)
  
    let chart = main
      .append('g')
      .attr('name', 'chart')
  
    
    // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //
  
    let height = heightDiv - offsetTop - xPad
    
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
      // .tickFormat(d3.format('c'))
  
    let yLeft = main
      .append("g")
      .attr('name', 'axis-left')
      // .style('transform-box', 'fill-box')
      // .style('transform', 'translate(100%, 0)')
  
    yLeft
      .append("g")
      .attr('name', 'ticks')
      .attr('id', 'left-axis-' + svgID)
      .call(yAxis)
      // .call(g => g.select('.domain').remove())
  
    d3StyleAxis(Object.entries({ yLeft }), px1, px10, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
    let yLeftElement = d3GetElement(yLeft)
    let yLeftSizes = getSizes(yLeftElement)
    let yLeftWidth = yLeftSizes.width
  
  
    // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //
  
    let width = widthDiv - offsetLeft - offsetRight - yLeftWidth - yPad
  
    let xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([0, width])
      // .paddingInner(1)
      // .paddingOuter(paddingXOuter)
  
    d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')
  
    let xAxis = d3
      .axisBottom(xScale)
      .tickValues(xTickValues)
      .tickSize(xTickSize)
      .tickSizeOuter(xTickSizeOuter)
      .tickFormat(d3.format('c'))
      // .tickFormat('')
  
    let xBottom = main
      .append("g")
      .attr('name', 'axis-bottom')
      // .attr("transform", `translate(0, ${xAxisWpad})`)
  
    xBottom
      .append("g")
      .attr('name', 'ticks')
      .attr('id', 'bottom-axis-' + svgID)
      .call(xAxis)
      // .call(g => g.select('.domain').remove())
  
    d3StyleAxis(Object.entries({ xBottom }), px1, px10, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
    let xBottomElement = d3GetElement(xBottom)
    let xBottomSizes = getSizes(xBottomElement)
    let xBottomHeight = Math.ceil(xBottomSizes.height)
  
  
    // ------------------------- CORRECTED Y-SCALE, Y-AXIS, Y-LABELS CORRECTED ------------------------- //
  
  
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
      // .tickFormat(d3.format('c'))
  
    yLeft = main
      .append("g")
      .attr('name', 'axis-left')
      // .style('transform-box', 'fill-box')
      // .style('transform', 'translate(100%, 0)')
  
    yLeft
      .append("g")
      .attr('name', 'ticks')
      .attr('id', 'left-axis-' + svgID)
      .call(yAxis)
      // .call(g => g.select('.domain').remove())
  
    d3StyleAxis(Object.entries({ yLeft }), px1, px10, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)
  
    let yLeftElementCorrected = d3GetElement(yLeft)
    // let yLeftSizes = getSizes(yLeftElement)
    // let yLeftWidthCorrected = yLeftSizes.width
    
  
    // ------------------------  TRANSITIONS  ------------------------- //
  
  
    // y-axis
    let transformLeftX = Math.ceil(yLeftWidth)
    yLeftElementCorrected.setAttribute('transform', `translate(${transformLeftX}, 0)`)
  
     // x-axis
    let transformBottomX = Math.ceil(yLeftWidth + yPad)
    let transformBottomY = Math.ceil(height + xPad)
    xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)
  
    // adjust SVG height
    // let heightAdjusted = offsetTop + height + xPad + xBottomHeight
    // d3GetElement(svg).setAttribute('height', heightAdjusted)
  
    // containers height adjust
    // let chartContainerHeight = getElement(eventPaceTooltip1ChartID).offsetHeight
    // getElement(eventPaceTooltip1ID).style.height = `${chartContainerHeight}px`
  
    chart.attr("transform", `translate(${transformBottomX}, 0)`)
    
  
      // -------------------------------------  GRID  ------------------------------------- //
    
      
    // xtick every 4th lap since second lap
    // let gridShow = range(2, xMax, 4)
    let yGridShow = yTickValues.filter((_, index) => index % 2 == 0)
    yGridShow = yTickValues
  
    // grid-x & grid-y
    // d3DrawXGrid(chart, 'grid-bottom', xScale, xTickValues, yScale(yMax), yScale(yMin), colorThemesChartGrid, scaleType='linear')
    // d3DrawYGrid(chart, 'grid-left', yScale, yGridShow, xScale(xMin), xScale(xMax), colorThemesChartGrid, scaleType='linear')
    
    // grid-x & grid-y
    d3DrawXGrid(chart, 'grid-bottom', xScale, xTickValues, 0, height, colorThemesChartGrid, scaleType='linear')
    d3DrawYGrid(chart, 'grid-left', yScale, yGridShow, 0, width, colorThemesChartGrid, scaleType='linear')
  
  
    // ------------------------  ELEMENTS  ------------------------- //
  
  
    let fillArea = chart
      .append('g')
      .attr('name', 'fill-area')
      .attr('id', 'chart-11-1-fill-area-' + id)
  
  
    // ------------------------  LINES  ------------------------- //
  
    
    // let line = chart
    //   .append('g')
    //   .attr('name', 'lines')
  
    // let lineMarker = chart
    //   .append('g')
    //   .attr('name', 'lines-right')
  
    let conditionCrossZero = (dataCurrent, dataPrevious) => (
      (dataPrevious.y >= 0 && dataCurrent.y < 0) || (dataPrevious.y < 0 && dataCurrent.y >= 0)
    )
  
    let segments = d3getDataForColoredPathsZeroLine(data, conditionCrossZero)
  
    let smoother = d3.curveCatmullRom
    // smoother = d3.curveCatmullRom.alpha(0)
    // smoother = d3.curveBasisOpen
    // smoother = d3.curveBasis
    // smoother = d3.curveCardinal
    // smoother = d3.curveCatmullRom
  
    // let lineGenerator = d3
    //   .line()
    //   .curve(smoother)
    //   .defined(d => notNaN(d.y))
    //   .x(d => xScale(d.x))
    //   .y(d => yScale(d.y))
  
    let fillGenerator = d3
      .area()
      .curve(smoother)
      .defined(d => notNaN(d.x) && notNaN(d.y))
      .x(d => xScale(d.x))
      .y0(d => yScale(0))
      .y1(d => yScale(d.y))
  
    segments.forEach((part, i) => {
  
      let segment = part['segment']
      let type = part['type']
      let color_ = (type == 'y_upper') ? colorLeft : colorRight
  
      segment = objectRemoveNaNs(segment, 'x')
  
      // for segments with only one lap value
      if ((segment.length == 2) && isNaN(segment[0]['y'])) {
        segment[0]['y'] = 0
      }
  
      if (segment.length > 1) {
  
        fillArea
          .append('path')
          .datum(segment)
          .attr('d', fillGenerator)
          .attr('id', 'chart-11-1-fill-area-' + i)
          .attr('fill-color', d => alphaColor(color_, 0.6, colorThemesChartBackground))
          .style('fill', alphaColor(color_, 0.6, colorThemesChartBackground))
          .style('stroke', paleColor(color_, 0.85))
          .style('stroke-width', px0)
          .style('shape-rendering', 'geometricPrecision')
          .style('cursor', 'pointer')
          .on('mouseleave', (event, d) => {
            
            let element = event.target
  
            eventPaceTooltip1ChartDeactivate(element, d)
  
            if (eventPaceTooltip1LapsLocalClicked) {
              
              eventPaceTooltip1Fill(data, dataLeft, eventPaceTooltip1LapsLocalClicked)
              
            } else {
  
              eventPaceTooltip1Fill(data, dataLeft, laps)
              
            }
          
          })
  
          .on('mouseover', (event, d) => {
  
            let element = event.target
  
            eventPaceTooltip1ChartActivate(element, d)
            
          })
          .on('mouseup', (event, d) => {
  
            let element = event.target
  
            if (element.classList.contains('clicked')) {
              
              eventPaceTooltip1LapsLocalClicked = null
              
            } else {
              
              eventPaceTooltip1LapsLocalClicked = d.filter(o => notNaN(o['x']) && notNaN(o['y']))
              eventPaceTooltip1LapsLocalClicked = eventPaceTooltip1LapsLocalClicked.map(o => o['x'])
              eventPaceTooltip1LapsLocalClicked = eventPaceTooltip1LapsLocalClicked.filter(o => Number.isInteger(o))
              
            }
            
            eventPaceTooltip1ChartClick(element, d)
  
          })
  
      }
  
    })
  
    d3GetElement(svg).addEventListener('mousedown', (event) => {
  
      if (!event.target.id.includes('chart-11-1-fill-area-')) {
  
        eventPaceTooltip1LapsLocalClicked = null
  
        eventPaceTooltip1ChartDeactivateAll()
        eventPaceTooltip1Fill(data, dataLeft, laps)
        
      }
      
    })
  
  
    // ------------------------  TOOLTIP  ------------------------- //
  
  
    function eventPaceTooltip1ChartActivate(element, segment) {
  
      element.classList.add('chart-11-1-area-active')
  
      let lapsLocal = segment.filter(o => notNaN(o['x']) && notNaN(o['y']))
      lapsLocal = lapsLocal.map(o => o['x'])
      lapsLocal = lapsLocal.filter(o => Number.isInteger(o))
  
      eventPaceTooltip1Fill(data, dataLeft, lapsLocal)
      
    }
  
  
    function eventPaceTooltip1ChartDeactivate(element, segment) {
  
      if (!element.classList.contains('clicked')) {
  
        element.classList.remove('chart-11-1-area-active')
        
        let lapsLocal = segment.filter(o => notNaN(o['x']) && notNaN(o['y']))
        lapsLocal = lapsLocal.map(o => o['x'])
        lapsLocal = lapsLocal.filter(o => Number.isInteger(o))
  
        eventPaceTooltip1Fill(data, dataLeft, lapsLocal)
        
      }
  
    }
    
  
    function eventPaceTooltip1ChartClick(element, segment) {
  
      let color = element.getAttribute('fill-color')
  
      if (element.classList.contains('clicked')) {
  
        element.classList.remove('clicked')
        
      } else {
  
        let fillAreaElement = d3GetElement(fillArea)
        let areas = childrenToArray(fillAreaElement)
      
        areas.forEach((area, i) => {
  
          if (area != element) {
            
            area.classList.remove('clicked')
            area.classList.remove('chart-11-1-area-active')
            area.style.fill = area.getAttribute('fill-color')
            
          } else {
            
            element.classList.add('clicked')
            color = paleColor(color, 0.75, colorThemesChartBackground)
            
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
  
      if (dataRight) {
        
        dataRightLocal = dataRight.filter(o => lapsLocalBoth.includes(Number(o['LapNumber'])))
        dataRightLocalStart = firstElement(dataRightLocal)
        dataRightLocalEnd = lastElement(dataRightLocal)
        
      }
  
      let dataDiffLocal = data.filter(o => lapsLocalBoth.includes(o['x']))
      dataDiffLocal = dataDiffLocal.map(o => o['y']).filter(NaNs)
  
      let tooltipElement = getElement(eventPaceTooltip1ID)
  
      let nameElement = getElement(eventPaceTooltip1NameID)
      nameElement.textContent = dataLeftLocal[0]['FullName']
      nameElement.style.color = paleColor(dataLeftLocal[0]['Color'], 0.9)
  
      let nameComapreElement = getElement(eventPaceTooltip1CompareNameID)
      let nameComapreText
      let nameComapreColor
  
      if (dataRight) {
  
        nameComapreText = dataRightLocal[0]['FullName']
        if (dataRightLocal[0]['Color'] == dataLeftLocal[0]['Color']) {
          nameComapreColor = modColor2(dataRightLocal[0]['Color']), 0.9
        } else {
          nameComapreColor = paleColor(dataRightLocal[0]['Color'], 0.9)
        }
        
        
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
    
      if (dataRight) {
  
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
  
    eventPaceTooltip1Fill(data, dataLeft, laps)

  }
                
}


function chart_12(ContainerID, metric, dataLaptimes, colors, id) {

  // data -> eventLaptimes
  // team pace analytics

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

  let paddingXOuter = px12
  let paddingYOuter = px12
  

  // ---------------------  DATA  --------------------- //


  let dataRaw = copyObject(dataLaptimes)
  let data = dataRaw[0]
  let dataComp
    
  if (dataRaw[1]) { dataComp = copyObject(dataRaw[1]) }

  let colorPrime = colors[0]
  let colorComp = colors[1]
  
  // data = sortObject(data, metric, false)

  let laps = data.map(o => o['LapNumber'])
  // laps = dropDuplicates(laps)

  if (dataRaw[1]) {
    
    let lapsComp = dataComp.map(o => o['LapNumber'])
    
    laps = laps.concat(lapsComp)
    laps = dropDuplicates(laps)
    
  }
  
  let lastLap = Math.max.apply(null, laps)

  let xMin = (isEven(lastLap)) ? 2 : 1
  let xMax = lastLap

  // let xtickValues = laps.filter((l) => l % 2 === 0)
  let xTickValues = range(xMin, xMax + 2, 2)

  let paceDiff = data.map(o => o[metric])
  paceDiff = paceDiff.filter( o => o != '-')
  paceDiff = paceDiff.map(Number)

  if (dataRaw[1]) {

    let paceDiffComp = dataComp.map(o => o[metric])
    paceDiffComp = paceDiffComp.filter( o => o != '-')
    paceDiffComp = paceDiffComp.map(Number)
    
    paceDiff = paceDiff.concat(paceDiffComp)
    
  }

  let ySmallest = Math.min.apply(null, paceDiff)
  let yLargest = Math.max.apply(null, paceDiff)

  ySmallest = roundStep(ySmallest, 0.5, 'floor')
  yLargest = roundStep(yLargest, 0.5, 'ceil')

  let ytickValuesRaw = generateRange(ySmallest, yLargest, '2')
  let yTickValues = arrayAddMeanElementsInside(ytickValuesRaw)

  let yMin = firstElement(yTickValues)
  let yMax = lastElement(yTickValues)

  let dataFillArea = []

  laps.forEach((lap, i) => {

    let condition = (o) => o['LapNumber'] == lap

    let data1 = data.filter(o => condition(o))[0]
    let data2 = dataComp.filter(o => condition(o))[0]
    
    let value1 = NaN
    let value2 = NaN

    let drawLine1 = NaN
    let drawLine2 = NaN

    if (data1) { value1 = Number(data1[metric]) }
    if (data2) { value2 = Number(data2[metric]) }

    // draw line if another out and not in pit
    if (isNaN(value1) && !data1) { drawLine2 = Number(data2[metric]) }
    else { drawLine2 = NaN }

    // draw line if another out and not in pit
    if (isNaN(value2) && !data2) { drawLine1 = Number(data1[metric]) }
    else { drawLine1 = NaN }

    let meanValue

    if (value1 <= value2) { meanValue = value2 + 0.5*(value1 - value2) }
    else { meanValue = value1 + 0.5*(value2 - value1) }

    dataFillArea.push({x: Number(lap), y: value1, z: value2, Mean: meanValue, yLine: drawLine1, zLine: drawLine2})
    
  })


  let conditionCrossEachOther = (dataCurrent, dataPrevious) => (
    ((dataPrevious.y >= dataPrevious.z) && (dataCurrent.y < dataCurrent.z))
    || ((dataPrevious.y <= dataPrevious.z) && (dataCurrent.y > dataCurrent.z))
  )

  let pathData = d3getDataForColoredPathsBoth(dataFillArea, conditionCrossEachOther)

  // ------------------------  SVG  ------------------------- //


  let widthDiv = container.offsetWidth
  let heightDiv = remToPix(25)
  
  if (container.children.length == 0) {
    d3.select(containerID).append('svg')
  }

  let svgID = 'chart-12-' + id

  let svg = d3
    .select(containerID)
    .select('svg')
    // .classed('border-blue o-visible', true)
    .attr('id', svgID)
    .attr('width', widthDiv)
    .attr('height', heightDiv)

  let main = svg
    .append('g')
    .attr('id', 'chart-12-main-' + id)
    .attr("transform", `translate(${offsetLeft}, ${offsetTop})`)


  // -------------------------  Y-SCALE, Y-AXIS, Y-LABELS  ------------------------- //

  let height = heightDiv - offsetTop
  
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
    // .tickFormat(d3.format('c'))

  let yLeft = main
    .append("g")
    .attr('name', 'axis-left')
    // .style('transform-box', 'fill-box')
    // .style('transform', 'translate(100%, 0)')

  yLeft
    .append("g")
    .attr('name', 'ticks')
    .attr('id', 'chart-12-left-axis-' + id)
    .call(yAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ yLeft }), px1, px11, axis='y', yTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let yLeftElement = d3GetElement(yLeft)
  let yLeftWidth = getSizes(yLeftElement).width


  // -------------------------  X-SCALE, X-AXIS, X-LABELS  ------------------------- //

  let width = widthDiv - offsetLeft - offsetRight - yLeftWidth - yPad

  let xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([0, width])
    // .paddingInner(1)
    // .paddingOuter(paddingXOuter)

  d3adjustPaddingOuter(paddingXOuter, xScale, axis='x', type='linear')

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
    .attr('id', 'chart-12-bottom-axis-' + id)
    .call(xAxis)
    // .call(g => g.select('.domain').remove())

  d3StyleAxis(Object.entries({ xBottom }), px1, px10, axis='x', xTicksPad, colorThemesChartAxis, colorThemesChartAxisTickLabels)

  let xBottomElement = d3GetElement(xBottom)
  let xBottomElementSizes = getSizes(xBottomElement)
  let xBottomElementHeight = Math.ceil(xBottomElementSizes.height)


  // ------------------------  TRANSITIONS  ------------------------- //


  // y-axis
  let transformLeftX = yLeftWidth
  yLeftElement.setAttribute('transform', `translate(${transformLeftX}, 0)`)

   // x-axis
  let transformBottomX = yLeftWidth + yPad
  let transformBottomY = height + xPad
  xBottomElement.setAttribute('transform', `translate(${transformBottomX}, ${transformBottomY})`)

  // adjust SVG height
  let heightAdjusted = offsetTop + height + xPad + xBottomElementHeight
  d3GetElement(svg).setAttribute('height', heightAdjusted)

  let chart = main
    .append('g')
    .attr('name', 'chart')
    .attr("transform", `translate(${yLeftWidth + yPad}, 0)`)


  // -------------------------------------  GRID  ------------------------------------- //

  
  // xtick every 4th lap since second lap
  // let gridShow = range(2, xMax, 4)
  let yGridShow = yTickValues.filter((_, index) => index % 2 == 0)
  yGridShow = yTickValues

  // grid-x
  // d3DrawXGrid(chart, 'grid-bottom', xScale, xTickValues, yScale(yMax), yScale(yMin), colorThemesChartGrid, scaleType='linear')
  d3DrawXGrid(chart, 'grid-bottom', xScale, xTickValues, 0, height, colorThemesChartGrid, scaleType='linear')
  
  // grid-y
  // d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, xScale(xMin), xScale(xMax), colorThemesChartGrid, scaleType='linear')
  d3DrawYGrid(chart, 'grid-left-2', yScale, yGridShow, 0, width, colorThemesChartGrid, scaleType='linear')


  // ------------------------  LINES  ------------------------- //

  
  let lines = chart
    .append('g')
    .attr('name', 'lines')

  let fillArea = lines
    .append('g')
    .attr('name', 'fill-area')

  let markerLine = lines
    .append('g')
    .attr('name', 'line-marker')

  // let lines2 = lines
  //   .append('g')
  //   .attr('name', 'lines-right')

  // let lines1 = lines
  //   .append('g')
  //   .attr('name', 'lines-left')

  let smoother
  // smoother = d3.curveCatmullRom.alpha(0)
  // smoother = d3.curveBasisOpen
  // smoother = d3.curveBasis
  // smoother = d3.curveCardinal
  smoother = d3.curveCatmullRom

  let smootherMeanLine
  smootherMeanLine = d3.curveBundle.beta(0.75)

  let lineGeneratorMeanPace = d3
    .line()
    .curve(smootherMeanLine)
    // .defined(d => notNaN(d.x) && notNaN(d.y) && notNaN(d.z))
    .defined(d => notNaN(d.x) && notNaN(d['Mean']))
    .x(d => xScale(d.x))
    .y(d => yScale(d['Mean']))

  let lineGenerator1 = d3
    .line()
    .curve(smoother)
    // .defined(d => notNaN(d.x) && notNaN(d.y) && isNaN(d.z))
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

  lines
    .append("path")
    .data([dataFillArea])
    .attr('d', lineGenerator1)
    .style('stroke', colorPrime)
    .style('stroke-width', px3)
    .style('fill', 'none')
    .style('pointer-events', 'none')

  lines
    .append("path")
    .data([dataFillArea])
    .attr('d', lineGenerator2)
    .style('stroke', colorComp)
    .style('stroke-width', px3)
    .style('fill', 'none')
    .style('pointer-events', 'none')

  pathData.forEach((part, i) => {

    let segment = part['segment']
    let type = part['type']
    let color_ = (type == 'y_lower') ? colorPrime : colorComp

    // let condition = (Math.ceil(segment[0]['x']) != segment[1]['x'])

    // if (condition) {
    //   // segment.shift()
    // }


    fillArea
      .append('path')
      .datum(segment)
      .attr('d', fillGenerator)
      // .style('fill', alphaColor(color_, 0.5))
      .style('fill', alphaColor(color_, 0.6))
      // .style('fill', color_)
      // .style('opacity', 0.5)
      .style('stroke', saturateColor(color_, 0.75))
      // .style('stroke', alphaColor(color_, 0.9, colorThemesChartBackground))
      .style('stroke-width', px0)
      .style('shape-rendering', 'geometricPrecision')
      // .style('stroke-width', (segment.length < 4) ? px2 : px2)
      // .style('shape-rendering', (segment.length < 4) ? 'crispEdges' : 'geometricPrecision')
      // .style('fill', color_)
      // .style('stroke', color_)
      // .style('opacity', 0.5)
      .style('cursor', 'pointer')
      .on('mousemove', (event, d) => {
        
        event.target.style.strokeWidth = px2
        
      })
      .on('mouseleave', (event, d) => {
        
        event.target.style.strokeWidth = px0
        
      })

  })

  markerLine
    .append('line')
    .attr('x1', 0.5*paddingXOuter)
    .attr('x2', width - 0.5*paddingXOuter)
    .attr('y1', yScale(0))
    .attr('y2', yScale(0))
    .attr('fill', 'none')
    .attr('stroke', '#707070')
    .attr('stroke-width', px2)

  lines
    .append("path")
    .data([dataFillArea])
    .attr('d', lineGeneratorMeanPace)
    .attr('id', svgID + 'mean-pace')
    .style('stroke', '#696E73')
    .style('stroke-width', px3)
    .style('fill', 'none')
    .style('pointer-events', 'none')

}

















