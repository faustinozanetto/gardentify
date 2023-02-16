import { ApolloError } from '@apollo/client';
import { useToast } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { AuthActionType } from '@modules/auth/context/reducer/types';
import { useLoginMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthCredentialsForm, { AuthCredentialsFormData } from '../forms/auth-credentials-form';

const AuthLogin: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const [login] = useLoginMutation();

  const handleLogin = async (data: AuthCredentialsFormData) => {
    const loginData = await login({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then((response) => {
        return response.data?.login;
      })
      .catch((err: ApolloError) => {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      });

    if (loginData && loginData.user && loginData.user.uuid) {
      dispatch({
        type: AuthActionType.LOGIN,
        payload: {
          user: loginData.user,
          accessToken: loginData.accessToken,
        },
      });
      await router.push(`/users/${loginData.user.uuid}`);
    }
  };

  return (
    <div className="flex w-[350px] flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:p-6">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">Login</h1>

      <AuthCredentialsForm onSubmitted={handleLogin} />
    </div>
  );
};

export default AuthLogin;
