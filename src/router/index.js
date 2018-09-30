import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Search from '@/components/Search/Search'
import SearchList from '@/components/Search/SearchList'
import News from '@/components/news/News'
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
import Mall from '@/components/mall/Mall'
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

//好礼
//import courtesy from '@/components/courtesy/courtesy'

//com
import switchPage from '@/components/common/switchPage';
import pergoodslist from '@/components/user/pergoodslist';
//user
//import userCenter from '@/components/user/userCenter';
//import entCenter from '@/components/user/entCenter';
import ordlistdetail from '@/components/user/ordlistdetail';
import purOrdlist from '@/components/user/purOrdlist';
import supOrdlist from '@/components/user/supOrdlist';
import purcommOrdlist from '@/components/user/purcommOrdlist';
import supcommOrdlist from '@/components/user/supcommOrdlist';

//user2.0
import usersCenter from '@/components/users/userCenter';
import usersEntcenter from '@/components/users/entCenter';
import problem from '@/components/users/problem/problem';
import problemDetail from '@/components/users/problem/problemDetail';
import perPurse from '@/components/users/wallet/perPurse';
import entPurse from '@/components/users/wallet/entPurse';
import proposal from '@/components/users/proposal/proposal';
import modifyInfo from '@/components/users/modifyInfo/modifyInfo';
import follow from '@/components/users/follow/follow';
import usersNews from '@/components/users/news/news';
import usersNewsdetail from '@/components/users/news/newsdetail';
import invest from '@/components/users/invest/invest';
import investDet from '@/components/users/invest/details';

//
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
            meta: {requireAuth :true}
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
            meta: {requireAuth :true}
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
            meta: {requireAuth :true}
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
            meta: {requireAuth :true}
        },
//      {
//      	path: '/courtesy',
//          name: 'courtesy',
//          component: courtesy
//      },
//      { path: '/user/center', name: 'usercenter', component: userCenter },  
//      { path: '/entcenter', name: 'entCenter', component: entCenter, meta: {requireAuth :true} },  
        { path: '/user/ordlistdetail', name: 'ordlistdetail', component: ordlistdetail, meta: {requireAuth :true} },
        { path: '/user/purordlist', name: 'purOrdlist', component: purOrdlist, meta: {requireAuth :true} },
        { path: '/user/purcommOrdlist', name: 'purcommOrdlist', component: purcommOrdlist, meta: {requireAuth :true} },
        { path: '/user/supordlist', name: 'supOrdlist', component: supOrdlist, meta: {requireAuth :true} },
        { path: '/user/supcommOrdlist', name: 'supcommOrdlist', component: supcommOrdlist, meta: {requireAuth :true} },
        { path: '/user/pergoodslist', name: 'pergoodslist', component: pergoodslist, meta: {requireAuth :true} },
        //user2.0
        { path: '/users/center', name: 'usersCenter', component: usersCenter },  
        { path: '/users/entcenter', name: 'usersEntcenter', component: usersEntcenter },  
        { path: '/problem', name: 'problem', component: problem },  
        { path: '/problem/detail', name: 'problemDetail', component: problemDetail }, 
        { path: '/perPurse', name: 'perPurse', component: perPurse }, 
        { path: '/entPurse', name: 'entPurse', component: entPurse }, 
        { path: '/proposal', name: 'proposal', component: proposal },
        { path: '/modifyInfo', name: 'modifyinfo', component: modifyInfo },
        { path: '/follow', name: 'follow', component: follow },
        { path: '/users/news', name: 'usersnews', component: usersNews },
        { path: '/users/newsDetail', name: 'usersnewsdetail', component: usersNewsdetail },
        { path: '/invest', name: 'invest', component: invest },
		{ path: '/invest/details', name: 'investDet', component: investDet },
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

//      {
//          path: '*',
//          component: NotFound
//      },
    ]
});
export default router;