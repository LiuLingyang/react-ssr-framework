export interface TopDetail {
  id: number;
  name: string;
  picUrl?: string;
  pic?: string;
  info?: string;
}

export interface TopListAction {
  type: typeof SET_TOP_LIST;
  payload: TopDetail[];
}

export interface TopDetailAction {
  type: typeof SET_TOP_DETAIL;
  payload: TopDetail;
}

export interface SetClientAction {
  type: typeof SET_CLIENT_LOAD;
  payload: boolean;
}

export const SET_CLIENT_LOAD = 'SET_CLIENT_LOAD';
export const SET_TOP_LIST = 'SET_TOP_LIST';
export const SET_TOP_DETAIL = 'SET_TOP_DETAIL';
