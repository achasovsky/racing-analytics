const notMobileDevice = isHoverable()
const mobileDevice = !isHoverable()

globalThis.themeCurrent = 'light'
// globalThis.themeCurrent = 'dark'

globalThis.PrimaryFont = 'Nunito'

// weather icons
globalThis.iconsConditions = {
  '-': {Filename:'blank', Width: '0.95rem', MarginTopIcon: '0rem', MarginLeftText: '0.45rem'},
  'No data': {Filename:'minus', Width: '0.95rem', MarginTopIcon: '0.1rem', MarginLeftText: '0.45rem'},
  'Sunny': {Filename:'sunny-colored', Width: '0.95rem', MarginTopIcon: '0.1rem', MarginLeftText: '0.45rem'},
  'Clear': {Filename:'clear-colored', Width: '0.95rem', MarginTopIcon: '0.1rem', MarginLeftText: '0.45rem'},
  'Partly-cloudy': {Filename:'partly-cloudy-colored', Width: '0.95rem', MarginTopIcon: '0rem', MarginLeftText: '0.45rem'},
  'Cloudy': {Filename:'cloudy-colored', Width: '0.95rem', MarginTopIcon: '0.05rem', MarginLeftText: '0.5rem'},
  'Wet-drying': {Filename:'wet-drying-colored', Width: '0.95rem', MarginTopIcon: '0.05rem', MarginLeftText: '0.5rem'},
  'Light-rain': {Filename:'rain-light-colored', Width: '0.9rem', MarginTopIcon: '0.075rem', MarginLeftText: '0.45rem'},
  'Rain': {Filename:'rain-heavy-colored', Width: '0.95rem', MarginTopIcon: '0.15rem', MarginLeftText: '0.45rem'},
}

// for conditions names check 'iconsConditions' in global variables
globalThis.seasonNextEventConditions = 'Clear'
globalThis.seasonNextEventTemperature = '27'
globalThis.seasonNextEventWind = '10.0'
globalThis.seasonNextEventRainProbability = '0'

globalThis.seasonNextEventConditionsIcon = iconsConditions[seasonNextEventConditions]['Filename']
globalThis.seasonNextEventConditionsIconMarginTop = iconsConditions[seasonNextEventConditions]['MarginTopIcon']
globalThis.seasonNextEventConditionsTextMarginLeft = iconsConditions[seasonNextEventConditions]['MarginLeftText']
globalThis.seasonNextEventConditionsWidth = iconsConditions[seasonNextEventConditions]['Width']

// paths
globalThis.pathEvents = 'data/info/'
globalThis.pathDrivers = 'data/info/'
globalThis.pathSeasonData = 'data/season/'
globalThis.pathImg = 'img/'
globalThis.pathImgDrivers = 'img/img-drivers/'
globalThis.pathImgEngines = 'img/img-engines/'
globalThis.pathImgConstructors = 'img/img-constructors/'
globalThis.pathImgNationsRound = 'img/img-nations/round/'
globalThis.pathImgNationsRect = 'img/img-nations/rect/'
globalThis.pathSummary = 'data/summary/'
globalThis.pathProtocols = 'data/protocols/'
globalThis.pathLaptimes = 'data/laptimes/'
globalThis.pathDriversData = 'data/drivers/'

// formats
globalThis.imagesFormat = '.avif'

globalThis.currentLocation = null
globalThis.noDefinedMetrics = ['DNF', 'DNC', 'DSQ', 'DNS']

globalThis.scrollPosition = 0

globalThis.guide1OpenCloseButtonID = 't9p4fs'
globalThis.guide1ID = 'nfhos6'
globalThis.guide1TocID = 'frzhps'
globalThis.guide1TocButtonID = 'cy50yb-'
globalThis.guideButtonID = 'guide-button'
globalThis.guideCloseIconID = 'guide-close-icon'
globalThis.guideFullscreenIconID = 'guide-fullscreen-icon'
globalThis.guideMenu1ID = 'guide-menu-1'
globalThis.guide1OverflowContainerID = 'guide-1-overflow-container'
globalThis.guide1TocOverflowContainerID = 'guide-1-toc-overflow-container'

globalThis.dropdownNavigationIconsTwoWidths = convertRemToPixels(0.75)
globalThis.mainHeaderHeight = convertRemToPixels(2.5)

globalThis.globalScrollBehavior = 'smooth'


//////////////////////////////////////////// MAIN ////////////////////////////////////////////

globalThis.mainMainContainerID = 'h7sg69'
globalThis.mainContentContainerID = 'z7a8xk'

globalThis.mainMainPageButtonID = 'jaatz1'


//////////////////////////////////////////// MAIN Title ////////////////////////////////////////////


globalThis.containerMainTitleID = 'z0wrmh'

globalThis.mainTitleScrollelementID = 'lehi0c-'


//////////////////////////////////////// CHAMPIOSHIP ////////////////////////////////////////


