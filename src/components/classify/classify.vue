<template>
	<div class="classify">
		<Mheader></Mheader>

		<nav class="nav">
			<section class="left">
				<ul>
					<li :class="{curNav:curFirst == fIdx}" v-for="(f,fIdx) in fList" @click="firstNav(fIdx,f.value)">
						<i class="icoM" :style="{backgroundImage:curFirst == fIdx ? 'url(' + f.icoLight + ')' : 'url(' + f.ico + ')',backgroundRepeat:'no-repeat', backgroundSize: 'contain'}"></i>
						<span class="text">{{f.name}}</span>
					</li>
				</ul>
			</section>
			<section class="right">
				<ul>
					<li v-for="(s,sIdx) in fList[curFirst].sList" @click="secondNav(s.value)">
						<div class="title1-box">
							<span class="text">
								{{s.name}}
							</span>
							<x-icon type="ios-arrow-right" size="25" class="icoM"></x-icon>
						</div>
						<div class="title2-box">
							<span class="textBox" v-for="(t,index) in fList[curFirst].sList[sIdx].tList">
								<span class="text">{{t.name}}</span><span class="line"></span>
							</span>
							<!--<span class="text">高淳没啥</span><span class="line"></span>
							<span class="text">高淳没啥</span><span class="line"></span>
							<span class="text">高淳没啥</span><span class="line"></span>
							<span class="text">高淳没啥</span><span class="line"></span>
							<span class="text">高淳没啥</span><span class="line"></span>
							<span class="text">高淳没啥</span><span class="line"></span>
							<span class="text">高淳没啥</span><span class="line"></span>-->
						</div>
					</li>
				</ul>
			</section>
		</nav>

		<footer-m :curFath="1">

		</footer-m>
	</div>
</template>

