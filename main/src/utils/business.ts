export const statusColorMap = new Map([
  [1, "success"],
  [2, "warning"],
  [3, "danger"],
  [4, "default"],
]);

export function getTagStatus(status: number) {
  return statusColorMap.get(status) ?? "default";
}
