import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const Filter = ({
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
  showAvailableOnly,
  onAvailabilityChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
}) => {
  const specialtyOptions = specialties.map((specialty, index) => ({
    value: specialty,
    label: specialty,
    key: `specialty-${index}`
  }));

  const availabilityOptions = [
    { value: 'all', label: 'All Availability', key: 'availability-all' },
    { value: 'available', label: 'Available Only', key: 'availability-available' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div className="flex-1 min-w-[200px]">
        <Select
          id="specialty-filter"
          label="Filter by specialty"
          value={selectedSpecialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          options={specialtyOptions}
          aria-label="Filter by specialty"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <Select
          id="availability-filter"
          label="Filter by availability"
          value={showAvailableOnly ? 'available' : 'all'}
          onChange={(e) => onAvailabilityChange(e.target.value === 'available')}
          options={availabilityOptions}
          aria-label="Filter by availability"
        />
      </div>

      <div className="flex-1 min-w-[300px]">
        <div className="relative">
          <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">
            Search doctors
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or specialty"
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search doctors"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          size="medium"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

Filter.propTypes = {
  specialties: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSpecialty: PropTypes.string.isRequired,
  onSpecialtyChange: PropTypes.func.isRequired,
  showAvailableOnly: PropTypes.bool.isRequired,
  onAvailabilityChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default Filter;