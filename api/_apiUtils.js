import { initializeZapt } from '@zapt/zapt-js';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID); // note that we are using 'process.env' here

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}