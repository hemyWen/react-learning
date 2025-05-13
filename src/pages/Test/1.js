class PerformanceFeeInterval {
  startDate;
  endDate;
  performanceFeeBenchmark;
  applicableUnitNetValue;

  constructor(startDate, endDate, performanceFeeBenchmark, applicableUnitNetValue) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.performanceFeeBenchmark = performanceFeeBenchmark;
    this.applicableUnitNetValue = applicableUnitNetValue;
  }
}
const intervals = [];
intervals.push(new PerformanceFeeInterval('2023-12-13', '2024-01-17', 0.05, 1000000));

function calculateAnnualizedReturn (A, B, C, N) {
  return ((A - B) / C) * (365.0 / N) * 100;
}
// const a = calculateAnnualizedReturn(1.20430000, 1.13310000, 1.13310000, 490);

const productList = [
  { label: '兴福安盈1号', minReturnRate: 0.041, dividingPercent: 0.6, enableDate: '2023-06-26' },
  { label: '兴福安盈1号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-12-25' },
  { label: '兴福安盈1号', minReturnRate: 0.03, dividingPercent: 0.6, enableDate: '2024-06-25' },
]

const r = calculateAnnualizedReturn(1.20430000, 1.13310000, 1.13310000, 490);
console.log('r===', r)

// 计算管理人的业绩报酬E
const list = [{ startDate: '2023-04-12', endDate: '2023-04-12', performanceFeeBenchmark: 0.038, applicableUnitNetValue: 1.1331 }]
function calculatePerformanceFee (R, P, intervals, S) {
  let E = 0;
  for (const interval of intervals) {
    // 计算两个日期之间的天数差
    const ti = 35;
    console.log(`两个日期之间的天数差为：${ti}`);
    const ri = interval.performanceFeeBenchmark;
    const Ii = interval.applicableUnitNetValue;
    console.log('ii=====', Ii)

    if (R > ri) {
      E += (((R - ri) * P * ti) / 365) * Ii * S;
      console.log(
        `求和计算的参数为：R：${R},ri:${ri},P:${P},ti:${ti},Ii:${Ii},S:${S},E:${(((R - ri) * P * ti) / 365) * Ii * S}`
      );
    }
  }
  return E;
}
const e = calculatePerformanceFee(r, 0.6, list, 442821.66);
console.log('e===', e)