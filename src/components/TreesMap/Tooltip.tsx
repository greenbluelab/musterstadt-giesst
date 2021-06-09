import React, { FC } from 'react';
import styled from 'styled-components';
import { DataTable, TableItemsType } from '../DataTable';

const TOOLTIP_WIDTH = 260;

const StyledTooltipWrapper = styled.div`
  width: ${TOOLTIP_WIDTH}px;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transform: translateY(10px);
`;

export const Tooltip: FC<{
  x: number;
  y: number;
  title: string;
  subtitle: string;
  infos: TableItemsType;
}> = ({ x, y, title, subtitle, infos }) => {
  return (
    <StyledTooltipWrapper
      style={{
        left: x - TOOLTIP_WIDTH / 2,
        top: y,
      }}
      className='tooltip'
    >
      <DataTable title={title} subtitle={subtitle} items={{ ...infos }} />
    </StyledTooltipWrapper>
  );
};
