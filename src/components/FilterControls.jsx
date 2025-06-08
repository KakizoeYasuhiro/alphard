'use client';

import { useState, useEffect } from 'react';
import { RadioGroup, Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function FilterControls({ 
  filters, 
  onFilterChange, 
  availableYears = ['2025'], 
  availableMonths = ['4', '5', '6', '7', '8', '9', '10', '11', '12'], 
  typeOptions = ['ALL', 'TOPIC', 'LIVE', 'MEDIA'], 
  isNewsPage = false,
  isLoading = false
}) {
  // 親コンポーネントから渡されたフィルター状態を使用する
  const [selectedYear, setSelectedYear] = useState(filters?.year || '2025');
  const [selectedMonth, setSelectedMonth] = useState(filters?.month || null);
  const [selectedType, setSelectedType] = useState(filters?.type || 'ALL');
  
  // フィルター状態の変更を検知して内部状態を同期
  useEffect(() => {
    if (filters) {
      setSelectedYear(filters.year || '2025');
      setSelectedMonth(filters.month);
      setSelectedType(filters.type || 'ALL');
    }
  }, [filters]);
  
  // 年が変更されたら月の選択をリセットしてフィルター変更を通知
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); // 年が変更されたら月をリセット
    
    // フィルター変更を親コンポーネントに通知
    onFilterChange({
      year,
      month: null, // 月はリセット
      type: selectedType
    });
  };
  
  // 月が変更されたらフィルター変更を通知
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    
    // フィルター変更を親コンポーネントに通知
    onFilterChange({
      year: selectedYear,
      month,
      type: selectedType
    });
  };
  
  // 種別が変更されたらフィルター変更を通知
  const handleTypeChange = (type) => {
    setSelectedType(type);
    
    // フィルター変更を親コンポーネントに通知
    onFilterChange({
      year: selectedYear,
      month: selectedMonth,
      type
    });
  };
  
  // 使用するタイプオプション
  const types = typeOptions;

  if (isLoading) {
    return (
      <div className="filter-container">
        <p>フィルター読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="filter-container">
      {/* 年選択 */}
      <div className="filter-section">
        <RadioGroup value={selectedYear} onChange={handleYearChange} className="radio-group">
          {availableYears.map((year) => (
            <RadioGroup.Option
              key={year}
              value={year}
              className={({ checked }) =>
                `radio-option ${checked ? 'radio-option-checked' : ''}`
              }
            >
              {year}
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>

      {/* 月選択 */}
      <div className="filter-section">
        <RadioGroup 
          value={selectedMonth} 
          onChange={handleMonthChange} 
          className="radio-group"
        >
          {availableMonths.map((month) => (
            <RadioGroup.Option
              key={month}
              value={month}
              className={({ checked }) =>
                `radio-option ${checked ? 'radio-option-checked' : ''}`
              }
            >
              {month}月
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </div>

      {/* タイプ選択 */}
      <div className="filter-section">
        <Listbox value={selectedType} onChange={handleTypeChange}>
          <div className="listbox-container">
            <Listbox.Button className="listbox-button">
              {selectedType}
              <span className="listbox-icon">▼</span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="listbox-options">
                {types.map((type) => (
                  <Listbox.Option
                    key={type}
                    value={type}
                    className={({ active }) =>
                      `listbox-option ${active ? 'listbox-option-active' : ''}`
                    }
                  >
                    {type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}