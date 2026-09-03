export const sortFn = (a: any, b: any): number => {
  return (a.priority ?? 0) - (b.priority ?? 0);
};