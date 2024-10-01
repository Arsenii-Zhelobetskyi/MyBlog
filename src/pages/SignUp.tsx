
import { TypographyH1 } from '@/components/ui/TypographyH1';
import SignUpForm from '@/components/SignUp/SignUpForm';
function SignUp() {
    return (
        <div className="mx-auto max-w-md">
        <div className="flex flex-col gap-10">
          <TypographyH1>Sign up</TypographyH1>
          <SignUpForm />
        </div>
      </div>
    )
}

export default SignUp
