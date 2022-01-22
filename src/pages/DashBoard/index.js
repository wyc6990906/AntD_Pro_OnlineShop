import React, {useEffect, useState} from 'react';
import {Statistic, Card, Row, Col} from 'antd';
import {PageContainer} from "@ant-design/pro-layout";
import './index.less'
import {getDashboardData} from '@/services/dashboard'

const DashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState({})

  useEffect(() => {
    getDashboardData().then(response => {
      setDashBoardData(response)
    })
  }, [])
  console.log(dashBoardData)

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数量"
              value={dashBoardData.users_count}
              precision={0}
              valueStyle={{color: '#3f8600'}}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数量"
              value={dashBoardData.goods_count}
              precision={0}
              valueStyle={{color: '#cf1322'}}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数据"
              value={dashBoardData.order_count}
              precision={0}
              valueStyle={{color: '#234abc'}}
            />
          </Card>
        </Col>
      </Row>

    </PageContainer>
  );
};

export default DashBoard;
