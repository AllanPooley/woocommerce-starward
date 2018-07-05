import React from 'react';
import { Link } from 'react-router';

function PriceSlider({filter, index}) {
  if (filter && filter.min_price !== filter.max_price) {
    return (
      <section className="filter-block" key={index}>
        <h3>Price</h3>
        <label htmlFor="price">Price</label>
        <input type="range" id="price-slider" name="price" min={filter.min_price} max={filter.max_price} />
      </section>
    );
  }
  return null;
}

function AttributeFilter({attribute}) {
  return (
    <section className="filter-block">
      <h3>{attribute.name}</h3>
      <ul>
        { attribute.options &&
          attribute.options.map((option, i) => {
          return (
            <li key={i}>
              <Link to={`/products?${attribute.slug}=${option.id}`}>{option.name}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SubCategoriesFilter({subcategories}) {
  if (subcategories.length > 0) {
    return (
      <section className="filter-block">
        <h3>Sub Categories</h3>
        <ul>
          { subcategories.map((subcategory, i) => {
            return (
              <li key={i}>
                <Link to={`/store/${subcategory.slug}`}>{subcategory.name}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
  return null;
}

function renderAttributeFilters(filters, filterType) {
  // For attributes we loop over all attributes and render each one in its
  // own separate filter block
  return Object.keys(filters[filterType]).map((attribute, attributeIndex) => {
    const attributeDetails = filters[filterType][attribute];
    return <AttributeFilter attribute={attributeDetails} key={attributeIndex} />;
  });
}

function renderFilterBlocks(filters) {
  // Map over parent filter types i.e. Price, Attributes, Sub Categories
  return Object.keys(filters).map((filterType, index) => {
    if (filterType === 'price') {
      return <PriceSlider filter={filters[filterType]} key={index} />;
    }
    if (filterType === 'attributes') {
      return renderAttributeFilters(filters, filterType);
    }
    if (filterType === 'subcategories') {
      return <SubCategoriesFilter subcategories={filters[filterType]} key={index} />;
    }
    return null;
  });
}

export const LayeredNavigation = props => {
  const { filters } = props;
  const categoryHasFilters = Object.keys(filters).length > 0;

  return (
    <div className="layered-navigation">
      { categoryHasFilters &&
        <h2>Layered Navigation</h2>
      }
      { categoryHasFilters &&
        renderFilterBlocks(filters)
      }
    </div>
  );
};