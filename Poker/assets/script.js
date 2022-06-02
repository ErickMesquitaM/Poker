/* ------------------------------------- MENU  -------------------------------------*/
document.getElementById('btn').style.display = 'none'

let boardMenu = document.getElementById('boardMenu')
let boardPersons = document.getElementById('boardPersons')
let player1 = document.getElementById('selectPerson')
let personSelected = `url(assets/person/player1/0.png`

player1.addEventListener("click", selectPerson)

playersCPU = [
    {name: 'ABJUR', url: 'abjur', repeat: false} ,
    
    {name: 'ABNER', url: 'abner', repeat: false} ,
    
    {name: 'EDNALDO', url: 'ednaldo', repeat: false} ,
    
    {name: 'ELON M.', url: 'musk', repeat: false} ,

    {name: 'NEYMAR', url: 'ney', repeat: false}
]

var imgP1 = null
var imgP2 = null
var imgP3 = null

raffleOpponent(2)
raffleOpponent(3)

function raffleOpponent(p){
    let n = Math.floor( Math.random() * 5)

    if(playersCPU[n].repeat == true){
        raffleOpponent(p)
    } else {

        let playerName = null
        let img = null
        
        if(p == 2){
            playerName = document.getElementById('player2Name')
            img = document.getElementById('perfilPlayer2')
            imgP2 = playersCPU[n].url
        } else {
            playerName = document.getElementById('player3Name')
            img = document.getElementById('perfilPlayer3')
            imgP3 = playersCPU[n].url
        }

        playerName.innerText = playersCPU[n].name
        img.style.backgroundImage = 'url(assets/person/player2-3/' + playersCPU[n].url + '.png)'

        playersCPU[n].repeat = true
    }

}


function selectPerson(){
    createPersons()
    boardMenu.style.display = "none"
    boardPersons.style.display = "grid"
}

let firstTime = true
function createPersons(){
    if(firstTime){
        let i = 0
        let person
        let persons = document.getElementById('boardPersons')
        
        while(i <= 8){
    
            person = document.createElement('button')
            person.classList.add('personsP1')
            person.style.backgroundImage = `url(assets/person/player1/${i}.png)`
            person.setAttribute('id', `p${i}`)
            person.setAttribute('onclick', `returnPerson(${i})`)
            persons.appendChild(person)
    
            i++
        }
    
        firstTime = false
    }
}

function checkSpace(name){
    let i = 0
    let spaces = ''
    while(i < 100){
        spaces += ' '
        if(name == spaces){
            i = 100
            return true
        }
        i++
    }
}

function returnPerson(n){
    boardPersons.style.display = 'none'
    boardMenu.style.display = 'block'
    player1.style.backgroundImage = `url(assets/person/player1/${n}.png)`
    personSelected = `url(assets/person/player1/${n}.png)`
}

document.getElementById('play').addEventListener('click', play)

function play(){
    let name = document.getElementById('name').value
    name = name.toUpperCase()
    if(name == '' || checkSpace(name)){
        console.log('erro')
    } else {
        document.getElementById('menu').style.display = "none"
        document.getElementById('game').style.display = "block"

        document.getElementById('playerName').innerHTML = name
        document.getElementById('perfilPlayer').style.backgroundImage = personSelected
        imgP1 = personSelected

        startGame()
    }
}

/* ------------------------------------- CARTAS  -------------------------------------*/

var numberSuit = 0
var numberCard = 1
let suit

const cards = []
for(let i = 1; i < 53; i++){
    cards.push(makeCard())
}

function makeCard(){
    return {suit: createSuit(),
            value: createValue(),
            backGround: `url(assets/cards/${suit}/${numberCard}.png)`,
            repeat: false}
}

function createSuit(){
    numberSuit++ 
    if(numberSuit <= 13){
        suit = 'copas'
    }else if(numberSuit <= 26){
        suit = "espadas"
    }else if(numberSuit <= 39){
        suit = "ouro"
    }else if(numberSuit <= 52){
        suit = "paus"
    }
    return suit
}

function createValue(){
    numberCard++
    if(numberCard == 15){
        numberCard = 2
    }
    return numberCard
}

let cardRandom = null
function randomCard(){
    let n = null
    n = Math.floor(Math.random() * 52)
    cardRandom = n

    if(cards[n].repeat == true){
        randomCard()
    } else {
        cards[n].repeat = true
        return cards[n]
    }
}

let NCT = 1
function createCardTable(){
    
    let cardTable = null
    let cTFront = null
    let cTBack = null

    cardTable = document.createElement('div')
    cardTable.setAttribute("id", `cardT${NCT}`)
    
    cTFront = document.createElement('div')
    cTFront.setAttribute("id", `cT${NCT}`)
    cTFront.classList.add('cardFront')

    cTBack = document.createElement('div')
    cTBack.classList.add('cardBack')

    document.getElementById('cardsTable').appendChild(cardTable);
    cardTable.appendChild(cTFront);
    cardTable.appendChild(cTBack);

    distribuiteCardTable(NCT)
    animationCardTable(cardTable, NCT)

    NCT++
}

function distribuiteCardTable(n){
    let card = document.getElementById(`cT${n}`)
    pushCard(card)
}

let idCT1 = null
let idCT2 = null
let idCT3 = null
let idCT4 = null
let idCT5 = null

let cardsBackTableOn = false

function animationCardTable(card, n){
    let posX = 0
    let posY = 0
    let posYEnd = 0
    let id = null
    let iX = 0
    let wid = window.innerWidth
    let hei = window.innerHeight
    
    if(wid < 1370 && hei > 620){
        posYEnd = 110
    } else if(wid > 1280){
        posYEnd = 120
    } else {
        posYEnd = 110
    }

    if(cardsBackTableOn){
        posY = card.offsetTop
        posYEnd = 0
        posX = card.offsetLeft
    }

    if(n == 1){
        id = idCT1
        iX = 0
    } else if(n == 2){
        id = idCT2
        iX = 0.6
    } else if(n == 3){
        id = idCT3
        iX = 1.2
    } else if(n == 4){
        id = idCT4
        iX = 1.8
    } else if(n == 5){
        id = idCT5
        iX = 2.4
    }

    clearInterval(id)
    id = setInterval(frame, 5)
    function frame(){
        if(posY == posYEnd){
            clearInterval(id)
            card.classList.toggle('flip')
            if(cardsBackTableOn){
                card.style.left = 0
                card.style.boxShadow = 'none'
            } else {
                card.style.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.5)'
            }
        } else{
            if(cardsBackTableOn){
                posY--
                posX -= iX 
            } else {
                posY++
                posX += iX
            }
            card.style.top = posY + 'px'
            card.style.left = posX + 'px'
        }
    }
}

var c1p1 = {elem: document.getElementById('card1P1'), cardFront: document.getElementById('c1p1'), p: 'p1', c: 1}
var c2p1 = {elem: document.getElementById('card2P1'), cardFront: document.getElementById('c2p1'), p: 'p1', c: 2}
var c1p2 = {elem: document.getElementById('card1P2'), cardFront: document.getElementById('c1p2'), p: 'CPU', c: 3}
var c2p2 = {elem: document.getElementById('card2P2'), cardFront: document.getElementById('c2p2'), p: 'CPU', c: 4}
var c1p3 = {elem: document.getElementById('card1P3'), cardFront: document.getElementById('c1p3'), p: 'CPU', c: 5}
var c2p3 = {elem: document.getElementById('card2P3'), cardFront: document.getElementById('c2p3'), p: 'CPU', c: 6}

function distributeCards(){
    if(player1On){
        pushCard(c1p1.cardFront)
        pushCard(c2p1.cardFront)
        slideCard(c1p1)
        slideCard(c2p1)
    }
    pushCard(c1p2.cardFront)
    pushCard(c2p2.cardFront)
    pushCard(c1p3.cardFront)
    pushCard(c2p3.cardFront)
      
    slideCard(c1p2)
    slideCard(c2p2)
    slideCard(c1p3)
    slideCard(c2p3) 

}

function pushCard(card){
    randomCard()
    card.setAttribute('suit', cards[cardRandom].suit);
    card.setAttribute('value', cards[cardRandom].value);
    card.style.backgroundImage = cards[cardRandom].backGround;
}

function flipCard(card){
    card.elem.classList.add('flip')
}

function slideCard(card){
    let elem = card.elem;
    let posX = 0
    let posY = 0
    let posYEnd = null
    let p = card.p
    let wid = window.innerWidth;

    let id = null
    let idAni = null
    let id2Ani = null
    let id3Ani = null
    let id4Ani = null
    let id5Ani = null
    let id6Ani = null

    if(p == 'p1'){
        if(wid > 1370){
            posYEnd = 240
        } else if(wid > 1280){
            posYEnd = 210
        } else {
            posYEnd = 195
        }
    } else {
        if(wid > 1370){
            posYEnd = 120
        } else if(wid > 1280){
            posYEnd = 110
        } else {
            posYEnd = 100
        } 
    }
    
    let flipOn = false
    let negative = false
    let iX = null
    let c = card.c

    if(posYEnd >= 195){
        flipOn = true

        if(c == 1){
            if(posYEnd == 195){
                iX = .73
            } else if(posYEnd == 210){
                iX = .8
            } else {
                iX = .8
            }
            id = idAni
        } else {
            if(posYEnd == 195){
                iX = 1.03
            } else if(posYEnd == 210){
                iX = 1.09
            } else {
                iX = 1.1
            }  
            id = id2Ani
        }
    } else if(posYEnd < 195){

        if(c == 3){
            negative = true

            if(posYEnd == 120){
                iX = 1.8
            } else if(posYEnd == 110){
                iX = 1.88
            } else {
                iX = 1.9
            }
            id = id3Ani
        } else if(c == 4){
            negative = true

            if(posYEnd == 120){
                iX = 1.3
            } else if(posYEnd == 110){
                iX = 1.4
            } else {
                iX = 1.44
            }  
            id = id4Ani
        } else if(c == 5){

            if(posYEnd == 120){
                iX = 4.25
            } else if(posYEnd == 110){
                iX = 4.18
            } else {
                iX = 4.16
            }
            id = id5Ani
        } else {

            if(posYEnd == 120){
                iX = 3.75
            } else if(posYEnd == 110){
                iX = 3.7
            } else {
                iX = 3.69
            }  
            id = id6Ani
        }
    }
    clearInterval(id);
    id = setInterval(frame, 5);

    function frame() {
        if (posY == posYEnd) {
            clearInterval(id);
            elem.style.top = posY + 'px';
            
            if(flipOn){
                flipCard(card);
                elem.style.boxShadow = '-2px 2px 4px rgba(0, 0, 0, 0.5)'
            } else {
                elem.style.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }

        } else {

            if (!negative){
                posX += iX;
            } else {
                posX -= iX;
            }
            posY++


            elem.style.left = posX + 'px';
            elem.style.top = posY + 'px';
        }
    }

}

