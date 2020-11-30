var modalUsername = document.getElementById('modalUsername')
var labelWarning = document.getElementById('labelPlayerWarning')
var inputPlayerName = document.getElementById('inputPlayerName')

var layoutPlayerName = document.getElementById('layoutPlayerName')
var layoutInsertWord = document.getElementById('layoutInsertWord')

var playerLabel = document.getElementById('playerLabel')

var submitUsername = () => {

    // check if username exists
    dbGetPlayers(players => {
        
        var error = ''
        var player = inputPlayerName.value

        if(players && players[player]) error = 'player name already exixts'
        if(player.length < 2) error = 'player name too short'

        if(error != '') {
            labelWarning.innerHTML = error
            labelWarning.className = "help is-danger"
            return
        }
    
        playerLabel.innerHTML = player
        // close modal
        layoutPlayerName.className = "is-hidden"
        layoutInsertWord.className = ""
        initGame(player)
        
    })

}