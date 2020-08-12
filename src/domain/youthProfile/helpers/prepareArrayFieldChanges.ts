type Model = { id: string };

type ArrayFieldChanges<Add, Update, Remove> = {
  add: Add;
  update: Update;
  remove: Remove;
};

function prepareArrayFieldChanges<C, M extends Model>(
  current: M[],
  next: Array<M | Omit<C, 'id'>>
): ArrayFieldChanges<Omit<C, 'id'>[], M[], string[]> {
  const add = next.filter((model): model is Omit<C, 'id'> => !('id' in model));
  const update = next.filter((model): model is M => 'id' in model);
  const nextIds = next
    .filter(
      (model): model is M => 'id' in model && typeof model.id === 'string'
    )
    .map(model => model.id);
  const remove = current
    .filter(model => !nextIds.includes(model.id))
    .map(model => model.id);

  return {
    add,
    update,
    remove,
  };
}

export default prepareArrayFieldChanges;
