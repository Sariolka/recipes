import router from '@/router/router.ts';

export const pushTo404 = () => {
  router.push(`/404`).catch((error) => {
    console.error(error);
  });
};
