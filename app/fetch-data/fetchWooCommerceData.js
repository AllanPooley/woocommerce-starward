import { wooCommerceService } from './services';

const {
  getCategory
} = wooCommerceService;

const fetchWooCommerceData = (params, routeName, location) => {
  // Switch statement on routeName from routes.jsx
  switch (routeName) {
    // Product Category Data
    case 'ProductCategory': {
      const pageNumber = params.page ? params.page : 1;
      const queryString = location.search.replace(/[?&]/g, '$');
      return getCategory(params.category, pageNumber, queryString)
      .then(res => {
        return res.data.data;
      });
    }
    default:
      return ({handleNotFound: '404'});
  }
};

export default fetchWooCommerceData;
