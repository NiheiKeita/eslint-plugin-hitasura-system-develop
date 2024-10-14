import { Rule } from 'eslint';
import { Node } from 'estree';

const myRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow console.log statements',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // オプションが必要ない場合
  },
  create(context: Rule.RuleContext) {
    return {
      CallExpression(node: Node) {
        const callee = (node as any).callee;
        if (callee.object?.name === 'console' && callee.property?.name === 'log') {
          context.report({
            node,
            message: 'Unexpected console.log statement.',
            fix(fixer) {
              return fixer.replaceText(node, '');
            },
          });
        }
      },
    };
  },
};

export default myRule;