<script>
	import Mheader from '@/components/common/header/Mheader';
	import footerM from '@/components/base/footerM'
	export default {
		components: {
			Mheader,
			footerM
		},
		data() {
			return {
				fList: [{
					name: '金属矿产',
					ico: '../../../static/img/classify/jinshu.png',
					icoLight: '../../../static/img/classify/jinshu-light.png',
					value: '0001',
					sList: [{
						name: "全部",
						value: ''
						},{
						name: "金",
						value: '0001',
						tList: [{
							name: "金矿石",
							value: "00000001"
						}, {
							name: "金精粉",
							value: '00000002',
						}, {
							name: "合质金",
							value: '00000004',
						}, {
							name: "金矿尾砂",
							value: '00000008',
						}, {
							name: "砂金",
							value: '00000010',
						}]
					}, {
						name: "银",
						value: '0002',
						tList: [{
							name: "银精矿",
							value: '00000001',
						}, {
							name: "铅锌银混矿",
							value: '00000002',
						}, {
							name: "银矿尾泥",
							value: '00000004',
						}]
					}, {
						name: "铂",
						value: '0004',
						tList: [{
							name: "铂矿粉",
							value: '00000001',
						}, {
							name: "铂矿石",
							value: '00000002',
						}, {
							name: "铂渣",
							value: '00000004',
						}]
					}, {
						name: "其他",
						value: '0008',
						tList: [{
							name: "钯矿",
							value: '00000001',
						}, {
							name: "铱矿",
							value: '00000002',
						}, {
							name: "铑矿",
							value: '00000004',
						}, {
							name: "锇矿",
							value: '00000008',
						}, {
							name: "钌矿",
							value: '00000010',
						}]
					}]
				}, {
					name: '有色金属',
					value: '0002',
					ico: '../../../static/img/classify/youse.png',
					icoLight: '../../../static/img/classify/youse-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "铜",
						value: '0001',
						tList: [{
							name: '铜矿石',
							value: '00000001',
						}, {
							name: '高硫铜精粉',
							value: '00000002',
						}, {
							name: '低硫铜精粉',
							value: '00000004',
						}, {
							name: '杂矿',
							value: '00000008',
						}]
					}, {
						name: "铅",
						value: '0002',
						tList: [{
							name: '铅精粉',
							value: '00000001',
						}, {
							name: '铅锌矿石',
							value: '00000002',
						}, {
							name: '混合铅锌精粉',
							value: '00000004',
						}]
					}, {
						name: "锌",
						value: '0004',
						tList: [{
							name: '锌精粉',
							value: '00000001',
						}, {
							name: '铅锌矿石',
							value: '00000002',
						}, {
							name: '混合铅锌精粉',
							value: '00000004',
						}]
					}, {
						name: "铝",
						value: '0008',
						tList: [{
							name: '铝矾土',
							value: '00000001',
						}, {
							name: '三水铝土矿',
							value: '00000002',
						}, {
							name: '煅烧铝土粉',
							value: '00000004',
						},{
							name: '马来西亚铝土矿',
							value: '00000008',
						}, {
							name: '熟料',
							value: '00000010',
						}]
					}, {
						name: "镁",
						value: '0010',
						tList: [{
							name: '高纯镁砂',
							value: '00000001',
						}, {
							name: '氧化镁',
							value: '00000002',
						}, {
							name: '碱性炉料',
							value: '00000004',
						}, {
							name: '中性炉料',
							value: '00000008',
						}, {
							name: '中烧镁砂',
							value: '00000010',
						}, {
							name: '轻烧镁砂',
							value: '00000020',
						}]
					}, {
						name: "镍",
						value: '0020',
						tList: [{
							name: '红土镍矿',
							value: '00000001',
						}, {
							name: '高镍精矿',
							value: '00000002',
						}, {
							name: '硫化矿',
							value: '00000004',
						}]
					}, {
						name: "钴",
						value: '0040',
						tList: [{
							name: '钴精矿',
							value: '00000001',
						}]
					}, {
						name: "钨",
						value: '0080',
						tList: [{
							name: '钨粉',
							value: '00000001',
						}, {
							name: '钨泥',
							value: '00000002',
						}, {
							name: '钨酸',
							value: '00000004',
						}, {
							name: '钨酸钠',
							value: '00000008',
						}, {
							name: '黑白钨',
							value: '00000010',
						}]
					}, {
						name: "锡",
						value: '0100',
						tList: [{
							name: '锡矿石',
							value: '00000001',
						}, {
							name: '锡精矿',
							value: '00000002',
						}]
					}, {
						name: "铋",
						value: '0200',
						tList: [{
							name: '铋精矿',
							value: '00000001',
						}, {
							name: '高铅铋渣',
							value: '00000002',
						}]
					}, {
						name: "钼",
						value: '0400',
						tList: [{
							name: '钼矿',
							value: '00000001',
						}, {
							name: '钼粉',
							value: '00000002',
						}, {
							name: '钼泥',
							value: '00000004',
						}]
					}, {
						name: "汞",
						value: '0800',
						tList: [{
							name: '汞矿',
							value: '00000001',
						}]
					}, {
						name: "锑",
						value: '1000',
						tList: [{
							name: '氧化锑',
							value: '00000001',
						}, {
							name: '锑白',
							value: '00000002',
						}, {
							name: '毛锑',
							value: '00000004',
						}, {
							name: '锑砷灰',
							value: '00000008',
						}, {
							name: '锑精粉',
							value: '00000010',
						}, {
							name: '红锑矿',
							value: '00000020',
						}, {
							name: '方锑矿',
							value: '00000040',
						}]
					}]
				}, {
					name: '黑色金属',
					value: '0004',
					ico: '../../../static/img/classify/heise.png',
					icoLight: '../../../static/img/classify/heise-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "铁",
						value: '0001',
						tList: [{
							name: "铁矿石",
							value: "00000001"
						}, {
							name: "球团矿",
							value: '00000002',
						}, {
							name: "废钢",
							value: '00000004',
						}, {
							name: "氧化铁皮",
							value: '00000008',
						}, {
							name: "烧结粉",
							value: '00000010',
						}, {
							name: "造球粉",
							value: "00000020"
						}, {
							name: "硫酸渣",
							value: '00000040',
						}, {
							name: "烧结精粉",
							value: '00000080',
						}, {
							name: "造球精粉",
							value: '00000100',
						}, {
							name: "PB粉",
							value: '00000200',
						}, {
							name: "杨迪粉",
							value: "00000400"
						}, {
							name: "麦克粉",
							value: '00000800',
						}, {
							name: "纽曼粉/块",
							value: '00001000',
						}, {
							name: "罗布河粉/块",
							value: '00002000',
						}, {
							name: "火箭粉",
							value: '00004000',
						}, {
							name: "火箭特粉",
							value: "00008000"
						}, {
							name: "阿特拉斯粉/块",
							value: '00010000',
						}, {
							name: "KMG粉",
							value: '00020000',
						}, {
							name: "CSN粉/块",
							value: '00040000',
						}, {
							name: "SSFT粉",
							value: '00080000',
						}, {
							name: "卡粉",
							value: '00100000',
						}, {
							name: "巴西南部粉",
							value: '00200000',
						}, {
							name: "巴粗",
							value: '00400000',
						}, {
							name: "印粉",
							value: '00800000',
						}]
					}, {
						name: "锰",
						value: '0002',
						tList: [{
							name: "锰矿石",
							value: "00000001"
						}, {
							name: "铁锰矿石",
							value: '00000002',
						}, {
							name: "锰铁矿石",
							value: '00000004',
						}, {
							name: "富锰渣",
							value: '00000008',
						}, {
							name: "锰合金",
							value: '00000010',
						}]
					}, {
						name: "铬",
						value: '0004',
						tList: [{
							name: "铬矿粉",
							value: "00000001"
						}, {
							name: "铬矿石",
							value: '00000002',
						}, {
							name: "铬铁矿",
							value: '00000004',
						}]
					}, {
						name: "钛",
						value: '0008',
						tList: [{
							name: "水质钛精矿",
							value: "00000001"
						}, {
							name: "还原钛",
							value: '00000002',
						}, {
							name: "钛铁矿砂",
							value: '00000004',
						}, {
							name: "高钛矿物",
							value: '00000008',
						}, {
							name: "高钛渣",
							value: '00000010',
						}, {
							name: "酸渣",
							value: '00000020',
						}, {
							name: "金红石",
							value: '00000040',
						}]
					}, {
						name: "钒",
						value: '0010',
						tList: [{
							name: "五氧化二钒",
							value: "00000001"
						}, {
							name: "粉钒",
							value: '00000002',
						}, {
							name: "片钒",
							value: '00000004',
						}, {
							name: "偏钒酸铵",
							value: '00000008',
						}]
					}]
				}, {
					name: '能源矿产',
					value: '0008',
					ico: '../../../static/img/classify/nengyuan.png',
					icoLight: '../../../static/img/classify/nengyuan-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "煤",
						value: '0001',
						tList: [{
							name: "同忻优",
							value: "00000001"
						}, {
							name: "塔优",
							value: '00000002',
						}, {
							name: "洗精煤",
							value: '00000004',
						}, {
							name: "乡优",
							value: '00000008',
						}, {
							name: "大友",
							value: '00000010',
						}, {
							name: "伊泰",
							value: "00000020"
						}, {
							name: "神混5600",
							value: '00000040',
						}, {
							name: "褐煤大块",
							value: '00000080',
						}, {
							name: "褐煤中块",
							value: '00000100',
						}, {
							name: "面煤",
							value: '00000200',
						}, {
							name: "三八块",
							value: "00000400"
						}, {
							name: "二五籽",
							value: '00000800',
						}, {
							name: "无烟洗精煤",
							value: '00001000',
						}, {
							name: "喷吹煤",
							value: '00002000',
						}, {
							name: "朝鲜无烟煤",
							value: '00004000',
						}, {
							name: "俄罗斯煤",
							value: "00008000"
						}, {
							name: "主焦煤",
							value: '00010000',
						}, {
							name: "1/3焦煤",
							value: '00020000',
						}, {
							name: "炼焦煤",
							value: '00040000',
						}, {
							name: "瘦精煤",
							value: '00080000',
						}, {
							name: "肥煤",
							value: '00100000',
						}]
					}, {
						name: "石油",
						value: '0002',
						tList: [{
							name: "原油",
							value: "00000001"
						}, {
							name: "汽油",
							value: '00000002',
						}, {
							name: "柴油",
							value: '00000004',
						}, {
							name: "煤油",
							value: '00000008',
						}, {
							name: "沥青",
							value: '00000010',
						}]
					}, {
						name: "天然气",
						value: '0004',
						tList: [{
							name: "液化天然气(LNG)",
							value: "00000001"
						}, {
							name: "压缩天然气(CNG)",
							value: '00000002',
						}, {
							name: "管道天然气(PNG)",
							value: '00000004',
						}]
					}, {
						name: "其他",
						value: '0008',
						tList: [{
							name: "油页岩",
							value: "00000001"
						}, {
							name: "煤层气",
							value: '00000002',
						}, {
							name: "石煤",
							value: '00000004',
						}, {
							name: "油砂",
							value: '00000008',
						}, {
							name: "天然沥青",
							value: '00000010',
						}, {
							name: "地热",
							value: "00000020"
						}, {
							name: "铀",
							value: '00000040',
						}, {
							name: "钍矿",
							value: '00000080',
						}]
					}]
				}, {
					name: '稀有金属',
					value: '0010',
					ico: '../../../static/img/classify/xiyou.png',
					icoLight: '../../../static/img/classify/xiyou-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "铌钽矿",
						value: '0001',
						tList: [{
							name: "铌矿",
							value: "00000001"
						}, {
							name: "钽矿",
							value: '00000002',
						}, {
							name: "铍矿",
							value: '00000004',
						}, {
							name: "锂矿",
							value: '00000008',
						}, {
							name: "锆矿",
							value: '00000010',
						}, {
							name: "锶矿(天青石)",
							value: "00000020"
						}, {
							name: "铷矿",
							value: '00000040',
						}, {
							name: "铯矿",
							value: "00000080"
						}]
					}, {
						name: "重稀土矿",
						value: '0002',
						tList: [{
							name: "钇矿",
							value: "00000001"
						}, {
							name: "钆矿",
							value: '00000002',
						}, {
							name: "铽矿",
							value: '00000004',
						}, {
							name: "镝矿",
							value: '00000008',
						}, {
							name: "钬矿",
							value: '00000010',
						}, {
							name: "铒矿",
							value: "00000020"
						}, {
							name: "铥矿",
							value: '00000040',
						}, {
							name: "镱矿",
							value: "00000080"
						}, {
							name: "镥矿",
							value: "00000100"
						}]
					}, {
						name: "轻稀土矿",
						value: '0004',
						tList: [{
							name: "铈矿",
							value: "00000001"
						}, {
							name: "镧矿",
							value: '00000002',
						}, {
							name: "镨矿",
							value: '00000004',
						}, {
							name: "钕矿",
							value: '00000008',
						}, {
							name: "钐矿",
							value: '00000010',
						}, {
							name: "铕矿",
							value: "00000020"
						}]
					}, {
						name: "分散元素",
						value: '0008',
						tList: [{
							name: "锗矿",
							value: "00000001"
						}, {
							name: "镓矿",
							value: '00000002',
						}, {
							name: "铟矿",
							value: '00000004',
						}, {
							name: "铊矿",
							value: '00000008',
						}, {
							name: "铪矿",
							value: '00000010',
						}, {
							name: "铼矿",
							value: "00000020"
						}, {
							name: "镉矿",
							value: '00000040',
						}, {
							name: "钪矿",
							value: "00000080"
						}, {
							name: "硒矿",
							value: "00000100"
						}, {
							name: "碲矿",
							value: "00000200"
						}]
					}]
				}, {
					name: '非金属',
					value: '0020',
					ico: '../../../static/img/classify/feijin.png',
					icoLight: '../../../static/img/classify/feijin-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "冶金辅助原料",
						value: '0001',
						tList: [{
							name: "蓝晶石",
							value: "00000001"
						}, {
							name: "硅线石",
							value: '00000002',
						}, {
							name: "红柱石",
							value: '00000004',
						}, {
							name: "菱镁矿",
							value: '00000008',
						}, {
							name: "萤石(普通)",
							value: '00000010',
						}, {
							name: "熔剂用石灰岩",
							value: "00000020"
						}, {
							name: "冶金用白云岩",
							value: '00000040',
						}, {
							name: "冶金用石英岩",
							value: '00000080',
						}, {
							name: "冶金用砂岩",
							value: '00000100',
						}, {
							name: "铸型用砂岩",
							value: '00000200',
						}, {
							name: "铸型用砂",
							value: "00000400"
						}, {
							name: "冶金用脉石英",
							value: '00000800',
						}, {
							name: "耐火粘土",
							value: '00001000',
						}, {
							name: "铁矾土",
							value: '00002000',
						}, {
							name: "铸型用粘土",
							value: '00004000',
						}, {
							name: "熔剂用蛇纹岩",
							value: "00008000"
						}]
					}, {
						name: "化工原料",
						value: '0002',
						tList: [{
							name: "自然硫",
							value: "00000001"
						}, {
							name: "硫铁矿",
							value: '00000002',
						}, {
							name: "伴生硫铁",
							value: '00000004',
						}, {
							name: "钠硝石",
							value: '00000008',
						}, {
							name: "明矾石",
							value: '00000010',
						}, {
							name: "芒硝",
							value: "00000020"
						}, {
							name: "重晶石",
							value: '00000040',
						}, {
							name: "毒重石",
							value: '00000080',
						}, {
							name: "天然碱",
							value: '00000100',
						}, {
							name: "赭石",
							value: '00000200',
						}, {
							name: "颜料黄土",
							value: "00000400"
						}, {
							name: "电石用灰岩",
							value: '00000800',
						}, {
							name: "制碱用灰岩",
							value: '00001000',
						}, {
							name: "化肥用石灰岩",
							value: '00002000',
						}, {
							name: "化肥用白云岩",
							value: '00004000',
						}, {
							name: "化肥用石英岩",
							value: "00008000"
						}, {
							name: "化肥用砂岩",
							value: '00010000',
						}, {
							name: "含钾岩石",
							value: '00020000',
						}, {
							name: "含钾砂页岩",
							value: '00040000',
						}, {
							name: "化肥用橄榄岩",
							value: '00080000',
						}, {
							name: "化肥用蛇纹岩",
							value: '00100000',
						}, {
							name: "泥炭",
							value: "00200000"
						}, {
							name: "钾盐",
							value: '00400000',
						}, {
							name: "岩盐",
							value: '00800000',
						}, {
							name: "湖盐",
							value: '01000000',
						}, {
							name: "镁盐",
							value: '02000000',
						}, {
							name: "天然卤水",
							value: "04000000"
						}, {
							name: "碘",
							value: '08000000',
						}, {
							name: "溴",
							value: '10000000',
						}, {
							name: "砷",
							value: '20000000',
						}, {
							name: "磷矿(主矿)",
							value: '40000000',
						}, {
							name: "伴生磷矿",
							value: "80000000"
						}]
					}, {
						name: "特种非金属",
						value: '0004',
						tList: [{
							name: "金刚石",
							value: "00000001"
						}, {
							name: "压电水晶",
							value: '00000002',
						}, {
							name: "熔炼水晶",
							value: '00000004',
						}, {
							name: "光学水晶",
							value: '00000008',
						}, {
							name: "工艺水晶",
							value: '00000010',
						}, {
							name: "蓝石棉",
							value: "00000020"
						}, {
							name: "云母",
							value: '00000040',
						}, {
							name: "电气石",
							value: '00000080',
						}, {
							name: "冰洲石",
							value: '00000100',
						}, {
							name: "光学萤石",
							value: '00000200',
						}, {
							name: "硼矿",
							value: "00000400"
						}]
					}, {
						name: "建材及其他",
						value: '0008',
						tList: [{
							name: "石墨",
							//							value:"00000001"
						}, {
							name: "刚玉",
							//							value:'00000002',
						}, {
							name: "硅灰石",
							//							value:'00000004',
						}, {
							name: "滑石",
							//							value:'00000008',
						}, {
							name: "石棉(温石棉)",
							//							value:'00000010',
						}, {
							name: "长石",
							//							value:"00000020"
						}, {
							name: "石榴子石",
							//							value:'00000040',
						}, {
							name: "黄玉",
							//							value:'00000080',
						}, {
							name: "叶腊石",
							//							value:'00000100',
						}, {
							name: "透辉石",
							//							value:'00000200',
						}, {
							name: "蛭石",
							//							value:"00000400"
						}, {
							name: "沸石",
							//							value:'00000800',
						}, {
							name: "透闪石",
							//							value:'00001000',
						}, {
							name: "石膏",
							//							value:'00002000',
						}, {
							name: "方解石",
							//							value:'00004000',
						}, {
							name: "宝石",
							//							value:"00008000"
						}, {
							name: "玉石",
							//							value:'00010000',
						}, {
							name: "玛瑙",
							//							value:'00020000',
						}, {
							name: "玻璃用灰岩",
							//							value:'00040000',
						}, {
							name: "水泥用灰岩",
							//							value:'00080000',
						}, {
							name: "建筑石料用灰岩",
							//							value:'00100000',
						}, {
							name: "饰面用灰岩",
							//							value:"00200000"
						}, {
							name: "制灰用灰岩",
							//							value:'00400000',
						}, {
							name: "泥灰岩",
							//							value:'00800000',
						}, {
							name: "白垩",
							//							value:'01000000',
						}, {
							name: "玻璃用白云岩",
							//							value:'02000000',
						}, {
							name: "建筑用白云岩",
							//							value:"04000000"
						}, {
							name: "玻璃用石英岩",
							//							value:'08000000',
						}, {
							name: "玻璃用砂岩",
							//							value:'10000000',
						}, {
							name: "水泥配料用砂岩",
							//							value:'20000000',
						}, {
							name: "砖瓦用砂岩",
							//							value:'40000000',
						}, {
							name: "陶瓷用砂岩",
							//							value:"80000000"
						}, {
							name: "玻璃用砂",
							//							value:"00000001"
						}, {
							name: "建筑用砂",
							//							value:'00000002',
						}, {
							name: "水泥配料用砂",
							//							value:'00000004',
						}, {
							name: "水泥标准砂",
							//							value:'00000008',
						}, {
							name: "砖瓦用砂",
							//							value:'00000010',
						}, {
							name: "玻璃用脉石英",
							//							value:"00000020"
						}, {
							name: "粉石英",
							//							value:'00000040',
						}, {
							name: "天然油石",
							//							value:'00000080',
						}, {
							name: "硅藻土",
							//							value:'00000100',
						}, {
							name: "陶粒页岩",
							//							value:'00000200',
						}, {
							name: "砖瓦用页岩",
							//							value:"00000400"
						}, {
							name: "水泥配料用页岩",
							//							value:'00000800',
						}, {
							name: "高岭土",
							//							value:'00001000',
						}, {
							name: "陶瓷土",
							//							value:'00002000',
						}, {
							name: "凹凸棒石粘土",
							//							value:'00004000',
						}, {
							name: "海泡石粘土",
							//							value:"00008000"
						}, {
							name: "伊利石粘土",
							//							value:'00010000',
						}, {
							name: "累托石粘土",
							//							value:'00020000',
						}, {
							name: "膨润土",
							//							value:'00040000',
						}, {
							name: "砖瓦用粘土",
							//							value:'00080000',
						}, {
							name: "陶粒用粘土",
							//							value:'00100000',
						}, {
							name: "水泥用粘土",
							//							value:"00200000"
						}, {
							name: "水泥配料用红土",
							//							value:'00400000',
						}, {
							name: "水泥配料用黄土",
							//							value:'00800000',
						}, {
							name: "水泥配料用泥岩",
							//							value:'01000000',
						}, {
							name: "保温材料用粘土",
							//							value:'02000000',
						}, {
							name: "建筑用橄榄岩",
							//							value:"04000000"
						}, {
							name: "饰面用蛇纹岩",
							//							value:'08000000',
						}, {
							name: "铸石用玄武岩",
							//							value:'10000000',
						}, {
							name: "岩棉用玄武岩",
							//							value:'20000000',
						}, {
							name: "水泥用辉绿岩",
							//							value:'40000000',
						}, {
							name: "铸石用辉绿岩",
							//							value:"80000000"
						}, {
							name: "饰面用辉绿岩",
							//							value:"00000001"
						}, {
							name: "建筑用辉绿岩",
							//							value:'00000002',
						}, {
							name: "饰面用安山岩",
							//							value:'00000004',
						}, {
							name: "建筑用辉绿岩",
							//							value:'00000008',
						}, {
							name: "饰面用安山岩",
							//							value:'00000010',
						}, {
							name: "建筑用安山岩",
							//							value:"00000020"
						}, {
							name: "水泥混合材料用安山岩",
							//							value:'00000040',
						}, {
							name: "建筑用闪长岩",
							//							value:'00000080',
						}, {
							name: "水泥混合材料用闪长岩",
							//							value:'00000100',
						}, {
							name: "建筑用花岗石",
							//							value:'00000200',
						}, {
							name: "饰面用花岗岩",
							//							value:"00000400"
						}, {
							name: "麦饭石",
							//							value:'00000800',
						}, {
							name: "珍珠岩",
							//							value:'00001000',
						}, {
							name: "黑曜岩",
							//							value:'00002000',
						}, {
							name: "松脂岩",
							//							value:'00004000',
						}, {
							name: "浮石",
							//							value:"00008000"
						}, {
							name: "水泥用粗面岩",
							//							value:'00010000',
						}, {
							name: "铸石用粗面岩",
							//							value:'00020000',
						}, {
							name: "霞石正长岩",
							//							value:'00040000',
						}, {
							name: "玻璃用凝灰岩",
							//							value:'00080000',
						}, {
							name: "水泥用凝灰岩",
							//							value:'00100000',
						}, {
							name: "建筑用凝灰岩",
							//							value:"00200000"
						}, {
							name: "火山灰",
							//							value:'00400000',
						}, {
							name: "水泥用火山灰",
							//							value:'00800000',
						}, {
							name: "火山渣",
							//							value:'01000000',
						}, {
							name: "饰面用大理石",
							//							value:'02000000',
						}, {
							name: "建筑大理石",
							//							value:"04000000"
						}, {
							name: "水泥用大理石",
							//							value:'08000000',
						}, {
							name: "玻璃用大理石",
							//							value:'10000000',
						}]
					}]
				}, {
					name: '矿用设备',
					value: '0040',
					ico: '../../../static/img/classify/kuangyong.png',
					icoLight: '../../../static/img/classify/kuangyong-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "勘探设备",
						value: '0001',
						tList: [{
							name: "勘查设备",
							value: "00000001"
						}, {
							name: "钻机设备",
							value: '00000002',
						}]
					}, {
						name: "采矿设备",
						value: '0002',
						tList: [{
							name: "采矿设备",
							value: "00000001"
						}, {
							name: "掘进装载设备",
							value: '00000002',
						}, {
							name: "井巷施工设备",
							value: '00000004',
						}, {
							name: "支护设备",
							value: '00000008',
						}, {
							name: "提升/运输设备",
							value: '00000010',
						}, {
							name: "施工机械",
							value: "00000020"
						}, {
							name: "通风设备",
							value: '00000040',
						}, {
							name: "除尘设备(矿业)",
							value: '00000080',
						}]
					}, {
						name: "选矿设备",
						value: '0004',
						tList: [{
							name: "选矿设备",
							value: "00000001"
						}, {
							name: "破碎设备",
							value: '00000002',
						}, {
							name: "研磨设备",
							value: '00000004',
						}, {
							name: "磁选设备",
							value: '00000008',
						}, {
							name: "浮选设备",
							value: '00000010',
						}, {
							name: "振动筛分设备",
							value: "00000020"
						}, {
							name: "干燥设备",
							value: '00000040',
						}]
					}, {
						name: "冶炼设备",
						value: '0008',
						tList: [{
							name: "烧结/炉类设备",
							value: "00000001"
						}, {
							name: "球团设备",
							value: '00000002',
						}]
					}, {
						name: "其他设备",
						value: '0010',
						tList: [{
							name: "输送设备",
							value: "00000001"
						}, {
							name: "电器设备",
							value: '00000002',
						}, {
							name: "安全设备",
							value: '00000004',
						}, {
							name: "通讯设备",
							value: '00000008',
						}, {
							name: "矿用配件",
							value: '00000010',
						}]
					}]
				}, {
					name: '耗材药剂',
					value: '0080',
					ico: '../../../static/img/classify/haocai.png',
					icoLight: '../../../static/img/classify/haocai-light.png',
					sList: [{
						name: "全部",
						value: '',
					},{
						name: "钢球",
						value: '0001',
						tList: [{
							name: "新材料锻造钢球",
							value: "00000001"
						}, {
							name: "新材料轧制钢球",
							value: '00000002',
						}, {
							name: "锻造钢球",
							value: '00000004',
						}, {
							name: "轧制钢球",
							value: '00000008',
						}, {
							name: "轧制钢锻",
							value: '00000010',
						}, {
							name: "耐磨钢棒",
							value: "00000020"
						}, {
							name: "铸造钢球",
							value: '00000040',
						}, {
							name: "高铬球",
							value: '00000080',
						}, {
							name: "中铬球",
							value: '00000100',
						}, {
							name: "低铬球",
							value: '00000200',
						}]
					}, {
						name: "矿用耗材",
						value: '0002',
						tList: [{
							name: "锰钢筛网",
							value: "00000001"
						}, {
							name: "电机",
							value: '00000002',
						}, {
							name: "皮带",
							value: '00000004',
						}, {
							name: "电动滚筒",
							value: '00000008',
						}, {
							name: "聚氨酯浮选机转子定子",
							value: '00000010',
						}, {
							name: "橡胶浮选机转子定子",
							value: "00000020"
						}, {
							name: "高铬铸铁衬板",
							value: '00000040',
						}, {
							name: "矿山开采导向轮",
							value: '00000080',
						}, {
							name: "吨袋",
							value: '00000100',
						}, {
							name: "减速机",
							value: '00000200',
						}, {
							name: "齿轮",
							value: "00000400"
						}, {
							name: "轴承",
							value: '00000800',
						}, {
							name: "搅拌槽叶轮",
							value: '00001000',
						}, {
							name: "浮选机叶轮",
							value: '00002000',
						}, {
							name: "橡胶衬板",
							value: '00004000',
						}, {
							name: "高锰钢衬板",
							value: "00008000"
						}, {
							name: "导向轮胶带",
							value: '00010000',
						}, {
							name: "合金齿",
							value: '00020000',
						}]
					}, {
						name: "捕收剂",
						value: '0004',
						tList: [{
							name: "乙黄药、丁黄药",
							value: "00000001"
						}, {
							name: "25号黑药、丁胺黑药",
							value: '00000002',
						}, {
							name: "硫氰九号",
							value: '00000004',
						}, {
							name: "苯骈噻唑硫醇",
							value: '00000008',
						}, {
							name: "二笨硫脲(白药)",
							value: '00000010',
						}, {
							name: "油酸钠、氧化石蜡皂",
							value: "00000020"
						}, {
							name: "十六烷基硫酸盐",
							value: '00000040',
						}, {
							name: "十二烷基苯磺酸盐",
							value: '00000080',
						}, {
							name: "苯乙烯膦酸类",
							value: '00000100',
						}, {
							name: "甲苯肿酸类",
							value: '00000200',
						}, {
							name: "C7-9异羟肟酸钠(铵)",
							value: "00000400"
						}, {
							name: "月桂铵、三甲基十六烷基溴化铵",
							value: '00000800',
						}, {
							name: "烷氧基正丙基醚铵",
							value: '00001000',
						}, {
							name: "烷基吡啶盐酸盐",
							value: '00002000',
						}, {
							name: "肌氨酸(氨基酸类)",
							value: '00004000',
						}, {
							name: "二乙胺乙黄药",
							value: "00008000"
						}, {
							name: "双黄药",
							value: '00010000',
						}, {
							name: "黄药酯类(ROCSSR')",
							value: '00020000',
						}, {
							name: "硫逐氨基甲酸酯(硫酸酯)",
							value: '00040000',
						}, {
							name: "柴油、煤油",
							value: '00080000',
						}]
					}, {
						name: "调整剂",
						value: '0008',
						tList: [{
							name: "亚硝酸",
							value: "00000001"
						}, {
							name: "石灰",
							value: '00000002',
						}, {
							name: "氯化钾、重铬酸钾、硅酸盐",
							value: '00000004',
						}, {
							name: "二氧化硫",
							value: '00000008',
						}, {
							name: "栲胶、丹宁",
							value: '00000010',
						}, {
							name: "木塑硫酸钠、氯化木素",
							value: "00000020"
						}, {
							name: "羧甲基纤维素",
							value: '00000040',
						}, {
							name: "淀粉",
							value: '00000080',
						}, {
							name: "动物胶、古尔胶、藻类化合物",
							value: '00000100',
						}, {
							name: "水玻璃、磷酸盐、碳酸钠",
							value: '00000200',
						}, {
							name: "硫酸、碳酸钠",
							value: "00000400"
						}, {
							name: "乙二胺磷酸盐、硫酸铜",
							value: '00000800',
						}, {
							name: "硫酸",
							value: '00001000',
						}, {
							name: "石灰、碳酸钠",
							value: '00002000',
						}, {
							name: "三聚磷酸钠",
							value: '00004000',
						}]
					}, {
						name: "凝聚剂",
						value: '0010',
						tList: [{
							name: "明矾",
							value: "00000001"
						}, {
							name: "聚合氯化铝、聚合硫酸铁",
							value: '00000002',
						}, {
							name: "羧甲基纤维素",
							value: '00000004',
						}, {
							name: "3号絮凝剂",
							value: '00000008',
						}, {
							name: "聚丙烯酸",
							value: '00000010',
						}]
					}, {
						name: "起泡剂",
						value: '0020',
						tList: [{
							name: "松醇油、樟脑油",
							value: "00000001"
						}, {
							name: "MIBA、混合脂肪醇",
							value: '00000002',
						}, {
							name: "甲酚、木榴油",
							value: '00000004',
						}, {
							name: "三乙氧基丁烷(代号TEB)",
							value: '00000008',
						}, {
							name: "聚乙二醇单醚",
							value: '00000010',
						}, {
							name: "重吡啶",
							value: "00000020"
						}, {
							name: "低级脂肪酸酯类",
							value: '00000040',
						}]
					}]
				},
