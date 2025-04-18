export default function capitalize(val: string | number) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
