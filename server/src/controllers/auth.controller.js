import * as authService from '../services/auth.service.js';

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await authService.signup({ name, email, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Signup failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Login failed' });
  }
}
