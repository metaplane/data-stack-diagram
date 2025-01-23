const fs = require('fs');
const path = require('path');
const logos = require('../logos.json');
const { keys, difference } = require('ramda');

console.log("");
console.log("Validate SVGs");
console.log("=============");
console.log("");

const svgsPath = path.resolve(__dirname, '..', 'svgs');

try {
  const svgFiles = fs.readdirSync(svgsPath);
  const svgNames = svgFiles.map(fileName => fileName.replace(/\.svg$/, ''));
  const logoNames = keys(logos);
  const missingSVGs = difference(logoNames, svgNames);
  if (missingSVGs.length > 0) {
    console.log(`❌ ${missingSVGs.length} logo${missingSVGs.length === 1 ? '' : 's'} missing from ./svgs/`);
    console.log("");
    for (const logo of missingSVGs) {
      console.log(`    - svgs/${logo}.svg`);
    }
  } else {
    console.log(`✅ All logos defined in ./svg/`);
  }
  console.log("");

  if (missingSVGs.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (error) {
  console.error('Validate SVGs failed:', error);
  process.exit(1);
}
