import './index.css'
import { store } from '@/stores/redux'
import { Provider } from 'react-redux'

export default function ReduxProvider(props: { children: React.ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>
}
