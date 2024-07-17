//Card Manager

const fm = require("./filemanager")
const rng = require("random-number")

var cards;
var codes;
var autosave = true

const PLUS_PRICE = 30
const NORMAL_PRICE = 20;

var earnings = 0;
earnings = fm.loadJSON("./server/data/earnings.json");

const getCards = () => {
    return cards
}

const getCodes = () => {
    return codes
}

const openPack = (code) => {
    if(getCodes().map[code] != null && !getCodes().map[code].used){
        var available = false
        var chosenCard = null

        if(getCodes().map[code].type == "PLUS"){
            earnings.int += PLUS_PRICE
        }else{
            earnings.int += NORMAL_PRICE
        }

        while(!available){
            const random = rng({
                min : 0,
                max : getCards().list.length-1,
                integer : true
            })
            var card = getCards().list[random]

            if(card.quantity > 0){
                if(card.worth < earnings.int){
                    if(card.type == "NORMAL"){
                        available = true
                        chosenCard = card
                        getCards().list[random].quantity = getCards().list[random].quantity - 1;
                        earnings.int -= card.worth
                    }

                    if(card.type == "RARE" && getCodes().map[code].type == "PLUS"){
                        available = true
                        chosenCard = card
                        getCards().list[random].quantity = getCards().list[random].quantity - 1;
                        earnings.int -= card.worth
                        break
                    }

                    const rand2 = rng({
                        min : 1,
                        max : 5,
                        integer : true
                    })

                    if(card.type == "RARE" && rand2 == 1){
                        available = true
                        chosenCard = card
                        getCards().list[random].quantity = getCards().list[random].quantity - 1;
                        earnings.int -= card.worth
                    }
                }
            }
        }
        
        getCodes().map[code].drop = chosenCard
        getCodes().map[code].used = true

        if(autosave){
            saveAll()
        }

        return chosenCard
    }else{
        return null;
    }
}

const saveAll = () => {
    fm.saveJSON(cards, "./server/data/cards.json")
    fm.saveJSON(codes, "./server/data/codes.json")
    fm.saveJSON(earnings, "./server/data/earnings.json")
}

const pullData = () => {
    cards = fm.loadJSON("./server/data/cards.json")
    codes = fm.loadJSON("./server/data/codes.json")
    earnings = fm.loadJSON("./server/data/earnings.json")
}

const setAutosave = (bool) => {
    autosave = bool
}

const getAutosave = () => {
    return autosave
}

pullData()

module.exports = {
    getCards,
    getCodes,
    saveAll,
    openPack,
    setAutosave,
    getAutosave,
    pullData
}