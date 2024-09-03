import { mapToSelectOptions } from "@/utils/map";

export const statusMap = new Map([
  [1, "在线"],
  [2, "离线"],
]);

export const statusOptions = mapToSelectOptions(statusMap);

export interface IDriverItem {
  name: string;
  status: Nullable<number>;
  host: string;
  driver: string;
  createTime: string;
  updateTime: string;
}
