/**
 * 画像データをバイナリデータへ変換する
 * @param file
 */
export function convertToBinary(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const binaryData = reader.result;
      resolve(binaryData);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsArrayBuffer(file);
  });
}
