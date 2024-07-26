import { create, createStore } from "zustand"
import { persist } from "zustand/middleware"

// const counterStore = (set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 }))
// })

// const useStorePersist = createStore(
//   persist(
//     {
//       key: 'todoList',  // required, child key of storage
//       allowlist: ['isAuthenticated', 'user'], // optional, will save everything if allowlist is undefined
//       denylist: [], // optional, if allowlist set, denylist will be ignored
//     },
//     (set) => ({
//       isLoading: false,
//       errorMessage: '',
//       data: [
//         {
//           id: '1',
//           text: 'first note',
//           date: new Date().toISOString(),
//           completed: false
//         }
//       ],
//       create: (todoRequest) => {
//         set((state) => ({
//           data: [
//             {
//               id: new Date().getTime().toString(),
//               ...todoRequest
//             },
//             ...state.data
//           ]
//         }))
//       },
//       remove: (todoId) => {
//         set((state) => ({
//           data: state.data.filter((item) => item.id !== todoId)
//         }))
//       },
//       update: (todoId, todoRequest) => {
//         set((state) => ({
//           data: state.data.map((item) =>
//             item.id === todoId
//               ? {
//                 ...item,
//                 ...todoRequest
//               }
//               : item
//           )
//         }))
//       },
//       clear: () => {
//         set((state) => ({
//           data: []
//         }))
//         // purge()
//       }
//     })
//   )
// )

const useBearStore = create(
  persist(
    (set, get) => ({
      credential: null,
      authenthicated: false,
      path: null,
      setCredential: (credential) => set({ credential: credential }),
      setAuthenthicated: (authen) => set({ authenthicated: authen }),
      setPath: (path) => set({ path: path }),
      clearBearStore: () => set({
        credential: null,
        authenthicated: false
      })
    }),
    {
      name: 'spectroscopy-storage', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  )
)

export default useBearStore