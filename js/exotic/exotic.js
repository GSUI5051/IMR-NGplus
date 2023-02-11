const EXOTIC = {
    gain() {
		let x = player.mass.max(1).log10().max(1).log10().div(1e12)
        if (x.lt(1)) return E(0)
        x = x.max(0).pow(2)
		if (player.qu.times.gte(1e255) && player.exotic.times.gte(1))x = x.mul(3)
        if (hasPrestige(2,141)) x = x.mul(prestigeEff(2,141,E(1)));
        return x.floor()
    },
    gainTimes() {
        let x = E(1)
        return x
    },
    mils: [
        [E(1), `You start with 10 Supernova Galaxies, and keep Elements on Exotic resets. Unlock new Quantum Milestones.`],
        [E(2), `Automatically Gain Prestige Level, Honor, Glory and Renown.`],
        [E(3), `Exotic reset times boost Quantizes and Galactic Quarks gain.`],
        [E(4), `Keep Galactic Fermion Tiers on Exotic resets.`],
        [E(5), `Keep Galactic Shards on Exotic resets.`],
        [E(10), `You start with 15 Supernova Galaxies, and keep C20 completions on Exotic resets.`],
    ],
    enter() {
        if (EXOTIC.gain().gte(1)) {
            if (confirm("Are you sure to reset for Exotic Matter? This will reset all previous except QoL mechanicals")?!confirm("ARE YOU SURE ABOUT IT???"):true) return
			player.exotic.points = player.exotic.points.add(EXOTIC.gain())
            player.exotic.times = player.exotic.times.add(EXOTIC.gainTimes())
            this.doReset()
        }
    },
    doReset(force=false) {
		player.superGal=new Decimal(player.exotic.times.lt(10)?10:15)
		player.galQk=new Decimal(0)
		if(player.exotic.times.lt(5))player.gc.shard=new Decimal(0)
		player.galParticles=[new Decimal(0),new Decimal(0),new Decimal(0)]
		player.galPow=[E(0),E(0),E(0),E(0),E(0),E(0)]
		if(player.exotic.times.lt(4))player.supernova.fermions.tiers[2]=[E(0),E(0),E(0),E(0),E(0),E(0)]
		if(player.exotic.times.lt(4))player.supernova.fermions.tiers[3]=[E(0),E(0),E(0),E(0),E(0),E(0)]
		player.prestigeMassUpg=[E(0),E(0),E(0),E(0),E(0)]
		if(player.exotic.times.lt(10)){
			for (let x = 1; x <= 20; x++) player.chal.comps[x] = E(0)
		}else{
			for (let x = 1; x <= 19; x++) player.chal.comps[x] = E(0)
		}
        SUPERNOVA_GALAXY.reset(true)
        SUPERNOVA_GALAXY.reset(true)
    },
    rcb: {
        buy(i) {
            if (tmp.ex.rcb_can[i]) {
				player.exotic.rcb[i] = player.exotic.rcb[i].add(1)
				player.exotic.points = player.exotic.points.sub(tmp.ex.rcb_cost[i]).max(0)
			}
        },
        buyMax(i) {
            if (tmp.ex.rcb_can[i]) {
				player.exotic.rcb[i] = tmp.ex.rcb_bulk[i]
				player.exotic.points = player.exotic.points.sub(tmp.ex.rcb_cost[i]).max(0)
			}
        },
        eff(i) {
            let pow = E(2)
            let x = pow.pow(player.exotic.rcb[i])
            return {pow: pow, eff: x}
        },
    },
}

function updateExoticTemp() {
    tmp.ex.gain = EXOTIC.gain()
    tmp.ex.gainTimes = EXOTIC.gainTimes()

	for(let i=0;i<=2;i++){
		tmp.ex.rcb_cost[i] = E(2+i).pow(player.exotic.rcb[i].scaleEvery("ex_rcb").add(1))
		tmp.ex.rcb_bulk[i] = player.exotic.points.max(1).log(2+i).scaleEvery("ex_rcb",true).floor()

		tmp.ex.rcb_can[i] = player.exotic.points.gte(tmp.ex.rcb_cost[i])
		tmp.ex.rcb_eff[i] = EXOTIC.rcb.eff(i)
	}
}

function updateExoticHTML(){
        if (tmp.stab[7] == 0) {
            tmp.el.exotic_times.setTxt(format(player.exotic.times,0))
            for (let x = 0; x < EXOTIC.mils.length; x++) {
                tmp.el['ex_mil'+x].changeStyle('background-color',player.exotic.times.gte(EXOTIC.mils[x][0])?'#2f22':'#4442')
                tmp.el['ex_mil_goal'+x].setTxt(format(EXOTIC.mils[x][0],0))
            }
        }
        if (tmp.stab[7] == 1) {
            tmp.el.rcb0_times.setTxt(format(player.qu.times,0)+player.qu.times.formatGain(tmp.qu.gainTimes))
            tmp.el.rcb1_times.setTxt(format(player.inf.times,0)+player.inf.times.formatGain(tmp.inf.gainTimes))
            tmp.el.rcb2_times.setTxt(format(player.et.times,0)+player.et.times.formatGain(tmp.et.gainTimes))
			for(let i=0;i<=2;i++){
				tmp.el["rcb"+i+"_lvl"].setTxt(format(player.exotic.rcb[i],0))
				tmp.el["rcb"+i+"_btn"].setClasses({btn: true, locked: !tmp.ex.rcb_can[i]})
				tmp.el["rcb"+i+"_cost"].setTxt(format(tmp.ex.rcb_cost[i],0))
				tmp.el["rcb"+i+"_pow"].setTxt(format(tmp.ex.rcb_eff[i].pow))
				tmp.el["rcb"+i+"_eff"].setTxt(format(tmp.ex.rcb_eff[i].eff))
			}
        }
}

function setupExoticHTML() {
    let new_table = new Element("ex_milestones_table")
    html = ""
    for (let x in EXOTIC.mils) {
        html += `
        <div id="ex_mil${x}" style="width: 100%; margin: 5px 0px; padding: 8px 0px; background-color: #4444; font-size: 14px;">
            <h2><span id="ex_mil_goal${x}">X</span> Exotic Resets</h2><br><br>
            ${EXOTIC.mils[x][1]}
        </div>
        `
    }
    new_table.setHTML(html)
}