//				{
//					name: '专业服务',
//					value: '0100',
//					ico: '../../../static/img/classify/zhuanye.png',
//					icoLight: '../../../static/img/classify/zhuanye-light.png',
//					sList: [{
//						name: "地勘服务",
//						value: '0001',
//						tList: [{
//							name: "测绘",
//							value: "00000001"
//						}, {
//							name: "航空及卫星遥感",
//							value: '00000002',
//						}, {
//							name: "地质调查",
//							value: '00000004',
//						}, {
//							name: "物探",
//							value: '00000008',
//						}, {
//							name: "化探",
//							value: '00000010',
//						}, {
//							name: "探矿工程",
//							value: "00000020"
//						}, {
//							name: "测试化验",
//							value: '00000040',
//						}, {
//							name: "技术报告",
//							value: '00000080',
//						}]
//					}, {
//						name: "矿用工程",
//						value: '0002',
//						tList: [{
//							name: "设计",
//							value: "00000001"
//						}, {
//							name: "施工",
//							value: '00000002',
//						}, {
//							name: "开采",
//							value: '00000004',
//						}, {
//							name: "洗选",
//							value: '00000008',
//						}, {
//							name: "冶炼",
//							value: '00000010',
//						}, {
//							name: "爆破",
//							value: "00000020"
//						}, {
//							name: "物流运输",
//							value: '00000040',
//						}, {
//							name: "仓储",
//							value: '00000080',
//						}, {
//							name: "环境",
//							value: "00000100"
//						}, {
//							name: "营地及后勤",
//							value: '00000200',
//						}, {
//							name: "安保",
//							value: '00000400',
//						}]
//					}, {
//						name: "全球服务",
//						value: '0004',
//						tList: [{
//							name: "投融资",
//							value: "00000001"
//						}, {
//							name: "银行",
//							value: '00000002',
//						}, {
//							name: "证券",
//							value: '00000004',
//						}, {
//							name: "保险",
//							value: '00000008',
//						}, {
//							name: "财务会计",
//							value: '00000010',
//						}]
//					}, {
//						name: "咨询服务",
//						value: '0008',
//						tList: [{
//							name: "法律",
//							value: "00000001"
//						}, {
//							name: "评估",
//							value: '00000002',
//						}, {
//							name: "企业管理",
//							value: '00000004',
//						}]
//					}, {
//						name: "知识服务",
//						value: '0010',
//						tList: [{
//							name: "会展",
//							value: "00000001"
//						}, {
//							name: "培训",
//							value: '00000002',
//						}, {
//							name: "媒体",
//							value: '00000004',
//						}, {
//							name: "广告",
//							value: '00000008',
//						}, {
//							name: "翻译",
//							value: '00000010',
//						}, {
//							name: "软件",
//							value: '00000020',
//						}]
//					}]
//				}
],
				pageNum: 1,
				numPerPage: 10,
				curFirst: 0,
				curSVal: "",
				curFVal: "0001"
			}
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			firstNav(fIdx, val) {
				this.curFirst = fIdx
				this.curFVal = val
			},
			secondNav(val) {
				this.curSVal = val
				let type1 = this.curFirst + 1
				let type = this.curSVal + this.curFVal
				window.location.href = this.$root.urlPath.MCM + '/mall?newpage=newpage&classify=' + type + '&type=' + type1
				//				this.getData()
			},
			getData() {
				this.$axios.get(this.$root.urlPath.MC + '/wap/mall.do?category', {
						params: {
							pageNum: this.pageNum,
							numPerPage: this.numPerPage,
							type: this.curFVal + this.curSVal
						}
					})
					.then(res => {
						var data = res.data
					})
					.catch(function(error) {
						console.log(error)
					});
			}
		}
	}
