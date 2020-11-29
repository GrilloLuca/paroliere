var dice = Array.from(document.getElementsByClassName('dice'))
var btnRoll = document.getElementById('btnRoll')
var labelTimer = document.getElementById('labelTimer')
var input = document.getElementById('input')
var wordList = document.getElementById('wordList')

var counterId = -1
const letters = ['BAOOQM','ACESLR','SOTEND','OTUCEN','UTESLP','RATIBL','AICOFR','NOLGUE','IGENVT','SMIROA','VNZDAE','DCMPAE','OULIER','ISEEFH','IEATAO','ERINSH']

const endGameAudio = new Audio('sounds/end_game.mp3')
const countdownAudio = new Audio('sounds/countdown.mp3')
const zeroAudio = new Audio('sounds/zero.mp3')
const rollDiceAudio = new Audio('sounds/roll_dice.mp3')
var selected = []
var words = []
var playerName = ''

btnRoll.disabled = true
dbLoadDice(snapshot => { 
    snapshot.dice.forEach((letter, i) => dice[i].className = `column dice ${letter}`)
    startCounter(snapshot.time)
})

var initGame = (player) => {

    btnRoll.disabled = false
    playerName = player
    document.getElementById('playerName').innerHTML = `Hello ${playerName}!`

    dbLoadWords(playerName, dbWordList => {
        words = dbWordList
        addWordsToUI()
    })
}

var rollDice = () => {

    btnRoll.disabled = true
    selected = []
    words = []
    addWordsToUI()
    
    letters.sort(() => 0.5 - Math.random())
    dice.forEach(spin)

    setTimeout(() => {

        btnRoll.disabled = false
    
        dbSaveDice(selected)
        startCounter()

    }, 1000)
}

var spin = (value, index) => {
    
    rollDiceAudio.play()
    selected.push(randomLetter(value, index))
}

var randomLetter = (value, index) => {
    var letter = letters[index][parseInt(Math.random() * 6)]
    value.className = `column dice ${letter}`
    return letter
}

var calculateScore = () => {
    dbGetPlayers(players => {

        var arr = []
        for (var p in players) if(p!=playerName) arr.push(players[p].word)
        var all = arr.reduce((prev, cur) => cur.concat(prev), [])
        
        words.forEach(word => {
            if(all.find(w => w == word) != undefined) {
                console.log(`${word} duplicated`)
            }
        })

    })
}
calculateScore()


var startCounter = (dbTime) => {

    var diff = 0
    if(dbTime) {
        diff = moment().diff(moment(dbTime))/1000
    }

    var time = 180 - diff;
    if (time < 0) time = 0
    clearInterval(counterId)
    counterId = setInterval(() => {

        colorTimer(time)
        
        labelTimer.innerHTML = moment().startOf('day').seconds(time--).format('mm [min] : ss [sec]');

        if(time <= 0) {
            clearInterval(counterId)
            labelTimer.innerHTML = 'TIME IS UP!'
            calculateScore()
        }

    }, 1000);

}

var colorTimer = (time) => {
    var color = 'is-success'
    if(time < 5) {
        color = 'is-danger'
        countdownAudio.play()
    } else if(time < 30) {
        color = 'is-danger'
    } else if(time < 60) {
        color = 'is-warning'
    }

    labelTimer.className = `tag ${color} is-large`
}

var addWord = () => {
    if(input.value.length > 3) {
        words.push(input.value)
        addWordsToUI()
        dbAddWord(playerName, words)
        calculateScore()
        input.value = ''
    }
}

var getScore = (val) => {
    switch(val.length) {
        case 4:return 1
        case 5: return 2
        case 6: return 3
        case 7: return 5
        default: return 11
    }
} 

function addWordsToUI () {
    wordList.innerHTML = ""
    words.forEach(word => {
        var li = document.createElement("li")
        li.appendChild(document.createTextNode(`${word} (${getScore(word)} points)`))
        wordList.appendChild(li)
    })
  }


  