{
  'use strict';
  const favorites = [];
  const filters = [];

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      book: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
      id: 'data-id',
      rating: '.book__rating__fill',
    },
    class: {
      favorite: 'favorite',
      hidden: 'hidden',
    },
    dom: {
      id: '[data-id]',
    },
    styles: {
      rating6: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
      rating68: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
      rating89: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)',
      rating9: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class Book{
    constructor(data){
      const thisBook = this;
      thisBook.data = data;
      thisBook.displayBooks();
      thisBook.getElements();
      thisBook.generateRating();
    }

    displayBooks(){
      const thisBook = this;
      const generatedHTML = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.book);
      menuContainer.appendChild(thisBook.element);
    }

    generateRating(){
      const thisBook = this;
      const rating = thisBook.data.rating;
      const perc = `${rating/10*100}%`;
      thisBook.dom.rating.style.width = perc;
      if (rating<6){
        thisBook.dom.rating.style.background = select.styles.rating6;
      }else if(rating>=6 && rating<8){
        thisBook.dom.rating.style.background = select.styles.rating68;
      }else if(rating>=8 && rating<9){
        thisBook.dom.rating.style.background = select.styles.rating89;
      }else if(rating>=9){
        thisBook.dom.rating.style.background = select.styles.rating9;
      }
    }

    getElements(){
      const thisBook = this;

      thisBook.dom = {};
      thisBook.dom.rating = thisBook.element.querySelector(select.book.rating);
      thisBook.dom.image = thisBook.element.querySelector(select.book.image);
    }
  }

  const app = {
    initBooks: function(){
      const thisApp = this;
      for(let book in thisApp.data){
        new Book (thisApp.data[book]);
      }
    },
    initData: function(){
      const thisApp = this;
      thisApp.data = dataSource.books;
      thisApp.initBooks();
    },
    init: function(){
      const thisApp = this;
      thisApp.initData();
      thisApp.initActions();
    },

    filterBooks: function(){
      const books = dataSource.books;
      const images = document.querySelectorAll(select.dom.id);
      let filteredBooks = [];
      for(let book in books){
        const bookId = books[book].id;
        for(let type in books[book].details){
          if(books[book].details[type] == true){
            if(filters.includes(type)){
              filteredBooks.push(bookId);
            }
          }
        }
      }
      console.log(filteredBooks);
      for(let img of images){
        if(filteredBooks.includes(parseInt(img.getAttribute(select.book.id)))){
          img.classList.add(select.class.hidden);
        }else{
          img.classList.remove(select.class.hidden);
        }
      }
    },

    initActions: function(){
      const favoirte = document.querySelector(select.containerOf.book);
      const filter = document.querySelector(select.containerOf.filters);
      favoirte.addEventListener('click', function(event){
        event.preventDefault();
      });
      favoirte.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target;
        const link = clickedElement.parentNode.parentNode;
        const id = link.getAttribute(select.book.id);
        if(!favorites.includes(id)){
          favorites.push(id);
        }else{
          const index = favorites.indexOf(id);
          favorites.splice(index, 1);
        }
        link.classList.toggle(select.class.favorite);
      });

      filter.addEventListener('click', function(event){
        const clickedElement = event.target;
        const value = clickedElement.value;
        if(clickedElement.tagName == 'INPUT' && clickedElement.type =='checkbox' && clickedElement.name == 'filter'){
          if(clickedElement.checked == 1){
            filters.push(value);
          }else{
            const index = filters.indexOf(value);
            filters.splice(index, 1);
          }
        }
        app.filterBooks();
      });
    }
  };

  app.init();
}
