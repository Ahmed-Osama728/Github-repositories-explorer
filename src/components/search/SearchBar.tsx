import { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../../store/store';
import { searchRepositories } from '../../services/githubRepos';

export function SearchBar() {
  const { 
    searchTerm, 
    setSearchTerm, 
    setLoading, 
    setError, 
    setRepositories 
  } = useStore();

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const repositories = await searchRepositories(searchTerm);
      setRepositories(repositories);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search GitHub repositories..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search repositories"
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          aria-hidden="true"
        />
      </div>
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
}