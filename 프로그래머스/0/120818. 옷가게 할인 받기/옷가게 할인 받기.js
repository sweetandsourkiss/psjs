function solution(price) {
    const discount_ratio = price >= 500000 ? 0.2 : price >= 300000 ? 0.1 : price >= 100000 ? 0.05 : 0
    return Math.floor(price * (1 - discount_ratio))
}