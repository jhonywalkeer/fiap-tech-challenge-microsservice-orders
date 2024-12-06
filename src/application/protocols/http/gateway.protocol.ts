export interface Gateway<T> {
  execute(input?: any, queue?: string, messageGroup?: string): Promise<T>
}
