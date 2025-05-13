import dayjs from 'dayjs';
import { Message } from '@src/helper/message';
import type { ProductItem } from './const';

export type BuyData = {
  buyDate: Date;
  nav: string;
  navTotal: string;
  share: string;
  rate?: number; // 年化收益率
};
export type PerformanceItem = {
  R: number; // 年化收益率
  ri: number; // 最低收益率
  P: number; // 分成比例
  sDate: string; // 开始日期
  eDate: string; // 结束日期
  ti: number; // 持有天数
  Ii: number; // 基准适用起始日的单位净值
  S: number; // 份额
  E: number; // 业绩报酬
  [key: string]: number | string; // 其他属性 [key: string]
};
type NewProductItem = ProductItem & {
  endDate?: string;
};
// 计算单笔份额持有期的年化收益率R
export const calculateAnnualizedReturn = (A: number, B: number, C: number, N: number): number =>
  ((A - B) / C) * (365.0 / N) * 100;

// 计算管理人的业绩报酬E
export const calculateManagerPerformance = (
  Rlist: number[],
  tradeRecord: BuyData[],
  productList: ProductItem[],
  endDate: string
) => {
  let E = 0;
  let resultProductList: NewProductItem[] = [];
  const performanceList: PerformanceItem[] = [];
  for (let i = 0; i < tradeRecord.length; i += 1) {
    const record = tradeRecord[i];
    const { buyDate, share } = record;
    // if (i === 0) {
    //   resultProductList = getProduct(dayjs(buyDate).format('YYYY-MM-DD'), productList, endDate);
    // }
    resultProductList = getProduct(dayjs(buyDate).format('YYYY-MM-DD'), productList, endDate);
    for (let j = 0; j < resultProductList.length; j += 1) {
      const product = resultProductList[j];
      const R = Number((Rlist[i] / 100).toFixed(8));
      const ri = product.minReturnRate;
      const P = product.dividingPercent;
      const sDate = dayjs(product.enableDate);
      const eDate = dayjs(product.endDate);
      const ti = eDate.diff(sDate, 'day');
      if (!product.nav) {
        Message.globalAlert('请输入基准适用起始日的单位净值');
        return { E: 0, performanceList: [] };
      }
      const Ii = product.nav as number;
      const S = Number(share);

      const result = ((((R - ri) * P * ti) / 365) * Ii * S).toFixed(2);
      performanceList.push({
        R,
        ri,
        P,
        sDate: sDate.format('YYYY-MM-DD'),
        eDate: eDate.format('YYYY-MM-DD'),
        ti,
        Ii,
        S,
        E: Number(result),
      });

      E += Number(result);
    }
    // if (i > resultProductList.length - 1) {
    //   resultProductList[i] = resultProductList[resultProductList.length - 1];
    // }
  }

  return { E, performanceList };
};
const getProduct = (buyDate: string, productList: ProductItem[], endDate: string) => {
  const { length } = productList;
  const newProductList = [...productList];
  let pIdx = 0;
  for (let i = 0; i < productList.length; i += 1) {
    const start = dayjs(buyDate).diff(dayjs(productList[i].enableDate), 'day');
    if (i < length - 1) {
      const end = dayjs(buyDate).diff(dayjs(productList[i + 1].enableDate), 'day');
      if (start >= 0 && end <= 0) {
        const updatedProduct = { ...productList[i], enableDate: buyDate };
        pIdx = i;
        newProductList[i] = updatedProduct;
        break;
      }
    } else {
      pIdx = i;
      break;
    }
  }
  const result = newProductList.slice(pIdx);
  const resultLength = result.length;
  return result.map((item, index) => {
    const newItem: NewProductItem = { ...item };
    if (index < resultLength - 1) {
      newItem.endDate = result[index + 1].enableDate;
    } else {
      newItem.endDate = resultLength === 1 ? buyDate : endDate;
    }
    return newItem;
  });
};
