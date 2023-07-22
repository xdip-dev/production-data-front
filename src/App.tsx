import { Provider } from 'react-redux';
import { store } from './store/store';
import ActionModal from './ui/components/Modal/ActionsModal';

const App = () => {

  return (
      <Provider store={store}>
          <div>
              <ActionModal />
          </div>
      </Provider>
      );
};

export default App
