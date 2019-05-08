export function defaultReducerHandler (ACTION_HANDLERS, initialState) {
  return (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
  }
}
