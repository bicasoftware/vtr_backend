'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('register', 'UserController.register')
  Route.post('login', 'UserController.login')
}).prefix('auth')

Route.group(() => {
  Route.post('/:tipo', 'VeiculoController.create')
  Route.delete('/:id', 'VeiculoController.delete')
  Route.get('/:tipo/:locada', 'VeiculoController.listVeiculos')
  Route.get('/counter', 'VeiculoController.counter')
}).prefix("veiculos").middleware(['auth'])

Route.group(() => {
  Route.post('/:carro_id', 'RequisicaoController.create')
  Route.get('', 'RequisicaoController.listAll')  
  Route.get('/filter/:status', 'RequisicaoController.filterByStatus')  
  Route.get('/:id', 'RequisicaoController.listOne')
  Route.put('/cancel/:id', 'RequisicaoController.cancel')
  Route.put('/finish/:id', 'RequisicaoController.finish')

}).prefix('requisicoes').middleware(['auth'])