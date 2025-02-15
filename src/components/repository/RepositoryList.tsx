import { RepositoryCard } from './RepositoryCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useStore } from '../../store/store';

export function RepositoryList() {
  const { repositories, isLoading, error, searchTerm } = useStore();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!searchTerm.trim()) {
    return (
      <div className="text-center text-gray-600">
        Start searching for something!
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No repositories found. Start searching for something else!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-7xl mx-auto">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
