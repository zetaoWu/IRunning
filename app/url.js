//基地址
var baseUrl = 'https://api.bmob.cn/1/';
export const USER_REG = baseUrl + 'users';
//请求验证码
export const GET_CHECK_NUM = baseUrl + 'requestSmsCode';
// export const GET_CHECK_NUM = baseUrl + 'requestSms';
//验证 短信码
export const CHECK_SNS_NUM=baseUrl+'verifySmsCode';
//使用sql语句查找
export const BASE_SQL = baseUrl + 'cloudQuery?bql=';
//获取我的收藏夹里面的训练内容
export const SELF_TRAIN = baseUrl + 'classes/UserTraining?include=trainID&'
//登录接口
export const LOGIN = baseUrl + 'login?';
//获取推荐训练
export const COMMEND_TRAIN = BASE_SQL + 'select * from Training limit 3';
//获取推荐阅读
export const COMMEND_READ = BASE_SQL + 'select * from CmdRead limit 3';
//获取课程表
export const GET_SCHEDULE = BASE_SQL + 'select * from Schedule';
//获取个人信息
export const GET_USE_TRAIN_INFO=BASE_SQL+'select * from _User where username=';