function updatePosCards(){
    let game = document.getElementById('game')
    if(window.getComputedStyle(game).display !== "none"){

        let wid = window.innerWidth
        let hei = window.innerHeight
    
        let cp1 = []
        let cp2 = []
        let cp3 = []
    
        let c1 = null
        let c2 = null
    
        c1 = c1p1.elem
        c2 = c2p1.elem
    
        if(wid > 1430 && hei > 680){
            cp1 = [ 240, 192, 264]
    
        } else if(wid > 1430 && hei > 650){
            cp1 = [ 230, 192, 264]
            
        } else if(wid > 1430 && hei > 610){
            cp1 = [ 220, 192, 264]
    
        } else if(wid > 1370 && hei > 680){
            cp1 = [ 225, 192, 264]  
    
        } else if(wid > 1370 && hei > 650){
            cp1 = [ 215, 192, 264]
    
        } else if(wid > 1330 && hei > 680){
            cp1 = [ 230, 182, 252]  
    
        } else if(wid > 1330 && hei > 640){
            cp1 = [ 220, 180, 250]
    
        } else if(wid > 1330 && hei > 600){
            cp1 = [ 210, 178, 247]
    
        } else if(wid > 1280 && hei > 580){
            cp1 = [ 215, 174, 241]
        
        } else if(wid > 1240 && hei > 640){
            cp1 = [ 220, 155, 220]
    
        } else if(wid > 1240 && hei > 600){
            cp1 = [ 215, 155, 220]
    
        } else if(wid > 1200 && hei > 600){
            cp1 = [ 208, 150, 215]
    
        }
        moveUpdate(c1, cp1[0], cp1[1], player1On)
        moveUpdate(c2, cp1[0], cp1[2], player1On)
    
        c1 = c1p2.elem
        c2 = c2p2.elem
    
        if(wid > 1490 && hei > 650){
            cp2 = [ 120, -220, -160]
    
        } else if(wid > 1440 && hei > 680){
            cp2 = [ 120, -216, -156]
    
        } else if(wid > 1400 && hei > 620){
            cp2 = [ 120, -190, -133]
            
        } else if(wid > 1400 && hei > 500){
            cp2 = [ 120, -220, -165]
            
        } else if(wid > 1370 && hei < 620){
            cp2 = [ 120, -230, -175]
            
        } else if(wid > 1370 && hei > 620){
            cp2 = [ 120, -195, -135]
            
        } else if(wid > 1330 && hei > 630){
            cp2 = [ 115, -210, -155]
            
        } else if(wid > 1330 && hei > 500){
            cp2 = [ 115, -200, -148]
            
        } else if(wid > 1300 && hei > 500){
            cp2 = [ 115, -195, -140]
            
        } else if(wid > 1280 && hei > 600){
            cp2 = [ 110, -190, -137]
            
        } else if(wid > 1220 && hei > 500){
            cp2 = [ 110, -198, -149]
    
        } else if(wid > 1200 && hei > 500){
            cp2 = [ 110, -195, -145]
    
        }
    
        moveUpdate(c1, cp2[0], cp2[1], player2On)
        moveUpdate(c2, cp2[0], cp2[2], player2On)
    
        c1 = c1p3.elem
        c2 = c2p3.elem
    
        if(wid > 1490 && hei > 620){
            cp3 = [ 120, 500, 440]
    
        } else if(wid > 1490 && hei > 570){
            cp3 = [ 120, 530, 475]
    
        } else if(wid > 1490 && hei > 570){
            cp3 = [ 120, 530, 475]
    
        } else if(wid > 1460 && hei > 620){
            cp3 = [ 120, 490, 432]
    
        } else if(wid > 1460){
            cp3 = [ 120, 505, 453]
    
        } else if(wid > 1400 && hei > 620){
            cp3 = [ 120, 465, 407]
    
        } else if(wid > 1400){
            cp3 = [ 120, 490, 438]
    
        } else if(wid > 1370 && hei > 620){
            cp3 = [ 120, 447, 387]
    
        } else if(wid > 1370){
            cp3 = [ 120, 480, 420]
    
        } else if(wid > 1330){
            cp3 = [ 115, 462, 410]
    
        } else if(wid > 1280){
            cp3 = [ 115, 448, 393]
    
        } else if(wid > 1260){
            cp3 = [ 110, 430, 383]
    
        } else if(wid > 1220){
            cp3 = [ 110, 410, 360]
    
        } else if(wid > 1200){
            cp3 = [ 110, 400, 350]
    
        }
        moveUpdate(c1, cp3[0], cp3[1], player3On)
        moveUpdate(c2, cp3[0], cp3[2], player3On)
    
        let ct = []
    
        let csT = [document.getElementById('cardT1'), document.getElementById('cardT2'), document.getElementById('cardT3'), document.getElementById('cardT4'), document.getElementById('cardT5')]
    
        if(flopOn){
        
            if(hei > 620 && wid < 1370){
                ct = [ 110, 6, 71, 136]
        
            } else if(hei > 620){
                ct = [ 120, 0, 72, 144]
        
            } else if(hei < 600){
                ct = [ 110, 20, 82, 144]
        
            } else if(hei < 620 || wid < 1370){
                ct = [ 120, 20, 82, 144]
        
            }
    
    
            moveUpdate(csT[0], ct[0], ct[1], true)
            moveUpdate(csT[1], ct[0], ct[2], true)
            moveUpdate(csT[2], ct[0], ct[3], true)
    
            if(turnOn){
                if(hei > 620 && wid < 1370){
                    ct = [ 110, 201]
                } else if(hei > 620){
                    ct = [ 120, 216]
                } else if(hei < 600){
                    ct = [ 110, 206]
                } else if(hei < 620 || wid < 1370){
                    ct = [ 120, 206]
                }
                moveUpdate(csT[3], ct[0], ct[1], true)
            }
            if(riverOn){
                if(hei > 620 && wid < 1370){
                    ct = [ 110, 266]
                } else if(hei > 620){
                    ct = [ 120, 288]
                } else if(hei < 600){
                    ct = [ 110, 268]
                } else if(hei < 620 || wid < 1370){
                    ct = [ 120, 268]
                }
                moveUpdate(csT[4], ct[0], ct[1], true)
            }
        }
        
        function moveUpdate(card, posY, posX, player){
            if(player == true){
                card.style.top = posY + 'px'
                card.style.left = posX + 'px'
    
            }
        }
    }
}

/* -----------------------------------------  GAME  ----------------------------------------- */
let round = 0
var money1 = 200
var money2 = 200
var money3 = 200
let moneyAlreadyBet1 = 0
let moneyAlreadyBet2 = 0
let moneyAlreadyBet3 = 0

updateMoney(money1, money2, money3)
function updateMoney(m1, m2, m3){
    document.getElementById('money1').innerHTML = m1
    document.getElementById('money2').innerHTML = m2
    document.getElementById('money3').innerHTML = m3
}

function updateOneMoney(player, money){
    document.getElementById(player).innerHTML = money
}

let timeDealer = 3
let playerTime = null
let playerTimeEnd = null
let player1On = true 
let player2On = true 
let player3On = true 

let boardBtn = document.getElementById('btn')
let gameEnd = false

function upPlayerTime(){

    if(playerTime + 1 == playerTimeEnd || playerTime - 2 == playerTimeEnd){
        newRound()
    } else if(playerTime == 1 && !player2On && playerTimeEnd == 3){
        newRound()
    } else if(playerTime == 2 && !player3On && playerTimeEnd == 1){
        newRound()
    } else if(playerTime == 3 && !player1On && playerTimeEnd == 2){
        newRound()
    }

    if(playerTime == 1 && !gameEnd){
        boardBtn.style.display = 'none'
        checkSkipTable()
        if(!player2On){
            playerTime = 3
            setTimeout(loadPlayCPU, 100)
        } else {
            playerTime = 2
            setTimeout(loadPlayCPU, 100)
        }
    }else if(playerTime == 2 && !gameEnd){
        if(!player3On){
            playerTime = 1
            checkSkipTable()
            boardBtn.style.display = 'grid'
        } else {
            playerTime = 3
            setTimeout(loadPlayCPU(), 100)
            boardBtn.style.display = 'none'
        }
    }else if(playerTime == 3 && !gameEnd){
        if(!player1On){
            playerTime = 2
            setTimeout(loadPlayCPU, 100)
            boardBtn.style.display = 'none'
        } else {
            checkSkipTable()
            playerTime = 1
            boardBtn.style.display = 'grid'
        }
    }

}

let btnSkip = document.getElementById('skip')
let btnBet = document.getElementById('bet')
let btnAllIn = document.getElementById('allIn')
let btnUpBet = document.getElementById('upBet')
let skipTable = false

function checkSkipTable(){
    if(money1 + moneyAlreadyBet1 < currentBet && skipTable){
        btnUpBet.style.opacity = '30%'
        btnUpBet.style.cursor = 'auto'
  
    } else if(money1 + moneyAlreadyBet1 <= currentBet && !skipTable){
  
        btnUpBet.style.opacity = '30%'
        btnUpBet.style.cursor = 'auto'
  
    } else {
        btnUpBet.style.opacity = '100%'
        btnUpBet.style.cursor = 'pointer'
    }
    
    if(skipTable){

        btnSkip.style.display = 'block' 
        btnBet.style.display = 'none'
        btnAllIn.style.display = 'none'
  
    } else if(money1 + moneyAlreadyBet1 <= currentBet){
  
        btnAllIn.style.display = 'block'
        btnBet.style.display = 'none'
        btnSkip.style.display = 'none'
 
    } else{
 
        btnSkip.style.display = 'none' 
        btnBet.style.display = 'block'
        btnAllIn.style.display = 'none'
 
    }
}


function startGame(){
    if(timeDealer == 3){
        if(player1On){
            playerTime = 1
        } else {
            playerTime = 2
        }
    } else {
        playerTime = timeDealer + 1
    }
    playerTimeEnd = playerTime
    blind(timeDealer)
    dealer()
    setTimeout(distributeCards, 1000)
    if(playerTime == 2 || playerTime == 3){
        setTimeout(loadPlayCPU, 1500)
        document.getElementById('btn').style.display = 'none'
    } else if(player1On) {
        btnSkip.style.display = 'none'

        if(money1 <= currentBet){

            btnAllIn.style.display = 'block'
            btnBet.style.display = 'none'
            btnUpBet.style.opacity = '30%'
            btnUpBet.style.cursor = 'auto'

        } else {

            btnAllIn.style.display = 'none'
            btnBet.style.display = 'block'
            btnUpBet.style.opacity = '100%'
            btnUpBet.style.cursor = 'pointer'

        }
        document.getElementById('btn').style.display = 'grid'
    }
}
let flopOn = false
let turnOn = false
let riverOn = false

function flop(){
    setTimeout(createCardTable, 500)
    setTimeout(createCardTable, 1000)
    setTimeout(createCardTable, 1500)
    round++
    flopOn = true
}
function turnRiver(){
    randomCard()
    setTimeout(createCardTable, 500)
    round++
    if(turnOn){
        riverOn = true
    } else {
        turnOn = true
    }
}
function dealer(){
    if(player1On){

        if(timeDealer == 1){
            document.getElementById('dealerP1').style.display = 'block'
            document.getElementById('dealerP3').style.display = 'none'
            timeDealer = 2
        } else if(timeDealer == 2){
            document.getElementById('dealerP2').style.display = 'block'
            document.getElementById('dealerP1').style.display = 'none'
            timeDealer = 3
        } else if(timeDealer == 3){
            document.getElementById('dealerP3').style.display = 'block'
            document.getElementById('dealerP2').style.display = 'none'
            timeDealer = 1
        } 
    } else {
        document.getElementById('dealerP1').style.display = 'none'
        console.log('sem o player 1')
        if(timeDealer == 3){
            document.getElementById('dealerP3').style.display = 'block'
            document.getElementById('dealerP2').style.display = 'none'
            timeDealer = 2
        }else {
            document.getElementById('dealerP3').style.display = 'none'
            document.getElementById('dealerP2').style.display = 'block'
            timeDealer = 3
        }
    }
}

let moneyB1 = {board: document.getElementsByClassName('moneyB1')[0], moneyBet: document.getElementById('betMoney1'), money: money1} 
let moneyB2 = {board: document.getElementsByClassName('moneyB2')[0], moneyBet: document.getElementById('betMoney2'), money: money2} 
let moneyB3 = {board: document.getElementsByClassName('moneyB3')[0], moneyBet: document.getElementById('betMoney3'), money: money3} 

