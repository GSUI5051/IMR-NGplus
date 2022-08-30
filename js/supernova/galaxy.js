const SUPERNOVA_GALAXY = {
	req(){
		return E(1.246).pow(player.superGal).mul(1e6).floor();
	},
	reset(){
		if(player.supernova.times.lt(SUPERNOVA_GALAXY.req()))return;
		if(confirm("Are you sure to reset for a Supernova Galaxy? It will reset all previous, including Prestiges.")?!confirm("ARE YOU SURE ABOUT IT???"):true) return
		player.superGal = player.superGal.add(1);
		if(player.superGal.lt(11))player.prestiges=[E(0),E(0),E(0)];
		if(player.superGal.lt(6))player.supernova.tree=[];
		player.chal.comps[9] = E(0)
		player.chal.comps[10] = E(0)
		player.chal.comps[11] = E(0)
		player.chal.comps[12] = E(0)
		if(player.superGal.lt(13))player.chal.comps[13] = E(0)
		if(player.superGal.lt(13))player.chal.comps[14] = E(0)
		if(player.superGal.lt(13))player.chal.comps[15] = E(0)
		if(player.superGal.lt(13))player.chal.comps[16] = E(0)
		if(player.superGal.lt(13))player.chal.comps[17] = E(0)
		if(player.superGal.lt(13))player.chal.comps[18] = E(0)
		if(player.superGal.lt(13))player.chal.comps[19] = E(0)
		if(player.superGal.lt(13))player.chal.comps[20] = E(0)
		player.inf.reached = false
        tmp.pass = false
		if(player.superGal.lt(10))player.mainUpg.inf = []
		ETERNITY_LAYER.doReset()
		player.inf.points = E(0);
		player.inf.times = E(0);
		if(player.superGal.gte(10))player.inf.times = E(2);
		player.et.points = E(0);
		player.et.shards = E(0);
		player.et.shard_gen = E(0);
		player.et.times = E(0);
		player.atom.points = E(0)
		player.atom.quarks = E(0)
		if(player.superGal.lt(2))player.rp.unl = false;
		if(player.superGal.lt(2))player.bh.unl = false;
		if(player.superGal.lt(2))player.atom.unl = false;
		if(player.superGal.lt(2))player.supernova.fermions.unl = false;
		if(player.superGal.lt(8))player.atom.elements=SUPERNOVA_GALAXY.effects.elem();
		if(player.superGal.lt(2))player.qu.reached = false;
		if(player.superGal.lt(2))player.qu.chr_get = [];
		player.qu.times = SUPERNOVA_GALAXY.effects.qut();
		tmp.radiation.unl = false;
		if(player.superGal.lt(6))player.supernova.tree=[];
		if(player.superGal.lt(10))player.qu.rip.first = false;
		if(player.superGal.lt(2))player.supernova.post_10 = false;
		player.md.break.upgs=[E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)];
		player.prestigeMass=new Decimal(0);
		if(player.superGal.gte(3))player.mainUpg.rp=[4,5,6];
		if(player.superGal.gte(3))player.mainUpg.bh=[4,5,6];
		if(player.superGal.gte(3))player.mainUpg.atom=[2,3,4,5,6];
		TABS.choose(0);
		tmp.rank_tab = 0;
		TABS.choose(5);
	},
	effects:{
		pqgs(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(6, player.superGal);
		},
		rp(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2.5, player.superGal);
		},
		bh(){
			if(player.superGal.lt(2))return new Decimal(1);
			return Decimal.pow(2, player.superGal.sub(1));
		},
		tsMult(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(1e5, player.superGal);
		},
		ts(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		apMult(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(10, player.superGal.pow(0.1));
		},
		nsMult(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(100, player.superGal);
		},
		ns(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		meta(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(10, player.superGal);
		},
		entropyg(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(100, player.superGal);
		},
		entropy(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(1e100, player.superGal.pow(2));
		},
		chal(){
			if(player.superGal.lt(1))return new Decimal(0);
			return Decimal.mul(100, player.superGal).floor();
		},
		elem(){
			if(player.superGal.gte(8))return 0;
			if(player.superGal.gte(3))return [14,24,134,170,218];
			return [134,170,218];
		},
		inf(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		qs(){
			if(player.superGal.lt(1))return 0;
			return player.superGal.min(10).toNumber()*40+8;
		},
		qut(){
			if(player.superGal.lt(2))return new Decimal(0);
			return Decimal.pow(2, player.superGal);
		},
		qut2(){
			if(player.superGal.lt(2))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		aesc(){
			if(player.superGal.lt(3))return new Decimal(1);
			return Decimal.mul(0.5, player.superGal);
		},
	},
	galPow0_gain(){
		if(player.superGal.lt(1))return E(0);
		return player.supernova.stars.add(1).log10().pow(player.superGal);
	},
	galPow0_eff(){
		let ret=Decimal.pow(1.01,player.galPow[0].add(1).log10());
		if(hasPrestige(1,90))ret = ret.pow(2)
		return overflow(overflow(overflow(ret,2,3),"e500",hasElement(228)?0.325:hasElement(225)?0.3:0.275),"e1500",0.25);
	},
	galPow1_gain(){
		if(player.superGal.lt(6))return E(0);
		return player.atom.points.add(1).log10().add(1).log10().pow(player.superGal);
	},
	galPow1_eff(){
		let ret=Decimal.pow(1.1,player.galPow[1].add(1).log10())
		if(hasElement(234))ret = ret.pow(1.8);
		return overflow(ret,2,3);
	},
	galPow2_gain(){
		if(player.superGal.lt(6))return E(0);
		return player.bh.dm.add(1).log10().add(1).log10().pow(player.superGal);
	},
	galPow2_eff(){
		let ret=Decimal.pow(1.1,player.galPow[2].add(1).log10());
		if(hasPrestige(1,136))ret = ret.pow(2.6)
		return overflow(ret,2,3);
	},
	galPow3_gain(){
		if(player.superGal.lt(7))return E(0);
		return player.supernova.bosons.photon.add(1).log10().add(1).log10().mul(player.supernova.bosons.gluon.add(1).log10().add(1).log10()).pow(player.superGal.sub(5));
	},
	galPow3_eff(){
		let ret=Decimal.pow(1.275,player.galPow[3].add(1).log10());
		return overflow(overflow(ret,2,3),"1e50",0.5);
	},
	galPow4_gain(){
		if(player.superGal.lt(9))return E(0);
		return player.supernova.fermions.points[0].add(1).log10().add(1).log10().mul(player.supernova.fermions.points[1].add(1).log10().add(1).log10()).pow(player.superGal.sub(7));
	},
	galPow4_eff(){
		let ret=Decimal.pow(1.3,player.galPow[4].add(1).log10());
		return overflow(overflow(ret,2,3),"1e1500",0.5);
	},
	galPow5_gain(){
		if(player.superGal.lt(9))return E(0);
		return player.supernova.radiation.hz.add(1).log10().add(1).log10().pow(player.superGal.sub(6));
	},
	galPow5_eff(){
		let ret=Decimal.pow(1.1,player.galPow[5].add(1).log10().pow(2.5));
		return ret;
	},
	galQkGain(){
		if(player.superGal.lt(10))return E(0);
		return player.supernova.fermions.points[0].add(1).log10().add(1).log10().add(1).log10().mul(player.atom.quarks.add(1).log10().add(1).log10().add(1).log10()).pow(player.superGal.div(3));
	},
}

function calcSupernovaGalaxy(dt, dt_offline) {
	player.galPow[0] = player.galPow[0].add(SUPERNOVA_GALAXY.galPow0_gain().mul(dt));
	player.galPow[1] = player.galPow[1].add(SUPERNOVA_GALAXY.galPow1_gain().mul(dt));
	player.galPow[2] = player.galPow[2].add(SUPERNOVA_GALAXY.galPow2_gain().mul(dt));
	player.galPow[3] = player.galPow[3].add(SUPERNOVA_GALAXY.galPow3_gain().mul(dt));
	player.galPow[4] = player.galPow[4].add(SUPERNOVA_GALAXY.galPow4_gain().mul(dt));
	player.galPow[5] = player.galPow[5].add(SUPERNOVA_GALAXY.galPow5_gain().mul(dt));
	player.galQk = player.galQk.add(SUPERNOVA_GALAXY.galQkGain().mul(dt));
}

function updateSupernovaGalaxyHTML() {
    tmp.el.superGal.setTxt(format(player.superGal,0))
    tmp.el.superGalReq.setTxt(format(SUPERNOVA_GALAXY.req(),0))
	tmp.el.galPow0span.setDisplay(player.superGal.gte(1));
	tmp.el.galPow1span.setDisplay(player.superGal.gte(6));
	tmp.el.galPow2span.setDisplay(player.superGal.gte(6));
	tmp.el.galPow3span.setDisplay(player.superGal.gte(7));
	tmp.el.galPow4span.setDisplay(player.superGal.gte(9));
	tmp.el.galPow5span.setDisplay(player.superGal.gte(9));
	tmp.el.galQkspan.setDisplay(player.superGal.gte(10));
	tmp.el.galPowNextspan.setDisplay(true);
	
	if(player.superGal.gte(1)){
		var html="您的超新星星系提供了以下效果：";
		html += "<br>量子之前所有资源获取速度变为原来的"+format(SUPERNOVA_GALAXY.effects.pqgs())+"倍";
		html += "<br>质量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.pqgs())+"倍";
		html += "<br>狂怒能量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.rp())+"次方";
		if(player.superGal.gte(2))html += "<br>黑洞质量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.bh())+"次方";
		html += "<br>时间速度倍率乘以"+format(SUPERNOVA_GALAXY.effects.tsMult())+"后变为原来的"+format(SUPERNOVA_GALAXY.effects.ts())+"次方";
		html += "<br>加速器倍率变为原来的"+format(SUPERNOVA_GALAXY.effects.apMult())+"倍";
		html += "<br>中子星获取乘以"+format(SUPERNOVA_GALAXY.effects.nsMult())+"后变为原来的"+format(SUPERNOVA_GALAXY.effects.ns())+"次方";
		html += "<br>级别、阶层、时间速度、黑洞压缩器和宇宙射线的元折算延迟"+format(SUPERNOVA_GALAXY.effects.meta())+"倍出现";
		html += "<br>熵获取变为原来的"+format(SUPERNOVA_GALAXY.effects.entropyg())+"倍";
		html += "<br>熵上限变为原来的"+format(SUPERNOVA_GALAXY.effects.entropy())+"倍";
		html += "<br>挑战1-16的最大完成次数增加"+format(SUPERNOVA_GALAXY.effects.chal());
		if(player.superGal.lt(8))html += "<br>初始拥有元素"+SUPERNOVA_GALAXY.effects.elem().join("、");
		else html += "<br>重置时保留元素";
		html += "<br>初始拥有"+SUPERNOVA_GALAXY.effects.qs()+"量子碎片";
		html += "<br>无限质量、永恒质量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.inf())+"倍";
		if(player.superGal.gte(2))html += "<br>初始时就解锁色度";
		if(player.superGal.gte(2))html += "<br>初始时就有"+format(SUPERNOVA_GALAXY.effects.qut())+"量子次数";
		if(player.superGal.gte(2))html += "<br>量子次数、无限次数、永恒次数获取变为原来的"+format(SUPERNOVA_GALAXY.effects.qut2())+"倍";
		if(player.superGal.gte(3))html += "<br>Accelerator Effect Softcap^1-^2 starts "+format(SUPERNOVA_GALAXY.effects.aesc())+"x later";
		tmp.el.galPow0.setTxt(format(player.galPow[0])+player.galPow[0].formatGain(SUPERNOVA_GALAXY.galPow0_gain()))
		tmp.el.galPow0_eff.setTxt(format(SUPERNOVA_GALAXY.galPow0_eff()))
		if(player.superGal.gte(6)){
			html += "<br>Permanently Keep your Neutron Tree";
			tmp.el.galPow1.setTxt(format(player.galPow[1])+player.galPow[1].formatGain(SUPERNOVA_GALAXY.galPow1_gain()))
			tmp.el.galPow1_eff.setTxt(format(SUPERNOVA_GALAXY.galPow1_eff()))
			tmp.el.galPow2.setTxt(format(player.galPow[2])+player.galPow[2].formatGain(SUPERNOVA_GALAXY.galPow2_gain()))
			tmp.el.galPow2_eff.setTxt(format(SUPERNOVA_GALAXY.galPow2_eff()))
			if(player.superGal.gte(7)){
				tmp.el.galPow3.setTxt(format(player.galPow[3])+player.galPow[3].formatGain(SUPERNOVA_GALAXY.galPow3_gain()))
				tmp.el.galPow3_eff.setTxt(format(SUPERNOVA_GALAXY.galPow3_eff()))
				if(player.superGal.gte(9)){
					html += "<br>Prestiges resets nothing";
					tmp.el.galPow4.setTxt(format(player.galPow[4])+player.galPow[4].formatGain(SUPERNOVA_GALAXY.galPow4_gain()))
					tmp.el.galPow4_eff.setTxt(format(SUPERNOVA_GALAXY.galPow4_eff()))
					tmp.el.galPow5.setTxt(format(player.galPow[5])+player.galPow[5].formatGain(SUPERNOVA_GALAXY.galPow5_gain()))
					tmp.el.galPow5_eff.setTxt(format(SUPERNOVA_GALAXY.galPow5_eff()))
					if(player.superGal.gte(10)){
						html += "<br>Permanently Keep your Infinity upgrades";
						html += "<br>Unlock Element Tier 3";
						tmp.el.galQk.setTxt(format(player.galQk)+player.galQk.formatGain(SUPERNOVA_GALAXY.galQkGain()))
						tmp.el.galPowNextspan.setDisplay(false);
					}else tmp.el.galPowNext.setTxt(10);
				}else tmp.el.galPowNext.setTxt(9);
			}else tmp.el.galPowNext.setTxt(7);
		}else tmp.el.galPowNext.setTxt(6);
		if(player.superGal.gte(11))html += "<br>Permanently Keep Prestiges";
		if(player.superGal.gte(13))html += "<br>Permanently Keep C13-C20 completions";
		
		tmp.el.superGalEff.setHTML(html)
	}else tmp.el.galPowNext.setTxt(1);
}