/** fetch処理をまとめる */

interface PostOptionType {
  message: string;
  type: number;
}

// POST
export async function postAPI(path: string, option: PostOptionType) {
  let response;
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(option),
    });

    if (!res.ok) throw new Error(res.statusText);

    response = res;
  } catch (err) {
    console.error('post api error...', err);

    response = {
      statusCode: 500,
      ok: false,
      body: JSON.stringify({
        message: 'internal server error...',
      }),
    };
  }

  return response;
}
