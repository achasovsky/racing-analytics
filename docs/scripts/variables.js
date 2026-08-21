const notMobileDevice = isHoverable()
const mobileDevice = !isHoverable()

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
globalThis.seasonNextEventConditions = 'Light-rain'
globalThis.seasonNextEventTemperature = '27'
globalThis.seasonNextEventWind = '4.2'
globalThis.seasonNextEventRainProbability = '0'

globalThis.seasonNextEventConditionsIcon = iconsConditions[seasonNextEventConditions]['Filename']
globalThis.seasonNextEventConditionsIconMarginTop = iconsConditions[seasonNextEventConditions]['MarginTopIcon']
globalThis.seasonNextEventConditionsTextMarginLeft = iconsConditions[seasonNextEventConditions]['MarginLeftText']
globalThis.seasonNextEventConditionsWidth = iconsConditions[seasonNextEventConditions]['Width']

// paths
globalThis.pathCalendar = 'data/calendar/'
globalThis.pathDrivers = 'data/tables/'
globalThis.pathSeasonData = 'data/season/'
globalThis.pathImg = 'img/'
globalThis.pathImgDrivers = 'img/drivers/'
globalThis.pathImgEngines = 'img/engines/'
globalThis.pathImgConstructors = 'img/constructors/'
globalThis.pathImgNationsRound = 'img/nations/round/'
globalThis.pathImgNationsRect = 'img/nations/rect/'
globalThis.pathSummary = 'data/summary/'
// globalThis.pathProtocols = 'data/protocols/'
globalThis.pathLaptimes = 'data/laptimes/'
globalThis.pathDriversData = 'data/drivers/'
globalThis.pathLaptimesDrivers = 'data/laptimes-drivers/'
globalThis.pathTables = 'data/tables/'

// formats
globalThis.imagesFormat = '.avif'

globalThis.currentLocation = null
globalThis.noDefinedMetrics = ['DNF', 'DNC', 'DSQ', 'DNS']
globalThis.noDefinedMetrics1 = ['DNS', 'DNF', 'DSQ']

globalThis.scrollPosition = 0

globalThis.guide1OpenCloseButtonID = 'bq6rnjmy'
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

// globalThis.menuHeaderLogoID = 'mnqdef14'
globalThis.mainMainLogoID = 'rr6q9cf4'

globalThis.mainChangeThemeButtonID ='emwdmull'

globalThis.eventAbbreviationSprintMarker = '*'

globalThis.blurScreenID = 'gy7tpn30'
globalThis.loaderID = 'loader'

globalThis.seasonIDs = null

globalThis.calendar = null
globalThis.teams = null
globalThis.drivers = null
globalThis.colors = null
globalThis.drivers_part = null
globalThis.drivers_part_this_season = null



//////////////////////////////////////////// MAIN ////////////////////////////////////////////

globalThis.mainMainContainerID = 'h7sg69'
globalThis.mainContentContainerID = 'z7a8xk'

globalThis.mainMainPageButtonID = 'aszkkguv'


//////////////////////////////////////////// MAIN Title ////////////////////////////////////////////


globalThis.containerMainTitleID = 'z0wrmh'

globalThis.mainTitleScrollelementID = 'lehi0c-'

globalThis.mainTitleChart1ID = 'l8ltituz-1'
globalThis.mainTitleChart2ID = 'l8ltituz-2'
globalThis.mainTitleChart3ID = 'l8ltituz-3'
globalThis.mainTitleChart4ID = 'l8ltituz-4'
globalThis.mainTitleChart5ID = 'l8ltituz-5'
globalThis.mainTitleChart6ID = 'l8ltituz-6'
globalThis.mainTitleChart7ID = 'l8ltituz-7'
globalThis.mainTitleChart8ID = 'l8ltituz-8'
globalThis.mainTitleChart9ID = 'l8ltituz-9'
globalThis.mainTitleChart10ID = 'l8ltituz-10'
globalThis.mainTitleChart11ID = 'l8ltituz-11'
globalThis.mainTitleChart12ID = 'l8ltituz-12'
globalThis.mainTitleChart13ID = 'l8ltituz-13'
globalThis.mainTitleChart14ID = 'l8ltituz-14'
globalThis.mainTitleChart15ID = 'l8ltituz-15'
globalThis.mainTitleChart16ID = 'l8ltituz-16'
globalThis.mainTitleChart17ID = 'l8ltituz-17'
globalThis.mainTitleChart18ID = 'l8ltituz-18'
globalThis.mainTitleChart19ID = 'l8ltituz-19'
globalThis.mainTitleChart20ID = 'l8ltituz-20'
globalThis.mainTitleChart21ID = 'l8ltituz-21'
globalThis.mainTitleChart22ID = 'l8ltituz-22'
globalThis.mainTitleChart23ID = 'l8ltituz-23'
globalThis.mainTitleChart24ID = 'l8ltituz-24'
globalThis.mainTitleChart25ID = 'l8ltituz-25'
globalThis.mainTitleChart26ID = 'l8ltituz-26'
globalThis.mainTitleChart27ID = 'l8ltituz-27'
globalThis.mainTitleChart28ID = 'l8ltituz-28'
globalThis.mainTitleChart29ID = 'l8ltituz-29'
globalThis.mainTitleChart30ID = 'l8ltituz-30'
globalThis.mainTitleChart31ID = 'l8ltituz-31'
globalThis.mainTitleChart32ID = 'l8ltituz-32'
globalThis.mainTitleChart33ID = 'l8ltituz-33'
globalThis.mainTitleChart34ID = 'l8ltituz-34'
globalThis.mainTitleChart35ID = 'l8ltituz-35'
globalThis.mainTitleChart36ID = 'l8ltituz-36'
globalThis.mainTitleChart37ID = 'l8ltituz-37'



//////////////////////////////////////// CHAMPIOSHIP ////////////////////////////////////////


globalThis.glVSeason = {
  'SeasonIDs': [],
  'SeasonID' : null,
  'SeasonOver': null,
  'CategoriesClickedTableID': null,
  'CategoriesClickedDrivers': [],
  // 'ComparisonRefresh': true,
  'radioCondition': null,
  'SprintIndex': null
}

globalThis.seasonCalendar = []

globalThis.season_data_1 = []
globalThis.season_data_2 = []
globalThis.season_stat_data_6 = []

globalThis.drivers_part_this_season = []

globalThis.seasonCalendar = []

globalThis.seasonTeams = []
globalThis.seasonTeamIDs = []

globalThis.seasonMainContainerID = 'onxl20'
globalThis.seasonContentContainerID = 'djpies'

globalThis.menuYears11ID = 'v108gjrokk'
globalThis.menuYears11TitleID = 'v108gjrokk-title'
globalThis.menuYears11ItemID = 'v108gjrokk-item'

globalThis.globalDropdownsSeason = [
  menuYears11ID
]

