export function currency(num) {
  const money = parseInt(num, 10)
  return `${money.toFixed(0).replace(/./g, (char, index, originStr) => 
    index && (originStr.length - index) % 3 === 0 ? `,${char}` : char
  )}`
}


export function date(dateNum) {
  return new Date(dateNum * 1000).toISOString().split('T')[0]
}