import getSchool from '../getSchool';
import { MembershipDetails } from '../../../../graphql/generatedTypes';

it('concatenates schoolName and schoolClass', () => {
  const data = {
    youthProfile: {
      schoolClass: '44Ä',
      schoolName: 'Hogwarts',
    },
  } as MembershipDetails;
  const value = getSchool(data);
  expect(value).toBe('Hogwarts, 44Ä');
});

it('schoolClass missing', () => {
  const data = {
    youthProfile: {
      schoolName: 'Hogwarts',
    },
  } as MembershipDetails;
  const value = getSchool(data);
  expect(value).toBe('Hogwarts');
});

it('schoolName missing', () => {
  const data = {
    youthProfile: {
      schoolClass: '4B',
    },
  } as MembershipDetails;
  const value = getSchool(data);
  expect(value).toBe('4B');
});
