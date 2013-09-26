require(['piecemaker', 'mediator-js'], function (Piecemaker, mediator) {

  new Piecemaker({ mediator: mediator })
  mediator.publish('pieces:setup')

})