function blind(d){
    let timeDealer = null
    let leftDealer = null
    let leftLeftDealer = null
    if(player1On){
        if(d == 1){
            timeDealer = moneyB1
            leftDealer = moneyB2
            leftLeftDealer = moneyB3
        } else if(d == 2){
            timeDealer = moneyB2
            leftDealer = moneyB3
            leftLeftDealer = moneyB1
        } else if(d == 3){
            timeDealer = moneyB3
            leftDealer = moneyB1
            leftLeftDealer = moneyB2
        }
        timeDealer.board.style.display = 'none'
        leftDealer.board.style.display = 'none'
        leftLeftDealer.board.style.display = 'none'

        smallBigBlind(leftDealer.board, leftLeftDealer.board, leftDealer.moneyBet, leftLeftDealer.moneyBet, timeDealer)
    } else {

        if(d != 3){
            moneyB3.board.style.display = 'block'
            moneyB3.moneyBet.innerHTML = '1'
            money3 -= 1
        } else {
            moneyB2.board.style.display = 'block'
            moneyB2.moneyBet.innerHTML = '1'
            money2 -= 1
        }
        updateMoney(money1, money2, money3)
    }
    function smallBigBlind(lDB, lLDB, lDMB, lLDMB, timeDealer){
        setTimeout( () => lDB.style.display = 'block', 300)
        setTimeout( () => lLDB.style.display = 'block', 600)

        lDMB.innerHTML = '1'
        lLDMB.innerHTML = '2'

        if(timeDealer == moneyB1){
            money2 -= 1
            money3 -= 2
            moneyAlreadyBet2 = 1
            moneyAlreadyBet3 = 2
        } else if(timeDealer == moneyB2){
            money3 -= 1
            money1 -= 2
            moneyAlreadyBet3 = 1
            moneyAlreadyBet1 = 2
        } else if(timeDealer == moneyB3){
            money1 -= 1
            money2 -= 2
            moneyAlreadyBet1 = 1
            moneyAlreadyBet2 = 2
        }

        updateMoney(money1, money2, money3)
    }

}

/* ==================================  BTN  ================================== */

document.getElementById('allIn').addEventListener('click', allIn)
document.getElementById('skip').addEventListener('click', skip)
document.getElementById('bet').addEventListener('click', bet)
document.getElementById('upBet').addEventListener('click', upBet)
document.getElementById('giveUp').addEventListener('click', giveUp)

let actionP1 = document.getElementById('actionP1')
let actionP2 = document.getElementById('actionP2')
let actionP3 = document.getElementById('actionP3')

let betMoneyUp = document.getElementById('betMoneyUp')
let currentBet = 2
let betMoney = currentBet + 1

function skip(){
    if(skipTable == true){
        upPlayerTime()
        actionP1.style.display = 'block'
        actionP1.innerHTML = 'PASSOU'
    }
}
function bet(){
    if(money1 >= currentBet){
        moneyAlreadyBet1 = currentBet - moneyAlreadyBet1
        money1 -= moneyAlreadyBet1
        moneyAlreadyBet1 = currentBet
        updateOneMoney('money1', money1)
        document.getElementById('betMoney1').innerHTML = currentBet
        document.getElementsByClassName('moneyB1')[0].style.display = 'block'
        actionP1.style.display = 'block'
        actionP1.innerHTML = 'PAGOU'
        upPlayerTime()
    }
}
function allIn(){
    
    player1AllIn = true
    document.getElementsByClassName('moneyB1')[0].style.display = 'block'
    actionP1.style.display = 'block'
    actionP1.innerHTML = 'ALL-IN'
    moneyAlreadyBet1 = money1 + moneyAlreadyBet1
    document.getElementById('betMoney1').innerHTML = moneyAlreadyBet1
    money1 = 0
    document.getElementsByClassName('money')[0].style.opacity = '30%'

    updateOneMoney('money1', money1)
    upPlayerTime()
}

function giveUp(){   
    player1On = false
    moneyB1.board.style.display = 'none'
    moneyB1.moneyBet.innerHTML = '0'
    document.getElementById('playerName').style.opacity = '40%'
    document.getElementById('perfilPlayer').style.opacity = '40%'
    let c1 = c1p1.elem
    let c2 = c2p1.elem
    c1.classList.remove('flip')
    c2.classList.remove('flip')
    posX1 = c1.offsetLeft
    posX2 = c2.offsetLeft
    posY = c1.offsetTop

    backCardsCPU(c1, c2, posX1, posX2, posY, 'id1')
    upPlayerTime()
    if(playerTimeEnd == 1){
        playerTimeEnd = 2
    }
}

function upBet(){
    if(money1 > currentBet){
        okUpBet()
    } else if(skipTable && money1 >= currentBet){
        okUpBet()
    } else if(money1 == 1){
        okUpBet(1)
    }

    function okUpBet(n){
        if(n == undefined){
            if(skipTable){
                betMoney = currentBet
            } else {
                betMoney = currentBet + 1
            }

        } else {
            betMoney = currentBet - 1
        }
        document.getElementById('aumentar').style.display = 'block'
        betMoneyUp.innerHTML = betMoney
        
        document.getElementById('menos5').style.opacity = '30%'
        document.getElementById('menos1').style.opacity = '30%'
        if(betMoney + 5 > money1){
            document.getElementById('mais5').style.opacity = '30%'
            if(betMoney >= money1){
                document.getElementById('mais1').style.opacity = '30%'
            }
        }
    }
}

/* ================================== AUMENTAR APOSTA ================================== */
function mais5(){
    if(!checkMoney(5, betMoney, 1)){
        betMoney += 5
        betMoneyUpAdd(betMoney)
    }
}
function mais1(){
    if(!checkMoney(1, betMoney, 1)){
        betMoney += 1
        betMoneyUpAdd(betMoney)
    }
}
function menos5(){
    if(!checkMoney(5, betMoney, 0)){
        betMoney -= 5
        betMoneyUpAdd(betMoney)
    }
}
function menos1(){
    if(!checkMoney(1, betMoney, 0)){
        betMoney -= 1
        betMoneyUpAdd(betMoney)
    }
}
function checkMoney(n, bet, pm){
    if(pm == 0){
        let cBet = 0
        if(skipTable){
            cBet = currentBet
        } else {
            cBet = currentBet + 1
        }
        bet = bet - n
        if(bet < cBet){
            return true
        }else{

            if(bet < cBet + 5){
                document.getElementById('menos5').style.opacity = '30%'
                if(bet <= cBet){
                    document.getElementById('menos1').style.opacity = '30%'
                }
            }
            if(bet <= money1  + moneyAlreadyBet1){
                document.getElementById('mais1').style.opacity = '100%'
                if(bet + 5 <= money1 + moneyAlreadyBet1){
                    document.getElementById('mais5').style.opacity = '100%'
                }
            }
            return false
        }
    }else{
        bet = bet + n
        if(bet > money1 + moneyAlreadyBet1){
            return true
        }else{
            if(bet + 5 > money1 + moneyAlreadyBet1){
                document.getElementById('mais5').style.opacity = '30%'
                if(bet + 1 > money1 + moneyAlreadyBet1){
                    document.getElementById('mais1').style.opacity = '30%'
                }
            }
            if(bet + 1 >= currentBet){
                document.getElementById('menos1').style.opacity = '100%'
                if(bet - 6 >= currentBet){
                    document.getElementById('menos5').style.opacity = '100%'
                }
            }
            return false
        }
    }
}

var player1AllIn = false
var player2AllIn = false
var player3AllIn = false

document.getElementById('aumAposta').addEventListener('click', sendBet)
function sendBet(){
    money1 -= betMoney - moneyAlreadyBet1
    actionP2.style.display = 'none'
    actionP3.style.display = 'none'
    document.getElementsByClassName('moneyB1')[0].style.display = 'block'
    document.getElementById('betMoney1').innerHTML = betMoney
    currentBet = betMoney
    moneyAlreadyBet1 = betMoney
    actionP1.style.display = 'block'
    skipTable = false

    if(money1 == 0){
        
        actionP1.innerHTML = 'ALL-IN'
        player1AllIn = true
        document.getElementsByClassName('money')[0].style.opacity = '30%'

    } else {
        if(betMoney == 2){
            actionP1.innerHTML = 'PAGOU O BLIND'
        } else {
            actionP1.innerHTML = 'AUMENTOU PARA R$' + betMoney + '.000'
        }
    }

    updateOneMoney('money1', money1)
    x()
    playerTimeEnd = 1
    upPlayerTime()
}

function betMoneyUpAdd(money){
    betMoneyUp.innerHTML = money
}
function x(){
    document.getElementById('aumentar').style.display = 'none'
    betMoney = currentBet
    document.getElementById('mais1').style.opacity = '100%'
    document.getElementById('mais5').style.opacity = '100%'
}

/* ============================ ROUNDS ============================ */

let pot = 0

function newRound(){
    if(!player1On && !player2On){
        endGame(3)
    } else if(!player2On && !player3On){
        endGame(1)
    } else if(!player1On && !player3On){
        endGame(2)
    } else if(player1AllIn || player2AllIn || player3AllIn){

        if(round == 3){
            joinCardsPlayer1()
            checkWinner()
        } else {

            playerTime = 0
            roundNew()

            setTimeout( () => {

                if(player2On && round != 0){
                    if(round == 1){
                        checkCardsTP(2)
                    }
                    joinCards(2, round)
                }

            }, 1700 )

            setTimeout( () => {

                if(player3On && round != 0){
                    if(round == 1){
                        checkCardsTP(3)
                    }
                    joinCards(3, round)
                }

            }, 1800 )


            if(round == 1){
                setTimeout(newRound, 3500)
            } else {
                setTimeout(newRound, 2000)
            }
        }
    
    } else if(round == 3){

        joinCardsPlayer1()
        checkWinner()
    
    } else {
        roundNew()
    }

    function roundNew(){
        if(!flopOn){
            flop()
        } else if(round == 1 || round == 2) {
            turnRiver()
        }
    
        setTimeout( ()=> checkValueCardsT(round), 1600)
    
        document.getElementById('moneyBetTable').style.display = 'block'
        pot += moneyAlreadyBet1 + moneyAlreadyBet2 + moneyAlreadyBet3
        document.getElementById('moneyTable').innerHTML = pot
        setTimeout(clearScreen, 600)
    
        joinPlayer2First = false
        joinPlayer3First = false
        joinPlayer2 = false
        joinPlayer3 = false
        currentBet = 2
        moneyAlreadyBet1 = 0
        moneyAlreadyBet2 = 0
        moneyAlreadyBet3 = 0
        skipTable = true
    }
}

function clearScreen(){
    actionP1.style.display = 'none'
    actionP2.style.display = 'none'
    actionP3.style.display = 'none'
    moneyB1.board.style.display = 'none'
    moneyB1.moneyBet.innerHTML = ''
    moneyB2.board.style.display = 'none'
    moneyB2.moneyBet.innerHTML = ''
    moneyB3.board.style.display = 'none'
    moneyB3.moneyBet.innerHTML = ''
}

