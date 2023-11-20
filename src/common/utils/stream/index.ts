/**
 * apiのレスポンスからstreamデータにして返却する
 * @param data
 * @returns
 */
export async function processChunks(data: any) {
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let chunkAnswer = '';

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    chunkAnswer += chunkValue;
  }

  return chunkAnswer;
}
