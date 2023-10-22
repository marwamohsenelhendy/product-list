
const LocalStorageHandler = {
    getProducts() {
      const products = localStorage.getItem('products');
      return products ? JSON.parse(products) : [];
    },
  
    saveProducts(products) {
      localStorage.setItem('products', JSON.stringify(products));
    },
  };
  
  const ProductItem = {
    class(name, price) {
      return {
        name,
        price,
      };
    },
  
    render(product) {
      const productElement = document.createElement('product');
      productElement.classList.add('product');
  
      const nameElement = document.createElement('div');
      nameElement.classList.add('box');
      nameElement.textContent = product.name;
  
      const priceElement = document.createElement('div');
      priceElement.classList.add('box');
      priceElement.textContent = product.price;
  
      const editElement = document.createElement('div');
      editElement.classList.add('box-image');
      const editIcon = document.createElement('img');
      editIcon.src = './image/icons8-close-24.png';
      editIcon.alt = 'Edit Icon';
      editElement.appendChild(editIcon);
  
      editElement.addEventListener('click', () => {
        productElement.remove();
        const products = LocalStorageHandler.getProducts();
        const updatedProducts = products.filter((item) => item.name !== product.name);
        LocalStorageHandler.saveProducts(updatedProducts);
        const totalPrice = updatedProducts.reduce((total, item) => total + item.price, 0);
        totalPriceElement.textContent = `Total Price: ${totalPrice}`;
      });
  
      productElement.appendChild(nameElement);
      productElement.appendChild(priceElement);
      productElement.appendChild(editElement);
  
      return productElement;
    },
  };
  
  // Main application 
  const productForm = document.querySelector('form');
  const productList = document.querySelector('.products');
  const totalPriceElement = document.querySelector('.total-price');
  
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const productNameInput = document.querySelector('input[type="text"]');
    const productPriceInput = document.querySelector('input[type="number"]');
  
    const name = productNameInput.value;
    const price = parseInt(productPriceInput.value);
  
    if (name || price) {
      const product = ProductItem.class(name, price);
      const productElement = ProductItem.render(product);
      productList.insertBefore(productElement, productList.lastElementChild);
  
      const products = LocalStorageHandler.getProducts();
      products.push(product);
      LocalStorageHandler.saveProducts(products);
  
      const totalPrice = products.reduce((total, item) => total + item.price, 0);
      totalPriceElement.textContent = `Total Price: ${totalPrice}`;
  
      productNameInput.value = '';
      productPriceInput.value = '';
    }
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    const products = LocalStorageHandler.getProducts();
  
    const productElements = products.map((product) => ProductItem.render(product));
    productElements.forEach((element) => {
      productList.insertBefore(element, productList.lastElementChild);
    });
  
    const totalPrice = products.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = `Total Price: ${totalPrice}`;
  });