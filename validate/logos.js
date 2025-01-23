const jsonDiff = require('json-diff');
const logos = require('../logos.json');
const { keys, sort } = require('ramda');
const { z } = require('zod');

let hasError = false

console.log("");
console.log("Validate Logos");
console.log("==============");
console.log("");

const LogoSchema = z.object({
  name: z.string().nonempty(),
  category: z.string().nonempty(),
})

const result = z.record(z.string().nonempty(), LogoSchema).safeParse(logos);

if (result.success) {
  console.log(`✅ logos.json is valid`);
} else {
  hasError = true;
  console.log(`❌ logos.json is invalid`);
  console.log("");
  console.error(result.error);
}
console.log("");

try {
  const logoNames = keys(logos);
  const sortDiff = jsonDiff.diffString(
    logoNames,
    sort((a, b) => a.localeCompare(b), logoNames)
  );
  if (sortDiff.trim()) {
    hasError = true;
    console.log(`❌ logos.json is not in alphabetical order`);
    console.log("");
    console.log(sortDiff);
  } else {
    console.log(`✅ logos.json is in alphabetical order`);
  }
  console.log("");

  if (hasError) {
    process.exit(1);
  } else {
    process.exit(0);
  }
} catch (error) {
  console.error('Validate Logos failed:', error);
  process.exit(1);
}
