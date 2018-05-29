import Vue from 'vue'
import Router from 'vue-router'
import IndexPages from '../pages/index.vue'
import HelpCenterPages from '../pages/helpCenter.vue'
import NewsPages from '../pages/news.vue'
import LivePages from '../pages/live.vue'
import DownloadCenter from '../pages/downloadCenter.vue'
import UserCenter from '../pages/userCenter.vue'
import RegisterCenter from '../pages/registerCenter.vue'
import FindPwd from '../pages/findPwd.vue'
import ForecastPlan from '../../src/components/cqssc/components/forecastPlan.vue'
import ForecastRecommend from '../pages/forecastRecommend.vue'
import LotteryLobby from '../pages/lotteryLobby.vue'
import NewsList from '../components/NewsList.vue'
import NewsDetails from '../components/NewsDetails.vue'
import LLPageHis from '../../src/components/cqssc/components/LLPageHis.vue'
import AnalyzeTable from '../components/cqssc/components/AnalyzeTable.vue'
import AnalyzeNumber from '../components/cqssc/components/AnalyzeNumber.vue'
import AnalyzeColdHot from '../components/cqssc/components/AnalyzeColdHot.vue'
import AnalyzeOmit from '../components/cqssc/components/AnalyzeOmit.vue'
import AnalyzeHengBan from '../components/cqssc/components/AnalyzeHengBan.vue'
import ChartsPage from '../pages/chartsPage.vue'
import CqsscCpdt from '../components/cqssc/cpdt.vue'
import CqsscZstb from '../components/cqssc/zstb.vue'
import CqsscYctj from '../components/cqssc/yctj.vue'
import CqsscKjzb from '../components/cqssc/kjzb.vue'


Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPages
    },
    {
      path: '/helpCenter',
      component: HelpCenterPages
    },
    {
      path: '/news',
      name:'news',
      component: NewsPages,
      children:[
        {
          path:'', 
          component: NewsList
        },
        {
          path:':newsID', 
          component: NewsDetails
        }
      ]
    },
    {
      path: '/live/:caizhongID',
      name:'live',
      component: LivePages,
      children: [
        {
          path: '',
          name: 'CqsscKjzb',
          component: CqsscKjzb,
        }
      ]
    },
    {
      path: '/downloadCenter',
      component: DownloadCenter
    },
    {
      path: '/userCenter/:userId',
      name: 'userCenter',
      component: UserCenter
    },
    {
      path: '/registerCenter',
      component: RegisterCenter
    },
    {
      path: '/findPwd',
      component: FindPwd
    },
    {
      path: '/forecastrecommend/:caizhongID',
      name:'forecastrecommend',
      component: ForecastRecommend,
      children: [
        {
          path: '',
          name: 'CqsscYctj',
          component: CqsscYctj,
        }
      ]
    },
    {
      path: '/lotterylobby/:caizhongID',
      name: 'lotterylobby', 
      component: LotteryLobby,
      children: [
        {
          path:'',
          name: 'cqsscCpdt',
          component: CqsscCpdt,
          children:[
            {
              path: '',
              component: LLPageHis
            },
            {
              path: 'forecastplan',
              component: ForecastPlan
            },
            {
              path: 'analyze',
              name:'analyze',
              component: AnalyzeTable,
              children:[
                {
                  path:'0',
                  component: AnalyzeNumber
                },
                {
                  path: '1', 
                  component: AnalyzeColdHot
                },
                {
                  path: '2', 
                  component: AnalyzeOmit
                },
                {
                  path: '3',
                  component: AnalyzeHengBan
                }
              ]
            }
          ]
        },
      ]
    },
    {
      path: '/charts/:caizhongID',
      name:'charts',
      component: ChartsPage,
      children:[
        {
          path: '',
          name: 'CqsscZstb',
          component: CqsscZstb,
        }
      ]
    },
  ]
})
