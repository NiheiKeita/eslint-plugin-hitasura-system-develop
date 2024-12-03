import { TSESTree } from '@typescript-eslint/utils'
import { RuleModule } from '@typescript-eslint/utils/dist/eslint-utils'

type Options = {
  include?: string[],
  exclude?: string[]
}

export const notUsePushInMapRule: RuleModule<'notUsePushInMap', [Options]> = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow the use of push inside map method',
    },
    messages: {
      notUsePushInMap: "Do not use push inside a map method."
    },
    schema: [
      {
        type: "object",
        additionalProperties: false,
        properties: {
          include: {
            type: "array",
            items: {
              type: "string"
            },
            minItems: 0
          },
          exclude: {
            type: "array",
            items: {
              type: "string"
            },
            minItems: 0
          }
        }
      }
    ]
  },
  defaultOptions: [{
    include: ["./src/**/*.js", "./src/**/*.ts", "./src/**/*.jsx", "./src/**/*.tsx"],
    exclude: [],
  }],
  create(context) {
    const options = context.options[0] || {}
    const filename = context.filename
    const includePatterns = options.include?.map((pattern: string) => new RegExp(pattern.replace(/\*\*/g, '.*')))
    const excludePatterns = options.exclude?.map((pattern: string) => new RegExp(pattern.replace(/\*\*/g, '.*')))
    // ファイルが対象外かどうかを判定
    const isFileExcluded = () => {
      const isIncluded = includePatterns?.some((regex) => regex.test(filename)) ?? true
      const isExcluded = excludePatterns?.some((regex) => regex.test(filename)) ?? false
      return !isIncluded || isExcluded;
    };
    // ファイルが対象外であればルールをスキップ
    if (isFileExcluded()) {
      return {}
    }

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
