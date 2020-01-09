export default function convertBooleanToString(
  value: boolean | null | undefined
) {
  if (value !== undefined && value !== null) {
    return value.toString();
  }
  return undefined;
}
