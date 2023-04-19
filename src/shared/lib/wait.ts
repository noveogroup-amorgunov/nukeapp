export const wait = async (ms = 500) =>
  await new Promise((resolve) => setTimeout(resolve, ms))
