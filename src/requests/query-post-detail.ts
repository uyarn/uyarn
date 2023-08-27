import useSWR from 'swr';
import { HOST } from './constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const usePostList = (postId: string) => {
  const { data, error, isLoading } = useSWR(`${HOST}/post-detail/${postId}`, fetcher, { suspense: true });
  return {
    data,
    error,
    isLoading,
  };
};
export default usePostList;
