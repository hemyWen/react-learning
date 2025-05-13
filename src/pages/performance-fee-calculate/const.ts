export interface ProductItem {
  label: string;
  minReturnRate: number;
  dividingPercent: number;
  enableDate: string;
  nav?: number;
}

export type ProductDataType = {
  [productCode: string]: ProductItem[];
};
export const productData: ProductDataType = {
  E71101: [
    { label: '兴福安盈1号', minReturnRate: 0.041, dividingPercent: 0.6, enableDate: '2023-06-26' },
    { label: '兴福安盈1号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-12-25' },
    { label: '兴福安盈1号', minReturnRate: 0.03, dividingPercent: 0.6, enableDate: '2024-06-25' },
  ],
  E71102: [
    { label: '兴福安盈2号', minReturnRate: 0.042, dividingPercent: 0.6, enableDate: '2023-04-28' },
    { label: '兴福安盈2号', minReturnRate: 0.039, dividingPercent: 0.6, enableDate: '2023-10-31' },
    { label: '兴福安盈2号', minReturnRate: 0.031, dividingPercent: 0.6, enableDate: '2024-04-30' },
    { label: '兴福安盈2号', minReturnRate: 0.029, dividingPercent: 0.6, enableDate: '2024-10-29' },
  ],
  E71123: [
    { label: '兴福安盈3号', minReturnRate: 0.042, dividingPercent: 0.6, enableDate: '2023-05-29' },
    { label: '兴福安盈3号', minReturnRate: 0.039, dividingPercent: 0.6, enableDate: '2023-11-30' },
    { label: '兴福安盈3号', minReturnRate: 0.03, dividingPercent: 0.6, enableDate: '2024-05-30' },
  ],
  E71129: [
    { label: '兴福安盈4号', minReturnRate: 0.04, dividingPercent: 0.6, enableDate: '2023-08-21' },
    { label: '兴福安盈4号', minReturnRate: 0.031, dividingPercent: 0.6, enableDate: '2024-02-22' },
    { label: '兴福安盈4号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2024-08-22' },
  ],
  E71176: [
    { label: '兴福安裕3号', minReturnRate: 0.041, dividingPercent: 0.6, enableDate: '2022-05-18' },
    { label: '兴福安裕3号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2023-02-08' },
    { label: '兴福安裕3号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-04-06' },
    { label: '兴福安裕3号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2024-01-10' },
    { label: '兴福安裕3号', minReturnRate: 0.032, dividingPercent: 0.6, enableDate: '2024-04-10' },
    { label: '兴福安裕3号', minReturnRate: 0.029, dividingPercent: 0.6, enableDate: '2024-07-10' },
    { label: '兴福安裕3号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2024-10-09' },
  ],
  E71204: [
    { label: '兴福安裕6号', minReturnRate: 0.04, dividingPercent: 0.6, enableDate: '2022-09-07' },
    { label: '兴福安裕6号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2023-02-08' },
    { label: '兴福安裕6号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-04-06' },
    { label: '兴福安裕6号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2024-01-10' },
    { label: '兴福安裕6号', minReturnRate: 0.032, dividingPercent: 0.6, enableDate: '2024-04-10' },
    { label: '兴福安裕6号', minReturnRate: 0.029, dividingPercent: 0.6, enableDate: '2024-07-10' },
    { label: '兴福安裕6号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2024-10-09' },
  ],
  E71205: [
    { label: '兴福安裕2号', minReturnRate: 0.04, dividingPercent: 0.6, enableDate: '2022-09-07' },
    { label: '兴福安裕2号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2023-02-08' },
    { label: '兴福安裕2号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-04-06' },
    { label: '兴福安裕2号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2024-01-10' },
    { label: '兴福安裕2号', minReturnRate: 0.032, dividingPercent: 0.6, enableDate: '2024-04-10' },
    { label: '兴福安裕2号', minReturnRate: 0.029, dividingPercent: 0.6, enableDate: '2024-07-10' },
    { label: '兴福安裕2号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2024-10-09' },
  ],
  E71138: [
    { label: '兴福安裕1号', minReturnRate: 0.042, dividingPercent: 0.6, enableDate: '2021-08-20' },
    { label: '兴福安裕1号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2023-01-11' },
    { label: '兴福安裕1号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-04-12' },
    { label: '兴福安裕1号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2024-01-17' },
    { label: '兴福安裕1号', minReturnRate: 0.032, dividingPercent: 0.6, enableDate: '2024-04-17' },
    { label: '兴福安裕1号', minReturnRate: 0.029, dividingPercent: 0.6, enableDate: '2024-07-17' },
    { label: '兴福安裕1号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2024-10-16' },
  ],
  E71062: [
    { label: '兴福安泰1号', minReturnRate: 0.043, dividingPercent: 0.4, enableDate: '2023-04-11' },
    { label: '兴福安泰1号', minReturnRate: 0.041, dividingPercent: 0.4, enableDate: '2023-10-12' },
    { label: '兴福安泰1号', minReturnRate: 0.033, dividingPercent: 0.4, enableDate: '2024-04-12' },
    { label: '兴福安泰1号', minReturnRate: 0.029, dividingPercent: 0.4, enableDate: '2024-10-14' },
  ],
  E71285: [
    { label: '季季福1号', minReturnRate: 0.039, dividingPercent: 0.6, enableDate: '1900-01-01' },
    { label: '季季福1号', minReturnRate: 0.038, dividingPercent: 0.6, enableDate: '2023-11-07' },
    { label: '季季福1号', minReturnRate: 0.036, dividingPercent: 0.6, enableDate: '2024-02-06' },
    { label: '季季福1号', minReturnRate: 0.03, dividingPercent: 0.6, enableDate: '2024-05-07' },
    { label: '季季福1号', minReturnRate: 0.029, dividingPercent: 0.6, enableDate: '2024-08-06' },
    { label: '季季福1号', minReturnRate: 0.03, dividingPercent: 0.6, enableDate: '2024-11-05' },
    { label: '季季福1号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2025-02-06' },
  ],
  E71133: [
    { label: '兴福安泰46号', minReturnRate: 0.042, dividingPercent: 0.6, enableDate: '2023-06-19' },
    { label: '兴福安泰46号', minReturnRate: 0.0385, dividingPercent: 0.6, enableDate: '2023-12-20' },
    { label: '兴福安泰46号', minReturnRate: 0.031, dividingPercent: 0.6, enableDate: '2024-06-20' },
    { label: '兴福安泰46号', minReturnRate: 0.03, dividingPercent: 0.6, enableDate: '2024-12-20' },
  ],
  E71130: [
    { label: '兴福安盈5号', minReturnRate: 0.042, dividingPercent: 0.6, enableDate: '2022-09-26' },
    { label: '兴福安盈5号', minReturnRate: 0.04, dividingPercent: 0.6, enableDate: '2023-09-26' },
    { label: '兴福安盈5号', minReturnRate: 0.031, dividingPercent: 0.6, enableDate: '2024-03-26' },
    { label: '兴福安盈5号', minReturnRate: 0.028, dividingPercent: 0.6, enableDate: '2024-09-26' },
  ],
};

export interface TableHeadItem {
  title: string;
  key: string;
}

export const tableHead: TableHeadItem[] = [
  {
    title: '年化收益率',
    key: 'R',
  },
  {
    title: '计提金额',
    key: 'E',
  },
  {
    title: '期初日期',
    key: 'sDate',
  },
  {
    title: '期末日期',
    key: 'eDate',
  },
  {
    title: '持有天数',
    key: 'ti',
  },
  {
    title: '期初单位净值',
    key: 'Ii',
  },
  {
    title: '期初累计净值',
    key: 'Ii',
  },
  {
    title: '基准收益率',
    key: 'ri',
  },
];
