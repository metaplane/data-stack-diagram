const fs = require('fs');
const path = require('path');
const integrations = require('../integrations.json');
const { keys, difference } = require('ramda');

console.log("");
console.log("Validate Integrations");
console.log("=====================");
console.log("");

const logosPath = path.resolve(__dirname, '..', 'logos');

try {
  const files = fs.readdirSync(logosPath);
  const logoNames = files.map(fileName => fileName.replace(/\.svg$/, ''));
  const integrationNames = keys(integrations);
  const missingIntegrations = difference(logoNames, integrationNames);
  if (missingIntegrations.length > 0) {
    console.log(`❌ ${missingIntegrations.length} integration${missingIntegrations.length === 1 ? '' : 's'} missing in integrations.json`);
    console.log("");
    for (const integration of missingIntegrations) {
      console.log(`    - ${integration}`);
    }
  } else {
    console.log(`✅ All integrations defined in integrations.json`);
  }
  console.log("");

  if (missingIntegrations.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (error) {
  console.error('Validation failed:', error);
  process.exit(1);
}
