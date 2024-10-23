module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  endOfLine: "auto",
  overrides: [
    {
      "files": "*.json",
      "options": {
        "tabWidth": 4
      }
    }
  ]

};