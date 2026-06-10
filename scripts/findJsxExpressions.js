const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', 'app');
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.tsx')) {
      const src = fs.readFileSync(p, 'utf8');
      const file = ts.createSourceFile(p, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      function visit(node, parent) {
        if (node.kind === ts.SyntaxKind.JsxExpression && parent && parent.kind === ts.SyntaxKind.JsxElement) {
          const opening = parent.openingElement.tagName.getText();
          if (opening !== 'Text') {
            const text = node.getText().trim();
            if (/^['"].*['"]$/.test(text) || /\b\w+\b/.test(text)) {
              console.log(p, opening, text.slice(0, 120));
            }
          }
        }
        ts.forEachChild(node, (n) => visit(n, node));
      }
      visit(file, null);
    }
  }
}
walk(root);
