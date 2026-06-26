const systemSans = 'System';
const systemDisplay = 'Georgia';

export const typography = {
  fontFamily: {
    regular: systemSans,
    medium: systemSans,
    semibold: systemSans,
    bold: systemSans,
    display: systemDisplay,
  },
  fontSize: {
    xs: 11,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 22,
    '3xl': 28,
    '4xl': 34,
    '5xl': 44,
  },
  h1: { fontFamily: systemSans, fontSize: 34, fontWeight: '800', lineHeight: 40, letterSpacing: 0 },
  h2: { fontFamily: systemSans, fontSize: 28, fontWeight: '800', lineHeight: 34, letterSpacing: 0 },
  h3: { fontFamily: systemSans, fontSize: 22, fontWeight: '800', lineHeight: 28, letterSpacing: 0 },
  h4: { fontFamily: systemSans, fontSize: 18, fontWeight: '700', lineHeight: 23, letterSpacing: 0 },
  h5: { fontFamily: systemSans, fontSize: 16, fontWeight: '700', lineHeight: 21, letterSpacing: 0 },
  h6: { fontFamily: systemSans, fontSize: 14, fontWeight: '700', lineHeight: 19, letterSpacing: 0 },
  body1: { fontFamily: systemSans, fontSize: 14, fontWeight: '400', lineHeight: 20, letterSpacing: 0 },
  body2: { fontFamily: systemSans, fontSize: 12, fontWeight: '400', lineHeight: 17, letterSpacing: 0 },
  subtitle1: { fontFamily: systemSans, fontSize: 14, fontWeight: '600', lineHeight: 20, letterSpacing: 0 },
  subtitle2: { fontFamily: systemSans, fontSize: 12, fontWeight: '600', lineHeight: 17, letterSpacing: 0 },
  button: { fontFamily: systemSans, fontSize: 13, fontWeight: '700', lineHeight: 18, letterSpacing: 0 },
  caption: { fontFamily: systemSans, fontSize: 10, fontWeight: '400', lineHeight: 14, letterSpacing: 0 },
  overline: { fontFamily: systemSans, fontSize: 10, fontWeight: '700', lineHeight: 14, letterSpacing: 0 },
  display: { fontFamily: systemDisplay, fontSize: 25, fontWeight: '700', lineHeight: 29, letterSpacing: 0 },
};

export const getTextStyle = (styleName, customStyle = {}) => ({
  ...(typography[styleName] || typography.body1),
  ...customStyle,
});
