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

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBQ3u6KQqD2guuHUqDeYyELVNbfYh2oA2A",
    authDomain: "paroliere-34498.firebaseapp.com",
    databaseURL: "https://paroliere-34498.firebaseio.com",
    projectId: "paroliere-34498",
    storageBucket: "paroliere-34498.appspot.com",
    messagingSenderId: "416696909187",
    appId: "1:416696909187:web:e114ebdf8a04b41ac44ab6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var rollDice = () => {

    btnRoll.disabled = true
    timerArr = []
    letters.sort(() => 0.5 - Math.random())
    dice.forEach(spin)

    setTimeout(() => {

        timerArr.forEach((val) => {
            clearInterval(val)
        })
        btnRoll.disabled = false
        startCounter()

    }, 1000)
}

var spin = (value, index) => {
    
    rollDiceAudio.play()
    var id = setInterval(() => {

        var rand = parseInt(Math.random() * 6)
        var letter = letters[index][rand]
        value.className = `column dice ${letter}`

    }, 100)

    timerArr.push(id)

}

var startCounter = () => {

    var countdown = moment().startOf('day')
    var time = 10;
    clearInterval(counterId)
    counterId = setInterval(() => {

        colorTimer(time)
        labelTimer.innerHTML = countdown
            .seconds(time--)
            .format('mm [min]: ss [sec]')

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
