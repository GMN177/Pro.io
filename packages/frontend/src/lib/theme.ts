import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const components = {
  Heading: {
    variants: {
      "section-title": {
        textDecoration: "underline",
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: "#525252",
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4,
      },
    },
  },
  Link: {
    baseStyle: (props: any) => ({
      color: mode("#444CF7", "#E45858")(props),
      textUnderlineOffset: 3,
    }),
  },
};

const fonts = {
  heading: `'Maven Pro', sans-serif`,
  body: `'Maven Pro', sans-serif`,
};

const colors = {
  red: {
    theme: "#E45858",
  },
  blue: {
    theme: "#444CF7",
  },
  grey: {
    theme: "#F2F2F2",
  },
};

const theme = extendTheme({ components, fonts, colors }) as any;
export default theme;
