import React, { useState, useEffect } from 'react';
import { VscSearch, VscClose } from 'react-icons/vsc';

const SearchBar = ({ placeholder = 'Search...', onSearch, filters = [], selectedFilter, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginBottom: '20px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--vscode-input-background)',
                border: '1px solid var(--vscode-input-border)',
                borderRadius: '4px',
                padding: '8px 12px',
                gap: '8px'
            }}>
                <VscSearch size={16} color="var(--vscode-descriptionForeground)" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--vscode-input-foreground)',
                        fontSize: '13px',
                        fontFamily: 'var(--vscode-font-family)'
                    }}
                />
                {searchTerm && (
                    <button
                        onClick={handleClear}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--vscode-descriptionForeground)'
                        }}
                        aria-label="Clear search"
                    >
                        <VscClose size={16} />
                    </button>
                )}
            </div>

            {filters.length > 0 && (
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                }}>
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange(filter.value)}
                            style={{
                                padding: '4px 12px',
                                fontSize: '12px',
                                border: '1px solid var(--vscode-button-border)',
                                borderRadius: '12px',
                                background: selectedFilter === filter.value
                                    ? 'var(--vscode-button-background)'
                                    : 'transparent',
                                color: selectedFilter === filter.value
                                    ? 'var(--vscode-button-foreground)'
                                    : 'var(--vscode-foreground)',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
