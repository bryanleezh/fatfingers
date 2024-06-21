export default function displayPosition(position: number): string {
  const j = position % 10,
    k = position % 100;
  if (j === 1 && k !== 11) {
    return `${position}st`;
  }
  if (j === 2 && k !== 12) {
    return `${position}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${position}rd`;
  }
  return `${position}th`;
}