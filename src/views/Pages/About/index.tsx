import * as React from 'react';
import BreadcrumbComp from 'src/Components/Breadcrumb';
import * as ReactMarkdown from 'react-markdown';

export default function About() {
  const markdown = `
  ## 关于这里
  #### 我是软件嵌入1701班的余乐韬 4171159035
  #### 这里将存放我的算法作业 使用TS+React构建
  #### 因为最近一直在用\`TS+React\`技术栈来进行一些开发，所以决定使用TS语言 (一种更规范更完善的js语言）来完成我的算法作业
  2019/3/13
  `;
  return (<>
    <BreadcrumbComp items={["首页", "关于这里"]} />
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <ReactMarkdown source={markdown} />
    </div>
  </>
  )
}