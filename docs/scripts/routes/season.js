const routePageSeason = {
  
  render: () => {
    return `
      <div class='onxl20 smooth-appear' id='onxl20'>

        <div class='r887wt'>

          <div class='dropdown-container z-100 ' id='v108gjrokk-container'>
            <div class='dropdown border submenu-shadow a21i8v' onclick='dropdownToggle(this, event)' id='v108gjrokk'>
              <div class='dropdown-title-container'id='v108gjrokk-title-container'>
                <div class='dropdown-title' id='v108gjrokk-title'></div>
                <div class='dropdown-caret-container'>
                  <img class='dropdown-caret' id='v108gjrokk-caret'>
                </div>
              </div>
              <div class='dropdown-menu-container closed' id='v108gjrokk-menu-container'>
                <div class='dropdown-menu closed' id='v108gjrokk-menu'></div>
              </div>
            </div>
          </div>
    
          <div class='z270vz' id='ios2a73y'>
            <div class='r7vm3d r7vm3d-race' condition='1'></div>
            <div class='r7vm3d r7vm3d-sprint' condition='0'></div>
            <div class='r7vm3d r7vm3d-both' condition='2'></div>
          </div>
    
          <div class='z270vz'>
            <div class='qpz1ck' id='qpz1ck'></div>
          </div>

          <div class='z270vz'>
            <div class='qpz1ck' id='gongko'></div>
          </div>
        
        </div>

        <div class='loader-container'>
          <div class='loader' id='loader'></div>
        </div>

        <div class='zw231x' id='zw231x'>
          <div class='djpies' id='djpies'></div>
        </div>

      </div>
    `
  }
  
}


