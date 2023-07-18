import { Dropbox } from 'dropbox';

export const getRootFolder = (token: string, path = '') => {
  const dbx = new Dropbox({
    accessToken: token,
  });

  return dbx.filesListFolder({ path });
};
