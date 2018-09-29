import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);
import Mock from 'mockjs'

const invest = {
	title:Mock.Random.ctitle(),
	insert_time:new Date(Mock.Random.date('yyyy-MM-dd hh:mm:ss')).getTime(),
	invest_money:Mock.Random.natural(0,1000000),
	currency:'CNY人民币'
}

const investInfo = {
	title:Mock.Random.ctitle(),
	issueTime:new Date(Mock.Random.date('yyyy-MM-dd hh:mm:ss')).getTime(),
	name:Mock.mock('@cname'),
	price:Mock.Random.natural(0,1000000),
	unit:'CNY人民币',
	depict:Mock.Random.cparagraph(1,4)
}

//用户中心-预约投资列表数据
mock.onGet('http://www.miningcircle.com/wap/enterpriseCenter.do?reservationInvestment').reply(function(config){
	return [200,{data:invest,errMsg:null,success:true}]
});
//用户中心-预约投资列表-详情数据
mock.onGet('http://www.miningcircle.com/wap/enterpriseCenter.do?reservatInfo').reply(function(config){
	return [200,{data:investInfo,errMsg:null,success:true}]
});
