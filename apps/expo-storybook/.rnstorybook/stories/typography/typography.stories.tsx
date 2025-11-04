import { Typography } from "@react-native-push-notification/ui";
import { Meta, StoryObj } from "@storybook/react-native";
import React from "react";
import { View } from "react-native";

const meta = {
  component: Typography,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

// ===== HEAD VARIANTS =====
export const Head14: Story = {
  args: {
    children: "Head 14 Regular",
    variant: "head14",
  },
};

export const Head16: Story = {
  args: {
    children: "Head 16 Regular",
    variant: "head16",
  },
};

export const Head20: Story = {
  args: {
    children: "Head 20 Regular",
    variant: "head20",
  },
};

export const Head22: Story = {
  args: {
    children: "Head 22 Regular",
    variant: "head22",
  },
};

export const Head28: Story = {
  args: {
    children: "Head 28 Regular",
    variant: "head28",
  },
};

export const Head37: Story = {
  args: {
    children: "Head 37 Regular",
    variant: "head37",
  },
};

export const Head40C: Story = {
  args: {
    children: "Head 40 Condensed",
    variant: "head40C",
  },
};

export const Head40B: Story = {
  args: {
    children: "Head 40 Bold",
    variant: "head40B",
  },
};

// ===== HEAD BOLD VARIANTS =====
export const Head14Bold: Story = {
  args: {
    children: "Head 14 Bold",
    variant: "head14Bold",
  },
};

export const Head16Bold: Story = {
  args: {
    children: "Head 16 Bold",
    variant: "head16Bold",
  },
};

export const Head20Bold: Story = {
  args: {
    children: "Head 20 Bold",
    variant: "head20Bold",
  },
};

export const Head22Bold: Story = {
  args: {
    children: "Head 22 Bold",
    variant: "head22Bold",
  },
};

export const Head24Bold: Story = {
  args: {
    children: "Head 24 Bold",
    variant: "head24Bold",
  },
};

export const Head26Bold: Story = {
  args: {
    children: "Head 26 Bold",
    variant: "head26Bold",
  },
};

export const Head28Bold: Story = {
  args: {
    children: "Head 28 Bold",
    variant: "head28Bold",
  },
};

export const Head32Bold: Story = {
  args: {
    children: "Head 32 Bold",
    variant: "head32Bold",
  },
};

// ===== HEAD MEDIUM VARIANTS =====
export const Head16Medium: Story = {
  args: {
    children: "Head 16 Medium",
    variant: "head16Medium",
  },
};

export const Head17Medium: Story = {
  args: {
    children: "Head 17 Medium",
    variant: "head17Medium",
  },
};

// ===== TEXT VARIANTS =====
export const Text12: Story = {
  args: {
    children: "Text 12 Regular",
    variant: "text12",
  },
};

export const Text14: Story = {
  args: {
    children: "Text 14 Regular",
    variant: "text14",
  },
};

export const Text16: Story = {
  args: {
    children: "Text 16 Regular",
    variant: "text16",
  },
};

export const Text12Bold: Story = {
  args: {
    children: "Text 12 Bold",
    variant: "text12Bold",
  },
};

export const Text14Bold: Story = {
  args: {
    children: "Text 14 Bold",
    variant: "text14Bold",
  },
};

export const Text16Bold: Story = {
  args: {
    children: "Text 16 Bold",
    variant: "text16Bold",
  },
};

// ===== CAPTION VARIANTS =====
export const Caption10: Story = {
  args: {
    children: "Caption 10 Regular",
    variant: "caption10",
  },
};

export const Caption12: Story = {
  args: {
    children: "Caption 12 Regular",
    variant: "caption12",
  },
};

export const Caption10Bold: Story = {
  args: {
    children: "Caption 10 Bold",
    variant: "caption10Bold",
  },
};

export const Caption12Bold: Story = {
  args: {
    children: "Caption 12 Bold",
    variant: "caption12Bold",
  },
};

export const Caption10Upper: Story = {
  args: {
    children: "Caption 10 Uppercase",
    variant: "caption10Upper",
  },
};

export const Caption12Upper: Story = {
  args: {
    children: "Caption 12 Uppercase",
    variant: "caption12Upper",
  },
};

// ===== HEADER VARIANTS (v1) =====
export const Header40Bold: Story = {
  args: {
    children: "Header 40 Bold",
    variant: "header40Bold",
  },
};

export const Header40Regular: Story = {
  args: {
    children: "Header 40 Regular",
    variant: "header40Regular",
  },
};

export const Header28Bold: Story = {
  args: {
    children: "Header 28 Bold",
    variant: "header28Bold",
  },
};

export const Header28Regular: Story = {
  args: {
    children: "Header 28 Regular",
    variant: "header28Regular",
  },
};

export const Header22Bold: Story = {
  args: {
    children: "Header 22 Bold",
    variant: "header22Bold",
  },
};

export const Header22Regular: Story = {
  args: {
    children: "Header 22 Regular",
    variant: "header22Regular",
  },
};

export const TitleCase14: Story = {
  args: {
    children: "Title Case 14",
    variant: "titleCase14",
  },
};

export const TitleCase16: Story = {
  args: {
    children: "Title Case 16",
    variant: "titleCase16",
  },
};

export const Text12Regular: Story = {
  args: {
    children: "Text 12 Regular",
    variant: "text12Regular",
  },
};

export const Text14Regular: Story = {
  args: {
    children: "Text 14 Regular",
    variant: "text14Regular",
  },
};

// ===== TEXT ALIGNMENT =====
export const TextAlignLeft: Story = {
  args: {
    children: "Text aligned to the left",
    variant: "head16",
    textAlign: "left",
  },
};

export const TextAlignCenter: Story = {
  args: {
    children: "Text aligned to the center",
    variant: "head16",
    textAlign: "center",
  },
};

export const TextAlignRight: Story = {
  args: {
    children: "Text aligned to the right",
    variant: "head16",
    textAlign: "right",
  },
};

export const TextAlignJustify: Story = {
  args: {
    children:
      "This is a longer text that demonstrates justify alignment. It will spread across the full width of the container.",
    variant: "text14",
    textAlign: "justify",
  },
};

// ===== TEXT TRANSFORM =====
export const TextTransformUppercase: Story = {
  args: {
    children: "This text is uppercase",
    variant: "head16",
    textTransform: "uppercase",
  },
};

export const TextTransformLowercase: Story = {
  args: {
    children: "THIS TEXT IS LOWERCASE",
    variant: "head16",
    textTransform: "lowercase",
  },
};

export const TextTransformCapitalize: Story = {
  args: {
    children: "this text is capitalized",
    variant: "head16",
    textTransform: "capitalize",
  },
};

// ===== COLORS (PALETTE) =====
export const ColorBlack: Story = {
  args: {
    children: "Black color",
    variant: "head16",
    palette: "black0",
  },
};

export const ColorRed: Story = {
  args: {
    children: "Red color",
    variant: "head16",
    palette: "red",
  },
};

export const ColorSuccess: Story = {
  args: {
    children: "Success color",
    variant: "head16",
    palette: "success",
  },
};

export const ColorBlue: Story = {
  args: {
    children: "Blue color",
    variant: "head16",
    palette: "blue",
  },
};

export const ColorPink: Story = {
  args: {
    children: "Pink color",
    variant: "head16",
    palette: "pink80",
  },
};

export const ColorOrange: Story = {
  args: {
    children: "Orange color",
    variant: "head16",
    palette: "orange",
  },
};

export const ColorYellow: Story = {
  args: {
    children: "Yellow color",
    variant: "head16",
    palette: "yellow",
  },
};

export const ColorLime: Story = {
  args: {
    children: "Lime color",
    variant: "head16",
    palette: "lime",
  },
};

// ===== CUSTOM COLORS =====
export const CustomColor: Story = {
  args: {
    children: "Custom color (#FF6B6B)",
    variant: "head16",
    color: "#FF6B6B",
  },
};

export const CustomColorRGB: Story = {
  args: {
    children: "Custom RGB color",
    variant: "head16",
    color: "rgb(138, 43, 226)",
  },
};

// ===== COMBINATIONS =====
export const BoldCenterBlue: Story = {
  args: {
    children: "Bold, Center, Blue",
    variant: "head20Bold",
    textAlign: "center",
    palette: "blue",
  },
};

export const UppercaseRightRed: Story = {
  args: {
    children: "Uppercase, Right, Red",
    variant: "head16",
    textTransform: "uppercase",
    textAlign: "right",
    palette: "red",
  },
};

// export const AllVariantsShowcase: Story = {
//   render: () => (
//     <View style={{ gap: 16 }}>
//       <Typography variant="head40Bold">Head 40 Bold</Typography>
//       <Typography variant="head28Bold">Head 28 Bold</Typography>
//       <Typography variant="head20Bold">Head 20 Bold</Typography>
//       <Typography variant="head16">Head 16 Regular</Typography>
//       <Typography variant="text16">Text 16 Regular</Typography>
//       <Typography variant="text14">Text 14 Regular</Typography>
//       <Typography variant="text12">Text 12 Regular</Typography>
//       <Typography variant="caption12">Caption 12</Typography>
//       <Typography variant="caption10">Caption 10</Typography>
//     </View>
//   ),
// };
