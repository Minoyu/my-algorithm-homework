import * as React from 'react';
import BreadcrumbComp from 'src/Components/Breadcrumb';
import * as ReactMarkdown from 'react-markdown';
import { Input } from 'antd';
import useValidInputNumber from 'src/hooks/useValidInputNumber';

export default function Page101() {
  const [inputValue, setInputValue] = React.useState<number>(1234)
  const [value, handleChange, handleBlur] = useValidInputNumber({
    value: inputValue,
    numType: "Int",
    validRules: [">0"],
    toValid: (n) => inputValue,
    setValue: (n) => setInputValue(n)
  });
  const markdownHeader = `
  ## 递归 1. 正整数求和 
  ### 题目
  输入一个正整数\`N\`,求这个数的各位数字之和。要求给出分析过程、递归算法程序。
  ### 实现情况
  `;
  const markdownContent = `
  ### 分析
  对于一个数字而言，只需要对它进行除10取余数运算就能得到个位数字。随后除以10，继续刚才的步骤。重复下去就可以获得这个数的各位数字之和
  ### 代码实现
  \`\`\`js
  const func = (num: number): number => {
    return num > 0 ? (num % 10 + func(Math.trunc(num / 10))) : 0;
  }
  // 因为js语言没有整数小数之分 所以需要用Math.trunc取整舍弃小数
  \`\`\`
  ### 已知缺陷
  若输入数字过大时，超出js最大数字范围，会有溢出的风险，解决方法：使用BigNumber 或字符串拼接的方法
  `;

  const func = (num: number): number => {
    return num > 0 ? (num % 10 + func(Math.trunc(num / 10))) : 0;
  }

  return (<>
    <BreadcrumbComp items={["第一周 递归", "1.正整数求和"]} />
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <ReactMarkdown source={markdownHeader} />
      <div style={{ marginTop: 8, marginBottom: 24 }}>
        <Input addonBefore="正整数N" value={value} onChange={handleChange} onBlur={handleBlur} placeholder="请在此输入正整数N" style={{ maxWidth: 500 }} />
        <div>数据结果：{func(parseInt(value, 10))}</div>
      </div>
      <ReactMarkdown source={markdownContent} />
    </div>
  </>
  )
}