import useValidInput from 'src/hooks/useValidInput';

type ValidRule = '>0';
type NumType = 'Int' | 'Float';

interface IUseValidInputNumberProps {
  value: number,
  toValid: (value: number) => number,
  isValid?: (value: number) => boolean,
  setValue?: (value: number) => void,
  validRules?: ValidRule[],
  numType?: NumType,
  needVerifyDuringChanging?: boolean,
}

export default function useValidInputNumber({
  value, toValid, isValid, setValue, validRules, numType = 'Float', needVerifyDuringChanging
}: IUseValidInputNumberProps) {
  return useValidInput<string>({
    value: value.toString(),
    isValid: (targetValue) => {
      const num = parseFloat(targetValue);
      if (isNaN(num)) { return false; }
      if (numType === "Int" && Math.trunc(num) !== num) { return false; }

      // 匹配规则
      let isValidResult: boolean = true;
      if (isValid) { isValidResult = isValid(num) };
      if (validRules) {
        if (validRules.find(valueRule => valueRule === '>0')) { isValidResult = isValidResult && isValidNumberBiggerThan0(num) };
        // ...
      }
      return isValidResult;
    },
    toValid: (targetValue) => {
      let num = parseFloat(targetValue);
      if (numType === "Int") { num = Math.trunc(num) }
      if (validRules) {
        // 已设定具体规则 需要分情况判断 是否/何时 执行toValid
        if (validRules.find(valueRule => valueRule === '>0')) { num = toValid(num) };
        // ...
      } else {
        // 未设定具体规则 默认调用toValid 需要注意传入参数可能为NaN
        num = toValid(num)
      }
      return num.toString();
    },
    setValue: (targetValue) => {
      let num = parseFloat(targetValue);
      if (numType === "Int") { num = Math.trunc(num) }
      setValue && setValue(num);
    },
    needVerifyDuringChanging
  })
}

// 规则仓库
const isValidNumberBiggerThan0 = (value: number): boolean => {
  return value > 0 ? true : false;
}