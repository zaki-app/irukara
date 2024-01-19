type IrukaraApiObjkey =
  | 'GET_USER_ID'
  | 'POST_USER'
  | 'GET_MSG_DATE'
  | 'GET_MSG_REFE'
  | 'GET_MSG'
  | 'POST_MSG'
  | 'PUT_MSG'
  | 'DEL_MSG'
  | 'GET_IMAGES'
  | 'POST_ILLUST_IMAGE'
  | 'POST_REAL_IMAGE'
  | 'PUT_ILLUST_IMAGE';

export type IrukaraApiUnion = Record<IrukaraApiObjkey, string>;
