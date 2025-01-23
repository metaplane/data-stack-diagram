const fs = require('fs');
const path = require('path');
const logos = require('../logos.json');
const { keys, difference } = require('ramda');

let hasError

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
    hasError = true;
    console.log(`❌ ${missingSVGs.length} logo${missingSVGs.length === 1 ? '' : 's'} missing from /svgs directory`);
    console.log("");
    for (const logo of missingSVGs) {
      console.log(`    - svgs/${logo}.svg`);
    }
  } else {
    console.log(`✅ all logos defined in /svgs directory`);
  }
  console.log("");

  const missingLogos = difference(svgNames, logoNames);
  if (missingLogos.length > 0) {
    hasError = true;
    console.log(`❌ ${missingLogos.length} logos${missingLogos.length === 1 ? '' : 's'} missing in logos.json`);
    console.log("");
    for (const logo of missingLogos) {
      console.log(`    - ${logo}`);
    }
  } else {
    console.log(`✅ all SVGs defined in logos.json`);
  }
  console.log("");

  if (hasError) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (error) {
  console.error('Validate SVGs failed:', error);
  process.exit(1);
}