const pageSeasonStatistics = `
  <div class='oeqei5 smooth-appear-fast' id='oeqei5'>

    <div class='xhifk1'>
      <div class='hejugj' id='hejugj'></div>
    </div>

      <div class='i026jp k19ess'>

        <div class='aoy0bl aoy0bl-1' id='season-statistics-scroll-leaders'>ЛИДЕРЫ СЕЗОНА</div>
        <div class='aoy0bl-sep aoy0bl-sep-b'></div>

        <div class='vklm1c'>

          <div class='d941lp' id='aggreagation-table-1' tableID='1'>
            <div class='d941lp-header'>
              НАЦИИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img px-05 py-05' id='driver-image-1'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='team-name-1'></div>
                <div class='d199im' id='team-metric-1'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-1'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-1'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-2' tableID='2'>
            <div class='d941lp-header'>
              ПИЛОТЫ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-2'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-2'></div>
                <div class='a625eb' id='driver-team-2'></div>
                <div class='d199im' id='driver-metric-2'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-2'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-2'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-3' tableID='3'>
            <div class='d941lp-header'>
              КОНСТРУКТОРЫ
            </div>
            <div class='w868xu'>
              <div class='driver-image d941lp-img'>
                <img class='o658be' id='driver-image-3'>
              </div>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='team-name-3'></div>
                <div class='a625eb' id='team-constructor-3'></div>
                <div class='d199im' id='team-metric-3'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-3'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-3'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-4' tableID='4'>
            <div class='d941lp-header'>
              ПРОИЗВОДИТЕЛИ
            </div>
            <div class='w868xu'>
              <div class='driver-image d941lp-img'>
                <img class='o658be' id='driver-image-4'>
              </div>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='team-name-4'></div>
                <div class='d199im' id='team-metric-4'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-4'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-4'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='vklm1c'>

          <div class='d941lp' id='aggreagation-table-23' tableID='23'>
            <div class='d941lp-header'>
              ПОБЕДЫ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-23'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-23'></div>
                <div class='a625eb' id='driver-team-23'></div>
                <div class='d199im' id='driver-metric-23'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-23'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-23'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-24' tableID='24'>
            <div class='d941lp-header'>
              ПОДИУМЫ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-24'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-24'></div>
                <div class='a625eb' id='driver-team-24'></div>
                <div class='d199im' id='driver-metric-24'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-24'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-24'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-25' tableID='25'>
            <div class='d941lp-header'>
              ВТОРЫЕ МЕСТА
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-25'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-25'></div>
                <div class='a625eb' id='driver-team-25'></div>
                <div class='d199im' id='driver-metric-25'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-25'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-25'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-26' tableID='26'>
            <div class='d941lp-header'>
              ТРЕТЬИ МЕСТА
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-26'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-26'></div>
                <div class='a625eb' id='driver-team-26'></div>
                <div class='d199im' id='driver-metric-26'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-26'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-26'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='vklm1c'>

          <div class='d941lp' id='aggreagation-table-27' tableID='27'>
            <div class='d941lp-header'>
              ПОУЛ-ПОЗИЦИИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-27'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-27'></div>
                <div class='a625eb' id='driver-team-27'></div>
                <div class='d199im' id='driver-metric-27'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-27'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-27'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-28' tableID='28'>
            <div class='d941lp-header'>
              КВАЛИФИКАЦИЯ ВЫШЕ ПАРТНЕРА
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-28'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-28'></div>
                <div class='a625eb' id='driver-team-28'></div>
                <div class='d199im' id='driver-metric-28'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-28'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-28'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-31' tableID='31'>
            <div class='d941lp-header'>
              ФИНИШ ВЫШЕ ПАРТНЕРА
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-31'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-31'></div>
                <div class='a625eb' id='driver-team-31'></div>
                <div class='d199im' id='driver-metric-31'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-31'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-31'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-29' tableID='29'>
            <div class='d941lp-header'>
              КРУГИ ЛИДИРОВАНИЯ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-29'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-29'></div>
                <div class='a625eb' id='driver-team-29'></div>
                <div class='d199im' id='driver-metric-29'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-29'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-29'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='aoy0bl-sep aoy0bl-sep-t' id='season-statistics-scroll-overtakes'></div>
        <div class='aoy0bl'>БОРЬБА НА ТРАССЕ</div>
        <div class='aoy0bl-sep aoy0bl-sep-b'></div>

        <div class='vklm1c'>

          <div class='d941lp' id='aggreagation-table-5' tableID='5'>
            <div class='d941lp-header'>
              ЧИСТЫЕ ОБГОНЫ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-5'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-5'></div>
                <div class='a625eb' id='driver-team-5'></div>
                <div class='d199im' id='driver-metric-5'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-5'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-5'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-6' tableID='6'>
            <div class='d941lp-header'>
              ОБГОНЫ МИНУС ПОТЕРИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-6'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-6'></div>
                <div class='a625eb' id='driver-team-6'></div>
                <div class='d199im' id='driver-metric-6'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-6'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-6'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-7' tableID='7'>
            <div class='d941lp-header'>
              ПРОЦЕНТ ОБГОНОВ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-7'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-7'></div>
                <div class='a625eb' id='driver-team-7'></div>
                <div class='d199im' id='driver-metric-7'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-7'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-7'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-8' tableID='8'>
            <div class='d941lp-header'>
              ЧИСТЫЕ ПОТЕРИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-8'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-8'></div>
                <div class='a625eb' id='driver-team-8'></div>
                <div class='d199im' id='driver-metric-8'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-8'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-8'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='aoy0bl-sep aoy0bl-sep-t' id='season-statistics-scroll-start'></div>
        <div class='aoy0bl'>ДЕЙСТВИЯ НА СТАРТЕ</div>
        <div class='aoy0bl-sep aoy0bl-sep-b'></div>

        <div class='vklm1c'>
        
          <div class='d941lp' id='aggreagation-table-9' tableID='9'>
            <div class='d941lp-header'>
              ОБГОНЫ НА СТАРТЕ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-9'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-9'></div>
                <div class='a625eb' id='driver-team-9'></div>
                <div class='d199im' id='driver-metric-9'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-9'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-9'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-10' tableID='10'>
            <div class='d941lp-header'>
              ОБГОНЫ МИНУС ПОТЕРИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-10'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-10'></div>
                <div class='a625eb' id='driver-team-10'></div>
                <div class='d199im' id='driver-metric-10'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-10'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-10'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-11' tableID='11'>
            <div class='d941lp-header'>
              ПРОЦЕНТ ОБГОНОВ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-11'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-11'></div>
                <div class='a625eb' id='driver-team-11'></div>
                <div class='d199im' id='driver-metric-11'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-11'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-11'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-12' tableID='12'>
            <div class='d941lp-header'>
              ПОТЕРИ НА СТАРТЕ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-12'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-12'></div>
                <div class='a625eb' id='driver-team-12'></div>
                <div class='d199im' id='driver-metric-12'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-12'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-12'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='aoy0bl-sep aoy0bl-sep-t' id='season-statistics-scroll-cards'></div>
        <div class='aoy0bl'>КАРТОЧКИ ПО ИТОГАМ ГРАН-ПРИ</div>
        <div class='aoy0bl-sep aoy0bl-sep-b'></div>

        <div class='vklm1c'>
        
          <div class='d941lp' id='aggreagation-table-13' tableID='13'>
            <div class='d941lp-header'>
              ВСЕГО КАРТОЧЕК
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-13'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-13'></div>
                <div class='a625eb' id='driver-team-13'></div>
                <div class='d199im' id='driver-metric-13'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-13'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-13'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-17' tableID='17'>
            <div class='d941lp-header'>
              ГРАН-ПРИ С КАРТОЧКАМИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-17'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-17'></div>
                <div class='a625eb' id='driver-team-17'></div>
                <div class='d199im' id='driver-metric-17'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-17'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-17'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-14' tableID='14'>
            <div class='d941lp-header'>
              КАРТОЧЕК ЗА СУММАРНЫЕ БАЛЛЫ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-14'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-14'></div>
                <div class='a625eb' id='driver-team-14'></div>
                <div class='d199im' id='driver-metric-14'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-14'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-14'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-30' tableID='30'>
            <div class='d941lp-header'>
              БОЛЕЕ ОДНОЙ ЗА ГРАН-ПРИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-30'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-30'></div>
                <div class='a625eb' id='driver-team-30'></div>
                <div class='d199im' id='driver-metric-30'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-30'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-30'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='vklm1c'>

          <div class='d941lp' id='aggreagation-table-15' tableID='15'>
            <div class='d941lp-header'>
              КАРТОЧЕК ЗА ПЛОТНОСТЬ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-15'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-15'></div>
                <div class='a625eb' id='driver-team-15'></div>
                <div class='d199im' id='driver-metric-15'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-15'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-15'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-16' tableID='16'>
            <div class='d941lp-header'>
              КАРТОЧЕК ЗА ТЕМП
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-16'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-16'></div>
                <div class='a625eb' id='driver-team-16'></div>
                <div class='d199im' id='driver-metric-16'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-16'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-16'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-18' tableID='18'>
            <div class='d941lp-header'>
              КАРТОЧЕК ЗА СТАРТ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-18'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-18'></div>
                <div class='a625eb' id='driver-team-18'></div>
                <div class='d199im' id='driver-metric-18'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-18'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-18'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-19' tableID='19'>
            <div class='d941lp-header'>
              КАРТОЧЕК ЗА ОБГОНЫ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-19'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-19'></div>
                <div class='a625eb' id='driver-team-19'></div>
                <div class='d199im' id='driver-metric-19'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-19'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-19'></ul>
                </div>
              </div>
            </div>
          </div>
        
        </div>

        <div class='aoy0bl-sep aoy0bl-sep-t' id='season-statistics-scroll-mistakes'></div>
        <div class='aoy0bl'>КАЧЕСТВО ПИЛОТИРОВАНИЯ</div>
        <div class='aoy0bl-sep aoy0bl-sep-b'></div>

        <div class='vklm1c'>

          <div class='d941lp' id='aggreagation-table-21' tableID='21'>
            <div class='d941lp-header'>
              ПОТЕРИ НА КРУГЕ ИЗ-ЗА ОШИБОК
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-21'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-21'></div>
                <div class='a625eb' id='driver-team-21'></div>
                <div class='d199im' id='driver-metric-21'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-21'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-21'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-20' tableID='20'>
            <div class='d941lp-header ls-0 pe-1'>
              ВЕРОЯТНОСТЬ ОШИБКИ НА КРУГЕ, %
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-20'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-20'></div>
                <div class='a625eb' id='driver-team-20'></div>
                <div class='d199im' id='driver-metric-20'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-20'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-20'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp' id='aggreagation-table-22' tableID='22'>
            <div class='d941lp-header'>
              В СРЕДНЕМ ЗА ГРАН-ПРИ
            </div>
            <div class='w868xu'>
              <img class='driver-image d941lp-img' id='driver-image-22'>
              <div class='d941lp-driver-name'>
                <div class='j811zh' id='driver-name-22'></div>
                <div class='a625eb' id='driver-team-22'></div>
                <div class='d199im' id='driver-metric-22'></div>
              </div>
            </div>
            <div class='d941lp-body'>
              <div class='d941lp-list'>
                <div class='row-80 flex justify-content-start'>
                  <ol class='aggregation-list' id='aggregation-elements-22'></ol>
                </div>
                <div class='row-20 flex justify-content-end'>
                  <ul class='aggregation-list-values' id='aggregation-values-22'></ul>
                </div>
              </div>
            </div>
          </div>

          <div class='d941lp-empty' id='' tableID=''></div>
        
        </div>
      
      </div>


    
  </div>
`


