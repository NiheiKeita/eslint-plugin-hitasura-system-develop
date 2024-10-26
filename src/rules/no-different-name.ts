import { Rule } from 'eslint';

export const noDifferentName: Rule.RuleModule = {
  create(context) {
    return {
      'VariableDeclaration > VariableDeclarator[init.type="FunctionExpression"]': (node: any) => {
        const functionName = node.init.id ? node.init.id.name : '';
        const componentName = node.id.name;

        if (functionName !== componentName) {
          context.report({
            node,
            message: `React component name "${componentName}" must match function name "${functionName}".`,
          });
        }
      }
    };
  },
};
