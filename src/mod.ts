import { DOMParser } from '../deps.ts';
// class for Ginger instance
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

  find(tag: string, attrs?: any): string {
    const elements = this._tree()!.getElementsByTagName(tag);
    if (attrs) {
      const keys = Object.keys(attrs);
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let isMatch = true;
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          const value = attrs[key];
          if (element.getAttribute(key) !== value) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          return element.textContent;
        }
      }
    }
    return this._tree()!.querySelector(tag)!.textContent;
  }

  findAll(tag: string, attrs?: any): string[] {
    const elements = this._tree()!.getElementsByTagName(tag);
    const result: string[] = [];
    for (let i = 0; i < elements.length; i++) {
      if (attrs) {
        const element = elements[i];
        const keys = Object.keys(attrs);
        let isMatch = true;
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          const value = attrs[key];
          if (element.getAttribute(key) !== value) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          result.push(element.textContent);
        }
        
      } else {
        result.push(elements[i].textContent);
      }
    }
     return result;
  }
 
  }
  

