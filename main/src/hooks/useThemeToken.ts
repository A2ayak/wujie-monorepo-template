import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();

export function useThemeToken() {
  return token;
}