function restart(n){
    document.getElementById('btn').style.display = 'none'

    skipTable = false
    currentBet = 2
    betMoney = currentBet
    flopOn = false
    turnOn = false
    riverOn = false
    moneyAlreadyBet1 = 0
    moneyAlreadyBet2 = 0
    moneyAlreadyBet3 = 0
    player1AllIn = false
    player2AllIn = false
    player3AllIn = false
    card1CPU = null
    card2CPU = null
    cardT1 = null
    cardT2 = null
    cardT3 = null
    cardT4 = null
    cardT5 = null
    joinPlayer2First = false
    joinPlayer3First = false
    joinPlayer2 = false
    joinPlayer3 = false
    tiebreakerOn = false
    gameEnd = false
    pot = 0
    NCT = 1




    let i = 0
    while(i < 52){
        cards[i].repeat = false
        i++
    }

    let n1 = 0
    let n2 = 0
    let n3 = 0
    let n4 = 0
    let n5 = 0
    let n6 = 0
    let n7 = 0
    let n8 = 0
    let n9 = 0    

    while(n1 < 7){
        cardsTVP1.pop()
        n1++
    }
    while(n2 < 7){
        cardsTVP2.pop()
        n2++
    }
    while(n3 < 7){
        cardsTVP3.pop()
        n3++
    }
    while(n4 < 7){
        cardsTSP1.pop()
        n4++
    }
    while(n5 < 7){
        cardsTSP2.pop()
        n5++
    }
    while(n6 < 7){
        cardsTSP3.pop()
        n6++
    }
    while(n7 < 7){
        cardsTSP1Copy.pop()
        n7++
    }
    while(n8 < 7){
        cardsTSP2Copy.pop()
        n8++
    }
    while(n9 < 7){
        cardsTSP3Copy.pop()
        n9++
    }
    
    let n0 = 0
    while(n0 < 5){
        cardsTV.pop()
        cardsTS.pop()
        n0++
    }

    if(!player1On){
        document.getElementById('playerName').style.opacity = '100%'
        document.getElementById('perfilPlayer').style.opacity = '100%'    
    }
    if(!player2On){
        document.getElementById('player2Name').style.opacity = '100%'
        document.getElementById('perfilPlayer2').style.opacity = '100%'
    }
    if(!player3On){
        document.getElementById('player3Name').style.opacity = '100%'
        document.getElementById('perfilPlayer3').style.opacity = '100%'    
    }

    player1On = true 
    player2On = true 
    player3On = true

    backCards()
    moveFeedBack(n)

    setTimeout( () => {
        
        if(round > 0){
            document.getElementById('cardT1').remove()
            document.getElementById('cardT2').remove()
            document.getElementById('cardT3').remove()
            if(round > 1){
                document.getElementById('cardT4').remove()
                if(round > 2){
                    document.getElementById('cardT5').remove()
                }
            }
        }
        cardsBackTableOn = false
        round = 0
   
    }, 2500 )

    if(money1 == 0){

        player1On = false
        document.getElementById('playerName').style.opacity = '30%'
        document.getElementById('perfilPlayer').style.opacity = '30%'
        document.getElementsByClassName('moneyB1')[0].style.opacity = '30%'
        document.getElementById('losser').style.display = 'block'

        let id = null
        clearInterval(id)
        let elem = document.getElementById('restart')
        let posX = elem.offsetLeft

        id = setInterval(() => {
                if(posX == 10){
                    clearInterval(id)
                } else {
                    posX++
                    elem.style.left = posX + 'px'
                }
            }
        ,5)
    }
    if(money2 == 0){
        raffleOpponent(2)
        money2 = 200
        updateOneMoney('money2', money2)
        document.getElementsByClassName('money')[1].style.opacity = '100%'
    }
    if(money3 == 0){
        raffleOpponent(3)
        money3 = 200
        updateOneMoney('money3', money3)
        document.getElementsByClassName('money')[2].style.opacity = '100%'
    }

    setTimeout(startGame, 3500)
}


function backCards(){
    let c1p1 = null
    let c2p1 = null
    let c1p2 = null
    let c2p2 = null
    let c1p3 = null
    let c2p3 = null

    c1p1 = document.getElementById('card1P1')
    c2p1 = document.getElementById('card2P1')
    c1p2 = document.getElementById('card1P2')
    c2p2 = document.getElementById('card2P2')
    c1p3 = document.getElementById('card1P3')
    c2p3 = document.getElementById('card2P3')

    c1p1.style.boxShadow = 'none'
    c2p1.style.boxShadow = 'none'

    c1p1.classList.remove('flip')
    c2p1.classList.remove('flip')
    c1p2.classList.remove('flip')
    c2p2.classList.remove('flip')
    c1p3.classList.remove('flip')
    c2p3.classList.remove('flip')

    backCardsCPU(c1p1, c2p1, c1p1.offsetLeft, c2p1.offsetLeft, c1p1.offsetTop, 'id1')
    backCardsCPU(c1p2, c2p2, c1p2.offsetLeft, c2p2.offsetLeft, c1p2.offsetTop, 'id2')
    backCardsCPU(c1p3, c2p3, c1p3.offsetLeft, c2p3.offsetLeft, c1p3.offsetTop, 'id3')
    cardsBackTableOn = true

    let c1T = document.getElementById('cardT1')
    let c2T = document.getElementById('cardT2')
    let c3T = document.getElementById('cardT3')
    let c4T = document.getElementById('cardT4')
    let c5T = document.getElementById('cardT5')

    if(round > 0){
        animationCardTable(c1T, 1)
        animationCardTable(c2T, 2)
        animationCardTable(c3T, 3)
        if(round > 1){
            animationCardTable(c4T, 4)
            if(round > 2){
                animationCardTable(c5T, 5)
            }
        }
    }

}

const hands = ['FLUSH ROYAL', 'QUADRA', 'FULL HOUSE', 'FLUSH', 'SEQUÊNCIA', 'TRINCA', 'DOIS PARES', 'PAR', 'CARTA MAIS ALTA']
let moneyOpc = document.getElementsByClassName('money')

function endGame(player, hand, n){
    document.getElementById('btn').style.display = 'none'
    document.getElementById('moneyBetTable').style.display = 'none'
    
    pot += moneyAlreadyBet1 + moneyAlreadyBet2 + moneyAlreadyBet3
    setTimeout(clearScreen, 600)
    gameEnd = true

    let p = null
    let m = null

    
    let nameWinner = null
    let play = hands[hand]
    let comp = ' '
    let img = document.getElementById('imgWinner')

    if(player == 1){
        money1 += pot
        p = 'money1'
        m = money1
        nameWinner = document.getElementById('playerName').innerText
        img.style.backgroundImage = personSelected
        moneyOpc[0].style.opacity = '100%'

    } else if(player == 2){
        money2 += pot
        p = 'money2'
        m = money2
        nameWinner = document.getElementById('player2Name').innerText
        img.style.backgroundImage = 'url(assets/person/player2-3/' + imgP2 + '.png)'
        moneyOpc[1].style.opacity = '100%'

    } else if(player == 3){
        money3 += pot
        p = 'money3'
        m = money3
        nameWinner = document.getElementById('player3Name').innerText
        img.style.backgroundImage = 'url(assets/person/player2-3/' + imgP3 + '.png)'
        moneyOpc[2].style.opacity = '100%'

    }

    updateOneMoney(p, m)

    if(hand == 0 || hand == 2 || hand == 3 || hand == 7){
        comp = ' UM '
    } else if(hand == 1 || hand == 4 || hand == 5){
        comp = ' UMA '
    }

    document.getElementById('winner').innerText = nameWinner

    if(hand == undefined){
        document.getElementById('playWinner').innerText = 'GANHOU POR SER O ÚNICO NA MESA'
    } else if(n == undefined){
        if(hand == 8){
            document.getElementById('playWinner').innerText = 'GANHOU PELA ' + play
        } else {
            document.getElementById('playWinner').innerText = 'GANHOU COM' + comp + play
        }
    
    } else if(n == 0){

        document.getElementById('playWinner').innerText = 'GANHOU POR TER' + comp + play + ' MAIOR'
    
    } else if(n == 1){
        if(hand == 2){
            document.getElementById('playWinner').innerText =  'GANHOU POR TER O PAR NO FULL HOUSE MAIOR'
        } else if(hand == 6){
            document.getElementById('playWinner').innerText =  'GANHOU POR TER O SEGUNDO PAR MAIOR'
        } else {
            document.getElementById('playWinner').innerText =  'EMPATOU COM A MESMA MÃO, MAS GANHOU POR TER A CARTA MAIS ALTA'
        }
    } else if(n == 2){
        document.getElementById('playWinner').innerText =  'EMPATOU COM A MESMA MÃO, MAS GANHOU POR TER A CARTA MAIS ALTA'
    } 

    moveFeed(0)
}

function moveFeed(n){
    let elem = null
    if(n == 0){
        elem = document.getElementById('feed')
    } else {
        elem = document.getElementById('feedTie')
    }
    let posY = -180
    let id = null

    clearInterval(id)

    id = setInterval( () => {
        if(posY == 0){
            clearInterval(id)
        } else {
            posY++
            elem.style.top = posY + 'px'
        }
    }, 10)
}

function moveFeedBack(n){
    let elem = null
    if(n == 0){
        elem = document.getElementById('feed')
    } else {
        elem = document.getElementById('feedTie')
    }

    let posY = 0
    let id = null

    clearInterval(id)

    id = setInterval( () => {
        if(posY == -180){
            clearInterval(id)
        } else {
            posY--
            elem.style.top = posY + 'px'
        }
    }, 10)
}

function tie(p1, p2, hand, p3){
    document.getElementById('btn').style.display = 'none'
    document.getElementById('moneyBetTable').style.display = 'none'

    gameEnd = true
    let playTie = document.getElementById('playTie')
    let playWinner = null
    pot += moneyAlreadyBet1 + moneyAlreadyBet2 + moneyAlreadyBet3
    let part = 0

    if(p3 == undefined){
        let tie1 = null
        let tie2 = null

        let moneyP1 = null
        let moneyP2 = null
        let nameMoney1 = '' 
        let nameMoney2 = ''
        part = parseInt(pot / 2)

        if(p1 != 1 && p2 != 1){

            tie1 = document.getElementById('player2Name').innerText
            tie2 = document.getElementById('player3Name').innerText
            moneyP1 = money3 += part
            moneyP2 = money2 += part
            nameMoney1 = 'money3' 
            nameMoney2 = 'money2'
            moneyOpc[2].style.opacity = '100%'
            moneyOpc[1].style.opacity = '100%'


        } else if(p1 != 2 && p2 != 2){

            tie1 = document.getElementById('playerName').innerText
            tie2 = document.getElementById('player3Name').innerText
            moneyP1 = money3 += part
            moneyP2 = money1 += part
            nameMoney1 = 'money3' 
            nameMoney2 = 'money1'
            moneyOpc[2].style.opacity = '100%'
            moneyOpc[0].style.opacity = '100%'

        }  else if(p1 != 3 && p2 != 3){

            tie1 = document.getElementById('player2Name').innerText
            tie2 = document.getElementById('playerName').innerText
            moneyP1 = money1 += part
            moneyP2 = money2 += part
            nameMoney1 = 'money1' 
            nameMoney2 = 'money2'
            moneyOpc[0].style.opacity = '100%'
            moneyOpc[1].style.opacity = '100%'

        }

        playWinner = tie1 + ' E ' + tie2
        playTie.innerText = playWinner + ' EMPATARAM COM ' + hands[hand]

        updateOneMoney(nameMoney1, moneyP1)
        updateOneMoney(nameMoney2, moneyP2)
    } else {
        playWinner = 'TODOS EMPATARAM COM A MESMA MÃO EM COM AS FORÇAS IGUAIS'
        document.getElementById('playTie').innerText = playWinner

        part = parseInt(pot / 3)
        money1 += part
        money2 += part
        money3 += part
        updateMoney(money1, money2, money3)
        moneyOpc[0].style.opacity = '100%'
        moneyOpc[1].style.opacity = '100%'
        moneyOpc[2].style.opacity = '100%'

    }

    pot = 0
    setTimeout(clearScreen, 600)

    moveFeed(1)
}

