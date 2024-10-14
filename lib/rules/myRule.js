"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const myRule = {
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
    create(context) {
        return {
            CallExpression(node) {
                var _a, _b;
                const callee = node.callee;
                if (((_a = callee.object) === null || _a === void 0 ? void 0 : _a.name) === 'console' && ((_b = callee.property) === null || _b === void 0 ? void 0 : _b.name) === 'log') {
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
exports.default = myRule;
