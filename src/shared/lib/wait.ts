export async function wait(ms = 500) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}
