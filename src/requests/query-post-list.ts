import useSWR from 'swr';
import { HOST } from './constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type postListType = Array<{
  properties: {
    PostDate: {
      date: {
        start: string;
        end?: string;
        timezone?: string;
      };
    };
  };
}>;
const usePostList = () => {
  const { data, error, isLoading } = useSWR<postListType>(`${HOST}/post-list`, fetcher, {
    suspense: true,
  });

  return {
    data: data?.sort(
      (a, b) =>
        new Date(b.properties.PostDate.date.start).getTime() - new Date(a.properties.PostDate.date.start).getTime(),
    ),
    error,
    isLoading,
  };
};
export default usePostList;
