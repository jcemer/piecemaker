define(['backbone'], function () {

  var ListView = Backbone.View.extend({
    initialize: function () {
      this.renderOne = this.renderOne.bind(this)
    },
    render: function () {
      this.collection.each(this.renderOne)
      return this
    },
    renderOne: function (model) {
      var item = new ItemView({ model: model })
      this.$el.append(item.render().$el)
      return this
    }
  })

  var ItemView = Backbone.View.extend({
    tagName: 'li',
    context: function () {
      return this.model.toJSON()
    },
    render: function () {
      this.$el.text(this.context().task)
      return this
    }
  })

  function Piece(container) {
    var collection = new Backbone.Collection([
      { task: 'Make x' },
      { task: 'Clean y' },
      { task: 'Help z' }
    ])

    new ListView({
      el: container,
      collection: collection
    }).render()
  }

  return Piece
})
