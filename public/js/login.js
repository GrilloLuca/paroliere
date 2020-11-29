var modalUsername = document.getElementById('modalUsername')
var labelWarning = document.getElementById('labelPlayerWarning')
var inputPlayerName = document.getElementById('inputPlayerName')

var layoutPlayerName = document.getElementById('layoutPlayerName')
var layoutInsertWord = document.getElementById('layoutInsertWord')

var playerLabel = document.getElementById('playerLabel')

var submitUsername = () => {

    // check if username exists
    dbGetPlayers(players => {
        
        var player = inputPlayerName.value

        if(players && players[player]) {
            labelWarning.innerHTML = 'player name already exixts'
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