module.exports = {
  endOfLine: "lf",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^components/(.*)$",
    "^(next/(.*)$)|^(next$)",
    "",
    "^types$",
    "^@/config/(.*)$",
    "^@/components/(.*)$",
    "^@/lib/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
