import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  error: null,
  detailProduct: null,
  orderOption: [],
  cart: [],
  cartCount: 0,
  totalItems: null,
  carouselProducts: [],
  foundedBooks: []
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCarouselProducts : (state, action) => {
      state.carouselProducts = action.payload
    },
    setProductListLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductList: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    setProductListError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    addToProductList: (state, action) => {
      state.productList = [state.productList, action.payload];
    },
    setProductDetailLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductDetail: (state, action) => {
      state.loading = false;
      state.detailProduct = action.payload;
    },
    setProductDetailError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setOrderOption: (state, action) => {
      state.orderOption = action.payload;
    },
    setFoundedBooks:(state,action) =>{
      state.foundedBooks = action.payload;
    },
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id,
      );

      if (!existingProduct) {
        state.cart.push(action.payload);
        state.cartCount += 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id,
      );

      state.cartCount -= 1;
    },
  },
});

export const {
  setCarouselProducts,
  setProductListLoading,
  setProductList,
  setProductListError,
  setTotalItems,
  addToProductList,
  setProductDetailLoading,
  setProductDetail,
  setProductDetailError,
  setOrderOption,
  setFoundedBooks,
  addToCart,
  removeFromCart,
} = productSlice.actions;

export default productSlice.reducer;
