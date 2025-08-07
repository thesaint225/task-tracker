import type { FilterType } from '../Types/types';

type FilterControllerProps = {
  currentType: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function FilterController({
  currentType,
  onFilterChange,
}: FilterControllerProps) {
  return (
    <div>
      <button
        onClick={() => onFilterChange('all')}
        disabled={currentType === 'all'}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        disabled={currentType === 'active'}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        disabled={currentType === 'completed'}
      >
        completed
      </button>
    </div>
  );
}
