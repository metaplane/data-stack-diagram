# data-stack-diagram

This project defines what logos are available on https://www.datastackdiagram.com/

## Contributing

To add a new integration, open a PR that includes the following updates.

### Add an entry to `integration.json`

New entries should be added alphabetically.

```json
  "newentry": {
    "name": "New Entry",
    "category": "Database"
  },
```

### Add a Logo

Each logo should meet the following criteria.

- be an SVG named `logo/{integration}.svg` where `{integration}` matches the key in `integrations.json`
- have an entry in [SuperBrandIconUrls](https://github.com/metaplane/metaplane-frontend/blob/29dadf4f98ab684612f7d0afd480587dc9b173dd/packages/super/src/SuperIcon/SuperBrandIcon.tsx#L29)
- be 400px by 400px
- have a transparent background
- be centered and fit as tightly as possible to the 400x400 box
