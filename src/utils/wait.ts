export async function wait(secs: number): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, secs * 1000));
}
