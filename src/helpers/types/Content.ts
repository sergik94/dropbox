import { files } from 'dropbox';

export type Content = (
  | files.FileMetadataReference
  | files.FolderMetadataReference
  | files.DeletedMetadataReference
)[];
