# Montserrat

The site's normal Montserrat variable font is bundled locally so production
builds do not depend on Google Fonts CSS or font-file downloads.

- Source package: `@fontsource-variable/montserrat@5.3.0`
- Source file: `files/montserrat-latin-wght-normal.woff2`
- Upstream: https://github.com/JulietaUla/Montserrat
- License: SIL Open Font License 1.1, included in `OFL.txt`
- Weight axis: 100 through 900, including the site's existing 300 to 700 weights
- Subset: Latin, including the Hawaiian punctuation used in the rental copy

`app/layout.tsx` loads the font with `next/font/local`, keeping the existing
CSS variable and swap behavior. No runtime font service or new npm dependency
is required.
