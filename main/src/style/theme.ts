// import { resolve } from "path"

export function generateThemeVars(mode: string) {
  switch (mode) {
    case "theme": {
      return {
        "primary-color": "#C3916A",
      };
    }
    default: {
      return {
        "primary-color": "#646CFF",
      };
    }
  }
  // return {
  // 	// hack: `true; @import (reference) "${resolve("src/style/theme.less")}";`,
  // 	'primary-color': '#646CFF',
  // }
}
