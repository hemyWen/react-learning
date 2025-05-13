import dayjs from "dayjs";
// 定义买入记录类
class PurchaseRecord {
  purchaseDate: string;
  share: number;
  purchaseUnitNetValue: number;
  purchaseAccumulatedNetValue: number;

  constructor(purchaseDate: string, share: number, purchaseUnitNetValue: number, purchaseAccumulatedNetValue: number) {
    this.purchaseDate = purchaseDate;
    this.share = share;
    this.purchaseUnitNetValue = purchaseUnitNetValue;
    this.purchaseAccumulatedNetValue = purchaseAccumulatedNetValue;
  }
}

// 定义业绩报酬计提区间类
class PerformanceFeeInterval {
  startDate: string;
  endDate: string;
  performanceFeeBenchmark: number;
  applicableUnitNetValue: number;

  constructor(startDate: string, endDate: string, performanceFeeBenchmark: number, applicableUnitNetValue: number) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.performanceFeeBenchmark = performanceFeeBenchmark;
    this.applicableUnitNetValue = applicableUnitNetValue;
  }
}

// 计算单笔份额持有期的年化收益率R
function calculateAnnualizedReturn(A: number, B: number, C: number, N: number): number {
  return ((A - B) / C) * (365.0 / N) * 100;
}

// 计算管理人的业绩报酬E
function calculatePerformanceFee(R: number, P: number, intervals: PerformanceFeeInterval[], S: number): number {
  let E = 0;
  for (const interval of intervals) {
    const ti = dayjs(interval.endDate, "YYYY-MM-DD").diff(dayjs(interval.startDate, "YYYY-MM-DD"), "day");
    const ri = interval.performanceFeeBenchmark;
    const Ii = interval.applicableUnitNetValue;
    if (R > ri) {
      E += (((R / 100 - ri) * P * ti) / 365) * Ii * S;
      console.log(
        `求和计算的参数为：R：${R},ri:${ri},P:${P},ti:${ti},Ii:${Ii},S:${S},E:${(((R - ri) * P * ti) / 365) * Ii * S}`
      );
    }
  }
  return E;
}
//R：4.680675553250154,ri:0.038,P:0.6,ti:35,Ii:1.1331,S:442821.66,E:134026.8652880717
// 测算扣除管理人的业绩报酬后，投资者的持仓价值V
function calculateInvestorValue(I: number, S: number, E: number): number {
  return I * S - E;
}

// 主函数
export function main() {
  // 示例数据：多次买入记录
  const purchaseRecords: PurchaseRecord[] = [];
  purchaseRecords.push(new PurchaseRecord("2023-12-13", 442821.66, 1.1331, 1.1331));
  // purchaseRecords.push(new PurchaseRecord(LocalDate.of(2024, 02, 20), 7178.34, 1.14960000, 1.14960000));

  // 示例数据：业绩报酬计提区间
  const intervals: PerformanceFeeInterval[] = [];
  // intervals.push(new PerformanceFeeInterval(LocalDate.of(2022, 04, 13), LocalDate.of(2023, 01, 11), 0.04200000, 1.05020000));
  // intervals.push(new PerformanceFeeInterval(LocalDate.of(2023, 01, 11), LocalDate.of(2023, 04, 12), 0.03600000, 1.06870000));

  intervals.push(new PerformanceFeeInterval("2023-12-13", "2024-01-17", 0.038, 1.1331));
  // intervals.push(new PerformanceFeeInterval("2024-01-17", "2024-04-17", 0.036, 1.1429));
  // intervals.push(new PerformanceFeeInterval("2024-04-17", "2024-07-17", 0.032, 1.1631));
  // intervals.push(new PerformanceFeeInterval("2024-07-17", "2024-10-16", 0.029, 1.1819));
  // intervals.push(new PerformanceFeeInterval("2024-10-16", "2025-04-16", 0.028, 1.1787));

  const P = 0.6; // 超过业绩报酬计提基准的部分管理人的提取比例
  const I = 1.2043; // 产品最新单位净值
  const currentDate = "2025-04-16"; // 当前日期

  let totalPerformanceFee = 0;
  let totalInvestorValue = 0;
  let totalShares = 0;

  // 遍历每笔买入记录
  for (const record of purchaseRecords) {
    const N = dayjs(currentDate, "YYYY-MM-DD").diff(dayjs(record.purchaseDate, "YYYY-MM-DD"), "day");
    const A = I; // 最新单位净值
    const B = record.purchaseAccumulatedNetValue;
    const C = record.purchaseUnitNetValue;

    // 计算年化收益率
    const R = calculateAnnualizedReturn(A, B, C, N);
    // 计算该笔买入的业绩报酬
    const E = calculatePerformanceFee(R, P, intervals, record.share);
    // 计算该笔买入扣除业绩报酬后的持仓价值
    const V = calculateInvestorValue(I, record.share, E);

    totalPerformanceFee += E;
    totalInvestorValue += V;
    totalShares += record.share;
  }

  console.log(`总管理人的业绩报酬 E: ${totalPerformanceFee}`);
  console.log(`总扣除业绩报酬后投资者的持仓价值 V: ${totalInvestorValue}`);
  console.log(`总份额: ${totalShares}`);
}

// main();
