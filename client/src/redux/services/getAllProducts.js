import axios from 'axios'
import { setProductList } from '../slices/products'

export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'https://bookstore-e-commerce.onrender.com/ebook/products',
      )
      dispatch(setProductList(response.data))
    } catch (error) {
      console.error(error)
    }
  }
}
