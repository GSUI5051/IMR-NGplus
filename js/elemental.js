const ELEMENTS = {
    map: `x_________________xvxx___________xxxxxxvxx___________xxxxxxvxxx_xxxxxxxxxxxxxxxvxxx_xxxxxxxxxxxxxxxvxxx1xxxxxxxxxxxxxxxvxxx2xxxxxxxxxxxxxxxv_v___1xxxxxxxxxxxxxx_v___2xxxxxxxxxxxxxx_`,
    la: [null,'*','**'],
    names: [
        null,
        'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','At','Hg',
        'Ti','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ],
    fullNames: [
        null,
        'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenom','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Titanium','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Ruthefordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadium',
        'Roeritgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ],
    /*
    {
        desc: `Placeholder.`,
        cost: E(1/0),
        effect() {
            let x = E(1)
            return x
        },
        effDesc(x) { return format(x)+"x" },
    },
    */
    canBuy(x) { return player.atom.quarks.gte(this.upgs[x].cost) && !player.atom.elements.includes(x) },
    buyUpg(x) {
        if (this.canBuy(x)) {
            player.atom.quarks = player.atom.quarks.sub(this.upgs[x].cost)
            player.atom.elements.push(x)
        }
    },
    upgs: [
        null,
        {
            desc: `Improves quark gain formula is better.`,
            cost: E(5e8),
        },
        {
            desc: `Hardened Challenge scale 25% weaker.`,
            cost: E(2.5e12),
        },
        {
            desc: `Electron Power boost Atomic Powers gain.`,
            cost: E(1e15),
            effect() {
                let x = player.atom.powers[2].add(1).root(2)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Stronger’s power is stronger based on Proton Powers.`,
            cost: E(2.5e16),
            effect() {
                let x = player.atom.powers[0].max(1).log10().pow(0.8).div(50).add(1)
                return x
            },
            effDesc(x) { return format(x)+"x stronger" },
        },
        {
            desc: `The 7th challenge’s effect is twice as effective.`,
            cost: E(1e18),
        },
        {
            desc: `Gain 1% more quarks for each challenge completion.`,
            cost: E(5e18),
            effect() {
                let x = E(1)
                for (let i = 1; i <= CHALS.cols; i++) x = x.add(player.chal.comps[i].mul(i>4?2:1))
                if (player.atom.elements.includes(7)) x = x.mul(tmp.elements.effect[7])
                return x.div(100)
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Carbon’s effect is now multiplied by the number of elements bought.`,
            cost: E(1e20),
            effect() {
                let x = E(player.atom.elements.length+1)
                if (player.atom.elements.includes(11)) x = x.pow(2)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `C2’s reward’s softcap is 75% weaker.`,
            cost: E(1e21),
        },
        {
            desc: `The Tetr requirement is 15% weaker.`,
            cost: E(6.5e21),
        },
        {
            desc: `3rd & 4th challenges’ scaling is weakened.`,
            cost: E(1e24),
        },
        {
            desc: `Nitrogen’s multiplier is squared.`,
            cost: E(1e27),
        },
        {
            desc: `Power’s gain from each particle formula is better.`,
            cost: E(1e29),
        },
        {
            desc: `For every c7 completion, add 2 c5 & 6 completion.`,
            cost: E(2.5e30),
            effect() {
                let x = player.chal.comps[7].mul(2)
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        {
            desc: `Passively gain 5% of the quarks you would get from resetting each second.`,
            cost: E(1e33),
        },
        {
            desc: `Super BH Condenser & Gamma Ray scales 20% weaker.`,
            cost: E(1e34),
        },
        {
            desc: `Silicon now gets +2% for each element bought.`,
            cost: E(5e38),
            effect() {
                let x = player.atom.elements.length*0.02
                return x
            },
            effDesc(x) { return "+"+format(x*100)+"%" },
        },
        {
            desc: `Raise Atom’s gain by 1.1.`,
            cost: E(1e40),
        },
        {
            desc: `You can now automatically buy gamma rays. Gamma ray raise tickspeed effect at an extremely reduced rate.`,
            cost: E(1e44),
            effect() {
                let x = player.atom.gamma_ray.pow(0.35).mul(0.01).add(1)
                return x
            },
            effDesc(x) { return "^"+format(x) },
        },
        {
            desc: `2nd Neutron’s effect is better.`,
            cost: E(1e50),
        },
        {
            desc: `Adds 50 more C7 maximum completions.`,
            cost: E(1e53),
        },
        {
            desc: `Unlock ???.`,
            cost: E(1e56),
        },
    ],
    getUnlLength() {
        let u = 4
        if (player.chal.comps[8].gte(1)) u += 14
        if (player.atom.elements.includes(18)) u += 3
        return u
    },
}

function setupElementsHTML() {
    let elements_table = new Element("elements_table")
	let table = "<div class='table_center'>"
    let num = 0
	for (let i = 0; i < ELEMENTS.map.length; i++) {
		let m = ELEMENTS.map[i]
        if (m=='v') table += '</div><div class="table_center">'
        else if (m=='_') table += `<div style="width: 50px; height: 50px">${ELEMENTS.la[m]!==undefined?"<br>"+ELEMENTS.la[m]:""}</div>`
        else if (m=='x') {
            num++
            table += ELEMENTS.upgs[num]===undefined?`<div style="width: 50px; height: 50px"></div>`
            :`<button class="elements" id="elementID_${num}" onclick="ELEMENTS.buyUpg(${num})" onmouseover="tmp.elements.choosed = ${num}" onmouseleave="tmp.elements.choosed = 0"><div style="font-size: 12px;">${num}</div>${ELEMENTS.names[num]}</button>`
            if (num==57 || num==89) num += 14
            else if (num==71) num += 18
            else if (num==118) num = 57
        }
	}
    table += "</div>"
	elements_table.setHTML(table)
}

function updateElementsHTML() {
    let ch = tmp.elements.choosed
    tmp.el.elem_ch_div.setVisible(ch>0)
    if (ch) {
        tmp.el.elem_desc.setTxt("["+ELEMENTS.fullNames[ch]+"] "+ELEMENTS.upgs[ch].desc)
        tmp.el.elem_cost.setTxt(format(ELEMENTS.upgs[ch].cost,0))
        tmp.el.elem_eff.setTxt(ELEMENTS.upgs[ch].effDesc?"Currently: "+ELEMENTS.upgs[ch].effDesc(tmp.elements.effect[ch]):"")
    }
    for (let x = 1; x <= tmp.elements.upg_length; x++) {
        let upg = tmp.el['elementID_'+x]
        if (upg) {
            upg.setVisible(x <= tmp.elements.unl_length)
            if (x <= tmp.elements.unl_length) {
                upg.setClasses({elements: true, locked: !ELEMENTS.canBuy(x), bought: player.atom.elements.includes(x)})
            }
        }
    }
}

function updateElementsTemp() {
    if (!tmp.elements) tmp.elements = {
        upg_length: ELEMENTS.upgs.length-1,
        choosed: 0,
    }
    if (!tmp.elements.effect) tmp.elements.effect = [null]
    for (let x = 1; x <= tmp.elements.upg_length; x++) if (ELEMENTS.upgs[x].effect) {
        if (!tmp.elements.effect[x]) tmp.elements.effect.push(ELEMENTS.upgs[x].effect())
        else tmp.elements.effect[x] = ELEMENTS.upgs[x].effect()
    }
    tmp.elements.unl_length = ELEMENTS.getUnlLength()
}