import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import Search from '../components/Search/Search';
import { useLoaderData, useNavigate, useSearchParams } from '@remix-run/react';
import Results from '../components/Results/Results';
import Flyout from '../components/Flyout/flyout';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search') || '';
  const page = url.searchParams.get('page') || 1;

  let apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;
  if (searchTerm) {
    apiUrl += `&name=${searchTerm}`;
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Response('Error fetching data', { status: response.status });
  }

  const data = await response.json();
  return json(data);
};

export default function Index() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = useLoaderData<typeof loader>();
  const { results, info } = data;

  const handleSearch = (searchTerm: string) => {
    const trimmedSearch = searchTerm.trim();
    navigate(`/?search=${trimmedSearch}&page=1`);
  };

  const currentPage = Number(searchParams.get('page') || 1);

  const handlePageChange = (newPage: number) => {
    navigate(`/?search=${searchParams.get('search') || ''}&page=${newPage}`);
  };

  return (
    <div className="font-sans p-4">
      <Search
        onSearch={handleSearch}
        initialSearch={searchParams.get('search') || ''}
      />
      <Results
        data={results}
        pageInfo={info}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Flyout />
    </div>
  );
}
