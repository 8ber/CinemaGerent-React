import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { dataFromApi } from './redux/appReducer'
import api from './utils/Data'
function GateComp() {
  // const dispatch = useDispatch();
  // const prefetchData = useCallback(async () => {
  //   try {
  //     let response = await api.getData();
  //     dispatch(dataFromApi(response.data));
  //   }
  //   catch (err) {
  //     console.error("prefetchData function error: " + err)
  //   }
  // }, [dispatch])

  // useEffect(() => { prefetchData() }, [prefetchData]);

  return (
    <div>
      a gateway comp - that prefetches data.
    </div>
  );
}

export default GateComp;
