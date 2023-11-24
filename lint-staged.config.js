module.exports = {
  '*.ts': 'npx tsc --noEmit',
  '*.{js,jsx,ts,tsx}': 'npx eslint',
  '*.{js,jsx,ts,tsx,html,css}': 'npx prettier --write',
};