const pageSeasonCategories = `

  <div class='bkyv96 smooth-appear-fast' id='bkyv96'>

    <div class='j530fy'>

      <div class='i026jp'>

        <div class='so316o'>
          <div class='my364j' id='txmcmw286p'></div>
        </div>

      </div>

      <div class='i026jp hm471b'>

        

        <div class='i026jp-legend s602nh'>

          <div class='icon-c'>
            <img class='refresh-img' id='b279kymgiw'>
          </div>

          <div class='dropdown-container s415jf' id='dropdown-1-2-container'>
            <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-2'>
              <div class='dropdown-title-container' id='dropdown-1-2-title-container'>
                <div class='dropdown-title' id='dropdown-1-2-title'></div>
                <div class='dropdown-caret-container'>
                  <img class='dropdown-caret' id='dropdown-1-2-caret'>
                </div>
              </div>
              <div class='dropdown-menu-container closed' id='dropdown-1-2-menu-container'>
                <div class='dropdown-menu closed' id='dropdown-1-2-menu'></div>
              </div>
            </div>
          </div>

          <div class='i026jp-name x397ra'>
            <div>ПОЛОЖЕНИЕ В РЕЙТИНГЕ И СТАТИСТИКА ПО ВЫБРАННОЙ КАТЕГОРИИ</div>
            <div class='be951t'></div>
            <div class='download-b' onclick='downloadButtonMouseUp(this.id)' id='k014qvimnz'>
              <img class='download-b-img' id='k014qvimnz-img'>
              <div class='download-b-menu download-b-menu-left invisible' id='k014qvimnz-menu'>
                <div class='download-b-item' download_id='chart-line-1' id='k014qvimnz-svg'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                <div class='download-b-item'download_id='chart-line-1' id='k014qvimnz-png'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
              </div>
            </div>
            
          </div>
        
        </div>

        <div class='i026jp-body vm531e'>

          <div class='o155kh'>

            <div class='j030ej' id='a149oarcfq'>
              <img class='driver-image qk695j' id='j348owxteq'>
              <div class='vv178p'>
                <div class='qf146f' id='mzruhd844j'></div>
                <div class='ml847r'>
                  <div class='' id='gakflf906c'></div>
                  <div class='ms-025' id='swqoyq237y'></div>
                </div>
              </div>
            </div>

            <div class='c645vk'>
            
              <div class='vv532d r927yy'>
                <div class='vv532d-title uppercase' id='x704uxitom'></div>
                <div class='vv532d-body s795jf'>
                  <div class='c633ft'>
                    <div class='vv532d-row'>
                      <div class='vv532d-subtitle'>
                        СРЕДНЕЕ ЗНАЧЕНИЕ
                      </div>
                      <div class='vv532d-value' id='n132fexzir'></div>
                    </div>
                    <div class='vv532d-h-sep'></div>
                    <div class='vv532d-row'>
                      <div class='vv532d-subtitle'>
                        ОБЩИЙ ЗАЧЕТ
                      </div>
                      <div class='vv532d-value' id='p705oykoba'></div>
                    </div>
                  </div>
                  <div class='vv532d-v-sep'></div>
                  <div class='c633ft'>
                    <div class='vv532d-row'>
                      <div class='vv532d-subtitle'>
                        ЛУЧШЕЕ ЗНАЧЕНИЕ
                      </div>
                      <div class='vv532d-value'></div>
                    </div>
                    <div class='vv532d-h-sep'></div>
                    <div class='vv532d-row'>
                      <div class='vv532d-subtitle'>
                        ХУДШЕЕ ЗНАЧЕНИЕ
                      </div>
                      <div class='vv532d-value'></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
          
          <div class='l235md'>
            <div class='q725ia k012cw'>СТАТИСТИКА В СЕЗОНЕ</div>
          </div>

          <div class='yx474t'>

            <div class='vv532d nb486d'>
              <div class='vv532d-title'>КАРТОЧКИ</div>
              <div class='vv532d-body'>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>ВСЕГО КАРТОЧЕК</div>
                  <div class='vv532d-value' id='wbihnw145l'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>ЗА СУММАРНЫЕ БАЛЛЫ</div>
                  <div class='vv532d-value' id='altrig218m'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>ГРАН-ПРИ С КАРТОЧКАМИ</div>
                  <div class='vv532d-value' id='ydhsxa435r'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>БОЛЕЕ ОДНОЙ ЗА ГРАН-ПРИ</div>
                  <div class='vv532d-value' id='pqbrbv072h'></div>
                </div>
              </div>
            </div>

            <div class='vv532d nb486d'>
              <div class='vv532d-title'>КАРТОЧКИ ПО КАТЕГОРИЯМ</div>
              <div class='vv532d-body'>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>ПЛОТНОСТЬ</div>
                  <div class='vv532d-value' id='niqqjs031y'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>СРЕДНИЙ ТЕМП</div>
                  <div class='vv532d-value' id='uniqmx354x'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>СТАРТ</div>
                  <div class='vv532d-value' id='iufibr592u'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row'>
                  <div class='vv532d-subtitle'>ОБГОНЫ</div>
                  <div class='vv532d-value' id='vromcp014d'></div>
                </div>
              </div>
            </div>

            <div class='vv532d nb486d'>
              <div class='vv532d-title'>КАЧЕСТВО ПИЛОТИРОВАНИЯ</div>
              <div class='vv532d-body col-v-stretch'>
                <div class='vv532d-row col-v-stretch'>
                  <div class='vv532d-subtitle'>ПОТЕРИ НА КРУГЕ</div>
                  <div class='vv532d-value xl679h' id='qrpnsb847q'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row col-v-stretch'>
                  <div class='vv532d-subtitle'>ВЕРОЯТНОСТЬ ОШИБКИ НА КРУГЕ</div>
                  <div class='vv532d-value fl532l' id='jknjzd938s'></div>
                </div>
                <div class='vv532d-h-sep'></div>
                <div class='vv532d-row col-v-stretch'>
                  <div class='vv532d-subtitle'>В СРЕДНЕМ ЗА ГРАН-ПРИ</div>
                  <div class='vv532d-value fl532l' id='agyuzj711f'></div>
                </div>
              </div>
            </div>

          </div>

          <div class='l235md'>
            <div class='q725ia k012cw'>ДИНАМИКА ПО ВЫБРАННОЙ КАТЕГОРИИ</div>
          </div>

          <div class='is229g' >
            <div class='d3-chart' id='chart-season-rating-line'></div>
          </div>
        
        </div>
      
      </div>
    
    </div>

  </div>

`


