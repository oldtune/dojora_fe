export function UnixTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  console.log(timestamp);
  console.log(date);
  return `${date.getDate()} - ${date.getMonth() + 1} ${date.getFullYear()}`;
}
