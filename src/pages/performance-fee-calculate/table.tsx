import React from 'react';

import styles from './table.module.less';
import { tableHead } from './const';
import type { TableHeadItem } from './const';
import type { PerformanceItem } from './compute';

interface PerformanceInfoTableProps {
  list: PerformanceItem[];
  setPageType: (type: string) => void;
}

const performanceInfoTable = (props: PerformanceInfoTableProps) => {
  const { list, setPageType } = props;
  const tableData = list;
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            {tableHead.map((item: TableHeadItem) => (
              <div className={styles.th} key={item.title}>
                {item.title}
              </div>
            ))}
          </div>
          {tableData.map((data: PerformanceItem, idx: number) => (
            <div className={styles.tableRow} key={idx}>
              {tableHead.map((item) => (
                <div key={item.title} className={styles.td}>
                  {data[item.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <a
        type="button"
        className="crab-picker-header-button"
        onClick={() => {
          setPageType('1');
        }}
      >
        返回
      </a>
    </div>
  );
};
export default performanceInfoTable;
