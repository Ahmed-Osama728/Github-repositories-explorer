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
    <div className="w-full max-w-2xl space-y-4">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}