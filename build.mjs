import { overrideGQLOperations } from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  // ACCS does not have Downloadable Items
  {
    npm: '@dropins/storefront-cart',
    skipFragments: ['DOWNLOADABLE_CART_ITEMS_FRAGMENT'],
    operations: [],
  },
  {
    npm: '@dropins/storefront-order',
    skipFragments: ['DOWNLOADABLE_ORDER_ITEMS_FRAGMENT'],
    operations: [],
  },
  // {
  //   npm: '@dropins/storefront-checkout',
  //   operations: [     
  //       `
  //     fragment SHIPPING_CART_ADDRESS_FRAGMENT on ShippingCartAddress {
  //       id
  //       available_shipping_methods {
  //         carrier_code
  //         carrier_title
  //         method_code
  //         method_title
  //         amount { value currency }
  //         available
  //         price_excl_tax { value currency }
  //         price_incl_tax { value currency }          
  //         oope_carrier_config {
  //           tracking_available
  //           shipping_labels_available
  //           sort_order
  //         }
  //       }
  //       selected_shipping_method {
  //         carrier_code
  //         carrier_title
  //         method_code
  //         method_title
  //         amount { value currency }
  //       }
  //     }
  //     `,
  //   ],
  // },
  // {
  //   npm: '@dropins/storefront-checkout',
  //   operations: [],
  // },
  // {
  //   npm: '@dropins/storefront-pdp',
  //   operations: [
  //     `
  //     fragment PRODUCT_FRAGMENT on ProductView {
  //       lowStock
  //     }
  //     `,
  //   ],
  // },
]);
