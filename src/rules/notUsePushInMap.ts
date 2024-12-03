import { TSESTree } from '@typescript-eslint/utils'
import { RuleModule } from '@typescript-eslint/utils/dist/eslint-utils'

export const notUsePushInMapRule: RuleModule<'notUsePushInMap'> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow the use of push inside map method',
    },
    messages: {
      notUsePushInMap: "Do not use"
    },
    schema: []
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        const callee = node.callee
        if (callee.type !== 'MemberExpression' ||
          callee.property.type !== 'Identifier' ||
          callee.property.name !== 'map') {
          // mapを使用していない場合はチェックしない
          return
        }

        const callback = node.arguments[0]
        if (!callback || (callback.type !== 'FunctionExpression' && callback.type !== 'ArrowFunctionExpression')) {
          // .map() か .map(function()) の場合でないときはチェックしない
          return
        }
        const body = callback.body

        // 実際にPushを使用しているかどうかのチェック
        const checkPushCall = (expression: TSESTree.Expression) => {
          if (expression.type !== 'CallExpression') return
          const innerCall = expression.callee
          if (
            innerCall.type === 'MemberExpression' &&
            innerCall.property.type === 'Identifier' &&
            innerCall.property.name === 'push'
          ) {
            // map 内で push を使用している場合に報告
            context.report({
              node: innerCall,
              messageId: 'notUsePushInMap',
            });
          }
        }

        if (body.type === 'BlockStatement') {
          // map(i=> {}) のかたちのもの
          body.body.forEach(statement => {
            if (statement.type === 'ExpressionStatement') {
              checkPushCall(statement.expression)
            }
          });
        } else {
          // map(i=> {}) のかたち以外のもの
          checkPushCall(body)
        }

      }
    }
  }
}
