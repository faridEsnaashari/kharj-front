import {useState} from 'react';
import { BASEURL } from '../../../utils/api';
import {getToken} from '../../auth-token.logic';

export async function getUncomplete({page, size, bank}, onError){
    const token=getToken()

      const query = new URLSearchParams(page,size,bank).toString();
      const res = await fetch(`${BASEURL}/uncomplete-payments?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      
      if (json.success) {
        return json
      } else {
        onError(json)
      }
}

export async function useApi(api){
  const [ result, setResult ]= useState(null)
  const [ isFetching, setIsFetching ]= useState(false)
  const [ error, setError ]= useState(false)

  try {
    setIsFetching(true)
    const r = await api()
    setResult(r)
  } catch (e) {
    setError(e)
  } finally{
    setIsFetching(false)
  }

  return {
    result,
    isFetching,
    error
  }
}
