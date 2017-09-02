const start = (function() {
  /*
    Ensures Document is Fully Loaded.
  */
  function DocumentReady(callback) {
    this.callback = callback
    this.readyHandler = this.ready.bind(this);
  }
  DocumentReady.prototype.check = function() {
    if (window.document.readyState === 'complete') {
      this.callback()
    } else {
      window.document.addEventListener('DOMContentLoaded', this.readyHandler)
      window.addEventListener('load', this.readyHandler);
    }
  }
  DocumentReady.prototype.ready = function (event) {
    window.document.removeEventListener('DOMContentLoaded', this.readyHandler);
    window.removeEventListener('load', this.readyHandler);
    this.callback()
  }

  /*
    Main - we handle all logic here.
  */

  function Main() {
    this.changeHandler = this.change.bind(this)
    this.setupListeners()
    this._count = 0;
  }
  Main.prototype = {
    get count() {
      return this._count;
    },
    set count(value) {
      let element = document.querySelector('#item-count')
      element.innerHTML = value.toString();
      this._count = value;
    }
  }
  Main.prototype.setupListeners = function() {
    document.addEventListener('change', this.changeHandler)
  }

  Main.prototype.change = function (event) {
    if (event.target === document.querySelector('thead input[type=checkbox]')) {
      let checkboxes = document.querySelectorAll('tbody input[type=checkbox]')
      let checked = !!event.target.checked;

      checkboxes.forEach(c => {
        c.checked = checked
      })

      this.count = checked ? checkboxes.length : 0;
    } else {
      if (event.target.checked)
        this.count++;
      else
        this.count--;
    }
  }



  const main = function() {
    new Main();
  }

  const documentReady = new DocumentReady(main)
  documentReady.check();
})

start();
