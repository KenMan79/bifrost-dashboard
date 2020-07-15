// Copyright 2017-2020 @polkadot/react-query authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Compact } from '@polkadot/types';
import { formatBalance } from '@polkadot/util';

import { useTranslation } from './translate';

interface Props {
  className?: string;
  isShort?: boolean;
  label?: React.ReactNode;
  labelPost?: string;
  value?: Compact<any> | BN | string | null | 'all';
  withSi?: boolean;
  BNC?: boolean;
}

// for million, 2 * 3-grouping + comma
const M_LENGTH = 6 + 1;
const K_LENGTH = 3 + 1;

function format (value: Compact<any> | BN | string, currency: string, BNC?: boolean, withSi?: boolean, _isShort?: boolean, labelPost?: string): React.ReactNode {
  const [prefix, postfix] = formatBalance(value, { forceUnit: '-', withSi: false }).split('.');
  const isShort = _isShort || (withSi && prefix.length >= K_LENGTH);

  if (prefix.length > M_LENGTH) {
    // TODO Format with balance-postfix
    return `${formatBalance(value)}${labelPost || ''}`;
  }

  return <>{`${prefix}${isShort ? '' : '.'}`}{!isShort && (<><span className='ui--FormatBalance-postfix'>{`000${postfix || ''}`.slice(-3)}</span></>)} {`${currency}${labelPost || ''}`}{BNC ? 'BNC' : currency}</>;
}

function FormatBalance ({ children, className = '', isShort, label, BNC, labelPost, value, withSi, currency }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  let inputcurrency;
  if (currency) {
    inputcurrency = currency;
  } else {
    [inputcurrency] = useState(formatBalance.getDefaults().unit);
  }

  // labelPost here looks messy, however we ensure we have one less text node
  return (
    <div className={`ui--FormatBalance ${className}`}>
      {BNC ? value
        ? label : '' : (label || '')}
      <span className='ui--FormatBalance-value'>{
        value
          ? value === 'all'
            ? t<string>('everything{{labelPost}}', { replace: { labelPost } })
            : BNC ? format(value, BNC,currency, withSi, isShort, labelPost)
          : `-${labelPost || ''}`
      }</span>
    </div>
  );
}

export default React.memo(styled(FormatBalance)`
  display: inline-block;
  vertical-align: baseline;
  white-space: nowrap;

  * {
    vertical-align: baseline !important;
  }

  > label,
  > .label {
    display: inline-block;
    margin-right: 0.25rem;
    vertical-align: baseline;
  }

  .ui--FormatBalance-value {
    text-align: right;

    > .ui--FormatBalance-postfix {
      font-weight: 100;
      opacity: 0.75;
      vertical-align: baseline;
    }
  }

  .ui--Icon {
    margin-top: 0.25rem;
    margin-bottom: -0.25rem;
  }

  .ui--Icon+.ui--FormatBalance-value {
    margin-left: 0.375rem;
  }
`);
