import * as React from 'react';
import BreadcrumbComp from 'src/Components/Breadcrumb';
import * as ReactMarkdown from 'react-markdown';
import { Input, message } from 'antd';
import useValidInputNumber from 'src/hooks/useValidInputNumber';
import inputEnterBlur from 'src/actions/inputEnterBlur';

export default function Page103() {
  const [inputValue, setInputValue] = React.useState<number>(12);
  const [value, handleChange, handleBlur] = useValidInputNumber({
    value: inputValue,
    numType: "Int",
    isValid: (n) => n > 0 && n < 30,
    toValid: (n) => {
      if (n > 30) { 
        message.warning("30已经要算好久了哦！"); 
        return 30
      }
      return inputValue;
    },
    setValue: (n) => setInputValue(n),
    needVerifyDuringChanging: false,
  });
  const markdownHeader = `
  ## 递归 3. 整数划分问题 
  ### 题目
  对于整数划分问题，编写代码实现输出所有的整数划分结果。
  ### 实现情况 (按F12打开控制台查看详细划分输出 值改变后回车执行)
  `;
  const markdownContent = `
  ### 分析
  首先，联想到上课时老师讲的分情况讨论递归的例子。
  在此基础上用数组来保存每次的组合，同时添加一个新的变量，用来记录和操作数组的下标。
  ### 代码实现
  \`\`\`js
  const func = () => (x: number, y: number, z: number): number => {
    if (x < y) { return func(x, x, z); }
    array[z] = y;
    if (x <= 0 || y <= 0) {
      console.log(array);
      return 0;
    }
    if (x === 1 || y === 1) {
      if (x === 1) {
        console.log(array);
      }
      else {
        func(x - 1, 1, z + 1);
      }
      return 1;
    }
    if (x === y) {
      console.log(array);
      return 1 + func(x, x - 1, z);
    }
    return func(x - y, y, z + 1) + func(x, y - 1, z);
  }
  \`\`\`
  `;
  const array: number[] = [];
  const func = React.useMemo(() => (x: number, y: number, z: number): number => {
    if (x < y) { return func(x, x, z); }
    array[z] = y;
    if (x <= 0 || y <= 0) {
      // tslint:disable-next-line:no-console
      console.log(array);
      return 0;
    }
    if (x === 1 || y === 1) {
      if (x === 1) {
        // tslint:disable-next-line:no-console
        console.log(array);
      }
      else {
        func(x - 1, 1, z + 1);
      }
      return 1;
    }
    if (x === y) {
      // tslint:disable-next-line:no-console
      console.log(array);
      return 1 + func(x, x - 1, z);
    }
    return func(x - y, y, z + 1) + func(x, y - 1, z);
  }, [inputValue])

  return (<>
    <BreadcrumbComp items={["第一周 递归", "3.整数划分问题"]} />
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <ReactMarkdown source={markdownHeader} />
      <div style={{ marginTop: 8, marginBottom: 24 }}>
        <Input
          addonBefore="整数"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="请在此输入正整数N"
          style={{ maxWidth: 500 }}
          onPressEnter={inputEnterBlur}
        />
        <div>分法：{func(inputValue, inputValue, 0)} 种 划分详情在控制台输出 请先按F12打开控制台</div>
      </div>
      <ReactMarkdown source={markdownContent} />
    </div>
  </>
  )
}