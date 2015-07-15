$(document).ready(function() {
  var ContactView = Backbone.View.extend({
  tagName: "article",
  className: "contact-container",
  template: $("#contactTemplate").html(),

  render: function () {
    var tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }
});

var DirectoryView = Backbone.View.extend({
  el: $("#contacts"),

  initialize: function () {
    this.collection = new Directory(contacts);
    this.render();
  },

  render: function () {
    var that = this;
    _.each(this.collection.models, function (item, COUNTER) {
      that.renderContact(item);
    }, this);
  },

  renderContact: function (item) {
      var contactView = new ContactView({
          model: item
      });
      this.$el.append(contactView.render().el);
  }
});

var directory = new DirectoryView();

})
