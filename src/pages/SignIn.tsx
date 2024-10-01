import SignInForm from '@/components/SignIn/SignInForm';
import { TypographyH1 } from '@/components/ui/TypographyH1';
function SignIn() {
  return (
    <div className="mx-auto max-w-md">
      <div className="flex flex-col gap-10">
        <TypographyH1>Sign in</TypographyH1>
        <SignInForm />
      </div>
    </div>
  );
}

export default SignIn;
