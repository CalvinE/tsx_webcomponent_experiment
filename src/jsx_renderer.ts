const FRAGMENT = "<></>";

// The code for this function was taken from an anwer on stack overflow:
// https://stackoverflow.com/questions/30430982/can-i-use-jsx-without-react-to-inline-html-in-script
// From an answer from user: https://stackoverflow.com/users/5093961/steven-spungin
// and from: https://www.meziantou.net/write-your-own-dom-element-factory-for-typescript.htm

// One thing to fix is adding the types for JSX to function with intellisense...
// Like an non framework tied typing for TSX.
// Here is a typing for JSX in React: https://github.com/geowarin/ts-react/blob/master/typings/react/react-jsx.d.ts
export const JSXFactory = {
    // tslint:disable-next-line: only-arrow-functions object-literal-shorthand
    createElement: function (tag: string, attrs: { [index: string]: any } | null, ...children: any[]): Element | DocumentFragment {
        if (tag === FRAGMENT) {
            return document.createDocumentFragment();
        }

        const element = document.createElement(tag);

        for (const name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                const attrValue = attrs[name];
                if (name === "className") {
                    if (typeof attrValue === "string") {
                        const classes = attrValue.split(" ");
                        element.classList.add(...classes);
                    } else {
                        throw new Error(`Value provided to className must be a string.`);
                    }
                } else {
                    const value = attrValue;
                    if (value === true) {
                        element.setAttribute(name, name);
                    } else if (value !== false && value !== null) {
                        element.setAttribute(name, value.toString());
                    }
                }
            }
        }
        for (const child of children ?? []) {
            this.appendChild(element, child);
        }
        return element;
    },
    // tslint:disable-next-line: only-arrow-functions object-literal-shorthand
    appendChild: function (parent: Node, child: any) {
        if (typeof child === "undefined" || child == null) {
            return;
        }

        if (Array.isArray(child)) {
            for (const item of child) {
                this.appendChild(parent, item);
            }
        } else if (typeof child === "string") {
            parent.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            parent.appendChild(child);
        } else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
}