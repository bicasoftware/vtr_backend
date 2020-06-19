'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('register', 'UserController.register')
  Route.post('login', 'UserController.login')
}).prefix('auth')

Route.group(() => {
  Route.post('', 'CarroController.create')
  Route.get('', 'CarroController.list')
}).prefix('carros').middleware(['auth'])

Route.group(() => {
  Route.get('/carros', 'VeiculoController.listCarros')
  Route.get('/motos', 'VeiculoController.listMotos')
}).prefix("veiculos").middleware(['auth'])
