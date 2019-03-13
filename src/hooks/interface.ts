export interface ITargetValue<T> {
  target: {
    value: T;
  }
}

export type ChangeEvent<T> = T | ITargetValue<T>;

export function getEventValue<T>(v: ChangeEvent<T>): T {
  if ((v as ITargetValue<T>).target) {
    return (v as ITargetValue<T>).target.value;
  } else {
    return v as T;
  }
}