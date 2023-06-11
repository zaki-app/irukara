export const getDatas = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  console.log('getDatasレスポンス', response);

  if (!response.ok) {
    throw new Error(`エラー取得時にエラーが発生しました。 ${response.status}`);
  }

  return response.json();
};

export const isTest = () => true;
