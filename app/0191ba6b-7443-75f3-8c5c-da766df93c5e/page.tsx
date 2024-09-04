import SignInButton from '@/components/signbutton';

export default function LoginPage(){
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="/0191ba6b-7443-75f3-8c5c-da766df93c5e/upload" method="POST" className="space-y-6">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In to Dashboard
          </h2>
            <div>
              <SignInButton />
            </div>
          </form>
        </div>
    )
}