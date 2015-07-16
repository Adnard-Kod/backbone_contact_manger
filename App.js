var ContactsRouter = Backbone.Router.extend({
  routes: {
    'filter/:type': "urlFilter"
  },
  urlFilter: function(type) {
    directory.filterType = type;
    directory.trigger("change:filterType");
  }
})

var contactsRouter = new ContactsRouter();
Backbone.history.start();