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
      $("#filter").append(this.createSelect());
      this.render();
    },
    render: function () {
      var that = this;
      _.each(this.collection.models, function (item) {
        that.renderContact(item);
      }, this);
    },
    renderContact: function (item) {
        var contactView = new ContactView({
            model: item
        });
        this.$el.append(contactView.render().el);
    },
    getTypes: function () {
      return _.uniq(this.collection.pluck("type"), false, function(type) {
        return type.toLowerCase();
      })
    },
    createSelect: function() {
      select = $("<select>", {
        html: "<option>ALL</option>"
      });
     _.each(this.getTypes(), function (item) {
       var option = $("<option/>", {
           value: item.toLowerCase(),
           text: item.toLowerCase()
       }).appendTo(select);
     });
      return select;
    }
  });

var directory = new DirectoryView();

})
