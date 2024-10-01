import { TypographyH1 } from '@/components/ui/TypographyH1';
import SignInForm from '@/components/SignIn/SignInForm';
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
