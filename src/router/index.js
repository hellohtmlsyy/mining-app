import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/Home'
const Home = () => import('@/components/home/Home')
import Search from '@/components/Search/Search'
import SearchList from '@/components/Search/SearchList'
// import News from '@/components/news/News'
const News = () => import('@/components/news/News')
import NewsDetails from '@/components/news/Details'
import Mineral from '@/components/mineral/Mineral'
import ProjectDetails from '@/components/mineral/ProjectDetails'
import InvestorDetails from '@/components/mineral/InvestorDetails'
import form from '@/components/mineral/form';
import auth_form from '@/components/mineral/auth-form'




import Exhibition from '@/components/exhibition/Exhibition'
import exform from '@/components/exhibition/ex-form'
import exList from '@/components/exhibition/ex-list'
import ExhibitionDetails from '@/components/exhibition/details'
import Malldetails from '@/components/mall/Malldetails'
// import Mall from '@/components/mall/Mall'
const Mall = () => import(/* webpackChunkName: "mall" */ '@/components/mall/Mall')
import mallComDetails from '@/components/mall/mallComDetails'
import pay from '@/components/mall/pay'
import order_confirm from '@/components/mall/order-confirm'
import order_address from '@/components/mall/order-address'
import order_addressList from '@/components/mall/order-addressList'
import orderCom_list from '@/components/mall/orderCom-list'
import orderCom_balance from '@/components/mall/orderCom-balance'
//import NotFound from '@/components/common/NotFound';

//旗舰店
import Flagship from '@/components/flagship/Flagship'
import shopCart from '@/components/flagship/shopCart'
import leaveSpeak from '@/components/flagship/leaveSpeak'
import componyIntro from '@/components/flagship/componyIntro'
import flagshipSearch from '@/components/flagship/search'
import flagshipSearchList from '@/components/flagship/searchList'

//行情
import market from '@/components/market/market'
import marketDetails from '@/components/market/details'

//全球数据库
import databaseList from '@/components/database/databaseList'
import databaseSearchList from '@/components/database/searchList'
import databaseDetails from '@/components/database/details'

//分类
import classify from '@/components/classify/classify'
import vip from '@/components/vip/vip'

import activity from '@/components/activity/activity-20190106'



//com
import switchPage from '@/components/common/switchPage';

//个人中心
import usersCenter from '@/components/users/userCenter'; //首页
import modifyInfo from '@/components/users/modifyInfo/modifyInfo'; //修改信息
import pergoodslist from '@/components/user/pergoodslist'; //我的采购
import ordlistdetail from '@/components/user/ordlistdetail'; //采购详情
import follow from '@/components/users/follow/follow'; //关注
import usersNews from '@/components/users/news/news'; //消息
import usersNewsdetail from '@/components/users/news/newsdetail'; //消息详情
import perPurse from '@/components/users/wallet/perPurse'; //钱包
import problem from '@/components/users/problem/problem'; //常见问题
import problemDetail from '@/components/users/problem/problemDetail'; //常见问题详情
import proposal from '@/components/users/proposal/proposal'; //意见反馈

//企业中心
import usersEntcenter from '@/components/users/entCenter'; //首页
import supOrdlist from '@/components/user/supOrdlist'; //供应-大宗
import supcommOrdlist from '@/components/user/supcommOrdlist'; //供应-普通
import purOrdlist from '@/components/user/purOrdlist'; //采购-大宗
import purcommOrdlist from '@/components/user/purcommOrdlist'; //采购-普通
import interview from '@/components/users/interview/interview'; //约谈消息
import interviewDetail from '@/components/users/interview/interviewDetail'; //约谈消息详情
import storeMsg from '@/components/users/store/message'; //店铺留言
import storeMsgDetail from '@/components/users/store/messageDetail'; //店铺留言详情
import invest from '@/components/users/invest/invest'; //预约投资
import investDet from '@/components/users/invest/details'; //投资详情
import entPurse from '@/components/users/wallet/entPurse'; //钱包

// act20181220抽奖
import Act2018122001 from '@/components/act/20181220/01';
import Act2018122002 from '@/components/act/20181220/02';
import Act2018122003 from '@/components/act/20181220/03';

//act20190209 初五活动act2019020901
import Act2019020901 from '@/components/act/20190209/01'
import Act2019020902 from '@/components/act/20190209/02'
import Act2019020903 from '@/components/act/20190209/03'
import Act2019020904 from '@/components/act/20190209/04'
import Act2019020905 from '@/components/act/20190209/05'
import Act2019020906 from '@/components/act/20190209/06'

