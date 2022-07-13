import { DOMParser } from '../deps.ts';
// class for Ginger instance

export class HtmlNode {
  html: string;
  constructor(html: string) {
    this.html = html;
  }

  text() {
    return new DOMParser().parseFromString(this.html, "text/html")!.querySelector("body")!.textContent;
  }
}

export class Ginger {
content: string;
  constructor(content: string) {
    this.content = content;
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

  find(tag: string, attrs?: any): HtmlNode {
    const elements = this._tree()!.getElementsByTagName(tag);
    if (attrs) {
      const keys = Object.keys(attrs);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let isMatch = true;
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          const value = attrs[key];

          // check if value is a regex
          if (value instanceof RegExp) {
            if (!value.test(element.getAttribute(key)!)) {
              isMatch = false;
              break;
            }
          }
          // check if value is a string
          else if (element.getAttribute(key) !== value) {
            isMatch = false;
            break;
          }
      }
      if (isMatch) {
        return new HtmlNode(element.outerHTML);
      }
    }
  }
    return new HtmlNode(this._tree()!.querySelector(tag)!.outerHTML);
}

  findAll(tag: string, attrs?: any): HtmlNode[] {
    const elements = this._tree()!.getElementsByTagName(tag);
    const result: HtmlNode[] = [];
    for (let i = 0; i < elements.length; i++) {
      if (attrs) {
        const element = elements[i];
        const keys = Object.keys(attrs);
        let isMatch = true;
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          const value = attrs[key];

          // check if value is a regex
          if (value instanceof RegExp) {
            if (!value.test(element.getAttribute(key)!)) {
              isMatch = false;
              break;
            }
          }
          // check if value is a string
          else if (element.getAttribute(key) !== value) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          result.push(new HtmlNode(element.outerHTML));
        }
        
      } else {
        result.push(new HtmlNode(elements[i].outerHTML));
      }
    }
     return result;
  }
 
  }
  

