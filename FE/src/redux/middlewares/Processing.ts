// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processing = () => (next: any) => (action: any) => {
  const result = next(action);
  return result;
};

export { processing };
