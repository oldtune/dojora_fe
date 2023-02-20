export function UnixTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()} - ${formatMonth(
    date.getMonth() + 1
  )} - ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function formatMonth(month: number): string {
  if (month < 10) {
    return `0${month}`;
  }
  return `${month}`;
}
