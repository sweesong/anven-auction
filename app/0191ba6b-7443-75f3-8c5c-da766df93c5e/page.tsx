'use client';

import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/spinner';
import { message } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function LoginPage() {

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const searchParams = useSearchParams();
  const paramError = searchParams.get('error');

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/0191ba6b-7443-75f3-8c5c-da766df93c5e/current-listing");
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  if (sessionStatus === "authenticated") {
    return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          <Spinner />
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-2 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In to Dashboard
        </h2>
        <div>
          <Button
            variant="bordered"
            type="submit"
            className="flex w-full justify-center rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm"
            onClick={() => signIn("google")}
          >
            <svg width="20px" height="20px" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path fill="#4285f4" d="M12.87999908 7.13331113c0-.49332777-.0400763-.85332837-.12666018-1.22665645H7.12000332v2.22664117h3.30664127c-.066603.55335156-.42664081 1.38668711-1.22665655 1.94665632l-.01121182.07452283 1.781156 1.37983931.12340638.01230915c1.13330234-1.04664784 1.78666048-2.5866559 1.78666048-4.41331233" /><path fill="#34a853" d="M7.1199995 12.99998274c1.61997706 0 2.97996124-.53335826 3.9733286-1.45332779l-1.89334397-1.46670278c-.506656.35333936-1.18667175.59999942-2.07998463.59999942-1.58665638 0-2.9333128-1.04663353-3.41335881-2.49329787l-.07036253.0059747-1.85207197 1.43333564-.02421753.06736635c.98665649 1.95998474 3.01332819 3.30668669 5.36001523 3.30668669" /><path fill="#fbbc05" d="M3.70664069 8.18665467c-.1266641-.37332817-.19996928-.7733588-.19996928-1.18667175 0-.41335838.07330146-.81334368.19330516-1.18667175l-.00335496-.07951328-1.87528168-1.45636157-.0613549.0291889c-.40664846.81334368-.63998411 1.7266948-.63998411 2.69335884 0 .96666415.23333565 1.87996937.63998507 2.69331295l1.94665651-1.5066412" /><path fill="#eb4335" d="M7.1199995 3.31996768c1.12664872 0 1.88663348.48666365 2.31998468.89335887l1.69332861-1.65334353C10.0933434 1.59331888 8.73997656.9999829 7.1199995.9999829c-2.34668704 0-4.37335884 1.34665643-5.36001523 3.30664108l1.9399924 1.5066871c.48670993-1.44666397 1.83336635-2.4933434 3.42002274-2.4933434" /></svg>
            Continue with Google
          </Button>
        </div>
        <div className='text-center text-red-500'>{paramError}</div>
      </div>
    )
  }
}