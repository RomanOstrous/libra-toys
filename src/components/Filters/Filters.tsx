import React, { ChangeEvent } from 'react';

interface Props {
  onChange: (value: string) => void;
}

export const Filters: React.FC<Props> = ({ onChange }) => {

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="filters">
      <div className="filters__serch">
        <input type="text" />
      </div>

      <div className="filters__sort">
        <select name="Sort" onChange={handleSortChange}>
          <option value="">Сортувати за...</option>
          <option value="name">Назвою</option>
          <option value="name-rev">Назвою навпаки</option>
          <option value="price">Ціною</option>
          <option value="price">Ціною навпаки</option>
        </select>
      </div>

      <div className="filters__category">
        <select name="Category" id=""></select>
      </div>
    </div>
  )
}