const pageSeasonComparison = `

  <div class='q4z5nn smooth-appear-fast' id='q4z5nn'>

    <div class='a63icc'>

      <div class='e9g58e'>
        <div class='dropdown-container' id='dropdown-1-3-left-container'>
          <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-3-left'>
            <div class='dropdown-title-container' id='dropdown-1-3-left-title-container'>
              <div class='dropdown-title' id='dropdown-1-3-left-title'></div>
              <div class='dropdown-caret-container'>
                <img class='dropdown-caret' id='dropdown-1-3-left-caret'>
              </div>
            </div>
            <div class='dropdown-menu-container closed' id='dropdown-1-3-left-menu-container'>
              <div class='dropdown-menu closed' id='dropdown-1-3-left-menu'></div>
            </div>
          </div>
        </div>
      </div>

      <div class='dropdown-b' onclick='dropdown13CenterNavMouseUp(this)' nav_kind='b' dropdown_id='dropdown-1-3-center'>
        <img class='dropdown-b-icon'>
      </div>

      <div class='dropdown-container' id='dropdown-1-3-center-container'>
        <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-3-center'>
          <div class='dropdown-title-container' id='dropdown-1-3-center-title-container'>
            <div class='dropdown-title' id='dropdown-1-3-center-title'></div>
            <div class='dropdown-caret-container'>
              <img class='dropdown-caret' id='dropdown-1-3-center-caret'>
            </div>
          </div>
          <div class='dropdown-menu-container closed' id='dropdown-1-3-center-menu-container'>
            <div class='dropdown-menu closed' id='dropdown-1-3-center-menu'></div>
          </div>
        </div>
      </div>

      <div class='dropdown-f' onclick='dropdown13CenterNavMouseUp(this)' nav_kind='f' dropdown_id='dropdown-1-3-center'>
        <img class='dropdown-f-icon'>
      </div>

      <div class='aoktu6'>
        <div class='dropdown-container' id='dropdown-1-3-right-container'>
          <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-3-right'>
            <div class='dropdown-title-container' id='dropdown-1-3-right-title-container'>
              <div class='dropdown-title' id='dropdown-1-3-right-title'></div>
              <div class='dropdown-caret-container'>
                <img class='dropdown-caret' id='dropdown-1-3-right-caret'>
              </div>
            </div>
            <div class='dropdown-menu-container closed' id='dropdown-1-3-right-menu-container'>
              <div class='dropdown-menu closed' id='dropdown-1-3-right-menu'></div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class='cveeq7'>

      <div class='xzd4pe'>
        <div class='flex-column j-start img-3-size-container mt-05'>
          <div class='row-100 flex-column flex error-message' id='season-drivers-driver-left-no-data'>
            <div class='row-100 he-1 fs-085'>Отсутствуют данные участия</div>
            <div class='row-100 he-1 fs-085' id='season-drivers-driver-left-no-data-info'></div>
            <div class='row-100 he-1 fs-085' id='season-drivers-driver-left-no-data-info'>этого сезона</div>
          </div>
          <div class='flex mt-15'>
            <div class='driver-image img-3' id='image-season-drivers-left'><img class='image-shell'></div>
          </div>
          <div class='dn725-6 a3pmj0' id='johdbb'></div>
          <div class='ku2tuj fs-1' id='fnj4j6'></div>
        </div>
      </div>
      
      <div class='cbfauf'>
        <div class='d3-chart' id='chart-season-drivers-hbar-1'></div>
      </div>
      
      <div class='xzd4pe'>
        <div class='flex-column j-start img-3-size-container mt-05'>
          <div class='row-100 flex-column flex error-message' id='season-drivers-driver-right-no-data'>
            <div class='row-100 he-1 fs-085'>Отсутствуют данные участия</div>
            <div class='row-100 he-1 fs-085' id='season-drivers-driver-right-no-data-info'></div>
            <div class='row-100 he-1 fs-085' id='season-drivers-driver-right-no-data-info'>этого сезона</div>
          </div>
          <div class='flex mt-15'>
            <div class='driver-image img-3' id='image-season-drivers-right'><img class='image-shell'></div>
          </div>
          <div class='dn725-6 a3pmj0' id='fvcznc'></div>
          <div class='ku2tuj fs-1' id='x12eym'></div>
        </div>
      </div>
    
    </div>

    <div class='c542ey'>

      <div class='i026jp c919dg' id='kzcayqv8'>

        
  
        <div class='i026jp-legend ps-05'>

          <img class='refresh-img' id='llbmuz445w'>  
          <div class='bj976p ms-075'></div>
          <div id='qpwxso1e'></div>
          
          <div class='bj976p'></div>

          <div class='dropdown' onclick='dropdownToggle(this, event)' id='dropdown-1-4'>
            <div class='dropdown-title' id='dropdown-1-4-title'></div>
            <img class='dropdown-caret' id='dropdown-1-4-caret'>
            <div class='dropdown-menu-container closed' id='dropdown-1-4-menu-container'>
              <div class='dropdown-menu closed' id='dropdown-1-4-menu'></div>
            </div>
          </div>

          <div class='wzg063'>
            <div class='eicvly'>
              <div id='x5q9m3t0'></div>
              <div class='mx-05'>-</div>
              <div id='b9tuvti6'></div>
            </div>
          </div>
  
          <div class='i026jp-name gm499o'>
            <div>ДИНАМИКА ВЫБРАННОГО ПОКАЗАТЕЛЯ</div>
            <div class='be951t'></div>
            <div class='download-b' onclick='downloadButtonMouseUp(this.id)' id='f222yfjwuv'>
              <img class='download-b-img'>
              <div class='download-b-menu download-b-multiline invisible' id='f222yfjwuv-menu'>
                <div>
                  <div class='download-b-multiline-name' id='f222yfjwuv-name-both'>ОБА ГРАФИКА</div>
                  <div class='download-b-multiline-sep'></div>
                  <div class='download-b-item download-b-item-h' download_id='chart-5-iaem6t-2' id='f222yfjwuv-svg-both'
                    onclick='seasonComparisonDownloadAllCharts(this.id, event);' download_type='svg'>SVG</div>
                  <div class='download-b-item download-b-item-h' download_id='chart-5-iaem6t-2' id='f222yfjwuv-png-both'
                    onclick='seasonComparisonDownloadAllCharts(this.id, event);' download_type='png'>PNG</div>
                </div>
                <div class='download-b-multiline-sep-h'></div>
                <div>
                  <div class='download-b-multiline-name' id='f222yfjwuv-name-chart'>ТОЛЬКО ВЕРХНИЙ</div>
                  <div class='download-b-multiline-sep'></div>
                  <div class='download-b-item download-b-item-h' download_id='chart-5-iaem6t-1' id='f222yfjwuv-svg-chart'
                    onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                  <div class='download-b-item download-b-item-h' download_id='chart-5-iaem6t-1' id='f222yfjwuv-png-chart'
                    onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
                </div>
                <div>
                  <div class='download-b-multiline-name' id='f222yfjwuv-name-diff'>ТОЛЬКО НИЖНИЙ</div>
                  <div class='download-b-multiline-sep'></div>
                  <div class='download-b-item download-b-item-h' download_id='chart-5-iaem6t-2' id='f222yfjwuv-svg-diff'
                    onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                  <div class='download-b-item download-b-item-h' download_id='chart-5-iaem6t-2' id='f222yfjwuv-png-diff'
                    onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
                </div>
                
              </div>
            </div>
            
          </div>
      
        </div>
  
        <div class='i026jp-body w474mr'>
  
          <div class='d3-chart p-relative' id='chart-1'></div>
  
          <div class='i026jp-legend i026jp-legend-b wm850b'>
  
            <div class='li789z'>
    
              <div class='l5ddxl'>
                <div class='egjfs3' id='prfvd03t' name='title-6'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-int ix902a-end' id='poh691a2'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-int ix902a-start' id='fevtnh98'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='rbjthadn'></div>
                </div>
              </div>
    
              <div class='l5ddxl' id='mdfm1icc'>
                <div class='egjfs3' id='vcgkxxa7' name='title-5'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-int ix902a-end' id='zmhbodlq'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-int ix902a-start' id='a1kaelds'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='fl0hw0vb'></div>
                </div>
                
              </div>
    
              <div class='l5ddxl'>
                <div class='egjfs3' id='y045ulke' name='title-1'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-int ix902a-end' id='uw1q4ud4'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-int ix902a-start' id='br6xybkp'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='tvyu31si'></div>
                </div>
                
              </div>
    
              <div class='l5ddxl'>
                <div class='egjfs3' id='wm13qbey' name='title-0'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-dec ix902a-end' id='say2l7si'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-dec ix902a-start' id='t1b0x3rl'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='uk07khe1'></div>
                </div>
                
              </div>
    
              <div class='l5ddxl' id='gwvucfux'>
                <div class='egjfs3' id='t8aily60' name='title-4'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-dec ix902a-end' id='pcwkmynh'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-dec ix902a-start' id='fzm00ouo'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='jebq2drs'></div>
                </div>
              </div>
    
              <div class='l5ddxl'>
                <div class='egjfs3' id='zeqq0liw' name='title-2'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-int ix902a-end' id='o7c4nc5c'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-int ix902a-start' id='a2240qhn'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='spcmgfl7'></div>
                </div>
                
              </div>
    
              <div class='l5ddxl'>
                <div class='egjfs3' id='j4f2osp8' name='title-3'></div>
                <div class='kx129y'>
                  <div class='rb8zm6'>
                    <div class='e336wp e336wp-dec ix902a-end' id='ld617048'></div>
                    <div class='bu750c'>:</div>
                    <div class='e336wp e336wp-dec ix902a-start' id='rx7k86gw'></div>
                  </div>
                  <div class='ob484i'></div>
                  <div class='yt2rsa' id='gg578ded'></div>
                </div>
              </div>
            
            </div>
          
          </div>
  
        </div>
      
      </div>

      <div class='i026jp l809vs' id='jfe7zgfw'>

        <div class='i026jp-legend ps-4'>
  
          <div id='s110rrejtm'></div>
  
          <div class='i026jp-name'>
  
            <div id='a716jzrcau'></div>
      
          </div>
      
        </div>
  
        <div class='i026jp-body y599sy'>
  
          <div class='col-h-stretch a-start'>
            <div class='f500qo'>
              <div class='f500qo-header'>
                СТАРТОВЫЕ ПОЗИЦИИ
              </div>
              <div class='u629rm'>
                <div class='j712sk' id='v669okzufp'>
                  <div class='j712sk-header' id='v669okzufp-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='v669okzufp-value-left'></div>
                    <svg class='j712sk-svg' id='v669okzufp-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='v669okzufp-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='v669okzufp-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='v669okzufp-point' />
                    </svg>
                    <div class='j712sk-value-right' id='v669okzufp-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='x805foaqnk'>
                  <div class='j712sk-header' id='x805foaqnk-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='x805foaqnk-value-left'></div>
                    <svg class='j712sk-svg' id='x805foaqnk-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='x805foaqnk-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='x805foaqnk-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='x805foaqnk-point' />
                    </svg>
                    <div class='j712sk-value-right' id='x805foaqnk-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='i638czxnhj'>
                  <div class='j712sk-header' id='i638czxnhj-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='i638czxnhj-value-left'></div>
                    <svg class='j712sk-svg' id='i638czxnhj-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='i638czxnhj-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='i638czxnhj-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='i638czxnhj-point' />
                    </svg>
                    <div class='j712sk-value-right' id='i638czxnhj-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='p109btocei'>
                  <div class='j712sk-header' id='p109btocei-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='p109btocei-value-left'></div>
                    <svg class='j712sk-svg' id='p109btocei-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='p109btocei-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='p109btocei-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='p109btocei-point' />
                    </svg>
                    <div class='j712sk-value-right' id='p109btocei-value-right'></div>
                  </div>
                </div>
              </div>
            </div>
            <div class='f500qo'>
              <div class='f500qo-header'>
                РЕЙТИНГ
              </div>
              <div class='u629rm'>
                <div class='j712sk' id='t315vgpprd'>
                  <div class='j712sk-header' id='t315vgpprd-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='t315vgpprd-value-left'></div>
                    <svg class='j712sk-svg' id='t315vgpprd-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='t315vgpprd-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='t315vgpprd-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='t315vgpprd-point' />
                    </svg>
                    <div class='j712sk-value-right' id='t315vgpprd-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='z091ddgrxe'>
                  <div class='j712sk-header' id='z091ddgrxe-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='z091ddgrxe-value-left'></div>
                    <svg class='j712sk-svg' id='z091ddgrxe-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='z091ddgrxe-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='z091ddgrxe-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='z091ddgrxe-point' />
                    </svg>
                    <div class='j712sk-value-right' id='z091ddgrxe-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='a786jtcbuk'>
                  <div class='j712sk-header' id='a786jtcbuk-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='a786jtcbuk-value-left'></div>
                    <svg class='j712sk-svg' id='a786jtcbuk-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='a786jtcbuk-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='a786jtcbuk-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='a786jtcbuk-point' />
                    </svg>
                    <div class='j712sk-value-right' id='a786jtcbuk-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='x951psjrpt'>
                  <div class='j712sk-header' id='x951psjrpt-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='x951psjrpt-value-left'></div>
                    <svg class='j712sk-svg' id='x951psjrpt-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='x951psjrpt-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='x951psjrpt-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='x951psjrpt-point' />
                    </svg>
                    <div class='j712sk-value-right' id='x951psjrpt-value-right'></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class='f500qo'>
              <div class='f500qo-header'>
                ФИНИШНЫЕ ПОЗИЦИИ
              </div>
              <div class='u629rm'>
                <div class='j712sk' id='b675jgxtfy'>
                  <div class='j712sk-header' id='b675jgxtfy-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='b675jgxtfy-value-left'></div>
                    <svg class='j712sk-svg' id='b675jgxtfy-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='b675jgxtfy-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='b675jgxtfy-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='b675jgxtfy-point' />
                    </svg>
                    <div class='j712sk-value-right' id='b675jgxtfy-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='r100rxtsck'>
                  <div class='j712sk-header' id='r100rxtsck-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='r100rxtsck-value-left'></div>
                    <svg class='j712sk-svg' id='r100rxtsck-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='r100rxtsck-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='r100rxtsck-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='r100rxtsck-point' />
                    </svg>
                    <div class='j712sk-value-right' id='r100rxtsck-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='h711lohydb'>
                  <div class='j712sk-header' id='h711lohydb-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='h711lohydb-value-left'></div>
                    <svg class='j712sk-svg' id='h711lohydb-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='h711lohydb-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='h711lohydb-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='h711lohydb-point' />
                    </svg>
                    <div class='j712sk-value-right' id='h711lohydb-value-right'></div>
                  </div>
                </div>
                <div class='j712sk' id='b191ecmnvf'>
                  <div class='j712sk-header' id='b191ecmnvf-title'></div>
                  <div class='j712sk-body'>
                    <div class='j712sk-value-left' id='b191ecmnvf-value-left'></div>
                    <svg class='j712sk-svg' id='b191ecmnvf-svg'>
                      <line class='j712sk-line-left' y1='50%' y2='50%' id='b191ecmnvf-line-left' />
                      <line class='j712sk-line-right' y1='50%' y2='50%' id='b191ecmnvf-line-right'/>
                      <circle class='j712sk-point' cy='50%' id='b191ecmnvf-point' />
                    </svg>
                    <div class='j712sk-value-right' id='b191ecmnvf-value-right'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='t849an'>
            <div class='f500qo'>
              <div class='f500qo-header'>
                В СРАВНЕНИИ СО СВОИМ НАПАРНИКОМ
              </div>
              <div class='i417qa'>
                <div class='u629rm'>
                  <div class='j712sk' id='p135cwurbf'>
                    <div class='j712sk-header' id='p135cwurbf-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='p135cwurbf-value-left'></div>
                      <svg class='j712sk-svg' id='p135cwurbf-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='p135cwurbf-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='p135cwurbf-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='p135cwurbf-point' />
                      </svg>
                      <div class='j712sk-value-right' id='p135cwurbf-value-right'></div>
                    </div>
                  </div>
                  <div class='j712sk' id='s167yfxghb'>
                    <div class='j712sk-header' id='s167yfxghb-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='s167yfxghb-value-left'></div>
                      <svg class='j712sk-svg' id='s167yfxghb-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='s167yfxghb-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='s167yfxghb-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='s167yfxghb-point' />
                      </svg>
                      <div class='j712sk-value-right' id='s167yfxghb-value-right'></div>
                    </div>
                  </div>
                  <div class='j712sk' id='e362yelibv'>
                    <div class='j712sk-header' id='e362yelibv-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='e362yelibv-value-left'></div>
                      <svg class='j712sk-svg' id='e362yelibv-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='e362yelibv-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='e362yelibv-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='e362yelibv-point' />
                      </svg>
                      <div class='j712sk-value-right' id='e362yelibv-value-right'></div>
                    </div>
                  </div>
                </div>
                <div class='u629rm'>
                  <div class='j712sk' id='c720moeapf'>
                    <div class='j712sk-header' id='c720moeapf-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='c720moeapf-value-left'></div>
                      <svg class='j712sk-svg' id='c720moeapf-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='c720moeapf-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='c720moeapf-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='c720moeapf-point' />
                      </svg>
                      <div class='j712sk-value-right' id='c720moeapf-value-right'></div>
                    </div>
                  </div>
                  <div class='j712sk' id='x292yelfdj'>
                    <div class='j712sk-header' id='x292yelfdj-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='x292yelfdj-value-left'></div>
                      <svg class='j712sk-svg' id='x292yelfdj-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='x292yelfdj-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='x292yelfdj-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='x292yelfdj-point' />
                      </svg>
                      <div class='j712sk-value-right' id='x292yelfdj-value-right'></div>
                    </div>
                  </div>
                  <div class='j712sk' id='e517daafis'>
                    <div class='j712sk-header' id='e517daafis-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='e517daafis-value-left'></div>
                      <svg class='j712sk-svg' id='e517daafis-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='e517daafis-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='e517daafis-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='e517daafis-point' />
                      </svg>
                      <div class='j712sk-value-right' id='e517daafis-value-right'></div>
                    </div>
                  </div>
                  <div class='j712sk' id='e306owawrc'>
                    <div class='j712sk-header' id='e306owawrc-title'></div>
                    <div class='j712sk-body'>
                      <div class='j712sk-value-left' id='e306owawrc-value-left'></div>
                      <svg class='j712sk-svg' id='e306owawrc-svg'>
                        <line class='j712sk-line-left' y1='50%' y2='50%' id='e306owawrc-line-left' />
                        <line class='j712sk-line-right' y1='50%' y2='50%' id='e306owawrc-line-right'/>
                        <circle class='j712sk-point' cy='50%' id='e306owawrc-point' />
                      </svg>
                      <div class='j712sk-value-right' id='e306owawrc-value-right'></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class='h138ej'>
                <div class='uxz5um'>* ОБА ПРИНЯЛИ УЧАСТИЕ В КВАЛИФИКАЦИИ</div>
                <div class='v-line my-025'></div>
                <div class='uxz5um'>** ОБА ФИНИШИРОВАЛИ</div>
                <div class='v-line my-025'></div>
                <div class='uxz5um'>*** ПРОЙДЕНО БОЛЕЕ 50% ДИСТАНЦИИ</div>
              </div>
            </div>
          </div>
      
        </div>
      
      </div>
    
    </div>

    <div class='dw-multiple-charts-c'>
      <svg class='dw-multiple-charts' id='a718mfzugd'></svg>
    </div>

  </div>

`


