const sublocations = {
  RootCultist: 'MarrowPass',
  RootWraith: 'TheHiddenSanctum',
  RootBrute: 'SunkenPassage',
  Brabus: 'CutthroatChannel',
  RootTumbleweed: 'TheTangledPass',
  RootEnt: 'TheChokingHollow',
  RootDragon: 'TheAshYard',
  HuntersHideout: 'HiddenGrotto',
  MadMerchant: 'Junktown',
  LizAndLiz: 'TheWarren',
  LastWill: 'FindMonkeyKey',
  RootShrine: 'TheGallows',
  SwarmMaster: 'TheIronRift',
  HoundMaster: 'TheBurrows',
  Sentinel: 'ShackledCanyon',
  Vyr: 'TheArdentTemple',
  WastelandGuardian: 'LoomOfTheBlackSun',
  TheHarrow: 'TheBunker',
  TheLostGantry: 'ConcourseOfTheSun',
  ArmorVault: 'VaultOfTheHeralds',
  TheCleanRoom: 'ThePurgeHall',
  SlimeHulk: 'TheDrownedTrench',
  Fatty: 'TheFetidGlade',
  Tyrant: 'TheCapillary',
  SwampGuardian: 'The Grotto',
  KinCaller: 'TheHallOfJudgement',
  BlinkFiend: "Widow'sPass",
  StuckMerchant: 'MerchantDungeon',
  BlinkThief: 'ForgottenUndercroft',
  StormCaller: "Heretic'sNest",
  ImmolatorAndZephyr: 'WitheringVillage',
  Wolf: 'TheScaldingGlade',
  TotemFather: 'TheScaldingGlade',
  TheRisen: "Ahanae'sLament",
  DoeShrine: "Widow'sVestry",
  WolfShrine: "Martyr'sSanctuary",
  Splitter: 'ResearchStationAlpha'
}

const mainLocations = {
  'City Overworld Zone1': 'Fairview',
  'City Overworld Zone2': 'Westcourt',
  'Wasteland Overworld Zone1': 'TheEasternWind',
  'Wasteland Overworld Zone2': 'TheScouringWaste',
  'Jungle Overworld Zone1': 'TheVerdantStrand',
  'Jungle Overworld Zone2': 'TheScaldingGlade',
  'Swamp Overworld Zone1': 'TheFetidGlade',
  'Swamp Overworld Zone2': 'TheMistFen'
}

let adventureMode = false
let hideCamp = false

function loadFile(o) {
  var fr = new FileReader()
  fr.onload = function(e) {
    showDataFile(e, o)
  }
  fr.readAsText(o.files[0])
}

