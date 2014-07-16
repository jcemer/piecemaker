!function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('piecemaker', [], factory)
  } else {
    global.Piecemaker = factory()
  }
}(this, function () {
  var _slice = [].slice

  function Manager(options) {
    options || (options = {})
    this.name = options.name || 'pieces'
    if (!options.namespace) {
      this.path = options.path || 'pieces/'
      this.setupPiece = this.setupRequiredPiece
    } else {
      this.namespace = options.namespace
      this.setupPiece = this.setupNamespacedPiece
    }
    this.onSetup = this.onSetup.bind(this)
    this.mediator = options.mediator
    this.mediator && this.addListeners()
  }

  Manager.prototype.setup = function (root) {
    this.findContainers(root).forEach(function (container) {
      var pieces = container.dataset[this.name].split(/\s+/)
      this.setupContainer(container, pieces)
    }, this)
  }

  Manager.prototype.findContainers = function (root) {
    root || (root = document.documentElement)
    var containers = _slice.call(root.querySelectorAll('[data-' + this.name + ']'))
    root.dataset[this.name] && containers.push(root)
    return containers
  }

  Manager.prototype.setupContainer = function (container, pieces) {
    pieces.forEach(function (piece) {
      this.setupPiece(container, piece)
    }, this)
  }

  Manager.prototype.setupRequiredPiece = function (container, piece) {
    require([this.path + piece], function (Constructor) {
      new Constructor(container)
    })
  }

  Manager.prototype.setupNamespacedPiece = function (container, piece) {
    new this.namespace[piece](container)
  }

  Manager.prototype.addListeners = function () {
    this.mediator.subscribe(this.name + ':setup', this.onSetup)
  }

  Manager.prototype.onSetup = function (channel, element) {
    this.setup()
  }

  return Manager

})
