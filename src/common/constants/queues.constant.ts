export const QueueAttributeName = 'All'

export const Queue = {
  Product: {
    Name: process.env.PRODUCT_QUEUE_URL
  },
  Category: {
    Name: {
      FindById: process.env.FIND_BY_ID_CATEGORY_QUEUE_URL as string
    },
    MessageGroup: {
      FindById: 'findCategoryById'
    }
  }
}
