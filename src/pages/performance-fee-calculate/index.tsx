import React, { FC, useState } from 'react';
import { AppBody } from '@src/components/app-body';
import { Input, Button, DatePickerView, Picker, Select, Modal, Popup } from '@hfzq/crab-react';
import { ArrowBlockDownSvg } from '@src/assets/svg/arrow-block-down-svg';
import dayjs from 'dayjs';
import { Message } from '@src/helper/message';
import { px2rem } from '@hfzq/crab-utils';
import styles from './index.module.less';
import { productData } from './const';
import type { BuyData, PerformanceItem } from './compute';
import type { ProductItem } from './const';

import { calculateManagerPerformance, calculateAnnualizedReturn } from './compute';
import PerformanceInfoTable from './table';

const pickerList = Object.keys(productData).map((item) => ({
  label: productData[item][0].label,
  value: item,
}));

interface BottomButtonProps {
  /** 添加购买记录的回调函数 */
  getAddInfo: (data: BuyData) => void;
  /** 清空购买记录的回调函数 */
  clearInfo: () => void;
}

const BottomButton = (props: BottomButtonProps) => {
  const { getAddInfo, clearInfo } = props;
  const [visible, setVisible] = useState(false);
  const [buyData, setBuyData] = useState<BuyData>({
    buyDate: dayjs().toDate(),
    nav: '',
    navTotal: '',
    share: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyData({
      ...buyData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: px2rem(14) }}>
        <a
          type="button"
          style={{ color: '#698fff' }}
          onClick={() => {
            setVisible(true);
          }}
        >
          添加购买记录
        </a>

        <a
          type="button"
          style={{ color: '#698fff' }}
          onClick={() => {
            clearInfo();
          }}
        >
          清空
        </a>
      </div>

      <Modal
        bodyClassName={styles.notifyModal}
        actions={[
          { key: '2', text: '取消', type: 'Cancel' },
          { key: '1', text: '确定', type: 'Ok' },
        ]}
        onAction={(e) => {
          if (e.type === 'Ok') {
            if (!buyData.nav || !buyData.navTotal || !buyData.share || !buyData.buyDate) {
              return Message.globalAlert('请输入完整购买信息');
            }
            getAddInfo(buyData);
          }
          setVisible(false);
        }}
        style={{
          '--ok-button-color': '#EC3529',
        }}
        visible={visible}
        title={<span className={styles.title}>添加购买记录</span>}
        content={
          <>
            <div className={styles.formRow}>
              <span className={styles.label}>购买日期</span>

              <DatePickerInput
                date={buyData.buyDate}
                setDate={(v: Date) => {
                  setBuyData({
                    ...buyData,
                    buyDate: v,
                  });
                }}
              />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>单位净值</span>
              <Input
                placeholder="请输入"
                type="number"
                name="nav"
                value={buyData.nav}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>累计净值</span>
              <Input
                placeholder="请输入"
                type="number"
                name="navTotal"
                value={buyData.navTotal}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>购买份额（元）</span>
              <Input
                placeholder="请输入"
                type="number"
                name="share"
                value={buyData.share}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </>
        }
      />
    </>
  );
};
// 时间选择组件
interface DatePickerInputProps {
  /** 日期值 */
  date: Date;
  /** 设置日期的回调函数 */
  setDate: (date: Date) => void;
}

const DatePickerInput = (props: DatePickerInputProps) => {
  const { date, setDate } = props;
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Input placeholder="请输入" value={dayjs(date).format('YYYY-MM-DD')} readOnly onClick={() => setVisible(true)} />
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: '40vh' }}
      >
        <div className={styles.popupBtnBox}>
          <div className="crab-picker-header">
            <div className="crab-picker-header-title" />
            <a
              type="button"
              className="crab-picker-header-button"
              onClick={() => {
                setVisible(false);
              }}
            >
              确定
            </a>
          </div>
          <DatePickerView
            value={date}
            className={styles.input}
            onChange={(value) => {
              setDate(value);
            }}
          />
        </div>
      </Popup>
    </>
  );
};
const PerformanceFeeCalculate: FC = () => {
  // 产品信息
  const [productCode, setProductCode] = useState('');
  const productName = productData[productCode]?.[0]?.label;

  const [visible, setVisible] = useState<boolean>(false);
  // 产品基准信息
  const [standardData, setStandardData] = useState<ProductItem[]>(productData[productCode] || []);
  // 客户交易记录
  const [tradeRecord, setRradeRecord] = useState<BuyData[]>([]);
  // 赎回日期
  const [redeemDate, setRedeemDate] = useState<Date>(dayjs().toDate());

  // 累计净值
  const [totalNetValue, setTotalNetValue] = useState('');
  // 单位净值
  const [unitNetValue, setUnitNetValue] = useState('');

  // 总业绩报酬
  const [totalPerformance, setTotalPerformance] = useState(0);
  // 业绩报酬列表
  const [performanceInfoList, setPerformanceInfoList] = useState<PerformanceItem[]>([]);

  const [pageType, setPageType] = useState('1');
  // 切换产品
  const changeProductCode = (code: string) => {
    setProductCode(code);
    setStandardData(productData[code] || []);
  };
  // 添加内容
  const getAddInfo = (data: BuyData) => {
    setRradeRecord([...tradeRecord, data]);
  };

  const clearInfo = () => {
    setRradeRecord([]);
  };
  // 表单提交
  const handleSubmit = () => {
    if (!productCode) {
      Message.globalAlert('请选择产品');
      return;
    }
    if (!redeemDate) {
      Message.globalAlert('请输入赎回日期');
      return;
    }
    if (!totalNetValue) {
      Message.globalAlert('请输入累计净值');
      return;
    }
    if (!unitNetValue) {
      Message.globalAlert('请输入单位净值');
      return;
    }
    const A = Number(totalNetValue);
    const Rlist: number[] = [];
    // const A = 1.2043;
    for (let i = 0; i < tradeRecord.length; i += 1) {
      const item = tradeRecord[i];
      const B = Number(item.navTotal);
      // const B = 1.1331;
      const C = Number(item.nav);
      // const C = 1.1331;
      const N = dayjs(redeemDate).diff(dayjs(item.buyDate), 'day');
      if (N <= 0) {
        Message.globalAlert('赎回日期必须大于购买日期');
        return;
      }

      const R = calculateAnnualizedReturn(A, B, C, N);

      Rlist.push(R);
    }

    const { E, performanceList } = calculateManagerPerformance(
      Rlist,
      tradeRecord,
      standardData,
      dayjs(redeemDate).format('YYYY-MM-DD')
    );
    setTotalPerformance(E);
    setPerformanceInfoList(performanceList);
  };
  return (
    <AppBody title="资管业绩报酬" style={{ background: '#f24d44' }}>
      {pageType === '1' ? (
        <div className={styles.formContainer}>
          {/* 产品信息 */}
          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <span className={styles.label}>产品代码</span>
              <Picker columns={[pickerList]} onConfirm={(value) => changeProductCode(value[0] as string)}>
                {(item, action, v) => (
                  <Select
                    className={styles.input}
                    icon={<ArrowBlockDownSvg color="#787684" />}
                    value={item?.[0]?.value}
                    open={v}
                    onClick={action.toggle}
                  />
                )}
              </Picker>
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>产品名称</span>
              <Input placeholder="请输入" value={productName} className={styles.input} />
            </div>
          </div>

          {/* 产品基准信息 */}
          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>产品基准信息</div>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>业绩报酬计提基准（%）</span>
                <span>启用日期</span>
                <span>基准适用起始日的单位净值</span>
              </div>
              {standardData.map((item, idx) => (
                <div className={styles.tableRow} key={idx}>
                  <span>{item.dividingPercent * 100}</span>
                  <span>{item.enableDate}</span>
                  <Input
                    placeholder="请输入"
                    value={item.nav}
                    type="number"
                    onChange={(e) => {
                      // 创建新的数组，避免直接修改state
                      const newStandardData = [...standardData];
                      // 修改对应索引的nav值
                      newStandardData[idx] = {
                        ...newStandardData[idx],
                        nav: Number(e.target.value),
                      };
                      // 更新state
                      setStandardData(newStandardData);
                    }}
                    className={styles.input}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 客户交易信息 */}
          <div className={styles.formSection}>
            <div className={styles.sectionTitle}>客户交易信息</div>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>购买日期</span>
                <span>单位净值</span>
                <span>累计净值</span>
                <span>购买份额</span>
              </div>
              {tradeRecord.map((item) => (
                <div className={styles.tableRow}>
                  <span>{dayjs(item.buyDate).format('YYYY-MM-DD')}</span>
                  <span>{item.nav}</span>
                  <span>{item.navTotal}</span>
                  <span>{item.share}</span>
                </div>
              ))}
              <BottomButton getAddInfo={getAddInfo} clearInfo={clearInfo} />
            </div>
          </div>

          {/* 赎回信息 */}
          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <span className={styles.label}>赎回日期</span>
              <DatePickerInput date={redeemDate} setDate={setRedeemDate} />
            </div>

            <div className={styles.formRow}>
              <span className={styles.label}>累计净值</span>
              <Input
                placeholder="请输入"
                value={totalNetValue}
                type="number"
                className={styles.input}
                onChange={(e) => setTotalNetValue(e.target.value)}
              />
            </div>
            <div className={styles.formRow}>
              <span className={styles.label}>单位净值</span>
              <Input
                placeholder="请输入"
                value={unitNetValue}
                type="number"
                className={styles.input}
                onChange={(e) => setUnitNetValue(e.target.value)}
              />
            </div>
          </div>

          {/* 提交按钮 */}
          <Button type="button" className={styles.submitBtn} onClick={handleSubmit}>
            立即计算
          </Button>
          <div className={styles.resultLabel}>
            <span>客户的业绩报酬总额为：</span>
            <span className={styles.resultNum}>{totalPerformance}元</span>
          </div>
          <a
            type="button"
            style={{ color: '#698fff', marginTop: '30px' }}
            onClick={() => {
              setPageType('2');
            }}
          >
            查看业绩报酬详细数据
          </a>
        </div>
      ) : (
        <PerformanceInfoTable list={performanceInfoList} setPageType={setPageType} />
      )}

      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
        bodyStyle={{ height: '40vh' }}
      >
        <div className={styles.popupBtnBox}>
          <div className="crab-picker-header">
            <div className="crab-picker-header-title" />
            <a
              type="button"
              className="crab-picker-header-button"
              onClick={() => {
                setVisible(false);
              }}
            >
              确定
            </a>
          </div>
          <DatePickerView
            value={redeemDate}
            className={styles.input}
            onChange={(value) => {
              setRedeemDate(value);
            }}
          />
        </div>
      </Popup>
    </AppBody>
  );
};

export default PerformanceFeeCalculate;
