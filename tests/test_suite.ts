import { Ginger } from '../src/mod.ts';
import { assertEquals } from '../test_deps.ts';

const text = `<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="older" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="older" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>
<a href="http://example.com/tillie" class="sister" id="link3">Macy</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>`

Deno.test('parse_title', () => {
    let ginger = new Ginger(text);
    const title = ginger.title();
    console.log(title);
    assertEquals(title, "The Dormouse's story")
})

Deno.test('parse_specific_attr', () => {
    const ginger = new Ginger(text);
    const name = ginger.find('a', {'class': 'sister'});
    console.log(name);
    assertEquals(name, "Tillie");
})

Deno.test('parse_specific_attr_multiple', () => {
    const ginger = new Ginger(text);
    const names = ginger.findAll('a', {'class': 'older'});
    console.log(names);
    assertEquals(names, ["Elsie", "Lacie",]);
})
