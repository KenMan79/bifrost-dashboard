// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback } from 'react';

import type { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { ApiPromise } from '@polkadot/api';

import type { DropdownOptions } from '../util/types';
import Dropdown from '../Dropdown';

interface Props {
  api: ApiPromise;
  className?: string;
  isError?: boolean;
  onChange: (value: SubmittableExtrinsicFunction<'promise'>) => void;
  options: DropdownOptions;
  value: SubmittableExtrinsicFunction<'promise'>;
}

function SelectMethod ({ api, className = '', isError, onChange, options, value }: Props): React.ReactElement<Props> | null {
  const transform = useCallback(
    (method: string): SubmittableExtrinsicFunction<'promise'> =>
      api.tx[value.section][method],
    [api, value]
  );

  if (!options.length) {
    return null;
  }

  return (
    <Dropdown
      className={`ui--DropdownLinked-Items ${className}`}
      isError={isError}
      onChange={onChange}
      options={options}
      transform={transform}
      value={value.method}
      withLabel={false}
    />
  );
}

export default React.memo(SelectMethod);
