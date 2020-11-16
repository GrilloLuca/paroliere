// Get a reference to the database service
var database = firebase.database();

function writeWord(word) {
    firebase.database().ref('game').set({
        word: word
    });
}

function readWord(callback) {
    var starCountRef = firebase.database().ref('game');
    starCountRef.on('value', function(snapshot) {
        var value = snapshot.val()
        callback(value)
    })
}