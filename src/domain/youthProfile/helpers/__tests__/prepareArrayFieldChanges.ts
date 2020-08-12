import prepareArrayFieldChanges from '../prepareArrayFieldChanges';

describe('prepareArrayFieldChanges', () => {
  const current = [
    {
      id: '123',
      balance: '-200',
    },
    {
      id: '98123',
      balance: '100',
    },
  ];
  const next = [
    {
      id: '123',
      balance: '-100',
    },
    {
      balance: '200',
    },
  ];

  it('should create models without an id', () => {
    expect(prepareArrayFieldChanges(current, next).add).toEqual([next[1]]);
  });

  it('should update models with an id', () => {
    expect(prepareArrayFieldChanges(current, next).update).toEqual([next[0]]);
  });

  it('should remove models that no longer exist', () => {
    expect(prepareArrayFieldChanges(current, next).remove).toEqual([
      current[1].id,
    ]);
  });
});
