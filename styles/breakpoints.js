// Breakpoint values for responsive design
export const breakpoints = {
  tablet: '750px',
  // Where the site header switches from the mobile layout to the desktop one
  desktop: '1024px',
};

// Helper function for media queries
export const media = {
  tablet: (styles) => `
    @media (min-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
};
