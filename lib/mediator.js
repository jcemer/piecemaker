define(['jquery'], function (jQuery) {

  function Mediator() {
    this.obj = jQuery({})
  }

  Mediator.prototype.publish = function (channel, data) {
    this.obj.trigger(channel, data)
  }

  Mediator.prototype.subscribe = function (channel, fn) {
    this.obj.bind(channel, fn) 
  }

  Mediator.prototype.unsubscribe = function (channel, fn) {
    this.obj.unbind(channel, fn) 
  }

  return { Mediator: Mediator }

})