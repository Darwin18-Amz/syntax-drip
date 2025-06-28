export const handleLogin = async (formData, navigate, setError) => {
  const { username, password } = formData;

  const DEV_USERNAME = 'syntaxdrip';
  const DEV_PASSWORD = 'SyntaxDrip@2025';

  if (username === DEV_USERNAME && password === DEV_PASSWORD) {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  } else if (username !== DEV_USERNAME && password !== DEV_PASSWORD) {
    setError('Username and Password is wrong');
  } else if (username !== DEV_USERNAME) {
    setError('Username is wrong');
  } else if (password !== DEV_PASSWORD) {
    setError('Password is wrong');
  }
};
