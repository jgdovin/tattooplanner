import { atom, useAtom } from "jotai";

const _dataAtom = atom([]);
const _columnsAtom = atom([]);

export const useDatatableAtom = () => {
  const [data, setData] = useAtom(_dataAtom);

  return {};
};