function getWorldData(textArray, worldMode) {
  zones = {}

  zones['Earth'] = {}
  zones['Rhom'] = {}
  zones['Yaesha'] = {}
  zones['Corsus'] = {}

  let currentMainLocation

  if (worldMode == '#adventure') {
    currentMainLocation = textArray[3].split('/')[1].split('_')[1]
    // console.log(textArray)
  } else {
    currentMainLocation = 'Fairview'
  }

  var currentSublocation = ''

  for (item of textArray) {
    var zone
    var eventType
    var eventName
    var lastEventname
    var inSmallDungeon = true

    if (item.search('World_City') != -1) {
      zone = 'Earth'
    }
    if (item.search('World_Wasteland') != -1) {
      zone = 'Rhom'
    }
    if (item.search('World_Jungle') != -1) {
      zone = 'Yaesha'
    }
    if (item.search('World_Swamp') != -1) {
      zone = 'Corsus'
    }

    lastEventname = eventName

    if (item.search('SmallD') != -1) {
      eventType = 'Side Dungeon'
      eventName = item.split('/')[3].split('_')[2]
      currentSublocation = sublocations[eventName]
      inSmallDungeon = true
    }
    if (item.search('OverworldPOI') != -1) {
      eventType = 'Point of Interest'
      eventName = item.split('/')[3].split('_')[2]
      currentSublocation = currentMainLocation
      inSmallDungeon = true
    }
    if (item.search('Quest_Boss') != -1) {
      eventType = 'World Boss'
      eventName = item.split('/')[3].split('_')[2]
      currentSublocation = sublocations[eventName]
    }
    if (item.search('Siege') != -1) {
      eventType = 'Siege'
      eventName = item.split('/')[3].split('_')[2]
      currentSublocation = sublocations[eventName]
    }
    if (item.search('Mini') != -1) {
      eventType = 'Miniboss'
      eventName = item.split('/')[3].split('_')[2]
      currentSublocation = sublocations[eventName]
    }
    if (item.search('Quest_Event') != -1) {
      eventType = 'Item Drop'
      eventName = item.split('/')[3].split('_')[2]
    }

    if (item.search('Overworld_Zone') != -1) {
      currentMainLocation =
        item.split('/')[3].split('_')[1] +
        ' ' +
        item.split('/')[3].split('_')[2] +
        ' ' +
        item.split('/')[3].split('_')[3]
      currentMainLocation = mainLocations[currentMainLocation]
    }

    if (eventName != lastEventname) {
      // Replacements
      if (eventName != undefined) {
        eventName = eventName
          .replace('TheRisen', 'Reanimators')
          .replace('LizAndLiz', 'LizChicagoTypewriter')
          .replace('Fatty', 'TheUncleanOne')
          .replace('WastelandGuardian', 'Claviger')
          .replace('RootEnt', 'EntBoss')
          .replace('Wolf', 'TheRavager')
          .replace('RootDragon', 'Singe')
          .replace('SwarmMaster', 'Scourge')
          .replace('RootWraith', 'Shroud')
          .replace('RootTumbleweed', 'TheMangler')
          .replace('Kincaller', 'Warden')
          .replace('Tyrant', 'Thrall')
          .replace('Vyr', 'ShadeAndShatter')
          .replace('ImmolatorAndZephyr', 'ScaldAndSear')
          .replace('RootBrute', 'Gorefist')
          .replace('SlimeHulk', 'Canker')
          .replace('BlinkFiend', 'Onslaught')
          .replace('Sentinel', 'Raze')
          .replace('Penitent', 'Letos Amulet')
          .replace('LastWill', 'SupplyRunAssaultRifle')
          .replace('SwampGuardian', 'Ixillis')
          .replace('Splitter', 'Riphide')
      }

      if (zone && eventType && eventName) {
        if (zones[zone][eventType]) {
          // console.log(zones)
          if (zones[zone][eventType].search(eventName) == -1) {
            zones[zone][eventType] += ', ' + eventName

            html =
              '<tr><td>' +
              zone +
              ': ' +
              currentMainLocation.split(/(?=[A-Z])/).join(' ') +
              ': ' +
              currentSublocation.split(/(?=[A-Z])/).join(' ') +
              '</td><td>' +
              eventType +
              '</td><td>' +
              eventName.split(/(?=[A-Z])/).join(' ') +
              '</td></tr>'

            document.querySelector(worldMode).innerHTML += html
          }
        } else {
          zones[zone][eventType] = eventName
          html =
            '<tr><td>' +
            zone +
            ': ' +
            currentMainLocation.split(/(?=[A-Z])/).join(' ') +
            ': ' +
            currentSublocation.split(/(?=[A-Z])/).join(' ') +
            '</td><td>' +
            eventType +
            '</td><td>' +
            eventName.split(/(?=[A-Z])/).join(' ') +
            '</td></tr>'

          document.querySelector(worldMode).innerHTML += html
        }
      }
      document.querySelector('#filters').style.display = 'block'
    }
  }
}

function showDataFile(e, o) {
  for (node of document.querySelectorAll('.header-row')) {
    node.style.display = 'table-row'
  }

  text = e.target.result
  campArray = text
    .split('/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13')[0]
    .split('/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City')[1]
    .split('/Game')

  //   console.log(textArray)

  advText = text.split(/\/Quests\/Quest_AdventureMode(.+)/)[1]

  if (advText) {
    adventureMode = true
    advArray = advText.split('/Game')
  } else {
    adventureMode = false
  }

  if (adventureMode) {
    getWorldData(advArray, '#adventure')
  }

  getWorldData(campArray, '#main')
}

function toggleFilter(type) {
  for (node of document.querySelectorAll('tr')) {
    if (node.classList.value !== 'header-row') {
      node.style.display = 'none'
    }
  }
  for (node of document.querySelectorAll('td')) {
    if (node.textContent.search(type) !== -1) {
      node.parentNode.style.display = 'table-row'
    }
  }
}

document
  .querySelector('#toggle-items')
  .addEventListener('click', toggleFilter.bind(null, 'Item Drop'))
document
  .querySelector('#toggle-sd')
  .addEventListener('click', toggleFilter.bind(null, 'Side Dungeon'))
document
  .querySelector('#toggle-mb')
  .addEventListener('click', toggleFilter.bind(null, 'Miniboss'))
document
  .querySelector('#toggle-poi')
  .addEventListener('click', toggleFilter.bind(null, 'Point'))
document
  .querySelector('#toggle-bosses')
  .addEventListener('click', toggleFilter.bind(null, 'World Boss'))
document
  .querySelector('#toggle-sieges')
  .addEventListener('click', toggleFilter.bind(null, 'Siege'))
document
  .querySelector('#toggle-all')
  .addEventListener('click', toggleFilter.bind(null, ''))

document.querySelector('#toggle-camp').onclick = function() {
  if (!hideCamp) {
    document.querySelector('.campaign-mode').style.display = 'none'
  } else {
    document.querySelector('.campaign-mode').style.display = 'table-row'
  }
  hideCamp = !hideCamp
}
