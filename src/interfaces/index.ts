export interface Lesson {
  id: string
  title: string
  duration: string
}

export interface Module {
  id: number
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: number
  modules: Module[]
}

export interface PlayerStateRedux {
  currentModuleIndex: number
  currentLessonIndex: number
  course: Course | null
  isLoading: boolean
}

export interface PlayerStateZustand {
  currentModuleIndex: number
  currentLessonIndex: number
  course: Course | null
  isLoading: boolean

  load: () => Promise<void>
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
}
