import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../contexts/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

function DetailPage() {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const getLink = useCallback(async() => {
    try {
      const data = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLink(data);
    } catch (error) { }
  }, [token, linkId, request]);

  useEffect(() => {
    getLink()
  }, [getLink]);

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      { !loading && link && <LinkCard link={link} /> }
    </div>
  );
}

export default DetailPage;