globalThis.glVSeason = {
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

globalThis.seasonMainContainerID = 'onxl20'
globalThis.seasonContentContainerID = 'djpies'

globalThis.menuYears11ContainerID = 'opyz3b'
globalThis.menuYears11ID = 'y3883o'
globalThis.menuYears11ItemID = 'yxar0r'

globalThis.seasonLastEventDateID = 'season-last-event-date'
globalThis.seasonLastEventNameID = 'season-last-event-name'
globalThis.seasonLastEventOrderNumberID = 'season-last-event-order-number'
globalThis.seasonLastEventTrackNameID = 'season-last-event-track-name'
globalThis.seasonLastEventFlagID = 'season-last-event-flag'
globalThis.seasonLastEventWinnerID = 'season-last-event-winner'
globalThis.seasonLastEventPoleID = 'season-last-event-pole'
globalThis.seasonNextEventDateID = 'season-next-event-date'
globalThis.seasonNextEventNameID = 'season-next-event-name'
globalThis.seasonNextEventOrderNumberID = 'season-next-event-order-number'
globalThis.seasonNextEventTrackNameID = 'season-next-event-track-name'
globalThis.seasonNextEventFlagID = 'season-next-event-flag'
globalThis.seasonNextEventWeatherForecastIconID = 'season-next-event-weather-forecast-icon'
globalThis.seasonNextEventWeatherForecastTempID = 'season-next-event-weather-forecast-temp'
globalThis.seasonNextEventWeatherForecastRainID = 'season-next-event-weather-forecast-rain'
globalThis.seasonNextEventWeatherForecastWindID = 'season-next-event-weather-forecast-wind'
globalThis.seasonStatisticsCompetitionWinnersMetricID = 'season-statistics-competition-winners'
globalThis.seasonStatisticsCompetitionPolesMetricID = 'season-statistics-competition-poles'
globalThis.seasonStatisticsCompetitionLevelMetricID = 'season-statistics-competition-level'
globalThis.seasonStatisticsFirstPlaceID = 'season-statistics-first-place'
globalThis.seasonStatisticsSecondPlaceID = 'season-statistics-second-place'
globalThis.seasonStatisticsThirdPlaceID = 'season-statistics-third-place'



///////////////////// Championship Statistics /////////////////////

globalThis.containerSeasonStatisticsID = 'oeqei5'
globalThis.containerSeasonStatisticsInfoID = 'hejugj'

// data_6 (statistics)
globalThis.seasonStatisticsTables2Info = [
  {
    id: 2,
    metric: 'PointsOfficialSumAllTeams',
    sort: {'ChampionshipClassification': true},
    lessThanFive: false
  },
  {
    id: 5,
    metric: 'OvertakesGainSumAllTeams',
    sort: {'ChampionshipClassification': true, 'OvertakesGainSumAllTeams': false},
    lessThanFive: true
  },
  {
    id: 6,
    metric: 'OvertakesSumAllTeams',
    sort: {'ChampionshipClassification': true, 'OvertakesSumAllTeams': false},
    lessThanFive: true
  },
  {
    id: 7,
    metric: 'OvertakesGainPercentAllTeams',
    sort: {'ChampionshipClassification': true, 'OvertakesGainPercentAllTeams': false},
    lessThanFive: true
  },
  {
    id: 8,
    metric: 'OvertakesLostSumAllTeams',
    sort: {'ChampionshipClassification': true, 'OvertakesLostSumAllTeams': true},
    lessThanFive: true
  },
  {
    id: 9,
    metric: 'StartGainSumAllTeams',
    sort: {'ChampionshipClassification': true, 'StartGainSumAllTeams': false},
    lessThanFive: true},
  {
    id: 10,
    metric: 'StartSumAllTeams',
    sort: {'ChampionshipClassification': true, 'StartSumAllTeams': false},
    lessThanFive: true
  },
  {
    id: 11,
    metric: 'StartGainPercentAllTeams',
    sort: {'ChampionshipClassification': true, 'StartGainPercentAllTeams': false},
    lessThanFive: true
  },
  {
    id: 12,
    metric: 'StartLostSumAllTeams',
    sort: {'ChampionshipClassification': true, 'StartLostSumAllTeams': true},
    lessThanFive: true
  },
  {
    id: 13,
    metric: 'CardsEventSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardsEventSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 14,
    metric: 'CardPointsSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardPointsSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 15,
    metric: 'CardConsistencySumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardConsistencySumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 16,
    metric: 'CardPaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardPaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 17,
    metric: 'CardSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 18,
    metric: 'CardStartSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardStartSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 19,
    metric: 'CardOvertakesSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardOvertakesSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 20,
    metric: 'MistakesCountPerLapPercAllTeams',
    sort: {'ChampionshipClassification': true, 'MistakesCountPerLapPercAllTeams': true},
    lessThanFive: false
  },
  {
    id: 21,
    metric: 'MistakesLossesPerLapAvgAllTeams',
    sort: {'ChampionshipClassification': true, 'MistakesLossesPerLapAvgAllTeams': true},
    lessThanFive: false
  },
  {
    id: 22,
    metric: 'MistakesCountAvgAllTeams',
    sort: {'ChampionshipClassification': true, 'MistakesCountAvgAllTeams': true},
    lessThanFive: false
  },
  {
    id: 23,
    metric: 'WinnerRaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'WinnerRaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 24,
    metric: 'PodiumRaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'PodiumRaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 25,
    metric: 'SecondRaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'SecondRaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 26,
    metric: 'ThirdRaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'ThirdRaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 27,
    metric: 'WinnerQualiRaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'WinnerQualiRaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 28,
    metric: 'QualiTeammateDiscreteRaceSumAllTeams',
    sort: {'ChampionshipClassification': true, 'QualiTeammateDiscreteRaceSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 29,
    metric: 'LapsLeadingSumAllTeams',
    sort: {'ChampionshipClassification': true, 'LapsLeadingSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 30,
    metric: 'CardMultipleSumAllTeams',
    sort: {'ChampionshipClassification': true, 'CardMultipleSumAllTeams': false},
    lessThanFive: false
  },
  

]

globalThis.aggreagationTable1ID = 'aggreagation-table-1'
globalThis.aggreagationTable2ID = 'aggreagation-table-2'
globalThis.aggreagationTable3ID = 'aggreagation-table-3'
globalThis.aggreagationTable4ID = 'aggreagation-table-4'
globalThis.aggreagationTable5ID = 'aggreagation-table-5'
globalThis.aggreagationTable6ID = 'aggreagation-table-6'
globalThis.aggreagationTable7ID = 'aggreagation-table-7'
globalThis.aggreagationTable8ID = 'aggreagation-table-8'
globalThis.aggreagationTable9ID = 'aggreagation-table-9'
globalThis.aggreagationTable10ID = 'aggreagation-table-10'
globalThis.aggreagationTable11ID = 'aggreagation-table-11'
globalThis.aggreagationTable12ID = 'aggreagation-table-12'

globalThis.seasonStatisticsToc0ID = 'qpz1ck'

globalThis.seasonStatisticsTocScrollLeadersID = 'season-statistics-scroll-leaders'
globalThis.seasonStatisticsTocScrollOvertakesID = 'season-statistics-scroll-overtakes'
globalThis.seasonStatisticsTocScrollStartID = 'season-statistics-scroll-start'
globalThis.seasonStatisticsTocScrollCardsID = 'season-statistics-scroll-cards'
globalThis.seasonStatisticsTocScrollMistakesID = 'season-statistics-scroll-mistakes'

globalThis.seasonStatisticsToc0Attributes = [
  {title: 'Лидеры', scrollTo: seasonStatisticsTocScrollLeadersID},
  {title: 'Обгоны', scrollTo: seasonStatisticsTocScrollOvertakesID},
  {title: 'Старт', scrollTo: seasonStatisticsTocScrollStartID},
  {title: 'Карточки', scrollTo: seasonStatisticsTocScrollCardsID},
  {title: 'Ошибки', scrollTo: seasonStatisticsTocScrollMistakesID},
]


///////////////////// Championship Ratings /////////////////////

globalThis.containerSeasonRatingsID = 'bkyv96'
globalThis.containerAggTable2ID = 'lv5i55'
globalThis.containerTable2AndChartLolID = 'dr8rtm'
globalThis.containerChartLine1ID = 'zt4l9p'
// globalThis.containerSeasonRatingsTitle1ID = 'b5ohzq'
// globalThis.containerSeasonRatingsTitle2ID = 't73frb'

// table 2 elements
globalThis.seasonCategoriesElementsID = 'zaeu34f2-'

globalThis.radio11ID = 'radio-1-1'
globalThis.radio11Condition = null

globalThis.dropdown12ContainerID = 'dropdown-1-2-container'
globalThis.dropdown12ID = 'dropdown-1-2'
globalThis.dropdown12TitleID = 'dropdown-1-2-title'
globalThis.dropdown12MenuID = 'dropdown-1-2-menu'
globalThis.dropdown12MenuItemID = 'dropdown-1-2-menu-item-'

globalThis.dropdown12Data = [
  {
    label: 'Позиция в рейтинге',
    metric: 'RankPointsAvg',
    chartLine1Metric: 'RankPointsInterpolated',
    stability: 'RankPointsStability',
    ascending: true
  },
  {
    label: 'Средняя плотность',
    metric: 'RankConsistencyAvg',
    chartLine1Metric: 'RankConsistencyInterpolated',
    stability: 'RankConsistencyStability',
    ascending: true
  },
  {
    label: 'Средний темп',
    metric: 'RankPaceAvg',
    chartLine1Metric: 'RankPaceInterpolated',
    stability: 'RankPaceStability',
    ascending: true
  },
  {
    label: 'Борьба на трассе',
    metric: 'RankOvertakesAvg',
    chartLine1Metric: 'RankOvertakesInterpolated',
    stability: 'RankOvertakesStability',
    ascending: true
  },
  {
    label: 'Действия на старте',
    metric: 'RankStartAvg',
    chartLine1Metric: 'RankStartInterpolated',
    stability: 'RankStartStability',
    ascending: true
  },
]

globalThis.infoIcon1ID = 'info-icon-1'
globalThis.infoSign1ID = 'info-sign-1'
globalThis.infoTable1ID = 'info-table-1'


///////////////////// Championship Comparison /////////////////////


globalThis.containerSeasonDriversID = 'q4z5nn'

globalThis.radio12ID = 'radio-1-2'

globalThis.seasonDriversIDTLeft = []
globalThis.seasonDriversIDTRight = []
globalThis.seasonDriversTeamLeft = []
globalThis.seasonDriversTeamRight = []
globalThis.seasonDriversNumberLeft = []
globalThis.seasonDriversNumberRight = []
globalThis.seasonDriversNameLeft = []
globalThis.seasonDriversNameRight = []
globalThis.seasonDriversIDLeft = []
globalThis.seasonDriversIDRight = []
globalThis.seasonDriversColorLeft = []
globalThis.seasonDriversColorRight = []

globalThis.seasonDriversStatisticsTitleID = 'season-drivers-statistics-title'
globalThis.seasonDriversChartStatisticsDriverLeftID = 'season-drivers-chart-statistics-driver-left'
globalThis.seasonDriversChartStatisticsDriverRightID = 'season-drivers-chart-statistics-driver-right'
globalThis.seasonDriversChartStatisticsDriverLeftTeamID = 'season-drivers-chart-statistics-driver-left-team'
globalThis.seasonDriversChartStatisticsDriverRightTeamID = 'season-drivers-chart-statistics-driver-right-team'

globalThis.dropdown13LeftContainerID = 'dropdown-1-3-left-container'
globalThis.dropdown13LeftID = 'dropdown-1-3-left'
globalThis.dropdown13TitleLeftID = 'dropdown-1-3-title-left'
globalThis.dropdown13MenuLeftID = 'dropdown-1-3-menu-left'
globalThis.dropdown13MenuLeftItemID = 'dropdown-1-3-menu-left-item-'
globalThis.dropdown13CaretLeftID = 'dropdown-1-3-caret-left'

globalThis.dropdown13RightContainerID = 'dropdown-1-3-right-container'
globalThis.dropdown13RightID = 'dropdown-1-3-right'
globalThis.dropdown13TitleRightID = 'dropdown-1-3-title-right'
globalThis.dropdown13MenuRightID = 'dropdown-1-3-menu-right'
globalThis.dropdown13MenuRightItemID = 'dropdown-1-3-menu-right-item-'
globalThis.dropdown13CaretRightID = 'dropdown-1-3-caret-right'

globalThis.dropdown13CenterContainerID = 'dropdown-1-3-center-container'
globalThis.dropdown13CenterID = 'dropdown-1-3-center'
globalThis.dropdown13TitleCenterID = 'dropdown-1-3-title-center'
globalThis.dropdown13MenuCenterID = 'dropdown-1-3-menu-center'
globalThis.dropdown13MenuCenterItemID = 'dropdown-1-3-menu-center-item-'
globalThis.dropdown13CaretCenterID = 'dropdown-1-3-caret-center'

globalThis.dropdown14ContainerID = 'dropdown-1-4-container'
globalThis.dropdown14ID = 'dropdown-1-4'
globalThis.dropdown14TitleID = 'dropdown-1-4-title'
globalThis.dropdown14MenuID = 'dropdown-1-4-menu'
globalThis.dropdown14MenuItemID = 'dropdown-1-4-menu-item-'
globalThis.decorCircleLeft = 'drcjsm'
globalThis.decorCircleRight = 'r6s28g'

// also change 'metricRatings' variable in 'page-season' script in 'seasonDriversUpdateChart1' function
globalThis.dropdown14Data = [
  {label: 'Финишная позиция', metric: 'ClassifiedPositionInterpolated', chart: 5},
  {label: 'Стартовая позиция', metric: 'GridPositionInterpolated', chart: 6},
  {label: 'Набранные очки', metric: 'PointsOfficialCumSum', chart: 7},
  {label: 'Позиция в рейтинге', metric: 'RankPointsInterpolated', chart: 8},
  {label: 'Рейтинг : Пилотирование', metric: 'RankTimingInterpolated', chart: 8},
  {label: 'Рейтинг : Плотность', metric: 'RankConsistencyInterpolated', chart: 8},
  {label: 'Рейтинг : Темп', metric: 'RankPaceInterpolated', chart: 8},
  {label: 'Рейтинг : Борьба на трассе', metric: 'RankActionsInterpolated', chart: 8},
  {label: 'Рейтинг : Обгоны', metric: 'RankOvertakesInterpolated', chart: 8},
  {label: 'Рейтинг : Старт', metric: 'RankStartInterpolated', chart: 8},
]

globalThis.iconNavBackward13ID = 'dropdown-1-3-center-backward'
globalThis.iconNavForward13ID = 'dropdown-1-3-center-forward'

globalThis.seasonDriversImageLeftID = 'image-season-drivers-left'
globalThis.seasonDriversImageRightID = 'image-season-drivers-right'
globalThis.seasonDriversNameLeftID = 'johdbb'
globalThis.seasonDriversNameRightID = 'fvcznc'
globalThis.seasonDriversTeamLeftID = 'fnj4j6'
globalThis.seasonDriversTeamRightID = 'x12eym'

globalThis.seasonDriversDriverLeftNoDataID = 'season-drivers-driver-left-no-data'
globalThis.seasonDriversDriverLeftNoDataInfoID = 'season-drivers-driver-left-no-data-info'
globalThis.seasonDriversDriverRightNoDataID = 'season-drivers-driver-right-no-data'
globalThis.seasonDriversDriverRightNoDataInfoID = 'season-drivers-driver-right-no-data-info'

// statistics block - main
globalThis.chartStatisticsMainDict = [
  {Label: 'Число гран-при', Metric: 'RacesParticipated', Ascending: false},
  {Label: 'Набранные очки', Metric: 'PointsOfficialSum', Ascending: false},
  {Label: 'Средняя позиция в рейтинге', Metric: 'RankPointsAvg', Ascending: true},
  {Label: 'Средний рейтинговый балл', Metric: 'PointsAvg', Ascending: false},
  {Label: 'Стабильность в рейтинге', Metric: 'RankPointsStability', Ascending: true}
]

// statistics block - start
globalThis.chartStatisticsStartDict = [
  {Label: 'Средняя стартовая позиция', Metric: 'GridPositionAvg', Ascending: true},
  {Label: 'Лучшая стартовая позиция', Metric: 'GridPositionBest', Ascending: true},
  {Label: 'Худшая стартовая позиция', Metric: 'GridPositionWorst', Ascending: true},
  {Label: 'Средний стартовый ряд', Metric: 'GridRowAvg', Ascending: true},
]

// statistics block - finish
globalThis.chartStatisticsFinishDict = [
  {Label: 'Средняя финишная позиция', Metric: 'ClassifiedPositionAvg', Ascending: true},
  {Label: 'Лучшая финишная позиция', Metric: 'ClassifiedPositionBest', Ascending: true},
  {Label: 'Худшая финишная позиция', Metric: 'ClassifiedPositionWorst', Ascending: true},
  {Label: 'Количество сходов', Metric: 'RetiredSum', Ascending: true}
]

// statistics block - compare
globalThis.chartStatisticsCompareDict1 = [
  {Label: 'Квалификация выше партнера*', Metric: 'QualiTeammateDiscreteClearSum', Ascending: false},
  {Label: 'Финиш выше партнера', Metric: 'FinishTeammateSum', Ascending: false},
  {Label: 'Финиш выше партнера**', Metric: 'FinishTeammateClearSum', Ascending: false},
]

globalThis.chartStatisticsCompareDict2 = [
  {Label: 'Плотность : рейтинг выше партнера', Metric: 'ConsistencyTeammateDiscreteSum', Ascending: false},
  {Label: 'Темп : рейтинг выше партнера***', Metric: 'PaceTeammateDiscreteSum', Ascending: false},
  {Label: 'Старт : рейтинг выше партнера', Metric: 'StartTeammateDiscreteSum', Ascending: false},
  {Label: 'Обгоны : рейтинг выше партнера***', Metric: 'OvertakesTeammateDiscreteSum', Ascending: false},
]

globalThis.seasonComparisonToc0ID = 'gongko'
globalThis.seasonComparisonToc0ScrollElement1ID = 'kzcayqv8'
globalThis.seasonComparisonToc0ScrollElement2ID = 'jfe7zgfw'

globalThis.seasonComparisonToc0Attributes = [
  {title: 'Графики', scrollTo: seasonComparisonToc0ScrollElement1ID},
  {title: 'Статистика', scrollTo: seasonComparisonToc0ScrollElement2ID},
]


///////////////////////////// EVENT /////////////////////////////


globalThis.glVEvent = {
  'ActualSeasonID': null,
  'ActualEventRaceID': null,
  'SeasonID': null,
  'RaceID': null,
  'EventNameRus': null,
  'EventLabel': null,
  'Page': null,
  'SeasonOver': null,
  'EventID': null,
  'WrongEvent': false,
  'WrongEventNameRus': null,
  'NotAvailableEvent': false,
  'NotAvailableEventNameRus': null,
  'ComparisonReset': true,
  'PaceReset': true,
  'Radio21Condition': null,
  'PaceDefaultDriver': true
  // 'FirstLoad': null
}

globalThis.eventMainContainerID = 'lr3g9r'

globalThis.eventContentContainerID = 'gqtjhs'

globalThis.menuYears21ID = 'a21i8v'
globalThis.menuYears21ItemID = 'af55um'
globalThis.menuEvents21ID = 'awk0gh'
globalThis.menuEvents21ItemID = 'aj0raf'
// globalThis.menuEvents21SVGID = 'menu-events-2-1-svg'

globalThis.eventSummary = null
globalThis.eventsEvent = null
globalThis.eventsEventsCurrentSeason = null


///////////////////////////// Event Rating /////////////////////////////

globalThis.containerEventsRatingID = 'j8256h'

globalThis.eventRatingsProtocolID = 'events-ratings-protocol'
globalThis.eventsRatingsMetricsFieldsetID = 'cu1gbj'
globalThis.eventsRatingsProtocolFieldsetID = 'o4xakf'

globalThis.eventEventInfoTrackName1ID = 'grandprix-gpinformation-track-name-1'
globalThis.eventEventInfoTrackName2ID = 'grandprix-gpinformation-track-name-2'
globalThis.eventEventInfoTrackName3ID = 'grandprix-gpinformation-track-name-3'
globalThis.eventEventInfoFlagID = 'grandprix-gpinformation-flag'

globalThis.containerEventInformationDate = 'container-grandprix-gpinformation-date'
globalThis.eventEventInfoEventNameID = 'grandprix-gpinformation-title-gpname'

globalThis.eventWeatherConditionsID = 'grandprix-gpinformation-weather-conditions-icon'
globalThis.eventWeatherConditionsTextID = 'grandprix-gpinformation-weather-conditions'
globalThis.eventWeatherAirID = 'grandprix-gpinformation-weather-air'
globalThis.iconWeatherAirID = 'grandprix-gpinformation-weather-air-icon'
globalThis.eventWeatherTrackID = 'grandprix-gpinformation-weather-track'
globalThis.eventWeatherWindspeedID = 'grandprix-gpinformation-weather-windspeed'
globalThis.eventWeatherHumidityID = 'grandprix-gpinformation-weather-humidity'

globalThis.wrongEventID = 'wrong-event-name'
globalThis.wrongEventCloseIconID = 'error-message-close-icon'
globalThis.eventSprintMarker = ', спринт'

globalThis.eventLaptimes = null
globalThis.eventProtocol = null

globalThis.pathSummaryActual = null
globalThis.pathLaptimesRaceActual = null
globalThis.pathProtocolActual = null


///////////////////////////// Event Categories /////////////////////////////


globalThis.containerEventsCategoriesID = 'dx87ek'

globalThis.eventCategoriesClickedDriverID = null

globalThis.eventCategoriesMetricsNameID = 'z9lkvj-'
globalThis.eventCategoriesMetricsNumberID = 'x9jxun-'
globalThis.eventCategoriesMetricsTeamID = 'v20vq5-'
globalThis.eventCategoriesMetricsTotalRankID = 's3ddbl-'
globalThis.eventCategoriesMetricsTotalPointsID = 'xs4ilh-'
globalThis.eventCategoriesMetricsConsistencyID = 'lzp7ph-'
globalThis.eventCategoriesMetricsPaceID = 'dta9nr-'
globalThis.eventCategoriesMetricsRankConsistencyID = 'xs0afq-'
globalThis.eventCategoriesMetricsPointsConsistencyID = 'mzeyfw-'
globalThis.eventCategoriesMetricsRankPaceID = 'j5zste-'
globalThis.eventCategoriesMetricsPointsPaceID = 'iqt2w8-'


///////////////////////////// Event Comparison /////////////////////////////

globalThis.containerEventsComparisonID = 'z2kmg2'

globalThis.eventComparisonDriversData = {
  'Left': {'Number': null, 'FullName': null, 'Team': null},
  'Right': {'Number': null, 'FullName': null, 'Team': null}
}

globalThis.eventComparisonRefresh = true

globalThis.dropdown24ContainerID = 'dropdown-2-4-container'
globalThis.dropdown24ID = 'dropdown-2-4'
globalThis.dropdown24TitleID = 'dropdown-2-4-title'
globalThis.dropdown24MenuID = 'dropdown-2-4-menu'
globalThis.dropdown24MenuItemID = 'dropdown-2-4-menu-item-'
globalThis.dropdown24CaretID = 'dropdown-2-4-caret'
globalThis.iconBackward24ID = 'icon-backward-2-4'
globalThis.iconForward24ID = 'icon-forward-2-4'

globalThis.dropdown23LeftContainerID = 'dropdown-2-3-container-left'
globalThis.dropdown23LeftID = 'dropdown-2-3-left'
globalThis.dropdown23LeftTitleID = 'dropdown-2-3-title-left'
globalThis.dropdown23LeftMenuID = 'dropdown-2-3-menu-left'
globalThis.dropdown23LeftMenuItemID = 'dropdown-2-3-menu-left-item-'
globalThis.dropdown23LeftCaretID = 'dropdown-2-3-caret-left'
globalThis.eventComparisonIcon23LeftBackwardID = 'icon-backward-2-3-left'
globalThis.eventComparisonIcon23LeftForwardID = 'icon-forward-2-3-left'

globalThis.dropdown23RightContainerID = 'dropdown-2-3-container-right'
globalThis.dropdown23RightID = 'dropdown-2-3-right'
globalThis.dropdown23RightTitleID = 'dropdown-2-3-title-right'
globalThis.dropdown23RightMenuID = 'dropdown-2-3-menu-right'
globalThis.dropdown23RightMenuItemID = 'dropdown-2-3-menu-right-item-'
globalThis.dropdown23RightCaretID = 'dropdown-2-3-caret-right'
globalThis.eventComparisonIcon23RightBackwardID = 'icon-backward-2-3-right'
globalThis.eventComparisonIcon23RightForwardID = 'icon-forward-2-3-right'

globalThis.plotLaptimesContainerID = 'plot-laptimes-container'
globalThis.plotLaptimesDifferenceContainerID = 'plot-laptimes-difference-container'
globalThis.plotLaptimesLeftID = 'plot-laptimes-left'
globalThis.plotLaptimesRightID = 'plot-laptimes-right'
globalThis.plotLaptimesDifferenceID = 'plot-laptimes-difference'

globalThis.check231ID = 'check-2-3-1'

globalThis.laptimesBoardNameLeft = 'laptimes-board-name-left'
globalThis.laptimesBoardNameRight = 'laptimes-board-name-right'

// globalThis.raceResultsMetricsContainerID = 'gobmgo'
globalThis.raceResultsMetricsImageID = 'f260jx-'
globalThis.raceResultsMetricsNameID = 'c4donb-'
globalThis.raceResultsMetricsPositionID = 'k5vkrd-'
globalThis.raceResultsMetricsNumberTeamID = 'etlg8z-'
globalThis.raceResultsMetricsRatingID = 'g4h1w4-'
globalThis.raceResultsMetricsConsistencyID = 'wi378m-'
globalThis.raceResultsMetricsPaceID = 'chnk6n-'
globalThis.raceResultsMetricsOvertakesID = 'izzihq-'
globalThis.raceResultsMetricsStartID = 'zgyei2-'
globalThis.raceResultsMetricsMistakesCountID = 'fpcjhb-'
globalThis.raceResultsMetricsMistakesLossesID = 'biml4c-'


///////////////////////////// Event Pace /////////////////////////////


globalThis.containerEventsPaceID = 'g87o2w'
globalThis.chart2ID = 'r0vq5o'
globalThis.chart3ID = 'f3cyjf'
globalThis.chart4ID = 'ek7yjp'

globalThis.eventSummarySorted = null

globalThis.eventPaceDriverNamesList = []
globalThis.eventPaceDriverNumbersList = []

globalThis.eventPaceLaptimesLeft = null
globalThis.eventPaceLaptimesRight = null

globalThis.eventPaceSummaryLeft = null
globalThis.eventPaceSummaryRight = null

globalThis.eventPaceBestPaceMarker = 'Пелотон'
globalThis.eventPaceBestPaceMarkerColor = '#ACACAC'

globalThis.eventPaceBestPaceNumberLeft = null
globalThis.eventPaceBestPaceNumberRight = null
globalThis.eventPaceBestPaceNameLeft = null
globalThis.eventPaceBestPaceNameRight = null
globalThis.eventPaceBestPaceColorLeft = null
globalThis.eventPaceBestPaceColorRight = null

globalThis.eventPaceMetric1 = 'PaceDiffClearByWorst'
globalThis.eventPaceMetric2 = 'PaceDiffClear'

globalThis.eventPaceTable1ID = 'g5wmlg'
globalThis.eventPaceTable1ChartID = 'snzr98'

globalThis.eventPaceConditionsID = 'fp6szx'
globalThis.eventPaceAirTempID ='g43snu'

globalThis.eventPacePelotonePaceID = 'j612m6'

globalThis.eventPaceLeaderNameID = 'vr41ev'
globalThis.eventPaceLeaderPaceID = 'wfufvx'
globalThis.eventPaceLeaderPaceDiffID = 'jxwz4b'

globalThis.eventPaceWorstNameID = 'napj0h'
globalThis.eventPaceWorstPaceID = 'uk1pmg'
globalThis.eventPaceWorstPaceDiffID = 'p1wmb2'

globalThis.eventPaceDriversPaceBetterAverageID = 'kv14hd'
globalThis.eventPaceDriversPaceWorstAverageID = 'sbb5xb'
globalThis.eventPaceDriversPaceLeaderSecondDeltaID = 'hx3u61'

globalThis.eventPaceTooltip1ID = 'mmrkfu'
globalThis.eventPaceTooltip1ChartID = 'c1cr90'

// globalThis.eventPaceTooltip1Clicked = null
globalThis.eventPaceTooltip1LapsLocalClicked = null

globalThis.eventPaceTooltip1StintID = 'h7cis3'
globalThis.eventPaceTooltip1NameID = 'fqj7w7'
globalThis.eventPaceTooltip1CompareNameID = 'vy5xuj'

globalThis.eventPaceTooltip1TimeGainedID = 'ojexex'
globalThis.eventPaceTooltip1TimeGainedByLapID = 'ybwdug'

globalThis.eventPaceTooltip1TyresLeftID = 'f2n70h'
globalThis.eventPaceTooltip1TyresRightID = 'n87ug4'

globalThis.eventPaceTooltip1LapsBetterPaceID = 'd6oz9x'
globalThis.eventPaceTooltip1LapsWorsePaceID = 'zvck6s'

globalThis.eventPaceTooltip1BestTimeStintID = 'ntbukm'
globalThis.eventPaceTooltip1BestTimeStintLapID = 'vbs76i'
globalThis.eventPaceTooltip1BestTimeStintDeltaID = 'ljod12'

globalThis.eventPaceTooltip1WorstTimeStintID = 'sezwb6'
globalThis.eventPaceTooltip1WorstTimeStintLapID = 'lme6cd'
globalThis.eventPaceTooltip1WorstTimeStintDeltaID = 'pxl5cu'

globalThis.dropdown25ContainerID = 'dropdown-2-5-container'
globalThis.dropdown25ID = 'dropdown-2-5'
globalThis.dropdown25TitleID = 'dropdown-2-5-title'
globalThis.dropdown25MenuID = 'dropdown-2-5-menu'
globalThis.dropdown25MenuItemID = 'dropdown-2-5-menu-item-'
globalThis.dropdown25CaretID = 'dropdown-2-5-caret'
globalThis.dropdown25MarkerID ='dropdown-2-5-marker'

globalThis.dropdown26ContainerID = 'dropdown-2-6-container'
globalThis.dropdown26ID = 'dropdown-2-6'
globalThis.dropdown26TitleID = 'dropdown-2-6-title'
globalThis.dropdown26MenuID = 'dropdown-2-6-menu'
globalThis.dropdown26MenuItemID = 'dropdown-2-6-menu-item-'
globalThis.dropdown26CaretID = 'dropdown-2-6-caret'
globalThis.dropdown26MarkerID ='dropdown-2-6-marker'

globalThis.radio21ID = 'radio-2-1'

globalThis.refresh21ID = 'aifq8t'
globalThis.refresh21AciveFilter = 'brightness(0) saturate(100%) invert(73%) sepia(9%) saturate(196%) hue-rotate(173deg) brightness(86%) contrast(95%)'

///////////////////////////// DRIVERS /////////////////////////////


globalThis.glVDrivers = {
  'Page': null,
  'ComparisonRefresh': true,
  'FirstLoad': null
}

globalThis.driversMainContainerID = 'k3fh2p'

globalThis.driversContentContainerID = 'wjggb6'

globalThis.driversDriversNames = []
globalThis.driversDriversIDs = []

globalThis.driversDriversSelected = {
  'Primary': {DriverID: null, SeasonID: null, FullName: null, Label: null, Color: null, Team: null, Labels: []},
  'Secondary': {DriverID: null, SeasonID: null, FullName: null, Label: null, Color: null, Team: null, Labels: []}
}

globalThis.driversDefaultRadio31Condition = 'level'
globalThis.driversDefaultSeason = 'Все сезоны'
globalThis.driversDefaultSprintIndex = 2


///////////////////////////// DRIVERS Characteristics /////////////////////////////


globalThis.containerDriversCharacteristicsID = 'qa6ex8'

// globalThis.driversPrimaryBioContainerID = 'drivers-primary-bio-container'
globalThis.driversPrimaryInfoNameID = 'drivers-driver-information-name'
globalThis.driversPrimaryInfoFlagID = 'drivers-driver-information-flag'
globalThis.driversPrimaryInfoBirthdateID = 'drivers-driver-information-birthdate'
globalThis.driversPrimaryInfoBirthplaceID = 'drivers-driver-information-birthplace'

globalThis.driversDataPrimaryPath = null
globalThis.driversDataSecondaryPath = null

globalThis.dropdown31ContainerID = 'dropdown-3-1-container'
globalThis.dropdown31ID = 'dropdown-3-1'
globalThis.dropdown31MenuID = 'dropdown-3-1-menu'
globalThis.dropdown31MenuItemID = 'dropdown-3-1-menu-item-'
globalThis.dropdown31TitleID = 'dropdown-3-1-title'
globalThis.dropdown31CaretID = 'dropdown-3-1-caret'

globalThis.dropdown32ContainerID = 'dropdown-3-2-container'
globalThis.dropdown32ID = 'dropdown-3-2'
globalThis.dropdown32MenuID = 'dropdown-3-2-menu'
globalThis.dropdown32MenuItemID = 'dropdown-3-2-menu-item-'
globalThis.dropdown32TitleID = 'dropdown-3-2-title'
globalThis.dropdown32CaretID = 'dropdown-3-2-caret'
globalThis.iconBackward32ID = 'icon-backward-3-2'
globalThis.iconForward32ID = 'icon-forward-3-2'

globalThis.dropdown33ContainerID = 'dropdown-3-3-container'
globalThis.dropdown33ID = 'dropdown-3-3'
globalThis.dropdown33MenuID = 'dropdown-3-3-menu'
globalThis.dropdown33MenuItemID = 'dropdown-3-3-menu-item-'
globalThis.dropdown33TitleID = 'dropdown-3-3-title'
globalThis.dropdown33CaretID = 'dropdown-3-3-caret'
globalThis.iconForward33ID = 'icon-forward-3-3'
globalThis.iconBackward33ID = 'icon-backward-3-3'

globalThis.dropdown34ContainerID = 'dropdown-3-4-container'
globalThis.dropdown34ID = 'dropdown-3-4'
globalThis.dropdown34MenuID = 'dropdown-3-4-menu'
globalThis.dropdown34MenuItemID = 'dropdown-3-4-menu-item-'
globalThis.dropdown34TitleID = 'dropdown-3-4-title'
globalThis.dropdown34CaretID = 'dropdown-3-4-caret'
globalThis.iconForward34ID = 'icon-forward-3-4'
globalThis.iconBackward34ID = 'icon-backward-3-4'

globalThis.dropdown35ContainerID = 'dropdown-3-5-container'
globalThis.dropdown35ID = 'dropdown-3-5'
globalThis.dropdown35MenuID = 'dropdown-3-5-menu'
globalThis.dropdown35MenuItemID = 'dropdown-3-5-menu-item-'
globalThis.dropdown35TitleID = 'dropdown-3-5-title'
globalThis.dropdown35CaretID = 'dropdown-3-5-caret'

globalThis.dropdown36ContainerID = 'dropdown-3-6-container'
globalThis.dropdown36ID = 'dropdown-3-6'
globalThis.dropdown36MenuID = 'dropdown-3-6-menu'
globalThis.dropdown36MenuItemID = 'dropdown-3-6-menu-item-'
globalThis.dropdown36TitleID = 'dropdown-3-6-title'
globalThis.dropdown36CaretID = 'dropdown-3-6-caret'
globalThis.iconForward36ID = 'icon-forward-3-6'
globalThis.iconBackward36ID = 'icon-backward-3-6'

globalThis.dropdown37ID = 'dropdown-3-7'
globalThis.dropdown37MenuID = 'dropdown-3-7-menu'
globalThis.dropdown37MenuItemID = 'dropdown-3-7-menu-item-'
globalThis.dropdown37TitleID = 'dropdown-3-7-title'
globalThis.dropdown37CaretID = 'dropdown-3-7-caret'
globalThis.iconBackward37ID = 'icon-backward-3-7'
globalThis.iconForward37ID = 'icon-forward-3-7'

globalThis.dropdown38ID = 'dropdown-3-8'
globalThis.dropdown38MenuID = 'dropdown-3-8-menu'
globalThis.dropdown38MenuItemID = 'dropdown-3-8-menu-item-'
globalThis.dropdown38TitleID = 'dropdown-3-8-title'
globalThis.dropdown38CaretID = 'dropdown-3-8-caret'
globalThis.iconBackward38ID = 'icon-backward-3-8'
globalThis.iconForward38ID = 'icon-forward-3-8'

globalThis.driversChartPentagon1Linestyles = ['0', '0']

globalThis.driversLevelTitleID = 'drivers-level-title'

globalThis.driversMetricRatingID = 'drivers-metric-rating'
globalThis.driversMetricConsistencyID = 'drivers-metric-consistency'
globalThis.driversMetricOvertakesID = 'drivers-metric-overtakes'
globalThis.driversMetricQTeammateID = 'drivers-metric-qteammate'
globalThis.driversMetricConsistencyTeammateID = 'drivers-metric-consistency-teammate'
globalThis.driversMetricPaceTeammateID = 'drivers-metric-pace-teammate'
globalThis.driversMetricMistakesTeammateID = 'drivers-metric-mistakes-teammate'
globalThis.driversMetricPaceID = 'drivers-metric-pace'
globalThis.driversMetricStartID = 'drivers-metric-start'

globalThis.driversCharacteristicsMetrics = [
  'LevelNormalizedAvg',
  'ConsistencyNormalizedAvg', 'StartNormalizedAvg', 'OvertakesNormalizedAvg', 'PaceNormalizedAvg',
  'ConsistencyTeammateDiscreteAvg', 'QualiTeammateDiscreteAvg', 'PaceTeammateDiscreteAvg',
  'MistakesTeammateDiscreteAvg'
]

globalThis.driversDriverImageID = 'image-drivers-current-driver'


///////////////////////////// Drivers Comparison /////////////////////////////

globalThis.containerDriversComparisonID = 'ue6w1e'

globalThis.driversCompareDriverPrimaryTitleID = 'drivers-compare-primary-driver-title'
globalThis.imageDrivers1PrimaryDriverID = 'image-drivers-1-primary-driver'
globalThis.driversCompareDriverSecondaryTitleID = 'drivers-compare-secondary-driver-title'
globalThis.imageDrivers1SecondaryDriverID = 'image-drivers-1-secondary-driver'

globalThis.driversComparisonTeamLeftID = 'cuke5j'
globalThis.driversComparisonTeamRightID = 'qerggs'

// for linecharts
globalThis.driversComparisonMetrics = [
  'LevelNormalizedAvg', 
  'ConsistencyNormalizedAvg', 'PaceNormalizedAvg',
  'OvertakesNormalizedAvg', 'StartNormalizedAvg',
  'ConsistencyTeammateDiscreteAvg', 'PaceTeammateDiscreteAvg',
  'QualiTeammateDiscreteAvg', 'MistakesTeammateDiscreteAvg'
]


///////////////////////////// Drivers Tables /////////////////////////////


globalThis.glVTables = {
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

globalThis.containerDriversTablesID = 'qtqki3'

globalThis.driversTablesMainTableID = 'drivers-tables-main-table'
globalThis.driversTablesMainTableCellID = 'drivers-tables-table-3-1'

globalThis.driversTablesDataPath = null

globalThis.driversTablesSeasonIDdefault = 'Все сезоны'
globalThis.driversTablesSprintIndexDefault = 2

globalThis.driversTable1SeasonIDs = []
globalThis.driversTable1Columns = []
globalThis.driversTable1MetricCategories = []

globalThis.driversTablesMetricsNameTitleID = 'drivers-tables-metrics-name-title'
globalThis.driversTablesMetricsDescriptionsID = 'drivers-tables-metrics-descriptions'

globalThis.dropdown36ContainerID = 'dropdown-3-6-container'
globalThis.dropdown36ID = 'dropdown-3-6'
globalThis.dropdown36MenuID = 'dropdown-3-6-menu'
globalThis.dropdown36TitleID = 'dropdown-3-6-title'

globalThis.dropdown37ID = 'dropdown-3-7'
globalThis.dropdown37MenuID = 'dropdown-3-7-menu'
globalThis.dropdown37TitleID = 'dropdown-3-7-title'
globalThis.iconBackward37ID = 'icon-backward-3-7'
globalThis.iconForward37ID = 'icon-forward-3-7'

globalThis.driversTablesTable1Data = {
  
  'Относительные показатели': {
    
    'Columns': [
      'FullName', 'ConsistencyNormalizedAvg', 'OvertakesNormalizedAvg',
      'QualiTeammateDiscreteAvg', 'PaceNormalizedAvg', 'StartNormalizedAvg', 'LevelNormalizedAvg'
    ],
    'Captions': [
      'Имя', 'Плотность', 'Обгоны',
      'Квалификация', 'Темп', 'Старт', 'Уровень'
    ],
    'SortColumns': [
      '', 'ConsistencyNormalizedAvg', 'OvertakesNormalizedAvg',
      'QualiTeammateDiscreteAvg', 'PaceNormalizedAvg', 'StartNormalizedAvg', 'LevelNormalizedAvg'
    ],
    'Colors': [
      '#FFFFFF', '#D8332C', '#47AC64',
      '#316EAF', '#7851A9', '#BD6C35', '#464D55'
    ],
    'Ascending': [
      '', false, false, false,
      false, false, false
    ],
    'Description': 'Средние характеристики, преобразованные в формат от 1 до 10',
    'CellWidths': ['3.6rem', '12.5rem', '8rem', '8rem', '9rem', '8rem', '8rem', '8rem']
    
  },
  
  'Абсолютные показатели': {
    
    'Columns': [
      'FullName', 'ConsistencyAvg', 'OvertakesGainAvg',
      'OvertakesLostAvg', 'StartGainAvg', 'StartLostAvg'
    ],
    'Captions': [
      'Имя', 'Плотность', 'Отбор позиции',
      'Потеря позиции', 'Обгоны на старте', 'Потери на старте'
    ],
    'SortColumns': [
      '', 'ConsistencyAvg', 'OvertakesGainAvg',
      'OvertakesLostAvg', 'StartGainAvg', 'StartLostAvg',
    ],
    'Colors': [
      '#FFFFFF', '#D8332C', '#47AC64',
      '#578664', '#BD6C35', '#A87451', 
    ],
    'Ascending': [
      '', true, false, true,
      false, true
    ],
    'Description': 'Реальные показатели в соответствующей категории',
    'CellWidths': ['3.6rem', '12.5rem', '8rem', '9rem', '9rem', '10rem', '10rem']
    
  }
  
}


//////////////////////////////////////// GLOBAL ////////////////////////////////////////


globalThis.clickaAreaHorizontalMenuID = 'j7kkjj'
globalThis.clickaAreaVerticalMenuID = 'w2v4ph'
globalThis.clickaAreaContentID = 'nopk49'

globalThis.globalHeaderMenuButtonID = 'meqwa9'
globalThis.globalHeaderMenuContainerID = 'cxx5e9'
globalThis.globalHeaderMenuID = 'kw8jyn'

globalThis.globalHeaderMenuCaretID = 'tvscfo'
globalThis.globalMenuHeaderShowClass = 'a55sgp'

// if 'MainMenuFill'==true --> in menu-main of index.html remove invisible fron menu carets
globalThis.glVGlobal = {
  'SeasonIDs': null,
  'MainMenuFill': false,
  'Segment': false,
  'Page': false,
  'FirstLoad': true
}

globalThis.seasonIDs = []

// keys : segment - page
// globalThis.pagesData = {
//   'season-segment-id': {
//     'season-page-statistics-id': {
      
//     },
//     'season-page-ratings-id': {
      
//     }
//   }
// }

globalThis.pagesMenusIDs = [
  'qetyni-1', 'qetyni-2', 'qetyni-3'
]

globalThis.pageMainContainerID = 'kckynh'
globalThis.pageContainerID = 'pgc0b5'

globalThis.globalScrollContainerID = 'kckynh'

globalThis.mainMenuSelectLanguageID = 'yldjiztxbx'
globalThis.mainMenuSelectLanguageCaretID = 'yldjiztxbx-caret'
globalThis.mainMenuSelectLanguageMenuID ='obokoa'

globalThis.mainSegmentID = 'main-segment-id'
globalThis.seasonSegmentID = 'season-segment-id'
globalThis.eventSegmentID = 'event-segment-id'
globalThis.driversSegmentID = 'drivers-segment-id'

globalThis.mainTitlePageID = 'main-page-title-id'

globalThis.seasonStatistcsPageID = 'season-page-statistics-id'
globalThis.seasonRatingsPageID = 'season-page-ratings-id'
globalThis.seasonComparisonPageID = 'season-page-comparison-id'

globalThis.eventRatingPageID = 'event-page-rating-id'
globalThis.eventCategoriesPageID = 'event-page-categories-id'
globalThis.eventComparisonPageID = 'event-page-comparison-id'
globalThis.eventPacePageID = 'event-page-pace-id'

globalThis.driversCharcterisiticsPageID = 'drivers-page-charcterisitics-id'
globalThis.driversComparisonPageID = 'drivers-page-comparison-id'
globalThis.driversTablesPageID = 'drivers-page-tables-id'

// globalThis.menuPagesDict = {
//   [seasonSegmentID]: 'qetyni-1',
//   [eventSegmentID]: 'qetyni-2',
//   [driversSegmentID]: 'qetyni-3',
// }

globalThis.globalScrollTopButtonID = 'hh6m79'

globalThis.globalScrollTopButtonAppearsOnPagesList = [
  mainTitlePageID,
  seasonStatistcsPageID, seasonComparisonPageID,
  driversComparisonPageID,
]

// routes
globalThis.routeMain = '/'
globalThis.routeSeason = '/season'
globalThis.routeEvent = '/gp'
globalThis.routeDrivers =  '/drivers'
globalThis.routeTables =  '/tables'

// to change primary page:
// 1. in routesDict -> routePage change 'component' and 'ButtonID'
// 2. in scripts.js move '(currentLocation == routePage)' to prefer page
const routesDict = [
  {
    path: routeMain,
    component: routePageEvent,
    segment: 'event-segment-id',
    // buttonIDforCheck: '-', 
    // gliderPosition: -10.0625,
    // gliderPosition: 0,
  },
  {
    path: routeSeason,
    component: routePageSeason,
    segment: 'season-segment-id'
    // ButtonID: mainMenuElement1ID,
    // buttonIDforGlider: buttonMainMenuMainID,
    // gliderPosition: -10.0625,
    // gliderPosition: 0,
  },
  {
    path: routeEvent,
    component: routePageEvent,
    segment: 'event-segment-id'
    // ButtonID: mainMenuElement2ID,
    // buttonIDforGlider: buttonMainMenuEventID,
    // gliderPosition: 100,
    // gliderPosition: -11.5,
    // gliderPosition: -12,
    // gliderPosition: -9,
  },
  {
    path: routeDrivers,
    component: routePageDrivers,
    segment: 'drivers-segment-id'
    // ButtonID: mainMenuElement3ID,
    // buttonIDforGlider: buttonMainMenuDriversID,
    // gliderPosition: 200,
    // gliderPosition: 11.5,
    // gliderPosition: 12,
    // gliderPosition: 9,
  },
  // {
  //   path: routeTables,
  //   component: routePageTables,
  //   ButtonID: buttonMainMenuTablesID,
  //   // buttonIDforGlider: buttonMainMenuDriversID,
  //   gliderPosition: 300
  // },
]

globalThis.complimentaryColorsList = [
  // light blue - williams
  ['#37BEDD', '#64C4FF',],
  // dark red - alfa romeo
  ['#900000', '#B12039', '#C92D4B',],
  // light red - ferrari
  ['#DC0004', '#ED1C24', '#F91536', '#E80020',],
  // orange - mclaren
  ['#FF9800', '#F58020', '#FF8000',],
  // pale blue - alpha tauri 2023, 
  ['#5E8FAA',],
  // light blue - RB 2024
  ['#6692FF'],
  // blue - alpine
  ['#0090FF',  '#2293D1', '#0093CC',],
  // dark green - aston martin
  ['#358C75', '#229971', '#006F62', '#2D826D',],
  // teal - mercedes
  ['#00D2BE', '#6CD3BF', '#27F4D2',],
  // blue 005AFF - williams 2021 russel
  ['#005AFF',],
  // salat - kick sauber
  ['#52e252',],
  // grey - haas
  ['#505050'],
  // blue - Red Bull 2021
  ['#0600EF'],
  // blue - Red Bull
  ['#1E5BC6', '#3671C6',]
]




function updateThemeColors() {

  // Light
  if (themeCurrent == 'light') {
  
    globalThis.seasonRatingsTitlesHeight = 2.5
  
    globalThis.colorThemesTextOpacity = 1
    globalThis.colorThemesImgSaturation = 1
    globalThis.colorThemesChartSaturation = 1
  
    globalThis.colorThemesChartOpacity = 1
    globalThis.colorThemesChartOpacity_1 = 0.8

    globalThis.plotComparisonWidth = 28
  
    globalThis.colorThemesChartBackground = '#FFFFFF'
    globalThis.colorThemesChartBorder = '#D2D7DC'
  
    globalThis.colorThemesChartFont1 = '#1D1F21'
    globalThis.colorThemesChartFont2 = '#313335'
    globalThis.colorThemesChartFont3 = '#444749'
    globalThis.colorThemesChartFont4 = '#585B5E'
    globalThis.colorThemesChartFont8 = '#A6AAAF'
  
    globalThis.colorThemesChartGray7 = '#AAAFB4'
    
    globalThis.colorThemesChartGrid = '#F5F5F5'
    globalThis.colorThemesChartStintLines = '#D2D7DC'
    globalThis.colorThemesChartSCStart = '#F9F8BE'
    globalThis.colorThemesChartSCEnd = '#B3DFC7'
    globalThis.colorThemesChartMovingAverage = '#A0A6AC'
    globalThis.colorThemesChartMovingAverageFill = '#E8EAEE'
    globalThis.colorThemesChartMovingAverageStroke = '#C0C5C9'
  
    globalThis.colorThemesChartChartLine1Lines = '#F4F4F5'
    globalThis.colorThemesChartChart1Line = '#D2D7DC'
  
    globalThis.colorThemesChartChartMeanComparison = '#6E7378'
    globalThis.colorThemesChartChartMeanPoly = '#6E7378'
    
    globalThis.colorThemesChartChartLineLegendNames = '#494B4D'
    globalThis.colorThemesChartChartLineLegendInfo = '#555765'
    globalThis.colorThemesChartChartLineLegendNamesWeight = 600
    globalThis.colorThemesChartChartLineLegendMarkersWeight = "'wght' 750"
    globalThis.colorThemesChartChartLineLegendMarkersColor = '#555765'

    globalThis.colorThemesChartPlotMetricsBarGrey = '#FAFAFA'
    globalThis.colorThemesChartTablesRowFrameSelect = '#D8DEE3CC'
    globalThis.colorThemesChartAxis = '#D6DBE0'
    globalThis.colorThemesChartAxisDark = '#D2D7DC'
    globalThis.colorThemesChartAxisPoly = '#E4E8ED'
    globalThis.colorThemesChartAxisPolyDark = '#D2D7DC'
    globalThis.colorThemesChartAxisLabels = '#495057'
    globalThis.colorThemesChartAxisSubLabels = '#92969A'
    globalThis.colorThemesChartAxisRectangle = '#D6DBE0'
    globalThis.colorThemesChartAxisTickLabels = '#5A616A'
    globalThis.colorThemesChartGroupsDevider = '#A6AAAF'
    globalThis.colorThemesChartGridTimingActions = '#CDD2D7'
    globalThis.colorThemesChartDriverAbbsTimingActions = '#585B5E'
  
    globalThis.plotMetricsAbbs = '#FFFFFF'
    globalThis.fikip5 = '#969BA0'
  
    globalThis.colorThemesChartTimingActionsLabelsWeight = "'wght' 750"
    globalThis.colorThemesChartTimingActionsDriverAbbsWeight = "'wght' 575"
    globalThis.colorThemesChartTimingActionsShadow = 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.1))'

    globalThis.colorThemesChartHBarsTitle = '#585B5E'
    globalThis.colorThemesChartTimingActionsDriverAbbsWeightHbars = "'wght' 575"
    globalThis.colorThemesChartTimingActionsTitleWeightHbars = "'wght' 700"
    globalThis.colorThemesChartTimingActionsMetricWeightHbars = "'wght' 650"
  
    globalThis.colorThemesChartPolyLabelWeight = "'wght' 700"
    globalThis.colorThemesChartPolySubLabelWeight = "'wght' 625"
  
    globalThis.colorThemesChart123TeammateWeight = "'wght' 725"

    globalThis.colorThemesChartAbbsLolColor = '#A6AAAF'
    globalThis.colorThemesChartStdLinesLolColor = '#E1E6EB'
    globalThis.colorThemesChartDecorLinesLolColor = '#E9EDF2'
  
    globalThis.colorThemesChartCirclesLolOpacity = 0.6
    globalThis.colorThemesChartCirclesLolStdOpacity = 0.35
  
    // globalThis.colorThemesChartChartLineLineShadow = 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.1))'
    globalThis.colorThemesChartChartLineLineShadow = 'none'
  
    globalThis.colorThemesChartRatingsBarsLabelsWeight = "'wght' 650"
    globalThis.colorThemesChartRatingsBarsLabelsColor = '#555759'
    globalThis.colorThemesChartRatingsBarsLabelsSpacing = '0.015625rem'
  
    globalThis.colorThemesChartStatisticsValuesFontColor = colorThemesChartFont3
    globalThis.colorThemesChartStatisticsValuesWeight = "'wght' 750"
    globalThis.colorThemesChartStatisticsLabelsWeight = "'wght' 650"
    globalThis.colorThemesChartStatisticsLabelsColor = '#313335'
  
    globalThis.guideCotainerBorder = '#'
  
    globalThis.colorPlotLaptimesDriverNamesFontSize = px14
    globalThis.colorPlotLaptimesDriverNamesWeight = 700
    globalThis.colorPlotLaptimesStintSepLabelsWeight = 700
    globalThis.colorPlotLaptimesStintConLabelsWeight = 750
    globalThis.colorPlotLaptimesStintCompoundLabelsWeight = 850
  
    globalThis.colorPlotComparisonLegendWeight1 = 550
    globalThis.colorPlotComparisonLegendWeight2 = 750

    globalThis.eventPaceGoodPaceColor = '#47AC64'
    globalThis.eventPaceBadPaceColor = '#DDB93D'

    globalThis.eventPaceChart9BarsColor = '#909090'
    globalThis.eventPaceChart9AverageColor = '#DADADA'
    
  } else if (themeCurrent == 'dark') {
  
    globalThis.seasonRatingsTitlesHeight = 2.5
  
    globalThis.colorThemesTextOpacity = 1
    globalThis.colorThemesImgSaturation = 1
    globalThis.colorThemesChartSaturation = 0.7
  
    globalThis.colorThemesChartOpacity = 0.65
    globalThis.colorThemesChartOpacity_1 = 0.8

    globalThis.plotComparisonWidth = 28
  
    globalThis.colorThemesChartBackground = '#272727'
    globalThis.colorThemesChartBorder = '#353535'
  
    globalThis.colorThemesChartFont1 = '#C9CCCF'
    globalThis.colorThemesChartFont2 = '#BFC2C5'
    globalThis.colorThemesChartFont3 = '#B4B8BB'
    globalThis.colorThemesChartFont4 = '#A7ABAF'
    globalThis.colorThemesChartFont8 = '#7C8288'
  
    globalThis.colorThemesChartGray7 = '#66696C'
    
    globalThis.colorThemesChartGrid = '#303030'
    globalThis.colorThemesChartStintLines = '#585A5C'
    globalThis.colorThemesChartSCStart = '#817F65'
    globalThis.colorThemesChartSCEnd = '#435D52'
    globalThis.colorThemesChartMovingAverage = '#787B7D'
    globalThis.colorThemesChartMovingAverageFill = '#474A4C'
    globalThis.colorThemesChartMovingAverageStroke = '#585A5C'
  
    globalThis.colorThemesChartChartLine1Lines = '#30303080'
    globalThis.colorThemesChartChart1Line = '#474A4C'
  
    globalThis.colorThemesChartChartMeanComparison = '#BFC2C5'
    globalThis.colorThemesChartChartMeanPoly = '#787B7D'
    
    globalThis.colorThemesChartChartLineLegendNames = '#B4B8BB'
    globalThis.colorThemesChartChartLineLegendInfo = '#72787E'
    globalThis.colorThemesChartChartLineLegendNamesWeight = "'wght' 600"
    globalThis.colorThemesChartChartLineLegendMarkersWeight = "'wght' 750"
    globalThis.colorThemesChartChartLineLegendMarkersColor = '#919799'

    globalThis.colorThemesChartPlotMetricsBarGrey = '#303030'
    globalThis.colorThemesChartTablesRowFrameSelect = '#323334'
    globalThis.colorThemesChartAxis = '#505050'
    globalThis.colorThemesChartAxisDark = '#606060'
    globalThis.colorThemesChartAxisPoly = '#323232'
    globalThis.colorThemesChartAxisPolyDark = '#404040'
    globalThis.colorThemesChartAxisLabels = '#91969C'
    globalThis.colorThemesChartAxisSubLabels = '#585A5C'
    globalThis.colorThemesChartAxisRectangle = '#404040'
    globalThis.colorThemesChartAxisTickLabels = '#686E73'
    globalThis.colorThemesChartGroupsDevider = '#686E73'
    globalThis.colorThemesChartGridTimingActions = '#707070'
    globalThis.colorThemesChartDriverAbbsTimingActions = '#878C92'
  
    globalThis.plotMetricsAbbs = '#272727'
    globalThis.fikip5 = '#474A4C'
  
    globalThis.colorThemesChartTimingActionsLabelsWeight = "'wght' 750"
    globalThis.colorThemesChartTimingActionsDriverAbbsWeight = "'wght' 700"
    globalThis.colorThemesChartTimingActionsShadow = 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.25))'

    globalThis.colorThemesChartHBarsTitle = '#BFC2C5'
    globalThis.colorThemesChartTimingActionsDriverAbbsWeightHbars = "'wght' 575"
    globalThis.colorThemesChartTimingActionsTitleWeightHbars = "'wght' 700"
    globalThis.colorThemesChartTimingActionsMetricWeightHbars = "'wght' 650"
  
    globalThis.colorThemesChartPolyLabelWeight = "'wght' 700"
    globalThis.colorThemesChartPolySubLabelWeight = "'wght' 625"
  
    globalThis.colorThemesChart123TeammateWeight = "'wght' 725"

    globalThis.colorThemesChartAbbsLolColor = '#686E73'
    globalThis.colorThemesChartStdLinesLolColor = '#323232'
    globalThis.colorThemesChartDecorLinesLolColor = '#323232'
  
    globalThis.colorThemesChartCirclesLolOpacity = 0.4
    globalThis.colorThemesChartCirclesLolStdOpacity = 0.25
  
    // globalThis.colorThemesChartChartLineLineShadow = 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.1))'
    globalThis.colorThemesChartChartLineLineShadow = 'none'
  
    globalThis.colorThemesChartRatingsBarsLabelsWeight = "'wght' 650"
    globalThis.colorThemesChartRatingsBarsLabelsColor = '#BFC2C5'
    globalThis.colorThemesChartRatingsBarsLabelsSpacing = '0.015625rem'
  
    globalThis.colorThemesChartStatisticsValuesFontColor = colorThemesChartFont3
    globalThis.colorThemesChartStatisticsValuesWeight = "'wght' 750"
    globalThis.colorThemesChartStatisticsLabelsWeight = "'wght' 625"
    globalThis.colorThemesChartStatisticsLabelsColor = '#BFC2C5'
  
    globalThis.guideCotainerBorder = '#'
  
    globalThis.colorPlotLaptimesDriverNamesFontSize = px14
    globalThis.colorPlotLaptimesDriverNamesWeight = 700
    globalThis.colorPlotLaptimesStintSepLabelsWeight = 700
    globalThis.colorPlotLaptimesStintConLabelsWeight = 750
    globalThis.colorPlotLaptimesStintCompoundLabelsWeight = 850
  
    globalThis.colorPlotComparisonLegendWeight1 = 550
    globalThis.colorPlotComparisonLegendWeight2 = 750

    globalThis.eventPaceGoodPaceColor = '#64A476'
    globalThis.eventPaceBadPaceColor = '#BDB671'

    globalThis.eventPaceChart9BarsColor = '#606060'
    globalThis.eventPaceChart9AverageColor = '#505050'
  
  }
    
}


