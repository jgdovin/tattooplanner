const compactNumberFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number);
}

export function formatNumberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
