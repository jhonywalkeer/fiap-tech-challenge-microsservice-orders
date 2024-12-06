import { ExpressRouteAdapter } from '@main/adapters'
import {
  CreateOrderControllerFactory,
  FindOrderByIdControllerFactory,
  FindAllOrdersControllerFactory,
  UpdateOrderControllerFactory,
  DeleteOrderControllerFactory
} from '@main/factories/order'
import { Router } from 'express'

export const OrdersRoute = Router()

const { createOrderController } = CreateOrderControllerFactory()
const { findOrderByIdController } = FindOrderByIdControllerFactory()
const { findAllOrdersController } = FindAllOrdersControllerFactory()
const { updateOrderController } = UpdateOrderControllerFactory()
const { deleteOrderController } = DeleteOrderControllerFactory()

OrdersRoute.post('/', ExpressRouteAdapter(createOrderController))
OrdersRoute.get('/:id', ExpressRouteAdapter(findOrderByIdController))
OrdersRoute.get('/', ExpressRouteAdapter(findAllOrdersController))
OrdersRoute.patch('/:id', ExpressRouteAdapter(updateOrderController))
OrdersRoute.put('/:id', ExpressRouteAdapter(updateOrderController))
OrdersRoute.delete('/:id', ExpressRouteAdapter(deleteOrderController))
