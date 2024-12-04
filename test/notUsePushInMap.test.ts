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
    { code: "const a = [1, 2, 3];const b = [];a.concat(i => b.push(i))", errors: [{ message: "Do not use push inside a concat method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.copyWithin(i => b.push(i))", errors: [{ message: "Do not use push inside a copyWithin method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.every(i => b.push(i))", errors: [{ message: "Do not use push inside a every method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.filter(i => b.push(i))", errors: [{ message: "Do not use push inside a filter method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.flat(i => b.push(i))", errors: [{ message: "Do not use push inside a flat method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.flatMap(i => b.push(i))", errors: [{ message: "Do not use push inside a flatMap method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.indexOf(i => b.push(i))", errors: [{ message: "Do not use push inside a indexOf method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.lastIndexOf(i => b.push(i))", errors: [{ message: "Do not use push inside a lastIndexOf method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.reduce(i => b.push(i))", errors: [{ message: "Do not use push inside a reduce method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.reduceRight(i => b.push(i))", errors: [{ message: "Do not use push inside a reduceRight method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.reverse(i => b.push(i))", errors: [{ message: "Do not use push inside a reverse method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.slice(i => b.push(i))", errors: [{ message: "Do not use push inside a slice method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.some(i => b.push(i))", errors: [{ message: "Do not use push inside a some method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.sort(i => b.push(i))", errors: [{ message: "Do not use push inside a sort method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.splice(i => b.push(i))", errors: [{ message: "Do not use push inside a splice method." }] },
    { code: "const a = [1, 2, 3];const b = [];a.map(i => {if(true){b.push(i)}})", errors: [{ message: "Do not use push inside a map method." }] }
  ]
})

