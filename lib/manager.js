define(['jquery'], function (jQuery) {

  function Manager(options) {
    options || (options = {})
    this.name = options.name || 'pieces'
    this.path = options.path || 'pieces/'
    this.mediator = options.mediator
    this.mediator && this.addListeners()
    this.onSetup = this.onSetup.bind(this)
  }

  Manager.prototype.setup = function ($root) {
    $root.find('[data-' + this.name + ']').each(function (i, container) {
      var $container = $(container)
      var pieces = $container.data(this.name).split(/\s+/)
      this.setupContainer($container, pieces)
    }.bind(this))
  }

  Manager.prototype.setupContainer = function ($container, pieces) {
    jQuery.each(pieces, function (i, piece) {
      this.setupPiece($container, piece)
    }.bind(this))
  }

  Manager.prototype.setupPiece = function ($container, piece) {
    require([this.path + piece], function (Constructor) {
      new Constructor($container)
    })
  }

  Manager.prototype.addListeners = function () {
    this.mediator.subscribe(this.name + ':setup', this.onSetup)
  }

  Manager.prototype.onSetup = function (channel, element) {
    var $root = jQuery(element || document)
    this.setup($root)
  }

  return { Manager: Manager }

})
