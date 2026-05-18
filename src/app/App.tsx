import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ToastProvider } from '../components/ui/ToastProvider'
import { AuthProvider } from '../contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  )
}
