import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function VisuallyHiddenText({ children }) {
  return <VisuallyHiddenTextWrapper>{children}</VisuallyHiddenTextWrapper>;
}

const VisuallyHiddenTextWrapper = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clippath: inset(50%) !important;
  clippath: inset(50%) !important; /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;

VisuallyHiddenText.propTypes = {
  children: PropTypes.node.isRequired,
};
