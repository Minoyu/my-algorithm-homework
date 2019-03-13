import { useCallback, useEffect, useState } from "react";
import { ChangeEvent, getEventValue } from "./interface";

interface IValidInput<T> {
  value: T;
  needVerifyDuringChanging?: boolean;// 是否需要在onChange时验证更新
  isValid?(value: T): boolean;
  toValid?(value: T): T;
  setValue?(value: T): any;
  ajaxAfterBlur?(value: T): void;
}

/**
 * call `setValue` only when `isValid` returns true
 * @returns `[value, handleChange, handleBlur]`
 */
export default function useValidInput<T = string>({
  value,
  isValid = _ => true,
  toValid = _ => _,
  setValue,
  needVerifyDuringChanging = true,
  ajaxAfterBlur
}: IValidInput<T>): [
    T,
    (e: ChangeEvent<T>) => void,
    (e: ChangeEvent<T>) => void
  ] {
  const [v, setV] = useState(value || '');
  useEffect(() => setV(value), [value]);
  const handleChange = useCallback((e: ChangeEvent<T>) => {
    const targetValue = getEventValue(e);
    setV(targetValue);
    // tslint:disable-next-line:no-unused-expression
    needVerifyDuringChanging && isValid(targetValue) && setValue && setValue(targetValue);
  }, [isValid, setValue]);
  const handleBlur = useCallback((e: ChangeEvent<T>) => {
    const targetValue = getEventValue(e);
    if (targetValue === value) { return };
    const validValue = isValid(targetValue) ? targetValue : toValid(targetValue);
    setV(validValue);
    // tslint:disable-next-line:no-unused-expression
    setValue && setValue(validValue);
    // tslint:disable-next-line:no-unused-expression
    ajaxAfterBlur && ajaxAfterBlur(validValue);
  }, [isValid, toValid, setValue, ajaxAfterBlur]);
  return [v as T, handleChange, handleBlur];
}