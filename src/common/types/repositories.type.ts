export type BaseRepository =
  | 'findAll'
  | 'findById'
  | 'findByCondition'
  | 'create'
  | 'update'
  | 'delete'

export type CreateRepository = Exclude<BaseRepository, 'create'>
export type UpdateRepository = Exclude<BaseRepository, 'update'>
export type DeleteRepository = Exclude<BaseRepository, 'delete'>
export type FindByIdRepository = Exclude<BaseRepository, 'findById'>
export type FindByConditionRepository = Exclude<
  BaseRepository,
  'findByCondition'
>
export type FindAllRepository = Exclude<BaseRepository, 'findAll'>
