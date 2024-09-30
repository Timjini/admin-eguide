import React, { useEffect, useRef, useState } from 'react';
import SlimSelect from 'slim-select';

const SearchInputComponent = ({ options, placeholder, onChange }) => {
    const selectRef = useRef(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        let selectedValue = null;
        const slimSelect = new SlimSelect({
            select: selectRef.current,
            placeholder: placeholder || 'Select...',
        });
        return () => {
            slimSelect.destroy();
        };
    }, [options, placeholder, onChange]);

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        console.log(selectedId);
        if (onChange) {
            onChange(selectedId);
        }
    };
    // Filter options based on input
    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(filter.toLowerCase()) ||
        option.id.toString().includes(filter)
    );

    return (
        <div className="slim-select-container">
            <select  ref={selectRef} className="slim-select" onChange={handleSelectChange}>
                <option value="" disabled selected>
                    {placeholder || 'Select...'}
                </option>
                {filteredOptions.map((option) => (
                    <option id={option._id} key={option.id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchInputComponent;
