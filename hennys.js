const sessionUser = useSelector(state => state.session.user);

  const todos = useSelector(state => {
    return Object.values(state.todo).filter(td => td.userId === sessionUser?.id)
    .reverse();
  });
