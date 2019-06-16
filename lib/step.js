// Powered by SaintCoinach

export default function step(offset = 0, time = Date.now()) {
  const today = (~~(time / 1000) / 70 / 60) + (offset / 3) // total day
  const bell = today * 24 // total hour
  const modifier = (bell + 8 - (bell % 8)) % 24 // ceil and keep as 0 8 16
  const base = ((today << 32) >>> 0) * 100 + modifier

  const step1 = ((base << 11) ^ base) >>> 0;
  const step2 = ((step1 >>> 8) ^ step1) >>> 0;

  // console.log('totalDays:', today)
  // console.log('calcBase:', base)

  return step2 % 100;
}
