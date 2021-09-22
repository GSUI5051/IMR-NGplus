function E(x){return new Decimal(x)};

Decimal.prototype.softcap = function (start, power, mode) {
    var x = this.clone()
    if (x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
    }
    return x
}

function calc(dt) {
    player.mass = player.mass.add(tmp.massGain.mul(dt))
    if (player.mainUpg.rp.includes(3)) for (let x = 1; x <= UPGS.mass.cols; x++) if (player.autoMassUpg[x] && player.ranks.rank.gte(x)) UPGS.mass.buyMax(x)
    if (FORMS.tickspeed.autoUnl() && player.autoTickspeed) FORMS.tickspeed.buyMax()
    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (RANKS.autoUnl[rn]() && player.auto_ranks[rn]) RANKS.bulk(rn)
    }
    for (let x = 1; x <= UPGS.main.cols; x++) {
        let id = UPGS.main.ids[x]
        let upg = UPGS.main[x]
        if (upg.auto_unl ? upg.auto_unl() : false) if (player.auto_mainUpg[id]) for (let y = 1; y <= upg.lens; y++) if (upg[y].unl ? upg[y].unl() : true) upg.buy(y)
    }
    if (player.mainUpg.bh.includes(6)) player.rp.points = player.rp.points.add(tmp.rp.gain.mul(dt))
    if (player.bh.unl) player.bh.mass = player.bh.mass.add(tmp.bh.mass_gain.mul(dt))
}

function getPlayerData() {
    let s = {
        mass: E(0),
        ranks: {
            rank: E(0),
            tier: E(0),
        },
        auto_ranks: {
            rank: false,
            tier: false,
        },
        auto_mainUpg: {
            
        },
        massUpg: {},
        autoMassUpg: [null,false,false,false],
        autoTickspeed: false,
        mainUpg: {
            
        },
        tab: [0,0],
        ranks_reward: 0,
        scaling_ch: 0,
        rp: {
            points: E(0),
            unl: false,
        },
        bh: {
            unl: false,
            dm: E(0),
            mass: E(0),
            condenser: E(0),
        },
        reset_msg: "",
        main_upg_msg: [0,0],
        tickspeed: E(0),
    }
    for (let x = 1; x <= UPGS.main.cols; x++) {
        s.auto_mainUpg[UPGS.main.ids[x]] = false
        s.mainUpg[UPGS.main.ids[x]] = []
    }
    return s
}

function wipe() {
    player = getPlayerData()
}

function loadPlayer(load) {
    player = Object.assign(getPlayerData(), load)
    player.mainUpg = Object.assign(getPlayerData().mainUpg, load.mainUpg)
    convertStringToDecimal()
    player.tab = [0,0]
    player.ranks_reward = 0
    player.scaling_ch = 0
    player.reset_msg = ""
    player.main_upg_msg = [0,0]
}

function convertStringToDecimal() {
    player.mass = E(player.mass)
    player.tickspeed = E(player.tickspeed)
    player.rp.points = E(player.rp.points)

    player.bh.dm = E(player.bh.dm)
    player.bh.mass = E(player.bh.mass)
    player.bh.condenser = E(player.bh.condenser)
    for (let x = 0; x < RANKS.names.length; x++) player.ranks[RANKS.names[x]] = E(player.ranks[RANKS.names[x]])
    for (let x = 1; x <= UPGS.mass.cols; x++) if (player.massUpg[x] !== undefined) player.massUpg[x] = E(player.massUpg[x])
}

function save(){
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",btoa(JSON.stringify(player)))
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

function exporty() {
    save();
    let file = new Blob([btoa(JSON.stringify(player))], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Incremental Mass Rewritten Save.txt"
    a.click()
}

function importy() {
    let loadgame = prompt("在框里粘贴你的存档。警告：此操作会覆盖你当前游戏的进度。")
    if (loadgame != null) {
        load(loadgame)
        location.reload()
    }
}

function loadGame() {
    wipe()
    load(localStorage.getItem("testSave"))
    setupHTML()
    setInterval(save,1000)
    updateTemp()
    updateHTML()
    tmp.el.loading.setDisplay(false)
    tmp.el.app.setDisplay(true)
}