let tiebreakerOn = false

function checkWinner(){

    playerTime = null

    let player1Power = null
    let player2Power = null
    let player3Power = null

    if(player2On){
        document.getElementById('card1P2').classList.add('flip')
        document.getElementById('card2P2').classList.add('flip')
    }
    if(player3On){
        document.getElementById('card1P3').classList.add('flip')
        document.getElementById('card2P3').classList.add('flip')
    }
    
    if(player1On && player2On && player3On){

        player1Power = checkPowerHandEnd(1)
        player2Power = checkPowerHandEnd(2)
        player3Power = checkPowerHandEnd(3)

    } else if(player1On && player2On){

        player1Power = checkPowerHandEnd(1)
        player2Power = checkPowerHandEnd(2)
        player3Power = 10

    } else if(player1On && player3On){

        player1Power = checkPowerHandEnd(1)
        player3Power = checkPowerHandEnd(3)
        player2Power = 10

    } else if(player2On && player3On){

        player2Power = checkPowerHandEnd(2)
        player3Power = checkPowerHandEnd(3)
        player1Power = 10
    }

    player1Power = Number(player1Power)
    player2Power = Number(player2Power)
    player3Power = Number(player3Power)

    if(player1Power < player2Power && player1Power < player3Power){
        endGame(1, player1Power)
    
    } else if(player2Power < player1Power && player2Power < player3Power){
        endGame(2, player2Power)
    
    } else if(player3Power < player2Power && player3Power < player1Power){
        endGame(3, player3Power)
    
    } else if(player1Power < player2Power && player1Power == player3Power){
        tiebreaker(1, 3, player3Power)

    } else if(player1Power < player3Power && player1Power == player2Power){
        tiebreaker(1, 2, player1Power)

    } else if(player2Power < player1Power && player2Power == player3Power){
        tiebreaker(2, 3, player3Power)

    } else {
        tiebreaker(1, 2, player3Power, 3)
    }
}

function tiebreaker(p1, p2, hand, p3){
    tiebreakerOn = true
    let player1 = null
    let player2 = null
    let player3 = null

    if(p3 == undefined){

        player1 = checkPowerHandEnd(p1)
        player2 = checkPowerHandEnd(p2)

        let i = 0
        let tiee = 0
        let len = player1.length - 1

        while(i <= 2){

            if(Number(player1[i]) > Number(player2[i])){
                endGame(p1, hand, i)
                i = 5
            } else if(Number(player2[i]) > Number(player1[i])){
                endGame(p2, hand, i)
                i = 5
            } else if(Number(player2[i]) == Number(player1[i])){
                tiee++

                if(tiee >= 2 && player2[len] == player1[len]){
                    tie(p1, p2, hand)
                }
            }
            i++
        }
    } else {
        
        player1 = checkPowerHandEnd(p1)
        player2 = checkPowerHandEnd(p2)
        player3 = checkPowerHandEnd(p3)


        let i = 0
        let tiee = 0
        let len = player1.length - 1
        while(i <= 2){

            if(Number(player1[i]) > Number(player2[i]) && Number(player1[i]) > Number(player3[i])){
                endGame(p1, hand, i)
                i = 5
            } else if(Number(player2[i]) > Number(player1[i]) && Number(player2[i]) > Number(player3[i])){
                endGame(p2, hand, i)
                i = 5
            } else if(Number(player3[i]) > Number(player1[i]) && Number(player3[i]) > Number(player2[i])){
                endGame(p3, hand, i)
                i = 5
            } else if(player1[i] == player2[i] && player1[i] == player3[i]){

                tiee++
                if(tiee >= 2 && player1[len] == player2[len] && player1[len] == player3[len]){
                    tie(1, 2, hand, 3)
                }
            }
            i++
        }
    }


}

/* =============================== INTELIGÊNCIA =============================== */

let moneyCPU = null
let card1CPU = null
let card2CPU = null
let c1CPU = null
let c2CPU = null
let card1Value = null
let card2Value = null
let mABet = null
let betBoardCPU = null
let betCPU = null
let actionCPU = null
let stringMoney = null
let name = null
let img = null
let posX1 = 0
let posX2 = 0
let posY = 0
let posYEnd = 0
let playerOn = null

function player1orPlayer2(playerTime){

    if(playerTime == 1){
        card1CPU = document.getElementById('c1p1')
        card2CPU = document.getElementById('c2p1')
    }else if(playerTime == 2){
        moneyCPU = money2
        mABet = moneyAlreadyBet2
        card1CPU = document.getElementById('c1p2')
        card2CPU = document.getElementById('c2p2')
        c1CPU = document.getElementById('card1P2')
        c2CPU = document.getElementById('card2P2')
        betBoardCPU = moneyB2.board
        betCPU = moneyB2.moneyBet
        actionCPU = actionP2
        stringMoney = 'money2'
        name = document.getElementById('player2Name')
        img = document.getElementById('perfilPlayer2')
        playerOn = player3On
    } else {
        moneyCPU = money3
        mABet = moneyAlreadyBet3
        card1CPU = document.getElementById('c1p3')
        card2CPU = document.getElementById('c2p3')
        c1CPU = document.getElementById('card1P3')
        c2CPU = document.getElementById('card2P3')
        betBoardCPU = moneyB3.board
        betCPU = moneyB3.moneyBet
        actionCPU = actionP3
        stringMoney = 'money3'
        name = document.getElementById('player3Name')
        img = document.getElementById('perfilPlayer3')
        playerOn = player3On
    }

    card1Value = card1CPU.attributes.value.value
    card2Value = card2CPU.attributes.value.value
    card1Suit = card1CPU.attributes.suit.value
    card2Suit = card2CPU.attributes.suit.value

}


let animationLoad = null
function msnLoad(n){

    let boardLoad = null
    let content1 = null
    let content2 = null
    let content3 = null
    let value1 = 99
    let value2 = 77
    let value3 = 55
    let c1plus = false
    let c2plus = false
    let c3plus = false

    if(playerTime == 2){
        boardLoad = document.getElementById('loading2')
        content1 = document.getElementById('content1p2')
        content2 = document.getElementById('content2p2')
        content3 = document.getElementById('content3p2')
    } else if(playerTime == 3){
        boardLoad = document.getElementById('loading3')
        content1 = document.getElementById('content1p3')
        content2 = document.getElementById('content2p3')
        content3 = document.getElementById('content3p3')
    }
    clearInterval(animationLoad)
    boardLoad.style.display = 'block'
    setTimeout( () => clearInterval(animationLoad) ,n)
    animationLoad = setInterval(frameLoad, 10)

    function frameLoad (){
        if(c1plus){
            if(value1 == 100){
                c1plus = false
                value1 -= 1
            } else {
                value1 += 1
            }
        } else {
            if(value1 == 0){
                c1plus = true
                value1 += 1
            } else {
                value1 -= 1
            }
        }
        content1.style.opacity = value1 +'%'

        if(c2plus){
            if(value2 == 100){
                c2plus = false
                value2 -= 1
            } else {
                value2 += 1
            }
        } else {
            if(value2 == 0){
                c2plus = true
                value2 += 1
            } else {
                value2 -= 1
            }
        }
        content2.style.opacity = value2 +'%'

        if(c3plus){
            if(value3 == 100){
                c3plus = false
                value3 -= 1
            } else {
                value3 += 1
            }
        } else {
            if(value3 == 0){
                c3plus = true
                value3 += 1
            } else {
                value3 -= 1
            }
        }
        content3.style.opacity = value3 +'%'
    }
}


function loadPlayCPU(){
    let n = Math.round(Math.random() * 10000)
    while(n < 3000){
        n = Math.round(Math.random() * 10000)
    }
    msnLoad(n)
    setTimeout(playCPU, n)
}


function playCPU(){
    player1orPlayer2(playerTime)

    let powerHand = null
    if(playerTime == 2){
        document.getElementById('loading2').style.display = 'none'
    } else {
        document.getElementById('loading3').style.display = 'none'
    }

    card1Value = Number(card1Value)
    card2Value = Number(card2Value)

    if(round == 1){
        checkCardsTP(playerTime)
    }

    if(round == 0){

        if(card1Value >= 10 && card1Value == card2Value){
            powerHand = 7
        } else if(card1Value == card2Value){
            powerHand = 7
        } else if(card1Value >= 9 && card2Value >= 9) {
            powerHand = 6
        } else if(card1Value + 1 == card2Value > 6 || card2Value + 1 == card1Value > 6 || card1Suit == card2Suit > 6){
            powerHand = 5
        } else if(card1Value >= 7 && card2Value >= 7) {
            powerHand = 4
        } else if(card1Value + 1 == card2Value || card2Value + 1 == card1Value || card1Suit == card2Suit){
            powerHand = 4
        } else if(card1Value > 10 || card2Value > 10) {
            powerHand = 4
        }else {
            powerHand = 3
        }
    } else {
        joinCards(playerTime, round)
        powerHand = checkHandCPU()
    }


    FbetCPU(powerHand, mABet)
    upPlayerTime()
}

function FbetCPU(powerHand, mABet){

    if(round == 0){
        
        if(powerHand >= 5 && currentBet <= 5 && bluff(2, 0)){
            betUpCPU(5)
        } else if(powerHand >= 5){
            approvedBetCPU()
        } else if(powerHand == 4 && currentBet <= 5 && bluff(3, 0)){
            betUpCPU(5)
        } else if(powerHand == 4 && currentBet <= 10){
            approvedBetCPU()
        } else if(powerHand == 4 && bluff(2, mABet)){
            approvedBetCPU()
        } else if(currentBet <= 5 && bluff(2, mABet)){
            approvedBetCPU()
        } else if(bluff(3, mABet)){
            approvedBetCPU()
        } else if(currentBet == 2 && bluff(2, mABet)){
            approvedBetCPU()
        } else {
            giveUpCPU()
        }

    } else if(round == 1){
        
        if(powerHand >= 5 && currentBet <= 5){
            betUpCPU(5)
        } else if(powerHand >= 4 && currentBet <= 5 && bluff(2, 0)){
            betUpCPU(5)
        } else if(powerHand >= 4 && currentBet == 2){
            betUpCPU(2)
        } else if(powerHand >= 3 && currentBet <= 10 && currentBet >= 3){
            approvedBetCPU()
        } else if(currentBet <= 5 && currentBet >= 3 && bluff(2, mABet)){
            approvedBetCPU()
        } else {
            if(skipTable){
                skipCPU()
            } else {
                if(bluff(4, 0)){
                    approvedBetCPU()
                } else {
                    giveUpCPU()
                }
            }
        }
    
    } else if(round == 2){

        if(powerHand >= 6 && currentBet <= 5){
            betUpCPU(5)
        } else if(powerHand >= 4 && currentBet <= 5 && bluff(2, 0)){
            betUpCPU(5)
        } else if(powerHand >= 4 && currentBet == 2){
            betUpCPU(2)
        } else if(powerHand >= 3 && bluff(4, 0)){
            betUpCPU(5)
        } else if(bluff(5, 0)){
            betUpCPU(5)
        } else if(powerHand >= 4 && currentBet == 2){
            betUpCPU(2)
        } else if(powerHand >= 4 && currentBet <= 5){
            approvedBetCPU()
        } else if(powerHand >= 3 && currentBet >= 3 && currentBet <= 5 && bluff(2, mABet)){
            approvedBetCPU()
        } else if(currentBet <= 5 && currentBet >= 3 && bluff(3, mABet)){
            approvedBetCPU()
        } else {
            if(skipTable){
                skipCPU()
            } else {
                if(bluff(4, 0)){
                    approvedBetCPU()
                } else {
                    giveUpCPU()
                }
            }
        }

    } else {

        if(powerHand >= 6 && currentBet <= 10){
            betUpCPU(10)
        } else if(powerHand >= 5 && currentBet <= 5){
            betUpCPU(5)
        } else if(powerHand >= 4 && bluff(4, 0)){
            betUpCPU(10)
        } else if(powerHand >= 4 && bluff(3, 0)){
            betUpCPU(5)
        } else if(powerHand >= 4 && currentBet == 2){
            betUpCPU(2)
        } else if(powerHand >= 5 && currentBet >= 3 && currentBet <= 10){
            approvedBetCPU()
        } else if(powerHand >= 4 && currentBet >= 3 && currentBet <= 10 && bluff(3, mABet)){
            approvedBetCPU()
        } else if(currentBet >= 3 && currentBet <= 5 && bluff(3, mABet)){
            approvedBetCPU()
        } else {
            if(skipTable){
                skipCPU()
            } else {
                if(bluff(4, 0)){
                    approvedBetCPU()
                } else {
                    giveUpCPU()
                }
            }
        }
        
    }
}

