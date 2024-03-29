import gql from 'graphql-tag';
import React, {useEffect, useState} from 'react';
import {ConfigWire} from '@imagine-cms/types';
import {configContext} from './ConfigContext';
import {useRunQuery} from '../../hooks/run-query.hook';
import {ConfigContextProviderProps} from './ConfigContext.types';
import {LoadingScreen} from '../../components/loading-screen/LoadingScreen';

const FETCH_SITE_CONFIG = gql`
  query {
    config {
      siteName
      logoURL
      nitroURL
      discordURL
      discordWidget
      twitterURL
      facebookURL
      instagramURL
      snapchatURL
    }
  }
`;

export function ConfigContextProvider({children}: ConfigContextProviderProps) {
  const [config, setConfig] = useState<ConfigWire>();
  const {runQuery, data, loading} = useRunQuery<{config: ConfigWire}>(FETCH_SITE_CONFIG);

  useEffect(() => {
    runQuery();
  }, []);

  useEffect(() => {
    setConfig(data?.config);
  }, [data]);

  const updateConfig = (changes: Partial<ConfigWire>) => {
    setConfig(_ => ({..._, ...changes}));
  };

  if (loading) {
    return <LoadingScreen />
  }

  return <configContext.Provider value={{config, setConfig: updateConfig}}>{children}</configContext.Provider>;
}
