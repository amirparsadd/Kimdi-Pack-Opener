var playerslist = document.getElementById("players-list")
var goButton = document.getElementById("btn-open-pack")
var openButton = document.getElementById("btn-open")
var backButton = document.getElementById("btn-back")
var mainbox = document.getElementById("main-container")
var packbox = document.getElementById("pack-container")
var codeInput = document.getElementById("pack-code-input")

var card;

packbox.style.display = "none"
updateAvailablePlayers()

goButton.addEventListener("click", (e) => {
    mainbox.style.display = "none"
    packbox.style.display = "inline"
    fetch("http://localhost:8080/?req=CHECK&data=" + codeInput.value)
        .then(res => {
            return res.text();
        })
        .then(resp => {
            res = JSON.parse(resp)
            if(resp == "null" || resp == null || res.used == true){
                document.getElementById("pack-type").innerHTML = "بسته پیدا نشد"
            }else{
                console.log(res)
                openButton.classList = ["btn glow"]
                backButton.classList = ["btn"]
                if(res.type == "NORMAL"){
                    document.getElementById("pack-type").innerHTML = "بسته معمولی"
                    document.getElementById("pack-img").setAttribute("src", "/assets/default-pack.jpeg")
                }else if(res.type == "PLUS"){
                    document.getElementById("pack-type").innerHTML = "بسته پلاس"
                    document.getElementById("pack-img").setAttribute("src", "/assets/plus-pack.jpeg")
                }
            }
        })
})

openButton.addEventListener("click", (e) => {
    if(openButton.classList.contains("disabled")) return

    openButton.classList = ["btn disabled"]
    backButton.classList = ["btn"]
    document.getElementById("pack-type").innerHTML = "درحال باز کردن"

    fetch("http://localhost:8080/?req=OPEN&data=" + codeInput.value)
        .then(res => {
            try{
                return res.json()
            }catch(e){
                return res
            }
        })
        .then(res => {
            card = res;
            document.getElementById("pack-type").innerHTML = card.name + " - " + card.overall + (card.type == "RARE" ? " - کارت کمیاب" : "")
            document.getElementById("pack-img").setAttribute("src", `/assets/players/${card.name}-${card.overall}.jpeg`.toLowerCase())
            updateAvailablePlayers()
        })
})

backButton.addEventListener("click", (e) => {
    if(backButton.classList.contains("disabled")) return

    mainbox.style.display = "inline"
    packbox.style.display = "none"
    openButton.classList = ["btn disabled"]
    backButton.classList = ["btn"]
    document.getElementById("pack-type").innerHTML = "درجال جستجو"
    document.getElementById("pack-img").setAttribute("src", "/assets/unknown-pack.png")
})

function updateAvailablePlayers(){
    fetch("http://localhost:8080/?req=PLAYERS&data=1")
    .then(res => {return res.json()})
    .then(res => {
        playerslist.innerHTML = ""
        res.list.forEach(player => {
            if(player.quantity != 0){
                playerslist.innerHTML += 
                    `<div class="player">
                    <img src="/assets/players/${player.name}-${player.overall}.jpeg" alt="player img" class="player-img" width="30%" height="30%">
                    <h3>${player.name}</h3>
                    </div>`.toLowerCase()
            }
        })
    })
}