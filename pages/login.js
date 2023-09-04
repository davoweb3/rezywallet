import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/lib/UserContext';
import { Magic } from '@magic-sdk/admin';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic';

export default function Login() {
  // Allows us to access the user state and update it within this page
  const [user, setUser] = useContext(UserContext);
  // Our email state that we'll use for our login form
  const [email, setEmail] = useState('');
  const router = useRouter();

  // Make sure to add useEffect to your imports at the top

  useEffect(() => {
    // Check for an issuer on our user object. If it exists, route them to the dashboard.
    user?.issuer && router.push('/dashboard');
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Log in using our email with Magic and store the returned DID token in a variable
    // const accounts = await magic.wallet.connectWithUI();

    try {
      // const didToken = await magic.auth.loginWithMagicLink({ email });
      const didToken = await magic.auth.loginWithEmailOTP({ email });

      // Send this token to our validation endpoint
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      });

      // If successful, update our user state with their metadata and route to the dashboard
      if (res.ok) {
        const userMetadata = await magic.user.getMetadata();
        setUser(userMetadata);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        {/* Insert the remote image using the <img> tag */}
        <img src="https://i.postimg.cc/QMVfzGtc/qrcode.jpg" alt="Rezy Wallet Logo" />
      </div>
      <h2>Welcome to Rezy Wallet, Thanks for making the world a better place!</h2>
      <h2>Enter your email to login</h2>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Login to Rezy Wallet</button>
    </form>
  );
}
