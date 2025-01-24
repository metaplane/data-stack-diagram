# data-stack-diagram

This project defines the logos that are available on https://www.datastackdiagram.com/

## Contributing

To add a new logo, open a PR that includes the following updates.

### Add an entry to `logos.json`

```json
  "newentry": {
    "name": "New Entry",
    "category": "Database"
  },
```

Create new entries in alphabetical order.

### Add a Logo

Each logo should meet the following criteria.

- be an SVG file named `svg/{logo}.svg` where `{logo}` matches the key in `logo.json`
- has a matching entry in `logos.json`
- be 400px by 400px
- have a transparent background
- be centered and fit as tightly as possible to the 400x400 box
