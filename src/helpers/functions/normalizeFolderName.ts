export const normalizeFolderName = (name: string) => {
  const namesList = name.split('/');
  let folderName = namesList[namesList.length - 1].split('%20').join(' ');

  if (folderName === '') {
    folderName = 'root';
  }

  return folderName;
};
