export const handleLogin = (formData, setError, navigate) => {
  const { username, password } = formData;

  const DEV_USERNAME = 'syntaxdrip';
  const DEV_PASSWORD = 'SyntaxDrip@2025';

  // Validate combinations
  if (username !== DEV_USERNAME && password !== DEV_PASSWORD) {
    setError('Username and Password is wrong');
  } else if (username !== DEV_USERNAME) {
    setError('Username is wrong');
  } else if (password !== DEV_PASSWORD) {
    setError('Password is wrong');
  } else {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  }
};
