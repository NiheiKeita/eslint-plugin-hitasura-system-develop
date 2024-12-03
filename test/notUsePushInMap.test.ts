const { RuleTester } = require("eslint")
const rule = require("../lib/rules/notUsePushInMap")

const tester = new RuleTester()

tester.run("rule", rule, {
  valid: [
    { code: "const a = [1, 2, 3];const b = [];a.foreach(i => b.push(i))" },
    { code: "const a = [1, 2, 3];const b = [];a.foreach(i => {if(true){b.push(i)}})" }
  ],
  invalid: [
    { code: "const a = [1, 2, 3];const b = [];a.map(i => b.push(i))", errors: [{ message: "Do not use push inside a map method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.map(i => {if(true){b.push(i)}})", errors: [{ message: "Do not use push inside a map method." }] }
  ]
})

