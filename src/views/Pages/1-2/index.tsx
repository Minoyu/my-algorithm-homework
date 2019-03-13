import * as React from 'react';
import BreadcrumbComp from 'src/Components/Breadcrumb';
import * as ReactMarkdown from 'react-markdown';
import { Input } from 'antd';
import useValidInputNumber from 'src/hooks/useValidInputNumber';

export default function Page102() {
  const [inputValue, setInputValue] = React.useState<number>(12);
  const [value, handleChange, handleBlur] = useValidInputNumber({
    value: inputValue,
    numType: "Int",
    validRules: [">0"],
    toValid: (n) => inputValue,
    setValue: (n) => setInputValue(n)
  });
  const markdownHeader = `
  ## 递归 2. 上台阶走法 
  ### 题目
  楼梯有\`N\`阶台阶,上楼可以一步上一阶，也可以一步上两阶，编一程序计算共有多少种不同的走法。
  ### 实现情况
  `;
  const markdownContent = `
  ### 分析
  最开始我的想法比较简单，从最后一个楼梯开始想。要求n个台阶的走法，无非是n-1节台阶和n-2节台阶的相加。
  这样加加到最后。最后一节台阶有1种可能，最后两节台阶有两种可能。将他们累加起来，就能得到最终的结果。
  于是用这样的思想 我写出了下面这样的代码
  \`\`\`js
  const func = (num: number): number => {
    if (num === 0) { return 0; }
    if (num === 1) { return 1; }
    if (num === 2) { return 2; }
    return func(num - 1) + func(num - 2);
  }
  \`\`\`
  结果发现，在浏览器中，当数据小时还能运算出结果，但当数据大时往往会发生浏览器卡死崩溃的情况。而我的舍友雨杰和我用同样的java算法则不会出现这样的问题。。
  于是搜寻了一些资料，这样的斐波纳吉数列func(40)将重复调用自身331160280次,在浏览器中执行必然导致脚本失控。

  存在大量的重复计算。如：当n为5的时候要计算fibonacci(4) + fibonacci(3)当n为4的要计算fibonacci(3) + fibonacci(2) ，这时fibonacci(3)就是重复计算了。
  
  最终采用了以下的这种方式，通过记住运算结果的方式避免了不必要的运算，运算次数大大降低，从O(2^n)降低到了O(n)，
  ### 代码实现
  \`\`\`js
  const memo = { 0: 0, 1: 1, 2: 2, 3: 3 };
  const func = (num: number): number => {
    const action = (n: number) => {
      if (memo[n]) {
        return memo[n];
      } else {
        memo[n] = action(n - 1) + action(n - 2);
        return memo[n]
      }
    }
    return action(num);
  }
  \`\`\`
  ### 已知缺陷
  若结果过大时，超出js最大数字范围，会有溢出的风险，解决方法：使用BigNumber(没有必要)。
  `;
  const memo = { 0: 0, 1: 1, 2: 2, 3: 3 };
  const func = (num: number): number => {
    const action = (n: number) => {
      if (memo[n]) {
        return memo[n];
      } else {
        memo[n] = action(n - 1) + action(n - 2);
        return memo[n]
      }
    }
    return action(num);
  }

  return (<>
    <BreadcrumbComp items={["第一周 递归", "2.上台阶走法"]} />
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <ReactMarkdown source={markdownHeader} />
      <div style={{ marginTop: 8, marginBottom: 24 }}>
        <Input addonBefore="台阶阶数" value={value} onChange={handleChange} onBlur={handleBlur} placeholder="请在此输入正整数N" style={{ maxWidth: 500 }} />
        <div>走法：{func(inputValue)}</div>
      </div>
      <ReactMarkdown source={markdownContent} />
    </div>
  </>
  )
}