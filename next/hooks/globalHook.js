function setState(store, newState, afterUpdateCallback) {
  store.state = { ...store.state, ...newState };
  store.listeners.forEach((listener) => {
    if (listener.fds && listener.fds.length > 0) {
      // run if has specific keys to listen
      if (Object.keys(newState).filter(s => listener.fds.includes(s)).length > 0) {
        listener.run(store.state)
      }
    } else {
      listener.run(store.state)
    }
  })
  afterUpdateCallback && afterUpdateCallback(store) // return with new store and state
}

function useCustom(store, React, mapState, mapActions, initState, fields) {
  const [, originalHook] = React.useState(initState);
  const state = mapState ? mapState(store.state) : store.state;
  const actions = React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  )

  // console.log("STORE", store, arguments)

  React.useEffect(() => {
    const newListener = { oldState: {} };
    newListener.id = new Date().getTime()
    newListener.fds = fields || []
    newListener.run = mapState
      ? newState => {
          const mappedState = mapState(newState);
          if (mappedState !== newListener.oldState) {
            newListener.oldState = mappedState;
            originalHook(mappedState);
          }
        }
      : originalHook;
    store.listeners.push(newListener);
    newListener.run(store.state);
    return () => {
      store.listeners = store.listeners.filter(
        listener => listener !== newListener
      );
    };
  }, []); // eslint-disable-line

  return [state, actions];
}

function associateActions(store, actions) {
  const associatedActions = {};
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "function") {
      associatedActions[key] = actions[key].bind(null, store);
    }
    if (typeof actions[key] === "object") {
      associatedActions[key] = associateActions(store, actions[key]);
    }
  });
  return associatedActions;
}

const useStore = (React, initialState, actions, initializer) => {
  const store = { state: initialState, listeners: [] }
  store.setState = setState.bind(null, store)
  store.actions = associateActions(store, actions)
  if (initializer) initializer(store) // asyncronously load the state
  return useCustom.bind(null, store, React, null, null, initialState)
}

export default useStore;
