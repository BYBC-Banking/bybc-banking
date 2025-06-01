
// Helper function to check if user is logged in
export const isLoggedIn = () => {
  // Check local storage for login state
  return localStorage.getItem('isLoggedIn') === 'true';
};
