import login from '@/lib/actions/auth';

export default function LoginPage() {
  return (
    <main className="container h-full bg-app_bg">
      <form action={login}>
        <input type="text" id="studentId" name="studentId" placeholder="studentId" />
        <input type="password" placeholder="Password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
