var dice = Array.from(document.getElementsByClassName('dice'))
var btnRoll = document.getElementById('btnRoll')
var labelTimer = document.getElementById('labelTimer')
var timerArr = []
var counterId = -1
const letters = ['BAOOQM','ACESLR','SOTEND','OTUCEN','UTESLP','RATIBL','AICOFR','NOLGUE','IGENVT','SMIROA','VNZDAE','DCMPAE','OULIER','ISEEFH','IEATAO','ERINSH']

const endGameAudio = new Audio('sounds/end_game.mp3')
const countdownAudio = new Audio('sounds/countdown.mp3')
const zeroAudio = new Audio('sounds/zero.mp3')
const rollDiceAudio = new Audio('sounds/roll_dice.mp3')
var selected = []

var rollDice = () => {

    btnRoll.disabled = true
    timerArr = []
    selected = []
    letters.sort(() => 0.5 - Math.random())
    dice.forEach(spin)

    setTimeout(() => {

        timerArr.forEach((val) => {
            clearInterval(val)
        })
        btnRoll.disabled = false
    
        writeWord(selected)
        startCounter()

    }, 1000)
}

var spin = (value, index) => {
    
    rollDiceAudio.play()
    // timerArr.push(
    //     setInterval(() => randomLetter(value, index), 100)
    // )
    
    selected.push(randomLetter(value, index))
}

var randomLetter = (value, index) => {
    var letter = letters[index][parseInt(Math.random() * 6)]
    value.className = `column dice ${letter}`
    return letter
}


readWord(snapshot => snapshot.word.forEach((letter, i) => {
    dice[i].className = `column dice ${letter}`
    startCounter()
}))

var startCounter = () => {

    var time = 180;
    clearInterval(counterId)
    counterId = setInterval(() => {

        colorTimer(time)
        
        labelTimer.innerHTML = moment().startOf('day').seconds(time--).format('mm [min] : ss [sec]');

        if(time == -1) {
            endGame()
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

var endGame = () => {
    zeroAudio.play()
    clearInterval(counterId)
    labelTimer.innerHTML = 'TIME IS UP!'
}
