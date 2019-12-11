import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

import { MyProfileQuery } from '../../graphql/__generated__/MyProfileQuery';

const MY_PROFILE = loader('../../graphql/MyProfileQuery.graphql');

type Props = {};

function ViewYouthProfile(props: Props) {
  const { data } = useQuery<MyProfileQuery>(MY_PROFILE);
  return <div>{data && JSON.stringify(data)}</div>;
}

export default ViewYouthProfile;
