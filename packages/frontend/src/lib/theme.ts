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
      color: mode("#3d7aed", "#ff63c3")(props),
      textUnderlineOffset: 3,
    }),
  },
};

const fonts = {
  heading: "'Titillium Web'",
  body: "'Titillium Web'",
};

const colors = {
  yellow: {
    600: "#FEBB2C",
    800: "#E4AB2D",
  },
  blue: {
    400: "#0073E6",
  },
  brown: {
    300: "#6A4E12",
  },
  gray: {
    300: "#5C6F82",
  },
};

const theme = extendTheme({ components, fonts, colors }) as any;
export default theme;