////////////////////////////////////////////// AÇÕES DA CPU //////////////////////////////////////////////

function approvedBetCPU(){
    player1orPlayer2(playerTime)

    betBoardCPU.style.display = 'block'
    actionCPU.style.display = 'block'

    if(moneyCPU + mABet <= currentBet){

        actionCPU.innerHTML = 'ALL-IN'
        betCPU.innerHTML = moneyCPU + mABet
        moneyCPU = 0

        if(playerTime == 2){
            document.getElementsByClassName('money')[1].style.opacity = '30%'
            moneyAlreadyBet2 = money2 + moneyAlreadyBet2
            player2AllIn = true
            money2 = 0
        } else {
            document.getElementsByClassName('money')[2].style.opacity = '30%'
            moneyAlreadyBet3 = money3 + moneyAlreadyBet3
            player3AllIn = true
            money3 = 0
        }
        moneyCPU = 0

    } else {
        let difference = null
        actionCPU.innerHTML = 'PAGOU'
        betCPU.innerHTML = currentBet

        if(playerTime == 2){
            difference = currentBet - moneyAlreadyBet2
            money2 -= difference
            moneyAlreadyBet2 = currentBet
            moneyCPU = money2
        } else {
            difference = currentBet - moneyAlreadyBet3
            money3 -= difference
            moneyAlreadyBet3 = currentBet
            moneyCPU = money3
        }
    }

    updateOneMoney(stringMoney, moneyCPU)

}

function approvedBetUpCPU(n){

    skipTable = false

    player1orPlayer2(playerTime)
    playerTimeEnd = playerTime
    actionP1.style.display = 'none'
    actionP2.style.display = 'none'
    actionP3.style.display = 'none'
    
    betBoardCPU.style.display = 'block'
    actionCPU.style.display = 'block'

    if(n >= moneyCPU + mABet){

        actionCPU.innerHTML = 'ALL-IN'
        betCPU.innerHTML = moneyCPU + mABet
        
        if(playerTime == 2){
            moneyAlreadyBet2 += money2
            currentBet = moneyAlreadyBet2
            player2AllIn = true
            money2 = 0
            document.getElementsByClassName('money')[1].style.opacity = '30%'
        } else {
            moneyAlreadyBet3 += money3
            currentBet = moneyAlreadyBet3
            player3AllIn = true
            money2 = 0
            document.getElementsByClassName('money')[2].style.opacity = '30%'
        }

        updateOneMoney(stringMoney, 0)
    } else {

        if(n == 2){
            actionCPU.innerHTML = 'PAGOU O BLIND'
        } else {
            actionCPU.innerHTML = 'AUMENTOU PARA R$' + n + '.000'
        }

        betCPU.innerHTML = n
        let difference = null
        currentBet = n
        if(playerTime == 2){
            difference = n - moneyAlreadyBet2
            moneyAlreadyBet2 = currentBet
            money2 -= difference
            moneyCPU = money2
        } else {
            difference = n - moneyAlreadyBet3
            moneyAlreadyBet3 = currentBet
            money3 -= difference
            moneyCPU = money3
        }

        updateOneMoney(stringMoney, moneyCPU)
    }

}

function giveUpCPU(){
    player1orPlayer2(playerTime)
    if(playerTime == 2){
        player2On = false
    } else {
        player3On = false
    }
    betCPU.innerHTML = '0'
    name.style.opacity = '40%'
    img.style.opacity = '40%'

    let posX1 = c1CPU.offsetLeft
    let posX2 = c2CPU.offsetLeft
    let posY = c1CPU.offsetTop
    let id = null
    if(playerTime == 2){
        id = 'id2'
    } else {
        id = 'id3'
    }

    backCardsCPU(c1CPU, c2CPU, posX1, posX2, posY, id)
}

function skipCPU(){
    player1orPlayer2(playerTime)

    actionCPU.style.display = 'block'
    actionCPU.innerHTML = 'PASSOU'
} 

function betUpCPU(n){
    let nRandom =  Math.floor(Math.random() * 5)
    let valueUpBet = 0
    
    if(n == 2){
        valueUpBet = 2
    } else if(n == 5){

        if(nRandom == 0){
            valueUpBet = 3
        } else if(nRandom == 1){
            valueUpBet = 5
        } else if(nRandom == 2){
            valueUpBet = 6
        } else if(nRandom == 3){
            valueUpBet = 8
        } else {
            valueUpBet = 10
        }

    } else if(n == 10){

        if(nRandom == 0){
            valueUpBet = 10
        } else if(nRandom == 1){
            valueUpBet = 12
        } else if(nRandom == 2){
            valueUpBet = 15
        } else if(nRandom == 3){
            valueUpBet = 18
        } else{
            valueUpBet = 20
        }
    } else {
        valueUpBet = currentBet
    }

    if(valueUpBet == 2){
        approvedBetUpCPU(2)
    } else {

        if(player1AllIn || player2AllIn || player3AllIn || valueUpBet <= currentBet){
            approvedBetCPU()
        } else {
    
            if(moneyAlreadyBet1 + money1 <= valueUpBet && player1On){
                valueUpBet = moneyAlreadyBet1 + money1
                
            } else if(moneyAlreadyBet2 + money2 <= valueUpBet){
                valueUpBet = moneyAlreadyBet2 + money2
                
            } else if(moneyAlreadyBet3 + money3 <= valueUpBet){
                valueUpBet = moneyAlreadyBet3 + money3
            }
    
            approvedBetUpCPU(valueUpBet)
        }
    }


}

