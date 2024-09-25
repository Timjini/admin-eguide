import React, { useEffect, useRef, useState } from 'react';
import SlimSelect from 'slim-select';

const SearchInputComponent = ({ options, placeholder, onChange }) => {
    const selectRef = useRef(null);
    const [filter, setFilter] = useState('');

    // Initialize Slim Select on component mount
    useEffect(() => {
        const slimSelect = new SlimSelect({
            select: selectRef.current,
            placeholder: placeholder || 'Select...',
            onChange: (selected) => {
                if (onChange) {
                    onChange(selected[0]);
                }
            },
        });

        // Cleanup the Slim Select instance on unmount
        return () => {
            slimSelect.destroy();
        };
    }, [options, placeholder, onChange]);

    // Filter options based on input
    const filteredOptions = options.filter(option => 
        option.name.toLowerCase().includes(filter.toLowerCase()) || 
        option.id.toString().includes(filter)
    );

    return (
        <div className="slim-select-container">
            <select ref={selectRef} className="slim-select">
                <option value="" disabled selected>
                    {placeholder || 'Select...'}
                </option>
                {filteredOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchInputComponent;