const pageSeasonPace = `

  <div class='kgh9j9 smooth-appear-fast' id='kgh9j9'>

    <div class='gmajf6'>

      <div class='i026jp pn760o'>

        

        <div class='i026jp-legend k696et'>

          <div class='dropdown-b' onclick='dropdown15NavMouseUp(this)' nav_kind='b' dropdown_id='dropdown-1-5'>
            <img class='dropdown-b-icon'>
          </div>

          <div class='dropdown-container' id='dropdown-1-5-container'>
            <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-5'>
              <div class='dropdown-title-container' id='dropdown-1-5-title-container'>
                <div class='dropdown-title' id='dropdown-1-5-title'></div>
                <div class='dropdown-caret-container'>
                  <img class='dropdown-caret' id='dropdown-1-5-caret'>
                </div>
              </div>
              <div class='dropdown-menu-container closed' id='dropdown-1-5-menu-container'>
                <div class='dropdown-menu closed' id='dropdown-1-5-menu'></div>
              </div>
            </div>
          </div>

          <div class='dropdown-f' onclick='dropdown15NavMouseUp(this)' nav_kind='f' dropdown_id='dropdown-1-5'>
            <img class='dropdown-f-icon'>
          </div>
    
          <div class='s998vc'></div>

          <div class='dropdown-container' id='dropdown-1-6-container'>
            <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-6'>
              <div class='dropdown-title-container' id='dropdown-1-6-title-container'>
                <div class='dropdown-title' id='dropdown-1-6-title'></div>
                <div class='dropdown-caret-container'>
                  <img class='dropdown-caret' id='dropdown-1-6-caret'>
                </div>
              </div>
              <div class='dropdown-menu-container left closed' id='dropdown-1-6-menu-container'>
                <div class='dropdown-menu left closed' id='dropdown-1-6-menu'></div>
              </div>
            </div>
          </div>

          <div class='rizrwb l2uvwo'></div>

          <div class='dropdown-container' id='dropdown-1-7-container'>
            <div class='dropdown border' onclick='dropdownToggle(this, event)' id='dropdown-1-7'>
              <div class='dropdown-title-container' id='dropdown-1-7-title-container'>
                <div class='dropdown-title' id='dropdown-1-7-title'></div>
                <div class='dropdown-caret-container'>
                  <img class='dropdown-caret' id='dropdown-1-7-caret'>
                </div>
              </div>
              <div class='dropdown-menu-container left closed' id='dropdown-1-7-menu-container'>
                <div class='dropdown-menu left closed' id='dropdown-1-7-menu'></div>
              </div>
            </div>
          </div>

          <div class='i026jp-name'>
            <div>ТЕМП ПО ПЕЛОТОНУ</div>
            <div class='be951t'></div>
            <div class='download-b' onclick='downloadButtonMouseUp(this.id)' id='q806rsnuof'>
              <img class='download-b-img'>
              <div class='download-b-menu download-b-menu-left invisible' id='q806rsnuof-menu'>
                <div class='download-b-item' download_id='y105wezlgh-laptimes' id='q806rsnuof-svg'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                <div class='download-b-item'download_id='y105wezlgh-laptimes' id='q806rsnuof-png'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
              </div>
            </div>
            
          </div>

        </div>

        <div class='i026jp-legend'>

          <div class='u9jj2e'>
            <div id='sh24pwxh'></div>
          </div>
  
          <div class='b287mr'></div>
      
          <div class='check-button-collection'>
            <div class='check-button-element' id='a5m2kv2u' checked='0'>
              <div class='check-button-check-container'>
                <img class='check-button-check-icon' id='a5m2kv2u-icon' src='img/check-small.svg'>
              </div>
              <div class='tt445x rr594h'>
                СРЕДНИЙ ТЕМП
              </div>
            </div>
          </div>
    
          <div class='check-button-collection ms-2 n-a'>
            <div class='check-button-element' id='jppvkshe' checked='0'>
              <div class='check-button-check-container'>
                <img class='check-button-check-icon' id='jppvkshe-icon' src='img/check-small.svg'>
              </div>
              <div class='tt445x rr594h'>
                СГЛАЖИВАТЬ ТЕМП
              </div>
            </div>
          </div>
        
        </div>

        <div class='i026jp-body g630pd'>
          <div class='d3-chart' id='f98m7lqm'></div>
        </div>
      
      </div>

      <div class='i026jp vv403s'>

        <div class='i026jp-desc invisible' id='qeh9jy7q-table'>
          <div class='hfkanh'>

            <div class='lnq8e3' onclick='descCloseIconMouseUp(this)' desc_id='qeh9jy7q' id='qeh9jy7q-close'>
              <img src='img/close-cross-no-space.svg'>
            </div>

            <div class='desc-title h-5 fc-3 ps-125 pt-05'>Разница между средним темпом команды и темпом пелотона</div>
            
            <div class='nru5y0'></div>
            <div class='desc-content' id='qeh9jy7q-content'></div>
            <div class='nru5y0 mt-0'></div>

          </div> 
        </div>

        <div class='i026jp-legend'>

          <div class='i026jp-name'>
            <div>ОТРЫВ ОТ ПЕЛОТОНА</div>
            <div class='be951t'></div>
            <div class='download-b' onclick='downloadButtonMouseUp(this.id)' id='u571pndtqt'>
              <img class='download-b-img'>
              <div class='download-b-menu download-b-menu-left invisible' id='u571pndtqt-menu'>
                <div class='download-b-item' download_id='y105wezlgh-laptimes-2' id='u571pndtqt-svg'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                <div class='download-b-item'download_id='y105wezlgh-laptimes-2' id='u571pndtqt-png'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
              </div>
            </div>
           
          </div>

          <div class='tt445x'>
            <div>СРЕДНЕЕ ЗНАЧЕНИЕ:</div>
            <div class='seja7d' id='f3i7mu5m'></div>
            <div class='lw106v'></div>
            <div>ОЖИДАЕМОЕ ЗНАЧЕНИЕ:</div>
            <div class='seja7d' id='xphl3qbg'></div>
          </div>
        
        </div>

        <div class='i026jp-body g630pd'>
          <div class='d3-chart' id='ohxqcofu'></div>
        </div>
      
      </div>

      <div class='col-h-stretch'>

        <div class='i026jp-desc r3wkac invisible' id='rc3k4yvc-table'>
          <div class='hfkanh'>

            <div class='lnq8e3' onclick='descCloseIconMouseUp(this)' desc_id='rc3k4yvc' id='rc3k4yvc-close'>
              <img src='img/close-cross-no-space.svg'>
            </div>

            <div class='desc-title h-5 fc-3 ps-125 pt-05'>Количество кругов с темпом, выше напарника</div>
            
            <div class='nru5y0'></div>
            <div class='desc-content' id='rc3k4yvc-content'></div>
            <div class='nru5y0 mt-0'></div>

          </div> 
        </div>

        <div class='i026jp-desc invisible' id='dwk5jud2-table'>
          <div class='hfkanh'>

            <div class='lnq8e3' onclick='descCloseIconMouseUp(this)' desc_id='dwk5jud2' id='dwk5jud2-close'>
              <img src='img/close-cross-no-space.svg'>
            </div>

            <div class='desc-title h-5 fc-3 ps-125 pt-05'>Процент кругов с темпом, выше напарника</div>
            
            <div class='nru5y0'></div>
            <div class='desc-content' id='dwk5jud2-content'></div>
            <div class='nru5y0 mt-0'></div>

          </div> 
        </div>

        <div class='i026jp stretch-auto i026jp-m'>

          <div class='i026jp-legend'>

            <div class='i026jp-name bc-0'>
              <div>ТЕМП ЛУЧШЕ</div>
              <div class='be951t'></div>
             
            </div>
          
          </div>

          <div class='i026jp-body vc056m'>

            <div class='yd3md1' id='spf9f9cv'>
              <div>ВСЕГО КРУГОВ:</div>
              <div class='seja7d dz9tu9' id='fol89lkw'></div>
            </div>
  
            <div class='y128v7'>
            
              <div class='d3-chart' id='h600mx54'></div>
  
              <div class='igvgch' id='r1i83fc9'>
  
                <div class='f28jfx' id='onxpnajw'>
                  <div class='' id='i1xqbyah'></div>
                  <div class='mfeocg' id='wu2klaco'></div>
                </div>
  
                <div class='f28jfx' id='akndca9r'>
                  <div class='' id='vymcrmb1'></div>
                  <div class='mfeocg' id='fuvkqvt9'></div>
                </div>
  
                <div class='f28jfx' id='hgsez2uf'>
                  <div class='' id='lyjsnkw3'></div>
                  <div class='mfeocg' id='m5qo6y3w'></div>
                </div>
  
                <div class='f28jfx' id='tjwkz1e3'>
                  <div class='' id='q25csr86'></div>
                  <div class='mfeocg' id='daqm0v0w'></div>
                </div>
                  
              </div>
  
            </div>
          
          </div>
        
        </div>

        <div class='i026jp i026jp-m i026jp-m-l zg974z'>

          <div class='i026jp-legend'>

            <div class='i026jp-name'>
              <div>ПРОЦЕНТ КРУГОВ С ТЕМПОМ ЛУЧШЕ НАПАРНИКА</div>
              <div class='be951t'></div>
              <div class='download-b' onclick='downloadButtonMouseUp(this.id)' id='d738mdxduh'>
                <img class='download-b-img'>
                <div class='download-b-menu download-b-menu-left invisible' id='d738mdxduh-menu'>
                  <div class='download-b-item' download_id='y105wezlgh-chart-l' id='d738mdxduh-svg'
                  onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                  <div class='download-b-item'download_id='y105wezlgh-chart-l' id='d738mdxduh-png'
                  onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
                </div>
              </div>
             
            </div>

            <div class='tt445x'>
              <div>СРЕДНИЙ ПРОЦЕНТ:</div>
              <div class='seja7d' id='y216rsu0'></div>
            </div>
        
          </div>

          <div class='i026jp-body g630pd-l'>
            <div class='d3-chart' id='ewkgz3mm'></div>
          </div>
        
        </div>
      
      </div>

      <div class='i026jp i026jp-m mj642v'>

        <div class='i026jp-desc invisible' id='p327i39d-table'>
          <div class='hfkanh'>

            <div class='lnq8e3' onclick='descCloseIconMouseUp(this)' desc_id='p327i39d' id='p327i39d-close'>
              <img src='img/close-cross-no-space.svg'>
            </div>

            <div class='desc-title h-5 fc-3 ps-125 pt-05'>Средняя дельта на круге между напарниками</div>
            
            <div class='nru5y0'></div>
            <div class='desc-content' id='p327i39d-content'></div>
            <div class='nru5y0 mt-0'></div>

          </div> 
        </div>

        <div class='i026jp-legend'>

          <div class='i026jp-name'>
            <div>ПЛОТНОСТЬ ТЕМПА НАПАРНИКОВ</div>
            <div class='be951t'></div>
            <div class='download-b' onclick='downloadButtonMouseUp(this.id)' id='w391ygswqu'>
              <img class='download-b-img'>
              <div class='download-b-menu download-b-menu-left invisible' id='w391ygswqu-menu'>
                <div class='download-b-item' download_id='y105wezlgh-chart-v' id='w391ygswqu-svg'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='svg'>SVG</div>
                <div class='download-b-item'download_id='y105wezlgh-chart-v' id='w391ygswqu-png'
                onclick='downloadChartItemMouseUp(this.id, event);' download_type='png'>PNG</div>
              </div>
            </div>
            
          </div>

          <div class='tt445x'>
            <div>СРЕДНЕЕ ЗНАЧЕНИЕ:</div>
            <div class='seja7d' id='pp8ytibp'></div>
            <div class='lw106v'></div>
            <div>ОЖИДАЕМОЕ ЗНАЧЕНИЕ:</div>
            <div class='seja7d' id='qktfa6u7'></div>
          </div>
        
        </div>

        <div class='i026jp-body g630pd'>
          <div class='d3-chart' id='sxkxbt8m'></div>
        </div>
      
      </div>

    </div>

  </div>

`


