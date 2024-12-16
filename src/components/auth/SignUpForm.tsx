import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { register, login } from '../../lib/auth';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const user = await register(name, email, password);
      const { token } = await login(email, password);
      setAuth(user, token);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="name"
        placeholder="Enter your full name"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        required
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Create a password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[34px] text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Input
        label="Confirm Password"
        type={showPassword ? 'text' : 'password'}
        name="confirmPassword"
        placeholder="Confirm your password"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit">Create Account</Button>
    </form>
  );
}