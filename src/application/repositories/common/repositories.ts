export interface Repositories<T> {
  create(body: any): Promise<T>
  findAll(parameters: any): Promise<T | null>
  findById(id?: any): Promise<T | null>
  findByCondition(parameters: any): Promise<T | null>
  update(id: any): Promise<T>
  delete(id: any): Promise<void>
}
