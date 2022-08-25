function Random() {
  let maxLimit = 161;
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}
export default Random;
