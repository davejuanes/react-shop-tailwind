import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // CheckoutSideMenu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})
  
  // Shopping Cart, Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  // Shopping Cart, Order
  const [order, setOrder] = useState([])

  // Products
  const [items, setItems] = useState(null);
  const [filteredItems, setfilteredItems] = useState(null);
  
  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);
  
  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if(searchType === 'BY_TITLE') {
      return filteredItemByTitle(items, searchByTitle)
    }
    
    if(searchType === 'BY_CATEGORY') {
      return filteredItemByCategory(items, searchByCategory)
    }
    
    if(searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if(!searchType) {
      return items
    }
  }

  useEffect(() => {
    if(searchByTitle && searchByCategory) setfilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if(searchByTitle && !searchByCategory) setfilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if(!searchByTitle && searchByCategory) setfilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if(!searchByTitle && !searchByCategory) setfilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  console.log('searchByTitle: ', searchByTitle);
  console.log('searchByCategory:', searchByCategory);
  console.log('filteredItems: ', filteredItems);

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}