globalThis.menuRacesprintID = 'ios2a73y'

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
    sort: {'ChampionshipClassification': true, 'PointsOfficialSumAllTeams': false},
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
    metric: 'WinSumAllTeams',
    sort: {'ChampionshipClassification': true, 'WinSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 24,
    metric: 'PodiumSumAllTeams',
    sort: {'ChampionshipClassification': true, 'PodiumSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 25,
    metric: 'SecondSumAllTeams',
    sort: {'ChampionshipClassification': true, 'SecondSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 26,
    metric: 'ThirdSumAllTeams',
    sort: {'ChampionshipClassification': true, 'ThirdSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 27,
    metric: 'QWinSumAllTeams',
    sort: {'ChampionshipClassification': true, 'QWinSumAllTeams': false},
    lessThanFive: false
  },
  {
    id: 28,
    metric: 'QTDiscrClearSumAllTeams',
    sort: {'ChampionshipClassification': true, 'QTDiscrClearSumAllTeams': false},
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
  {
    id: 31,
    metric: 'PTeammateClearSumAllTeams',
    sort: {'ChampionshipClassification': true, 'PTeammateClearSumAllTeams': false},
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


globalThis.glVSeasonRatings = {
  'clickedTableID': null,
  'activeElID': null,
  'activeIDT': null,
  'activeColor': null,
  'activeColorDefault': null,
  'activeDash': null,
  'metric': null,
  'ascending': null,
  'leaderIDT': null,
}

globalThis.seasonCategoriesClickedData = []

globalThis.containerSeasonRatingsID = 'bkyv96'

globalThis.seasonCategoriesRanksTableContainerID = 'txmcmw286p'
globalThis.seasonCategoriesRanksTableItemID = 'u656inzhjs-'
globalThis.seasonCategoriesRanksTableNameID = 'z375gqirjk-'
globalThis.seasonCategoriesRanksTablePositionID = 'y685qcaxwq-'
globalThis.seasonCategoriesRanksTableRatingID = 'c189pylrfn-'
globalThis.seasonCategoriesRanksTableSpaceID = 'd944jekzpo-'
globalThis.seasonCategoriesRanksChartLineLineID = 'b672iwzfko-line-'
globalThis.seasonCategoriesRanksChartLineCirclesDnfID = 'b672iwzfko-circle-dnf-'
globalThis.seasonCategoriesRanksChartLineCirclesID = 'b672iwzfko-circle-'
globalThis.seasonCategoriesRanksTableRefresherID = 'b279kymgiw'

globalThis.seasonCategoriesDescChartLine1ID = 'l881mskeoc'
globalThis.seasonCategoriesDescChartLine1CloseID = 'l881mskeoc-close'
globalThis.seasonCategoriesDescChartLine1ContentID = 'l881mskeoc-content'
globalThis.seasonCategoriesDescChartLine1Img1ID = 'l881mskeoc-img-1'

globalThis.seasonCategoriesRanksDriverImgID = 'j348owxteq'
globalThis.seasonCategoriesRanksDriverNameContainerID = 'a149oarcfq'
globalThis.seasonCategoriesRanksDriverNameID = 'mzruhd844j'
globalThis.seasonCategoriesRanksDriverNumberID = 'gakflf906c'
globalThis.seasonCategoriesRanksDriverTeamID = 'swqoyq237y'
globalThis.seasonCategoriesRanksInfoTitleID ='x704uxitom'
globalThis.seasonCategoriesRanksInfoMetricValueID ='n132fexzir'
globalThis.seasonCategoriesRanksInfoRankValueID ='p705oykoba'
globalThis.seasonCategoriesRanksCardsTotalID = 'wbihnw145l'
globalThis.seasonCategoriesRanksEventWithCardsID = 'ydhsxa435r'
globalThis.seasonCategoriesRanksCardsSumID = 'altrig218m'
globalThis.seasonCategoriesRanksCardsMoreThanOneID = 'pqbrbv072h'
globalThis.seasonCategoriesRanksCardsConsistencyID = 'niqqjs031y'
globalThis.seasonCategoriesRanksCardsPaceID = 'uniqmx354x'
globalThis.seasonCategoriesRanksCardsStartID = 'iufibr592u'
globalThis.seasonCategoriesRanksCardsOvertakesID = 'vromcp014d'
globalThis.seasonCategoriesRanksMistakesLossesID = 'qrpnsb847q'
globalThis.seasonCategoriesRanksMistakesPercID = 'jknjzd938s'
globalThis.seasonCategoriesRanksMistakesPerEventID = 'agyuzj711f'

globalThis.dropdown12ID = 'dropdown-1-2'
globalThis.dropdown12TitleID = 'dropdown-1-2-title'
globalThis.dropdown12MenuItemID = 'dropdown-1-2-item-'

globalThis.globalDropdownsSeasonRatings = [
  dropdown12ID,
]


globalThis.dropdown12Data = [
  {
    label: 'Позиция в рейтинге',
    metric: 'RankPointsAvg',
    chartLine1Metric: 'RankPointsInterpolated',
    stability: 'RankPointsStability',
    ascending: true,
    infoTitle: 'ПОЗИЦИЯ В РЕЙТИНГЕ ПО ИТОГАМ ГРАН-ПРИ',
    downloadTitle: 'position'
  },
  {
    label: 'Плотность',
    metric: 'RankConsistencyAvg',
    chartLine1Metric: 'RankConsistencyInterpolated',
    stability: 'RankConsistencyStability',
    ascending: true,
    infoTitle: 'ПОЗИЦИЯ В РЕЙТИНГЕ ПО ИТОГАМ ГРАН-ПРИ. КАТЕГОРИЯ «ПЛОТНОСТЬ»',
    downloadTitle: 'consistency'
  },
  {
    label: 'Темп',
    metric: 'RankPaceAvg',
    chartLine1Metric: 'RankPaceInterpolated',
    stability: 'RankPaceStability',
    ascending: true,
    infoTitle: 'ПОЗИЦИЯ В РЕЙТИНГЕ ПО ИТОГАМ ГРАН-ПРИ. КАТЕГОРИЯ «ТЕМП»',
    downloadTitle: 'pace'
  },
  {
    label: 'Старт',
    metric: 'RankStartAvg',
    chartLine1Metric: 'RankStartInterpolated',
    stability: 'RankStartStability',
    ascending: true,
    infoTitle: 'ПОЗИЦИЯ В РЕЙТИНГЕ ПО ИТОГАМ ГРАН-ПРИ. КАТЕГОРИЯ «СТАРТ»',
    downloadTitle: 'start'
  },
  {
    label: 'Обгоны',
    metric: 'RankOvertakesAvg',
    chartLine1Metric: 'RankOvertakesInterpolated',
    stability: 'RankOvertakesStability',
    ascending: true,
    infoTitle: 'ПОЗИЦИЯ В РЕЙТИНГЕ ПО ИТОГАМ ГРАН-ПРИ. КАТЕГОРИЯ «ОБГОНЫ»',
    downloadTitle: 'overtakes'
  },
  
]

globalThis.seasonCategoriesDownloadID = 'k014qvimnz'
globalThis.seasonCategoriesDownloadSVGID = 'k014qvimnz-svg'
globalThis.seasonCategoriesDownloadPNGID = 'k014qvimnz-png'

globalThis.seasonRatingsDownloads = [
  seasonCategoriesDownloadID
]


///////////////////// Championship Comparison /////////////////////


globalThis.glVSeasonComparison = {
  'leftIDT': null,
  'leftFullName': null,
  'leftTeamID': null,
  'leftTeam': null,
  'rightIDT': null,
  'rightFullName': null,
  'rightTeamID': null,
  'rightTeam': null,
  'teamID': null,
  'team': null,
  'leaderTeamID': null,
  'leaderTeam': null
}

globalThis.season_comparison_data_2_left = []
globalThis.season_comparison_data_2_right = []

globalThis.seasonDriversData = []

globalThis.seasonComparisonDataLeft = null
globalThis.seasonComparisonDataRight = null
globalThis.seasonComparisonDataDiff = null

globalThis.containerSeasonComparisonID = 'q4z5nn'

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


// globalThis.dropdown13LeftContainerID = 'dropdown-1-3-left-container'
globalThis.dropdown13LeftID = 'dropdown-1-3-left'
globalThis.dropdown13TitleLeftID = 'dropdown-1-3-left-title'
globalThis.dropdown13MenuLeftID = 'dropdown-1-3-left-menu'
globalThis.dropdown13MenuLeftItemID = 'dropdown-1-3-left-item-'
globalThis.dropdown13CaretLeftID = 'dropdown-1-3-left-caret'

// globalThis.dropdown13RightContainerID = 'dropdown-1-3-right-container'
globalThis.dropdown13RightID = 'dropdown-1-3-right'
globalThis.dropdown13TitleRightID = 'dropdown-1-3-right-title'
globalThis.dropdown13MenuRightID = 'dropdown-1-3-right-menu'
globalThis.dropdown13MenuRightItemID = 'dropdown-1-3-right-item-'
globalThis.dropdown13CaretRightID = 'dropdown-1-3-right-caret'

// globalThis.dropdown13CenterContainerID = 'dropdown-1-3-center-container'
globalThis.dropdown13CenterID = 'dropdown-1-3-center'
globalThis.dropdown13TitleCenterID = 'dropdown-1-3-center-title'
globalThis.dropdown13MenuCenterID = 'dropdown-1-3-center-menu'
globalThis.dropdown13MenuCenterItemID = 'dropdown-1-3-center-item-'
globalThis.dropdown13CaretCenterID = 'dropdown-1-3-center-caret'

// globalThis.dropdown14ContainerID = 'dropdown-1-4-container'
globalThis.dropdown14ID = 'dropdown-1-4'
globalThis.dropdown14TitleID = 'dropdown-1-4-title'
globalThis.dropdown14CaretID = 'dropdown-1-4-caret'
globalThis.dropdown14MenuID = 'dropdown-1-4-menu'
globalThis.dropdown14MenuItemID = 'dropdown-1-4-item-'
globalThis.decorCircleLeft = 'drcjsm'
globalThis.decorCircleRight = 'r6s28g'
globalThis.dropdown14IDItemIndexes = []

globalThis.globalDropdownsSeasonComparison = [
  dropdown13LeftID, dropdown13RightID, dropdown13CenterID, dropdown14ID
]

// also change 'metricRatings' variable in 'page-season' script in 'seasonDriversUpdateChart1' function
globalThis.dropdown14Data = [
  {label: 'Финишная позиция', metric: 'PInterpolated', chart: 5, savename: 'classified_position'},
  {label: 'Стартовая позиция', metric: 'GInterpolated', chart: 6, savename: 'grid_position'},
  {label: 'Набранные очки', metric: 'PointsOfficialCumSum', chart: 7, savename: 'points_official'},
  {label: 'Позиция в рейтинге', metric: 'RankPointsInterpolated', chart: 8, savename: 'rating_position'},
  {label: 'Рейтинг : Пилотирование', metric: 'RankTimingInterpolated', chart: 8, savename: 'rating_driving'},
  {label: 'Рейтинг : Плотность', metric: 'RankConsistencyInterpolated', chart: 8, savename: 'rating_consistency'},
  {label: 'Рейтинг : Темп', metric: 'RankPaceInterpolated', chart: 8, savename: 'rating_pace'},
  {label: 'Рейтинг : Борьба на трассе', metric: 'RankActionsInterpolated', chart: 8, savename: 'rating_fighting'},
  {label: 'Рейтинг : Обгоны', metric: 'RankOvertakesInterpolated', chart: 8, savename: 'rating_overtakes'},
  {label: 'Рейтинг : Старт', metric: 'RankStartInterpolated', chart: 8, savename: 'rating_start'},
]

globalThis.iconNavBackward13ID = 'dropdown-1-3-center-backward'
globalThis.iconNavForward13ID = 'dropdown-1-3-center-forward'

globalThis.seasonDriversImageLeftID = 'image-season-drivers-left'
globalThis.seasonDriversImageRightID = 'image-season-drivers-right'
globalThis.seasonDriversNameLeftID = 'johdbb'
globalThis.seasonDriversNameRightID = 'fvcznc'
globalThis.seasonDriversTeamLeftID = 'fnj4j6'
globalThis.seasonDriversTeamRightID = 'x12eym'

globalThis.seasonComparisonStatisticsNameID = 'a716jzrcau'
globalThis.seasonComparisonStatisticsLegendID = 's110rrejtm'
globalThis.seasonComparisonStatisticsLegendMarkerLeftID = 's110rrejtm-marker-left'
globalThis.seasonComparisonStatisticsLegendNameLeftID = 's110rrejtm-name-left'
globalThis.seasonComparisonStatisticsLegendMarkerRightID = 's110rrejtm-marker-right'
globalThis.seasonComparisonStatisticsLegendNameRightID = 's110rrejtm-name-right'

globalThis.seasonComparisonStatisticsDict = [
  {id: 'v669okzufp', title: 'СРЕДНЯЯ СТАРТОВАЯ ПОЗИЦИЯ', metric: 'GAvg', lowerBetter: true},
  {id: 'x805foaqnk', title: 'ЛУЧШАЯ СТАРТОВАЯ ПОЗИЦИЯ', metric: 'GBest', lowerBetter: true},
  {id: 'i638czxnhj', title: 'ХУДШАЯ СТАРТОВАЯ ПОЗИЦИЯ', metric: 'GWorst', lowerBetter: true},
  {id: 'p109btocei', title: 'СРЕДНИЙ СТАРТОВЫЙ РЯД', metric: 'GRowAvg', lowerBetter: true},
  
  {id: 't315vgpprd', title: 'ЧИСЛО ГРАН-ПРИ', metric: 'RacesParticipated', lowerBetter: false},
  {id: 'z091ddgrxe', title: 'НАБРАННЫЕ ОЧКИ', metric: 'PointsOfficialSum', lowerBetter: false},
  {id: 'a786jtcbuk', title: 'СРЕДНЯЯ ПОЗИЦИЯ В РЕЙТИНГЕ', metric: 'RankPointsAvg', lowerBetter: true},
  {id: 'x951psjrpt', title: 'СРЕДНИЙ РЕЙТИНГОВЫЙ БАЛЛ', metric: 'PointsAvg', lowerBetter: false},
  // {id: 'u198wqzbfi', title: 'СТАБИЛЬНОСТЬ В РЕЙТИНГЕ', metric: 'RankPointsStability', lowerBetter: true},
  
  {id: 'b675jgxtfy', title: 'СРЕДНЯЯ ФИНИШНАЯ ПОЗИЦИЯ', metric: 'PAvg', lowerBetter: true},
  {id: 'r100rxtsck', title: 'ЛУЧШАЯ ФИНИШНАЯ ПОЗИЦИЯ', metric: 'PBest', lowerBetter: true},
  {id: 'h711lohydb', title: 'ХУДШАЯ ФИНИШНАЯ ПОЗИЦИЯ', metric: 'PWorst', lowerBetter: true},
  {id: 'b191ecmnvf', title: 'КОЛИЧЕСТВО СХОДОВ', metric: 'RetiredSum', lowerBetter: true},
  
  {id: 'p135cwurbf', title: 'КВАЛИФИКАЦИЯ ВЫШЕ ПАРТНЕРА*', metric: 'QTDiscrClearSum', lowerBetter: false},
  {id: 's167yfxghb', title: 'ФИНИШ ВЫШЕ ПАРТНЕРА', metric: 'PTeammateSum', lowerBetter: false},
  {id: 'e362yelibv', title: 'ФИНИШ ВЫШЕ ПАРТНЕРА**', metric: 'PTeammateClearSum', lowerBetter: false},
  
  {id: 'c720moeapf', title: 'ПЛОТНОСТЬ : РЕЙТИНГ ВЫШЕ ПАРТНЕРА', metric: 'ConsistencyTeammateDiscreteSum', lowerBetter: false},
  {id: 'x292yelfdj', title: 'ТЕМП : РЕЙТИНГ ВЫШЕ ПАРТНЕРА***', metric: 'PaceTeammateDiscreteSum', lowerBetter: false},
  {id: 'e517daafis', title: 'СТАРТ : РЕЙТИНГ ВЫШЕ ПАРТНЕРА', metric: 'StartTeammateDiscreteSum', lowerBetter: false},
  {id: 'e306owawrc', title: 'ОБГОНЫ : РЕЙТИНГ ВЫШЕ ПАРТНЕРА***', metric: 'OvertakesTeammateDiscreteSum', lowerBetter: false},
]

globalThis.seasonComparisonToc0ID = 'gongko'
globalThis.seasonComparisonToc0ScrollElement1ID = 'kzcayqv8'
globalThis.seasonComparisonToc0ScrollElement2ID = 'jfe7zgfw'

globalThis.seasonComparisonToc0Attributes = [
  {title: 'График', scrollTo: seasonComparisonToc0ScrollElement1ID},
  {title: 'Статистика', scrollTo: seasonComparisonToc0ScrollElement2ID},
]

globalThis.seasonComparisonLegendID = 'qpwxso1e'
globalThis.seasonComparisonLegendMarkerLeftID = 'qpwxso1e-marker-left'
globalThis.seasonComparisonLegendNameLeftID = 'qpwxso1e-name-left'
globalThis.seasonComparisonLegendMarkerRightID = 'qpwxso1e-marker-right'
globalThis.seasonComparisonLegendNameRightID = 'qpwxso1e-name-right'

globalThis.seasonPaceChart5DescIconID = 'nybo1xw5'
globalThis.seasonPaceChart5DescCloseID = 'nybo1xw5-close'
globalThis.seasonPaceChart5DescContentID = 'nybo1xw5-content'
globalThis.seasonPaceChart5DescImg1ID = 'nybo1xw5-img-1'
globalThis.seasonPaceChart5DescImg2ID = 'nybo1xw5-img-2'
globalThis.seasonPaceChart5DescImg3ID = 'nybo1xw5-img-3'

globalThis.seasonComparisonSliderData = {
  'on': false,
  'minIdx': null,
  'maxIdx': null,
  'minCoordX': null,
  'maxCoordX': null,
  'minCoordXDec': null,
  'maxCoordXDec': null,
  'thumbWidthHalf': null,
  'paddingXDistance': null,
  'legendHeight': null,
  'chart1OffsetY': null,
  'chartStepX': null,
  'metrics': null,
  'type': null,
  'subType': null,
  'minEventName': null,
  'maxEventName': null
}

globalThis.seasonComparisonSliderSeries = []

globalThis.seasonComparisonSliderContainerID = 'yqieku856l-container'
globalThis.seasonComparisonSliderTrackID = 'yqieku856l-track'
globalThis.seasonComparisonSliderLineID = 'yqieku856l-line'
globalThis.seasonComparisonSliderLineColoredID = 'yqieku856l-line-colored'
globalThis.seasonComparisonSliderCirclesID = 'yqieku856l-circles'
globalThis.seasonComparisonSliderLabelsLeftID = 'yqieku856l-labels-left'
globalThis.seasonComparisonSliderLabelsRightID = 'yqieku856l-labels-right'
globalThis.seasonComparisonSliderMinID = 'yqieku856l-min'
globalThis.seasonComparisonSliderMaxID = 'yqieku856l-max'

globalThis.seasonComparisonSliderEventFirstID = 'x5q9m3t0'
globalThis.seasonComparisonSliderEventLastID = 'b9tuvti6'

globalThis.seasonComparisonSliderRefresherID = 'llbmuz445w'

globalThis.seasonComparisonSliderShadowTopID = 'jlhtca194c'
globalThis.seasonComparisonSliderShadowBottomID = 'quxhav806d'

globalThis.seasonComparisonMainChartID = 'f794ljwdlv'
globalThis.seasonComparisonMainChartSVG1ID = 'f794ljwdlv-svg-1'
globalThis.seasonComparisonMainChartSVG2ID = 'f794ljwdlv-svg-2'
globalThis.seasonComparisonChartLabelsID = 'f794ljwdlv-labels'
globalThis.seasonComparisonChartTicksID = 'f794ljwdlv-ticks'
globalThis.seasonComparisonChartAxisBottom2ID = 'f794ljwdlv-axis-bottom'
globalThis.seasonComparisonChartLabelsBottomID = 'f794ljwdlv-labels-bottom'
globalThis.seasonComparisonMainChartTooltipID = 'f794ljwdlv-tooltip'

globalThis.seasonComparisonDownloadID = 'f222yfjwuv'
globalThis.seasonComparisonDownloadSVGChartID = 'f222yfjwuv-svg-chart'
globalThis.seasonComparisonDownloadPNGChartID = 'f222yfjwuv-png-chart'
globalThis.seasonComparisonDownloadSVGDiffID = 'f222yfjwuv-svg-diff'
globalThis.seasonComparisonDownloadPNGDiffID = 'f222yfjwuv-png-diff'


globalThis.seasonComparisonDownloads = [
  seasonComparisonDownloadID
]

globalThis.seasonComparisonDownloadChartsSVGID = 'a718mfzugd'


///////////////////// Championship Pace /////////////////////


globalThis.glVSeasonPace = {
  'teamID': null,
  'team': null,
  'startIndex': null,
  'startEventName': null,
  'endIndex': null,
  'endEventName': null,
  'CheckMeanPaceCondition': null,
  'CheckMeanPaceSmoothCondition': null,
}

globalThis.data_7_this_interval = []
globalThis.data_8_this_interval = []
globalThis.data_9_this_team = []
globalThis.data_10_this_team = []

globalThis.containerSeasonPaceID = 'kgh9j9'

globalThis.seasonPaceChart12ID = 'f98m7lqm'

globalThis.seasonPaceChart12Chart2ID = 'ohxqcofu'

globalThis.dropdown15ID = 'dropdown-1-5'
globalThis.dropdown15TitleID = 'dropdown-1-5-title'
globalThis.dropdown15MenuItemID = 'dropdown-1-5-item-'
globalThis.dropdown15ItemIndexes = []

globalThis.dropdown16ID = 'dropdown-1-6'
globalThis.dropdown16TitleID = 'dropdown-1-6-title'
globalThis.dropdown16MenuItemID = 'dropdown-1-6-item-'

globalThis.dropdown17ID = 'dropdown-1-7'
globalThis.dropdown17TitleID = 'dropdown-1-7-title'
globalThis.dropdown17MenuID = 'dropdown-1-7-menu'
globalThis.dropdown17MenuItemID = 'dropdown-1-7-item-'

globalThis.globalDropdownsSeasonPace = [
  dropdown15ID, dropdown16ID, dropdown17ID,
]

globalThis.seasonPaceEventNames = null
globalThis.seasonPaceEvents = null
globalThis.seasonPaceTeamsUnique = null
globalThis.seasonPaceEventIndexes = null
globalThis.seasonPaceDataLaptimes = null
globalThis.seasonPaceDataDrivers = null
globalThis.seasonPaceDrivers = null

globalThis.seasonPaceCheckMeanPaceID = 'a5m2kv2u'
globalThis.seasonPaceCheckMeanPaceIconID ='a5m2kv2u-icon'

globalThis.seasonPaceCheckMeanPaceSmoothID = 'jppvkshe'
globalThis.seasonPaceCheckMeanPaceSmoothIconID = 'jppvkshe-icon'

globalThis.seasonPaceChart12LinesID = 'tf2xyq6i'
globalThis.seasonPaceChart12FillAreaID = 'u92ye0dg'
globalThis.seasonPaceChart12FillAreaScreenID = 'r889srysfz'
globalThis.seasonPaceChart12MeanLineID = 'j9kt715u'

globalThis.seasonPaceChart12SelectedAreadID = 'f91kwh68'

globalThis.seasonPaceChart12MeanValueID = 'f3i7mu5m'
globalThis.seasonPaceChart12MedianValueID = 'xphl3qbg'

globalThis.seasonPaceChart12VariationID = 'sxkxbt8m'
globalThis.seasonPaceChart12VariationMeanID = 'pp8ytibp'
globalThis.seasonPaceChart12VariationMedianID = 'qktfa6u7'

globalThis.seasonPaceChartBetterLaptimesID = 'h600mx54'
globalThis.seasonPaceChartBetterLaptimesTotalLapsID = 'fol89lkw'

globalThis.seasonPaceDonutLegendID = 'r1i83fc9'

globalThis.seasonPaceDonutLegendsIDs = [
  'onxpnajw', 'akndca9r', 'hgsez2uf', 'tjwkz1e3'
]

globalThis.seasonPaceDonutLabelsIDs = [
  'i1xqbyah', 'vymcrmb1', 'lyjsnkw3', 'q25csr86',
]

globalThis.seasonPaceDonutValuesIDs = [
  'wu2klaco', 'fuvkqvt9', 'm5qo6y3w', 'daqm0v0w',
]

globalThis.seasonPaceChartLapsCountID = 'ewkgz3mm'
globalThis.seasonPaceChartLapsCountAvgPercentID = 'y216rsu0'

globalThis.seasonPaceDriversLegendID = 'sh24pwxh'

globalThis.seasonPaceChart121DescIconID = 'tc47btbe'
globalThis.seasonPaceChart121DescContentID = 'tc47btbe-content'
globalThis.seasonPaceChart121DescImg1ID = 'tc47btbe-img-1'

globalThis.seasonPaceChart122DescIconID = 'qeh9jy7q'
globalThis.seasonPaceChart122DescContentID = 'qeh9jy7q-content'
globalThis.seasonPaceChart122DescImg1ID = 'qeh9jy7q-img-1'

globalThis.seasonPaceChart123DescIconID = 'p327i39d'
globalThis.seasonPaceChart123DescContentID = 'p327i39d-content'
globalThis.seasonPaceChart123DescImg1ID = 'p327i39d-img-1'

globalThis.seasonPaceChart124DescIconID = 'rc3k4yvc'
globalThis.seasonPaceChart124DescContentID = 'rc3k4yvc-content'
globalThis.seasonPaceChart124DescImg1ID = 'rc3k4yvc-img-1'

globalThis.seasonPaceChart125DescIconID = 'dwk5jud2'
globalThis.seasonPaceChart125DescContentID = 'dwk5jud2-content'
globalThis.seasonPaceChart125DescImg1ID = 'dwk5jud2-img-1'

globalThis.seasonPaceChartsID = 'y105wezlgh'

globalThis.seasonPaceLaptimesDownloadID = 'q806rsnuof'
globalThis.seasonPaceLaptimesDownloadSVGID = 'q806rsnuof-svg'
globalThis.seasonPaceLaptimesDownloadPNGID = 'q806rsnuof-png'

globalThis.seasonPaceLaptimes2DownloadID = 'u571pndtqt'
globalThis.seasonPaceLaptimes2DownloadSVGID = 'u571pndtqt-svg'
globalThis.seasonPaceLaptimes2DownloadPNGID = 'u571pndtqt-png'

globalThis.seasonPaceChartVDownloadID = 'w391ygswqu'
globalThis.seasonPaceChartVDownloadSVGID = 'w391ygswqu-svg'
globalThis.seasonPaceChartVDownloadPNGID = 'w391ygswqu-png'

globalThis.seasonPaceChartLDownloadID = 'd738mdxduh'
globalThis.seasonPaceChartLDownloadSVGID = 'd738mdxduh-svg'
globalThis.seasonPaceChartLDownloadPNGID = 'd738mdxduh-png'

globalThis.seasonPaceDownloads = [
  seasonPaceLaptimesDownloadID, seasonPaceLaptimes2DownloadID, 
  seasonPaceChartVDownloadID, seasonPaceChartLDownloadID
]


///////////////////////////// EVENT /////////////////////////////


globalThis.glVEvent = {
  'Page': null,
  'SprintIndex': null,
  'SeasonID': null,
  'RaceID': null,
  'EventID': null,
  'EventNameRus': null,
  'EventAbbreviation': null,
  'WrongEvent': false,
  'WrongEventNameRus': null,
}

globalThis.event_drivers = []
globalThis.event_summary = []

globalThis.eventDriverIDs = []
globalThis.eventNames = []
globalThis.eventNumbers = []
globalThis.eventTeams = []
globalThis.eventTeamIDs = []
globalThis.eventColors = []
globalThis.eventAbbs = []

globalThis.eventCalendar = null
globalThis.eventCurrentEvent = null

globalThis.eventMainContainerID = 'lr3g9r'
globalThis.eventContentContainerID = 'gqtjhs'
globalThis.eventsMenuContainerID = 'l520nddtae'

globalThis.menuYears21ID = 'n999yjzsjd'
globalThis.menuYears21TitleID = 'n999yjzsjd-title'
globalThis.menuYears21ItemID = 'n999yjzsjd-item'

globalThis.menuEvents21ID = 'awk0gh'
globalThis.menuEvents21ItemID = 'aj0raf'

globalThis.globalDropdownsEvents = [
  menuYears21ID
]




///////////////////////////// Event Rating /////////////////////////////

globalThis.containerEventsRatingID = 'j8256h'

globalThis.eventRatingsProtocolID = 'events-ratings-protocol'
globalThis.eventsRatingsMetricsFieldsetID = 'cu1gbj'
globalThis.eventsRatingsProtocolFieldsetID = 'o4xakf'

globalThis.eventsRatingsChartMetrcisID = 'plot-metrics'
globalThis.eventsRatingsChartMetrcisContainerID = 'plot-metrics-container'
globalThis.eventsRatingsChartMetrcisSVGID = 'o607tezmci'

globalThis.eventsRatingsChartMetricsItemID = 'z022kmrnys'

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

globalThis.path_event_summary = null


///////////////////////////// Event Categories /////////////////////////////


globalThis.glVEventCategories = {
  'timingClickedNumber': null,
  'actionsClickedNumber': null,
}

globalThis.containerEventsCategoriesID = 'dx87ek'

globalThis.eventCategoriesMetricsContainerID = 'eqdspo516d-'
globalThis.eventCategoriesMetricsImgID = 'vtoznx321s-'
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

globalThis.eventCategoriesTimingDescIconID = 'riek7hz7'
globalThis.eventCategoriesTimingDescCloseID = 'riek7hz7-close'
globalThis.eventCategoriesTimingDescContentID = 'riek7hz7-content'
globalThis.eventCategoriesTimingDescImg1ID = 'riek7hz7-img-1'
globalThis.eventCategoriesTimingBarsDescImg1ID = 'dzdbf3nw-img-1'
globalThis.eventCategoriesTimingBarsDescImg2ID = 'dzdbf3nw-img-2'

globalThis.eventCategoriesActionsDescIconID = 'fg8l9ccz'
globalThis.eventCategoriesActionsDescCloseID = 'fg8l9ccz-close'
globalThis.eventCategoriesActionsDescContentID = 'fg8l9ccz-content'
globalThis.eventCategoriesActionsDescImg1ID = 'fg8l9ccz-img-1'
globalThis.eventCategoriesActionsBarsDescImg1ID = 'tcnaz0a5-img-1'
globalThis.eventCategoriesActionsBarsDescImg2ID = 'tcnaz0a5-img-2'

globalThis.eventCategoriesTimingContainerID = 'egkdxr546m'
globalThis.eventCategoriesActionsContainerID = 'xbljry401t'

globalThis.eventCategoriesTimingBarsContainerID = 'egkdxr546m-bars'
globalThis.eventCategoriesActionsBarsContainerID = 'xbljry401t-bars'

globalThis.eventCategoriesTimingAbbsNodeID = 'egkdxr546m-abbs'
globalThis.eventCategoriesActionsAbbsNodeID = 'xbljry401t-abbs'

globalThis.eventCategoriesTimingBarsNodeID = 'egkdxr546m-bars-'
globalThis.eventCategoriesActionsBarsNodeID = 'xbljry401t-bars-'

globalThis.eventCategoriesTimingTicklabelsNodeID = 'egkdxr546m-ticklabels-'
globalThis.eventCategoriesActionsTicklabelsNodeID = 'xbljry401t-ticklabels-'

globalThis.eventCategoriesTimingGridHNodeID = 'egkdxr546m-grid-h-'
globalThis.eventCategoriesTimingGridVNodeID = 'egkdxr546m-grid-v-'
globalThis.eventCategoriesActionsGridHNodeID = 'xbljry401t-grid-h-'
globalThis.eventCategoriesActionsGridVNodeID = 'xbljry401t-grid-v-'

globalThis.eventCategoriesTimingAbbID = 'egkdxr546m-abb-'
globalThis.eventCategoriesActionsAbbID = 'xbljry401t-abb-'

globalThis.eventCategoriesTimingRefresherID = 'pewajb973t'
globalThis.eventCategoriesActionsRefresherID = 'ysadwc990k'

globalThis.eventCategoriesTimingDownloadID = 'v304tcdmsw'
globalThis.eventCategoriesTimingDownloadSVGID = 'v304tcdmsw-svg'
globalThis.eventCategoriesTimingDownloadPNGID = 'v304tcdmsw-png'

globalThis.eventCategoriesActionsDownloadID = 'y716tkaifv'
globalThis.eventCategoriesActionsDownloadSVGID = 'y716tkaifv-svg'
globalThis.eventCategoriesActionsDownloadPNGID = 'y716tkaifv-png'

globalThis.globalEventCategoriesDownloads = [
  eventCategoriesTimingDownloadID, eventCategoriesActionsDownloadID
]


///////////////////////////// Event Comparison /////////////////////////////


globalThis.glVEventComparison = {
  'chartLaptimesWidth': null,
  'leftDriverIDT': null,
  'leftTeam': null,
  'leftTeamID': null,
  'rightDriverIDT': null,
  'rightTeam': null,
  'rightTeamID': null,
}

globalThis.event_path_data_8_left = null
globalThis.event_path_data_8_right = null

globalThis.event_summary_left = []
globalThis.event_summary_right = []

globalThis.event_data_8_left = []
globalThis.event_data_8_right = []

globalThis.eventComparisonTeams = []
globalThis.eventComparisonTeamIDs = []
globalThis.eventComparisonDriversData = []
globalThis.eventComparisonNames = []
globalThis.eventComparisonDriverIDs = []

globalThis.containerEventsComparisonID = 'z2kmg2'

// globalThis.eventComparisonDriversData = {
//   'Left': {'Number': null, 'FullName': null, 'Team': null},
//   'Right': {'Number': null, 'FullName': null, 'Team': null}
// }

globalThis.eventComparisonRefresh = true

globalThis.dropdown27ID = 'dropdown-2-7'
globalThis.dropdown27TitleID = 'dropdown-2-7-title'
globalThis.dropdown27MenuItemID = 'dropdown-2-7-item'
globalThis.dropdown27ItemIndexes = []

globalThis.dropdown23ID = 'dropdown-2-3'
globalThis.dropdown23TitleID = 'dropdown-2-3-title'
globalThis.dropdown23MenuItemID = 'dropdown-2-3-item'

globalThis.dropdown24ID = 'dropdown-2-4'
globalThis.dropdown24TitleID = 'dropdown-2-4-title'
globalThis.dropdown24MenuItemID = 'dropdown-2-4-item'

globalThis.globalDropdownsEventComparison = [
  dropdown27ID, dropdown23ID, dropdown24ID
]

globalThis.plotLaptimesContainerID = 'plot-laptimes-container'
globalThis.plotLaptimesDifferenceContainerID = 'plot-laptimes-difference-container'
globalThis.plotLaptimesLeftID = 'plot-laptimes-left'
globalThis.plotLaptimesRightID = 'plot-laptimes-right'
globalThis.plotLaptimesDifferenceID = 'plot-laptimes-difference'

globalThis.eventComparisonPlotLaptimesSeparatorID = 'reu517nb'

globalThis.eventComparisonplotDiffMeanValueID = 'jwf19qjc'

globalThis.check231ID = 'check-2-3-1'

globalThis.laptimesBoardNameLeft = 'laptimes-board-name-left'
globalThis.laptimesBoardNameRight = 'laptimes-board-name-right'

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

globalThis.eventComparisonDeltaRatingID = 'g4h1w4-delta'
globalThis.eventComparisonDeltaConsistencyID = 'wi378m-delta'
globalThis.eventComparisonDeltaPaceID = 'chnk6n-delta'
globalThis.eventComparisonDeltaOvertakesID = 'izzihq-delta'
globalThis.eventComparisonDeltaStartID = 'zgyei2-delta'
globalThis.eventComparisonDeltaMistakesCountID = 'fpcjhb-delta'
globalThis.eventComparisonDeltaMistakesLossesID = 'biml4c-delta'

globalThis.eventComparisonLaptimesDescIconID = 'agg0e1lx'
globalThis.eventComparisonLaptimesDescCloseID = 'agg0e1lx-close'
globalThis.eventComparisonLaptimesDescContentID = 'agg0e1lx-content'
globalThis.eventComparisonLaptimesDescImg1ID = 'agg0e1lx-img-1'

globalThis.eventComparisonDifferencesDescImg1ID = 'pd1wre7v-img-1'

globalThis.eventComparisonRadarDescOpenID = 'x733chovrk'
globalThis.eventComparisonRadarDescCloseID = 'x733chovrk-close'
globalThis.eventComparisonRadarDescContentID = 'x733chovrk-content'
globalThis.eventComparisonRadarDescImg1ID = 'x733chovrk-img-1'

globalThis.eventComparisonMetricsNamesContainerID = 'eeepnz944z'

globalThis.eventComparisonDownloadID = 'h539ixcioe'
globalThis.eventComparisonDownloadSVGID = 'h539ixcioe-svg'
globalThis.eventComparisonDownloadPNGID = 'h539ixcioe-png'
globalThis.eventComparisonDownloadNameLeftID = 'h539ixcioe-name-left'
globalThis.eventComparisonDownloadNameRightID = 'h539ixcioe-name-right'
globalThis.eventComparisonDownloadNameDiffID = 'h539ixcioe-name-diff'

globalThis.eventComparisonDownloads = [
  eventComparisonDownloadID
]


///////////////////////////// Event Pace /////////////////////////////


globalThis.glVEventPace = {
  'metric': null,
  'metricOrder': null,
  'metricLaptimes': null,
  'radioCondition': null,
  'displayLeader': null,
  'leaderDriverIDT': null,
  'leaderTeamID': null,
  'leftDriverIDT': null,
  'leftName': null,
  'leftNumber': null,
  'leftTeamIDT': null,
  'leftColor': null,
  'rightDriverID': null,
  'rightName': null,
  'rightTeamID': null,
  'rightColor': null,
  'chart11LapByLapHeight': null,
  'chart11LapByLapCondition': null,
  'namePelotone': 'Пелотон',
  'colorPelotone': '#ACACAC',
}

globalThis.event_pace_data_9_current_race = []
globalThis.event_pace_data_8_left = []
globalThis.event_pace_data_8_right = []




globalThis.containerEventsPaceID = 'g87o2w'

globalThis.chart2ID = 'z270xjsiih'
globalThis.chart3ID = 'ek7yjp'

globalThis.eventLaptimesDriversSorted = null

globalThis.eventPaceLaptimesLeft = null
globalThis.eventPaceLaptimesRight = null

globalThis.eventPaceLaptimesCurrentSeasonLeft = null
globalThis.eventPaceLaptimesCurrentSeasonRight = null

globalThis.eventPaceLaptimesCurrentEventLeft = null
globalThis.eventPaceLaptimesCurrentEventRight = null

// globalThis.pathLaptimesDriversActual = null

globalThis.eventPaceDriverNamesList = []
globalThis.eventPaceDriverNumbersList = []

globalThis.eventPaceLaptimesLeft = null
globalThis.eventPaceLaptimesRight = null

globalThis.eventPaceLaptimesDriversLeft = null
globalThis.eventPaceLaptimesDriversRight = null

globalThis.eventPaceMetric1 = 'PaceDiffClearByWorst'
globalThis.eventPaceMetric2 = 'PaceDiffClear'

// globalThis.eventPaceTable1ID = 'g5wmlg'
// globalThis.eventPaceTable1ChartID = 'snzr98'

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

// globalThis.eventPaceTooltip1Clicked = null
globalThis.eventPaceTooltip1LapsLocalClicked = null
globalThis.eventPaceChart11SegmentClickedID = null

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

globalThis.dropdown25ID = 'dropdown-2-5'
globalThis.dropdown25TitleID = 'dropdown-2-5-title'
globalThis.dropdown25MenuItemID = 'dropdown-2-5-item-'
globalThis.dropdown25MarkerID ='dropdown-2-5-marker'

globalThis.dropdown26ID = 'dropdown-2-6'
globalThis.dropdown26TitleID = 'dropdown-2-6-title'
globalThis.dropdown26MenuItemID = 'dropdown-2-6-item-'
globalThis.dropdown26MarkerID ='dropdown-2-6-marker'

globalThis.globalDropdownsEventPace = [
  dropdown25ID, dropdown26ID
]

globalThis.radio21ID = 'radio-2-1'
globalThis.refresh21ID = 'aifq8t'

globalThis.eventPaceChart9DescIconID = 'e0d8gaxr'
globalThis.eventPaceChart9DescTableID = 'e0d8gaxr-table'
globalThis.eventPaceChart9DescCloseID = 'e0d8gaxr-close'
globalThis.eventPaceChart9DescContentID = 'e0d8gaxr-content'
globalThis.eventPaceChart9DescImg1ID = 'e0d8gaxr-img-1'

globalThis.eventPaceChart11DescIconID = 'w4erpmfq'
globalThis.eventPaceChart11DescTableID = 'w4erpmfq-table'
globalThis.eventPaceChart11DescCloseID = 'w4erpmfq-close'
globalThis.eventPaceChart11DescContentID = 'w4erpmfq-content'
globalThis.eventPaceChart11DescImg1ID = 'w4erpmfq-img-1'

globalThis.eventPaceChart9SVGID = 'g189dngkcr'

globalThis.eventPaceChart11SVGID = 'd238jvjqcg'
globalThis.eventPaceChart11Main1ID = 'd238jvjqcg-main-1'
globalThis.eventPaceChart11Main2ID = 'd238jvjqcg-main-2'
globalThis.eventPaceChart11FillAreaID = 'd238jvjqcg-fill-area'
globalThis.eventPaceChart11LapByLapID = 'd238jvjqcg-lap-by-lap'
globalThis.eventPaceChart11CircleID = 'd238jvjqcg-circle'
globalThis.eventPaceChart11LineID = 'd238jvjqcg-line'

globalThis.eventPaceLapByLapTooltipID = 'g353wssrqh'
globalThis.eventPaceLapByLapTooltipLapID = 'g353wssrqh-lap'
globalThis.eventPaceLapByLapTooltipDriverLeftID = 'g353wssrqh-driver-left'
globalThis.eventPaceLapByLapTooltipValueLeftID = 'g353wssrqh-value-left'
globalThis.eventPaceLapByLapTooltipDriverRightID = 'g353wssrqh-driver-right'
globalThis.eventPaceLapByLapTooltipValueRightID = 'g353wssrqh-value-right'

globalThis.eventPaceLapByLapCheckID = 'y611walzur'
globalThis.eventPaceLapByLapCheckIconID = 'y611walzur-icon'

globalThis.eventPaceChart9DownloadID = 'r678zdyyre'
globalThis.eventPaceChart9DownloadSVGID = 'r678zdyyre-svg'
globalThis.eventPaceChart9DownloadPNGID = 'r678zdyyre-png'

globalThis.eventPaceChart11DownloadID = 't007jimcnf'
globalThis.eventPaceChart11DownloadSVGID = 't007jimcnf-svg'
globalThis.eventPaceChart11DownloadPNGID = 't007jimcnf-png'

globalThis.eventPaceDownloads = [
  eventPaceChart9DownloadID, eventPaceChart11DownloadID
]


///////////////////////////// DRIVERS /////////////////////////////


globalThis.glVDrivers = {
  'Page': null,
  'ComparisonRefresh': true,
  'FirstLoad': null,
  'leftName': null,
  'leftDriverIDT': null,
  'leftNationCode': null,
  'leftNationName': null
}

globalThis.driversDrivers = []

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

globalThis.dropdown31ID = 'dropdown-3-1'
globalThis.dropdown31TitleID = 'dropdown-3-1-title'
globalThis.dropdown31MenuItemID = 'dropdown-3-1-item-'

globalThis.dropdown32ID = 'dropdown-3-2'
globalThis.dropdown32TitleID = 'dropdown-3-2-title'
globalThis.dropdown32MenuItemID = 'dropdown-3-2-item-'
globalThis.dropdown32TitleIndex = null
globalThis.dropdown32ItemIndexes = []

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

globalThis.globalDropdownsDriversCharacteristics = [
  dropdown31ID, dropdown32ID
]

globalThis.driversChartPentagon1Linestyles = ['0', '0']

globalThis.driversLevelTitleID = 'drivers-level-title'

globalThis.driversMetricRatingTeammateID = 'drivers-metric-rating-teammate'
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
  'ConsistencyTeammateDiscreteAvg', 'QTDiscrAvg', 'PaceTeammateDiscreteAvg',
  'MistakesTeammateDiscreteAvg'
]

globalThis.driversDriverImageID = 'image-drivers-current-driver'

globalThis.driversCharacteristicsChartPentDescIconID = 'kxr6cdek'
globalThis.driversCharacteristicsChartPentDescCloseID = 'kxr6cdek-close'
globalThis.driversCharacteristicsChartPentDescContentID = 'kxr6cdek-content'
globalThis.driversCharacteristicsChartPentDescImg1ID = 'kxr6cdek-img-1'
globalThis.driversCharacteristicsChartPentDescImg11ID = 'kxr6cdek-img-1-1'
globalThis.driversCharacteristicsChartPentDescImg12ID = 'kxr6cdek-img-1-2'
globalThis.driversCharacteristicsChart1DescImg1ID = 'yjnyha0h-img-1'
globalThis.driversCharacteristicsChart2DescImg1ID = 'k8hlyzdf-img-1'


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
  'QTDiscrAvg', 'MistakesTeammateDiscreteAvg'
]

globalThis.driversComparisonChart30DescIconID = 'q6ps82hc'
globalThis.driversComparisonChart30DescTableID = 'q6ps82hc-table'
globalThis.driversComparisonChart30DescCloseID = 'q6ps82hc-close'
globalThis.driversComparisonChart30DescContentID = 'q6ps82hc-content'
globalThis.driversComparisonChart30DescImg1ID = 'q6ps82hc-img-1'

globalThis.driversComparisonChart31DescIconID = 'xxiy2e1y'
globalThis.driversComparisonChart31DescTableID = 'xxiy2e1y-table'
globalThis.driversComparisonChart31DescCloseID = 'xxiy2e1y-close'
globalThis.driversComparisonChart31DescContentID = 'xxiy2e1y-content'
globalThis.driversComparisonChart31DescImg1ID = 'xxiy2e1y-img-1'

globalThis.driversComparisonChart32DescIconID = 'd69gjbur'
globalThis.driversComparisonChart32DescTableID = 'd69gjbur-table'
globalThis.driversComparisonChart32DescCloseID = 'd69gjbur-close'
globalThis.driversComparisonChart32DescContentID = 'd69gjbur-content'
globalThis.driversComparisonChart32DescImg1ID = 'd69gjbur-img-1'

globalThis.driversComparisonChart33DescIconID = 'ban55m2i'
globalThis.driversComparisonChart33DescTableID = 'ban55m2i-table'
globalThis.driversComparisonChart33DescCloseID = 'ban55m2i-close'
globalThis.driversComparisonChart33DescContentID = 'ban55m2i-content'
globalThis.driversComparisonChart33DescImg1ID = 'ban55m2i-img-1'

globalThis.driversComparisonChart34DescIconID = 'd84yrmvb'
globalThis.driversComparisonChart34DescTableID = 'd84yrmvb-table'
globalThis.driversComparisonChart34DescCloseID = 'd84yrmvb-close'
globalThis.driversComparisonChart34DescContentID = 'd84yrmvb-content'
globalThis.driversComparisonChart34DescImg1ID = 'd84yrmvb-img-1'

globalThis.driversComparisonChart35DescIconID = 'c1wfe3qh'
globalThis.driversComparisonChart35DescTableID = 'c1wfe3qh-table'
globalThis.driversComparisonChart35DescCloseID = 'c1wfe3qh-close'
globalThis.driversComparisonChart35DescContentID = 'c1wfe3qh-content'
globalThis.driversComparisonChart35DescImg1ID = 'c1wfe3qh-img-1'

globalThis.driversComparisonChart36DescIconID = 'mhzbis8q'
globalThis.driversComparisonChart36DescTableID = 'mhzbis8q-table'
globalThis.driversComparisonChart36DescCloseID = 'mhzbis8q-close'
globalThis.driversComparisonChart36DescContentID = 'mhzbis8q-content'
globalThis.driversComparisonChart36DescImg1ID = 'mhzbis8q-img-1'

globalThis.driversComparisonChart37DescIconID = 'kga25a7j'
globalThis.driversComparisonChart37DescTableID = 'kga25a7j-table'
globalThis.driversComparisonChart37DescCloseID = 'kga25a7j-close'
globalThis.driversComparisonChart37DescContentID = 'kga25a7j-content'
globalThis.driversComparisonChart37DescImg1ID = 'kga25a7j-img-1'

globalThis.driversComparisonChart38DescIconID = 'zdfm6c38'
globalThis.driversComparisonChart38DescTableID = 'zdfm6c38-table'
globalThis.driversComparisonChart38DescCloseID = 'zdfm6c38-close'
globalThis.driversComparisonChart38DescContentID = 'zdfm6c38-content'
globalThis.driversComparisonChart38DescImg1ID = 'zdfm6c38-img-1'

globalThis.driversComparisonDescTablesIDs = [
  driversComparisonChart30DescTableID, driversComparisonChart31DescTableID,
  driversComparisonChart32DescTableID, driversComparisonChart33DescTableID,
  driversComparisonChart34DescTableID, driversComparisonChart35DescTableID,
  driversComparisonChart36DescTableID, driversComparisonChart37DescTableID,
  driversComparisonChart38DescTableID, 
  
  
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
      'QTDiscrAvg', 'PaceNormalizedAvg', 'StartNormalizedAvg', 'LevelNormalizedAvg'
    ],
    'Captions': [
      'Имя', 'Плотность', 'Обгоны',
      'Квалификация', 'Темп', 'Старт', 'Уровень'
    ],
    'SortColumns': [
      '', 'ConsistencyNormalizedAvg', 'OvertakesNormalizedAvg',
      'QTDiscrAvg', 'PaceNormalizedAvg', 'StartNormalizedAvg', 'LevelNormalizedAvg'
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


globalThis.globalHeaderContainerID = 'zi8cbs'
globalThis.globalHeaderLineID = 'u481sj'
// globalThis.clickaAreaVerticalMenuID = 'w2v4ph'

globalThis.globalHeaderMenuButtonID = 'gqbj6bgi'
globalThis.globalHeaderMenuImgID = 'fckhqtzg'
globalThis.globalHeaderMenuImg1ID = 'fckhqtzg-1'
globalThis.globalHeaderMenuImg2ID = 'fckhqtzg-2'
globalThis.globalHeaderMenuImg3ID = 'fckhqtzg-3'
globalThis.globalHeaderMenuImg4ID = 'fckhqtzg-4'
globalThis.globalHeaderMenuImg5ID = 'fckhqtzg-5'
globalThis.globalHeaderMenuContainerID = 'cxx5e9'

// globalThis.globalHeaderMenuID = 'a0y2keli'

globalThis.globalHeaderMenuID = 'eizehs439m'
globalThis.globalHeaderMenuClickedButtonID = null

globalThis.globalHeaderMenuButtonsIDs = [
  'eizehs439m-season-stat', 'eizehs439m-season-rating', 'eizehs439m-season-comparison', 'eizehs439m-season-pace',
  'eizehs439m-event-results', 'eizehs439m-event-categories', 'eizehs439m-event-comparison', 'eizehs439m-event-pace',
  'eizehs439m-drivers-char',
  // 'eizehs439m-drivers-comparison', 'eizehs439m-drivers-tables'
 ]

globalThis.globalHeaderMenuCaretID = 'tvscfo'

// if 'MainMenuFill'==true --> in menu-main of index.html remove invisible fron menu carets
globalThis.glVGlobal = {
  'SeasonIDs': null,
  // 'MainMenuFill': false,
  'Segment': false,
  'Page': false,
  'FirstLoad': true
}

globalThis.seasonIDs = []

globalThis.pageMainContainerID = 'kckynh'
globalThis.pageContainerID = 'pvnn6f'

globalThis.globalScrollContainerID = 'kckynh'

globalThis.mainMenuCloseIconID = 'wva7jrwr'

globalThis.mainMenuSelectLanguageID = 'yldjiztxbx'
globalThis.mainMenuSelectLanguageCaretID = 'yldjiztxbx-caret'
globalThis.mainMenuSelectLanguageMenuID ='o66kkj'

// pages
globalThis.mainTitlePageID = 'main-page-title'

globalThis.seasonStatistcsPageID = 'season-page-statistics'
globalThis.seasonRatingsPageID = 'season-page-ratings'
globalThis.seasonComparisonPageID = 'season-page-comparison'
globalThis.seasonPacePageID = 'season-page-pace'

globalThis.eventResultsPageID = 'event-page-results'
globalThis.eventCategoriesPageID = 'event-page-categories'
globalThis.eventComparisonPageID = 'event-page-comparison'
globalThis.eventPacePageID = 'event-page-pace'

globalThis.driversCharacteristicsPageID = 'drivers-page-charcterisitics'
globalThis.driversComparisonPageID = 'drivers-page-comparison'
globalThis.driversTablesPageID = 'drivers-page-tables'

// paths
globalThis.mainTitlePagePath = '/'

globalThis.seasonStatistcsPagePath = '/season/statistics'
globalThis.seasonRatingsPagePath = '/season/ratings'
globalThis.seasonComparisonPagePath = '/season/comparison'
globalThis.seasonPacePagePath = '/season/pace'

globalThis.eventResultsPagePath = '/event/results'
globalThis.eventCategoriesPagePath = '/event/categories'
globalThis.eventComparisonPagePath = '/event/comparison'
globalThis.eventPacePagePath = '/event/pace'

globalThis.driversCharcterisiticsPagePath = '/drivers/characteristics'
globalThis.driversComparisonPagePath = '/drivers/comparison'
globalThis.driversTablesPagePath = '/drivers/tables'

// segments
globalThis.mainSegmentID = 'main'
globalThis.seasonSegmentID = 'season'
globalThis.eventSegmentID = 'event'
globalThis.driversSegmentID = 'drivers'

globalThis.globalRoutes = [
  // {page: mainTitlePageID, path: mainTitlePagePath, segment: mainSegmentID, component: routePageMain},
  {page: eventResultsPageID, path: mainTitlePagePath, segment: eventSegmentID, component: routePageEvent},
  {page: seasonStatistcsPageID, path: seasonStatistcsPagePath, segment: seasonSegmentID, component: routePageSeason},
  {page: seasonRatingsPageID, path: seasonRatingsPagePath, segment: seasonSegmentID, component: routePageSeason},
  {page: seasonComparisonPageID, path: seasonComparisonPagePath, segment: seasonSegmentID, component: routePageSeason},
  {page: seasonPacePageID, path: seasonPacePagePath, segment: seasonSegmentID, component: routePageSeason},
  {page: eventResultsPageID, path: eventResultsPagePath, segment: eventSegmentID, component: routePageEvent},
  {page: eventCategoriesPageID, path: eventCategoriesPagePath, segment: eventSegmentID, component: routePageEvent},
  {page: eventComparisonPageID, path: eventComparisonPagePath, segment: eventSegmentID, component: routePageEvent},
  {page: eventPacePageID, path: eventPacePagePath, segment: eventSegmentID, component: routePageEvent},
  {page: driversCharacteristicsPageID, path: driversCharcterisiticsPagePath, segment: driversSegmentID, component: routePageDrivers},
  {page: driversComparisonPageID, path: driversComparisonPagePath, segment: driversSegmentID, component: routePageDrivers},
  {page: driversTablesPageID, path: driversTablesPagePath, segment: driversSegmentID, component: routePageDrivers},
]

//////////////////////////////////// CLOSE LISTS ////////////////////////////////////////


// citation
globalThis.globalCitationTextID = 'f769xxmiup-text'
// globalThis.globalCitationMaybeID = 'f769xxmiup-maybe'
globalThis.globalCitationAuthorID = 'f769xxmiup-author'
globalThis.globalCitationEmojiID = 'f769xxmiup-emoji'


//////////////////////////////////////// OTHERS ////////////////////////////////////////


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

globalThis.globalScrollTopButtonID = 'hh6m79'
globalThis.globalScrollTopIconID = 'vynw3x2l'

function variablesUpdateThemeColors(themeCurrent) {

  globalThis.pathImgTheme = `img/${themeCurrent}/`

  globalThis.css = getCSS()

  // Light
  if (themeCurrent == 'light') {

    globalThis.chartProtocolRowHover = '#FDFDFD'
    
    globalThis.colorChartsFrame = '#F0F0F5'
    globalThis.colorChartsFrameWidth = 0.125

    globalThis._colorBackground = '#FFFFFF'
    globalThis._axisColor = '#F6F6F9'
    globalThis._axisColorDark = '#D8DCDF'
    globalThis._axisRadius = px18
    globalThis._ticklabelColor = '#5A616A'
    globalThis._tickLineWidth = 0.0625
    globalThis._colorGrid = '#FBFBFB'
    globalThis.colorThemesChartGridDark = '#F1F1F1'
    globalThis.colorThemesChartGridLight = '#FDFDFD'
  
    globalThis.seasonRatingsTitlesHeight = 2.5
  
    globalThis.colorThemesTextOpacity = 1
    globalThis.colorThemesImgSaturation = 1
    globalThis.colorThemesChartSaturation = 1
  
    globalThis.colorThemesChartOpacity = 1
    globalThis.colorThemesChartOpacity_1 = 0.8

    globalThis.plotComparisonWidth = 28
  
    globalThis.colorThemesChartBorder = '#D2D7DC'
  
    globalThis.colorThemesChartFont1 = '#1D1F21'
    globalThis.colorThemesChartFont2 = '#313335'
    globalThis.colorThemesChartFont3 = '#444749'
    globalThis.colorThemesChartFont4 = '#585B5E'
    globalThis.colorThemesChartFont6 = '#7F8286'
    globalThis.colorThemesChartFont7 = '#92969A'
    globalThis.colorThemesChartFont8 = '#A6AAAF'
    globalThis.colorThemesChartFont9 = '#B9BEC3'

    // globalThis._colorBorder10 = 
  
    globalThis.colorThemesChartGray7 = '#AAAFB4'
    globalThis.colorThemesChartStintLines = '#D2D7DC'
    globalThis.colorThemesChartSCStart = '#F9F8BE'
    globalThis.colorThemesChartSCEnd = '#B3DFC7'
    globalThis.colorThemesChartMovingAverage = '#A0A6AC'
    globalThis.colorThemesChartMovingAverageFill = '#E8EAEE'
    globalThis.colorThemesChartMovingAverageStroke = '#C0C5C9'
    globalThis.colorPlotDifferenceMeanLine = '#969BA0'
  
    globalThis.colorThemesChartChartLine1Lines = '#F4F4F5'
    globalThis.colorThemesChartChart1Line = '#D2D7DC'
  
    globalThis.colorThemesChartChartMeanComparison = '#6E7378'
    globalThis.colorThemesChartChartMeanPoly = '#6E7378'
    
    globalThis.colorThemesChartChartLineLegendNames = '#494B4D'
    globalThis.colorThemesChartChartLineLegendInfo = '#555765'
    globalThis.colorThemesChartChartLineLegendNamesWeight = 600
    globalThis.colorThemesChartChartLineLegendMarkersWeight = "'wght' 750"
    globalThis.colorThemesChartChartLineLegendMarkersColor = '#555765'

    // globalThis.colorThemesChartPlotMetricsBarGrey = '#FAFAFA'
    globalThis.colorThemesChartPlotMetricsBarGrey = '#E6EBF0'
    globalThis.colorThemesChartTablesRowFrameSelect = '#D8DEE3CC'
    globalThis.colorThemesChartAxis = '#D6DBE0'
    globalThis.colorThemesChartAxisDark = '#D2D7DC'
    globalThis.colorThemesChartAxisPoly = '#E4E8ED'
    globalThis.colorThemesChartAxisPolyDark = '#D2D7DC'
    globalThis.colorThemesChartAxisLabels = '#495057'
    globalThis.colorThemesChartAxisSubLabels = '#92969A'
    globalThis.colorThemesChartAxisRectangle = '#D6DBE0'
    globalThis.colorThemesChartGroupsDevider = '#A6AAAF'
    globalThis.colorThemesChartGridTimingActions = '#CDD2D7'
    globalThis.colorThemesChartDriverAbbsTimingActions = '#444749'
    globalThis.colorThemesChartDriverBarsTimingActions = '#969BA0'
  
    globalThis.plotMetricsAbbs = '#FFFFFF'
  
    globalThis.colorThemesChartTimingActionsLabelsWeight = "'wght' 750"
    globalThis.colorThemesChartTimingActionsDriverAbbsWeight = "'wght' 575"
    globalThis.colorThemesChartTimingActionsShadow = 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.1))'

    globalThis.colorThemesChartHBarsTitle = '#585B5E'
    globalThis.colorThemesChartTimingActionsDriverAbbsWeightHbars = "'wght' 575"
    globalThis.colorThemesChartTimingActionsTitleWeightHbars = "'wght' 700"
    globalThis.colorThemesChartTimingActionsMetricWeightHbars = "'wght' 650"

    globalThis.colorThemesChartTimingActionsGreyZoneFill = '#B9BEC3'
    globalThis.colorThemesChartTimingActionsBlueZoneFill = '#5E90D4'
    globalThis.colorThemesChartTimingActionsGreenZoneFill = '#7FFF9B'
    globalThis.colorThemesChartTimingActionsRedZoneFill = '#FF7575'
    globalThis.colorThemesChartTimingActionsPurpleZoneFill = '#8E89D4'
  
    globalThis.colorThemesChartPolyLabelWeight = "'wght' 700"
    globalThis.colorThemesChartPolySubLabelWeight = "'wght' 625"
  
    globalThis.colorThemesChart123TeammateWeight = "'wght' 725"

    globalThis.colorThemesChartAbbsLolColor = '#A6AAAF'
    globalThis.colorThemesChartStdLinesLolColor = '#E1E6EB'
    globalThis.colorThemesChartDecorLinesLolColor = '#E9EDF2'
  
    globalThis.colorThemesChartCirclesLolOpacity = 0.6
    globalThis.colorThemesChartCirclesLolStdOpacity = 0.35
  
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

    globalThis.eventPaceChart9BarsColor = '#BEC3C8'
    globalThis.eventPaceChart9BarsBorderColor = '#B0B4BA'
    globalThis.eventPaceChart9AverageColor = '#D2D7DC'

    globalThis.seasonPaceChart12PacePelotoneStroke = '#E1E1E6'
    globalThis.seasonPaceChart12MeanLineStroke = '#606060'
    globalThis.seasonPaceChart12SelectedColor = '#909090'
    globalThis.seasonPaceChart12BarsMeanLineStroke = '#DFDFDF'
    globalThis.seasonPaceChart12VarianceEqualBorder = '#707070'

    globalThis.seasonPaceLapsCountLightGrey = '#EEEEEE'

    globalThis.themeChartsColorNotActive = '#BBBBBB'

    globalThis.sliderShadowColor = '#D2D7DC'

    globalThis.eventPaceChart11ShadeCoeff = 0.5

    globalThis.seasonChart5LineWidth = px2_5
    
  } else if (themeCurrent == 'dark') {

    globalThis.chartProtocolRowHover = '#252525'

    globalThis.colorChartsFrame = '#353535'
    globalThis.colorChartsFrameWidth = 0.125

    globalThis._colorBackground = '#272727'
    globalThis._axisColor = '#353535'
    globalThis._axisColorDark = '#454545'
    globalThis._axisRadius = px18
    globalThis._ticklabelColor = '#686E73'
    globalThis._tickLineWidth = 0.0625
    globalThis._colorGrid = '#2B2B2B'
    globalThis.colorThemesChartGridDark = '#353535'
    globalThis.colorThemesChartGridLight = '#303030'
  
    globalThis.seasonRatingsTitlesHeight = 2.5
  
    globalThis.colorThemesTextOpacity = 1
    globalThis.colorThemesImgSaturation = 1
    globalThis.colorThemesChartSaturation = 0.7
  
    globalThis.colorThemesChartOpacity = 0.65
    globalThis.colorThemesChartOpacity_1 = 0.8

    globalThis.plotComparisonWidth = 28
  
    globalThis.colorThemesChartBorder = '#353535'
  
    globalThis.colorThemesChartFont1 = '#C9CCCF'
    globalThis.colorThemesChartFont2 = '#BFC2C5'
    globalThis.colorThemesChartFont3 = '#B4B8BB'
    globalThis.colorThemesChartFont4 = '#A7ABAF'
    globalThis.colorThemesChartFont6 = '#969799'
    globalThis.colorThemesChartFont7 = '#848587'
    globalThis.colorThemesChartFont8 = '#7C8288'
    globalThis.colorThemesChartFont9 = '#616263'
  
    globalThis.colorThemesChartGray7 = '#66696C'
    
    globalThis.colorThemesChartStintLines = '#585A5C'
    globalThis.colorThemesChartSCStart = '#817F65'
    globalThis.colorThemesChartSCEnd = '#435D52'
    globalThis.colorThemesChartMovingAverage = '#787B7D'
    globalThis.colorThemesChartMovingAverageFill = '#474A4C'
    globalThis.colorThemesChartMovingAverageStroke = '#585A5C'
    globalThis.colorPlotDifferenceMeanLine = '#969BA0'
  
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
    globalThis.colorThemesChartGroupsDevider = '#686E73'
    globalThis.colorThemesChartGridTimingActions = '#707070'
    globalThis.colorThemesChartDriverAbbsTimingActions = '#878C92'
    globalThis.colorThemesChartDriverBarsTimingActions = '#474A4C'
  
    globalThis.plotMetricsAbbs = '#272727'
  
    globalThis.colorThemesChartTimingActionsLabelsWeight = "'wght' 750"
    globalThis.colorThemesChartTimingActionsDriverAbbsWeight = "'wght' 700"
    globalThis.colorThemesChartTimingActionsShadow = 'drop-shadow(0.0625rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.25))'

    globalThis.colorThemesChartHBarsTitle = '#BFC2C5'
    globalThis.colorThemesChartTimingActionsDriverAbbsWeightHbars = "'wght' 575"
    globalThis.colorThemesChartTimingActionsTitleWeightHbars = "'wght' 700"
    globalThis.colorThemesChartTimingActionsMetricWeightHbars = "'wght' 650"

    globalThis.colorThemesChartTimingActionsGreyZoneFill = '#B9BEC3'
    globalThis.colorThemesChartTimingActionsGreenZoneFill = '#7FFF9B'
    globalThis.colorThemesChartTimingActionsRedZoneFill = '#FF7575'
    globalThis.colorThemesChartTimingActionsBlueZoneFill = '#5E90D4'
    globalThis.colorThemesChartTimingActionsPurpleZoneFill = '#8E89D4'
  
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
    globalThis.eventPaceChart9BarsBorderColor = '#737373'
    globalThis.eventPaceChart9AverageColor = '#505050'

    globalThis.seasonPaceChart12PacePelotoneStroke = '#424242'
    globalThis.seasonPaceChart12MeanLineStroke = '#BBBBBB'
    globalThis.seasonPaceChart12SelectedColor = '#909090'
    globalThis.seasonPaceChart12BarsMeanLineStroke = '#BBBBBB'
    globalThis.seasonPaceChart12VarianceEqualBorder = '#606060'

    globalThis.seasonPaceLapsCountLightGrey = '#454545'

    globalThis.themeChartsColorNotActive = '#BBBBBB'

    globalThis.sliderShadowColor = '#505050'

    globalThis.eventPaceChart11ShadeCoeff = 0.7

    globalThis.seasonChart5LineWidth = px2
  
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
  globalThis.px10_5 = convertRemToPixels(0.65625)
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
  globalThis.px29 = convertRemToPixels(1.8125)
  globalThis.px30 = convertRemToPixels(1.875)
  globalThis.px32 = convertRemToPixels(2)
  globalThis.px33 = convertRemToPixels(2.0625)
  globalThis.px34 = convertRemToPixels(2.125)
  globalThis.px35 = convertRemToPixels(2.1875)
  globalThis.px36 = convertRemToPixels(2.25)
  globalThis.px37 = convertRemToPixels(2.3125)
  globalThis.px40 = convertRemToPixels(2.5)
  globalThis.px42 = convertRemToPixels(2.625)
  globalThis.px44 = convertRemToPixels(2.75)
  globalThis.px45 = convertRemToPixels(2.8125)
  globalThis.px46 = convertRemToPixels(2.875)
  globalThis.px47 = convertRemToPixels(2.9375)
  globalThis.px48 = convertRemToPixels(3)
  globalThis.px49 = convertRemToPixels(3.0625)
  globalThis.px50 = convertRemToPixels(3.125)
  globalThis.px52 = convertRemToPixels(3.25)
  globalThis.px55 = convertRemToPixels(3.4375)
  globalThis.px57 = convertRemToPixels(3.5625)
  globalThis.px58 = convertRemToPixels(3.625)
  globalThis.px60 = convertRemToPixels(3.75)
  globalThis.px68 = convertRemToPixels(4.25)
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















