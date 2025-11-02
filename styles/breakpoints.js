// Breakpoint values for responsive design
export const breakpoints = {
  tablet: '750px',
};

// Helper function for media queries
export const media = {
  tablet: (styles) => `
    @media (min-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
};
