# Ginger
Ginger is a library for scraping and parsing web pages.

# Usage
```ts
import { Ginger } from 'https://deno.land/x/ginger/src/mod.ts';

// Get the title of google.com
const text = fetch("https://google.com").then(res => res.text());
const ginger = new Ginger(text);

const title = ginger.title();

// print the body of the webpage
const body = ginger.body();

// find paragraph
const p = ginger.find("p");
```

## Testing
```bash
deno test tests/test_suite.ts
```