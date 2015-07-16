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
      this.$el.find("#filter").append(this.createSelect());
      this.render();
      this.on("change:filterType", this.filterBytype, this);
      this.collection.on("reset", this.render, this);
    },
    events: {
      "change #filter select": "setFilter"
    },
    render: function () {
      $('article').remove()
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
      select = $("<select class='form-control'>", {
        // html: "<option>ALL</option>" dont know why this is not working
      });
      $("<option value='all'>ALL</option>").appendTo(select) //quick fix
     _.each(this.getTypes(), function (item) {
       var option = $("<option/>", {
           value: item.toLowerCase(),
           text: item.toLowerCase()
       }).appendTo(select);
     });
      return select;
    },
    setFilter: function(e) {
      this.filterType = e.currentTarget.value;
      this.filterBytype(this.filterType)
    },
    filterBytype: function(filter) {
      if(this.filterType === "all"){
        this.collection.reset(contacts);
      } else {
        this.collection.reset(contacts, {silent: true});
        var filtered = _.filter(this.collection.models, function(item) {
          return item.get("type").toLowerCase() === filter;
        })
        this.collection.reset(filtered);
      }
    }
  });

var directory = new DirectoryView();

})
