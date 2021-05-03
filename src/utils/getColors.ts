const DEFAULT_COLOR_PALETTE = [
  0xff7d00,
  0x7ac74f,
  0xec0b43,
  0x15616d,
  0x5d2e8c,
];

export const getColor = (index: number): number => {
  return DEFAULT_COLOR_PALETTE[index % DEFAULT_COLOR_PALETTE.length];
};
