import { tryLogin, tryRegister } from '../api/LoginRegister';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from '../util/Cookie';
import { toast } from 'react-toastify';

export const useLogin = () => {
  return useMutation(tryLogin, {
    onSuccess: (loginData) => {
      const { accessToken, refreshToken } = loginData.data;
      localStorage.setItem('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

      location.href = '/';
      toast('로그인에 성공했습니다!');
    },
    onError: (error) => {
      const errorCode = error.response.data.errorCode;
      switch (errorCode) {
        case 'EMAIL_NOT_EXISTS':
          toast('존재하지 않는 계정입니다!');
          break;
      }
    },
  });
};

export const useRegister = () => {
  return useMutation(tryRegister, {
    onSuccess: () => {
      toast('회원가입에 성공했습니다!');
    },
    onError: (error) => {
      const errorCode = error.response.data.errorCode;

      switch (errorCode) {
        case 'EMAIL_EXITS':
          toast('이미 존재하는 이메일입니다');
          break;
        case 'NAME_EXISTS':
          toast('이미 사용중인 이름입니다');
          break;
      }
    },
  });
};
