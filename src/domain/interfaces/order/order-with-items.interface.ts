export interface OrderWithItems {
  id: string
  order: string
  status: string
  observation: string
  customer: Customer
  items: Items[]
}

export interface Customer {
  id: string | null
  name: string
}

export interface Items {
  product: Product
}

export interface Product {
  id: string
  name: string
  price: number
  amount: number
  size: string
}
