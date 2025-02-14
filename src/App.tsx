import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { RepositoryList } from './components/repository/RepositoryList';
import { useStore } from './store/store';
import { useEffect } from 'react';
import { fetchStarredRepositories } from './services/githubRepos';

function App() {
  const { setStarredRepos, setError} = useStore();

  useEffect(() => {
    const handleFetchingStarredRepos = async () => {
      try {
        const starredRepos = await fetchStarredRepositories();
        setStarredRepos(new Set(starredRepos));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to update star status');
      }
    };

    handleFetchingStarredRepos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-8 px-4 py-8">
      <Header />
      <SearchBar />
      <RepositoryList />
    </div>
  );
}

export default App;
