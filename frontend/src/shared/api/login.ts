import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '.';

interface LoginPayload {
  email: string;
  password: string;
  publicKey: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const useAuthMutations = () => {
  const loginMutation = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async ({ email, password, publicKey }: LoginPayload) => {
      const { data } = await axiosClient.post('/auth/register', { email, password, publicKey });
      return data;
    },
  });

  return { loginMutation };
};

export { useAuthMutations };
