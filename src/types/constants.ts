type IrukaraApiObjkey =
  | 'GET_USER_ID'
  | 'POST_USER'
  | 'GET_MSG_DATE'
  | 'GET_MSG_REFE'
  | 'GET_MSG'
  | 'POST_MSG'
  | 'PUT_MSG'
  | 'DEL_MSG';

export type IrukaraApiUnion = Record<IrukaraApiObjkey, string>;
