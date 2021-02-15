{
  'use strict';
  const favorites = [];

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      book: '.books-list',
    },
    book: {
      image: '.book__image',
      id: 'data-id',
    },
    class: {
      favorite: 'favorite',
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
      thisBook.initActions();

    }

    displayBooks(){
      const thisBook = this;
      const generatedHTML = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.book);
      menuContainer.appendChild(thisBook.element);
    }

    getElements(){
      const thisBook = this;

      thisBook.dom = {};
      thisBook.dom.image = thisBook.element.querySelector(select.book.image);
    }

    initActions(){
      const thisBook = this;
      const favoirte = thisBook.dom.image;
      favoirte.addEventListener('click', function(event){
        event.preventDefault();
      });
      favoirte.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = this;
        const id = clickedElement.getAttribute(select.book.id);
        if(!favorites.includes(id)){
          favorites.push(id);
        }else{
          const index = favorites.indexOf(id);
          favorites.splice(index, 1);
        }
        clickedElement.classList.toggle(select.class.favorite);
      });

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
    }
  };

  app.init();
}