</script>

<style>
	.classify .mheader{
		position: fixed;
		top: 0;
		bottom: 0;
		background: #0094E8;
		z-index: 1;
	}
	.classify .nav{
		padding-top: 1rem;
	}
	.curNav {
		background: #fff;
		color: #0094E8;
	}

	.classify .nav .left {
		position: fixed;
		top: 1rem;
		bottom: 0;
		overflow: auto;
		width: 29%;
		padding-bottom: 1rem;
	}

	.classify .nav .right {
		position: fixed;
		right: 0;
	    top: 1rem;
	    bottom: 0;
	    overflow: auto;
	    width: 71%;
	    padding-bottom: 1rem;
	    background: #fff;

	}

	.classify .nav .right li:first-child .title1-box{
		margin-bottom: 0;
	}

	.classify .nav .right li {
		border-top: 1px solid rgba(229, 229, 229, 1);
		border-bottom: 1px solid rgba(229, 229, 229, 1);
		padding: 0.36rem 0.24rem 0.2rem 0;
		margin-left: 0.24rem;
	}
	.classify .nav .right li .text{
		font-weight: 500;

	}
	.classify .nav .right .title1-box {
		display: flex;
		margin-bottom: 0.15rem;
	}

	.classify .nav .right .title1-box .text {
		display: inline-block;
		font-size: 0.26rem;
		width: 4.5rem;
	}

	.classify .nav .right .title1-box .icoM {
		display: flex;
		flex-grow: 1;
		justify-content: flex-end;
	}
	.classify .nav .right .title2-box{
		flex-wrap: wrap;
    	display: flex;
	}
	.classify .nav .right .title2-box .textBox{
		margin-bottom: 0.15rem;
	}
	/*.classify .nav .right .title2-box span:first-child .text {
		padding-left: 0;
	}*/
	/*.classify .nav .right .title2-box .text:nth-child(3n){
		padding-left: 0;
	}*/

	.classify .nav .right .title2-box .text {
		font-size: 0.22rem;
		color: #757575;
		/*padding: 0 0.2rem;*/
	}
	.classify .nav .right .title2-box .textBox:last-child .line{
		border: none;
	}
	.classify .nav .right .title2-box .line {
		display: inline-block;
		width: 1px;
		height: 0.2rem;
		border-left: 1px solid #757575;
		vertical-align: middle;
		margin: -0.06rem 0.2rem 0 0.2rem;
	}

	.classify .nav .right .icoM {
		vertical-align: middle;
		display: flex;
		flex-grow: 1;
		justify-content: flex-end;
		margin: 0;
	}

	.classify .nav .left li {
		width: 2.17rem;
		height: 1.2rem;
		padding: 0.4rem 0.25rem;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}

	.classify .nav .text {
		font-size: 0.26rem;
	}

	.icoM {
		display: inline-block;
		width: 0.35rem;
		height: 0.35rem;
		margin-right: 0.12rem;
		vertical-align: top;
	}

	.icoM:after {
		width: 0.35rem;
		height: 0.35rem;
		display: inline-block;
	}

	.ico1:after {
		content: "";
		background: url(../../../static/img/classify/jinshu.png) no-repeat;
		background-size: 0.35rem;
	}

	.ico2:after {
		content: url(../../../static/img/classify/youse.png);
	}

	.ico3:after {
		content: url(../../../static/img/classify/heise.png);
	}

	.ico4:after {
		content: url(../../../static/img/classify/nengyuan.png);
	}

	.ico5:after {
		content: url(../../../static/img/classify/xiyou.png);
	}

	.ico6:after {
		content: url(../../../static/img/classify/feijin.png);
	}

	.ico7:after {
		content: url(../../../static/img/classify/kuangyong.png);
	}

	.ico8:after {
		content: url(../../../static/img/classify/haocai.png);
	}

	.ico9:after {
		content: url(../../../static/img/classify/zhuanye.png);
	}
</style>
