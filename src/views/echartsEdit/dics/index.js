import * as echarts from "echarts";
import 'echarts-liquidfill';
import * as utils from '../../utils'
window.echarts = echarts
window.utils = utils
import { initLine01, initLine02, initLine03, initLine04,initLine05,initLine06,initLine07 } from '../echarts/line.js'
import {
    initBar01,
    initBar02,
    initBar03,
    initBar04,
    initBar05,
    initBar06,
    initBar07,
    initBar08,
    initBar09,
    initBar10,
    initBar11,
} from "../echarts/bar";
import { initFunnelO1 } from '../echarts/funnel.js'
import { initGauge } from "../echarts/gauge";
import { initHxt01 } from "../echarts/hxt";
import { initPie01, initPie02, initPie03, initPie04, initPie05 } from "../echarts/pie";
export const echartsObject = {
    initLine01,
    initLine02,
    initLine03, initLine04,initLine05,initLine06,initLine07,

    initBar01,
    initBar02,
    initBar03,
    initBar04,
    initBar05,
    initBar06,
    initBar07,
    initBar08,
    initBar09,
    initBar10,
    initBar11,

    initFunnelO1,


    initGauge,
    initHxt01,

    initPie01, initPie02, initPie03, initPie04, initPie05,
}
export const line = ['initLine01', 'initLine02', 'initLine03', 'initLine04','initLine05','initLine06','initLine07']
export const bar = ['initBar01', 'initBar02', 'initBar03', 'initBar04', 'initBar05', 'initBar06', 'initBar07', 'initBar08', 'initBar09', 'initBar10', 'initBar11']
export const funnel = ['initFunnelO1']
export const gauge= ['initGauge']
export const hxt= ['initHxt01']
export const pie= ['initPie01', 'initPie02', 'initPie03', 'initPie04', 'initPie05',]


