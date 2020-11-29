// Get a reference to the database service
var database = firebase.database();

function dbSaveDice(dice) {
    firebase.database().ref('game').set({
        dice: dice,
        time: Date.now()
    });
}

function dbLoadDice(callback) {
    firebase.database().ref('game').on('value', snapshot => {
        callback(snapshot.val())
    })
}

function dbAddWord(player, word) {
    firebase.database().ref(`players/${player}`).set({
        word: word
    });
}

function dbLoadWords(player, callback) {
    firebase.database().ref(`players/${player}`).once('value').then(snapshot => {
        if(snapshot.val())
            callback(snapshot.val().word)
    })
}

function dbGetPlayers(callback) {
    firebase.database().ref(`players`).once('value').then(snapshot => {
        callback(snapshot.val())
    })
}