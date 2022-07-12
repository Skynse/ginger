import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// class for Ginger instance
export class Ginger {
content: string;
  constructor(content: string) {
    this.content = content;
  }

  // get the url
  url() {
    return this.url;
  }

  tree = () => {
    this._tree();
  }

  private _tree() {
    return new DOMParser().parseFromString(this.content, "text/html");
  }

  title(): string {
    return this._tree()!.querySelector("title")!.textContent;
  }

  body(): string {
    return this._tree()!.querySelector("body")!.textContent;
  }
}
