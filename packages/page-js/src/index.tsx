// Copyright 2017-2020 @polkadot/app-js authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import type { AppProps as Props } from '@polkadot/react-components/types';

import Playground from './Playground';

function JsApp (props: Props): React.ReactElement<Props> {
  return <Playground {...props} />;
}

export default React.memo(JsApp);