function updateUnits() {

  globalThis.px0 = 0
  globalThis.px0_5 = convertRemToPixels(0.03125, 1)
  globalThis.px0_75 = convertRemToPixels(0.046875, 2)
  globalThis.px1 = convertRemToPixels(0.0625)
  globalThis.px1_5 = convertRemToPixels(0.09375)
  globalThis.px2 = convertRemToPixels(0.125)
  globalThis.px2_5 = convertRemToPixels(0.15, 1)
  globalThis.px3 = convertRemToPixels(0.1875)
  globalThis.px3_5 = convertRemToPixels(0.21875, 1)
  globalThis.px4 = convertRemToPixels(0.25)
  globalThis.px3_5 = convertRemToPixels(0.21875, 1)
  globalThis.px4 = convertRemToPixels(0.25)
  globalThis.px4_5 = convertRemToPixels(0.28125)
  globalThis.px5 = convertRemToPixels(0.3125)
  globalThis.px5_5 = convertRemToPixels(0.34375)
  globalThis.px6 = convertRemToPixels(0.375)
  globalThis.px7 = convertRemToPixels(0.4375)
  globalThis.px8 = convertRemToPixels(0.5)
  globalThis.px9 = convertRemToPixels(0.5625)
  globalThis.px10 = convertRemToPixels(0.625)
  globalThis.px11 = convertRemToPixels(0.6875)
  globalThis.px11_5 = convertRemToPixels(0.71875, 1)
  globalThis.px12 = convertRemToPixels(0.75)
  globalThis.px12_25 = convertRemToPixels(0.765625, 2)
  globalThis.px12_5 = convertRemToPixels(0.78125, 1)
  globalThis.px12_75 = convertRemToPixels(0.796875, 2)
  globalThis.px13 = convertRemToPixels(0.8125)
  globalThis.px14 = convertRemToPixels(0.875)
  globalThis.px15 = convertRemToPixels(0.9375)
  globalThis.px15_5 = convertRemToPixels(0.96875)
  globalThis.px16 = convertRemToPixels(1)
  globalThis.px17 = convertRemToPixels(1.0625)
  globalThis.px18 = convertRemToPixels(1.125)
  globalThis.px19 = convertRemToPixels(1.1875)
  globalThis.px20 = convertRemToPixels(1.25)
  globalThis.px21 = convertRemToPixels(1.3125)
  globalThis.px22 = convertRemToPixels(1.375)
  globalThis.px23 = convertRemToPixels(1.4375)
  globalThis.px24 = convertRemToPixels(1.5)
  globalThis.px24_5 = convertRemToPixels(1.53125)
  globalThis.px25 = convertRemToPixels(1.5625)
  globalThis.px26 = convertRemToPixels(1.625)
  globalThis.px27 = convertRemToPixels(1.6875)
  globalThis.px28 = convertRemToPixels(1.75)
  globalThis.px30 = convertRemToPixels(1.875)
  globalThis.px32 = convertRemToPixels(2)
  globalThis.px33 = convertRemToPixels(2.0625)
  globalThis.px34 = convertRemToPixels(2.125)
  globalThis.px35 = convertRemToPixels(2.1875)
  globalThis.px37 = convertRemToPixels(2.3125)
  globalThis.px40 = convertRemToPixels(2.5)
  globalThis.px42 = convertRemToPixels(2.625)
  globalThis.px44 = convertRemToPixels(2.75)
  globalThis.px45 = convertRemToPixels(2.8125)
  globalThis.px47 = convertRemToPixels(2.9375)
  globalThis.px48 = convertRemToPixels(3)
  globalThis.px49 = convertRemToPixels(3.0625)
  globalThis.px50 = convertRemToPixels(3.4375)
  globalThis.px52 = convertRemToPixels(3.25)
  globalThis.px55 = convertRemToPixels(3.4375)
  globalThis.px57 = convertRemToPixels(3.5625)
  globalThis.px58 = convertRemToPixels(3.625)
  globalThis.px60 = convertRemToPixels(3.75)
  globalThis.px65 = convertRemToPixels(4.0625)
  globalThis.px70 = convertRemToPixels(4.375)
  globalThis.px75 = convertRemToPixels(4.6875)
  globalThis.px80 = convertRemToPixels(5)
  globalThis.px90 = convertRemToPixels(5.625)
  globalThis.px100 = convertRemToPixels(6.25)
  globalThis.px105 = convertRemToPixels(6.5625)
  globalThis.px110 = convertRemToPixels(6.875)
  globalThis.px200 = convertRemToPixels(12.5)
  
}















