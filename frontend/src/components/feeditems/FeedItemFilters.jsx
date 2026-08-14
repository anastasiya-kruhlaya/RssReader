export default function FeedItemFilters({ filters, onChange }) {
    const handleSelectChange = (field) => (e) => {
        const value = e.target.value === '' 
            ? undefined 
            : e.target.value === 'true';
        onChange({ ...filters, [field]: value });
    };

    const handleDateChange = (field) => (e) => {
        onChange({ 
            ...filters, 
            [field]: e.target.value || undefined 
        });
    };
    return (
        <div className="filters-bar">
            <select
                value={filters.isRead === undefined ? '' : String(filters.isRead)}
                onChange={handleSelectChange('isRead')}
            >
                <option value="">All read status</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>

            <select
                value={filters.isFavorite === undefined ? '' : String(filters.isFavorite)}
                onChange={handleSelectChange('isFavorite')}
            >
                <option value="">All</option>
                <option value="true">Favorites only</option>
            </select>

            <input
                type="date"
                value={filters.from || ''}
                onChange={handleDateChange('from')}
            />
            <span>to</span>
            <input
                type="date"
                value={filters.to || ''}
                onChange={handleDateChange('to')}
            />
        </div>
    );
}