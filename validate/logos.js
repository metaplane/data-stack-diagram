const fs = require('fs');
const jsonDiff = require('json-diff');
const path = require('path');
const logos = require('../logos.json');
const { keys, difference, equals, sort } = require('ramda');

console.log("");
console.log("Validate logos.json");
console.log("===================");
console.log("");

const svgsPath = path.resolve(__dirname, '..', 'svgs');

try {
  const svgFiles = fs.readdirSync(svgsPath);
  const svgNames = svgFiles.map(fileName => fileName.replace(/\.svg$/, ''));
  const logoNames = keys(logos);
  const missingLogos = difference(svgNames, logoNames);
  if (missingLogos.length > 0) {
    console.log(`❌ ${missingLogos.length} logos${missingLogos.length === 1 ? '' : 's'} missing in logos.json`);
    console.log("");
    for (const logo of missingLogos) {
      console.log(`    - ${logo}`);
    }
  } else {
    console.log(`✅ All logos defined in logos.json`);
  }
  console.log("");

  const sortDiff = jsonDiff.diffString(
    logoNames,
    sort((a, b) => a.localeCompare(b), logoNames)
  );
  if (sortDiff.trim()) {
    console.log(`❌ logos.json is not in alphabetical order`);
    console.log("");
    console.log(sortDiff);
  } else {
    console.log(`✅ logos.json is in alphabetical order`);
  }
  console.log("");

  if (missingLogos.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (error) {
  console.error('Validate Logos failed:', error);
  process.exit(1);
}