//第二届矿业大会
import Act2019053101 from '@/components/act/20190531/01'

// 2019矿业圈新疆考察之旅
import Act2019051001 from '@/components/act/20190510/01'

import test from '@/components/test/test'
import test1 from '@/components/test/test1'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  { path: '/search/list/:category', name: 'search.list', component: SearchList },

  {
    path: '/exhibition',
    name: 'exhibition',
    component: Exhibition,
  },
  {
    path: '/switchPage',
    name: 'switchPage',
    component: switchPage,
  },
  {
    path: '/exhibition/details',
    name: 'exhibitionDetails',
    component: ExhibitionDetails
  },
  {
    path: '/exhibition/exform',
    name: 'exform',
    component: exform
  },
  {
    path: '/exhibition/exlist',
    name: 'exList',
    component: exList,
    meta: { requireAuth: true }
  },
  {
    path: '/mineral',
    name: 'mineral',
    component: Mineral
  },
  {
    path: '/mineral/investorDetails',
    name: 'investorDetails',
    component: InvestorDetails,
    meta: { requireAuth: true }
  },

  {
    path: '/mineral/projectDetails',
    name: 'projectDetails',
    component: ProjectDetails,
    meta: { requireAuth: true }
  },
  {
    path: '/mineral/projectDetails/auth-form',
    name: 'authForm',
    component: auth_form,
    meta: { requireAuth: true }
  },
  {
    path: '/mineral/projectDetails/form',
    name: 'projectForm',
    component: form,
    meta: { requireAuth: true }
  },
  {
    path: '/news',
    name: 'news',
    component: News,

  },
  {
    path: '/news/details',
    name: 'newsDetails',
    component: NewsDetails
  },
  {
    path: '/mall',
    name: 'mall',
    component: Mall
  },
  {
    path: '/mall/details',
    name: 'malldetails',
    component: Malldetails
  },
  {
    path: '/mallCom/details',
    name: 'mallComDetails',
    component: mallComDetails
  },
  {
    path: '/mall/order_confirm',
    name: 'mallOrderConfirm',
    component: order_confirm
  },
  {
    path: '/mall/order_address',
    name: 'mallOrderAddress',
    component: order_address
  },
  {
    path: '/mall/order_addressList',
    name: 'mallOrderAddressList',
    component: order_addressList
  },

  {
    path: '/mall/orderCom_list',
    name: 'mallOrderComList',
    component: orderCom_list,
    meta: { requireAuth: true }
  },
  {
    path: '/mall/orderCom_balance',
    name: 'mallOrderComBalance',
    component: orderCom_balance
  },
  {
    path: '/mall/pay',
    name: 'pay',
    component: pay
  },


  {
    path: '/flagship',
    name: 'flagship',
    component: Flagship
  },
  {
    path: '/shopCart',
    name: 'shopCart',
    component: shopCart
  },
  {
    path: '/leaveSpeak',
    name: 'leaveSpeak',
    component: leaveSpeak,
    meta: { requireAuth: true }
  },
  {
    path: '/componyIntro',
    name: 'componyIntro',
    component: componyIntro
  },
  {
    path: '/flagship/search',
    name: 'flagshipSearch',
    component: flagshipSearch
  },

  {
    path: '/flagship/searchList',
    name: 'flagshipSearchList',
    component: flagshipSearchList
  },
  {
    path: '/market',
    name: 'market',
    component: market
  },
  {
    path: '/market/details',
    name: 'marketDetails',
    component: marketDetails
  },
  {
    path: '/database/list',
    name: 'databaseList',
    component: databaseList
  },
  {
    path: '/database/searchList',
    name: 'databaseSearchList',
    component: databaseSearchList
  },
  {
    path: '/database/details',
    name: 'databaseDetails',
    component: databaseDetails,
    meta: { requireAuth: true }
  },
  {
    path: '/classify',
    name: 'classify',
    component: classify,
  },
  {
    path: '/vip',
    name: 'vip',
    component: vip,
  },
  {
    path: '/activity20190106',
    name: 'activity',
    component: activity,
  },

  { path: '/user/ordlistdetail', name: 'ordlistdetail', component: ordlistdetail, meta: { requireAuth: true } },
  { path: '/user/purordlist', name: 'purOrdlist', component: purOrdlist, meta: { requireAuth: true } },
  { path: '/user/purcommOrdlist', name: 'purcommOrdlist', component: purcommOrdlist, meta: { requireAuth: true } },
  { path: '/user/supordlist', name: 'supOrdlist', component: supOrdlist, meta: { requireAuth: true } },
  { path: '/user/supcommOrdlist', name: 'supcommOrdlist', component: supcommOrdlist, meta: { requireAuth: true } },
  { path: '/user/pergoodslist', name: 'pergoodslist', component: pergoodslist, meta: { requireAuth: true } },
  //user2.0
  { path: '/users/center', name: 'usersCenter', component: usersCenter },
  { path: '/users/entcenter', name: 'usersEntcenter', component: usersEntcenter, meta: { requireAuth: true } },
  { path: '/users/modifyInfo', name: 'modifyinfo', component: modifyInfo, meta: { requireAuth: true } },
  { path: '/users/follow', name: 'follow', component: follow, meta: { requireAuth: true } },
  { path: '/users/news', name: 'usersnews', component: usersNews, meta: { requireAuth: true } },
  { path: '/users/newsDetail', name: 'usersnewsdetail', component: usersNewsdetail, meta: { requireAuth: true } },
  { path: '/users/problem', name: 'problem', component: problem, meta: { requireAuth: true } },
  { path: '/users/problemDetail', name: 'problemDetail', component: problemDetail, meta: { requireAuth: true } },
  { path: '/users/perPurse', name: 'perPurse', component: perPurse, meta: { requireAuth: true } },
  { path: '/users/entPurse', name: 'entPurse', component: entPurse, meta: { requireAuth: true } },
  { path: '/users/proposal', name: 'proposal', component: proposal, meta: { requireAuth: true } },
  { path: '/invest', name: 'invest', component: invest, meta: { requireAuth: true } },
  { path: '/invest/details', name: 'investDet', component: investDet, meta: { requireAuth: true } },
  { path: '/users/interview', name: 'interview', component: interview, meta: { requireAuth: true } },
  { path: '/users/interviewDetail', name: 'interviewdetail', component: interviewDetail, meta: { requireAuth: true } },
  { path: '/users/storeMsg', name: 'storemsg', component: storeMsg, meta: { requireAuth: true } },
  { path: '/users/storeMsgDetail', name: 'storemsgdetail', component: storeMsgDetail, meta: { requireAuth: true } },
  {
    path: '/test1',
    name: 'test1',
    component: test1
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },

  //act20181220抽奖
  { path: '/act/act2018122001', name: 'act.act2018122001', component: Act2018122001, meta: { title: '企业入驻赢好礼' } },
  { path: '/act/act2018122002', name: 'act.act2018122002', component: Act2018122002, meta: { title: '企业入驻赢好礼' } },
  { path: '/act/act2018122003', name: 'act.act2018122003', component: Act2018122003, meta: { title: '企业入驻赢好礼' } },
  // 初五活动act2019020901
  {
    path: '/act/act2019020901',
    name: 'act.act2019020901',
    component: Act2019020901,
    meta: { title: '矿业圈邀你参加三亚财神节庙会' }
  },
  {
    path: '/act/act2019020902',
    name: 'act.act2019020902',
    component: Act2019020902,
    meta: { title: '矿业圈邀你参加三亚财神节庙会' }
  },
  {
    path: '/act/act2019020903',
    name: 'act.act2019020903',
    component: Act2019020903,
    meta: { title: '矿业圈邀你参加三亚财神节庙会' }
  },
  {
    path: '/act/act2019020904',
    name: 'act.act2019020904',
    component: Act2019020904,
    meta: { title: '矿业圈邀你参加三亚财神节庙会' }
  },
  {
    path: '/act/act2019020905',
    name: 'act.act2019020905',
    component: Act2019020905,
    meta: { title: '矿业圈邀你参加三亚财神节庙会' }
  },
  {
    path: '/act/act2019020906',
    name: 'act.act2019020906',
    component: Act2019020906,
    meta: { title: '矿业圈邀你参加三亚财神节庙会' },
  },
  //第二届矿业圈大会
  {
    path: '/activity2019053101',
    name: 'activity',
    component: Act2019053101,
    meta: { title: '2019第二届中国国际矿业交易大会' }
  },
  // 矿业圈新疆考察之旅活动页
  {
    path: '/act/act2019051001',
    name: 'act.act2019051001',
    component: Act2019051001,
    meta: {
      title: '2019矿业圈新疆考察之旅'
    }
  },
  ]
});
export default router;
