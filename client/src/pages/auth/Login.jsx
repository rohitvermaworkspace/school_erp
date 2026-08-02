import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

import api from '../../services/api';

import { useAuth } from '../../context/AuthContext';

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  // Handle Input Change
  const handleChange = (e) => {
    setError('');

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError('');

      // Validation
      if (!formData.email || !formData.password) {
        setError('Please fill all fields');

        setLoading(false);

        return;
      }

      // API Call
      const { data } = await api.post('/auth/loginUser', formData);

      console.log('Login Response:', data);

      // Save user + token
      login(data.user, data.token);

      // Role Based Navigation
      const role = data.user.role;

      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');

          break;

        case 'teacher':
          navigate('/teacher/dashboard');

          break;

        case 'student':
          navigate('/student/dashboard');

          break;

        default:
          navigate('/');
      }
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      px-4"
    >
      <div
        className="
       bg-white
        p-8
        rounded-2xl
        shadow-xl
        w-full
        max-w-md"
      >
        {/* Title */}
        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-2"
        >
          School ERP
        </h1>

        <p
          className="
          text-center
          text-gray-500
          mb-6"
        >
          Sign in to continue
        </p>

        {/* Error */}
        {error && (
          <div
            className="
            bg-red-100
            text-red-600
            p-3
            rounded
            mb-4"
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />

          <InputField type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />

          <Button type="submit" className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <p
            className="
            text-center
            text-gray-500 dark:text-gray-300"
          >
            Don't have an account?
            <Link
              to="/signup"
              className="
              text-blue-600
              ml-2
              hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
