import * as React from 'react';
import { Breadcrumb } from 'antd';

export default function BreadcrumbComp({ items }: { items: string[] }) {
  const renderItem = () => items.map((v, i) => (<Breadcrumb.Item key={i}>{v}</Breadcrumb.Item>));
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {renderItem()}
    </Breadcrumb>
  )
}