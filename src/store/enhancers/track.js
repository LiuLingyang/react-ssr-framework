const timelineActionTypes = ['ADD', 'SEEK', 'UNDO', 'REDO', 'REFRESH'];

const track = (name, reducer, size) => {
  const initialState = {
    timeline: [],
    index: -1,
    size: size || 1024
  };

  const handlers = {};

  timelineActionTypes.forEach(type => {
    handlers[name + '_' + type] = track[type.toLowerCase()];
  });

  /**
   * 1. action.record : false 则不做记录
   * 2. action.replace: true 证明需要替换上次记录
   * 3. action.clean: true 证明需要清空记录
   *
   */
  return (state, action) => {
    if (state === undefined) {
      state = initialState;
    }
    if (!state.timeline) {
      initialState.current = state;
      state = initialState;
    }
    const actionType = action.type;
    const handler = handlers[actionType];
    if (handler) {
      return handler(state, action.payload, action.replace);
    }
    // 此处使用 state.current，给内层 reducer 暴露的是部分state，非全量 state
    // 返回新的 部分 state 数据
    const newCurrentState = reducer(state.current, action);
    return add(state, newCurrentState, action.record !== false, action);
  };
};

// 将特定 state 加入 timeline
const add = (track.add = (state, data, recored, action) => {
  const current = state.current;
  if (data === current || data === undefined || data === null) return state;

  // data.action = action; // 记录当前action
  const nextState = {
    current: data
  };

  if (recored) {
    if (action.clean) {
      state.timeline = [];
    } else if (action.replace) {
      state.timeline.pop();
    }
    let nextTimeline = (nextState.timeline = state.timeline.slice(
      state.index + 1 >= state.size ? 1 : 0,
      state.index + 1
    ));
    nextState.index = nextTimeline.push(data) - 1;
  }

  return Object.assign({}, state, nextState);
});

/**
 * 搜索特定 index 的 timeline 数据，并替换当前 state
 * 实现 undo redo 功能
 */
const seek = (track.seek = (state, index, replace) => {
  const timeline = state.timeline;
  const maxIndex = timeline.length - 1;

  if (index < 0) {
    index = 0;
  }

  // Allow for -1 when timeline is empty.
  if (index > maxIndex) {
    index = maxIndex;
    return state;
  }

  if (replace) state.timeline = timeline.slice(0, index + 1);

  return index == state.index
    ? state
    : Object.assign({}, state, {
      index: index,
      current: timeline[index]
    });
});

track.undo = function(state, steps, replace) {
  return seek(state, state.index - (steps || 1), replace);
};

track.redo = function(state, steps) {
  return seek(state, state.index + (steps || 1));
};

export default track;