function bluff(level, moneyAll){
    
    let nRandom = Math.round(Math.random() * 10)
    
    if(level == 5){
        if(nRandom == 10){
            return true
        } else if(moneyAll >= 10 && nRandom >= 6) {
            return true
        } else {
            return false
        }
    } else if(level == 4){
        if(nRandom >= 9){
            return true
        } else if(moneyAll >= 6 && nRandom >= 5) {
            return true
        } else {
            return false
        }
    } else if(level == 3){
        if(nRandom >= 7){
            return true
        } else if(moneyAll >= 5 && nRandom >= 4){
            return true
        } else {
            return false
        }
    } else if(level == 2){
        if(nRandom >= 5){
            return true
        } else if(moneyAll >= 1 && nRandom >= 3){
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

function backCardsCPU(c1, c2, posX1, posX2, posY, id){

    let iX = 1
    let negative = false

    let animationBackCards = null

    let animationBackCards1 = null
    let animationBackCards2 = null
    let animationBackCards3 = null


    if(id == 'id1'){

        animationBackCards = animationBackCards1
        negative = true

    } else if(id == 'id2'){

        animationBackCards = animationBackCards2
        negative = false

    } else if(id == 'id3'){

        animationBackCards = animationBackCards3
        negative = true
        iX = 3

    }

    clearInterval(animationBackCards)
    animationBackCards = setInterval(frameBack, 3)

    function frameBack(){

        if(posY == 0){
            clearInterval(animationBackCards)

            c1.style.left = 0
            c2.style.left = 0

            c1.style.boxShadow = '2px 2px 2px rgba(0, 0, 0, 0.5)'
            c2.style.boxShadow = '2px 2px 2px rgba(0, 0, 0, 0.5)'
            
        } else {
            if(negative){
                posX1 -= iX
                posX2 -= iX
            } else {
                posX1 += iX
                posX2 += iX
            }
            posY--

            c1.style.left = posX1 + 'px'
            c2.style.left = posX2 + 'px'
            c1.style.top = posY + 'px'
            c2.style.top = posY + 'px'
        }
    }

}


/* ================================ JUNTANDO AS CARTAS ================================ */

var cardT1 = null
var cardT2 = null
var cardT3 = null
var cardT4 = null
var cardT5 = null

var cardTV1 = null
var cardTV2 = null
var cardTV3 = null
var cardTV4 = null
var cardTV5 = null

var cardTS1 = null
var cardTS2 = null
var cardTS3 = null
var cardTS4 = null
var cardTS5 = null

let cardsTV = []
let cardsTS = []

function checkValueCardsT(r){
    if(r == 1){
        cardT1 = document.getElementById('cT1');
        cardT2 = document.getElementById('cT2');
        cardT3 = document.getElementById('cT3');

        cardTV1 = cardT1.attributes.value.value;
        cardTV2 = cardT2.attributes.value.value;
        cardTV3 = cardT3.attributes.value.value;

        cardTS1 = cardT1.attributes.suit.value;
        cardTS2 = cardT2.attributes.suit.value;
        cardTS3 = cardT3.attributes.suit.value;

        cardsTV.push(cardTV1, cardTV2, cardTV3)
        cardsTS.push(cardTS1, cardTS2, cardTS3)
    } else if(r == 2){

        cardT4 = document.getElementById('cT4');
        cardTV4 = cardT4.attributes.value.value;
        cardTS4 = cardT4.attributes.suit.value;
        
        cardsTV.push(cardTV4)
        cardsTS.push(cardTS4)
    
    } else if(r == 3){

        cardT5 = document.getElementById('cT5');
        cardTV5 = cardT5.attributes.value.value;
        cardTS5 = cardT5.attributes.suit.value;

        cardsTV.push(cardTV5)
        cardsTS.push(cardTS5)
 
    }
}

let cardsTVP1 = []
let cardsTVP2 = []
let cardsTVP3 = []

let cardsTSP1 = []
let cardsTSP2 = []
let cardsTSP3 = []

let cardsTSP1Copy = []
let cardsTSP2Copy = []
let cardsTSP3Copy = []

let joinPlayer2First = false
let joinPlayer3First = false
let joinPlayer2 = false
let joinPlayer3 = false

function checkCardsTP(playerTime){
    player1orPlayer2(playerTime)
    if(playerTime == 2 && !joinPlayer2First){
        cardsTSP2.push(card1Suit)
        cardsTSP2.push(card2Suit)
        joinCardCopy(cardsTVP2, cardsTSP2Copy, card1Value, card1Suit)
        joinCardCopy(cardsTVP2, cardsTSP2Copy, card2Value, card2Suit)
        joinPlayer2First = true
    } else if(playerTime == 3 && !joinPlayer3First){
        cardsTSP3.push(card1Suit)
        cardsTSP3.push(card2Suit)
        joinCardCopy(cardsTVP3, cardsTSP3Copy, card1Value, card1Suit)
        joinCardCopy(cardsTVP3, cardsTSP3Copy, card2Value, card2Suit)
        joinPlayer3First = true
    }
}

function joinCardsPlayer1(){
    card1 = document.getElementById('c1p1')
    card2 = document.getElementById('c2p1')

    card1Value = card1.attributes.value.value;
    card2Value = card2.attributes.value.value;
    card1Suit = card1.attributes.suit.value;
    card2Suit = card2.attributes.suit.value;

    cardsTSP1.push(card1Suit)
    cardsTSP1.push(card2Suit)

    joinCardCopy(cardsTVP1, cardsTSP1Copy, card1Value, card1Suit)
    joinCardCopy(cardsTVP1, cardsTSP1Copy, card2Value, card2Suit)

    let i = 0
    cardsTS.forEach(() => {
        cardsTSP1.push(cardsTS[i])
        joinCardCopy(cardsTVP1, cardsTSP1Copy, cardsTV[i], cardsTS[i])
        i++
    })

    cardsTSP1.sort()
    cardsTSP1.reverse()
}

function joinCards(playerTime, round){

     if(round == 1){
        let i = 0
        if(playerTime == 2 && !joinPlayer2){
            cardsTS.forEach(() => {
                cardsTSP2.push(cardsTS[i])
                joinCardCopy(cardsTVP2, cardsTSP2Copy, cardsTV[i], cardsTS[i])
                i++
            })

            joinPlayer2 = true
        } else if(playerTime == 3 && !joinPlayer3){
            cardsTS.forEach(() => {
                cardsTSP3.push(cardsTS[i])
                joinCardCopy(cardsTVP3, cardsTSP3Copy, cardsTV[i], cardsTS[i])
                i++
            })

            joinPlayer3 = true
        }
    }else if(round == 2){
        let cardV = cardT4.attributes.value.value
        let cardS = cardT4.attributes.suit.value

        if(playerTime == 2 && joinPlayer2 == false){

            cardsTSP2.push(cardS)            
            joinCardCopy(cardsTVP2, cardsTSP2Copy, cardV, cardS)
            joinPlayer2 = true

        } else if(playerTime == 3 && joinPlayer3 == false){

            cardsTSP3.push(cardS)            
            joinCardCopy(cardsTVP3, cardsTSP3Copy, cardV, cardS)
            joinPlayer3 = true
        
        }
    }else if(round == 3){
        let cardV = cardT5.attributes.value.value
        let cardS = cardT5.attributes.suit.value

        if(playerTime == 2 && joinPlayer2  == false){

            cardsTSP2.push(cardS)
            joinCardCopy(cardsTVP2, cardsTSP2Copy, cardV, cardS)
            joinPlayer2 = true

        } else if(playerTime == 3 && joinPlayer3  == false){

            cardsTSP3.push(cardS)
            joinCardCopy(cardsTVP3, cardsTSP3Copy, cardV, cardS)
            joinPlayer3 = true
        }
    }

    if(playerTime == 2){
        cardsTSP2.sort()
    } else {
        cardsTSP3.sort()
    }
}

function joinCardCopy(cardsAllCopyV, cardsAllCopyS, cardV, cardS){
    let n = cardsAllCopyV.length - 1
    cardsAllCopyV.push(cardV)
    cardsAllCopyS.push(cardS)
    if(Number(cardV) < Number(cardsAllCopyV[n])){
        organize(cardsAllCopyV, cardsAllCopyS)
    }
}

function organize(cardsAllCopyV, cardsAllCopyS){
    let n2 = cardsAllCopyV.length
    n2--
    let n1 = n2 - 1

    while(n1 >= 0){
        if(Number(cardsAllCopyV[n2]) < Number(cardsAllCopyV[n1])){
            [cardsAllCopyV[n2], cardsAllCopyV[n1]] = [cardsAllCopyV[n1], cardsAllCopyV[n2]];
            [cardsAllCopyS[n2], cardsAllCopyS[n1]] = [cardsAllCopyS[n1], cardsAllCopyS[n2]];
        }
        n1--
        n2--
    }
}


/* ===-===-===-===-===-===-===-===-===-===-===-===- CHECANDO JOGADAS -===-===-===-===-===-===-===-===-===-===-===-===*/

function checkHandCPU(){
    player1orPlayer2(playerTime)

    let cardsV = null
    let cardsS = null
    let cardsSCopy = null

    if(playerTime == 2){
        cardsV = cardsTVP2
        cardsS = cardsTSP2
        cardsSCopy = cardsTSP2Copy
    } else {
        cardsV = cardsTVP3
        cardsS = cardsTSP3
        cardsSCopy = cardsTSP3Copy
    }
    
    if(straightFlush(cardsV, cardsSCopy)){
        return 10
    } else if(fourOfAKind(cardsV)){
        return 9
    } else if(fullHouse(cardsV)){
        return 8
    } else if(flush(cardsS, cardsV, cardsSCopy)){
        return 7
    } else if(straight(cardsV) || threeOfAKind(cardsV)){
        return 6
    } else if(twoPair(cardsV)){
        return 5
    } else if(pair(cardsV)){
        return 4
    } else if(checkFourStraight(cardsV) || checkFourFlush(cardsS)){
        return 3
    } else if(checkThreeStraight(cardsV)){
        return 2
    } else {
        return 1
    }
}


// =============================================== CHECK FINAL  =============================================== //

function checkPowerHandEnd(p){
    let cardsV = null
    let cardsS = null
    let cardsSCopy = null

    if(p == 1){
        cardsV = cardsTVP1
        cardsS = cardsTSP1
        cardsSCopy = cardsTSP1Copy
    }else if(p == 2){
        cardsV = cardsTVP2
        cardsS = cardsTSP2
        cardsSCopy = cardsTSP2Copy
    } else {
        cardsV = cardsTVP3
        cardsS = cardsTSP3
        cardsSCopy = cardsTSP3Copy
    }

    let gameHand = null

    if(straightFlush(cardsV, cardsSCopy)){
        if(tiebreakerOn){
            gameHand = straightFlush(cardsV, cardsSCopy)
        } else {
            gameHand = 0
        }
    }else if(fourOfAKind(cardsV)){
        if(tiebreakerOn){
            gameHand = fourOfAKind(cardsV)
        } else {
            gameHand = 1
        }
    }else if(fullHouse(cardsV)){
        if(tiebreakerOn){
            gameHand = fullHouse(cardsV)
        } else {
            gameHand = 2
        }
    }else if(flush(cardsS, cardsV, cardsSCopy)){
        if(tiebreakerOn){
            gameHand = flush(cardsS, cardsV, cardsSCopy)
        } else {
            gameHand = 3
        }
    }else if(straight(cardsV)){
        if(tiebreakerOn){
            gameHand = straight(cardsV)
        } else {
            gameHand = 4
        }
    }else if(threeOfAKind(cardsV)){
        if(tiebreakerOn){
            gameHand = threeOfAKind(cardsV)
        } else {
            gameHand = 5
        }
    }else if(twoPair(cardsV)){
        if(tiebreakerOn){
            gameHand = twoPair(cardsV)
        } else {
            gameHand = 6
        }
    }else if(pair(cardsV)){
        if(tiebreakerOn){
            gameHand = pair(cardsV)
        } else {
            gameHand = 7
        }
    }else{
        if(tiebreakerOn){
            gameHand = [0, 0, cardsV[6]]
        } else {
            gameHand = 8
        }
    }
    return gameHand
}


function straightFlush(cardsV, cardsS){
    if(straight(cardsV)){

        let ii = 3
        let nn = 4
        let n = 5
        let n2 = 6
        let nn2 = 7
        let nn3 = 8
        let nn4 = 9

        let seq = 0
        let seqA = 0

        let len = cardsV.length - 1
        let lenn = cardsV.length - 2
        let lennn = cardsV.length - 3
        let i2 = 0
        let i3 = 1
        let i4 = 2
        let i5 = 3
        let suit = null

        if(cardsV[len] == '14' && cardsV[i2] == '2' && cardsV[i3] >= 2 && cardsV[i3] <= 3 && cardsV[i4] >= 2 && cardsV[i4] <= 4){
            if(cardsV[len] == cardsV[lenn]){
                if(cardsV[len] == cardsV[lennn]){
                    if(cardsS[i2] == cardsS[len] || cardsS[i2] == cardsS[lenn] || cardsS[i2] == cardsS[lennn]){
                        seqA++
                        suit = cardsS[i2]
                    }
                } else if(cardsV[i2] == cardsV[i3]){
                    if(cardsS[i2] == cardsS[len] || cardsS[i2] == cardsS[lenn]){
                        
                        if(cardsS[i4] == cardsS[i2]){
                            seqA++
                            suit = cardsS[i2]
                        }
                    }
                    if(cardsS[i3] == cardsS[len] || cardsS[i3] == cardsS[lenn]){

                        if(cardsS[i3] == cardsS[i4]){
                            seqA++
                            suit = cardsS[i3]
                        }
                    }
                } else {
                    if(cardsS[i2] == cardsS[len] || cardsS[i2] == cardsS[lenn]){
                        seqA++
                        suit = cardsS[i2]
                    }
                }
            } else if(cardsV[i2] == cardsV[i3]){
                
                if(cardsS[i2] == cardsS[len] || cardsS[i3] == cardsS[len]){
                    seqA++
                    suit = cardsS[len]
                } else if(cardsV[i2] == cardsV[i4]){
                    if(cardsS[i2] == cardsS[len] || cardsS[i3] == cardsS[len] || cardsS[i4] == cardsS[len]){
                        seqA++
                        suit = cardsS[len]
                    }
                }
            } else if(cardsS[i2] == cardsS[len]) {
                seqA++
                suit = cardsS[len]
            } else {
                i2 = 5
            }
    
            while(i2 <= 5){

                if(Number(cardsV[i2]) + 1 == cardsV[i3]){
                    if(cardsS[i3] == suit){
                        seqA++
                    } else if(cardsV[i3] == cardsV[i4] && cardsS[i4] == suit){
                        seqA++
                    } else if(cardsV[i3] == cardsV[i5] && cardsS[i5] == suit){
                        seqA++
                    } else{
                        seqA = 0
                    }

                } else if(cardsV[i2] != cardsV[i3]){
                    seqA = 0
                }
                i2++
                i3++
                i4++
                i5++
    
                if(seqA >= 4){
                    if(tiebreakerOn){
                        return ['5', cardsV[5]]
                    } else {
                        return true
                    }
                }
            }
        }
    
        while(n >= 0){

            if(Number(cardsV[n]) + 1 == cardsV[n2]){
                    
                if(cardsS[n] == cardsS[n2]){
                    if(seq != 0){
                        if(cardsS[n] == cardsS[nn2] || cardsS[n] == cardsS[nn3] || cardsS[n] == cardsS[nn4]){
                            seq++
                        } else if(cardsV[n] == cardsV[nn] && cardsS[nn] == cardsS[nn3]){
                            seq++
                        }
                    } else if(seq == 0){
                        seq++
                    }

                } else if(cardsV[n] == cardsV[nn]){
                        
                    if(cardsS[nn] == cardsS[n2]){
                        seq++
                    } else if(cardsV[n2] == cardsV[nn2]){
                        if(cardsS[nn2] == cardsS[n] || cardsS[nn2] == cardsS[nn]){
                            seq++
                        } else {
                            seq = 0
                        }
                    } else if(cardsV[n] == cardsV[ii]){
                    
                        if(cardsS[ii] == cardsS[n2]){
                            seq++
                        } else {
                            seq = 0
                        }
                    } else if(cardsV[n2] == cardsV[nn2]){
                        
                        if(cardsS[n] == cardsS[nn3] ||  cardsS[nn] == cardsS[nn3]){
                            seq++
                        } else {
                            seq = 0
                        }}
                } else if(Number(cardsV[n]) + 1 == cardsV[nn2]){
                    if(cardsS[n] == cardsS[nn2]){
                        seq++
                    } else if(Number(cardsV[n]) + 1 == cardsV[nn3] && cardsS[n] == cardsS[nn3]){
                        seq++
                    }}
            
            } else if(cardsV[n] != cardsV[n2]){
                seq = 0
            }

            if(seq >= 4){
                let nnn = 6
                let iii = 5
                let ini = 4
                let nin = 3
                let seqq = 0

                while(seqq <= 4){
                    if(cardsV[nnn] == cardsV[iii] && Number(cardsV[ini]) + 1 == cardsV[iii] &&  Number(cardsV[nin]) + 1 == cardsV[ini]){
                        seqq = 5
                    } else if(Number(cardsV[iii]) + 1 == cardsV[nnn] && Number(cardsV[ini]) + 1 == cardsV[iii]){
                        seqq = 5
                    } else if(Number(cardsV[iii]) + 1 == cardsV[nnn] && Number(cardsV[nin]) + 1 == cardsV[ini] && cardsV[ini] == cardsV[iii]){
                        seqq = 5
                    } else if(cardsV[iii] == cardsV[nnn] && cardsV[iii] == cardsV[ini] && Number(cardsV[nin]) + 1 == cardsV[ini]){
                        seqq = 5
                    } else {
                        nnn--
                        iii--
                        ini--
                        nin--
                        seqq++
                    }
                }

                if(tiebreakerOn){
                    return [cardsV[nnn], selectCardHigh1()]
                } else {
                    return true
                }
            }

            n--
            n2--
            nn--
            ii--
            nn2--
            nn3--
            nn4--
        }
    }

    function selectCardHigh1(){
        let i = 5
        let n = 6

        if(Number(cardsV[5]) + 1 != cardsV[6]){
            return cardsV[6]
        } else if(Number(cardsV[4]) + 1 != cardsV[5] && cardsV[6] != cardsV[5]){
            return cardsV[6]
        } else {
            while(Number(cardsV[i]) + 1 == cardsV[n] || i == 0){
                i--
                n--
            }
            return cardsV[i]
        }
    }

    return false
}


function fourOfAKind(cardsV){

    let i = 3
    let n = 4
    let n2 = 5
    let n3 = 6

    while(i >= 0){
        if(cardsV[i] == cardsV[n] && cardsV[i] == cardsV[n2] && cardsV[i] == cardsV[n3]){
            if(tiebreakerOn){
                return [cardsV[i], cardHigh2()]
            } else {
                return true
            }
        }

        i--
        n--
        n2--
        n3--
    }

    function cardHigh2(){
        let ii = 5
        let nn = 6
        while(ii >= 0){
            if(cardsV[ii] != cardsV[nn]){
                return cardsV[nn]
            }
            ii--
            nn--
        }
    }

    return false
}


function fullHouse(cardsV){

    if(threeOfAKind(cardsV)){
        let i = 5
        let n = 6
        let n2 = 7
        let n3 = 4
        let threeOn = false
        while(i >= 0){
            if(cardsV[i] == cardsV[n] && cardsV[n] != cardsV[n2] && cardsV[i] != cardsV[n3]){
                if(tiebreakerOn){
                    return [cardsV[2], cardsV[i], cardHigh3()]
                } else {
                    return true
                }
            } else if(cardsV[i] == cardsV[n] && cardsV[n] == cardsV[n3] && !threeOn){
                threeOn = true
                i--
                n--
                n2--
                n3--
            }  else if(cardsV[i] == cardsV[n] && threeOn){
                if(tiebreakerOn){
                    return [cardsV[4], cardsV[i], cardHigh3()]
                } else {
                    return true
                }
            }
            i--
            n--
            n2--
            n3--
        }

        function cardHigh3(){
            let ii = 7
            let i = 6
            let n = 5
            let nn = 4

            while(i >= 0){
                if(cardsV[i] != cardsV[n]){
                    if(cardsV[i] != cardsV[ii]){
                        return cardsV[i]
                    }
                    if(cardsV[n] != cardV[nn]){
                        return cardsV[n]
                    }
                }
                
                i--
                n--
                nn--
            }
            return cardsV[0]
        }
        return false
    }
}

function flush(cardsS, cardsV, cardsAllCopyS){
    let i = 2
    let n = 3
    let n2 = 4
    let n3 = 5
    let n4 = 6
    let suit = null
    while(i >= 0){
        if(cardsS[i] == cardsS[n] && cardsS[n] == cardsS[n2] && cardsS[n2] == cardsS[n3] && cardsS[n3] == cardsS[n4]){
            suit = cardsS[i]
            if(tiebreakerOn){
                return [ () => {
                    if(cardsAllCopyS[6] == suit){
                        return cardsV[6]
                    } else if(cardsAllCopyS[5] == suit){
                        return cardsV[5]
                    } else {
                        return cardsV[4]
                    }
                }, cardHigh4(suit)]
            } else {
                return true
            }
        }
        i--
        n--
        n2--
        n3--
        n4--
    }
    function cardHigh4(suit){
        let i = 6
        while(i >= 0){
            if(cardsAllCopyS[i] != suit){
                return cardsV[i]
            }
            i--
        }
    }

    return false
}


function straight(cardsV){
    
    let i = 5
    let n = 5
    let n2 = 6
    let seq = 0

    let len = cardsV.length - 1
    let i2 = 0
    let i3 = 1

    if(cardsV[len] == '14' && cardsV[i2] == '2'){
        let seqA = 0

        while(i2 <= 5){
            if(Number(cardsV[i2]) + 1 == cardsV[i3]){
                seqA++
            } else if(cardsV[i2] != cardsV[i3]){
                seqA = 0
                i2 = 6
            }
            i2++
            i3++

            if(seqA >= 3){
                if(tiebreakerOn){
                    return ['5', cardsV[5]]
                } else {
                    return true
                }
            }
        }   
    }

    let high = 0
    let firstSeq = false
    while(i >= 0){
        if(Number(cardsV[n]) + 1 == cardsV[n2]){
            if(!firstSeq){
                high = cardsV[n2]
                firstSeq = true
            }
            seq++
        } else if(cardsV[n] != cardsV[n2]){
            seq = 0
            firstSeq = false
        }

        if(seq >= 4){
            if(tiebreakerOn){
                return [high, cardHigh5()]
            } else {
                return true
            }
        }

        i--
        n--
        n2--
    }

    function cardHigh5(){
        let i = 5
        let n = 6
        while(i >= 0){
            if(Number(cardsV[i]) + 1 != cardsV[n]){
                return cardsV[n]
            }
            i--
            n--
        }
    }
    return false
}


function threeOfAKind(cardsV){
    let i = 4
    let n1 = 5
    let n2 = 6
    while(i >= 0){
        if(cardsV[i] == cardsV[n1] && cardsV[n1] == cardsV[n2]){
            if(tiebreakerOn){
                return [cardsV[i], cardHigh6()]
            } else {
                return true
            }
        }
        i--
        n1--
        n2--
    }

    function cardHigh6(){
        let ii = 4
        let i = 5
        let n = 6
        let nn = 7

        while(i >= 0){
            if(cardsV[i] != cardsV[n]){
                if(cardsV[n] != cardsV[nn]){
                    return cardsV[n]
                } else if(cardsV[i] != cardsV[ii]){
                    return cardsV[i]
                }
            }
            i--
            n--
        }
    }
    return false
}


function twoPair(cardsV){
    let nPair = 0
    if(pair(cardsV)){
        let i = 6
        let n = 5
        while(n >= 0){

            if(cardsV[n] == cardsV[i] && cardsV[n] != undefined){
                nPair++
            }
            i--
            n--
        }
    }

    let pair1 = null
    let pair2 = null

    if(nPair > 1){
        if(tiebreakerOn){
            return [pairHigh(), secondPairHigh(), cardHigh6()]
        } else {
            return true
        }
    }


    function pairHigh(){
        let i = 5
        let n = 6
        while(i >= 0){
            if(cardsV[i] == cardsV[n]){
                pair1 = cardsV[i]
                return pair1
            }
            n--
            i--
        }
    }

    function secondPairHigh(){
        let i = 5
        let n = 6
        while(i >= 0){
            if(cardsV[i] == cardsV[n] && cardsV[i] != pair1){
                pair2 = cardsV[i]
                return pair2
            }
            n--
            i--
        }
    }

    function cardHigh6(){
        let i = 5
        let n = 6
        while(i >= 0){
            if(cardsV[i] != cardsV[n] && cardsV[n] != pair1 && cardsV[n] != pair2){
                return cardsV[n]
            }
            n--
            i--
        }
    }
    return false
}


function pair(cardsV){

    let i = 5
    let n = 6

    while(i >= 0){

        if(cardsV[i] == cardsV[n] && cardsV[n] != undefined){
            if(tiebreakerOn){
                return [cardsV[i], cardHigh7()]
            } else {
                return true
            }
        }
        i--
        n--
    }
    function cardHigh7(){
        let i = 5
        let n = 6
        let nn = 7

        while(i >= 0){
            if(cardsV[i] != cardsV[n] && cardsV[n] != cardsV[nn]){
                return cardsV[n]
            }
            i--
            n--
            nn--
        }
    }
    return false
}


function checkFourStraight(cardsV){

    let i = 0
    let n = 1
    let n2 = 2
    let n3 = 3
    let n4 = 4

    if (cardsV[6] == '14' && cardsV[0] == '2'){
        if(cardsV[1] == '3' || cardsV[1] == '4' ){
            if(cardsV[2] == '4' || cardsV[2] == '5' ){
                return true
            }
        }
    }

    while(i <= 3){

        if(Number(cardsV[i]) + 1 == cardsV[n] && Number(cardsV[n]) + 1 == cardsV[n2] && Number(cardsV[n2]) + 1 == cardsV[n3]){    
            return true
        } else if (cardsV[n] == cardsV[n2] && Number(cardsV[i]) + 1 == cardsV[n] && Number(cardsV[n2]) + 1 == cardsV[n3] && Number(cardsV[n3]) + 1 == cardsV[n4]){    
            return true
        } else if (cardsV[n2] == cardsV[n3] && Number(cardsV[i]) + 1 == cardsV[n] && Number(cardsV[n]) + 1 == cardsV[n2] && Number(cardsV[n3]) + 1 == cardsV[n4]){    
            return true
        }
        i++
        n++
        n2++
        n3++
        n4++
    }
    return false
}


function checkThreeStraight(cardsV){

    let i = 0
    let n = 1
    let n2 = 2
    let n3 = 3

    while(i <= 3){

        if(Number(cardsV[i]) + 2 == cardsV[n] && Number(cardsV[n]) + 1 == cardsV[n2] && Number(cardsV[n2]) + 1 == cardsV[n3]){    
            return true
        } else if (Number(cardsV[i]) + 1 == cardsV[n] && Number(cardsV[n]) + 2 == cardsV[n2] && Number(cardsV[n2]) + 1 == cardsV[n3]){    
            return true
        } else if (Number(cardsV[i]) + 1 == cardsV[n] && Number(cardsV[n]) + 1 == cardsV[n2] && Number(cardsV[n2]) + 2 == cardsV[n3]){    
            return true
        }
        i++
        n++
        n2++
        n3++
    }
    return false

}


function checkFourFlush(cardsS){

    let i = 0
    let n = 1
    let n2 = 2
    let n3 = 3

    while(i <= 3){

        if(cardsS[i] == cardsS[n] && cardsS[n] == cardsS[n2] && cardsS[n2] == cardsS[n3]){    
            return true
        }
        i++
        n++
        n2++
        n3++
    }
    return false
}