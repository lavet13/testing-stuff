import { FC, useState } from 'react';

type ProductCategoryRowProps = {
  category: string;
};

export const ProductCategoryRow: FC<ProductCategoryRowProps> = ({
  category,
}) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};

type ProductRowProps = {
  product: any;
};

export const ProductRow: FC<ProductRowProps> = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

type ProductTableProps = {
  products: any[];
  formValues: {
    search: string;
    stock: boolean;
  };
};

export const ProductTable: FC<ProductTableProps> = ({
  products,
  formValues,
}) => {
  const { search, stock } = formValues;
  console.log({ search, stock });
  const rows: any[] = [];
  let lastCategory = null;

  products.forEach(product => {
    if (
      !product.name.toLowerCase().trim().includes(search.toLowerCase().trim())
    )
      return;

    if (stock && !product.stocked) return;

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

type SearchBarProps = {
  formValues: { search: string; stock: boolean };
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBar: FC<SearchBarProps> = ({ formValues, handleChange }) => {
  const { stock, search } = formValues;

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        name='search'
        value={search}
        type='text'
        placeholder='Search...'
        onChange={handleChange}
      />
      <label>
        <input
          name='stock'
          checked={stock}
          type='checkbox'
          onChange={handleChange}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
};

type FilterableProductTableProps = {
  products: any[];
};

export const FilterableProductTable: FC<FilterableProductTableProps> = ({
  products,
}) => {
  const [formValues, setFormValues] = useState({
    search: '',
    stock: false,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value, checked, type } = e.target;
    const isCheckbox = type === 'checkbox';

    setFormValues(prev => ({ ...prev, [name]: isCheckbox ? checked : value }));
  };

  return (
    <div>
      <SearchBar formValues={formValues} handleChange={handleChange} />
      <ProductTable products={products} formValues={formValues} />
    </div>
  );
};
