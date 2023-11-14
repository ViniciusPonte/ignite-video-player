import { create } from 'zustand'
import { PlayerStateZustand } from '../interfaces'
import { api } from '../lib/axios'

export const useStore = create<PlayerStateZustand>((set, get) => {
  return {
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    course: null,
    isLoading: true,

    load: async () => {
      set({ isLoading: true })

      const response = await api.get('/courses/1')

      set({ course: response.data, isLoading: false })
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      })
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        })
        return
      }

      const nextModuleIndex = currentModuleIndex + 1
      const nextModule = course?.modules[nextModuleIndex]

      if (nextModule) {
        set({
          currentModuleIndex: nextModuleIndex,
          currentLessonIndex: 0,
        })
      }
    },
  }
})

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]

    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
