//MVC

function Model(data) {
      var self = this;
      self.data = data;
      self.addItem = function(item) {
          if (item.lenght === 0) {
            return;
          }
          self.data.push(item);
          return self.data;
      };

      self.removeItem = function(item) {
          var index = self.data.indexOf(item);
          if (index === -1) {
            return;
          }
          self.data.splice(index, 1);
          return self.data;
      };
}

function View(model) {
      var self = this;

      function init() {
              var wrapper = tmpl($('#wrapper-template').html());
              $('body').append(wrapper);
              self.elements = {
                input: $('.item-value'),
                addBtn: $('.item-add'),
                ListContainer: $('.item-list')
              };
              self.renderList(model.data);
        }
        self.renderList = function(data) {
              var list = tmpl($('#list-template').html(), {
                data: data
              });
              self.elements.ListContainer.html(list);
      };

      init();
}

function Controller(model, view) {
      var self = this;
      view.elements.addBtn.on('click', addItem);
      view.elements.ListContainer.on('click', '.item-delite', removeItem);

      function addItem() {
          var newItem = view.elements.input.val();
          model.addItem(newItem);
          view.renderList(model.data);
          view.elements.input.val('');
  }

      function removeItem() {
            var item = $(this).attr('data-value');
            model.removeItem(item);
            view.renderList(model.data);
      }

}

$(function() {
  var start = ['test1', 'test2', 'test3'];
  var model = new Model(start);
  var view = new View(model);
  var controller = new Controller(model, view);
});
